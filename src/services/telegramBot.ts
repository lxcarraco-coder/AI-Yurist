import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { getLegalConsultationFallback } from './legalKnowledgeBase.ts';
import type { UserProfile } from './userStore.ts';
import {
  getUser,
  createOrUpdateUser,
  incrementConsultation,
} from './userStore.ts';

export interface TelegramContact {
  phone_number: string;
  first_name: string;
  last_name?: string;
  user_id?: number;
}
export const TelegramContact = {};

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
    contact?: TelegramContact;
    date: number;
  };
  callback_query?: {
    id: string;
    from: {
      id: number;
      first_name?: string;
      last_name?: string;
      username?: string;
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
export const TelegramUpdate = {};

export interface TelegramBotController {
  handleWebhookUpdate: (update: TelegramUpdate) => Promise<void>;
  stop: () => void;
}
export const TelegramBotController = {};


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
            { command: 'start', description: 'Botni ishga tushirish va ro‘yxatdan o‘tish' },
            { command: 'webapp', description: '⚖️ Yurist AI Mini App ilovasini ochish' },
            { command: 'profil', description: '👤 Shaxsiy hisob va tarif' },
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

  // Answer callback query
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

  // Prompt phone number sharing via Telegram Native Contact Button
  async function requestContactRegistration(chatId: number, firstName?: string) {
    createOrUpdateUser(chatId, {
      registrationStep: 'WAITING_CONTACT',
      isRegistered: false,
    });

    const greeting = firstName ? `Assalomu alaykum, ${firstName}!` : 'Assalomu alaykum!';
    const text = `${greeting}

⚖️ **Yurist AI UZ — O‘zbekiston Respublikasi Qonunchiligi Huquqiy Yordamchisi** platformasiga xush kelibsiz!

Tizimda O‘zbekiston Respublikasining yangi tahrirdagi Mehnat kodeksi, Soliq kodeksi (QQS 12%), Fuqarolik kodeksi va Lex.uz qarorlari joylashtirilgan.

📲 **Xizmatdan to‘liq foydalanish, arizalar va shartnomalar tuzish uchun ro‘yxatdan o‘tishni yakunlang.**

Quyidagi **«📲 Telefon raqamni yuborish»** tugmasini bosing:`;

    const contactKeyboard = {
      keyboard: [
        [
          {
            text: '📲 Telefon raqamni yuborish',
            request_contact: true,
          },
        ],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    };

    await sendMessage(chatId, text, contactKeyboard);
  }

  // Prompt full name input
  async function promptFullName(chatId: number, phone: string) {
    const text = `✅ Telefon raqamingiz muvaffaqiyatli qabul qilindi: **${phone}**

✍️ Endi rasmiy arizalar, mehnat va tijorat shartnomalarida to‘g‘ri aks etishi uchun to‘liq **Ism va Familiyangizni** yozib yuboring:
*(Masalan: Alisher Qodirov yoki Ziyodullo Mahmudov)*`;

    // Remove custom keyboard and ask for text input
    await sendMessage(chatId, text, { remove_keyboard: true });
  }

  // Complete registration and display welcome screen with Mini App buttons
  async function completeRegistration(chatId: number, fullName: string, username?: string) {
    const user = createOrUpdateUser(chatId, {
      fullName: fullName.trim(),
      username,
      isRegistered: true,
      registrationStep: 'COMPLETED',
      plan: 'free',
    });

    const text = `🎉 **Tabriklaymiz, ${user.fullName}!**

Siz **Yurist AI UZ** platformasidan muvaffaqiyatli ro‘yxatdan o‘tdingiz!

📋 **Sizning shaxsiy hisobingiz:**
• **F.I.SH:** ${user.fullName}
• **Telefon:** ${user.phone}
• **Tarif:** Bepul (Kunlik 40 ta huquqiy tahlil, 10 xil hujjatlar shabloni)
• **ID raqami:** #ID-${chatId}

Quyidagi tugma orqali bevosita **Yurist AI Mini App** ilovasini ochishingiz yoki savolingizni shu yerga yozishingiz mumkin:`;

    await sendWelcomeDashboard(chatId, user);
  }

  // Welcome / Dashboard screen with Mini App buttons
  async function sendWelcomeDashboard(chatId: number, user?: UserProfile) {
    const name = user?.fullName || 'Foydalanuvchi';
    const text = `Assalomu alaykum, **${name}**!

⚖️ **Yurist AI UZ** platformasi xizmatingizda.

📋 **Sizning hisobingiz:**
• **F.I.SH:** ${user?.fullName || 'Ro‘yxatdan o‘tmagan'}
• **Telefon:** ${user?.phone || 'Biriktirilmagan'}
• **Tarif:** ${user?.plan === 'professional' ? '💎 Professional (Cheksiz)' : user?.plan === 'standard' ? '⭐ Standart' : '🆓 Bepul (40 ta so‘rov/kun)'}

Quyidagi tugmalar orqali Mini App ilovasini oching yoki bevosita savolingizni yozib yuboring:`;

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

    // Row 3: Fallback link & Profile
    inlineKeyboard.push([
      { text: '👤 Mening hisobim', callback_data: 'cmd_profile' },
      {
        text: '🌐 Brauzerda ochish',
        url: webAppUrl || 'https://lex.uz',
      },
    ]);

    // Role switcher row
    inlineKeyboard.push([
      { text: '🏢 Tadbirkor', callback_data: 'role_tadbirkor' },
      { text: '📊 Buxgalter', callback_data: 'role_buxgalter' },
      { text: '👤 Fuqaro', callback_data: 'role_fuqaro' },
    ]);

    await sendMessage(chatId, text, { inline_keyboard: inlineKeyboard });
  }

  // Send Profile details
  async function sendProfile(chatId: number) {
    const user = getUser(chatId);
    if (!user || !user.isRegistered) {
      await requestContactRegistration(chatId);
      return;
    }

    const text = `👤 **SIZNING SHAXSIY PROFILINGIZ:**

• **F.I.SH:** ${user.fullName}
• **Telefon raqam:** ${user.phone}
• **Telegram ID:** ${user.telegramId}
• **Tanlangan soha:** ${user.role === 'tadbirkor' ? '🏢 Tadbirkor' : user.role === 'buxgalter' ? '📊 Buxgalter' : '👤 Fuqaro'}
• **Joriy tarif:** ${user.plan === 'professional' ? '💎 Professional (Cheksiz)' : user.plan === 'standard' ? '⭐ Standart (49 000 so‘m)' : '🆓 Bepul (40 ta so‘rov/kun)'}
• **Yaratilgan hujjatlar:** ${user.documentsCount || 0} ta
• **Olingan konsultatsiyalar:** ${user.consultationsCount || 0} ta
• **Ro‘yxatdan o‘tilgan sana:** ${new Date(user.createdAt).toLocaleDateString('uz-UZ')}

💳 *Kelgusida qo‘shimcha pullik xizmatlar (sudga da’vo tayyorlash, shaxsiy yurist auditi, Payme/Click orqali to‘lov) ushbu hisobingizga ulanadi.*`;

    const keyboard = {
      inline_keyboard: [
        webAppUrl && webAppUrl.startsWith('https://')
          ? [{ text: '⚖️ Mini Appda ochish', web_app: { url: webAppUrl } }]
          : [],
        [{ text: '◀️ Asosiy menyu', callback_data: 'cmd_start' }],
      ].filter((r) => r.length > 0),
    };

    await sendMessage(chatId, text, keyboard);
  }

  // Send Features screen
  async function sendFeatures(chatId: number) {
    const text = `📚 **YURIST AI PLATFORMASI IMKONIYATLARI:**

1. 💬 **Tezkor AI Huquqiy Tahlil:**
• O‘zbekiston Respublikasi qonunlari va Lex.uz bo‘yicha 2-3 soniyada aniq huquqiy tahlil;
• 📌 Qisqa xulosa, ⚖️ Qonuniy asos va 🛠 Amaliy qadamlar.

2. 📝 **10 xil Hujjatlar konstruktori:**
• Mehnat ta’tili va ishdan bo‘shash arizalari (MK 217, 161);
• Talabnoma (Pretenziya) va shikoyatlar;
• Bino-inshoot ijara shartnomasi;
• Qarz shartnomasi va tilxat (FK 732);
• Sudga da’vo arizalari;
• Aliment undirish to‘g‘risida sudga ariza (OK 99);
• Ishonchnoma (Doverennost).
*(Mini Appda Word va matn shaklida yuklab olish va o‘z hisobingizga saqlash mumkin)*

3. 🧮 **Huquqiy Kalkulyatorlar:**
• **MJtK 332-1:** Jarimalarni 15 kunda 50% chegirma bilan to‘lash;
• **MK 217:** 21 kalendar kunlik mehnat ta’tili va kompensatsiyasi;
• **Oila kodeksi 99:** Aliment foizlari (25%, 33.3%, 50%);
• **Davlat boji:** Iqtisodiy va fuqarolik sudlari bojlari.

4. 🆓 **Bepul foydalanish:**
• Kunlik 40 ta bepul savol-javob barcha ro‘yxatdan o‘tgan foydalanuvchilar uchun ochiq.`;

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
Botga istalgan huquqiy savolingizni yozib yuboring (masalan: *"Xodimni o‘z xohishi bilan bo‘shatish tartibi qanday?"*, *"Ajrashmoqchiman, aliment qancha bo‘ladi?"*, *"QQS 12% aylanma soliqdan qanday farqlanadi?"*).

2. **Mini App ilovasi:**
«⚖️ Yurist AI’ni ochish» tugmasini bossangiz, Telegram ichida to‘liq interaktiv kalkulyatorlar, hujjat tuzish va shaxsiy hisobingiz ochiladi.

3. **Sohani tanlash:**
Biznes uchun /tadbirkor, buxgalteriya va soliq uchun /buxgalter, shaxsiy masalalar uchun /fuqaro rejimlarini tanlang.

*Eslatma: Ushbu ma’lumot maslahat xarakteriga ega va rasmiy advokatlik yoki sud xulosasi o‘rnini bosmaydi.*`;

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

    // If Gemini models hit 429 quota exhaustion or network error, use verified knowledge base fallback
    if (!replyText) {
      console.log('Using Uzbek Legal Knowledge Base fallback for Telegram user query:', query);
      replyText = getLegalConsultationFallback(query, 'uz');
    }

    incrementConsultation(chatId);

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
          const user = getUser(chatId);
          if (data === 'cmd_start') {
            if (!user || !user.isRegistered) {
              await requestContactRegistration(chatId, cb.from.first_name);
            } else {
              await sendWelcomeDashboard(chatId, user);
            }
          } else if (data === 'cmd_features') {
            await sendFeatures(chatId);
          } else if (data === 'cmd_help') {
            await sendHelp(chatId);
          } else if (data === 'cmd_profile') {
            await sendProfile(chatId);
          } else if (data === 'role_tadbirkor') {
            createOrUpdateUser(chatId, { role: 'tadbirkor' });
            await sendMessage(
              chatId,
              '✅ Soha: **🏢 Tadbirkor (MChJ / YaTT)** tanlandi.\n\nBiznes, shartnomalar, xodimlar yoki soliqqa oid istalgan huquqiy savolingizni yozing:'
            );
          } else if (data === 'role_buxgalter') {
            createOrUpdateUser(chatId, { role: 'buxgalter' });
            await sendMessage(
              chatId,
              '✅ Soha: **📊 Buxgalter / Moliyachi** tanlandi.\n\nSoliq kodeksi, QQS (12%), aylanmadan soliq, E-faktura yoki hisobotlar bo‘yicha savolingizni yozing:'
            );
          } else if (data === 'role_fuqaro') {
            createOrUpdateUser(chatId, { role: 'fuqaro' });
            await sendMessage(
              chatId,
              '✅ Soha: **👤 Fuqaro (Jismoniy shaxs)** tanlandi.\n\nOila, nikohdan ajrashish, aliment, meros, mehnat huquqlari yoki jarimalar bo‘yicha savolingizni yozing:'
            );
          }
        }
        return;
      }

      // Handle Contact message (Telegram native request_contact)
      if (update.message?.contact) {
        const chatId = update.message.chat.id;
        const contact = update.message.contact;
        let phone = contact.phone_number.trim();
        if (!phone.startsWith('+')) {
          phone = `+${phone}`;
        }

        createOrUpdateUser(chatId, {
          phone,
          registrationStep: 'WAITING_NAME',
          username: update.message.from?.username,
        });

        await promptFullName(chatId, phone);
        return;
      }

      // Handle text messages
      if (update.message && update.message.text) {
        const chatId = update.message.chat.id;
        const text = update.message.text.trim();
        const firstName = update.message.from?.first_name;
        const user = getUser(chatId);

        // Check if user is in WAITING_NAME step
        if (user && user.registrationStep === 'WAITING_NAME' && !text.startsWith('/')) {
          if (text.length >= 2) {
            await completeRegistration(chatId, text, update.message.from?.username);
            return;
          } else {
            await sendMessage(chatId, 'Iltimos, to‘liq ism va familiyangizni yozing (kamida 2 ta belgi):');
            return;
          }
        }

        if (text === '/start') {
          if (!user || !user.isRegistered) {
            await requestContactRegistration(chatId, firstName);
          } else {
            await sendWelcomeDashboard(chatId, user);
          }
        } else if (text === '/imkoniyatlar' || text === '/features') {
          await sendFeatures(chatId);
        } else if (text === '/yordam' || text === '/help') {
          await sendHelp(chatId);
        } else if (text === '/profil' || text === '/profile') {
          await sendProfile(chatId);
        } else if (text === '/tadbirkor') {
          createOrUpdateUser(chatId, { role: 'tadbirkor' });
          await sendMessage(chatId, '✅ Soha: **🏢 Tadbirkor** tanlandi. Savolingizni yozing:');
        } else if (text === '/buxgalter') {
          createOrUpdateUser(chatId, { role: 'buxgalter' });
          await sendMessage(chatId, '✅ Soha: **📊 Buxgalter** tanlandi. Savolingizni yozing:');
        } else if (text === '/fuqaro') {
          createOrUpdateUser(chatId, { role: 'fuqaro' });
          await sendMessage(chatId, '✅ Soha: **👤 Fuqaro** tanlandi. Savolingizni yozing:');
        } else if (text === '/webapp') {
          if (!user || !user.isRegistered) {
            await requestContactRegistration(chatId, firstName);
          } else {
            await sendWelcomeDashboard(chatId, user);
          }
        } else {
          // If not registered at all and sending regular text, prompt registration gently
          if (!user || !user.isRegistered) {
            if (user && user.registrationStep === 'WAITING_CONTACT') {
              await sendMessage(
                chatId,
                'Iltimos, avval pastdagi **«📲 Telefon raqamni yuborish»** tugmasini bosing:'
              );
              return;
            } else {
              await requestContactRegistration(chatId, firstName);
              return;
            }
          }

          // User is registered, handle consultation question
          const currentRole = user.role || 'fuqaro';
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
