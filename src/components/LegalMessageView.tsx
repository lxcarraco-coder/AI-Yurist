import React, { useMemo } from 'react';
import { marked } from 'marked';
import { Copy, Check, Printer, FileText, Scale, BookmarkCheck, Wrench, AlertCircle } from 'lucide-react';

interface Props {
  content: string;
  isStreaming?: boolean;
  onOpenInDocBuilder?: (text: string) => void;
}

export const LegalMessageView: React.FC<Props> = ({ content, isStreaming, onOpenInDocBuilder }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Yuridik Maslahat - AI-Yurist</title>
            <style>
              body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; padding: 40px; color: #1e293b; }
              h1 { font-size: 20px; color: #0f172a; border-bottom: 2px solid #0284c7; padding-bottom: 8px; }
              pre { background: #f8fafc; padding: 12px; border-radius: 6px; white-space: pre-wrap; }
              .disclaimer { margin-top: 30px; font-style: italic; color: #64748b; font-size: 13px; border-top: 1px solid #e2e8f0; padding-top: 10px; }
            </style>
          </head>
          <body>
            <h1>O‘zbekiston Respublikasi Qonunchiligi Bo‘yicha AI-Yurist Konsultatsiyasi</h1>
            <div style="white-space: pre-line;">${content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
            <div class="disclaimer">Rasmiy Lex.uz ma’lumotlar bazasi asosida tuzildi. Eslatib o‘taman, ushbu ma’lumot maslahat xarakteriga ega va rasmiy yuridik xulosa o‘rnini bosmaydi.</div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  // Convert markdown to clean HTML
  const parsedHtml = useMemo(() => {
    try {
      // Custom styling for placeholders [ ... ]
      const preprocessed = content.replace(
        /\[([a-zA-Z0-9\s_.\-/\u0400-\u04FF‘ʻʼ’]+)\]/g,
        '<span class="px-1.5 py-0.5 mx-0.5 bg-amber-500/15 text-amber-700 dark:text-amber-300 font-medium rounded border border-amber-300 dark:border-amber-700/50 text-[0.9em]">[$1]</span>'
      );
      return marked.parse(preprocessed, { breaks: true, gfm: true }) as string;
    } catch {
      return content;
    }
  }, [content]);

  // Check if response contains official template or structured sections
  const hasTemplate = content.includes('SHARTNOMA') || content.includes('BUYRUQ') || content.includes('ARIZA') || content.includes('TILXAT');

  return (
    <div className="relative group/msg">
      {/* Action buttons header */}
      <div className="flex items-center justify-end gap-1.5 mb-2 print:hidden">
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded transition"
          title="Nusxa olish"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Nusxalandi' : 'Nusxa olish'}
        </button>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-sky-700 dark:hover:text-sky-400 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded transition"
          title="Chop etish"
        >
          <Printer className="w-3.5 h-3.5" />
          Chop etish
        </button>

        {hasTemplate && onOpenInDocBuilder && (
          <button
            onClick={() => onOpenInDocBuilder(content)}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/40 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded transition"
            title="Hujjat konstruktorida tahrirlash"
          >
            <FileText className="w-3.5 h-3.5" />
            Konstruktorga o‘tish
          </button>
        )}
      </div>

      {/* Formatted Content */}
      <div
        className="legal-content prose prose-slate dark:prose-invert max-w-none text-[15px] leading-relaxed 
          prose-headings:font-semibold prose-headings:text-slate-900 dark:prose-headings:text-slate-100
          prose-p:my-2 prose-p:leading-relaxed
          prose-ul:my-2 prose-li:my-0.5
          prose-strong:text-slate-900 dark:prose-strong:text-slate-100
          prose-blockquote:border-l-amber-500 prose-blockquote:bg-amber-50/50 dark:prose-blockquote:bg-amber-950/20 prose-blockquote:py-1 prose-blockquote:px-3"
        dangerouslySetInnerHTML={{ __html: parsedHtml }}
      />

      {isStreaming && (
        <span className="inline-block w-2 h-4 ml-1 bg-emerald-600 dark:bg-emerald-400 animate-pulse align-middle" />
      )}
    </div>
  );
};
