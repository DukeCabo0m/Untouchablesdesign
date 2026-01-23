import { motion } from 'motion/react';
import { GlitchText } from '@/app/components/GlitchText';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation basique
    if (!email.includes('@')) {
      setError('Email invalide');
      return;
    }
    
    // Mock submission
    setError('');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl w-full text-center"
        >
          <div className="bg-[#8B0000]/20 border-4 border-[#8B0000] p-12">
            <CheckCircle className="mx-auto text-[#8B0000] mb-6" size={64} />
            <h1 className="text-4xl font-black text-[#FFFFFF] uppercase mb-6">
              <GlitchText>EMAIL ENVOYÉ</GlitchText>
            </h1>
            <p className="text-[#a8a8a8] leading-loose mb-8">
              Un email de réinitialisation a été envoyé à :<br />
              <span className="text-[#FFFFFF] font-mono">{email}</span>
            </p>
            <p className="text-[#a8a8a8] text-sm leading-loose mb-8">
              Vérifiez votre boîte de réception et suivez les instructions pour créer un nouveau mot de passe.
              <br />
              <span className="text-[#8B0000]">Le lien expire dans 24 heures.</span>
            </p>
            <Link
              to="/login"
              className="inline-block bg-[#8B0000] hover:bg-[#8B0000]/80 text-[#FFFFFF] font-black text-sm uppercase tracking-wider
                py-4 px-8 transition-all duration-300 cursor-none
                border-2 border-[#8B0000] hover:border-[#FFFFFF]"
            >
              RETOUR À LA CONNEXION
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-[#8B0000] hover:text-[#FFFFFF] font-mono text-xs uppercase transition-colors cursor-none"
          >
            <ArrowLeft size={16} />
            Retour à la connexion
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1
            className="text-5xl md:text-6xl font-black text-[#E0E0E0] uppercase tracking-tighter mb-4"
            style={{ fontFamily: 'Arial Black, sans-serif', letterSpacing: '-0.05em' }}
          >
            <GlitchText>MOT DE PASSE OUBLIÉ</GlitchText>
          </h1>
          <div className="h-1 w-24 bg-[#8B0000] mx-auto mb-4" />
          <p className="font-mono text-xs text-[#E0E0E0]/70 leading-relaxed">
            Entrez votre adresse email pour recevoir<br />
            un lien de réinitialisation
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#0A0A0A] border-2 border-[#E0E0E0]/20 p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block font-mono text-xs text-[#8B0000] uppercase mb-2">
                Adresse Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#E0E0E0]/30"
                  size={18}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.fr"
                  required
                  className={`w-full bg-[#0A0A0A] border ${
                    error ? 'border-[#8B0000]' : 'border-[#E0E0E0]/20'
                  } focus:border-[#8B0000] outline-none text-[#E0E0E0] font-mono text-sm pl-12 pr-4 py-3 transition-colors cursor-none`}
                />
              </div>
              {error && (
                <p className="text-[#8B0000] font-mono text-xs mt-2">⚠ {error}</p>
              )}
            </div>

            {/* Info box */}
            <div className="bg-[#8B0000]/10 border-l-4 border-[#8B0000] p-4">
              <p className="font-mono text-xs text-[#E0E0E0]/70 leading-relaxed">
                <span className="text-[#8B0000] font-bold">INFO :</span> Vous recevrez un email avec un lien 
                sécurisé pour créer un nouveau mot de passe. Vérifiez aussi vos spams.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#8B0000] hover:bg-[#6B0000] text-[#E0E0E0] font-mono text-sm uppercase py-4 transition-colors border border-[#8B0000] hover:border-[#E0E0E0] cursor-none"
            >
              ENVOYER LE LIEN
            </button>
          </form>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 p-6 bg-[#0A0A0A] border-l-4 border-[#8B0000]"
        >
          <p className="font-mono text-xs text-[#E0E0E0]/70 leading-relaxed">
            <span className="text-[#8B0000]">&gt;&gt;</span> Vous vous souvenez de votre mot de passe ?{' '}
            <Link to="/login" className="text-[#8B0000] hover:underline cursor-none">
              Retour à la connexion
            </Link>
          </p>
          <p className="font-mono text-xs text-[#E0E0E0]/70 leading-relaxed mt-3">
            <span className="text-[#8B0000]">&gt;&gt;</span> Pas encore de compte ?{' '}
            <Link to="/signup" className="text-[#8B0000] hover:underline cursor-none">
              Créer un compte
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}