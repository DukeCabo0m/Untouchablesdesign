import { Link } from 'react-router';
import { useState, useEffect } from 'react';
import fanzineCover from 'figma:asset/c8e18dd9f7fde8794d1a37bbfe91e63aaaca5892.png';
import { motion } from 'motion/react';
import { Box, Mail, Edit3, BookOpen, ArrowRight } from 'lucide-react';
import { GlitchText } from '@/app/components/GlitchText';
import { PageHeader } from '@/app/components/PageHeader';
import { projectId, publicAnonKey } from '/utils/supabase/info';

export function FanzinePage() {
  const [latestFanzine, setLatestFanzine] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestFanzine = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-d462d5d8/fanzines/latest`
        );
        
        if (response.ok) {
          const data = await response.json();
          setLatestFanzine(data.fanzine);
        }
      } catch (error) {
        console.error('Error fetching latest fanzine:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestFanzine();
  }, []);

  // Fallback data if no fanzine is available
  const firstIssue = latestFanzine || {
    id: 'issue-1',
    issueNumber: 1,
    title: 'KORN 2026 : REWIND',
    publicationDate: 'Avril 2026',
    coverImage: fanzineCover,
    description: "Pourquoi le groupe retourne à l'enregistrement sur bande. De l'analogique au numérique : plongée dans le processus créatif du 15ème album.",
    pages: 12,
    status: 'upcoming',
    contentPreview: [
      'RAW POWER : Retour au brut (Enregistrement analogique)',
      'HERE TO STAY : Rétrospective Untouchables 24 ans après',
      'BEHIND THE CURTAIN : Histoire de Untouchables.fr',
      'FAMILY VALUES : Zone communautaire (Tattoos & Collections)',
    ],
  };

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <PageHeader
        title="L'Édition Papier"
        description="Marre de scroller ? Tiens un vrai truc entre tes mains.<br />Un rendez-vous mensuel physique, livré directement dans ta boîte aux lettres."
        backgroundImage="https://images.unsplash.com/photo-1617217139408-a7edcce70e3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWdhemluZSUyMHByaW50JTIwZmFuemluZSUyMGRhcmt8ZW58MXx8fHwxNzY5MTkzMDUyfDA&ixlib=rb-4.1.0&q=80&w=1080"
        breadcrumbs={[
          { label: 'ACCUEIL', path: '/' },
          { label: 'FANZINE' }
        ]}
        glitchIntensity="medium"
      />

      <div className="px-4 pb-24 bg-[#0A0A0A]">
        <div className="max-w-[1920px] mx-auto">
          {/* What you get */}
          <div className="bg-[#8B0000]/10 border-l-4 border-[#8B0000] p-6 max-w-3xl mb-16">
            <h3 className="font-black text-sm text-[#8B0000] uppercase mb-4">
              Chaque mois, tu reçois une enveloppe contenant :
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <Box size={16} className="text-[#8B0000] mt-0.5 flex-shrink-0" />
                <span className="font-mono text-xs text-[#E0E0E0]/70">
                  <span className="text-[#E0E0E0] font-black">Le Fanzine :</span> 12 pages A4 couleur, finition brochée
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Box size={16} className="text-[#8B0000] mt-0.5 flex-shrink-0" />
                <span className="font-mono text-xs text-[#E0E0E0]/70">
                  <span className="text-[#E0E0E0] font-black">Un Poster A3 exclusif</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Box size={16} className="text-[#8B0000] mt-0.5 flex-shrink-0" />
                <span className="font-mono text-xs text-[#E0E0E0]/70">
                  <span className="text-[#E0E0E0] font-black">Des Stickers inédits</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Grid de 3 colonnes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* First Issue - Column 1 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col"
            >
              <h3 className="font-black text-xl text-[#E0E0E0] uppercase mb-6">
                <span className="text-[#8B0000]">//</span> PREMIER NUMÉRO
              </h3>

              {/* Cover */}
              <div className="group flex-1 flex flex-col">
                <div className="relative overflow-hidden border-2 border-[#E0E0E0]/20 group-hover:border-[#8B0000] transition-all duration-300 mb-4 aspect-[3/4]">
                  <img
                    src={firstIssue.coverImage}
                    alt={`Fanzine #${firstIssue.issueNumber}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Scanlines */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-30"
                    style={{
                      background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 0, 0, 0.2) 2px, rgba(139, 0, 0, 0.2) 4px)',
                    }}
                  />

                  {/* Issue Number Badge */}
                  <div className="absolute top-4 right-4 bg-[#8B0000] w-12 h-12 flex items-center justify-center">
                    <span className="font-black text-xl text-[#E0E0E0]">#{firstIssue.issueNumber}</span>
                  </div>

                  {/* Coming Soon Badge */}
                  <div className="absolute bottom-0 left-0 right-0 bg-[#8B0000] py-2 px-4">
                    <p className="font-mono text-xs text-[#E0E0E0] uppercase text-center font-black">
                      {firstIssue.publicationDate}
                    </p>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-4 flex-1 flex flex-col">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-black text-lg text-[#E0E0E0] uppercase">
                        {firstIssue.title}
                      </h4>
                      <span className="font-mono text-xs text-[#E0E0E0]/60">
                        {firstIssue.pages} pages
                      </span>
                    </div>
                    <p className="font-mono text-xs text-[#E0E0E0]/70 leading-relaxed">
                      {firstIssue.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="bg-[#000000] border border-[#8B0000]/30 p-4 mt-auto">
                    <h5 className="font-black text-xs text-[#8B0000] uppercase mb-3">
                      Au Sommaire :
                    </h5>
                    <ul className="space-y-2">
                      {firstIssue.contentPreview.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-[#8B0000] mt-1">▸</span>
                          <span className="font-mono text-xs text-[#E0E0E0]/70">
                            {highlight}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Subscribe Card - Column 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col"
            >
              <h3 className="font-black text-xl text-[#E0E0E0] uppercase mb-6">
                <span className="text-[#8B0000]">//</span> S'ABONNER
              </h3>

              <div className="bg-[#000000] border-2 border-[#8B0000] p-6 flex-1 flex flex-col">
                <div className="mb-6">
                  <Mail size={32} className="text-[#8B0000] mb-4" />
                  <p className="font-mono text-xs text-[#E0E0E0]/70 leading-relaxed mb-3">
                    Abonnement <span className="text-[#8B0000] font-black">par pack de 3 mois</span> (3 numéros) pour sécuriser les frais d'impression.
                  </p>
                  <p className="font-mono text-[10px] text-[#E0E0E0]/50 leading-relaxed italic">
                    Prix Libre avec Minimum Obligatoire
                  </p>
                </div>

                {/* Ce que tu obtiens */}
                <div className="bg-[#8B0000]/5 border border-[#8B0000]/20 p-4 mb-6">
                  <h4 className="font-black text-xs text-[#8B0000] uppercase mb-3">
                    Ton Pack Trimestriel :
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-[#8B0000] mt-1">▸</span>
                      <span className="font-mono text-[10px] text-[#E0E0E0]/70">
                        3 Fanzines (12 pages A4 couleur chacun)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8B0000] mt-1">▸</span>
                      <span className="font-mono text-[10px] text-[#E0E0E0]/70">
                        3 Posters A3 exclusifs différents
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8B0000] mt-1">▸</span>
                      <span className="font-mono text-[10px] text-[#E0E0E0]/70">
                        Stickers collector inédits
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8B0000] mt-1">▸</span>
                      <span className="font-mono text-[10px] text-[#E0E0E0]/70">
                        Accès aux versions PDF en ligne
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4 mb-6">
                  {/* France */}
                  <div className="bg-[#8B0000]/10 border border-[#8B0000]/30 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-[10px] text-[#E0E0E0]/70 uppercase">
                        🇫🇷 France Métropolitaine
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-black text-2xl text-[#8B0000]">
                        22,50€
                      </span>
                      <span className="font-mono text-xs text-[#E0E0E0]/60">
                        minimum
                      </span>
                    </div>
                    <p className="font-mono text-[10px] text-[#E0E0E0]/50 mt-2">
                      soit 7,50 € / numéro
                    </p>
                  </div>

                  {/* Belgique & Suisse */}
                  <div className="bg-[#8B0000]/10 border border-[#8B0000]/30 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-[10px] text-[#E0E0E0]/70 uppercase">
                        🇧🇪🇨🇭 Belgique & Suisse
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-black text-2xl text-[#8B0000]">
                        30,00€
                      </span>
                      <span className="font-mono text-xs text-[#E0E0E0]/60">
                        minimum
                      </span>
                    </div>
                    <p className="font-mono text-[10px] text-[#E0E0E0]/50 mt-2">
                      soit 10,00 € / numéro
                    </p>
                  </div>
                </div>

                {/* Transparency section */}
                <div className="bg-[#0A0A0A] border border-[#8B0000]/20 p-4 mb-6 flex-1">
                  <h4 className="font-black text-xs text-[#8B0000] uppercase mb-3">
                    Transparence Totale
                  </h4>
                  <p className="font-mono text-[10px] text-[#E0E0E0]/70 leading-relaxed mb-2">
                    Pour la France, 3,30 € partent dans le timbre et l'enveloppe. 
                    Ajoutez l'impression du mag, du poster et des stickers...
                  </p>
                  <p className="font-mono text-[10px] text-[#8B0000] leading-relaxed mb-3">
                    <span className="font-black">À 7,50 €, nous sommes quasi à prix coûtant.</span> Tout ce que vous donnez en plus sert à financer l'hébergement du site untouchables.fr !
                  </p>
                  <div className="pt-3 border-t border-[#8B0000]/20">
                    <p className="font-mono text-[10px] text-[#E0E0E0]/60 leading-relaxed">
                      <span className="text-[#8B0000] font-black">Note :</span> Nous fonctionnons sur un modèle associatif. 
                      Ton soutien nous permet de continuer à créer du contenu de qualité pour la communauté.
                    </p>
                  </div>
                </div>

                <Link
                  to="/fanzine/subscribe"
                  className="block w-full px-6 py-3 bg-[#8B0000] text-[#E0E0E0] font-black text-sm uppercase text-center hover:bg-transparent hover:border-2 hover:border-[#8B0000] transition-all mt-auto"
                >
                  <Mail size={14} className="inline mr-2" />
                  S'ABONNER (3 MOIS)
                </Link>
              </div>
            </motion.div>

            {/* Contribute & Archive - Column 3 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col"
            >
              <h3 className="font-black text-xl text-[#E0E0E0] uppercase mb-6">
                <span className="text-[#8B0000]">//</span> PARTICIPER
              </h3>

              <div className="flex-1 flex flex-col gap-6">
                {/* Contribute Card */}
                <div className="bg-[#8B0000]/10 border-2 border-[#8B0000] p-6 flex-1 flex flex-col">
                  <div className="mb-6">
                    <Edit3 size={32} className="text-[#8B0000] mb-4" />
                    <h4 className="font-black text-lg text-[#E0E0E0] uppercase mb-2">
                      <GlitchText glitchIntensity="low">CONTRIBUER</GlitchText>
                    </h4>
                    <p className="font-mono text-xs text-[#E0E0E0]/70 leading-relaxed mb-4">
                      Participe au fanzine en partageant tes articles, fanarts, photos de concerts ou chroniques.
                    </p>
                  </div>

                  <div className="space-y-4 mb-6 flex-1">
                    <div>
                      <h5 className="font-black text-xs text-[#8B0000] uppercase mb-2">
                        Types de contenus :
                      </h5>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-[#8B0000] mt-1">▸</span>
                          <span className="font-mono text-xs text-[#E0E0E0]/70">
                            Articles & chroniques
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#8B0000] mt-1">▸</span>
                          <span className="font-mono text-xs text-[#E0E0E0]/70">
                            Fanarts & illustrations
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#8B0000] mt-1">▸</span>
                          <span className="font-mono text-xs text-[#E0E0E0]/70">
                            Photos de concerts
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#8B0000] mt-1">▸</span>
                          <span className="font-mono text-xs text-[#E0E0E0]/70">
                            Témoignages & interviews
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-[#000000] border border-[#8B0000]/30 p-3">
                      <h5 className="font-black text-[10px] text-[#8B0000] uppercase mb-2">
                        Délai de proposition :
                      </h5>
                      <p className="font-mono text-[10px] text-[#E0E0E0]/70 leading-relaxed">
                        Envoie tes contributions avant le 15 du mois pour une publication dans le numéro suivant.
                      </p>
                    </div>

                    <div className="bg-[#0A0A0A] border border-[#8B0000]/20 p-3">
                      <h5 className="font-black text-[10px] text-[#8B0000] uppercase mb-2">
                        Pourquoi contribuer ?
                      </h5>
                      <ul className="space-y-1">
                        <li className="flex items-start gap-2">
                          <span className="text-[#8B0000] text-[10px] mt-0.5">•</span>
                          <span className="font-mono text-[10px] text-[#E0E0E0]/60">
                            Ton nom dans le fanzine
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#8B0000] text-[10px] mt-0.5">•</span>
                          <span className="font-mono text-[10px] text-[#E0E0E0]/60">
                            Un exemplaire gratuit offert
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#8B0000] text-[10px] mt-0.5">•</span>
                          <span className="font-mono text-[10px] text-[#E0E0E0]/60">
                            Partage avec la communauté
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <Link
                    to="/contribute"
                    className="block w-full px-6 py-3 border-2 border-[#8B0000] text-[#E0E0E0] font-black text-sm uppercase text-center hover:bg-[#8B0000] transition-all mt-auto"
                  >
                    <Edit3 size={14} className="inline mr-2" />
                    PROPOSER UN CONTENU
                  </Link>
                </div>

                {/* Archive Link */}
                <div className="bg-[#000000] border-2 border-[#E0E0E0]/30 p-6">
                  <BookOpen size={32} className="text-[#E0E0E0]/70 mb-4" />
                  <h4 className="font-black text-lg text-[#E0E0E0] uppercase mb-2">
                    ARCHIVES
                  </h4>
                  <p className="font-mono text-xs text-[#E0E0E0]/70 leading-relaxed mb-4">
                    Consulte tous les numéros du fanzine en ligne ou télécharge les versions PDF.
                  </p>
                  <div className="bg-[#8B0000]/5 border border-[#8B0000]/20 p-3 mb-6">
                    <p className="font-mono text-[10px] text-[#E0E0E0]/60 leading-relaxed">
                      Les abonnés ont un accès illimité aux archives numériques et peuvent télécharger tous les anciens numéros.
                    </p>
                  </div>
                  <Link
                    to="/fanzine/archive"
                    className="block w-full px-6 py-3 border-2 border-[#E0E0E0]/30 text-[#E0E0E0] font-mono text-xs uppercase text-center hover:border-[#8B0000] hover:text-[#8B0000] transition-all"
                  >
                    VOIR TOUS LES NUMÉROS
                    <ArrowRight size={14} className="inline ml-2" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}