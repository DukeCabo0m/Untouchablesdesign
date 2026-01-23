import { motion } from 'motion/react';
import { GlitchText } from '@/app/components/GlitchText';
import { FileText, Users, MessageSquare, AlertCircle, Ban, Scale } from 'lucide-react';

export function TermsPage() {
  return (
    <div className="min-h-screen py-32 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="inline-block bg-[#8B0000] px-4 py-2 mb-6">
            <span className="font-black text-sm text-[#E0E0E0] uppercase tracking-wider">
              CONDITIONS LÉGALES
            </span>
          </div>

          <h1
            className="text-5xl lg:text-7xl font-black text-[#FFFFFF] tracking-tighter uppercase mb-8 leading-tight"
            style={{ fontFamily: 'Arial Black, sans-serif', letterSpacing: '-0.05em' }}
          >
            <GlitchText glitchIntensity="high">CONDITIONS D'UTILISATION</GlitchText>
          </h1>

          <p className="text-xl text-[#a8a8a8] leading-loose border-l-4 border-[#8B0000] pl-6">
            En utilisant le site Untouchables, vous acceptez les présentes conditions d'utilisation. 
            Veuillez les lire attentivement avant de créer un compte.
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-16"
        >
          {/* Acceptation des conditions */}
          <section className="border-l-2 border-[#8B0000] pl-8">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="text-[#8B0000]" size={24} />
              <h2 className="text-3xl font-black text-[#FFFFFF] uppercase tracking-tight">
                ACCEPTATION DES CONDITIONS
              </h2>
            </div>
            <div className="space-y-6 text-[#a8a8a8] leading-loose">
              <p>
                En accédant et en utilisant le site Untouchables (ci-après "le Site"), vous reconnaissez avoir lu, 
                compris et accepté d'être lié par les présentes Conditions d'Utilisation.
              </p>
              <p>
                Si vous n'acceptez pas ces conditions, vous devez cesser immédiatement d'utiliser le Site.
              </p>
              <p className="border-l-4 border-[#8B0000] pl-6 italic">
                <span className="text-[#8B0000] font-bold">Important :</span> Nous nous réservons le droit de modifier 
                ces conditions à tout moment. Les modifications entreront en vigueur dès leur publication sur le Site.
              </p>
            </div>
          </section>

          {/* Objet du site */}
          <section className="border-l-2 border-[#8B0000] pl-8">
            <div className="flex items-center gap-3 mb-6">
              <Users className="text-[#8B0000]" size={24} />
              <h2 className="text-3xl font-black text-[#FFFFFF] uppercase tracking-tight">
                OBJET DU SITE
              </h2>
            </div>
            <div className="space-y-6 text-[#a8a8a8] leading-loose">
              <p>
                Untouchables est une communauté francophone dédiée aux fans du groupe Korn. Le Site permet aux utilisateurs de :
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li><span className="text-[#8B0000] font-bold">Accéder à l'actualité :</span> Suivre les dernières news, sorties et événements du groupe</li>
                <li><span className="text-[#8B0000] font-bold">Consulter la discographie :</span> Explorer la collection complète des albums, singles et EP</li>
                <li><span className="text-[#8B0000] font-bold">Participer à la communauté :</span> Échanger avec d'autres fans passionnés</li>
                <li><span className="text-[#8B0000] font-bold">Découvrir l'histoire du groupe :</span> Accéder à des informations détaillées sur les membres et l'évolution du groupe</li>
              </ul>
              <p className="bg-[#8B0000]/10 border-l-4 border-[#8B0000] p-6">
                <span className="text-[#8B0000] font-bold">Note :</span> Untouchables est un site de fans indépendant. 
                Nous ne sommes pas affiliés officiellement au groupe Korn ou à leur label.
              </p>
            </div>
          </section>

          {/* Création de compte */}
          <section className="border-l-2 border-[#8B0000] pl-8">
            <div className="flex items-center gap-3 mb-6">
              <Users className="text-[#8B0000]" size={24} />
              <h2 className="text-3xl font-black text-[#FFFFFF] uppercase tracking-tight">
                CRÉATION ET GESTION DE COMPTE
              </h2>
            </div>
            <div className="space-y-6 text-[#a8a8a8] leading-loose">
              <div>
                <h3 className="text-xl font-bold text-[#8B0000] mb-4 uppercase">Inscription</h3>
                <p className="mb-4">Pour créer un compte, vous devez :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Avoir au moins 13 ans (conformité COPPA)</li>
                  <li>Fournir des informations exactes et à jour</li>
                  <li>Choisir un pseudonyme respectueux</li>
                  <li>Créer un mot de passe sécurisé (minimum 8 caractères)</li>
                  <li>Accepter la Politique de Confidentialité</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#8B0000] mb-4 uppercase">Responsabilité du compte</h3>
                <p className="mb-4">Vous êtes responsable de :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>La confidentialité de vos identifiants de connexion</li>
                  <li>Toutes les activités effectuées sous votre compte</li>
                  <li>Informer immédiatement l'administrateur en cas d'utilisation non autorisée</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#8B0000] mb-4 uppercase">Suspension ou suppression</h3>
                <p>
                  Nous nous réservons le droit de suspendre ou supprimer votre compte en cas de violation des présentes conditions, 
                  notamment en cas de comportement inapproprié, harcèlement, spam ou toute activité illégale.
                </p>
              </div>
            </div>
          </section>

          {/* Règles de conduite */}
          <section className="border-l-2 border-[#8B0000] pl-8">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="text-[#8B0000]" size={24} />
              <h2 className="text-3xl font-black text-[#FFFFFF] uppercase tracking-tight">
                RÈGLES DE CONDUITE
              </h2>
            </div>
            <div className="space-y-6 text-[#a8a8a8] leading-loose">
              <p>En utilisant le Site, vous vous engagez à :</p>
              <ul className="list-disc pl-6 space-y-3">
                <li><span className="text-[#8B0000] font-bold">Respecter les autres membres :</span> Pas de harcèlement, insultes ou propos discriminatoires</li>
                <li><span className="text-[#8B0000] font-bold">Publier du contenu approprié :</span> Pas de contenu pornographique, violent ou illégal</li>
                <li><span className="text-[#8B0000] font-bold">Respecter la propriété intellectuelle :</span> Ne pas partager de contenu protégé sans autorisation</li>
                <li><span className="text-[#8B0000] font-bold">Ne pas spammer :</span> Pas de publicité, liens commerciaux ou messages répétitifs</li>
                <li><span className="text-[#8B0000] font-bold">Rester dans le thème :</span> Les discussions doivent être en lien avec Korn et le metal</li>
              </ul>
              <p className="bg-[#8B0000]/10 border-l-4 border-[#8B0000] p-6">
                <span className="text-[#8B0000] font-bold">Modération :</span> Tout contenu jugé inapproprié sera supprimé. 
                Les violations répétées peuvent entraîner un bannissement permanent.
              </p>
            </div>
          </section>

          {/* Contenu utilisateur */}
          <section className="border-l-2 border-[#8B0000] pl-8">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="text-[#8B0000]" size={24} />
              <h2 className="text-3xl font-black text-[#FFFFFF] uppercase tracking-tight">
                CONTENU UTILISATEUR
              </h2>
            </div>
            <div className="space-y-6 text-[#a8a8a8] leading-loose">
              <p>
                En publiant du contenu sur le Site (commentaires, photos, etc.), vous :
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>Conservez la propriété de votre contenu</li>
                <li>Accordez à Untouchables une licence non exclusive pour afficher ce contenu sur le Site</li>
                <li>Garantissez que vous avez le droit de publier ce contenu</li>
                <li>Acceptez que ce contenu soit visible par les autres membres</li>
              </ul>
              <p>
                Nous ne revendiquons aucune propriété sur votre contenu, mais nous nous réservons le droit de le modérer 
                ou de le supprimer s'il viole nos règles.
              </p>
            </div>
          </section>

          {/* Propriété intellectuelle */}
          <section className="border-l-2 border-[#8B0000] pl-8">
            <div className="flex items-center gap-3 mb-6">
              <Scale className="text-[#8B0000]" size={24} />
              <h2 className="text-3xl font-black text-[#FFFFFF] uppercase tracking-tight">
                PROPRIÉTÉ INTELLECTUELLE
              </h2>
            </div>
            <div className="space-y-6 text-[#a8a8a8] leading-loose">
              <p>
                Le contenu du Site (design, textes, graphiques, logos) est protégé par les lois sur la propriété intellectuelle.
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li><span className="text-[#8B0000] font-bold">Images et médias Korn :</span> Propriété du groupe Korn, de leur label et photographes respectifs</li>
                <li><span className="text-[#8B0000] font-bold">Design du site :</span> Propriété de Untouchables</li>
                <li><span className="text-[#8B0000] font-bold">Contenus rédactionnels :</span> Propriété de leurs auteurs respectifs</li>
              </ul>
              <p className="border-l-4 border-[#8B0000] pl-6 italic">
                <span className="text-[#8B0000] font-bold">Fair Use :</span> Les images et vidéos du groupe sont utilisées dans un cadre de promotion 
                et d'information à but non lucratif (fair use / usage équitable).
              </p>
            </div>
          </section>

          {/* Limitation de responsabilité */}
          <section className="border-l-2 border-[#8B0000] pl-8">
            <div className="flex items-center gap-3 mb-6">
              <Ban className="text-[#8B0000]" size={24} />
              <h2 className="text-3xl font-black text-[#FFFFFF] uppercase tracking-tight">
                LIMITATION DE RESPONSABILITÉ
              </h2>
            </div>
            <div className="space-y-6 text-[#a8a8a8] leading-loose">
              <p>Le Site est fourni "tel quel", sans garantie d'aucune sorte. Nous ne garantissons pas :</p>
              <ul className="list-disc pl-6 space-y-3">
                <li>La disponibilité continue du Site (maintenance, pannes techniques)</li>
                <li>L'exactitude de toutes les informations publiées</li>
                <li>L'absence d'erreurs ou de bugs</li>
              </ul>
              <p>
                Untouchables ne peut être tenu responsable des dommages directs ou indirects résultant de l'utilisation du Site, 
                y compris la perte de données ou l'interruption de service.
              </p>
            </div>
          </section>

          {/* Droit applicable */}
          <section className="border-l-2 border-[#8B0000] pl-8">
            <h2 className="text-3xl font-black text-[#FFFFFF] uppercase tracking-tight mb-8">
              DROIT APPLICABLE
            </h2>
            <div className="space-y-6 text-[#a8a8a8] leading-loose">
              <p>
                Les présentes Conditions d'Utilisation sont régies par le droit français. 
                Tout litige relatif à leur interprétation ou exécution relève de la compétence exclusive des tribunaux français.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="border-l-2 border-[#8B0000] pl-8">
            <h2 className="text-3xl font-black text-[#FFFFFF] uppercase tracking-tight mb-8">
              CONTACT
            </h2>
            <div className="space-y-4 text-[#a8a8a8] leading-loose">
              <p>Pour toute question concernant ces conditions d'utilisation :</p>
              <p><span className="text-[#8B0000] font-bold">Email :</span> contact@untouchables.fr</p>
              <p><span className="text-[#8B0000] font-bold">Formulaire :</span> Page de contact du Site</p>
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
  );
}
