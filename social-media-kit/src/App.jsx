import { useState } from 'react';
import FilmGrain from './components/FilmGrain';
import ScanLines from './components/ScanLines';
import Navigation from './components/Navigation';
import AvatarTemplates from './pages/AvatarTemplates';
import BannerTemplates from './pages/BannerTemplates';
import PostTemplates from './pages/PostTemplates';
import StoryTemplates from './pages/StoryTemplates';

export default function App() {
  const [activeSection, setActiveSection] = useState('avatars');

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E0E0E0] relative">
      {/* Effets visuels globaux */}
      <FilmGrain />
      <ScanLines />

      {/* Header */}
      <header className="border-b-3 border-[#8B0000] py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-2">
            Untouchables
          </h1>
          <p className="text-[#8B0000] uppercase text-sm tracking-wider font-mono">
            Social Media Kit Generator
          </p>
        </div>
      </header>

      {/* Navigation */}
      <Navigation 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {activeSection === 'avatars' && <AvatarTemplates />}
        {activeSection === 'banners' && <BannerTemplates />}
        {activeSection === 'posts' && <PostTemplates />}
        {activeSection === 'stories' && <StoryTemplates />}
      </main>

      {/* Footer */}
      <footer className="border-t-3 border-[#8B0000] py-6 px-6 mt-24">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm font-mono opacity-60">
            Untouchables © 2026 - Communauté francophone de fans de Korn
          </p>
        </div>
      </footer>
    </div>
  );
}
