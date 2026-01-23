import { motion } from 'motion/react';
import { GlitchText } from '@/app/components/GlitchText';
import { SectionSeparator } from '@/app/components/SectionSeparator';
import { 
  Mail, 
  Lock, 
  Bell,
  Eye,
  Shield,
  Trash2,
  Save,
  AlertTriangle
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function SettingsPage() {
  const [emailData, setEmailData] = useState({
    currentEmail: 'darkfreak@untouchables.fr',
    newEmail: '',
    confirmEmail: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    newsletter: true,
    newPosts: true,
    comments: true,
    mentions: true,
    likes: false,
    events: true
  });

  const [privacy, setPrivacy] = useState({
    showEmail: false,
    showLocation: true,
    showActivity: true,
    allowMessages: true
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmailData({
      ...emailData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
  };

  const handlePrivacyToggle = (key: keyof typeof privacy) => {
    setPrivacy({
      ...privacy,
      [key]: !privacy[key]
    });
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!emailData.newEmail.includes('@')) {
      newErrors.newEmail = 'Email invalide';
    }
    
    if (emailData.newEmail !== emailData.confirmEmail) {
      newErrors.confirmEmail = 'Les emails ne correspondent pas';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    console.log('Email mis à jour:', emailData);
    // Reset form
    setEmailData({
      ...emailData,
      newEmail: '',
      confirmEmail: ''
    });
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = 'Le mot de passe doit contenir au moins 8 caractères';
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    console.log('Mot de passe mis à jour');
    // Reset form
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleDeleteAccount = () => {
    console.log('Suppression du compte...');
    // En production, rediriger vers une page de confirmation finale
  };

  return (
    <div className="min-h-screen py-32">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="inline-block bg-[#8B0000] px-4 py-2 mb-6">
            <span className="font-black text-sm text-[#E0E0E0] uppercase tracking-wider">
              CONFIGURATION
            </span>
          </div>

          <h1
            className="text-5xl lg:text-7xl font-black text-[#FFFFFF] tracking-tighter uppercase mb-8 leading-tight"
            style={{ fontFamily: 'Arial Black, sans-serif', letterSpacing: '-0.05em' }}
          >
            <GlitchText glitchIntensity="high">PARAMÈTRES</GlitchText>
          </h1>

          <p className="text-xl text-[#a8a8a8] leading-loose">
            Gère ton compte et ta confidentialité
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-12"
        >
          {/* Modifier l'email */}
          <div className="bg-[#0A0A0A] border-2 border-[#8B0000]/30 p-8">
            <h2 className="text-2xl font-black text-[#FFFFFF] uppercase mb-2 flex items-center gap-3">
              <Mail size={24} className="text-[#8B0000]" />
              ADRESSE EMAIL
            </h2>
            <p className="text-[#a8a8a8] text-sm mb-6">
              Email actuel : <span className="text-[#FFFFFF] font-mono">{emailData.currentEmail}</span>
            </p>

            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div>
                <label htmlFor="newEmail" className="block font-mono text-xs text-[#8B0000] uppercase mb-2">
                  Nouvel email
                </label>
                <input
                  type="email"
                  id="newEmail"
                  name="newEmail"
                  value={emailData.newEmail}
                  onChange={handleEmailChange}
                  className={`w-full bg-[#0A0A0A] border-2 ${errors.newEmail ? 'border-[#8B0000]' : 'border-[#E0E0E0]/20'} px-4 py-3 text-[#FFFFFF] font-mono text-sm
                    focus:border-[#8B0000] focus:outline-none transition-colors cursor-none
                    hover:border-[#8B0000]/50`}
                  placeholder="nouveau.email@example.com"
                />
                {errors.newEmail && (
                  <p className="text-[#8B0000] font-mono text-xs mt-2">⚠ {errors.newEmail}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmEmail" className="block font-mono text-xs text-[#8B0000] uppercase mb-2">
                  Confirmer le nouvel email
                </label>
                <input
                  type="email"
                  id="confirmEmail"
                  name="confirmEmail"
                  value={emailData.confirmEmail}
                  onChange={handleEmailChange}
                  className={`w-full bg-[#0A0A0A] border-2 ${errors.confirmEmail ? 'border-[#8B0000]' : 'border-[#E0E0E0]/20'} px-4 py-3 text-[#FFFFFF] font-mono text-sm
                    focus:border-[#8B0000] focus:outline-none transition-colors cursor-none
                    hover:border-[#8B0000]/50`}
                  placeholder="nouveau.email@example.com"
                />
                {errors.confirmEmail && (
                  <p className="text-[#8B0000] font-mono text-xs mt-2">⚠ {errors.confirmEmail}</p>
                )}
              </div>

              <button
                type="submit"
                className="bg-[#8B0000] hover:bg-[#8B0000]/80 text-[#FFFFFF] font-black text-sm uppercase tracking-wider px-6 py-3 transition-all duration-300 cursor-none border-2 border-[#8B0000] hover:border-[#FFFFFF] flex items-center gap-2"
              >
                <Save size={16} />
                METTRE À JOUR L'EMAIL
              </button>
            </form>
          </div>

          <SectionSeparator />

          {/* Modifier le mot de passe */}
          <div className="bg-[#0A0A0A] border-2 border-[#8B0000]/30 p-8">
            <h2 className="text-2xl font-black text-[#FFFFFF] uppercase mb-6 flex items-center gap-3">
              <Lock size={24} className="text-[#8B0000]" />
              MOT DE PASSE
            </h2>

            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div>
                <label htmlFor="currentPassword" className="block font-mono text-xs text-[#8B0000] uppercase mb-2">
                  Mot de passe actuel
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full bg-[#0A0A0A] border-2 border-[#E0E0E0]/20 px-4 py-3 text-[#FFFFFF] font-mono text-sm
                    focus:border-[#8B0000] focus:outline-none transition-colors cursor-none
                    hover:border-[#8B0000]/50"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label htmlFor="newPassword" className="block font-mono text-xs text-[#8B0000] uppercase mb-2">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className={`w-full bg-[#0A0A0A] border-2 ${errors.newPassword ? 'border-[#8B0000]' : 'border-[#E0E0E0]/20'} px-4 py-3 text-[#FFFFFF] font-mono text-sm
                    focus:border-[#8B0000] focus:outline-none transition-colors cursor-none
                    hover:border-[#8B0000]/50`}
                  placeholder="Minimum 8 caractères"
                />
                {errors.newPassword && (
                  <p className="text-[#8B0000] font-mono text-xs mt-2">⚠ {errors.newPassword}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block font-mono text-xs text-[#8B0000] uppercase mb-2">
                  Confirmer le nouveau mot de passe
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className={`w-full bg-[#0A0A0A] border-2 ${errors.confirmPassword ? 'border-[#8B0000]' : 'border-[#E0E0E0]/20'} px-4 py-3 text-[#FFFFFF] font-mono text-sm
                    focus:border-[#8B0000] focus:outline-none transition-colors cursor-none
                    hover:border-[#8B0000]/50`}
                  placeholder="••••••••"
                />
                {errors.confirmPassword && (
                  <p className="text-[#8B0000] font-mono text-xs mt-2">⚠ {errors.confirmPassword}</p>
                )}
              </div>

              <button
                type="submit"
                className="bg-[#8B0000] hover:bg-[#8B0000]/80 text-[#FFFFFF] font-black text-sm uppercase tracking-wider px-6 py-3 transition-all duration-300 cursor-none border-2 border-[#8B0000] hover:border-[#FFFFFF] flex items-center gap-2"
              >
                <Save size={16} />
                METTRE À JOUR LE MOT DE PASSE
              </button>
            </form>
          </div>

          <SectionSeparator />

          {/* Notifications */}
          <div className="bg-[#0A0A0A] border-2 border-[#8B0000]/30 p-8">
            <h2 className="text-2xl font-black text-[#FFFFFF] uppercase mb-6 flex items-center gap-3">
              <Bell size={24} className="text-[#8B0000]" />
              NOTIFICATIONS
            </h2>

            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-4 border-2 border-[#E0E0E0]/20 hover:border-[#8B0000]/50 transition-colors">
                  <div>
                    <h3 className="text-[#FFFFFF] font-black uppercase text-sm mb-1">
                      {key === 'newsletter' && 'Newsletter Untouchables'}
                      {key === 'newPosts' && 'Nouveaux articles'}
                      {key === 'comments' && 'Réponses à mes commentaires'}
                      {key === 'mentions' && 'Mentions'}
                      {key === 'likes' && 'Likes sur mes posts'}
                      {key === 'events' && 'Événements et concerts'}
                    </h3>
                    <p className="text-[#a8a8a8] text-xs font-mono">
                      {key === 'newsletter' && 'Recevoir les actualités et nouveautés par email'}
                      {key === 'newPosts' && 'Notification quand un nouvel article est publié'}
                      {key === 'comments' && 'Recevoir les réponses à mes commentaires'}
                      {key === 'mentions' && 'Quand quelqu\'un te mentionne'}
                      {key === 'likes' && 'Quand quelqu\'un aime tes contributions'}
                      {key === 'events' && 'Annonces de concerts et événements'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNotificationToggle(key as keyof typeof notifications)}
                    className={`w-14 h-8 rounded-full transition-all duration-300 cursor-none border-2 relative
                      ${value ? 'bg-[#8B0000] border-[#8B0000]' : 'bg-transparent border-[#E0E0E0]/20'}`}
                  >
                    <div className={`w-6 h-6 bg-[#FFFFFF] rounded-full absolute top-0.5 transition-all duration-300
                      ${value ? 'right-0.5' : 'left-0.5'}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <SectionSeparator />

          {/* Confidentialité */}
          <div className="bg-[#0A0A0A] border-2 border-[#8B0000]/30 p-8">
            <h2 className="text-2xl font-black text-[#FFFFFF] uppercase mb-6 flex items-center gap-3">
              <Eye size={24} className="text-[#8B0000]" />
              CONFIDENTIALITÉ
            </h2>

            <div className="space-y-4">
              {Object.entries(privacy).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-4 border-2 border-[#E0E0E0]/20 hover:border-[#8B0000]/50 transition-colors">
                  <div>
                    <h3 className="text-[#FFFFFF] font-black uppercase text-sm mb-1">
                      {key === 'showEmail' && 'Afficher mon email'}
                      {key === 'showLocation' && 'Afficher ma localisation'}
                      {key === 'showActivity' && 'Afficher mon activité'}
                      {key === 'allowMessages' && 'Autoriser les messages privés'}
                    </h3>
                    <p className="text-[#a8a8a8] text-xs font-mono">
                      {key === 'showEmail' && 'Rendre mon adresse email visible sur mon profil'}
                      {key === 'showLocation' && 'Afficher ma ville/pays sur mon profil'}
                      {key === 'showActivity' && 'Rendre mon activité publique'}
                      {key === 'allowMessages' && 'Permettre aux autres membres de m\'envoyer des messages'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handlePrivacyToggle(key as keyof typeof privacy)}
                    className={`w-14 h-8 rounded-full transition-all duration-300 cursor-none border-2 relative
                      ${value ? 'bg-[#8B0000] border-[#8B0000]' : 'bg-transparent border-[#E0E0E0]/20'}`}
                  >
                    <div className={`w-6 h-6 bg-[#FFFFFF] rounded-full absolute top-0.5 transition-all duration-300
                      ${value ? 'right-0.5' : 'left-0.5'}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <SectionSeparator />

          {/* Zone de danger */}
          <div className="bg-[#8B0000]/10 border-2 border-[#8B0000] p-8">
            <h2 className="text-2xl font-black text-[#8B0000] uppercase mb-2 flex items-center gap-3">
              <AlertTriangle size={24} />
              ZONE DE DANGER
            </h2>
            <p className="text-[#a8a8a8] text-sm mb-6">
              Actions irréversibles - utilise avec précaution
            </p>

            {!showDeleteConfirm ? (
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className="bg-transparent hover:bg-[#8B0000]/20 text-[#8B0000] font-black text-sm uppercase tracking-wider px-6 py-3 transition-all duration-300 cursor-none border-2 border-[#8B0000] flex items-center gap-2"
              >
                <Trash2 size={16} />
                SUPPRIMER MON COMPTE
              </button>
            ) : (
              <div className="bg-[#0A0A0A] border-2 border-[#8B0000] p-6">
                <div className="flex items-start gap-4 mb-6">
                  <Shield size={24} className="text-[#8B0000] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-[#FFFFFF] font-black uppercase mb-2">
                      CONFIRMER LA SUPPRESSION
                    </h3>
                    <p className="text-[#a8a8a8] text-sm leading-relaxed mb-4">
                      Cette action est <span className="text-[#8B0000] font-bold">DÉFINITIVE</span>. 
                      Toutes tes données, posts, commentaires et badges seront supprimés de manière permanente. 
                      Tu ne pourras pas récupérer ton compte.
                    </p>
                    <p className="text-[#FFFFFF] font-mono text-sm mb-4">
                      Es-tu absolument certain(e) de vouloir continuer ?
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 bg-transparent hover:bg-[#E0E0E0]/10 text-[#E0E0E0] font-black text-sm uppercase tracking-wider px-6 py-3 transition-all duration-300 cursor-none border-2 border-[#E0E0E0]/20"
                  >
                    ANNULER
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteAccount}
                    className="flex-1 bg-[#8B0000] hover:bg-[#8B0000]/80 text-[#FFFFFF] font-black text-sm uppercase tracking-wider px-6 py-3 transition-all duration-300 cursor-none border-2 border-[#8B0000] hover:border-[#FFFFFF] flex items-center justify-center gap-2"
                  >
                    <Trash2 size={16} />
                    OUI, SUPPRIMER DÉFINITIVEMENT
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Retour au profil */}
          <div className="text-center pt-8">
            <Link
              to="/profile"
              className="inline-block bg-transparent hover:bg-[#8B0000]/20 text-[#8B0000] font-black text-sm uppercase tracking-wider px-8 py-4 transition-all duration-300 cursor-none border-2 border-[#8B0000]"
            >
              RETOUR AU PROFIL
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
