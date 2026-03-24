import * as kv from "./kv_store.tsx";

/**
 * Seed media data for widgets
 * This populates default data for:
 * - Latest video (YouTube)
 * - Shorts/Reels (TikTok/YouTube)
 * - Instagram posts
 */
export async function seedMediaData() {
  console.log("🎬 Seeding media data...");

  // ============================================================================
  // 1. LATEST VIDEO (YouTube)
  // ============================================================================
  const latestVideo = {
    id: 'latest',
    title: 'Korn - New Single "Worse" Official Music Video',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
    views: '2.4M',
    duration: '3:42',
    url: 'https://www.youtube.com/@UntouchablesFR',
    updatedAt: new Date().toISOString(),
  };

  await kv.set("media:latest-video", latestVideo);
  console.log("✅ Latest video seeded");

  // ============================================================================
  // 2. SHORTS/REELS (TikTok/YouTube Shorts)
  // ============================================================================
  const shorts = [
    {
      id: 'short-1',
      thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=80',
      title: 'Behind the Scenes',
      views: '845K',
      duration: '0:24',
      url: 'https://www.tiktok.com/@untouchables.fr',
    },
    {
      id: 'short-2',
      thumbnail: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&q=80',
      title: 'Vocal Warm-up',
      views: '1.2M',
      duration: '0:18',
      url: 'https://www.tiktok.com/@untouchables.fr',
    },
    {
      id: 'short-3',
      thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80',
      title: 'Bass Breakdown',
      views: '654K',
      duration: '0:31',
      url: 'https://www.youtube.com/@UntouchablesFR',
    },
    {
      id: 'short-4',
      thumbnail: 'https://images.unsplash.com/photo-1690013429722-87852aae164b?w=400&q=80',
      title: 'Stage Setup',
      views: '923K',
      duration: '0:45',
      url: 'https://www.youtube.com/@UntouchablesFR',
    },
  ];

  await kv.set("media:shorts", shorts);
  console.log("✅ Shorts seeded");

  // ============================================================================
  // 3. INSTAGRAM POSTS
  // ============================================================================
  const instagramPosts = [
    {
      id: 'ig-1',
      image: 'https://images.unsplash.com/photo-1747003869273-9fc7ad373137?w=400&q=80',
      likes: 45620,
      comments: 234,
      url: 'https://www.instagram.com/untouchables.fr/',
    },
    {
      id: 'ig-2',
      image: 'https://images.unsplash.com/photo-1552595458-e8ad6af8aa10?w=400&q=80',
      likes: 38950,
      comments: 189,
      url: 'https://www.instagram.com/untouchables.fr/',
    },
    {
      id: 'ig-3',
      image: 'https://images.unsplash.com/photo-1694024561275-c91acabb05ce?w=400&q=80',
      likes: 52100,
      comments: 312,
      url: 'https://www.instagram.com/untouchables.fr/',
    },
    {
      id: 'ig-4',
      image: 'https://images.unsplash.com/photo-1608660890457-e985951f07d2?w=400&q=80',
      likes: 41830,
      comments: 276,
      url: 'https://www.instagram.com/untouchables.fr/',
    },
  ];

  await kv.set("media:instagram", instagramPosts);
  console.log("✅ Instagram posts seeded");

  console.log("🎉 Media data seeding complete!");
}
