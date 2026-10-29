import React, { useState } from 'react';
import { Calculator, Percent, Calendar, DollarSign, Scale, AlertCircle, CheckCircle2 } from 'lucide-react';
import { LEGAL_INDICATORS } from '../data/legalData';

export const CalculatorsTab: React.FC = () => {
  const [activeCalc, setActiveCalc] = useState<'jarima' | 'tatil' | 'aliment' | 'davlat_boji'>('jarima');

  // 1. Jarima chegirmasi state
  const [fineAmount, setFineAmount] = useState<number>(375000); // 1 BHM default
  const [decisionDate, setDecisionDate] = useState<string>(() => new Date().toISOString().slice(0, 10));

  // 2. Ta'til kompensatsiyasi state
  const [monthlySalary, setMonthlySalary] = useState<number>(5000000);
  const [workedMonths, setWorkedMonths] = useState<number>(10);
  const [vacationDaysPerYear, setVacationDaysPerYear] = useState<number>(21); // MK 217 min 21 days
  const [usedVacationDays, setUsedVacationDays] = useState<number>(0);

  // 3. Aliment kalkulyatori state
  const [parentIncome, setParentIncome] = useState<number>(6000000);
  const [childrenCount, setChildrenCount] = useState<number>(1);

  // 4. Davlat boji state
  const [claimAmount, setClaimAmount] = useState<number>(50000000);
  const [courtType, setCourtType] = useState<'iqtisodiy' | 'fuqarolik'>('iqtisodiy');

  // BHM value: 375 000 so'm
  const BHM_VALUE = 375000;

  // Jarima calculations
  const fineDiscount50 = fineAmount * 0.5;
  const fineDiscount70 = fineAmount * 0.7;
  const dDate = new Date(decisionDate);
  const deadline15 = new Date(dDate);
  deadline15.setDate(deadline15.getDate() + 15);
  const deadline30 = new Date(dDate);
  deadline30.setDate(deadline30.getDate() + 30);

  // Ta'til kompensatsiyasi calculations
  // Qonunchilikka ko'ra 21 kun / 12 oy = oyiga 1.75 kalendar kun
  const earnedDays = Math.round(((vacationDaysPerYear / 12) * workedMonths) * 10) / 10;
  const unusedDays = Math.max(0, earnedDays - usedVacationDays);
  // Bir kunlik o'rtacha ish haqi: oylik / 25.4 (yoki 29.6 kalendar)
  const dailyRate = monthlySalary / 25.4;
  const vacationCompensation = Math.round(unusedDays * dailyRate);

  // Aliment calculations
  let alimentRate = 0.25;
  if (childrenCount === 2) alimentRate = 0.3333;
  else if (childrenCount >= 3) alimentRate = 0.5;
  const alimentSum = Math.round(parentIncome * alimentRate);
  // Qonun bo'yicha har bir bola uchun eng kam aliment MHTEKMning 26.5 foizidan kam bo'lmasligi kerak
  const minPerChild = Math.round(1155000 * 0.265);
  const totalMinAliment = minPerChild * childrenCount;

  // Davlat boji calculations ("Davlat boji to'g'risida"gi qonun)
  let courtDuty = 0;
  if (courtType === 'iqtisodiy') {
    // Iqtisodiy sud: da'vo bahosining 2 foizi, lekin BHMning 1 baravaridan kam bo'lmagan
    courtDuty = Math.max(BHM_VALUE, Math.round(claimAmount * 0.02));
  } else {
    // Fuqarolik sudi: da'vo bahosining 4 foizi, lekin BHMning 1 baravaridan kam bo'lmagan
    courtDuty = Math.max(BHM_VALUE, Math.round(claimAmount * 0.04));
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Calculator className="w-6 h-6 text-sky-600" />
          O‘zbekiston Qonunchiligi Huquqiy Kalkulyatorlari
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          MJtK jarimalaridagi 50% chegirma, yangi Mehnat kodeksi bo‘yicha ta’tillar, aliment va sud bojlari hisobi
        </p>
      </div>

      {/* Calculator Navigation Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <button
          onClick={() => setActiveCalc('jarima')}
          className={`p-3.5 rounded-xl border text-left transition ${
            activeCalc === 'jarima'
              ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-200 shadow-sm'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <Percent className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-xs sm:text-sm">50% Jarima chegirmasi</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">MJtK 332-1-moddasi</p>
        </button>

        <button
          onClick={() => setActiveCalc('tatil')}
          className={`p-3.5 rounded-xl border text-left transition ${
            activeCalc === 'tatil'
              ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-200 shadow-sm'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-4 h-4 text-sky-600" />
            <span className="font-bold text-xs sm:text-sm">Mehnat ta’tili hisobi</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Yangi MK 217-modda (21 kun)</p>
        </button>

        <button
          onClick={() => setActiveCalc('aliment')}
          className={`p-3.5 rounded-xl border text-left transition ${
            activeCalc === 'aliment'
              ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-200 shadow-sm'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-amber-600" />
            <span className="font-bold text-xs sm:text-sm">Aliment miqdori</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Oila kodeksi 99-moddasi</p>
        </button>

        <button
          onClick={() => setActiveCalc('davlat_boji')}
          className={`p-3.5 rounded-xl border text-left transition ${
            activeCalc === 'davlat_boji'
              ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-200 shadow-sm'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <Scale className="w-4 h-4 text-indigo-600" />
            <span className="font-bold text-xs sm:text-sm">Sud davlat boji</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Iqtisodiy & Fuqarolik sudi</p>
        </button>
      </div>

      {/* CALCULATOR 1: JARIMA 50% CHEGIRMA */}
      {activeCalc === 'jarima' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Percent className="w-5 h-5 text-emerald-600" />
              Jarima ma’lumotlarini kiriting
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Jarima to‘g‘risidagi qaror topshirilgan sana *
              </label>
              <input
                type="date"
                value={decisionDate}
                onChange={(e) => setDecisionDate(e.target.value)}
                className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Jarima summasi (so‘mda) *
              </label>
              <input
                type="number"
                step="1000"
                value={fineAmount}
                onChange={(e) => setFineAmount(Number(e.target.value))}
                className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold"
              />
            </div>

            {/* Quick BHM presets */}
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">
                Tezkor BHM karralari:
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: '0.5 BHM', val: BHM_VALUE * 0.5 },
                  { label: '1 BHM', val: BHM_VALUE * 1 },
                  { label: '2 BHM', val: BHM_VALUE * 2 },
                  { label: '5 BHM', val: BHM_VALUE * 5 },
                  { label: '10 BHM', val: BHM_VALUE * 10 },
                ].map((bhm) => (
                  <button
                    key={bhm.label}
                    onClick={() => setFineAmount(bhm.val)}
                    className="text-xs px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-md transition"
                  >
                    {bhm.label} ({bhm.val.toLocaleString()} so‘m)
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                <strong>MJtK 332-1-moddasi:</strong> Huquqbuzar jarima solish to‘g‘risidagi qaror topshirilgan kundan e’tiboran 15 kun ichida jarima miqdorining 50 foizini to‘lasa, qolgan 50 foizini to‘lashdan ozod qilinadi.
              </span>
            </div>
          </div>

          {/* Results Card */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between">
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-4">
                Hisob-kitob natijalari
              </h4>

              {/* 50% discount box */}
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                    15 kun ichida to‘lansa (50% chegirma):
                  </span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded">
                    50% tejash
                  </span>
                </div>
                <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                  {fineDiscount50.toLocaleString()} so‘m
                </div>
                <div className="text-xs text-emerald-700/80 dark:text-emerald-300/80 mt-1">
                  Oxirgi to‘lov muddati: <strong>{deadline15.toLocaleDateString('uz-UZ')}</strong> gacha
                </div>
              </div>

              {/* 70% discount box */}
              <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-300 dark:border-sky-800 mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-sky-800 dark:text-sky-300">
                    30 kun ichida to‘lansa (70% to‘lov):
                  </span>
                  <span className="text-xs font-bold text-sky-600 bg-sky-100 dark:bg-sky-900/60 px-2 py-0.5 rounded">
                    30% tejash
                  </span>
                </div>
                <div className="text-xl font-bold text-sky-700 dark:text-sky-400">
                  {fineDiscount70.toLocaleString()} so‘m
                </div>
                <div className="text-xs text-sky-700/80 dark:text-sky-300/80 mt-1">
                  Oxirgi to‘lov muddati: <strong>{deadline30.toLocaleDateString('uz-UZ')}</strong> gacha
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 py-1 border-t border-slate-200 dark:border-slate-700">
                <span>To‘liq jarima miqdori:</span>
                <span className="font-semibold line-through">{fineAmount.toLocaleString()} so‘m</span>
              </div>
              <div className="flex items-center justify-between text-xs text-emerald-600 font-semibold py-1">
                <span>Siz tejab qoladigan summa:</span>
                <span>{fineDiscount50.toLocaleString()} so‘m</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 text-[11px] text-slate-500">
              * Jarimani to‘lov topshiriqnomasi, Click, Payme yoki bank orqali to‘lashda qaror raqamini ko‘rsating.
            </div>
          </div>
        </div>
      )}

      {/* CALCULATOR 2: MEHNAT TA'TILI VA KOMPENSATSIYA */}
      {activeCalc === 'tatil' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-sky-600" />
              Mehnat ta’tili parametrlarini kiriting
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Oylik o‘rtacha ish haqi (so‘mda) *
              </label>
              <input
                type="number"
                step="100000"
                value={monthlySalary}
                onChange={(e) => setMonthlySalary(Number(e.target.value))}
                className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Ishlangan to‘liq oylar soni *
                </label>
                <input
                  type="number"
                  min="1"
                  max="36"
                  value={workedMonths}
                  onChange={(e) => setWorkedMonths(Number(e.target.value))}
                  className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Yillik ta’til (MK min 21 kun) *
                </label>
                <input
                  type="number"
                  min="21"
                  max="48"
                  value={vacationDaysPerYear}
                  onChange={(e) => setVacationDaysPerYear(Number(e.target.value))}
                  className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Foydalanib bo‘lingan ta’til kunlari
              </label>
              <input
                type="number"
                min="0"
                value={usedVacationDays}
                onChange={(e) => setUsedVacationDays(Number(e.target.value))}
                className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/60 text-xs text-sky-800 dark:text-sky-300">
              <strong>Yangi Mehnat kodeksi 217-moddasi:</strong> Har yilgi asosiy ta’tilning eng kam davomiyligi 21 kalendar kun (avval 15 ish kuni bo‘lgan). 1 yildan ortiq foydalanilmagan ta’tillar uchun ishdan bo‘shashda to‘liq kompensatsiya to‘lanishi shart (MK 234-modda).
            </div>
          </div>

          {/* Results */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between">
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-4">
                Hisoblangan ta’til huquqi
              </h4>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[11px] text-slate-500">Ishlab topilgan kunlar:</span>
                  <div className="text-lg font-bold text-slate-800 dark:text-white">
                    {earnedDays} kun
                  </div>
                </div>
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[11px] text-slate-500">Foydalanilmagan qoldiq:</span>
                  <div className="text-lg font-bold text-sky-600 dark:text-sky-400">
                    {unusedDays} kun
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 mb-4">
                <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 block mb-1">
                  Ishdan bo‘shashda to‘lanishi kerak bo‘lgan kompensatsiya summasi:
                </span>
                <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                  {vacationCompensation.toLocaleString()} so‘m
                </div>
                <span className="text-[11px] text-emerald-700/80 dark:text-emerald-300/80 mt-1 block">
                  (O‘rtacha kunlik haq ~{Math.round(dailyRate).toLocaleString()} so‘m × {unusedDays} kun)
                </span>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-700">
              * Xodim ishdan bo‘shagan kuni ushbu summa Mehnat kodeksining 172-moddasiga asosan to‘liq to‘lab berilishi shart.
            </div>
          </div>
        </div>
      )}

      {/* CALCULATOR 3: ALIMENT */}
      {activeCalc === 'aliment' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-amber-600" />
              Aliment to‘lovchining ma’lumotlari
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Oylik barcha daromadlari (ish haqi, mukofot va b.) *
              </label>
              <input
                type="number"
                step="100000"
                value={parentIncome}
                onChange={(e) => setParentIncome(Number(e.target.value))}
                className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Voyaga yetmagan bolalar soni *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { count: 1, label: '1 nafar bola (1/4 - 25%)' },
                  { count: 2, label: '2 nafar bola (1/3 - 33.3%)' },
                  { count: 3, label: '3+ bola (1/2 - 50%)' },
                ].map((item) => (
                  <button
                    key={item.count}
                    onClick={() => setChildrenCount(item.count)}
                    className={`p-2.5 rounded-lg text-xs font-medium border text-center transition ${
                      childrenCount === item.count
                        ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-800 dark:text-amber-300">
              <strong>Oila kodeksi 99-moddasi:</strong> Aliment sud tomonidan oylik daromaddan: 1 bolaga 1/4, 2 bolaga 1/3, 3 va undan ko‘piga 1/2 qismi undiriladi. Har bir bola uchun alimentning eng kam miqdori MHTEKMning 26.5 foizidan kam bo‘lmasligi kerak.
            </div>
          </div>

          {/* Results */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between">
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-4">
                Aliment hisobi natijasi
              </h4>

              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 mb-4">
                <span className="text-xs font-semibold text-amber-800 dark:text-amber-300 block mb-1">
                  Har oyda undiriladigan aliment summasi:
                </span>
                <div className="text-2xl font-bold text-amber-700 dark:text-amber-400">
                  {alimentSum.toLocaleString()} so‘m
                </div>
                <span className="text-xs text-amber-700/80 dark:text-amber-300/80 mt-1 block">
                  (Daromadning {Math.round(alimentRate * 100)}% qismi)
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 py-1 border-b border-slate-200 dark:border-slate-700">
                  <span>Qonuniy minimal chegara (jami bolalar uchun):</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {totalMinAliment.toLocaleString()} so‘m
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 py-1 border-b border-slate-200 dark:border-slate-700">
                  <span>1 nafar bola uchun minimal kafolatlangan:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {minPerChild.toLocaleString()} so‘m
                  </span>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-700">
              * Aliment to‘lashdan bo‘yin tovlash MJtK 47-4 va JK 122-moddalariga binoan ma’muriy qamoq yoki jinoiy javobgarlikka sabab bo‘ladi.
            </div>
          </div>
        </div>
      )}

      {/* CALCULATOR 4: SUD DAVLAT BOJI */}
      {activeCalc === 'davlat_boji' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-indigo-600" />
              Sudlov va da’vo parametrlari
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Sudlov organi turi *
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setCourtType('iqtisodiy')}
                  className={`p-2.5 rounded-lg text-xs font-semibold border transition ${
                    courtType === 'iqtisodiy'
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200'
                      : 'border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Iqtisodiy sud (Biznes, MChJ, YaTT) - 2%
                </button>
                <button
                  onClick={() => setCourtType('fuqarolik')}
                  className={`p-2.5 rounded-lg text-xs font-semibold border transition ${
                    courtType === 'fuqarolik'
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200'
                      : 'border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Fuqarolik sudi (Jismoniy shaxslar) - 4%
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Da’vo bahosi (undirilayotgan summa) *
              </label>
              <input
                type="number"
                step="1000000"
                value={claimAmount}
                onChange={(e) => setClaimAmount(Number(e.target.value))}
                className="w-full text-sm px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60 text-xs text-indigo-800 dark:text-indigo-300">
              <strong>"Davlat boji to‘g‘risida"gi O‘zbekiston Respublikasi Qonuni:</strong> Iqtisodiy sudlarda mulkiy xarakterdagi da’volar bo‘yicha da’vo bahosining 2 foizi (lekin 1 BHMdan kam emas); Fuqarolik sudlarida 4 foizi (lekin 1 BHMdan kam emas) miqdorida davlat boji to‘lanadi.
            </div>
          </div>

          {/* Results */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between">
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-4">
                Davlat boji miqdori
              </h4>

              <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-300 dark:border-indigo-800 mb-4">
                <span className="text-xs font-semibold text-indigo-800 dark:text-indigo-300 block mb-1">
                  Sudga to‘lanishi kerak bo‘lgan davlat boji:
                </span>
                <div className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">
                  {courtDuty.toLocaleString()} so‘m
                </div>
                <span className="text-xs text-indigo-700/80 dark:text-indigo-300/80 mt-1 block">
                  ({courtType === 'iqtisodiy' ? '2%' : '4%'} stavka, minimal 1 BHM = {BHM_VALUE.toLocaleString()} so‘m)
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 py-1 border-b border-slate-200 dark:border-slate-700">
                  <span>Sud qarorida da’vo qanoatlantirilsa:</span>
                  <span className="font-semibold text-emerald-600">
                    Javobgardan to‘liq undirib beriladi
                  </span>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-700">
              * Pochta va sud xarajatlari to‘lov kvitansiyalari da’vo arizasiga ilova qilinishi shart.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
