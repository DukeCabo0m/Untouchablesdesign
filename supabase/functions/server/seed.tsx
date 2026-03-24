// Seed data initialization script
// This creates initial data for testing the Untouchables admin cPanel

import * as kv from "./kv_store.tsx";

export async function seedDatabase() {
  console.log("🌱 Starting database seeding...");

  // ============================================================================
  // SEED USERS
  // ============================================================================
  
  const adminUser = {
    id: "admin-001",
    username: "admin",
    email: "admin@untouchables.fr",
    password: "admin123", // In production, this should be hashed!
    roles: ["ROLE_ADMIN", "ROLE_USER"],
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400",
    bio: "Administrateur principal du site Untouchables",
    location: "Paris, France",
    website: "https://untouchables.fr",
    facebookUrl: null,
    instagramUrl: null,
    tiktokUrl: null,
    isActive: true,
    isBanned: false,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: new Date().toISOString()
  };

  const testUsers = [
    {
      id: "user-001",
      username: "KornFan88",
      email: "kornfan88@example.com",
      password: "password123",
      roles: ["ROLE_USER"],
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400",
      bio: "Fan de Korn depuis Follow the Leader",
      location: "Lyon, France",
      website: null,
      facebookUrl: null,
      instagramUrl: null,
      tiktokUrl: null,
      isActive: true,
      isBanned: false,
      createdAt: "2024-02-15T10:30:00.000Z",
      updatedAt: new Date().toISOString()
    },
    {
      id: "user-002",
      username: "MetalheadFR",
      email: "metalhead@example.com",
      password: "password123",
      roles: ["ROLE_USER"],
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      bio: "Nu-metal forever 🤘",
      location: "Marseille, France",
      website: null,
      facebookUrl: null,
      instagramUrl: null,
      tiktokUrl: null,
      isActive: true,
      isBanned: false,
      createdAt: "2024-03-10T14:20:00.000Z",
      updatedAt: new Date().toISOString()
    },
    {
      id: "user-003",
      username: "JDavisFan",
      email: "jdavisfan@example.com",
      password: "password123",
      roles: ["ROLE_USER"],
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400",
      bio: "Jonathan Davis est un génie",
      location: "Toulouse, France",
      website: null,
      facebookUrl: null,
      instagramUrl: null,
      tiktokUrl: null,
      isActive: false,
      isBanned: false,
      createdAt: "2024-04-05T09:15:00.000Z",
      updatedAt: new Date().toISOString()
    },
    {
      id: "user-004",
      username: "ToxicSpammer",
      email: "toxic@example.com",
      password: "password123",
      roles: ["ROLE_USER"],
      avatar: null,
      bio: null,
      location: null,
      website: null,
      facebookUrl: null,
      instagramUrl: null,
      tiktokUrl: null,
      isActive: true,
      isBanned: true,
      createdAt: "2024-05-01T16:45:00.000Z",
      updatedAt: new Date().toISOString()
    }
  ];

  await kv.set("user:admin-001", adminUser);
  for (const user of testUsers) {
    await kv.set(`user:${user.id}`, user);
  }
  console.log(`✅ Created ${testUsers.length + 1} users (including 1 admin)`);

  // ============================================================================
  // SEED ALBUMS
  // ============================================================================

  const albums = [
    {
      id: "album-001",
      title: "Korn",
      slug: "korn",
      type: "album",
      releaseDate: "1994-10-11",
      coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800",
      label: "Immortal Records",
      producer: "Ross Robinson",
      description: "Le premier album studio éponyme de Korn, sorti en 1994. Cet album a révolutionné le nu-metal.",
      tracks: [
        { number: 1, title: "Blind", duration: "4:19" },
        { number: 2, title: "Ball Tongue", duration: "4:29" },
        { number: 3, title: "Need To", duration: "4:01" },
        { number: 4, title: "Clown", duration: "4:37" },
        { number: 5, title: "Divine", duration: "2:51" }
      ],
      spotifyUrl: "https://open.spotify.com/album/korn",
      appleMusicUrl: null,
      deezerUrl: null,
      youtubeUrl: null,
      createdAt: "2024-01-15T00:00:00.000Z",
      updatedAt: new Date().toISOString()
    },
    {
      id: "album-002",
      title: "Follow the Leader",
      slug: "follow-the-leader",
      type: "album",
      releaseDate: "1998-08-18",
      coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
      label: "Epic Records",
      producer: "Steve Thompson, Toby Wright",
      description: "Troisième album studio de Korn, considéré comme l'un des meilleurs albums de nu-metal.",
      tracks: [
        { number: 1, title: "It's On!", duration: "4:28" },
        { number: 2, title: "Freak on a Leash", duration: "4:15" },
        { number: 3, title: "Got the Life", duration: "3:45" },
        { number: 4, title: "Dead Bodies Everywhere", duration: "4:44" }
      ],
      spotifyUrl: "https://open.spotify.com/album/ftl",
      appleMusicUrl: null,
      deezerUrl: null,
      youtubeUrl: null,
      createdAt: "2024-01-16T00:00:00.000Z",
      updatedAt: new Date().toISOString()
    },
    {
      id: "album-003",
      title: "Issues",
      slug: "issues",
      type: "album",
      releaseDate: "1999-11-16",
      coverImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800",
      label: "Epic Records",
      producer: "Brendan O'Brien",
      description: "Le quatrième album studio de Korn, plus sombre et expérimental.",
      tracks: [
        { number: 1, title: "Dead", duration: "1:11" },
        { number: 2, title: "Falling Away from Me", duration: "4:31" },
        { number: 3, title: "Trash", duration: "3:27" },
        { number: 4, title: "4 U", duration: "3:10" }
      ],
      spotifyUrl: null,
      appleMusicUrl: null,
      deezerUrl: null,
      youtubeUrl: null,
      createdAt: "2024-01-17T00:00:00.000Z",
      updatedAt: new Date().toISOString()
    }
  ];

  for (const album of albums) {
    await kv.set(`album:${album.id}`, album);
  }
  console.log(`✅ Created ${albums.length} albums`);

  // ============================================================================
  // SEED ARTICLES
  // ============================================================================

  const articles = [
    {
      id: "article-001",
      title: "Korn annonce une nouvelle tournée européenne pour 2026",
      slug: "korn-annonce-tournee-europeenne-2026",
      content: "Le groupe de nu-metal légendaire Korn vient d'annoncer officiellement une nouvelle tournée européenne qui passera par plusieurs villes de France en été 2026. Les fans français pourront les voir à Paris, Lyon, Marseille et Strasbourg. Cette tournée célébrera les 30 ans de leur album emblématique 'Follow the Leader'.",
      excerpt: "Korn revient en Europe pour une tournée exceptionnelle en 2026",
      coverImage: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200",
      category: "news",
      tags: ["tournée", "concert", "europe", "2026"],
      authorId: "admin-001",
      isPublished: true,
      isFeatured: true,
      publishedAt: "2026-03-10T10:00:00.000Z",
      viewCount: 1247,
      createdAt: "2026-03-09T00:00:00.000Z",
      updatedAt: new Date().toISOString()
    },
    {
      id: "article-002",
      title: "Interview exclusive : Jonathan Davis parle du prochain album",
      slug: "interview-jonathan-davis-prochain-album",
      content: "Dans une interview exclusive accordée à Untouchables, Jonathan Davis révèle des détails croustillants sur le prochain album de Korn prévu pour 2027. 'On revient aux sources du nu-metal tout en explorant de nouveaux territoires sonores', confie le chanteur.",
      excerpt: "Jonathan Davis se confie sur la direction artistique du prochain album de Korn",
      coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200",
      category: "interview",
      tags: ["interview", "jonathan davis", "album", "2027"],
      authorId: "admin-001",
      isPublished: true,
      isFeatured: false,
      publishedAt: "2026-03-05T14:30:00.000Z",
      viewCount: 892,
      createdAt: "2026-03-04T00:00:00.000Z",
      updatedAt: new Date().toISOString()
    },
    {
      id: "article-003",
      title: "Chronique : Retour sur l'album 'Issues' 25 ans après",
      slug: "chronique-album-issues-25-ans",
      content: "25 ans après sa sortie, 'Issues' reste l'un des albums les plus sombres et personnels de Korn. Cette chronique revient sur l'impact durable de cet opus controversé mais essentiel dans la discographie du groupe.",
      excerpt: "Analyse approfondie de l'album 'Issues' à l'occasion de son 25e anniversaire",
      coverImage: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=1200",
      category: "chronique",
      tags: ["chronique", "issues", "anniversaire", "analyse"],
      authorId: "user-001",
      isPublished: true,
      isFeatured: false,
      publishedAt: "2026-02-28T09:00:00.000Z",
      viewCount: 543,
      createdAt: "2026-02-27T00:00:00.000Z",
      updatedAt: new Date().toISOString()
    },
    {
      id: "article-004",
      title: "[BROUILLON] Nouveau single à venir",
      slug: "brouillon-nouveau-single",
      content: "Article en cours de rédaction...",
      excerpt: null,
      coverImage: null,
      category: "news",
      tags: [],
      authorId: "admin-001",
      isPublished: false,
      isFeatured: false,
      publishedAt: null,
      viewCount: 0,
      createdAt: "2026-03-14T00:00:00.000Z",
      updatedAt: new Date().toISOString()
    }
  ];

  for (const article of articles) {
    await kv.set(`article:${article.id}`, article);
  }
  console.log(`✅ Created ${articles.length} articles`);
  
  // Verify articles were created
  const savedArticles = await kv.getByPrefix("article:");
  console.log(`🔍 Verification: Found ${savedArticles.length} articles in database`);
  console.log(`🔍 Article IDs:`, savedArticles.map(a => a.id));

  // ============================================================================
  // SEED CONCERTS
  // ============================================================================

  const concerts = [
    {
      id: "concert-001",
      date: "2026-07-15T20:00:00.000Z",
      venue: "Accor Arena",
      city: "Paris",
      country: "France",
      tour: "European Tour 2026",
      ticketUrl: "https://tickets.example.com/korn-paris",
      status: "scheduled",
      attendance: "Capacité : 20,300",
      description: "Concert événement de Korn à Paris dans le cadre de la tournée européenne 2026. Une soirée mémorable qui promet un spectacle visuel et sonore exceptionnel.",
      setlist: null, // Pas encore joué
      photos: [],
      videos: [],
      createdAt: "2026-03-01T00:00:00.000Z",
      updatedAt: new Date().toISOString()
    },
    {
      id: "concert-002",
      date: "2026-07-18T20:00:00.000Z",
      venue: "Halle Tony Garnier",
      city: "Lyon",
      country: "France",
      tour: "European Tour 2026",
      ticketUrl: "https://tickets.example.com/korn-lyon",
      status: "scheduled",
      attendance: "Capacité : 17,000",
      description: "Korn débarque à Lyon pour un concert explosif dans la mythique Halle Tony Garnier.",
      setlist: null, // Pas encore joué
      photos: [],
      videos: [],
      createdAt: "2026-03-01T00:00:00.000Z",
      updatedAt: new Date().toISOString()
    },
    {
      id: "concert-003",
      date: "2026-07-20T20:00:00.000Z",
      venue: "Dome de Marseille",
      city: "Marseille",
      country: "France",
      tour: "European Tour 2026",
      ticketUrl: "https://tickets.example.com/korn-marseille",
      status: "scheduled",
      attendance: "Capacité : 8,500",
      description: "Dernière date française de la tournée européenne au Dôme de Marseille.",
      setlist: null, // Pas encore joué
      photos: [],
      videos: [],
      createdAt: "2026-03-01T00:00:00.000Z",
      updatedAt: new Date().toISOString()
    },
    {
      id: "concert-004",
      date: "2025-08-10T20:00:00.000Z",
      venue: "Hellfest",
      city: "Clisson",
      country: "France",
      tour: "Festival Season 2025",
      ticketUrl: null,
      status: "completed",
      attendance: "60,000 festivaliers",
      description: "Performance légendaire de Korn au Hellfest 2025 sur la Mainstage 1. Une setlist exceptionnelle qui a marqué les esprits avec des classiques et des raretés.",
      setlist: [
        "Here to Stay",
        "Rotting in Vain",
        "Blind",
        "Coming Undone",
        "Got the Life",
        "Shoots and Ladders",
        "Make Me Bad",
        "You'll Never Find Me",
        "Somebody Someone",
        "Twisted Transistor",
        "Falling Away from Me",
        "Freak on a Leash",
        "A.D.I.D.A.S.",
        "Encore:",
        "Another Brick in the Wall (Pink Floyd cover)",
        "Oildale (Leave Me Alone)"
      ],
      photos: [
        { 
          id: 1, 
          url: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80", 
          user: "MetalFan92",
          caption: "Jonathan Davis en pleine performance"
        },
        { 
          id: 2, 
          url: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&q=80", 
          user: "KornArmy666",
          caption: "La foule en délire"
        },
        { 
          id: 3, 
          url: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&q=80", 
          user: "NuMetalKing",
          caption: "Éclairages spectaculaires"
        }
      ],
      videos: [
        { 
          id: 1, 
          title: "Blind - Live", 
          thumbnail: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80", 
          user: "LiveMetal",
          duration: "4:18"
        },
        { 
          id: 2, 
          title: "Freak on a Leash - Live", 
          thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80", 
          user: "ConcertVids",
          duration: "4:15"
        }
      ],
      createdAt: "2025-01-15T00:00:00.000Z",
      updatedAt: new Date().toISOString()
    }
  ];

  for (const concert of concerts) {
    await kv.set(`concert:${concert.id}`, concert);
  }
  console.log(`✅ Created ${concerts.length} concerts`);

  // ============================================================================
  // SEED SINGLES
  // ============================================================================

  const singles = [
    {
      id: "single-001",
      slug: "blind-1994",
      title: "Blind",
      album: "Korn",
      albumSlug: "korn",
      year: 1994,
      coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800",
      duration: "4:18",
      description: `"Blind" est le premier single et l'ouverture explosive de l'album éponyme de Korn (1994). Ce morceau fondateur du nu metal commence par le cri iconique de Jonathan Davis "Are you ready?!" qui deviendra la signature du groupe.

Le riff hypnotique en drop A de Munky et Head, combiné au jeu de basse claquant de Fieldy, crée une atmosphère lourde et oppressante. Les paroles évoquent la frustration, l'aliénation et la rage intérieure qui caractérisent l'univers de Korn.

Produit par Ross Robinson au Indigo Ranch Studios, "Blind" capture l'essence brute et viscérale qui définira le son nu metal. Le morceau a été enregistré en une seule prise, conservant toute son énergie live.

"Blind" reste à ce jour l'un des morceaux les plus populaires du groupe en concert, ouvrant régulièrement leurs shows avec cette même intensité dévastatrice qu'en 1994.`,
      videoClip: {
        director: "Ross Robinson",
        views: "45M+",
        description: "Clip tourné en noir et blanc, capturant l'énergie live brute du groupe avec des effets de distorsion VHS et des plans rapprochés sur Jonathan Davis."
      },
      chartPositions: [
        { country: "US Modern Rock", position: 15 },
        { country: "US Mainstream Rock", position: 18 }
      ],
      spotifyUrl: "#",
      appleMusicUrl: "#",
      youtubeUrl: "#",
      createdAt: "2024-01-15T00:00:00.000Z",
      updatedAt: new Date().toISOString()
    },
    {
      id: "single-002",
      slug: "freak-on-a-leash-1999",
      title: "Freak on a Leash",
      album: "Follow the Leader",
      albumSlug: "follow-the-leader",
      year: 1999,
      coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800",
      duration: "4:15",
      description: `"Freak on a Leash" est sans conteste LE single le plus emblématique de Korn. Ce morceau a propulsé le groupe vers une reconnaissance mondiale et reste leur plus grand succès commercial.

Le riff principal est devenu iconique dans l'histoire du métal moderne. La section "scatting" de Jonathan Davis (ses vocalisations non-verbales) est instantanément reconnaissable et a été parodiée d'innombrables fois.

Les paroles explorent les thèmes de la manipulation, du contrôle et de la libération. Le titre lui-même fait référence au sentiment d'être contrôlé comme un animal en laisse, un thème récurrent dans l'œuvre de Korn.

Le vidéoclip révolutionnaire mêle animation et prises de vue réelles, remportant le Grammy Award du "Best Short Form Music Video" en 2000. Le succès de ce single a consolidé Korn comme leaders incontestés du nu metal.`,
      videoClip: {
        director: "Todd McFarlane, Jonathan Dayton, Valerie Faris",
        views: "350M+",
        description: "Clip révolutionnaire mêlant animation (par le créateur de Spawn) et live-action. Une balle traverse différents univers visuels en synchronisation avec la musique. Grammy Award 2000 🏆"
      },
      chartPositions: [
        { country: "US Billboard Hot 100", position: 24 },
        { country: "US Modern Rock", position: 6 },
        { country: "UK Singles", position: 24 },
        { country: "AU ARIA", position: 14 }
      ],
      certifications: ["Platine (US)", "Or (UK)"],
      spotifyUrl: "#",
      appleMusicUrl: "#",
      youtubeUrl: "#",
      createdAt: "2024-01-20T00:00:00.000Z",
      updatedAt: new Date().toISOString()
    },
    {
      id: "single-003",
      slug: "here-to-stay-2002",
      title: "Here to Stay",
      album: "Untouchables",
      albumSlug: "untouchables",
      year: 2002,
      coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800",
      duration: "4:31",
      description: `"Here to Stay" est le single triomphal de l'album "Untouchables" (2002) et l'un des plus grands succès de Korn. Le morceau a remporté le Grammy Award de la "Best Metal Performance" en 2003.

La production de Michael Beinhorn donne au morceau une ampleur épique et une clarté cristalline. Les guitares sont massives, la basse est monumentale, et la batterie frappe comme un marteau. C'est Korn dans toute leur puissance.

Les paroles sont une déclaration d'intention : malgré les critiques, les modes changeants et les difficultés, Korn est "here to stay". C'est un hymne de résilience et de détermination qui résonne avec les fans.

Le succès de ce single et sa reconnaissance aux Grammy Awards ont prouvé que Korn n'était pas une mode passagère mais une force durable dans le paysage du rock. Le morceau reste un incontournable de leurs setlists live.`,
      videoClip: {
        director: "Little X",
        views: "68M+",
        description: "Clip énergique et agressif montrant le groupe dans un environnement industriel post-apocalyptique. Visuels bruts et performance intense. Grammy Award 2003 🏆"
      },
      chartPositions: [
        { country: "US Modern Rock", position: 4 },
        { country: "US Mainstream Rock", position: 2 },
        { country: "UK Singles", position: 12 },
        { country: "AU ARIA", position: 16 }
      ],
      certifications: ["Or (US)", "Or (UK)"],
      spotifyUrl: "#",
      appleMusicUrl: "#",
      youtubeUrl: "#",
      createdAt: "2024-01-25T00:00:00.000Z",
      updatedAt: new Date().toISOString()
    }
  ];

  for (const single of singles) {
    await kv.set(`single:${single.id}`, single);
  }
  console.log(`✅ Created ${singles.length} singles`);

  // ============================================================================
  // SEED MEMBERS
  // ============================================================================

  const members = [
    {
      id: "member-001",
      slug: "jonathan-davis",
      name: "Jonathan Davis",
      role: "Chant principal, cornemuse, bagpipes",
      period: "1993 - Aujourd'hui",
      status: "active",
      bio: `Jonathan Howsmon Davis, né le 18 janvier 1971 à Bakersfield en Californie, est le chanteur emblématique de Korn. Avec sa voix unique oscillant entre chuchotements glaçants et hurlements viscéraux, JDevil (son surnom) a défini le son du nu metal.

Son enfance difficile, marquée par le harcèlement scolaire et des traumatismes personnels, nourrit l'intensité émotionnelle de ses textes. Formé comme assistant médico-légal, il apporte une perspective sombre et clinique à son art.

Au-delà de Korn, Jonathan explore l'électro-indus avec son projet solo JDevil et compose pour le cinéma (Queen of the Damned). Collectionneur d'objets macabres et passionné d'occultisme, il incarne parfaitement l'esthétique "High-Def Horror" du groupe.`,
      birthDate: "18 janvier 1971",
      instruments: ["Voix", "Cornemuse", "Programmation"],
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: new Date().toISOString()
    },
    {
      id: "member-002",
      slug: "james-munky-shaffer",
      name: "James \"Munky\" Shaffer",
      role: "Guitare rythmique",
      period: "1993 - Aujourd'hui",
      status: "active",
      bio: `James Christian Shaffer, surnommé "Munky", est le guitariste rythmique et co-fondateur de Korn. Né le 6 juin 1970 à Rosedale, Californie, il développe avec Head l'approche guitaristique révolutionnaire du groupe.

Munky crée des riffs lourds, dissonants et hypnotiques en accordage grave (drop A, 7 cordes), définissant le template sonore du nu metal. Son jeu est marqué par des palm mutes percussifs, des harmoniques artificielles et des textures industrielles.

En 2012, il lance Emotional Syphon Recordings, son label indépendant. Pratiquant la méditation transcendantale, Munky trouve l'équilibre entre la violence sonore de Korn et une recherche spirituelle personnelle. Il utilise des guitares Ibanez signature customisées.`,
      birthDate: "6 juin 1970",
      instruments: ["Guitare 7 cordes", "Guitare rythmique"],
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: new Date().toISOString()
    },
    {
      id: "member-003",
      slug: "brian-head-welch",
      name: "Brian \"Head\" Welch",
      role: "Guitare lead",
      period: "1993-2005, 2013 - Aujourd'hui",
      status: "active",
      bio: `Brian Philip Welch, alias "Head", est le guitariste lead légendaire de Korn. Né le 19 juin 1970 à Torrance, Californie, il co-fonde le groupe et révolutionne la guitare metal moderne.

Head quitte Korn en 2005 suite à sa conversion religieuse et ses luttes contre l'addiction. Il sort deux albums solo (Save Me From Myself, 2008; Love and Death, 2012) avant de revenir triomphalement en 2013 pour l'album The Paradigm Shift.

Son jeu est caractérisé par des leads agressifs, des slides dissonants et une approche mélodique unique. Avec Munky, il crée la signature sonore de Korn : lourde, sombre, hypnotique. Il joue sur des guitares Ibanez 7 cordes customisées et utilise des accordages ultra-graves.`,
      birthDate: "19 juin 1970",
      instruments: ["Guitare 7 cordes", "Guitare lead"],
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: new Date().toISOString()
    },
    {
      id: "member-004",
      slug: "reginald-fieldy-arvizu",
      name: "Reginald \"Fieldy\" Arvizu",
      role: "Basse",
      period: "1993 - 2021",
      status: "former",
      bio: `Reginald Quincy Arvizu, connu comme "Fieldy", est le bassiste iconique de Korn de 1993 à 2021. Né le 2 novembre 1969 à Bakersfield, Californie, il révolutionne l'approche de la basse dans le metal.

Fieldy développe un style unique : basse accordée ultra-grave (drop A), jeu percussif slappé, cordes volontairement détendues créant un claquement métallique caractéristique. Son son devient la signature rythmique de Korn, plus percussif que mélodique.

En 2021, il annonce une pause pour raisons personnelles et est remplacé par Roberto "Ra" Díaz. Au-delà de Korn, Fieldy a sorti plusieurs albums solo hip-hop et écrit deux livres autobiographiques sur ses luttes contre l'addiction.`,
      birthDate: "2 novembre 1969",
      instruments: ["Basse 5 cordes", "Basse slap"],
      image: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=800",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: new Date().toISOString()
    },
    {
      id: "member-005",
      slug: "ray-luzier",
      name: "Ray Luzier",
      role: "Batterie",
      period: "2007 - Aujourd'hui",
      status: "active",
      bio: `Raymond Lee "Ray" Luzier, né le 11 juin 1970 à Pittsburgh, Pennsylvanie, est le batteur officiel de Korn depuis 2007, après avoir remplacé David Silveria.

Technicien hors pair, Ray apporte une précision et une puissance nouvelles à la section rythmique de Korn. Formé au jazz et au rock progressif, il fusionne groove lourd et virtuosité, adaptant parfaitement son jeu à l'identité du groupe.

Avant Korn, Ray a joué avec David Lee Roth, Billy Sheehan et Army of Anyone. Il utilise principalement des batteries Tama et des cymbales Zildjian. Son approche allie brutalité metal et subtilité dynamique, stabilisant Korn après le départ de Silveria.`,
      birthDate: "11 juin 1970",
      instruments: ["Batterie", "Percussions"],
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: new Date().toISOString()
    },
    {
      id: "member-006",
      slug: "david-silveria",
      name: "David Silveria",
      role: "Batterie",
      period: "1993 - 2006",
      status: "former",
      bio: `David Randall Silveria, né le 21 septembre 1972 à San Leandro, Californie, est le batteur fondateur de Korn. Il crée la foundation rythmique originale du groupe de 1993 à 2006.

Son jeu énergique et agressif, marqué par des double-kicks puissants et des fills créatifs, définit le son des albums classiques de Korn (Korn, Life Is Peachy, Follow the Leader, Issues).

Silveria quitte Korn en 2006 suite à des tensions internes et divergences financières. Il tente brièvement un retour en 2013 mais les négociations échouent. Depuis, il se consacre à des projets personnels et reste une figure légendaire de l'histoire de Korn.`,
      birthDate: "21 septembre 1972",
      instruments: ["Batterie", "Percussions"],
      image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: new Date().toISOString()
    }
  ];

  for (const member of members) {
    await kv.set(`member:${member.id}`, member);
  }
  console.log(`✅ Created ${members.length} members`);

  // ============================================================================
  // SEED COMMENTS
  // ============================================================================

  const comments = [
    {
      id: "comment-001",
      content: "Trop hâte de les voir à Paris ! J'y serai 🤘",
      authorId: "user-001",
      entityType: "article",
      entityId: "article-001",
      parentId: null,
      isApproved: true,
      createdAt: "2026-03-10T11:30:00.000Z",
      updatedAt: new Date().toISOString()
    },
    {
      id: "comment-002",
      content: "Pareil ! On se fait un concert ensemble ?",
      authorId: "user-002",
      entityType: "article",
      entityId: "article-001",
      parentId: "comment-001",
      isApproved: true,
      createdAt: "2026-03-10T12:15:00.000Z",
      updatedAt: new Date().toISOString()
    },
    {
      id: "comment-003",
      content: "Excellente interview, très intéressant ce qu'il dit sur la direction artistique",
      authorId: "user-003",
      entityType: "article",
      entityId: "article-002",
      parentId: null,
      isApproved: true,
      createdAt: "2026-03-05T15:45:00.000Z",
      updatedAt: new Date().toISOString()
    },
    {
      id: "comment-004",
      content: "Issues est mon album préféré de tous les temps",
      authorId: "user-001",
      entityType: "article",
      entityId: "article-003",
      parentId: null,
      isApproved: true,
      createdAt: "2026-02-28T10:30:00.000Z",
      updatedAt: new Date().toISOString()
    },
    {
      id: "comment-005",
      content: "Contenu spam à supprimer!!!",
      authorId: "user-004",
      entityType: "article",
      entityId: "article-001",
      parentId: null,
      isApproved: false,
      createdAt: "2026-03-11T08:00:00.000Z",
      updatedAt: new Date().toISOString()
    }
  ];

  for (const comment of comments) {
    await kv.set(`comment:${comment.id}`, comment);
  }
  console.log(`✅ Created ${comments.length} comments`);

  console.log("🎉 Database seeding completed successfully!");
  
  return {
    users: testUsers.length + 1,
    albums: albums.length,
    articles: articles.length,
    concerts: concerts.length,
    singles: singles.length,
    members: members.length,
    comments: comments.length
  };
}