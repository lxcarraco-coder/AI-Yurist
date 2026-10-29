import React from 'react';
import { ShieldAlert, Check } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const DisclaimerModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Rasmiy Yuridik Ogohlantirish (Disclaimer)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              AI-Yurist xizmatidan foydalanish shartlari
            </p>
          </div>
        </div>

        <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          <p className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800 font-medium text-amber-900 dark:text-amber-200">
            «Eslatib o‘taman, ushbu ma’lumot maslahat xarakteriga ega va rasmiy yuridik xulosa o‘rnini bosmaydi.»
          </p>
          <p>
            1. <strong>Axborot maqsadi:</strong> Mazkur AI tizimi O‘zbekiston Respublikasi amaldagi qonun hujjatlari (kodekslar, qonunlar, Lex.uz qarorlari) asosida axborot va dastlabki huquqiy yo‘naltirish berish uchun yaratilgan.
          </p>
          <p>
            2. <strong>Sud va tergov organlari:</strong> Sud, huquqni muhofaza qiluvchi organlar yoki davlat idoralarida rasmiy dalil yoki advokat xulosasi sifatida amaldagi advokatlik yoki notarial xizmatlardan foydalanish tavsiya etiladi.
          </p>
          <p>
            3. <strong>Qonunchilik dinamikasi:</strong> O‘zbekiston qonunchiligiga muntazam kiritilayotgan so‘nggi o‘zgarishlarni bevosita O‘zbekiston Respublikasi Adliya vazirligining rasmiy <strong>Lex.uz</strong> portali orqali tekshirib borishingiz maqsadga muvofiq.
          </p>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 dark:bg-sky-600 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs transition"
          >
            <Check className="w-4 h-4" />
            Tushundim va qabul qilaman
          </button>
        </div>
      </div>
    </div>
  );
};
