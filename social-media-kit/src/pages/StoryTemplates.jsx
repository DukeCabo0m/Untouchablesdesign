import { useState } from 'react';
import UntouchablesLogo from '../components/UntouchablesLogo';
import DownloadButton from '../components/DownloadButton';
import FilmGrain from '../components/FilmGrain';
import ScanLines from '../components/ScanLines';

export default function StoryTemplates() {
  const [storyType, setStoryType] = useState('announcement');
  const [mainText, setMainText] = useState('NOUVEAU CONCERT');
  const [subText, setSubText] = useState('Swipe up pour plus d\'infos');

  const storyTypes = [
    { id: 'announcement', label: '📢 Annonce' },
    { id: 'countdown', label: '⏰ Compte à rebours' },
    { id: 'poll', label: '📊 Sondage' },
    { id: 'quote', label: '💭 Citation' },
  ];

  return (
    <div>
      <div className="mb-12">
        <h2 className="text-3xl font-black uppercase mb-2">Stories</h2>
        <p className="text-sm font-mono opacity-60">
          Format 1080×1920px pour Instagram, Facebook, Snapchat
        </p>
      </div>

      {/* Sélecteur de type */}
      <div className="mb-8 flex gap-3 flex-wrap">
        {storyTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setStoryType(type.id)}
            className={`
              px-4 py-2 font-mono text-sm uppercase border-2
              ${
                storyType === type.id
                  ? 'bg-[#8B0000] border-[#8B0000] text-[#E0E0E0]'
                  : 'border-[#8B0000] text-[#8B0000] hover:bg-[#8B0000]/10'
              }
            `}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Formulaire de personnalisation */}
      <div className="mb-8 p-6 border-2 border-[#8B0000]/30 bg-[#1A1A1A] space-y-4">
        <div>
          <label className="block text-sm font-mono uppercase mb-2 text-[#8B0000]">
            Texte principal
          </label>
          <input
            type="text"
            value={mainText}
            onChange={(e) => setMainText(e.target.value)}
            className="w-full px-4 py-3 bg-[#0A0A0A] border-2 border-[#8B0000]/50 
                       text-[#E0E0E0] font-mono focus:outline-none focus:border-[#8B0000]"
          />
        </div>

        <div>
          <label className="block text-sm font-mono uppercase mb-2 text-[#8B0000]">
            Sous-titre / CTA
          </label>
          <input
            type="text"
            value={subText}
            onChange={(e) => setSubText(e.target.value)}
            className="w-full px-4 py-3 bg-[#0A0A0A] border-2 border-[#8B0000]/50 
                       text-[#E0E0E0] font-mono focus:outline-none focus:border-[#8B0000]"
          />
        </div>
      </div>

      {/* Preview de la story */}
      <div className="bg-[#1A1A1A] p-8 border-2 border-[#8B0000]/30">
        <div className="mb-6 flex justify-center">
          <div className="w-[360px] h-[640px] border-2 border-[#8B0000]">
            <div
              id="story-vertical"
              style={{ width: '1080px', height: '1920px' }}
              className="bg-[#0A0A0A] relative overflow-hidden scale-[0.333] origin-top-left"
            >
              {/* Effets */}
              <FilmGrain />
              <ScanLines />

              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#8B0000]/10 via-transparent to-[#8B0000]/20" />

              {/* Lignes décoratives verticales */}
              <div className="absolute top-0 left-0 bottom-0 w-8 bg-[#8B0000]" />
              <div className="absolute top-0 right-0 bottom-0 w-8 bg-[#8B0000]" />

              {/* Contenu */}
              <div className="relative h-full flex flex-col items-center justify-between p-32">
                {/* Logo en haut */}
                <div className="w-full flex justify-center pt-24">
                  <UntouchablesLogo width={600} height={180} />
                </div>

                {/* Contenu central */}
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-24 px-16">
                  {/* Badge type */}
                  <div className="px-12 py-6 bg-[#8B0000] text-[#E0E0E0] font-mono text-3xl uppercase border-4 border-[#E0E0E0]">
                    {storyTypes.find((t) => t.id === storyType)?.label}
                  </div>

                  {/* Texte principal */}
                  <h1 className="text-[120px] font-black uppercase leading-none text-[#E0E0E0] break-words">
                    {mainText}
                  </h1>

                  {/* Ligne séparatrice */}
                  <div className="w-96 h-2 bg-[#8B0000]" />

                  {/* Sous-titre */}
                  <p className="text-5xl font-mono uppercase text-[#8B0000]">
                    {subText}
                  </p>
                </div>

                {/* Footer */}
                <div className="w-full flex flex-col items-center space-y-8 pb-24">
                  {/* Indicateur swipe up */}
                  <div className="flex flex-col items-center space-y-4">
                    <div className="text-[#E0E0E0] text-4xl animate-bounce">▲</div>
                    <p className="text-3xl font-mono uppercase text-[#E0E0E0] opacity-60">
                      SWIPE UP
                    </p>
                  </div>
                </div>
              </div>

              {/* Patterns décoratifs */}
              <div className="absolute top-32 left-32 w-48 h-48 border-t-8 border-l-8 border-[#8B0000] opacity-50" />
              <div className="absolute top-32 right-32 w-48 h-48 border-t-8 border-r-8 border-[#8B0000] opacity-50" />
              <div className="absolute bottom-32 left-32 w-48 h-48 border-b-8 border-l-8 border-[#8B0000] opacity-50" />
              <div className="absolute bottom-32 right-32 w-48 h-48 border-b-8 border-r-8 border-[#8B0000] opacity-50" />
            </div>
          </div>
        </div>

        {/* Infos */}
        <div className="text-center mb-4 text-xs font-mono opacity-60">
          1080×1920px (HD) • Format PNG
        </div>

        {/* Bouton téléchargement */}
        <div className="flex justify-center">
          <DownloadButton
            elementId="story-vertical"
            filename={`untouchables-story-${storyType}.png`}
            label="Télécharger (1080x1920)"
          />
        </div>
      </div>

      {/* Guide d'utilisation */}
      <div className="mt-12 p-6 border-2 border-[#8B0000]/30 bg-[#8B0000]/5">
        <h3 className="text-lg font-black uppercase mb-3 text-[#8B0000]">
          📖 Guide d'utilisation
        </h3>
        <ul className="space-y-2 text-sm font-mono">
          <li>
            <strong className="text-[#8B0000]">Format :</strong> 1080×1920px (9:16 vertical)
          </li>
          <li>
            <strong className="text-[#8B0000]">Réseaux :</strong> Instagram Stories, Facebook
            Stories, Snapchat
          </li>
          <li>
            <strong className="text-[#8B0000]">Durée :</strong> Les stories durent 24h (Instagram/Facebook)
          </li>
          <li>
            ✓ Zone sûre : Évitez le texte important trop haut ou trop bas
          </li>
          <li>
            ✓ Ajoutez des stickers interactifs après l'upload (sondages, questions, etc.)
          </li>
        </ul>
      </div>
    </div>
  );
}
