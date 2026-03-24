import { motion } from 'motion/react';
import { GlitchText } from '@/app/components/GlitchText';
import { PageHeader } from '@/app/components/PageHeader';
import { SectionSeparator } from '@/app/components/SectionSeparator';
import { FileText, Calendar, Users, Scale, Shield } from 'lucide-react';

export function Statuts() {
  const articles = [
    {
      number: "ARTICLE 1",
      title: "Constitution et dénomination",
      content: "Il est fondé entre les adhérents aux présents statuts une association régie par la loi du 1er juillet 1901 et le décret du 16 août 1901, ayant pour dénomination : UNTOUCHABLES - Communauté francophone de fans de Korn."
    },
    {
      number: "ARTICLE 2",
      title: "Objet",
      content: "Cette association a pour objet de réunir les fans francophones du groupe Korn, de promouvoir leur musique et leur héritage culturel, d'organiser des événements, de produire du contenu éditorial (notamment le fanzine trimestriel), et de créer une communauté active et engagée autour de l'univers du groupe."
    },
    {
      number: "ARTICLE 3",
      title: "Siège social",
      content: "Le siège social est fixé à Paris, France. Il pourra être transféré par simple décision du conseil d'administration, après ratification par l'assemblée générale."
    },
    {
      number: "ARTICLE 4",
      title: "Durée",
      content: "La durée de l'association est illimitée."
    },
    {
      number: "ARTICLE 5",
      title: "Composition",
      content: "L'association se compose de membres actifs et de membres d'honneur. Sont membres actifs les personnes ayant adhéré aux présents statuts et étant à jour de leur cotisation. Sont membres d'honneur ceux qui ont rendu des services signalés à l'association."
    },
    {
      number: "ARTICLE 6",
      title: "Admission",
      content: "Pour faire partie de l'association, il faut être agréé par le conseil d'administration qui statue, lors de chacune de ses réunions, sur les demandes d'admission présentées."
    },
    {
      number: "ARTICLE 7",
      title: "Cotisations",
      content: "Le montant de la cotisation annuelle est fixé par l'assemblée générale. Les membres d'honneur sont dispensés de cotisation."
    },
    {
      number: "ARTICLE 8",
      title: "Radiations",
      content: "La qualité de membre se perd par : démission, décès, radiation prononcée par le conseil d'administration pour non-paiement de la cotisation ou pour motif grave."
    },
    {
      number: "ARTICLE 9",
      title: "Ressources",
      content: "Les ressources de l'association comprennent : les cotisations, les ventes du fanzine et produits dérivés, les subventions, les dons, et toute autre ressource autorisée par la loi."
    },
    {
      number: "ARTICLE 10",
      title: "Assemblée générale ordinaire",
      content: "L'assemblée générale ordinaire comprend tous les membres de l'association à jour de leur cotisation. Elle se réunit une fois par an. Elle entend les rapports sur la gestion du conseil d'administration, sur la situation financière et morale de l'association."
    },
    {
      number: "ARTICLE 11",
      title: "Conseil d'administration",
      content: "L'association est dirigée par un conseil d'administration composé de 3 à 9 membres élus pour 2 ans par l'assemblée générale. Le conseil d'administration choisit parmi ses membres, au scrutin secret, un bureau composé de : un(e) président(e), un(e) secrétaire, un(e) trésorier(e)."
    },
    {
      number: "ARTICLE 12",
      title: "Modification des statuts",
      content: "Les statuts ne peuvent être modifiés que sur proposition du conseil d'administration ou d'au moins un quart des membres de l'association, à condition que les modifications proposées aient été communiquées à tous les membres au moins 15 jours avant l'assemblée générale extraordinaire."
    },
    {
      number: "ARTICLE 13",
      title: "Dissolution",
      content: "La dissolution de l'association ne peut être prononcée que par l'assemblée générale extraordinaire, convoquée spécialement à cet effet. L'assemblée désigne un ou plusieurs commissaires chargés de la liquidation des biens de l'association."
    },
    {
      number: "ARTICLE 14",
      title: "Règlement intérieur",
      content: "Un règlement intérieur peut être établi par le conseil d'administration, qui le fait alors approuver par l'assemblée générale. Ce règlement est destiné à fixer les divers points non prévus par les présents statuts."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <PageHeader
        title="STATUTS DE L'ASSOCIATION"
        description="UNTOUCHABLES est une association de fans à but non lucratif, constituée selon la loi de 1901.<br />Rassembler les passionnés francophones du groupe Korn autour d'une communauté active et créative."
        backgroundImage="https://images.unsplash.com/photo-1696041757950-62e2c030283b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc3NvY2lhdGlvbiUyMGNvbW11bml0eSUyMG1lZXRpbmclMjBkb2N1bWVudHxlbnwxfHx8fDE3NjkxOTMyODB8MA&ixlib=rb-4.1.0&q=80&w=1080"
        breadcrumbs={[
          { label: 'ACCUEIL', path: '/' },
          { label: 'STATUTS' }
        ]}
        glitchIntensity="low"
      />

      <div className="bg-[#0A0A0A] relative overflow-hidden">
        {/* Background Effects */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,0,0,0.03)_0%,transparent_65%)]" />
          <div 
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                rgba(0, 0, 0, 0.15),
                rgba(0, 0, 0, 0.15) 1px,
                transparent 1px,
                transparent 2px
              )`
            }}
          />
        </div>

        <div className="relative z-10 px-4 pb-24">
          <div className="max-w-[1920px] mx-auto">
            {/* Introduction badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="border-l-4 border-[#8B0000] pl-8 py-6 bg-[#8B0000]/5 mb-16"
            >
              <p className="font-mono text-sm text-[#E0E0E0]/80 leading-relaxed">
                <span className="text-[#8B0000] font-black">// PRÉAMBULE :</span> UNTOUCHABLES est une association de fans à but non lucratif, 
                constituée selon la loi du 1er juillet 1901 et le décret du 16 août 1901. Elle rassemble les passionnés francophones 
                du groupe Korn autour d'une communauté active, créative et respectueuse de l'héritage artistique du groupe.
              </p>
            </motion.div>

            {/* Articles Section */}
            <section className="py-12 px-4">
              <div className="space-y-8">
                {articles.map((article, index) => (
                  <motion.div
                    key={article.number}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    className="group"
                  >
                    <div className="border-2 border-[#E0E0E0]/10 hover:border-[#8B0000]/30 transition-all duration-300 bg-[#000000]/50 backdrop-blur-sm">
                      <div className="border-b-2 border-[#8B0000] bg-[#8B0000]/10 px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 flex items-center justify-center bg-[#8B0000] text-[#E0E0E0] font-black text-sm">
                            {String(index + 1).padStart(2, '0')}
                          </div>
                          <div>
                            <div className="font-mono text-[10px] text-[#8B0000] uppercase tracking-widest mb-1">
                              {article.number}
                            </div>
                            <h3 className="font-black text-lg text-[#E0E0E0] uppercase tracking-tight">
                              {article.title}
                            </h3>
                          </div>
                        </div>
                      </div>
                      <div className="px-6 py-6">
                        <p className="font-mono text-sm text-[#E0E0E0]/80 leading-relaxed">
                          {article.content}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Footer Note */}
            <section className="py-12 px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="border-2 border-[#8B0000] bg-[#8B0000]/5 p-8"
              >
                <div className="flex items-start gap-4 mb-6">
                  <FileText className="text-[#8B0000] mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-black text-lg text-[#8B0000] uppercase tracking-tight mb-3">
                      Certification et validité
                    </h3>
                    <p className="font-mono text-sm text-[#E0E0E0]/80 leading-relaxed mb-4">
                      Les présents statuts ont été adoptés par l'assemblée générale constitutive du 15 janvier 2026. 
                      Ils peuvent être modifiés par l'assemblée générale extraordinaire dans les conditions prévues à l'article 12.
                    </p>
                    <div className="flex flex-wrap gap-6 font-mono text-xs text-[#E0E0E0]/60 uppercase">
                      <div>
                        <span className="text-[#8B0000]">Fait à :</span> Paris, France
                      </div>
                      <div>
                        <span className="text-[#8B0000]">Le :</span> 15 janvier 2026
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t-2 border-[#8B0000]/30 pt-6">
                  <p className="font-mono text-[10px] text-[#E0E0E0]/60 leading-relaxed">
                    Pour toute question concernant ces statuts, veuillez contacter le conseil d'administration via notre 
                    <a href="/contact" className="text-[#8B0000] hover:underline ml-1">page de contact</a>.
                  </p>
                </div>
              </motion.div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}