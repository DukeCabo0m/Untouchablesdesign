import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { PageHeader } from '@/app/components/PageHeader';
import { Download, BookOpen, Lock, Calendar } from 'lucide-react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

export function FanzineArchivePage() {
  const [fanzines, setFanzines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFanzines = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-d462d5d8/fanzines`
        );
        
        if (response.ok) {
          const data = await response.json();
          setFanzines(data.fanzines || []);
        }
      } catch (error) {
        console.error('Error fetching fanzines:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFanzines();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <PageHeader
        title="Archives Fanzine"
        description="Tous les numéros du fanzine Untouchables.<br />Consultez et téléchargez les versions PDF."
        backgroundImage="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWdhemluZSUyMGFyY2hpdmUlMjBkYXJrfGVufDF8fHx8MTc2OTE5MzA1Mnww&ixlib=rb-4.1.0&q=80&w=1080"
        breadcrumbs={[
          { label: 'ACCUEIL', path: '/' },
          { label: 'FANZINE', path: '/fanzine' },
          { label: 'ARCHIVES' }
        ]}
        glitchIntensity="medium"
      />

      <div className="px-4 pb-24 bg-[#0A0A0A]">
        <div className="max-w-[1920px] mx-auto">
          {/* Info Banner */}
          <div className="mb-12 bg-[#8B0000]/10 border-l-4 border-[#8B0000] p-6">
            <div className="flex items-start gap-4">
              <BookOpen size={24} className="text-[#8B0000] mt-1" />
              <div>
                <h3 className="font-black text-sm text-[#8B0000] uppercase mb-2">
                  Accès aux Archives
                </h3>
                <p className="font-mono text-xs text-[#F0F0F0]/70 leading-relaxed mb-2">
                  Les abonnés ont un accès illimité aux archives numériques et peuvent télécharger tous les anciens numéros au format PDF.
                </p>
                <p className="font-mono text-xs text-[#8B0000]">
                  Pas encore abonné ? <Link to="/fanzine" className="underline hover:text-[#F0F0F0]">S'abonner maintenant</Link>
                </p>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <p className="font-mono text-sm text-[#8B0000] animate-pulse">
                Chargement des archives...
              </p>
            </div>
          )}

          {/* Empty State */}
          {!loading && fanzines.length === 0 && (
            <div className="text-center py-12 bg-[#0A0A0A] border border-[#8B0000]/30 p-8">
              <BookOpen size={48} className="text-[#8B0000] mx-auto mb-4" />
              <p className="font-mono text-sm text-[#F0F0F0]/60 mb-4">
                Aucun numéro publié pour le moment.
              </p>
              <p className="font-mono text-xs text-[#F0F0F0]/40">
                Le premier numéro sera disponible bientôt !
              </p>
            </div>
          )}

          {/* Fanzines Grid */}
          {!loading && fanzines.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {fanzines.map((fanzine, index) => (
                <motion.div
                  key={fanzine.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-[#0A0A0A] border-2 border-[#8B0000]/20 hover:border-[#8B0000] transition-all">
                    {/* Cover */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={fanzine.coverImage}
                        alt={`Fanzine #${fanzine.issueNumber}`}
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
                        <span className="font-black text-xl text-[#F0F0F0]">
                          #{fanzine.issueNumber}
                        </span>
                      </div>

                      {/* Status Badge */}
                      {!fanzine.isPublic && (
                        <div className="absolute top-4 left-4 bg-[#000000] border border-[#8B0000] px-2 py-1 flex items-center gap-1">
                          <Lock size={12} className="text-[#8B0000]" />
                          <span className="font-mono text-[10px] text-[#F0F0F0] uppercase font-black">
                            Abonnés
                          </span>
                        </div>
                      )}

                      {/* Publication Date */}
                      <div className="absolute bottom-0 left-0 right-0 bg-[#8B0000] py-2 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <Calendar size={12} className="text-[#F0F0F0]" />
                          <span className="font-mono text-xs text-[#F0F0F0] uppercase font-black">
                            {new Date(fanzine.publicationDate).toLocaleDateString('fr-FR', { 
                              month: 'long', 
                              year: 'numeric' 
                            })}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      {/* Title */}
                      <h3 className="font-black text-lg text-[#F0F0F0] uppercase mb-1">
                        {fanzine.title}
                      </h3>

                      {/* Subtitle */}
                      {fanzine.subtitle && (
                        <p className="font-mono text-xs text-[#8B0000] mb-3">
                          {fanzine.subtitle}
                        </p>
                      )}

                      {/* Description */}
                      <p className="font-mono text-xs text-[#F0F0F0]/70 mb-4 line-clamp-2">
                        {fanzine.description}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center justify-between text-xs mb-4 pb-4 border-b border-[#8B0000]/20">
                        <span className="font-mono text-[#F0F0F0]/60">
                          {fanzine.pages} pages
                        </span>
                        {fanzine.price && (
                          <span className="font-mono text-[#8B0000] font-black">
                            {fanzine.price}€
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="space-y-2">
                        {/* View Preview */}
                        <Link
                          to={`/fanzine/${fanzine.id}`}
                          className="block w-full px-4 py-2 border-2 border-[#8B0000] text-[#F0F0F0] font-mono text-xs uppercase text-center hover:bg-[#8B0000] transition-all"
                        >
                          <BookOpen size={12} className="inline mr-2" />
                          Voir le sommaire
                        </Link>

                        {/* Download PDF */}
                        {fanzine.pdfUrl ? (
                          <a
                            href={fanzine.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`block w-full px-4 py-2 font-mono text-xs uppercase text-center transition-all ${
                              fanzine.isPublic
                                ? 'bg-[#8B0000] text-[#F0F0F0] hover:bg-transparent hover:border-2 hover:border-[#8B0000]'
                                : 'bg-[#8B0000]/20 text-[#F0F0F0]/40 border-2 border-[#8B0000]/20 cursor-not-allowed'
                            }`}
                            onClick={(e) => {
                              if (!fanzine.isPublic) {
                                e.preventDefault();
                                alert('Ce numéro est réservé aux abonnés. Abonnez-vous pour y accéder !');
                              }
                            }}
                          >
                            <Download size={12} className="inline mr-2" />
                            {fanzine.isPublic ? 'Télécharger PDF' : 'Abonnés uniquement'}
                          </a>
                        ) : (
                          <div className="w-full px-4 py-2 bg-[#8B0000]/20 text-[#F0F0F0]/40 font-mono text-xs uppercase text-center border-2 border-[#8B0000]/20 cursor-not-allowed">
                            PDF indisponible
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 bg-[#8B0000]/10 border-2 border-[#8B0000] p-8">
            <h3 className="font-black text-xl text-[#8B0000] uppercase mb-4">
              Accès Illimité aux Archives
            </h3>
            <p className="font-mono text-sm text-[#F0F0F0]/70 mb-6 max-w-2xl">
              Avec un abonnement, téléchargez tous les numéros au format PDF et accédez à l'intégralité des archives. Soutenez la communauté et profitez d'un contenu exclusif livré chaque mois.
            </p>
            <Link
              to="/fanzine"
              className="inline-block px-6 py-3 bg-[#8B0000] text-[#F0F0F0] font-black text-sm uppercase hover:bg-transparent hover:border-2 hover:border-[#8B0000] transition-all"
            >
              S'abonner au Fanzine
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
