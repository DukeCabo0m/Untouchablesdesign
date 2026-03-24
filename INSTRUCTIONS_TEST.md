# 🧪 Instructions de test - Backend Untouchables

**Objectif** : Vérifier que le backend Supabase fonctionne correctement après la correction de l'erreur 401.

---

## 📋 Prérequis

✅ Navigateur web moderne (Chrome, Firefox, Safari, Edge)  
✅ Console développeur ouverte (F12) pour voir les logs  
✅ Connexion internet stable

---

## 🎯 Protocole de test

### Test 1 : Health Check (Vérification serveur)

**Objectif** : Confirmer que le serveur Supabase Edge Function répond

1. Aller sur la page : `/admin/init`
2. Cliquer sur le bouton `[TEST SERVER]`
3. **Résultat attendu** :
   ```
   ✅ Serveur accessible: {"status":"ok"}
   ```
4. **Console** : Vérifier les logs `[HEALTH CHECK]`

**Si échec** :
- Vérifier que le header Authorization est présent
- Vérifier la connexion internet
- Vérifier l'URL du projet Supabase

---

### Test 2 : Seed Database (Initialisation données)

**Objectif** : Créer les données de test dans la base de données

1. Sur `/admin/init`, cliquer sur `[INITIALIZE DATABASE]`
2. Attendre quelques secondes (le bouton affiche `[LOADING...]`)
3. **Résultat attendu** :
   ```
   ✅ Base de données initialisée avec succès !
   📊 Créé: 5 users, 4 articles, 3 albums, 4 concerts, 5 comments
   ```
4. **Console** : Vérifier les logs `[SEED]`

**Données créées** :
- 👥 **5 utilisateurs** (1 admin + 4 users)
  - Admin : `admin@untouchables.fr` / `admin123`
  - User 1 : `KornFan88`
  - User 2 : `MetalheadFR`
  - User 3 : `JDavisFan` (inactif)
  - User 4 : `ToxicSpammer` (banni)

- 💿 **3 albums** de Korn
  - Korn (1994)
  - Follow the Leader (1998)
  - Issues (1999)

- 📰 **4 articles**
  - Tournée européenne 2026 (publié)
  - Interview Jonathan Davis (publié)
  - Chronique album Issues (publié)
  - Nouveau single (brouillon)

- 🎸 **4 concerts**
  - Paris - Accor Arena (2026-07-15)
  - Lyon - Halle Tony Garnier (2026-07-18)
  - Marseille - Dome (2026-07-20)
  - Hellfest 2025 (terminé)

- 💬 **5 commentaires** sur les articles

**Si échec** :
- Vérifier les logs de la console
- Relancer le test après quelques secondes
- Vérifier que le serveur Supabase est bien déployé

---

### Test 3 : Login Admin (Authentification)

**Objectif** : Tester la connexion avec le compte administrateur

1. Sur `/admin/init`, cliquer sur `[TEST LOGIN]`
2. Le système utilise automatiquement :
   - Email : `admin@untouchables.fr`
   - Password : `admin123`
3. **Résultat attendu** :
   ```
   ✅ Login réussi ! User: admin
   ```
4. **Console** : Vérifier les logs du login

**Si échec** :
- S'assurer que le seed a été exécuté (Test 2)
- Vérifier les identifiants
- Vérifier la console pour les détails de l'erreur

---

### Test 4 : Stats Dashboard (Statistiques)

**Objectif** : Vérifier que les statistiques se chargent après login

1. Après un login réussi (Test 3), les stats s'affichent automatiquement
2. **Résultat attendu** : Une grille de 6 cartes statistiques :

```
┌──────────────────┬──────────────────┐
│ Total Users      │ Total Articles   │
│      5           │       4          │
├──────────────────┼──────────────────┤
│ Total Albums     │ Total Concerts   │
│      3           │       4          │
├──────────────────┼──────────────────┤
│ Active Users     │ Upcoming Concerts│
│      4           │       3          │
└──────────────────┴──────────────────┘
```

**Si échec** :
- Vérifier que le login a réussi
- Vérifier les logs API dans la console
- Relancer le test après quelques secondes

---

## ✅ Checklist complète

Cochez chaque test réussi :

- [ ] **Test 1** : Health Check → ✅ Serveur accessible
- [ ] **Test 2** : Seed Database → ✅ Données créées (5/4/3/4/5)
- [ ] **Test 3** : Login Admin → ✅ Connecté en tant qu'admin
- [ ] **Test 4** : Stats Dashboard → ✅ Statistiques affichées

---

## 🔍 Console de débogage

Pour vérifier les logs détaillés :

1. Ouvrir la console (F12)
2. Chercher les préfixes :
   - `[HEALTH CHECK]` → Test du serveur
   - `[SEED]` → Initialisation DB
   - `[API]` → Appels API
   - `Login result:` → Résultat du login
   - `Stats:` → Statistiques

**Exemple de logs réussis** :
```
[HEALTH CHECK] Starting test...
[HEALTH CHECK] Using publicAnonKey: eyJhbGciOiJIUzI1NiI...
[HEALTH CHECK] Response status: 200
[HEALTH CHECK] Response data: {status: "ok"}

[SEED] Starting database seeding...
[SEED] Calling initApi.seedDatabase()...
[API] POST https://...supabase.co/.../init/seed
[API] Response 200 for /init/seed
[SEED] Success! Result: {message: "...", stats: {...}}

[API] POST https://...supabase.co/.../auth/login
[API] Response 200 for /auth/login
Login result: {token: "...", user: {...}}

[API] GET https://...supabase.co/.../stats/dashboard
[API] Response 200 for /stats/dashboard
Stats: {totalUsers: 5, totalArticles: 4, ...}
```

---

## 🚨 En cas de problème

### Erreur 401
**Symptôme** : `❌ Erreur HTTP: 401`  
**Solution** : Le header Authorization est manquant  
**Action** : Vérifier que la correction a bien été appliquée dans `AdminInitPage.tsx`

### Erreur réseau
**Symptôme** : `❌ Erreur réseau: Failed to fetch`  
**Solution** : Problème de connexion internet ou serveur Supabase down  
**Action** : Vérifier la connexion, réessayer dans quelques minutes

### Utilisateur non trouvé au login
**Symptôme** : `❌ Erreur login: Utilisateur non trouvé`  
**Solution** : La base n'a pas été initialisée  
**Action** : Exécuter d'abord le Test 2 (Seed Database)

### Données vides dans les stats
**Symptôme** : Toutes les stats affichent 0  
**Solution** : La base n'a pas été initialisée ou est vide  
**Action** : Exécuter le Test 2 (Seed Database)

---

## 📊 Valeurs attendues

Après un seed réussi, voici les valeurs exactes des statistiques :

| Métrique | Valeur | Détails |
|----------|--------|---------|
| Total Users | 5 | 1 admin + 4 users |
| Total Articles | 4 | 3 publiés + 1 brouillon |
| Total Albums | 3 | Korn, Follow the Leader, Issues |
| Total Concerts | 4 | 3 à venir + 1 passé |
| Total Comments | 5 | 4 approuvés + 1 spam |
| Active Users | 4 | Tous sauf JDavisFan (inactif) |
| Published Articles | 3 | Tous sauf le brouillon |
| Upcoming Concerts | 3 | Concerts 2026 (pas Hellfest 2025) |

---

## 🎯 Objectif final

**Tous les tests doivent passer !**

Si tous les tests passent, vous avez confirmé que :
✅ Le serveur Supabase Edge Function est accessible  
✅ Le header Authorization est correctement configuré  
✅ Les données peuvent être créées dans la base  
✅ L'authentification fonctionne  
✅ Les endpoints API répondent correctement  
✅ Les statistiques se calculent bien

**🎉 Bravo ! Le backend est 100% opérationnel !**

---

## 📚 Documentation

Pour aller plus loin :
- `/RESUME_RAPIDE.md` → Résumé ultra-court
- `/ERREUR_401_RESOLUTION.md` → Analyse détaillée du problème
- `/CHANGELOG_BACKEND.md` → Historique complet
- `/BACKEND_GUIDE.md` → Guide d'utilisation de l'API
- `/BACKEND_SETUP_COMPLETE.md` → Configuration complète

---

**Date de création** : 16 mars 2026  
**Dernière mise à jour** : 16 mars 2026  
**Auteur** : Équipe Untouchables
