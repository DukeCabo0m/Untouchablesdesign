import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { GlitchText } from '@/app/components/GlitchText';
import { SectionSeparator } from '@/app/components/SectionSeparator';
import { PageHeader } from '@/app/components/PageHeader';
import { Mail, Lock, Bell, Eye, AlertTriangle, Trash2, Shield, Save, X } from 'lucide-react';
import { useAuth } from '@/app/contexts/AuthContext';
import { usersApi } from '@/app/utils/api';
import { useAlert } from '@/app/contexts/AlertContext';

export function SettingsPage() {
  const { userId, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const [emailData, setEmailData] = useState({
    currentEmail: '',
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

  // Load user data from backend
  useEffect(() => {
    async function loadUserSettings() {
      if (!isAuthenticated || !userId) {
        console.log('[SettingsPage] User not authenticated, redirecting to login');
        navigate('/login');
        return;
      }

      try {
        setIsLoading(true);
        console.log(`[SettingsPage] Loading user settings for userId: ${userId}`);
        
        const user = await usersApi.getById(userId);
        
        if (!user) {
          console.error('[SettingsPage] User not found');
          navigate('/login');
          return;
        }
        
        console.log('[SettingsPage] Loaded user:', user);
        setCurrentUser(user);
        
        // Set email from user data
        setEmailData({
          currentEmail: user.email || '',
          newEmail: '',
          confirmEmail: ''
        });

        // Set notifications preferences if they exist
        if (user.preferences?.notifications) {
          setNotifications(user.preferences.notifications);
        }

        // Set privacy preferences if they exist
        if (user.preferences?.privacy) {
          setPrivacy(user.preferences.privacy);
        }
      } catch (err) {
        console.error('[SettingsPage] Failed to load user settings:', err);
        showAlert('Impossible de charger les paramètres', 'error');
      } finally {
        setIsLoading(false);
      }
    }
    loadUserSettings();
  }, [userId, isAuthenticated, navigate, showAlert]);

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
    showAlert('Email mis à jour avec succès', 'success');
    // Reset form
    setEmailData({
      currentEmail: emailData.newEmail,
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
    showAlert('Mot de passe mis à jour avec succès', 'success');
    // Reset form
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleDeleteAccount = () => {
    console.log('Suppression du compte...');
    showAlert('Compte supprimé avec succès', 'success');
    // En production, rediriger vers une page de confirmation finale
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-2 border-[#8B0000] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-[#a8a8a8] font-mono text-sm uppercase">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <PageHeader
        title="PARAMÈTRES DU COMPTE"
        description="Gère ton compte, ta sécurité, tes notifications et ta confidentialité.<br />Personnalise tes préférences pour une expérience optimale sur Untouchables."
        backgroundImage="https://images.unsplash.com/photo-1721623777765-1381ba32859c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwY29uY2VydCUyMHN0YWdlJTIwbGlnaHRzfGVufDF8fHx8MTc2OTE3Nzk1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        breadcrumbs={[
          { label: 'ACCUEIL', path: '/' },
          { label: 'PROFIL', path: '/profile' },
          { label: 'PARAMÈTRES' }
        ]}
        glitchIntensity="high"
      />

      <div className="max-w-7xl mx-auto pt-0 pb-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Layout en 2 colonnes 1/3 - 2/3 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* COLONNE GAUCHE - 1/3 */}
            <div className="lg:col-span-1 space-y-8">
              
              {/* Modifier l'email */}
              <div className="bg-[#8B0000]/20 border border-[#8B0000] p-6">
                <h2 className="text-xl font-black text-[#FFFFFF] uppercase mb-2 flex items-center gap-2">
                  <Mail size={16} className="text-[#8B0000]" />
                  ADRESSE EMAIL
                </h2>
                <p className="text-[#a8a8a8] font-mono text-xs mb-6">
                  Email actuel : <span className="text-[#FFFFFF]">{emailData.currentEmail}</span>
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
                      className={`w-full bg-black border ${errors.newEmail ? 'border-[#8B0000]' : 'border-[#E0E0E0]/20'} px-4 py-3 text-[#FFFFFF] font-mono text-sm
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
                      className={`w-full bg-black border ${errors.confirmEmail ? 'border-[#8B0000]' : 'border-[#E0E0E0]/20'} px-4 py-3 text-[#FFFFFF] font-mono text-sm
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
                    className="w-full bg-[#8B0000] hover:bg-[#FFFFFF] text-[#FFFFFF] hover:text-[#0A0A0A] font-black text-xs uppercase tracking-wider px-6 py-3 transition-all duration-300 cursor-none border border-[#8B0000] hover:border-[#FFFFFF] flex items-center justify-center gap-2"
                  >
                    <Save size={14} />
                    METTRE À JOUR L'EMAIL
                  </button>
                </form>
              </div>

              {/* Modifier le mot de passe */}
              <div className="bg-[#8B0000]/20 border border-[#8B0000] p-6">
                <h2 className="text-xl font-black text-[#FFFFFF] uppercase mb-6 flex items-center gap-2">
                  <Lock size={16} className="text-[#8B0000]" />
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
                      className="w-full bg-black border border-[#E0E0E0]/20 px-4 py-3 text-[#FFFFFF] font-mono text-sm
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
                      className={`w-full bg-black border ${errors.newPassword ? 'border-[#8B0000]' : 'border-[#E0E0E0]/20'} px-4 py-3 text-[#FFFFFF] font-mono text-sm
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
                      className={`w-full bg-black border ${errors.confirmPassword ? 'border-[#8B0000]' : 'border-[#E0E0E0]/20'} px-4 py-3 text-[#FFFFFF] font-mono text-sm
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
                    className="w-full bg-[#8B0000] hover:bg-[#FFFFFF] text-[#FFFFFF] hover:text-[#0A0A0A] font-black text-xs uppercase tracking-wider px-6 py-3 transition-all duration-300 cursor-none border border-[#8B0000] hover:border-[#FFFFFF] flex items-center justify-center gap-2"
                  >
                    <Save size={14} />
                    METTRE À JOUR LE MOT DE PASSE
                  </button>
                </form>
              </div>

            </div>

            {/* COLONNE DROITE - 2/3 */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Notifications */}
              <div className="border border-[#a8a8a8]/30 bg-[#0A0A0A]/95 p-6">
                <h2 className="text-xl font-black text-[#FFFFFF] uppercase mb-6 flex items-center gap-2">
                  <Bell size={16} className="text-[#8B0000]" />
                  NOTIFICATIONS
                </h2>

                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-3 border border-[#E0E0E0]/20 hover:border-[#8B0000]/50 transition-colors">
                      <div className="flex-1 pr-4">
                        <h3 className="text-[#FFFFFF] font-black uppercase text-xs mb-1">
                          {key === 'newsletter' && 'Newsletter Untouchables'}
                          {key === 'newPosts' && 'Nouveaux articles'}
                          {key === 'comments' && 'Réponses à mes commentaires'}
                          {key === 'mentions' && 'Mentions'}
                          {key === 'likes' && 'Likes sur mes posts'}
                          {key === 'events' && 'Événements et concerts'}
                        </h3>
                        <p className="text-[#a8a8a8] text-xs font-mono">
                          {key === 'newsletter' && 'Recevoir les actualités par email'}
                          {key === 'newPosts' && 'Notification nouvel article'}
                          {key === 'comments' && 'Recevoir les réponses'}
                          {key === 'mentions' && 'Quand quelqu\'un te mentionne'}
                          {key === 'likes' && 'Quand quelqu\'un aime tes posts'}
                          {key === 'events' && 'Annonces concerts'}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleNotificationToggle(key as keyof typeof notifications)}
                        className={`relative w-12 h-6 rounded-full transition-colors cursor-none flex-shrink-0 ${
                          value ? 'bg-[#8B0000]' : 'bg-[#E0E0E0]/20'
                        }`}
                      >
                        <div
                          className={`absolute top-1 left-1 w-4 h-4 bg-[#FFFFFF] rounded-full transition-transform ${
                            value ? 'translate-x-6' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Confidentialité */}
              <div className="border border-[#a8a8a8]/30 bg-[#0A0A0A]/95 p-6">
                <h2 className="text-xl font-black text-[#FFFFFF] uppercase mb-6 flex items-center gap-2">
                  <Eye size={16} className="text-[#8B0000]" />
                  CONFIDENTIALITÉ
                </h2>

                <div className="space-y-4">
                  {Object.entries(privacy).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-3 border border-[#E0E0E0]/20 hover:border-[#8B0000]/50 transition-colors">
                      <div className="flex-1 pr-4">
                        <h3 className="text-[#FFFFFF] font-black uppercase text-xs mb-1">
                          {key === 'showEmail' && 'Afficher mon email'}
                          {key === 'showLocation' && 'Afficher ma localisation'}
                          {key === 'showActivity' && 'Afficher mon activité'}
                          {key === 'allowMessages' && 'Autoriser les messages privés'}
                        </h3>
                        <p className="text-[#a8a8a8] text-xs font-mono">
                          {key === 'showEmail' && 'Email visible sur mon profil'}
                          {key === 'showLocation' && 'Ville/pays sur mon profil'}
                          {key === 'showActivity' && 'Activité publique'}
                          {key === 'allowMessages' && 'Messages des membres'}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handlePrivacyToggle(key as keyof typeof privacy)}
                        className={`relative w-12 h-6 rounded-full transition-colors cursor-none flex-shrink-0 ${
                          value ? 'bg-[#8B0000]' : 'bg-[#E0E0E0]/20'
                        }`}
                      >
                        <div
                          className={`absolute top-1 left-1 w-4 h-4 bg-[#FFFFFF] rounded-full transition-transform ${
                            value ? 'translate-x-6' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Zone de danger - Pleine largeur en dessous */}
          <div className="mt-8">
            <div className="bg-black border-2 border-[#8B0000] p-6">
              <h2 className="text-xl font-black text-[#8B0000] uppercase mb-2 flex items-center gap-2">
                <AlertTriangle size={16} />
                ZONE DE DANGER
              </h2>
              <p className="text-[#a8a8a8] font-mono text-xs mb-6">
                Actions irréversibles - utilise avec précaution
              </p>

              {!showDeleteConfirm ? (
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="bg-transparent hover:bg-[#8B0000]/20 text-[#8B0000] font-black text-xs uppercase tracking-wider px-6 py-3 transition-all duration-300 cursor-none border-2 border-[#8B0000] flex items-center gap-2"
                >
                  <Trash2 size={14} />
                  SUPPRIMER MON COMPTE
                </button>
              ) : (
                <div className="bg-[#0A0A0A] border-2 border-[#8B0000] p-6">
                  <div className="flex items-start gap-4 mb-6">
                    <Shield size={20} className="text-[#8B0000] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-[#FFFFFF] font-black uppercase text-sm mb-2">
                        CONFIRMER LA SUPPRESSION
                      </h3>
                      <p className="text-[#a8a8a8] font-mono text-xs leading-relaxed mb-4">
                        Cette action est <span className="text-[#8B0000] font-bold">DÉFINITIVE</span>. 
                        Toutes tes données, posts, commentaires et badges seront supprimés de manière permanente. 
                        Tu ne pourras pas récupérer ton compte.
                      </p>
                      <p className="text-[#FFFFFF] font-mono text-xs mb-4">
                        Es-tu absolument certain(e) de vouloir continuer ?
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row gap-4">
                    <button
                      type="button"
                      onClick={() => setShowDeleteConfirm(false)}
                      className="flex-1 bg-transparent hover:bg-[#E0E0E0]/10 text-[#E0E0E0] font-black text-xs uppercase tracking-wider px-6 py-3 transition-all duration-300 cursor-none border-2 border-[#E0E0E0]/20 flex items-center justify-center gap-2"
                    >
                      <X size={14} />
                      ANNULER
                    </button>
                    <button
                      type="button"
                      onClick={handleDeleteAccount}
                      className="flex-1 bg-[#8B0000] hover:bg-[#8B0000]/80 text-[#FFFFFF] font-black text-xs uppercase tracking-wider px-6 py-3 transition-all duration-300 cursor-none border-2 border-[#8B0000] hover:border-[#FFFFFF] flex items-center justify-center gap-2"
                    >
                      <Trash2 size={14} />
                      OUI, SUPPRIMER DÉFINITIVEMENT
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}