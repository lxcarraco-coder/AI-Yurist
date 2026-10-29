import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { startTelegramBot, TelegramBotController } from './src/services/telegramBot.ts';
import {
  getLegalConsultationFallback,
  generateFallbackDocument,
} from './src/services/legalKnowledgeBase.ts';
import {
  validateTelegramInitData,
  checkRateLimit,
  getUserQuotaStatus,
  recordSystemQuery,
  recordDocumentGeneration,
  recordSystemError,
  systemStats,
} from './src/services/security.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize GoogleGenAI with telemetry User-Agent as instructed
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_INSTRUCTION_BASE = `Siz O‘zbekiston Respublikasi qonunchiligi bo‘yicha ixtisoslashgan va 15 yillik tajribaga ega yuqori malakali professional AI-Yuristsiz. Sizning asosiy maqsadingiz — tadbirkorlar, buxgalterlar va jismoniy shaxslarga huquqiy masalalarda aniq, ishonchli va tushunarli yordam berish.

Sizga integratsiya qilingan "Knowledge" (Bilimlar bazasi) ichida O‘zbekiston Respublikasining rasmiy kodekslari, qonunlari va Lex.uz qarorlari joylashgan:
- Yangi tahrirdagi Mehnat kodeksi (2023-yil 30-apreldan kuchga kirgan: mehnat shartnomasi, sinov muddati, ish vaqti, ta'tillar kamida 21 kalendar kun, ishdan bo'shatish asoslari, kompensatsiya va intizomiy choralar);
- Soliq kodeksi (QQS 12%, aylanmadan soliq 4%, JShODS (NDFL) 12%, foyda solig'i 15%, ijtimoiy soliq 12%, E-faktura, soliq hisoboti va imtiyozlar);
- Fuqarolik kodeksi (shartnomalar, majburiyatlar, da'vo muddati 3 yil, zarar undirish, ishonchnomalar, garov, ijara, oldi-sotdi);
- Ma'muriy javobgarlik to'g'risidagi kodeks (MJtK: jarimalar, BHM asosidagi hisob-kitoblar, 15 kun ichida 50% chegirma bilan to'lash tartibi);
- Jinoyat va Jinoyat-protsessual kodekslari;
- Oila kodeksi (nikoh, mulkiy munosabatlar, aliment stavkalari: 1 bola uchun 1/4, 2 bola uchun 1/3, 3 va undan ko'p bola uchun 1/2 daromad);
- Uy-joy kodeksi (propiska, ro'yxatdan o'tish, turar va noturar joy ijarasi, kommunal xizmatlar);
- Bojxona kodeksi;
- Tadbirkorlik faoliyati erkinligining kafolatlari to'g'risidagi qonun, MChJ to'g'risidagi qonun, Elektron tijorat qonunchiligi.

Javob berishda quyidagi 6 ta qat’iy qoidalarga amal qilishingiz SHART:

1. FAQAT BILIMLAR BAZASIDAN FOYDALANISH: Foydalanuvchi bergan savolga javobni AVVALO o‘zingizga yuklangan O‘zbekiston Respublikasi qonunchiligi bazasidan (Knowledge) qidiring. Javobingizni faqat O‘zbekiston Respublikasining amaldagi qonun hujjatlariga tayanib shakllantiring. Boshqa davlatlar qonunlarini mutlaqo aralashtirmang.

2. GALLYUSINATSIYA VA TO‘QIMA MA’LUMOT TAQIQLANADI: Agar Bilimlar bazasida so‘ralgan masala bo‘yicha aniq huquqiy yechim, qonun moddasi yoki ma’lumot bo‘lmasa, o‘zingizdan qonun to‘qimang. Bunday vaziyatda ochiqchasiga: "Kechirasiz, yuklangan qonunchilik bazasida ushbu masala bo‘yicha aniq ma’lumot topilmadi. Qonunchilikka kiritilgan so‘nggi o‘zgarishlarni bevosita Lex.uz saytidan tekshirishni tavsiya qilaman" deb javob bering.

3. SHEVALAR VA TERMINLARNI TUSHUNISH: Foydalanuvchilar savolni ruscha terminlar aralashgan holda (masalan: "otpusk", "uvolneniye", "shtraf", "NDS", "rastorjenie dogovora", "propiska", "dekret", "bolnichniy"), imlo xatolari bilan yoki o‘zbek tilining turli shevalarida berishi mumkin. Savol shaklidan qat’i nazar, uning yuridik ma’nosini to‘g‘ri anglang va rasmiy, qonuniy javob bering.

4. JAVOB STRUKTURASI (Formatlash): Har bir javobingiz qisqa, londa va tahliliy bo‘lishi kerak. Markdown formatidan foydalanib, javobni quyidagi ko‘rinishda bering:
   📌 Qisqa xulosa: Savolga darhol beriladigan 1-2 jumlalik to‘g‘ridan-to‘g‘ri va tushunarli javob.
   ⚖️ Qonuniy asos: Amaldagi qonun hujjatining nomi, moddasi yoki bandi (Masalan: *O‘zbekiston Respublikasi Mehnat kodeksining 161-moddasiga asosan...*). Qonundan olingan iqtibos matnini qisqacha keltiring.
   🛠 Amaliy tavsiya: Tadbirkor yoki fuqaro hozir o‘z muammosini hal qilish uchun qadam-baqadam nima qilishi kerakligi bo‘yicha aniq reja (oddiy xalq tilida).

5. HUJJAT SHABLONLARINI YARATISH: Agar foydalanuvchi biror shartnoma, ariza yoki buyruq loyihasini tuzib berishni so‘rasa, O‘zbekiston qonun talablariga mos keladigan professional hujjat shablonini tayyorlab bering va to‘ldirilishi kerak bo‘lgan shaxsiy ma’lumotlar o‘rnini [Ism-sharifingizni yozing] yoki [Sana] kabi kvadrat qavslar ichida qoldiring.

6. OGOHLANTIRISH (Disclaimer): Har bir yirik konsultatsiya va javob yakunida quyidagi gapni majburiy ravishda qo‘shib qo‘ying:
   *"Eslatib o‘taman, ushbu ma’lumot maslahat xarakteriga ega va rasmiy yuridik xulosa o‘rnini bosmaydi."*`;

function getClientIdentifier(req: Request): string {
  const telegramUserId = req.headers['x-telegram-user-id'];
  if (telegramUserId && typeof telegramUserId === 'string') {
    return `tg_${telegramUserId}`;
  }
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded && typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  return req.ip || req.socket.remoteAddress || 'unknown_client';
}

// Global reference for bot controller
let botController: TelegramBotController | null = null;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '9193471217:AAGFiLJ1N6E5-HTgqi5PFRWNio-7m1OkPUs';

// 1. Telegram WebApp InitData Validation Endpoint (never trust initDataUnsafe on client)
app.post('/api/telegram/validate-init-data', (req: Request, res: Response) => {
  const { initData } = req.body;
  if (!initData) {
    return res.status(400).json({ valid: false, error: 'initData talab qilinadi' });
  }

  const result = validateTelegramInitData(initData, TELEGRAM_BOT_TOKEN);
  return res.json(result);
});

// 2. Telegram Webhook Endpoint
app.post('/api/telegram-webhook', async (req: Request, res: Response) => {
  try {
    if (botController && req.body) {
      await botController.handleWebhookUpdate(req.body);
    }
    return res.json({ ok: true });
  } catch (err: any) {
    console.error('Webhook processing error:', err);
    return res.status(500).json({ ok: false, error: err?.message });
  }
});

// 3. User Quota Check Endpoint
app.get('/api/user-quota', (req: Request, res: Response) => {
  const clientId = getClientIdentifier(req);
  const status = getUserQuotaStatus(clientId);
  return res.json(status);
});

// 4. System Status & Metrics Endpoint
app.get('/api/system-stats', (_req: Request, res: Response) => {
  const uptimeSeconds = Math.floor((Date.now() - systemStats.startTime) / 1000);
  return res.json({
    totalQueries: systemStats.totalQueries,
    totalDocumentsGenerated: systemStats.totalDocumentsGenerated,
    uniqueUsersToday: systemStats.uniqueUsersToday.size,
    errorsCount: systemStats.errorsCount,
    uptimeSeconds,
    rateLimitPerMinute: 15,
    dailyFreeQuota: 40,
    botActive: !!botController,
    lexUzSource: 'https://lex.uz (O‘zbekiston Respublikasi Qonun hujjatlari ma’lumotlari milliy bazasi)',
  });
});

// 5. API route for legal consultation (Chat with streaming)
app.post('/api/chat', async (req: Request, res: Response) => {
  const clientId = getClientIdentifier(req);

  // Rate Limiting & Daily Free Quota enforcement
  const quotaCheck = checkRateLimit(clientId);
  if (!quotaCheck.allowed) {
    recordSystemError();
    return res.status(429).json({
      error: quotaCheck.error,
      remainingToday: quotaCheck.remainingToday,
      dailyLimit: quotaCheck.dailyLimit,
    });
  }

  recordSystemQuery(clientId);

  try {
    const { messages, userRole, lang } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Xabarlar ro‘yxati talab qilinadi' });
    }

    // Role-specific enhancement in system prompt context
    let roleContext = '';
    if (userRole === 'tadbirkor') {
      roleContext = '\nFoydalanuvchi: Tadbirkor (MChJ, YaTT yoki korxona rahbari). Biznes xatarlarini minimallashtirish va soliq-mehnat normalariga rioya qilishga urg‘u bering.';
    } else if (userRole === 'buxgalter') {
      roleContext = '\nFoydalanuvchi: Buxgalter yoki moliya mutaxassisi. Soliq hisobotlari, E-faktura, oylik hisoblash va provodkalarga mos qonuniy asoslarni aniq keltiring.';
    } else if (userRole === 'fuqaro') {
      roleContext = '\nFoydalanuvchi: Jismoniy shaxs (fuqaro). Qonunlarni tushunarli, amaliy va sodda xalqona tilda tushuntirib bering.';
    }

    // Language adaptation
    let languageInstruction = '\nMuloqot tili: Faqat o‘zbek tilida, imlo qoidalariga rioya qilgan holda, muloyim va professional ohangda (tadbirkorlik va yuridik tili) javob bering.';
    if (lang === 'ru') {
      languageInstruction = '\nЯзык общения: Отвечайте строго на русском языке, грамотно, вежливо и в профессиональном юридическом стиле законодательства Республики Узбекистан.';
    }

    // Format recent chat history for Gemini API (keep recent messages for speed)
    let validMessages = messages.filter((m: { role: string; content: string }) => m.content && m.content.trim() !== '');
    const firstUserIdx = validMessages.findIndex((m: { role: string }) => m.role === 'user');
    if (firstUserIdx !== -1) {
      validMessages = validMessages.slice(firstUserIdx);
    }
    const recentMessages = validMessages.slice(-8);

    const rawContents = recentMessages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    // Ensure valid alternating roles starting with user
    const normalizedContents: { role: string; parts: { text: string }[] }[] = [];
    for (const msg of rawContents) {
      if (normalizedContents.length === 0) {
        if (msg.role === 'user') {
          normalizedContents.push({ role: msg.role, parts: [{ text: msg.parts[0].text }] });
        }
      } else {
        const last = normalizedContents[normalizedContents.length - 1];
        if (last.role === msg.role) {
          last.parts[0].text += '\n' + msg.parts[0].text;
        } else {
          normalizedContents.push({ role: msg.role, parts: [{ text: msg.parts[0].text }] });
        }
      }
    }

    if (normalizedContents.length === 0) {
      const last = messages.slice().reverse().find((m: { role: string }) => m.role === 'user');
      normalizedContents.push({
        role: 'user',
        parts: [{ text: last ? last.content : 'Assalomu alaykum' }],
      });
    }

    const candidateModels = ['gemini-3.8-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];
    let streamSuccess = false;

    // Get the user's latest query text
    const lastUserMsg = normalizedContents.filter((c) => c.role === 'user').slice(-1)[0];
    const userQueryText = lastUserMsg?.parts[0]?.text || 'huquqiy maslahat';

    for (const modelName of candidateModels) {
      try {
        const streamResponse = await ai.models.generateContentStream({
          model: modelName,
          contents: normalizedContents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION_BASE + roleContext + languageInstruction,
            temperature: 0.2,
            thinkingConfig: {
              thinkingLevel: ThinkingLevel.LOW,
            },
          },
        });

        // Configure response stream SSE with anti-buffering only when generator succeeded
        if (!res.headersSent) {
          res.setHeader('Content-Type', 'text/event-stream');
          res.setHeader('Cache-Control', 'no-cache, no-transform');
          res.setHeader('Connection', 'keep-alive');
          res.setHeader('X-Accel-Buffering', 'no');
          res.flushHeaders();
        }

        for await (const chunk of streamResponse) {
          const text = chunk.text;
          if (text) {
            res.write(`data: ${JSON.stringify({ text })}\n\n`);
            if (typeof (res as any).flush === 'function') {
              (res as any).flush();
            }
          }
        }

        res.write('data: [DONE]\n\n');
        res.end();
        streamSuccess = true;
        break; // Successfully streamed!
      } catch (modelErr: any) {
        console.warn(`Model ${modelName} stream failed: ${modelErr?.message || modelErr}`);
        // If headers already sent, we cannot silently try another model via standard HTTP
        if (res.headersSent) {
          break;
        }
      }
    }

    // If all models failed or hit daily quota limit (429 / RESOURCE_EXHAUSTED)
    if (!streamSuccess) {
      console.log('Falling back to Uzbek Legal Knowledge Base for query:', userQueryText);
      const fallbackText = getLegalConsultationFallback(userQueryText, lang === 'ru' ? 'ru' : 'uz');

      if (!res.headersSent) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache, no-transform');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('X-Accel-Buffering', 'no');
        res.flushHeaders();
      }

      // Stream fallback text smoothly
      const chunks = fallbackText.split(/(?<=\n| )/);
      for (const piece of chunks) {
        if (piece) {
          res.write(`data: ${JSON.stringify({ text: piece })}\n\n`);
          if (typeof (res as any).flush === 'function') {
            (res as any).flush();
          }
          await new Promise((resolve) => setTimeout(resolve, 8));
        }
      }

      res.write('data: [DONE]\n\n');
      res.end();
    }
  } catch (error: any) {
    console.error('Chat error:', error);
    recordSystemError();
    if (!res.headersSent) {
      const fallbackText = getLegalConsultationFallback('huquqiy maslahat', 'uz');
      res.status(200).json({ text: fallbackText });
    } else {
      res.write(`data: ${JSON.stringify({ text: '\n\nLex.uz qonunchilik bazasidan ma’lumotlarni tekshiring.' })}\n\n`);
      res.write('data: [DONE]\n\n');
      res.end();
    }
  }
});

// 6. Dedicated API endpoint for Legal Document Generation
app.post('/api/generate-document', async (req: Request, res: Response) => {
  const clientId = getClientIdentifier(req);
  const quotaCheck = checkRateLimit(clientId);
  if (!quotaCheck.allowed) {
    recordSystemError();
    return res.status(429).json({ error: quotaCheck.error });
  }

  recordDocumentGeneration(clientId);

  try {
    const { documentType, details, partyA, partyB, customClauses, lang } = req.body;

    const docPrompt = `Iltimos, O‘zbekiston Respublikasi amaldagi qonunchiligi talablariga to‘liq javob beruvchi professional hujjat loyihasini (shablonini) tuzib bering:
Hujjat turi: ${documentType}
Tomonlar va ma'lumotlar:
- 1-tomon: ${partyA || '[1-tomon nomi/F.I.SH]'}
- 2-tomon: ${partyB || '[2-tomon nomi/F.I.SH]'}
Qo'shimcha shartlar va mazmun: ${details || 'Standart qonuniy shartlar'}
${customClauses ? `Maxsus bandlar: ${customClauses}` : ''}

QAT'IY TALABLAR:
1. Hujjat O‘zbekiston Respublikasining Fuqarolik, Mehnat yoki Oila kodeksi me'yorlariga qat'iy mos kelsin.
2. To'ldirilishi lozim bo'lgan barcha sanalar, summalar, rekvizitlar va ism-shariflar kvadrat qavsda [shu tarzda] ko'rsatilsin.
3. Hujjat to'liq rasmiy yuridik tuzilishga ega bo'lsin: Preambula, Shartnoma/Ariza predmeti, Huquq va majburiyatlar, Hisob-kitob tartibi, Javobgarlik, Nizolarni hal qilish, Muddat va Tomonlarning rekvizitlari va imzolari.
4. Oxirida rasmiy ogohlantirishni qo'shing:
*"Eslatib o‘taman, ushbu ma’lumot maslahat xarakteriga ega va rasmiy yuridik xulosa o‘rnini bosmaydi."*
${lang === 'ru' ? 'Hujjatni to‘liq rus tilida (на русском языке) tayyorlang.' : 'Hujjatni o‘zbek tilida tayyorlang.'}`;

    const candidateModels = ['gemini-3.8-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];
    let generatedDoc = '';

    for (const model of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: docPrompt,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION_BASE,
            temperature: 0.1,
            thinkingConfig: {
              thinkingLevel: ThinkingLevel.LOW,
            },
          },
        });
        if (response.text) {
          generatedDoc = response.text;
          break;
        }
      } catch (gemErr: any) {
        console.warn(`Doc gen model ${model} failed, trying next:`, gemErr?.message);
      }
    }

    if (!generatedDoc) {
      console.log('Using fallback legal document template for:', documentType);
      generatedDoc = generateFallbackDocument(
        documentType || 'ariza',
        partyA || '',
        partyB || '',
        details || '',
        customClauses || '',
        lang === 'ru' ? 'ru' : 'uz'
      );
    }

    return res.json({ document: generatedDoc });
  } catch (error: any) {
    console.error('Doc gen error:', error);
    recordSystemError();
    const fallback = generateFallbackDocument('ariza', '', '', '', '', 'uz');
    return res.json({ document: fallback });
  }
});

// Setup Vite for development or express.static for production
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);

    // Start Telegram Bot
    const WEB_APP_URL = process.env.APP_URL || 'https://ais-pre-mzycga5xfovaf4lffd4po2-94880895649.asia-east1.run.app';

    if (TELEGRAM_BOT_TOKEN) {
      try {
        botController = startTelegramBot(TELEGRAM_BOT_TOKEN, ai, SYSTEM_INSTRUCTION_BASE, WEB_APP_URL);
      } catch (err) {
        console.error('Failed to start Telegram bot:', err);
      }
    }
  });
}

startServer();
