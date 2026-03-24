# 🎯 PHASE 2 - PLAN DÉTAILLÉ

**Date de début :** 24 Mars 2026  
**Objectif :** Connecter les sections secondaires de la homepage  
**Durée estimée :** 4-6 heures

---

## 📋 ANALYSE INITIALE

### ✅ Sections DÉJÀ connectées au backend :
- ✅ HeroSection - Statique (pas de données dynamiques)
- ✅ LatestNewsSection - Connecté au backend articles
- ✅ FeaturedAlbumsSection - Connecté au backend albums
- ✅ UpcomingToursSection - Connecté au backend concerts
- ✅ NewsletterWidget - Formulaire (pas de mock data)
- ✅ LatestVideoWidget, ShortsReelsWidget, InstagramPostsWidget - Phase 1 terminée

### ❌ Sections ENCORE mockées (À FAIRE) :
- ❌ **FanContributionsSection** - 4 contributions mockées
- ❌ **FanzineSection** - 1 numéro mocké

---

## 🎯 PLAN D'ACTION

### 1️⃣ **FanContributionsSection** (2-3h)

**Données mockées actuelles :**
```typescript
const fanContributions = [
  { id, type, image, author, likes, comments, caption, legend, subtitle }
]
```

**Structure de données backend :**
```typescript
{
  id: string;
  type: 'tattoo' | 'art' | 'collection' | 'memorabilia' | 'other';
  image: string;               // URL de l'image
  author: string;              // Username (@darkside_ink)
  authorId: string | null;     // ID utilisateur si inscrit
  likes: number;
  comments: number;
  caption: string;             // Description courte
  legend: string;              // Catégorie affichée (Encre & Peau, Fan-Arts, etc.)
  subtitle: string;            // Sous-titre catégorie
  status: 'pending' | 'approved' | 'rejected';  // Modération
  submittedAt: string;         // Date de soumission ISO
  approvedAt: string | null;   // Date d'approbation ISO
  approvedBy: string | null;   // Admin qui a approuvé
  featured: boolean;           // Mis en avant sur homepage ?
  tags: string[];              // Tags optionnels
}
```

**Backend à créer :**
- `GET /contributions` - Liste des contributions (publiques approuvées)
- `GET /contributions/featured` - Contributions mises en avant (pour homepage)
- `POST /contributions` - Soumettre une contribution (authentifié)
- `PUT /contributions/:id/approve` - Approuver (admin)
- `PUT /contributions/:id/reject` - Rejeter (admin)
- `DELETE /contributions/:id` - Supprimer (admin ou auteur)
- `POST /contributions/:id/like` - Liker une contribution
- `DELETE /contributions/:id/like` - Unliker
- `GET /contributions/:id/comments` - Commentaires (optionnel)

**Frontend à modifier :**
- `/src/app/components/FanContributionsSection.tsx`
  - Fetch depuis `/contributions/featured`
  - Loading state
  - Fallback si aucune contribution

**Seed data :**
- 8-10 contributions variées (tattoos, fan-arts, collections, mémorabilia)

---

### 2️⃣ **FanzineSection** (2-3h)

**Données mockées actuelles :**
```typescript
const firstIssue = {
  id, number, title, date, coverImage, description, pages
}
```

**Structure de données backend :**
```typescript
{
  id: string;
  issueNumber: number;
  title: string;               // "KORN 2026 : REWIND"
  subtitle: string | null;     // Sous-titre optionnel
  coverImage: string;          // URL de la couverture
  publicationDate: string;     // Date de publication ISO (mois/année)
  description: string;         // Description courte
  pages: number;
  pdfUrl: string | null;       // URL du PDF téléchargeable (si dispo)
  status: 'draft' | 'published' | 'archived';
  featured: boolean;           // Affiché sur homepage ?
  contentPreview: string[];    // Aperçu du contenu (array de strings)
  contributors: string[];      // Noms des contributeurs
  price: number | null;        // Prix si payant
  isPublic: boolean;           // Gratuit ou payant ?
  createdAt: string;
  publishedAt: string | null;
}
```

**Backend à créer :**
- `GET /fanzines` - Liste des numéros publiés
- `GET /fanzines/latest` - Dernier numéro publié (pour homepage)
- `GET /fanzines/:id` - Détails d'un numéro
- `POST /fanzines` - Créer un numéro (admin)
- `PUT /fanzines/:id` - Modifier (admin)
- `DELETE /fanzines/:id` - Supprimer (admin)
- `PUT /fanzines/:id/publish` - Publier (admin)

**Frontend à modifier :**
- `/src/app/components/FanzineSection.tsx`
  - Fetch depuis `/fanzines/latest`
  - Loading state
  - Fallback si aucun numéro

**Seed data :**
- 2-3 numéros de fanzine (dont le premier actuel)

---

## 📊 RÉSUMÉ TECHNIQUE

| Tâche | Endpoints | Composants | Seed | Temps |
|-------|-----------|------------|------|-------|
| **Contributions Fans** | 8 | 1 | 8-10 items | 2-3h |
| **Fanzine** | 7 | 1 | 2-3 items | 2-3h |
| **TOTAL** | **15** | **2** | **10-13 items** | **4-6h** |

---

## 🔄 ORDRE D'EXÉCUTION

### **Étape 1 : Backend Contributions** (1h)
1. ✅ Créer structure de données
2. ✅ Créer 8 endpoints REST
3. ✅ Créer fichier seed `/supabase/functions/server/seed-contributions.tsx`
4. ✅ Ajouter appel dans `/init/seed`

### **Étape 2 : Frontend Contributions** (1h)
1. ✅ Modifier `FanContributionsSection.tsx`
2. ✅ Fetch depuis backend
3. ✅ Loading/error states
4. ✅ Tester affichage

### **Étape 3 : Backend Fanzine** (1h)
1. ✅ Créer structure de données
2. ✅ Créer 7 endpoints REST
3. ✅ Créer fichier seed `/supabase/functions/server/seed-fanzines.tsx`
4. ✅ Ajouter appel dans `/init/seed`

### **Étape 4 : Frontend Fanzine** (1h)
1. ✅ Modifier `FanzineSection.tsx`
2. ✅ Fetch depuis backend
3. ✅ Loading/error states
4. ✅ Tester affichage

### **Étape 5 : Tests et ajustements** (1h)
1. ✅ Test complet homepage
2. ✅ Vérifier responsive
3. ✅ Vérifier loading states
4. ✅ Fix bugs éventuels

---

## 🎯 OBJECTIF FINAL

À la fin de la Phase 2, **la homepage sera 100% connectée au backend** avec :
- ✅ 0 données mockées
- ✅ Tous les composants chargent depuis l'API
- ✅ Loading states partout
- ✅ Fallbacks si pas de données
- ✅ Seed data complet pour démo

---

## 📝 NOTES

### Pourquoi ces 2 sections ?
- **FanContributionsSection** : Section importante pour l'engagement communauté
- **FanzineSection** : Section stratégique pour monétisation future

### Sections NON PRIORITAIRES (post Phase 2)
- SocialMediaSection - Déjà partiellement traité en Phase 1
- Autres widgets sidebar - Déjà fait en Phase 1

### Améliorations futures (post Phase 2)
- Interface admin pour gérer contributions
- Upload d'images pour contributions
- Système de modération avancé
- Statistiques de likes/comments
- Interface admin pour créer/éditer fanzines
- Upload PDF pour téléchargement

---

## ✅ VALIDATION FINALE

Avant de terminer Phase 2 :
- [ ] Backend : 15 nouveaux endpoints créés
- [ ] Frontend : 2 composants connectés
- [ ] Seed : 10-13 items créés
- [ ] Tests : Homepage complètement fonctionnelle
- [ ] Doc : Documentation à jour

---

**Prêt à démarrer ! 🚀**
