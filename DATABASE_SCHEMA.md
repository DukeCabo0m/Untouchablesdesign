# 🗄️ SCHÉMA COMPLET DE LA BASE DE DONNÉES - UNTOUCHABLES

## 📋 Table des matières
1. [Vue d'ensemble](#vue-densemble)
2. [Entités](#entités)
3. [Relations](#relations)
4. [Index et Clés](#index-et-clés)
5. [Endpoints API](#endpoints-api)

---

## Vue d'ensemble

**Type de base de données :** Key-Value Store (Supabase)  
**Préfixe des clés :** `entity:id`  
**Nombre total d'entités :** 11 entités principales  
**Nombre d'endpoints API :** 38+ endpoints REST

### Structure générale des clés
```
user:{userId}
session:{sessionToken}
article:{articleId}
category:{categoryId}
tag:{tagId}
album:{albumId}
single:{singleId}
member:{memberId}
concert:{concertId}
comment:{commentId}
contact:{contactId}
like:{likeId}
activity:{activityId}
```

---

## Entités

### 1. 👤 USER (Utilisateur)
**Clé :** `user:{userId}`

```typescript
{
  id: string;                    // UUID unique
  username: string;              // Pseudonyme (min 3 caractères, unique)
  email: string;                 // Email (unique, format valide)
  password: string;              // Mot de passe (min 8 caractères) - À hasher en production
  role: string;                  // "user" par défaut
  roles: string[];               // ["ROLE_USER"] ou ["ROLE_ADMIN", "ROLE_USER"]
  avatar: string | null;         // URL de l'avatar
  bio: string | null;            // Biographie (max 500 caractères)
  location: string | null;       // "Ville, Pays"
  department: string | null;     // Code département français (ex: "75", "69")
  website: string | null;        // URL du site web
  facebookUrl: string | null;    // URL profil Facebook ou @username
  twitterUrl: string | null;     // URL profil Twitter/X ou @username
  instagramUrl: string | null;   // URL profil Instagram ou @username
  tiktokUrl: string | null;      // URL profil TikTok ou @username
  birthdate: string | null;      // Date de naissance ISO 8601
  isActive: boolean;             // Compte actif (true/false)
  isBanned: boolean;             // Compte banni (true/false)
  isVerified: boolean;           // Email vérifié (true/false)
  createdAt: string;             // Date création ISO 8601
  updatedAt: string;             // Date dernière modification ISO 8601
  lastLoginAt: string | null;    // Date dernière connexion ISO 8601
}
```

**Contraintes :**
- `username` : unique, min 3 caractères, case-insensitive
- `email` : unique, format email valide, case-insensitive
- `password` : min 8 caractères
- `bio` : max 500 caractères
- `roles` : tableau contenant au moins "ROLE_USER"

**Valeurs par défaut :**
- `role` : "user"
- `roles` : ["ROLE_USER"]
- `isActive` : true
- `isBanned` : false
- `isVerified` : false

---

### 2. 🔐 SESSION (Session utilisateur)
**Clé :** `session:{sessionToken}`

```typescript
{
  userId: string;      // UUID de l'utilisateur
  email: string;       // Email de l'utilisateur
  role: string;        // Rôle principal ("user" ou "admin")
  roles: string[];     // Tous les rôles de l'utilisateur
  createdAt: string;   // Date création de la session ISO 8601
}
```

**Notes :**
- Session token généré via `crypto.randomUUID()`
- Session supprimée lors du logout
- Utilisé pour l'authentification via header `Authorization: Bearer {token}`

---

### 3. 📰 ARTICLE (Article / Actualité)
**Clé :** `article:{articleId}`

```typescript
{
  id: string;                 // UUID unique
  title: string;              // Titre de l'article (requis)
  slug: string;               // Slug URL-friendly (unique)
  content: string;            // Contenu HTML de l'article
  excerpt: string | null;     // Extrait/résumé court
  coverImage: string | null;  // URL de l'image de couverture
  category: string;           // Catégorie ("news", "interview", "chronique", etc.)
  tags: string[];             // Tableau de tags
  authorId: string;           // UUID de l'auteur (référence User)
  isPublished: boolean;       // Article publié (true/false)
  isFeatured: boolean;        // Article mis en avant (true/false)
  publishedAt: string | null; // Date de publication ISO 8601
  viewCount: number;          // Nombre de vues
  createdAt: string;          // Date création ISO 8601
  updatedAt: string;          // Date dernière modification ISO 8601
}
```

**Contraintes :**
- `slug` : unique, généré depuis le titre
- `authorId` : doit référencer un utilisateur existant
- `tags` : tableau (peut être vide)
- `viewCount` : nombre >= 0

**Valeurs par défaut :**
- `isPublished` : false
- `isFeatured` : false
- `viewCount` : 0
- `tags` : []

---

### 4. 🏷️ CATEGORY (Catégorie)
**Clé :** `category:{categoryId}`

```typescript
{
  id: string;          // UUID unique
  name: string;        // Nom de la catégorie (unique)
  slug: string;        // Slug URL-friendly (unique)
  description: string; // Description de la catégorie
  color: string;       // Couleur hex (ex: "#8B0000")
  isActive: boolean;   // Catégorie active (true/false)
  createdAt: string;   // Date création ISO 8601
  updatedAt: string;   // Date dernière modification ISO 8601
}
```

**Contraintes :**
- `name` : unique
- `slug` : unique
- `color` : format hex (#RRGGBB)

**Valeurs par défaut :**
- `isActive` : true

**Catégories par défaut :**
- News
- Interview
- Chronique
- Critique d'album
- Vidéos
- Live Reports

---

### 5. 🔖 TAG (Tag)
**Clé :** `tag:{tagId}`

```typescript
{
  id: string;          // UUID unique
  name: string;        // Nom du tag (unique)
  slug: string;        // Slug URL-friendly (unique)
  description: string; // Description du tag
  color: string;       // Couleur hex (ex: "#8B0000")
  isActive: boolean;   // Tag actif (true/false)
  createdAt: string;   // Date création ISO 8601
  updatedAt: string;   // Date dernière modification ISO 8601
}
```

**Contraintes :**
- `name` : unique
- `slug` : unique
- `color` : format hex (#RRGGBB)

**Valeurs par défaut :**
- `isActive` : true

---

### 6. 💿 ALBUM (Album studio/live/compilation)
**Clé :** `album:{albumId}`

```typescript
{
  id: string;                  // UUID unique
  title: string;               // Titre de l'album (requis)
  slug: string;                // Slug URL-friendly (unique)
  type: string;                // Type : "album", "live", "compilation"
  releaseDate: string;         // Date de sortie ISO 8601 (YYYY-MM-DD)
  coverImage: string | null;   // URL de la pochette
  label: string | null;        // Label/maison de disques
  producer: string | null;     // Producteur(s)
  description: string | null;  // Description de l'album
  tracks: Array<{              // Liste des pistes
    number: number;            // Numéro de piste
    title: string;             // Titre de la piste
    duration: string;          // Durée "MM:SS"
  }>;
  certifications: string[];    // Certifications (ex: ["Platinum", "Gold"])
  spotifyUrl: string | null;   // Lien Spotify
  appleMusicUrl: string | null;// Lien Apple Music
  deezerUrl: string | null;    // Lien Deezer
  youtubeUrl: string | null;   // Lien YouTube
  createdAt: string;           // Date création ISO 8601
  updatedAt: string;           // Date dernière modification ISO 8601
}
```

**Contraintes :**
- `slug` : unique
- `type` : "album" | "live" | "compilation"
- `releaseDate` : format ISO 8601 (YYYY-MM-DD)
- `tracks` : tableau d'objets avec number, title, duration

**Valeurs par défaut :**
- `tracks` : []
- `certifications` : []

---

### 7. 🎵 SINGLE (Single / EP)
**Clé :** `single:{singleId}`

```typescript
{
  id: string;                  // UUID unique
  title: string;               // Titre du single (requis)
  slug: string;                // Slug URL-friendly (unique)
  type: string;                // Type : "single", "ep"
  releaseDate: string;         // Date de sortie ISO 8601 (YYYY-MM-DD)
  coverImage: string | null;   // URL de la pochette
  albumId: string | null;      // UUID de l'album parent (référence Album)
  label: string | null;        // Label/maison de disques
  producer: string | null;     // Producteur(s)
  description: string | null;  // Description du single
  tracks: Array<{              // Liste des pistes
    number: number;            // Numéro de piste
    title: string;             // Titre de la piste
    duration: string;          // Durée "MM:SS"
  }>;
  spotifyUrl: string | null;   // Lien Spotify
  appleMusicUrl: string | null;// Lien Apple Music
  deezerUrl: string | null;    // Lien Deezer
  youtubeUrl: string | null;   // Lien YouTube
  createdAt: string;           // Date création ISO 8601
  updatedAt: string;           // Date dernière modification ISO 8601
}
```

**Contraintes :**
- `slug` : unique
- `type` : "single" | "ep"
- `releaseDate` : format ISO 8601 (YYYY-MM-DD)
- `albumId` : optionnel, référence un album

**Valeurs par défaut :**
- `tracks` : []

---

### 8. 🎸 MEMBER (Membre du groupe)
**Clé :** `member:{memberId}`

```typescript
{
  id: string;              // UUID unique
  name: string;            // Nom complet (requis)
  slug: string;            // Slug URL-friendly (unique)
  role: string;            // Rôle dans le groupe (ex: "Vocals", "Guitar")
  isCurrent: boolean;      // Membre actuel du groupe (true/false)
  joinDate: string | null; // Date d'arrivée YYYY-MM-DD
  leaveDate: string | null;// Date de départ YYYY-MM-DD
  bio: string | null;      // Biographie
  birthdate: string | null;// Date de naissance ISO 8601
  birthplace: string | null; // Lieu de naissance
  image: string | null;    // URL de la photo
  createdAt: string;       // Date création ISO 8601
  updatedAt: string;       // Date dernière modification ISO 8601
}
```

**Contraintes :**
- `slug` : unique
- `isCurrent` : true pour membres actuels, false pour anciens
- `joinDate` / `leaveDate` : format YYYY-MM-DD

**Valeurs par défaut :**
- `isCurrent` : true

**Membres actuels (2026) :**
- Jonathan Davis (Vocals)
- James "Munky" Shaffer (Guitar)
- Brian "Head" Welch (Guitar)
- Reginald "Fieldy" Arvizu (Bass)
- Ray Luzier (Drums)

---

### 9. 🎤 CONCERT (Concert / Tournée)
**Clé :** `concert:{concertId}`

```typescript
{
  id: string;              // UUID unique
  date: string;            // Date et heure du concert ISO 8601
  venue: string;           // Nom de la salle/lieu (requis)
  city: string;            // Ville (requis)
  country: string;         // Pays (requis)
  tour: string | null;     // Nom de la tournée
  ticketUrl: string | null;// Lien billetterie
  status: string;          // Statut : "scheduled", "completed", "cancelled", "postponed"
  createdAt: string;       // Date création ISO 8601
  updatedAt: string;       // Date dernière modification ISO 8601
}
```

**Contraintes :**
- `date` : format ISO 8601 avec heure
- `status` : "scheduled" | "completed" | "cancelled" | "postponed"

**Valeurs par défaut :**
- `status` : "scheduled"

---

### 10. 💬 COMMENT (Commentaire)
**Clé :** `comment:{commentId}`

```typescript
{
  id: string;              // UUID unique
  content: string;         // Contenu du commentaire (requis)
  authorId: string;        // UUID de l'auteur (référence User)
  targetType: string;      // Type de cible : "article", "album", "concert"
  targetId: string;        // UUID de la cible
  parentId: string | null; // UUID du commentaire parent (pour réponses)
  isApproved: boolean;     // Commentaire approuvé par modération (true/false)
  createdAt: string;       // Date création ISO 8601
  updatedAt: string;       // Date dernière modification ISO 8601
}
```

**Contraintes :**
- `authorId` : doit référencer un utilisateur existant
- `targetType` : "article" | "album" | "concert"
- `targetId` : doit référencer une entité existante
- `parentId` : optionnel, pour les réponses à un commentaire

**Valeurs par défaut :**
- `isApproved` : false (modération par défaut)

**Système de modération :**
- Les commentaires sont créés avec `isApproved: false`
- Seuls les commentaires approuvés (`isApproved: true`) sont affichés publiquement
- Les admins peuvent approuver/rejeter via le cPanel

---

### 11. 📧 CONTACT (Message de contact)
**Clé :** `contact:{contactId}`

```typescript
{
  id: string;          // UUID unique
  name: string;        // Nom complet (requis)
  email: string;       // Email (requis, format valide)
  subject: string;     // Sujet du message (requis)
  message: string;     // Contenu du message (requis)
  status: string;      // Statut : "unread", "read", "replied"
  createdAt: string;   // Date création ISO 8601
  readAt: string | null; // Date de lecture ISO 8601
}
```

**Contraintes :**
- `email` : format email valide
- `status` : "unread" | "read" | "replied"

**Valeurs par défaut :**
- `status` : "unread"
- `readAt` : null

---

### 12. ❤️ LIKE (Like d'article)
**Clé :** `like:{likeId}`

```typescript
{
  id: string;          // UUID unique
  userId: string;      // UUID de l'utilisateur (référence User)
  targetType: string;  // Type de cible : "article"
  targetId: string;    // UUID de la cible (référence Article)
  createdAt: string;   // Date création ISO 8601
}
```

**Contraintes :**
- `userId` : doit référencer un utilisateur existant
- `targetType` : "article" (extensible à "album", "concert", etc.)
- `targetId` : doit référencer un article existant
- Combinaison `userId` + `targetId` unique (un utilisateur ne peut liker qu'une fois)

---

### 13. 📊 ACTIVITY (Activité utilisateur)
**Clé :** `activity:{activityId}`

```typescript
{
  id: string;           // UUID unique
  userId: string;       // UUID de l'utilisateur (référence User)
  type: string;         // Type d'activité : "like", "comment", "signup"
  description: string;  // Description de l'activité
  linkTo: string | null;// Lien vers la ressource concernée
  articleTitle: string | null; // Titre de l'article (pour type "like")
  createdAt: string;    // Date création ISO 8601
}
```

**Contraintes :**
- `userId` : doit référencer un utilisateur existant
- `type` : "like" | "comment" | "signup" | etc.

**Types d'activités :**
- `like` : L'utilisateur a liké un article
- `comment` : L'utilisateur a commenté
- `signup` : Inscription de l'utilisateur

---

## Relations

### Schéma des relations

```
USER (1) ────────< (N) ARTICLE
  │                      │
  │                      └─── (N) COMMENT
  │                      └─── (N) LIKE
  │
  ├───────< (N) COMMENT
  │
  ├───────< (N) LIKE
  │
  └───────< (N) ACTIVITY

ARTICLE (1) ────< (N) COMMENT
          └─────< (N) LIKE

ALBUM (1) ──────< (N) SINGLE (via albumId)
        └───────< (N) COMMENT

COMMENT (1) ────< (N) COMMENT (réponses via parentId)

CONCERT (1) ────< (N) COMMENT
```

### Détails des relations

#### User → Article (1:N)
- Un utilisateur peut créer plusieurs articles
- Un article appartient à un seul auteur
- Clé étrangère : `article.authorId` → `user.id`

#### User → Comment (1:N)
- Un utilisateur peut créer plusieurs commentaires
- Un commentaire appartient à un seul auteur
- Clé étrangère : `comment.authorId` → `user.id`

#### User → Like (1:N)
- Un utilisateur peut liker plusieurs articles
- Un like appartient à un seul utilisateur
- Clé étrangère : `like.userId` → `user.id`

#### User → Activity (1:N)
- Un utilisateur peut avoir plusieurs activités
- Une activité appartient à un seul utilisateur
- Clé étrangère : `activity.userId` → `user.id`

#### Article → Comment (1:N)
- Un article peut avoir plusieurs commentaires
- Un commentaire cible un seul article (ou album, concert)
- Clés étrangères : `comment.targetType` = "article" + `comment.targetId` → `article.id`

#### Article → Like (1:N)
- Un article peut avoir plusieurs likes
- Un like cible un seul article
- Clés étrangères : `like.targetType` = "article" + `like.targetId` → `article.id`

#### Album → Single (1:N)
- Un album peut contenir plusieurs singles
- Un single peut appartenir à un album
- Clé étrangère : `single.albumId` → `album.id`

#### Comment → Comment (1:N) - Réponses
- Un commentaire peut avoir plusieurs réponses
- Une réponse appartient à un commentaire parent
- Clé étrangère : `comment.parentId` → `comment.id`

---

## Index et Clés

### Préfixes utilisés pour les requêtes

```typescript
// Recherche par préfixe
"user:"      → Tous les utilisateurs
"session:"   → Toutes les sessions
"article:"   → Tous les articles
"category:"  → Toutes les catégories
"tag:"       → Tous les tags
"album:"     → Tous les albums
"single:"    → Tous les singles
"member:"    → Tous les membres
"concert:"   → Tous les concerts
"comment:"   → Tous les commentaires
"contact:"   → Tous les messages de contact
"like:"      → Tous les likes
"activity:"  → Toutes les activités
```

### Clés uniques

- `user.email` : unique, case-insensitive
- `user.username` : unique, case-insensitive
- `article.slug` : unique
- `category.name` : unique
- `category.slug` : unique
- `tag.name` : unique
- `tag.slug` : unique
- `album.slug` : unique
- `single.slug` : unique
- `member.slug` : unique
- `(like.userId, like.targetId)` : combinaison unique

---

## Endpoints API

### 🔐 Authentication (5 endpoints)

```http
POST   /make-server-d462d5d8/auth/login
POST   /make-server-d462d5d8/auth/logout
POST   /make-server-d462d5d8/auth/signup
GET    /make-server-d462d5d8/auth/me
GET    /make-server-d462d5d8/health
```

### 👤 Users (5 endpoints)

```http
GET    /make-server-d462d5d8/users              # Liste tous les utilisateurs
GET    /make-server-d462d5d8/users/:id          # Détails d'un utilisateur
POST   /make-server-d462d5d8/users              # Créer un utilisateur (admin)
PUT    /make-server-d462d5d8/users/:id          # Modifier un utilisateur
DELETE /make-server-d462d5d8/users/:id          # Supprimer un utilisateur (admin)
```

### 📰 Articles (5 endpoints)

```http
GET    /make-server-d462d5d8/articles           # Liste tous les articles
GET    /make-server-d462d5d8/articles/:id       # Détails d'un article
POST   /make-server-d462d5d8/articles           # Créer un article
PUT    /make-server-d462d5d8/articles/:id       # Modifier un article
DELETE /make-server-d462d5d8/articles/:id       # Supprimer un article
```

### 🏷️ Categories (5 endpoints)

```http
GET    /make-server-d462d5d8/categories         # Liste toutes les catégories
GET    /make-server-d462d5d8/categories/:id     # Détails d'une catégorie
POST   /make-server-d462d5d8/categories         # Créer une catégorie
PUT    /make-server-d462d5d8/categories/:id     # Modifier une catégorie
DELETE /make-server-d462d5d8/categories/:id     # Supprimer une catégorie
```

### 🔖 Tags (5 endpoints)

```http
GET    /make-server-d462d5d8/tags               # Liste tous les tags
GET    /make-server-d462d5d8/tags/:id           # Détails d'un tag
POST   /make-server-d462d5d8/tags               # Créer un tag
PUT    /make-server-d462d5d8/tags/:id           # Modifier un tag
DELETE /make-server-d462d5d8/tags/:id           # Supprimer un tag
```

### 💿 Albums (5 endpoints)

```http
GET    /make-server-d462d5d8/albums             # Liste tous les albums
GET    /make-server-d462d5d8/albums/:id         # Détails d'un album
POST   /make-server-d462d5d8/albums             # Créer un album
PUT    /make-server-d462d5d8/albums/:id         # Modifier un album
DELETE /make-server-d462d5d8/albums/:id         # Supprimer un album
```

### 🎵 Singles (5 endpoints)

```http
GET    /make-server-d462d5d8/singles            # Liste tous les singles
GET    /make-server-d462d5d8/singles/:id        # Détails d'un single
POST   /make-server-d462d5d8/singles            # Créer un single
PUT    /make-server-d462d5d8/singles/:id        # Modifier un single
DELETE /make-server-d462d5d8/singles/:id        # Supprimer un single
```

### 🎸 Members (5 endpoints)

```http
GET    /make-server-d462d5d8/members            # Liste tous les membres
GET    /make-server-d462d5d8/members/:id        # Détails d'un membre
POST   /make-server-d462d5d8/members            # Créer un membre
PUT    /make-server-d462d5d8/members/:id        # Modifier un membre
DELETE /make-server-d462d5d8/members/:id        # Supprimer un membre
```

### 🎤 Concerts (5 endpoints)

```http
GET    /make-server-d462d5d8/concerts           # Liste tous les concerts
GET    /make-server-d462d5d8/concerts/:id       # Détails d'un concert
POST   /make-server-d462d5d8/concerts           # Créer un concert
PUT    /make-server-d462d5d8/concerts/:id       # Modifier un concert
DELETE /make-server-d462d5d8/concerts/:id       # Supprimer un concert
```

### 💬 Comments (6 endpoints + modération)

```http
GET    /make-server-d462d5d8/comments           # Liste tous les commentaires
GET    /make-server-d462d5d8/comments/:id       # Détails d'un commentaire
POST   /make-server-d462d5d8/comments           # Créer un commentaire
DELETE /make-server-d462d5d8/comments/:id       # Supprimer un commentaire

# Modération (admin seulement)
POST   /make-server-d462d5d8/comments/:id/approve  # Approuver un commentaire
POST   /make-server-d462d5d8/comments/:id/reject   # Rejeter un commentaire
```

### 📧 Contact (3 endpoints)

```http
POST   /make-server-d462d5d8/contact            # Envoyer un message de contact
GET    /make-server-d462d5d8/contact/messages   # Liste tous les messages (admin)
PUT    /make-server-d462d5d8/contact/messages/:id/read # Marquer comme lu (admin)
```

### ❤️ Likes (2 endpoints)

```http
POST   /make-server-d462d5d8/articles/:id/like  # Liker un article
DELETE /make-server-d462d5d8/articles/:id/like  # Unliker un article
```

### 📊 Activities (1 endpoint)

```http
GET    /make-server-d462d5d8/activities/:userId # Activités d'un utilisateur
```

### 🌱 Initialization (1 endpoint)

```http
POST   /make-server-d462d5d8/init-data          # Initialiser les données de test
```

---

## 📊 Statistiques

### Totaux
- **13 entités** principales
- **38+ endpoints** REST API
- **100% fonctionnel** avec modération des commentaires
- **28 pages** connectées au backend avec données réelles

### Utilisateurs par défaut
```
Admin : admin@untouchables.fr / admin123
Roles : ["ROLE_ADMIN", "ROLE_USER"]
```

### Données de seed
- 5 utilisateurs (1 admin + 4 users de test)
- 3 albums studio
- 4 articles (3 publiés + 1 brouillon)
- 6 catégories par défaut
- Tags multiples
- Concerts France 2026

---

## 🔒 Sécurité

### Points importants

1. **Mots de passe** : Actuellement stockés en clair → **À hasher en production** (bcrypt recommandé)
2. **Sessions** : Token UUID stocké dans KV Store, supprimé au logout
3. **CORS** : Ouvert à tous les origins (`*`) → **À restreindre en production**
4. **Validation** : Validation basique côté serveur → **À renforcer**
5. **Modération** : Système de modération activé pour les commentaires

### Recommandations production

```typescript
// ❌ Actuel (dev)
password: "password123"

// ✅ Production
password: await bcrypt.hash("password123", 10)
```

```typescript
// ❌ Actuel (dev)
cors({ origin: "*" })

// ✅ Production
cors({ origin: "https://untouchables.fr" })
```

---

## 🎯 Prochaines évolutions possibles

1. **Notifications** : Système de notifications en temps réel
2. **Favoris** : Gestion des albums/articles favoris
3. **Votes** : Système de votes pour articles/albums
4. **Messages privés** : Messagerie entre utilisateurs
5. **Upload de fichiers** : Upload d'images via Supabase Storage
6. **Newsletter** : Système d'abonnement newsletter
7. **Recherche** : Moteur de recherche avancé
8. **Cache** : Mise en cache des données fréquentes

---

**Document généré le :** 21 mars 2026  
**Version du backend :** 1.0.0  
**Base de données :** Supabase Key-Value Store
