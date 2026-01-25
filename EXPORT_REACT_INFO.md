# 🎸 Export React/Vite - Coming Soon Untouchables

## ✅ Terminé !

Votre page Coming Soon a été **exportée avec succès** dans le dossier `/export-react/` avec l'intégration Mailchimp complète.

---

## 📦 Ce qui a été créé

### Structure complète
```
/export-react/
├── 📄 package.json          → Dépendances (React, Vite, Tailwind, Motion)
├── ⚙️ vite.config.js        → Configuration optimisée pour OVH
├── 📄 index.html            → Point d'entrée HTML
├── 🚀 DEPLOIEMENT.md        → Guide de déploiement rapide (5 min)
├── 📖 README.md             → Documentation complète
├── 🙈 .gitignore            → Fichiers à ignorer par Git
│
├── 📁 src/
│   ├── main.jsx            → Bootstrap React
│   ├── App.jsx             → Composant racine
│   │
│   ├── 📁 assets/
│   │   └── 📸 background.jpg  → ⚠️ VOTRE IMAGE À AJOUTER ICI
│   │
│   ├── 📁 styles/
│   │   └── theme.css       → Styles Tailwind v4
│   │
│   ├── 📁 components/
│   │   ├── GlitchLogo.jsx      → Logo avec effet glitch RGB
│   │   ├── UntouchablesLogo.jsx → SVG du logo
│   │   ├── FilmGrain.jsx       → Grain filmique
│   │   ├── ScanLines.jsx       → Lignes VHS
│   │   └── Countdown.jsx       → Compteur jusqu'au 1er fév 2026
│   │
│   └── 📁 pages/
│       └── ComingSoonPage.jsx → Page complète avec Mailchimp
```

---

## 🎯 Fonctionnalités intégrées

### ✅ Design complet
- Logo Untouchables avec effet glitch RGB
- Effets VHS : grain filmique + scanlines
- Animations Motion (Framer Motion)
- Background avec traitement X-Ray
- Curseur personnalisé
- Responsive mobile/desktop

### ✅ Formulaire Mailchimp fonctionnel
- **URL API** : `https://untouchables.us10.list-manage.com`
- **Liste ID** : `69ed14db21`
- **Utilisateur** : `e804352b918b348ba3c71c6b8`
- Validation email côté client
- Messages d'erreur en français
- Soumission JSONP (sans redirection)
- Gestion des erreurs réseau

### ✅ Compteur
- Date cible : **1er février 2026 à 10h**
- Mise à jour en temps réel
- Format : Jours / Heures / Minutes / Secondes

### ✅ Réseaux sociaux
- Facebook (lien vers Korn)
- Instagram (lien vers Korn)
- YouTube (lien vers Korn)
- TikTok (lien vers Korn)
- Icônes SVG inline
- Animations hover

---

## 🚀 Déploiement en 3 étapes

### 1️⃣ Ajoutez votre image (2 min)
```bash
# Placez votre image dans :
/export-react/src/assets/background.jpg
```

**Options :**
- Image depuis l'aperçu Figma Make
- Votre propre photo de concert
- Image temporaire : https://images.unsplash.com/photo-1585230699768-a31a4d76e48f?q=80&w=1920

### 2️⃣ Installez et buildez (2 min)
```bash
cd export-react
npm install
npm run build
```

### 3️⃣ Uploadez sur OVH (1 min)
- Connectez-vous à votre FTP OVH
- Uploadez le **contenu** de `dist/` dans `www/`
- ✅ Terminé !

📖 **Guide détaillé** : `/export-react/DEPLOIEMENT.md`

---

## 🎨 Technologies utilisées

| Techno | Version | Usage |
|--------|---------|-------|
| ⚛️ React | 18.3.1 | UI Library |
| ⚡ Vite | 6.0.3 | Build tool ultra-rapide |
| 🎨 Tailwind CSS | 4.0.0 | Framework CSS |
| 🎭 Motion | 10.18.0 | Animations (Framer Motion) |
| 📧 Mailchimp | API JSONP | Newsletter |

---

## 🔧 Personnalisation

### Modifier la date du countdown
```javascript
// /export-react/src/components/Countdown.jsx (ligne 11)
const targetDate = new Date('2026-02-01T10:00:00+01:00');
```

### Changer les liens sociaux
```javascript
// /export-react/src/pages/ComingSoonPage.jsx (lignes ~247-300)
<a href="https://www.facebook.com/VOTRE_PAGE" ...>
<a href="https://www.instagram.com/VOTRE_COMPTE" ...>
```

### Utiliser une autre liste Mailchimp
```javascript
// /export-react/src/pages/ComingSoonPage.jsx (ligne ~90)
const mailchimpUrl = 'https://untouchables.us10.list-manage.com/subscribe/post-json?u=VOTRE_U&id=VOTRE_ID&f_id=VOTRE_F_ID';
```

---

## 📧 Test du formulaire Mailchimp

### Comment tester :
1. Lancez `npm run dev`
2. Ouvrez http://localhost:5173
3. Entrez un email de test
4. Cliquez sur "OK"
5. Vérifiez dans votre liste Mailchimp
6. ✅ L'email devrait apparaître !

### Messages possibles :
- ✅ **Succès** : "✓ INSCRIPTION CONFIRMÉE !"
- ❌ **Email invalide** : "Veuillez entrer une adresse email valide."
- ❌ **Déjà inscrit** : Message Mailchimp personnalisé
- ❌ **Erreur réseau** : "Erreur de connexion. Veuillez réessayer."

---

## 🎯 Avantages de cette version

### vs. Vanilla JS
- ✅ Plus facile à maintenir
- ✅ Composants réutilisables
- ✅ État géré avec React hooks
- ✅ Build optimisé par Vite

### vs. Application complète
- ✅ 100% statique (pas de serveur Node.js)
- ✅ Compatible OVH mutualisé
- ✅ Ultra-léger (~150KB gzippé)
- ✅ Performance optimale

---

## 🆘 Dépannage rapide

### L'image ne s'affiche pas
```bash
# Vérifiez que l'image existe
ls -la export-react/src/assets/background.jpg

# Rebuild
cd export-react && npm run build
```

### La page est blanche après upload
1. Vérifiez que `index.html` est à la racine de `www/`
2. Vérifiez que vous avez uploadé le **contenu** de `dist/`, pas le dossier
3. F12 → Console pour voir les erreurs

### Le formulaire ne fonctionne pas
1. F12 → Console pour voir les erreurs
2. Vérifiez votre connexion internet
3. Testez avec un autre email
4. Vérifiez dans votre liste Mailchimp

---

## 📚 Documentation

| Fichier | Description |
|---------|-------------|
| `/export-react/DEPLOIEMENT.md` | Guide de déploiement rapide (5 min) |
| `/export-react/README.md` | Documentation technique complète |
| Ce fichier | Vue d'ensemble et récapitulatif |

---

## ✅ Checklist avant déploiement

- [ ] Image de fond ajoutée dans `/export-react/src/assets/background.jpg`
- [ ] `npm install` exécuté sans erreur
- [ ] `npm run build` exécuté sans erreur
- [ ] Dossier `dist/` créé avec succès
- [ ] Connexion FTP OVH testée
- [ ] Contenu de `dist/` uploadé dans `www/`
- [ ] Site accessible sur votre domaine
- [ ] Logo et effets visuels présents
- [ ] Compteur fonctionne
- [ ] Formulaire newsletter testé avec un email
- [ ] Email reçu dans Mailchimp
- [ ] Liens sociaux fonctionnent

---

## 🎸 Prêt à lancer !

Votre page Coming Soon **Untouchables** est maintenant prête à impressionner vos fans ! 🤘🔥

**Bon lancement !**

---

**Untouchables** - Communauté francophone de fans de Korn
