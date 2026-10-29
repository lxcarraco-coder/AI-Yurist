import React from 'react';
import { Scale, BookOpen, FileCheck2, Calculator, ShieldCheck, ExternalLink, Activity, Languages, Sparkles } from 'lucide-react';
import { LEGAL_INDICATORS } from '../data/legalData';
import { Language, translations } from '../locales/i18n';
import { triggerHaptic } from '../services/telegramWebApp';

export type ActiveTab = 'chat' | 'docs' | 'calculators' | 'knowledge' | 'stats';

interface Props {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onShowDisclaimer: () => void;
  lang: Language;
  setLang: (l: Language) => void;
  telegramUser?: { first_name: string; username?: string } | null;
  remainingQuota?: number;
}

export const Header: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  onShowDisclaimer,
  lang,
  setLang,
  telegramUser,
  remainingQuota = 40,
}) => {
  const t = translations[lang];

  const handleTabChange = (tab: ActiveTab) => {
    triggerHaptic('light');
    setActiveTab(tab);
  };

  const handleLangToggle = () => {
    triggerHaptic('light');
    setLang(lang === 'uz' ? 'ru' : 'uz');
  };

  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur sticky top-0 z-40 transition-colors">
      {/* Top benchmark ticker bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-medium text-emerald-400 flex items-center gap-1.5 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {lang === 'uz' ? 'O‘zbekiston Qonunchilik Me’yorlari:' : 'Нормативы законодательства РУз:'}
            </span>
            {LEGAL_INDICATORS.slice(0, 3).map((item) => (
              <span key={item.id} className="text-slate-300 hidden md:inline-block text-[11px]">
                <span className="text-slate-400">{item.shortName}:</span>{' '}
                <strong className="text-white font-semibold">{item.value}</strong>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            {/* Free quota pill */}
            <span className="text-[11px] text-amber-300 bg-amber-950/70 border border-amber-800/80 px-2 py-0.5 rounded-full hidden sm:inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              {t.quotaLabel} <strong className="text-white">{remainingQuota}/40</strong>
            </span>

            {/* Telegram User or Bot link */}
            {telegramUser ? (
              <span className="text-sky-300 text-[11px] bg-sky-950/80 border border-sky-800 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                👤 {telegramUser.first_name}
              </span>
            ) : (
              <a
                href="https://t.me/shaxsiy_yuristimbot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-300 hover:text-white flex items-center gap-1 text-[11px] bg-sky-950 border border-sky-700/80 px-2 py-0.5 rounded-full transition font-medium"
              >
                ✈️ @shaxsiy_yuristimbot
              </a>
            )}

            <span className="text-slate-600">|</span>

            {/* Language Switcher */}
            <button
              onClick={handleLangToggle}
              className="text-[11px] font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 px-2 py-0.5 rounded flex items-center gap-1 transition"
              title="Tilni o‘zgartirish / Сменить язык"
            >
              <Languages className="w-3 h-3 text-sky-400" />
              <span>{lang === 'uz' ? 'UZ' : 'RU'}</span>
            </button>

            <span className="text-slate-600 hidden sm:inline">|</span>

            <button
              onClick={onShowDisclaimer}
              className="text-amber-400 hover:text-amber-300 hidden sm:flex items-center gap-1 text-[11px] transition"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              {t.disclaimerBtn}
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => handleTabChange('chat')}
            className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-700 via-indigo-700 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-sky-900/20 cursor-pointer"
          >
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1
                onClick={() => handleTabChange('chat')}
                className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5 cursor-pointer"
              >
                {t.appName}
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  {t.badgeExp}
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-1 hidden sm:block">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Navigation Tabs (Desktop/Tablet) */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            onClick={() => handleTabChange('chat')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'chat'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>{t.navChat}</span>
          </button>

          <button
            onClick={() => handleTabChange('docs')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'docs'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span>{t.navDocs}</span>
          </button>

          <button
            onClick={() => handleTabChange('calculators')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'calculators'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>{t.navCalc}</span>
          </button>

          <button
            onClick={() => handleTabChange('knowledge')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'knowledge'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{t.navLaws}</span>
          </button>

          <button
            onClick={() => handleTabChange('stats')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'stats'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>{t.navStats}</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
