import { HeroSection } from '@/app/components/HeroSection';
import { LatestNewsSection } from '@/app/components/LatestNewsSection';
import { FeaturedAlbumsSection } from '@/app/components/FeaturedAlbumsSection';
import { UpcomingToursSection } from '@/app/components/UpcomingToursSection';
import { FanContributionsSection } from '@/app/components/FanContributionsSection';
import { FanzineSection } from '@/app/components/FanzineSection';
import { NewsletterWidget } from '@/app/components/NewsletterWidget';
import { LatestVideoWidget } from '@/app/components/LatestVideoWidget';
import { ShortsReelsWidget } from '@/app/components/ShortsReelsWidget';
import { InstagramPostsWidget } from '@/app/components/InstagramPostsWidget';
import { SectionSeparator } from '@/app/components/SectionSeparator';
import { AlertContainer } from '@/app/components/AlertMessage';
import { useAlert } from '@/app/contexts/AlertContext';
import { StickySidebar } from '@/app/components/StickySidebar';

export function HomePage() {
  const { alerts, removeAlert } = useAlert();

  return (
    <>
      <HeroSection />
      
      {/* Main layout with sidebar */}
      <div className="max-w-[1920px] mx-auto px-4 py-8">
        <div className="flex gap-12">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            <LatestNewsSection />
            <SectionSeparator />
            <FeaturedAlbumsSection />
            <SectionSeparator />
            <UpcomingToursSection />
            <SectionSeparator />
            <FanContributionsSection />
            <SectionSeparator />
            <FanzineSection />
          </div>

          {/* Sticky sidebar */}
          <aside className="hidden lg:block w-[360px] flex-shrink-0">
            <StickySidebar>
              <div className="space-y-6">
                <NewsletterWidget />
                <LatestVideoWidget />
                <ShortsReelsWidget />
                <InstagramPostsWidget />
              </div>
            </StickySidebar>
          </aside>
        </div>
      </div>
      
      {/* Alert system */}
      <AlertContainer alerts={alerts} onClose={removeAlert} />
    </>
  );
}