import { motion } from 'motion/react';
import { GlitchText } from '@/app/components/GlitchText';
import { SectionSeparator } from '@/app/components/SectionSeparator';
import { 
  User, 
  MapPin, 
  Link as LinkIcon, 
  FileText,
  Upload,
  Save,
  X,
  Heart
} from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Albums disponibles pour la sélection
const availableAlbums = [
  { id: 1, title: 'Korn', year: '1994' },
  { id: 2, title: 'Life Is Peachy', year: '1996' },
  { id: 3, title: 'Follow The Leader', year: '1998' },
  { id: 4, title: 'Issues', year: '1999' },
  { id: 5, title: 'Untouchables', year: '2002' },
  { id: 6, title: 'Take a Look in the Mirror', year: '2003' },
  { id: 7, title: 'See You on the Other Side', year: '2005' },
  { id: 8, title: 'Untitled album', year: '2007' },
  { id: 9, title: 'Korn III: Remember Who You Are', year: '2010' },
  { id: 10, title: 'The Path of Totality', year: '2011' },
  { id: 11, title: 'The Paradigm Shift', year: '2013' },
  { id: 12, title: 'The Serenity of Suffering', year: '2016' },
  { id: 13, title: 'The Nothing', year: '2019' },
  { id: 14, title: 'Requiem', year: '2022' },
];

export function EditProfilePage() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: 'DarkFreak666',
    bio: 'Fan de Korn depuis Follow The Leader. La scène française manque de vraie énergie brute. Korn forever 🤘',
    location: 'Paris, France',
    website: 'https://darkfreakmusic.com',
    twitter: '@darkfreak666',
    instagram: 'darkfreak_official',
    favoriteAlbums: [5, 4, 3] // IDs des albums favoris
  });

  const [avatarPreview, setAvatarPreview] = useState('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleFavoriteAlbum = (albumId: number) => {
    setFormData(prev => {
      const currentFavorites = prev.favoriteAlbums;
      
      if (currentFavorites.includes(albumId)) {
        // Retirer l'album
        return {
          ...prev,
          favoriteAlbums: currentFavorites.filter(id => id !== albumId)
        };
      } else {
        // Ajouter l'album (max 3)
        if (currentFavorites.length >= 3) {
          return prev; // Ne rien faire si déjà 3 albums
        }
        return {
          ...prev,
          favoriteAlbums: [...currentFavorites, albumId]
        };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation basique
    const newErrors: Record<string, string> = {};
    
    if (formData.username.length < 3) {
      newErrors.username = 'Le pseudonyme doit contenir au moins 3 caractères';
    }
    
    if (formData.bio.length > 500) {
      newErrors.bio = 'La bio ne peut pas dépasser 500 caractères';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Mock submission - en production, envoyer à l'API
    console.log('Profil mis à jour:', formData);
    
    // Rediriger vers le profil
    navigate('/profile');
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
              MODIFICATION
            </span>
          </div>

          <h1
            className="text-5xl lg:text-7xl font-black text-[#FFFFFF] tracking-tighter uppercase mb-8 leading-tight"
            style={{ fontFamily: 'Arial Black, sans-serif', letterSpacing: '-0.05em' }}
          >
            <GlitchText glitchIntensity="high">MODIFIER MON PROFIL</GlitchText>
          </h1>

          <p className="text-xl text-[#a8a8a8] leading-loose">
            Personnalise ton espace Untouchables
          </p>
        </motion.div>

        {/* Formulaire */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Avatar */}
            <div className="bg-[#0A0A0A] border-2 border-[#8B0000]/30 p-8">
              <h2 className="text-2xl font-black text-[#FFFFFF] uppercase mb-6">
                PHOTO DE PROFIL
              </h2>
              
              <div className="flex flex-col lg:flex-row items-start gap-8">
                <div className="relative flex-shrink-0">
                  <div className="w-40 h-40 border-4 border-[#8B0000] overflow-hidden relative group">
                    <img 
                      src={avatarPreview} 
                      alt="Avatar"
                      className="w-full h-full object-cover grayscale contrast-125 brightness-90"
                    />
                    <div className="absolute inset-0 bg-[#8B0000] mix-blend-multiply opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                  </div>
                </div>

                <div className="flex-1">
                  <label className="block cursor-none">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                    <div className="bg-[#8B0000] hover:bg-[#8B0000]/80 text-[#FFFFFF] font-black text-sm uppercase tracking-wider px-6 py-4 transition-all duration-300 cursor-none border-2 border-[#8B0000] hover:border-[#FFFFFF] inline-flex items-center gap-2">
                      <Upload size={16} />
                      CHANGER L'AVATAR
                    </div>
                  </label>
                  
                  <p className="text-[#a8a8a8] text-sm mt-4 leading-relaxed">
                    Image JPG, PNG ou GIF. Taille max : 2MB.<br />
                    Dimensions recommandées : 400x400px minimum.
                  </p>
                </div>
              </div>
            </div>

            <SectionSeparator />

            {/* Informations générales */}
            <div className="bg-[#0A0A0A] border-2 border-[#8B0000]/30 p-8">
              <h2 className="text-2xl font-black text-[#FFFFFF] uppercase mb-6">
                INFORMATIONS GÉNÉRALES
              </h2>

              <div className="space-y-6">
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

                {/* Bio */}
                <div>
                  <label htmlFor="bio" className="block font-mono text-xs text-[#8B0000] uppercase mb-2">
                    <FileText size={14} className="inline mr-2" />
                    Bio ({formData.bio.length}/500)
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    maxLength={500}
                    className={`w-full bg-[#0A0A0A] border-2 ${errors.bio ? 'border-[#8B0000]' : 'border-[#E0E0E0]/20'} px-4 py-3 text-[#FFFFFF] font-mono text-sm
                      focus:border-[#8B0000] focus:outline-none transition-colors cursor-none
                      hover:border-[#8B0000]/50 resize-none`}
                    placeholder="Parle-nous de toi, de ta passion pour Korn..."
                  />
                  {errors.bio && (
                    <p className="text-[#8B0000] font-mono text-xs mt-2">⚠ {errors.bio}</p>
                  )}
                </div>

                {/* Localisation */}
                <div>
                  <label htmlFor="location" className="block font-mono text-xs text-[#8B0000] uppercase mb-2">
                    <MapPin size={14} className="inline mr-2" />
                    Localisation
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full bg-[#0A0A0A] border-2 border-[#E0E0E0]/20 px-4 py-3 text-[#FFFFFF] font-mono text-sm
                      focus:border-[#8B0000] focus:outline-none transition-colors cursor-none
                      hover:border-[#8B0000]/50"
                    placeholder="Ville, Pays"
                  />
                </div>

                {/* Site web */}
                <div>
                  <label htmlFor="website" className="block font-mono text-xs text-[#8B0000] uppercase mb-2">
                    <LinkIcon size={14} className="inline mr-2" />
                    Site web
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full bg-[#0A0A0A] border-2 border-[#E0E0E0]/20 px-4 py-3 text-[#FFFFFF] font-mono text-sm
                      focus:border-[#8B0000] focus:outline-none transition-colors cursor-none
                      hover:border-[#8B0000]/50"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>

            <SectionSeparator />

            {/* Réseaux sociaux */}
            <div className="bg-[#0A0A0A] border-2 border-[#8B0000]/30 p-8">
              <h2 className="text-2xl font-black text-[#FFFFFF] uppercase mb-6">
                RÉSEAUX SOCIAUX
              </h2>

              <div className="space-y-6">
                {/* Twitter/X */}
                <div>
                  <label htmlFor="twitter" className="block font-mono text-xs text-[#8B0000] uppercase mb-2">
                    Twitter / X
                  </label>
                  <input
                    type="text"
                    id="twitter"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                    className="w-full bg-[#0A0A0A] border-2 border-[#E0E0E0]/20 px-4 py-3 text-[#FFFFFF] font-mono text-sm
                      focus:border-[#8B0000] focus:outline-none transition-colors cursor-none
                      hover:border-[#8B0000]/50"
                    placeholder="@username"
                  />
                </div>

                {/* Instagram */}
                <div>
                  <label htmlFor="instagram" className="block font-mono text-xs text-[#8B0000] uppercase mb-2">
                    Instagram
                  </label>
                  <input
                    type="text"
                    id="instagram"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    className="w-full bg-[#0A0A0A] border-2 border-[#E0E0E0]/20 px-4 py-3 text-[#FFFFFF] font-mono text-sm
                      focus:border-[#8B0000] focus:outline-none transition-colors cursor-none
                      hover:border-[#8B0000]/50"
                    placeholder="username"
                  />
                </div>
              </div>
            </div>

            <SectionSeparator />

            {/* Albums favoris */}
            <div className="bg-[#0A0A0A] border-2 border-[#8B0000]/30 p-8">
              <h2 className="text-2xl font-black text-[#FFFFFF] uppercase mb-2">
                ALBUMS FAVORIS
              </h2>
              <p className="text-[#a8a8a8] text-sm mb-6">
                Sélectionne jusqu'à 3 albums ({formData.favoriteAlbums.length}/3)
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableAlbums.map((album) => {
                  const isSelected = formData.favoriteAlbums.includes(album.id);
                  
                  return (
                    <button
                      key={album.id}
                      type="button"
                      onClick={() => toggleFavoriteAlbum(album.id)}
                      className={`p-4 border-2 transition-all duration-300 cursor-none text-left
                        ${isSelected 
                          ? 'bg-[#8B0000]/20 border-[#8B0000]' 
                          : 'bg-transparent border-[#E0E0E0]/20 hover:border-[#8B0000]/50'
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className={`font-black uppercase mb-1 ${isSelected ? 'text-[#8B0000]' : 'text-[#FFFFFF]'}`}>
                            {album.title}
                          </h3>
                          <p className="font-mono text-xs text-[#a8a8a8]">{album.year}</p>
                        </div>
                        {isSelected && <Heart className="text-[#8B0000]" size={20} fill="#8B0000" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-center pt-8 border-t-2 border-[#8B0000]/30">
              <Link
                to="/profile"
                className="w-full lg:w-auto bg-transparent hover:bg-[#8B0000]/20 text-[#8B0000] font-black text-sm uppercase tracking-wider px-8 py-4 transition-all duration-300 cursor-none border-2 border-[#8B0000] inline-flex items-center justify-center gap-2"
              >
                <X size={16} />
                ANNULER
              </Link>

              <button
                type="submit"
                className="w-full lg:w-auto bg-[#8B0000] hover:bg-[#8B0000]/80 text-[#FFFFFF] font-black text-sm uppercase tracking-wider px-8 py-4 transition-all duration-300 cursor-none border-2 border-[#8B0000] hover:border-[#FFFFFF] flex items-center justify-center gap-2"
              >
                <Save size={16} />
                ENREGISTRER LES MODIFICATIONS
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
