# Guide Backend Supabase - Untouchables cPanel

## 🎯 Vue d'ensemble

Votre cPanel Untouchables est maintenant connecté à un backend Supabase opérationnel utilisant :
- **Base de données** : Key-Value store Supabase
- **API** : Hono server avec routes REST complètes
- **Authentification** : System de tokens JWT-like
- **Données initiales** : Script de seed avec données de test

---

## 🚀 Démarrage rapide

### Étape 1 : Initialiser la base de données avec des données de test

Exécutez cette commande dans votre navigateur (Console DevTools) :

```javascript
await fetch('https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-d462d5d8/init/seed', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
}).then(r => r.json()).then(console.log);
```

Ou utilisez l'API utility depuis votre code :

```typescript
import { initApi } from './utils/api';

const result = await initApi.seedDatabase();
console.log(result);
```

### Étape 2 : Se connecter au cPanel

**Identifiants admin par défaut** :
- **Email** : `admin@untouchables.fr`
- **Password** : `admin123`

```typescript
import { authApi } from './utils/api';

const { token, user } = await authApi.login('admin@untouchables.fr', 'admin123');
console.log('Connecté !', user);
```

---

## 📡 Endpoints API disponibles

### Authentication

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/auth/login` | Connexion utilisateur |
| POST | `/auth/logout` | Déconnexion |
| GET | `/auth/me` | Vérifier session active |

### Users (Utilisateurs)

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/users` | Liste tous les utilisateurs |
| GET | `/users/:id` | Détails d'un utilisateur |
| POST | `/users` | Créer un utilisateur |
| PUT | `/users/:id` | Modifier un utilisateur |
| DELETE | `/users/:id` | Supprimer un utilisateur |

### Articles

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/articles` | Liste tous les articles |
| GET | `/articles/:id` | Détails d'un article |
| POST | `/articles` | Créer un article |
| PUT | `/articles/:id` | Modifier un article |
| DELETE | `/articles/:id` | Supprimer un article |

### Albums

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/albums` | Liste tous les albums |
| GET | `/albums/:id` | Détails d'un album |
| POST | `/albums` | Créer un album |
| PUT | `/albums/:id` | Modifier un album |
| DELETE | `/albums/:id` | Supprimer un album |

### Concerts

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/concerts` | Liste tous les concerts |
| POST | `/concerts` | Créer un concert |
| PUT | `/concerts/:id` | Modifier un concert |
| DELETE | `/concerts/:id` | Supprimer un concert |

### Comments (Commentaires)

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/comments?entityType=article&entityId=xxx` | Liste commentaires (optionnel: filtrer par entité) |
| POST | `/comments` | Créer un commentaire |
| DELETE | `/comments/:id` | Supprimer un commentaire |

### Stats (Statistiques)

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/stats/dashboard` | Statistiques globales pour le dashboard |

---

## 💻 Exemples d'utilisation

### Exemple 1 : Récupérer tous les articles

```typescript
import { articlesApi } from './utils/api';

const articles = await articlesApi.getAll();
console.log('Articles:', articles);
```

### Exemple 2 : Créer un nouvel article

```typescript
import { articlesApi } from './utils/api';

const newArticle = await articlesApi.create({
  title: 'Nouveau concert annoncé !',
  content: 'Korn revient en France...',
  excerpt: 'Korn en France',
  category: 'news',
  tags: ['concert', 'tournée'],
  authorId: 'admin-001',
  isPublished: true,
  isFeatured: false
});

console.log('Article créé:', newArticle);
```

### Exemple 3 : Modifier un utilisateur

```typescript
import { usersApi } from './utils/api';

const updatedUser = await usersApi.update('user-001', {
  bio: 'Nouvelle bio mise à jour',
  location: 'Nice, France'
});

console.log('Utilisateur modifié:', updatedUser);
```

### Exemple 4 : Supprimer un commentaire

```typescript
import { commentsApi } from './utils/api';

await commentsApi.delete('comment-005');
console.log('Commentaire supprimé !');
```

### Exemple 5 : Récupérer les statistiques du dashboard

```typescript
import { statsApi } from './utils/api';

const stats = await statsApi.getDashboard();
console.log('Stats:', stats);
// Résultat : { totalUsers: 5, totalArticles: 4, totalAlbums: 3, ... }
```

---

## 🗄️ Données de seed (test)

Le script de seed crée automatiquement :

- **5 utilisateurs** :
  - 1 admin (`admin@untouchables.fr` / `admin123`)
  - 3 utilisateurs actifs
  - 1 utilisateur banni
  
- **3 albums** :
  - Korn (1994)
  - Follow the Leader (1998)
  - Issues (1999)
  
- **4 articles** :
  - 3 publiés (news, interview, chronique)
  - 1 brouillon
  
- **4 concerts** :
  - 3 à venir (Paris, Lyon, Marseille)
  - 1 passé (Hellfest 2025)
  
- **5 commentaires** :
  - 4 approuvés
  - 1 spam non-approuvé

---

## 🔐 Authentification

### Flow d'authentification

1. **Login** : L'utilisateur se connecte avec email/password
2. **Token** : Le serveur génère un token de session unique
3. **Storage** : Le token est stocké dans `localStorage`
4. **Requests** : Toutes les requêtes incluent le token dans le header `Authorization`

### Vérifier la session

```typescript
import { authApi } from './utils/api';

try {
  const user = await authApi.me();
  console.log('Session valide:', user);
} catch (error) {
  console.log('Session invalide, redirection vers login');
}
```

### Se déconnecter

```typescript
import { authApi } from './utils/api';

await authApi.logout();
// Token supprimé du localStorage
```

---

## 🎨 Intégration avec votre cPanel

### Exemple : Page Admin Users

```typescript
import { useEffect, useState } from 'react';
import { usersApi } from '../utils/api';

export function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const data = await usersApi.getAll();
      setUsers(data);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(userId: string) {
    if (confirm('Supprimer cet utilisateur ?')) {
      try {
        await usersApi.delete(userId);
        await loadUsers(); // Recharger la liste
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  }

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      <h1>Utilisateurs</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.isActive ? 'Actif' : 'Inactif'}</td>
              <td>
                <button onClick={() => handleDelete(user.id)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

---

## ⚠️ Important - Limitations et Sécurité

### Limitations actuelles

1. **Pas de hachage de mot de passe** : Les mots de passe sont stockés en clair (OK pour prototype, PAS pour production)
2. **Pas de validation stricte** : Les données ne sont pas validées côté serveur
3. **Pas de permissions granulaires** : Tous les utilisateurs authentifiés ont accès à tout
4. **Pas de rate limiting** : Aucune protection contre les abus

### Recommandations pour la production

Si vous souhaitez mettre ce site en production réelle :

1. **Hashage des mots de passe** : Utiliser bcrypt ou argon2
2. **Validation** : Ajouter Zod ou Joi pour valider les données
3. **Permissions** : Implémenter un système de rôles (ADMIN, MODERATOR, USER)
4. **Rate limiting** : Limiter le nombre de requêtes par IP
5. **HTTPS** : Toujours utiliser HTTPS en production
6. **Logs** : Implémenter un système de logging robuste
7. **Backups** : Mettre en place des sauvegardes régulières

---

## 🛠️ Dépannage

### Problème : "Token manquant" ou "Session invalide"

**Solution** : Vous n'êtes pas connecté. Utilisez `authApi.login()` d'abord.

### Problème : "Utilisateur non trouvé" lors du login

**Solution** : La base de données n'est pas initialisée. Exécutez `initApi.seedDatabase()`.

### Problème : Les données ne se mettent pas à jour

**Solution** : Vérifiez que vous rechargez les données après chaque modification (create/update/delete).

### Problème : CORS errors

**Solution** : Le serveur a les headers CORS ouverts, vérifiez que vous utilisez la bonne URL.

---

## 📚 Prochaines étapes

1. **Connecter le cPanel** : Remplacer les données mockées par des appels API
2. **Implémenter la login page** : Créer une vraie page de connexion
3. **Ajouter les formulaires** : Créer/Modifier des articles, users, etc.
4. **Gestion d'erreurs** : Afficher des messages d'erreur clairs
5. **Loading states** : Ajouter des spinners pendant le chargement
6. **Optimisation** : Ajouter du caching et de la pagination

---

## 🎉 Félicitations !

Votre cPanel Untouchables est maintenant connecté à un vrai backend et peut gérer de vraies données ! 🚀

**Identifiants admin** :
- Email : `admin@untouchables.fr`
- Password : `admin123`

Bon développement ! 🤘
