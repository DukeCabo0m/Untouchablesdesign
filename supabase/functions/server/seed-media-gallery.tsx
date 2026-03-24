// Seed data for Media Gallery
// Creates media items (videos, photos, audio)

import * as kv from "./kv_store.tsx";

export async function seedMediaGallery() {
  console.log("🌱 Seeding media gallery data...");

  // ============================================================================
  // MEDIA ITEMS
  // ============================================================================

  const mediaItems = [
    {
      id: "media-001",
      type: "video",
      title: "FREAK ON A LEASH",
      subtitle: "CLIP OFFICIEL • 1999",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1080&q=80",
      url: "https://www.youtube.com/watch?v=jRGrNDV2mKc",
      views: "47M",
      createdAt: "1999-02-25T00:00:00.000Z",
      updatedAt: new Date().toISOString()
    },
    {
      id: "media-002",
      type: "photo",
      title: "STUDIO SESSION",
      subtitle: "REQUIEM RECORDING • 2022",
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1080&q=80",
      url: null,
      views: "892K",
      createdAt: "2022-01-15T00:00:00.000Z",
      updatedAt: new Date().toISOString()
    },
    {
      id: "media-003",
      type: "audio",
      title: "BLIND",
      subtitle: "LIVE PARIS • 2019",
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1080&q=80",
      url: null,
      views: "2.1M",
      createdAt: "2019-07-20T00:00:00.000Z",
      updatedAt: new Date().toISOString()
    },
    {
      id: "media-004",
      type: "video",
      title: "FALLING AWAY FROM ME",
      subtitle: "REMASTERED • 2024",
      image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1080&q=80",
      url: "https://www.youtube.com/watch?v=2s3iGpDqQpQ",
      views: "12M",
      createdAt: "2024-11-10T00:00:00.000Z",
      updatedAt: new Date().toISOString()
    },
    {
      id: "media-005",
      type: "photo",
      title: "BACKSTAGE",
      subtitle: "HELLFEST • 2023",
      image: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=1080&q=80",
      url: null,
      views: "456K",
      createdAt: "2023-06-18T00:00:00.000Z",
      updatedAt: new Date().toISOString()
    },
    {
      id: "media-006",
      type: "video",
      title: "ROTTING IN VAIN",
      subtitle: "ACOUSTIC SESSION • 2026",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1080&q=80",
      url: null,
      views: "3.8M",
      createdAt: "2026-02-10T00:00:00.000Z",
      updatedAt: new Date().toISOString()
    },
    {
      id: "media-007",
      type: "video",
      title: "COMING UNDONE",
      subtitle: "OFFICIAL VIDEO • 2006",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1080&q=80",
      url: "https://www.youtube.com/watch?v=CSJXle3LP_Q",
      views: "38M",
      createdAt: "2006-04-12T00:00:00.000Z",
      updatedAt: new Date().toISOString()
    },
    {
      id: "media-008",
      type: "photo",
      title: "TOUR BUS CHRONICLES",
      subtitle: "EUROPEAN TOUR • 2025",
      image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=1080&q=80",
      url: null,
      views: "234K",
      createdAt: "2025-09-05T00:00:00.000Z",
      updatedAt: new Date().toISOString()
    },
    {
      id: "media-009",
      type: "video",
      title: "SOMEBODY SOMEONE",
      subtitle: "LIVE AT WOODSTOCK '99",
      image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1080&q=80",
      url: null,
      views: "15M",
      createdAt: "1999-07-25T00:00:00.000Z",
      updatedAt: new Date().toISOString()
    },
    {
      id: "media-010",
      type: "photo",
      title: "SOUNDCHECK",
      subtitle: "ACCOR ARENA PARIS • 2026",
      image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1080&q=80",
      url: null,
      views: "567K",
      createdAt: "2026-03-15T00:00:00.000Z",
      updatedAt: new Date().toISOString()
    },
    {
      id: "media-011",
      type: "audio",
      title: "HERE TO STAY",
      subtitle: "RADIO SESSION • 2002",
      image: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=1080&q=80",
      url: null,
      views: "8.9M",
      createdAt: "2002-05-20T00:00:00.000Z",
      updatedAt: new Date().toISOString()
    },
    {
      id: "media-012",
      type: "video",
      title: "TWISTED TRANSISTOR",
      subtitle: "BEHIND THE SCENES • 2005",
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1080&q=80",
      url: null,
      views: "22M",
      createdAt: "2005-09-13T00:00:00.000Z",
      updatedAt: new Date().toISOString()
    }
  ];

  for (const media of mediaItems) {
    await kv.set(`media-item:${media.id}`, media);
  }

  console.log(`✅ Created ${mediaItems.length} media items`);
  console.log("✅ Media gallery seeding completed successfully!");

  return {
    total: mediaItems.length,
    videos: mediaItems.filter(m => m.type === 'video').length,
    photos: mediaItems.filter(m => m.type === 'photo').length,
    audio: mediaItems.filter(m => m.type === 'audio').length
  };
}
