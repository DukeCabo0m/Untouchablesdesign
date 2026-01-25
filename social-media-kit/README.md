# Untouchables - Social Media Kit Generator

Application React pour générer vos visuels réseaux sociaux avec l'esthétique "Organic Glitch & Shadows" / "High-Def Horror".

## 🎨 Fonctionnalités

### 👤 Avatars / Profils
- Format circulaire (Instagram, Facebook, TikTok, YouTube, Discord)
- Format carré (Twitter/X, LinkedIn, Threads)
- 4 styles différents : Logo centré, Logo minimal, Effet sang, Glitch sombre
- Résolution : 500×500px (HD)

### 🎨 Bannières / Covers
- **Facebook** : 820×312px
- **YouTube** : 2560×1440px (zone sûre optimisée)
- **Twitter/X** : 1500×500px
- Texte personnalisable
- Effets visuels cohérents

### 📱 Posts Carrés
- Format : 1080×1080px
- 4 types de templates :
  - 🎸 Annonce Concert
  - 💬 Citation
  - 📰 Actualité
  - 📖 Fanzine
- Textes entièrement personnalisables
- Compatible : Instagram, Facebook, LinkedIn, Twitter/X

### 📲 Stories
- Format : 1080×1920px (9:16 vertical)
- 4 types de templates :
  - 📢 Annonce
  - ⏰ Compte à rebours
  - 📊 Sondage
  - 💭 Citation
- Textes personnalisables
- Compatible : Instagram Stories, Facebook Stories, Snapchat

## 🚀 Installation

### Prérequis
- Node.js 18+
- npm ou pnpm

### Installation des dépendances

```bash
cd social-media-kit
npm install
```

## 💻 Développement

Lancez le serveur de développement :

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 🏗️ Build pour production

```bash
npm run build
```

Le dossier `dist/` contiendra les fichiers optimisés.

## 📖 Utilisation

1. **Choisissez un type de visuel** : Avatars, Bannières, Posts ou Stories
2. **Sélectionnez un style ou template**
3. **Personnalisez les textes** dans les champs de formulaire
4. **Prévisualisez** en temps réel
5. **Téléchargez** au format PNG en haute résolution

### Téléchargement des visuels

Chaque template dispose d'un bouton "Télécharger" qui génère automatiquement une image PNG aux bonnes dimensions :

- Les avatars sont générés en 500×500px
- Les bannières sont générées aux dimensions spécifiques de chaque réseau
- Les posts sont générés en 1080×1080px
- Les stories sont générées en 1080×1920px

**Note importante** : La génération peut prendre quelques secondes pour les grandes images (bannières YouTube notamment).

## 🎨 Charte graphique

### Palette de couleurs
- **Fond** : `#0A0A0A` (noir profond)
- **Accent** : `#8B0000` (rouge sang)
- **Texte** : `#E0E0E0` (gris clair)

### Typographie
- **Titres** : Arial Black, Impact (condensée, extra-bold)
- **Corps** : Courier New, Courier (monospace)

### Effets visuels
- Grain filmique (15% opacité)
- Scanlines VHS (10% opacité)
- Effets glitch RGB
- Dégradés rouges subtils
- Corners et bordures décoratives

## 🛠️ Technologies utilisées

- ⚛️ **React 18** - Bibliothèque UI
- ⚡ **Vite 6** - Build tool
- 🎨 **Tailwind CSS v4** - Framework CSS
- 🎭 **Motion** (Framer Motion) - Animations
- 🖼️ **html2canvas** - Génération d'images

## 📂 Structure du projet

```
social-media-kit/
├── src/
│   ├── App.jsx                    # Application principale
│   ├── main.jsx                   # Point d'entrée
│   ├── components/
│   │   ├── FilmGrain.jsx         # Effet grain filmique
│   │   ├── ScanLines.jsx         # Effet scanlines VHS
│   │   ├── UntouchablesLogo.jsx  # Logo SVG
│   │   ├── GlitchText.jsx        # Composant texte glitch
│   │   ├── Navigation.jsx        # Menu de navigation
│   │   └── DownloadButton.jsx    # Bouton de téléchargement
│   ├── pages/
│   │   ├── AvatarTemplates.jsx   # Templates avatars
│   │   ├── BannerTemplates.jsx   # Templates bannières
│   │   ├── PostTemplates.jsx     # Templates posts carrés
│   │   └── StoryTemplates.jsx    # Templates stories
│   └── styles/
│       └── theme.css             # Styles globaux
├── package.json
├── vite.config.js
└── README.md
```

## 💡 Conseils d'utilisation

### Pour les avatars
- Le format circulaire est coupé en cercle par les réseaux sociaux
- Privilégiez les designs centrés
- Testez sur mobile pour vérifier la lisibilité

### Pour les bannières
- **YouTube** : La zone sûre est au centre (le haut/bas peuvent être coupés sur mobile)
- **Facebook** : Optimisé pour ordinateur, peut être rogné sur mobile
- **Twitter/X** : Vérifiez que les éléments importants sont au centre

### Pour les posts
- Gardez les textes courts et impactants
- Laissez de l'espace de respiration
- Pensez au contraste pour la lisibilité

### Pour les stories
- Zone sûre : évitez le texte trop haut (masqué par le pseudo) ou trop bas (masqué par les CTA)
- Pensez vertical !
- Ajoutez des stickers interactifs après l'upload

## 🔄 Personnalisation

### Modifier les couleurs

Éditez `/src/styles/theme.css` :

```css
@theme {
  --color-dark: #0A0A0A;      /* Fond */
  --color-blood: #8B0000;     /* Accent */
  --color-light: #E0E0E0;     /* Texte */
}
```

### Ajouter de nouveaux templates

Créez un nouveau fichier dans `/src/pages/` en vous inspirant des templates existants.

## 🐛 Dépannage

### Les images ne se téléchargent pas
- Vérifiez que vous avez bien installé `html2canvas`
- Essayez de rafraîchir la page
- Vérifiez la console pour les erreurs

### Les effets visuels ne s'affichent pas
- Vérifiez que les composants `FilmGrain` et `ScanLines` sont bien importés
- Relancez le serveur de développement

### La qualité des images est mauvaise
- La qualité est définie à `scale: 2` dans `html2canvas`
- Vous pouvez l'augmenter dans `/src/components/DownloadButton.jsx`

## 📝 Notes

- Les visuels sont générés côté client (rien n'est envoyé sur un serveur)
- Tous les visuels sont téléchargés au format PNG
- La génération peut prendre quelques secondes pour les grandes images

## 🤘 Crédits

**Untouchables** - Communauté francophone de fans de Korn
Esthétique : "Organic Glitch & Shadows" / "High-Def Horror"

---

Bon design ! 🔥
