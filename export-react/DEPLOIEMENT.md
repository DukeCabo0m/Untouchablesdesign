# 🚀 Guide de déploiement rapide - Untouchables Coming Soon

Ce guide vous explique comment déployer votre page Coming Soon sur OVH en 5 minutes.

## ⚡ Déploiement rapide (5 minutes)

### Étape 1 : Préparez votre image de fond (2 min)

Vous avez **3 options** :

#### Option A - Image depuis l'aperçu Figma Make
1. Ouvrez l'aperçu de votre site
2. F12 → Network → Img
3. Trouvez l'image de fond
4. Téléchargez-la
5. Renommez-la `background.jpg`
6. Placez-la dans `/export-react/src/assets/`

#### Option B - Votre propre image
1. Choisissez une image sombre de concert/ambiance
2. Redimensionnez à 1920px de largeur (optionnel)
3. Renommez `background.jpg`
4. Placez dans `/export-react/src/assets/`

#### Option C - Image temporaire Unsplash
```bash
cd export-react/src/assets/
curl -o background.jpg "https://images.unsplash.com/photo-1585230699768-a31a4d76e48f?q=80&w=1920"
```

---

### Étape 2 : Installez et buildez (2 min)

```bash
cd export-react

# Installation des dépendances
npm install

# Build de production
npm run build
```

Le dossier `dist/` contient maintenant tous vos fichiers prêts ! 🎉

---

### Étape 3 : Uploadez sur OVH (1 min)

#### Avec FileZilla (recommandé)

1. **Téléchargez FileZilla** : https://filezilla-project.org/
2. **Connectez-vous à votre FTP OVH** :
   - Hôte : `ftp.votre-domaine.com` (ou l'adresse FTP fournie par OVH)
   - Identifiant : votre login FTP OVH
   - Mot de passe : votre mot de passe FTP
   - Port : 21

3. **Naviguez vers le dossier `www/` ou `public_html/`**

4. **Uploadez le CONTENU du dossier `dist/`** :
   - ⚠️ Uploadez les fichiers **DANS** `dist/`, pas le dossier `dist/` lui-même
   - Sélectionnez tout dans `dist/`
   - Glissez-déposez dans `www/`

5. **C'est terminé !** 🚀

---

### Étape 4 : Testez votre site

Visitez `https://votre-domaine.com` 

Vous devriez voir :
- ✅ Logo Untouchables avec effet glitch
- ✅ Compteur jusqu'au 1er février 2026
- ✅ Formulaire newsletter Mailchimp fonctionnel
- ✅ Liens réseaux sociaux
- ✅ Effets VHS et grain filmique

---

## 🔧 Configuration personnalisée (optionnel)

### Changer la date du lancement

Éditez `/src/components/Countdown.jsx` ligne 11 :

```javascript
const targetDate = new Date('2026-02-01T10:00:00+01:00');
// Changez en : new Date('YYYY-MM-DDTHH:MM:SS+01:00');
```

Puis relancez :
```bash
npm run build
```

### Personnaliser les liens sociaux

Éditez `/src/pages/ComingSoonPage.jsx` :

```javascript
// Ligne ~247
<a href="https://www.facebook.com/VOTRE_PAGE" ...>

// Ligne ~260
<a href="https://www.instagram.com/VOTRE_COMPTE" ...>

// Ligne ~273
<a href="https://www.youtube.com/VOTRE_CHAINE" ...>

// Ligne ~286
<a href="https://www.tiktok.com/@VOTRE_COMPTE" ...>
```

Puis relancez :
```bash
npm run build
```

---

## 📧 Newsletter Mailchimp

### Déjà configuré ! ✅

Le formulaire est **déjà connecté à votre liste Mailchimp** :
- URL : `https://untouchables.us10.list-manage.com`
- Liste ID : `69ed14db21`
- Utilisateur : `e804352b918b348ba3c71c6b8`

**Les emails sont automatiquement ajoutés à votre liste dès maintenant !**

### Tester l'inscription

1. Visitez votre site
2. Entrez un email de test
3. Cliquez sur "OK"
4. Vérifiez dans votre liste Mailchimp
5. ✅ L'email devrait apparaître !

---

## 🛠️ Mises à jour futures

Pour modifier la page après le déploiement :

1. Modifiez les fichiers dans `/src/`
2. Relancez `npm run build`
3. Uploadez à nouveau le contenu de `dist/` sur OVH

---

## 🆘 Aide rapide

### L'image ne s'affiche pas
```bash
# Vérifiez que l'image existe
ls -la src/assets/background.jpg

# Rebuild
npm run build
```

### La page est blanche
1. Vérifiez que vous avez uploadé le **contenu** de `dist/`, pas le dossier lui-même
2. Vérifiez que `index.html` est à la racine de `www/`
3. F12 dans le navigateur → Console pour voir les erreurs

### Le formulaire ne fonctionne pas
1. F12 → Console
2. Vérifiez les erreurs réseau
3. Testez avec un autre email
4. Vérifiez votre liste Mailchimp

---

## 📞 Support OVH

Si vous rencontrez des problèmes FTP/hébergement :
- Support OVH : https://www.ovh.com/fr/support/
- Guide FTP OVH : https://docs.ovh.com/fr/hosting/

---

## ✅ Checklist finale

Avant de lancer :

- [ ] Image de fond ajoutée dans `/src/assets/background.jpg`
- [ ] `npm install` exécuté
- [ ] `npm run build` exécuté sans erreur
- [ ] Dossier `dist/` créé avec succès
- [ ] Connexion FTP OVH testée
- [ ] Contenu de `dist/` uploadé sur OVH
- [ ] Site accessible sur votre domaine
- [ ] Formulaire newsletter testé
- [ ] Compteur fonctionne
- [ ] Effets visuels présents

---

## 🤘 Prêt à déployer !

Votre page Coming Soon Untouchables est maintenant prête à impressionner vos fans !

**Bon lancement ! 🔥**
