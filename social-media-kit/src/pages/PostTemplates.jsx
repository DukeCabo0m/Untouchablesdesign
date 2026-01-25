import { useState } from 'react';
import UntouchablesLogo from '../components/UntouchablesLogo';
import GlitchText from '../components/GlitchText';
import DownloadButton from '../components/DownloadButton';
import FilmGrain from '../components/FilmGrain';
import ScanLines from '../components/ScanLines';

export default function PostTemplates() {
  const [postType, setPostType] = useState('concert');
  const [mainText, setMainText] = useState('KORN EN CONCERT');
  const [subText, setSubText] = useState('Paris - Accor Arena');
  const [date, setDate] = useState('15 JUIN 2026');

  const postTypes = [
    { id: 'concert', label: '🎸 Annonce Concert' },
    { id: 'quote', label: '💬 Citation' },
    { id: 'news', label: '📰 Actualité' },
    { id: 'fanzine', label: '📖 Fanzine' },
  ];

  return (
    <div>
      <div className="mb-12">
        <h2 className="text-3xl font-black uppercase mb-2">Posts Carrés</h2>
        <p className="text-sm font-mono opacity-60">
          Format 1080×1080px pour Instagram, Facebook, LinkedIn
        </p>
      </div>

      {/* Sélecteur de type */}
      <div className="mb-8 flex gap-3 flex-wrap">
        {postTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setPostType(type.id)}
            className={`
              px-4 py-2 font-mono text-sm uppercase border-2
              ${
                postType === type.id
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
            Sous-titre
          </label>
          <input
            type="text"
            value={subText}
            onChange={(e) => setSubText(e.target.value)}
            className="w-full px-4 py-3 bg-[#0A0A0A] border-2 border-[#8B0000]/50 
                       text-[#E0E0E0] font-mono focus:outline-none focus:border-[#8B0000]"
          />
        </div>

        {(postType === 'concert' || postType === 'fanzine') && (
          <div>
            <label className="block text-sm font-mono uppercase mb-2 text-[#8B0000]">
              Date
            </label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 bg-[#0A0A0A] border-2 border-[#8B0000]/50 
                         text-[#E0E0E0] font-mono focus:outline-none focus:border-[#8B0000]"
            />
          </div>
        )}
      </div>

      {/* Preview du post */}
      <div className="bg-[#1A1A1A] p-8 border-2 border-[#8B0000]/30">
        <div className="mb-6 flex justify-center">
          <div className="w-[540px] h-[540px] border-2 border-[#8B0000]">
            <div
              id="post-square"
              style={{ width: '1080px', height: '1080px' }}
              className="bg-[#0A0A0A] relative overflow-hidden scale-50 origin-top-left"
            >
              {/* Effets */}
              <FilmGrain />
              <ScanLines />

              {/* Background pattern */}
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    45deg,
                    #8B0000 0px,
                    #8B0000 2px,
                    transparent 2px,
                    transparent 10px
                  )`,
                }}
              />

              {/* Lignes décoratives */}
              <div className="absolute top-0 left-0 right-0 h-4 bg-[#8B0000]" />
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#8B0000]" />

              {/* Contenu */}
              <div className="relative h-full flex flex-col items-center justify-between p-24">
                {/* Logo en haut */}
                <div className="w-full flex justify-center">
                  <UntouchablesLogo width={400} height={120} />
                </div>

                {/* Contenu central */}
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-12">
                  {/* Texte principal */}
                  <h1 className="text-8xl font-black uppercase leading-none text-[#E0E0E0]">
                    {mainText}
                  </h1>

                  {/* Ligne séparatrice */}
                  <div className="w-48 h-1 bg-[#8B0000]" />

                  {/* Sous-titre */}
                  <p className="text-4xl font-mono uppercase text-[#8B0000]">
                    {subText}
                  </p>

                  {/* Date (si applicable) */}
                  {(postType === 'concert' || postType === 'fanzine') && (
                    <p className="text-3xl font-mono uppercase text-[#E0E0E0]">
                      {date}
                    </p>
                  )}
                </div>

                {/* Badge type en bas */}
                <div className="w-full flex justify-center">
                  <div className="px-8 py-4 bg-[#8B0000] text-[#E0E0E0] font-mono text-2xl uppercase">
                    {postTypes.find((t) => t.id === postType)?.label}
                  </div>
                </div>
              </div>

              {/* Corners décoratifs */}
              <div className="absolute top-16 left-16 w-32 h-32 border-t-8 border-l-8 border-[#8B0000]" />
              <div className="absolute top-16 right-16 w-32 h-32 border-t-8 border-r-8 border-[#8B0000]" />
              <div className="absolute bottom-16 left-16 w-32 h-32 border-b-8 border-l-8 border-[#8B0000]" />
              <div className="absolute bottom-16 right-16 w-32 h-32 border-b-8 border-r-8 border-[#8B0000]" />
            </div>
          </div>
        </div>

        {/* Infos */}
        <div className="text-center mb-4 text-xs font-mono opacity-60">
          1080×1080px (HD) • Format PNG
        </div>

        {/* Bouton téléchargement */}
        <div className="flex justify-center">
          <DownloadButton
            elementId="post-square"
            filename={`untouchables-post-${postType}.png`}
            label="Télécharger (1080x1080)"
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
            <strong className="text-[#8B0000]">Format :</strong> 1080×1080px (carré Instagram)
          </li>
          <li>
            <strong className="text-[#8B0000]">Réseaux :</strong> Instagram, Facebook,
            LinkedIn, Twitter/X
          </li>
          <li>
            <strong className="text-[#8B0000]">Types :</strong> 4 templates adaptés à
            différents contenus
          </li>
          <li>
            ✓ Personnalisez les textes pour chaque post
          </li>
          <li>
            ✓ Restez cohérent avec votre identité visuelle
          </li>
        </ul>
      </div>
    </div>
  );
}
