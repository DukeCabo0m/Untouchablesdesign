import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { User, X, Save, Upload } from 'lucide-react';
import { GlitchText } from '@/app/components/GlitchText';
import { SectionSeparator } from '@/app/components/SectionSeparator';
import { PageHeader } from '@/app/components/PageHeader';

// Liste des pays (francophones en premier)
const countries = [
  // Pays francophones
  'France', 'Belgique', 'Suisse', 'Canada', 'Luxembourg', 'Monaco',
  'Côte d\'Ivoire', 'Cameroun', 'Sénégal', 'Madagascar', 'Mali',
  'Burkina Faso', 'Niger', 'Guinée', 'Bénin', 'Haïti', 'Tchad',
  'Burundi', 'République démocratique du Congo', 'République du Congo',
  'Rwanda', 'Togo', 'République centrafricaine', 'Gabon', 'Comores',
  'Guinée équatoriale', 'Djibouti', 'Seychelles', 'Vanuatu',
  // Autres pays
  'Afghanistan', 'Afrique du Sud', 'Albanie', 'Algérie', 'Allemagne',
  'Andorre', 'Angola', 'Antigua-et-Barbuda', 'Arabie saoudite', 'Argentine',
  'Arménie', 'Australie', 'Autriche', 'Azerbaïdjan', 'Bahamas', 'Bahreïn',
  'Bangladesh', 'Barbade', 'Biélorussie', 'Belize', 'Bhoutan', 'Birmanie',
  'Bolivie', 'Bosnie-Herzégovine', 'Botswana', 'Brésil', 'Brunei',
  'Bulgarie', 'Cambodge', 'Cap-Vert', 'Chili', 'Chine', 'Chypre',
  'Colombie', 'Corée du Nord', 'Corée du Sud', 'Costa Rica', 'Croatie',
  'Cuba', 'Danemark', 'Dominique', 'Égypte', 'Émirats arabes unis',
  'Équateur', 'Érythrée', 'Espagne', 'Estonie', 'Eswatini', 'États-Unis',
  'Éthiopie', 'Fidji', 'Finlande', 'Gambie', 'Géorgie', 'Ghana', 'Grèce',
  'Grenade', 'Guatemala', 'Guinée-Bissau', 'Guyana', 'Honduras', 'Hongrie',
  'Îles Marshall', 'Îles Salomon', 'Inde', 'Indonésie', 'Irak', 'Iran',
  'Irlande', 'Islande', 'Israël', 'Italie', 'Jamaïque', 'Japon', 'Jordanie',
  'Kazakhstan', 'Kenya', 'Kirghizistan', 'Kiribati', 'Koweït', 'Laos',
  'Lesotho', 'Lettonie', 'Liban', 'Liberia', 'Libye', 'Liechtenstein',
  'Lituanie', 'Macédoine du Nord', 'Malaisie', 'Malawi', 'Maldives',
  'Malte', 'Maroc', 'Maurice', 'Mauritanie', 'Mexique', 'Micronésie',
  'Moldavie', 'Mongolie', 'Monténégro', 'Mozambique', 'Namibie', 'Nauru',
  'Népal', 'Nicaragua', 'Nigeria', 'Norvège', 'Nouvelle-Zélande', 'Oman',
  'Ouganda', 'Ouzbékistan', 'Pakistan', 'Palaos', 'Palestine', 'Panama',
  'Papouasie-Nouvelle-Guinée', 'Paraguay', 'Pays-Bas', 'Pérou', 'Philippines',
  'Pologne', 'Portugal', 'Qatar', 'Roumanie', 'Royaume-Uni', 'Russie',
  'Saint-Christophe-et-Niévès', 'Saint-Marin', 'Saint-Vincent-et-les-Grenadines',
  'Sainte-Lucie', 'Salvador', 'Samoa', 'São Tomé-et-Principe', 'Serbie',
  'Sierra Leone', 'Singapour', 'Slovaquie', 'Slovénie', 'Somalie', 'Soudan',
  'Soudan du Sud', 'Sri Lanka', 'Suède', 'Suriname', 'Syrie', 'Tadjikistan',
  'Tanzanie', 'Thaïlande', 'Timor oriental', 'Tonga', 'Trinité-et-Tobago',
  'Tunisie', 'Turkménistan', 'Turquie', 'Tuvalu', 'Ukraine', 'Uruguay',
  'Vatican', 'Venezuela', 'Viêt Nam', 'Yémen', 'Zambie', 'Zimbabwe'
];

// Liste des départements français
const frenchDepartments = [
  { code: '01', name: 'Ain' },
  { code: '02', name: 'Aisne' },
  { code: '03', name: 'Allier' },
  { code: '04', name: 'Alpes-de-Haute-Provence' },
  { code: '05', name: 'Hautes-Alpes' },
  { code: '06', name: 'Alpes-Maritimes' },
  { code: '07', name: 'Ardèche' },
  { code: '08', name: 'Ardennes' },
  { code: '09', name: 'Ariège' },
  { code: '10', name: 'Aube' },
  { code: '11', name: 'Aude' },
  { code: '12', name: 'Aveyron' },
  { code: '13', name: 'Bouches-du-Rhône' },
  { code: '14', name: 'Calvados' },
  { code: '15', name: 'Cantal' },
  { code: '16', name: 'Charente' },
  { code: '17', name: 'Charente-Maritime' },
  { code: '18', name: 'Cher' },
  { code: '19', name: 'Corrèze' },
  { code: '2A', name: 'Corse-du-Sud' },
  { code: '2B', name: 'Haute-Corse' },
  { code: '21', name: 'Côte-d\'Or' },
  { code: '22', name: 'Côtes-d\'Armor' },
  { code: '23', name: 'Creuse' },
  { code: '24', name: 'Dordogne' },
  { code: '25', name: 'Doubs' },
  { code: '26', name: 'Drôme' },
  { code: '27', name: 'Eure' },
  { code: '28', name: 'Eure-et-Loir' },
  { code: '29', name: 'Finistère' },
  { code: '30', name: 'Gard' },
  { code: '31', name: 'Haute-Garonne' },
  { code: '32', name: 'Gers' },
  { code: '33', name: 'Gironde' },
  { code: '34', name: 'Hérault' },
  { code: '35', name: 'Ille-et-Vilaine' },
  { code: '36', name: 'Indre' },
  { code: '37', name: 'Indre-et-Loire' },
  { code: '38', name: 'Isère' },
  { code: '39', name: 'Jura' },
  { code: '40', name: 'Landes' },
  { code: '41', name: 'Loir-et-Cher' },
  { code: '42', name: 'Loire' },
  { code: '43', name: 'Haute-Loire' },
  { code: '44', name: 'Loire-Atlantique' },
  { code: '45', name: 'Loiret' },
  { code: '46', name: 'Lot' },
  { code: '47', name: 'Lot-et-Garonne' },
  { code: '48', name: 'Lozère' },
  { code: '49', name: 'Maine-et-Loire' },
  { code: '50', name: 'Manche' },
  { code: '51', name: 'Marne' },
  { code: '52', name: 'Haute-Marne' },
  { code: '53', name: 'Mayenne' },
  { code: '54', name: 'Meurthe-et-Moselle' },
  { code: '55', name: 'Meuse' },
  { code: '56', name: 'Morbihan' },
  { code: '57', name: 'Moselle' },
  { code: '58', name: 'Nièvre' },
  { code: '59', name: 'Nord' },
  { code: '60', name: 'Oise' },
  { code: '61', name: 'Orne' },
  { code: '62', name: 'Pas-de-Calais' },
  { code: '63', name: 'Puy-de-Dôme' },
  { code: '64', name: 'Pyrénées-Atlantiques' },
  { code: '65', name: 'Hautes-Pyrénées' },
  { code: '66', name: 'Pyrénées-Orientales' },
  { code: '67', name: 'Bas-Rhin' },
  { code: '68', name: 'Haut-Rhin' },
  { code: '69', name: 'Rhône' },
  { code: '70', name: 'Haute-Saône' },
  { code: '71', name: 'Saône-et-Loire' },
  { code: '72', name: 'Sarthe' },
  { code: '73', name: 'Savoie' },
  { code: '74', name: 'Haute-Savoie' },
  { code: '75', name: 'Paris' },
  { code: '76', name: 'Seine-Maritime' },
  { code: '77', name: 'Seine-et-Marne' },
  { code: '78', name: 'Yvelines' },
  { code: '79', name: 'Deux-Sèvres' },
  { code: '80', name: 'Somme' },
  { code: '81', name: 'Tarn' },
  { code: '82', name: 'Tarn-et-Garonne' },
  { code: '83', name: 'Var' },
  { code: '84', name: 'Vaucluse' },
  { code: '85', name: 'Vendée' },
  { code: '86', name: 'Vienne' },
  { code: '87', name: 'Haute-Vienne' },
  { code: '88', name: 'Vosges' },
  { code: '89', name: 'Yonne' },
  { code: '90', name: 'Territoire de Belfort' },
  { code: '91', name: 'Essonne' },
  { code: '92', name: 'Hauts-de-Seine' },
  { code: '93', name: 'Seine-Saint-Denis' },
  { code: '94', name: 'Val-de-Marne' },
  { code: '95', name: 'Val-d\'Oise' },
  { code: '971', name: 'Guadeloupe' },
  { code: '972', name: 'Martinique' },
  { code: '973', name: 'Guyane' },
  { code: '974', name: 'La Réunion' },
  { code: '976', name: 'Mayotte' }
];

export function EditProfilePage() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: 'DarkFreak666',
    bio: 'Fan de Korn depuis Follow The Leader. La scène française manque de vraie énergie brute. Korn forever 🤘',
    country: 'France',
    city: 'Paris',
    department: '75',
    facebook: 'https://facebook.com/darkfreak666',
    twitter: '@darkfreak666',
    instagram: 'darkfreak_official',
    tiktok: '@darkfreak666'
  });

  const [socialEnabled, setSocialEnabled] = useState({
    facebook: true,
    twitter: true,
    instagram: true,
    tiktok: true
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

  const handleToggleSocial = (social: 'facebook' | 'twitter' | 'instagram' | 'tiktok') => {
    setSocialEnabled({
      ...socialEnabled,
      [social]: !socialEnabled[social]
    });
    // Clear field if disabled
    if (socialEnabled[social]) {
      setFormData({
        ...formData,
        [social]: ''
      });
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
    <div className="min-h-screen">
      <PageHeader
        title="MODIFIER MON PROFIL"
        description="Personnalise ton espace et partage ta passion pour Korn avec la communauté.<br />Mets à jour tes informations, ta bio, ta localisation et tes réseaux sociaux."
        backgroundImage="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
        breadcrumbs={[
          { label: 'ACCUEIL', path: '/' },
          { label: 'PROFIL', path: '/profile' },
          { label: 'MODIFIER' }
        ]}
        glitchIntensity="high"
      />

      <div className="max-w-7xl mx-auto pt-0 pb-12">
        {/* Formulaire */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit}>
            {/* Layout en colonnes */}
            <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8">
              
              {/* COLONNE GAUCHE - Avatar */}
              <div>
                {/* Avatar */}
                <div className="bg-[#8B0000]/20 border border-[#8B0000] p-6">
                  <h2 className="text-xl font-black text-[#FFFFFF] uppercase mb-6 flex items-center gap-2">
                    <Upload size={16} className="text-[#8B0000]" />
                    PHOTO DE PROFIL
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="relative">
                      <div className="w-full aspect-square border-2 border-[#8B0000] overflow-hidden relative group">
                        <img 
                          src={avatarPreview} 
                          alt="Avatar"
                          className="w-full h-full object-cover contrast-125 brightness-90"
                        />
                        <div className="absolute inset-0 bg-[#8B0000] mix-blend-multiply opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                      </div>
                    </div>

                    <div>
                      <label className="block cursor-none">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="hidden"
                        />
                        <div className="bg-[#8B0000] hover:bg-[#FFFFFF] text-[#FFFFFF] hover:text-[#0A0A0A] font-black text-xs uppercase tracking-wider px-6 py-3 transition-all duration-300 cursor-none border border-[#8B0000] hover:border-[#FFFFFF] flex items-center justify-center gap-2 w-full">
                          <Upload size={14} />
                          CHANGER L'AVATAR
                        </div>
                      </label>
                      
                      <p className="text-[#a8a8a8] font-mono text-xs mt-4 leading-relaxed">
                        Image JPG, PNG ou GIF. Taille max : 2MB. Dimensions recommandées : 400x400px minimum.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* COLONNE DROITE - Tous les champs dans un seul cadre */}
              <div>
                <div className="border border-[#a8a8a8]/30 bg-[#0A0A0A]/95 p-8">
                  <h2 className="text-xl font-black text-[#FFFFFF] uppercase mb-8 flex items-center gap-2">
                    <User size={16} className="text-[#8B0000]" />
                    INFORMATIONS DU PROFIL
                  </h2>

                  <div className="space-y-6">
                    {/* Pseudonyme */}
                    <div>
                      <label htmlFor="username" className="block font-mono text-xs text-[#8B0000] uppercase mb-2">
                        Pseudonyme *
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className={`w-full bg-black border ${errors.username ? 'border-[#8B0000]' : 'border-[#E0E0E0]/20'} px-4 py-3 text-[#FFFFFF] font-mono text-sm
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
                        Bio ({formData.bio.length}/500)
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows={4}
                        maxLength={500}
                        className={`w-full bg-black border ${errors.bio ? 'border-[#8B0000]' : 'border-[#E0E0E0]/20'} px-4 py-3 text-[#FFFFFF] font-mono text-sm
                          focus:border-[#8B0000] focus:outline-none transition-colors cursor-none
                          hover:border-[#8B0000]/50 resize-none`}
                        placeholder="Parle-nous de toi, de ta passion pour Korn..."
                      />
                      {errors.bio && (
                        <p className="text-[#8B0000] font-mono text-xs mt-2">⚠ {errors.bio}</p>
                      )}
                    </div>

                    {/* Séparateur visuel */}
                    <div className="h-[1px] bg-[#FFFFFF]/10 my-6" />

                    {/* Pays */}
                    <div>
                      <label htmlFor="country" className="block font-mono text-xs text-[#8B0000] uppercase mb-2">
                        Pays *
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            country: e.target.value,
                            // Reset department if country changes from France
                            department: e.target.value === 'France' ? formData.department : ''
                          });
                        }}
                        required
                        className="w-full bg-black border border-[#E0E0E0]/20 px-4 py-3 text-[#FFFFFF] font-mono text-sm
                          focus:border-[#8B0000] focus:outline-none transition-colors cursor-none
                          hover:border-[#8B0000]/50"
                      >
                        {countries.map((country) => (
                          <option key={country} value={country} className="bg-black text-[#FFFFFF]">
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Ville & Département sur la même ligne */}
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_180px] gap-4">
                      <div>
                        <label htmlFor="city" className="block font-mono text-xs text-[#8B0000] uppercase mb-2">
                          Ville
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full bg-black border border-[#E0E0E0]/20 px-4 py-3 text-[#FFFFFF] font-mono text-sm
                            focus:border-[#8B0000] focus:outline-none transition-colors cursor-none
                            hover:border-[#8B0000]/50"
                          placeholder="Ville"
                        />
                      </div>

                      <div>
                        <label htmlFor="department" className="block font-mono text-xs text-[#8B0000] uppercase mb-2">
                          Département
                        </label>
                        <select
                          id="department"
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                          disabled={formData.country !== 'France'}
                          className={`w-full bg-black border border-[#E0E0E0]/20 px-4 py-3 text-[#FFFFFF] font-mono text-sm
                            focus:border-[#8B0000] focus:outline-none transition-colors cursor-none
                            hover:border-[#8B0000]/50 ${formData.country !== 'France' ? 'opacity-40 cursor-not-allowed' : ''}`}
                        >
                          <option value="" className="bg-black text-[#FFFFFF]">-</option>
                          {frenchDepartments.map((dept) => (
                            <option key={dept.code} value={dept.code} className="bg-black text-[#FFFFFF]">
                              {dept.code} - {dept.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Séparateur visuel */}
                    <div className="h-[1px] bg-[#FFFFFF]/10 my-6" />

                    {/* Titre section réseaux sociaux */}
                    <div className="mb-4">
                      <h3 className="font-black text-sm text-[#FFFFFF] uppercase tracking-wider">
                        Réseaux sociaux
                      </h3>
                      <p className="text-[#a8a8a8] font-mono text-xs mt-1">
                        Active les réseaux que tu souhaites afficher sur ton profil
                      </p>
                    </div>

                    {/* Facebook */}
                    <div>
                      <label htmlFor="facebook" className="block font-mono text-xs text-[#8B0000] uppercase mb-2">
                        Facebook
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="url"
                          id="facebook"
                          name="facebook"
                          value={formData.facebook}
                          onChange={handleChange}
                          disabled={!socialEnabled.facebook}
                          className={`flex-1 bg-black border border-[#E0E0E0]/20 px-4 py-3 text-[#FFFFFF] font-mono text-sm
                            focus:border-[#8B0000] focus:outline-none transition-colors cursor-none
                            hover:border-[#8B0000]/50 ${!socialEnabled.facebook ? 'opacity-40 cursor-not-allowed' : ''}`}
                          placeholder="@username"
                        />
                        <button
                          type="button"
                          onClick={() => handleToggleSocial('facebook')}
                          className={`relative w-12 h-6 rounded-full transition-colors cursor-none flex-shrink-0 ${
                            socialEnabled.facebook ? 'bg-[#8B0000]' : 'bg-[#E0E0E0]/20'
                          }`}
                        >
                          <div
                            className={`absolute top-1 left-1 w-4 h-4 bg-[#FFFFFF] rounded-full transition-transform ${
                              socialEnabled.facebook ? 'translate-x-6' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Twitter / X */}
                    <div>
                      <label htmlFor="twitter" className="block font-mono text-xs text-[#8B0000] uppercase mb-2">
                        Twitter / X
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          id="twitter"
                          name="twitter"
                          value={formData.twitter}
                          onChange={handleChange}
                          disabled={!socialEnabled.twitter}
                          className={`flex-1 bg-black border border-[#E0E0E0]/20 px-4 py-3 text-[#FFFFFF] font-mono text-sm
                            focus:border-[#8B0000] focus:outline-none transition-colors cursor-none
                            hover:border-[#8B0000]/50 ${!socialEnabled.twitter ? 'opacity-40 cursor-not-allowed' : ''}`}
                          placeholder="@username"
                        />
                        <button
                          type="button"
                          onClick={() => handleToggleSocial('twitter')}
                          className={`relative w-12 h-6 rounded-full transition-colors cursor-none flex-shrink-0 ${
                            socialEnabled.twitter ? 'bg-[#8B0000]' : 'bg-[#E0E0E0]/20'
                          }`}
                        >
                          <div
                            className={`absolute top-1 left-1 w-4 h-4 bg-[#FFFFFF] rounded-full transition-transform ${
                              socialEnabled.twitter ? 'translate-x-6' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Instagram */}
                    <div>
                      <label htmlFor="instagram" className="block font-mono text-xs text-[#8B0000] uppercase mb-2">
                        Instagram
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          id="instagram"
                          name="instagram"
                          value={formData.instagram}
                          onChange={handleChange}
                          disabled={!socialEnabled.instagram}
                          className={`flex-1 bg-black border border-[#E0E0E0]/20 px-4 py-3 text-[#FFFFFF] font-mono text-sm
                            focus:border-[#8B0000] focus:outline-none transition-colors cursor-none
                            hover:border-[#8B0000]/50 ${!socialEnabled.instagram ? 'opacity-40 cursor-not-allowed' : ''}`}
                          placeholder="@username"
                        />
                        <button
                          type="button"
                          onClick={() => handleToggleSocial('instagram')}
                          className={`relative w-12 h-6 rounded-full transition-colors cursor-none flex-shrink-0 ${
                            socialEnabled.instagram ? 'bg-[#8B0000]' : 'bg-[#E0E0E0]/20'
                          }`}
                        >
                          <div
                            className={`absolute top-1 left-1 w-4 h-4 bg-[#FFFFFF] rounded-full transition-transform ${
                              socialEnabled.instagram ? 'translate-x-6' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* TikTok */}
                    <div>
                      <label htmlFor="tiktok" className="block font-mono text-xs text-[#8B0000] uppercase mb-2">
                        TikTok
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          id="tiktok"
                          name="tiktok"
                          value={formData.tiktok}
                          onChange={handleChange}
                          disabled={!socialEnabled.tiktok}
                          className={`flex-1 bg-black border border-[#E0E0E0]/20 px-4 py-3 text-[#FFFFFF] font-mono text-sm
                            focus:border-[#8B0000] focus:outline-none transition-colors cursor-none
                            hover:border-[#8B0000]/50 ${!socialEnabled.tiktok ? 'opacity-40 cursor-not-allowed' : ''}`}
                          placeholder="@username"
                        />
                        <button
                          type="button"
                          onClick={() => handleToggleSocial('tiktok')}
                          className={`relative w-12 h-6 rounded-full transition-colors cursor-none flex-shrink-0 ${
                            socialEnabled.tiktok ? 'bg-[#8B0000]' : 'bg-[#E0E0E0]/20'
                          }`}
                        >
                          <div
                            className={`absolute top-1 left-1 w-4 h-4 bg-[#FFFFFF] rounded-full transition-transform ${
                              socialEnabled.tiktok ? 'translate-x-6' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Séparateur visuel avant actions */}
                    <div className="h-[1px] bg-[#FFFFFF]/10 my-8" />

                    {/* Actions */}
                    <div className="flex flex-col lg:flex-row gap-4 justify-between items-center pt-2">
                      <Link
                        to="/profile"
                        className="w-full lg:w-auto bg-transparent hover:bg-[#8B0000]/20 text-[#8B0000] font-black text-xs uppercase tracking-wider px-8 py-4 transition-all duration-300 cursor-none border-2 border-[#8B0000] inline-flex items-center justify-center gap-2"
                      >
                        <X size={14} />
                        ANNULER
                      </Link>

                      <button
                        type="submit"
                        className="w-full lg:w-auto bg-[#8B0000] hover:bg-[#FFFFFF] text-[#FFFFFF] hover:text-[#0A0A0A] font-black text-xs uppercase tracking-wider px-8 py-4 transition-all duration-300 cursor-none border-2 border-[#8B0000] hover:border-[#FFFFFF] flex items-center justify-center gap-2"
                      >
                        <Save size={14} />
                        ENREGISTRER LES MODIFICATIONS
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}