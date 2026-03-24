# 🧪 GUIDE DE TEST - PHASE 3

## 🎯 Ce qui a été fait

La **Phase 3 - Admin Avancé** est terminée avec :
- ✅ **12 nouveaux endpoints** backend (Reports, Bans, Logs)
- ✅ **3 pages admin** connectées au backend réel
- ✅ **26 seed items** de démonstration (6 reports + 5 bans + 15 logs)

---

## 🚀 ÉTAPE 1 : Seed les données

### Option A : Seed complet (recommandé)
```bash
POST https://[PROJECT_ID].supabase.co/functions/v1/make-server-d462d5d8/init/seed
```

Cela va seed:
- Étape 1/5 : Database (users, articles, etc.)
- Étape 2/5 : Media data
- Étape 3/5 : Contributions
- Étape 4/5 : Fanzines
- **Étape 5/5 : Moderation data** ← NOUVEAU !

---

## 🧪 ÉTAPE 2 : Tester les pages admin

### 1. Se connecter en tant qu'admin

**Email:** `admin@untouchables.fr`  
**Password:** `admin123`

Ou créer un compte et lui donner le rôle admin via le backend.

---

### 2. AdminReportsPage → `/admin/reports`

**Ce qu'on doit voir :**
- ✅ **6 signalements** dans la table
- ✅ **Stats cards:**
  - Total: 6
  - En attente: 3
  - Résolus: 2
  - Rejetés: 1

**Fonctionnalités à tester :**
1. **Filtrer par statut** (all, pending, resolved, dismissed)
2. **Rechercher** dans la barre de recherche
3. **Cliquer "Examiner"** → Affiche alert avec détails
4. **Cliquer "Résoudre"** sur un report pending → Prompt pour note → Refresh
5. **Cliquer "Rejeter"** sur un report pending → Prompt pour note → Refresh

**Exemple de report seedé :**
- Signalé par: `KornFan89`
- Cible: `user-spam-001` (type: user)
- Raison: `Spam massif`
- Statut: `pending`

---

### 3. AdminBansPage → `/admin/bans`

**Ce qu'on doit voir :**
- ✅ **5 bannissements** dans la table
- ✅ **Stats cards:**
  - Total: 5
  - Actifs: 2
  - Permanents: 2
  - Expirés: 1

**Fonctionnalités à tester :**
1. **Filtrer par statut** (all, active, expired)
2. **Rechercher** un utilisateur
3. **Cliquer "Voir détails"** → Affiche alert avec infos
4. **Cliquer "Débannir"** sur un ban actif → Confirmation → Refresh
5. **Cliquer "Supprimer"** → Confirmation → Refresh

**Exemple de ban seedé :**
- Username: `SpamBot666`
- Email: `spam@evil.com`
- Raison: `Spam massif et publicité répétée`
- Type: `permanent`
- Statut: `active`

---

### 4. AdminLogsPage → `/admin/logs`

**Ce qu'on doit voir :**
- ✅ **15 logs** dans la timeline
- ✅ **Stats cards:**
  - Total: 15
  - Info: X
  - Warnings: X
  - Errors: X

**Fonctionnalités à tester :**
1. **Filtrer par niveau** (all, info, success, warning, error)
2. **Rechercher** dans action ou details
3. **Voir la timeline** avec icônes colorées
4. **Hover sur un log** → Effet hover

**Exemples de logs seedés :**
- **Success:** `USER_UPDATE` - Utilisateur DarkFreak666 modifié
- **Error:** `DB_ERROR` - Connexion DB timeout (3s)
- **Warning:** `STORAGE_WARNING` - Espace disque à 75%
- **Info:** `ARTICLE_CREATE` - Nouvel article créé

---

## 🔍 ÉTAPE 3 : Vérifier les endpoints directement

### Reports

```bash
# Liste tous les reports (admin only)
curl -X GET "https://[PROJECT_ID].supabase.co/functions/v1/make-server-d462d5d8/reports" \
  -H "Authorization: Bearer [TOKEN]"

# Résoudre un report
curl -X PUT "https://[PROJECT_ID].supabase.co/functions/v1/make-server-d462d5d8/reports/report-001/resolve" \
  -H "Authorization: Bearer [TOKEN]" \
  -H "Content-Type: application/json" \
  -d '{"note": "Traité avec succès"}'

# Rejeter un report
curl -X PUT "https://[PROJECT_ID].supabase.co/functions/v1/make-server-d462d5d8/reports/report-002/dismiss" \
  -H "Authorization: Bearer [TOKEN]" \
  -H "Content-Type: application/json" \
  -d '{"note": "Fausse alerte"}'
```

### Bans

```bash
# Liste tous les bans (admin only)
curl -X GET "https://[PROJECT_ID].supabase.co/functions/v1/make-server-d462d5d8/bans" \
  -H "Authorization: Bearer [TOKEN]"

# Révoquer un ban
curl -X PUT "https://[PROJECT_ID].supabase.co/functions/v1/make-server-d462d5d8/bans/ban-002/revoke" \
  -H "Authorization: Bearer [TOKEN]"

# Supprimer un ban
curl -X DELETE "https://[PROJECT_ID].supabase.co/functions/v1/make-server-d462d5d8/bans/ban-005" \
  -H "Authorization: Bearer [TOKEN]"
```

### Logs

```bash
# Liste tous les logs (admin only)
curl -X GET "https://[PROJECT_ID].supabase.co/functions/v1/make-server-d462d5d8/logs" \
  -H "Authorization: Bearer [TOKEN]"

# Logs par niveau
curl -X GET "https://[PROJECT_ID].supabase.co/functions/v1/make-server-d462d5d8/logs/level/error" \
  -H "Authorization: Bearer [TOKEN]"
```

---

## ✅ CHECKLIST DE TEST

### AdminReportsPage
- [ ] La page charge sans erreur
- [ ] Les 6 reports s'affichent
- [ ] Les stats cards sont corrects
- [ ] Le filtre par statut fonctionne
- [ ] La recherche fonctionne
- [ ] L'action "Examiner" affiche les détails
- [ ] L'action "Résoudre" fonctionne (avec refresh)
- [ ] L'action "Rejeter" fonctionne (avec refresh)
- [ ] Pas d'erreurs console

### AdminBansPage
- [ ] La page charge sans erreur
- [ ] Les 5 bans s'affichent
- [ ] Les stats cards sont corrects
- [ ] Le filtre par statut fonctionne
- [ ] La recherche fonctionne
- [ ] L'action "Voir détails" affiche les infos
- [ ] L'action "Débannir" fonctionne (avec confirmation)
- [ ] L'action "Supprimer" fonctionne (avec confirmation)
- [ ] Pas d'erreurs console

### AdminLogsPage
- [ ] La page charge sans erreur
- [ ] Les 15 logs s'affichent
- [ ] Les stats cards sont corrects
- [ ] Le filtre par niveau fonctionne
- [ ] La recherche fonctionne
- [ ] Les icônes et couleurs sont correctes
- [ ] Le hover effect fonctionne
- [ ] Pas d'erreurs console

---

## 🐛 BUGS POSSIBLES ET SOLUTIONS

### Erreur 401 "Non autorisé"
**Cause:** Token manquant ou invalide  
**Solution:** Se reconnecter en tant qu'admin

### Erreur 403 "Accès non autorisé"
**Cause:** Le compte n'a pas le rôle "admin"  
**Solution:** Vérifier que le user a `roles: ["admin"]`

### Page vide / pas de données
**Cause:** Seed pas encore exécuté  
**Solution:** Exécuter le POST `/init/seed`

### Loading infini
**Cause:** Problème réseau ou endpoint non disponible  
**Solution:** Vérifier les logs serveur et la console

---

## 📝 NOTES IMPORTANTES

### Données de test
Les données seedées sont des **mocks** pour démonstration.  
Les IDs sont fixes (ex: `report-001`, `ban-002`, `log-003`).

### Authentification
Toutes les pages admin nécessitent :
1. Un token valide dans `localStorage.authToken`
2. Un compte avec rôle `"admin"`

### Performance
- Les logs sont limités à 1000 max
- Le tri est fait côté serveur
- Les filtres côté client sont optimisés

---

## 🎉 SUCCÈS !

Si tous les tests passent, la **Phase 3** est fonctionnelle à 100% ! 🚀

**Points clés validés :**
- ✅ Backend robuste avec 12 endpoints
- ✅ Frontend admin connecté
- ✅ Seed data opérationnel
- ✅ Modération complète (Reports + Bans + Logs)

---

## 🚀 PROCHAINES ÉTAPES

Après validation de la Phase 3 :
1. **Google Analytics** - Intégration GA4 dans AdminAnalyticsPage
2. **Widgets sociaux** - Connecter Instagram/TikTok/YouTube APIs
3. **Tests end-to-end** - Scénarios complets utilisateur
4. **Optimisations** - Performance et UX

Bon test ! 🎸🔥
