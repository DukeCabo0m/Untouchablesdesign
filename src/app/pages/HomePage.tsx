import { HeroSection } from '@/app/components/HeroSection';
import { SocialMediaSection } from '@/app/components/SocialMediaSection';
import { LatestNewsSection } from '@/app/components/LatestNewsSection';
import { FeaturedAlbumsSection } from '@/app/components/FeaturedAlbumsSection';
import { UpcomingToursSection } from '@/app/components/UpcomingToursSection';
import { FanContributionsSection } from '@/app/components/FanContributionsSection';
import { FanzineSection } from '@/app/components/FanzineSection';
import { SectionSeparator } from '@/app/components/SectionSeparator';
import { AlertContainer } from '@/app/components/AlertMessage';
import { useAlert } from '@/app/contexts/AlertContext';

export function HomePage() {
  const { alerts, removeAlert } = useAlert();

  return (
    <>
      <HeroSection />
      <SocialMediaSection />
      <SectionSeparator />
      <LatestNewsSection />
      <SectionSeparator />
      <FeaturedAlbumsSection />
      <SectionSeparator />
      <UpcomingToursSection />
      <SectionSeparator />
      <FanContributionsSection />
      <SectionSeparator />
      <FanzineSection />
      
      {/* Alert system */}
      <AlertContainer alerts={alerts} onClose={removeAlert} />
    </>
  );
}