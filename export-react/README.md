# Untouchables - Page Coming Soon (React/Vite)

Version standalone React/Vite de votre page Coming Soon, prête à être déployée sur votre serveur OVH mutualisé.

## 📦 Structure du projet

```
export-react/
├── index.html              # Page HTML principale
├── package.json            # Dépendances npm
├── vite.config.js          # Configuration Vite
├── src/
│   ├── main.jsx           # Point d'entrée React
│   ├── App.jsx            # Composant racine
│   ├── assets/            # Dossier pour l'image de fond
│   │   └── background.jpg # VOTRE IMAGE À AJOUTER ICI
│   ├── styles/
│   │   └── theme.css      # Styles globaux Tailwind v4
│   ├── components/
│   │   ├── GlitchLogo.jsx
│   │   ├── UntouchablesLogo.jsx
│   │   ├── FilmGrain.jsx
│   │   ├── ScanLines.jsx
│   │   └── Countdown.jsx
│   └── pages/
│       └── ComingSoonPage.jsx
└── README.md              # Ce fichier

```

## 🚀 Installation

### 1. Prérequis

- Node.js 18+ (téléchargez sur https://nodejs.org)
- npm ou pnpm

### 2. Installation des dépendances

```bash
cd export-react
npm install
```

Ou si vous utilisez pnpm :
```bash
pnpm install
```

### 3. Ajouter votre image de fond

**Option A - Depuis votre application React existante :**
1. Lancez l'aperçu de votre site Figma Make
2. Ouvrez la page `/coming-soon`
3. Ouvrez les outils de développement (F12)
4. Allez dans l'onglet "Network" > Filtrez par "Img"
5. Trouvez l'image de fond et téléchargez-la
6. Placez-la dans `/src/assets/background.jpg`

**Option B - Utilisez votre propre image :**
- Placez n'importe quelle image sombre dans `/src/assets/background.jpg`
- Format recommandé : JPEG, 1920px de largeur, qualité 70-80%

**Option C - Utilisez une image temporaire :**
- Téléchargez cette image : https://images.unsplash.com/photo-1585230699768-a31a4d76e48f?q=80&w=1920
- Sauvegardez-la dans `/src/assets/background.jpg`

## 💻 Développement local

Lancez le serveur de développement :

```bash
npm run dev
```

Le site sera accessible sur `http://localhost:5173`

## 🏗️ Build pour la production

### 1. Créer le build

```bash
npm run build
```

Ceci génère un dossier `dist/` avec tous les fichiers optimisés prêts pour le déploiement.

### 2. Tester le build localement (optionnel)

```bash
npm run preview
```

## 📤 Déploiement sur OVH Mutualisé

### Méthode 1 : Via FTP (recommandée pour OVH mutualisé)

1. **Connectez-vous à votre FTP OVH** :
   - Hôte : `ftp.votre-domaine.com`
   - Utilisateur : votre identifiant OVH
   - Mot de passe : votre mot de passe FTP
   - Utilisez FileZilla, Cyberduck ou tout client FTP

2. **Uploadez le contenu du dossier `dist/`** :
   - Allez dans le dossier `www` ou `public_html` de votre serveur OVH
   - Uploadez **tous les fichiers et dossiers** contenus dans `dist/`
   - ⚠️ N'uploadez PAS le dossier `dist` lui-même, mais son contenu

3. **Structure sur le serveur** :
   ```
   www/
   ├── index.html
   ├── assets/
   │   ├── index-xxxxx.js
   │   ├── index-xxxxx.css
   │   └── background-xxxxx.jpg
   └── ... (autres fichiers générés)
   ```

4. **Accédez à votre site** :
   - Visitez `https://votre-domaine.com`
   - La page Coming Soon devrait s'afficher ! 🎉

### Méthode 2 : Via SSH (si disponible)

Si votre hébergement OVH le permet :

```bash
# 1. Connectez-vous en SSH
ssh votre-user@votre-domaine.com

# 2. Naviguez vers le dossier web
cd www

# 3. Sur votre machine locale, transférez les fichiers
scp -r dist/* votre-user@votre-domaine.com:~/www/
```

## ⚙️ Configuration

### Modifier la date du countdown

Éditez `/src/components/Countdown.jsx`, ligne 11 :

```javascript
const targetDate = new Date('2026-02-01T10:00:00+01:00');
```

Format : `'YYYY-MM-DDTHH:MM:SS+TIMEZONE'`

### Personnaliser les liens sociaux

Éditez `/src/pages/ComingSoonPage.jsx`, lignes ~247-300 :

```javascript
<a href="https://www.facebook.com/votre-page" ...>
<a href="https://www.instagram.com/votre-compte" ...>
```

### Mailchimp déjà intégré

Le formulaire newsletter est **déjà connecté à votre compte Mailchimp** :
- ✅ Les emails sont automatiquement ajoutés à votre liste
- ✅ Validation en temps réel
- ✅ Messages d'erreur personnalisés
- ✅ Fonctionne sans backend supplémentaire

Vous n'avez rien à faire - c'est prêt à l'emploi ! 🎉

### Pour un autre service newsletter (optionnel)

Si vous souhaitez utiliser un service différent que Mailchimp, éditez `/src/pages/ComingSoonPage.jsx` :

```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  
  // AJOUTEZ ICI votre appel API
  fetch('https://votre-api.com/newsletter', {
    method: 'POST',
    body: JSON.stringify({ email }),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.json())
  .then(data => {
    setIsSubmitted(true);
    // ...
  });
};
```

Ou utilisez un service tiers comme :
- Mailchimp
- Sendinblue
- ConvertKit
- Etc.

### Changer l'image de fond

Remplacez simplement `/src/assets/background.jpg` par votre image.

## 🎨 Technologies utilisées

- ⚛️ **React 18** - Bibliothèque UI
- ⚡ **Vite 6** - Build tool ultra-rapide
- 🎨 **Tailwind CSS v4** - Framework CSS utility-first
- 🎭 **Motion** (Framer Motion) - Animations fluides
- 🎯 **JavaScript ES6+** - Pas de TypeScript pour simplifier

## 📝 Notes importantes

### Pour OVH Mutualisé

- ✅ **Pas de configuration serveur nécessaire** - Tout est statique
- ✅ **Compatible avec tous les hébergements mutualisés** OVH
- ✅ **Très léger** - ~150KB de JS total (gzippé)
- ✅ **Performance optimale** - Build Vite optimisé

### Contenu statique uniquement

Cette page est 100% statique (HTML/CSS/JS) :
- ✅ Fonctionne sur n'importe quel hébergement web
- ✅ Pas besoin de Node.js sur le serveur
- ✅ Pas besoin de base de données
- ✅ **Formulaire newsletter connecté à Mailchimp** - Les inscriptions fonctionnent directement !

## 🐛 Dépannage

### L'image de fond ne s'affiche pas

1. Vérifiez que `/src/assets/background.jpg` existe
2. Relancez le build : `npm run build`
3. Vérifiez la console du navigateur pour les erreurs

### La page est blanche après le déploiement

1. Vérifiez que tous les fichiers de `dist/` ont été uploadés
2. Vérifiez que `index.html` est bien à la racine de `www/`
3. Vérifiez la console du navigateur (F12) pour les erreurs

### Le countdown ne fonctionne pas

1. Vérifiez la date dans `/src/components/Countdown.jsx`
2. Assurez-vous que le format de date est correct
3. Rechargez la page (Ctrl+F5)

## 📞 Support

Pour toute question :
1. Vérifiez ce README
2. Consultez la console du navigateur (F12) pour les erreurs
3. Vérifiez les logs de votre serveur OVH

## 🔄 Mises à jour

Pour mettre à jour la page après le premier déploiement :

1. Modifiez les fichiers sources dans `/src/`
2. Reconstruisez : `npm run build`
3. Uploadez à nouveau le contenu de `dist/` sur votre serveur FTP

## 🤘 Enjoy!

Votre page Coming Soon Untouchables est maintenant prête à être déployée !

---

**Untouchables** - Communauté francophone de fans de Korn