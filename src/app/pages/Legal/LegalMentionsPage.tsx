import { motion } from 'motion/react';
import { GlitchText } from '@/app/components/GlitchText';
import { PageHeader } from '@/app/components/PageHeader';
import { FileText, Building2, User, Mail } from 'lucide-react';

export function LegalMentionsPage() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <PageHeader
        title="MENTIONS LÉGALES"
        description="Conformité juridique et informations relatives au site Untouchables.fr.<br />Communauté francophone dédiée au groupe Korn."
        backgroundImage="https://images.unsplash.com/photo-1758518731462-d091b0b4ed0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWdhbCUyMGRvY3VtZW50JTIwcGFwZXIlMjBsYXd8ZW58MXx8fHwxNzY5MTkzMDk2fDA&ixlib=rb-4.1.0&q=80&w=1080"
        breadcrumbs={[
          { label: 'ACCUEIL', path: '/' },
          { label: 'MENTIONS LÉGALES' }
        ]}
        glitchIntensity="low"
      />

      <div className="px-4 pb-24 bg-[#0A0A0A]">
        <div className="max-w-[1920px] mx-auto">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-16"
          >
            {/* Éditeur du site */}
            <section className="border-l-2 border-[#8B0000] pl-8">
              <div className="flex items-center gap-3 mb-6">
                <Building2 className="text-[#8B0000]" size={24} />
                <h2 className="text-3xl font-black text-[#FFFFFF] uppercase tracking-tight">
                  ÉDITEUR DU SITE
                </h2>
              </div>
              <div className="space-y-4 text-[#a8a8a8] leading-loose">
                <p><span className="text-[#8B0000] font-bold">Nom du site :</span> Untouchables</p>
                <p><span className="text-[#8B0000] font-bold">Type :</span> Site communautaire non-commercial</p>
                <p><span className="text-[#8B0000] font-bold">Responsable de publication :</span> [NOM DU RESPONSABLE]</p>
                <p><span className="text-[#8B0000] font-bold">Adresse :</span> [ADRESSE POSTALE]</p>
                <p><span className="text-[#8B0000] font-bold">Email :</span> admin@untouchables.fr</p>
              </div>
            </section>

            {/* Hébergement */}
            <section className="border-l-2 border-[#8B0000] pl-8">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="text-[#8B0000]" size={24} />
                <h2 className="text-3xl font-black text-[#FFFFFF] uppercase tracking-tight">
                  HÉBERGEMENT
                </h2>
              </div>
              <div className="space-y-4 text-[#a8a8a8] leading-loose">
                <p><span className="text-[#8B0000] font-bold">Hébergeur :</span> [NOM HÉBERGEUR]</p>
                <p><span className="text-[#8B0000] font-bold">Adresse :</span> [ADRESSE HÉBERGEUR]</p>
                <p><span className="text-[#8B0000] font-bold">Téléphone :</span> [TÉLÉPHONE HÉBERGEUR]</p>
              </div>
            </section>

            {/* Propriété intellectuelle */}
            <section className="border-l-2 border-[#8B0000] pl-8">
              <h2 className="text-3xl font-black text-[#FFFFFF] uppercase tracking-tight mb-8">
                PROPRIÉTÉ INTELLECTUELLE
              </h2>
              <div className="space-y-6 text-[#a8a8a8] leading-loose">
                <p>
                  L'ensemble du contenu de ce site (textes, images, vidéos, design, structure) est protégé par le droit d'auteur. 
                  Toute reproduction, distribution ou utilisation sans autorisation préalable est strictement interdite.
                </p>
                <p>
                  <span className="text-[#8B0000] font-bold">Marques et logos :</span> Les marques, logos et noms commerciaux mentionnés sur ce site 
                  (notamment "Korn" et éléments associés) appartiennent à leurs propriétaires respectifs. Ce site est une initiative communautaire 
                  non-officielle et non-commerciale de fans.
                </p>
                <p>
                  <span className="text-[#8B0000] font-bold">Images et contenus multimédias :</span> Les images et contenus multimédias présents 
                  sur le site sont utilisés à des fins informatives et promotionnelles dans le cadre du droit de citation. Tous les droits appartiennent 
                  à leurs auteurs respectifs.
                </p>
              </div>
            </section>

            {/* Responsabilité */}
            <section className="border-l-2 border-[#8B0000] pl-8">
              <h2 className="text-3xl font-black text-[#FFFFFF] uppercase tracking-tight mb-8">
                LIMITATION DE RESPONSABILITÉ
              </h2>
              <div className="space-y-6 text-[#a8a8a8] leading-loose">
                <p>
                  Les informations publiées sur ce site sont fournies à titre informatif. Untouchables s'efforce de maintenir 
                  des informations exactes et à jour, mais ne peut garantir l'exactitude, la complétude ou la pertinence des contenus.
                </p>
                <p>
                  Untouchables ne saurait être tenu responsable des dommages directs ou indirects résultant de l'utilisation du site 
                  ou de l'impossibilité d'y accéder.
                </p>
                <p>
                  Les liens externes présents sur le site renvoient vers des sites tiers. Untouchables n'exerce aucun contrôle 
                  sur ces sites et décline toute responsabilité quant à leur contenu.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section className="border-l-2 border-[#8B0000] pl-8">
              <div className="flex items-center gap-3 mb-6">
                <Mail className="text-[#8B0000]" size={24} />
                <h2 className="text-3xl font-black text-[#FFFFFF] uppercase tracking-tight">
                  CONTACT
                </h2>
              </div>
              <div className="space-y-4 text-[#a8a8a8] leading-loose">
                <p>Pour toute question relative aux mentions légales ou au site :</p>
                <p><span className="text-[#8B0000] font-bold">Email :</span> admin@untouchables.fr</p>
                <p><span className="text-[#8B0000] font-bold">Support :</span> support@untouchables.fr</p>
              </div>
            </section>

            {/* Footer note */}
            <div className="border-t-2 border-[#8B0000] pt-8">
              <p className="font-mono text-xs text-[#8B0000] uppercase text-center">
                DERNIÈRE MISE À JOUR : JANVIER 2026 // VERSION 1.0
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}