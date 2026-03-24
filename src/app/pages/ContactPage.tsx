import { motion } from 'motion/react';
import { GlitchText } from '@/app/components/GlitchText';
import { PageHeader } from '@/app/components/PageHeader';
import { Mail, MessageSquare, AlertCircle, Send, User, FileText, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { contactApi } from '@/app/utils/api';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      console.log('[ContactPage] Sending message:', formData);
      await contactApi.send(formData);
      
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 5000);
    } catch (err) {
      console.error('[ContactPage] Failed to send message:', err);
      setError('Erreur lors de l\'envoi du message. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <PageHeader
        title="CONTACT"
        description="Une question ? Une suggestion ? Une contribution à partager ?<br />L'équipe Untouchables est à votre écoute."
        backgroundImage="https://images.unsplash.com/photo-1768839720467-90cc32edeb26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250YWN0JTIwcGhvbmUlMjBlbWFpbHxlbnwxfHx8fDE3NjkwNzM5MzV8MA&ixlib=rb-4.1.0&q=80&w=1080"
        breadcrumbs={[
          { label: 'ACCUEIL', path: '/' },
          { label: 'CONTACT' }
        ]}
        glitchIntensity="low"
      />

      <div className="px-4 md:px-6 lg:px-8 pb-16 md:pb-20 lg:pb-24 bg-[#0A0A0A]">
        <div className="max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
            {/* Formulaire de contact */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="border-l-2 border-[#8B0000] pl-4 md:pl-6 lg:pl-8 mb-6 md:mb-8">
                <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                  <MessageSquare className="text-[#8B0000]" size={20} />
                  <h2 className="text-2xl md:text-3xl font-black text-[#FFFFFF] uppercase tracking-tight">
                    FORMULAIRE
                  </h2>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                {/* Nom */}
                <div>
                  <label htmlFor="name" className="block font-mono text-xs text-[#8B0000] uppercase mb-2">
                    <User size={12} className="md:w-[14px] md:h-[14px] inline mr-2" />
                    Nom / Pseudonyme *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0A0A0A] border-2 border-[#E0E0E0]/20 px-3 py-2.5 md:px-4 md:py-3 text-[#FFFFFF] font-mono text-sm
                      focus:border-[#8B0000] focus:outline-none transition-colors
                      hover:border-[#8B0000]/50"
                    placeholder="Votre nom..."
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block font-mono text-xs text-[#8B0000] uppercase mb-2">
                    <Mail size={12} className="md:w-[14px] md:h-[14px] inline mr-2" />
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0A0A0A] border-2 border-[#E0E0E0]/20 px-3 py-2.5 md:px-4 md:py-3 text-[#FFFFFF] font-mono text-sm
                      focus:border-[#8B0000] focus:outline-none transition-colors
                      hover:border-[#8B0000]/50"
                    placeholder="votre.email@example.com"
                  />
                </div>

                {/* Sujet */}
                <div>
                  <label htmlFor="subject" className="block font-mono text-xs text-[#8B0000] uppercase mb-2">
                    <FileText size={12} className="md:w-[14px] md:h-[14px] inline mr-2" />
                    Sujet *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-black border border-[#E0E0E0]/20 px-3 py-2.5 md:px-4 md:py-3 text-[#FFFFFF] font-mono text-sm
                      focus:border-[#8B0000] focus:outline-none transition-colors cursor-pointer
                      hover:border-[#8B0000]/50"
                  >
                    <option value="">-- Sélectionnez un sujet --</option>
                    <option value="question">Question générale</option>
                    <option value="suggestion">Suggestion / Feedback</option>
                    <option value="technique">Problème technique</option>
                    <option value="contenu">Proposition de contenu</option>
                    <option value="partenariat">Partenariat</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block font-mono text-xs text-[#8B0000] uppercase mb-2">
                    <MessageSquare size={12} className="md:w-[14px] md:h-[14px] inline mr-2" />
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-[#0A0A0A] border-2 border-[#E0E0E0]/20 px-3 py-2.5 md:px-4 md:py-3 text-[#FFFFFF] font-mono text-sm
                      focus:border-[#8B0000] focus:outline-none transition-colors resize-none
                      hover:border-[#8B0000]/50 md:rows-8"
                    placeholder="Votre message..."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#8B0000] hover:bg-[#8B0000]/80 text-[#FFFFFF] font-black text-sm uppercase tracking-wider
                    py-3 px-6 md:py-4 md:px-8 transition-all duration-300 cursor-pointer
                    border-2 border-[#8B0000] hover:border-[#FFFFFF]
                    disabled:opacity-50 disabled:cursor-not-allowed
                    flex items-center justify-center gap-2 md:gap-3"
                >
                  {isSubmitting ? (
                    <>ENVOYÉ ✓</>
                  ) : (
                    <>
                      <Send size={14} className="md:w-4 md:h-4" />
                      <span className="hidden sm:inline">ENVOYER LE MESSAGE</span>
                      <span className="sm:hidden">ENVOYER</span>
                    </>
                  )}
                </button>

                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#8B0000]/20 border-l-4 border-[#8B0000] p-3 md:p-4 text-[#FFFFFF] font-mono text-xs md:text-sm"
                  >
                    ✓ Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#FF0000]/20 border-l-4 border-[#FF0000] p-3 md:p-4 text-[#FFFFFF] font-mono text-xs md:text-sm"
                  >
                    <AlertCircle className="inline mr-2" size={14} />
                    {error}
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Informations de contact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8 md:space-y-10 lg:space-y-12"
            >
              {/* Emails directs */}
              <div className="border-l-2 border-[#8B0000] pl-4 md:pl-6 lg:pl-8">
                <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                  <Mail className="text-[#8B0000]" size={20} />
                  <h2 className="text-2xl md:text-3xl font-black text-[#FFFFFF] uppercase tracking-tight">
                    EMAILS DIRECTS
                  </h2>
                </div>
                <div className="space-y-3 md:space-y-4 text-[#a8a8a8] leading-loose">
                  <div>
                    <p className="font-mono text-xs text-[#8B0000] uppercase mb-1">CONTACT GÉNÉRAL</p>
                    <a href="mailto:contact@untouchables.fr" className="text-[#FFFFFF] hover:text-[#8B0000] transition-colors font-mono text-sm md:text-base break-all">
                      contact@untouchables.fr
                    </a>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-[#8B0000] uppercase mb-1">SUPPORT TECHNIQUE</p>
                    <a href="mailto:support@untouchables.fr" className="text-[#FFFFFF] hover:text-[#8B0000] transition-colors font-mono text-sm md:text-base break-all">
                      support@untouchables.fr
                    </a>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-[#8B0000] uppercase mb-1">ADMINISTRATION</p>
                    <a href="mailto:admin@untouchables.fr" className="text-[#FFFFFF] hover:text-[#8B0000] transition-colors font-mono text-sm md:text-base break-all">
                      admin@untouchables.fr
                    </a>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-[#8B0000] uppercase mb-1">CONFIDENTIALITÉ / DPO</p>
                    <a href="mailto:privacy@untouchables.fr" className="text-[#FFFFFF] hover:text-[#8B0000] transition-colors font-mono text-sm md:text-base break-all">
                      privacy@untouchables.fr
                    </a>
                  </div>
                </div>
              </div>

              {/* Temps de réponse */}
              <div className="border-l-2 border-[#8B0000] pl-4 md:pl-6 lg:pl-8">
                <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                  <AlertCircle className="text-[#8B0000]" size={20} />
                  <h2 className="text-2xl md:text-3xl font-black text-[#FFFFFF] uppercase tracking-tight">
                    DÉLAIS
                  </h2>
                </div>
                <div className="space-y-3 md:space-y-4 text-[#a8a8a8] leading-loose text-sm md:text-base">
                  <p>
                    <span className="text-[#8B0000] font-bold">Réponse moyenne :</span> 24-48 heures (jours ouvrés)
                  </p>
                  <p>
                    <span className="text-[#8B0000] font-bold">Support technique :</span> 48-72 heures maximum
                  </p>
                  <p>
                    <span className="text-[#8B0000] font-bold">Demandes RGPD :</span> 30 jours maximum (conformément à la loi)
                  </p>
                </div>
              </div>

              {/* Réseaux sociaux */}
              <div className="border-l-2 border-[#8B0000] pl-4 md:pl-6 lg:pl-8">
                <h2 className="text-2xl md:text-3xl font-black text-[#FFFFFF] uppercase tracking-tight mb-4 md:mb-6">
                  RÉSEAUX SOCIAUX
                </h2>
                <div className="space-y-2 md:space-y-3 text-[#a8a8a8] leading-loose font-mono text-xs md:text-sm">
                  <p className="hover:text-[#8B0000] transition-colors cursor-pointer">
                    INSTAGRAM // @UNTOUCHABLES_FR
                  </p>
                  <p className="hover:text-[#8B0000] transition-colors cursor-pointer">
                    TIKTOK // @UNTOUCHABLESFR
                  </p>
                  <p className="hover:text-[#8B0000] transition-colors cursor-pointer">
                    TWITTER // @UNTOUCHABLES_FR
                  </p>
                  <p className="hover:text-[#8B0000] transition-colors cursor-pointer">
                    DISCORD // UNTOUCHABLES
                  </p>
                </div>
              </div>

              {/* Note importante */}
              <div className="bg-[#8B0000]/10 border-l-4 border-[#8B0000] p-4 md:p-6">
                <p className="font-mono text-xs text-[#8B0000] uppercase mb-2">⚠️ IMPORTANT</p>
                <p className="text-[#a8a8a8] text-xs md:text-sm leading-relaxed">
                  Untouchables est un site communautaire géré par des fans bénévoles. Nous ne sommes pas affiliés officiellement 
                  au groupe Korn. Pour toute demande officielle concernant le groupe, veuillez contacter leur management officiel.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}