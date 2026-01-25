# 🖼️ Comment récupérer l'image de fond exacte de votre site React

L'image de fond utilisée dans votre application React est stockée dans un système virtuel de Figma Make et n'est pas directement accessible comme fichier. Voici comment la récupérer :

## 🎯 Méthode : Extraction depuis le navigateur

### Étape 1 : Lancez votre application React
1. Dans Figma Make, ouvrez l'aperçu de votre site
2. Naviguez vers la page `/coming-soon`

### Étape 2 : Ouvrez les outils de développement
1. Appuyez sur **F12** (ou Cmd+Option+I sur Mac)
2. Allez dans l'onglet **"Network"** / **"Réseau"**

### Étape 3 : Rechargez la page
1. Appuyez sur **Ctrl+R** (ou Cmd+R sur Mac) pour recharger
2. Dans l'onglet Network, cherchez les fichiers d'image

### Étape 4 : Trouvez l'image
1. Filtrez par type "Img" / "Images"
2. Cherchez un fichier avec l'ID : **b8f1aea6c1044520cc9d21a8b0de7671600f9572.png**
3. Vous devriez voir une image chargée via une URL Figma

### Étape 5 : Téléchargez l'image
**Option A - Via le panneau Network :**
1. Clic droit sur l'image dans la liste Network
2. Sélectionnez "Open in new tab" / "Ouvrir dans un nouvel onglet"
3. Dans le nouvel onglet, clic droit sur l'image
4. "Save image as..." / "Enregistrer l'image sous..."
5. Sauvegardez comme `background.jpg`

**Option B - Via l'inspecteur :**
1. Appuyez sur **Ctrl+Shift+C** (ou Cmd+Shift+C sur Mac)
2. Cliquez sur l'image de fond de la page
3. Dans le code HTML, vous verrez un élément `<div>` ou `<img>` avec le style `background-image`
4. Copiez l'URL de l'image
5. Ouvrez cette URL dans un nouvel onglet
6. Sauvegardez l'image

**Option C - Screenshot haute résolution :**
1. Faites un screenshot de la page en plein écran
2. Recadrez pour garder uniquement l'arrière-plan
3. Sauvegardez comme `background.jpg`
4. (Cette méthode peut perdre un peu de qualité)

### Étape 6 : Intégrez l'image
1. Placez le fichier `background.jpg` dans le même dossier que index.html
2. Dans **styles.css**, remplacez la ligne ~30 :

```css
/* AVANT (avec Unsplash) */
background: url('https://images.unsplash.com/photo-1585230699768-a31a4d76e48f?q=80&w=1920') center/cover;

/* APRÈS (avec votre image locale) */
background: url('background.jpg') center/cover;
```

## 🎨 Alternative : Image déjà configurée

Pour votre commodité, le fichier **styles.css** est déjà configuré avec une image de fond alternative depuis Unsplash qui correspond au style sombre et grunge de votre site.

**Vous n'avez rien à faire** - la page fonctionnera directement ! 

L'image de fond est chargée via cette URL :
```
https://images.unsplash.com/photo-1585230699768-a31a4d76e48f?q=80&w=1920
```

## 📝 Note

Si vous souhaitez optimiser l'image pour le web :
1. Utilisez un outil comme TinyPNG ou Squoosh
2. Exportez en JPEG qualité 70-80%
3. Gardez une largeur maximale de 1920px
4. L'image sera automatiquement redimensionnée par le CSS

---

Besoin d'aide ? Contactez l'équipe de développement Untouchables.
