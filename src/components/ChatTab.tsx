import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  User,
  Shield,
  Briefcase,
  Calculator,
  Users,
  RefreshCw,
  Trash2,
  ArrowRight,
  Mic,
  MicOff,
  PlusCircle,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  Check,
  MessageSquare,
} from 'lucide-react';
import { ChatMessage, UserRole } from '../types';
import { QUICK_PROMPTS } from '../data/legalData';
import { LegalMessageView } from './LegalMessageView';
import { Language, translations } from '../locales/i18n';
import { triggerHaptic } from '../services/telegramWebApp';

interface Props {
  onOpenInDocBuilder: (docText: string) => void;
  lang: Language;
  telegramUserId?: number;
  telegramInitData?: string;
  onQuotaUpdate?: (remaining: number) => void;
}

interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  updatedAt: number;
}

export const ChatTab: React.FC<Props> = ({
  onOpenInDocBuilder,
  lang,
  telegramUserId,
  telegramInitData,
  onQuotaUpdate,
}) => {
  const t = translations[lang];

  const getInitialWelcome = (): ChatMessage => ({
    id: 'welcome-1',
    role: 'assistant',
    content:
      lang === 'uz'
        ? `Assalomu alaykum! Men **O‘zbekiston Respublikasi qonunchiligi bo‘yicha ixtisoslashgan 15 yillik tajribaga ega professional AI-Yuristman**.

Mening bilimlar bazamga O‘zbekiston Respublikasining rasmiy kodekslari (yangi tahrirdagi Mehnat kodeksi, Soliq kodeksi, Fuqarolik kodeksi, MJtK, Oila kodeksi va boshqalar) hamda **Lex.uz** qarorlari yuklangan.

Har qanday savolingiz bo‘yicha quyidagi tuzilmada aniq va qonuniy javob beraman:
- 📌 **Qisqa xulosa** (Darhol beriladigan 1-2 jumlalik to‘g‘ridan-to‘g‘ri javob)
- ⚖️ **Qonuniy asos** (Amaldagi qonun hujjati, moddasi va rasmiy iqtibosi)
- 🛠 **Amaliy tavsiya** (Muammoni hal qilish bo‘yicha qadam-baqadam reja)

Shuningdek, zarur bo‘lsa rasmiy shartnomalar, buyruqlar, arizalar yoki sudga da’vo arizalari loyihasini ham tuzib beraman.

*Eslatib o‘taman, ushbu ma’lumot maslahat xarakteriga ega va rasmiy yuridik xulosa o‘rnini bosmaydi.*`
        : `Здравствуйте! Я — **профессиональный Юрист AI с 15-летним стажем**, специализирующийся на законодательстве Республики Узбекистан.

В мою базу знаний интегрированы официальные кодексы Республики Узбекистан (Трудовой, Налоговый, Гражданский, Семейный, КоАО и др.) и акты национальной базы **Lex.uz**.

По любому юридическому вопросу я формирую четкий аналитический ответ по структуре:
- 📌 **Краткий вывод** (Прямой и понятный ответ в 1–2 предложениях)
- ⚖️ **Законное основание** (Название кодекса, статья и цитата нормы)
- 🛠 **Практические рекомендации** (Пошаговый план действий)

*Напоминаю, что данная информация носит консультационный характер и не заменяет официальное юридическое заключение.*`,
    timestamp: Date.now(),
  });

  // Sessions management
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    const saved = localStorage.getItem('ai_yurist_sessions');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {
        // Fallback
      }
    }
    const defaultSession: ChatSession = {
      id: 'session-default',
      title: lang === 'uz' ? 'Yangi konsultatsiya' : 'Новая консультация',
      messages: [getInitialWelcome()],
      updatedAt: Date.now(),
    };
    return [defaultSession];
  });

  const [activeSessionId, setActiveSessionId] = useState<string>(() => sessions[0]?.id || 'session-default');
  const currentSession = sessions.find((s) => s.id === activeSessionId) || sessions[0];
  const messages = currentSession?.messages || [getInitialWelcome()];

  const [input, setInput] = useState('');
  const [userRole, setUserRole] = useState<UserRole>('tadbirkor');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState<Record<string, 'up' | 'down'>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    localStorage.setItem('ai_yurist_sessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const updateCurrentSessionMessages = (newMessages: ChatMessage[]) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === activeSessionId) {
          const firstUserMsg = newMessages.find((m) => m.role === 'user');
          const title = firstUserMsg ? firstUserMsg.content.slice(0, 32) + '...' : s.title;
          return { ...s, messages: newMessages, title, updatedAt: Date.now() };
        }
        return s;
      })
    );
  };

  const handleCreateNewChat = () => {
    triggerHaptic('medium');
    const newSessionId = `session-${Date.now()}`;
    const newSession: ChatSession = {
      id: newSessionId,
      title: lang === 'uz' ? 'Yangi konsultatsiya' : 'Новая консультация',
      messages: [getInitialWelcome()],
      updatedAt: Date.now(),
    };
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSessionId);
    setErrorMessage(null);
  };

  const handleDeleteSession = (sessionId: string) => {
    triggerHaptic('warning');
    if (sessions.length <= 1) {
      handleCreateNewChat();
      return;
    }
    const remaining = sessions.filter((s) => s.id !== sessionId);
    setSessions(remaining);
    setActiveSessionId(remaining[0].id);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    triggerHaptic('light');
    setErrorMessage(null);

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: Date.now(),
      userRole,
    };

    const updatedWithUser = [...messages, userMessage];
    updateCurrentSessionMessages(updatedWithUser);
    setInput('');
    setIsLoading(true);

    const assistantId = `assistant-${Date.now()}`;
    const initialAssistantMessage: ChatMessage = {
      id: assistantId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
    };

    updateCurrentSessionMessages([...updatedWithUser, initialAssistantMessage]);

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (telegramUserId) {
        headers['x-telegram-user-id'] = String(telegramUserId);
      }
      if (telegramInitData) {
        headers['x-telegram-init-data'] = telegramInitData;
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          messages: updatedWithUser.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          userRole,
          lang,
        }),
      });

      if (response.status === 429) {
        const errorData = await response.json();
        setErrorMessage(errorData.error || t.freeServiceNotice);
        updateCurrentSessionMessages(
          updatedWithUser.filter((m) => m.id !== assistantId)
        );
        setIsLoading(false);
        triggerHaptic('error');
        return;
      }

      if (!response.ok) {
        let errMessage = '';
        try {
          const errData = await response.json();
          errMessage = errData.error || errData.text || '';
        } catch {
          // Response was not JSON
        }
        throw new Error(errMessage || `Server xatosi: ${response.status}`);
      }

      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const jsonData = await response.json();
        const responseText = jsonData.text || jsonData.error || '';
        setSessions((prev) =>
          prev.map((s) => {
            if (s.id === activeSessionId) {
              return {
                ...s,
                messages: s.messages.map((msg) =>
                  msg.id === assistantId ? { ...msg, content: responseText } : msg
                ),
              };
            }
            return s;
          })
        );
        return;
      }

      if (!response.body) {
        throw new Error('Javob oqimi ochilmadi');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6).trim();
            if (dataStr === '[DONE]') {
              break;
            }
            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.text) {
                accumulated += parsed.text;
                setSessions((prev) =>
                  prev.map((s) => {
                    if (s.id === activeSessionId) {
                      return {
                        ...s,
                        messages: s.messages.map((msg) =>
                          msg.id === assistantId ? { ...msg, content: accumulated } : msg
                        ),
                      };
                    }
                    return s;
                  })
                );
              } else if (parsed.error) {
                accumulated += `\n\n❌ ${parsed.error}`;
                setSessions((prev) =>
                  prev.map((s) => {
                    if (s.id === activeSessionId) {
                      return {
                        ...s,
                        messages: s.messages.map((msg) =>
                          msg.id === assistantId ? { ...msg, content: accumulated } : msg
                        ),
                      };
                    }
                    return s;
                  })
                );
              }
            } catch {
              // Ignore parse error
            }
          }
        }
      }

      if (!accumulated.trim()) {
        throw new Error(
          lang === 'uz'
            ? 'Konsultatsiya shakllantirishda texnik uzilish yuz berdi. Iltimos qaytadan urinib ko‘ring.'
            : 'Произошла техническая задержка. Пожалуйста, повторите запрос.'
        );
      }

      // Fetch updated quota
      fetch('/api/user-quota', { headers })
        .then((r) => r.json())
        .then((d) => {
          if (d.remainingToday !== undefined && onQuotaUpdate) {
            onQuotaUpdate(d.remainingToday);
          }
        })
        .catch(() => {});
    } catch (error: any) {
      console.error('Chat error:', error);
      triggerHaptic('error');
      const displayMsg =
        error?.message && !error.message.startsWith('Server xatosi')
          ? error.message
          : (lang === 'uz'
            ? 'Konsultatsiya shakllantirishda texnik uzilish yuz berdi. Iltimos qaytadan urinib ko‘ring.'
            : 'Произошла техническая задержка. Пожалуйста, повторите запрос.');
      setErrorMessage(displayMsg);
      // Remove empty assistant placeholder so the chat doesn't stay with an empty bubble
      updateCurrentSessionMessages(
        updatedWithUser.filter((m) => m.id !== assistantId)
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = (messageId: string, type: 'up' | 'down') => {
    triggerHaptic('success');
    setFeedbackGiven((prev) => ({ ...prev, [messageId]: type }));
  };

  const handleVoiceInput = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        lang === 'uz'
          ? 'Brauzeringiz ovozli kiritishni qo‘llab-quvvatlamaydi (Chrome/Edge tavsiya etiladi).'
          : 'Ваш браузер не поддерживает голосовой ввод (рекомендуется Chrome/Edge).'
      );
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = lang === 'uz' ? 'uz-UZ' : 'ru-RU';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsRecording(false);
      };

      recognition.onerror = () => setIsRecording(false);
      recognition.onend = () => setIsRecording(false);
      recognition.start();
    } catch {
      setIsRecording(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-130px)] p-2.5 sm:p-4">
      {/* Top Bar: Sessions & Role Switcher */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-2.5 shadow-xs border border-slate-200 dark:border-slate-800 mb-2 flex flex-wrap items-center justify-between gap-2">
        {/* Sessions selector & New Chat */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={handleCreateNewChat}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white rounded-lg shadow-xs transition"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>{t.newChat}</span>
          </button>

          {sessions.length > 1 && (
            <div className="flex items-center gap-1 overflow-x-auto max-w-[260px] sm:max-w-xs scrollbar-thin">
              {sessions.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSessionId(s.id)}
                  className={`px-2 py-1 text-[11px] font-medium rounded-md truncate max-w-[120px] transition ${
                    activeSessionId === s.id
                      ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                      : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                  title={s.title}
                >
                  {s.title}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Role Selector Chips */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-lg">
          <button
            onClick={() => setUserRole('tadbirkor')}
            className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold transition ${
              userRole === 'tadbirkor'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            <Briefcase className="w-3 h-3" />
            <span className="hidden sm:inline">{t.roleEntrepreneur}</span>
            <span className="sm:hidden">Biznes</span>
          </button>

          <button
            onClick={() => setUserRole('buxgalter')}
            className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold transition ${
              userRole === 'buxgalter'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            <Calculator className="w-3 h-3" />
            <span className="hidden sm:inline">{t.roleAccountant}</span>
            <span className="sm:hidden">Soliq</span>
          </button>

          <button
            onClick={() => setUserRole('fuqaro')}
            className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold transition ${
              userRole === 'fuqaro'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            <Users className="w-3 h-3" />
            <span className="hidden sm:inline">{t.roleCitizen}</span>
            <span className="sm:hidden">Fuqaro</span>
          </button>

          <button
            onClick={() => handleDeleteSession(activeSessionId)}
            className="p-1 text-slate-400 hover:text-rose-600 transition"
            title={t.clearHistory}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Error / Quota Notice Banner */}
      {errorMessage && (
        <div className="p-3 mb-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-200 flex items-start justify-between gap-2 animate-in fade-in">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <span>{errorMessage}</span>
              {messages.length > 0 && messages[messages.length - 1]?.role === 'user' && (
                <div>
                  <button
                    onClick={() => {
                      const lastMsg = messages[messages.length - 1];
                      if (lastMsg) {
                        handleSendMessage(lastMsg.content);
                      }
                    }}
                    className="inline-flex items-center gap-1 font-semibold text-amber-900 dark:text-amber-100 hover:underline cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    {lang === 'uz' ? 'Qaytadan urinish' : 'Повторить попытку'}
                  </button>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => setErrorMessage(null)}
            className="text-amber-700 hover:text-amber-900 font-bold text-xs p-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 sm:pr-2 mb-2 scrollbar-thin">
        {messages.map((message) => {
          const isUser = message.role === 'user';
          return (
            <div
              key={message.id}
              className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-lg bg-sky-800 text-amber-300 flex items-center justify-center shrink-0 mt-1 shadow-xs border border-sky-700">
                  <Shield className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[92%] sm:max-w-[85%] rounded-2xl px-3.5 py-3 shadow-xs ${
                  isUser
                    ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white rounded-tr-none'
                    : 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none'
                }`}
              >
                {isUser ? (
                  <div>
                    <div className="text-[11px] text-sky-200 mb-1 flex items-center gap-1 font-medium">
                      <User className="w-3 h-3" />
                      Siz:
                    </div>
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2 border-b border-slate-100 dark:border-slate-800/80 pb-1.5">
                      <span className="font-semibold text-sky-700 dark:text-sky-400 flex items-center gap-1 text-[11px]">
                        <Sparkles className="w-3.5 h-3.5" />
                        AI-Yurist Konsultatsiyasi (Lex.uz)
                      </span>
                      <span className="text-[10px]">
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    <LegalMessageView
                      content={message.content}
                      isStreaming={isLoading && message.id === messages[messages.length - 1].id}
                      onOpenInDocBuilder={onOpenInDocBuilder}
                    />

                    {/* Feedback Bar (Helpful / Unhelpful) */}
                    {!isLoading && message.id !== 'welcome-1' && (
                      <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 print:hidden">
                        <span className="text-[10px]">
                          {feedbackGiven[message.id]
                            ? `✓ ${t.thanksFeedback}`
                            : lang === 'uz'
                            ? 'Ushbu javob sizga yordam berdimi?'
                            : 'Был ли этот ответ полезен?'}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleFeedback(message.id, 'up')}
                            className={`p-1 rounded transition ${
                              feedbackGiven[message.id] === 'up'
                                ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950'
                                : 'hover:text-emerald-600'
                            }`}
                            title={t.feedbackHelpful}
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleFeedback(message.id, 'down')}
                            className={`p-1 rounded transition ${
                              feedbackGiven[message.id] === 'down'
                                ? 'text-rose-600 bg-rose-50 dark:bg-rose-950'
                                : 'hover:text-rose-600'
                            }`}
                            title={t.feedbackUnhelpful}
                          >
                            <ThumbsDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Inquiries */}
      <div className="mb-2">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          <span className="text-[10px] font-semibold text-slate-500 uppercase shrink-0">
            {t.quickQuestionsLabel}
          </span>
          {QUICK_PROMPTS.filter((p) => p.role === userRole).map((qp, index) => (
            <button
              key={index}
              onClick={() => handleSendMessage(qp.prompt)}
              disabled={isLoading}
              className="text-xs px-2.5 py-1 bg-white dark:bg-slate-800/80 hover:bg-sky-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-full shrink-0 transition flex items-center gap-1 hover:border-sky-300"
            >
              <span>{qp.title}</span>
              <ArrowRight className="w-2.5 h-2.5 opacity-60" />
            </button>
          ))}
        </div>
      </div>

      {/* Input area */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-2 sm:p-2.5 border border-slate-200 dark:border-slate-800 shadow-md">
        <div className="flex items-end gap-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder={t.inputPlaceholder}
            rows={2}
            className="flex-1 bg-transparent resize-none border-0 focus:ring-0 text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 p-1.5 focus:outline-none"
          />

          <div className="flex items-center gap-1.5 pb-1">
            <button
              type="button"
              onClick={handleVoiceInput}
              className={`p-2 rounded-xl transition ${
                isRecording
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Ovozli kiritish"
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={() => handleSendMessage()}
              disabled={!input.trim() || isLoading}
              className={`p-2.5 rounded-xl font-medium text-white transition flex items-center justify-center ${
                !input.trim() || isLoading
                  ? 'bg-slate-300 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                  : 'bg-sky-600 hover:bg-sky-500 shadow-sm shadow-sky-600/30'
              }`}
              title={t.sendBtn}
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
        <div className="px-2 pt-1 flex items-center justify-between text-[10px] text-slate-400">
          <span>* Lex.uz amaldagi qonunchiligi asosida (Enter — yuborish)</span>
          <span className="hidden sm:inline">Shift + Enter yangi qator</span>
        </div>
      </div>
    </div>
  );
};
