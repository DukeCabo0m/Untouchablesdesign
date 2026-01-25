import { useState } from 'react';
import UntouchablesLogo from '../components/UntouchablesLogo';
import GlitchText from '../components/GlitchText';
import DownloadButton from '../components/DownloadButton';
import FilmGrain from '../components/FilmGrain';
import ScanLines from '../components/ScanLines';

export default function BannerTemplates() {
  const [customText, setCustomText] = useState('Communauté francophone de fans de Korn');

  const banners = [
    {
      id: 'facebook',
      label: 'Facebook',
      width: 820,
      height: 312,
      scale: 0.5, // Pour l'affichage
    },
    {
      id: 'youtube',
      label: 'YouTube',
      width: 2560,
      height: 1440,
      scale: 0.15, // Pour l'affichage
    },
    {
      id: 'twitter',
      label: 'Twitter/X',
      width: 1500,
      height: 500,
      scale: 0.3, // Pour l'affichage
    },
  ];

  return (
    <div>
      <div className="mb-12">
        <h2 className="text-3xl font-black uppercase mb-2">Bannières / Covers</h2>
        <p className="text-sm font-mono opacity-60">
          Bannières optimisées pour chaque réseau social
        </p>
      </div>

      {/* Personnalisation du texte */}
      <div className="mb-8 p-6 border-2 border-[#8B0000]/30 bg-[#1A1A1A]">
        <label className="block text-sm font-mono uppercase mb-2 text-[#8B0000]">
          Texte personnalisé (optionnel)
        </label>
        <input
          type="text"
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          placeholder="Communauté francophone de fans de Korn"
          className="w-full px-4 py-3 bg-[#0A0A0A] border-2 border-[#8B0000]/50 
                     text-[#E0E0E0] font-mono focus:outline-none focus:border-[#8B0000]"
        />
        <p className="mt-2 text-xs opacity-60 font-mono">
          Ce texte apparaîtra sur toutes les bannières
        </p>
      </div>

      {/* Bannières */}
      <div className="space-y-12">
        {banners.map((banner) => (
          <div key={banner.id}>
            <h3 className="text-xl font-black uppercase mb-4 text-[#8B0000]">
              {banner.label}
            </h3>
            <p className="text-xs font-mono mb-4 opacity-60">
              {banner.width}×{banner.height}px (HD)
            </p>

            <div className="bg-[#1A1A1A] p-8 border-2 border-[#8B0000]/30">
              {/* Preview */}
              <div className="mb-6 overflow-x-auto">
                <div
                  style={{
                    width: `${banner.width * banner.scale}px`,
                    height: `${banner.height * banner.scale}px`,
                  }}
                  className="border-2 border-[#8B0000] mx-auto"
                >
                  <div
                    id={`banner-${banner.id}`}
                    style={{
                      width: `${banner.width}px`,
                      height: `${banner.height}px`,
                      transform: `scale(${banner.scale})`,
                      transformOrigin: 'top left',
                    }}
                    className="bg-[#0A0A0A] relative overflow-hidden"
                  >
                    {/* Effets */}
                    <FilmGrain />
                    <ScanLines />

                    {/* Dégradé rouge */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#8B0000]/20 via-transparent to-[#8B0000]/20" />

                    {/* Lignes décoratives */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-[#8B0000]" />
                    <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#8B0000]" />

                    {/* Contenu */}
                    <div className="relative h-full flex flex-col items-center justify-center px-16">
                      {/* Logo */}
                      <UntouchablesLogo
                        width={banner.width * 0.3}
                        height={banner.width * 0.09}
                      />

                      {/* Texte personnalisé */}
                      {customText && (
                        <div
                          className="mt-8 text-center font-mono uppercase tracking-wider text-[#E0E0E0]"
                          style={{ fontSize: `${banner.width * 0.015}px` }}
                        >
                          {customText}
                        </div>
                      )}

                      {/* Détails décoratifs */}
                      <div
                        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4"
                        style={{ fontSize: `${banner.width * 0.012}px` }}
                      >
                        <span className="text-[#8B0000] font-mono">▀▀▀</span>
                        <span className="text-[#8B0000] font-mono">▀▀▀</span>
                        <span className="text-[#8B0000] font-mono">▀▀▀</span>
                      </div>
                    </div>

                    {/* Glitch corners */}
                    <div className="absolute top-8 left-8 w-16 h-16 border-t-4 border-l-4 border-[#8B0000]" />
                    <div className="absolute top-8 right-8 w-16 h-16 border-t-4 border-r-4 border-[#8B0000]" />
                    <div className="absolute bottom-8 left-8 w-16 h-16 border-b-4 border-l-4 border-[#8B0000]" />
                    <div className="absolute bottom-8 right-8 w-16 h-16 border-b-4 border-r-4 border-[#8B0000]" />
                  </div>
                </div>
              </div>

              {/* Bouton téléchargement */}
              <div className="flex justify-center">
                <DownloadButton
                  elementId={`banner-${banner.id}`}
                  filename={`untouchables-banner-${banner.id}.png`}
                  label={`Télécharger ${banner.label}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Guide d'utilisation */}
      <div className="mt-12 p-6 border-2 border-[#8B0000]/30 bg-[#8B0000]/5">
        <h3 className="text-lg font-black uppercase mb-3 text-[#8B0000]">
          📖 Guide d'utilisation
        </h3>
        <ul className="space-y-2 text-sm font-mono">
          <li>
            <strong className="text-[#8B0000]">Facebook :</strong> 820×312px - Parfait pour
            votre page
          </li>
          <li>
            <strong className="text-[#8B0000]">YouTube :</strong> 2560×1440px - Bannière de
            chaîne (zone sûre au centre)
          </li>
          <li>
            <strong className="text-[#8B0000]">Twitter/X :</strong> 1500×500px - Header de
            profil
          </li>
          <li>
            ✓ Personnalisez le texte pour chaque réseau si nécessaire
          </li>
          <li>
            ✓ Téléchargez en PNG pour une qualité optimale
          </li>
        </ul>
      </div>
    </div>
  );
}
