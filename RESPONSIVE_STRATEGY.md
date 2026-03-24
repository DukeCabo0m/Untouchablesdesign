# 📱 STRATÉGIE RESPONSIVE - UNTOUCHABLES

## 🎯 Objectif
Refactoriser complètement le système responsive du site avec des breakpoints traditionnels et cohérents pour une expérience optimale sur tous les appareils.

---

## 📏 BREAKPOINTS STANDARDS (Tailwind CSS)

### Système actuel (à uniformiser) :
```css
/* Breakpoints Tailwind par défaut */
sm:  640px   /* Mobile landscape / Petite tablette */
md:  768px   /* Tablette portrait */
lg:  1024px  /* Desktop / Tablette landscape */
xl:  1280px  /* Large desktop */
2xl: 1536px  /* Extra large desktop */
```

### Notre stratégie :

| Device | Breakpoint | Largeur | Usage principal |
|--------|------------|---------|-----------------|
| **Mobile** | `base` | < 640px | 1 colonne, layout vertical, navigation hamburger |
| **Mobile L / Tablet S** | `sm:` | ≥ 640px | 2 colonnes possibles, spacing augmenté |
| **Tablet** | `md:` | ≥ 768px | 2-3 colonnes, sidebar possible, navigation horizontale |
| **Desktop** | `lg:` | ≥ 1024px | 3-4 colonnes, sidebar sticky, full navigation |
| **Large Desktop** | `xl:` | ≥ 1280px | 4+ colonnes, espacement large |
| **Extra Large** | `2xl:` | ≥ 1536px | Container max-width, espacement maximal |

---

## 🏗️ PRINCIPES DE DESIGN RESPONSIVE

### 1. **Mobile First**
Toujours partir du mobile et ajouter des classes responsive progressivement :
```tsx
// ✅ BON (Mobile first)
<div className="text-sm md:text-base lg:text-lg">

// ❌ MAUVAIS
<div className="text-lg md:text-sm">
```

### 2. **Grid System Cohérent**
```tsx
// Grilles standards à utiliser :
grid-cols-1                     // Mobile : 1 colonne
sm:grid-cols-2                  // Mobile L : 2 colonnes
md:grid-cols-2                  // Tablet : 2 colonnes
lg:grid-cols-3                  // Desktop : 3 colonnes
xl:grid-cols-4                  // Large : 4 colonnes

// Exemples spécifiques :
// - Albums/Cards : 1 → 2 → 3 → 4
// - Articles : 1 → 1 → 2 → 3
// - Widgets : 1 → 2 → 1 (sidebar)
```

### 3. **Spacing Progressif**
```tsx
// Padding container :
px-4 md:px-6 lg:px-8            // Petite → Moyenne → Large
py-6 md:py-8 lg:py-12           // Vertical progressif

// Gap entre éléments :
gap-4 md:gap-6 lg:gap-8         // Espacement croissant
```

### 4. **Typography Responsive**
```tsx
// Titres :
text-2xl md:text-3xl lg:text-4xl xl:text-5xl    // H1
text-xl md:text-2xl lg:text-3xl                 // H2
text-lg md:text-xl lg:text-2xl                  // H3
text-base md:text-lg                            // H4

// Corps de texte :
text-sm md:text-base                            // Body
text-xs md:text-sm                              // Small
```

### 5. **Layouts Adaptatifs**
```tsx
// Stack vertical → horizontal :
flex-col md:flex-row

// Sidebar cachée → visible :
hidden lg:block

// Full width → Container limité :
w-full lg:max-w-[1920px]
```

---

## 🔧 COMPOSANTS À REFACTORISER

### 1. **Container Principal**
```tsx
// Actuel (inconsistant) :
<div className="max-w-[1920px] mx-auto px-4">

// Nouveau (cohérent) :
<div className="max-w-[1920px] mx-auto px-4 md:px-6 lg:px-8">
```

### 2. **Grilles de Cards**
```tsx
// Albums, Articles, News :
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
```

### 3. **Navigation**
```tsx
// Mobile : Hamburger menu
// Tablet+ : Horizontal menu
<nav className="hidden md:flex md:items-center md:gap-6">
```

### 4. **Hero Section**
```tsx
// Titre responsive :
<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">

// Hauteur adaptative :
<div className="h-[60vh] md:h-[70vh] lg:h-[80vh]">
```

### 5. **Sidebar**
```tsx
// Caché mobile, visible desktop :
<aside className="hidden lg:block lg:w-[360px]">

// Contenu sidebar qui passe en bas sur mobile :
<div className="w-full lg:hidden mt-12">
  {/* Contenu sidebar en version mobile */}
</div>
```

---

## 📋 CHECKLIST DE REFACTORING

### Phase 1 : Composants globaux
- [ ] Header / Navigation
- [ ] Footer
- [ ] Container / Layout wrapper
- [ ] Sidebar

### Phase 2 : Pages principales
- [ ] HomePage
- [ ] NewsPage
- [ ] NewsDetailPage
- [ ] DiscographyPage
- [ ] AlbumDetailPage
- [ ] BandPage
- [ ] TourPage

### Phase 3 : Composants réutilisables
- [ ] HeroSection
- [ ] PageHeader
- [ ] Cards (Article, Album, Concert)
- [ ] Forms
- [ ] Modals
- [ ] Widgets

### Phase 4 : Pages secondaires
- [ ] ProfilePage
- [ ] ContactPage
- [ ] Legal pages
- [ ] Admin cPanel

---

## 🎨 PATTERNS RESPONSIVE STANDARDS

### Pattern 1 : Liste d'articles
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
  {articles.map(article => <ArticleCard key={article.id} {...article} />)}
</div>
```

### Pattern 2 : Layout avec sidebar
```tsx
<div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
  {/* Main content */}
  <main className="flex-1 min-w-0">
    {/* Content */}
  </main>
  
  {/* Sidebar - hidden on mobile */}
  <aside className="hidden lg:block lg:w-[360px]">
    {/* Sidebar widgets */}
  </aside>
</div>

{/* Sidebar content for mobile - at bottom */}
<div className="lg:hidden mt-12">
  {/* Mobile sidebar widgets */}
</div>
```

### Pattern 3 : Image + Texte
```tsx
<div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
  {/* Image */}
  <div className="w-full md:w-1/2 lg:w-1/3">
    <img src="..." className="w-full" />
  </div>
  
  {/* Text */}
  <div className="w-full md:w-1/2 lg:w-2/3">
    <h2 className="text-2xl md:text-3xl lg:text-4xl mb-4">Title</h2>
    <p className="text-sm md:text-base">Content</p>
  </div>
</div>
```

### Pattern 4 : Stats / Metrics
```tsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
  {stats.map(stat => (
    <div className="text-center p-4 md:p-6">
      <div className="text-3xl md:text-4xl lg:text-5xl">{stat.value}</div>
      <div className="text-xs md:text-sm mt-2">{stat.label}</div>
    </div>
  ))}
</div>
```

### Pattern 5 : Boutons
```tsx
{/* Full width mobile, auto width desktop */}
<button className="w-full md:w-auto px-6 py-3 text-sm md:text-base">
  Action
</button>

{/* Stack vertical mobile, horizontal desktop */}
<div className="flex flex-col md:flex-row gap-4">
  <button>Primary</button>
  <button>Secondary</button>
</div>
```

---

## 🚫 ERREURS À ÉVITER

### ❌ 1. Oublier le mobile
```tsx
// MAUVAIS - Trop grand sur mobile
<h1 className="text-6xl">

// BON
<h1 className="text-3xl md:text-4xl lg:text-6xl">
```

### ❌ 2. Breakpoints incohérents
```tsx
// MAUVAIS - Sauts illogiques
<div className="text-sm lg:text-2xl">

// BON - Progression logique
<div className="text-sm md:text-base lg:text-lg">
```

### ❌ 3. Padding/Gap fixes
```tsx
// MAUVAIS
<div className="p-8 gap-8">

// BON
<div className="p-4 md:p-6 lg:p-8 gap-4 md:gap-6 lg:gap-8">
```

### ❌ 4. Grilles non adaptatives
```tsx
// MAUVAIS - 4 colonnes sur mobile = illisible
<div className="grid grid-cols-4">

// BON
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
```

### ❌ 5. Images non responsives
```tsx
// MAUVAIS
<img src="..." className="w-800px h-600px" />

// BON
<img src="..." className="w-full h-auto" />
```

---

## 📱 TESTS À EFFECTUER

### Viewports à tester :
- [ ] **320px** - iPhone SE (plus petit)
- [ ] **375px** - iPhone 12/13/14
- [ ] **414px** - iPhone 12 Pro Max
- [ ] **768px** - iPad portrait
- [ ] **1024px** - iPad landscape / Desktop
- [ ] **1280px** - Desktop standard
- [ ] **1920px** - Desktop large

### Points de contrôle :
- [ ] Texte lisible (min 14px sur mobile)
- [ ] Boutons cliquables (min 44x44px touch target)
- [ ] Images pas déformées
- [ ] Pas de scroll horizontal
- [ ] Sidebar visible uniquement sur desktop
- [ ] Navigation adaptée (hamburger vs horizontal)
- [ ] Forms utilisables (inputs assez grands)
- [ ] Espacements confortables

---

## 🎯 OBJECTIFS DE PERFORMANCE

### Mobile :
- Temps de chargement < 3s
- First Contentful Paint < 1.8s
- Touch targets ≥ 44x44px
- Aucun élément hors viewport

### Tablet :
- Layout hybride (mobile + desktop features)
- Sidebar optionnelle
- Navigation accessible

### Desktop :
- Utilisation optimale de l'espace
- Sidebar sticky
- Hover states visibles
- Multi-colonnes maximisées

---

## 🔄 ORDRE DE REFACTORING RECOMMANDÉ

1. **Header/Footer** (affecte toutes les pages)
2. **Container/Layout** (structure globale)
3. **HomePage** (page la plus visitée)
4. **Composants Cards** (réutilisés partout)
5. **Pages principales** (News, Discography, Band, Tour)
6. **Pages secondaires** (Contact, Legal, Profile)
7. **Admin cPanel** (moins prioritaire)

---

**Date de création :** 22 mars 2026  
**Version :** 1.0  
**Statut :** En cours de refactoring
