/**
 * O'zbekiston Respublikasi qonunchiligiga asoslangan rasmiy huquqiy bilimlar bazasi
 * va Gemini API kvotasi (429 RESOURCE_EXHAUSTED) holatidagi zaxira yordamchi tizimi.
 *
 * Barcha moddalar O'zbekiston Respublikasining amaldagi qonunlari va Lex.uz manbalariga asoslangan.
 */

export interface LegalTopicResponse {
  keywords: string[];
  title: string;
  shortSummary: string;
  legalBasis: string;
  practicalSteps: string[];
  requiredDocs: string[];
  importantDeadlines?: string;
  officialSources: string[];
  disclaimer: string;
}

export const UZBEK_LEGAL_TOPICS: LegalTopicResponse[] = [
  {
    keywords: ['ajrash', 'ajrim', 'nikoh', 'xotinim', 'erim', 'razvod', 'ajrashmoqchiman', 'oila buzilishi'],
    title: 'Nikohni bekor qilish (Ajrashish) tartibi',
    shortSummary:
      'O‘zbekiston Respublikasida nikohni bekor qilish fuqarolarning holatiga qarab FHDYo (ZAGS) bo‘limi yoki Fuqarolik ishlari bo‘yicha tumanlararo sudi orqali amalga oshiriladi.',
    legalBasis:
      'O‘zbekiston Respublikasi Oila kodeksining 38, 40, 41, 42 va 43-moddalari.\n- Voyaga yetmagan umumiy bolalari bo‘lmagan va o‘zaro rozilik bo‘lgan er-xotin nikohni bekor qilish to‘g‘risida FHDYo organiga birgalikda ariza beradi (42-modda);\n- Voyaga yetmagan umumiy bolalari bo‘lsa yoki taraflardan biri ajrashishga rozi bo‘lmasa, ish Fuqarolik ishlari bo‘yicha sudda ko‘riladi (40-modda);\n- Sud ishni ko‘rishni kechiktirib, er-xotinga 6 oygacha yarashtirish muhlatini belgilashga haqlidir (40-modda 2-qismi).',
    practicalSteps: [
      '1. Nizoli vaziyat yoki umumiy voyaga yetmagan farzandlar bo‘lsa, javobgarning doimiy yashash joyidagi Fuqarolik ishlari bo‘yicha tumanlararo sudiga da’vo arizasi tayyorlang.',
      '2. Sudga da’vo arizasini bevosita kantselyariyaga yoki my.sud.uz portali orqali elektron imzo (ERI) bilan yuboring.',
      '3. Davlat bojini (BHMning 2 baravari miqdorida) to‘lang yoki imtiyoz mavjudligini tasdiqlovchi hujjat ilova qiling.',
      '4. Sud tayinlagan dastlabki eshituv va oilaviy yarashtirish komissiyasi yig‘ilishlarida ishtirok eting.',
      '5. Agar yarashtirish muddati natija bermasa, sud nikohni bekor qilish to‘g‘risida hal qiluv qarori qabul qiladi.',
    ],
    requiredDocs: [
      'Da’vo arizasi (2 nusxada)',
      'Nikoh tuzilganligi haqidagi guvohnomaning asl nusxasi (dublikati)',
      'Voyaga yetmagan bolalarning tug‘ilganlik haqidagi guvohnomalari nusxasi',
      'Davlat boji to‘langanligi haqidagi kvitansiya (BHM 2 baravari)',
      'Da’vogar va javobgarning pasport/ID karta nusxalari hamda yashash joyi ma’lumotnomasi',
    ],
    importantDeadlines: 'Sud 6 oygacha yarashtirish muddati tayinlashi mumkin. Hal qiluv qarori chiqqandan keyin 1 oy o‘tgach qonuniy kuchga kiradi.',
    officialSources: [
      'Oila kodeksi: https://lex.uz/docs/-104720',
      'Oliy sud plenumi qarori: https://lex.uz/docs/-1449557',
      'Elektron sud portali: https://my.sud.uz',
    ],
    disclaimer: 'Eslatib o‘taman, ushbu ma’lumot maslahat xarakteriga ega va rasmiy advokatlik yoki sud xulosasi o‘rnini bosmaydi.',
  },
  {
    keywords: ['aliment', 'bola puli', 'aliment to‘lash', 'aliment undirish', 'aliment miqdori', 'aliment hisoblash', 'aliment qancha'],
    title: 'Aliment undirish va to‘lash tartibi',
    shortSummary:
      'Ota-ona voyaga yetmagan bolalariga ta’minot berishi shart. Aliment ixtiyoriy ravishda kelishuv asosida yoki sud orqali majburiy tartibda undiriladi.',
    legalBasis:
      'O‘zbekiston Respublikasi Oila kodeksining 96, 99, 100, 101-moddalari.\n- 1 nafar bola uchun — ota-ona daromadining 1/4 qismi (25%);\n- 2 nafar bola uchun — daromadining 1/3 qismi (33.3%);\n- 3 va undan ortiq bola uchun — daromadining 1/2 qismi (50%);\n- Har bir bola uchun undiriladigan aliment miqdori qonunchilikda belgilangan mehnatga haq to‘lash eng kam miqdorining (MHTEKM) 26.5 foizidan kam bo‘lmasligi lozim (99-modda 3-qismi).',
    practicalSteps: [
      '1. Fuqarolik ishlari bo‘yicha sudga «Sud buyrug‘i berish to‘g‘risida ariza» taqdim eting (FPK 238-modda). Sud buyrug‘i taraflarni chaqirmasdan 3 kunda chiqariladi.',
      '2. Agar otalikni belgilash yoki boshqa shaxslarning manfaatlari bo‘yicha nizo bo‘lsa, da’vo arizasi shaklida beriladi.',
      '3. Aliment undiruvchi shaxs da’vo arizasi berishda davlat bojidan to‘liq ozod qilingan (Soliq kodeksi 329-modda).',
      '4. Sud hujjati qonuniy kuchga kirgach, ijro varaqasi yoki sud buyrug‘i Majburiy ijro byurosi (MIB) davlat ijrochisiga topshiriladi.',
    ],
    requiredDocs: [
      'Sud buyrug‘i chiqarish haqida ariza',
      'Bolaning tug‘ilganlik to‘g‘risidagi guvohnomasi nusxasi',
      'Nikoh guvohnomasi yoki nikoh bekor qilinganligi to‘g‘risida guvohnoma nusxasi',
      'Bolaning da’vogar qaramog‘ida ekanligi haqida ma’lumotnoma',
      'Javobgarning ish joyi va maoshi ma’lumotnomasi (mavjud bo‘lsa)',
    ],
    importantDeadlines: 'Aliment sudga murojaat qilingan paytdan boshlab undiriladi. O‘tgan davr uchun uzrli sabablar bo‘lsa, 3 yillik muddat doirasida undirilishi mumkin.',
    officialSources: [
      'Oila kodeksi 96-105 moddalar: https://lex.uz/docs/-104720',
      'Majburiy ijro byurosi: https://mib.uz',
      'Yagona interaktiv davlat xizmatlari portali: https://my.gov.uz',
    ],
    disclaimer: 'Eslatib o‘taman, ushbu ma’lumot maslahat xarakteriga ega va rasmiy yuridik xulosa o‘rnini bosmaydi.',
  },
  {
    keywords: ['mehnat', 'ishdan bo‘shash', 'ishdan bo‘shatish', 'ariza yozish', 'uvolneniye', 'kompensatsiya', 'mehnat shartnomasi', 'sinov muddati', 'ta’til', 'otpusk'],
    title: 'Mehnat munosabatlari va ishdan bo‘shatish tartibi',
    shortSummary:
      'Yangi tahrirdagi O‘zbekiston Respublikasi Mehnat kodeksiga ko‘ra, xodim o‘z xohishi bilan ish beruvchini 14 kalendar kun oldin yozma ravishda ogohlantirib shartnomani bekor qilishi mumkin.',
    legalBasis:
      'O‘zbekiston Respublikasining yangi Mehnat kodeksi (2023-yil 30-apreldan kuchga kirgan):\n- 160-modda: Xodimning tashabbusi bilan mehnat shartnomasini bekor qilish (14 kalendar kunlik ogohlantirish muddati);\n- 161-modda: Ish beruvchining tashabbusi bilan bekor qilish asoslari;\n- 172-173-moddalar: Ishdan bo‘shatish nafaqasi (shtat qisqarganda xodimning stajiga qarab o‘rtacha oylik ish haqining 50 foizidan 200 foizigacha to‘lanadi);\n- 217-modda: Yillik asosiy mehnat ta’tili davomiyligi kamida 21 kalendar kun etib belgilangan.',
    practicalSteps: [
      '1. Agar o‘z xohishingiz bilan bo‘shamoqchi bo‘lsangiz, ish beruvchi nomiga 14 kun oldin yozma ariza yozing va kiruvchi raqam oldirib nusxasini saqlang.',
      '2. Ogohlantirish muddati davomida xodim istalgan vaqtda o‘z arizasini qaytarib olishga haqli.',
      '3. Agar ish beruvchi shtat qisqarishi munosabati bilan bo‘shatsa, 2 oy oldin yozma ogohlantirishi va ish qidirish uchun haftada 1 kun maosh saqlangan holda vaqt berishi shart.',
      '4. Ishdan bo‘shatish kuni ish beruvchi oxirgi hisob-kitobni (foydalanilmagan ta’tillar kompensatsiyasi, maosh) to‘liq amalga oshirishi va mehnat daftarchasini berishi shart.',
    ],
    requiredDocs: [
      'Mehnat shartnomasini bekor qilish to‘g‘risida ariza',
      'Ish beruvchining tegishli buyrug‘i (nusxasi)',
      'Mehnat daftarchasi yoki elektron mehnat daftarchasi ko‘chirmasi (my.mehnat.uz)',
      'Tegishli hisob-kitob varaqasi',
    ],
    importantDeadlines: 'O‘z xohishi bilan bo‘shashda 14 kunlik ogohlantirish. Noqonuniy bo‘shatilganlik ustidan sudga murojaat qilish muddati — 1 oy (ishdan bo‘shatish buyrug‘i berilgan kundan).',
    officialSources: [
      'Yangi Mehnat kodeksi: https://lex.uz/docs/-6257288',
      'Yagona milliy mehnat tizimi: https://my.mehnat.uz',
      'Kambag‘allikni qisqartirish va bandlik vazirligi: https://mehnat.uz',
    ],
    disclaimer: 'Eslatib o‘taman, ushbu ma’lumot maslahat xarakteriga ega va rasmiy yuridik xulosa o‘rnini bosmaydi.',
  },
  {
    keywords: ['jarima', 'radar', 'kamera', 'mjtk', 'shtraf', 'gaishnik', 'yhxbb', '50 foiz', 'chegirma', 'jarimani to‘lash', 'bayonnoma'],
    title: 'Ma’muriy jarimalar va 50% chegirma bilan to‘lash tartibi',
    shortSummary:
      'Yo‘l harakati va boshqa ma’muriy huquqbuzarliklar bo‘yicha jarima qarori chiqarilgan kundan e’tiboran 15 kun ichida jarima miqdorining 50 foizi to‘lansa, qolgan qismidan ozod qilinadi.',
    legalBasis:
      'O‘zbekiston Respublikasi Ma’muriy javobgarlik to‘g‘risidagi kodeksining 332-1-moddasi.\n- Huquqbuzar jarima solish to‘g‘risidagi qaror topshirilgan kundan boshlab 15 kun ichida jarima miqdorining 50 foizini, 30 kun ichida esa 70 foizini ixtiyoriy ravishda to‘lasa, qolgan qismini to‘lashdan ozod qilinadi.\n- Mazkur imtiyoz sud qarorlari, takroriy huquqbuzarliklar va shikoyat qilingan hollar uchun o‘ziga xos istisnolarga ega bo‘lishi mumkin.',
    practicalSteps: [
      '1. Jarima haqidagi qarorni (SMS, pochta yoki my.gov.uz) olgach, qaror raqami va sanasini tekshiring.',
      '2. Agar qoidabuzarlikka e’tirozingiz bo‘lmasa, 15 kunlik imtiyozli muddat o‘tmasdan 50% miqdorda to‘lovni amalga oshiring (Payme, Click, bank orqali).',
      '3. Agar radar yoki kamera xato suratga olgan bo‘lsa (avtomobil boshqa shaxsga sotilgan, davlat raqami xato o‘qilgan), 10 kun ichida YHXBB ma’muriy amaliyot bo‘limiga yoki sudga ariza bilan murojaat qiling.',
    ],
    requiredDocs: [
      'Ma’muriy jazo qo‘llash to‘g‘risidagi qaror nusxasi',
      'Transport vositasi ro‘yxatdan o‘tkazilganligi to‘g‘risidagi guvohnoma (texpasport)',
      'Haydovchilik guvohnomasi va ishonchnoma (mavjud bo‘lsa)',
      'Foto/video dalillar (asossiz jarimaga e’tiroz bildirilganda)',
    ],
    importantDeadlines: '50% chegirma — 15 kun; 70% to‘lov — 30 kun; Qaror ustidan shikoyat qilish muddati — 10 kun.',
    officialSources: [
      'Ma’muriy javobgarlik to‘g‘risidagi kodeks: https://lex.uz/docs/-97661',
      'Yo‘l harakati xavfsizligi xizmati: https://yhxb.uz',
      'Yagona portal: https://my.gov.uz',
    ],
    disclaimer: 'Eslatib o‘taman, ushbu ma’lumot maslahat xarakteriga ega va rasmiy yuridik xulosa o‘rnini bosmaydi.',
  },
  {
    keywords: ['meros', 'vasiyat', 'vasiyatnoma', 'merosxo‘r', 'meros olish', 'merosni rasmiylashtirish', 'notarius meros', 'meros muddati'],
    title: 'Merosni qabul qilish va rasmiylashtirish tartibi',
    shortSummary:
      'Meros ochilgan kundan boshlab 6 oy ichida meros ochilgan joydagi davlat notarial idorasiga merosni qabul qilish to‘g‘risida ariza topshirilishi shart.',
    legalBasis:
      'O‘zbekiston Respublikasi Fuqarolik kodeksining 1112, 1134, 1146, 1147-moddalari.\n- 1-navbatdagi qonun bo‘yicha vorislar: marhumning bolalari, eri (xotini) va ota-onasi teng ulushlarda vorislik qiladi (1135-modda);\n- Vasiyatnoma mavjud bo‘lganda ham voyaga yetmagan yoki mehnatga layoqatsiz bolalari, eri (xotini) va ota-onasi qonun bo‘yicha o‘zlariga tegishi lozim bo‘lgan ulushning kamida yarmini (majburiy ulush) oladi (1142-modda).',
    practicalSteps: [
      '1. Marhumning oxirgi doimiy yashash joyidagi notarial idoraga 6 oy kechikmasdan murojaat qiling.',
      '2. Merosni qabul qilish to‘g‘risida rasmiy ariza bering va meros ishi ochilishini ta’minlang.',
      '3. 6 oylik muddat tugagach, notariusdan merosga bo‘lgan huquq to‘g‘risidagi guvohnomani oling.',
      '4. Ko‘chmas mulk yoki avtotransport meros qilib olingan bo‘lsa, uni kadastr va YHXBB organlarida o‘z nomingizga qayta ro‘yxatdan o‘tkazing.',
    ],
    requiredDocs: [
      'Marhumning o‘limi haqidagi guvohnoma (asl nusxasi)',
      'Qarindoshlikni tasdiqlovchi hujjatlar (tug‘ilganlik, nikoh guvohnomalari)',
      'Marhumning oxirgi yashash joyidan ma’lumotnoma',
      'Meros mol-mulkining huquqiy hujjatlari (kadastr pasporti, texpasport)',
      'Vasiyatnoma (mavjud bo‘lsa)',
    ],
    importantDeadlines: 'Merosni qabul qilish muddati — meros ochilgan (o‘lim ro‘y bergan) kundan boshlab qat’iy 6 oy.',
    officialSources: [
      'Fuqarolik kodeksi: https://lex.uz/docs/-180552',
      'Elektron notarius portali: https://e-notarius.uz',
    ],
    disclaimer: 'Eslatib o‘taman, ushbu ma’lumot maslahat xarakteriga ega va rasmiy yuridik xulosa o‘rnini bosmaydi.',
  },
  {
    keywords: ['qarz', 'tilxat', 'raspiyaska', 'pul berdim', 'qarzni qaytarish', 'qarz shartnomasi', 'qarzni undirish'],
    title: 'Qarz munosabatlari va tilxat (raspiyaska) bo‘yicha pul undirish',
    shortSummary:
      'Fuqarolar o‘rtasidagi qarz summasi BHMning 10 baravaridan (3.75 mln so‘mdan) oshsa, qarz shartnomasi yozma shaklda tuzilishi shart. Tilxat qarz shartnomasining yozma tasdig‘i hisoblanadi.',
    legalBasis:
      'O‘zbekiston Respublikasi Fuqarolik kodeksining 732, 733, 734 va 735-moddalari.\n- Qarz shartnomasi yozma tuzilmagan taqdirda, nizo chiqqanda taraflar guvohlarning ko‘rsatmalariga tayanish huquqidan mahrum bo‘ladi (FK 109-modda);\n- Qarzni qaytarish muddati belgilanmagan bo‘lsa, qarz oluvchi qarz beruvchining talabi qo‘yilgan kundan e’tiboran 30 kun ichida qarzni qaytarishi shart (735-modda).',
    practicalSteps: [
      '1. Qarz oluvchiga qarzni 30 kun ichida qaytarish haqida rasmiy yozma talabnoma (pretenziya) yuboring (pochta orqali buyurtma xat bilan).',
      '2. Agar muddat o‘tsa va pul qaytarilmasa, qarzdorning yashash joyidagi Fuqarolik ishlari bo‘yicha sudga da’vo arizasi kiriting.',
      '3. Da’vo arizasiga tilxatning asl nusxasini, shaxsni tasdiqlovchi ma’lumotlarni va davlat boji to‘langanligi kvitansiyasini ilova qiling.',
      '4. Sud qarori chiqqach, ijro varaqasini MIBga taqdim eting.',
    ],
    requiredDocs: [
      'Tilxat yoki qarz shartnomasining asl nusxasi',
      'Sudga da’vo arizasi (2 nusxada)',
      'Qarzdorga yuborilgan talabnoma va pochta kvitansiyasi',
      'Davlat boji to‘lovi (undirilayotgan summaning 4 foizi miqdorida, kamida 1 BHM)',
    ],
    importantDeadlines: 'Umumiy da’vo muddati — 3 yil (qarz qaytarilishi kerak bo‘lgan kundan boshlab hisoblanadi).',
    officialSources: [
      'Fuqarolik kodeksi: https://lex.uz/docs/-180552',
      'Sud portali: https://my.sud.uz',
    ],
    disclaimer: 'Eslatib o‘taman, ushbu ma’lumot maslahat xarakteriga ega va rasmiy yuridik xulosa o‘rnini bosmaydi.',
  },
  {
    keywords: ['ijara', 'kvartira ijara', 'ijara shartnomasi', 'uy ijarasi', 'ijara soliq', 'ijara.soliq.uz', 'arenda', 'ijaraga berish'],
    title: 'Turar joy ijara shartnomasi va soliqqa ro‘yxatdan o‘tkazish',
    shortSummary:
      'Turar joyni ijaraga berishda yozma shartnoma tuzilishi va soliq organlarining maxsus axborot tizimida (ijara.soliq.uz) hisobga qo‘yilishi shart.',
    legalBasis:
      'O‘zbekiston Respublikasi Fuqarolik kodeksining 535, 600-moddalari va Soliq kodeksining 393-moddasi.\n- Jismoniy shaxslar o‘rtasida tuzilgan ijara shartnomalarini notarial tasdiqlash talab etilmaydi, biroq soliq organlarida (ijara.soliq.uz) ro‘yxatdan o‘tkazish majburiydir;\n- Ijaraga beruvchi jismoniy shaxs ijara daromadidan 12% stavkada JShODS (NDFL) to‘laydi;\n- Shartnomani ro‘yxatdan o‘tkazmaslik MJtK 159-1-moddasiga ko‘ra jarima solinishiga sabab bo‘ladi.',
    practicalSteps: [
      '1. Ijaraga beruvchi va ijarachi o‘rtasida yozma shaklda turar joy ijara shartnomasi hamda qabul qilish-topshirish dalolatnomasini tuzing.',
      '2. Ijara shartnomasini ijara.soliq.uz portali orqali ERI yordamida ro‘yxatdan o‘tkazing (ijarachi tasdiqlashi lozim).',
      '3. Har oyning belgilangan sanasiga qadar hisoblangan soliq to‘lovini to‘lang.',
      '4. Shartnoma muddatidan oldin bekor qilinsa, portal orqali bekor qilish belgisini kiriting.',
    ],
    requiredDocs: [
      'Turar joy ijara shartnomasi loyihasi',
      'Ko‘chmas mulk kadastr pasporti va mulkdorning ID kartasi',
      'Ijarachining pasport/ID karta ma’lumotlari',
      'Uy-joy umumiy mulk bo‘lsa, boshqa mulkdorlarning roziligi',
    ],
    importantDeadlines: 'Ijara shartnomasi tuzilgan kundan boshlab 3 kundan kechiktirmay ijara.soliq.uz portalida hisobga qo‘yilishi kerak.',
    officialSources: [
      'Davlat soliq qo‘mitasi ijara xizmati: https://ijara.soliq.uz',
      'Soliq kodeksi: https://lex.uz/docs/-4674902',
    ],
    disclaimer: 'Eslatib o‘taman, ushbu ma’lumot maslahat xarakteriga ega va rasmiy yuridik xulosa o‘rnini bosmaydi.',
  },
  {
    keywords: ['soliq', 'qqs', 'aylanma soliq', 'yatt', 'mchj', 'soliq to‘lash', 'buxgalteriya', 'e-faktura', 'hisobot'],
    title: 'Tadbirkorlik va soliq stavkalari (QQS, aylanmadan soliq, YaTT)',
    shortSummary:
      'O‘zbekiston Respublikasida soliq tizimi soddalashtirilgan (aylanmadan olinadigan soliq) va umumiy (QQS va foyda solig‘i) tartibda amalga oshiriladi.',
    legalBasis:
      'O‘zbekiston Respublikasi Soliq kodeksi:\n- QQS (Qo‘shilgan qiymat solig‘i) — 12 foiz;\n- Aylanmadan olinadigan soliqning bazaviy stavkasi — 4 foiz (yillik jami daromadi 1 milliard so‘mgacha bo‘lgan korxonalar uchun);\n- Jismoniy shaxslardan olinadigan daromad solig‘i (JShODS) — 12 foiz;\n- Ijtimoiy soliq: xususiy korxonalar uchun — 12 foiz, byudjet tashkilotlari uchun — 25 foiz;\n- Foyda solig‘i bazaviy stavkasi — 15 foiz.',
    practicalSteps: [
      '1. Biznes faoliyatingiz turi va yillik tushum hajmiga qarab soliq rejimini tanlang (aylanma soliq yoki QQS).',
      '2. Shartnomalar va tovar yetkazib berish bo‘yicha elektron hisob-fakturalarni (E-faktura) o‘z vaqtida taqdim eting.',
      '3. Hisobot davri (oy yoki chorak) yakuni bo‘yicha soliq hisobotlarini soliq.uz shaxsiy kabineti orqali yuboring.',
      '4. Belgilangan muddatdan kechiktirmasdan soliq to‘lovlarini to‘lang.',
    ],
    requiredDocs: [
      'Davlat ro‘yxatidan o‘tganlik to‘g‘risidagi guvohnoma (Guvohnoma)',
      'Bank hisobvarag‘i rekvizitlari va E-imzo (ERI)',
      'Elektron hisob-fakturalar va birlamchi buxgalteriya hujjatlari',
    ],
    importantDeadlines: 'Aylanmadan olinadigan soliq hisoboti — har oyning 15-sanasiga qadar; QQS hisoboti — keyingi oyning 20-sanasiga qadar.',
    officialSources: [
      'Soliq kodeksi: https://lex.uz/docs/-4674902',
      'Davlat soliq qo‘mitasi portali: https://soliq.uz',
    ],
    disclaimer: 'Eslatib o‘taman, ushbu ma’lumot maslahat xarakteriga ega va rasmiy yuridik xulosa o‘rnini bosmaydi.',
  },
  {
    keywords: ['sud', 'davo', 'da’vo', 'sudga berish', 'sudga ariza', 'davlat boji', 'sud tartibi', 'my.sud.uz'],
    title: 'Sudga murojaat qilish va da’vo arizasi berish tartibi',
    shortSummary:
      'Fuqarolar va tadbirkorlar buzilgan huquqlarini tiklash uchun Fuqarolik, Iqtisodiy yoki Ma’muriy sudlarga da’vo arizasi yoki shikoyat bilan murojaat qilishlari mumkin.',
    legalBasis:
      'O‘zbekiston Respublikasi Fuqarolik protsessual kodeksi va Iqtisodiy protsessual kodeksi:\n- FPK 188-191-moddalar: Da’vo arizasining shakli va mazmuni;\n- Da’vo arizasi yozma shaklda tuziladi va da’vogar yoki uning vakili tomonidan imzolanadi;\n- Davlat boji to‘g‘risidagi qonun hujjatlariga asosan mulkiy da’volar bo‘yicha davlat boji da’vo summasining 4 foizini (kamida 1 BHM) tashkil etadi.',
    practicalSteps: [
      '1. Ish qaysi sudga tegishli ekanligini aniqlang (Fuqarolik sudi — fuqarolar o‘rtasidagi nizolar; Iqtisodiy sud — tadbirkorlar va korxonalar nizolari).',
      '2. FPK talablariga mos da’vo arizasini tuzing: sud nomi, taraflar, da’vo predmeti, holatlar, talab va ilovalar.',
      '3. Davlat bojini to‘lang va to‘lov kvitansiyasini ilova qiling (yoki imtiyoz asosini ko‘rsating).',
      '4. my.sud.uz orqali elektron shaklda yuboring yoki sud devonxonasiga topshiring.',
    ],
    requiredDocs: [
      'Da’vo arizasi (taraflar soniga mos nusxalarda)',
      'Davlat boji to‘langanligi to‘g‘risida kvitansiya',
      'Da’vo talablarini tasdiqlovchi birlamchi hujjatlar (shartnomalar, dalolatnomalar, to‘lov kvitansiyalari)',
      'Javobgarga da’vo arizasi nusxasi yuborilganligini tasdiqlovchi pochta hujjati',
    ],
    importantDeadlines: 'Umumiy da’vo muddati — 3 yil. Sud arizani qabul qilish masalasini 5 kun ichida hal qiladi.',
    officialSources: [
      'Elektron sud xizmatlari: https://my.sud.uz',
      'Oliy sud rasmiy sayti: https://sud.uz',
      'Davlat bojlari to‘g‘risidagi Qonun: https://lex.uz/docs/-4681555',
    ],
    disclaimer: 'Eslatib o‘taman, ushbu ma’lumot maslahat xarakteriga ega va rasmiy yuridik xulosa o‘rnini bosmaydi.',
  },
];

/**
 * Foydalanuvchi so'rovini kalit so'zlar bo'yicha tahlil qilib, eng mos huquqiy konsultatsiyani qaytaradi.
 */
export function getLegalConsultationFallback(query: string, lang: 'uz' | 'ru' = 'uz'): string {
  const normalized = query.toLowerCase();

  // Eng mos mavzuni qidirish
  let bestMatch: LegalTopicResponse | null = null;
  let maxScore = 0;

  for (const topic of UZBEK_LEGAL_TOPICS) {
    let score = 0;
    for (const kw of topic.keywords) {
      if (normalized.includes(kw)) {
        score += kw.length;
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestMatch = topic;
    }
  }

  // Agar mavzu topilsa
  if (bestMatch && maxScore > 0) {
    if (lang === 'ru') {
      return `📌 **Краткий вывод:**
${bestMatch.shortSummary}

⚖️ **Правовое основание (Законодательство Республики Узбекистан):**
${bestMatch.legalBasis}

🛠 **Практические шаги:**
${bestMatch.practicalSteps.join('\n')}

📋 **Необходимые документы:**
${bestMatch.requiredDocs.map((d) => `• ${d}`).join('\n')}
${bestMatch.importantDeadlines ? `\n⏳ **Важные сроки:**\n${bestMatch.importantDeadlines}` : ''}

🔗 **Официальные источники (Lex.uz):**
${bestMatch.officialSources.map((s) => `• ${s}`).join('\n')}

⚠️ *${bestMatch.disclaimer}*

---
*ℹ️ Обратите внимание: В связи с временной загруженностью бесплатного лимита запросов Google Gemini (Free Tier), данная профессиональная консультация сформирована на основе проверенной юридической базы законодательства Республики Узбекистан (Lex.uz).*`;
    }

    return `📌 **Qisqa xulosa:**
${bestMatch.shortSummary}

⚖️ **Huquqiy asos (O‘zbekiston Respublikasi qonunchiligi):**
${bestMatch.legalBasis}

🛠 **Amaliy qadamlar:**
${bestMatch.practicalSteps.join('\n')}

📋 **Kerakli hujjatlar:**
${bestMatch.requiredDocs.map((d) => `• ${d}`).join('\n')}
${bestMatch.importantDeadlines ? `\n⏳ **Muhim muddatlar:**\n${bestMatch.importantDeadlines}` : ''}

🔗 **Rasmiy manbalar (Lex.uz):**
${bestMatch.officialSources.map((s) => `• ${s}`).join('\n')}

⚠️ *${bestMatch.disclaimer}*

---
*ℹ️ Eslatma: Google Gemini sun'iy intellektining bepul kunlik kvotasi (Free Tier) to'lganligi sababli, ushbu javob O‘zbekiston Respublikasi qonunchiligi (Lex.uz) bo‘yicha tekshirilgan rasmiy huquqiy bilimlar bazasidan avtomatik shakllantirildi.*`;
  }

  // Umumiy huquqiy yo'riqnoma agar aniq kalit so'z topilmasa
  if (lang === 'ru') {
    return `📌 **Краткий вывод:**
По вашему вопросу («${query.slice(0, 60)}...») требуется правовая квалификация согласно действующим кодексам Республики Узбекистан.

⚖️ **Правовой ориентир:**
• Гражданский кодекс Республики Узбекистан (права и обязательства сторон, сделки и договоры);
• Трудовой кодекс Республики Узбекистан (трудовые споры и гарантии работников);
• Кодекс об административной ответственности и Налоговый кодекс.

🛠 **Рекомендуемые действия:**
1. Уточните предмет спора и сохраните все письменные документы (чеки, переписку, акты, договоры).
2. Проверьте актуальную редакцию применимого нормативного акта в Национальной базе законодательства: https://lex.uz
3. Для подачи официального заявления воспользуйтесь Единым порталом интерактивных государственных услуг (my.gov.uz) или судебным порталом (my.sud.uz).

🔗 **Официальные источники:**
• Национальная база данных законодательства: https://lex.uz
• Портал судебных услуг: https://my.sud.uz
• Единый портал госуслуг: https://my.gov.uz

⚠️ *Напоминаю, что предоставленная информация носит консультационный характер и не заменяет официальное юридическое заключение или помощь адвоката.*

---
*ℹ️ Обратите внимание: Запрос обработан локальной правовой системой Yurist AI на основе законодательства Узбекистана.*`;
  }

  return `📌 **Qisqa xulosa:**
Sizning so‘rovingiz («${query.slice(0, 60)}...») bo‘yicha O‘zbekiston Respublikasining amaldagi qonun hujjatlariga muvofiq huquqiy munosabatlarni aniqlash lozim.

⚖️ **Huquqiy yo‘nalish:**
• O‘zbekiston Respublikasi Fuqarolik kodeksi (majburiyatlar, shartnomalar, da’vo muddati 3 yil);
• Yangi Mehnat kodeksi (mehnat huquqlari va kafolatlar);
• Oila kodeksi (oilaviy mulk, bolalar va aliment majburiyatlari);
• Ma’muriy javobgarlik to‘g‘risidagi kodeks va Soliq kodeksi.

🛠 **Tavsiya etiladigan amaliy qadamlar:**
1. Nizoli yoki huquqiy holatga oid barcha mavjud dalillarni (shartnomalar, cheklar, yozishmalar, guvohnomalar) jamlang.
2. Amaldagi qonun hujjati tahririni Lex.uz — O‘zbekiston Respublikasi Qonun hujjatlari ma’lumotlari milliy bazasidan bevosita tekshiring.
3. Rasmiy da’vo yoki murojaat yuborish uchun my.gov.uz yoki my.sud.uz portallarining elektron xizmatlaridan foydalaning.

🔗 **Rasmiy manbalar:**
• Lex.uz (Qonunchilik milliy bazasi): https://lex.uz
• Elektron sud xizmatlari: https://my.sud.uz
• Yagona davlat xizmatlari portali: https://my.gov.uz

⚠️ *Eslatib o‘taman, ushbu ma’lumot maslahat xarakteriga ega va rasmiy yuridik xulosa o‘rnini bosmaydi.*

---
*ℹ️ Eslatma: Google Gemini sun'iy intellektining bepul kunlik kvotasi (Free Tier) to'lganligi sababli, ushbu javob O‘zbekiston Respublikasi qonunchiligi (Lex.uz) bo‘yicha tekshirilgan rasmiy huquqiy bilimlar bazasidan avtomatik shakllantirildi.*`;
}

/**
 * Hujjat tayyorlash bo'yicha Gemini 429 xatolik berganda professional yuridik shablon generatori.
 */
export function generateFallbackDocument(
  docType: string,
  partyA: string,
  partyB: string,
  details: string,
  customClauses: string,
  lang: 'uz' | 'ru' = 'uz'
): string {
  const cleanPartyA = partyA || '[1-tomon F.I.Sh. yoki Korxona nomi]';
  const cleanPartyB = partyB || '[2-tomon F.I.Sh. yoki Korxona nomi]';
  const today = new Date().toLocaleDateString('uz-UZ');

  if (docType.includes('ariza') || docType.includes('zayavleniye')) {
    return `KIMGA: ${cleanPartyB}
KIMDAN: ${cleanPartyA}
Manzil: [Yashash manzili yoki korxona joylashuvi]
Telefon: [+998 90 000-00-00]

ARIZA
(Huquqiy masalani ko‘rib chiqish to‘g‘risida)

Men, ${cleanPartyA}, mazkur ariza orqali quyidagilarni ma’lum qilaman:

${details || 'Mazkur ariza O‘zbekiston Respublikasi qonunchiligi talablariga asosan manfaatlarimni himoya qilish maqsadida taqdim etilmoqda.'}

${customClauses ? `Qo‘shimcha talablar:\n${customClauses}\n` : ''}
Yuqoridagilardan kelib chiqib, O‘zbekiston Respublikasi qonunchiligi talablariga muvofiq:
1. Ushbu arizani qonunda belgilangan muddatlarda ko‘rib chiqishingizni;
2. Mazkur masala yuzasidan qonuniy va asoslantirilgan qaror qabul qilishingizni so‘rayman.

Ilova qilinayotgan hujjatlar:
1. Shaxsni tasdiqlovchi hujjat (pasport/ID karta) nusxasi.
2. Ishga daxldor hujjatlar nusxalari.

Sana: ${today}
Ariza beruvchi: ${cleanPartyA} ____________ (imzo)`;
  }

  if (docType.includes('talabnoma') || docType.includes('pretenziya')) {
    return `TALABNOMA (PRETENZIYA)
Majburiyatlarni bajarish va qarzdorlikni bartaraf etish to‘g‘risida

Sana: ${today} yil
Shahar: [Shahar/Tuman nomi]

KIMGA: ${cleanPartyB}
Manzil: [Qarzdorning manzili]
KIMDAN: ${cleanPartyA}
Manzil: [Kreditorning manzili]

O‘zbekiston Respublikasi Fuqarolik kodeksining 236 va 333-moddalariga muvofiq, majburiyatlar shartnoma shartlariga va qonun hujjatlari talablariga muvofiq lozim darajada bajarilishi kerak.

Taraflar o‘rtasidagi kelishuv va holat mazmuni:
${details || 'Kreditor oldidagi majburiyatlar belgilangan muddatda to‘liq bajarilmagan.'}

${customClauses ? `Maxsus shartlar:\n${customClauses}\n` : ''}
Yuqoridagilarga asosan, SIZDAN:
1. Mazkur talabnoma olingan kundan boshlab 10 (o‘n) kalendar kun ichida ko‘rsatilgan majburiyatni to‘liq bajarishingizni;
2. To‘lov yoki ijro to‘g‘risidagi tasdiqlovchi hujjatlarni yozma ravishda taqdim etishingizni TALAB QILAMAN.

Aks holda, Fuqarolik kodeksining tegishli moddalariga asosan sud organlariga da’vo arizasi bilan murojaat qilinishini, shu bilan birga barcha sud xarajatlari, davlat boji va yetkazilgan zararlar Sizning hisobingizdan undirilishini ma’lum qilaman.

Talabnoma yuboruvchi:
${cleanPartyA} ____________ (imzo)`;
  }

  if (docType.includes('ijara') || docType.includes('arenda')) {
    return `TURAR JOY IJARA SHARTNOMASI LOYIHASI

${today} yil                                                               [Shahar nomi]

Biz, bundan buyon «Ijaraga beruvchi» deb ataluvchi fuqaro ${cleanPartyA} bir tomondan, va bundan buyon «Ijarachi» deb ataluvchi fuqaro ${cleanPartyB} ikkinchi tomondan, mazkur shartnomani quyidagilar to‘g‘risida tuzdik:

1. SHARTNOMA PREDMETI
1.1. Ijaraga beruvchi o‘ziga xususiy mulk huquqi asosida tegishli bo‘lgan quyidagi manzilda joylashgan turar joyni Ijarachiga vaqtincha yashash uchun foydalanishga topshiradi:
Manzil: [Uy/xonadon to‘liq manzili].
1.2. Ijara predmeti mazmuni: ${details || '1 xonali to‘liq jihozlangan xonadon'}.

2. TO‘LOV VA HISOBLASHISH TARTIBI
2.1. Oylik ijara haqi taraflar kelishuviga ko‘ra [0,000,000] so‘m etib belgilanadi.
2.2. Ijara haqi har oyning [5]-sanasiga qadar oldindan to‘lanadi.
2.3. Kommunal to‘lovlar [Ijarachi/Ijaraga beruvchi] tomonidan to‘lanadi.

3. TARAFLARNING HUQUQ VA MAJBURIYATLARI
3.1. Ijaraga beruvchi turar joyni yashash uchun yaroqli holatda topshirishga majbur.
3.2. Ijarachi mulkdan ehtiyotkorlik bilan foydalanishga, yong‘in va sanitariya xavfsizligi qoidalariga rioya qilishga majbur.
${customClauses ? `3.3. Maxsus shartlar: ${customClauses}\n` : ''}
4. SHARTNOMA MUDDATI VA BEKOR QILISH TARTIBI
4.1. Mazkur shartnoma ${today} yildan [Sana] yilgacha bo‘lgan muddatga tuzildi.
4.2. Shartnoma ijara.soliq.uz portalida belgilangan tartibda hisobga qo‘yilishi shart.

5. TARAFLARNING REKVIZITLARI VA IMZOLARI:

IJARAGA BERUVCHI:
F.I.Sh.: ${cleanPartyA}
Pasport/ID: [AA 0000000]
JShShIR: [00000000000000]
Tel: [+998 90 000-00-00]
Imzo: ____________

IJARACHI:
F.I.Sh.: ${cleanPartyB}
Pasport/ID: [AA 0000000]
JShShIR: [00000000000000]
Tel: [+998 90 000-00-00]
Imzo: ____________

*Eslatib o‘taman, ushbu ma’lumot maslahat xarakteriga ega va rasmiy yuridik xulosa o‘rnini bosmaydi.*`;
  }

  // Umumiy professional yuridik shablon
  return `HUJJAT LOYIHASI: ${docType.toUpperCase()}

Sana: ${today} yil
Tuzilgan joyi: [Shahar/Tuman nomi]

Tomonlar:
1-tomon: ${cleanPartyA}
2-tomon: ${cleanPartyB}

1. ASOSIY MAZMUN VA SHARTLAR
${details || 'O‘zbekiston Respublikasining amaldagi Fuqarolik va Mehnat kodekslari talablariga muvofiq tomonlar o‘zaro huquq va majburiyatlarini kelishib oldilar.'}

${customClauses ? `2. MAXSUS BANDLAR:\n${customClauses}\n` : ''}
3. JAVOBGARLIK VA NIZOLARNI HAL QILISH
3.1. Tomonlar o‘z zimmalariga olgan majburiyatlarni bajarmagan taqdirda, O‘zbekiston Respublikasi qonunchiligiga muvofiq moddiy javobgar bo‘ladilar.
3.2. Mazkur masala bo‘yicha kelishmovchiliklar o‘zaro muzokaralar orqali, kelishuvga erishilmagan taqdirda esa O‘zbekiston Respublikasi vakolatli sudlari orqali hal etiladi.

Tomonlarning imzolari:
1-tomon: ${cleanPartyA} ____________ (imzo)
2-tomon: ${cleanPartyB} ____________ (imzo)

*Eslatib o‘taman, ushbu ma’lumot maslahat xarakteriga ega va rasmiy yuridik xulosa o‘rnini bosmaydi.*`;
}
