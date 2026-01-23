export interface Single {
  id: string;
  slug: string;
  title: string;
  album: string;
  albumSlug: string;
  year: number;
  cover: string;
  duration: string;
  description: string;
  videoClip?: {
    director: string;
    views?: string;
    description: string;
  };
  chartPositions?: {
    country: string;
    position: number;
  }[];
  certifications?: string[];
  bSides?: {
    title: string;
    duration: string;
  }[];
  streamingLinks: {
    spotify: string;
    appleMusic: string;
    youtube: string;
  };
}

export const singles: Single[] = [
  {
    id: 'blind-1994',
    slug: 'blind-1994',
    title: 'Blind',
    album: 'Korn',
    albumSlug: 'korn-1994',
    year: 1994,
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800',
    duration: '4:18',
    description: `"Blind" est le premier single et l'ouverture explosive de l'album éponyme de Korn (1994). Ce morceau fondateur du nu metal commence par le cri iconique de Jonathan Davis "Are you ready?!" qui deviendra la signature du groupe.

Le riff hypnotique en drop A de Munky et Head, combiné au jeu de basse claquant de Fieldy, crée une atmosphère lourde et oppressante. Les paroles évoquent la frustration, l'aliénation et la rage intérieure qui caractérisent l'univers de Korn.

Produit par Ross Robinson au Indigo Ranch Studios, "Blind" capture l'essence brute et viscérale qui définira le son nu metal. Le morceau a été enregistré en une seule prise, conservant toute son énergie live.

"Blind" reste à ce jour l'un des morceaux les plus populaires du groupe en concert, ouvrant régulièrement leurs shows avec cette même intensité dévastatrice qu'en 1994.`,
    videoClip: {
      director: 'Ross Robinson',
      views: '45M+',
      description: 'Clip tourné en noir et blanc, capturant l\'énergie live brute du groupe avec des effets de distorsion VHS et des plans rapprochés sur Jonathan Davis.'
    },
    chartPositions: [
      { country: 'US Modern Rock', position: 15 },
      { country: 'US Mainstream Rock', position: 18 }
    ],
    streamingLinks: {
      spotify: '#',
      appleMusic: '#',
      youtube: '#'
    }
  },
  {
    id: 'shoots-and-ladders-1995',
    slug: 'shoots-and-ladders-1995',
    title: 'Shoots and Ladders',
    album: 'Korn',
    albumSlug: 'korn-1994',
    year: 1995,
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800',
    duration: '5:22',
    description: `"Shoots and Ladders" est l'un des morceaux les plus uniques et reconnaissables de Korn. Le titre mélange des comptines pour enfants déformées avec une lourdeur industrielle terrifiante.

L'introduction à la cornemuse écossaise jouée par Jonathan Davis crée une atmosphère inquiétante et surréaliste. Le morceau réinterprète des comptines classiques (Ring Around the Rosie, London Bridge, Mary Had a Little Lamb) pour dénoncer leurs origines sombres.

Les paroles traitent de l'innocence perdue de l'enfance et de la violence cachée derrière les apparences de normalité. La juxtaposition entre les mélodies enfantines et la brutalité sonore crée un malaise profond.

Ce single a marqué les esprits par son originalité et son audace créative, prouvant que Korn n'était pas qu'un groupe de métal lourd mais de véritables expérimentateurs sonores.`,
    videoClip: {
      director: 'Joseph McGinty Nichol',
      views: '28M+',
      description: 'Clip psychédélique et dérangeant mêlant images d\'enfance corrompue, mannequins inquiétants et performance live du groupe.'
    },
    chartPositions: [
      { country: 'US Modern Rock', position: 24 }
    ],
    streamingLinks: {
      spotify: '#',
      appleMusic: '#',
      youtube: '#'
    }
  },
  {
    id: 'freak-on-a-leash-1999',
    slug: 'freak-on-a-leash-1999',
    title: 'Freak on a Leash',
    album: 'Follow the Leader',
    albumSlug: 'follow-the-leader-1998',
    year: 1999,
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
    duration: '4:15',
    description: `"Freak on a Leash" est sans conteste LE single le plus emblématique de Korn. Ce morceau a propulsé le groupe vers une reconnaissance mondiale et reste leur plus grand succès commercial.

Le riff principal est devenu iconique dans l'histoire du métal moderne. La section "scatting" de Jonathan Davis (ses vocalisations non-verbales) est instantanément reconnaissable et a été parodiée d'innombrables fois.

Les paroles explorent les thèmes de la manipulation, du contrôle et de la libération. Le titre lui-même fait référence au sentiment d'être contrôlé comme un animal en laisse, un thème récurrent dans l'œuvre de Korn.

Le vidéoclip révolutionnaire mêle animation et prises de vue réelles, remportant le Grammy Award du "Best Short Form Music Video" en 2000. Le succès de ce single a consolidé Korn comme leaders incontestés du nu metal.`,
    videoClip: {
      director: 'Todd McFarlane, Jonathan Dayton, Valerie Faris',
      views: '350M+',
      description: 'Clip révolutionnaire mêlant animation (par le créateur de Spawn) et live-action. Une balle traverse différents univers visuels en synchronisation avec la musique. Grammy Award 2000 🏆'
    },
    chartPositions: [
      { country: 'US Billboard Hot 100', position: 24 },
      { country: 'US Modern Rock', position: 6 },
      { country: 'UK Singles', position: 24 },
      { country: 'AU ARIA', position: 14 }
    ],
    certifications: ['Platine (US)', 'Or (UK)'],
    streamingLinks: {
      spotify: '#',
      appleMusic: '#',
      youtube: '#'
    }
  },
  {
    id: 'got-the-life-1998',
    slug: 'got-the-life-1998',
    title: 'Got the Life',
    album: 'Follow the Leader',
    albumSlug: 'follow-the-leader-1998',
    year: 1998,
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
    duration: '3:45',
    description: `"Got the Life" est le premier single de "Follow the Leader" et a immédiatement établi l'album comme un événement majeur. Le morceau représente Korn au sommet de leur puissance créative.

La ligne de basse funky et percussive de Fieldy est au cœur du morceau, créant un groove addictif qui se marie parfaitement avec les riffs lourds. C'est l'un des meilleurs exemples de la signature sonore unique de Korn.

Les paroles parlent de libération spirituelle et de rejet du matérialisme. Jonathan Davis y exprime son éveil personnel et sa quête de sens au-delà de la célébrité et de l'argent.

Le succès commercial de "Got the Life" a ouvert les portes du mainstream au nu metal, prouvant qu'un son aussi agressif et alternatif pouvait conquérir les charts et MTV.`,
    videoClip: {
      director: 'Joseph McGinty Nichol (McG)',
      views: '85M+',
      description: 'Clip énergique filmé en caméra subjective qui suit le groupe dans leur quotidien déjanté et leurs performances explosives. Rotation intensive sur MTV.'
    },
    chartPositions: [
      { country: 'US Modern Rock', position: 11 },
      { country: 'US Mainstream Rock', position: 15 },
      { country: 'UK Singles', position: 23 }
    ],
    streamingLinks: {
      spotify: '#',
      appleMusic: '#',
      youtube: '#'
    }
  },
  {
    id: 'falling-away-from-me-1999',
    slug: 'falling-away-from-me-1999',
    title: 'Falling Away from Me',
    album: 'Issues',
    albumSlug: 'issues-1999',
    year: 1999,
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    duration: '4:30',
    description: `"Falling Away from Me" marque un tournant dans l'évolution sonore de Korn avec "Issues" (1999). Le morceau incorpore des éléments électroniques et hip-hop tout en conservant la lourdeur caractéristique du groupe.

Le riff principal est l'un des plus reconnaissables du catalogue de Korn. Les scratches de guitare et les effets électroniques créent une atmosphère claustrophobique et anxiogène qui correspond parfaitement aux paroles.

Les paroles traitent de violence domestique et d'abus, un sujet difficile que Jonathan Davis aborde avec une vulnérabilité déchirante. Le refrain "Falling away from me" exprime le désir désespéré d'échapper à une situation toxique.

Le vidéoclip choquant, qui met en scène une jeune fille victime d'abus familial, a été controversé mais a attiré l'attention sur un sujet social important. Ce single a consolidé le statut de Korn comme rock stars du nouveau millénaire.`,
    videoClip: {
      director: 'Fred Durst',
      views: '125M+',
      description: 'Clip controversé et brutal réalisé par Fred Durst (Limp Bizkit) montrant une jeune fille victime d\'abus familial qui trouve refuge dans la musique de Korn. Visuels choquants et message social fort.'
    },
    chartPositions: [
      { country: 'US Modern Rock', position: 1 },
      { country: 'US Mainstream Rock', position: 4 },
      { country: 'UK Singles', position: 24 },
      { country: 'AU ARIA', position: 29 }
    ],
    certifications: ['Or (US)'],
    streamingLinks: {
      spotify: '#',
      appleMusic: '#',
      youtube: '#'
    }
  },
  {
    id: 'make-me-bad-2000',
    slug: 'make-me-bad-2000',
    title: 'Make Me Bad',
    album: 'Issues',
    albumSlug: 'issues-1999',
    year: 2000,
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    duration: '3:54',
    description: `"Make Me Bad" est l'un des singles les plus atmosphériques et hypnotiques de Korn. Le morceau explore des territoires sonores plus sombres et plus expérimentaux que leurs hits précédents.

La production de Brendan O'Brien apporte une clarté et une profondeur nouvelles au son de Korn. Les guitares créent des textures brumeuses et oppressantes, tandis que la batterie de David Silveria maintient un groove implacable.

Les paroles parlent d'addiction et de dépendance toxique. La phrase "Make me bad" peut être interprétée comme une supplique vers l'autodestruction, un thème récurrent dans l'œuvre de Jonathan Davis.

Le vidéoclip futuriste et stylisé, réalisé par le duo de réalisateurs Samuel Bayer, présente le groupe dans un environnement dystopique high-tech. C'est l'un des clips les plus coûteux et ambitieux de la carrière du groupe.`,
    videoClip: {
      director: 'Samuel Bayer',
      views: '90M+',
      description: 'Clip futuriste et dystopique avec des effets spéciaux impressionnants. Le groupe évolue dans un environnement high-tech sombre où Jonathan Davis semble prisonnier d\'une machine.'
    },
    chartPositions: [
      { country: 'US Modern Rock', position: 14 },
      { country: 'US Mainstream Rock', position: 23 },
      { country: 'UK Singles', position: 25 }
    ],
    streamingLinks: {
      spotify: '#',
      appleMusic: '#',
      youtube: '#'
    }
  },
  {
    id: 'here-to-stay-2002',
    slug: 'here-to-stay-2002',
    title: 'Here to Stay',
    album: 'Untouchables',
    albumSlug: 'untouchables-2002',
    year: 2002,
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800',
    duration: '4:31',
    description: `"Here to Stay" est le single triomphal de l'album "Untouchables" (2002) et l'un des plus grands succès de Korn. Le morceau a remporté le Grammy Award de la "Best Metal Performance" en 2003.

La production de Michael Beinhorn donne au morceau une ampleur épique et une clarté cristalline. Les guitares sont massives, la basse est monumentale, et la batterie frappe comme un marteau. C'est Korn dans toute leur puissance.

Les paroles sont une déclaration d'intention : malgré les critiques, les modes changeantes et les difficultés, Korn est "here to stay". C'est un hymne de résilience et de détermination qui résonne avec les fans.

Le succès de ce single et sa reconnaissance aux Grammy Awards ont prouvé que Korn n'était pas une mode passagère mais une force durable dans le paysage du rock. Le morceau reste un incontournable de leurs setlists live.`,
    videoClip: {
      director: 'Little X',
      views: '68M+',
      description: 'Clip énergique et agressif montrant le groupe dans un environnement industriel post-apocalyptique. Visuels bruts et performance intense. Grammy Award 2003 🏆'
    },
    chartPositions: [
      { country: 'US Modern Rock', position: 4 },
      { country: 'US Mainstream Rock', position: 2 },
      { country: 'UK Singles', position: 12 },
      { country: 'AU ARIA', position: 16 }
    ],
    certifications: ['Or (US)', 'Or (UK)'],
    streamingLinks: {
      spotify: '#',
      appleMusic: '#',
      youtube: '#'
    }
  },
  {
    id: 'thoughtless-2002',
    slug: 'thoughtless-2002',
    title: 'Thoughtless',
    album: 'Untouchables',
    albumSlug: 'untouchables-2002',
    year: 2002,
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800',
    duration: '4:33',
    description: `"Thoughtless" est l'une des chansons les plus personnelles et émouvantes de Korn. Le morceau traite du harcèlement scolaire que Jonathan Davis a subi pendant son enfance et son adolescence.

La chanson commence de manière atmosphérique et mélodique avant d'exploser en une rage cathar tique dans le refrain. La dynamique émotionnelle du morceau reflète le traumatisme et la colère associés au harcèlement.

Les paroles sont directes et déchirantes : "Thoughtless / All your insults" résume la douleur causée par les moqueries et le rejet social. Davis chante avec une vulnérabilité rare, rendant le message encore plus puissant.

Le vidéoclip, qui montre un lycéen harcelé qui trouve sa force intérieure, a touché des millions de personnes. Le clip se termine par un message anti-harcèlement, faisant de "Thoughtless" plus qu'une simple chanson, mais un véritable hymne de résilience pour les victimes.`,
    videoClip: {
      director: 'Dave Meyers',
      views: '95M+',
      description: 'Clip iconique et bouleversant montrant un lycéen victime de harcèlement qui trouve sa force intérieure et se transforme. Message anti-harcèlement puissant qui a résonné avec des millions de fans.'
    },
    chartPositions: [
      { country: 'US Modern Rock', position: 11 },
      { country: 'US Mainstream Rock', position: 6 },
      { country: 'UK Singles', position: 37 }
    ],
    streamingLinks: {
      spotify: '#',
      appleMusic: '#',
      youtube: '#'
    }
  },
];

export function getSingleBySlug(slug: string): Single | undefined {
  return singles.find(single => single.slug === slug);
}
