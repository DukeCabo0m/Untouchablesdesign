import { GlitchText } from '@/app/components/GlitchText';
import { Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { User, Mail, Lock, Shield, Calendar, Check, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/app/components/Button';
import { authApi } from '@/app/utils/api';
import { useAuth } from '@/app/contexts/AuthContext';

export function SignupPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
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
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
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
    
    // Call signup API
    setLoading(true);
    try {
      const response = await authApi.signup(
        formData.username,
        formData.email,
        formData.password,
        formData.birthdate
      );
      
      console.log('[SignupPage] Signup successful:', response);
      
      // Update auth context
      login(response.user.username, response.user.email, response.user.role || 'user');
      
      // Show success and redirect
      setErrors({});
      setSubmitted(true);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    } catch (error) {
      console.error('[SignupPage] Signup error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue lors de l\'inscription';
      
      // Map specific error messages to their appropriate fields with helpful suggestions
      if (errorMessage.includes('pseudonyme')) {
        const suggestions = [
          `${formData.username}${Math.floor(Math.random() * 1000)}`,
          `${formData.username}_${new Date().getFullYear()}`,
          `${formData.username}Fan`
        ];
        
        setErrors({ 
          general: `${errorMessage}. Suggestions : ${suggestions.join(', ')}`,
          username: errorMessage
        });
      } else if (errorMessage.includes('email')) {
        setErrors({ 
          general: errorMessage,
          email: errorMessage
        });
      } else {
        setErrors({ general: errorMessage });
      }
    } finally {
      setLoading(false);
    }
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
                py-4 px-8 transition-all duration-300 cursor-pointer
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
    <div className="min-h-screen pt-24 md:pt-28 lg:pt-32 pb-16 md:pb-20 lg:pb-24 px-4 md:px-6 flex items-center justify-center relative z-[100]">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 md:mb-10 lg:mb-12 text-center"
        >
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#E0E0E0] uppercase tracking-tighter mb-3 md:mb-4"
            style={{ fontFamily: 'Arial Black, sans-serif', letterSpacing: '-0.05em' }}
          >
            <GlitchText>INSCRIPTION</GlitchText>
          </h1>
          <div className="h-1 w-20 md:w-24 bg-[#8B0000] mx-auto mb-3 md:mb-4" />
          <p className="font-mono text-xs md:text-sm text-[#E0E0E0]/70">
            Rejoignez la communauté francophone des fans de Korn
          </p>
        </motion.div>

        {/* Formulaire */}
        <div className="bg-[#0A0A0A] border-2 border-[#8B0000]/30 p-8 lg:p-12 relative z-[150]">
          <form onSubmit={handleSubmit} className="space-y-6 relative z-[151]">
            {/* Error Message Général */}
            {errors.general && (
              <div className="bg-[#8B0000]/10 border-2 border-[#8B0000] p-4 flex items-start gap-3 animate-pulse">
                <AlertCircle size={20} className="text-[#8B0000] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-mono text-sm text-[#8B0000] font-bold mb-1">ERREUR D'INSCRIPTION</p>
                  <p className="font-mono text-xs text-[#E0E0E0]">{errors.general}</p>
                </div>
              </div>
            )}
            
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
                  focus:border-[#8B0000] focus:outline-none transition-colors
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
                  focus:border-[#8B0000] focus:outline-none transition-colors
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
                  focus:border-[#8B0000] focus:outline-none transition-colors
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
                  focus:border-[#8B0000] focus:outline-none transition-colors
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
                  focus:border-[#8B0000] focus:outline-none transition-colors
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
                className="mt-1 w-5 h-5 bg-[#0A0A0A] border-2 border-[#E0E0E0]/20 cursor-pointer
                  checked:bg-[#8B0000] checked:border-[#8B0000]"
              />
              <label htmlFor="newsletter" className="text-[#a8a8a8] text-sm leading-relaxed cursor-pointer">
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
                className="mt-1 w-5 h-5 bg-[#0A0A0A] border-2 border-[#E0E0E0]/20 cursor-pointer
                  checked:bg-[#8B0000] checked:border-[#8B0000]"
              />
              <label htmlFor="terms" className="text-[#a8a8a8] text-sm leading-relaxed cursor-pointer">
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
              disabled={loading}
              className="w-full bg-[#8B0000] hover:bg-[#8B0000]/80 text-[#FFFFFF] font-black text-sm uppercase tracking-wider
                py-4 px-8 transition-all duration-300 cursor-pointer
                border-2 border-[#8B0000] hover:border-[#FFFFFF]
                flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Check size={16} />
              {loading ? 'CRÉATION EN COURS...' : 'CRÉER MON COMPTE'}
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
        </div>
      </div>
    </div>
  );
}