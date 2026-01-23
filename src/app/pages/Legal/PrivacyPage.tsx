import { motion } from 'motion/react';
import { GlitchText } from '@/app/components/GlitchText';
import { Shield, Database, Eye, Lock, AlertTriangle } from 'lucide-react';

export function PrivacyPage() {
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
              PROTECTION DES DONNÉES
            </span>
          </div>

          <h1
            className="text-5xl lg:text-7xl font-black text-[#FFFFFF] tracking-tighter uppercase mb-8 leading-tight"
            style={{ fontFamily: 'Arial Black, sans-serif', letterSpacing: '-0.05em' }}
          >
            <GlitchText glitchIntensity="high">POLITIQUE DE CONFIDENTIALITÉ</GlitchText>
          </h1>

          <p className="text-xl text-[#a8a8a8] leading-loose border-l-4 border-[#8B0000] pl-6">
            Votre vie privée est importante. Cette politique explique comment nous collectons, utilisons et protégeons vos données personnelles.
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-16"
        >
          {/* Collecte de données */}
          <section className="border-l-2 border-[#8B0000] pl-8">
            <div className="flex items-center gap-3 mb-6">
              <Database className="text-[#8B0000]" size={24} />
              <h2 className="text-3xl font-black text-[#FFFFFF] uppercase tracking-tight">
                DONNÉES COLLECTÉES
              </h2>
            </div>
            <div className="space-y-6 text-[#a8a8a8] leading-loose">
              <div>
                <h3 className="text-xl font-bold text-[#8B0000] mb-4 uppercase">Données d'inscription</h3>
                <p className="mb-4">Lorsque vous créez un compte sur Untouchables, nous collectons :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Nom d'utilisateur (pseudonyme)</li>
                  <li>Adresse email</li>
                  <li>Mot de passe (crypté)</li>
                  <li>Date d'inscription</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#8B0000] mb-4 uppercase">Données de navigation</h3>
                <p className="mb-4">Lors de votre visite, nous collectons automatiquement :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Adresse IP</li>
                  <li>Type de navigateur et système d'exploitation</li>
                  <li>Pages visitées et durée de visite</li>
                  <li>Données de cookies (voir section dédiée)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#8B0000] mb-4 uppercase">Données de contenu</h3>
                <p className="mb-4">Si vous participez à la communauté :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Commentaires et contributions</li>
                  <li>Photos de profil (si ajoutées)</li>
                  <li>Interactions avec d'autres membres</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Utilisation des données */}
          <section className="border-l-2 border-[#8B0000] pl-8">
            <div className="flex items-center gap-3 mb-6">
              <Eye className="text-[#8B0000]" size={24} />
              <h2 className="text-3xl font-black text-[#FFFFFF] uppercase tracking-tight">
                UTILISATION DES DONNÉES
              </h2>
            </div>
            <div className="space-y-6 text-[#a8a8a8] leading-loose">
              <p>Vos données personnelles sont utilisées pour :</p>
              <ul className="list-disc pl-6 space-y-3">
                <li><span className="text-[#8B0000] font-bold">Gestion de compte :</span> Création et gestion de votre compte membre</li>
                <li><span className="text-[#8B0000] font-bold">Communication :</span> Envoi de newsletters et notifications (avec votre consentement)</li>
                <li><span className="text-[#8B0000] font-bold">Amélioration du service :</span> Analyse statistique pour optimiser l'expérience utilisateur</li>
                <li><span className="text-[#8B0000] font-bold">Sécurité :</span> Prévention de la fraude et protection contre les abus</li>
                <li><span className="text-[#8B0000] font-bold">Support :</span> Réponse à vos demandes d'assistance</li>
              </ul>
              <p className="border-l-4 border-[#8B0000] pl-6 italic">
                <span className="text-[#8B0000] font-bold">Important :</span> Nous ne vendons jamais vos données personnelles à des tiers. 
                Vos informations ne sont pas utilisées à des fins commerciales.
              </p>
            </div>
          </section>

          {/* Protection des données */}
          <section className="border-l-2 border-[#8B0000] pl-8">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="text-[#8B0000]" size={24} />
              <h2 className="text-3xl font-black text-[#FFFFFF] uppercase tracking-tight">
                PROTECTION ET SÉCURITÉ
              </h2>
            </div>
            <div className="space-y-6 text-[#a8a8a8] leading-loose">
              <p>Nous mettons en œuvre des mesures de sécurité pour protéger vos données :</p>
              <ul className="list-disc pl-6 space-y-3">
                <li><span className="text-[#8B0000] font-bold">Cryptage :</span> Connexion HTTPS sécurisée (SSL/TLS)</li>
                <li><span className="text-[#8B0000] font-bold">Mots de passe :</span> Hashage sécurisé des mots de passe</li>
                <li><span className="text-[#8B0000] font-bold">Accès restreint :</span> Limitation d'accès aux données personnelles</li>
                <li><span className="text-[#8B0000] font-bold">Surveillance :</span> Monitoring des activités suspectes</li>
                <li><span className="text-[#8B0000] font-bold">Sauvegardes :</span> Backups réguliers et sécurisés</li>
              </ul>
            </div>
          </section>

          {/* Droits des utilisateurs */}
          <section className="border-l-2 border-[#8B0000] pl-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="text-[#8B0000]" size={24} />
              <h2 className="text-3xl font-black text-[#FFFFFF] uppercase tracking-tight">
                VOS DROITS (RGPD)
              </h2>
            </div>
            <div className="space-y-6 text-[#a8a8a8] leading-loose">
              <p>Conformément au RGPD, vous disposez des droits suivants :</p>
              <ul className="list-disc pl-6 space-y-3">
                <li><span className="text-[#8B0000] font-bold">Droit d'accès :</span> Consulter les données que nous détenons sur vous</li>
                <li><span className="text-[#8B0000] font-bold">Droit de rectification :</span> Corriger vos informations inexactes</li>
                <li><span className="text-[#8B0000] font-bold">Droit à l'effacement :</span> Supprimer votre compte et vos données</li>
                <li><span className="text-[#8B0000] font-bold">Droit à la portabilité :</span> Récupérer vos données dans un format structuré</li>
                <li><span className="text-[#8B0000] font-bold">Droit d'opposition :</span> Refuser le traitement de vos données</li>
                <li><span className="text-[#8B0000] font-bold">Droit de limitation :</span> Restreindre le traitement de vos données</li>
              </ul>
              <p className="bg-[#8B0000]/10 border-l-4 border-[#8B0000] p-6">
                <span className="text-[#8B0000] font-bold">Pour exercer vos droits :</span><br />
                Contactez-nous à l'adresse : privacy@untouchables.fr<br />
                Réponse sous 30 jours maximum
              </p>
            </div>
          </section>

          {/* Partage des données */}
          <section className="border-l-2 border-[#8B0000] pl-8">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="text-[#8B0000]" size={24} />
              <h2 className="text-3xl font-black text-[#FFFFFF] uppercase tracking-tight">
                PARTAGE DES DONNÉES
              </h2>
            </div>
            <div className="space-y-6 text-[#a8a8a8] leading-loose">
              <p>Vos données personnelles ne sont partagées qu'avec :</p>
              <ul className="list-disc pl-6 space-y-3">
                <li><span className="text-[#8B0000] font-bold">Hébergeur technique :</span> Pour le stockage et l'infrastructure du site</li>
                <li><span className="text-[#8B0000] font-bold">Services de sécurité :</span> Pour la protection contre les menaces</li>
                <li><span className="text-[#8B0000] font-bold">Outils d'analyse :</span> Pour les statistiques anonymisées (si consentement)</li>
              </ul>
              <p>
                Ces partenaires sont contractuellement tenus de respecter la confidentialité et la sécurité de vos données. 
                Aucun partenaire ne peut utiliser vos données à d'autres fins que celles spécifiées.
              </p>
            </div>
          </section>

          {/* Conservation */}
          <section className="border-l-2 border-[#8B0000] pl-8">
            <h2 className="text-3xl font-black text-[#FFFFFF] uppercase tracking-tight mb-8">
              DURÉE DE CONSERVATION
            </h2>
            <div className="space-y-6 text-[#a8a8a8] leading-loose">
              <p>Nous conservons vos données personnelles :</p>
              <ul className="list-disc pl-6 space-y-3">
                <li><span className="text-[#8B0000] font-bold">Compte actif :</span> Tant que votre compte existe</li>
                <li><span className="text-[#8B0000] font-bold">Après suppression :</span> 30 jours maximum (délai de sécurité)</li>
                <li><span className="text-[#8B0000] font-bold">Données légales :</span> Conformément aux obligations légales (3 ans max)</li>
              </ul>
            </div>
          </section>

          {/* Contact */}
          <section className="border-l-2 border-[#8B0000] pl-8">
            <h2 className="text-3xl font-black text-[#FFFFFF] uppercase tracking-tight mb-8">
              CONTACT DPO
            </h2>
            <div className="space-y-4 text-[#a8a8a8] leading-loose">
              <p>Pour toute question concernant vos données personnelles :</p>
              <p><span className="text-[#8B0000] font-bold">Email DPO :</span> privacy@untouchables.fr</p>
              <p><span className="text-[#8B0000] font-bold">Email général :</span> contact@untouchables.fr</p>
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
