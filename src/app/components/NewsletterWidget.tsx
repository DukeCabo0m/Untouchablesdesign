import { useState } from 'react';
import { Mail } from 'lucide-react';
import { HandDrawnBox } from './HandDrawnBox';
import { GlitchText } from './GlitchText';
import { Button } from './Button';

export function NewsletterWidget() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setEmail('');
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    <div className="mt-12 md:mt-14 lg:mt-16">
      <HandDrawnBox
        color="#80808080"
        strokeWidth={3}
        roughness={2.5}
        padding="0"
      >
        <div className="bg-[#000000] p-4 md:p-5 lg:p-6">
          {/* Header */}
          <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
            <Mail size={24} className="md:w-7 md:h-7 text-[#8B0000]" />
            <h3 className="font-black text-base md:text-lg uppercase tracking-tight text-[#E0E0E0]">
              L'Actualité Korn dans votre boîte mail
            </h3>
          </div>

          {/* Content */}
          {isSubmitted ? (
            <div className="p-3 md:p-4 bg-[#8B0000] bg-opacity-20 border border-[#8B0000]">
              <p className="font-mono text-sm md:text-base text-[#8B0000] text-center uppercase tracking-wide">
                ✓ Inscription confirmée !
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
              <p className="font-mono text-xs md:text-sm text-[#E0E0E0]/70 leading-relaxed">
                Ne manquez aucune info sur le groupe : dates de concerts, analyses d'albums et dossiers exclusifs Untouchables.
              </p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Entrez votre email ici..."
                required
                className="w-full px-3 py-2.5 md:px-4 md:py-3 bg-[#0A0A0A] border border-[#8B0000] text-[#E0E0E0] font-mono text-sm placeholder:text-[#E0E0E0] placeholder:opacity-40 focus:outline-none focus:border-[#8B0000] focus:ring-1 focus:ring-[#8B0000] transition-colors"
                style={{
                  clipPath: `polygon(
                    0% 3%, 2% 0%, 98% 0%, 100% 3%,
                    100% 97%, 98% 100%, 2% 100%, 0% 97%
                  )`,
                }}
              />
              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="w-full"
              >
                <span className="hidden md:inline">Recevoir les news de Korn gratuitement</span>
                <span className="md:hidden">S'inscrire</span>
              </Button>
            </form>
          )}

          {/* Footer */}
          <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-[#8B0000]/30">
            <div className="text-center font-mono text-xs md:text-sm text-[#E0E0E0]/50">
              Pas de spam. 1 récapitulatif par mois.
            </div>
          </div>
        </div>
      </HandDrawnBox>
    </div>
  );
}