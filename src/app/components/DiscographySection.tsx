import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { Link } from 'react-router';

const albums = [
  {
    id: 'korn-1994',
    title: 'KORN',
    year: '1994',
    tracks: 12,
    image: 'https://images.unsplash.com/photo-1697238724753-60c0c31132d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW55bCUyMHJlY29yZCUyMGFsYnVtfGVufDF8fHx8MTc2ODkxNDI0M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'L\'album qui a tout changé. Un mélange explosif de metal et de hip-hop.',
  },
  {
    id: 'life-is-peachy-1996',
    title: 'LIFE IS PEACHY',
    year: '1996',
    tracks: 14,
    image: 'https://images.unsplash.com/photo-1747666303792-e9bf6ee7efc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwY2QlMjBhbGJ1bXxlbnwxfHx8fDE3Njg5OTg5MDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Plus sombre, plus agressif. L\'évolution naturelle du son Korn.',
  },
  {
    id: 'follow-the-leader-1998',
    title: 'FOLLOW THE LEADER',
    year: '1998',
    tracks: 13,
    image: 'https://images.unsplash.com/photo-1697238724753-60c0c31132d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW55bCUyMHJlY29yZCUyMGFsYnVtfGVufDF8fHx8MTc2ODkxNDI0M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Disque de platine. Freak on a Leash devient un hymne générationnel.',
  },
  {
    id: 'issues-1999',
    title: 'ISSUES',
    year: '1999',
    tracks: 16,
    image: 'https://images.unsplash.com/photo-1747666303792-e9bf6ee7efc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwY2QlMjBhbGJ1bXxlbnwxfHx8fDE3Njg5OTg5MDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'L\'apogée du nu-metal. Exploration émotionnelle brutale et viscérale.',
  },
  {
    id: 'untouchables-2002',
    title: 'UNTOUCHABLES',
    year: '2002',
    tracks: 14,
    image: 'https://images.unsplash.com/photo-1697238724753-60c0c31132d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW55bCUyMHJlY29yZCUyMGFsYnVtfGVufDF8fHx8MTc2ODkxNDI0M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Expérimental et avant-gardiste. Production massive et atmosphères oppressantes.',
  },
  {
    id: 'requiem-2022',
    title: 'REQUIEM',
    year: '2022',
    tracks: 9,
    image: 'https://images.unsplash.com/photo-1747666303792-e9bf6ee7efc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwY2QlMjBhbGJ1bXxlbnwxfHx8fDE3Njg5OTg5MDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Le retour aux sources. Brutal, direct, sans compromis.',
  },
];

export function DiscographySection() {
  return (
    <section id="discography" className="relative py-32 px-4 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="text-7xl font-black text-[#E0E0E0] tracking-tighter uppercase mb-4"
              style={{ fontFamily: 'Arial Black, sans-serif', letterSpacing: '-0.05em' }}
            >
              <GlitchText glitchIntensity="high">DISCOGRAPHIE</GlitchText>
            </h2>
            <div className="h-[2px] w-32 bg-[#8B0000]" />
          </motion.div>
        </div>

        {/* Info text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-sm text-[#E0E0E0]/70 mb-12 max-w-3xl"
        >
          <span className="text-[#8B0000] font-black">//</span> De l'album éponyme de 1994 à aujourd'hui, explorez trois décennies d'évolution sonore.<br />
          Chaque album est une révolution, chaque track une déclaration de guerre.
        </motion.p>

        {/* Albums Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {albums.map((album, index) => (
            <Link
              key={album.id}
              to={`/album/${album.id}`}
              className="group cursor-none block"
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Album Cover */}
                <div className="relative overflow-hidden border-2 border-[#8B0000] aspect-square mb-6">
                  <ImageWithFallback
                    src={album.image}
                    alt={album.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    style={{
                      filter: 'contrast(1.5) brightness(0.7) grayscale(0.9)',
                      mixBlendMode: 'luminosity',
                    }}
                  />

                  {/* Scanlines */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-40"
                    style={{
                      background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 0, 0, 0.2) 2px, rgba(139, 0, 0, 0.2) 4px)',
                    }}
                  />

                  {/* Year badge */}
                  <div className="absolute top-4 left-4 bg-[#8B0000] px-4 py-2 border-2 border-[#E0E0E0]">
                    <span className="font-black text-xl text-[#0A0A0A]">{album.year}</span>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#8B0000]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-6">
                    <p className="font-mono text-xs text-[#E0E0E0] text-center leading-relaxed mb-4">
                      {album.description}
                    </p>
                    <div className="text-[#E0E0E0] font-mono text-xs">
                      {album.tracks} TRACKS
                    </div>
                  </div>
                </div>

                {/* Album Info */}
                <div>
                  <h3 className="text-2xl font-black text-[#E0E0E0] mb-2 uppercase tracking-tight group-hover:text-[#8B0000] transition-colors">
                    {album.title}
                  </h3>
                  <div className="flex items-center gap-4 font-mono text-xs text-[#E0E0E0]/60">
                    <span className="text-[#8B0000]">{album.year}</span>
                    <span>//</span>
                    <span>{album.tracks} TRACKS</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 border-2 border-[#8B0000] p-8 bg-[#0A0A0A]"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-5xl font-black text-[#8B0000] mb-2">14</p>
              <p className="font-mono text-xs text-[#E0E0E0] uppercase">Albums studio</p>
            </div>
            <div>
              <p className="text-5xl font-black text-[#8B0000] mb-2">40M+</p>
              <p className="font-mono text-xs text-[#E0E0E0] uppercase">Albums vendus</p>
            </div>
            <div>
              <p className="text-5xl font-black text-[#8B0000] mb-2">2</p>
              <p className="font-mono text-xs text-[#E0E0E0] uppercase">Grammy Awards</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}