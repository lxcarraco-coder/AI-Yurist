import { LegalCode, LegalIndicator, DocumentTemplate } from '../types';

export const LEGAL_INDICATORS: LegalIndicator[] = [
  {
    id: 'bhm',
    name: 'Bazaviy hisoblash miqdori',
    shortName: 'BHM',
    value: '375 000 so‘m',
    effectiveDate: 'Amaldagi me’yor',
    basis: 'O‘zbekiston Respublikasi Prezidentining Farmoni',
    description: 'Soliqlar, yig‘imlar, jarimalar, davlat bojlari va boshqa to‘lovlar miqdorini aniqlash uchun qo‘llaniladi.',
  },
  {
    id: 'mhtekm',
    name: 'Mehnatga haq to‘lashning eng kam miqdori',
    shortName: 'MHTEKM',
    value: '1 155 000 so‘m',
    effectiveDate: 'Amaldagi me’yor',
    basis: 'O‘zbekiston Respublikasi Prezidentining Farmoni',
    description: 'To‘liq stavkada ishlovchi xodimning oylik ish haqi ushbu miqdordan kam bo‘lishi qonunan taqiqlanadi.',
  },
  {
    id: 'pensiya_bm',
    name: 'Pensiyani hisoblashning bazaviy miqdori',
    shortName: 'PHBM',
    value: '428 000 so‘m',
    effectiveDate: 'Amaldagi me’yor',
    basis: 'O‘zbekiston Respublikasi Prezidentining Farmoni',
    description: 'Yoshga doir, nogironlik va boquvchisini yo‘qotganlik pensiyalarini hisoblashda qo‘llaniladi.',
  },
  {
    id: 'qqs',
    name: 'Qo‘shilgan qiymat solig‘i (QQS / NDS)',
    shortName: 'QQS',
    value: '12%',
    effectiveDate: 'Amaldagi Soliq kodeksi',
    basis: 'O‘zbekiston Respublikasi Soliq kodeksi 258-modda',
    description: 'Tovarlar va xizmatlarni realizatsiya qilish aylanmasiga nisbatan amaldagi yagona umumiy stavka.',
  },
  {
    id: 'jshods',
    name: 'Jismoniy shaxslardan olinadigan daromad solig‘i (JShODS / NDFL)',
    shortName: 'JShODS',
    value: '12%',
    effectiveDate: 'Amaldagi Soliq kodeksi',
    basis: 'O‘zbekiston Respublikasi Soliq kodeksi 381-modda',
    description: 'O‘zbekiston rezidenti bo‘lgan jismoniy shaxslarning mehnat va boshqa daromadlariga tatbiq etiladi.',
  },
  {
    id: 'aylanma_soliq',
    name: 'Aylanmadan olinadigan soliq (Oddiy stavka)',
    shortName: 'Aylanma soliq',
    value: '4%',
    effectiveDate: 'Amaldagi Soliq kodeksi',
    basis: 'O‘zbekiston Respublikasi Soliq kodeksi 467-modda',
    description: 'Yillik aylanmasi 1 mlrd so‘mgacha bo‘lgan tadbirkorlik subyektlari uchun bazaviy soliq stavkasi.',
  },
  {
    id: 'ijtimoiy_soliq',
    name: 'Ijtimoiy soliq (Tadbirkorlar uchun)',
    shortName: 'Ijtimoiy soliq',
    value: '12%',
    effectiveDate: 'Amaldagi Soliq kodeksi',
    basis: 'O‘zbekiston Respublikasi Soliq kodeksi 405-modda',
    description: 'Yuridik shaxslar tomonidan xodimlarning mehnatiga haq to‘lash fondidan to‘lanadigan majburiy to‘lov.',
  },
  {
    id: 'daromad_soligi_korxona',
    name: 'Foyda solig‘i (Yuridik shaxslar)',
    shortName: 'Foyda solig‘i',
    value: '15%',
    effectiveDate: 'Amaldagi Soliq kodeksi',
    basis: 'O‘zbekiston Respublikasi Soliq kodeksi 337-modda',
    description: 'Umumbelgilangan soliq rejimida faoliyat yurituvchi korxonalarning sof foydasiga solinadigan stavka.',
  },
];

export const LEGAL_CODES: LegalCode[] = [
  {
    id: 'mk',
    title: 'Mehnat kodeksi (Yangi tahrir)',
    adoptedYear: '2023-yil 30-aprel',
    articlesCount: 583,
    lexUrl: 'https://lex.uz/docs/6257288',
    badge: 'Yangi tahrir',
    summary: 'Mehnat munosabatlarini, xodimlar va ish beruvchilarning huquq va burchlarini, mehnat muhofazasini to‘liq tartibga soladi.',
    keyArticles: [
      {
        number: '104-106-moddalar',
        topic: 'Mehnat shartnomasi tuzish',
        description: 'Mehnat shartnomasi yozma shaklda, 2 nusxada tuziladi va my.mehnat.uz (YMMT) da ro‘yxatdan o‘tkazilishi shart.',
      },
      {
        number: '129-132-moddalar',
        topic: 'Dastlabki sinov muddati',
        description: 'Oddiy xodimlar uchun 3 oydan, rahbarlar va bosh buxgalterlar uchun 6 oydan oshmasligi kerak. Homilador va yosh bolali ayollarga belgilanmaydi.',
      },
      {
        number: '160-modda',
        topic: 'Xodim tashabbusi bilan bekor qilish',
        description: 'Xodim 14 kalendar kun oldin ish beruvchini yozma ravishda ogohlantirishi lozim. Qonuniy asoslar mavjud bo‘lganda muddat qisqartirilishi mumkin.',
      },
      {
        number: '161-modda',
        topic: 'Ish beruvchi tashabbusi bilan bekor qilish',
        description: 'Shtat qisqarishi, xodimning malakasi yetarli emasligi yoki mehnat intizomini qo‘pol buzganligi sababli bekor qilish tartibi va kafolatlari.',
      },
      {
        number: '217-modda',
        topic: 'Har yilgi asosiy mehnat ta’tili',
        description: 'Mehnat ta’tilining eng kam muddati 21 kalendar kun etib belgilangan (avvalgi 15 ish kuni o‘rniga).',
      },
    ],
  },
  {
    id: 'sk',
    title: 'Soliq kodeksi',
    adoptedYear: 'Amaldagi tahrir',
    articlesCount: 483,
    lexUrl: 'https://lex.uz/docs/4674902',
    badge: 'Amaldagi',
    summary: 'O‘zbekiston Respublikasi hududida soliqlarni hisoblash, to‘lash, soliq tekshiruvlari va javobgarlik masalalarini qamrab oladi.',
    keyArticles: [
      {
        number: '258-modda',
        topic: 'QQS stavkasi 12%',
        description: 'Tovarlar va xizmatlarni realizatsiya qilishda hisoblanadigan amaldagi QQS stavkasi.',
      },
      {
        number: '467-modda',
        topic: 'Aylanmadan olinadigan soliq',
        description: 'Kichik biznes uchun aylanmadan soliqning asosiy stavkasi 4% miqdorida belgilangan.',
      },
      {
        number: '381-modda',
        topic: 'JShODS (NDFL) 12%',
        description: 'Jismoniy shaxslarning barcha mehnat daromadlariga solinadigan yagona tekis soliq stavkasi.',
      },
      {
        number: '405-modda',
        topic: 'Ijtimoiy soliq',
        description: 'Yuridik shaxslar uchun 12%, byudjet tashkilotlari uchun 25% miqdorida hisoblanadi.',
      },
    ],
  },
  {
    id: 'fk',
    title: 'Fuqarolik kodeksi',
    adoptedYear: 'Amaldagi tahrir',
    articlesCount: 1199,
    lexUrl: 'https://lex.uz/docs/111189',
    badge: 'Asosiy',
    summary: 'Mulk huquqi, shartnomalar, bitimlar, yetkazilgan zararni qoplash, meros va intellektual mulk sohasidagi fuqarolik-huquqiy munosabatlar.',
    keyArticles: [
      {
        number: '150-modda',
        topic: 'Umumiy da’vo muddati',
        description: 'Fuqarolik va iqtisodiy ishlarda umumiy da’vo muddati 3 yil qilib belgilangan.',
      },
      {
        number: '134-144-moddalar',
        topic: 'Ishonchnoma berish tartibi',
        description: 'Ishonchnomaning maksimal muddati 3 yil. Agar muddat ko‘rsatilmagan bo‘lsa, u 1 yil davomida haqiqiy hisoblanadi.',
      },
      {
        number: '382-modda',
        topic: 'Shartnomani o‘zgartirish va bekor qilish',
        description: 'Shartnoma tomonlarning o‘zaro kelishuvi yoki jiddiy buzilish holatida sud orqali bekor qilinishi mumkin.',
      },
      {
        number: '535-557-moddalar',
        topic: 'Mol-mulk ijarasi',
        description: 'Ijara shartnomasi, tomonlarning huquqlari, ijara haqi va shartnomani muddatidan oldin bekor qilish shartlari.',
      },
    ],
  },
  {
    id: 'mjtk',
    title: 'Ma’muriy javobgarlik to‘g‘risidagi kodeks (MJtK)',
    adoptedYear: 'Amaldagi tahrir',
    articlesCount: 348,
    lexUrl: 'https://lex.uz/docs/97661',
    badge: 'Jarimalar va huquqbuzarliklar',
    summary: 'Ma’muriy huquqbuzarliklar, jarimalar, vakolatli organlar va ma’muriy jazolarni ijro etish tartibi.',
    keyArticles: [
      {
        number: '332-1-modda',
        topic: '50% chegirma bilan jarima to‘lash',
        description: 'Huquqbuzar jarima to‘g‘risidagi qaror topshirilgan kundan boshlab 15 kun ichida jarima miqdorining 50 foizini to‘lasa, qolgan qismidan ozod qilinadi (30 kun ichida to‘lasa 70%).',
      },
      {
        number: '49-modda',
        topic: 'Mehnat qonunchiligini buzish',
        description: 'Ish beruvchi tomonidan mehnat qonunlari buzilganda mansabdor shaxsga BHMning 5 baravaridan 10 baravarigacha jarima solinadi.',
      },
      {
        number: '175-modda',
        topic: 'Buxgalteriya va kassa intizomini buzish',
        description: 'Hisob-kitoblar, chek bermaslik yoki to‘lov terminallari bo‘yicha qoidabuzarliklar uchun solinadigan jarimalar.',
      },
    ],
  },
  {
    id: 'ok',
    title: 'Oila kodeksi',
    adoptedYear: 'Amaldagi tahrir',
    articlesCount: 238,
    lexUrl: 'https://lex.uz/docs/104720',
    badge: 'Oila va nikoh',
    summary: 'Nikoh tuzish, bekor qilish, er-xotinning mulkiy huquqlari, farzandlar tarbiyasi va aliment undirish.',
    keyArticles: [
      {
        number: '99-modda',
        topic: 'Voyaga yetmagan bolalarga aliment miqdori',
        description: '1 bola uchun oylik daromadning 1/4 qismi, 2 bola uchun 1/3 qismi, 3 va undan ko‘p bola uchun 1/2 qismi undiriladi.',
      },
      {
        number: '23-modda',
        topic: 'Er va xotinning umumiy birgalikdagi mulki',
        description: 'Nikoh davomida orttirilgan barcha mol-mulklar, agar nikoh shartnomasida boshqacha ko‘rsatilmagan bo‘lsa, teng taqsimlanadi.',
      },
    ],
  },
  {
    id: 'ujk',
    title: 'Uy-joy kodeksi',
    adoptedYear: 'Amaldagi tahrir',
    articlesCount: 141,
    lexUrl: 'https://lex.uz/docs/106136',
    badge: 'Uy-joy va mulk',
    summary: 'Fuqarolarning uy-joy huquqlari, turar joydan foydalanish, ijara munosabatlari va mulkdorlar huquqlari.',
    keyArticles: [
      {
        number: '86-modda',
        topic: 'Turar joyni ijaraga berish',
        description: 'Turar joyni ijaraga berish shartnomasi yozma shaklda tuziladi va soliq organlarida (ijara.soliq.uz) hisobga qo‘yilishi shart.',
      },
    ],
  },
];

export const DOCUMENT_TEMPLATES: DocumentTemplate[] = [
  {
    id: 'mehnat-shartnomasi',
    title: 'Mehnat shartnomasi (Yangi Mehnat kodeksi talablari asosida)',
    category: 'mehnat',
    categoryLabel: 'Mehnat munosabatlari',
    description: 'Xodim va ish beruvchi o‘rtasida O‘zbekiston Respublikasining yangi Mehnat kodeksiga to‘liq muvofiq rasmiy namunaviy shartnoma.',
    legalBasis: 'O‘zbekiston Respublikasi Mehnat kodeksining 104-107-moddalari',
    fields: [
      { key: 'korxona_nomi', label: 'Ish beruvchi korxona nomi', placeholder: 'Masalan: "ORIENT LOGISTICS" MChJ' },
      { key: 'rahbar_fish', label: 'Rahbarning F.I.SH va lavozimi', placeholder: 'Direktor Alimov Sardor Baxtiyorovich' },
      { key: 'xodim_fish', label: 'Xodimning F.I.SH', placeholder: 'Karimov Jasur Otabekovich' },
      { key: 'lavozim', label: 'Xodimning lavozimi', placeholder: 'Bosh hisobchi / Menejer' },
      { key: 'ish_haqi', label: 'Oylik ish haqi (so‘mda)', placeholder: '7 500 000' },
      { key: 'sinov_muddati', label: 'Dastlabki sinov muddati', placeholder: '3 oy (yoki sinov muddati belgilanmagan)' },
      { key: 'shartnoma_muddati', label: 'Shartnoma muddati', placeholder: 'Nomuayyan muddatga (yoki 1 yilga)' },
      { key: 'manzil', label: 'Ish joyi manzili', placeholder: 'Toshkent shahri, Chilonzor tumani, 5-mavze' },
    ],
    templateText: `MEHNAT SHARTNOMASI № [Shartnoma raqami]

[Tuzilgan sana] yil                                                   [Shahar/tuman nomi]

Bir tomondan [Ish beruvchi korxona nomi] nomidan Nizom asosida ish yurituvchi [Rahbarning F.I.SH va lavozimi] (bundan buyon matnda "Ish beruvchi" deb yuritiladi), va ikkinchi tomondan fuqaro [Xodimning F.I.SH] (bundan buyon matnda "Xodim" deb yuritiladi), O‘zbekiston Respublikasining yangi tahrirdagi Mehnat kodeksiga asosan mazkur mehnat shartnomasini quyidagilar haqida tuzdilar:

1. SHARTNOMA PREDMETI
1.1. Xodim [Ish joyi manzili] manzilida joylashgan [Ish beruvchi korxona nomi] ga [Xodimning lavozimi] lavozimiga ishga qabul qilinadi.
1.2. Ishning asosiy joyi hisoblanadi.
1.3. Mazkur shartnoma [Shartnoma muddati] tuzildi.
1.4. Xodimga [Dastlabki sinov muddati] miqdorida dastlabki sinov muddati belgilanadi.
1.5. Ish boshlash sanasi: [Ish boshlash sanasi] yil.

2. XODIMNING HUQUQ VA MAJBURIYATLARI
2.1. Xodimning huquqlari:
- Mehnat sharoitlari, mehnat muhofazasi talablariga javob beradigan ish o‘rni bilan ta’minlanish;
- O‘zbekiston Respublikasi qonunlariga muvofiq o‘z vaqtida va to‘liq hajmda ish haqi olish;
- Yangi Mehnat kodeksining 217-moddasiga asosan davomiyligi 21 kalendar kundan kam bo‘lmagan har yilgi asosiy haq to‘lanadigan mehnat ta’tilidan foydalanish.
2.2. Xodimning majburiyatlari:
- Mehnat majburiyatlarini, lavozim yo‘riqnomasini halol va vijdonan bajarish;
- Mehnat intizomiga, ichki mehnat tartibi qoidalariga qat’iy rioya qilish;
- Ish beruvchining mol-mulkiga ehtiyotkorlik bilan munosabatda bo‘lish, tijorat va xizmat sirini saqlash.

3. ISH BERUVCHINING HUQUQ VA MAJBURIYATLARI
3.1. Ish beruvchining huquqlari:
- Xodimdan mehnat majburiyatlarini vijdonan bajarishini va ichki tartib qoidalariga rioya etishini talab qilish;
- Mehnat to‘g‘risidagi qonunchilikka muvofiq Xodimni rag‘batlantirish yoki unga nisbatan intizomiy jazo choralarini qo‘llash.
3.2. Ish beruvchining majburiyatlari:
- Xodimni mehnat shartnomasida kelishilgan ish bilan ta’minlash;
- Xodimga xavfsiz va sanitariya-gigiyena qoidalariga javob beradigan mehnat sharoitlarini yaratish;
- Har oyda kamida 2 marotaba (avans va oylik) belgilangan muddatlarda ish haqini to‘lash.

4. ISH VAQTI VA DAM OLISH VAQTI
4.1. Xodim uchun haftasiga 5 kunlik, 40 soatlik ish haftasi belgilanadi. Ish vaqti soat 09:00 dan 18:00 gacha, tushlik tanaffusi 13:00 dan 14:00 gacha.
4.2. Xodimga yangi Mehnat kodeksi talablariga asosan har yili davomiyligi [21 kalendar kun] dan iborat haq to‘lanadigan asosiy ta’til beriladi.

5. MEHNATGA HAQ TO‘LASH SHARTLARI
5.1. Xodimga har oyda [Oylik ish haqi (so‘mda)] so‘m miqdorida maosh belgilanadi.
5.2. Qonunchilikka muvofiq ushbu summadan daromad solig‘i va majburiy to‘lovlar ushlab qolinadi.

6. MEHNAT SHARTNOMASINI BEKOR QILISH TARTIBI
6.1. Mazkur shartnoma O‘zbekiston Respublikasi Mehnat kodeksida nazarda tutilgan asoslar bo‘yicha bekor qilinishi mumkin.
6.2. Xodim o‘z tashabbusi bilan bekor qilishda Ish beruvchini kamida 14 kalendar kun oldin yozma ogohlantiradi.

7. TOMONLARNING REKVIZITLARI VA IMZOLARI:

ISH BERUVCHI:                                       XODIM:
[Ish beruvchi korxona nomi]                          F.I.SH: [Xodimning F.I.SH]
Manzil: [Ish joyi manzili]                            Pasport/ID: [Seriya va raqami]
STIR (INN): [STIR raqami]                            JShSHIR (PINFL): [14 xonali raqam]
H/r: [Bank hisob raqami]                             Yashash manzili: [Yashash manzili]
Bank: [Xizmat ko‘rsatuvchi bank]                     Tel: [Telefon raqami]
Tel: [Telefon raqami]

Rahbar: _________ [Rahbarning F.I.SH]                 Xodim: _________ [Xodimning F.I.SH]
M.O‘.`,
  },
  {
    id: 'buyruq-qabul',
    title: 'Buyruq: Xodimni ishga qabul qilish to‘g‘risida',
    category: 'korxona',
    categoryLabel: 'Ichki me’yoriy hujjatlar',
    description: 'Yangi xodimni korxonaga rasmiylashtirish bo‘yicha ichki korporativ buyruq namunasi.',
    legalBasis: 'O‘zbekiston Respublikasi Mehnat kodeksining 127-moddasi',
    fields: [
      { key: 'korxona', label: 'Korxona nomi', placeholder: '"ALPHA TRADE" MChJ' },
      { key: 'buyruq_raqami', label: 'Buyruq raqami', placeholder: '14-K' },
      { key: 'sana', label: 'Buyruq sanasi', placeholder: '2026-yil 1-mart' },
      { key: 'xodim', label: 'Xodim F.I.SH', placeholder: 'Sobirov Jasur Akromovich' },
      { key: 'lavozim', label: 'Lavozimi va bo‘limi', placeholder: 'Sotuv bo‘limi menejeri' },
      { key: 'maosh', label: 'Oylik ish haqi', placeholder: '6 000 000 so‘m' },
      { key: 'sinov', label: 'Sinov muddati', placeholder: '3 oy' },
    ],
    templateText: `[Korxona nomi]
BUYRUQ № [Buyruq raqami]

[Sana]                                                        [Shahar nomi]

"Xodimni ishga qabul qilish to‘g‘risida"

O‘zbekiston Respublikasi Mehnat kodeksining 127-moddasi hamda tuzilgan Mehnat shartnomasiga asosan,

BUYURAMAN:

1. Fuqaro [Xodim F.I.SH] [Sana] dan e’tiboran korxonaning [Lavozimi va bo‘limi] lavozimiga [Sinov muddati] dastlabki sinov muddati bilan ishga qabul qilinsin.
2. Xodimga shtat jadvaliga muvofiq har oyda [Oylik ish haqi] miqdorida rasmiy maosh belgilansin.
3. Bosh buxgalter [Bosh buxgalter F.I.SH] ga:
- Xodimga qonunda belgilangan tartibda oylik ish haqi hisoblanishini ta’minlash;
- Yagona milliy mehnat tizimida (my.mehnat.uz) xodimning mehnat shartnomasini ro‘yxatga olish yuklatilsin.
4. Mazkur buyruqning ijrosini nazorat qilishni o‘z zimmamda qoldiraman.

Asos: [Xodim F.I.SH] ning arizasi, [Sana] dagi №[Shartnoma raqami]-sonli mehnat shartnomasi.

Direktor: _________________ [Rahbar F.I.SH]
M.O‘.

Buyruq bilan tanishdim: _________________ [Xodim F.I.SH] Sana: [Sana]`,
  },
  {
    id: 'buyruq-boshash',
    title: 'Buyruq: Mehnat shartnomasini bekor qilish to‘g‘risida (O‘z xohishiga ko‘ra)',
    category: 'korxona',
    categoryLabel: 'Ichki me’yoriy hujjatlar',
    description: 'Xodimning o‘z xohishi bilan ishdan bo‘shashi bo‘yicha rasmiy buyruq.',
    legalBasis: 'O‘zbekiston Respublikasi Mehnat kodeksining 160, 170-172-moddalari',
    fields: [
      { key: 'korxona', label: 'Korxona nomi', placeholder: '"GLOBAL SERVICE" MChJ' },
      { key: 'buyruq_raqami', label: 'Buyruq raqami', placeholder: '28-K' },
      { key: 'xodim', label: 'Xodim F.I.SH', placeholder: 'Rahimov Jamshid Olimovich' },
      { key: 'lavozim', label: 'Lavozimi', placeholder: 'Marketolog' },
      { key: 'boshash_sanasi', label: 'Ishdan bo‘shash sanasi', placeholder: '2026-yil 15-mart' },
      { key: 'ariza_sanasi', label: 'Xodim yozgan ariza sanasi', placeholder: '2026-yil 1-mart' },
    ],
    templateText: `[Korxona nomi]
BUYRUQ № [Buyruq raqami]

[Ishdan bo‘shash sanasi]                                         [Shahar nomi]

"Mehnat shartnomasini bekor qilish to‘g‘risida"

O‘zbekiston Respublikasi Mehnat kodeksining 160-moddasi (xodimning tashabbusiga ko‘ra mehnat shartnomasini bekor qilish)ga asosan,

BUYURAMAN:

1. [Korxona nomi] ning [Lavozimi] lavozimida ishlovchi [Xodim F.I.SH] bilan tuzilgan mehnat shartnomasi [Ishdan bo‘shash sanasi] kunidan e’tiboran xodimning o‘z xohishiga ko‘ra bekor qilinsin.
2. Buxgalteriya bo‘limiga:
- [Xodim F.I.SH] bilan Mehnat kodeksining 172-moddasiga muvofiq ishdan bo‘shatish kunida to‘liq qayta hisob-kitobni amalga oshirish;
- Foydalanilmagan asosiy va qo‘shimcha mehnat ta’tillari uchun tegishli pul kompensatsiyasini to‘lab berish yuklatilsin.
3. Kadrlar bo‘limiga:
- Mehnat shartnomasi bekor qilinganligi haqidagi ma’lumotlarni Yagona milliy mehnat tizimi (my.mehnat.uz) orqali rasmiylashtirish topshirilsin.

Asos: [Xodim F.I.SH] ning [Xodim yozgan ariza sanasi] dagi arizasi.

Direktor: _________________ [Rahbar F.I.SH]
M.O‘.

Buyruq bilan tanishdim: _________________ [Xodim F.I.SH] Sana: [Ishdan bo‘shash sanasi]`,
  },
  {
    id: 'xizmat-korsatish',
    title: 'Xizmat ko‘rsatish shartnomasi (Fuqarolik-huquqiy xarakterdagi shartnoma - GPH)',
    category: 'shartnoma',
    categoryLabel: 'Tijorat shartnomalari',
    description: 'Buyurtmachi va Ijrochi o‘rtasida muayyan xizmat yoki ishni bajarish bo‘yicha O‘zbekiston FK talablariga mos shartnoma.',
    legalBasis: 'O‘zbekiston Respublikasi Fuqarolik kodeksining 703-711-moddalari',
    fields: [
      { key: 'buyurtmachi', label: 'Buyurtmachi nomi', placeholder: '"DIGITAL INNOVATION" MChJ' },
      { key: 'ijrochi', label: 'Ijrochi F.I.SH / Nomi', placeholder: 'Fuqaro Rustamov Bekzod Alisherovich' },
      { key: 'xizmat_turi', label: 'Ko‘rsatiladigan xizmat mazmuni', placeholder: 'Veb-sayt dizaynini yaratish va dasturiy ta’minotni sozlash' },
      { key: 'shartnoma_qiymati', label: 'Xizmat haqi summasi', placeholder: '15 000 000 so‘m' },
      { key: 'bajarish_muddati', label: 'Xizmatni yakunlash muddati', placeholder: '2026-yil 30-aprel' },
    ],
    templateText: `XIZMAT KO‘RSATISH SHARTNOMASI № [Shartnoma raqami]

[Tuzilgan sana] yil                                                   [Shahar nomi]

Bir tomondan [Buyurtmachi nomi] (bundan buyon matnda "Buyurtmachi" deb yuritiladi), ikkinchi tomondan [Ijrochi F.I.SH / Nomi] (bundan buyon matnda "Ijrochi" deb yuritiladi), O‘zbekiston Respublikasi Fuqarolik kodeksining 703-moddasiga asosan mazkur shartnomani quyidagilar haqida tuzdilar:

1. SHARTNOMA PREDMETI
1.1. Ijrochi Buyurtmachining topshirig‘iga binoan [Ko‘rsatiladigan xizmat mazmuni] xizmatini ko‘rsatish, Buyurtmachi esa ushbu xizmat natijasini qabul qilish va haq to‘lash majburiyatini oladi.
1.2. Xizmatlarni ko‘rsatish muddati: [Bajarish muddati] gacha.

2. SHARTNOMA BAHOSI VA HISOB-KITOBLAR
2.1. Mazkur shartnoma bo‘yicha ko‘rsatilgan xizmatlar umumiy qiymati [Xizmat haqi summasi] so‘mni tashkil etadi.
2.2. To‘lovlar xizmatlar to‘liq bajarilib, tomonlar o‘rtasida Qabul qilish-topshirish dalolatnomasi imzolangan kundan boshlab [5 bank ish kuni] ichida amalga oshiriladi.
2.3. Agar Ijrochi jismoniy shaxs bo‘lsa, Buyurtmachi O‘zbekiston Respublikasi Soliq kodeksiga asosan soliq agenti sifatida daromad solig‘ini (12%) ushlab qoladi va byudjetga o‘tkazadi.

3. TOMONLARNING HUQUQ VA MAJBURIYATLARI
3.1. Ijrochi xizmatlarni yuqori professional darajada va o‘z vaqtida bajarishi shart.
3.2. Buyurtmachi xizmatlarni bajarish uchun zarur ma’lumotlarni o‘z vaqtida taqdim etishi shart.

4. NIZOLARNI HAL QILISH
4.1. Mazkur shartnoma bo‘yicha kelib chiqadigan barcha nizolar muzokaralar yo‘li bilan, kelishuvga erishilmagan taqdirda O‘zbekiston Respublikasining tegishli sudida ko‘rib chiqiladi.

5. TOMONLARNING REKVIZITLARI VA IMZOLARI:

BUYURTMACHI:                                        IJROCHI:
[Buyurtmachi nomi]                                  [Ijrochi F.I.SH / Nomi]
STIR: [STIR raqami]                                 JShSHIR / STIR: [Raqam]
Manzil: [Yuridik manzil]                             Pasport/ID: [Ma’lumotlar]
H/r: [Hisob raqam]                                  Manzil: [Yashash manzili]
Bank: [Bank nomi]                                   Tel: [Telefon raqami]

Imzo: _________________                             Imzo: _________________
M.O‘.`,
  },
  {
    id: 'ijara-noturar',
    title: 'Noturar joy (Bino va inshootlar) ijara shartnomasi',
    category: 'shartnoma',
    categoryLabel: 'Ijara va ko‘chmas mulk',
    description: 'Biznes ofis, do‘kon yoki omborxonani ijaraga berish va olish bo‘yicha rasmiy shartnoma (E-ijara tizimida ro‘yxatga olishga mos).',
    legalBasis: 'O‘zbekiston Respublikasi Fuqarolik kodeksining 573-586-moddalari',
    fields: [
      { key: 'ijaraga_beruvchi', label: 'Ijaraga beruvchi (Mulkdor)', placeholder: '"TOSHKENT REALTY" MChJ' },
      { key: 'ijarachi', label: 'Ijarachi (Kompaniya yoki shaxs)', placeholder: '"SMART PHARMA" MChJ' },
      { key: 'mulk_manzili', label: 'Bino/Ofis joylashgan manzil', placeholder: 'Toshkent sh., Mirobod t., Nukus ko‘chasi, 24-uy' },
      { key: 'maydoni', label: 'Maydoni (kv.m)', placeholder: '120 kv.m' },
      { key: 'ijara_haqi', label: 'Oylik ijara to‘lovi (so‘mda)', placeholder: '18 000 000 so‘m' },
      { key: 'muddat', label: 'Ijara muddati', placeholder: '11 oy (yoki 1 yil)' },
    ],
    templateText: `NOTURAR JOYNI IJARAGA BERISH SHARTNOMASI № [Shartnoma raqami]

[Tuzilgan sana] yil                                                   [Shahar nomi]

Bir tomondan [Ijaraga beruvchi (Mulkdor)] (bundan buyon matnda "Ijaraga beruvchi" deb yuritiladi), va ikkinchi tomondan [Ijarachi (Kompaniya yoki shaxs)] (bundan buyon matnda "Ijarachi" deb yuritiladi), O‘zbekiston Respublikasi Fuqarolik kodeksining 573-moddasiga asosan mazkur shartnomani quyidagilar haqida tuzdilar:

1. SHARTNOMA PREDMETI
1.1. Ijaraga beruvchi o‘ziga mulk huquqi asosida tegishli bo‘lgan, [Bino/Ofis joylashgan manzil] manzilida joylashgan umumiy maydoni [Maydoni (kv.m)] bo‘lgan noturar joyni Ijarachiga vaqtincha egalik qilish va foydalanish uchun haq evaziga topshiradi.
1.2. Mazkur joydan faqat tijorat/ofis maqsadlarida foydalaniladi.
1.3. Mazkur shartnoma davlat soliq xizmati organlarining "E-ijara" (ijara.soliq.uz) portalida ro‘yxatdan o‘tkazilishi shart.

2. SHARTNOMA MUDDATI
2.1. Ijara muddati [Muddat] qilib belgilanadi.
2.2. Agar ijara muddati 1 yildan ortiq bo‘lsa, ushbu shartnoma davlat ro‘yxatidan o‘tkazilishi lozim (FK 574-modda).

3. TO‘LOV SHARTLARI
3.1. Oylik ijara to‘lovi [Oylik ijara to‘lovi (so‘mda)] ni tashkil etadi.
3.2. Ijarachi har oyning [5-sanasiga] qadar to‘lovni oldindan bank hisob-raqamiga o‘tkazadi.
3.3. Kommunal xizmatlar (elektr energiyasi, suv, isitish, internet) haqiqiy iste’mol hisoblagichlari bo‘yicha alohida to‘lanadi.

4. TOMONLARNING JAVOBGARLIGI
4.1. Ijara to‘lovi kechiktirilganda har bir kechiktirilgan kun uchun muddati o‘tgan summaning 0.1% miqdorida penya hisoblanadi, lekin umumiy qarzning 50% idan oshmasligi kerak.

5. REKVIZITLAR VA IMZOLAR:
IJARAGA BERUVCHI:                                   IJARACHI:
[Ijaraga beruvchi (Mulkdor)]                        [Ijarachi (Kompaniya yoki shaxs)]
STIR: [STIR raqami]                                 STIR: [STIR raqami]
H/r: [Bank hisobi]                                  H/r: [Bank hisobi]
Bank: [Bank nomi]                                   Bank: [Bank nomi]
Tel: [Telefon]                                      Tel: [Telefon]

Imzo: ______________                                Imzo: ______________
M.O‘.                                               M.O‘.`,
  },
  {
    id: 'doverennost',
    title: 'Ishonchnoma (Yuridik shaxs nomidan vakolat berish)',
    category: 'fuqarolik',
    categoryLabel: 'Vakillik va ishonchnomalar',
    description: 'Korxona xodimiga bank, sud, davlat xizmatlari yoki soliq organlarida korxona manfaatlarini himoya qilish uchun beriladigan rasmiy ishonchnoma.',
    legalBasis: 'O‘zbekiston Respublikasi Fuqarolik kodeksining 134-144-moddalari',
    fields: [
      { key: 'korxona', label: 'Korxona nomi', placeholder: '"TOSHKENT AGRO TRADE" MChJ' },
      { key: 'rahbar', label: 'Rahbar F.I.SH', placeholder: 'Direktor Qodirov Rustam Erkinovich' },
      { key: 'vakil', label: 'Vakil qilingan shaxs F.I.SH', placeholder: 'Saidov Anvar Karimovich' },
      { key: 'vakil_pasport', label: 'Vakilning pasport / ID ma’lumotlari', placeholder: 'AB 1234567, 12.05.2021 yilda IIB tomonidan berilgan' },
      { key: 'vakolatlar', label: 'Berilayotgan vakolatlar doirasi', placeholder: 'Banklarda to‘lov topshiriqnomalarini imzolash, davlat xizmatlari markazlarida arizalar berish' },
      { key: 'amal_qilish_muddati', label: 'Ishonchnomaning amal qilish muddati', placeholder: '1 (bir) yil muddatga (maksimal 3 yil)' },
    ],
    templateText: `ISHONCHNOMA № [Ishonchnoma raqami]

[Berilgan sana] yil                                                   [Shahar nomi]

[Korxona nomi] (STIR: [STIR raqami], yuridik manzili: [Yuridik manzil]), nomidan Jamiyat Ustavi asosida ish yurituvchi [Rahbar F.I.SH],

Mazkur ishonchnoma orqali fuqaro [Vakil qilingan shaxs F.I.SH] ga (Pasport/ID: [Vakilning pasport / ID ma’lumotlari], JShSHIR: [PINFL raqami], yashash manzili: [Yashash manzili])

quyidagi vakolatlarni beradi:
- [Berilayotgan vakolatlar doirasi];
- [Korxona nomi] nomidan barcha zaruriy hujjatlarni imzolash, arizalar, so‘rovnomalar topshirish va qabul qilib olish;
- Ushbu topshiriqlarni bajarish bilan bog‘liq bo‘lgan barcha qonuniy harakatlarni amalga oshirish.

Mazkur ishonchnoma boshqa shaxsga o‘tkazish (perepoveriye) huquqisiz [Ishonchnomaning amal qilish muddati] gacha berildi.

Vakilning imzo namunasi: _________________ ([Vakil qilingan shaxs F.I.SH]) tasdiqlanadi.

Direktor: _________________ [Rahbar F.I.SH]
M.O‘.`,
  },
  {
    id: 'davo-arizasi',
    title: 'Da’vo arizasi (Iqtisodiy sudga shartnoma bo‘yicha qarzni undirish)',
    category: 'sud',
    categoryLabel: 'Sud va da’vo arizalari',
    description: 'Yetkazib berilgan tovar yoki ko‘rsatilgan xizmat uchun to‘lovni amalga oshirmagan qarzdordan mablag‘ va penyani sud orqali undirish.',
    legalBasis: 'O‘zbekiston Respublikasi Iqtisodiy protsessual kodeksining 149-151-moddalari',
    fields: [
      { key: 'sud_nomi', label: 'Qaysi sudga yuborilmoqda', placeholder: 'Toshkent tumanlararo iqtisodiy sudiga' },
      { key: 'davo_nomi', label: 'Da’vogar nomi va manzili', placeholder: '"GLOBAL SUPPLY" MChJ, Toshkent sh., Mirobod t.' },
      { key: 'javobgar_nomi', label: 'Javobgar nomi va manzili', placeholder: '"MEGA STROY" MChJ, Toshkent sh., Sergeli t.' },
      { key: 'qarz_summasi', label: 'Asosiy qarz summasi', placeholder: '45 000 000 so‘m' },
      { key: 'penya_summasi', label: 'Hisoblangan penya summasi', placeholder: '4 500 000 so‘m' },
      { key: 'shartnoma_rekviziti', label: 'Buzilgan shartnoma sanasi va raqami', placeholder: '2025-yil 10-noyabrdagi № 42-sonli shartnoma' },
    ],
    templateText: `[Qaysi sudga yuborilmoqda]

Da’vogar: [Da’vo_nomi]
STIR: [STIR], H/r: [Hisob raqam], Bank: [Bank nomi]
Telefon: [Telefon], E-mail: [Elektron pochta]

Javobgar: [Javobgar_nomi]
STIR: [Javobgar STIR], H/r: [Javobgar hisob raqami]
Telefon: [Javobgar telefon]

Da’vo bahosi: [Asosiy qarz summasi] so‘m
Davlat boji: [Hisoblangan davlat boji] so‘m

DA’VO ARIZASI
(Shartnoma majburiyatlarini bajarmaslik natijasida vujudga kelgan qarz va penyani undirish to‘g‘risida)

Da’vogar va Javobgar o‘rtasida [Buzilgan shartnoma sanasi va raqami] tuzilgan. Ushbu shartnoma shartlariga ko‘ra, Da’vogar Javobgarga tovarlarni to‘liq hajmda yetkazib berdi (bajarilgan ishlar dalolatnomasi va hisob-faktura ilova qilinadi).

Biroq, Javobgar shartnomaning to‘lovga oid bandlarini buzib, to‘lovni o‘z vaqtida amalga oshirmadi. Natijada Javobgarning Da’vogar oldidagi asosiy qarz summasi [Asosiy qarz summasi] so‘mni tashkil etmoqda.

Da’vogar tomonidan Javobgarga [Pretenziya yuborilgan sana] kuni qarzni to‘lash to‘g‘risida rasmiy talabnoma (pretenziya) yuborilgan bo‘lsa-da, Javobgar qarzni to‘lamadi.

O‘zbekiston Respublikasi Fuqarolik kodeksining 236, 237, 324-327-moddalari hamda Iqtisodiy protsessual kodeksining 149-moddasiga asosan,

SO‘RAYMAN:

1. Javobgar [Javobgar_nomi] hisobidan Da’vogar foydasiga [Asosiy qarz summasi] so‘m asosiy qarz hamda [Penya_summasi] so‘m penya, jami [Jami summa] so‘m undirib berilsin.
2. Da’vogar tomonidan to‘langan davlat boji va pochta xarajatlari Javobgar zimmasiga yuklatilsin.

Ilovalar:
1. Davlat boji to‘langanligi to‘g‘risida to‘lov topshiriqnomasi.
2. Shartnoma nusxasi.
3. Hisob-faktura va yukxatlar nusxasi.
4. Talabnoma (pretenziya) va uni pochta orqali yuborilganligi kvitansiyasi.
5. Da’vogarning davlat ro‘yxatidan o‘tganligi to‘g‘risida guvohnoma.

Da’vogar rahbari: _________________ [Rahbar F.I.SH]
Sana: [Topshirilgan sana]`,
  },
  {
    id: 'tilxat-qarz',
    title: 'Tilxat (Qarz olinganligi to‘g‘risida rasmiy yozma tasdiqnoma)',
    category: 'fuqarolik',
    categoryLabel: 'Fuqarolararo bitimlar',
    description: 'Fuqarolar o‘rtasida naqd yoki o‘tkazma shaklda qarz olinganida sud uchun yuridik kuchga ega bo‘lgan tilxat.',
    legalBasis: 'O‘zbekiston Respublikasi Fuqarolik kodeksining 732-735-moddalari',
    fields: [
      { key: 'qarz_oluvchi', label: 'Qarz oluvchi F.I.SH', placeholder: 'Aliyev Valijon Karimovich' },
      { key: 'qarz_beruvchi', label: 'Qarz beruvchi F.I.SH', placeholder: 'Tursunov Akrom Bahodirovich' },
      { key: 'qarz_summasi', label: 'Qarz summasi (raqam va so‘z bilan)', placeholder: '20 000 000 (yigirma million) so‘m' },
      { key: 'qaytarish_muddati', label: 'Qarzni qaytarish oxirgi muddati', placeholder: '2026-yil 1-sentyabr' },
    ],
    templateText: `TILXAT

Men, [Qarz oluvchi F.I.SH] (Pasport/ID: [Pasport seriyasi va raqami], berilgan sana: [Sana], kim tomonidan: [IIB nomi], JShSHIR: [PINFL raqami], yashash manzilim: [To‘liq yashash manzili], telefonim: [Telefon raqami]),

mazkur tilxat orqali tasdiqlaymanki, fuqaro [Qarz beruvchi F.I.SH] dan (Pasport/ID: [Qarz beruvchi pasporti], yashash manzili: [Qarz beruvchi manzili])

shaxsiy ehtiyojlarim uchun [Qarz summasi (raqam va so‘z bilan)] miqdoridagi pul mablag‘ini qarz sifatida naqd/o‘tkazma shaklda qabul qilib oldim.

Mazkur qarz mablag‘ini to‘liq va so‘zsiz ravishda [Qarzni qaytarish oxirgi muddati] sanasiga qadar qaytarish majburiyatini o‘z zimmamga olaman.

Agar qarz summasi ko‘rsatilgan muddatda qaytarilmasa, O‘zbekiston Respublikasi Fuqarolik kodeksining 732-736-moddalariga asosan O‘zbekiston Respublikasining fuqarolik ishlari bo‘yicha sudiga murojaat qilish orqali qarz summasini majburiy undirish huquqiga ega ekanligi haqida ogohlantirildim.

Tilxat o‘z qo‘lim bilan, aqli raso holatda, hech qanday majburlashsiz yozildi.

Qarz oluvchi: _________________ [Qarz oluvchi F.I.SH]
(Imzo)
Sana: [Tilxat yozilgan sana] yil`,
  },
  {
    id: 'ariza-murojaat',
    title: 'Ariza: Tashkilot yoki davlat organiga rasmiy murojaat',
    category: 'fuqarolik',
    categoryLabel: 'Murojaatlar va arizalar',
    description: 'Fuqarolar va yuridik shaxslarning davlat idoralari yoki tashkilotlarga qonuniy huquqlarini amalga oshirish yuzasidan namunaviy arizasi.',
    legalBasis: 'O‘zbekiston Respublikasining "Jismoniy va yuridik shaxslarning murojaatlari to‘g‘risida"gi Qonuni',
    fields: [
      { key: 'organ_nomi', label: 'Qaysi idora/tashkilot rahbariga', placeholder: 'Toshkent shahar Chilonzor tumani hokimiga' },
      { key: 'ariza_beruvchi', label: 'Ariza beruvchining F.I.SH', placeholder: 'Rustamov Alisher Olimovich' },
      { key: 'manzil', label: 'Yashash manzili va telefon', placeholder: 'Toshkent sh., Chilonzor t., 7-mavze, 12-uy. Tel: +998 90 123-45-67' },
      { key: 'mazmun', label: 'Murojaatning qisqacha mazmuni va iltimos', placeholder: 'Tadbirkorlik faoliyatini kengaytirish uchun yer maydoni ajratish masalasini ko‘rib chiqishingizni so‘rayman' },
    ],
    templateText: `[Qaysi idora/tashkilot rahbariga]

Ariza beruvchi: [Ariza beruvchining F.I.SH]
Yashash manzili: [Yashash manzili va telefon]
Pasport/ID: [Pasport seriyasi va raqami, berilgan sana]
JShSHIR (PINFL): [14 xonali raqam]

ARIZA

Men mazkur arizam orqali quyidagilarni ma’lum qilaman:

[Murojaatning qisqacha mazmuni va iltimos]

O‘zbekiston Respublikasining "Jismoniy va yuridik shaxslarning murojaatlari to‘g‘risida"gi Qonunining 19-28-moddalariga asosan arizamni qonunda belgilangan muddatlarda ko‘rib chiqishingizni hamda natijasi yuzasidan yozma ravishda javob xati berishingizni so‘rayman.

Ilovalar:
1. Shaxsni tasdiqlovchi hujjat nusxasi.
2. [Mavzuga doir qo‘shimcha hujjatlar nomi].

Ariza beruvchi: _________________ [Ariza beruvchining F.I.SH]
Sana: [Topshirilgan sana] yil`,
  },
  {
    id: 'shikoyat-organ',
    title: 'Shikoyat: Mansabdor shaxslarning harakati (harakatsizligi) ustidan',
    category: 'sud',
    categoryLabel: 'Shikoyatlar va sud',
    description: 'Davlat xodimlari yoki tashkilotlarning noqonuniy xatti-harakatlari yoxud asossiz rad etishlari ustidan yuqori turuvchi organga shikoyat.',
    legalBasis: 'O‘zbekiston Respublikasining "Jismoniy va yuridik shaxslarning murojaatlari to‘g‘risida"gi Qonuni 6-moddasi',
    fields: [
      { key: 'yuqori_organ', label: 'Yuqori turuvchi organ/Rahbar lavozimi', placeholder: 'O‘zbekiston Respublikasi Bosh prokuraturasiga' },
      { key: 'shikoyat_qiluvchi', label: 'Shikoyat qiluvchi F.I.SH/Nomi', placeholder: 'Karimov Jasur Baxtiyorovich' },
      { key: 'qoidabuzar_mansabdor', label: 'Qaysi organ yoki mansabdor ustidan', placeholder: 'Yunusobod tumani Soliq inspeksiyasi bo‘lim boshlig‘i ustidan' },
      { key: 'qoidabuzarlik_holati', label: 'Qonunbuzarlik tafsilotlari', placeholder: 'Ortiqcha to‘langan soliqlarni qaytarish to‘g‘risidagi arizam 30 kundan ortiq vaqt davomida asossiz ko‘rib chiqilmasdan qoldirilgan' },
    ],
    templateText: `[Yuqori turuvchi organ/Rahbar lavozimi]

Shikoyat beruvchi: [Shikoyat qiluvchi F.I.SH/Nomi]
Manzil: [Manzil va telefon raqami]
STIR / JShSHIR: [Identifikatsiya raqami]

SHIKOYAT
(Mansabdor shaxsning noqonuniy xatti-harakati/harakatsizligi ustidan)

[Qaysi organ yoki mansabdor ustidan] tomonidan menga nisbatan qonunchilik talablari buzildi. Xususan:

[Qonunbuzarlik tafsilotlari]

Mazkur harakatlar (harakatsizlik) natijasida mening O‘zbekiston Respublikasi Konstitutsiyasi va qonunlari bilan kafolatlangan huquq va erkinliklarim jiddiy poymol etildi.

Yuqoridagilarga asosan hamda O‘zbekiston Respublikasining "Jismoniy va yuridik shaxslarning murojaatlari to‘g‘risida"gi Qonuniga muvofiq,

SO‘RAYMAN:
1. Mazkur shikoyatimda bayon etilgan holatlarni har tomonlama va xolisona o‘rganib chiqishni;
2. [Qaysi organ yoki mansabdor ustidan] ning qonunga xilof harakatlariga (harakatsizligiga) nisbatan qonuniy chora ko‘rishni va buzilgan huquqlarimni tiklashni;
3. Ko‘rib chiqish natijalari to‘g‘risida qonunda belgilangan muddatda yozma ma’lumot berishni.

Ilova: Qonunbuzarlikni tasdiqlovchi dalil va hujjatlar nusxalari.

Shikoyat beruvchi: _________________ [Shikoyat qiluvchi F.I.SH/Nomi]
Sana: [Sana] yil`,
  },
  {
    id: 'talabnoma-pretenziya',
    title: 'Talabnoma (Pretenziya): Shartnoma bo‘yicha qarz va majburiyatlarni bajarish talabi',
    category: 'shartnoma',
    categoryLabel: 'Tijorat va pretenziyalar',
    description: 'Sudgacha majburiy tartibda kontragentga yuboriladigan qarzni to‘lash yoki zararni qoplash talabnomasi.',
    legalBasis: 'O‘zbekiston Respublikasi Fuqarolik kodeksining 236, 324-moddalari',
    fields: [
      { key: 'qarzdor_nomi', label: 'Qarzdor korxona / Shaxs nomi', placeholder: '"MODERN BUILDING" MChJ direktoriga' },
      { key: 'talab_qiluvchi', label: 'Talab qo‘yuvchi korxona / Shaxs', placeholder: '"GLOBAL LOGISTICS" MChJ' },
      { key: 'shartnoma_sanasi_raqami', label: 'Shartnoma raqami va sanasi', placeholder: '2025-yil 15-sentyabrdagi № 48-sonli shartnoma' },
      { key: 'qarz_summasi', label: 'To‘lanmagan qarz va penya summasi', placeholder: '32 000 000 so‘m asosiy qarz va 3 200 000 so‘m penya' },
      { key: 'ijro_muddati', label: 'Qarzni to‘lash uchun berilayotgan muddat', placeholder: '10 bank ish kuni ichida' },
    ],
    templateText: `KIMGA: [Qarzdor korxona / Shaxs nomi]
Manzil: [Qarzdor manzili va STIR]

KIMDAN: [Talab qo‘yuvchi korxona / Shaxs]
Manzil: [Manzil, STIR, hisob raqam va telefon]

TALABNOMA (PRETENZIYA)
(Shartnoma bo‘yicha majburiyatlarni bajarish va qarzni to‘lash to‘g‘risida)

Tomonlarimiz o‘rtasida [Shartnoma raqami va sanasi] tuzilgan. Mazkur shartnomaga muvofiq, biz tomonimizdan o‘z zimmamizdagi barcha majburiyatlar to‘liq va sifatli bajarilgan (qabul qilish-topshirish dalolatnomalari va hisob-fakturalar tasdiqlaydi).

Biroq, Siz tomoningizdan shartnomaning to‘lovga oid talablari qo‘pol ravishda buzilib, hozirgi kunga qadar [To‘lanmagan qarz va penya summasi] miqdoridagi to‘lov amalga oshirilmasdan kelinmoqda.

O‘zbekiston Respublikasi Fuqarolik kodeksining 236, 324, 333-moddalariga asosan,

TALAB QILAMIZ:

Mazkur talabnoma olingan kundan boshlab [Qarzni to‘lash uchun berilayotgan muddat] to‘lanmagan qarz summasini to‘liq hajmda bizning hisob-raqamimizga o‘tkazib berishingizni so‘raymiz.

Aks holda, O‘zbekiston Respublikasi Iqtisodiy protsessual kodeksiga asosan tegishli Iqtisodiy sudga da’vo arizasi bilan murojaat qilinishini hamda ushbu holatda barcha sud xarajatlari, advokat xizmati haqi va qo‘shimcha jarimalar Sizning hisobingizdan undirilishini ma’lum qilamiz.

Ilovalar:
1. Hisob-faktura va solishtirma dalolatnoma nusxasi.
2. Shartnoma nusxasi.

Rahbar: _________________ [Rahbar F.I.SH]
M.O‘.
Sana: [Yuborilgan sana] yil`,
  },
  {
    id: 'murojaat-ishberuvchi',
    title: 'Ariza: Ish beruvchiga mehnat huquqlari va to‘lanmagan oylik bo‘yicha',
    category: 'mehnat',
    categoryLabel: 'Mehnat munosabatlari',
    description: 'Oylik ish haqi kechiktirilganda, ta’til berilmaganda yoki mehnat sharoiti buzilganda ish beruvchi rahbariga yoziladigan qonuniy ariza.',
    legalBasis: 'O‘zbekiston Respublikasi Yangi Mehnat kodeksining 253, 537-moddalari',
    fields: [
      { key: 'ish_beruvchi_rahbar', label: 'Korxona rahbari lavozimi va F.I.SH', placeholder: '"PREMIUM STROY" MChJ Bosh direktori Qodirov Sh.A.ga' },
      { key: 'xodim_lavozim', label: 'Xodimning lavozimi va F.I.SH', placeholder: 'Katta muhandis Sultonov Davron Karimovich' },
      { key: 'kechiktirilgan_davr', label: 'Kechiktirilgan oylar va summa', placeholder: '2026-yil yanvar va fevral oylari uchun jami 14 000 000 so‘m ish haqi' },
    ],
    templateText: `[Korxona rahbari lavozimi va F.I.SH]

[Xodimning lavozimi va F.I.SH] dan
Pasport/ID: [Seriya va raqami]
Telefon: [Telefon raqami]

ARIZA
(Kechiktirilgan ish haqini to‘lash to‘g‘risida)

Men [Korxona rahbari lavozimi va F.I.SH] boshchiligidagi korxonada [Xodimning lavozimi va F.I.SH] lavozimida mehnat shartnomasi asosida faoliyat yuritib kelmoqdaman.

O‘zbekiston Respublikasining yangi tahrirdagi Mehnat kodeksining 253-moddasiga ko‘ra: "Ish beruvchi xodimga ish haqini ushbu Kodeksda, jamoa shartnomasida yoki mehnat shartnomasida belgilangan muddatlarda to‘lashi shart".

Biroq, menga [Kechiktirilgan oylar va summa] miqdoridagi oylik ish haqi qonunda belgilangan muddatlarda to‘lanmasdan kelinmoqda.

Shu munosabat bilan, yangi Mehnat kodeksining 253 va 333-moddalariga muvofiq, kechiktirilgan ish haqimni qonunda belgilangan kompensatsiya to‘lovlari bilan birga zudlik bilan to‘lab berishingizni so‘rayman.

Ushbu qonuniy talabim 3 kun muddatda qanoatlantirilmagan taqdirda, Davlat mehnat inspeksiyasiga, Prokuratura organlariga hamda Fuqarolik ishlari bo‘yicha sudga murojaat qilishimni ma’lum qilaman.

Xodim: _________________ [Xodimning lavozimi va F.I.SH]
Sana: [Topshirilgan sana] yil`,
  },
  {
    id: 'aliment-ariza',
    title: 'Da’vo arizasi: Sud orqali aliment undirish to‘g‘risida',
    category: 'sud',
    categoryLabel: 'Sud va aliment',
    description: 'Voyaga yetmagan bolalar ta’minoti uchun ota (yoki ona)dan oylik aliment undirish to‘g‘risida sudga da’vo arizasi loyihasi.',
    legalBasis: 'O‘zbekiston Respublikasi Oila kodeksining 96, 99-moddalari',
    fields: [
      { key: 'sud_nomi', label: 'Fuqarolik ishlari bo‘yicha sud nomi', placeholder: 'Fuqarolik ishlari bo‘yicha Mirzo Ulug‘bek tumanlararo sudiga' },
      { key: 'davogar', label: 'Da’vogar (Ona/Ota) F.I.SH va manzili', placeholder: 'Aliyeva Madina Rustamovna, Toshkent sh., Mirzo Ulug‘bek t.' },
      { key: 'javobgar', label: 'Javobgar (Ota/Ona) F.I.SH va manzili', placeholder: 'Aliyev Farhod Sherzodovich, Toshkent sh., Yunusobod t.' },
      { key: 'bolalar', label: 'Bolalarning F.I.SH va tug‘ilgan sanalari', placeholder: 'Aliyev Timur Farhodovich (14.06.2018 y.t.), Aliyeva Ziyoda Farhodovna (20.09.2021 y.t.)' },
    ],
    templateText: `[Fuqarolik ishlari bo‘yicha sud nomi]

Da’vogar: [Da’vogar (Ona/Ota) F.I.SH va manzili]
Pasport/ID: [Ma’lumotlar], Tel: [Telefon raqami]

Javobgar: [Javobgar (Ota/Ona) F.I.SH va manzili]
Pasport/ID: [Ma’lumotlar], Tel: [Telefon raqami], Ish joyi: [Ish joyi]

DA’VO ARIZASI
(Voyaga yetmagan bolalar ta’minoti uchun aliment undirish to‘g‘risida)

Men va Javobgar [Nikoh tuzilgan sana] yilda qonuniy nikohdan o‘tganmiz. Birgalikdagi turmushimizdan quyidagi farzand(lar)imiz bor:

[Bolalarning F.I.SH va tug‘ilgan sanalari]

Hozirgi kunda Javobgar bilan birga yashamaymiz va u bolalarning moddiy ta’minotida ixtiyoriy ravishda ishtirok etmayapti, ularning tarbiyasi va zaruriy ehtiyojlariga pul mablag‘i ajratmayapti. Bolalar to‘liq mening qaramog‘imda.

O‘zbekiston Respublikasi Oila kodeksining 96-moddasiga binoan ota-ona voyaga yetmagan bolalariga ta’minot berishi shart. Oila kodeksining 99-moddasiga ko‘ra aliment sud tomonidan har oydagi daromaddan: bir bolaga — to‘rtdan bir qismi (1/4), ikki bolaga — uchdan bir qismi (1/3), uch va undan ortiq bolaga — yarmi (1/2) miqdorida undiriladi.

Shuningdek, "Davlat boji to‘g‘risida"gi O‘zbekiston Respublikasi Qonuniga muvofiq, da’vogar aliment undirish haqidagi da’volar bo‘yicha davlat bojidan ozod etilgan.

Yuqoridagilarga asosan,

SO‘RAYMAN:

Javobgar [Javobgar (Ota/Ona) F.I.SH va manzili] hisobidan mening foydamga voyaga yetmagan farzand(lar)imiz:
[Bolalarning F.I.SH va tug‘ilgan sanalari] ta’minoti uchun har oyda uning barcha turdagi ish haqi va daromadlarining [Tegishli qismi: 1/4 yoki 1/3 yoki 1/2] qismi miqdorida da’vo arizasi berilgan kundan boshlab bolalar voyaga yetgunga qadar aliment undirib berishingizni so‘rayman.

Ilovalar:
1. Nikoh guvohnomasi nusxasi.
2. Bolalarning tug‘ilganlik haqidagi guvohnomalari nusxasi.
3. Da’vogarning shaxsini tasdiqlovchi hujjat nusxasi.
4. Yashash joyidan ma’lumotnoma (bolalar birga yashashini tasdiqlovchi).
5. Da’vo arizasi nusxasi (Javobgar uchun).

Da’vogar: _________________ [Da’vogar (Ona/Ota) F.I.SH va manzili]
Sana: [Topshirilgan sana] yil`,
  },
];

export const QUICK_PROMPTS = [
  {
    role: 'tadbirkor',
    title: 'Xodimni ishdan bo‘shatish',
    prompt: 'Xodim 2 haftalik ogohlantirishsiz ishdan darhol ketmoqchi. Yangi Mehnat kodeksi bo‘yicha qanday tartib bor va ish beruvchi unga qanday javob qaytarishi lozim?',
  },
  {
    role: 'tadbirkor',
    title: 'Aylanmadan soliq yoki QQS?',
    prompt: 'Korxonam aylanmasi 1 milliard so‘mdan oshdi. QQSga o‘tish tartibi, stavkalar va hisob-faktura yuritish talablari qanday?',
  },
  {
    role: 'buxgalter',
    title: 'Foydalanilmagan ta’til kompensatsiyasi',
    prompt: 'Xodim 1 yil davomida ish ta’tiliga chiqmagan va hozir ishdan bo‘shayapti. Yangi Mehnat kodeksi bo‘yicha unga kompensatsiya hisoblash tartibi qanday?',
  },
  {
    role: 'buxgalter',
    title: 'E-ijara va soliq hisoboti',
    prompt: 'Noturar joyni jismoniy shaxsdan ijaraga olgan korxona qanday soliq to‘laydi va ijara.soliq.uz portalida qanday ro‘yxatga olinadi?',
  },
  {
    role: 'fuqaro',
    title: 'Aliment undirish tartibi',
    prompt: '2 nafar voyaga yetmagan farzand uchun sud orqali aliment undirish miqdori qancha va uni qanday ariza bilan talab qilish kerak?',
  },
  {
    role: 'fuqaro',
    title: 'Yo‘l jarimasini 50% arzon to‘lash',
    prompt: 'Menga yo‘l harakati qoidabuzarligi bo‘yicha jarima yozildi. MJtK 332-1-moddasi bo‘yicha 50% chegirmali to‘lov muddatlari va shartlari qanday?',
  },
  {
    role: 'tadbirkor',
    title: 'Kompaniya nomidan ishonchnoma',
    prompt: 'MChJ direktori nomidan kadrlar bo‘limi boshlig‘iga mehnat daftarchalari va shartnomalarni imzolash huquqi bilan ishonchnoma matnini tayyorlab bering.',
  },
];
