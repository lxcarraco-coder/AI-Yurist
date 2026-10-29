import React from 'react';
import { Scale, FileCheck2, Calculator, BookOpen, Activity } from 'lucide-react';
import { ActiveTab } from './Header';
import { Language, translations } from '../locales/i18n';
import { triggerHaptic } from '../services/telegramWebApp';

interface Props {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  lang: Language;
}

export const MobileBottomNav: React.FC<Props> = ({ activeTab, setActiveTab, lang }) => {
  const t = translations[lang];

  const handleSelect = (tab: ActiveTab) => {
    triggerHaptic('light');
    setActiveTab(tab);
  };

  const navItems = [
    { id: 'chat' as ActiveTab, label: t.navChat, icon: Scale },
    { id: 'docs' as ActiveTab, label: t.navDocs, icon: FileCheck2 },
    { id: 'calculators' as ActiveTab, label: t.navCalc, icon: Calculator },
    { id: 'knowledge' as ActiveTab, label: t.navLaws, icon: BookOpen },
    { id: 'stats' as ActiveTab, label: lang === 'uz' ? 'Tizim' : 'Статус', icon: Activity },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-t border-slate-200 dark:border-slate-800 pb-[env(safe-area-inset-bottom,0px)] px-2 py-1 shadow-lg">
      <div className="grid grid-cols-5 gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition ${
                isActive
                  ? 'text-sky-600 dark:text-sky-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
              <span className="text-[10px] tracking-tight truncate max-w-full">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
