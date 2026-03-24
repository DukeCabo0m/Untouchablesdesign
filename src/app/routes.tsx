import { createBrowserRouter } from 'react-router';
import { RootLayout } from '@/app/components/RootLayout';
import { AdminLayout } from '@/app/components/AdminLayout';
import { HomePage } from '@/app/pages/HomePage';
import { BandPage } from '@/app/pages/Band/BandPage';
import { BiographyPage } from '@/app/pages/Band/BiographyPage';
import { MembersPage } from '@/app/pages/Band/MembersPage';
import { MemberDetailPage } from '@/app/pages/Band/MemberDetailPage';
import { DiscographyPage } from '@/app/pages/DiscographyPage';
import { DiscographyIndexPage } from '@/app/pages/Discography/DiscographyIndexPage';
import { AlbumDetailPage } from '@/app/pages/AlbumDetailPage';
import { SingleDetailPage } from '@/app/pages/SingleDetailPage';
import { TrackDetailPage } from '@/app/pages/TrackDetailPage';
import { NewsPage } from '@/app/pages/NewsPage';
import { NewsDetailPage } from '@/app/pages/NewsDetailPage';
import { CategoryPage } from '@/app/pages/CategoryPage';
import { TagPage } from '@/app/pages/TagPage';
import { TourPage } from '@/app/pages/TourPage';
import { UpcomingConcertsPage } from '@/app/pages/UpcomingConcertsPage';
import { ArchivesPage } from '@/app/pages/ArchivesPage';
import { ConcertDetailPage } from '@/app/pages/ConcertDetailPage';
import { LoginPage } from '@/app/pages/Auth/LoginPage';
import { SignupPage } from '@/app/pages/Auth/SignupPage';
import { ForgotPasswordPage } from '@/app/pages/Auth/ForgotPasswordPage';
import { AboutPage } from '@/app/pages/AboutPage';
import { LegalMentionsPage } from '@/app/pages/Legal/LegalMentionsPage';
import { PrivacyPage } from '@/app/pages/Legal/PrivacyPage';
import { CookiesPage } from '@/app/pages/Legal/CookiesPage';
import { TermsPage } from '@/app/pages/Legal/TermsPage';
import { Statuts } from '@/app/pages/Statuts';
import { ContactPage } from '@/app/pages/ContactPage';
import { FanzinePage } from '@/app/pages/FanzinePage';
import { FanzineArchivePage } from '@/app/pages/FanzineArchivePage';
import { FanzineSubscribePage } from '@/app/pages/FanzineSubscribePage';
import { ContributeContentPage } from '@/app/pages/ContributeContentPage';
import { ContributionsPage } from '@/app/pages/ContributionsPage';
import { ProfilePage } from '@/app/pages/ProfilePage';
import { EditProfilePage } from '@/app/pages/Profile/EditProfilePage';
import { SettingsPage } from '@/app/pages/Profile/SettingsPage';
import { ActivityPage } from '@/app/pages/Profile/ActivityPage';
import { AdminCPanel } from '@/app/pages/Admin/AdminCPanel';
import { AdminUsersPage } from '@/app/pages/Admin/AdminUsersPage';
import { AdminAnalyticsPage } from '@/app/pages/Admin/AdminAnalyticsPage';
import { AdminArticlesPage } from '@/app/pages/Admin/AdminArticlesPage';
import { AdminDiscographyPage } from '@/app/pages/Admin/AdminDiscographyPage';
import { AdminConcertsPage } from '@/app/pages/Admin/AdminConcertsPage';
import { AdminMediaPage } from '@/app/pages/Admin/AdminMediaPage';
import { AdminCommentsPage } from '@/app/pages/Admin/AdminCommentsPage';
import { AdminReportsPage } from '@/app/pages/Admin/AdminReportsPage';
import { AdminBansPage } from '@/app/pages/Admin/AdminBansPage';
import { AdminSettingsPage } from '@/app/pages/Admin/AdminSettingsPage';
import { AdminDatabasePage } from '@/app/pages/Admin/AdminDatabasePage';
import { AdminLogsPage } from '@/app/pages/Admin/AdminLogsPage';
import { AdminBackupsPage } from '@/app/pages/Admin/AdminBackupsPage';
import { Admin404 } from '@/app/pages/Admin/Admin404';
import { AdminInitPage } from '@/app/pages/Admin/AdminInitPage';
import { AdminInitDataPage } from '@/app/pages/Admin/AdminInitDataPage';
import { ComingSoonPage } from '@/app/pages/ComingSoonPage';
import { NotFoundPage } from '@/app/pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      
      // Band
      { path: 'band', Component: BandPage },
      { path: 'band/biography', Component: BiographyPage },
      { path: 'band/members', Component: MembersPage },
      { path: 'band/members/:slug', Component: MemberDetailPage },
      
      // Discography
      { path: 'discography', Component: DiscographyIndexPage },
      { path: 'discography/studio', Component: DiscographyPage },
      { path: 'discography/live', Component: DiscographyPage },
      { path: 'discography/compilations', Component: DiscographyPage },
      { path: 'discography/singles', Component: DiscographyPage },
      { path: 'discography/favorites', Component: DiscographyPage },
      { path: 'discography/album/:slug', Component: AlbumDetailPage },
      { path: 'discography/single/:slug', Component: SingleDetailPage },
      { path: 'discography/:albumSlug/track/:trackSlug', Component: TrackDetailPage },
      
      // News
      { path: 'news', Component: NewsPage },
      { path: 'news/:slug', Component: NewsDetailPage },
      { path: 'category/:slug', Component: CategoryPage },
      { path: 'tag/:slug', Component: TagPage },
      
      // Tour
      { path: 'tour', Component: TourPage },
      { path: 'tour/upcoming', Component: UpcomingConcertsPage },
      { path: 'tour/archives', Component: ArchivesPage },
      { path: 'tour/concert/:slug', Component: ConcertDetailPage },
      
      // Auth
      { path: 'login', Component: LoginPage },
      { path: 'signup', Component: SignupPage },
      { path: 'forgot-password', Component: ForgotPasswordPage },
      
      // Static
      { path: 'about', Component: AboutPage },
      
      // Legal
      { path: 'legal', Component: LegalMentionsPage },
      { path: 'privacy', Component: PrivacyPage },
      { path: 'cookies', Component: CookiesPage },
      { path: 'terms', Component: TermsPage },
      { path: 'statuts', Component: Statuts },
      
      // Contact
      { path: 'contact', Component: ContactPage },
      
      // Fanzine
      { path: 'fanzine', Component: FanzinePage },
      { path: 'fanzine/archive', Component: FanzineArchivePage },
      { path: 'fanzine/subscribe', Component: FanzineSubscribePage },
      
      // Contributions
      { path: 'contribute', Component: ContributeContentPage },
      { path: 'contributions', Component: ContributionsPage },
      
      // Profile
      { path: 'profile', Component: ProfilePage },
      { path: 'profile/edit', Component: EditProfilePage },
      { path: 'profile/settings', Component: SettingsPage },
      { path: 'profile/activity', Component: ActivityPage },
      
      // 404 - Must be last
      { path: '*', Component: NotFoundPage },
    ],
  },
  // Admin - Separate layout without header/footer/textures
  {
    path: '/admin',
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminCPanel },
      { path: 'dashboard', Component: AdminCPanel },
      { path: 'init', Component: AdminInitPage },
      { path: 'init-data', Component: AdminInitDataPage },
      { path: 'users', Component: AdminUsersPage },
      { path: 'analytics', Component: AdminAnalyticsPage },
      { path: 'articles', Component: AdminArticlesPage },
      { path: 'discography', Component: AdminDiscographyPage },
      { path: 'concerts', Component: AdminConcertsPage },
      { path: 'media', Component: AdminMediaPage },
      { path: 'comments', Component: AdminCommentsPage },
      { path: 'reports', Component: AdminReportsPage },
      { path: 'bans', Component: AdminBansPage },
      { path: 'settings', Component: AdminSettingsPage },
      { path: 'database', Component: AdminDatabasePage },
      { path: 'logs', Component: AdminLogsPage },
      { path: 'backups', Component: AdminBackupsPage },
      { path: '*', Component: Admin404 },
    ],
  },
  // Coming Soon - Standalone page without navbar
  { 
    path: 'coming-soon', 
    Component: ComingSoonPage 
  },
]);