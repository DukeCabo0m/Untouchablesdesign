# 🚀 Quick Start - Social Media Kit Untouchables

## Installation rapide (2 minutes)

### 1. Installez les dépendances

```bash
cd social-media-kit
npm install
```

### 2. Lancez l'application

```bash
npm run dev
```

### 3. Ouvrez votre navigateur

Visitez : `http://localhost:5173`

---

## ✨ Utilisation en 3 étapes

### Étape 1 : Choisissez votre type de visuel

Dans le menu du haut, cliquez sur :
- 👤 **Avatars / Profils** - Pour vos photos de profil
- 🎨 **Bannières / Covers** - Pour vos couvertures Facebook, YouTube, Twitter
- 📱 **Posts Carrés** - Pour vos publications Instagram, Facebook
- 📲 **Stories** - Pour vos stories verticales

### Étape 2 : Personnalisez

- Sélectionnez un **style** ou **template**
- Remplissez les **champs de texte** avec votre contenu
- La **prévisualisation** se met à jour automatiquement

### Étape 3 : Téléchargez

Cliquez sur le bouton **"📥 Télécharger"** sous chaque visuel.

Le fichier PNG est généré et téléchargé automatiquement ! 🎉

---

## 🎯 Exemples d'utilisation

### Créer un avatar pour Instagram

1. Allez dans **👤 Avatars / Profils**
2. Choisissez le style "**Logo centré**"
3. Téléchargez le **Format Circulaire**
4. Uploadez sur Instagram !

### Créer une bannière Facebook

1. Allez dans **🎨 Bannières / Covers**
2. Tapez votre texte personnalisé
3. Téléchargez la bannière **Facebook**
4. Uploadez sur votre page Facebook !

### Créer un post d'annonce de concert

1. Allez dans **📱 Posts Carrés**
2. Sélectionnez le type "**🎸 Annonce Concert**"
3. Remplissez :
   - **Texte principal** : "KORN EN CONCERT"
   - **Sous-titre** : "Paris - Accor Arena"
   - **Date** : "15 JUIN 2026"
4. Téléchargez et postez !

### Créer une story Instagram

1. Allez dans **📲 Stories**
2. Choisissez le type "**📢 Annonce**"
3. Personnalisez les textes
4. Téléchargez (1080x1920)
5. Uploadez en story !

---

## 📏 Dimensions des visuels

| Type | Dimensions | Réseaux |
|------|-----------|---------|
| **Avatar Circulaire** | 500×500px | Instagram, Facebook, TikTok, YouTube |
| **Avatar Carré** | 500×500px | Twitter/X, LinkedIn |
| **Bannière Facebook** | 820×312px | Facebook |
| **Bannière YouTube** | 2560×1440px | YouTube |
| **Bannière Twitter** | 1500×500px | Twitter/X |
| **Post Carré** | 1080×1080px | Instagram, Facebook, LinkedIn |
| **Story** | 1080×1920px | Instagram, Facebook, Snapchat |

---

## 💡 Astuces

### ✅ Pour de meilleurs résultats

- **Textes courts** : Plus impactant et lisible
- **Testez plusieurs styles** : Téléchargez et comparez
- **Cohérence visuelle** : Utilisez le même style sur tous les réseaux
- **Prévisualisez sur mobile** : Vérifiez la lisibilité

### ⚠️ À éviter

- Textes trop longs qui débordent
- Trop d'informations sur un seul visuel
- Tester la qualité avant de publier en masse

---

## 🔧 Personnalisation avancée

### Modifier les couleurs par défaut

Éditez `/src/styles/theme.css` :

```css
@theme {
  --color-dark: #0A0A0A;   /* Changez le fond */
  --color-blood: #8B0000;  /* Changez l'accent */
  --color-light: #E0E0E0;  /* Changez le texte */
}
```

### Ajouter votre propre logo

Remplacez le contenu de `/src/components/UntouchablesLogo.jsx` par votre SVG.

---

## 🆘 Problèmes courants

### Le téléchargement ne fonctionne pas
- Vérifiez votre connexion
- Rafraîchissez la page (Ctrl+F5)
- Vérifiez la console (F12)

### Les effets visuels sont absents
- Relancez `npm run dev`
- Videz le cache du navigateur

### L'image téléchargée est floue
- C'est normal pendant la génération
- Attendez que le téléchargement se termine
- La qualité finale est HD

---

## 🤘 Prêt !

Vous êtes maintenant prêt à créer tous vos visuels Untouchables ! 🔥

**Questions ?** Consultez le `README.md` pour plus de détails.

---

**Untouchables** - Communauté francophone de fans de Korn
