import { motion } from 'motion/react';
import { BookOpen, Calendar, ArrowRight, Edit3, Mail } from 'lucide-react';
import { GlitchText } from './GlitchText';
import { Link } from 'react-router-dom';

// Mock data - premier numéro du fanzine
const firstIssue = {
  id: 'issue-1',
  number: 1,
  title: 'KORN 2026 : REWIND',
  date: 'Avril 2026',
  coverImage: 'https://images.unsplash.com/photo-1760302356448-d3385b5e6272?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWdhemluZSUyMHByaW50JTIwdmludGFnZXxlbnwxfHx8fDE3NjkwMjUwMzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  description: "Pourquoi le groupe retourne à l'enregistrement sur bande.",
  pages: 12,
};

export function FanzineSection() {
  return (
    <section className="py-12 relative">
      {/* Background texture - TEMPORARILY DISABLED */}
      {/* <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, #8B0000 2px, #8B0000 4px)',
        }}
      /> */}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-6xl md:text-8xl font-black text-[#E0E0E0] uppercase tracking-[-0.05em] mb-4"
              style={{ fontFamily: 'Arial Black, sans-serif' }}
            >
              <span className="text-[#8B0000]">&gt;&gt;</span>{' '}
              <GlitchText glitchIntensity="low">LE_FANZINE</GlitchText>
            </h2>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: '128px' }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-1 bg-[#8B0000]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              to="/fanzine"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#8B0000] text-[#E0E0E0] font-mono text-xs uppercase hover:bg-[#8B0000] transition-colors cursor-none"
            >
              DÉCOUVRIR LE FANZINE
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>

        {/* Info text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-sm text-[#E0E0E0]/70 mb-12 max-w-3xl leading-relaxed"
        >
          <span className="text-[#8B0000] font-black">//</span> Marre de scroller ? Tiens un vrai truc entre tes mains. 
          Un rendez-vous mensuel physique, livré directement dans ta boîte aux lettres. <span className="text-[#8B0000] font-black">12 pages A4 couleur + Poster A3 + Stickers</span>
        </motion.p>

        {/* Grille principale : 2/3 pour Korn 2026 + 1/3 pour Family Values */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* KORN 2026 - 2/3 */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="grid grid-cols-[300px_1fr] gap-8 h-full">
              {/* Cover */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group cursor-none flex"
              >
                <div className="relative overflow-hidden border-2 border-[#E0E0E0]/20 group-hover:border-[#8B0000] transition-all duration-300 aspect-[3/4] w-full">
                  <img
                    src={firstIssue.coverImage}
                    alt={`Fanzine #${firstIssue.number}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{
                      filter: 'contrast(1.5) brightness(0.7) saturate(0.8)',
                    }}
                  />

                  {/* Scanlines */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-30"
                    style={{
                      background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 0, 0, 0.2) 2px, rgba(139, 0, 0, 0.2) 4px)',
                    }}
                  />

                  {/* Issue Number Badge */}
                  <div className="absolute top-4 right-4 bg-[#8B0000] w-10 h-10 flex items-center justify-center">
                    <span className="font-black text-lg text-[#E0E0E0]">#{firstIssue.number}</span>
                  </div>

                  {/* Coming Soon Badge */}
                  <div className="absolute bottom-0 left-0 right-0 bg-[#8B0000] py-2 px-4">
                    <p className="font-mono text-xs text-[#E0E0E0] uppercase text-center font-black">
                      {firstIssue.date}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-black text-3xl text-[#E0E0E0] uppercase mb-4">
                    {firstIssue.title}
                  </h3>
                  
                  <p className="font-mono text-sm text-[#E0E0E0]/70 leading-relaxed mb-6">
                    {firstIssue.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-[#8B0000] text-xs">▸</span>
                      <p className="font-mono text-xs text-[#E0E0E0]/70">
                        <span className="font-black text-[#E0E0E0]">RAW POWER</span> - Retour à l'enregistrement sur bande
                      </p>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-[#8B0000] text-xs">▸</span>
                      <p className="font-mono text-xs text-[#E0E0E0]/70">
                        <span className="font-black text-[#E0E0E0]">HERE TO STAY</span> - Rétrospective Untouchables (2002-2026)
                      </p>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-[#8B0000] text-xs">▸</span>
                      <p className="font-mono text-xs text-[#E0E0E0]/70">
                        <span className="font-black text-[#E0E0E0]">FAMILY VALUES</span> - Tattoos, collections & communauté
                      </p>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-[#8B0000] text-xs">▸</span>
                      <p className="font-mono text-xs text-[#E0E0E0]/70">
                        <span className="font-black text-[#E0E0E0]">Poster A3 exclusif</span> + stickers collector
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#8B0000]/10 border-l-4 border-[#8B0000] p-6">
                  <h4 className="font-black text-sm text-[#8B0000] uppercase mb-3">
                    Abonnement par pack de 3 mois
                  </h4>
                  <p className="font-mono text-sm text-[#E0E0E0]/70 mb-4">
                    Prix libre avec minimum : <span className="text-[#8B0000] font-black">22,50 €</span> (France métropolitaine) / <span className="text-[#8B0000] font-black">30,00 €</span> (Belgique-Suisse)
                  </p>
                  <p className="font-mono text-xs text-[#E0E0E0]/50 italic">
                    Quasi à prix coûtant pour couvrir l'impression et l'envoi.<br />
                    Ton soutien finance l'hébergement du site.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* FAMILY VALUES - 1/3 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#8B0000]/5 border-2 border-[#8B0000]/30 p-6 flex flex-col"
          >
            <h3 className="font-black text-xl text-[#E0E0E0] uppercase mb-4">
              <span className="text-[#8B0000]">//</span> FAMILY VALUES
            </h3>
            <p className="font-mono text-xs text-[#E0E0E0]/70 leading-relaxed mb-6">
              Le fanzine Untouchables, c'est aussi votre truc. Participe en partageant tes créations.
            </p>
            
            <div className="space-y-4 mb-6 flex-1">
              <div className="flex items-start gap-2">
                <Edit3 size={16} className="text-[#8B0000] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-black text-[10px] text-[#E0E0E0] uppercase mb-1">
                    Articles & Chroniques
                  </h4>
                  <p className="font-mono text-[10px] text-[#E0E0E0]/60">
                    Analyses, ressentis, souvenirs
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Edit3 size={16} className="text-[#8B0000] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-black text-[10px] text-[#E0E0E0] uppercase mb-1">
                    Fanarts & Photos
                  </h4>
                  <p className="font-mono text-[10px] text-[#E0E0E0]/60">
                    Illustrations, photos de concerts
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Edit3 size={16} className="text-[#8B0000] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-black text-[10px] text-[#E0E0E0] uppercase mb-1">
                    Tattoos & Collections
                  </h4>
                  <p className="font-mono text-[10px] text-[#E0E0E0]/60">
                    Ta collection, tes merch rares
                  </p>
                </div>
              </div>

              <p className="font-mono text-[10px] text-[#E0E0E0]/50 italic mt-4">
                Délai : avant le 15 du mois pour le numéro suivant
              </p>
            </div>

            <Link
              to="/fanzine"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-[#0A0A0A] border-2 border-[#8B0000] text-[#E0E0E0] font-black text-xs uppercase hover:bg-[#8B0000] transition-all cursor-none w-fit mt-auto"
            >
              <BookOpen size={16} />
              PROPOSER UN CONTENU
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}