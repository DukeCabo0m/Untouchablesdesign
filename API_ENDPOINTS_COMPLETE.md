# 📡 API ENDPOINTS COMPLETS - UNTOUCHABLES

**Backend:** Supabase Edge Function (Hono)  
**Base URL:** `https://[PROJECT_ID].supabase.co/functions/v1/make-server-d462d5d8`  
**Total endpoints:** 65+

---

## 🔐 AUTHENTIFICATION

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: { "token": "...", "user": {...} }
```

### Signup
```http
POST /auth/signup
Content-Type: application/json

{
  "username": "KornFan",
  "email": "user@example.com",
  "password": "password123",
  "birthdate": "1990-01-01"
}
```

### Logout
```http
POST /auth/logout
Authorization: Bearer {token}
```

---

## 📰 ARTICLES / NEWS

### Liste articles
```http
GET /articles?category=news&limit=10
```

### Featured articles
```http
GET /articles/featured
```

### Article par ID
```http
GET /articles/:id
```

### Créer article (admin)
```http
POST /articles
Authorization: Bearer {token}
Content-Type: application/json
```

### Modifier article (admin)
```http
PUT /articles/:id
Authorization: Bearer {token}
```

### Supprimer article (admin)
```http
DELETE /articles/:id
Authorization: Bearer {token}
```

---

## 💿 ALBUMS

### Liste albums
```http
GET /albums
```

### Featured albums
```http
GET /albums/featured
```

### Album par ID
```http
GET /albums/:id
```

---

## 🎵 SINGLES

### Liste singles
```http
GET /singles
```

### Single par ID
```http
GET /singles/:id
```

---

## 🎸 TRACKS

### Tracks d'un album
```http
GET /albums/:albumId/tracks
```

### Track par ID
```http
GET /tracks/:id
```

---

## 🎤 CONCERTS

### Prochains concerts
```http
GET /concerts/upcoming?limit=5
```

### Concerts passés
```http
GET /concerts/past?limit=10
```

### Concert par ID
```http
GET /concerts/:id
```

### Stats concerts
```http
GET /concerts/stats
Authorization: Bearer {token}
```

---

## 💬 COMMENTAIRES

### Commentaires d'un article
```http
GET /articles/:articleId/comments
```

### Créer commentaire
```http
POST /comments
Authorization: Bearer {token}
Content-Type: application/json

{
  "articleId": "...",
  "content": "Super article !",
  "parentId": null
}
```

### Approuver commentaire (admin/moderator)
```http
PUT /comments/:id/approve
Authorization: Bearer {token}
```

### Rejeter commentaire (admin/moderator)
```http
PUT /comments/:id/reject
Authorization: Bearer {token}
```

### Supprimer commentaire
```http
DELETE /comments/:id
Authorization: Bearer {token}
```

---

## ❤️ LIKES

### Liker un article
```http
POST /articles/:id/like
Authorization: Bearer {token}
```

### Unliker un article
```http
DELETE /articles/:id/like
Authorization: Bearer {token}
```

### Liker un commentaire
```http
POST /comments/:id/like
Authorization: Bearer {token}
```

### Unliker un commentaire
```http
DELETE /comments/:id/like
Authorization: Bearer {token}
```

### Liker une contribution
```http
POST /contributions/:id/like
Authorization: Bearer {token}
```

---

## 🏷️ CATÉGORIES

### Liste catégories
```http
GET /categories
```

### Créer catégorie (admin)
```http
POST /categories
Authorization: Bearer {token}
```

### Modifier catégorie (admin)
```http
PUT /categories/:id
Authorization: Bearer {token}
```

### Supprimer catégorie (admin)
```http
DELETE /categories/:id
Authorization: Bearer {token}
```

---

## 🔖 TAGS

### Liste tags
```http
GET /tags
```

### Créer tag (admin)
```http
POST /tags
Authorization: Bearer {token}
```

### Modifier tag (admin)
```http
PUT /tags/:id
Authorization: Bearer {token}
```

### Supprimer tag (admin)
```http
DELETE /tags/:id
Authorization: Bearer {token}
```

---

## 📸 MÉDIA

### Upload média (admin)
```http
POST /media
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

### Liste médias
```http
GET /media
Authorization: Bearer {token}
```

### Supprimer média (admin)
```http
DELETE /media/:id
Authorization: Bearer {token}
```

---

## 🎨 FAN CONTRIBUTIONS

### Liste contributions publiques
```http
GET /contributions
```

### Featured contributions (homepage)
```http
GET /contributions/featured
```

### Soumettre contribution
```http
POST /contributions
Authorization: Bearer {token}
Content-Type: application/json

{
  "type": "tattoo",
  "image": "https://...",
  "caption": "Mon tatouage Korn",
  "tags": ["tattoo", "logo"]
}
```

### Approuver contribution (admin)
```http
PUT /contributions/:id/approve
Authorization: Bearer {token}
```

### Rejeter contribution (admin)
```http
PUT /contributions/:id/reject
Authorization: Bearer {token}
```

### Supprimer contribution
```http
DELETE /contributions/:id
Authorization: Bearer {token}
```

---

## 📖 FANZINES

### Liste fanzines publiés
```http
GET /fanzines
```

### Dernier fanzine (homepage)
```http
GET /fanzines/latest
```

### Fanzine par ID
```http
GET /fanzines/:id
```

### Créer fanzine (admin)
```http
POST /fanzines
Authorization: Bearer {token}
```

### Modifier fanzine (admin)
```http
PUT /fanzines/:id
Authorization: Bearer {token}
```

### Publier fanzine (admin)
```http
PUT /fanzines/:id/publish
Authorization: Bearer {token}
```

### Supprimer fanzine (admin)
```http
DELETE /fanzines/:id
Authorization: Bearer {token}
```

---

## 📬 ABONNEMENTS FANZINE

### Soumettre abonnement
```http
POST /subscriptions
Content-Type: application/json

{
  "zone": "europe",
  "price": 25,
  "name": "John Doe",
  "email": "john@example.com",
  "address": "123 Main St",
  "postalCode": "75001",
  "city": "Paris",
  "country": "France",
  "phone": "+33123456789"
}
```

### Liste abonnements (admin)
```http
GET /subscriptions
Authorization: Bearer {token}
```

### Confirmer abonnement (admin)
```http
PUT /subscriptions/:id/confirm
Authorization: Bearer {token}
```

---

## 🚨 REPORTS (Signalements)

### Liste reports (admin)
```http
GET /reports
Authorization: Bearer {token}
```

### Créer report
```http
POST /reports
Authorization: Bearer {token}
Content-Type: application/json

{
  "targetType": "comment",
  "targetId": "comment-123",
  "reason": "Spam",
  "details": "Commentaire publicitaire répété"
}
```

### Résoudre report (admin)
```http
PUT /reports/:id/resolve
Authorization: Bearer {token}
Content-Type: application/json

{
  "note": "Traité avec succès"
}
```

### Rejeter report (admin)
```http
PUT /reports/:id/dismiss
Authorization: Bearer {token}
Content-Type: application/json

{
  "note": "Fausse alerte"
}
```

---

## 🔨 BANS (Bannissements)

### Liste bans (admin)
```http
GET /bans
Authorization: Bearer {token}
```

### Créer ban (admin)
```http
POST /bans
Authorization: Bearer {token}
Content-Type: application/json

{
  "userId": "user-123",
  "reason": "Spam répété",
  "type": "temporary",
  "duration": 30
}
```

### Révoquer ban (admin)
```http
PUT /bans/:id/revoke
Authorization: Bearer {token}
```

### Supprimer ban (admin)
```http
DELETE /bans/:id
Authorization: Bearer {token}
```

---

## 📋 LOGS (Journaux)

### Liste logs (admin)
```http
GET /logs
Authorization: Bearer {token}
```

### Logs par niveau (admin)
```http
GET /logs/level/:level
Authorization: Bearer {token}

# Niveaux: info, success, warning, error
```

---

## 👥 UTILISATEURS

### Liste utilisateurs (admin)
```http
GET /users
Authorization: Bearer {token}
```

### Stats utilisateurs (admin)
```http
GET /users/stats
Authorization: Bearer {token}
```

### Utilisateur par ID
```http
GET /users/:id
Authorization: Bearer {token}
```

### Modifier utilisateur (admin ou soi-même)
```http
PUT /users/:id
Authorization: Bearer {token}
```

### Supprimer utilisateur (admin)
```http
DELETE /users/:id
Authorization: Bearer {token}
```

---

## 🔧 ADMIN / INIT

### Health check
```http
GET /health

Response: { "status": "ok" }
```

### Seed database (dev only)
```http
POST /init/seed

# Seed complet (5 étapes)
# - Database
# - Media
# - Contributions
# - Fanzines
# - Moderation
```

### Seed media only (dev only)
```http
POST /init/seed-media
```

---

## 📊 RÉCAPITULATIF

| Catégorie | Nombre d'endpoints |
|-----------|-------------------|
| Authentification | 3 |
| Articles | 6 |
| Albums | 3 |
| Singles | 2 |
| Tracks | 2 |
| Concerts | 4 |
| Commentaires | 5 |
| Likes | 5 |
| Catégories | 4 |
| Tags | 4 |
| Média | 3 |
| Contributions | 6 |
| Fanzines | 7 |
| Abonnements | 3 |
| **Reports** | **4** ⬅️ **NOUVEAU Phase 3** |
| **Bans** | **4** ⬅️ **NOUVEAU Phase 3** |
| **Logs** | **2** ⬅️ **NOUVEAU Phase 3** |
| Utilisateurs | 5 |
| Admin/Init | 3 |
| **TOTAL** | **65+** |

---

## 🔒 AUTHENTIFICATION PAR ENDPOINT

### Public (pas d'auth)
- Health check
- Articles publics
- Albums, Singles, Tracks
- Concerts
- Contributions publiques
- Fanzines publiés
- Abonnements

### Authentifié (token requis)
- Créer commentaire
- Liker/Unliker
- Soumettre contribution
- Créer report

### Admin uniquement
- CRUD Articles
- CRUD Catégories/Tags
- Approuver/Rejeter commentaires
- Approuver/Rejeter contributions
- CRUD Fanzines
- **Reports (tous endpoints)**
- **Bans (tous endpoints)**
- **Logs (tous endpoints)**
- Utilisateurs (liste/stats)
- Seed data

### Moderator (admin ou moderator)
- Approuver/Rejeter commentaires

---

## 🎯 NOUVEAUX ENDPOINTS PHASE 3

### Reports (4)
1. `GET /reports` - Liste (admin)
2. `POST /reports` - Créer (auth)
3. `PUT /reports/:id/resolve` - Résoudre (admin)
4. `PUT /reports/:id/dismiss` - Rejeter (admin)

### Bans (4)
1. `GET /bans` - Liste (admin)
2. `POST /bans` - Créer (admin)
3. `PUT /bans/:id/revoke` - Révoquer (admin)
4. `DELETE /bans/:id` - Supprimer (admin)

### Logs (2)
1. `GET /logs` - Liste (admin)
2. `GET /logs/level/:level` - Par niveau (admin)

---

## 📝 NOTES

- Tous les endpoints retournent du JSON
- Les erreurs suivent le format: `{ "error": "Message" }`
- Les tokens sont passés en header: `Authorization: Bearer {token}`
- Les timestamps sont en ISO 8601
- Les IDs sont des UUIDs

---

**Documentation complète et à jour - Phase 3 incluse** ✅
