import { useState } from 'react';
import UntouchablesLogo from '../components/UntouchablesLogo';
import DownloadButton from '../components/DownloadButton';
import FilmGrain from '../components/FilmGrain';
import ScanLines from '../components/ScanLines';

export default function AvatarTemplates() {
  const [selectedStyle, setSelectedStyle] = useState('logo-center');

  const styles = [
    { id: 'logo-center', label: 'Logo centré' },
    { id: 'logo-minimal', label: 'Logo minimal' },
    { id: 'blood-splash', label: 'Effet sang' },
    { id: 'glitch-dark', label: 'Glitch sombre' },
  ];

  return (
    <div>
      <div className="mb-12">
        <h2 className="text-3xl font-black uppercase mb-2">Avatars / Profils</h2>
        <p className="text-sm font-mono opacity-60">
          Formats optimisés pour tous les réseaux sociaux
        </p>
      </div>

      {/* Sélecteur de style */}
      <div className="mb-8 flex gap-3 flex-wrap">
        {styles.map((style) => (
          <button
            key={style.id}
            onClick={() => setSelectedStyle(style.id)}
            className={`
              px-4 py-2 font-mono text-sm uppercase border-2
              ${
                selectedStyle === style.id
                  ? 'bg-[#8B0000] border-[#8B0000] text-[#E0E0E0]'
                  : 'border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000]/10'
              }
            `}
          >
            {style.label}
          </button>
        ))}
      </div>

      {/* Grille d'avatars */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Avatar Circulaire (Instagram, Facebook, TikTok, YouTube) */}
        <div>
          <h3 className="text-xl font-black uppercase mb-4 text-[#8B0000]">
            Format Circulaire
          </h3>
          <p className="text-xs font-mono mb-4 opacity-60">
            Instagram • Facebook • TikTok • YouTube • Discord
          </p>
          
          <div className="bg-[#1A1A1A] p-8 border-2 border-[#8B0000]/30">
            {/* Preview */}
            <div className="mb-6 flex justify-center">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#8B0000]">
                <div
                  id="avatar-circular"
                  className="w-full h-full bg-[#0A0A0A] flex items-center justify-center relative"
                >
                  <FilmGrain />
                  <ScanLines />
                  {selectedStyle === 'logo-center' && (
                    <UntouchablesLogo width={160} height={48} />
                  )}
                  {selectedStyle === 'logo-minimal' && (
                    <div className="text-6xl font-black text-[#8B0000]">U</div>
                  )}
                  {selectedStyle === 'blood-splash' && (
                    <div className="relative">
                      <div className="text-8xl font-black text-[#E0E0E0]">U</div>
                      <div className="absolute inset-0 bg-[#8B0000] opacity-30 blur-2xl" />
                    </div>
                  )}
                  {selectedStyle === 'glitch-dark' && (
                    <div className="relative">
                      <UntouchablesLogo width={140} height={42} />
                      <div className="absolute inset-0 bg-gradient-to-br from-[#8B0000]/20 to-transparent" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Infos */}
            <div className="text-center mb-4 text-xs font-mono opacity-60">
              500×500px (HD) • Format PNG
            </div>

            {/* Bouton téléchargement */}
            <div className="flex justify-center">
              <DownloadButton
                elementId="avatar-circular"
                filename={`untouchables-avatar-circular-${selectedStyle}.png`}
                label="Télécharger (500x500)"
              />
            </div>
          </div>
        </div>

        {/* Avatar Carré (Twitter/X) */}
        <div>
          <h3 className="text-xl font-black uppercase mb-4 text-[#8B0000]">
            Format Carré
          </h3>
          <p className="text-xs font-mono mb-4 opacity-60">
            Twitter/X • LinkedIn • Threads
          </p>
          
          <div className="bg-[#1A1A1A] p-8 border-2 border-[#8B0000]/30">
            {/* Preview */}
            <div className="mb-6 flex justify-center">
              <div className="w-48 h-48 overflow-hidden border-4 border-[#8B0000]">
                <div
                  id="avatar-square"
                  className="w-full h-full bg-[#0A0A0A] flex items-center justify-center relative"
                >
                  <FilmGrain />
                  <ScanLines />
                  {selectedStyle === 'logo-center' && (
                    <UntouchablesLogo width={160} height={48} />
                  )}
                  {selectedStyle === 'logo-minimal' && (
                    <div className="text-6xl font-black text-[#8B0000]">U</div>
                  )}
                  {selectedStyle === 'blood-splash' && (
                    <div className="relative">
                      <div className="text-8xl font-black text-[#E0E0E0]">U</div>
                      <div className="absolute inset-0 bg-[#8B0000] opacity-30 blur-2xl" />
                    </div>
                  )}
                  {selectedStyle === 'glitch-dark' && (
                    <div className="relative">
                      <UntouchablesLogo width={140} height={42} />
                      <div className="absolute inset-0 bg-gradient-to-br from-[#8B0000]/20 to-transparent" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Infos */}
            <div className="text-center mb-4 text-xs font-mono opacity-60">
              500×500px (HD) • Format PNG
            </div>

            {/* Bouton téléchargement */}
            <div className="flex justify-center">
              <DownloadButton
                elementId="avatar-square"
                filename={`untouchables-avatar-square-${selectedStyle}.png`}
                label="Télécharger (500x500)"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Guide d'utilisation */}
      <div className="mt-12 p-6 border-2 border-[#8B0000]/30 bg-[#8B0000]/5">
        <h3 className="text-lg font-black uppercase mb-3 text-[#8B0000]">
          📖 Guide d'utilisation
        </h3>
        <ul className="space-y-2 text-sm font-mono">
          <li>✓ <strong>Format circulaire :</strong> Instagram, Facebook, TikTok, YouTube, Discord</li>
          <li>✓ <strong>Format carré :</strong> Twitter/X, LinkedIn, Threads</li>
          <li>✓ <strong>Résolution :</strong> 500×500px optimisé pour tous les réseaux</li>
          <li>✓ <strong>Format :</strong> PNG avec transparence supportée</li>
          <li>✓ <strong>Conseil :</strong> Testez plusieurs styles et gardez celui qui vous plaît !</li>
        </ul>
      </div>
    </div>
  );
}
