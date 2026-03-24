import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { PageHeader } from '@/app/components/PageHeader';
import { Upload, Image, FileText, Camera, Palette, Check, AlertCircle } from 'lucide-react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

const CONTRIBUTION_TYPES = [
  {
    id: 'tattoo',
    name: 'Tattoo',
    icon: Palette,
    description: 'Partage ton tatouage Korn',
    legend: 'Tattoo',
  },
  {
    id: 'collection',
    name: 'Collection',
    icon: Image,
    description: 'Vinyles, CDs, merchandising rare',
    legend: 'Collection',
  },
  {
    id: 'fanart',
    name: 'Fan-art',
    icon: Palette,
    description: 'Dessins, illustrations, créations',
    legend: 'Fan-art',
  },
  {
    id: 'photo',
    name: 'Photo de Concert',
    icon: Camera,
    description: 'Tes meilleurs clichés live',
    legend: 'Concert',
  },
];

export function ContributeContentPage() {
  const [selectedType, setSelectedType] = useState('');
  const [formData, setFormData] = useState({
    caption: '',
    subtitle: '',
    image: '',
    tags: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedType) {
      alert('Veuillez sélectionner un type de contribution');
      return;
    }

    if (!formData.caption || !formData.image) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setIsSubmitting(true);

    // Note: User must be logged in to submit contributions
    // For now, we'll show an alert. In production, this would check authentication.
    const token = localStorage.getItem('session_token');
    if (!token) {
      alert('Vous devez être connecté pour soumettre une contribution. Redirection vers la page de connexion...');
      setIsSubmitting(false);
      window.location.href = '/login';
      return;
    }

    try {
      const selectedTypeData = CONTRIBUTION_TYPES.find(t => t.id === selectedType);
      const tagsArray = formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [];

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d462d5d8/contributions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            type: selectedType,
            image: formData.image,
            caption: formData.caption,
            legend: selectedTypeData?.legend || selectedType,
            subtitle: formData.subtitle,
            tags: tagsArray,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Contribution created:', data);
        setSubmitSuccess(true);
      } else {
        const errorText = await response.text();
        console.error('Contribution error response:', errorText);
        if (response.status === 401) {
          alert('Session expirée. Veuillez vous reconnecter.');
          window.location.href = '/login';
        } else {
          try {
            const error = JSON.parse(errorText);
            alert(error.error || 'Erreur lors de la soumission de la contribution');
          } catch {
            alert('Erreur lors de la soumission de la contribution');
          }
        }
      }
    } catch (error) {
      console.error('Error submitting contribution:', error);
      alert('Erreur de connexion au serveur. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const selectedTypeData = CONTRIBUTION_TYPES.find(t => t.id === selectedType);

  if (submitSuccess) {
    return (
      <div className="min-h-screen">
        <PageHeader
          title="Contribution Soumise"
          description="Merci pour ta contribution !"
          backgroundImage="https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWNjZXNzJTIwZGFya3xlbnwxfHx8fDE3NjkxOTMwNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
          breadcrumbs={[
            { label: 'ACCUEIL', path: '/' },
            { label: 'FANZINE', path: '/fanzine' },
            { label: 'CONTRIBUTION' }
          ]}
          glitchIntensity="low"
        />

        <div className="px-4 pb-24 bg-[#0A0A0A]">
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#0A0A0A] border-2 border-[#8B0000] p-8 text-center">
              <div className="w-16 h-16 bg-[#8B0000] rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={32} className="text-[#F0F0F0]" />
              </div>
              
              <h2 className="font-black text-2xl text-[#F0F0F0] uppercase mb-4">
                Contribution envoyée !
              </h2>
              
              <p className="font-mono text-sm text-[#F0F0F0]/70 mb-6 leading-relaxed">
                Ton contenu a été envoyé à l'équipe de modération. Tu recevras une notification par email une fois qu'il sera approuvé et publié sur le site.
              </p>

              <div className="bg-[#8B0000]/10 border border-[#8B0000]/30 p-6 mb-8">
                <h3 className="font-black text-xs text-[#8B0000] uppercase mb-4">
                  Prochaines Étapes :
                </h3>
                <ul className="space-y-2 text-left font-mono text-xs text-[#F0F0F0]/70">
                  <li className="flex items-start gap-2">
                    <span className="text-[#8B0000] mt-1">▸</span>
                    <span>Notre équipe examine ta contribution (généralement sous 48h)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8B0000] mt-1">▸</span>
                    <span>Tu reçois un email de confirmation une fois approuvé</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8B0000] mt-1">▸</span>
                    <span>Ton contenu apparaît sur le site et peut être publié dans le fanzine</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/contributions"
                className="inline-block px-6 py-3 bg-[#8B0000] text-[#F0F0F0] font-black text-sm uppercase hover:bg-transparent hover:border-2 hover:border-[#8B0000] transition-all"
              >
                Voir toutes les contributions
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <PageHeader
        title="Proposer un Contenu"
        description="Partage ta passion pour Korn avec la communauté.<br />Tattoos, collections, fan-arts, photos de concerts : on veut tout voir !"
        backgroundImage="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGNyZWF0aXZlJTIwZGFya3xlbnwxfHx8fDE3NjkxOTMwNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
        breadcrumbs={[
          { label: 'ACCUEIL', path: '/' },
          { label: 'FANZINE', path: '/fanzine' },
          { label: 'CONTRIBUER' }
        ]}
        glitchIntensity="medium"
      />

      <div className="px-4 pb-24 bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit}>
            {/* Type Selection */}
            <div className="mb-8">
              <h3 className="font-black text-xl text-[#F0F0F0] uppercase mb-6">
                <span className="text-[#8B0000]">//</span> Type de Contribution
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CONTRIBUTION_TYPES.map(type => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type.id)}
                      className={`text-left p-6 border-2 transition-all ${
                        selectedType === type.id
                          ? 'bg-[#8B0000] border-[#8B0000] text-[#F0F0F0]'
                          : 'bg-[#0A0A0A] border-[#8B0000]/30 text-[#F0F0F0] hover:border-[#8B0000]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <Icon size={32} className={selectedType === type.id ? 'text-[#F0F0F0]' : 'text-[#8B0000]'} />
                        {selectedType === type.id && (
                          <Check size={20} className="text-[#F0F0F0]" />
                        )}
                      </div>
                      <h4 className="font-black text-lg uppercase mb-2">
                        {type.name}
                      </h4>
                      <p className="font-mono text-xs opacity-70">
                        {type.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Image Upload */}
            <div className="mb-8">
              <h3 className="font-black text-xl text-[#F0F0F0] uppercase mb-6">
                <span className="text-[#8B0000]">//</span> Image *
              </h3>

              <div className="bg-[#0A0A0A] border-2 border-[#8B0000]/30 p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Upload size={24} className="text-[#8B0000] mt-1" />
                  <div className="flex-1">
                    <label className="block font-mono text-xs text-[#F0F0F0]/70 mb-2">
                      URL de l'image (hébergée sur Imgur, Google Photos, etc.)
                    </label>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      required
                      placeholder="https://i.imgur.com/example.jpg"
                      className="w-full px-4 py-3 bg-[#000000] border-2 border-[#8B0000]/30 text-[#F0F0F0] font-mono text-sm focus:border-[#8B0000] outline-none"
                    />
                  </div>
                </div>

                <div className="bg-[#8B0000]/10 border border-[#8B0000]/30 p-4">
                  <p className="font-mono text-[10px] text-[#F0F0F0]/60 leading-relaxed mb-2">
                    <span className="text-[#8B0000] font-black">Formats acceptés :</span> JPG, PNG, GIF
                  </p>
                  <p className="font-mono text-[10px] text-[#F0F0F0]/60 leading-relaxed">
                    <span className="text-[#8B0000] font-black">Taille recommandée :</span> Minimum 1000x1000px pour une meilleure qualité
                  </p>
                </div>

                {/* Preview */}
                {formData.image && (
                  <div className="mt-4">
                    <p className="font-mono text-xs text-[#F0F0F0]/70 mb-2">Aperçu :</p>
                    <div className="aspect-square max-w-xs border-2 border-[#8B0000]/30 overflow-hidden">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/400x400/0A0A0A/8B0000?text=Image+invalide';
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="mb-8">
              <h3 className="font-black text-xl text-[#F0F0F0] uppercase mb-6">
                <span className="text-[#8B0000]">//</span> Détails
              </h3>

              <div className="bg-[#0A0A0A] border-2 border-[#8B0000]/30 p-6 space-y-4">
                <div>
                  <label className="block font-mono text-xs text-[#F0F0F0]/70 mb-2">
                    Description / Légende *
                  </label>
                  <textarea
                    name="caption"
                    value={formData.caption}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    placeholder="Raconte l'histoire derrière cette photo, ce tatouage, cette pièce de collection..."
                    className="w-full px-4 py-3 bg-[#000000] border-2 border-[#8B0000]/30 text-[#F0F0F0] font-mono text-sm focus:border-[#8B0000] outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-[#F0F0F0]/70 mb-2">
                    Sous-titre (optionnel)
                  </label>
                  <input
                    type="text"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleInputChange}
                    placeholder="Ex: Concert Paris 2024, Tatouage jambe droite, Vinyle original 1994..."
                    className="w-full px-4 py-3 bg-[#000000] border-2 border-[#8B0000]/30 text-[#F0F0F0] font-mono text-sm focus:border-[#8B0000] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-[#F0F0F0]/70 mb-2">
                    Tags (optionnel, séparés par des virgules)
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="Ex: vinyl, rare, follow-the-leader, 1998"
                    className="w-full px-4 py-3 bg-[#000000] border-2 border-[#8B0000]/30 text-[#F0F0F0] font-mono text-sm focus:border-[#8B0000] outline-none"
                  />
                  <p className="font-mono text-[10px] text-[#F0F0F0]/50 mt-2">
                    Les tags aident à catégoriser ta contribution
                  </p>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="mb-8 bg-[#8B0000]/10 border-l-4 border-[#8B0000] p-6">
              <div className="flex items-start gap-4">
                <AlertCircle size={24} className="text-[#8B0000] mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-black text-sm text-[#8B0000] uppercase mb-2">
                    Droits & Modération
                  </h4>
                  <ul className="space-y-2 font-mono text-xs text-[#F0F0F0]/70">
                    <li className="flex items-start gap-2">
                      <span className="text-[#8B0000] mt-1">▸</span>
                      <span>En soumettant du contenu, tu confirmes en être l'auteur ou avoir les droits nécessaires</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8B0000] mt-1">▸</span>
                      <span>Toutes les contributions sont modérées avant publication</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8B0000] mt-1">▸</span>
                      <span>Ton contenu pourra être utilisé dans le fanzine mensuel (avec crédit)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8B0000] mt-1">▸</span>
                      <span>Les contributions publiées dans le fanzine reçoivent un exemplaire gratuit</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="bg-[#8B0000]/10 border-2 border-[#8B0000] p-6">
              <button
                type="submit"
                disabled={isSubmitting || !selectedType || !formData.caption || !formData.image}
                className={`w-full px-6 py-4 font-black text-sm uppercase transition-all flex items-center justify-center gap-2 ${
                  isSubmitting || !selectedType || !formData.caption || !formData.image
                    ? 'bg-[#8B0000]/20 text-[#F0F0F0]/40 border-2 border-[#8B0000]/20 cursor-not-allowed'
                    : 'bg-[#8B0000] text-[#F0F0F0] hover:bg-transparent hover:border-2 hover:border-[#8B0000]'
                }`}
              >
                {isSubmitting ? (
                  <>Envoi en cours...</>
                ) : (
                  <>
                    <Upload size={16} />
                    Soumettre ma contribution
                  </>
                )}
              </button>

              <p className="font-mono text-[10px] text-[#F0F0F0]/50 text-center mt-4">
                En soumettant, tu acceptes que ton contenu soit modéré avant publication
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}