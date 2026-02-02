import untouchablesAlbumCover from "figma:asset/c5e08dea6b791ae7301cb4c71c93fcba42510e6b.png";
import issuesAlbumCover from "figma:asset/63f9b26615ccbc978498105fd95b0993f04380aa.png";
import followTheLeaderAlbumCover from "figma:asset/95553117ae0c03532acfb12f2885d1e3b686f8f9.png";
import kornAlbumCover from "figma:asset/818685074b24b54bf10e2d414271058ee58a17e9.png";

export interface Album {
  id: string;
  slug: string;
  title: string;
  year: number;
  type: 'studio' | 'live' | 'compilation' | 'single' | 'ep';
  cover: string;
  producer?: string;
  label?: string;
  description: string;
  tracks: Track[];
  certifications?: string[];
  salesInfo?: string;
}

export interface Track {
  number: number;
  title: string;
  duration: string;
  notes?: string;
  isSingle?: boolean;
  singleSlug?: string;
  hasVideoClip?: boolean;
  streamingLinks?: {
    spotify?: string;
    appleMusic?: string;
    youtube?: string;
  };
}

export const albums: Album[] = [
  // ALBUMS STUDIO
  {
    id: '1',
    slug: 'korn-1994',
    title: 'Korn',
    year: 1994,
    type: 'studio',
    cover: kornAlbumCover,
    producer: 'Ross Robinson',
    label: 'Immortal / Epic',
    description: `L'album qui a tout déclenché. "Korn" (1994) invente littéralement le nu metal : basse claquante de Fieldy, riffs accordés en drop A, voix torturée de Jonathan Davis oscillant entre murmures et hurlements primal.

Enregistré en seulement 3 semaines au Indigo Ranch Studios, l'album capture une rage brute et authentique. Ross Robinson impose une approche live, sans filet, conservant les imperfections qui donnent son caractère unique à l'album.

Tracks emblématiques : "Blind" (l'ouverture explosive avec le cri "Are you ready?!"), "Shoots and Ladders" (avec sa cornemuse inquiétante), "Faget" (titre controversé sur le harcèlement scolaire).

Disque d'or, puis double platine, Korn établit un nouveau template sonore qui influencera toute une génération. L'esthétique visuelle sombre (fillette sur balançoire) annonce déjà le "High-Def Horror".`,
    tracks: [
      { 
        number: 1, 
        title: 'Blind', 
        duration: '4:18',
        isSingle: true,
        singleSlug: 'blind-1994',
        hasVideoClip: true,
        streamingLinks: {
          spotify: '#',
          appleMusic: '#',
          youtube: '#'
        }
      },
      { number: 2, title: 'Ball Tongue', duration: '4:29', streamingLinks: { spotify: '#', appleMusic: '#', youtube: '#' } },
      { number: 3, title: 'Need To', duration: '4:01', streamingLinks: { spotify: '#', appleMusic: '#', youtube: '#' } },
      { number: 4, title: 'Clown', duration: '4:37', hasVideoClip: true, streamingLinks: { spotify: '#', appleMusic: '#', youtube: '#' } },
      { number: 5, title: 'Divine', duration: '2:50', streamingLinks: { spotify: '#', appleMusic: '#', youtube: '#' } },
      { number: 6, title: 'Faget', duration: '5:49', streamingLinks: { spotify: '#', appleMusic: '#', youtube: '#' } },
      { 
        number: 7, 
        title: 'Shoots and Ladders', 
        duration: '5:22',
        isSingle: true,
        singleSlug: 'shoots-and-ladders-1995',
        hasVideoClip: true,
        streamingLinks: {
          spotify: '#',
          appleMusic: '#',
          youtube: '#'
        }
      },
      { number: 8, title: 'Predictable', duration: '4:32', streamingLinks: { spotify: '#', appleMusic: '#', youtube: '#' } },
      { number: 9, title: 'Fake', duration: '4:50', streamingLinks: { spotify: '#', appleMusic: '#', youtube: '#' } },
      { number: 10, title: 'Lies', duration: '3:21', streamingLinks: { spotify: '#', appleMusic: '#', youtube: '#' } },
      { number: 11, title: 'Helmet in the Bush', duration: '4:02', streamingLinks: { spotify: '#', appleMusic: '#', youtube: '#' } },
      { number: 12, title: 'Daddy', duration: '17:34', notes: 'Track caché déchirant sur les abus d\'enfance', streamingLinks: { spotify: '#', appleMusic: '#', youtube: '#' } },
    ],
    certifications: ['2x Platine (US)', 'Or (UK)', 'Or (CA)'],
    salesInfo: '2+ millions de copies',
  },
  {
    id: '2',
    slug: 'life-is-peachy-1996',
    title: 'Life Is Peachy',
    year: 1996,
    type: 'studio',
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    producer: 'Ross Robinson',
    label: 'Immortal / Epic',
    description: `Le deuxième album de Korn intensifie la rage et l'expérimentation. "Life Is Peachy" (1996) confirme que le groupe n'est pas un phénomène éphémère mais une force révolutionnaire.

Enregistré dans la foulée des tournées épuisantes, l'album transpire l'énergie live et la tension nerveuse. Ross Robinson pousse le groupe dans ses retranchements, capturant des performances viscérales et imprévisibles.

"A.D.I.D.A.S." (All Day I Dream About Sex) devient un hymne provocateur, "Good God" explore des territoires sonores toujours plus sombres avec des scratches de guitare dissonants. "Kill You" explose d'une violence cathartique.

L'artwork controversé (enfant dans un terrain de jeux sordide) renforce l'esthétique dérangeante. Certifié double platine, l'album prouve que Korn n'est pas un coup de chance mais une révolution musicale.`,
    tracks: [
      { number: 1, title: 'Twist', duration: '0:49' },
      { number: 2, title: 'Chi', duration: '3:33' },
      { number: 3, title: 'Lost', duration: '3:52' },
      { number: 4, title: 'Swallow', duration: '4:10' },
      { number: 5, title: 'Porno Creep', duration: '2:38' },
      { number: 6, title: 'Good God', duration: '3:18' },
      { number: 7, title: 'Mr. Rogers', duration: '5:58' },
      { number: 8, title: 'K@#Ø%!', duration: '2:59' },
      { number: 9, title: 'No Place to Hide', duration: '3:27' },
      { number: 10, title: 'Wicked', duration: '4:01' },
      { number: 11, title: 'A.D.I.D.A.S.', duration: '2:34' },
      { number: 12, title: 'Lowrider', duration: '4:00', notes: 'Cover de War' },
      { number: 13, title: 'Ass Itch', duration: '4:02' },
      { number: 14, title: 'Kill You', duration: '2:27', notes: 'Hidden track explosif' },
    ],
    certifications: ['2x Platine (US)', 'Or (UK)'],
    salesInfo: '2+ millions de copies',
  },
  {
    id: '3',
    slug: 'follow-the-leader-1998',
    title: 'Follow the Leader',
    year: 1998,
    type: 'studio',
    cover: followTheLeaderAlbumCover,
    producer: 'Steve Thompson, Toby Wright',
    label: 'Immortal / Epic',
    description: `L'album qui propulse Korn au statut de superstars mondiales. "Follow the Leader" (1998) est LE monument du nu metal, l'album qui définit une génération entière.

Produit par Steve Thompson et Toby Wright, le son est massif, claustrophobe, industriel. "Freak on a Leash" devient un phénomène planétaire avec son breakdown iconique ("da boom na da noom na namena"). Le clip remporte 2 MTV Video Music Awards.

"Got the Life" envahit les radios, "All in the Family" voit Fred Durst (Limp Bizkit) et Jonathan échanger des insultes hilarantes, "My Gift to You" clôt l'album sur une ballade sombre et perturbante.

Artwork mémorable (enfant sur terrain de jeux désolé), production léchée sans perdre l'agressivité brute. #1 Billboard, 7x Platine, 14 millions de copies. Korn devient INCONTOURNABLE.`,
    tracks: [
      { number: 1, title: 'It\'s On!', duration: '4:28' },
      { 
        number: 2, 
        title: 'Freak on a Leash', 
        duration: '4:15', 
        notes: 'HIT PLANÉTAIRE',
        isSingle: true,
        hasVideoClip: true,
        streamingLinks: {
          spotify: '#',
          appleMusic: '#',
          youtube: '#'
        }
      },
      { 
        number: 3, 
        title: 'Got the Life', 
        duration: '3:45', 
        notes: 'Single majeur',
        isSingle: true,
        hasVideoClip: true,
        streamingLinks: {
          spotify: '#',
          appleMusic: '#',
          youtube: '#'
        }
      },
      { number: 4, title: 'Dead Bodies Everywhere', duration: '4:44', hasVideoClip: true },
      { number: 5, title: 'Children of the Korn', duration: '3:52', notes: 'Feat. Ice Cube' },
      { number: 6, title: 'B.B.K.', duration: '3:56' },
      { number: 7, title: 'Pretty', duration: '4:12' },
      { number: 8, title: 'All in the Family', duration: '4:48', notes: 'Feat. Fred Durst' },
      { number: 9, title: 'Reclaim My Place', duration: '4:32' },
      { number: 10, title: 'Justin', duration: '4:17' },
      { number: 11, title: 'Seed', duration: '5:54' },
      { number: 12, title: 'Cameltosis', duration: '4:38' },
      { number: 13, title: 'My Gift to You', duration: '8:53', notes: 'Ballade sombre de clôture' },
    ],
    certifications: ['7x Platine (US)', '2x Platine (UK)', '4x Platine (AU)'],
    salesInfo: '14+ millions de copies mondiales',
  },
  {
    id: '4',
    slug: 'issues-1999',
    title: 'Issues',
    year: 1999,
    type: 'studio',
    cover: issuesAlbumCover,
    producer: 'Brendan O\'Brien',
    label: 'Immortal / Epic',
    description: `L'album le plus sombre et personnel de Korn. "Issues" (1999) plonge dans les traumatismes, la dépression, les addictions. Jonathan Davis met à nu ses démons les plus profonds.

Produit par Brendan O'Brien (Pearl Jam, Rage Against the Machine), le son est riche, stratifié, oppressant. "Falling Away From Me" ouvre avec un riff lourd et hypnotique, accompagné d'un clip choc sur la violence domestique.

"Make Me Bad" explore la dualité addiction/rédemption, "Somebody Someone" offre un rare moment de vulnérabilité mélodique. L'album est traversé par des interludes électroniques glaçants signés "Mooky".

Artwork minimaliste troublant (miroir déformant, enfant). #1 Billboard dès la première semaine, 573,000 copies vendues en 7 jours, 3x Platine. Korn au sommet, mais dans la douleur.`,
    tracks: [
      { number: 1, title: 'Dead', duration: '1:12', notes: 'Intro électronique' },
      { 
        number: 2, 
        title: 'Falling Away from Me', 
        duration: '4:30', 
        notes: 'Premier single majeur',
        isSingle: true,
        hasVideoClip: true,
        streamingLinks: {
          spotify: '#',
          appleMusic: '#',
          youtube: '#'
        }
      },
      { number: 3, title: 'Trash', duration: '3:27' },
      { number: 4, title: ' 4 U', duration: '3:55' },
      { number: 5, title: 'Beg for Me', duration: '3:51' },
      { 
        number: 6, 
        title: 'Make Me Bad', 
        duration: '3:54', 
        notes: 'Single iconique',
        isSingle: true,
        hasVideoClip: true,
        streamingLinks: {
          spotify: '#',
          appleMusic: '#',
          youtube: '#'
        }
      },
      { number: 7, title: 'It\'s Gonna Go Away', duration: '4:19' },
      { number: 8, title: 'Wake Up', duration: '4:09' },
      { number: 9, title: 'Am I Going Crazy', duration: '3:31' },
      { number: 10, title: 'Hey Daddy', duration: '3:45' },
      { 
        number: 11, 
        title: 'Somebody Someone', 
        duration: '3:46',
        isSingle: true,
        hasVideoClip: true,
        streamingLinks: {
          spotify: '#',
          appleMusic: '#',
          youtube: '#'
        }
      },
      { number: 12, title: 'No Way', duration: '4:00' },
      { number: 13, title: 'Letting You Go', duration: '4:19' },
      { number: 14, title: 'Counting', duration: '3:43' },
      { number: 15, title: 'Dirty', duration: '5:12', notes: 'Outro dévastateur' },
    ],
    certifications: ['3x Platine (US)', 'Platine (UK)'],
    salesInfo: '3+ millions de copies',
  },
  {
    id: '5',
    slug: 'untouchables-2002',
    title: 'Untouchables',
    year: 2002,
    type: 'studio',
    cover: untouchablesAlbumCover,
    producer: 'Michael Beinhorn',
    label: 'Immortal / Epic',
    description: `L'ALBUM ÉPONYME de notre communauté ! "Untouchables" (2002) est l'opus le plus expérimental et ambitieux de Korn, une œuvre-fleuve de 74 minutes qui repousse toutes les limites du nu metal.

Produit par Michael Beinhorn (Soundgarden, Hole) avec un budget record de $4 millions, le son est MASSIF, chaque instrument occupe un espace sonic propre. Les sessions sont tendues, perfectionnistes, cathartiques.

"Here to Stay" remporte le Grammy Award 2003 de la meilleure performance metal. "Thoughtless" dénonce le harcèlement avec un clip poignant. "Alone I Break" révèle une vulnérabilité inédite.

L'album intègre des influences industrielles, électroniques, ambient. Artwork photographique sombre (fillette noyée). #2 Billboard, 2x Platine. Un album-monument qui donne son nom à UNTOUCHABLES, notre communauté !`,
    tracks: [
      { 
        number: 1, 
        title: 'Here to Stay', 
        duration: '4:31', 
        notes: 'GRAMMY AWARD 2003 🏆',
        isSingle: true,
        hasVideoClip: true,
        streamingLinks: {
          spotify: '#',
          appleMusic: '#',
          youtube: '#'
        }
      },
      { number: 2, title: 'Make Believe', duration: '4:44' },
      { number: 3, title: 'Blame', duration: '4:44', hasVideoClip: true },
      { number: 4, title: 'Hollow Life', duration: '4:23', hasVideoClip: true },
      { number: 5, title: 'Bottled Up Inside', duration: '4:01' },
      { 
        number: 6, 
        title: 'Thoughtless', 
        duration: '4:33', 
        notes: 'Clip iconique sur le harcèlement',
        isSingle: true,
        hasVideoClip: true,
        streamingLinks: {
          spotify: '#',
          appleMusic: '#',
          youtube: '#'
        }
      },
      { number: 7, title: 'Hating', duration: '5:25' },
      { number: 8, title: 'One More Time', duration: '4:35' },
      { 
        number: 9, 
        title: 'Alone I Break', 
        duration: '4:18',
        isSingle: true,
        hasVideoClip: true,
        streamingLinks: {
          spotify: '#',
          appleMusic: '#',
          youtube: '#'
        }
      },
      { number: 10, title: 'Embrace', duration: '4:26' },
      { number: 11, title: 'Beat It Upright', duration: '4:11' },
      { number: 12, title: 'Wake Up Hate', duration: '3:48' },
      { number: 13, title: 'I\'m Hiding', duration: '3:50' },
      { number: 14, title: 'No One\'s There', duration: '5:41', notes: 'Outro atmosphérique' },
    ],
    certifications: ['2x Platine (US)', 'Or (UK)'],
    salesInfo: '2+ millions de copies',
  },
  {
    id: '6',
    slug: 'take-a-look-in-the-mirror-2003',
    title: 'Take a Look in the Mirror',
    year: 2003,
    type: 'studio',
    cover: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800',
    producer: 'Korn & Michael Beinhorn',
    label: 'Immortal / Epic',
    description: `Retour aux sources brutal ! "Take a Look in the Mirror" (2003) voit Korn revenir à l'agressivité brute des débuts après l'expérimentation d'Untouchables.

Auto-produit avec Michael Beinhorn, l'album est direct, rapide, sans compromis. "Right Now" explose d'emblée avec une rage punk, "Did My Time" (thème du film Lara Croft) devient un hit rock radio.

"Y'all Want a Single" critique l'industrie musicale avec ironie ("Fuck that!"), accompagné d'un clip où le groupe détruit symboliquement une major label. "Everything I've Known" et "Break Some Off" ramènent le groove lourd et hypnotique.

Artwork minimaliste (miroir fragmenté). #9 Billboard, Or aux USA. Dernier album avec la formation classique avant le départ de Head en 2005. Une déclaration de guerre sonore !`,
    tracks: [
      { number: 1, title: 'Right Now', duration: '3:13' },
      { number: 2, title: 'Break Some Off', duration: '2:39' },
      { number: 3, title: 'Counting on Me', duration: '4:46' },
      { number: 4, title: 'Here It Comes Again', duration: '3:31' },
      { number: 5, title: 'Deep Inside', duration: '2:49' },
      { number: 6, title: 'Did My Time', duration: '4:04', notes: 'Thème de Lara Croft: Tomb Raider' },
      { number: 7, title: 'Everything I\'ve Known', duration: '3:28' },
      { number: 8, title: 'Play Me', duration: '3:15', notes: 'Feat. Nas' },
      { number: 9, title: 'Alive', duration: '4:29' },
      { number: 10, title: 'Let\'s Do This Now', duration: '3:21' },
      { number: 11, title: 'I\'m Done', duration: '4:12' },
      { number: 12, title: 'Y\'all Want a Single', duration: '3:19', notes: 'Critique de l\'industrie musicale' },
      { number: 13, title: 'When Will This End', duration: '4:14' },
    ],
    certifications: ['Or (US)'],
    salesInfo: '1+ million de copies',
  },

  // ALBUMS LIVE
  {
    id: '101',
    slug: 'live-at-cbgbs-2006',
    title: 'Live at CBGB\'s',
    year: 2006,
    type: 'live',
    cover: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=800',
    label: 'Sony BMG',
    description: `Concert historique capturé au mythique CBGB's de New York en novembre 2003, juste avant la fermeture du club légendaire.

Performance brute et intense dans un lieu emblématique du punk, Korn rend hommage à ses racines underground. Setlist compact concentrant les hits et l'énergie live dévastatrice du groupe.

Album digital uniquement, sorti en 2006. Document rare immortalisant la puissance de Korn dans un cadre intimiste loin des arenas habituelles.`,
    tracks: [
      { number: 1, title: 'Blind', duration: '4:45' },
      { number: 2, title: 'Falling Away from Me', duration: '4:55' },
      { number: 3, title: 'Y\'all Want a Single', duration: '3:30' },
      { number: 4, title: 'Here to Stay', duration: '5:10' },
      { number: 5, title: 'Got the Life', duration: '4:20' },
      { number: 6, title: 'Freak on a Leash', duration: '5:30' },
      { number: 7, title: 'Shoots and Ladders', duration: '6:15' },
    ],
  },

  // COMPILATIONS
  {
    id: '201',
    slug: 'greatest-hits-vol-1-2004',
    title: 'Greatest Hits Vol. 1',
    year: 2004,
    type: 'compilation',
    cover: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800',
    label: 'Epic',
    description: `La compilation ultime des 10 premières années de Korn ! Retraçant la décennie 1994-2004, cet album rassemble tous les hits qui ont défini le nu metal.

Inclut les incontournables : "Blind", "Freak on a Leash", "Falling Away from Me", "Here to Stay", "Got the Life", "Did My Time".

Contient également "Another Brick in the Wall (Part 1, 2, 3)", cover monumental de Pink Floyd enregistré pour l'album. DVD bonus avec tous les clips vidéo.

Certifié Or aux USA, cette compilation est la porte d'entrée idéale pour découvrir Korn et comprendre leur impact révolutionnaire sur le rock moderne.`,
    tracks: [
      { number: 1, title: 'Word Up!', duration: '3:15', notes: 'Cover de Cameo' },
      { number: 2, title: 'Blind', duration: '4:20' },
      { number: 3, title: 'Freak on a Leash', duration: '4:16' },
      { number: 4, title: 'Falling Away from Me', duration: '4:32' },
      { number: 5, title: 'Got the Life', duration: '3:47' },
      { number: 6, title: 'Somebody Someone', duration: '3:48' },
      { number: 7, title: 'Here to Stay', duration: '4:33' },
      { number: 8, title: 'Did My Time', duration: '4:06' },
      { number: 9, title: 'Thoughtless', duration: '4:35' },
      { number: 10, title: 'Y\'all Want a Single', duration: '3:22' },
      { number: 11, title: 'Alone I Break', duration: '4:20' },
      { number: 12, title: 'Another Brick in the Wall (Parts 1, 2, 3)', duration: '8:54', notes: 'Cover Pink Floyd - INÉDIT' },
    ],
    certifications: ['Or (US)'],
  },
];

export const getAlbumBySlug = (slug: string): Album | undefined => {
  return albums.find((album) => album.slug === slug);
};

export const getAlbumsByType = (type: Album['type']): Album[] => {
  return albums.filter((album) => album.type === type);
};

export const getStudioAlbums = (): Album[] => {
  return albums.filter((album) => album.type === 'studio').sort((a, b) => a.year - b.year);
};

export const getLiveAlbums = (): Album[] => {
  return albums.filter((album) => album.type === 'live').sort((a, b) => a.year - b.year);
};

export const getCompilations = (): Album[] => {
  return albums.filter((album) => album.type === 'compilation').sort((a, b) => a.year - b.year);
};

export const getSinglesEPs = (): Album[] => {
  return albums.filter((album) => album.type === 'single' || album.type === 'ep').sort((a, b) => a.year - b.year);
};