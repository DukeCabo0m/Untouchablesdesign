import { Link } from 'react-router';
import { motion } from 'motion/react';
import { GlitchImage } from './GlitchImage';
import { LogoText } from './LogoText';
import { COLORS } from '@/app/constants/colors';
import { Youtube, Facebook, Instagram, Mail, ExternalLink, Send } from 'lucide-react';
import { useState } from 'react';
import { Button } from './Button';
import { HandDrawnLine } from './HandDrawnLine';
import { HandDrawnVerticalLine } from './HandDrawnVerticalLine';
import { TikTokIcon } from './TikTokIcon';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription logic
    setIsSubmitted(true);
    setTimeout(() => {
      setEmail('');
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <footer className="relative z-[100] bg-[#000000] mt-8 md:mt-12 lg:mt-16 pt-12 md:pt-16">
      {/* Bordure dessinée à la main en haut */}
      <div className="absolute top-0 left-0 right-0 h-1">
        <HandDrawnLine 
          color="#8B0000" 
          strokeWidth={3} 
          roughness={3} 
          passes={2}
        />
      </div>
      
      {/* Main Footer */}
      <div className="px-0 relative pb-8 md:pb-12">
        {/* Overlay ultra-sombre pour le background */}
        <div className="absolute inset-0 bg-black opacity-95 z-0" />
        <div className="absolute inset-0 bg-black/90 z-[1]" style={{ boxShadow: 'inset 0 0 200px 100px rgba(0, 0, 0, 1)' }} />
        
        <div className="max-w-[1920px] mx-auto px-4 md:px-6 lg:px-8 relative z-10 pt-0">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-10 lg:gap-12 mb-8 md:mb-12 mt-0 pt-0">
            {/* Column 1 - About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="sm:col-span-2 lg:col-span-1"
            >
              <div className="mb-4 md:mb-6">
                <Link to="/" className="block cursor-pointer hover:opacity-80 transition-opacity">
                  <LogoText className="h-8 md:h-10 max-w-[150px] md:max-w-[180px]" />
                </Link>
                <div className="mt-3 md:mt-4">
                  <HandDrawnLine 
                    width={80}
                    color="#8B0000" 
                    strokeWidth={3} 
                    roughness={2.5} 
                    passes={2}
                  />
                </div>
              </div>
              <p className="font-mono text-sm md:text-base text-[#F0F0F0] leading-relaxed mb-4 md:mb-6">
                Communauté francophone de fans de Korn. Actualités, discographie, concerts, et bien plus.
              </p>
              <div className="font-mono text-xs md:text-sm text-[#8B0000] uppercase tracking-wider">
                EST. 2026 // V.1.0
              </div>
            </motion.div>

            {/* Column 2 - Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="mb-4 md:mb-6">
                <h3 className="font-black text-xs md:text-sm text-[#8B0000] uppercase tracking-wider mb-3 md:mb-4">
                  &gt;&gt; Navigation
                </h3>
              </div>
              <nav className="space-y-2 md:space-y-3">
                <Link 
                  to="/news" 
                  className="block font-mono text-sm md:text-base text-[#F0F0F0] hover:text-[#8B0000] transition-colors cursor-pointer uppercase"
                >
                  Actualités
                </Link>
                <Link 
                  to="/tour" 
                  className="block font-mono text-sm md:text-base text-[#F0F0F0] hover:text-[#8B0000] transition-colors cursor-pointer uppercase"
                >
                  Tournée
                </Link>
                <Link 
                  to="/band" 
                  className="block font-mono text-sm md:text-base text-[#F0F0F0] hover:text-[#8B0000] transition-colors cursor-pointer uppercase"
                >
                  Le Groupe
                </Link>
                <Link 
                  to="/discography" 
                  className="block font-mono text-sm md:text-base text-[#F0F0F0] hover:text-[#8B0000] transition-colors cursor-pointer uppercase"
                >
                  Discographie
                </Link>
                <Link 
                  to="/fanzine" 
                  className="block font-mono text-sm md:text-base text-[#F0F0F0] hover:text-[#8B0000] transition-colors cursor-pointer uppercase"
                >
                  Fanzine
                </Link>
                <Link 
                  to="/contact" 
                  className="block font-mono text-sm md:text-base text-[#F0F0F0] hover:text-[#8B0000] transition-colors cursor-pointer uppercase"
                >
                  Contact
                </Link>
              </nav>
            </motion.div>

            {/* Column 3 - Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="mb-4 md:mb-6">
                <h3 className="font-black text-xs md:text-sm text-[#8B0000] uppercase tracking-wider mb-3 md:mb-4">
                  &gt;&gt; Réseaux
                </h3>
              </div>
              <div className="space-y-3 md:space-y-4">
                <a 
                  href="https://www.youtube.com/@UntouchablesFR?sub_confirmation=1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 md:gap-3 font-mono text-sm md:text-base text-[#F0F0F0] hover:text-[#8B0000] transition-colors cursor-pointer group"
                >
                  <Youtube size={16} className="group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className="uppercase">YouTube</span>
                </a>
                <a 
                  href="https://www.facebook.com/untouchablesfr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 md:gap-3 font-mono text-sm md:text-base text-[#F0F0F0] hover:text-[#8B0000] transition-colors cursor-pointer group"
                >
                  <Facebook size={16} className="group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className="uppercase">Facebook</span>
                </a>
                <a 
                  href="https://www.instagram.com/untouchables.fr/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 md:gap-3 font-mono text-sm md:text-base text-[#F0F0F0] hover:text-[#8B0000] transition-colors cursor-pointer group"
                >
                  <Instagram size={16} className="group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className="uppercase">Instagram</span>
                </a>
                <a 
                  href="https://www.tiktok.com/@untouchables.fr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 md:gap-3 font-mono text-sm md:text-base text-[#F0F0F0] hover:text-[#8B0000] transition-colors cursor-pointer group"
                >
                  <TikTokIcon size={16} className="group-hover:scale-110 transition-transform flex-shrink-0" />
                  <span className="uppercase">TikTok</span>
                </a>
              </div>
            </motion.div>

            {/* Column 4 - Legal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="mb-4 md:mb-6">
                <h3 className="font-black text-xs md:text-sm text-[#8B0000] uppercase tracking-wider mb-3 md:mb-4">
                  &gt;&gt; Légal
                </h3>
              </div>
              <nav className="space-y-2 md:space-y-3">
                <Link 
                  to="/statuts" 
                  className="block font-mono text-sm md:text-base text-[#F0F0F0] hover:text-[#8B0000] transition-colors cursor-pointer uppercase"
                >
                  Statuts de l'association
                </Link>
                <Link 
                  to="/legal" 
                  className="block font-mono text-sm md:text-base text-[#F0F0F0] hover:text-[#8B0000] transition-colors cursor-pointer uppercase"
                >
                  Mentions légales
                </Link>
                <Link 
                  to="/privacy" 
                  className="block font-mono text-sm md:text-base text-[#F0F0F0] hover:text-[#8B0000] transition-colors cursor-pointer uppercase"
                >
                  Confidentialité
                </Link>
                <Link 
                  to="/cookies" 
                  className="block font-mono text-sm md:text-base text-[#F0F0F0] hover:text-[#8B0000] transition-colors cursor-pointer uppercase"
                >
                  Cookies
                </Link>
                <Link 
                  to="/terms" 
                  className="block font-mono text-sm md:text-base text-[#F0F0F0] hover:text-[#8B0000] transition-colors cursor-pointer uppercase"
                >
                  CGU
                </Link>
              </nav>
            </motion.div>

            {/* Column 5 - Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="sm:col-span-2 lg:col-span-1"
            >
              <div className="mb-4 md:mb-6">
                <h3 className="font-black text-xs md:text-sm text-[#8B0000] uppercase tracking-wider mb-3 md:mb-4">
                  &gt;&gt; Newsletter
                </h3>
              </div>
              
              {!isSubmitted ? (
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <p className="font-mono text-xs md:text-sm text-[#E0E0E0] mb-3">
                    Reçois les dernières actus du groupe, les dates de concerts et nos contenus exclusifs.
                  </p>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="EMAIL"
                      required
                      className="w-full px-3 py-3 md:py-2 bg-[#000000] border border-[#E0E0E0] text-[#E0E0E0] text-sm md:text-base font-mono uppercase placeholder:text-[#E0E0E0] focus:border-[#8B0000] focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="w-full sm:w-fit">
                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                      className="w-full sm:w-auto"
                    >
                      <Send size={12} />
                      S'INSCRIRE
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="bg-[#8B0000]/20 border border-[#8B0000] p-3">
                  <p className="font-mono text-sm md:text-base text-[#F0F0F0] text-center">
                    ✓ CONFIRMÉ
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Divider */}
          <div className="relative mb-8 md:mb-12">
            <HandDrawnLine 
              color="#8B0000" 
              strokeWidth={2} 
              roughness={2.5} 
              passes={2}
            />
            <motion.div 
              className="absolute top-0 left-0 h-[1px] bg-[#8B0000]"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-4 md:space-y-6"
          >
            {/* Disclaimer */}
            <div className="relative pl-4 md:pl-6 pr-4 md:pr-6 py-3 md:py-4 bg-[#8B0000]/25">
              <div className="absolute left-0 top-0 bottom-0">
                <HandDrawnVerticalLine 
                  color="#8B0000" 
                  strokeWidth={4} 
                  roughness={2.5} 
                  passes={3}
                  opacity={0.6}
                />
              </div>
              <p className="font-mono text-xs md:text-sm text-[#F0F0F0] leading-relaxed">
                <span className="text-[#8B0000] font-black">DISCLAIMER :</span> UNTOUCHABLES est un site de fans non officiel dédié au groupe Korn. 
                Nous ne sommes pas affiliés au groupe, à leur management ou à leur label. Toutes les marques, logos, noms commerciaux et images appartiennent à leurs propriétaires respectifs et sont utilisés à des fins informatives uniquement.
              </p>
            </div>

            {/* Copyright & Credits */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 text-center md:text-left">
              <div className="font-mono text-xs md:text-sm text-[#F0F0F0] uppercase tracking-wider">
                © 2026 UNTOUCHABLES // Communauté francophone de fans // Tous droits réservés.
              </div>
              
              <div className="font-mono text-xs md:text-sm text-[#8B0000] uppercase tracking-wider">
                CONCEPTION ET DESIGN : Fantastic Mr. Fox
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}