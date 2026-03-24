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
      <div className="max-w-[1920px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
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

          {/* Sticky sidebar - Desktop only */}
          <aside className="hidden lg:block lg:w-[340px] xl:w-[360px] flex-shrink-0">
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

        {/* Mobile/Tablet Sidebar Content - Below main content */}
        <div className="lg:hidden mt-12 space-y-6">
          <NewsletterWidget />
          <LatestVideoWidget />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ShortsReelsWidget />
            <InstagramPostsWidget />
          </div>
        </div>
      </div>
      
      {/* Alert system */}
      <AlertContainer alerts={alerts} onClose={removeAlert} />
    </>
  );
}