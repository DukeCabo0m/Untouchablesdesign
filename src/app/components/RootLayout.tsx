import { Outlet } from 'react-router';
import { StickyNavbar } from '@/app/components/StickyNavbar';
import { PageGlitchTransition } from '@/app/components/PageGlitchTransition';
import { ScrollToTop } from '@/app/components/ScrollToTop';
import { BackToTop } from '@/app/components/BackToTop';
import { Footer } from '@/app/components/Footer';
import { FilmGrain } from '@/app/components/FilmGrain';
import { ScanLines } from '@/app/components/ScanLines';
import { AuthProvider } from '@/app/contexts/AuthContext';
import { AlertProvider } from '@/app/contexts/AlertContext';

export function RootLayout() {
  return (
    <AuthProvider>
      <AlertProvider>
        <div className="relative min-h-screen bg-[var(--theme-bg)]" style={{ fontFamily: 'Space Mono, monospace' }}>
          {/* Global VHS textures */}
          <FilmGrain />
          <ScanLines />
          
          {/* Global effects */}
          <StickyNavbar />
          <PageGlitchTransition />
          <ScrollToTop />
          <BackToTop />

          {/* Page content */}
          <div className="relative z-[50]">
            <Outlet />
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </AlertProvider>
    </AuthProvider>
  );
}