export type Language = 'uz' | 'ru';

export interface Translations {
  appName: string;
  appSubtitle: string;
  badgeExp: string;
  heroTitle: string;
  heroDesc: string;
  navChat: string;
  navDocs: string;
  navCalc: string;
  navLaws: string;
  navStats: string;
  roleEntrepreneur: string;
  roleAccountant: string;
  roleCitizen: string;
  scopeLabel: string;
  quickQuestionsLabel: string;
  inputPlaceholder: string;
  sendBtn: string;
  clearHistory: string;
  newChat: string;
  noHistory: string;
  disclaimerBtn: string;
  disclaimerTitle: string;
  disclaimerBody: string;
  quotaLabel: string;
  freeServiceNotice: string;
  docBuilderTitle: string;
  docBuilderSubtitle: string;
  createWithAi: string;
  allTemplates: string;
  laborCategory: string;
  internalOrders: string;
  contractsAndRent: string;
  civilAndReceipts: string;
  courtClaims: string;
  unfilledPlaceholders: string;
  allFilled: string;
  copyBtn: string;
  copiedBtn: string;
  downloadWord: string;
  downloadTxt: string;
  printBtn: string;
  feedbackHelpful: string;
  feedbackUnhelpful: string;
  thanksFeedback: string;
  retryBtn: string;
  errorOccurred: string;
  openInTelegram: string;
  telegramBotBadge: string;
}

export const translations: Record<Language, Translations> = {
  uz: {
    appName: 'AI-YURIST UZ',
    appSubtitle: 'O‘zbekiston Respublikasi Qonunchiligi Huquqiy Axborot Tizimi',
    badgeExp: '15 yillik tajriba',
    heroTitle: 'Sizning aqlli va ishonchli huquqiy yordamchingiz',
    heroDesc: 'Amaldagi Mehnat kodeksi, Soliq kodeksi, Fuqarolik kodeksi va Lex.uz me’yorlari asosida professional konsultatsiya va hujjatlar konstruktori.',
    navChat: 'AI Maslahat',
    navDocs: 'Hujjatlar konstruktori',
    navCalc: 'Kalkulyatorlar',
    navLaws: 'Kodekslar & Lex.uz',
    navStats: 'Tizim & Boshqaruv',
    roleEntrepreneur: 'Tadbirkor (MChJ/YaTT)',
    roleAccountant: 'Buxgalter / Moliyachi',
    roleCitizen: 'Fuqaro (Jismoniy shaxs)',
    scopeLabel: 'Faoliyat sohasi:',
    quickQuestionsLabel: 'Tezkor savollar:',
    inputPlaceholder: 'O‘zbekiston qonunchiligi bo‘yicha savolingizni yozing (masalan: sinov muddati, aliment, QQS 12%, ijara)...',
    sendBtn: 'Yuborish',
    clearHistory: 'Tarixni tozalash',
    newChat: 'Yangi suhbat',
    noHistory: 'Hozircha suhbatlar mavjud emas',
    disclaimerBtn: 'Yuridik ogohlantirish',
    disclaimerTitle: 'Rasmiy Yuridik Ogohlantirish (Disclaimer)',
    disclaimerBody: '«Eslatib o‘taman, ushbu ma’lumot maslahat xarakteriga ega va rasmiy yuridik xulosa yoki advokatlik himoyasi o‘rnini bosmaydi.» Barcha ma’lumotlar O‘zbekiston Respublikasining Lex.uz bazasi me’yorlariga asoslanadi.',
    quotaLabel: 'Bugungi bepul so‘rovlar:',
    freeServiceNotice: 'Xizmat jamoatchilik uchun bepul taqdim etiladi.',
    docBuilderTitle: 'Hujjatlar konstruktori va shablonlar',
    docBuilderSubtitle: 'O‘zbekiston Respublikasi qonunlariga to‘liq mos arizalar, da’vo arizalari, shartnomalar, buyruqlar va tilxatlar',
    createWithAi: 'AI orqali yangi hujjat tuzish',
    allTemplates: 'Barcha shablonlar',
    laborCategory: 'Mehnat munosabatlari',
    internalOrders: 'Ichki buyruqlar',
    contractsAndRent: 'Shartnomalar & Ijara',
    civilAndReceipts: 'Fuqarolik & Tilxat',
    courtClaims: 'Sud & Da’vo arizalari',
    unfilledPlaceholders: 'to‘ldirilmagan katak [...]',
    allFilled: 'To‘liq to‘ldirilgan',
    copyBtn: 'Nusxa olish',
    copiedBtn: 'Nusxalandi',
    downloadWord: 'Word (.doc)',
    downloadTxt: 'Matn (.txt)',
    printBtn: 'Chop etish',
    feedbackHelpful: 'Foydali',
    feedbackUnhelpful: 'Foydasiz',
    thanksFeedback: 'Bahoyingiz uchun rahmat!',
    retryBtn: 'Qayta urinish',
    errorOccurred: 'Xatolik yuz berdi. Iltimos qaytadan urinib ko‘ring.',
    openInTelegram: 'Telegram Botda ochish',
    telegramBotBadge: 'Telegram Bot: @shaxsiy_yuristimbot',
  },
  ru: {
    appName: 'ЮРИСТ AI UZ',
    appSubtitle: 'Правовая информационная система Республики Узбекистан',
    badgeExp: '15 лет опыта',
    heroTitle: 'Ваш умный и надежный юридический помощник',
    heroDesc: 'Профессиональные консультации и генератор юридических документов на основе Трудового, Налогового, Гражданского кодексов РУз и базы Lex.uz.',
    navChat: 'ИИ Консультация',
    navDocs: 'Конструктор документов',
    navCalc: 'Калькуляторы',
    navLaws: 'Кодексы и Lex.uz',
    navStats: 'Система и Статус',
    roleEntrepreneur: 'Предприниматель (ООО/ИП)',
    roleAccountant: 'Бухгалтер / Финансист',
    roleCitizen: 'Гражданин (Физ. лицо)',
    scopeLabel: 'Сфера деятельности:',
    quickQuestionsLabel: 'Быстрые вопросы:',
    inputPlaceholder: 'Задайте вопрос по законодательству Узбекистана (например: испытательный срок, НДС 12%, алименты, аренда)...',
    sendBtn: 'Отправить',
    clearHistory: 'Очистить историю',
    newChat: 'Новый диалог',
    noHistory: 'История диалогов пуста',
    disclaimerBtn: 'Юридическое уведомление',
    disclaimerTitle: 'Официальное уведомление (Дисклеймер)',
    disclaimerBody: '«Напоминаю, что данная информация носит исключительно консультационный характер и не заменяет официальное юридическое заключение или помощь адвоката.»',
    quotaLabel: 'Бесплатные запросы сегодня:',
    freeServiceNotice: 'Сервис предоставляется бесплатно для граждан и бизнеса.',
    docBuilderTitle: 'Конструктор и шаблоны документов',
    docBuilderSubtitle: 'Заявления, исковые заявления, договоры, приказы и расписки в соответствии с законодательством Республики Узбекистан',
    createWithAi: 'Создать документ через ИИ',
    allTemplates: 'Все шаблоны',
    laborCategory: 'Трудовые отношения',
    internalOrders: 'Внутренние приказы',
    contractsAndRent: 'Договоры и аренда',
    civilAndReceipts: 'Гражданские и расписки',
    courtClaims: 'Суд и исковые заявления',
    unfilledPlaceholders: 'незаполненных полей [...]',
    allFilled: 'Полностью заполнено',
    copyBtn: 'Копировать',
    copiedBtn: 'Скопировано',
    downloadWord: 'Word (.doc)',
    downloadTxt: 'Текст (.txt)',
    printBtn: 'Печать',
    feedbackHelpful: 'Полезно',
    feedbackUnhelpful: 'Не помогло',
    thanksFeedback: 'Спасибо за отзыв!',
    retryBtn: 'Повторить',
    errorOccurred: 'Произошла ошибка. Пожалуйста, повторите попытку.',
    openInTelegram: 'Открыть в Telegram Боте',
    telegramBotBadge: 'Телеграм Бот: @shaxsiy_yuristimbot',
  },
};
