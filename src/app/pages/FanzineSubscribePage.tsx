import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { PageHeader } from '@/app/components/PageHeader';
import { Mail, CreditCard, MapPin, Package, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

const ZONES = [
  {
    id: 'france',
    name: 'France Métropolitaine',
    flag: '🇫🇷',
    minPrice: 22.50,
    shipping: 3.30,
    pricePerIssue: 7.50,
  },
  {
    id: 'belgium-swiss',
    name: 'Belgique & Suisse',
    flag: '🇧🇪🇨🇭',
    minPrice: 30.00,
    shipping: 6.00,
    pricePerIssue: 10.00,
  },
];

export function FanzineSubscribePage() {
  const [selectedZone, setSelectedZone] = useState('france');
  const [customPrice, setCustomPrice] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    postalCode: '',
    city: '',
    country: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const zone = ZONES.find(z => z.id === selectedZone);
  const finalPrice = customPrice ? parseFloat(customPrice) : zone?.minPrice || 0;
  const isPriceValid = finalPrice >= (zone?.minPrice || 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isPriceValid) {
      alert(`Le prix minimum pour ${zone?.name} est de ${zone?.minPrice}€`);
      return;
    }

    // Validation
    if (!formData.name || !formData.email || !formData.address || !formData.postalCode || !formData.city) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-d462d5d8/subscriptions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            zone: selectedZone,
            price: finalPrice,
            ...formData,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Subscription created:', data);
        setSubmitSuccess(true);
      } else {
        const errorText = await response.text();
        console.error('Subscription error response:', errorText);
        try {
          const error = JSON.parse(errorText);
          alert(error.error || 'Erreur lors de l\'enregistrement de l\'abonnement');
        } catch {
          alert('Erreur lors de l\'enregistrement de l\'abonnement');
        }
      }
    } catch (error) {
      console.error('Error submitting subscription:', error);
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

  if (submitSuccess) {
    return (
      <div className="min-h-screen">
        <PageHeader
          title="Abonnement Confirmé"
          description="Merci pour votre soutien !"
          backgroundImage="https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWNjZXNzJTIwZGFya3xlbnwxfHx8fDE3NjkxOTMwNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
          breadcrumbs={[
            { label: 'ACCUEIL', path: '/' },
            { label: 'FANZINE', path: '/fanzine' },
            { label: 'ABONNEMENT' }
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
                Abonnement enregistré !
              </h2>
              
              <p className="font-mono text-sm text-[#F0F0F0]/70 mb-6 leading-relaxed">
                Vous recevrez un email de confirmation avec les instructions de paiement.
                Le premier numéro sera envoyé dès réception du paiement.
              </p>

              <div className="bg-[#8B0000]/10 border border-[#8B0000]/30 p-6 mb-8">
                <h3 className="font-black text-xs text-[#8B0000] uppercase mb-4">
                  Récapitulatif de votre commande :
                </h3>
                <div className="space-y-2 text-left font-mono text-xs text-[#F0F0F0]/70">
                  <div className="flex justify-between">
                    <span>Zone :</span>
                    <span className="text-[#F0F0F0]">{zone?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pack :</span>
                    <span className="text-[#F0F0F0]">3 numéros (trimestre)</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#8B0000]/30">
                    <span className="font-black text-[#8B0000]">Total :</span>
                    <span className="font-black text-[#8B0000]">{finalPrice.toFixed(2)}€</span>
                  </div>
                </div>
              </div>

              <Link
                to="/fanzine"
                className="inline-block px-6 py-3 bg-[#8B0000] text-[#F0F0F0] font-black text-sm uppercase hover:bg-transparent hover:border-2 hover:border-[#8B0000] transition-all"
              >
                Retour au Fanzine
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
        title="S'abonner au Fanzine"
        description="Pack trimestre : 3 fanzines + 3 posters + stickers exclusifs.<br />Prix libre avec minimum obligatoire."
        backgroundImage="https://images.unsplash.com/photo-1542831371-29b0f74f9713?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWJzY3JpcHRpb24lMjBtYWdhemluZSUyMGRhcmt8ZW58MXx8fHwxNzY5MTkzMDUyfDA&ixlib=rb-4.1.0&q=80&w=1080"
        breadcrumbs={[
          { label: 'ACCUEIL', path: '/' },
          { label: 'FANZINE', path: '/fanzine' },
          { label: 'ABONNEMENT' }
        ]}
        glitchIntensity="medium"
      />

      <div className="px-4 pb-24 bg-[#0A0A0A]">
        <div className="max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - What's included */}
            <div className="lg:col-span-1">
              <h3 className="font-black text-xl text-[#F0F0F0] uppercase mb-6">
                <span className="text-[#8B0000]">//</span> Ton Pack Trimestre
              </h3>

              <div className="bg-[#0A0A0A] border-2 border-[#8B0000] p-6 mb-6">
                <div className="flex items-start gap-3 mb-4">
                  <Package size={24} className="text-[#8B0000] mt-1" />
                  <div>
                    <h4 className="font-black text-sm text-[#8B0000] uppercase mb-2">
                      Chaque Mois tu Reçois :
                    </h4>
                  </div>
                </div>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check size={16} className="text-[#8B0000] mt-0.5 flex-shrink-0" />
                    <span className="font-mono text-xs text-[#F0F0F0]/70">
                      <span className="text-[#F0F0F0] font-black">Le Fanzine :</span> 12 pages A4 couleur, finition brochée
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={16} className="text-[#8B0000] mt-0.5 flex-shrink-0" />
                    <span className="font-mono text-xs text-[#F0F0F0]/70">
                      <span className="text-[#F0F0F0] font-black">Un Poster A3</span> exclusif différent chaque mois
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={16} className="text-[#8B0000] mt-0.5 flex-shrink-0" />
                    <span className="font-mono text-xs text-[#F0F0F0]/70">
                      <span className="text-[#F0F0F0] font-black">Des Stickers</span> collector inédits
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={16} className="text-[#8B0000] mt-0.5 flex-shrink-0" />
                    <span className="font-mono text-xs text-[#F0F0F0]/70">
                      <span className="text-[#F0F0F0] font-black">Accès PDF</span> à tous les anciens numéros
                    </span>
                  </li>
                </ul>
              </div>

              {/* Transparency */}
              <div className="bg-[#8B0000]/10 border-l-4 border-[#8B0000] p-4">
                <h4 className="font-black text-xs text-[#8B0000] uppercase mb-3">
                  Transparence Totale
                </h4>
                <p className="font-mono text-[10px] text-[#F0F0F0]/70 leading-relaxed mb-2">
                  Pour la France, {zone?.shipping}€ partent dans le timbre et l'enveloppe. Ajoutez l'impression du mag, du poster et des stickers...
                </p>
                <p className="font-mono text-[10px] text-[#8B0000] leading-relaxed">
                  <span className="font-black">À {zone?.pricePerIssue}€/numéro, nous sommes quasi à prix coûtant.</span> Tout ce que vous donnez en plus sert à financer l'hébergement du site untouchables.fr !
                </p>
              </div>
            </div>

            {/* Right Column - Subscription Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                {/* Zone Selection */}
                <div className="mb-8">
                  <h3 className="font-black text-xl text-[#F0F0F0] uppercase mb-6">
                    <span className="text-[#8B0000]">//</span> Choisis ta Zone
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {ZONES.map(z => (
                      <button
                        key={z.id}
                        type="button"
                        onClick={() => setSelectedZone(z.id)}
                        className={`text-left p-6 border-2 transition-all ${
                          selectedZone === z.id
                            ? 'bg-[#8B0000] border-[#8B0000] text-[#F0F0F0]'
                            : 'bg-[#0A0A0A] border-[#8B0000]/30 text-[#F0F0F0] hover:border-[#8B0000]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-2xl">{z.flag}</span>
                          {selectedZone === z.id && (
                            <Check size={20} className="text-[#F0F0F0]" />
                          )}
                        </div>
                        <h4 className="font-black text-sm uppercase mb-2">
                          {z.name}
                        </h4>
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="font-black text-2xl">
                            {z.minPrice.toFixed(2)}€
                          </span>
                          <span className="font-mono text-xs opacity-70">
                            minimum
                          </span>
                        </div>
                        <p className="font-mono text-[10px] opacity-60">
                          soit {z.pricePerIssue.toFixed(2)}€ / numéro
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Selection */}
                <div className="mb-8">
                  <h3 className="font-black text-xl text-[#F0F0F0] uppercase mb-6">
                    <span className="text-[#8B0000]">//</span> Prix Libre
                  </h3>

                  <div className="bg-[#0A0A0A] border-2 border-[#8B0000]/30 p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <CreditCard size={24} className="text-[#8B0000] mt-1" />
                      <div className="flex-1">
                        <label className="block font-mono text-xs text-[#F0F0F0]/70 mb-2">
                          Montant de votre contribution (minimum {zone?.minPrice}€)
                        </label>
                        <div className="flex items-center gap-4">
                          <input
                            type="number"
                            step="0.01"
                            min={zone?.minPrice}
                            value={customPrice}
                            onChange={(e) => setCustomPrice(e.target.value)}
                            placeholder={`${zone?.minPrice.toFixed(2)}`}
                            className="flex-1 px-4 py-3 bg-[#000000] border-2 border-[#8B0000]/30 text-[#F0F0F0] font-mono text-lg focus:border-[#8B0000] outline-none"
                          />
                          <span className="font-black text-2xl text-[#F0F0F0]">€</span>
                        </div>
                        {customPrice && !isPriceValid && (
                          <div className="flex items-center gap-2 mt-2 text-[#8B0000]">
                            <AlertCircle size={14} />
                            <span className="font-mono text-xs">
                              Le prix minimum est de {zone?.minPrice}€
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-[#8B0000]/10 border border-[#8B0000]/30 p-4">
                      <p className="font-mono text-[10px] text-[#F0F0F0]/60 leading-relaxed">
                        <span className="text-[#8B0000] font-black">Note :</span> Nous fonctionnons sur un modèle associatif. 
                        Ton soutien au-delà du minimum nous permet de continuer à créer du contenu de qualité et de maintenir le site untouchables.fr.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="mb-8">
                  <h3 className="font-black text-xl text-[#F0F0F0] uppercase mb-6">
                    <span className="text-[#8B0000]">//</span> Adresse de Livraison
                  </h3>

                  <div className="bg-[#0A0A0A] border-2 border-[#8B0000]/30 p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-xs text-[#F0F0F0]/70 mb-2">
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-[#000000] border-2 border-[#8B0000]/30 text-[#F0F0F0] font-mono text-sm focus:border-[#8B0000] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-xs text-[#F0F0F0]/70 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-[#000000] border-2 border-[#8B0000]/30 text-[#F0F0F0] font-mono text-sm focus:border-[#8B0000] outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-xs text-[#F0F0F0]/70 mb-2">
                        Adresse *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-[#000000] border-2 border-[#8B0000]/30 text-[#F0F0F0] font-mono text-sm focus:border-[#8B0000] outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block font-mono text-xs text-[#F0F0F0]/70 mb-2">
                          Code postal *
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-[#000000] border-2 border-[#8B0000]/30 text-[#F0F0F0] font-mono text-sm focus:border-[#8B0000] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-xs text-[#F0F0F0]/70 mb-2">
                          Ville *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-[#000000] border-2 border-[#8B0000]/30 text-[#F0F0F0] font-mono text-sm focus:border-[#8B0000] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-xs text-[#F0F0F0]/70 mb-2">
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-[#000000] border-2 border-[#8B0000]/30 text-[#F0F0F0] font-mono text-sm focus:border-[#8B0000] outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Summary & Submit */}
                <div className="bg-[#8B0000]/10 border-2 border-[#8B0000] p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-black text-lg text-[#F0F0F0] uppercase">
                      Récapitulatif
                    </h3>
                    <div className="text-right">
                      <div className="font-black text-3xl text-[#8B0000]">
                        {finalPrice.toFixed(2)}€
                      </div>
                      <div className="font-mono text-xs text-[#F0F0F0]/60">
                        pour 3 numéros
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6 font-mono text-xs text-[#F0F0F0]/70">
                    <div className="flex justify-between">
                      <span>Zone de livraison :</span>
                      <span className="text-[#F0F0F0]">{zone?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pack :</span>
                      <span className="text-[#F0F0F0]">3 numéros + 3 posters + stickers</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Frais d'envoi (par envoi) :</span>
                      <span className="text-[#F0F0F0]">{zone?.shipping.toFixed(2)}€</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !isPriceValid}
                    className={`w-full px-6 py-4 font-black text-sm uppercase transition-all flex items-center justify-center gap-2 ${
                      isSubmitting || !isPriceValid
                        ? 'bg-[#8B0000]/20 text-[#F0F0F0]/40 border-2 border-[#8B0000]/20 cursor-not-allowed'
                        : 'bg-[#8B0000] text-[#F0F0F0] hover:bg-transparent hover:border-2 hover:border-[#8B0000]'
                    }`}
                  >
                    {isSubmitting ? (
                      <>Traitement en cours...</>
                    ) : (
                      <>
                        <Mail size={16} />
                        Valider mon abonnement
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  <p className="font-mono text-[10px] text-[#F0F0F0]/50 text-center mt-4">
                    En validant, vous recevrez un email avec les instructions de paiement.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}