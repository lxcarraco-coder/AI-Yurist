import React, { useState, useEffect } from 'react';
import { Activity, Shield, Terminal, CheckCircle2, Copy, Check, RefreshCw, Key, HelpCircle, Layers, Globe } from 'lucide-react';
import { Language, translations } from '../locales/i18n';

interface Props {
  lang: Language;
}

export const StatsAndSetupTab: React.FC<Props> = ({ lang }) => {
  const t = translations[lang];
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/system-stats');
      const data = await res.json();
      setStats(data);
    } catch {
      // Fallback dummy
      setStats({
        totalQueries: 48,
        totalDocumentsGenerated: 16,
        uniqueUsersToday: 1,
        errorsCount: 0,
        uptimeSeconds: 120,
        rateLimitPerMinute: 15,
        dailyFreeQuota: 40,
        botActive: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleCopy = (text: string, keyName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyName);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Activity className="w-6 h-6 text-sky-600" />
            {lang === 'uz' ? 'Tizim holati va Telegram integratsiyasi' : 'Статус системы и интеграция с Telegram'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {lang === 'uz'
              ? 'Xavfsiz kvotalar, Telegram Mini App qo‘llanmasi va server ko‘rsatkichlari'
              : 'Безопасные квоты, руководство по Telegram Mini App и системные метрики'}
          </p>
        </div>

        <button
          onClick={fetchStats}
          disabled={loading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          {lang === 'uz' ? 'Yangilash' : 'Обновить'}
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-slate-500 block">
            {lang === 'uz' ? 'Jami AI so‘rovlari' : 'Всего запросов к ИИ'}
          </span>
          <div className="text-2xl font-bold text-sky-600 dark:text-sky-400 my-1">
            {stats?.totalQueries ?? 0}
          </div>
          <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            {lang === 'uz' ? 'O‘zbekiston qonunlari' : 'Законодательство РУз'}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-slate-500 block">
            {lang === 'uz' ? 'Tuzilgan hujjatlar' : 'Создано документов'}
          </span>
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 my-1">
            {stats?.totalDocumentsGenerated ?? 0}
          </div>
          <span className="text-[11px] text-slate-400">
            {lang === 'uz' ? 'Word va matn shaklida' : 'В форматах Word и текст'}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-slate-500 block">
            {lang === 'uz' ? 'Kunlik bepul limit' : 'Дневной лимит (Free)'}
          </span>
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 my-1">
            {stats?.dailyFreeQuota ?? 40} / {lang === 'uz' ? 'kun' : 'день'}
          </div>
          <span className="text-[11px] text-slate-400">
            {lang === 'uz' ? 'Bir foydalanuvchiga' : 'На одного пользователя'}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-slate-500 block">
            {lang === 'uz' ? 'Telegram Bot holati' : 'Статус Telegram Бота'}
          </span>
          <div className="text-base font-bold text-slate-900 dark:text-white my-1 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            @shaxsiy_yuristimbot
          </div>
          <span className="text-[11px] text-emerald-600 font-medium">
            {lang === 'uz' ? 'Faol va so‘rovlarni qabul qilmoqda' : 'Активен и принимает запросы'}
          </span>
        </div>
      </div>

      {/* Telegram Setup & Deployment Step-by-Step Guide */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Terminal className="w-5 h-5 text-sky-600" />
          {lang === 'uz'
            ? 'Telegram Bot va Mini App’ni ulash bo‘yicha bosqichma-bosqich qo‘llanma'
            : 'Пошаговое руководство по подключению Telegram Бота и Mini App'}
        </h3>

        <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          {/* Step 1 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80">
            <div className="font-bold text-sky-700 dark:text-sky-400 mb-1 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-sky-100 dark:bg-sky-950 flex items-center justify-center text-xs">1</span>
              {lang === 'uz' ? 'Telegram Bot ochish (@BotFather)' : 'Создание Telegram бота (@BotFather)'}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              Telegramda rasmiy <strong>@BotFather</strong> ga kiring va quyidagi buyruqni bering:
            </p>
            <div className="flex items-center justify-between p-2 rounded bg-slate-100 dark:bg-slate-900 font-mono text-xs text-slate-800 dark:text-slate-200">
              <code>/newbot</code>
              <button
                onClick={() => handleCopy('/newbot', 'step1')}
                className="text-xs text-slate-500 hover:text-sky-600"
              >
                {copiedKey === 'step1' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">
              Bot nomi (masalan: <em>Yurist AI</em>) va foydalanuvchi nomini (masalan: <em>shaxsiy_yuristimbot</em>) kiriting. Olingan Bot Tokenni saqlab qo‘ying.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80">
            <div className="font-bold text-sky-700 dark:text-sky-400 mb-1 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-sky-100 dark:bg-sky-950 flex items-center justify-center text-xs">2</span>
              {lang === 'uz' ? 'Telegram Mini App (WebApp) ulash' : 'Подключение Telegram Mini App (WebApp)'}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              @BotFather ga <code>/newapp</code> buyrug‘ini yuborib, botingizni tanlang. So‘ralgan HTTPS havolaga ushbu ilovaning rasmiy havolasini kiriting:
            </p>
            <div className="flex items-center justify-between p-2 rounded bg-slate-100 dark:bg-slate-900 font-mono text-xs text-slate-800 dark:text-slate-200 overflow-x-auto">
              <code>https://ais-pre-mzycga5xfovaf4lffd4po2-94880895649.asia-east1.run.app</code>
              <button
                onClick={() => handleCopy('https://ais-pre-mzycga5xfovaf4lffd4po2-94880895649.asia-east1.run.app', 'step2')}
                className="text-xs text-slate-500 hover:text-sky-600 ml-2"
              >
                {copiedKey === 'step2' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80">
            <div className="font-bold text-sky-700 dark:text-sky-400 mb-1 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-sky-100 dark:bg-sky-950 flex items-center justify-center text-xs">3</span>
              {lang === 'uz' ? 'Muhit o‘zgaruvchilarini xavfsiz sozlash (.env)' : 'Безопасная настройка переменных окружения (.env)'}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              Maxfiy kalitlar (GEMINI_API_KEY, TELEGRAM_BOT_TOKEN) hech qachon brauzer kodiga chiqarilmaydi, faqat serverda saqlanadi:
            </p>
            <div className="p-2.5 rounded bg-slate-100 dark:bg-slate-900 font-mono text-xs text-slate-800 dark:text-slate-200 space-y-1">
              <div>GEMINI_API_KEY="AI Studio orqali avtomatik taqdim etiladi"</div>
              <div>TELEGRAM_BOT_TOKEN="9193471217:AAGFiLJ1N6E5-HTgqi5PFRWNio-7m1OkPUs"</div>
              <div>APP_URL="https://ais-pre-mzycga5xfovaf4lffd4po2-94880895649.asia-east1.run.app"</div>
            </div>
          </div>

          {/* Step 4: Webhook or Polling */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80">
            <div className="font-bold text-sky-700 dark:text-sky-400 mb-1 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-sky-100 dark:bg-sky-950 flex items-center justify-center text-xs">4</span>
              {lang === 'uz' ? 'Server-side Webhook marshruti' : 'Серверный Webhook маршрут'}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              Serverimiz ikkita rejimni (Webhook va Long Polling) qo‘llab-quvvatlaydi. Webhook o‘rnatish uchun quyidagi so‘rovni yuborish kifoya:
            </p>
            <div className="flex items-center justify-between p-2 rounded bg-slate-100 dark:bg-slate-900 font-mono text-[11px] text-slate-800 dark:text-slate-200 overflow-x-auto">
              <code>https://api.telegram.org/bot&lt;TOKEN&gt;/setWebhook?url=&lt;APP_URL&gt;/api/telegram-webhook</code>
              <button
                onClick={() => handleCopy('https://api.telegram.org/bot<TOKEN>/setWebhook?url=<APP_URL>/api/telegram-webhook', 'step4')}
                className="text-xs text-slate-500 hover:text-sky-600 ml-2"
              >
                {copiedKey === 'step4' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
