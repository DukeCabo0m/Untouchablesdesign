import { GlitchText } from '@/app/components/GlitchText';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { User, Mail, Lock, Shield, Calendar, Check } from 'lucide-react';
import { useState } from 'react';

export function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthdate: '',
    newsletter: false,
    terms: false
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation basique
    const newErrors: Record<string, string> = {};
    
    if (formData.username.length < 3) {
      newErrors.username = 'Le pseudonyme doit contenir au moins 3 caractères';
    }
    
    if (!formData.email.includes('@')) {
      newErrors.email = 'Email invalide';
    }
    
    if (formData.password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    
    if (!formData.birthdate) {
      newErrors.birthdate = 'Date de naissance requise';
    }
    
    if (!formData.terms) {
      newErrors.terms = 'Vous devez accepter les conditions d\'utilisation';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Mock submission
    setErrors({});
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
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
            <div className="text-6xl text-[#8B0000] mb-6">✓</div>
            <h1 className="text-4xl font-black text-[#FFFFFF] uppercase mb-6">
              <GlitchText>INSCRIPTION RÉUSSIE</GlitchText>
            </h1>
            <p className="text-[#a8a8a8] leading-loose mb-8">
              Bienvenue dans la communauté Untouchables, <span className="text-[#8B0000] font-bold">{formData.username}</span> !<br />
              Un email de confirmation a été envoyé à <span className="text-[#FFFFFF]">{formData.email}</span>
            </p>
            <Link
              to="/login"
              className="inline-block bg-[#8B0000] hover:bg-[#8B0000]/80 text-[#FFFFFF] font-black text-sm uppercase tracking-wider
                py-4 px-8 transition-all duration-300 cursor-none
                border-2 border-[#8B0000] hover:border-[#FFFFFF]"
            >
              SE CONNECTER
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-32 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="inline-block bg-[#8B0000] px-4 py-2 mb-6">
            <span className="font-black text-sm text-[#E0E0E0] uppercase tracking-wider">
              REJOIGNEZ-NOUS
            </span>
          </div>

          <h1
            className="text-5xl lg:text-7xl font-black text-[#FFFFFF] tracking-tighter uppercase mb-8 leading-tight"
            style={{ fontFamily: 'Arial Black, sans-serif', letterSpacing: '-0.05em' }}
          >
            <GlitchText glitchIntensity="high">CRÉER UN COMPTE</GlitchText>
          </h1>

          <p className="text-xl text-[#a8a8a8] leading-loose">
            Rejoignez la communauté francophone de fans de Korn
          </p>
        </motion.div>

        {/* Formulaire */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#0A0A0A] border-2 border-[#8B0000]/30 p-8 lg:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Pseudonyme */}
            <div>
              <label htmlFor="username" className="block font-mono text-xs text-[#8B0000] uppercase mb-2">
                <User size={14} className="inline mr-2" />
                Pseudonyme *
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className={`w-full bg-[#0A0A0A] border-2 ${errors.username ? 'border-[#8B0000]' : 'border-[#E0E0E0]/20'} px-4 py-3 text-[#FFFFFF] font-mono text-sm
                  focus:border-[#8B0000] focus:outline-none transition-colors cursor-none
                  hover:border-[#8B0000]/50`}
                placeholder="Votre pseudonyme..."
              />
              {errors.username && (
                <p className="text-[#8B0000] font-mono text-xs mt-2">⚠ {errors.username}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block font-mono text-xs text-[#8B0000] uppercase mb-2">
                <Mail size={14} className="inline mr-2" />
                Adresse Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full bg-[#0A0A0A] border-2 ${errors.email ? 'border-[#8B0000]' : 'border-[#E0E0E0]/20'} px-4 py-3 text-[#FFFFFF] font-mono text-sm
                  focus:border-[#8B0000] focus:outline-none transition-colors cursor-none
                  hover:border-[#8B0000]/50`}
                placeholder="votre.email@example.com"
              />
              {errors.email && (
                <p className="text-[#8B0000] font-mono text-xs mt-2">⚠ {errors.email}</p>
              )}
            </div>

            {/* Date de naissance */}
            <div>
              <label htmlFor="birthdate" className="block font-mono text-xs text-[#8B0000] uppercase mb-2">
                <Calendar size={14} className="inline mr-2" />
                Date de naissance *
              </label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
                required
                max={new Date().toISOString().split('T')[0]}
                className={`w-full bg-[#0A0A0A] border-2 ${errors.birthdate ? 'border-[#8B0000]' : 'border-[#E0E0E0]/20'} px-4 py-3 text-[#FFFFFF] font-mono text-sm
                  focus:border-[#8B0000] focus:outline-none transition-colors cursor-none
                  hover:border-[#8B0000]/50`}
              />
              {errors.birthdate && (
                <p className="text-[#8B0000] font-mono text-xs mt-2">⚠ {errors.birthdate}</p>
              )}
            </div>

            {/* Mot de passe */}
            <div>
              <label htmlFor="password" className="block font-mono text-xs text-[#8B0000] uppercase mb-2">
                <Lock size={14} className="inline mr-2" />
                Mot de passe *
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className={`w-full bg-[#0A0A0A] border-2 ${errors.password ? 'border-[#8B0000]' : 'border-[#E0E0E0]/20'} px-4 py-3 text-[#FFFFFF] font-mono text-sm
                  focus:border-[#8B0000] focus:outline-none transition-colors cursor-none
                  hover:border-[#8B0000]/50`}
                placeholder="Minimum 8 caractères..."
              />
              {errors.password && (
                <p className="text-[#8B0000] font-mono text-xs mt-2">⚠ {errors.password}</p>
              )}
            </div>

            {/* Confirmation mot de passe */}
            <div>
              <label htmlFor="confirmPassword" className="block font-mono text-xs text-[#8B0000] uppercase mb-2">
                <Lock size={14} className="inline mr-2" />
                Confirmer le mot de passe *
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className={`w-full bg-[#0A0A0A] border-2 ${errors.confirmPassword ? 'border-[#8B0000]' : 'border-[#E0E0E0]/20'} px-4 py-3 text-[#FFFFFF] font-mono text-sm
                  focus:border-[#8B0000] focus:outline-none transition-colors cursor-none
                  hover:border-[#8B0000]/50`}
                placeholder="Confirmez votre mot de passe..."
              />
              {errors.confirmPassword && (
                <p className="text-[#8B0000] font-mono text-xs mt-2">⚠ {errors.confirmPassword}</p>
              )}
            </div>

            {/* Newsletter */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="newsletter"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleChange}
                className="mt-1 w-5 h-5 bg-[#0A0A0A] border-2 border-[#E0E0E0]/20 cursor-none
                  checked:bg-[#8B0000] checked:border-[#8B0000]"
              />
              <label htmlFor="newsletter" className="text-[#a8a8a8] text-sm leading-relaxed cursor-none">
                Je souhaite recevoir la newsletter Untouchables (actualités, nouveautés, événements)
              </label>
            </div>

            {/* Conditions */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                className="mt-1 w-5 h-5 bg-[#0A0A0A] border-2 border-[#E0E0E0]/20 cursor-none
                  checked:bg-[#8B0000] checked:border-[#8B0000]"
              />
              <label htmlFor="terms" className="text-[#a8a8a8] text-sm leading-relaxed cursor-none">
                J'accepte les <Link to="/terms" className="text-[#8B0000] hover:underline">conditions d'utilisation</Link> et 
                la <Link to="/privacy" className="text-[#8B0000] hover:underline">politique de confidentialité</Link> *
              </label>
            </div>
            {errors.terms && (
              <p className="text-[#8B0000] font-mono text-xs">⚠ {errors.terms}</p>
            )}

            {/* Note RGPD */}
            <div className="bg-[#8B0000]/10 border-l-4 border-[#8B0000] p-4">
              <div className="flex items-start gap-3">
                <Shield className="text-[#8B0000] mt-1 flex-shrink-0" size={20} />
                <div className="text-[#a8a8a8] text-xs leading-relaxed">
                  <p className="font-bold text-[#FFFFFF] mb-2">PROTECTION DE VOS DONNÉES</p>
                  <p>
                    Vos données sont protégées conformément au RGPD. Vous pouvez à tout moment exercer vos droits 
                    (accès, rectification, suppression) en nous contactant à privacy@untouchables.fr
                  </p>
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#8B0000] hover:bg-[#8B0000]/80 text-[#FFFFFF] font-black text-sm uppercase tracking-wider
                py-4 px-8 transition-all duration-300 cursor-none
                border-2 border-[#8B0000] hover:border-[#FFFFFF]
                flex items-center justify-center gap-3"
            >
              <Check size={16} />
              CRÉER MON COMPTE
            </button>

            {/* Lien connexion */}
            <div className="text-center pt-6 border-t border-[#E0E0E0]/20">
              <p className="text-[#a8a8a8] text-sm">
                Vous avez déjà un compte ?{' '}
                <Link to="/login" className="text-[#8B0000] hover:underline font-bold">
                  SE CONNECTER
                </Link>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}