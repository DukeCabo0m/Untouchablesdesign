export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  category: 'album' | 'tournée' | 'interview' | 'communauté' | 'actualité';
  date: string;
  author: string;
  excerpt: string;
  content: string;
  image: string;
  tags: string[];
  featured?: boolean;
}

export const newsArticles: NewsArticle[] = [
  {
    id: '1',
    slug: 'korn-annonce-nouvel-album-2026',
    title: 'KORN ANNONCE UN NOUVEL ALBUM POUR L\'ÉTÉ 2026',
    category: 'album',
    date: '2026-01-15',
    author: 'Mr. Fox',
    excerpt: 'Le groupe vient de confirmer officiellement l\'enregistrement d\'un 15e album studio, prévu pour juin 2026. Retour aux sources promis avec le producteur Ross Robinson. Les sessions d\'enregistrement ont débuté à l\'Indigo Ranch Studios de Malibu, le studio mythique qui a vu naître les deux premiers albums du groupe.',
    content: `## BREAKING NEWS : KORN REVIENT AVEC ROSS ROBINSON

Jonathan Davis l'a annoncé ce matin sur Instagram : **Korn est en studio avec Ross Robinson**, le producteur légendaire des deux premiers albums (Korn, 1994 et Life Is Peachy, 1996).

### Un retour aux racines prometteur

"On voulait retrouver cette énergie brute, cette urgence des débuts. Ross nous pousse dans nos retranchements comme au premier jour. C'est intense, violent, cathartique. L'album le plus heavy depuis des années," déclare JDevil.

Munky confirme : "On a enregistré en conditions live, sans filet. Comme en 1993. C'est viscéral, dangereux. Les fans vont halluciner."

### Détails de production

- **Titre provisoire** : "Requiem" (non confirmé)
- **Studio** : Indigo Ranch Studios (Malibu) - le même qu'en 1994 !
- **Producteur** : Ross Robinson
- **Date de sortie** : Juin 2026
- **Label** : Loma Vista Recordings

### Premiers extraits attendus en mars

Un premier single devrait sortir fin mars avec un clip réalisé par Nathan Cox (directeur photo des dernières tournées). L'esthétique annoncée mélange found footage VHS et imagerie médicale X-Ray.

### Tournée mondiale en préparation

Une tournée mondiale est prévue de septembre 2026 à mars 2027, avec des dates en France confirmées pour novembre 2026 :
- **12 novembre** : Zénith Paris La Villette
- **14 novembre** : Arkéa Arena, Bordeaux  
- **16 novembre** : Halle Tony Garnier, Lyon

Les préventes s'ouvriront fin février sur le site officiel.

---

**STAY TUNED // PLUS D'INFOS TRÈS BIENTÔT**

*Source : Instagram officiel @kornofficial + interview exclusive Kerrang! UK*`,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800',
    tags: ['album', 'ross robinson', 'studio', '2026'],
    featured: true,
  },
  {
    id: '2',
    slug: 'interview-exclusive-jonathan-davis-2026',
    title: 'INTERVIEW EXCLUSIVE : JONATHAN DAVIS SE CONFIE SUR 30 ANS DE KORN',
    category: 'interview',
    date: '2026-01-10',
    author: 'Mr. Fox',
    excerpt: 'À l\'occasion des 32 ans du premier album, Jonathan Davis revient sur trois décennies de traumatismes, de catharsis et de révolution musicale.',
    content: `## JONATHAN DAVIS : "KORN M'A SAUVÉ LA VIE"

**Untouchables** : Jonathan, 32 ans après le premier album, qu'est-ce qui te motive encore à hurler ta rage sur scène ?

**Jonathan Davis** : (rire) La thérapie coûte cher ! (rires) Plus sérieusement, Korn a toujours été ma catharsis. Gamin, j'étais harcelé, abusé, invisible. La musique était ma seule échappatoire. Aujourd'hui, quand je vois des gamins dans le public qui pleurent pendant "Daddy" ou "Thoughtless", je sais qu'on touche quelque chose d'universel. La douleur, mais aussi la rédemption.

### Sur le processus créatif

**U** : L'album à venir marque un retour avec Ross Robinson. Pourquoi maintenant ?

**JD** : On avait besoin de se reconnecter à cette urgence primitive. Ross ne laisse rien passer. Il te force à creuser dans tes zones d'ombre. C'est inconfortable, douloureux, mais c'est là que naît la vraie créativité. Pas dans le confort d'un studio high-tech. Dans la sueur, les larmes, le sang.

**U** : Thématiquement, de quoi parle le nouvel album ?

**JD** : Mortalité, trauma intergénérationnel, l'absurdité du monde moderne. Mais aussi résilience. Je suis sobre depuis 8 ans maintenant. J'ai fait un travail thérapeutique intense. Cet album reflète cette transformation tout en gardant la noirceur qui définit Korn.

### Sur l'héritage de Korn

**U** : Comment tu analyses l'impact culturel de Korn sur le metal ?

**JD** : On a ouvert une porte. Parler de santé mentale, de trauma, d'émotions brutes dans le metal, c'était tabou. Aujourd'hui, c'est la norme. Des groupes comme Slipknot, Deftones, Linkin Park (RIP Chester), tous ont bénéficié de ce qu'on a initié. On est fiers d'avoir libéré cette expression.

**U** : Un mot pour la communauté Untouchables ?

**JD** : Vous êtes la raison pour laquelle on fait ça. Votre passion, votre loyauté, c'est ce qui nous maintient en vie. Merci de porter notre musique depuis 30+ ans. On vous doit tout. ❤️

---

**INTERVIEW COMPLÈTE DANS LE MAGAZINE PRINT // ÉDITION COLLECTOR FÉVRIER 2026**`,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    tags: ['interview', 'jonathan davis', 'heritage', '30 ans'],
    featured: true,
  },
  {
    id: '3',
    slug: 'untouchables-community-meetup-paris-2026',
    title: 'MEETUP UNTOUCHABLES PARIS // 15 MARS 2026',
    category: 'communauté',
    date: '2026-01-08',
    author: 'Mr. Fox',
    excerpt: 'La communauté francophone se réunit pour un premier meetup officiel ! Concert privé, exposition, DJ set et surprises.',
    content: `## PREMIER MEETUP OFFICIEL UNTOUCHABLES // PARIS

La communauté **UNTOUCHABLES** organise son tout premier meetup physique !

### 📅 INFOS PRATIQUES

**Date** : Samedi 15 mars 2026  
**Lieu** : Le Trabendo, Paris 19e  
**Horaires** : 14h00 - 23h00  
**Entrée** : 15€ (membres) / 20€ (public)

### 🎸 PROGRAMME

**14h00 - 16h00** : Exposition photo "30 Years of Korn"  
Tirages vintage, posters rares, memorabilia exclusive

**16h00 - 18h00** : Projection documentaire "Nu Metal Chronicles"  
Suivi d'un débat avec des journalistes spécialisés

**18h00 - 20h00** : Concert tribute band "UNTOUCHABLE"  
Setlist 100% Korn, de Blind à The Paradigm Shift

**20h00 - 22h00** : DJ Set nu metal / industrial  
DJ Scarecrow (membre fondateur de la communauté)

**22h00 - 23h00** : Surprise finale... 👀

### 🎁 GOODIES EXCLUSIFS

- Patches brodés Untouchables (édition limitée)
- Stickers glitch aesthetic
- Poster A2 signé par les admins
- Tote bag collector

### 🎟️ BILLETTERIE

**Préventes membres** : Dès maintenant sur untouchables-fr.net/meetup  
**Vente publique** : À partir du 25 janvier

⚠️ **JAUGE LIMITÉE À 300 PERSONNES** ⚠️

---

**ON SE VOIT LÀ-BAS // UNTOUCHABLES FOREVER**`,
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800',
    tags: ['meetup', 'communauté', 'paris', 'event'],
    featured: false,
  },
  {
    id: '4',
    slug: 'classement-top-10-albums-korn-2026',
    title: 'DÉBAT : NOTRE TOP 10 DES ALBUMS KORN (2026)',
    category: 'actualité',
    date: '2026-01-05',
    author: 'Mr. Fox',
    excerpt: 'La rédaction classe les 14 albums studio de Korn. Follow the Leader en tête ? Issues sous-estimé ? Débat ouvert dans les commentaires !',
    content: `## LE CLASSEMENT DÉFINITIF (OU PRESQUE)

Après 3 semaines de débats internes acharnés, la rédaction Untouchables dévoile son classement des albums studio Korn. **Attention, ça va diviser.**

### 🏆 TOP 10

**1. Follow the Leader (1998)**  
L'album parfait. Production monumentale, hits intemporels (Freak on a Leash, Got the Life), expérimentation maîtrisée. Le sommet absolu.

**2. Untouchables (2002)**  
Ambitieux, sombre, expérimental. Here to Stay remporte le Grammy. 74 minutes de pure catharsis. Notre album éponyme ! ❤️

**3. Korn (1994)**  
L'album qui a TOUT changé. Brut, authentique, révolutionnaire. Blind reste un choc 32 ans après.

**4. Issues (1999)**  
Le plus personnel, le plus douloureux. Falling Away from Me, Make Me Bad. Jonathan à nu.

**5. The Paradigm Shift (2013)**  
Le retour triomphal de Head ! Retrouvailles émotionnelles, énergie renouvelée. Never Never, Love & Meth.

**6. Life Is Peachy (1996)**  
Agressif, brut, sans compromis. A.D.I.D.A.S., Good God. L'album qui confirme que Korn n'est pas un accident.

**7. See You on the Other Side (2005)**  
Virage électro-indus risqué mais réussi. Twisted Transistor, Coming Undone. Sans Head, mais pas sans âme.

**8. The Serenity of Suffering (2016)**  
Retour au heavy après l'expérimentation. Rotting in Vain, A Different World (feat. Corey Taylor). Solide.

**9. Take a Look in the Mirror (2003)**  
Retour aux sources brutal. Right Now, Did My Time. Dernier album formation classique.

**10. Korn III: Remember Who You Are (2010)**  
Ross Robinson de retour ! Tentative de retrouver la magie des débuts. Oildale, Pop a Pill.

### LES ALBUMS HORS TOP 10

**11. The Nothing (2019)** - Sombre suite au deuil de la femme de Jonathan  
**12. Requiem (2022)** - Court (33 min), intense, retour au raw  
**13. The Path of Totality (2011)** - Dubstep/metal. Audacieux mais diviseur.  
**14. Untitled (2007)** - Expérimental. Evolution, Hold On.

---

### 🔥 À VOUS DE VOTER !

**Votre top 3 dans les commentaires** 👇  
On fera un classement communautaire en février !

**#TeamFollowTheLeader ou #TeamUntouchables ?**`,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
    tags: ['classement', 'albums', 'débat', 'top 10'],
    featured: false,
  },
  {
    id: '5',
    slug: 'head-munky-interview-guitares-2026',
    title: 'HEAD & MUNKY : \"NOS GUITARES SONT DES ARMES\"',
    category: 'interview',
    date: '2025-12-28',
    author: 'Mr. Fox',
    excerpt: 'Les deux guitaristes légendaires de Korn décryptent leur approche unique : accordages graves, Ibanez 7 cordes, et le secret du son qui a tout changé.',
    content: `## L'INTERVIEW GEAR ULTIME

**Untouchables** : Head, Munky, votre son de guitare est immédiatement reconnaissable. Comment l'avez-vous développé ?

**Munky** : En 1993, on cherchait quelque chose de différent. Les guitares 7 cordes venaient de sortir. On s'est dit : "Et si on accordait encore plus grave ?" Drop A, parfois drop G#. Ça créait cette lourdeur, cette oppression sonore.

**Head** : Et puis le jeu percussif. Palm mutes agressifs, harmoniques artificielles, scratches dissonants. On voulait que les guitares soient des instruments de percussion autant que mélodiques.

### Le setup technique

**U** : Vous jouez exclusivement sur Ibanez ?

**H** : Oui, Ibanez nous a fait des signatures dès le début. Ma KSH-7 Head Signature, guitare noire avec pickups DiMarzio customs. Accordage drop A standard.

**M** : Ma K7 Munky Signature, finition naturelle. J'utilise des cordes ultra-épaisses : .010-.059. Le tirant lourd est essentiel pour la tension en accordage grave.

**U** : Et côté amplis ?

**H** : Diezel VH4 principalement. Gain élevé, médiums creusés, basses proéminentes. Quelques pédales : Boss NS-2 (noise gate), Ibanez Tube Screamer pour booster.

**M** : Moi je reste fidèle au Mesa/Boogie Dual Rectifier. Son massif, saturation naturelle. Pour les effets, je garde ça simple : delay, chorus léger sur les parties clean.

### L'approche compositionnelle

**U** : Comment vous répartissez-vous les rôles en compo ?

**M** : Pas de règle stricte. Parfois je lance un riff lourd, Head brode dessus avec des leads. Ou l'inverse. L'important, c'est la complémentarité. On occupe des espaces sonores différents.

**H** : Exact. Je suis plus "lead", mélodies dissonantes, slides. Munky est le roi du groove rythmique. Mais on switche souvent. La magie de Korn, c'est cette interplay permanente.

**U** : Un conseil pour les jeunes guitaristes qui veulent reproduire votre son ?

**H & M (en chœur)** : **Accordez grave. Jouez lourd. N'ayez pas peur de la dissonance.**

---

**SUITE DE L'INTERVIEW + VIDÉO DÉMO GEAR SUR NOTRE CHAÎNE YOUTUBE**`,
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800',
    tags: ['interview', 'guitares', 'gear', 'technique'],
    featured: false,
  },
  {
    id: '6',
    slug: 'tournee-europeenne-korn-printemps-2026',
    title: 'TOURNÉE EUROPÉENNE CONFIRMÉE // PRINTEMPS 2026',
    category: 'tournée',
    date: '2026-01-20',
    author: 'Mr. Fox',
    excerpt: 'Korn annonce 15 dates européennes entre avril et mai 2026, dont 3 dates françaises. Préventes exclusives pour les membres Untouchables dès le 25 janvier.',
    content: `## KORN REVIENT EN EUROPE AU PRINTEMPS 2026

Le groupe vient d'officialiser une tournée européenne de 15 dates entre avril et mai 2026, avec un passage en France confirmé.

### DATES FRANÇAISES

- **23 avril** : AccorHotels Arena, Paris
- **25 avril** : Zénith, Nantes  
- **27 avril** : Halle Tony Garnier, Lyon

### INFOS BILLETTERIE

**Préventes membres Untouchables** : 25 janvier 10h00  
**Vente générale** : 27 janvier 10h00  
**Tarifs** : 45€ - 85€ selon catégorie

Les membres de la communauté Untouchables bénéficient de 48h de préventes exclusives et d'un accès prioritaire aux meet & greet (places limitées).

---

**TICKETS SUR TICKETMASTER.FR DÈS LE 25 JANVIER**`,
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800',
    tags: ['tournée', 'concerts', 'europe', '2026'],
    featured: false,
  },
  {
    id: '7',
    slug: 'fanzine-untouchables-avril-2026-preview',
    title: 'FANZINE UNTOUCHABLES #01 // PREVIEW EXCLUSIVE',
    category: 'communauté',
    date: '2026-01-18',
    author: 'Mr. Fox',
    excerpt: 'Découvrez en avant-première le contenu du premier numéro de notre fanzine mensuel qui sortira en avril 2026. Abonnements trimestriels ouverts !',
    content: `## PREMIER NUMÉRO DU FANZINE UNTOUCHABLES

Après des mois de préparation, le fanzine physique **UNTOUCHABLES** sortira son premier numéro en avril 2026.

### CONTENU DU NUMÉRO #01

**DOSSIER PRINCIPAL** : 32 ans de Korn - Chronologie complète  
**INTERVIEW EXCLUSIVE** : Head & Munky décryptent leur son  
**PORTFOLIO** : 8 pages photo noir & blanc par le photographe Julien Mignot  
**CRITIQUE** : Analyse track-by-track du nouvel album  
**COMMUNAUTÉ** : Portraits de 5 membres Untouchables

### FORMAT & TARIFS

**Format** : 12 pages A4 couleur + poster A3 + stickers  
**Abonnement trimestriel** (3 numéros) :  
- France métropolitaine : 22,50€ (prix libre, minimum)  
- Belgique/Suisse : 30,00€ (prix libre, minimum)

**Préventes abonnements** : Dès maintenant sur untouchables-fr.net/fanzine

---

**SORTIE AVRIL 2026 // ÉDITION COLLECTOR LIMITÉE**`,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    tags: ['fanzine', 'print', 'communauté', 'avril 2026'],
    featured: false,
  },
  {
    id: '8',
    slug: 'fieldy-retour-confirme-2026',
    title: 'FIELDY DE RETOUR DANS KORN APRÈS 3 ANS D\'ABSENCE',
    category: 'actualité',
    date: '2026-01-12',
    author: 'Mr. Fox',
    excerpt: 'Le bassiste légendaire Reginald \"Fieldy\" Arvizu confirme son retour officiel dans Korn après une pause pour raisons personnelles. Émotion et soulagement dans la communauté.',
    content: `## FIELDY IS BACK

C'est officiel : **Fieldy** (Reginald Arvizu), bassiste fondateur de Korn, fait son retour après 3 ans d'absence pour raisons de santé mentale et sobriété.

### SA DÉCLARATION

"Ces trois années ont été les plus difficiles de ma vie, mais aussi les plus nécessaires. J'ai travaillé sur moi, ma sobriété, ma santé mentale. Aujourd'hui, je suis prêt à revenir dans ma famille Korn. Merci à Ra Diaz d'avoir tenu le fort. Let's fucking go."

### RÉACTION DU GROUPE

Jonathan Davis : "Regg est notre frère. On l'a toujours soutenu. Le voir revenir en pleine forme, c'est une bénédiction."

### IMPACT SUR LA TOURNÉE 2026

Fieldy sera présent sur toute la tournée européenne du printemps 2026 et participera aux sessions d'enregistrement du nouvel album.

---

**WELCOME BACK FIELDY // KORN FOREVER**`,
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800',
    tags: ['fieldy', 'retour', 'line-up', 'actualité'],
    featured: false,
  },
];

export const getNewsArticleBySlug = (slug: string): NewsArticle | undefined => {
  return newsArticles.find((article) => article.slug === slug);
};

export const getFeaturedArticles = (): NewsArticle[] => {
  return newsArticles.filter((article) => article.featured);
};

export const getArticlesByCategory = (category: NewsArticle['category']): NewsArticle[] => {
  return newsArticles.filter((article) => article.category === category);
};

export const getLatestArticles = (limit: number = 10): NewsArticle[] => {
  return newsArticles
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};