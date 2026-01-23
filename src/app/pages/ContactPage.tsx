import { motion } from 'motion/react';
import { GlitchText } from '@/app/components/GlitchText';
import { Mail, MessageSquare, AlertCircle, Send, User, FileText } from 'lucide-react';
import { useState } from 'react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission - dans un vrai site, cela enverrait les données au backend
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
              ENTREZ EN CONTACT
            </span>
          </div>

          <h1
            className="text-5xl lg:text-7xl font-black text-[#FFFFFF] tracking-tighter uppercase mb-8 leading-tight"
            style={{ fontFamily: 'Arial Black, sans-serif', letterSpacing: '-0.05em' }}
          >
            <GlitchText glitchIntensity="high">CONTACTEZ-NOUS</GlitchText>
          </h1>

          <p className="text-xl text-[#a8a8a8] leading-loose border-l-4 border-[#8B0000] pl-6">
            Une question, une suggestion, un problème technique ? L'équipe Untouchables est à votre écoute.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulaire de contact */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="border-l-2 border-[#8B0000] pl-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="text-[#8B0000]" size={24} />
                <h2 className="text-3xl font-black text-[#FFFFFF] uppercase tracking-tight">
                  FORMULAIRE
                </h2>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nom */}
              <div>
                <label htmlFor="name" className="block font-mono text-xs text-[#8B0000] uppercase mb-2">
                  <User size={14} className="inline mr-2" />
                  Nom / Pseudonyme *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0A0A0A] border-2 border-[#E0E0E0]/20 px-4 py-3 text-[#FFFFFF] font-mono text-sm
                    focus:border-[#8B0000] focus:outline-none transition-colors cursor-none
                    hover:border-[#8B0000]/50"
                  placeholder="Votre nom..."
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block font-mono text-xs text-[#8B0000] uppercase mb-2">
                  <Mail size={14} className="inline mr-2" />
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0A0A0A] border-2 border-[#E0E0E0]/20 px-4 py-3 text-[#FFFFFF] font-mono text-sm
                    focus:border-[#8B0000] focus:outline-none transition-colors cursor-none
                    hover:border-[#8B0000]/50"
                  placeholder="votre.email@example.com"
                />
              </div>

              {/* Sujet */}
              <div>
                <label htmlFor="subject" className="block font-mono text-xs text-[#8B0000] uppercase mb-2">
                  <FileText size={14} className="inline mr-2" />
                  Sujet *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0A0A0A] border-2 border-[#E0E0E0]/20 px-4 py-3 text-[#FFFFFF] font-mono text-sm
                    focus:border-[#8B0000] focus:outline-none transition-colors cursor-none
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
                  <MessageSquare size={14} className="inline mr-2" />
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={8}
                  className="w-full bg-[#0A0A0A] border-2 border-[#E0E0E0]/20 px-4 py-3 text-[#FFFFFF] font-mono text-sm
                    focus:border-[#8B0000] focus:outline-none transition-colors cursor-none resize-none
                    hover:border-[#8B0000]/50"
                  placeholder="Votre message..."
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitted}
                className="w-full bg-[#8B0000] hover:bg-[#8B0000]/80 text-[#FFFFFF] font-black text-sm uppercase tracking-wider
                  py-4 px-8 transition-all duration-300 cursor-none
                  border-2 border-[#8B0000] hover:border-[#FFFFFF]
                  disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center justify-center gap-3"
              >
                {submitted ? (
                  <>ENVOYÉ ✓</>
                ) : (
                  <>
                    <Send size={16} />
                    ENVOYER LE MESSAGE
                  </>
                )}
              </button>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#8B0000]/20 border-l-4 border-[#8B0000] p-4 text-[#FFFFFF] font-mono text-sm"
                >
                  ✓ Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Informations de contact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-12"
          >
            {/* Emails directs */}
            <div className="border-l-2 border-[#8B0000] pl-8">
              <div className="flex items-center gap-3 mb-6">
                <Mail className="text-[#8B0000]" size={24} />
                <h2 className="text-3xl font-black text-[#FFFFFF] uppercase tracking-tight">
                  EMAILS DIRECTS
                </h2>
              </div>
              <div className="space-y-4 text-[#a8a8a8] leading-loose">
                <div>
                  <p className="font-mono text-xs text-[#8B0000] uppercase mb-1">CONTACT GÉNÉRAL</p>
                  <a href="mailto:contact@untouchables.fr" className="text-[#FFFFFF] hover:text-[#8B0000] transition-colors font-mono">
                    contact@untouchables.fr
                  </a>
                </div>
                <div>
                  <p className="font-mono text-xs text-[#8B0000] uppercase mb-1">SUPPORT TECHNIQUE</p>
                  <a href="mailto:support@untouchables.fr" className="text-[#FFFFFF] hover:text-[#8B0000] transition-colors font-mono">
                    support@untouchables.fr
                  </a>
                </div>
                <div>
                  <p className="font-mono text-xs text-[#8B0000] uppercase mb-1">ADMINISTRATION</p>
                  <a href="mailto:admin@untouchables.fr" className="text-[#FFFFFF] hover:text-[#8B0000] transition-colors font-mono">
                    admin@untouchables.fr
                  </a>
                </div>
                <div>
                  <p className="font-mono text-xs text-[#8B0000] uppercase mb-1">CONFIDENTIALITÉ / DPO</p>
                  <a href="mailto:privacy@untouchables.fr" className="text-[#FFFFFF] hover:text-[#8B0000] transition-colors font-mono">
                    privacy@untouchables.fr
                  </a>
                </div>
              </div>
            </div>

            {/* Temps de réponse */}
            <div className="border-l-2 border-[#8B0000] pl-8">
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="text-[#8B0000]" size={24} />
                <h2 className="text-3xl font-black text-[#FFFFFF] uppercase tracking-tight">
                  DÉLAIS
                </h2>
              </div>
              <div className="space-y-4 text-[#a8a8a8] leading-loose">
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
            <div className="border-l-2 border-[#8B0000] pl-8">
              <h2 className="text-3xl font-black text-[#FFFFFF] uppercase tracking-tight mb-6">
                RÉSEAUX SOCIAUX
              </h2>
              <div className="space-y-3 text-[#a8a8a8] leading-loose font-mono text-sm">
                <p className="hover:text-[#8B0000] transition-colors cursor-none">
                  INSTAGRAM // @UNTOUCHABLES_FR
                </p>
                <p className="hover:text-[#8B0000] transition-colors cursor-none">
                  TIKTOK // @UNTOUCHABLESFR
                </p>
                <p className="hover:text-[#8B0000] transition-colors cursor-none">
                  TWITTER // @UNTOUCHABLES_FR
                </p>
                <p className="hover:text-[#8B0000] transition-colors cursor-none">
                  DISCORD // UNTOUCHABLES
                </p>
              </div>
            </div>

            {/* Note importante */}
            <div className="bg-[#8B0000]/10 border-l-4 border-[#8B0000] p-6">
              <p className="font-mono text-xs text-[#8B0000] uppercase mb-2">⚠️ IMPORTANT</p>
              <p className="text-[#a8a8a8] text-sm leading-relaxed">
                Untouchables est un site communautaire géré par des fans bénévoles. Nous ne sommes pas affiliés officiellement 
                au groupe Korn. Pour toute demande officielle concernant le groupe, veuillez contacter leur management officiel.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
