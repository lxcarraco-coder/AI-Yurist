import React, { useState } from 'react';
import { LEGAL_CODES, LEGAL_INDICATORS } from '../data/legalData';
import { BookOpen, ExternalLink, Search, Bookmark, Scale, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface Props {
  onAskQuestionAboutCode: (codeTitle: string) => void;
}

export const KnowledgeBaseTab: React.FC<Props> = ({ onAskQuestionAboutCode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCodeId, setSelectedCodeId] = useState<string>('mk');

  const selectedCode = LEGAL_CODES.find((c) => c.id === selectedCodeId) || LEGAL_CODES[0];

  const filteredCodes = LEGAL_CODES.filter(
    (code) =>
      code.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      code.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      code.keyArticles.some(
        (a) =>
          a.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-sky-600" />
          O‘zbekiston Qonunlari & Lex.uz Bilimlar Bazasi
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Amaldagi kodekslar, rasmiy moddalar, qonunchilik me’yorlari va Lex.uz milliy tizimi havolalari
        </p>
      </div>

      {/* Official Indicators Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {LEGAL_INDICATORS.map((ind) => (
          <div
            key={ind.id}
            className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 transition"
          >
            <span className="text-xs text-slate-500 dark:text-slate-400 block line-clamp-1">
              {ind.name}
            </span>
            <div className="text-lg font-bold text-slate-900 dark:text-white my-1">
              {ind.value}
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium line-clamp-1">
              {ind.basis}
            </div>
          </div>
        ))}
      </div>

      {/* Search Input */}
      <div className="mb-6">
        <div className="relative max-w-xl">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Kodeks, modda raqami yoki mavzuni qidiring (masalan: 161-modda, sinov muddati, QQS)..."
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Codes List (Sidebar) */}
        <div className="lg:col-span-4 space-y-2">
          <h3 className="text-xs uppercase font-bold text-slate-500 tracking-wider mb-2">
            O‘zbekiston Kodekslari ({filteredCodes.length})
          </h3>

          <div className="space-y-2">
            {filteredCodes.map((code) => (
              <button
                key={code.id}
                onClick={() => setSelectedCodeId(code.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition ${
                  selectedCodeId === code.id
                    ? 'border-sky-500 bg-sky-50/60 dark:bg-sky-950/40 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    {code.title}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {code.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                  {code.summary}
                </p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                  <span>{code.articlesCount} ta modda</span>
                  <span>{code.adoptedYear}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Code Detail & Key Articles */}
        <div className="lg:col-span-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    {selectedCode.title}
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-medium">
                    {selectedCode.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {selectedCode.summary}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={selectedCode.lexUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 hover:bg-sky-100 transition"
                >
                  Lex.uz da ochish
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => onAskQuestionAboutCode(selectedCode.title)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-slate-900 dark:bg-sky-600 hover:bg-slate-800 transition"
                >
                  AI ga savol berish
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Key Articles Cards */}
            <div>
              <h4 className="text-xs uppercase font-bold text-slate-500 tracking-wider mb-3">
                Amaliyotda eng ko‘p qo‘llaniladigan moddalar va tahlil:
              </h4>

              <div className="space-y-3">
                {selectedCode.keyArticles.map((art, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 transition"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-xs sm:text-sm text-sky-700 dark:text-sky-400">
                        {art.number}
                      </span>
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        {art.topic}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {art.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Lex.uz guarantee notice */}
            <div className="mt-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs text-emerald-900 dark:text-emerald-200">
                <span className="font-bold">Rasmiy qonunchilik manbai kafolati:</span>
                <p className="mt-0.5 text-emerald-800/90 dark:text-emerald-300/80 leading-relaxed">
                  Barcha ma’lumotlar O‘zbekiston Respublikasi Adliya vazirligining "Qonun hujjatlari ma’lumotlari milliy bazasi" (Lex.uz) me’yorlariga asoslanadi. To‘qima yoki chet davlatlar qonunlari aralashtirilmaydi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
