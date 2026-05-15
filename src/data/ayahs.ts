import { Ayah } from '../types';

export const AYAHS: Ayah[] = [
  // ============================================================
  // SURAH 1: AL-FATIHAH (The Opening)
  // ============================================================
  {
    surahId: 1, ayahNumber: 1,
    arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    transliteration: 'Bismillāhi r-raḥmāni r-raḥīm',
    translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
    words: [
      { arabic: 'بِسْمِ', transliteration: 'Bismi', meaning: 'In the name', root: 'س م و', grammar: 'Preposition + Noun' },
      { arabic: 'اللَّهِ', transliteration: 'Allāhi', meaning: 'of Allah', root: 'أ ل ه', grammar: 'Proper noun (genitive)' },
      { arabic: 'الرَّحْمَٰنِ', transliteration: 'ar-raḥmāni', meaning: 'the Most Gracious', root: 'ر ح م', grammar: 'Adjective (genitive)' },
      { arabic: 'الرَّحِيمِ', transliteration: 'ar-raḥīm', meaning: 'the Most Merciful', root: 'ر ح م', grammar: 'Adjective (genitive)' },
    ],
    tafsir: 'This opening verse, known as the Basmala, is recited before every Surah except At-Tawbah. It establishes that everything begins with Allah\'s name and His two attributes of mercy. Ar-Rahman refers to His vast mercy that encompasses all creation, while Ar-Raheem refers to His special mercy reserved for the believers.',
    revelationReason: 'The Basmala was revealed as a blessing to begin every chapter of the Quran, emphasizing that all actions should begin with Allah\'s name.',
    themes: ['Mercy', 'Allah\'s Names', 'Beginning'],
    difficulty: 2,
    juz: 1,
    page: 1
  },
  {
    surahId: 1, ayahNumber: 2,
    arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
    transliteration: 'Al-ḥamdu lillāhi rabbi l-ʿālamīn',
    translation: 'All praise is due to Allah, Lord of all the worlds.',
    words: [
      { arabic: 'الْحَمْدُ', transliteration: 'Al-ḥamdu', meaning: 'All praise', root: 'ح م د', grammar: 'Noun (nominative)' },
      { arabic: 'لِلَّهِ', transliteration: 'lillāhi', meaning: 'is for Allah', root: 'أ ل ه', grammar: 'Preposition + proper noun' },
      { arabic: 'رَبِّ', transliteration: 'rabbi', meaning: 'Lord', root: 'ر ب ب', grammar: 'Noun (genitive)' },
      { arabic: 'الْعَالَمِينَ', transliteration: 'l-ʿālamīn', meaning: 'of all worlds', root: 'ع ل م', grammar: 'Plural noun (genitive)' },
    ],
    tafsir: 'Al-Hamd means praising and thanking Allah for all His blessings. "Rabb" (Lord) means the One who created, sustains, and nurtures all. "Al-Alameen" includes all of creation — humans, jinn, angels, animals, and everything in existence. This verse teaches us to begin with gratitude.',
    themes: ['Praise', 'Gratitude', 'Allah\'s Lordship'],
    difficulty: 2,
    juz: 1,
    page: 1
  },
  {
    surahId: 1, ayahNumber: 3,
    arabic: 'الرَّحْمَٰنِ الرَّحِيمِ',
    transliteration: 'Ar-raḥmāni r-raḥīm',
    translation: 'The Entirely Merciful, the Especially Merciful.',
    words: [
      { arabic: 'الرَّحْمَٰنِ', transliteration: 'Ar-raḥmāni', meaning: 'The Most Gracious', root: 'ر ح م', grammar: 'Adjective' },
      { arabic: 'الرَّحِيمِ', transliteration: 'ar-raḥīm', meaning: 'The Most Merciful', root: 'ر ح م', grammar: 'Adjective' },
    ],
    tafsir: 'These two names of Allah are repeated from the Basmala to emphasize the importance of mercy as a divine attribute. Ar-Rahman is broader — His mercy extends to all creation. Ar-Raheem is more intense — His special mercy for believers in the afterlife.',
    themes: ['Mercy', 'Divine Attributes'],
    difficulty: 2,
    juz: 1,
    page: 1
  },
  {
    surahId: 1, ayahNumber: 4,
    arabic: 'مَالِكِ يَوْمِ الدِّينِ',
    transliteration: 'Māliki yawmi d-dīn',
    translation: 'Master of the Day of Recompense.',
    words: [
      { arabic: 'مَالِكِ', transliteration: 'Māliki', meaning: 'Master/Owner', root: 'م ل ك', grammar: 'Noun (genitive)' },
      { arabic: 'يَوْمِ', transliteration: 'yawmi', meaning: 'of the Day', root: 'ي و م', grammar: 'Noun (genitive)' },
      { arabic: 'الدِّينِ', transliteration: 'd-dīn', meaning: 'of Recompense/Judgment', root: 'د ي ن', grammar: 'Noun (genitive)' },
    ],
    tafsir: 'Allah is the absolute Master and King of the Day of Judgment. "Yawm ad-Din" is the Day when every soul will be recompensed for what it earned. This verse reminds us of accountability and that ultimate power belongs to Allah alone on that day.',
    themes: ['Day of Judgment', 'Accountability', 'Divine Power'],
    difficulty: 3,
    juz: 1,
    page: 1
  },
  {
    surahId: 1, ayahNumber: 5,
    arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
    transliteration: 'Iyyāka naʿbudu wa-iyyāka nastaʿīn',
    translation: 'You alone we worship, and You alone we ask for help.',
    words: [
      { arabic: 'إِيَّاكَ', transliteration: 'Iyyāka', meaning: 'You alone', root: 'أي ي', grammar: 'Pronoun (accusative, emphatic)' },
      { arabic: 'نَعْبُدُ', transliteration: 'naʿbudu', meaning: 'we worship', root: 'ع ب د', grammar: 'Verb (present tense, plural)' },
      { arabic: 'وَإِيَّاكَ', transliteration: 'wa-iyyāka', meaning: 'and You alone', root: 'أي ي', grammar: 'Conjunction + pronoun' },
      { arabic: 'نَسْتَعِينُ', transliteration: 'nastaʿīn', meaning: 'we seek help', root: 'ع و ن', grammar: 'Verb (present tense, Form X)' },
    ],
    tafsir: 'This is the pivotal verse of Al-Fatihah — the essence of Islam. The pronoun "You" comes before the verb to indicate exclusivity. We worship Allah ALONE and seek help from Allah ALONE. This verse represents the covenant between the servant and Allah, establishing Tawhid (monotheism) and complete reliance (Tawakkul).',
    themes: ['Monotheism', 'Worship', 'Reliance on Allah'],
    difficulty: 3,
    juz: 1,
    page: 1
  },
  {
    surahId: 1, ayahNumber: 6,
    arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
    transliteration: 'Ihdinā ṣ-ṣirāṭa l-mustaqīm',
    translation: 'Guide us to the straight path.',
    words: [
      { arabic: 'اهْدِنَا', transliteration: 'Ihdinā', meaning: 'Guide us', root: 'ه د ي', grammar: 'Verb (imperative) + pronoun' },
      { arabic: 'الصِّرَاطَ', transliteration: 'ṣ-ṣirāṭa', meaning: 'the path/way', root: 'ص ر ط', grammar: 'Noun (accusative)' },
      { arabic: 'الْمُسْتَقِيمَ', transliteration: 'l-mustaqīm', meaning: 'the straight/right', root: 'ق و م', grammar: 'Adjective (Form X)' },
    ],
    tafsir: 'This is the most important supplication — asking Allah for guidance to the straight path. The word "Ihdinā" means not just to show the path, but to keep us on it, firm and steadfast. "As-Sirat al-Mustaqim" is the path of Islam, of those who have received Allah\'s blessings. We recite this at least 17 times daily in our prayers.',
    themes: ['Guidance', 'Supplication', 'The Right Path'],
    difficulty: 3,
    juz: 1,
    page: 1
  },
  {
    surahId: 1, ayahNumber: 7,
    arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
    transliteration: 'Ṣirāṭa lladhīna anʿamta ʿalayhim ghayri l-maghḍūbi ʿalayhim wa-lā ḍ-ḍāllīn',
    translation: 'The path of those upon whom You have bestowed favor, not of those who have evoked Your anger or of those who are astray.',
    words: [
      { arabic: 'صِرَاطَ', transliteration: 'Ṣirāṭa', meaning: 'The path of', root: 'ص ر ط', grammar: 'Noun (accusative)' },
      { arabic: 'الَّذِينَ', transliteration: 'lladhīna', meaning: 'those who', root: 'ل ذ ي', grammar: 'Relative pronoun' },
      { arabic: 'أَنْعَمْتَ', transliteration: 'anʿamta', meaning: 'You have blessed', root: 'ن ع م', grammar: 'Verb (past, Form IV)' },
    ],
    tafsir: 'The path of those whom Allah has favored refers to the prophets, truthful ones, martyrs, and righteous people. Those who evoked anger are those who knew the truth but rejected it. Those who are astray are those who followed wrong paths out of ignorance. This verse asks Allah to keep us on the path of the rightly guided throughout our lives.',
    revelationReason: 'This complete surah was revealed to establish the fundamental relationship between Allah and His servants — gratitude, worship, seeking guidance.',
    themes: ['Guidance', 'The Righteous', 'Warning'],
    difficulty: 4,
    juz: 1,
    page: 1
  },

  // ============================================================
  // SURAH 112: AL-IKHLAS (The Sincerity)
  // ============================================================
  {
    surahId: 112, ayahNumber: 1,
    arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
    transliteration: 'Qul huwa llāhu aḥad',
    translation: 'Say: He is Allah, the One.',
    words: [
      { arabic: 'قُلْ', transliteration: 'Qul', meaning: 'Say', root: 'ق و ل', grammar: 'Verb (imperative)' },
      { arabic: 'هُوَ', transliteration: 'huwa', meaning: 'He', root: 'ه و', grammar: 'Pronoun' },
      { arabic: 'اللَّهُ', transliteration: 'Allāhu', meaning: 'Allah', root: 'أ ل ه', grammar: 'Proper noun' },
      { arabic: 'أَحَدٌ', transliteration: 'aḥad', meaning: 'One/Unique', root: 'و ح د', grammar: 'Adjective (indefinite)' },
    ],
    tafsir: '"Ahad" is a unique form of oneness — absolute, incomparable uniqueness. Unlike "Wahid" (one in number), "Ahad" means there is nothing like Him in any way. This verse is the essence of Tawhid — the pure monotheism that defines Islam. The Prophet ﷺ said this surah equals one-third of the Quran.',
    revelationReason: 'When the Quraysh asked the Prophet ﷺ to describe his Lord, Allah revealed this surah as the complete description of His nature.',
    themes: ['Monotheism', 'Tawhid', 'Divine Uniqueness'],
    difficulty: 1,
    juz: 30,
    page: 604
  },
  {
    surahId: 112, ayahNumber: 2,
    arabic: 'اللَّهُ الصَّمَدُ',
    transliteration: 'Allāhu ṣ-ṣamad',
    translation: 'Allah, the Eternal Refuge.',
    words: [
      { arabic: 'اللَّهُ', transliteration: 'Allāhu', meaning: 'Allah', root: 'أ ل ه', grammar: 'Proper noun' },
      { arabic: 'الصَّمَدُ', transliteration: 'aṣ-ṣamad', meaning: 'the Eternal, the Absolute', root: 'ص م د', grammar: 'Noun/Adjective' },
    ],
    tafsir: '"As-Samad" is one of the greatest names of Allah. It means the One who is self-sufficient, upon whom all creation depends, who needs nothing from anyone. He is the Master whom all seek in times of need. All creatures are dependent on Him while He is dependent on none.',
    themes: ['Divine Attributes', 'Self-Sufficiency', 'Dependence on Allah'],
    difficulty: 2,
    juz: 30,
    page: 604
  },
  {
    surahId: 112, ayahNumber: 3,
    arabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
    transliteration: 'Lam yalid wa-lam yūlad',
    translation: 'He neither begets nor is born.',
    words: [
      { arabic: 'لَمْ', transliteration: 'Lam', meaning: 'He has not', root: 'ل م', grammar: 'Negation particle' },
      { arabic: 'يَلِدْ', transliteration: 'yalid', meaning: 'begotten/fathered', root: 'و ل د', grammar: 'Verb (present jussive)' },
      { arabic: 'وَلَمْ', transliteration: 'wa-lam', meaning: 'and not', root: 'ل م', grammar: 'Conjunction + negation' },
      { arabic: 'يُولَدْ', transliteration: 'yūlad', meaning: 'been born', root: 'و ل د', grammar: 'Verb (passive, jussive)' },
    ],
    tafsir: 'Allah has no children and no parents. This verse refutes Christianity\'s claim of Jesus being God\'s son, and pagan beliefs of Allah having daughters. Everything that is born has a beginning and an end. Allah is beyond birth, death, lineage, and family — completely transcendent.',
    themes: ['Divine Transcendence', 'Refutation of Shirk', 'Monotheism'],
    difficulty: 2,
    juz: 30,
    page: 604
  },
  {
    surahId: 112, ayahNumber: 4,
    arabic: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
    transliteration: 'Wa-lam yakun lahū kufuwan aḥad',
    translation: 'Nor is there to Him any equivalent.',
    words: [
      { arabic: 'وَلَمْ', transliteration: 'Wa-lam', meaning: 'And there is not', root: 'ل م', grammar: 'Conjunction + negation' },
      { arabic: 'يَكُن', transliteration: 'yakun', meaning: 'is/are', root: 'ك و ن', grammar: 'Verb (jussive)' },
      { arabic: 'لَّهُ', transliteration: 'lahū', meaning: 'for Him', root: 'ل', grammar: 'Preposition + pronoun' },
      { arabic: 'كُفُوًا', transliteration: 'kufuwan', meaning: 'equivalent/equal', root: 'ك ف أ', grammar: 'Noun (accusative)' },
      { arabic: 'أَحَدٌ', transliteration: 'aḥad', meaning: 'anyone', root: 'و ح د', grammar: 'Noun (indefinite)' },
    ],
    tafsir: 'Nothing in all of creation is equal to, similar to, or can be compared to Allah in any way. Not in His essence, attributes, or actions. This is the final seal on the description of Allah\'s absolute uniqueness and incomparability. This surah is a fortress against shirk (associating partners with Allah).',
    themes: ['Divine Incomparability', 'Tawhid', 'Monotheism'],
    difficulty: 3,
    juz: 30,
    page: 604
  },

  // ============================================================
  // SURAH 114: AN-NAS (Mankind)
  // ============================================================
  {
    surahId: 114, ayahNumber: 1,
    arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
    transliteration: 'Qul aʿūdhu bi-rabbi n-nās',
    translation: 'Say: I seek refuge in the Lord of mankind.',
    words: [
      { arabic: 'قُلْ', transliteration: 'Qul', meaning: 'Say', root: 'ق و ل', grammar: 'Imperative verb' },
      { arabic: 'أَعُوذُ', transliteration: 'aʿūdhu', meaning: 'I seek refuge', root: 'ع و ذ', grammar: 'Verb (present)' },
      { arabic: 'بِرَبِّ', transliteration: 'bi-rabbi', meaning: 'in the Lord', root: 'ر ب ب', grammar: 'Preposition + noun' },
      { arabic: 'النَّاسِ', transliteration: 'n-nās', meaning: 'of mankind', root: 'ن و س', grammar: 'Noun (genitive)' },
    ],
    tafsir: 'This is the last surah of the Quran and one of the protective surahs (Al-Mu\'awwidhatain). Seeking refuge with Allah as "Rabb of mankind" establishes His role as creator and sustainer of all humans, making Him the most fitting protector.',
    themes: ['Protection', 'Seeking Refuge', 'Divine Lordship'],
    difficulty: 1,
    juz: 30,
    page: 604
  },
  {
    surahId: 114, ayahNumber: 2,
    arabic: 'مَلِكِ النَّاسِ',
    transliteration: 'Maliki n-nās',
    translation: 'The Sovereign of mankind.',
    words: [
      { arabic: 'مَلِكِ', transliteration: 'Maliki', meaning: 'King/Sovereign', root: 'م ل ك', grammar: 'Noun (genitive)' },
      { arabic: 'النَّاسِ', transliteration: 'n-nās', meaning: 'of mankind', root: 'ن و س', grammar: 'Noun (genitive)' },
    ],
    tafsir: 'Allah is described as "Malik" (King/Sovereign) — the true ruler of all humanity. No earthly king has real power except what Allah grants. This name reminds us that all authority ultimately belongs to Allah alone.',
    themes: ['Divine Sovereignty', 'Kingdom of Allah'],
    difficulty: 1,
    juz: 30,
    page: 604
  },
  {
    surahId: 114, ayahNumber: 3,
    arabic: 'إِلَٰهِ النَّاسِ',
    transliteration: 'Ilāhi n-nās',
    translation: 'The God of mankind.',
    words: [
      { arabic: 'إِلَٰهِ', transliteration: 'Ilāhi', meaning: 'God/Deity', root: 'أ ل ه', grammar: 'Noun (genitive)' },
      { arabic: 'النَّاسِ', transliteration: 'n-nās', meaning: 'of mankind', root: 'ن و س', grammar: 'Noun (genitive)' },
    ],
    tafsir: 'Three attributes of Allah are mentioned in sequence: Rabb (Lord/Sustainer), Malik (King), Ilah (God/Deity). This progression moves from the One who nurtures us, to the One who rules us, to the One who alone deserves our worship. All three attributes point to the same truth.',
    themes: ['Divine Attributes', 'Worship', 'Tawhid'],
    difficulty: 1,
    juz: 30,
    page: 604
  },
  {
    surahId: 114, ayahNumber: 4,
    arabic: 'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ',
    transliteration: 'Min sharri l-waswāsi l-khannās',
    translation: 'From the evil of the retreating whisperer.',
    words: [
      { arabic: 'مِن شَرِّ', transliteration: 'Min sharri', meaning: 'From the evil', root: 'ش ر ر', grammar: 'Preposition + noun' },
      { arabic: 'الْوَسْوَاسِ', transliteration: 'l-waswāsi', meaning: 'the whisperer', root: 'و س و س', grammar: 'Noun (genitive)' },
      { arabic: 'الْخَنَّاسِ', transliteration: 'l-khannās', meaning: 'who retreats/slinks away', root: 'خ ن س', grammar: 'Intensive adjective' },
    ],
    tafsir: '"Al-Waswas" is the whisper — a subtle, quiet temptation. "Al-Khannas" means the one who retreats — Shaytan retreats when Allah is remembered and attacks when one becomes heedless. This is the nature of Shaytan\'s attack: invisible, subtle, and cowardly.',
    themes: ['Protection from Shaytan', 'Evil', 'Spiritual Defense'],
    difficulty: 3,
    juz: 30,
    page: 604
  },
  {
    surahId: 114, ayahNumber: 5,
    arabic: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ',
    transliteration: 'Alladhī yuwaswisu fī ṣudūri n-nās',
    translation: 'Who whispers into the hearts of mankind.',
    words: [
      { arabic: 'الَّذِي', transliteration: 'Alladhī', meaning: 'Who', root: 'ل ذ ي', grammar: 'Relative pronoun' },
      { arabic: 'يُوَسْوِسُ', transliteration: 'yuwaswisu', meaning: 'whispers', root: 'و س و س', grammar: 'Verb (present)' },
      { arabic: 'فِي صُدُورِ', transliteration: 'fī ṣudūri', meaning: 'into the hearts/chests', root: 'ص د ر', grammar: 'Preposition + noun' },
      { arabic: 'النَّاسِ', transliteration: 'n-nās', meaning: 'of mankind', root: 'ن و س', grammar: 'Noun (genitive)' },
    ],
    tafsir: '"Sudur" (chests/hearts) is the seat of human consciousness and decision-making. Shaytan\'s whispers target the innermost self. His strategy is to plant doubt, desires, and delusions in the heart. The antidote is constant remembrance of Allah (dhikr), which drives him away.',
    themes: ['Human Heart', 'Shaytan\'s Methods', 'Inner Struggle'],
    difficulty: 3,
    juz: 30,
    page: 604
  },
  {
    surahId: 114, ayahNumber: 6,
    arabic: 'مِنَ الْجِنَّةِ وَالنَّاسِ',
    transliteration: 'Mina l-jinnati wa-n-nās',
    translation: 'Whether among the jinn or mankind.',
    words: [
      { arabic: 'مِنَ', transliteration: 'Mina', meaning: 'From among', root: 'م ن', grammar: 'Preposition' },
      { arabic: 'الْجِنَّةِ', transliteration: 'l-jinnati', meaning: 'the jinn', root: 'ج ن ن', grammar: 'Noun (genitive)' },
      { arabic: 'وَالنَّاسِ', transliteration: 'wa-n-nās', meaning: 'and mankind', root: 'ن و س', grammar: 'Conjunction + noun' },
    ],
    tafsir: 'Evil whispers come from two sources — jinn (Shaytan and his kind) and human devils (evil companions, bad influences). Human shayateen can be just as dangerous as jinn, whispering bad advice, encouraging sin, and leading others astray. We must seek refuge from both.',
    revelationReason: 'Al-Falaq and An-Nas (the Mu\'awwidhatain) were revealed together during a time when the Prophet ﷺ was affected by magic. They are the ultimate protection.',
    themes: ['Jinn', 'Human Evil', 'Complete Protection'],
    difficulty: 2,
    juz: 30,
    page: 604
  },

  // ============================================================
  // SURAH 113: AL-FALAQ (The Daybreak)
  // ============================================================
  {
    surahId: 113, ayahNumber: 1,
    arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',
    transliteration: 'Qul aʿūdhu bi-rabbi l-falaq',
    translation: 'Say: I seek refuge in the Lord of the daybreak.',
    words: [
      { arabic: 'الْفَلَقِ', transliteration: 'l-falaq', meaning: 'the daybreak/splitting', root: 'ف ل ق', grammar: 'Noun (genitive)' },
    ],
    tafsir: '"Al-Falaq" means the splitting of dawn — the moment darkness breaks and light emerges. Seeking refuge with the "Lord of Daybreak" implies seeking the Creator of light itself, and by extension, all creation. Every sunrise is a sign of Allah\'s power and a reminder of His ability to dispel all darkness.',
    themes: ['Protection', 'Divine Power', 'Light over Darkness'],
    difficulty: 1,
    juz: 30,
    page: 604
  },

  // ============================================================
  // SURAH 103: AL-ASR (The Time)
  // ============================================================
  {
    surahId: 103, ayahNumber: 1,
    arabic: 'وَالْعَصْرِ',
    transliteration: 'Wa-l-ʿaṣr',
    translation: 'By time!',
    words: [
      { arabic: 'وَالْعَصْرِ', transliteration: 'Wa-l-ʿaṣr', meaning: 'By time/The afternoon', root: 'ع ص ر', grammar: 'Oath particle + noun' },
    ],
    tafsir: 'Allah swears by time — a profound oath. Al-Asr can mean time in general, the afternoon prayer time, or the era of humanity. When Allah swears by something, it is to draw our attention to its extreme importance. Time is the most precious and irreplaceable resource we have.',
    themes: ['Time', 'Oath', 'Value of Life'],
    difficulty: 2,
    juz: 30,
    page: 601
  },
  {
    surahId: 103, ayahNumber: 2,
    arabic: 'إِنَّ الْإِنسَانَ لَفِي خُسْرٍ',
    transliteration: 'Inna l-insāna lafī khusr',
    translation: 'Indeed, mankind is in loss.',
    words: [
      { arabic: 'إِنَّ', transliteration: 'Inna', meaning: 'Indeed/Verily', root: 'أ ن ن', grammar: 'Emphatic particle' },
      { arabic: 'الْإِنسَانَ', transliteration: 'l-insāna', meaning: 'mankind/the human', root: 'أ ن س', grammar: 'Noun (accusative)' },
      { arabic: 'لَفِي', transliteration: 'lafī', meaning: 'is surely in', root: 'ف ي', grammar: 'Emphatic lam + preposition' },
      { arabic: 'خُسْرٍ', transliteration: 'khusr', meaning: 'loss/ruin', root: 'خ س ر', grammar: 'Noun (indefinite genitive)' },
    ],
    tafsir: 'The default state of humanity without faith and good deeds is loss — spiritual bankruptcy. Time keeps moving forward, but if we are not using it for what truly matters, we are losing our most precious capital. Imam Ash-Shafi\'i said: "If people reflected deeply on this surah, it would be sufficient for their guidance."',
    themes: ['Human Loss', 'Urgency', 'Accountability'],
    difficulty: 3,
    juz: 30,
    page: 601
  },
  {
    surahId: 103, ayahNumber: 3,
    arabic: 'إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ',
    transliteration: 'Illā lladhīna āmanū wa-ʿamilū ṣ-ṣāliḥāti wa-tawāṣaw bi-l-ḥaqqi wa-tawāṣaw bi-ṣ-ṣabr',
    translation: 'Except those who believe and do righteous deeds and advise each other to truth and advise each other to patience.',
    words: [
      { arabic: 'إِلَّا', transliteration: 'Illā', meaning: 'Except', root: 'أ ل ل', grammar: 'Exception particle' },
      { arabic: 'آمَنُوا', transliteration: 'āmanū', meaning: 'believed', root: 'أ م ن', grammar: 'Verb (past, plural)' },
      { arabic: 'وَعَمِلُوا', transliteration: 'wa-ʿamilū', meaning: 'and did', root: 'ع م ل', grammar: 'Verb (past, plural)' },
      { arabic: 'الصَّالِحَاتِ', transliteration: 'ṣ-ṣāliḥāti', meaning: 'righteous deeds', root: 'ص ل ح', grammar: 'Adjective used as noun (genitive plural)' },
      { arabic: 'وَتَوَاصَوْا', transliteration: 'wa-tawāṣaw', meaning: 'and advised each other', root: 'و ص ي', grammar: 'Verb (past, Form VI, plural)' },
    ],
    tafsir: 'The four elements of success: (1) Iman - sincere faith in Allah, (2) Righteous deeds - translating faith into action, (3) Mutual advice to truth - building a community of righteousness, (4) Mutual advice to patience - supporting each other through hardship. Individual and collective effort are both required.',
    revelationReason: 'This surah is a complete guide to success. The companions considered it so important they would not part ways without reciting it to each other.',
    themes: ['Faith', 'Good Deeds', 'Community', 'Patience', 'Success'],
    difficulty: 4,
    juz: 30,
    page: 601
  },

  // ============================================================
  // SURAH 94: ASH-SHARH (The Relief)
  // ============================================================
  {
    surahId: 94, ayahNumber: 1,
    arabic: 'أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ',
    transliteration: 'Alam nashraḥ laka ṣadrak',
    translation: 'Did We not expand for you your breast?',
    words: [
      { arabic: 'أَلَمْ', transliteration: 'Alam', meaning: 'Did We not', root: 'ل م', grammar: 'Interrogative + negation' },
      { arabic: 'نَشْرَحْ', transliteration: 'nashraḥ', meaning: 'expand/open', root: 'ش ر ح', grammar: 'Verb (jussive)' },
      { arabic: 'لَكَ', transliteration: 'laka', meaning: 'for you', root: 'ل', grammar: 'Preposition + pronoun' },
      { arabic: 'صَدْرَكَ', transliteration: 'ṣadrak', meaning: 'your chest/breast', root: 'ص د ر', grammar: 'Noun (accusative) + pronoun' },
    ],
    tafsir: 'Allah addresses the Prophet ﷺ with a rhetorical question, reminding him of the divine blessing of having an expanded, enlightened heart. "Sharh as-Sadr" means opening the heart to truth, wisdom, and ease. This is one of the greatest blessings — to have a heart at peace and receptive to guidance.',
    themes: ['Spiritual Expansion', 'Divine Blessing', 'Heart'],
    difficulty: 2,
    juz: 30,
    page: 596
  },
  {
    surahId: 94, ayahNumber: 5,
    arabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا',
    transliteration: 'Fa-inna maʿa l-ʿusri yusrā',
    translation: 'For indeed, with hardship will be ease.',
    words: [
      { arabic: 'فَإِنَّ', transliteration: 'Fa-inna', meaning: 'For indeed', root: 'أ ن ن', grammar: 'Conjunction + emphatic' },
      { arabic: 'مَعَ', transliteration: 'maʿa', meaning: 'with', root: 'م ع', grammar: 'Preposition' },
      { arabic: 'الْعُسْرِ', transliteration: 'l-ʿusri', meaning: 'the hardship', root: 'ع س ر', grammar: 'Noun (definite genitive)' },
      { arabic: 'يُسْرًا', transliteration: 'yusrā', meaning: 'ease', root: 'ي س ر', grammar: 'Noun (indefinite accusative)' },
    ],
    tafsir: '"Al-usr" (hardship) is definite (with "al") while "yusr" (ease) is indefinite. In Arabic, when a definite noun is repeated, it refers to the same thing. When indefinite, it means a new, different ease. So there is ONE hardship but TWO eases — this is the profound promise of Allah. Difficulty is always accompanied by relief.',
    themes: ['Hope', 'Promise of Allah', 'Hardship and Ease'],
    difficulty: 3,
    juz: 30,
    page: 596
  },
  {
    surahId: 94, ayahNumber: 6,
    arabic: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا',
    transliteration: 'Inna maʿa l-ʿusri yusrā',
    translation: 'Indeed, with hardship will be ease.',
    words: [
      { arabic: 'إِنَّ', transliteration: 'Inna', meaning: 'Indeed', root: 'أ ن ن', grammar: 'Emphatic particle' },
    ],
    tafsir: 'The verse is repeated for emphasis — a double assurance from Allah. This repetition is one of the most powerful rhetorical devices in the Quran. Allah is telling us: ease is not just a possibility, it is a certainty that comes WITH hardship, not after it. The ease is already there, hidden within the difficulty.',
    themes: ['Divine Promise', 'Certainty of Relief', 'Faith'],
    difficulty: 3,
    juz: 30,
    page: 596
  },

  // ============================================================
  // SURAH 93: AD-DUHA (The Morning Hours)
  // ============================================================
  {
    surahId: 93, ayahNumber: 1,
    arabic: 'وَالضُّحَىٰ',
    transliteration: 'Wa-ḍ-ḍuḥā',
    translation: 'By the morning brightness.',
    words: [
      { arabic: 'وَالضُّحَىٰ', transliteration: 'Wa-ḍ-ḍuḥā', meaning: 'By the forenoon/morning', root: 'ض ح و', grammar: 'Oath + noun' },
    ],
    tafsir: 'Allah swears by Ad-Duha — the bright morning light that comes after the darkness of night. This surah was revealed after a period of silence in revelation, when the Prophet ﷺ felt abandoned. The morning light after darkness is a metaphor for Allah\'s mercy following difficulty.',
    themes: ['Hope', 'Divine Comfort', 'Light'],
    difficulty: 2,
    juz: 30,
    page: 596
  },
  {
    surahId: 93, ayahNumber: 3,
    arabic: 'مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ',
    transliteration: 'Mā waddaʿaka rabbuka wa-mā qalā',
    translation: 'Your Lord has not forsaken you, nor has He detested you.',
    words: [
      { arabic: 'مَا وَدَّعَكَ', transliteration: 'Mā waddaʿaka', meaning: 'He has not forsaken you', root: 'و د ع', grammar: 'Negation + verb + pronoun' },
      { arabic: 'رَبُّكَ', transliteration: 'rabbuka', meaning: 'your Lord', root: 'ر ب ب', grammar: 'Noun + pronoun' },
      { arabic: 'وَمَا قَلَىٰ', transliteration: 'wa-mā qalā', meaning: 'nor has He hated', root: 'ق ل ي', grammar: 'Conjunction + negation + verb' },
    ],
    tafsir: 'This verse is a direct, loving consolation from Allah to His Prophet ﷺ — and by extension, to every believer who feels alone or forgotten. "Waddaa" means farewell with bitterness. "Qala" means hatred. Allah assures: I have NOT abandoned you, and I do NOT hate you. His love and care are constant.',
    revelationReason: 'Revealed when revelation paused for some time and enemies mocked: "Muhammad\'s Lord has abandoned him." Allah responded with this beautiful surah.',
    themes: ['Divine Love', 'Consolation', 'Never Abandoned'],
    difficulty: 3,
    juz: 30,
    page: 596
  },

  // ============================================================
  // SURAH 97: AL-QADR (The Power)
  // ============================================================
  {
    surahId: 97, ayahNumber: 1,
    arabic: 'إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ',
    transliteration: 'Innā anzalnāhu fī laylati l-qadr',
    translation: 'Indeed, We sent it down during the Night of Power.',
    words: [
      { arabic: 'إِنَّا', transliteration: 'Innā', meaning: 'Indeed We', root: 'أ ن ن', grammar: 'Emphatic + pronoun' },
      { arabic: 'أَنزَلْنَاهُ', transliteration: 'anzalnāhu', meaning: 'We sent it down', root: 'ن ز ل', grammar: 'Verb (past, Form IV) + pronoun' },
      { arabic: 'فِي لَيْلَةِ', transliteration: 'fī laylati', meaning: 'in the night of', root: 'ل ي ل', grammar: 'Preposition + noun' },
      { arabic: 'الْقَدْرِ', transliteration: 'l-qadr', meaning: 'the Power/Decree', root: 'ق د ر', grammar: 'Noun (genitive)' },
    ],
    tafsir: 'The Quran was sent down in its entirety from Al-Lawh Al-Mahfuz (Preserved Tablet) to the lowest heaven on Laylat al-Qadr, then revealed gradually over 23 years. This night is in the last ten nights of Ramadan. Al-Qadr means power, honor, and decree — all that Allah decrees for the coming year is decided this night.',
    themes: ['Quran', 'Laylat al-Qadr', 'Ramadan', 'Divine Decree'],
    difficulty: 3,
    juz: 30,
    page: 598
  },
  {
    surahId: 97, ayahNumber: 3,
    arabic: 'لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ',
    transliteration: 'Laylatu l-qadri khayrun min alfi shahr',
    translation: 'The Night of Power is better than a thousand months.',
    words: [
      { arabic: 'خَيْرٌ', transliteration: 'khayrun', meaning: 'better', root: 'خ ي ر', grammar: 'Adjective (comparative)' },
      { arabic: 'مِّنْ أَلْفِ', transliteration: 'min alfi', meaning: 'than a thousand', root: 'أ ل ف', grammar: 'Preposition + number' },
      { arabic: 'شَهْرٍ', transliteration: 'shahr', meaning: 'months', root: 'ش ه ر', grammar: 'Noun (genitive)' },
    ],
    tafsir: 'One night of worship on Laylat al-Qadr is worth more than 83 years of worship! A thousand months is about 83.3 years — a full human lifetime. This means a sincere believer who catches this night earns more reward than a lifetime of deeds. This is Allah\'s infinite generosity to this ummah.',
    themes: ['Reward', 'Laylat al-Qadr', 'Worship', 'Divine Generosity'],
    difficulty: 2,
    juz: 30,
    page: 598
  },

  // ============================================================
  // SURAH 108: AL-KAWTHAR (The Abundance)
  // ============================================================
  {
    surahId: 108, ayahNumber: 1,
    arabic: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ',
    transliteration: 'Innā aʿṭaynāka l-kawthar',
    translation: 'Indeed, We have granted you abundant good.',
    words: [
      { arabic: 'إِنَّا', transliteration: 'Innā', meaning: 'Indeed We', root: 'أ ن ن', grammar: 'Emphatic + pronoun' },
      { arabic: 'أَعْطَيْنَاكَ', transliteration: 'aʿṭaynāka', meaning: 'We have given you', root: 'ع ط و', grammar: 'Verb (past, Form IV) + pronoun' },
      { arabic: 'الْكَوْثَرَ', transliteration: 'l-kawthar', meaning: 'the abundance', root: 'ك ث ر', grammar: 'Noun (accusative, definite)' },
    ],
    tafsir: 'Al-Kawthar means abundant good — a river in Paradise, the Prophet\'s ﷺ large number of followers, the Quran, prophethood, and all the blessings given to him. This surah was revealed in response to enemies who mocked the Prophet ﷺ for having no sons. Allah\'s answer: I have given you MORE than they can imagine.',
    revelationReason: 'Revealed when Al-As ibn Wail called the Prophet ﷺ "Al-Abtar" (cut-off, with no sons) after the death of his son Qasim. History proved the opposite — the Prophet\'s ﷺ spiritual legacy is eternal.',
    themes: ['Divine Blessing', 'Abundance', 'Gratitude'],
    difficulty: 1,
    juz: 30,
    page: 602
  },

  // ============================================================
  // SURAH 110: AN-NASR (The Victory)
  // ============================================================
  {
    surahId: 110, ayahNumber: 1,
    arabic: 'إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ',
    transliteration: 'Idhā jāʾa naṣru llāhi wa-l-fatḥ',
    translation: 'When the victory of Allah has come and the conquest.',
    words: [
      { arabic: 'إِذَا جَاءَ', transliteration: 'Idhā jāʾa', meaning: 'When there comes', root: 'ج ي أ', grammar: 'Conditional + verb' },
      { arabic: 'نَصْرُ', transliteration: 'naṣru', meaning: 'victory/help', root: 'ن ص ر', grammar: 'Noun (nominative)' },
      { arabic: 'اللَّهِ', transliteration: 'llāhi', meaning: 'of Allah', root: 'أ ل ه', grammar: 'Proper noun (genitive)' },
      { arabic: 'وَالْفَتْحُ', transliteration: 'wa-l-fatḥ', meaning: 'and the conquest/opening', root: 'ف ت ح', grammar: 'Noun (nominative)' },
    ],
    tafsir: 'This short surah announced the completion of the Prophet\'s ﷺ mission — the Conquest of Mecca and the triumph of Islam. "Al-Fath" refers to the Conquest of Mecca in 8 AH. The surah also subtly signals that the Prophet\'s ﷺ earthly mission was coming to an end. He passed away two years later.',
    revelationReason: 'Revealed after or shortly before the Conquest of Mecca, signaling the completion of the prophetic mission.',
    themes: ['Victory', 'Divine Help', 'Completion'],
    difficulty: 2,
    juz: 30,
    page: 603
  },
];

// Helper function to get ayah by surah and number
export function getAyah(surahId: number, ayahNumber: number): Ayah | undefined {
  return AYAHS.find(a => a.surahId === surahId && a.ayahNumber === ayahNumber);
}

// Helper function to get all ayahs of a surah
export function getSurahAyahs(surahId: number): Ayah[] {
  return AYAHS.filter(a => a.surahId === surahId).sort((a, b) => a.ayahNumber - b.ayahNumber);
}

// Get beginner-friendly ayahs
export function getBeginnerAyahs(): Ayah[] {
  return AYAHS.filter(a => a.difficulty <= 3);
}

// Get all available ayah keys
export function getAllAyahKeys(): Array<{ surahId: number; ayahNumber: number }> {
  return AYAHS.map(a => ({ surahId: a.surahId, ayahNumber: a.ayahNumber }));
}
