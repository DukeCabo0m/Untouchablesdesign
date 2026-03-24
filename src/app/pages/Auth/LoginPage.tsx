import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { GlitchText } from '@/app/components/GlitchText';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { Button } from '@/app/components/Button';
import { useAuth } from '@/app/contexts/AuthContext';
import { authApi } from '@/app/utils/api';

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      // Appeler l'API de connexion
      const response = await authApi.login(email, password);
      
      console.log('[LoginPage] Login successful:', response);
      
      // Mettre à jour le contexte d'authentification avec l'ID utilisateur
      login(
        response.user.id,        // ID utilisateur
        response.user.username, 
        response.user.email,
        response.user.avatar,    // Avatar
        response.user.role || 'user'
      );
      
      // Rediriger vers le profil ou vers le admin si admin
      if (response.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    } catch (err) {
      console.error('[LoginPage] Login error:', err);
      setError(err instanceof Error ? err.message : 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 md:pt-28 lg:pt-32 pb-16 md:pb-20 lg:pb-24 px-4 md:px-6 flex items-center justify-center relative z-[100]">
      <div className="max-w-md w-full">
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
            <GlitchText>CONNEXION</GlitchText>
          </h1>
          <div className="h-1 w-20 md:w-24 bg-[#8B0000] mx-auto mb-3 md:mb-4" />
          <p className="font-mono text-xs md:text-sm text-[#E0E0E0]/70">
            Accédez à votre espace membre Untouchables
          </p>
        </motion.div>

        {/* Form */}
        <div className="bg-[#0A0A0A] border-2 border-[#E0E0E0]/20 p-6 md:p-8 relative z-[150]">
          <form className="space-y-5 md:space-y-6 relative z-[151]" onSubmit={handleSubmit}>
            {/* Error Message */}
            {error && (
              <div className="bg-[#8B0000]/10 border border-[#8B0000] p-3 md:p-4 flex items-start gap-2 md:gap-3">
                <AlertCircle size={16} className="md:w-[18px] md:h-[18px] text-[#8B0000] mt-0.5 flex-shrink-0" />
                <p className="font-mono text-xs md:text-sm text-[#8B0000]">{error}</p>
              </div>
            )}
            
            {/* Email */}
            <div>
              <label className="block font-mono text-xs md:text-sm text-[#8B0000] uppercase mb-2">
                Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#E0E0E0]/30"
                  size={18}
                />
                <input
                  type="email"
                  placeholder="votre@email.fr"
                  className="w-full bg-[#0A0A0A] border border-[#E0E0E0]/20 focus:border-[#8B0000] outline-none text-[#E0E0E0] font-mono text-sm pl-12 pr-4 py-3 transition-colors pointer-events-auto relative z-[152]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block font-mono text-xs md:text-sm text-[#8B0000] uppercase mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#E0E0E0]/30"
                  size={18}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full bg-[#0A0A0A] border border-[#E0E0E0]/20 focus:border-[#8B0000] outline-none text-[#E0E0E0] font-mono text-sm pl-12 pr-4 py-3 transition-colors pointer-events-auto relative z-[152]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#E0E0E0]/30 pointer-events-auto relative z-[153]"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between font-mono text-xs md:text-sm">
              <label className="flex items-center gap-2 text-[#E0E0E0] cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 border-[#E0E0E0]/20 bg-[#0A0A0A] text-[#8B0000] focus:ring-[#8B0000]"
                />
                <span>Se souvenir</span>
              </label>
              <a href="/forgot-password" className="text-[#8B0000] hover:underline">
                Mot de passe oublié ?
              </a>
            </div>

            {/* Submit */}
            <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
              <GlitchText glitchIntensity="low">
                {loading ? 'CONNEXION...' : 'SE CONNECTER'}
              </GlitchText>
            </Button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-[1px] bg-[#E0E0E0]/20" />
            <span className="font-mono text-xs text-[#E0E0E0]/50">OU</span>
            <div className="flex-1 h-[1px] bg-[#E0E0E0]/20" />
          </div>

          {/* Register link */}
          <Link
            to="/signup"
            className="block w-full bg-[#0A0A0A] border-2 border-[#E0E0E0]/20 hover:border-[#8B0000] text-[#E0E0E0] font-mono text-sm uppercase py-4 text-center transition-colors"
          >
            <User className="inline-block mr-2 -mt-1" size={16} />
            CRÉER UN COMPTE
          </Link>
        </div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 p-6 bg-[#0A0A0A] border-l-4 border-[#8B0000]"
        >
          <p className="font-mono text-xs text-[#E0E0E0]/70 leading-relaxed mb-3">
            <span className="text-[#8B0000]">&gt;&gt;</span> Compte membre gratuit. Accès aux
            forums, événements, contenus exclusifs. Rejoignez la communauté Untouchables.
          </p>
          <p className="font-mono text-xs text-[#E0E0E0]/70 leading-relaxed">
            <span className="text-[#8B0000]">&gt;&gt; TEST:</span> Utilisez <span className="text-[#8B0000] font-bold">admin@untouchables.fr</span> pour accéder au dashboard admin.
          </p>
        </motion.div>
      </div>
    </div>
  );
}