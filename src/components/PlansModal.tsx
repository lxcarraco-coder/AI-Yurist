import React, { useState } from 'react';
import { SubscriptionPlan } from '../types';
import { Check, Sparkles, Crown, Zap, Shield, X, CreditCard, AlertCircle } from 'lucide-react';
import { Language } from '../locales/i18n';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentPlan?: 'free' | 'standard' | 'professional';
  lang?: Language;
}

export const PlansModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentPlan = 'free',
  lang = 'uz',
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'standard' | 'professional'>(currentPlan);
  const [showPaymentNotice, setShowPaymentNotice] = useState(false);

  if (!isOpen) return null;

  const plans: SubscriptionPlan[] = [
    {
      id: 'free',
      name: 'Bepul',
      price: 0,
      currency: 'so‘m',
      period: 'Doimiy',
      badge: 'Boshlang‘ich',
      features: [
        'Kunlik 40 ta huquqiy savol-javob',
        '10 xil rasmiy qonuniy shablonlar',
        'Lex.uz me’yorlari va moddalar bazasi',
        'Kalkulyatorlar (Jarimalar, Ta’til, Aliment)',
        'Telegram Mini App orqali foydalanish',
      ],
      isCurrent: currentPlan === 'free',
    },
    {
      id: 'standard',
      name: 'Standart',
      price: 49000,
      currency: 'so‘m',
      period: 'oyiga',
      badge: 'Ommabop',
      features: [
        'Cheksiz sun’iy intellekt huquqiy tahlili',
        'Barcha shartnomalar va sud da’volarini tuzish',
        'Word (.docx) formatida yuklab olish',
        'Shaxsiy hisobda cheksiz hujjat saqlash',
        'Tezkor yuqori ustuvorlikdagi javoblar',
      ],
      isCurrent: currentPlan === 'standard',
      paymentReady: true,
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 99000,
      currency: 'so‘m',
      period: 'oyiga',
      badge: 'Biznes va Yuristlar',
      features: [
        'Standart tarifdagi barcha imkoniyatlar',
        'Tadbirkorlik va MChJ shartnomalari yuridik auditi',
        'Soliq va mehnat nizolari bo‘yicha chuqur tahlil',
        '24/7 shaxsiy AI yordamchi',
        'Ekspert tekshiruvi tavsiyalari',
      ],
      isCurrent: currentPlan === 'professional',
      paymentReady: true,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/40">
                <Crown className="w-4 h-4" />
              </span>
              <h3 className="font-bold text-lg sm:text-xl">
                Yurist AI Tariflari va Xizmatlari
              </h3>
            </div>
            <p className="text-xs text-sky-200/80 mt-1">
              O‘zbekiston qonunchiligi bo‘yicha professional huquqiy yordam rejalari
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free mode notice */}
        <div className="bg-emerald-50 dark:bg-emerald-950/40 border-b border-emerald-200 dark:border-emerald-800/60 px-6 py-2.5 flex items-center gap-2.5 text-xs text-emerald-800 dark:text-emerald-300">
          <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>
            <strong>Hozirda barcha funksiyalar bepul taqdim etilmoqda!</strong> Kelgusida Payme va Click orqali premium xizmatlar ulanadi.
          </span>
        </div>

        {/* Plan Cards Grid */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {plans.map((plan) => {
              const isSelected = selectedPlan === plan.id;
              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative rounded-2xl p-5 border-2 flex flex-col justify-between transition cursor-pointer ${
                    isSelected
                      ? 'border-sky-600 bg-sky-50/40 dark:bg-sky-950/30 shadow-lg'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                  }`}
                >
                  {/* Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {plan.badge}
                    </span>
                    {plan.isCurrent && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                        Joriy
                      </span>
                    )}
                  </div>

                  {/* Title & Price */}
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                      {plan.name}
                    </h4>

                    <div className="mt-3 mb-4">
                      <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                        {plan.price.toLocaleString()}
                      </span>{' '}
                      <span className="text-xs text-slate-500 font-medium">
                        {plan.currency} / {plan.period}
                      </span>
                    </div>

                    {/* Features list */}
                    <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 pt-3 border-t border-slate-100 dark:border-slate-800">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action button */}
                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowPaymentNotice(true);
                      }}
                      className={`w-full py-2.5 rounded-xl text-xs font-semibold transition ${
                        plan.isCurrent
                          ? 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                          : isSelected
                          ? 'bg-sky-600 hover:bg-sky-500 text-white shadow-md'
                          : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-900 dark:text-white'
                      }`}
                    >
                      {plan.isCurrent ? 'Faol tarif' : 'Tanlash'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Payment Gateways Bar */}
          <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-sky-600" />
              <span>To‘lov usullari (kelgusida ulanadi):</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300">
              <span className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600">
                Payme
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600">
                Click
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600">
                Uzum Bank
              </span>
            </div>
          </div>

          {showPaymentNotice && (
            <div className="mt-4 p-4 rounded-xl bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800 text-xs text-sky-800 dark:text-sky-300 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-0.5">Xabarnoma:</p>
                <p className="leading-relaxed">
                  Hozirgi bosqichda tizim foydalanuvchilar uchun <strong>to‘liq bepul</strong> xizmat qilmoqda. Siz barcha shartnoma shablonlari va huquqiy maslahatlardan erkin foydalanishingiz mumkin. Pullik servislar faollashganda bot orqali xabar beriladi.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
