export interface Member {
  id: string;
  slug: string;
  name: string;
  role: string;
  period: string;
  status: 'active' | 'former';
  bio: string;
  birthDate?: string;
  instruments?: string[];
  image: string;
}

export const members: Member[] = [
  {
    id: '1',
    slug: 'jonathan-davis',
    name: 'Jonathan Davis',
    role: 'Chant principal, cornemuse, bagpipes',
    period: '1993 - Aujourd\'hui',
    status: 'active',
    bio: `Jonathan Howsmon Davis, né le 18 janvier 1971 à Bakersfield en Californie, est le chanteur emblématique de Korn. Avec sa voix unique oscillant entre chuchotements glaçants et hurlements viscéraux, JDevil (son surnom) a défini le son du nu metal.

Son enfance difficile, marquée par le harcèlement scolaire et des traumatismes personnels, nourrit l'intensité émotionnelle de ses textes. Formé comme assistant médico-légal, il apporte une perspective sombre et clinique à son art.

Au-delà de Korn, Jonathan explore l'électro-indus avec son projet solo JDevil et compose pour le cinéma (Queen of the Damned). Collectionneur d'objets macabres et passionné d'occultisme, il incarne parfaitement l'esthétique "High-Def Horror" du groupe.`,
    birthDate: '18 janvier 1971',
    instruments: ['Voix', 'Cornemuse', 'Programmation'],
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
  },
  {
    id: '2',
    slug: 'james-munky-shaffer',
    name: 'James "Munky" Shaffer',
    role: 'Guitare rythmique',
    period: '1993 - Aujourd\'hui',
    status: 'active',
    bio: `James Christian Shaffer, surnommé "Munky", est le guitariste rythmique et co-fondateur de Korn. Né le 6 juin 1970 à Rosedale, Californie, il développe avec Head l'approche guitaristique révolutionnaire du groupe.

Munky crée des riffs lourds, dissonants et hypnotiques en accordage grave (drop A, 7 cordes), définissant le template sonore du nu metal. Son jeu est marqué par des palm mutes percussifs, des harmoniques artificielles et des textures industrielles.

En 2012, il lance Emotional Syphon Recordings, son label indépendant. Pratiquant la méditation transcendantale, Munky trouve l'équilibre entre la violence sonore de Korn et une recherche spirituelle personnelle. Il utilise des guitares Ibanez signature customisées.`,
    birthDate: '6 juin 1970',
    instruments: ['Guitare 7 cordes', 'Guitare rythmique'],
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800',
  },
  {
    id: '3',
    slug: 'brian-head-welch',
    name: 'Brian "Head" Welch',
    role: 'Guitare lead',
    period: '1993-2005, 2013 - Aujourd\'hui',
    status: 'active',
    bio: `Brian Philip Welch, alias "Head", est le guitariste lead légendaire de Korn. Né le 19 juin 1970 à Torrance, Californie, il co-fonde le groupe et révolutionne la guitare metal moderne.

Head quitte Korn en 2005 suite à sa conversion religieuse et ses luttes contre l'addiction. Il sort deux albums solo (Save Me From Myself, 2008; Love and Death, 2012) avant de revenir triomphalement en 2013 pour l'album The Paradigm Shift.

Son jeu est caractérisé par des leads agressifs, des slides dissonants et une approche mélodique unique. Avec Munky, il crée la signature sonore de Korn : lourde, sombre, hypnotique. Il joue sur des guitares Ibanez 7 cordes customisées et utilise des accordages ultra-graves.`,
    birthDate: '19 juin 1970',
    instruments: ['Guitare 7 cordes', 'Guitare lead'],
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800',
  },
  {
    id: '4',
    slug: 'reginald-fieldy-arvizu',
    name: 'Reginald "Fieldy" Arvizu',
    role: 'Basse',
    period: '1993 - 2021',
    status: 'former',
    bio: `Reginald Quincy Arvizu, connu comme "Fieldy", est le bassiste iconique de Korn de 1993 à 2021. Né le 2 novembre 1969 à Bakersfield, Californie, il révolutionne l'approche de la basse dans le metal.

Fieldy développe un style unique : basse accordée ultra-grave (drop A), jeu percussif slappé, cordes volontairement détendues créant un claquement métallique caractéristique. Son son devient la signature rythmique de Korn, plus percussif que mélodique.

En 2021, il annonce une pause pour raisons personnelles et est remplacé par Roberto "Ra" Díaz. Au-delà de Korn, Fieldy a sorti plusieurs albums solo hip-hop et écrit deux livres autobiographiques sur ses luttes contre l'addiction.`,
    birthDate: '2 novembre 1969',
    instruments: ['Basse 5 cordes', 'Basse slap'],
    image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=800',
  },
  {
    id: '5',
    slug: 'ray-luzier',
    name: 'Ray Luzier',
    role: 'Batterie',
    period: '2007 - Aujourd\'hui',
    status: 'active',
    bio: `Raymond Lee "Ray" Luzier, né le 11 juin 1970 à Pittsburgh, Pennsylvanie, est le batteur officiel de Korn depuis 2007, après avoir remplacé David Silveria.

Technicien hors pair, Ray apporte une précision et une puissance nouvelles à la section rythmique de Korn. Formé au jazz et au rock progressif, il fusionne groove lourd et virtuosité, adaptant parfaitement son jeu à l'identité du groupe.

Avant Korn, Ray a joué avec David Lee Roth, Billy Sheehan et Army of Anyone. Il utilise principalement des batteries Tama et des cymbales Zildjian. Son approche allie brutalité metal et subtilité dynamique, stabilisant Korn après le départ de Silveria.`,
    birthDate: '11 juin 1970',
    instruments: ['Batterie', 'Percussions'],
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800',
  },
  {
    id: '6',
    slug: 'david-silveria',
    name: 'David Silveria',
    role: 'Batterie',
    period: '1993 - 2006',
    status: 'former',
    bio: `David Randall Silveria, né le 21 septembre 1972 à San Leandro, Californie, est le batteur fondateur de Korn. Il crée la foundation rythmique originale du groupe de 1993 à 2006.

Son jeu énergique et agressif, marqué par des double-kicks puissants et des fills créatifs, définit le son des albums classiques de Korn (Korn, Life Is Peachy, Follow the Leader, Issues).

Silveria quitte Korn en 2006 suite à des tensions internes et divergences financières. Il tente brièvement un retour en 2013 mais les négociations échouent. Depuis, il se consacre à des projets personnels et reste une figure légendaire de l'histoire de Korn.`,
    birthDate: '21 septembre 1972',
    instruments: ['Batterie', 'Percussions'],
    image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800',
  },
];

export const getActiveMember = (slug: string): Member | undefined => {
  return members.find((m) => m.slug === slug);
};

export const getActiveMembers = (): Member[] => {
  return members.filter((m) => m.status === 'active');
};

export const getFormerMembers = (): Member[] => {
  return members.filter((m) => m.status === 'former');
};
