// Contenu authentique des invocations — textes tirés du Coran et des hadiths (domaine public)
// Correspondance par mots-clés sur le titre français de la BD

export interface InvocationEnrichment {
  keywords: string[];
  arabic: string;
  transliteration: string;
  translation: string;
  virtue: string;
  source: string;
  extra?: string; // info complémentaire (ex: si on oublie...)
}

export const INVOCATIONS_ENRICHMENT: InvocationEnrichment[] = [
  // 1. Au réveil
  {
    keywords: ['réveille', 'reveille', 'lever', 'levé'],
    arabic: 'الحَمْدُ للهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    transliteration: "Al-hamdu lillâhi lladhî ahyânâ ba'da mâ amâtanâ, wa ilayhi n-nushûr.",
    translation: "Louange à Allah qui nous a redonné la vie après nous avoir fait mourir, et c'est vers Lui que sera la résurrection.",
    virtue: "Le Prophète ﷺ récitait cette invocation chaque matin en se réveillant. Commencer la journée en remerciant Allah la place sous les meilleurs auspices.",
    source: "Rapporté par Al-Bukhârî (n°6312)",
  },
  // 2. En se couchant
  {
    keywords: ['couche', 'coucher', 'dormir', 'sommeil'],
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    transliteration: 'Bismika Allâhumma amûtu wa ahyâ.',
    translation: "C'est en prononçant Ton nom, ô Allah, que je meurs et que je vis.",
    virtue: "Le Prophète ﷺ récitait ceci avant de dormir. Le sommeil est comparé à une petite mort ; se confier à Allah avant de s'endormir est une grande Sunna.",
    source: "Rapporté par Al-Bukhârî (n°6324)",
  },
  // 3. En entrant à la mosquée
  {
    keywords: ['entrant à la mosquée', 'entrer à la mosquée', 'entrant à la', 'entrer mosquée'],
    arabic: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
    transliteration: 'Allâhumma ftah lî abwâba rahmatik.',
    translation: "Ô Allah, ouvre-moi les portes de Ta miséricorde.",
    virtue: "On entre dans la mosquée par le pied droit. La mosquée est la maison d'Allah — y entrer est l'occasion de demander Sa miséricorde.",
    source: "Rapporté par Muslim (n°713)",
  },
  // 4. En sortant de la mosquée
  {
    keywords: ['sortant de la mosquée', 'sortir de la mosquée', 'sortant de la', 'sortir mosquée'],
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ',
    transliteration: 'Allâhumma innî as\'aluka min fadlik.',
    translation: "Ô Allah, je Te demande de Ta grâce.",
    virtue: "On sort de la mosquée par le pied gauche. En quittant la maison d'Allah, on Lui demande d'accompagner notre journée de Sa faveur et de Sa bénédiction.",
    source: "Rapporté par Muslim (n°713)",
  },
  // 5. Avant de manger
  {
    keywords: ['avant de manger', 'avant manger'],
    arabic: 'بِسْمِ اللهِ',
    transliteration: 'Bismillâh.',
    translation: "Au nom d'Allah.",
    virtue: "Dire Bismillâh avant de manger permet à la nourriture d'être une bénédiction et protège des méfaits des shaytanes.",
    source: "Rapporté par Abû Dâwûd (n°3767) et At-Tirmidhî (n°1858)",
    extra: "Si tu oublies de dire Bismillâh au début, dis dès que tu t'en souviens : بِسْمِ اللهِ أَوَّلَهُ وَآخِرَهُ (Bismillâhi awwalahu wa âkhirahu — « Au nom d'Allah au début et à la fin »).",
  },
  // 6. Après avoir mangé
  {
    keywords: ['après avoir mangé', 'apres avoir mangé', 'après manger', 'apres manger'],
    arabic: 'الحَمْدُ للهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
    transliteration: "Al-hamdu lillâhi lladhî at'amanî hâdhâ, wa razaqanîhi min ghayri hawlin minnî wa lâ quwwa.",
    translation: "Louange à Allah qui m'a nourri de ceci et me l'a accordé sans force ni puissance de ma part.",
    virtue: "Le Prophète ﷺ a dit : « Celui qui mange un repas et dit ensuite cette invocation, ses péchés passés lui seront pardonnés. » Quelle belle récompense pour un simple remerciement !",
    source: "Rapporté par Abû Dâwûd (n°4023) et At-Tirmidhî (n°3458)",
  },
  // 7. En entrant aux toilettes
  {
    keywords: ['entrant aux toilettes', 'entrer aux toilettes', 'entrant toilet', 'wc', 'salle de bain'],
    arabic: 'بِسْمِ اللهِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الخُبُثِ وَالخَبَائِثِ',
    transliteration: "Bismillâh. Allâhumma innî a'ûdhu bika mina l-khubuthi wa l-khabâ'ith.",
    translation: "Au nom d'Allah. Ô Allah, je me réfugie auprès de Toi contre les diables mâles et femelles.",
    virtue: "On entre par le pied gauche. Les toilettes sont un endroit où les djinns résident ; cette invocation crée une barrière de protection divine.",
    source: "Rapporté par Al-Bukhârî (n°142) et Muslim (n°375)",
  },
  // 8. En sortant des toilettes
  {
    keywords: ['sortant des toilettes', 'sortir des toilettes', 'sortant toilet'],
    arabic: 'غُفْرَانَكَ',
    transliteration: 'Ghufrânaka.',
    translation: "Je Te demande Ton pardon.",
    virtue: "On sort par le pied droit. Ce mot, récité par le Prophète ﷺ en sortant des toilettes, est une belle occasion de demander le pardon d'Allah pour nos péchés.",
    source: "Rapporté par Abû Dâwûd (n°30), At-Tirmidhî (n°7) et Ibn Mâjah (n°300)",
  },
  // 9. En montant dans la voiture
  {
    keywords: ['voiture', 'transport', 'voyage', 'montant dans', 'véhicule'],
    arabic: 'بِسْمِ اللهِ وَالحَمْدُ للهِ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ',
    transliteration: "Bismillâhi wal-hamdu lillâh. Subhâna lladhî sakhkhara lanâ hâdhâ wa mâ kunnâ lahu muqrinîn, wa innâ ilâ rabbinâ la-munqalibûn.",
    translation: "Au nom d'Allah et louange à Allah ! Gloire à Celui qui nous a soumis cela alors que nous n'aurions pu le maîtriser, et c'est vers notre Seigneur que nous retournerons.",
    virtue: "Cette invocation rappelle que tout véhicule est un don d'Allah. Elle protège le voyageur et lui rappelle que son retour final est vers son Seigneur.",
    source: "Coran (43:13-14) · Abû Dâwûd (n°2602) · At-Tirmidhî (n°3446)",
  },
  // 10. La nuit / dhikr du soir
  {
    keywords: ['nuit', 'soir', 'veillée', 'isha', 'nuitée'],
    arabic: 'بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَاغْفِرْ لَهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ',
    transliteration: "Bismika rabbî wada'tu janbî wa bika arfa'uhu. Fa in amsakta nafsî faghfir lahâ, wa in arsaltahâ fahfazhâ bimâ tahfazu bihi 'ibâdaka s-sâlihîn.",
    translation: "Par Ton nom, mon Seigneur, j'étends mon côté et par Ton nom je le lève. Si Tu prends mon âme, aie pitié d'elle, et si Tu la libères, protège-la comme Tu protèges Tes serviteurs vertueux.",
    virtue: "Le Prophète ﷺ récitait cette invocation chaque soir avant de dormir. Elle exprime une confiance totale en Allah pour la nuit, qui est une petite mort.",
    source: "Rapporté par Al-Bukhârî (n°6320) et Muslim (n°2714)",
  },
];

export function getInvocationEnrichment(titleFrench: string): InvocationEnrichment | null {
  const title = titleFrench.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const titleNorm = titleFrench.toLowerCase();

  for (const inv of INVOCATIONS_ENRICHMENT) {
    for (const keyword of inv.keywords) {
      const kw = keyword.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
      if (title.includes(kw) || titleNorm.includes(keyword.toLowerCase())) {
        return inv;
      }
    }
  }
  return null;
}
