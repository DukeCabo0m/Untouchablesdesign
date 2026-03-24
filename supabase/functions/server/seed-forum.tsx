// Seed data for Forum
// Creates forum categories, topics, and replies

import * as kv from "./kv_store.tsx";

export async function seedForum() {
  console.log("🌱 Seeding forum data...");

  // ============================================================================
  // FORUM CATEGORIES
  // ============================================================================

  const categories = [
    {
      id: "cat-001",
      title: "DISCUSSIONS GÉNÉRALES",
      description: "Parlez de tout ce qui concerne Korn",
      icon: "message-square",
      order: 1,
      topics: 1248,
      posts: 15632,
      lastPost: {
        title: "Votre morceau préféré de \"Requiem\" ?",
        author: "KoRnHead_89",
        authorId: "user-001",
        time: "5 min",
        topicId: "topic-001"
      },
      createdAt: "2024-01-01T00:00:00.000Z"
    },
    {
      id: "cat-002",
      title: "ANALYSES & THÉORIES",
      description: "Décryptage des paroles et significations",
      icon: "book-open",
      order: 2,
      topics: 427,
      posts: 8941,
      lastPost: {
        title: "Le symbolisme derrière \"Freak on a Leash\"",
        author: "TheoryMaster",
        authorId: "user-002",
        time: "23 min",
        topicId: "topic-005"
      },
      createdAt: "2024-01-01T00:00:00.000Z"
    },
    {
      id: "cat-003",
      title: "CONCERTS & ÉVÉNEMENTS",
      description: "Partagez vos expériences live",
      icon: "calendar",
      order: 3,
      topics: 892,
      posts: 12074,
      lastPost: {
        title: "Paris 2026 - Qui sera présent ?",
        author: "LiveMusic_Fr",
        authorId: "user-003",
        time: "1h",
        topicId: "topic-008"
      },
      createdAt: "2024-01-01T00:00:00.000Z"
    },
    {
      id: "cat-004",
      title: "CRÉATIONS COMMUNAUTAIRES",
      description: "Partagez vos covers, artworks, etc.",
      icon: "image",
      order: 4,
      topics: 634,
      posts: 7523,
      lastPost: {
        title: "Ma cover de \"Blind\" (guitare)",
        author: "RiffMaster",
        authorId: "user-004",
        time: "2h",
        topicId: "topic-012"
      },
      createdAt: "2024-01-01T00:00:00.000Z"
    }
  ];

  for (const category of categories) {
    await kv.set(`forum-category:${category.id}`, category);
  }

  console.log(`✅ Created ${categories.length} forum categories`);

  // ============================================================================
  // FORUM TOPICS
  // ============================================================================

  const topics = [
    {
      id: "topic-001",
      categoryId: "cat-001",
      title: "Votre morceau préféré de \"Requiem\" ?",
      content: "Personnellement j'adore \"Start the Healing\". Le riff d'intro est juste énorme ! Et vous ?",
      authorId: "user-001",
      author: "KoRnHead_89",
      views: 892,
      replies: 47,
      isPinned: false,
      isLocked: false,
      createdAt: "2026-03-24T10:00:00.000Z",
      lastActivityAt: "2026-03-24T15:35:00.000Z"
    },
    {
      id: "topic-002",
      categoryId: "cat-001",
      title: "Classement : Tous les albums de Korn du pire au meilleur",
      content: "Après des années d'écoute, voici mon classement personnel. Lancez le débat !",
      authorId: "user-002",
      author: "MetalKing92",
      views: 3421,
      replies: 156,
      isPinned: true,
      isLocked: false,
      createdAt: "2026-03-23T14:20:00.000Z",
      lastActivityAt: "2026-03-24T14:45:00.000Z"
    },
    {
      id: "topic-003",
      categoryId: "cat-003",
      title: "Recherche personnes pour covoiturage concert Paris",
      content: "Je pars de Lyon le 15 juillet. J'ai 3 places dispo dans ma voiture. Intéressés ?",
      authorId: "user-003",
      author: "LiveMusic_Fr",
      views: 445,
      replies: 23,
      isPinned: false,
      isLocked: false,
      createdAt: "2026-03-24T09:15:00.000Z",
      lastActivityAt: "2026-03-24T14:20:00.000Z"
    },
    {
      id: "topic-004",
      categoryId: "cat-001",
      title: "Discussion : L'influence de Korn sur le nu-metal moderne",
      content: "Je pense que sans Korn, le nu-metal n'aurait jamais existé. Qu'en pensez-vous ?",
      authorId: "user-004",
      author: "NuMetalFan",
      views: 1876,
      replies: 89,
      isPinned: false,
      isLocked: false,
      createdAt: "2026-03-23T16:40:00.000Z",
      lastActivityAt: "2026-03-24T11:15:00.000Z"
    },
    {
      id: "topic-005",
      categoryId: "cat-002",
      title: "Le symbolisme derrière \"Freak on a Leash\"",
      content: "Le clip vidéo et les paroles sont pleins de symbolisme. Voici mon interprétation...",
      authorId: "user-002",
      author: "TheoryMaster",
      views: 2134,
      replies: 67,
      isPinned: false,
      isLocked: false,
      createdAt: "2026-03-24T08:30:00.000Z",
      lastActivityAt: "2026-03-24T14:55:00.000Z"
    },
    {
      id: "topic-006",
      categoryId: "cat-002",
      title: "Analyse lyrique : \"Daddy\" - Un témoignage bouleversant",
      content: "Ce morceau est l'un des plus personnels et difficiles de Jonathan Davis. Parlons-en avec respect.",
      authorId: "user-005",
      author: "DeepListener",
      views: 3892,
      replies: 124,
      isPinned: true,
      isLocked: false,
      createdAt: "2026-03-22T11:00:00.000Z",
      lastActivityAt: "2026-03-24T13:25:00.000Z"
    },
    {
      id: "topic-007",
      categoryId: "cat-003",
      title: "Hellfest 2025 - Retour d'expérience",
      content: "J'y étais ! Voici mon compte-rendu complet de leur set au Hellfest.",
      authorId: "user-006",
      author: "FestivalGoer",
      views: 5621,
      replies: 213,
      isPinned: false,
      isLocked: false,
      createdAt: "2025-08-12T20:00:00.000Z",
      lastActivityAt: "2026-03-24T10:40:00.000Z"
    },
    {
      id: "topic-008",
      categoryId: "cat-003",
      title: "Paris 2026 - Qui sera présent ?",
      content: "Le concert approche ! Qui a déjà ses billets ?",
      authorId: "user-003",
      author: "LiveMusic_Fr",
      views: 1247,
      replies: 78,
      isPinned: false,
      isLocked: false,
      createdAt: "2026-03-24T07:00:00.000Z",
      lastActivityAt: "2026-03-24T14:00:00.000Z"
    },
    {
      id: "topic-009",
      categoryId: "cat-004",
      title: "Ma cover de \"Blind\" (guitare)",
      content: "Après des mois de pratique, voici ma version de Blind ! Feedbacks bienvenus.",
      authorId: "user-004",
      author: "RiffMaster",
      views: 892,
      replies: 34,
      isPinned: false,
      isLocked: false,
      createdAt: "2026-03-24T06:20:00.000Z",
      lastActivityAt: "2026-03-24T12:45:00.000Z"
    },
    {
      id: "topic-010",
      categoryId: "cat-004",
      title: "Fan art : Série d'illustrations \"Issues\"",
      content: "J'ai créé une série de 10 illustrations inspirées de l'album Issues. Qu'en pensez-vous ?",
      authorId: "user-007",
      author: "ArtistKorn",
      views: 1456,
      replies: 52,
      isPinned: false,
      isLocked: false,
      createdAt: "2026-03-23T19:30:00.000Z",
      lastActivityAt: "2026-03-24T11:20:00.000Z"
    }
  ];

  for (const topic of topics) {
    await kv.set(`forum-topic:${topic.id}`, topic);
  }

  console.log(`✅ Created ${topics.length} forum topics`);

  // ============================================================================
  // FORUM REPLIES (Sample)
  // ============================================================================

  const replies = [
    {
      id: "reply-001",
      topicId: "topic-001",
      content: "\"Lost in the Grandeur\" pour moi ! L'atmosphère est incroyable.",
      authorId: "user-002",
      author: "MetalKing92",
      createdAt: "2026-03-24T10:15:00.000Z"
    },
    {
      id: "reply-002",
      topicId: "topic-001",
      content: "Difficile de choisir mais \"Forgotten\" me touche particulièrement.",
      authorId: "user-003",
      author: "LiveMusic_Fr",
      createdAt: "2026-03-24T10:30:00.000Z"
    },
    {
      id: "reply-003",
      topicId: "topic-002",
      content: "1. Issues\n2. Follow the Leader\n3. Korn (1994)\n4. Untouchables\n5. The Nothing\n\nVoilà mon top 5 !",
      authorId: "user-001",
      author: "KoRnHead_89",
      createdAt: "2026-03-23T15:00:00.000Z"
    },
    {
      id: "reply-004",
      topicId: "topic-003",
      content: "Intéressé ! Je te MP pour les détails.",
      authorId: "user-005",
      author: "DeepListener",
      createdAt: "2026-03-24T09:30:00.000Z"
    },
    {
      id: "reply-005",
      topicId: "topic-004",
      content: "Totalement d'accord. Korn a littéralement créé le genre en fusionnant metal, hip-hop et rock alternatif.",
      authorId: "user-006",
      author: "FestivalGoer",
      createdAt: "2026-03-23T17:00:00.000Z"
    }
  ];

  for (const reply of replies) {
    await kv.set(`forum-reply:${reply.id}`, reply);
  }

  console.log(`✅ Created ${replies.length} forum replies`);

  console.log("✅ Forum seeding completed successfully!");

  return {
    categories: categories.length,
    topics: topics.length,
    replies: replies.length
  };
}
