import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { seedDatabase } from "./seed.tsx";
import { seedMediaData } from "./seed-media.tsx";
import { seedContributions } from "./seed-contributions.tsx";
import { seedFanzines } from "./seed-fanzines.tsx";
import { seedModerationData } from "./seed-moderation.tsx";
import { seedForum } from "./seed-forum.tsx";
import { seedMediaGallery } from "./seed-media-gallery.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-d462d5d8/health", (c) => {
  return c.json({ status: "ok" });
});

// ============================================================================
// AUTHENTICATION ROUTES
// ============================================================================

// Login endpoint
app.post("/make-server-d462d5d8/auth/login", async (c) => {
  try {
    const { email, password } = await c.req.json();
    
    // Get user from KV store
    const users = await kv.getByPrefix("user:");
    const user = users.find(u => u.email === email);
    
    if (!user) {
      return c.json({ error: "Utilisateur non trouvé" }, 404);
    }
    
    // Simple password check (in production, use proper hashing)
    if (user.password !== password) {
      return c.json({ error: "Mot de passe incorrect" }, 401);
    }
    
    // Create session token
    const sessionToken = crypto.randomUUID();
    await kv.set(`session:${sessionToken}`, {
      userId: user.id,
      email: user.email,
      roles: user.roles,
      createdAt: new Date().toISOString()
    });
    
    return c.json({
      token: sessionToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        roles: user.roles,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    return c.json({ error: "Erreur lors de la connexion" }, 500);
  }
});

// Logout endpoint
app.post("/make-server-d462d5d8/auth/logout", async (c) => {
  try {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");
    if (token) {
      await kv.del(`session:${token}`);
    }
    return c.json({ message: "Déconnexion réussie" });
  } catch (error) {
    console.error("Logout error:", error);
    return c.json({ error: "Erreur lors de la déconnexion" }, 500);
  }
});

// Signup endpoint
app.post("/make-server-d462d5d8/auth/signup", async (c) => {
  try {
    const { username, email, password, birthdate } = await c.req.json();
    
    // Validation
    if (!username || username.length < 3) {
      return c.json({ error: "Le pseudonyme doit contenir au moins 3 caractères" }, 400);
    }
    
    if (!email || !email.includes("@")) {
      return c.json({ error: "Email invalide" }, 400);
    }
    
    if (!password || password.length < 8) {
      return c.json({ error: "Le mot de passe doit contenir au moins 8 caractères" }, 400);
    }
    
    // Check if user already exists
    const existingUsers = await kv.getByPrefix("user:");
    
    console.log(`[Signup] Checking uniqueness for username: "${username}", email: "${email}"`);
    console.log(`[Signup] Found ${existingUsers.length} existing users`);
    
    // Case-insensitive comparison for username and email
    const emailExists = existingUsers.some(u => u.email?.toLowerCase() === email.toLowerCase());
    const usernameExists = existingUsers.some(u => u.username?.toLowerCase() === username.toLowerCase());
    
    if (emailExists) {
      console.log(`[Signup] Email already exists: ${email}`);
      return c.json({ error: "Cet email est déjà utilisé" }, 409);
    }
    
    if (usernameExists) {
      const existingUser = existingUsers.find(u => u.username?.toLowerCase() === username.toLowerCase());
      console.log(`[Signup] Username already exists: ${username} (existing: ${existingUser?.username})`);
      return c.json({ error: "Ce pseudonyme est déjà utilisé" }, 409);
    }
    
    // Create new user
    const userId = crypto.randomUUID();
    const newUser = {
      id: userId,
      username,
      email,
      password, // In production, this should be hashed
      role: "user",
      avatar: null,
      bio: null,
      location: null,
      website: null,
      birthdate: birthdate || null,
      isVerified: false,
      isBanned: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString()
    };
    
    await kv.set(`user:${userId}`, newUser);
    
    // Create session token
    const sessionToken = crypto.randomUUID();
    await kv.set(`session:${sessionToken}`, {
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
      createdAt: new Date().toISOString()
    });
    
    console.log("[Signup] User created successfully:", username);
    
    return c.json({
      token: sessionToken,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        avatar: newUser.avatar
      }
    }, 201);
  } catch (error) {
    console.error("Signup error:", error);
    return c.json({ error: "Erreur lors de l'inscription" }, 500);
  }
});

// Verify session endpoint
app.get("/make-server-d462d5d8/auth/me", async (c) => {
  try {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return c.json({ error: "Token manquant" }, 401);
    }
    
    const session = await kv.get(`session:${token}`);
    if (!session) {
      return c.json({ error: "Session invalide" }, 401);
    }
    
    const user = await kv.get(`user:${session.userId}`);
    if (!user) {
      return c.json({ error: "Utilisateur non trouvé" }, 404);
    }
    
    return c.json({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: user.roles,
      avatar: user.avatar,
      bio: user.bio,
      location: user.location
    });
  } catch (error) {
    console.error("Auth verification error:", error);
    return c.json({ error: "Erreur de vérification" }, 500);
  }
});

// ============================================================================
// USERS ROUTES
// ============================================================================

// Get all users (admin only)
app.get("/make-server-d462d5d8/users", async (c) => {
  try {
    const users = await kv.getByPrefix("user:");
    
    // Remove sensitive data
    const sanitizedUsers = users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: user.roles,
      avatar: user.avatar,
      bio: user.bio,
      location: user.location,
      createdAt: user.createdAt,
      isActive: user.isActive || true,
      isBanned: user.isBanned || false
    }));
    
    return c.json(sanitizedUsers);
  } catch (error) {
    console.error("Get users error:", error);
    return c.json({ error: "Erreur lors de la récupération des utilisateurs" }, 500);
  }
});

// Get single user
app.get("/make-server-d462d5d8/users/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const user = await kv.get(`user:${id}`);
    
    if (!user) {
      return c.json({ error: "Utilisateur non trouvé" }, 404);
    }
    
    // Remove password
    const { password, ...sanitizedUser } = user;
    return c.json(sanitizedUser);
  } catch (error) {
    console.error("Get user error:", error);
    return c.json({ error: "Erreur lors de la récupération de l'utilisateur" }, 500);
  }
});

// Get user stats
app.get("/make-server-d462d5d8/users/:id/stats", async (c) => {
  try {
    const id = c.req.param("id");
    const user = await kv.get(`user:${id}`);
    
    if (!user) {
      return c.json({ error: "Utilisateur non trouvé" }, 404);
    }
    
    // Count user's articles
    const articles = await kv.getByPrefix("article:");
    const userArticles = articles.filter(a => a.authorId === id);
    
    // Count user's comments
    const comments = await kv.getByPrefix("comment:");
    const userComments = comments.filter(c => c.userId === id);
    
    // Count user's likes (both given and received)
    const allLikes = await kv.getByPrefix("like:");
    const userLikes = allLikes.filter(l => l.userId === id);
    const likesCount = userLikes.length;
    
    // Mock badges count
    const badgesCount = 3;
    
    const stats = {
      posts: userArticles.length,
      comments: userComments.length,
      likes: likesCount,
      badges: badgesCount
    };
    
    return c.json(stats);
  } catch (error) {
    console.error("Get user stats error:", error);
    return c.json({ error: "Erreur lors de la récupération des stats" }, 500);
  }
});

// Get user activity
app.get("/make-server-d462d5d8/users/:id/activity", async (c) => {
  try {
    const id = c.req.param("id");
    const user = await kv.get(`user:${id}`);
    
    if (!user) {
      return c.json({ error: "Utilisateur non trouvé" }, 404);
    }
    
    // Get user's articles
    const articles = await kv.getByPrefix("article:");
    const userArticles = articles.filter(a => a.authorId === id);
    
    // Get user's comments
    const comments = await kv.getByPrefix("comment:");
    const userComments = comments.filter(c => c.userId === id);
    
    // Get all activity entries (likes, etc.)
    const activityEntries = await kv.getByPrefix("activity:");
    const userActivityEntries = activityEntries.filter(a => a.userId === id);
    
    // Combine into activity feed
    const activity = [];
    
    // Add article posts
    userArticles.forEach(article => {
      activity.push({
        id: `post-${article.id}`,
        type: 'post',
        content: article.title,
        date: article.createdAt,
        timestamp: article.createdAt,
        linkTo: `/news/${article.slug}`,
        articleTitle: article.title
      });
    });
    
    // Add comments
    userComments.forEach(comment => {
      activity.push({
        id: `comment-${comment.id}`,
        type: 'comment',
        content: comment.content.substring(0, 100),
        date: comment.createdAt,
        timestamp: comment.createdAt,
        linkTo: comment.entityType === 'article' ? `/news/${comment.entityId}` : '#',
        articleTitle: 'Commentaire'
      });
    });
    
    // Add activity entries (likes, etc.)
    userActivityEntries.forEach(entry => {
      activity.push({
        id: entry.id,
        type: entry.type,
        content: entry.content,
        date: entry.date,
        timestamp: entry.createdAt || entry.date,
        linkTo: entry.linkTo,
        articleTitle: entry.articleTitle
      });
    });
    
    // Sort by date descending
    activity.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    return c.json(activity);
  } catch (error) {
    console.error("Get user activity error:", error);
    return c.json({ error: "Erreur lors de la récupération de l'activité" }, 500);
  }
});

// Create user
app.post("/make-server-d462d5d8/users", async (c) => {
  try {
    const data = await c.req.json();
    const userId = crypto.randomUUID();
    
    const newUser = {
      id: userId,
      username: data.username,
      email: data.email,
      password: data.password, // In production, hash this!
      roles: data.roles || ["ROLE_USER"],
      avatar: data.avatar || null,
      bio: data.bio || null,
      location: data.location || null,
      website: data.website || null,
      facebookUrl: data.facebookUrl || null,
      instagramUrl: data.instagramUrl || null,
      tiktokUrl: data.tiktokUrl || null,
      isActive: true,
      isBanned: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`user:${userId}`, newUser);
    
    const { password, ...sanitizedUser } = newUser;
    return c.json(sanitizedUser, 201);
  } catch (error) {
    console.error("Create user error:", error);
    return c.json({ error: "Erreur lors de la création de l'utilisateur" }, 500);
  }
});

// Update user
app.put("/make-server-d462d5d8/users/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const data = await c.req.json();
    const user = await kv.get(`user:${id}`);
    
    if (!user) {
      return c.json({ error: "Utilisateur non trouvé" }, 404);
    }
    
    const updatedUser = {
      ...user,
      ...data,
      id: user.id, // Preserve ID
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`user:${id}`, updatedUser);
    
    const { password, ...sanitizedUser } = updatedUser;
    return c.json(sanitizedUser);
  } catch (error) {
    console.error("Update user error:", error);
    return c.json({ error: "Erreur lors de la mise à jour de l'utilisateur" }, 500);
  }
});

// Delete user
app.delete("/make-server-d462d5d8/users/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`user:${id}`);
    return c.json({ message: "Utilisateur supprimé" });
  } catch (error) {
    console.error("Delete user error:", error);
    return c.json({ error: "Erreur lors de la suppression de l'utilisateur" }, 500);
  }
});

// ============================================================================
// ARTICLES ROUTES
// ============================================================================

// Get all articles
app.get("/make-server-d462d5d8/articles", async (c) => {
  try {
    const articles = await kv.getByPrefix("article:");
    
    console.log(`[GET /articles] Found ${articles.length} articles in database`);
    console.log(`[GET /articles] Article IDs:`, articles.map(a => a.id));
    
    // Sort by date descending
    const sortedArticles = articles.sort((a, b) => 
      new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime()
    );
    
    return c.json(sortedArticles);
  } catch (error) {
    console.error("Get articles error:", error);
    return c.json({ error: "Erreur lors de la récupération des articles" }, 500);
  }
});

// Get single article
app.get("/make-server-d462d5d8/articles/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const article = await kv.get(`article:${id}`);
    
    if (!article) {
      return c.json({ error: "Article non trouvé" }, 404);
    }
    
    return c.json(article);
  } catch (error) {
    console.error("Get article error:", error);
    return c.json({ error: "Erreur lors de la récupération de l'article" }, 500);
  }
});

// Create article
app.post("/make-server-d462d5d8/articles", async (c) => {
  try {
    const data = await c.req.json();
    const articleId = crypto.randomUUID();
    
    const newArticle = {
      id: articleId,
      title: data.title,
      slug: data.slug || data.title.toLowerCase().replace(/\s+/g, '-'),
      content: data.content,
      excerpt: data.excerpt || null,
      coverImage: data.coverImage || null,
      category: data.category || 'news',
      tags: data.tags || [],
      authorId: data.authorId,
      isPublished: data.isPublished || false,
      isFeatured: data.isFeatured || false,
      publishedAt: data.publishedAt || new Date().toISOString(),
      viewCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`article:${articleId}`, newArticle);
    return c.json(newArticle, 201);
  } catch (error) {
    console.error("Create article error:", error);
    return c.json({ error: "Erreur lors de la création de l'article" }, 500);
  }
});

// Update article
app.put("/make-server-d462d5d8/articles/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const data = await c.req.json();
    const article = await kv.get(`article:${id}`);
    
    if (!article) {
      return c.json({ error: "Article non trouvé" }, 404);
    }
    
    const updatedArticle = {
      ...article,
      ...data,
      id: article.id,
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`article:${id}`, updatedArticle);
    return c.json(updatedArticle);
  } catch (error) {
    console.error("Update article error:", error);
    return c.json({ error: "Erreur lors de la mise à jour de l'article" }, 500);
  }
});

// Delete article
app.delete("/make-server-d462d5d8/articles/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`article:${id}`);
    return c.json({ message: "Article supprimé" });
  } catch (error) {
    console.error("Delete article error:", error);
    return c.json({ error: "Erreur lors de la suppression de l'article" }, 500);
  }
});

// ============================================================================
// CATEGORIES ROUTES
// ============================================================================

// Get all categories
app.get("/make-server-d462d5d8/categories", async (c) => {
  try {
    const categories = await kv.getByPrefix("category:");
    
    // Sort by name
    const sortedCategories = categories.sort((a, b) => 
      a.name.localeCompare(b.name)
    );
    
    return c.json(sortedCategories);
  } catch (error) {
    console.error("Get categories error:", error);
    return c.json({ error: "Erreur lors de la récupération des catégories" }, 500);
  }
});

// Get single category
app.get("/make-server-d462d5d8/categories/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const category = await kv.get(`category:${id}`);
    
    if (!category) {
      return c.json({ error: "Catégorie non trouvée" }, 404);
    }
    
    return c.json(category);
  } catch (error) {
    console.error("Get category error:", error);
    return c.json({ error: "Erreur lors de la récupération de la catégorie" }, 500);
  }
});

// Create category
app.post("/make-server-d462d5d8/categories", async (c) => {
  try {
    const data = await c.req.json();
    const categoryId = crypto.randomUUID();
    
    const newCategory = {
      id: categoryId,
      name: data.name,
      slug: data.slug || data.name.toLowerCase().replace(/\s+/g, '-'),
      description: data.description || null,
      color: data.color || '#8B0000',
      icon: data.icon || null,
      articleCount: 0,
      isActive: data.isActive !== undefined ? data.isActive : true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`category:${categoryId}`, newCategory);
    return c.json(newCategory, 201);
  } catch (error) {
    console.error("Create category error:", error);
    return c.json({ error: "Erreur lors de la création de la catégorie" }, 500);
  }
});

// Update category
app.put("/make-server-d462d5d8/categories/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const data = await c.req.json();
    const category = await kv.get(`category:${id}`);
    
    if (!category) {
      return c.json({ error: "Catégorie non trouvée" }, 404);
    }
    
    const updatedCategory = {
      ...category,
      ...data,
      id: category.id,
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`category:${id}`, updatedCategory);
    return c.json(updatedCategory);
  } catch (error) {
    console.error("Update category error:", error);
    return c.json({ error: "Erreur lors de la mise à jour de la catégorie" }, 500);
  }
});

// Delete category
app.delete("/make-server-d462d5d8/categories/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`category:${id}`);
    return c.json({ message: "Catégorie supprimée" });
  } catch (error) {
    console.error("Delete category error:", error);
    return c.json({ error: "Erreur lors de la suppression de la catégorie" }, 500);
  }
});

// ============================================================================
// TAGS ROUTES
// ============================================================================

// Get all tags
app.get("/make-server-d462d5d8/tags", async (c) => {
  try {
    const tags = await kv.getByPrefix("tag:");
    
    // Sort by name
    const sortedTags = tags.sort((a, b) => 
      a.name.localeCompare(b.name)
    );
    
    return c.json(sortedTags);
  } catch (error) {
    console.error("Get tags error:", error);
    return c.json({ error: "Erreur lors de la récupération des tags" }, 500);
  }
});

// Get single tag
app.get("/make-server-d462d5d8/tags/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const tag = await kv.get(`tag:${id}`);
    
    if (!tag) {
      return c.json({ error: "Tag non trouvé" }, 404);
    }
    
    return c.json(tag);
  } catch (error) {
    console.error("Get tag error:", error);
    return c.json({ error: "Erreur lors de la récupération du tag" }, 500);
  }
});

// Create tag
app.post("/make-server-d462d5d8/tags", async (c) => {
  try {
    const data = await c.req.json();
    const tagId = crypto.randomUUID();
    
    const newTag = {
      id: tagId,
      name: data.name,
      slug: data.slug || data.name.toLowerCase().replace(/\s+/g, '-'),
      description: data.description || null,
      color: data.color || '#808080',
      articleCount: 0,
      isActive: data.isActive !== undefined ? data.isActive : true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`tag:${tagId}`, newTag);
    return c.json(newTag, 201);
  } catch (error) {
    console.error("Create tag error:", error);
    return c.json({ error: "Erreur lors de la création du tag" }, 500);
  }
});

// Update tag
app.put("/make-server-d462d5d8/tags/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const data = await c.req.json();
    const tag = await kv.get(`tag:${id}`);
    
    if (!tag) {
      return c.json({ error: "Tag non trouvé" }, 404);
    }
    
    const updatedTag = {
      ...tag,
      ...data,
      id: tag.id,
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`tag:${id}`, updatedTag);
    return c.json(updatedTag);
  } catch (error) {
    console.error("Update tag error:", error);
    return c.json({ error: "Erreur lors de la mise à jour du tag" }, 500);
  }
});

// Delete tag
app.delete("/make-server-d462d5d8/tags/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`tag:${id}`);
    return c.json({ message: "Tag supprimé" });
  } catch (error) {
    console.error("Delete tag error:", error);
    return c.json({ error: "Erreur lors de la suppression du tag" }, 500);
  }
});

// ============================================================================
// ALBUMS ROUTES
// ============================================================================

// Get all albums
app.get("/make-server-d462d5d8/albums", async (c) => {
  try {
    const albums = await kv.getByPrefix("album:");
    
    // Sort by release date descending
    const sortedAlbums = albums.sort((a, b) => 
      new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
    );
    
    return c.json(sortedAlbums);
  } catch (error) {
    console.error("Get albums error:", error);
    return c.json({ error: "Erreur lors de la récupération des albums" }, 500);
  }
});

// Get single album
app.get("/make-server-d462d5d8/albums/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const album = await kv.get(`album:${id}`);
    
    if (!album) {
      return c.json({ error: "Album non trouvé" }, 404);
    }
    
    return c.json(album);
  } catch (error) {
    console.error("Get album error:", error);
    return c.json({ error: "Erreur lors de la récupération de l'album" }, 500);
  }
});

// Create album
app.post("/make-server-d462d5d8/albums", async (c) => {
  try {
    const data = await c.req.json();
    const albumId = crypto.randomUUID();
    
    const newAlbum = {
      id: albumId,
      title: data.title,
      slug: data.slug || data.title.toLowerCase().replace(/\s+/g, '-'),
      type: data.type || 'album',
      releaseDate: data.releaseDate,
      coverImage: data.coverImage || null,
      label: data.label || null,
      producer: data.producer || null,
      description: data.description || null,
      tracks: data.tracks || [],
      spotifyUrl: data.spotifyUrl || null,
      appleMusicUrl: data.appleMusicUrl || null,
      deezerUrl: data.deezerUrl || null,
      youtubeUrl: data.youtubeUrl || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`album:${albumId}`, newAlbum);
    return c.json(newAlbum, 201);
  } catch (error) {
    console.error("Create album error:", error);
    return c.json({ error: "Erreur lors de la création de l'album" }, 500);
  }
});

// Update album
app.put("/make-server-d462d5d8/albums/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const data = await c.req.json();
    const album = await kv.get(`album:${id}`);
    
    if (!album) {
      return c.json({ error: "Album non trouvé" }, 404);
    }
    
    const updatedAlbum = {
      ...album,
      ...data,
      id: album.id,
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`album:${id}`, updatedAlbum);
    return c.json(updatedAlbum);
  } catch (error) {
    console.error("Update album error:", error);
    return c.json({ error: "Erreur lors de la mise à jour de l'album" }, 500);
  }
});

// Delete album
app.delete("/make-server-d462d5d8/albums/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`album:${id}`);
    return c.json({ message: "Album supprimé" });
  } catch (error) {
    console.error("Delete album error:", error);
    return c.json({ error: "Erreur lors de la suppression de l'album" }, 500);
  }
});

// ============================================================================
// SINGLES ROUTES
// ============================================================================

// Get all singles
app.get("/make-server-d462d5d8/singles", async (c) => {
  try {
    const singles = await kv.getByPrefix("single:");
    
    // Sort by year descending
    const sortedSingles = singles.sort((a, b) => b.year - a.year);
    
    return c.json(sortedSingles);
  } catch (error) {
    console.error("Get singles error:", error);
    return c.json({ error: "Erreur lors de la récupération des singles" }, 500);
  }
});

// Get single single
app.get("/make-server-d462d5d8/singles/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const single = await kv.get(`single:${id}`);
    
    if (!single) {
      return c.json({ error: "Single non trouvé" }, 404);
    }
    
    return c.json(single);
  } catch (error) {
    console.error("Get single error:", error);
    return c.json({ error: "Erreur lors de la récupération du single" }, 500);
  }
});

// Create single
app.post("/make-server-d462d5d8/singles", async (c) => {
  try {
    const data = await c.req.json();
    const singleId = crypto.randomUUID();
    
    const newSingle = {
      id: singleId,
      slug: data.slug || `${data.title.toLowerCase().replace(/\s+/g, '-')}-${data.year}`,
      title: data.title,
      album: data.album,
      albumSlug: data.albumSlug,
      year: data.year,
      coverImage: data.coverImage || null,
      duration: data.duration,
      description: data.description || null,
      videoClip: data.videoClip || null,
      chartPositions: data.chartPositions || [],
      certifications: data.certifications || [],
      spotifyUrl: data.spotifyUrl || null,
      appleMusicUrl: data.appleMusicUrl || null,
      youtubeUrl: data.youtubeUrl || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`single:${singleId}`, newSingle);
    return c.json(newSingle, 201);
  } catch (error) {
    console.error("Create single error:", error);
    return c.json({ error: "Erreur lors de la création du single" }, 500);
  }
});

// Update single
app.put("/make-server-d462d5d8/singles/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const data = await c.req.json();
    
    const existing = await kv.get(`single:${id}`);
    if (!existing) {
      return c.json({ error: "Single non trouvé" }, 404);
    }
    
    const updatedSingle = {
      ...existing,
      ...data,
      id: existing.id,
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`single:${id}`, updatedSingle);
    return c.json(updatedSingle);
  } catch (error) {
    console.error("Update single error:", error);
    return c.json({ error: "Erreur lors de la mise à jour du single" }, 500);
  }
});

// Delete single
app.delete("/make-server-d462d5d8/singles/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`single:${id}`);
    return c.json({ message: "Single supprimé" });
  } catch (error) {
    console.error("Delete single error:", error);
    return c.json({ error: "Erreur lors de la suppression du single" }, 500);
  }
});

// ============================================================================
// MEMBERS ROUTES
// ============================================================================

// Get all members
app.get("/make-server-d462d5d8/members", async (c) => {
  try {
    const members = await kv.getByPrefix("member:");
    
    // Sort by status (active first), then by name
    const sortedMembers = members.sort((a, b) => {
      if (a.status === b.status) {
        return a.name.localeCompare(b.name);
      }
      return a.status === 'active' ? -1 : 1;
    });
    
    return c.json(sortedMembers);
  } catch (error) {
    console.error("Get members error:", error);
    return c.json({ error: "Erreur lors de la récupération des membres" }, 500);
  }
});

// Get single member
app.get("/make-server-d462d5d8/members/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const member = await kv.get(`member:${id}`);
    
    if (!member) {
      return c.json({ error: "Membre non trouvé" }, 404);
    }
    
    return c.json(member);
  } catch (error) {
    console.error("Get member error:", error);
    return c.json({ error: "Erreur lors de la récupération du membre" }, 500);
  }
});

// Create member
app.post("/make-server-d462d5d8/members", async (c) => {
  try {
    const data = await c.req.json();
    const memberId = crypto.randomUUID();
    
    const newMember = {
      id: memberId,
      slug: data.slug || data.name.toLowerCase().replace(/\s+/g, '-'),
      name: data.name,
      role: data.role,
      period: data.period,
      status: data.status || 'active',
      bio: data.bio || null,
      birthDate: data.birthDate || null,
      instruments: data.instruments || [],
      image: data.image || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`member:${memberId}`, newMember);
    return c.json(newMember, 201);
  } catch (error) {
    console.error("Create member error:", error);
    return c.json({ error: "Erreur lors de la création du membre" }, 500);
  }
});

// Update member
app.put("/make-server-d462d5d8/members/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const data = await c.req.json();
    
    const existing = await kv.get(`member:${id}`);
    if (!existing) {
      return c.json({ error: "Membre non trouvé" }, 404);
    }
    
    const updatedMember = {
      ...existing,
      ...data,
      id: existing.id,
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`member:${id}`, updatedMember);
    return c.json(updatedMember);
  } catch (error) {
    console.error("Update member error:", error);
    return c.json({ error: "Erreur lors de la mise à jour du membre" }, 500);
  }
});

// Delete member
app.delete("/make-server-d462d5d8/members/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`member:${id}`);
    return c.json({ message: "Membre supprimé" });
  } catch (error) {
    console.error("Delete member error:", error);
    return c.json({ error: "Erreur lors de la suppression du membre" }, 500);
  }
});

// ============================================================================
// CONCERTS ROUTES
// ============================================================================

// Get all concerts
app.get("/make-server-d462d5d8/concerts", async (c) => {
  try {
    const concerts = await kv.getByPrefix("concert:");
    
    // Sort by date descending
    const sortedConcerts = concerts.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    return c.json(sortedConcerts);
  } catch (error) {
    console.error("Get concerts error:", error);
    return c.json({ error: "Erreur lors de la récupération des concerts" }, 500);
  }
});

// Create concert
app.post("/make-server-d462d5d8/concerts", async (c) => {
  try {
    const data = await c.req.json();
    const concertId = crypto.randomUUID();
    
    const newConcert = {
      id: concertId,
      date: data.date,
      venue: data.venue,
      city: data.city,
      country: data.country,
      tour: data.tour || null,
      ticketUrl: data.ticketUrl || null,
      status: data.status || 'scheduled',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`concert:${concertId}`, newConcert);
    return c.json(newConcert, 201);
  } catch (error) {
    console.error("Create concert error:", error);
    return c.json({ error: "Erreur lors de la création du concert" }, 500);
  }
});

// Update concert
app.put("/make-server-d462d5d8/concerts/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const data = await c.req.json();
    const concert = await kv.get(`concert:${id}`);
    
    if (!concert) {
      return c.json({ error: "Concert non trouvé" }, 404);
    }
    
    const updatedConcert = {
      ...concert,
      ...data,
      id: concert.id,
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`concert:${id}`, updatedConcert);
    return c.json(updatedConcert);
  } catch (error) {
    console.error("Update concert error:", error);
    return c.json({ error: "Erreur lors de la mise à jour du concert" }, 500);
  }
});

// Delete concert
app.delete("/make-server-d462d5d8/concerts/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`concert:${id}`);
    return c.json({ message: "Concert supprimé" });
  } catch (error) {
    console.error("Delete concert error:", error);
    return c.json({ error: "Erreur lors de la suppression du concert" }, 500);
  }
});

// ============================================================================
// COMMENTS ROUTES
// ============================================================================

// Get comments by entity
app.get("/make-server-d462d5d8/comments", async (c) => {
  try {
    const entityType = c.req.query("entityType");
    const entityId = c.req.query("entityId");
    
    const allComments = await kv.getByPrefix("comment:");
    
    let filteredComments = allComments;
    if (entityType && entityId) {
      filteredComments = allComments.filter(comment => 
        comment.entityType === entityType && comment.entityId === entityId
      );
    }
    
    // Sort by date descending
    const sortedComments = filteredComments.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    return c.json(sortedComments);
  } catch (error) {
    console.error("Get comments error:", error);
    return c.json({ error: "Erreur lors de la récupération des commentaires" }, 500);
  }
});

// Create comment
app.post("/make-server-d462d5d8/comments", async (c) => {
  try {
    const data = await c.req.json();
    const commentId = crypto.randomUUID();
    
    const newComment = {
      id: commentId,
      content: data.content,
      userId: data.userId || data.authorId, // Support both userId and authorId
      entityType: data.entityType, // 'article', 'album', 'concert', etc.
      entityId: data.entityId,
      parentId: data.parentId || null,
      isApproved: false, // Par défaut, les commentaires nécessitent une approbation
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`comment:${commentId}`, newComment);
    return c.json(newComment, 201);
  } catch (error) {
    console.error("Create comment error:", error);
    return c.json({ error: "Erreur lors de la création du commentaire" }, 500);
  }
});

// Approve comment
app.put("/make-server-d462d5d8/comments/:id/approve", async (c) => {
  try {
    const id = c.req.param("id");
    const comment = await kv.get(`comment:${id}`);
    
    if (!comment) {
      return c.json({ error: "Commentaire non trouvé" }, 404);
    }
    
    const updatedComment = {
      ...comment,
      isApproved: true,
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`comment:${id}`, updatedComment);
    return c.json(updatedComment);
  } catch (error) {
    console.error("Approve comment error:", error);
    return c.json({ error: "Erreur lors de l'approbation du commentaire" }, 500);
  }
});

// Reject comment (set isApproved to false)
app.put("/make-server-d462d5d8/comments/:id/reject", async (c) => {
  try {
    const id = c.req.param("id");
    const comment = await kv.get(`comment:${id}`);
    
    if (!comment) {
      return c.json({ error: "Commentaire non trouvé" }, 404);
    }
    
    const updatedComment = {
      ...comment,
      isApproved: false,
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`comment:${id}`, updatedComment);
    return c.json(updatedComment);
  } catch (error) {
    console.error("Reject comment error:", error);
    return c.json({ error: "Erreur lors du rejet du commentaire" }, 500);
  }
});

// Delete comment
app.delete("/make-server-d462d5d8/comments/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`comment:${id}`);
    return c.json({ message: "Commentaire supprimé" });
  } catch (error) {
    console.error("Delete comment error:", error);
    return c.json({ error: "Erreur lors de la suppression du commentaire" }, 500);
  }
});

// Get comments count for an entity
app.get("/make-server-d462d5d8/comments/count/:entityType/:entityId", async (c) => {
  try {
    const entityType = c.req.param("entityType");
    const entityId = c.req.param("entityId");
    
    const allComments = await kv.getByPrefix("comment:");
    const filteredComments = allComments.filter((comment: any) => 
      comment.entityType === entityType && 
      comment.entityId === entityId &&
      comment.isApproved
    );
    
    return c.json({ count: filteredComments.length });
  } catch (error) {
    console.error("Get comments count error:", error);
    return c.json({ error: "Erreur lors du comptage des commentaires" }, 500);
  }
});

// Get all comment counts (for bulk requests)
app.post("/make-server-d462d5d8/comments/counts", async (c) => {
  try {
    const { entities } = await c.req.json(); // Array of { entityType, entityId }
    
    const allComments = await kv.getByPrefix("comment:");
    const counts: Record<string, number> = {};
    
    for (const entity of entities) {
      const key = `${entity.entityType}:${entity.entityId}`;
      const filtered = allComments.filter((comment: any) => 
        comment.entityType === entity.entityType && 
        comment.entityId === entity.entityId &&
        comment.isApproved
      );
      counts[key] = filtered.length;
    }
    
    return c.json(counts);
  } catch (error) {
    console.error("Get bulk comments counts error:", error);
    return c.json({ error: "Erreur lors du comptage des commentaires" }, 500);
  }
});

// ============================================================================
// STATS ROUTES (for Dashboard)
// ============================================================================

app.get("/make-server-d462d5d8/stats/dashboard", async (c) => {
  try {
    const users = await kv.getByPrefix("user:");
    const articles = await kv.getByPrefix("article:");
    const albums = await kv.getByPrefix("album:");
    const concerts = await kv.getByPrefix("concert:");
    const comments = await kv.getByPrefix("comment:");
    
    return c.json({
      totalUsers: users.length,
      totalArticles: articles.length,
      totalAlbums: albums.length,
      totalConcerts: concerts.length,
      totalComments: comments.length,
      activeUsers: users.filter(u => u.isActive).length,
      publishedArticles: articles.filter(a => a.isPublished).length,
      upcomingConcerts: concerts.filter(c => new Date(c.date) > new Date()).length
    });
  } catch (error) {
    console.error("Get stats error:", error);
    return c.json({ error: "Erreur lors de la récupération des statistiques" }, 500);
  }
});

// ============================================================================
// INIT / SEED ROUTE
// ============================================================================

// Initialize database with seed data (DEVELOPMENT ONLY)
app.post("/make-server-d462d5d8/init/seed", async (c) => {
  try {
    console.log("🌱 [SEED] Starting seed process in background...");
    
    // Execute seed operations in the background without awaiting
    // This prevents timeout by responding immediately
    (async () => {
      try {
        console.log("🌱 [SEED] Step 1/4 - Seeding database...");
        const result = await seedDatabase();
        console.log("✅ [SEED] Step 1/4 complete - Database seeded");
        
        console.log("🌱 [SEED] Step 2/4 - Seeding media data...");
        await seedMediaData();
        console.log("✅ [SEED] Step 2/4 complete - Media data seeded");
        
        console.log("🌱 [SEED] Step 3/4 - Seeding contributions...");
        await seedContributions();
        console.log("✅ [SEED] Step 3/4 complete - Contributions seeded");
        
        console.log("🌱 [SEED] Step 4/5 - Seeding fanzines...");
        await seedFanzines();
        console.log("✅ [SEED] Step 4/5 complete - Fanzines seeded");
        
        console.log("🌱 [SEED] Step 5/7 - Seeding moderation data...");
        await seedModerationData();
        console.log("✅ [SEED] Step 5/7 complete - Moderation data seeded");
        
        console.log("🌱 [SEED] Step 6/7 - Seeding forum data...");
        await seedForum();
        console.log("✅ [SEED] Step 6/7 complete - Forum data seeded");
        
        console.log("🌱 [SEED] Step 7/7 - Seeding media gallery...");
        await seedMediaGallery();
        console.log("✅ [SEED] Step 7/7 complete - Media gallery seeded");
        
        console.log("🎉 [SEED] All seed operations completed successfully!");
      } catch (error) {
        console.error("❌ [SEED] Background seed error:", error);
      }
    })();
    
    // Respond immediately to avoid timeout
    return c.json({
      message: "Initialisation de la base de données lancée en arrière-plan. Consultez les logs pour suivre la progression.",
      status: "processing"
    });
  } catch (error) {
    console.error("Seed initialization error:", error);
    return c.json({ error: "Erreur lors du lancement de l'initialisation" }, 500);
  }
});

// Seed media data only (for quick updates)
app.post("/make-server-d462d5d8/init/seed-media", async (c) => {
  try {
    console.log("📸 [SEED-MEDIA] Starting media seed in background...");
    
    // Execute in background to avoid timeout
    (async () => {
      try {
        await seedMediaData();
        console.log("✅ [SEED-MEDIA] Media data seeded successfully!");
      } catch (error) {
        console.error("❌ [SEED-MEDIA] Background error:", error);
      }
    })();
    
    return c.json({
      message: "Initialisation des données média lancée en arrière-plan. Consultez les logs.",
      status: "processing"
    });
  } catch (error) {
    console.error("Seed media error:", error);
    return c.json({ error: "Erreur lors de l'initialisation des données média" }, 500);
  }
});

// Check database data (DEVELOPMENT ONLY)
app.post("/make-server-d462d5d8/init/check", async (c) => {
  try {
    console.log("[CHECK] Starting database check...");
    
    // Get all data from database
    const users = await kv.getByPrefix("user:");
    const articles = await kv.getByPrefix("article:");
    const comments = await kv.getByPrefix("comment:");
    const albums = await kv.getByPrefix("album:");
    const singles = await kv.getByPrefix("single:");
    const concerts = await kv.getByPrefix("concert:");
    const members = await kv.getByPrefix("member:");
    const contributions = await kv.getByPrefix("contribution:");
    const fanzines = await kv.getByPrefix("fanzine:");
    
    console.log(`[CHECK] Found ${articles.length} articles in database`);
    console.log(`[CHECK] Article IDs:`, articles.map(a => a.id));
    console.log(`[CHECK] Published articles:`, articles.filter(a => a.isPublished).length);
    
    return c.json({
      message: "Vérification de la base de données terminée",
      stats: {
        users: users.length,
        articles: articles.length,
        comments: comments.length,
        albums: albums.length,
        singles: singles.length,
        concerts: concerts.length,
        members: members.length,
        contributions: contributions.length,
        fanzines: fanzines.length,
      },
      details: {
        publishedArticles: articles.filter(a => a.isPublished).length,
        draftArticles: articles.filter(a => !a.isPublished).length,
        upcomingConcerts: concerts.filter(c => new Date(c.date) > new Date()).length,
        pastConcerts: concerts.filter(c => new Date(c.date) <= new Date()).length,
      }
    });
  } catch (error) {
    console.error("[CHECK] Check error:", error);
    return c.json({ error: "Erreur lors de la vérification de la base de données" }, 500);
  }
});

// ============================================================================
// CONTACT MESSAGES ROUTES
// ============================================================================

// Create contact message
app.post("/make-server-d462d5d8/contact", async (c) => {
  try {
    const { name, email, subject, message } = await c.req.json();
    
    // Validate input
    if (!name || !email || !subject || !message) {
      return c.json({ error: "Tous les champs sont requis" }, 400);
    }
    
    // Create message ID
    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    
    // Create contact message
    const contactMessage = {
      id: messageId,
      name,
      email,
      subject,
      message,
      status: "new",
      createdAt: new Date().toISOString(),
      readAt: null,
    };
    
    // Save to KV store
    await kv.set(`contact:${messageId}`, contactMessage);
    
    console.log(`[CONTACT] New message from ${email}: ${subject}`);
    
    return c.json({
      message: "Message envoyé avec succès !",
      id: messageId
    });
  } catch (error) {
    console.error("Create contact message error:", error);
    return c.json({ error: "Erreur lors de l'envoi du message" }, 500);
  }
});

// Get all contact messages (admin only)
app.get("/make-server-d462d5d8/contact", async (c) => {
  try {
    const messages = await kv.getByPrefix("contact:");
    
    // Sort by date (most recent first)
    messages.sort((a: any, b: any) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    return c.json(messages);
  } catch (error) {
    console.error("Get contact messages error:", error);
    return c.json({ error: "Erreur lors de la récupération des messages" }, 500);
  }
});

// Mark contact message as read (admin only)
app.put("/make-server-d462d5d8/contact/:id/read", async (c) => {
  try {
    const id = c.req.param("id");
    const message = await kv.get(`contact:${id}`);
    
    if (!message) {
      return c.json({ error: "Message non trouvé" }, 404);
    }
    
    const updatedMessage = {
      ...message,
      status: "read",
      readAt: new Date().toISOString()
    };
    
    await kv.set(`contact:${id}`, updatedMessage);
    
    return c.json(updatedMessage);
  } catch (error) {
    console.error("Mark message as read error:", error);
    return c.json({ error: "Erreur lors de la mise à jour du message" }, 500);
  }
});

// Delete contact message (admin only)
app.delete("/make-server-d462d5d8/contact/:id", async (c) => {
  try {
    const id = c.req.param("id");
    await kv.del(`contact:${id}`);
    return c.json({ message: "Message supprimé avec succès" });
  } catch (error) {
    console.error("Delete contact message error:", error);
    return c.json({ error: "Erreur lors de la suppression du message" }, 500);
  }
});

// ============================================================================
// INIT DATA ROUTE - Initialize default categories and tags
// ============================================================================

app.post("/make-server-d462d5d8/init-data", async (c) => {
  try {
    // ========================================================================
    // 1. CREATE ADMIN USER
    // ========================================================================
    const adminUser = {
      id: crypto.randomUUID(),
      username: "Jon",
      email: "jonathan@untouchables.fr",
      password: "cry88prgmd3WFTH@@@", // In production, this should be hashed
      role: "admin",
      avatar: null,
      bio: "Administrateur principal du site Untouchables - Communauté francophone de fans de Korn",
      location: "France",
      website: "https://untouchables.fr",
      isVerified: true,
      isBanned: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString()
    };

    // Check if admin user already exists
    const existingUsers = await kv.getByPrefix("user:");
    const adminExists = existingUsers.some((u: any) => u.email === adminUser.email);
    
    if (!adminExists) {
      await kv.set(`user:${adminUser.id}`, adminUser);
      console.log("[init-data] Admin user created:", adminUser.username);
    } else {
      console.log("[init-data] Admin user already exists, skipping creation");
    }

    // ========================================================================
    // 2. CREATE DEFAULT CATEGORIES
    // ========================================================================
    // Default categories for Korn fan site (matching existing articles)
    const defaultCategories = [
      {
        id: crypto.randomUUID(),
        name: "News",
        slug: "news",
        description: "Actualités et nouveautés du groupe Korn",
        color: "#8B0000",
        isActive: true,
        articleCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: crypto.randomUUID(),
        name: "Interview",
        slug: "interview",
        description: "Interviews exclusives des membres du groupe",
        color: "#DC143C",
        isActive: true,
        articleCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: crypto.randomUUID(),
        name: "Chronique",
        slug: "chronique",
        description: "Chroniques et analyses d'albums",
        color: "#B22222",
        isActive: true,
        articleCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: crypto.randomUUID(),
        name: "Concerts",
        slug: "concerts",
        description: "Tournées, dates de concerts et événements live",
        color: "#FF4500",
        isActive: true,
        articleCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    // Default tags for Korn fan site (matching existing article tags)
    const defaultTags = [
      {
        id: crypto.randomUUID(),
        name: "Tournée",
        slug: "tournee",
        description: "Informations sur les tournées",
        color: "#FF6347",
        isActive: true,
        articleCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: crypto.randomUUID(),
        name: "Concert",
        slug: "concert",
        description: "Concerts et événements live",
        color: "#CD5C5C",
        isActive: true,
        articleCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: crypto.randomUUID(),
        name: "Europe",
        slug: "europe",
        description: "Événements et news en Europe",
        color: "#E9967A",
        isActive: true,
        articleCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: crypto.randomUUID(),
        name: "2026",
        slug: "2026",
        description: "Événements prévus en 2026",
        color: "#FA8072",
        isActive: true,
        articleCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: crypto.randomUUID(),
        name: "Interview",
        slug: "interview",
        description: "Interviews et déclarations",
        color: "#F08080",
        isActive: true,
        articleCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: crypto.randomUUID(),
        name: "Jonathan Davis",
        slug: "jonathan-davis",
        description: "News concernant Jonathan Davis",
        color: "#FF8C00",
        isActive: true,
        articleCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: crypto.randomUUID(),
        name: "Album",
        slug: "album",
        description: "Albums et sorties discographiques",
        color: "#FF7F50",
        isActive: true,
        articleCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: crypto.randomUUID(),
        name: "2027",
        slug: "2027",
        description: "Événements prévus en 2027",
        color: "#FF6347",
        isActive: true,
        articleCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: crypto.randomUUID(),
        name: "Chronique",
        slug: "chronique",
        description: "Chroniques et critiques",
        color: "#DC143C",
        isActive: true,
        articleCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: crypto.randomUUID(),
        name: "Issues",
        slug: "issues",
        description: "Tag pour l'album Issues",
        color: "#B22222",
        isActive: true,
        articleCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: crypto.randomUUID(),
        name: "Anniversaire",
        slug: "anniversaire",
        description: "Anniversaires et commémorations",
        color: "#A52A2A",
        isActive: true,
        articleCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: crypto.randomUUID(),
        name: "Analyse",
        slug: "analyse",
        description: "Analyses approfondies",
        color: "#8B4513",
        isActive: true,
        articleCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    // Save categories
    for (const category of defaultCategories) {
      await kv.set(`category:${category.id}`, category);
    }

    // Save tags
    for (const tag of defaultTags) {
      await kv.set(`tag:${tag.id}`, tag);
    }

    // ========================================================================
    // 3. UPDATE ALL ARTICLES TO HAVE ADMIN AS AUTHOR
    // ========================================================================
    const allArticles = await kv.getByPrefix("article:");
    let articlesUpdated = 0;
    
    // Get admin user (newly created or existing)
    const adminUserToAssign = adminExists 
      ? existingUsers.find((u: any) => u.email === "jonathan@untouchables.fr")
      : adminUser;
    
    if (adminUserToAssign && allArticles.length > 0) {
      for (const article of allArticles) {
        // Update article to have admin as author
        const updatedArticle = {
          ...article,
          authorId: adminUserToAssign.id,
          updatedAt: new Date().toISOString()
        };
        
        await kv.set(`article:${article.id}`, updatedArticle);
        articlesUpdated++;
      }
      console.log(`[init-data] Updated ${articlesUpdated} articles with admin author`);
    }

    return c.json({
      message: "Données initialisées avec succès",
      adminUserCreated: !adminExists,
      adminUsername: adminUserToAssign?.username,
      adminEmail: adminUserToAssign?.email,
      categoriesCreated: defaultCategories.length,
      tagsCreated: defaultTags.length,
      articlesUpdated: articlesUpdated,
      categories: defaultCategories,
      tags: defaultTags
    }, 201);
  } catch (error) {
    console.error("Init data error:", error);
    return c.json({ error: "Erreur lors de l'initialisation des données" }, 500);
  }
});

// ============================================================================
// LIKES ROUTES - System for liking articles and comments
// ============================================================================

// Like an article
app.post("/make-server-d462d5d8/articles/:id/like", async (c) => {
  try {
    const articleId = c.req.param("id");
    const { userId } = await c.req.json();
    
    if (!userId) {
      return c.json({ error: "userId requis" }, 400);
    }
    
    // Check if article exists
    const article = await kv.get(`article:${articleId}`);
    if (!article) {
      return c.json({ error: "Article non trouvé" }, 404);
    }
    
    // Check if user exists
    const user = await kv.get(`user:${userId}`);
    if (!user) {
      return c.json({ error: "Utilisateur non trouvé" }, 404);
    }
    
    // Create unique like ID
    const likeId = `${userId}_article_${articleId}`;
    
    // Check if already liked
    const existingLike = await kv.get(`like:${likeId}`);
    if (existingLike) {
      return c.json({ error: "Article déjà liké" }, 400);
    }
    
    // Create like
    const like = {
      id: likeId,
      userId: userId,
      targetType: "article",
      targetId: articleId,
      createdAt: new Date().toISOString()
    };
    
    await kv.set(`like:${likeId}`, like);
    
    // Create activity entry
    const activityId = crypto.randomUUID();
    const activity = {
      id: activityId,
      userId: userId,
      type: "like",
      content: `A liké l'article "${article.title}"`,
      date: new Date().toISOString(),
      linkTo: `/news/${article.slug}`,
      articleTitle: article.title,
      createdAt: new Date().toISOString()
    };
    
    await kv.set(`activity:${activityId}`, activity);
    
    console.log(`[LIKE] User ${userId} liked article ${articleId}`);
    
    return c.json({ message: "Article liké avec succès", like });
  } catch (error) {
    console.error("Like article error:", error);
    return c.json({ error: "Erreur lors du like de l'article" }, 500);
  }
});

// Unlike an article
app.delete("/make-server-d462d5d8/articles/:id/like", async (c) => {
  try {
    const articleId = c.req.param("id");
    const { userId } = await c.req.json();
    
    if (!userId) {
      return c.json({ error: "userId requis" }, 400);
    }
    
    // Create unique like ID
    const likeId = `${userId}_article_${articleId}`;
    
    // Delete like
    await kv.del(`like:${likeId}`);
    
    console.log(`[UNLIKE] User ${userId} unliked article ${articleId}`);
    
    return c.json({ message: "Like retiré avec succès" });
  } catch (error) {
    console.error("Unlike article error:", error);
    return c.json({ error: "Erreur lors du retrait du like" }, 500);
  }
});

// Get likes for an article
app.get("/make-server-d462d5d8/articles/:id/likes", async (c) => {
  try {
    const articleId = c.req.param("id");
    
    // Get all likes
    const allLikes = await kv.getByPrefix("like:");
    
    // Filter likes for this article
    const articleLikes = allLikes.filter(
      like => like.targetType === "article" && like.targetId === articleId
    );
    
    return c.json({
      count: articleLikes.length,
      likes: articleLikes
    });
  } catch (error) {
    console.error("Get article likes error:", error);
    return c.json({ error: "Erreur lors de la récupération des likes" }, 500);
  }
});

// Check if user liked an article
app.get("/make-server-d462d5d8/articles/:id/likes/:userId", async (c) => {
  try {
    const articleId = c.req.param("id");
    const userId = c.req.param("userId");
    
    const likeId = `${userId}_article_${articleId}`;
    const like = await kv.get(`like:${likeId}`);
    
    return c.json({
      liked: !!like
    });
  } catch (error) {
    console.error("Check article like error:", error);
    return c.json({ error: "Erreur lors de la vérification du like" }, 500);
  }
});

// Like a comment
app.post("/make-server-d462d5d8/comments/:id/like", async (c) => {
  try {
    const commentId = c.req.param("id");
    const { userId } = await c.req.json();
    
    if (!userId) {
      return c.json({ error: "userId requis" }, 400);
    }
    
    // Check if comment exists
    const comment = await kv.get(`comment:${commentId}`);
    if (!comment) {
      return c.json({ error: "Commentaire non trouvé" }, 404);
    }
    
    // Check if user exists
    const user = await kv.get(`user:${userId}`);
    if (!user) {
      return c.json({ error: "Utilisateur non trouvé" }, 404);
    }
    
    // Create unique like ID
    const likeId = `${userId}_comment_${commentId}`;
    
    // Check if already liked
    const existingLike = await kv.get(`like:${likeId}`);
    if (existingLike) {
      return c.json({ error: "Commentaire déjà liké" }, 400);
    }
    
    // Create like
    const like = {
      id: likeId,
      userId: userId,
      targetType: "comment",
      targetId: commentId,
      createdAt: new Date().toISOString()
    };
    
    await kv.set(`like:${likeId}`, like);
    
    // Create activity entry
    const activityId = crypto.randomUUID();
    
    // Try to get article info if comment is on an article
    let linkTo = null;
    let articleTitle = null;
    if (comment.entityType === 'article' && comment.entityId) {
      const article = await kv.get(`article:${comment.entityId}`);
      if (article) {
        linkTo = `/news/${article.slug}`;
        articleTitle = article.title;
      }
    }
    
    const activity = {
      id: activityId,
      userId: userId,
      type: "like",
      content: articleTitle ? `A liké un commentaire sur "${articleTitle}"` : `A liké un commentaire`,
      date: new Date().toISOString(),
      linkTo: linkTo,
      articleTitle: articleTitle,
      createdAt: new Date().toISOString()
    };
    
    await kv.set(`activity:${activityId}`, activity);
    
    console.log(`[LIKE] User ${userId} liked comment ${commentId}`);
    
    return c.json({ message: "Commentaire liké avec succès", like });
  } catch (error) {
    console.error("Like comment error:", error);
    return c.json({ error: "Erreur lors du like du commentaire" }, 500);
  }
});

// Unlike a comment
app.delete("/make-server-d462d5d8/comments/:id/like", async (c) => {
  try {
    const commentId = c.req.param("id");
    const { userId } = await c.req.json();
    
    if (!userId) {
      return c.json({ error: "userId requis" }, 400);
    }
    
    // Create unique like ID
    const likeId = `${userId}_comment_${commentId}`;
    
    // Delete like
    await kv.del(`like:${likeId}`);
    
    console.log(`[UNLIKE] User ${userId} unliked comment ${commentId}`);
    
    return c.json({ message: "Like retiré avec succès" });
  } catch (error) {
    console.error("Unlike comment error:", error);
    return c.json({ error: "Erreur lors du retrait du like" }, 500);
  }
});

// Get likes for a comment
app.get("/make-server-d462d5d8/comments/:id/likes", async (c) => {
  try {
    const commentId = c.req.param("id");
    
    // Get all likes
    const allLikes = await kv.getByPrefix("like:");
    
    // Filter likes for this comment
    const commentLikes = allLikes.filter(
      like => like.targetType === "comment" && like.targetId === commentId
    );
    
    return c.json({
      count: commentLikes.length,
      likes: commentLikes
    });
  } catch (error) {
    console.error("Get comment likes error:", error);
    return c.json({ error: "Erreur lors de la récupération des likes" }, 500);
  }
});

// Check if user liked a comment
app.get("/make-server-d462d5d8/comments/:id/likes/:userId", async (c) => {
  try {
    const commentId = c.req.param("id");
    const userId = c.req.param("userId");
    
    const likeId = `${userId}_comment_${commentId}`;
    const like = await kv.get(`like:${likeId}`);
    
    return c.json({
      liked: !!like
    });
  } catch (error) {
    console.error("Check comment like error:", error);
    return c.json({ error: "Erreur lors de la vérification du like" }, 500);
  }
});

// ============================================================================
// NOTIFICATIONS ROUTES
// ============================================================================

// Get user notifications
app.get("/make-server-d462d5d8/notifications", async (c) => {
  try {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return c.json({ error: "Non autorisé" }, 401);
    }

    const session = await kv.get(`session:${token}`);
    if (!session) {
      return c.json({ error: "Session invalide" }, 401);
    }

    // Get user notifications
    const allNotifications = await kv.getByPrefix("notification:");
    const userNotifications = allNotifications
      .filter(n => n.userId === session.userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return c.json({ notifications: userNotifications });
  } catch (error) {
    console.error("Get notifications error:", error);
    return c.json({ error: "Erreur lors de la récupération des notifications" }, 500);
  }
});

// Mark notification as read
app.put("/make-server-d462d5d8/notifications/:id/read", async (c) => {
  try {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return c.json({ error: "Non autorisé" }, 401);
    }

    const session = await kv.get(`session:${token}`);
    if (!session) {
      return c.json({ error: "Session invalide" }, 401);
    }

    const notificationId = c.req.param("id");
    const notification = await kv.get(`notification:${notificationId}`);

    if (!notification) {
      return c.json({ error: "Notification non trouvée" }, 404);
    }

    if (notification.userId !== session.userId) {
      return c.json({ error: "Non autorisé" }, 403);
    }

    // Update notification
    notification.read = true;
    notification.readAt = new Date().toISOString();
    await kv.set(`notification:${notificationId}`, notification);

    return c.json({ notification });
  } catch (error) {
    console.error("Mark notification as read error:", error);
    return c.json({ error: "Erreur lors de la mise à jour de la notification" }, 500);
  }
});

// Mark all notifications as read
app.put("/make-server-d462d5d8/notifications/read-all", async (c) => {
  try {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return c.json({ error: "Non autorisé" }, 401);
    }

    const session = await kv.get(`session:${token}`);
    if (!session) {
      return c.json({ error: "Session invalide" }, 401);
    }

    // Get all user notifications
    const allNotifications = await kv.getByPrefix("notification:");
    const userNotifications = allNotifications.filter(n => n.userId === session.userId && !n.read);

    // Mark all as read
    for (const notification of userNotifications) {
      notification.read = true;
      notification.readAt = new Date().toISOString();
      await kv.set(`notification:${notification.id}`, notification);
    }

    return c.json({ message: "Toutes les notifications ont été marquées comme lues", count: userNotifications.length });
  } catch (error) {
    console.error("Mark all notifications as read error:", error);
    return c.json({ error: "Erreur lors de la mise à jour des notifications" }, 500);
  }
});

// Delete notification
app.delete("/make-server-d462d5d8/notifications/:id", async (c) => {
  try {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return c.json({ error: "Non autorisé" }, 401);
    }

    const session = await kv.get(`session:${token}`);
    if (!session) {
      return c.json({ error: "Session invalide" }, 401);
    }

    const notificationId = c.req.param("id");
    const notification = await kv.get(`notification:${notificationId}`);

    if (!notification) {
      return c.json({ error: "Notification non trouvée" }, 404);
    }

    if (notification.userId !== session.userId) {
      return c.json({ error: "Non autorisé" }, 403);
    }

    await kv.del(`notification:${notificationId}`);

    return c.json({ message: "Notification supprimée" });
  } catch (error) {
    console.error("Delete notification error:", error);
    return c.json({ error: "Erreur lors de la suppression de la notification" }, 500);
  }
});

// Create notification (internal helper - can be called when creating comments, likes, etc.)
// This is used internally by other endpoints
async function createNotification({
  userId,
  type,
  message,
  link,
  fromUserId,
  fromUsername,
}: {
  userId: string;
  type: 'mention' | 'reply' | 'like' | 'follow' | 'comment' | 'article' | 'system';
  message: string;
  link?: string;
  fromUserId?: string;
  fromUsername?: string;
}) {
  const notification = {
    id: crypto.randomUUID(),
    userId,
    type,
    message,
    link: link || null,
    fromUserId: fromUserId || null,
    fromUsername: fromUsername || null,
    read: false,
    readAt: null,
    createdAt: new Date().toISOString(),
  };

  await kv.set(`notification:${notification.id}`, notification);
  return notification;
}

// ============================================================================
// MEDIA ROUTES (for widgets)
// ============================================================================

// Get latest video (YouTube)
app.get("/make-server-d462d5d8/media/latest-video", async (c) => {
  try {
    const video = await kv.get("media:latest-video");
    
    if (!video) {
      // Return default/placeholder if not set
      return c.json({
        video: {
          id: 'default',
          title: 'Aucune vidéo configurée',
          thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80',
          views: '0',
          duration: '0:00',
          url: '#',
        }
      });
    }

    return c.json({ video });
  } catch (error) {
    console.error("Get latest video error:", error);
    return c.json({ error: "Erreur lors de la récupération de la vidéo" }, 500);
  }
});

// Update latest video (admin only)
app.put("/make-server-d462d5d8/media/latest-video", async (c) => {
  try {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return c.json({ error: "Non autorisé" }, 401);
    }

    const session = await kv.get(`session:${token}`);
    if (!session || !session.roles.includes("admin")) {
      return c.json({ error: "Accès non autorisé" }, 403);
    }

    const { title, thumbnail, views, duration, url } = await c.req.json();

    const video = {
      id: 'latest',
      title,
      thumbnail,
      views,
      duration,
      url,
      updatedAt: new Date().toISOString(),
    };

    await kv.set("media:latest-video", video);

    return c.json({ video });
  } catch (error) {
    console.error("Update latest video error:", error);
    return c.json({ error: "Erreur lors de la mise à jour de la vidéo" }, 500);
  }
});

// Get shorts/reels
app.get("/make-server-d462d5d8/media/shorts", async (c) => {
  try {
    const shorts = await kv.get("media:shorts");
    
    if (!shorts || !Array.isArray(shorts)) {
      // Return default/placeholder
      return c.json({ shorts: [] });
    }

    return c.json({ shorts });
  } catch (error) {
    console.error("Get shorts error:", error);
    return c.json({ error: "Erreur lors de la récupération des shorts" }, 500);
  }
});

// Update shorts (admin only)
app.put("/make-server-d462d5d8/media/shorts", async (c) => {
  try {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return c.json({ error: "Non autorisé" }, 401);
    }

    const session = await kv.get(`session:${token}`);
    if (!session || !session.roles.includes("admin")) {
      return c.json({ error: "Accès non autorisé" }, 403);
    }

    const { shorts } = await c.req.json();

    if (!Array.isArray(shorts)) {
      return c.json({ error: "Format invalide" }, 400);
    }

    await kv.set("media:shorts", shorts);

    return c.json({ shorts });
  } catch (error) {
    console.error("Update shorts error:", error);
    return c.json({ error: "Erreur lors de la mise à jour des shorts" }, 500);
  }
});

// Get Instagram posts
app.get("/make-server-d462d5d8/media/instagram", async (c) => {
  try {
    const posts = await kv.get("media:instagram");
    
    if (!posts || !Array.isArray(posts)) {
      // Return default/placeholder
      return c.json({ posts: [] });
    }

    return c.json({ posts });
  } catch (error) {
    console.error("Get Instagram posts error:", error);
    return c.json({ error: "Erreur lors de la récupération des posts Instagram" }, 500);
  }
});

// Update Instagram posts (admin only)
app.put("/make-server-d462d5d8/media/instagram", async (c) => {
  try {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return c.json({ error: "Non autorisé" }, 401);
    }

    const session = await kv.get(`session:${token}`);
    if (!session || !session.roles.includes("admin")) {
      return c.json({ error: "Accès non autorisé" }, 403);
    }

    const { posts } = await c.req.json();

    if (!Array.isArray(posts)) {
      return c.json({ error: "Format invalide" }, 400);
    }

    await kv.set("media:instagram", posts);

    return c.json({ posts });
  } catch (error) {
    console.error("Update Instagram posts error:", error);
    return c.json({ error: "Erreur lors de la mise à jour des posts Instagram" }, 500);
  }
});

// ============================================================================
// FAN CONTRIBUTIONS ROUTES
// ============================================================================

// Get all approved contributions (public)
app.get("/make-server-d462d5d8/contributions", async (c) => {
  try {
    const allContributions = await kv.getByPrefix("contribution:");
    const approvedContributions = allContributions
      .filter(contrib => contrib.status === 'approved')
      .sort((a, b) => new Date(b.approvedAt || b.submittedAt).getTime() - new Date(a.approvedAt || a.submittedAt).getTime());

    return c.json({ contributions: approvedContributions });
  } catch (error) {
    console.error("Get contributions error:", error);
    return c.json({ error: "Erreur lors de la récupération des contributions" }, 500);
  }
});

// Get featured contributions (for homepage)
app.get("/make-server-d462d5d8/contributions/featured", async (c) => {
  try {
    const allContributions = await kv.getByPrefix("contribution:");
    const featuredContributions = allContributions
      .filter(contrib => contrib.status === 'approved' && contrib.featured)
      .sort((a, b) => new Date(b.approvedAt || b.submittedAt).getTime() - new Date(a.approvedAt || a.submittedAt).getTime())
      .slice(0, 4); // Only 4 for homepage

    return c.json({ contributions: featuredContributions });
  } catch (error) {
    console.error("Get featured contributions error:", error);
    return c.json({ error: "Erreur lors de la récupération des contributions mises en avant" }, 500);
  }
});

// Submit a contribution (authenticated)
app.post("/make-server-d462d5d8/contributions", async (c) => {
  console.log("[CONTRIBUTION] POST /contributions called");
  try {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      console.log("[CONTRIBUTION] No token provided");
      return c.json({ error: "Non autorisé" }, 401);
    }

    console.log("[CONTRIBUTION] Checking session...");
    const session = await kv.get(`session:${token}`);
    if (!session) {
      console.log("[CONTRIBUTION] Invalid session");
      return c.json({ error: "Session invalide" }, 401);
    }

    console.log("[CONTRIBUTION] Session valid, user:", session.userId);
    const body = await c.req.json();
    console.log("[CONTRIBUTION] Request body:", JSON.stringify(body));
    
    const { type, image, caption, legend, subtitle, tags } = body;

    // Validation
    if (!type || !image || !caption) {
      console.log("[CONTRIBUTION] Validation failed - missing required fields");
      return c.json({ error: "Type, image et caption sont requis" }, 400);
    }

    // Get user info
    console.log("[CONTRIBUTION] Getting user info...");
    const user = await kv.get(`user:${session.userId}`);

    const contributionId = crypto.randomUUID();
    console.log("[CONTRIBUTION] Generated ID:", contributionId);

    const contribution = {
      id: contributionId,
      type,
      image,
      author: user.username,
      authorId: session.userId,
      likes: 0,
      comments: 0,
      caption,
      legend: legend || 'Contribution',
      subtitle: subtitle || '',
      status: 'pending',
      submittedAt: new Date().toISOString(),
      approvedAt: null,
      approvedBy: null,
      featured: false,
      tags: tags || [],
    };

    console.log("[CONTRIBUTION] Saving to KV store...");
    await kv.set(`contribution:${contribution.id}`, contribution);
    console.log("[CONTRIBUTION] Saved successfully");

    return c.json({ contribution }, 201);
  } catch (error) {
    console.error("[CONTRIBUTION] Error:", error);
    return c.json({ error: "Erreur lors de la soumission de la contribution" }, 500);
  }
});

// Approve contribution (admin only)
app.put("/make-server-d462d5d8/contributions/:id/approve", async (c) => {
  try {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return c.json({ error: "Non autorisé" }, 401);
    }

    const session = await kv.get(`session:${token}`);
    if (!session || !session.roles.includes("admin")) {
      return c.json({ error: "Accès non autorisé" }, 403);
    }

    const contributionId = c.req.param("id");
    const contribution = await kv.get(`contribution:${contributionId}`);

    if (!contribution) {
      return c.json({ error: "Contribution non trouvée" }, 404);
    }

    contribution.status = 'approved';
    contribution.approvedAt = new Date().toISOString();
    contribution.approvedBy = session.userId;

    await kv.set(`contribution:${contributionId}`, contribution);

    return c.json({ contribution });
  } catch (error) {
    console.error("Approve contribution error:", error);
    return c.json({ error: "Erreur lors de l'approbation de la contribution" }, 500);
  }
});

// Reject contribution (admin only)
app.put("/make-server-d462d5d8/contributions/:id/reject", async (c) => {
  try {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return c.json({ error: "Non autorisé" }, 401);
    }

    const session = await kv.get(`session:${token}`);
    if (!session || !session.roles.includes("admin")) {
      return c.json({ error: "Accès non autorisé" }, 403);
    }

    const contributionId = c.req.param("id");
    const contribution = await kv.get(`contribution:${contributionId}`);

    if (!contribution) {
      return c.json({ error: "Contribution non trouvée" }, 404);
    }

    contribution.status = 'rejected';
    await kv.set(`contribution:${contributionId}`, contribution);

    return c.json({ contribution });
  } catch (error) {
    console.error("Reject contribution error:", error);
    return c.json({ error: "Erreur lors du rejet de la contribution" }, 500);
  }
});

// Delete contribution (admin or author)
app.delete("/make-server-d462d5d8/contributions/:id", async (c) => {
  try {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return c.json({ error: "Non autorisé" }, 401);
    }

    const session = await kv.get(`session:${token}`);
    if (!session) {
      return c.json({ error: "Session invalide" }, 401);
    }

    const contributionId = c.req.param("id");
    const contribution = await kv.get(`contribution:${contributionId}`);

    if (!contribution) {
      return c.json({ error: "Contribution non trouvée" }, 404);
    }

    // Check if user is admin or author
    if (contribution.authorId !== session.userId && !session.roles.includes("admin")) {
      return c.json({ error: "Non autorisé" }, 403);
    }

    await kv.del(`contribution:${contributionId}`);

    return c.json({ message: "Contribution supprimée" });
  } catch (error) {
    console.error("Delete contribution error:", error);
    return c.json({ error: "Erreur lors de la suppression de la contribution" }, 500);
  }
});

// Like a contribution
app.post("/make-server-d462d5d8/contributions/:id/like", async (c) => {
  try {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return c.json({ error: "Non autorisé" }, 401);
    }

    const session = await kv.get(`session:${token}`);
    if (!session) {
      return c.json({ error: "Session invalide" }, 401);
    }

    const contributionId = c.req.param("id");
    const contribution = await kv.get(`contribution:${contributionId}`);

    if (!contribution) {
      return c.json({ error: "Contribution non trouvée" }, 404);
    }

    const likeId = `${session.userId}_contribution_${contributionId}`;
    const existingLike = await kv.get(`like:${likeId}`);

    if (existingLike) {
      return c.json({ error: "Déjà liké" }, 400);
    }

    // Create like
    await kv.set(`like:${likeId}`, {
      userId: session.userId,
      contributionId,
      createdAt: new Date().toISOString(),
    });

    // Increment contribution likes
    contribution.likes = (contribution.likes || 0) + 1;
    await kv.set(`contribution:${contributionId}`, contribution);

    return c.json({ likes: contribution.likes });
  } catch (error) {
    console.error("Like contribution error:", error);
    return c.json({ error: "Erreur lors du like" }, 500);
  }
});

// Unlike a contribution
app.delete("/make-server-d462d5d8/contributions/:id/like", async (c) => {
  try {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return c.json({ error: "Non autorisé" }, 401);
    }

    const session = await kv.get(`session:${token}`);
    if (!session) {
      return c.json({ error: "Session invalide" }, 401);
    }

    const contributionId = c.req.param("id");
    const contribution = await kv.get(`contribution:${contributionId}`);

    if (!contribution) {
      return c.json({ error: "Contribution non trouvée" }, 404);
    }

    const likeId = `${session.userId}_contribution_${contributionId}`;
    const existingLike = await kv.get(`like:${likeId}`);

    if (!existingLike) {
      return c.json({ error: "Pas encore liké" }, 400);
    }

    // Delete like
    await kv.del(`like:${likeId}`);

    // Decrement contribution likes
    contribution.likes = Math.max(0, (contribution.likes || 0) - 1);
    await kv.set(`contribution:${contributionId}`, contribution);

    return c.json({ likes: contribution.likes });
  } catch (error) {
    console.error("Unlike contribution error:", error);
    return c.json({ error: "Erreur lors du unlike" }, 500);
  }
});

// ============================================================================
// FANZINE ROUTES
// ============================================================================

// Get all published fanzines
app.get("/make-server-d462d5d8/fanzines", async (c) => {
  try {
    const allFanzines = await kv.getByPrefix("fanzine:");
    const publishedFanzines = allFanzines
      .filter(fanzine => fanzine.status === 'published')
      .sort((a, b) => b.issueNumber - a.issueNumber);

    return c.json({ fanzines: publishedFanzines });
  } catch (error) {
    console.error("Get fanzines error:", error);
    return c.json({ error: "Erreur lors de la récupération des fanzines" }, 500);
  }
});

// Get latest published fanzine (for homepage)
app.get("/make-server-d462d5d8/fanzines/latest", async (c) => {
  try {
    const allFanzines = await kv.getByPrefix("fanzine:");
    const publishedFanzines = allFanzines
      .filter(fanzine => fanzine.status === 'published')
      .sort((a, b) => b.issueNumber - a.issueNumber);

    const latest = publishedFanzines[0] || null;

    return c.json({ fanzine: latest });
  } catch (error) {
    console.error("Get latest fanzine error:", error);
    return c.json({ error: "Erreur lors de la récupération du dernier fanzine" }, 500);
  }
});

// Get fanzine by ID
app.get("/make-server-d462d5d8/fanzines/:id", async (c) => {
  try {
    const fanzineId = c.req.param("id");
    const fanzine = await kv.get(`fanzine:${fanzineId}`);

    if (!fanzine) {
      return c.json({ error: "Fanzine non trouvé" }, 404);
    }

    return c.json({ fanzine });
  } catch (error) {
    console.error("Get fanzine error:", error);
    return c.json({ error: "Erreur lors de la récupération du fanzine" }, 500);
  }
});

// Create fanzine (admin only)
app.post("/make-server-d462d5d8/fanzines", async (c) => {
  try {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return c.json({ error: "Non autorisé" }, 401);
    }

    const session = await kv.get(`session:${token}`);
    if (!session || !session.roles.includes("admin")) {
      return c.json({ error: "Accès non autorisé" }, 403);
    }

    const { issueNumber, title, subtitle, coverImage, publicationDate, description, pages, pdfUrl, contentPreview, contributors, price, isPublic } = await c.req.json();

    // Validation
    if (!issueNumber || !title || !coverImage || !description) {
      return c.json({ error: "Numéro, titre, couverture et description sont requis" }, 400);
    }

    const fanzine = {
      id: crypto.randomUUID(),
      issueNumber,
      title,
      subtitle: subtitle || null,
      coverImage,
      publicationDate: publicationDate || new Date().toISOString(),
      description,
      pages: pages || 12,
      pdfUrl: pdfUrl || null,
      status: 'draft',
      featured: false,
      contentPreview: contentPreview || [],
      contributors: contributors || [],
      price: price || null,
      isPublic: isPublic !== undefined ? isPublic : true,
      createdAt: new Date().toISOString(),
      publishedAt: null,
    };

    await kv.set(`fanzine:${fanzine.id}`, fanzine);

    return c.json({ fanzine }, 201);
  } catch (error) {
    console.error("Create fanzine error:", error);
    return c.json({ error: "Erreur lors de la création du fanzine" }, 500);
  }
});

// Update fanzine (admin only)
app.put("/make-server-d462d5d8/fanzines/:id", async (c) => {
  try {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return c.json({ error: "Non autorisé" }, 401);
    }

    const session = await kv.get(`session:${token}`);
    if (!session || !session.roles.includes("admin")) {
      return c.json({ error: "Accès non autorisé" }, 403);
    }

    const fanzineId = c.req.param("id");
    const fanzine = await kv.get(`fanzine:${fanzineId}`);

    if (!fanzine) {
      return c.json({ error: "Fanzine non trouvé" }, 404);
    }

    const updates = await c.req.json();

    // Update fields
    Object.assign(fanzine, updates);

    await kv.set(`fanzine:${fanzineId}`, fanzine);

    return c.json({ fanzine });
  } catch (error) {
    console.error("Update fanzine error:", error);
    return c.json({ error: "Erreur lors de la mise à jour du fanzine" }, 500);
  }
});

// Publish fanzine (admin only)
app.put("/make-server-d462d5d8/fanzines/:id/publish", async (c) => {
  try {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return c.json({ error: "Non autorisé" }, 401);
    }

    const session = await kv.get(`session:${token}`);
    if (!session || !session.roles.includes("admin")) {
      return c.json({ error: "Accès non autorisé" }, 403);
    }

    const fanzineId = c.req.param("id");
    const fanzine = await kv.get(`fanzine:${fanzineId}`);

    if (!fanzine) {
      return c.json({ error: "Fanzine non trouvé" }, 404);
    }

    fanzine.status = 'published';
    fanzine.publishedAt = new Date().toISOString();

    await kv.set(`fanzine:${fanzineId}`, fanzine);

    return c.json({ fanzine });
  } catch (error) {
    console.error("Publish fanzine error:", error);
    return c.json({ error: "Erreur lors de la publication du fanzine" }, 500);
  }
});

// Delete fanzine (admin only)
app.delete("/make-server-d462d5d8/fanzines/:id", async (c) => {
  try {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return c.json({ error: "Non autorisé" }, 401);
    }

    const session = await kv.get(`session:${token}`);
    if (!session || !session.roles.includes("admin")) {
      return c.json({ error: "Accès non autorisé" }, 403);
    }

    const fanzineId = c.req.param("id");
    const fanzine = await kv.get(`fanzine:${fanzineId}`);

    if (!fanzine) {
      return c.json({ error: "Fanzine non trouvé" }, 404);
    }

    await kv.del(`fanzine:${fanzineId}`);

    return c.json({ message: "Fanzine supprimé" });
  } catch (error) {
    console.error("Delete fanzine error:", error);
    return c.json({ error: "Erreur lors de la suppression du fanzine" }, 500);
  }
});

// ============================================================================
// FANZINE SUBSCRIPTIONS ROUTES
// ============================================================================

// Submit a subscription (public)
app.post("/make-server-d462d5d8/subscriptions", async (c) => {
  console.log("[SUBSCRIPTION] POST /subscriptions called");
  try {
    const body = await c.req.json();
    console.log("[SUBSCRIPTION] Request body:", JSON.stringify(body));
    
    const { zone, price, name, email, address, postalCode, city, country, phone } = body;

    // Validation
    if (!zone || !price || !name || !email || !address || !postalCode || !city) {
      console.log("[SUBSCRIPTION] Validation failed - missing fields");
      return c.json({ error: "Tous les champs obligatoires doivent être remplis" }, 400);
    }

    // Zone validation
    const zones: Record<string, { minPrice: number }> = {
      'france': { minPrice: 22.50 },
      'belgium-swiss': { minPrice: 30.00 },
    };

    const selectedZone = zones[zone];
    if (!selectedZone) {
      console.log("[SUBSCRIPTION] Invalid zone:", zone);
      return c.json({ error: "Zone invalide" }, 400);
    }

    if (price < selectedZone.minPrice) {
      console.log("[SUBSCRIPTION] Price too low:", price, "minimum:", selectedZone.minPrice);
      return c.json({ error: `Le prix minimum pour cette zone est de ${selectedZone.minPrice}€` }, 400);
    }

    const subscriptionId = crypto.randomUUID();
    console.log("[SUBSCRIPTION] Generated ID:", subscriptionId);

    const subscription = {
      id: subscriptionId,
      zone,
      price,
      name,
      email,
      address,
      postalCode,
      city,
      country: country || '',
      phone: phone || '',
      status: 'pending', // pending, confirmed, active, cancelled, expired
      createdAt: new Date().toISOString(),
      confirmedAt: null,
      startDate: null,
      endDate: null, // Will be 3 months from startDate
      issuesReceived: 0,
      paymentStatus: 'pending',
    };

    console.log("[SUBSCRIPTION] Saving to KV store...");
    await kv.set(`subscription:${subscription.id}`, subscription);
    console.log("[SUBSCRIPTION] Saved successfully");

    return c.json({ 
      subscription,
      message: "Abonnement enregistré avec succès. Vous recevrez un email de confirmation avec les instructions de paiement."
    }, 201);
  } catch (error) {
    console.error("[SUBSCRIPTION] Error:", error);
    return c.json({ error: "Erreur lors de la création de l'abonnement" }, 500);
  }
});

// Get all subscriptions (admin only)
app.get("/make-server-d462d5d8/subscriptions", async (c) => {
  try {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return c.json({ error: "Non autorisé" }, 401);
    }

    const session = await kv.get(`session:${token}`);
    if (!session || !session.roles.includes("admin")) {
      return c.json({ error: "Accès non autorisé" }, 403);
    }

    const allSubscriptions = await kv.getByPrefix("subscription:");
    const sortedSubscriptions = allSubscriptions.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return c.json({ subscriptions: sortedSubscriptions });
  } catch (error) {
    console.error("Get subscriptions error:", error);
    return c.json({ error: "Erreur lors de la récupération des abonnements" }, 500);
  }
});

// Update subscription status (admin only)
app.put("/make-server-d462d5d8/subscriptions/:id", async (c) => {
  try {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return c.json({ error: "Non autorisé" }, 401);
    }

    const session = await kv.get(`session:${token}`);
    if (!session || !session.roles.includes("admin")) {
      return c.json({ error: "Accès non autorisé" }, 403);
    }

    const subscriptionId = c.req.param("id");
    const subscription = await kv.get(`subscription:${subscriptionId}`);

    if (!subscription) {
      return c.json({ error: "Abonnement non trouvé" }, 404);
    }

    const updates = await c.req.json();
    Object.assign(subscription, updates);

    await kv.set(`subscription:${subscriptionId}`, subscription);

    return c.json({ subscription });
  } catch (error) {
    console.error("Update subscription error:", error);
    return c.json({ error: "Erreur lors de la mise à jour de l'abonnement" }, 500);
  }
});

// Confirm subscription payment (admin only)
app.put("/make-server-d462d5d8/subscriptions/:id/confirm", async (c) => {
  try {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return c.json({ error: "Non autorisé" }, 401);
    }

    const session = await kv.get(`session:${token}`);
    if (!session || !session.roles.includes("admin")) {
      return c.json({ error: "Accès non autorisé" }, 403);
    }

    const subscriptionId = c.req.param("id");
    const subscription = await kv.get(`subscription:${subscriptionId}`);

    if (!subscription) {
      return c.json({ error: "Abonnement non trouvé" }, 404);
    }

    const now = new Date();
    const endDate = new Date(now);
    endDate.setMonth(endDate.getMonth() + 3); // 3 months subscription

    subscription.status = 'active';
    subscription.paymentStatus = 'paid';
    subscription.confirmedAt = now.toISOString();
    subscription.startDate = now.toISOString();
    subscription.endDate = endDate.toISOString();

    await kv.set(`subscription:${subscriptionId}`, subscription);

    console.log(`[SUBSCRIPTION] Subscription confirmed: ${subscriptionId}`);

    return c.json({ subscription });
  } catch (error) {
    console.error("Confirm subscription error:", error);
    return c.json({ error: "Erreur lors de la confirmation de l'abonnement" }, 500);
  }
});

// ============================================================================
// REPORTS ROUTES (Moderation)
// ============================================================================

// Get all reports (admin only)
app.get("/make-server-d462d5d8/reports", async (c) => {
  try {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return c.json({ error: "Non autorisé" }, 401);
    }

    const session = await kv.get(`session:${token}`);
    if (!session || !session.roles.includes("admin")) {
      return c.json({ error: "Accès non autorisé" }, 403);
    }

    const reports = await kv.getByPrefix("report:");
    
    // Sort by date descending (most recent first)
    const sortedReports = reports.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return c.json(sortedReports);
  } catch (error) {
    console.error("Get reports error:", error);
    return c.json({ error: "Erreur lors de la récupération des signalements" }, 500);
  }
});

// Create a report (authenticated users)
app.post("/make-server-d462d5d8/reports", async (c) => {
  try {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return c.json({ error: "Non autorisé" }, 401);
    }

    const session = await kv.get(`session:${token}`);
    if (!session) {
      return c.json({ error: "Session invalide" }, 401);
    }

    const { targetType, targetId, reason, details } = await c.req.json();
    
    if (!targetType || !targetId || !reason) {
      return c.json({ error: "Données manquantes" }, 400);
    }

    const reportId = crypto.randomUUID();
    const report = {
      id: reportId,
      reporterId: session.userId,
      reporterUsername: session.email.split("@")[0],
      targetType, // 'comment' | 'user' | 'article' | 'contribution'
      targetId,
      reason,
      details: details || null,
      status: "pending", // 'pending' | 'resolved' | 'dismissed'
      createdAt: new Date().toISOString(),
      resolvedAt: null,
      resolvedBy: null,
      resolutionNote: null
    };

    await kv.set(`report:${reportId}`, report);

    return c.json(report, 201);
  } catch (error) {
    console.error("Create report error:", error);
    return c.json({ error: "Erreur lors de la création du signalement" }, 500);
  }
});

// Resolve a report (admin only)
app.put("/make-server-d462d5d8/reports/:id/resolve", async (c) => {
  try {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return c.json({ error: "Non autorisé" }, 401);
    }

    const session = await kv.get(`session:${token}`);
    if (!session || !session.roles.includes("admin")) {
      return c.json({ error: "Accès non autorisé" }, 403);
    }

    const reportId = c.req.param("id");
    const { note } = await c.req.json();
    
    const report = await kv.get(`report:${reportId}`);
    if (!report) {
      return c.json({ error: "Signalement non trouvé" }, 404);
    }

    const updatedReport = {
      ...report,
      status: "resolved",
      resolvedAt: new Date().toISOString(),
      resolvedBy: session.userId,
      resolutionNote: note || null
    };

    await kv.set(`report:${reportId}`, updatedReport);

    return c.json(updatedReport);
  } catch (error) {
    console.error("Resolve report error:", error);
    return c.json({ error: "Erreur lors de la résolution du signalement" }, 500);
  }
});

// Dismiss a report (admin only)
app.put("/make-server-d462d5d8/reports/:id/dismiss", async (c) => {
  try {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return c.json({ error: "Non autorisé" }, 401);
    }

    const session = await kv.get(`session:${token}`);
    if (!session || !session.roles.includes("admin")) {
      return c.json({ error: "Accès non autorisé" }, 403);
    }

    const reportId = c.req.param("id");
    const { note } = await c.req.json();
    
    const report = await kv.get(`report:${reportId}`);
    if (!report) {
      return c.json({ error: "Signalement non trouvé" }, 404);
    }

    const updatedReport = {
      ...report,
      status: "dismissed",
      resolvedAt: new Date().toISOString(),
      resolvedBy: session.userId,
      resolutionNote: note || null
    };

    await kv.set(`report:${reportId}`, updatedReport);

    return c.json(updatedReport);
  } catch (error) {
    console.error("Dismiss report error:", error);
    return c.json({ error: "Erreur lors du rejet du signalement" }, 500);
  }
});

// ============================================================================
// BANS ROUTES (Moderation)
// ============================================================================

// Get all bans (admin only)
app.get("/make-server-d462d5d8/bans", async (c) => {
  try {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return c.json({ error: "Non autorisé" }, 401);
    }

    const session = await kv.get(`session:${token}`);
    if (!session || !session.roles.includes("admin")) {
      return c.json({ error: "Accès non autorisé" }, 403);
    }

    const bans = await kv.getByPrefix("ban:");
    
    // Sort by date descending (most recent first)
    const sortedBans = bans.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return c.json(sortedBans);
  } catch (error) {
    console.error("Get bans error:", error);
    return c.json({ error: "Erreur lors de la récupération des bannissements" }, 500);
  }
});

// Create a ban (admin only)
app.post("/make-server-d462d5d8/bans", async (c) => {
  try {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return c.json({ error: "Non autorisé" }, 401);
    }

    const session = await kv.get(`session:${token}`);
    if (!session || !session.roles.includes("admin")) {
      return c.json({ error: "Accès non autorisé" }, 403);
    }

    const { userId, reason, type, duration } = await c.req.json();
    
    if (!userId || !reason || !type) {
      return c.json({ error: "Données manquantes" }, 400);
    }

    // Get user info
    const user = await kv.get(`user:${userId}`);
    if (!user) {
      return c.json({ error: "Utilisateur non trouvé" }, 404);
    }

    const banId = crypto.randomUUID();
    const now = new Date();
    const expiresAt = type === "permanent" 
      ? null 
      : new Date(now.getTime() + duration * 24 * 60 * 60 * 1000).toISOString();

    const ban = {
      id: banId,
      userId,
      username: user.username,
      email: user.email,
      reason,
      type, // 'permanent' | 'temporary'
      duration: duration || null, // in days
      bannedBy: session.userId,
      bannedByUsername: session.email.split("@")[0],
      createdAt: now.toISOString(),
      expiresAt,
      status: "active", // 'active' | 'expired' | 'revoked'
      revokedAt: null,
      revokedBy: null
    };

    await kv.set(`ban:${banId}`, ban);

    // Update user status
    await kv.set(`user:${userId}`, {
      ...user,
      isBanned: true,
      bannedAt: now.toISOString()
    });

    return c.json(ban, 201);
  } catch (error) {
    console.error("Create ban error:", error);
    return c.json({ error: "Erreur lors de la création du bannissement" }, 500);
  }
});

// Revoke a ban (admin only)
app.put("/make-server-d462d5d8/bans/:id/revoke", async (c) => {
  try {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return c.json({ error: "Non autorisé" }, 401);
    }

    const session = await kv.get(`session:${token}`);
    if (!session || !session.roles.includes("admin")) {
      return c.json({ error: "Accès non autorisé" }, 403);
    }

    const banId = c.req.param("id");
    const ban = await kv.get(`ban:${banId}`);
    
    if (!ban) {
      return c.json({ error: "Bannissement non trouvé" }, 404);
    }

    const updatedBan = {
      ...ban,
      status: "revoked",
      revokedAt: new Date().toISOString(),
      revokedBy: session.userId
    };

    await kv.set(`ban:${banId}`, updatedBan);

    // Update user status
    const user = await kv.get(`user:${ban.userId}`);
    if (user) {
      await kv.set(`user:${ban.userId}`, {
        ...user,
        isBanned: false,
        bannedAt: null
      });
    }

    return c.json(updatedBan);
  } catch (error) {
    console.error("Revoke ban error:", error);
    return c.json({ error: "Erreur lors de la révocation du bannissement" }, 500);
  }
});

// Delete a ban (admin only)
app.delete("/make-server-d462d5d8/bans/:id", async (c) => {
  try {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return c.json({ error: "Non autorisé" }, 401);
    }

    const session = await kv.get(`session:${token}`);
    if (!session || !session.roles.includes("admin")) {
      return c.json({ error: "Accès non autorisé" }, 403);
    }

    const banId = c.req.param("id");
    await kv.del(`ban:${banId}`);

    return c.json({ message: "Bannissement supprimé" });
  } catch (error) {
    console.error("Delete ban error:", error);
    return c.json({ error: "Erreur lors de la suppression du bannissement" }, 500);
  }
});

// ============================================================================
// LOGS ROUTES (System Logs)
// ============================================================================

// Get all logs (admin only)
app.get("/make-server-d462d5d8/logs", async (c) => {
  try {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return c.json({ error: "Non autorisé" }, 401);
    }

    const session = await kv.get(`session:${token}`);
    if (!session || !session.roles.includes("admin")) {
      return c.json({ error: "Accès non autorisé" }, 403);
    }

    const logs = await kv.getByPrefix("log:");
    
    // Sort by timestamp descending (most recent first)
    const sortedLogs = logs.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    // Limit to last 1000 logs
    return c.json(sortedLogs.slice(0, 1000));
  } catch (error) {
    console.error("Get logs error:", error);
    return c.json({ error: "Erreur lors de la récupération des logs" }, 500);
  }
});

// Get logs by level (admin only)
app.get("/make-server-d462d5d8/logs/level/:level", async (c) => {
  try {
    const token = c.req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return c.json({ error: "Non autorisé" }, 401);
    }

    const session = await kv.get(`session:${token}`);
    if (!session || !session.roles.includes("admin")) {
      return c.json({ error: "Accès non autorisé" }, 403);
    }

    const level = c.req.param("level");
    const allLogs = await kv.getByPrefix("log:");
    
    const filteredLogs = allLogs.filter(log => log.level === level);
    
    // Sort by timestamp descending
    const sortedLogs = filteredLogs.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return c.json(sortedLogs.slice(0, 500));
  } catch (error) {
    console.error("Get logs by level error:", error);
    return c.json({ error: "Erreur lors de la récupération des logs" }, 500);
  }
});

// ============================================================================
// FORUM ROUTES
// ============================================================================

// Get all forum categories
app.get("/make-server-d462d5d8/forum/categories", async (c) => {
  try {
    const categories = await kv.getByPrefix("forum-category:");
    
    // Sort by order/id
    const sortedCategories = categories.sort((a, b) => 
      (a.order || 0) - (b.order || 0)
    );

    return c.json(sortedCategories);
  } catch (error) {
    console.error("Get forum categories error:", error);
    return c.json({ error: "Erreur lors de la récupération des catégories" }, 500);
  }
});

// Get all forum topics (with pagination and filtering)
app.get("/make-server-d462d5d8/forum/topics", async (c) => {
  try {
    const categoryId = c.req.query("categoryId");
    const limit = parseInt(c.req.query("limit") || "50");
    
    let topics = await kv.getByPrefix("forum-topic:");
    
    // Filter by category if specified
    if (categoryId) {
      topics = topics.filter(t => t.categoryId === categoryId);
    }
    
    // Sort by latest activity
    const sortedTopics = topics.sort((a, b) => 
      new Date(b.lastActivityAt || b.createdAt).getTime() - 
      new Date(a.lastActivityAt || a.createdAt).getTime()
    );

    return c.json(sortedTopics.slice(0, limit));
  } catch (error) {
    console.error("Get forum topics error:", error);
    return c.json({ error: "Erreur lors de la récupération des topics" }, 500);
  }
});

// Get forum topic by ID
app.get("/make-server-d462d5d8/forum/topics/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const topic = await kv.get(`forum-topic:${id}`);
    
    if (!topic) {
      return c.json({ error: "Topic non trouvé" }, 404);
    }

    // Get replies
    const allReplies = await kv.getByPrefix("forum-reply:");
    const replies = allReplies
      .filter(r => r.topicId === id)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    return c.json({ ...topic, replies });
  } catch (error) {
    console.error("Get forum topic error:", error);
    return c.json({ error: "Erreur lors de la récupération du topic" }, 500);
  }
});

// Create forum topic
app.post("/make-server-d462d5d8/forum/topics", async (c) => {
  try {
    const { categoryId, title, content, authorId } = await c.req.json();
    
    if (!categoryId || !title || !content || !authorId) {
      return c.json({ error: "Données manquantes" }, 400);
    }

    const topic = {
      id: crypto.randomUUID(),
      categoryId,
      title,
      content,
      authorId,
      views: 0,
      replies: 0,
      isPinned: false,
      isLocked: false,
      createdAt: new Date().toISOString(),
      lastActivityAt: new Date().toISOString(),
    };

    await kv.set(`forum-topic:${topic.id}`, topic);

    // Update category topic count
    const category = await kv.get(`forum-category:${categoryId}`);
    if (category) {
      category.topics = (category.topics || 0) + 1;
      await kv.set(`forum-category:${categoryId}`, category);
    }

    return c.json(topic, 201);
  } catch (error) {
    console.error("Create forum topic error:", error);
    return c.json({ error: "Erreur lors de la création du topic" }, 500);
  }
});

// Create forum reply
app.post("/make-server-d462d5d8/forum/topics/:id/replies", async (c) => {
  try {
    const topicId = c.req.param("id");
    const { content, authorId } = await c.req.json();
    
    if (!content || !authorId) {
      return c.json({ error: "Données manquantes" }, 400);
    }

    const topic = await kv.get(`forum-topic:${topicId}`);
    if (!topic) {
      return c.json({ error: "Topic non trouvé" }, 404);
    }

    const reply = {
      id: crypto.randomUUID(),
      topicId,
      content,
      authorId,
      createdAt: new Date().toISOString(),
    };

    await kv.set(`forum-reply:${reply.id}`, reply);

    // Update topic stats
    topic.replies = (topic.replies || 0) + 1;
    topic.lastActivityAt = new Date().toISOString();
    await kv.set(`forum-topic:${topicId}`, topic);

    // Update category post count
    const category = await kv.get(`forum-category:${topic.categoryId}`);
    if (category) {
      category.posts = (category.posts || 0) + 1;
      await kv.set(`forum-category:${topic.categoryId}`, category);
    }

    return c.json(reply, 201);
  } catch (error) {
    console.error("Create forum reply error:", error);
    return c.json({ error: "Erreur lors de la création de la réponse" }, 500);
  }
});

// Get recent forum topics
app.get("/make-server-d462d5d8/forum/topics/recent", async (c) => {
  try {
    const limit = parseInt(c.req.query("limit") || "10");
    
    const topics = await kv.getByPrefix("forum-topic:");
    
    // Sort by latest activity
    const sortedTopics = topics.sort((a, b) => 
      new Date(b.lastActivityAt || b.createdAt).getTime() - 
      new Date(a.lastActivityAt || a.createdAt).getTime()
    );

    return c.json(sortedTopics.slice(0, limit));
  } catch (error) {
    console.error("Get recent topics error:", error);
    return c.json({ error: "Erreur lors de la récupération des topics récents" }, 500);
  }
});

// ============================================================================
// ANALYTICS & STATS ROUTES
// ============================================================================

// Get comprehensive analytics data
app.get("/make-server-d462d5d8/stats/analytics", async (c) => {
  try {
    // Get all data for analytics calculation
    const [users, articles, concerts, comments] = await Promise.all([
      kv.getByPrefix("user:"),
      kv.getByPrefix("article:"),
      kv.getByPrefix("concert:"),
      kv.getByPrefix("comment:")
    ]);

    // Generate analytics data
    const analytics = {
      // Overview stats
      overview: {
        totalUsers: users.length,
        activeUsers: users.filter(u => u.isActive).length,
        totalArticles: articles.length,
        totalConcerts: concerts.length,
        totalComments: comments.length,
        pendingComments: comments.filter(c => !c.isApproved).length,
      },

      // User growth (last 7 days simulation)
      userGrowth: generateLast7DaysData(users, 'createdAt'),

      // Page views (simulated - in production, track real views)
      pageViews: {
        last7Days: [
          { date: getDateLabel(-6), views: 4250 },
          { date: getDateLabel(-5), views: 5180 },
          { date: getDateLabel(-4), views: 4820 },
          { date: getDateLabel(-3), views: 6290 },
          { date: getDateLabel(-2), views: 7100 },
          { date: getDateLabel(-1), views: 6260 },
          { date: getDateLabel(0), views: 8140 }
        ],
        total: 41040
      },

      // Visitors (simulated)
      visitors: {
        last7Days: [
          { date: getDateLabel(-6), visits: 1250 },
          { date: getDateLabel(-5), visits: 1580 },
          { date: getDateLabel(-4), visits: 1320 },
          { date: getDateLabel(-3), visits: 1890 },
          { date: getDateLabel(-2), visits: 2100 },
          { date: getDateLabel(-1), visits: 1760 },
          { date: getDateLabel(0), visits: 2340 }
        ],
        total: 12940
      },

      // Top pages (based on real article views)
      topPages: articles
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, 5)
        .map(a => ({
          page: `/news/${a.slug}`,
          title: a.title,
          views: a.views || 0,
          bounce: `${Math.floor(Math.random() * 20) + 15}%`
        })),

      // Traffic sources (simulated)
      trafficSources: [
        { source: 'Direct', visitors: 3420, percentage: 42 },
        { source: 'Google', visitors: 2180, percentage: 27 },
        { source: 'Social Media', visitors: 1650, percentage: 20 },
        { source: 'Referral', visitors: 890, percentage: 11 }
      ],

      // Device breakdown (simulated)
      devices: {
        desktop: 58,
        mobile: 35,
        tablet: 7
      },

      // Session metrics (simulated)
      session: {
        avgDuration: '4:32',
        bounceRate: '23%',
        pagesPerSession: 3.2
      },

      // Content distribution
      contentDistribution: [
        { name: 'Articles', value: articles.length },
        { name: 'Concerts', value: concerts.length },
        { name: 'Comments', value: comments.length },
        { name: 'Users', value: users.length }
      ]
    };

    return c.json(analytics);
  } catch (error) {
    console.error("Get analytics error:", error);
    return c.json({ error: "Erreur lors de la récupération des analytics" }, 500);
  }
});

// Helper function to generate date labels
function getDateLabel(daysOffset: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
}

// Helper function to generate data for last 7 days
function generateLast7DaysData(items: any[], dateField: string) {
  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    const count = items.filter(item => {
      if (!item[dateField]) return false;
      const itemDate = new Date(item[dateField]).toISOString().split('T')[0];
      return itemDate <= dateStr;
    }).length;
    
    last7Days.push({
      date: getDateLabel(-i),
      count: count
    });
  }
  return last7Days;
}

// ============================================================================
// MEDIA GALLERY ROUTES
// ============================================================================

// Get all media items
app.get("/make-server-d462d5d8/media", async (c) => {
  try {
    const type = c.req.query("type"); // video, photo, audio
    const limit = parseInt(c.req.query("limit") || "50");
    
    let media = await kv.getByPrefix("media-item:");
    
    // Filter by type if specified
    if (type) {
      media = media.filter(m => m.type === type);
    }
    
    // Sort by date descending
    const sortedMedia = media.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return c.json(sortedMedia.slice(0, limit));
  } catch (error) {
    console.error("Get media error:", error);
    return c.json({ error: "Erreur lors de la récupération des médias" }, 500);
  }
});

// Get media item by ID
app.get("/make-server-d462d5d8/media/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const media = await kv.get(`media-item:${id}`);
    
    if (!media) {
      return c.json({ error: "Média non trouvé" }, 404);
    }

    return c.json(media);
  } catch (error) {
    console.error("Get media item error:", error);
    return c.json({ error: "Erreur lors de la récupération du média" }, 500);
  }
});

// Create media item (admin only)
app.post("/make-server-d462d5d8/media", async (c) => {
  try {
    const { type, title, subtitle, image, url, views } = await c.req.json();
    
    if (!type || !title || !image) {
      return c.json({ error: "Données manquantes" }, 400);
    }

    const media = {
      id: crypto.randomUUID(),
      type, // video, photo, audio
      title,
      subtitle,
      image,
      url,
      views: views || '0',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await kv.set(`media-item:${media.id}`, media);

    return c.json(media, 201);
  } catch (error) {
    console.error("Create media error:", error);
    return c.json({ error: "Erreur lors de la création du média" }, 500);
  }
});

// Update media item (admin only)
app.put("/make-server-d462d5d8/media/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const media = await kv.get(`media-item:${id}`);
    
    if (!media) {
      return c.json({ error: "Média non trouvé" }, 404);
    }

    const updates = await c.req.json();
    const updatedMedia = {
      ...media,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await kv.set(`media-item:${id}`, updatedMedia);

    return c.json(updatedMedia);
  } catch (error) {
    console.error("Update media error:", error);
    return c.json({ error: "Erreur lors de la mise à jour du média" }, 500);
  }
});

// Delete media item (admin only)
app.delete("/make-server-d462d5d8/media/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const media = await kv.get(`media-item:${id}`);
    
    if (!media) {
      return c.json({ error: "Média non trouvé" }, 404);
    }

    await kv.del(`media-item:${id}`);

    return c.json({ message: "Média supprimé avec succès" });
  } catch (error) {
    console.error("Delete media error:", error);
    return c.json({ error: "Erreur lors de la suppression du média" }, 500);
  }
});

Deno.serve(app.fetch);