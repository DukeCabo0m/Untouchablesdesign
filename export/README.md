# Untouchables - Page Coming Soon

## 📦 Contenu

Ce dossier contient une page Coming Soon statique (HTML/CSS/JS) prête à être hébergée sur votre serveur.

### Fichiers inclus :

- **index.html** - Page HTML principale
- **styles.css** - Feuille de styles CSS (avec image de fond Unsplash intégrée)
- **script.js** - Script JavaScript pour le countdown et les animations
- **README.md** - Ce fichier d'instructions

## 🚀 Installation

### Installation simple (recommandée)

1. **Téléchargez les fichiers** :
   - index.html
   - styles.css
   - script.js

2. **Uploadez sur votre serveur** :
   - Transférez tous les fichiers dans le répertoire racine de votre domaine
   - Assurez-vous que le fichier `index.html` est accessible à la racine
   - **C'est tout !** L'image de fond est déjà configurée via URL (Unsplash)

### Installation avec image personnalisée (optionnel)

Si vous préférez utiliser votre propre image de fond :

1. Placez votre image dans le même dossier que les fichiers HTML/CSS/JS
2. Nommez-la `background.jpg` (ou autre nom)
3. Dans **styles.css** (ligne ~30), remplacez l'URL Unsplash par :
   ```css
   background: url('background.jpg') center/cover;
   ```

## ⚙️ Configuration

### Modifier la date de lancement

Dans le fichier **script.js**, ligne 3, modifiez la date cible :

```javascript
const targetDate = new Date('2026-02-01T10:00:00+01:00');
```

Format : `'YYYY-MM-DDTHH:MM:SS+TIMEZONE'`
- Exemple pour le 1er février 2026 à 10h (heure de Paris) : `'2026-02-01T10:00:00+01:00'`

### Personnaliser les liens sociaux

Dans le fichier **index.html**, modifiez les liens vers vos réseaux sociaux (lignes ~220-240) :

```html
<a href="https://www.facebook.com/korn" ...>
<a href="https://www.instagram.com/korn" ...>
<a href="https://www.youtube.com/korn" ...>
<a href="https://www.tiktok.com/@korn" ...>
```

### Configurer le formulaire newsletter

Le formulaire est actuellement en mode "démo" (il affiche juste un message de confirmation).

Pour le connecter à un vrai service de newsletter, modifiez le fichier **script.js** à partir de la ligne 37 :

```javascript
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = emailInput.value;
    
    // AJOUTEZ ICI votre code pour envoyer l'email à votre service
    // Exemples : Mailchimp, Sendinblue, votre propre API, etc.
    
    console.log('Email soumis:', email);
    // ...
});
```

## 🎨 Caractéristiques

- ✅ **Design "High-Def Horror"** avec effets VHS et glitch
- ✅ **Compteur en temps réel** jusqu'à la date de lancement
- ✅ **Effets visuels** : Film grain, scanlines, TV flicker
- ✅ **Logo animé** avec effet glitch RGB aléatoire
- ✅ **Formulaire newsletter** prêt à être connecté
- ✅ **Liens réseaux sociaux** avec animations hover
- ✅ **100% responsive** - fonctionne sur mobile et desktop
- ✅ **Aucune dépendance externe** - tout en vanilla JS

## 📱 Compatibilité

- Chrome, Firefox, Safari, Edge (versions récentes)
- Compatible mobile et tablette
- Pas de dépendances externes (React, jQuery, etc.)

## 🔧 Support navigateur

Les animations CSS sont compatibles avec tous les navigateurs modernes.
Pour IE11, certaines animations peuvent ne pas fonctionner parfaitement.

## 📝 Notes techniques

- Le compteur utilise le fuseau horaire du navigateur de l'utilisateur
- La date cible est définie en UTC+1 (heure de Paris)
- Les effets de glitch sont déclenchés aléatoirement toutes les 3-6 secondes
- Le film grain et les scanlines sont des animations CSS pures
- Aucune bibliothèque JavaScript externe n'est requise

## 🎯 Étapes suivantes

1. Testez la page localement en ouvrant `index.html` dans votre navigateur
2. Vérifiez que le compteur affiche correctement le temps restant
3. Personnalisez les liens et l'image de fond
4. Uploadez sur votre serveur
5. Connectez le formulaire à votre service de newsletter

## 💡 Conseils

- **Optimisez votre image de fond** : utilisez une image compressée (JPEG, qualité 70-80%) pour un chargement rapide
- **Testez sur mobile** : vérifiez que tout s'affiche correctement sur différentes tailles d'écran
- **Analytics** : ajoutez Google Analytics ou un autre service de tracking si besoin
- **Favicon** : ajoutez un favicon pour une apparence plus professionnelle

## 🤘 Support

Pour toute question ou problème, contactez l'équipe Untouchables.

---

**Untouchables** - Communauté francophone de fans de Korn