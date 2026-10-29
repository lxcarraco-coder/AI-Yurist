import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { getLegalConsultationFallback } from './legalKnowledgeBase.ts';

export interface TelegramUpdate {
  update_id: number;
  message?: {
    message_id: number;
    from?: {
      id: number;
      first_name?: string;
      last_name?: string;
      username?: string;
    };
    chat: {
      id: number;
      type: string;
    };
    text?: string;
    date: number;
  };
  callback_query?: {
    id: string;
    from: {
      id: number;
      first_name?: string;
    };
    message?: {
      message_id: number;
      chat: {
        id: number;
      };
    };
    data?: string;
  };
}

// User state storage (in-memory for active sessions)
const userRoles: Record<number, 'tadbirkor' | 'buxgalter' | 'fuqaro'> = {};

export interface TelegramBotController {
  handleWebhookUpdate: (update: TelegramUpdate) => Promise<void>;
  stop: () => void;
}

export function startTelegramBot(
  token: string,
  ai: GoogleGenAI,
  systemInstruction: string,
  webAppUrl: string
): TelegramBotController {
  const TELEGRAM_API = `https://api.telegram.org/bot${token}`;

  // Configure bot commands and menu button in Telegram
  async function setupBotCommands() {
    try {
      await fetch(`${TELEGRAM_API}/setMyCommands`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          commands: [
            { command: 'start', description: 'Botni ishga tushirish va menyu' },
            { command: 'webapp', description: '⚖️ Yurist AI Mini App ilovasini ochish' },
            { command: 'imkoniyatlar', description: '📚 Platforma imkoniyatlari' },
            { command: 'yordam', description: 'ℹ️ Yordam va qo‘llanma' },
          ],
        }),
      });

      // Configure Menu button to open the WebApp
      if (webAppUrl && webAppUrl.startsWith('https://')) {
        await fetch(`${TELEGRAM_API}/setChatMenuButton`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            menu_button: {
              type: 'web_app',
              text: '⚖️ Yurist AI',
              web_app: { url: webAppUrl },
            },
          }),
        });
      }
    } catch (err) {
      console.error('Error setting Telegram bot commands:', err);
    }
  }

  // Send message helper with auto-splitting for long messages (Telegram 4096 limit)
  async function sendMessage(chatId: number, text: string, replyMarkup?: any) {
    try {
      const MAX_CHUNK = 3900;
      if (text.length > MAX_CHUNK) {
        // Split by double newline or paragraph
        const parts: string[] = [];
        let remaining = text;
        while (remaining.length > 0) {
          if (remaining.length <= MAX_CHUNK) {
            parts.push(remaining);
            break;
          }
          let splitIdx = remaining.lastIndexOf('\n\n', MAX_CHUNK);
          if (splitIdx === -1 || splitIdx < 1000) {
            splitIdx = remaining.lastIndexOf('\n', MAX_CHUNK);
          }
          if (splitIdx === -1 || splitIdx < 1000) {
            splitIdx = MAX_CHUNK;
          }
          parts.push(remaining.slice(0, splitIdx));
          remaining = remaining.slice(splitIdx).trim();
        }

        for (let i = 0; i < parts.length; i++) {
          const isLast = i === parts.length - 1;
          await sendSingleMessage(chatId, parts[i], isLast ? replyMarkup : undefined);
        }
      } else {
        await sendSingleMessage(chatId, text, replyMarkup);
      }
    } catch (err) {
      console.error('Error sending Telegram message:', err);
    }
  }

  async function sendSingleMessage(chatId: number, text: string, replyMarkup?: any) {
    const payload: any = {
      chat_id: chatId,
      text,
      disable_web_page_preview: true,
    };

    if (replyMarkup) {
      payload.reply_markup = replyMarkup;
    }

    // Try markdown first, if fails fallback to plain text
    payload.parse_mode = 'Markdown';
    let res = await fetch(`${TELEGRAM_API}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    let data = await res.json();
    if (!data.ok) {
      // Fallback without parse_mode in case of unescaped markdown symbols
      delete payload.parse_mode;
      await fetch(`${TELEGRAM_API}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }
  }

  // Send typing indicator
  async function sendChatAction(chatId: number) {
    try {
      await fetch(`${TELEGRAM_API}/sendChatAction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, action: 'typing' }),
      });
    } catch {
      // Ignore
    }
  }

  // Answer callback query to dismiss loading state in Telegram client
  async function answerCallbackQuery(callbackQueryId: string, text?: string) {
    try {
      await fetch(`${TELEGRAM_API}/answerCallbackQuery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          callback_query_id: callbackQueryId,
          text: text || '',
        }),
      });
    } catch {
      // Ignore
    }
  }

  // Send Welcome screen with EXACT buttons requested by requirements
  async function sendWelcome(chatId: number, name?: string) {
    const greeting = name ? `Assalomu alaykum, ${name}!` : 'Assalomu alaykum!';
    const welcomeText = `${greeting}

**Yurist AI UZ — O‘zbekiston Respublikasi Qonunchiligi Huquqiy Yordamchisi** platformasiga xush kelibsiz!

Mening bilimlar bazamda O‘zbekiston Respublikasining amaldagi qonunlari, yangi tahrirdagi Mehnat kodeksi, Soliq kodeksi (QQS 12%), Fuqarolik kodeksi, Oila kodeksi va rasmiy **Lex.uz** qarorlari joylashgan.

Quyidagi tugmalar orqali xizmatdan to‘liq foydalanishingiz mumkin yoki to‘g‘ridan-to‘g‘ri savolingizni yozib yuboring:`;

    const inlineKeyboard: any[][] = [];

    // Row 1: Required main button “⚖️ Yurist AI’ni ochish” (Telegram Mini App)
    if (webAppUrl && webAppUrl.startsWith('https://')) {
      inlineKeyboard.push([
        {
          text: '⚖️ Yurist AI’ni ochish',
          web_app: { url: webAppUrl },
        },
      ]);
    }

    // Row 2: Required inline buttons: “📚 Imkoniyatlar” and “ℹ️ Yordam”
    inlineKeyboard.push([
      { text: '📚 Imkoniyatlar', callback_data: 'cmd_features' },
      { text: 'ℹ️ Yordam', callback_data: 'cmd_help' },
    ]);

    // Row 3: Required fallback link to open in a normal browser
    if (webAppUrl) {
      inlineKeyboard.push([
        {
          text: '🌐 Brauzerda ochish (Fallback)',
          url: webAppUrl,
        },
      ]);
    }

    // Role switcher row
    inlineKeyboard.push([
      { text: '🏢 Tadbirkor', callback_data: 'role_tadbirkor' },
      { text: '📊 Buxgalter', callback_data: 'role_buxgalter' },
      { text: '👤 Fuqaro', callback_data: 'role_fuqaro' },
    ]);

    await sendMessage(chatId, welcomeText, { inline_keyboard: inlineKeyboard });
  }

  // Send Features screen
  async function sendFeatures(chatId: number) {
    const text = `📚 **YURIST AI PLATFORMASI IMKONIYATLARI:**

1. 💬 **Tezkor AI Konsultatsiya:**
• O‘zbekiston qonunlari va Lex.uz bo‘yicha 2-3 soniyada aniq huquqiy tahlil;
• 📌 Qisqa xulosa, ⚖️ Qonuniy asos va 🛠 Amaliy qadamlar.

2. 📝 **10 xil Hujjatlar konstruktori:**
• Ariza va shikoyatlar;
• Talabnoma (Pretenziya);
• Ish beruvchiga rasmiy murojaat;
• Ijara va mehnat shartnomalari loyihalari;
• Qarzni qaytarish talabi va tilxatlar;
• Sudga da’vo arizalari;
• Aliment undirish to‘g‘risida sud arizasi;
• Ishonchnoma (Doverennost).
*(Tayyor matnlarni Word va matn shaklida yuklab olish mumkin)*

3. 🧮 **Huquqiy Kalkulyatorlar:**
• **MJtK 332-1:** Jarimalarni 15 kunda 50% chegirma bilan to‘lash;
• **MK 217:** 21 kalendar kunlik mehnat ta’tili va ishdan bo‘shash kompensatsiyasi;
• **Oila kodeksi 99:** Aliment foizlari (25%, 33.3%, 50%);
• **Davlat boji:** Iqtisodiy va fuqarolik sudlari bojlari.

4. 🆓 **Mutlaqo bepul:**
• Obuna yoki to‘lov tizimlari yo‘q, barcha funksiyalar bepul taqdim etiladi.`;

    const keyboard = {
      inline_keyboard: [
        webAppUrl && webAppUrl.startsWith('https://')
          ? [{ text: '⚖️ Yurist AI Mini App’ni ochish', web_app: { url: webAppUrl } }]
          : [],
        [{ text: '◀️ Asosiy menyu', callback_data: 'cmd_start' }],
      ].filter((r) => r.length > 0),
    };

    await sendMessage(chatId, text, keyboard);
  }

  // Send Help screen
  async function sendHelp(chatId: number) {
    const text = `ℹ️ **FOYDALANISH BO‘YICHA YORDAM:**

1. **Savol berish:**
Botga istalgan savolingizni yozib yuboring (masalan: *"Xodimni o‘z xohishi bilan bo‘shatish tartibi qanday?"*, *"Ajrashmoqchiman nima qilishim kerak?"*, *"QQS 12% aylanma soliqdan qanday farqlanadi?"*).

2. **Mini App (Ilova):**
«⚖️ Yurist AI’ni ochish» tugmasini bossangiz, Telegram ichidan chiqmasdan qulay kalkulyatorlar va hujjatlar konstruktoridan foydalanishingiz mumkin.

3. **Sohani tanlash:**
Savollaringiz biznesga oid bo‘lsa /tadbirkor, soliqqa oid bo‘lsa /buxgalter, shaxsiy yoki oilaviy bo‘lsa /fuqaro buyruqlarini tanlashingiz mumkin.

*Eslatib o‘taman, ushbu ma’lumot maslahat xarakteriga ega va rasmiy advokatlik yoki sud xulosasi o‘rnini bosmaydi.*`;

    const keyboard = {
      inline_keyboard: [
        webAppUrl && webAppUrl.startsWith('https://')
          ? [{ text: '⚖️ Yurist AI Mini App’ni ochish', web_app: { url: webAppUrl } }]
          : [],
        [{ text: '◀️ Asosiy menyu', callback_data: 'cmd_start' }],
      ].filter((r) => r.length > 0),
    };

    await sendMessage(chatId, text, keyboard);
  }

  // Answer legal question with Gemini or knowledge base fallback
  async function handleLegalQuestion(chatId: number, query: string, role: 'tadbirkor' | 'buxgalter' | 'fuqaro') {
    await sendChatAction(chatId);

    let roleContext = '';
    if (role === 'tadbirkor') {
      roleContext = '\nFoydalanuvchi: Tadbirkor (MChJ, YaTT). Biznes xatarlarini kamaytirishga urg‘u bering.';
    } else if (role === 'buxgalter') {
      roleContext = '\nFoydalanuvchi: Buxgalter/moliyachi. Soliq stavkalari, hisob-faktura va muddatlarga urg‘u bering.';
    } else {
      roleContext = '\nFoydalanuvchi: Jismoniy shaxs. Tushunarli va sodda xalqona tilda tushuntiring.';
    }

    const candidateModels = ['gemini-3.8-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];
    let replyText = '';

    for (const model of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: query,
          config: {
            systemInstruction: systemInstruction + roleContext,
            temperature: 0.2,
            thinkingConfig: {
              thinkingLevel: ThinkingLevel.LOW,
            },
          },
        });
        if (response.text) {
          replyText = response.text;
          break;
        }
      } catch (geminiErr: any) {
        console.warn(`Telegram Gemini model ${model} failed, trying next candidate:`, geminiErr?.message);
      }
    }

    // If all models hit quota or failed, use the verified Uzbek legal knowledge base
    if (!replyText) {
      console.log('Using Uzbek Legal Knowledge Base fallback for Telegram user query:', query);
      replyText = getLegalConsultationFallback(query, 'uz');
    }

    const actionButtons = {
      inline_keyboard: [
        webAppUrl && webAppUrl.startsWith('https://')
          ? [
              {
                text: '📝 Hujjat tuzish / Mini App',
                web_app: { url: webAppUrl },
              },
            ]
          : [],
        [
          { text: '📚 Imkoniyatlar', callback_data: 'cmd_features' },
          { text: 'ℹ️ Yordam', callback_data: 'cmd_help' },
        ],
      ].filter((row) => row.length > 0),
    };

    await sendMessage(chatId, replyText, actionButtons);
  }

  // Handle a single Telegram update (used by both webhook and polling)
  async function processUpdate(update: TelegramUpdate) {
    try {
      // Handle callback queries (inline button clicks)
      if (update.callback_query) {
        const cb = update.callback_query;
        const chatId = cb.message?.chat.id;
        const data = cb.data;

        await answerCallbackQuery(cb.id);

        if (chatId && data) {
          if (data === 'cmd_start') {
            await sendWelcome(chatId, cb.from.first_name);
          } else if (data === 'cmd_features') {
            await sendFeatures(chatId);
          } else if (data === 'cmd_help') {
            await sendHelp(chatId);
          } else if (data === 'role_tadbirkor') {
            userRoles[chatId] = 'tadbirkor';
            await sendMessage(
              chatId,
              '✅ Soha: **🏢 Tadbirkor (MChJ / YaTT)** tanlandi.\n\nBiznes, shartnomalar, xodimlar yoki soliqqa oid istalgan huquqiy savolingizni yozing:'
            );
          } else if (data === 'role_buxgalter') {
            userRoles[chatId] = 'buxgalter';
            await sendMessage(
              chatId,
              '✅ Soha: **📊 Buxgalter / Moliyachi** tanlandi.\n\nSoliq kodeksi, QQS (12%), aylanmadan soliq, E-faktura yoki hisobotlar bo‘yicha savolingizni yozing:'
            );
          } else if (data === 'role_fuqaro') {
            userRoles[chatId] = 'fuqaro';
            await sendMessage(
              chatId,
              '✅ Soha: **👤 Fuqaro (Jismoniy shaxs)** tanlandi.\n\nOila, nikohdan ajrashish, aliment, meros, mehnat huquqlari yoki jarimalar bo‘yicha savolingizni yozing:'
            );
          }
        }
        return;
      }

      // Handle incoming messages
      if (update.message && update.message.text) {
        const chatId = update.message.chat.id;
        const text = update.message.text.trim();
        const firstName = update.message.from?.first_name;

        if (text === '/start') {
          await sendWelcome(chatId, firstName);
        } else if (text === '/imkoniyatlar' || text === '/features') {
          await sendFeatures(chatId);
        } else if (text === '/yordam' || text === '/help') {
          await sendHelp(chatId);
        } else if (text === '/tadbirkor') {
          userRoles[chatId] = 'tadbirkor';
          await sendMessage(chatId, '✅ Soha: **🏢 Tadbirkor** tanlandi. Savolingizni yozing:');
        } else if (text === '/buxgalter') {
          userRoles[chatId] = 'buxgalter';
          await sendMessage(chatId, '✅ Soha: **📊 Buxgalter** tanlandi. Savolingizni yozing:');
        } else if (text === '/fuqaro') {
          userRoles[chatId] = 'fuqaro';
          await sendMessage(chatId, '✅ Soha: **👤 Fuqaro** tanlandi. Savolingizni yozing:');
        } else if (text === '/webapp') {
          await sendWelcome(chatId, firstName);
        } else {
          // Default: Legal consultation question
          const currentRole = userRoles[chatId] || 'fuqaro';
          await handleLegalQuestion(chatId, text, currentRole);
        }
      }
    } catch (err) {
      console.error('Error processing Telegram update:', err);
    }
  }

  // Polling loop
  let offset = 0;
  let isRunning = true;

  async function pollUpdates() {
    setupBotCommands();
    console.log('🤖 Telegram Bot polling started successfully for @shaxsiy_yuristimbot');

    while (isRunning) {
      try {
        const res = await fetch(`${TELEGRAM_API}/getUpdates?offset=${offset}&timeout=20`, {
          signal: AbortSignal.timeout(30000),
        });

        if (!res.ok) {
          await new Promise((r) => setTimeout(r, 3000));
          continue;
        }

        const data = await res.json();
        if (data.ok && Array.isArray(data.result)) {
          for (const update of data.result as TelegramUpdate[]) {
            offset = update.update_id + 1;
            await processUpdate(update);
          }
        }
      } catch (err: any) {
        // Wait a few seconds on network glitch before retry
        await new Promise((r) => setTimeout(r, 4000));
      }
    }
  }

  pollUpdates();

  return {
    handleWebhookUpdate: processUpdate,
    stop: () => {
      isRunning = false;
    },
  };
}
