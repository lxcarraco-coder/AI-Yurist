import React, { useState, useEffect } from 'react';
import { Header, ActiveTab } from './components/Header';
import { ChatTab } from './components/ChatTab';
import { DocumentBuilderTab } from './components/DocumentBuilderTab';
import { CalculatorsTab } from './components/CalculatorsTab';
import { KnowledgeBaseTab } from './components/KnowledgeBaseTab';
import { StatsAndSetupTab } from './components/StatsAndSetupTab';
import { DisclaimerModal } from './components/DisclaimerModal';
import { UserProfileModal } from './components/UserProfileModal';
import { PlansModal } from './components/PlansModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Scale, ExternalLink, ShieldCheck, Sparkles, User, ArrowRight } from 'lucide-react';
import { Language, translations } from './locales/i18n';
import { initTelegramWebApp } from './services/telegramWebApp';
import { UserProfile } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('chat');
  const [docInitialText, setDocInitialText] = useState<string>('');
  const [showDisclaimer, setShowDisclaimer] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [showPlansModal, setShowPlansModal] = useState<boolean>(false);
  const [remainingQuota, setRemainingQuota] = useState<number>(40);

  // User Profile linked with Telegram Bot registration
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Language state: 'uz' default, or saved, or from Telegram
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('ai_yurist_lang');
    if (saved === 'ru' || saved === 'uz') return saved;
    return 'uz';
  });

  // Telegram WebApp states
  const [telegramUser, setTelegramUser] = useState<{ id: number; first_name: string; username?: string } | null>(null);
  const [telegramInitData, setTelegramInitData] = useState<string>('');
  const [isInsideTelegram, setIsInsideTelegram] = useState<boolean>(false);

  // Fetch or sync user profile
  const fetchUserProfile = (tgId?: number | string) => {
    const id = tgId || telegramUser?.id;
    const headers: Record<string, string> = {};
    if (id) {
      headers['x-telegram-user-id'] = String(id);
    }

    fetch(`/api/user/profile?telegramId=${id || ''}`, { headers })
      .then((r) => r.json())
      .then((data) => {
        if (data.registered && data.user) {
          setUserProfile(data.user);
        }
        if (data.quota?.remainingToday !== undefined) {
          setRemainingQuota(data.quota.remainingToday);
        }
      })
      .catch((err) => console.warn('User profile fetch error:', err));
  };

  // Initialize Telegram WebApp on mount
  useEffect(() => {
    const tgData = initTelegramWebApp();
    setIsInsideTelegram(tgData.isInsideTelegram);

    if (tgData.user) {
      setTelegramUser(tgData.user);
      // Auto-detect language if Russian
      const tgLang = (window.Telegram?.WebApp?.initDataUnsafe?.user as any)?.language_code;
      if (tgLang && tgLang.startsWith('ru') && !localStorage.getItem('ai_yurist_lang')) {
        setLang('ru');
      }
      fetchUserProfile(tgData.user.id);
    } else {
      fetchUserProfile();
    }

    if (tgData.initData) {
      setTelegramInitData(tgData.initData);

      // Validate initData with backend
      fetch('/api/telegram/validate-init-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ initData: tgData.initData }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.valid && data.user) {
            setTelegramUser(data.user);
            fetchUserProfile(data.user.id);
          }
        })
        .catch((err) => console.warn('InitData validation error:', err));
    }

    // Fetch initial user quota
    const headers: Record<string, string> = {};
    if (tgData.user?.id) {
      headers['x-telegram-user-id'] = String(tgData.user.id);
    }
    if (tgData.initData) {
      headers['x-telegram-init-data'] = tgData.initData;
    }

    fetch('/api/user-quota', { headers })
      .then((r) => r.json())
      .then((d) => {
        if (d.remainingToday !== undefined) {
          setRemainingQuota(d.remainingToday);
        }
      })
      .catch(() => {});
  }, []);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('ai_yurist_lang', newLang);
  };

  const handleOpenInDocBuilder = (text: string) => {
    setDocInitialText(text);
    setActiveTab('docs');
  };

  const handleAskQuestionAboutCode = (_codeTitle: string) => {
    setActiveTab('chat');
  };

  const t = translations[lang];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-sky-500/20 selection:text-sky-700">
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onShowDisclaimer={() => setShowDisclaimer(true)}
        lang={lang}
        setLang={handleSetLang}
        user={userProfile}
        onOpenProfile={() => setShowProfileModal(true)}
        onOpenPlans={() => setShowPlansModal(true)}
        remainingQuota={remainingQuota}
      />

      {/* Unregistered user banner if opened directly in browser or without bot contact */}
      {!userProfile && !isInsideTelegram && (
        <div className="bg-gradient-to-r from-sky-900 via-indigo-950 to-slate-900 text-white py-2.5 px-4 border-b border-sky-800 text-xs">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                Telegram botimizda <strong>/start</strong> bosib, telefon raqamingizni tasdiqlang va shaxsiy hisobingizga ega bo‘ling!
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href="https://t.me/shaxsiy_yuristimbot"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-full bg-sky-500 hover:bg-sky-400 text-white font-semibold text-[11px] flex items-center gap-1 transition"
              >
                ✈️ Botda ro‘yxatdan o‘tish
                <ArrowRight className="w-3 h-3" />
              </a>
              <button
                onClick={() => setShowProfileModal(true)}
                className="px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium transition"
              >
                Saytda ro‘yxatdan o‘tish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 pb-16 md:pb-10">
        {activeTab === 'chat' && (
          <ChatTab
            onOpenInDocBuilder={handleOpenInDocBuilder}
            lang={lang}
            telegramUserId={telegramUser?.id}
            telegramInitData={telegramInitData}
            onQuotaUpdate={(rem) => setRemainingQuota(rem)}
          />
        )}

        {activeTab === 'docs' && (
          <DocumentBuilderTab
            initialDocumentText={docInitialText}
            onClearInitialText={() => setDocInitialText('')}
            lang={lang}
            user={userProfile}
            onOpenProfile={() => setShowProfileModal(true)}
            telegramUserId={telegramUser?.id}
          />
        )}

        {activeTab === 'calculators' && <CalculatorsTab />}

        {activeTab === 'knowledge' && (
          <KnowledgeBaseTab onAskQuestionAboutCode={handleAskQuestionAboutCode} />
        )}

        {activeTab === 'stats' && <StatsAndSetupTab lang={lang} />}
      </main>

      {/* Footer for Desktop */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 px-4 text-xs text-slate-500 hidden md:block">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-sky-600" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              YURIST AI © {new Date().getFullYear()}
            </span>
            <span>—</span>
            <span>{lang === 'uz' ? 'O‘zbekiston Qonunchiligi Huquqiy Axborot Tizimi' : 'Правовая информационная система РУз'}</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a
              href="https://lex.uz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-600 hover:underline flex items-center gap-1"
            >
              Lex.uz
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <a
              href="https://t.me/shaxsiy_yuristimbot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-600 hover:underline flex items-center gap-1 font-medium"
            >
              Telegram Bot (@shaxsiy_yuristimbot)
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>•</span>
            <button
              onClick={() => setShowPlansModal(true)}
              className="text-amber-600 dark:text-amber-400 hover:underline font-semibold"
            >
              Tariflar
            </button>
            <span>•</span>
            <button
              onClick={() => setShowDisclaimer(true)}
              className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            >
              {t.disclaimerBtn}
            </button>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar (also for Telegram Mini App) */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
      />

      {/* Legal Disclaimer Modal */}
      <DisclaimerModal
        isOpen={showDisclaimer}
        onClose={() => setShowDisclaimer(false)}
      />

      {/* User Profile & Documents Modal */}
      <UserProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        user={userProfile}
        onUserUpdate={(u) => setUserProfile(u)}
        lang={lang}
        onLoadDocument={(content) => {
          setDocInitialText(content);
          setActiveTab('docs');
        }}
        onOpenPlans={() => setShowPlansModal(true)}
        telegramUserId={telegramUser?.id}
      />

      {/* Plans & Pricing Modal */}
      <PlansModal
        isOpen={showPlansModal}
        onClose={() => setShowPlansModal(false)}
        currentPlan={userProfile?.plan || 'free'}
        lang={lang}
      />
    </div>
  );
}
