import React, { useState, useEffect } from 'react';
import { UserProfile, SavedLegalDocument } from '../types';
import { User, Phone, ShieldCheck, Sparkles, FileText, Check, Copy, ExternalLink, X, Crown, Calendar, Lock } from 'lucide-react';
import { Language, translations } from '../locales/i18n';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  onUserUpdate: (u: UserProfile) => void;
  lang?: Language;
  onLoadDocument?: (content: string) => void;
  onOpenPlans?: () => void;
  telegramUserId?: number;
}

export const UserProfileModal: React.FC<Props> = ({
  isOpen,
  onClose,
  user,
  onUserUpdate,
  lang = 'uz',
  onLoadDocument,
  onOpenPlans,
  telegramUserId,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'documents' | 'register'>('profile');
  const [savedDocs, setSavedDocs] = useState<SavedLegalDocument[]>([]);
  const [isLoadingDocs, setIsLoadingDocs] = useState(false);
  const [copiedDocId, setCopiedDocId] = useState<string | null>(null);

  // Direct registration form state
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('+998');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [regError, setRegError] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (user?.telegramId || telegramUserId) {
        const id = user?.telegramId || telegramUserId;
        setIsLoadingDocs(true);
        fetch(`/api/user/documents?telegramId=${id}`)
          .then((r) => r.json())
          .then((d) => {
            if (d.documents) {
              setSavedDocs(d.documents);
            }
          })
          .catch(() => {})
          .finally(() => setIsLoadingDocs(false));
      }
    }
  }, [isOpen, user, telegramUserId]);

  if (!isOpen) return null;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');

    if (regName.trim().length < 2) {
      setRegError('Ism va familiyangizni to‘liq kiriting');
      return;
    }

    if (regPhone.trim().length < 9) {
      setRegError('Telefon raqamingizni to‘g‘ri kiriting (+998...)');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          telegramId: telegramUserId ? String(telegramUserId) : undefined,
          fullName: regName.trim(),
          phone: regPhone.trim(),
        }),
      });

      const data = await res.json();
      if (data.success && data.user) {
        onUserUpdate(data.user);
        setActiveTab('profile');
      } else {
        setRegError(data.error || 'Ro‘yxatdan o‘tishda xatolik yuz berdi');
      }
    } catch {
      setRegError('Tarmoq xatosi. Iltimos qaytadan urinib ko‘ring.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyDoc = (doc: SavedLegalDocument) => {
    navigator.clipboard.writeText(doc.content);
    setCopiedDocId(doc.id);
    setTimeout(() => setCopiedDocId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-600/30 border border-sky-400/40 flex items-center justify-center text-sky-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">
                {user ? user.fullName : 'Shaxsiy Profil'}
              </h3>
              <p className="text-xs text-sky-200/80">
                {user ? user.phone : 'Yurist AI Foydalanuvchi hisobi'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switchers */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 px-5 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition ${
              activeTab === 'profile'
                ? 'border-sky-600 text-sky-600 dark:text-sky-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4" />
            Profil ma’lumotlari
          </button>

          <button
            onClick={() => setActiveTab('documents')}
            className={`pb-3 px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition ${
              activeTab === 'documents'
                ? 'border-sky-600 text-sky-600 dark:text-sky-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            Mening hujjatlarim ({savedDocs.length})
          </button>

          {!user && (
            <button
              onClick={() => setActiveTab('register')}
              className={`pb-3 px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition ${
                activeTab === 'register'
                  ? 'border-sky-600 text-sky-600 dark:text-sky-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Phone className="w-4 h-4" />
              Ro‘yxatdan o‘tish
            </button>
          )}
        </div>

        {/* Body Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5">
          {activeTab === 'profile' && (
            <>
              {user ? (
                <div className="space-y-4">
                  {/* Account Card */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 dark:text-slate-400">F.I.SH:</span>
                      <strong className="text-sm text-slate-900 dark:text-white font-semibold">
                        {user.fullName}
                      </strong>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 dark:text-slate-400">Telefon:</span>
                      <strong className="text-sm text-sky-600 dark:text-sky-400 font-mono">
                        {user.phone}
                      </strong>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500 dark:text-slate-400">Telegram ID:</span>
                      <span className="text-xs text-slate-600 dark:text-slate-300 font-mono">
                        #{user.telegramId}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
                      <span className="text-xs text-slate-500 dark:text-slate-400">Joriy tarif:</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          {user.plan === 'professional' ? 'Professional' : user.plan === 'standard' ? 'Standart' : 'Bepul'}
                        </span>
                        {onOpenPlans && (
                          <button
                            onClick={() => {
                              onClose();
                              onOpenPlans();
                            }}
                            className="text-xs text-sky-600 dark:text-sky-400 hover:underline font-semibold"
                          >
                            Tarifni oshirish →
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900 text-center">
                      <span className="text-xs text-sky-700 dark:text-sky-300 block mb-1">
                        Konsultatsiyalar
                      </span>
                      <span className="text-xl font-bold text-sky-900 dark:text-sky-100">
                        {user.consultationsCount || 0}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 text-center">
                      <span className="text-xs text-indigo-700 dark:text-indigo-300 block mb-1">
                        Tuzilgan hujjatlar
                      </span>
                      <span className="text-xl font-bold text-indigo-900 dark:text-indigo-100">
                        {savedDocs.length || user.documentsCount || 0}
                      </span>
                    </div>
                  </div>

                  {/* Telegram Bot Notice */}
                  <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-0.5">Telegram Bot bilan to‘liq sinxronlashgan</p>
                      <p className="text-[11px] text-amber-700 dark:text-amber-400/90 leading-relaxed">
                        Telegram botimizda <strong>/start</strong> bosib, telefon raqamingizni yuborganingizda hisobingiz avtomatik biriktiriladi.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 text-center py-4">
                  <div className="w-12 h-12 rounded-2xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 mx-auto flex items-center justify-center">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">
                      Hisobingiz hali ro‘yxatdan o‘tkazilmagan
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
                      Yurist AI tizimida yaratgan hujjatlaringizni saqlash va huquqiy xizmatlardan to‘liq foydalanish uchun Telegram raqamingiz orqali ro‘yxatdan o‘ting.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href="https://t.me/shaxsiy_yuristimbot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md transition"
                    >
                      ✈️ Telegram bot orqali ro‘yxatdan o‘tish
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={() => setActiveTab('register')}
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition"
                    >
                      Saytda ro‘yxatdan o‘tish
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-3">
              {isLoadingDocs ? (
                <div className="py-10 text-center text-xs text-slate-500">
                  Hujjatlar yuklanmoqda...
                </div>
              ) : savedDocs.length === 0 ? (
                <div className="py-10 text-center space-y-2">
                  <FileText className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto" />
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Sizda hali saqlangan hujjatlar yo‘q.
                  </p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 max-w-xs mx-auto">
                    «Hujjatlar konstruktori» bo‘limida ariza yoki shartnoma tayyorlab, «💾 Profilga saqlash» tugmasini bosing.
                  </p>
                </div>
              ) : (
                savedDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col gap-2 transition hover:border-sky-500/50"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h5 className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-1">
                          {doc.title}
                        </h5>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                          <span className="uppercase font-semibold">{doc.type}</span>
                          <span>•</span>
                          <span>{new Date(doc.createdAt).toLocaleDateString('uz-UZ')}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handleCopyDoc(doc)}
                          className="px-2 py-1 rounded bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-700 dark:text-slate-200 text-xs flex items-center gap-1 transition"
                          title="Nusxa olish"
                        >
                          {copiedDocId === doc.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                              <span className="text-[11px]">Nusxalandi</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span className="text-[11px]">Nusxa</span>
                            </>
                          )}
                        </button>

                        {onLoadDocument && (
                          <button
                            onClick={() => {
                              onLoadDocument(doc.content);
                              onClose();
                            }}
                            className="px-2 py-1 rounded bg-sky-600 hover:bg-sky-500 text-white text-[11px] font-semibold transition"
                          >
                            Ochish
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900 text-xs text-sky-800 dark:text-sky-300">
                <strong>Google hisobi talab qilinmaydi!</strong> Shunchaki ism-familiyangiz va telefon raqamingizni kiriting.
              </div>

              {regError && (
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300 font-medium">
                  {regError}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  To‘liq Ism va Familiyangiz *
                </label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Masalan: Alisher Qodirov"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Telefon raqamingiz *
                </label>
                <input
                  type="tel"
                  required
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="+998901234567"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-mono focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs sm:text-sm shadow-md transition disabled:opacity-50"
              >
                {isSubmitting ? 'Ro‘yxatdan o‘tkazilmoqda...' : 'Hisobni yaratish va faollashtirish'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
