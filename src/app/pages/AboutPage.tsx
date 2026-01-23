import { motion } from 'motion/react';
import { GlitchText } from '@/app/components/GlitchText';
import { Heart, Users, Zap, Shield } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1
            className="text-7xl md:text-9xl font-black text-[#E0E0E0] uppercase tracking-tighter mb-6"
            style={{ fontFamily: 'Arial Black, sans-serif', letterSpacing: '-0.05em' }}
          >
            <GlitchText>À PROPOS</GlitchText>
          </h1>
          <div className="h-1 w-32 bg-[#8B0000]" />
        </motion.div>

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="p-8 bg-[#0A0A0A] border-l-4 border-[#8B0000]">
            <h2
              className="text-3xl font-black text-[#E0E0E0] uppercase mb-4 tracking-tight"
              style={{ fontFamily: 'Arial Black, sans-serif' }}
            >
              UNTOUCHABLES
            </h2>
            <p className="font-mono text-sm text-[#E0E0E0] leading-relaxed mb-4">
              **Communauté francophone de fans de Korn**, active depuis 2018. Nous sommes des passionnés qui partagent l'amour du nu metal, l'esthétique sombre et la puissance cathartique de la musique de Korn.
            </p>
            <p className="font-mono text-sm text-[#E0E0E0]/70 leading-relaxed">
              Notre nom est inspiré de l'album "Untouchables" (2002), sommet expérimental qui a repoussé les limites du genre. Comme cet album, nous explorons, expérimentons et célébrons sans compromis.
            </p>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2
            className="text-4xl font-black text-[#E0E0E0] uppercase mb-8 tracking-tight"
            style={{ fontFamily: 'Arial Black, sans-serif' }}
          >
            <span className="text-[#8B0000]">&gt;&gt;</span> NOS VALEURS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Heart,
                title: 'PASSION',
                text: 'Amour inconditionnel pour Korn et le nu metal. Nous célébrons 30+ ans de révolution sonore.',
              },
              {
                icon: Users,
                title: 'COMMUNAUTÉ',
                text: 'Espace bienveillant et inclusif. Ici, tous les fans sont les bienvenus, peu importe leur parcours.',
              },
              {
                icon: Zap,
                title: 'AUTHENTICITÉ',
                text: 'Pas de filtre, pas de compromis. Comme Korn, nous restons fidèles à nous-mêmes.',
              },
              {
                icon: Shield,
                title: 'RESPECT',
                text: 'Modération active, zéro tolérance pour le harcèlement. Tout le monde mérite sa place.',
              },
            ].map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="bg-[#0A0A0A] border border-[#E0E0E0]/20 p-6"
                >
                  <Icon className="w-10 h-10 text-[#8B0000] mb-4" strokeWidth={1.5} />
                  <h3
                    className="text-xl font-black text-[#E0E0E0] uppercase mb-2 tracking-tight"
                    style={{ fontFamily: 'Arial Black, sans-serif' }}
                  >
                    {value.title}
                  </h3>
                  <p className="font-mono text-xs text-[#E0E0E0]/70 leading-relaxed">
                    {value.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Design system */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-16"
        >
          <h2
            className="text-4xl font-black text-[#E0E0E0] uppercase mb-8 tracking-tight"
            style={{ fontFamily: 'Arial Black, sans-serif' }}
          >
            <span className="text-[#8B0000]">&gt;&gt;</span> ESTHÉTIQUE "HIGH-DEF HORROR"
          </h2>
          <div className="font-mono text-sm text-[#E0E0E0] leading-relaxed space-y-4">
            <p>
              Notre design suit les guidelines **"Organic Glitch & Shadows"** : esthétique analogique dégradée, effets glitch authentiques, grain filmique, scanlines VHS, curseur personnalisé.
            </p>
            <p>
              **Palette chromatique** : Fond #0A0A0A (noir profond), accents #8B0000 (rouge sang), texte #E0E0E0 (gris clair). Pas de dégradés lisses ni d'ombres douces. Tout est brut, nerveux, anxiogène.
            </p>
            <p>
              **Typographie** : Titres en condensé extra-bold, contenu en monospace. Navigation déstructurée, imagerie macro avec traitement X-Ray. Un univers visuel qui reflète l'intensité de la musique.
            </p>
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <h2
            className="text-4xl font-black text-[#E0E0E0] uppercase mb-8 tracking-tight"
            style={{ fontFamily: 'Arial Black, sans-serif' }}
          >
            <span className="text-[#8B0000]">&gt;&gt;</span> L'ÉQUIPE
          </h2>
          <div className="bg-[#0A0A0A] border-l-4 border-[#8B0000] p-8 space-y-6 font-mono text-sm text-[#E0E0E0]">
            <div>
              <div className="text-[#8B0000] uppercase mb-1">FONDATEURS</div>
              <p className="text-[#E0E0E0]/70">Marc "Maggot" Dubois, Sophie "Freak" Martin</p>
            </div>
            <div>
              <div className="text-[#8B0000] uppercase mb-1">MODÉRATION</div>
              <p className="text-[#E0E0E0]/70">Équipe de 8 modérateurs actifs 24/7</p>
            </div>
            <div>
              <div className="text-[#8B0000] uppercase mb-1">DÉVELOPPEMENT</div>
              <p className="text-[#E0E0E0]/70">Pierre "Riff" Lemoine (Lead Dev)</p>
            </div>
            <div>
              <div className="text-[#8B0000] uppercase mb-1">DESIGN</div>
              <p className="text-[#E0E0E0]/70">Alex "Glitch" Bernard (Art Director)</p>
            </div>
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <h2
            className="text-4xl font-black text-[#E0E0E0] uppercase mb-8 tracking-tight"
            style={{ fontFamily: 'Arial Black, sans-serif' }}
          >
            <span className="text-[#8B0000]">&gt;&gt;</span> CONTACT
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs text-[#E0E0E0]">
            <div className="bg-[#0A0A0A] border border-[#E0E0E0]/20 p-6">
              <div className="text-[#8B0000] uppercase mb-3">GÉNÉRAL</div>
              <div className="space-y-2 text-[#E0E0E0]/70">
                <p>CONTACT@UNTOUCHABLES.FR</p>
                <p>SUPPORT@UNTOUCHABLES.FR</p>
              </div>
            </div>
            <div className="bg-[#0A0A0A] border border-[#E0E0E0]/20 p-6">
              <div className="text-[#8B0000] uppercase mb-3">ADMINISTRATION</div>
              <div className="space-y-2 text-[#E0E0E0]/70">
                <p>ADMIN@UNTOUCHABLES.FR</p>
                <p>MODERATION@UNTOUCHABLES.FR</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
