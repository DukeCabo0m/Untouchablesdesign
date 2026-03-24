import * as kv from "./kv_store.tsx";

/**
 * Seed fanzine data
 */
export async function seedFanzines() {
  console.log("📚 Seeding fanzines...");

  const fanzines = [
    {
      id: crypto.randomUUID(),
      issueNumber: 1,
      title: 'KORN 2026 : REWIND',
      subtitle: 'Le retour aux sources',
      coverImage: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&q=80',
      publicationDate: '2026-04-01T00:00:00.000Z',
      description: 'Pourquoi le groupe retourne à l\'enregistrement sur bande.',
      pages: 12,
      pdfUrl: null,
      status: 'published',
      featured: true,
      contentPreview: [
        'Interview exclusive : Jonathan Davis sur le processus créatif',
        'Dossier technique : L\'enregistrement analogique en 2026',
        'Galerie photos : Backstage session studio',
        'Chronique : Les 10 meilleurs morceaux deep cuts de Korn',
      ],
      contributors: ['RedactionUntouchables', 'DarkPhotoStudio', 'KornArchives'],
      price: null,
      isPublic: true,
      createdAt: new Date('2026-03-15').toISOString(),
      publishedAt: new Date('2026-04-01').toISOString(),
    },
    {
      id: crypto.randomUUID(),
      issueNumber: 2,
      title: 'LEGACY & HERITAGE',
      subtitle: '30 ans de nu-metal',
      coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
      publicationDate: '2026-05-01T00:00:00.000Z',
      description: 'Retour sur trois décennies de révolution musicale.',
      pages: 16,
      pdfUrl: null,
      status: 'published',
      featured: false,
      contentPreview: [
        'Rétrospective : 1994-2024, l\'histoire complète',
        'Timeline : Les albums qui ont marqué l\'histoire',
        'Témoignages : Les fans de la première heure racontent',
        'Analyse : L\'influence de Korn sur le metal moderne',
      ],
      contributors: ['RedactionUntouchables', 'HistoryArchives', 'FanTestimonies'],
      price: null,
      isPublic: true,
      createdAt: new Date('2026-04-10').toISOString(),
      publishedAt: new Date('2026-05-01').toISOString(),
    },
    {
      id: crypto.randomUUID(),
      issueNumber: 3,
      title: 'LIVE EXPERIENCE 2026',
      subtitle: 'Sur la route avec Korn',
      coverImage: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80',
      description: 'Immersion totale dans la tournée européenne.',
      pages: 20,
      pdfUrl: null,
      status: 'draft',
      featured: false,
      contentPreview: [
        'Reportage : 48h dans le tour bus',
        'Coulisses : La préparation d\'un show',
        'Interviews : L\'équipe technique parle',
        'Photo-essay : Les plus beaux moments de la tournée',
      ],
      contributors: ['RedactionUntouchables', 'TourPhotographer', 'CrewMembers'],
      price: null,
      isPublic: true,
      createdAt: new Date('2026-05-15').toISOString(),
      publishedAt: null,
    },
  ];

  for (const fanzine of fanzines) {
    await kv.set(`fanzine:${fanzine.id}`, fanzine);
  }

  console.log(`✅ ${fanzines.length} fanzines seeded`);
}
