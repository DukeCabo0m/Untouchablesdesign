import { Outlet } from 'react-router';
import { CustomCursor } from '@/app/components/CustomCursor';
import { StickyNavbar } from '@/app/components/StickyNavbar';
import { PageGlitchTransition } from '@/app/components/PageGlitchTransition';
import { ScrollToTop } from '@/app/components/ScrollToTop';
import { BackToTop } from '@/app/components/BackToTop';
import { Footer } from '@/app/components/Footer';
import { FilmGrain } from '@/app/components/FilmGrain';
import { ScanLines } from '@/app/components/ScanLines';

export function RootLayout() {
  return (
    <div className="relative min-h-screen bg-[#0A0A0A] cursor-none overflow-x-hidden" style={{ fontFamily: 'Space Mono, monospace' }}>
      {/* Global VHS textures */}
      <FilmGrain />
      <ScanLines />
      
      {/* Global effects */}
      <CustomCursor />
      <StickyNavbar />
      <PageGlitchTransition />
      <ScrollToTop />
      <BackToTop />

      {/* Page content */}
      <Outlet />

      {/* Footer */}
      <Footer />
    </div>
  );
}