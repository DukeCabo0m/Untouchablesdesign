import { createBrowserRouter } from 'react-router';
import { HomePage } from '@/app/pages/HomePage';
import { BandPage } from '@/app/pages/Band/BandPage';
import { BiographyPage } from '@/app/pages/Band/BiographyPage';
import { MembersPage } from '@/app/pages/Band/MembersPage';
import { MemberDetailPage } from '@/app/pages/Band/MemberDetailPage';
import { DiscographyIndexPage } from '@/app/pages/Discography/DiscographyIndexPage';
import { DiscographyPage } from '@/app/pages/DiscographyPage';
import { AlbumDetailPage } from '@/app/pages/AlbumDetailPage';
import { SingleDetailPage } from '@/app/pages/SingleDetailPage';
import { TrackDetailPage } from '@/app/pages/TrackDetailPage';
import { NewsPage } from '@/app/pages/NewsPage';
import { NewsDetailPage } from '@/app/pages/NewsDetailPage';
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
import { ProfilePage } from '@/app/pages/ProfilePage';
import { EditProfilePage } from '@/app/pages/Profile/EditProfilePage';
import { SettingsPage } from '@/app/pages/Profile/SettingsPage';
import { ActivityPage } from '@/app/pages/Profile/ActivityPage';
import { NotFoundPage } from '@/app/pages/NotFoundPage';
import { RootLayout } from '@/app/components/RootLayout';

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
      
      // Profile
      { path: 'profile', Component: ProfilePage },
      { path: 'profile/edit', Component: EditProfilePage },
      { path: 'profile/settings', Component: SettingsPage },
      { path: 'profile/activity', Component: ActivityPage },
      
      // 404 - Must be last
      { path: '*', Component: NotFoundPage },
    ],
  },
]);