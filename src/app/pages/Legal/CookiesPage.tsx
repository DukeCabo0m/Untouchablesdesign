import { motion } from 'motion/react';
import { GlitchText } from '@/app/components/GlitchText';
import { PageHeader } from '@/app/components/PageHeader';
import { Cookie, Settings, BarChart3, Shield } from 'lucide-react';

export function CookiesPage() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <PageHeader
        title="POLITIQUE DE COOKIES"
        description="Comment nous utilisons les cookies et autres technologies de suivi pour améliorer votre expérience.<br />Contrôlez vos préférences et gérez vos données de navigation."
        backgroundImage="https://images.unsplash.com/photo-1758518731462-d091b0b4ed0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWdhbCUyMGRvY3VtZW50JTIwcGFwZXIlMjBsYXd8ZW58MXx8fHwxNzY5MTkzMDk2fDA&ixlib=rb-4.1.0&q=80&w=1080"
        breadcrumbs={[
          { label: 'ACCUEIL', path: '/' },
          { label: 'COOKIES' }
        ]}
        glitchIntensity="low"
      />

      <div className="px-4 pb-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-16"
          >
            {/* Qu'est-ce qu'un cookie */}
            <section className="border-l-2 border-[#8B0000] pl-8">
              <div className="flex items-center gap-3 mb-6">
                <Cookie className="text-[#8B0000]" size={24} />
                <h2 className="text-3xl font-black text-[#FFFFFF] uppercase tracking-tight">
                  QU'EST-CE QU'UN COOKIE ?
                </h2>
              </div>
              <div className="space-y-6 text-[#a8a8a8] leading-loose">
                <p>
                  Un cookie est un petit fichier texte déposé sur votre appareil (ordinateur, smartphone, tablette) lors de votre visite 
                  sur un site web. Il permet de stocker des informations relatives à votre navigation.
                </p>
                <p>
                  Les cookies sont essentiels au bon fonctionnement de nombreux sites web. Ils permettent de mémoriser vos préférences, 
                  de sécuriser votre connexion et d'améliorer votre expérience utilisateur.
                </p>
              </div>
            </section>

            {/* Types de cookies */}
            <section className="border-l-2 border-[#8B0000] pl-8">
              <div className="flex items-center gap-3 mb-6">
                <Settings className="text-[#8B0000]" size={24} />
                <h2 className="text-3xl font-black text-[#FFFFFF] uppercase tracking-tight">
                  TYPES DE COOKIES UTILISÉS
                </h2>
              </div>
              <div className="space-y-8 text-[#a8a8a8] leading-loose">
                {/* Cookies essentiels */}
                <div className="bg-[#8B0000]/5 border-l-4 border-[#8B0000] p-6">
                  <h3 className="text-2xl font-bold text-[#8B0000] mb-4 uppercase">1. Cookies Essentiels (Obligatoires)</h3>
                  <p className="mb-4">Ces cookies sont nécessaires au fonctionnement du site et ne peuvent être désactivés.</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><span className="text-[#8B0000] font-bold">Session :</span> Maintien de votre connexion</li>
                    <li><span className="text-[#8B0000] font-bold">Sécurité :</span> Protection contre les attaques CSRF</li>
                    <li><span className="text-[#8B0000] font-bold">Navigation :</span> Mémorisation de vos paramètres de langue</li>
                    <li><span className="text-[#8B0000] font-bold">Consentement :</span> Enregistrement de vos choix en matière de cookies</li>
                  </ul>
                  <p className="mt-4 font-bold text-[#FFFFFF]">Durée : Session ou 12 mois maximum</p>
                </div>

                {/* Cookies fonctionnels */}
                <div className="bg-[#8B0000]/5 border-l-4 border-[#8B0000] p-6">
                  <h3 className="text-2xl font-bold text-[#8B0000] mb-4 uppercase">2. Cookies Fonctionnels (Optionnels)</h3>
                  <p className="mb-4">Ces cookies améliorent votre expérience en mémorisant vos préférences.</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><span className="text-[#8B0000] font-bold">Préférences :</span> Mémorisation de vos réglages d'affichage</li>
                    <li><span className="text-[#8B0000] font-bold">Personnalisation :</span> Adaptation de l'interface selon vos choix</li>
                    <li><span className="text-[#8B0000] font-bold">Lecture :</span> Reprise de lecture de contenu vidéo/audio</li>
                  </ul>
                  <p className="mt-4 font-bold text-[#FFFFFF]">Durée : 12 mois maximum</p>
                  <p className="mt-2 text-sm italic">⚠️ Nécessite votre consentement explicite</p>
                </div>

                {/* Cookies analytiques */}
                <div className="bg-[#8B0000]/5 border-l-4 border-[#8B0000] p-6">
                  <h3 className="text-2xl font-bold text-[#8B0000] mb-4 uppercase">3. Cookies Analytiques (Optionnels)</h3>
                  <p className="mb-4">Ces cookies nous aident à comprendre comment vous utilisez le site (données anonymisées).</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><span className="text-[#8B0000] font-bold">Fréquentation :</span> Nombre de visiteurs et pages consultées</li>
                    <li><span className="text-[#8B0000] font-bold">Performance :</span> Temps de chargement et erreurs techniques</li>
                    <li><span className="text-[#8B0000] font-bold">Parcours :</span> Navigation et comportement anonymisé</li>
                  </ul>
                  <p className="mt-4 font-bold text-[#FFFFFF]">Durée : 13 mois maximum</p>
                  <p className="mt-2 text-sm italic">⚠️ Nécessite votre consentement explicite</p>
                </div>

                {/* Pas de cookies publicitaires */}
                <div className="bg-[#0A0A0A] border-2 border-[#8B0000] p-6">
                  <h3 className="text-2xl font-bold text-[#FFFFFF] mb-4 uppercase">✓ AUCUN COOKIE PUBLICITAIRE</h3>
                  <p className="text-[#a8a8a8]">
                    <span className="text-[#8B0000] font-bold">Important :</span> Untouchables est un site communautaire non-commercial. 
                    Nous n'utilisons AUCUN cookie publicitaire ou de suivi à des fins marketing. Vos données ne sont jamais vendues ou 
                    partagées avec des régies publicitaires.
                  </p>
                </div>
              </div>
            </section>

            {/* Gestion des cookies */}
            <section className="border-l-2 border-[#8B0000] pl-8">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="text-[#8B0000]" size={24} />
                <h2 className="text-3xl font-black text-[#FFFFFF] uppercase tracking-tight">
                  GÉRER VOS PRÉFÉRENCES
                </h2>
              </div>
              <div className="space-y-6 text-[#a8a8a8] leading-loose">
                <div>
                  <h3 className="text-xl font-bold text-[#8B0000] mb-4 uppercase">Via notre interface</h3>
                  <p className="mb-4">Vous pouvez modifier vos préférences de cookies à tout moment :</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Cliquez sur l'icône <span className="text-[#8B0000] font-bold">"Gérer les cookies"</span> en bas de page</li>
                    <li>Activez ou désactivez les catégories de cookies selon vos préférences</li>
                    <li>Validez vos choix</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#8B0000] mb-4 uppercase">Via votre navigateur</h3>
                  <p className="mb-4">Vous pouvez également gérer les cookies directement depuis votre navigateur :</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><span className="text-[#8B0000] font-bold">Chrome :</span> Paramètres {'>'} Confidentialité et sécurité {'>'} Cookies</li>
                    <li><span className="text-[#8B0000] font-bold">Firefox :</span> Options {'>'} Vie privée et sécurité {'>'} Cookies</li>
                    <li><span className="text-[#8B0000] font-bold">Safari :</span> Préférences {'>'} Confidentialité {'>'} Cookies</li>
                    <li><span className="text-[#8B0000] font-bold">Edge :</span> Paramètres {'>'} Cookies et autorisations</li>
                  </ul>
                </div>

                <div className="bg-[#8B0000]/10 border-l-4 border-[#8B0000] p-6">
                  <p className="font-bold text-[#FFFFFF] mb-2">⚠️ Attention :</p>
                  <p>
                    Le blocage de certains cookies peut affecter le bon fonctionnement du site et limiter votre expérience utilisateur. 
                    Les cookies essentiels restent nécessaires pour les fonctionnalités de base.
                  </p>
                </div>
              </div>
            </section>

            {/* Durée de conservation */}
            <section className="border-l-2 border-[#8B0000] pl-8">
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 className="text-[#8B0000]" size={24} />
                <h2 className="text-3xl font-black text-[#FFFFFF] uppercase tracking-tight">
                  DURÉE DE CONSERVATION
                </h2>
              </div>
              <div className="space-y-4 text-[#a8a8a8] leading-loose">
                <p>Les cookies sont conservés pour des durées variables selon leur type :</p>
                <div className="bg-[#0A0A0A] border border-[#8B0000]/30 p-6 space-y-3">
                  <p><span className="text-[#8B0000] font-bold">Cookies de session :</span> Supprimés à la fermeture du navigateur</p>
                  <p><span className="text-[#8B0000] font-bold">Cookies essentiels :</span> Maximum 12 mois</p>
                  <p><span className="text-[#8B0000] font-bold">Cookies fonctionnels :</span> Maximum 12 mois</p>
                  <p><span className="text-[#8B0000] font-bold">Cookies analytiques :</span> Maximum 13 mois</p>
                </div>
                <p className="text-sm italic">
                  Conformément aux recommandations de la CNIL (Commission Nationale de l'Informatique et des Libertés).
                </p>
              </div>
            </section>

            {/* Contact */}
            <section className="border-l-2 border-[#8B0000] pl-8">
              <h2 className="text-3xl font-black text-[#FFFFFF] uppercase tracking-tight mb-8">
                QUESTIONS SUR LES COOKIES ?
              </h2>
              <div className="space-y-4 text-[#a8a8a8] leading-loose">
                <p>Pour toute question concernant notre politique de cookies :</p>
                <p><span className="text-[#8B0000] font-bold">Email :</span> privacy@untouchables.fr</p>
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