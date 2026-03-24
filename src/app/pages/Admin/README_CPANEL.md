# cPanel Administration Untouchables

## Vue d'ensemble

Le cPanel d'administration d'Untouchables est un panneau de contrôle professionnel et complet pour gérer tous les aspects du site communautaire Korn.

## Architecture

### Composants Core

- **AdminSidebar** (`/src/app/components/Admin/AdminSidebar.tsx`)
  - Navigation latérale fixe
  - Sections organisées par catégories
  - Badges de notification
  - Indicateurs de statut système

- **AdminHeader** (`/src/app/components/Admin/AdminHeader.tsx`)
  - Fil d'Ariane (breadcrumbs)
  - Recherche globale
  - Notifications en temps réel
  - Menu utilisateur

- **AdminDataTable** (`/src/app/components/Admin/AdminDataTable.tsx`)
  - Table de données réutilisable
  - Tri multi-colonnes
  - Sélection multiple
  - Actions en masse
  - Pagination intégrée

- **AdminStatsCard** (`/src/app/components/Admin/AdminStatsCard.tsx`)
  - Cartes de statistiques
  - Indicateurs de tendance
  - Animations au chargement

- **AdminChart** (`/src/app/components/Admin/AdminChart.tsx`)
  - Graphiques avec Recharts
  - Types: Line, Bar, Area, Pie
  - Tooltips personnalisés
  - Couleurs de la charte Untouchables

### Pages

#### Dashboard (`/admin` ou `/admin/dashboard`)
- **Fichier**: `AdminCPanel.tsx`
- **Fonctionnalités**:
  - Vue d'ensemble des statistiques
  - Graphiques de croissance (6 mois)
  - Graphiques d'activité (7 jours)
  - Distribution du contenu (pie chart)
  - Actions rapides
  - Derniers utilisateurs (table)
  - Statut système (DB, API, Storage)

#### Gestion Utilisateurs (`/admin/users`)
- **Fichier**: `AdminUsersPage.tsx`
- **Fonctionnalités**:
  - Liste complète des utilisateurs
  - Filtres par rôle et statut
  - Recherche en temps réel
  - Tri sur toutes les colonnes
  - Sélection multiple
  - Actions en masse (édition, suspension, suppression)
  - Statistiques utilisateurs (total, actifs, en attente, suspendus)
  - Export de données

#### Autres modules (Coming Soon)
- Analytics (`/admin/analytics`)
- Articles (`/admin/articles`)
- Discographie (`/admin/discography`)
- Concerts (`/admin/concerts`)
- Médias (`/admin/media`)
- Commentaires (`/admin/comments`)
- Signalements (`/admin/reports`)
- Bannissements (`/admin/bans`)
- Configuration (`/admin/settings`)
- Base de données (`/admin/database`)
- Logs (`/admin/logs`)
- Sauvegardes (`/admin/backups`)

## Design System

### Palette de couleurs

Respecte strictement la charte graphique Untouchables :

- **Dried Rust** : `#8B0000` - Couleur principale
- **Abyssal Grey** : `#0A0A0A` - Fond
- **Static White** : `#F0F0F0` - Texte
- **Gris moyen** : `#808080` - Secondaire
- **Gris clair** : `#CCCCCC` - Tertiaire

### Typographie

- **Headings**: Stick No Bills Bold 700
- **Body**: Special Elite (monospace pour code/stats)

### Composants UI

Tous les composants respectent l'esthétique "High-Def Horror" :
- Bordures carrées (no rounded corners)
- Effets de survol subtils
- Animations Motion/React
- Boutons avec effet "gaffer tape"

## Intégration Backend

### Connexion API Symfony

Le cPanel est prévu pour se connecter à un backend Symfony avec :
- **13 entités** complètes
- **90+ endpoints API** RESTful
- Authentification JWT
- RBAC (Role-Based Access Control)

### Mock Data

Actuellement, le cPanel utilise des données mockées :
- `mockUsers` - Exemples d'utilisateurs
- `statsData` - Statistiques de démonstration
- `chartData` - Données pour graphiques

Pour connecter l'API :
1. Remplacer les mock data par des appels fetch/axios
2. Implémenter la gestion d'authentification
3. Gérer les états de chargement et erreurs
4. Ajouter la pagination côté serveur

## Routes

Toutes les routes admin sont configurées dans `/src/app/routes.tsx` :

```tsx
{ path: 'admin', Component: AdminCPanel },
{ path: 'admin/dashboard', Component: AdminCPanel },
{ path: 'admin/users', Component: AdminUsersPage },
// ... autres routes admin
```

## Permissions & Sécurité

### Rôles prévus

1. **Super Admin** - Accès total
2. **Admin** - Gestion complète sauf config système
3. **Modérateur** - Gestion contenu et modération
4. **Contributeur** - Création de contenu uniquement
5. **Membre** - Pas d'accès admin

### Protections à implémenter

- Route guards avec authentification
- Vérification des permissions par rôle
- Protection CSRF
- Rate limiting API
- Logs d'activité admin

## Fonctionnalités futures

### Dashboard
- [ ] Graphiques en temps réel (WebSocket)
- [ ] Widgets personnalisables
- [ ] Export de rapports
- [ ] Alertes configurables

### Tables de données
- [ ] Filtres avancés (multi-critères)
- [ ] Colonnes personnalisables
- [ ] Export CSV/Excel
- [ ] Import en masse

### Système
- [ ] Mode maintenance
- [ ] Gestion des backups automatiques
- [ ] Monitoring de performance
- [ ] Logs d'erreurs détaillés
- [ ] Configuration SEO globale

## Développement

### Ajouter une nouvelle page admin

1. Créer le fichier dans `/src/app/pages/Admin/`
2. Importer les composants nécessaires :
   ```tsx
   import { AdminSidebar } from '@/app/components/Admin/AdminSidebar';
   import { AdminHeader } from '@/app/components/Admin/AdminHeader';
   ```
3. Ajouter la route dans `routes.tsx`
4. Mettre à jour la sidebar si besoin

### Structure de base

```tsx
export function AdminNewPage() {
  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col">
        <AdminHeader 
          title="Titre de la page"
          breadcrumbs={[
            { label: 'Section' },
            { label: 'Page actuelle' }
          ]}
        />
        
        <main className="flex-1 p-6 space-y-6">
          {/* Contenu */}
        </main>
      </div>
    </div>
  );
}
```

## Notes importantes

- **NO EXTERNAL DEPENDENCIES** : Le système fonctionne avec uniquement les packages déjà installés
- **RESPECT DE LA CHARTE** : Aucune couleur en dehors de la palette définie
- **RESPONSIVE** : Tous les composants sont adaptés mobile/tablet/desktop
- **ACCESSIBILITY** : Labels, ARIA, navigation au clavier
- **PERFORMANCE** : Lazy loading, memo, optimisations React

## Contact

Pour toute question sur le cPanel :
- Vérifier ce README
- Consulter les composants existants
- Respecter l'architecture établie
