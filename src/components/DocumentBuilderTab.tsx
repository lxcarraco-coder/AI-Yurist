import React, { useState, useEffect } from 'react';
import { DOCUMENT_TEMPLATES } from '../data/legalData';
import { DocumentTemplate } from '../types';
import { FileCheck, Sparkles, Copy, Check, Download, Printer, RefreshCw, FileText, AlertTriangle, Layers, Edit3 } from 'lucide-react';

import { Language, translations } from '../locales/i18n';

import { UserProfile } from '../types';
import { Save } from 'lucide-react';

interface Props {
  initialDocumentText?: string;
  onClearInitialText?: () => void;
  lang?: Language;
  user?: UserProfile | null;
  onOpenProfile?: () => void;
  telegramUserId?: number;
}

export const DocumentBuilderTab: React.FC<Props> = ({
  initialDocumentText,
  onClearInitialText,
  lang = 'uz',
  user,
  onOpenProfile,
  telegramUserId,
}) => {
  const t = translations[lang];
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate>(DOCUMENT_TEMPLATES[0]);
  const [documentContent, setDocumentContent] = useState<string>(DOCUMENT_TEMPLATES[0].templateText);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copied, setCopied] = useState(false);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  // Custom AI Document Generation inputs
  const [customDocType, setCustomDocType] = useState('');
  const [customPartyA, setCustomPartyA] = useState('');
  const [customPartyB, setCustomPartyB] = useState('');
  const [customDetails, setCustomDetails] = useState('');
  const [showAiModal, setShowAiModal] = useState(false);

  const handleSaveToProfile = async () => {
    const targetId = user?.telegramId || telegramUserId;
    if (!targetId) {
      if (onOpenProfile) onOpenProfile();
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch('/api/user/save-document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-telegram-user-id': String(targetId),
        },
        body: JSON.stringify({
          telegramId: targetId,
          title: selectedTemplate.title || 'Huquqiy hujjat',
          type: selectedTemplate.category || 'hujjat',
          content: documentContent,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSavedNotice('✅ Hujjat profilingizga saqlandi');
        setTimeout(() => setSavedNotice(null), 3000);
      } else {
        alert(data.error || 'Saqlashda xatolik');
      }
    } catch {
      alert('Saqlashda aloqa xatosi');
    } finally {
      setIsSaving(false);
    }
  };

  // If passed from Chat
  useEffect(() => {
    if (initialDocumentText) {
      setDocumentContent(initialDocumentText);
      if (onClearInitialText) onClearInitialText();
    }
  }, [initialDocumentText]);

  // Handle template selection
  const handleSelectTemplate = (tpl: DocumentTemplate) => {
    setSelectedTemplate(tpl);
    setDocumentContent(tpl.templateText);
    setFormValues({});
  };

  // Fill in form placeholders
  const handleFieldChange = (key: string, value: string) => {
    const updated = { ...formValues, [key]: value };
    setFormValues(updated);

    // Reconstruct template text by replacing filled keys
    let newText = selectedTemplate.templateText;
    selectedTemplate.fields.forEach((field) => {
      const val = updated[field.key];
      if (val && val.trim() !== '') {
        // Find pattern like [Ish beruvchi korxona nomi] or [field.label]
        const reg = new RegExp(`\\[${escapeRegExp(field.label)}\\]`, 'gi');
        newText = newText.replace(reg, val);
      }
    });
    setDocumentContent(newText);
  };

  function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Count remaining unfilled placeholders
  const unfilledCount = (documentContent.match(/\[([a-zA-Z0-9\s_.\-/\u0400-\u04FF‘ʻʼ’]+)\]/g) || []).length;

  const handleCopy = () => {
    navigator.clipboard.writeText(documentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadDoc = () => {
    const filename = `${selectedTemplate.id || 'hujjat'}-${new Date().toISOString().slice(0, 10)}.doc`;
    const header = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><title>Hujjat</title><style>body { font-family: "Times New Roman", Times, serif; font-size: 14pt; line-height: 1.5; }</style></head><body>';
    const footer = '</body></html>';
    const sourceHTML = header + `<pre style="white-space: pre-wrap; font-family: 'Times New Roman', serif;">${documentContent}</pre>` + footer;

    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement('a');
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = filename;
    fileDownload.click();
    document.body.removeChild(fileDownload);
  };

  const handleDownloadTxt = () => {
    const filename = `${selectedTemplate.id || 'hujjat'}-${new Date().toISOString().slice(0, 10)}.txt`;
    const blob = new Blob([documentContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${selectedTemplate.title}</title>
            <style>
              body { font-family: "Times New Roman", Times, serif; line-height: 1.5; padding: 40px; font-size: 13pt; }
              pre { white-space: pre-wrap; font-family: inherit; }
            </style>
          </head>
          <body>
            <pre>${documentContent.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  // Generate Custom Document via AI
  const handleGenerateAiDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customDocType.trim() || isAiGenerating) return;

    setIsAiGenerating(true);
    try {
      const res = await fetch('/api/generate-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentType: customDocType,
          partyA: customPartyA,
          partyB: customPartyB,
          details: customDetails,
        }),
      });

      const data = await res.json();
      if (data.document) {
        setDocumentContent(data.document);
        setSelectedTemplate({
          id: 'custom-ai-doc',
          title: customDocType,
          category: 'shartnoma',
          categoryLabel: 'AI tomonidan tuzilgan',
          description: 'Sizning ko‘rsatmalaringiz asosida yaratilgan maxsus rasmiy shablon.',
          legalBasis: 'O‘zbekiston Respublikasi amaldagi qonunchiligi',
          templateText: data.document,
          fields: [],
        });
        setShowAiModal(false);
      } else {
        alert(data.error || 'Hujjat tuzishda xatolik yuz berdi');
      }
    } catch (err: any) {
      console.error(err);
      alert('Aloqa uzildi. Iltimos qaytadan urinib ko‘ring.');
    } finally {
      setIsAiGenerating(false);
    }
  };

  const filteredTemplates = activeCategory === 'all'
    ? DOCUMENT_TEMPLATES
    : DOCUMENT_TEMPLATES.filter((t) => t.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      {/* Header and custom AI doc prompt */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileCheck className="w-6 h-6 text-sky-600" />
            Hujjatlar konstruktori va shablonlar
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            O‘zbekiston Respublikasi qonunchiligiga to‘liq mos professional shartnomalar, buyruqlar, ishonchnomalar va da’vo arizalari
          </p>
        </div>

        <button
          onClick={() => setShowAiModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white rounded-xl font-medium text-sm shadow-md shadow-sky-600/20 transition self-start md:self-auto"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          Yangi hujjat tuzish (AI-Konstruktor)
        </button>
      </div>

      {/* Categories Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 scrollbar-thin">
        {[
          { id: 'all', label: 'Barcha shablonlar' },
          { id: 'mehnat', label: 'Mehnat munosabatlari' },
          { id: 'korxona', label: 'Ichki buyruqlar' },
          { id: 'shartnoma', label: 'Shartnomalar & Ijara' },
          { id: 'fuqarolik', label: 'Fuqarolik & Tilxat' },
          { id: 'sud', label: 'Sud & Da’vo arizalari' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition ${
              activeCategory === cat.id
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Template Cards & Quick Fill Form */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-sky-600" />
              Tayyor shablonni tanlang:
            </h3>

            <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
              {filteredTemplates.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => handleSelectTemplate(tpl)}
                  className={`w-full text-left p-2.5 rounded-xl transition border ${
                    selectedTemplate.id === tpl.id
                      ? 'border-sky-500 bg-sky-50/50 dark:bg-sky-950/30'
                      : 'border-slate-200/80 dark:border-slate-800 hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-1">
                    {tpl.title}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {tpl.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Auto-fill form if template has fields */}
          {selectedTemplate.fields && selectedTemplate.fields.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1 flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-emerald-600" />
                Ma’lumotlarni avtomatik to‘ldirish
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                Kiritilgan ma’lumotlar shablon ichidagi kvadrat qavslar o‘rniga avtomatik joylashtiriladi.
              </p>

              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {selectedTemplate.fields.map((field) => (
                  <div key={field.key}>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      value={formValues[field.key] || ''}
                      onChange={(e) => handleFieldChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-sky-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Legal Basis info card */}
          <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Qonuniy asos:</span>{' '}
            <span className="text-slate-600 dark:text-slate-400">{selectedTemplate.legalBasis}</span>
          </div>
        </div>

        {/* Right Column: Interactive Editor / Preview */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md flex-1 flex flex-col overflow-hidden">
            {/* Editor Toolbar */}
            <div className="p-3 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 bg-slate-50/70 dark:bg-slate-800/40">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-xs sm:text-sm text-slate-800 dark:text-white">
                  {selectedTemplate.title}
                </span>
                {unfilledCount > 0 ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-300 dark:border-amber-800">
                    <AlertTriangle className="w-3 h-3" />
                    {unfilledCount} ta to‘ldirilmagan katak [...]
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                    <Check className="w-3 h-3" />
                    To‘liq tayyor
                  </span>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition"
                  title="Nusxa olish"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Nusxalandi' : 'Nusxa olish'}
                </button>

                <button
                  onClick={handleDownloadDoc}
                  className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-white bg-sky-600 hover:bg-sky-500 rounded-lg shadow-xs transition"
                  title="Word (.doc) sifatida yuklab olish"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Word (.doc)</span>
                </button>

                <button
                  onClick={handleDownloadTxt}
                  className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition"
                  title="Matn (.txt) sifatida yuklab olish"
                >
                  <FileText className="w-3.5 h-3.5 text-sky-600" />
                  <span>Matn (.txt)</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition"
                  title="Chop etish"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Chop etish
                </button>

                <button
                  onClick={handleSaveToProfile}
                  disabled={isSaving}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 hover:bg-emerald-100 dark:hover:bg-emerald-900 border border-emerald-300 dark:border-emerald-700 rounded-lg transition disabled:opacity-50"
                  title="O‘z profilingizga saqlash"
                >
                  <Save className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isSaving ? 'Saqlanmoqda...' : 'Hisobga saqlash'}</span>
                </button>
              </div>
            </div>

            {savedNotice && (
              <div className="bg-emerald-600 text-white text-xs px-4 py-2 font-medium flex items-center justify-between">
                <span>{savedNotice}</span>
                {onOpenProfile && (
                  <button onClick={onOpenProfile} className="underline text-[11px] font-semibold">
                    Hujjatlarimni ko‘rish →
                  </button>
                )}
              </div>
            )}

            {/* Editable Text Area with monospace/serif feel for authentic legal document drafting */}
            <div className="p-4 flex-1 flex flex-col">
              <textarea
                value={documentContent}
                onChange={(e) => setDocumentContent(e.target.value)}
                className="w-full flex-1 min-h-[500px] p-4 text-xs sm:text-sm font-mono leading-relaxed bg-slate-50/50 dark:bg-slate-950/50 text-slate-800 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500 resize-y"
                placeholder="Hujjat matni..."
              />
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
              <span>* Matnni to‘g‘ridan-to‘g‘ri tahrirlashingiz yoki Word dasturiga eksport qilishingiz mumkin.</span>
              <span>O‘zbekiston Respublikasi me’yorlariga mos</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Custom Document Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                AI Huquqiy Hujjat Yaratuvchisi
              </h3>
              <button
                onClick={() => setShowAiModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Qanday hujjat yoki shartnoma kerakligini belgilang. 15 yillik tajribali AI-Yurist O‘zbekiston qonunchiligiga muvofiq professional loyihani tayyorlab beradi.
            </p>

            <form onSubmit={handleGenerateAiDoc} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Hujjat nomi va turi *
                </label>
                <input
                  type="text"
                  required
                  value={customDocType}
                  onChange={(e) => setCustomDocType(e.target.value)}
                  placeholder="Masalan: MChJ ta’sischilarining navbatdan tashqari yig‘ilishi bayonnomasi"
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    1-tomon (Buyurtmachi/Ish beruvchi)
                  </label>
                  <input
                    type="text"
                    value={customPartyA}
                    onChange={(e) => setCustomPartyA(e.target.value)}
                    placeholder="Masalan: 'Grand Stroy' MChJ"
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    2-tomon (Ijrochi/Xodim)
                  </label>
                  <input
                    type="text"
                    value={customPartyB}
                    onChange={(e) => setCustomPartyB(e.target.value)}
                    placeholder="Masalan: Fuqaro Karimov A."
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Qo‘shimcha shartlar yoki holat tavsifi
                </label>
                <textarea
                  rows={3}
                  value={customDetails}
                  onChange={(e) => setCustomDetails(e.target.value)}
                  placeholder="Masalan: Shartnoma summasi 20 mln so‘m, muddat 6 oy, to‘lov bosqichma-bosqich amalga oshiriladi..."
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAiModal(false)}
                  className="px-3.5 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  disabled={isAiGenerating}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-sky-600 hover:bg-sky-500 rounded-lg shadow-sm shadow-sky-600/30 disabled:opacity-50"
                >
                  {isAiGenerating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                  {isAiGenerating ? 'Tuzilmoqda...' : 'Hujjatni shakllantirish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
