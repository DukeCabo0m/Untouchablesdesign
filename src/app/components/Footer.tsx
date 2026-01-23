import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Instagram, Hash, MessageSquare, FileText, Send, ArrowRight, Youtube, Facebook, Twitch } from 'lucide-react';
import UntouchablesLogo from '@/imports/untouchables-logo.svg';
import { GlitchImage } from './GlitchImage';
import { GlitchText } from './GlitchText';
import { TikTokIcon } from './TikTokIcon';
import { useState } from 'react';

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
    <footer className="relative bg-[#000000] border-t-2 border-[#8B0000] mt-16 pt-16">
      {/* Main Footer */}
      <div className="px-4 relative pb-12">
        {/* Overlay ultra-sombre pour le background */}
        <div className="absolute inset-0 bg-black opacity-95 z-0" />
        <div className="absolute inset-0 bg-black/90 z-[1]" style={{ boxShadow: 'inset 0 0 200px 100px rgba(0, 0, 0, 1)' }} />
        
        <div className="max-w-7xl mx-auto relative z-10 pt-0">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12 mt-0 pt-0">
            {/* Column 1 - About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <Link to="/" className="block cursor-none hover:opacity-80 transition-opacity w-[75%]">
                  <GlitchImage 
                    src="https://www.untouchables.fr/img/untouchables-white.svg" 
                    alt="UNTOUCHABLES"
                  />
                </Link>
                <div className="w-16 h-1 bg-[#8B0000] mt-2" />
              </div>
              <p className="font-mono text-xs text-[#E0E0E0] leading-relaxed mb-6">
                Communauté francophone de fans de Korn. Actualités, discographie, concerts, et bien plus.
              </p>
              <div className="font-mono text-[10px] text-[#8B0000] uppercase tracking-wider">
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
              <div className="mb-6">
                <h3 className="font-black text-sm text-[#8B0000] uppercase tracking-wider mb-4">
                  &gt;&gt; Navigation
                </h3>
              </div>
              <nav className="space-y-3">
                <Link 
                  to="/news" 
                  className="block font-mono text-xs text-[#E0E0E0] hover:text-[#8B0000] transition-colors cursor-none uppercase"
                >
                  Actualités
                </Link>
                <Link 
                  to="/tour" 
                  className="block font-mono text-xs text-[#E0E0E0] hover:text-[#8B0000] transition-colors cursor-none uppercase"
                >
                  Tournée
                </Link>
                <Link 
                  to="/band" 
                  className="block font-mono text-xs text-[#E0E0E0] hover:text-[#8B0000] transition-colors cursor-none uppercase"
                >
                  Le Groupe
                </Link>
                <Link 
                  to="/discography" 
                  className="block font-mono text-xs text-[#E0E0E0] hover:text-[#8B0000] transition-colors cursor-none uppercase"
                >
                  Discographie
                </Link>
                <Link 
                  to="/fanzine" 
                  className="block font-mono text-xs text-[#E0E0E0] hover:text-[#8B0000] transition-colors cursor-none uppercase"
                >
                  Fanzine
                </Link>
                <Link 
                  to="/contact" 
                  className="block font-mono text-xs text-[#E0E0E0] hover:text-[#8B0000] transition-colors cursor-none uppercase"
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
              <div className="mb-6">
                <h3 className="font-black text-sm text-[#8B0000] uppercase tracking-wider mb-4">
                  &gt;&gt; Réseaux
                </h3>
              </div>
              <div className="space-y-4">
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-mono text-xs text-[#E0E0E0] hover:text-[#8B0000] transition-colors cursor-none group"
                >
                  <Youtube size={16} className="group-hover:scale-110 transition-transform" />
                  <span className="uppercase">YouTube</span>
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-mono text-xs text-[#E0E0E0] hover:text-[#8B0000] transition-colors cursor-none group"
                >
                  <Facebook size={16} className="group-hover:scale-110 transition-transform" />
                  <span className="uppercase">Facebook</span>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-mono text-xs text-[#E0E0E0] hover:text-[#8B0000] transition-colors cursor-none group"
                >
                  <Instagram size={16} className="group-hover:scale-110 transition-transform" />
                  <span className="uppercase">Instagram</span>
                </a>
                <a 
                  href="https://tiktok.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-mono text-xs text-[#E0E0E0] hover:text-[#8B0000] transition-colors cursor-none group"
                >
                  <TikTokIcon size={16} className="group-hover:scale-110 transition-transform" />
                  <span className="uppercase">TikTok</span>
                </a>
                <a 
                  href="https://twitch.tv" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-mono text-xs text-[#E0E0E0] hover:text-[#8B0000] transition-colors cursor-none group"
                >
                  <Twitch size={16} className="group-hover:scale-110 transition-transform" />
                  <span className="uppercase">Twitch</span>
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
              <div className="mb-6">
                <h3 className="font-black text-sm text-[#8B0000] uppercase tracking-wider mb-4">
                  &gt;&gt; Légal
                </h3>
              </div>
              <nav className="space-y-3">
                <Link 
                  to="/statuts" 
                  className="block font-mono text-xs text-[#E0E0E0] hover:text-[#8B0000] transition-colors cursor-none uppercase"
                >
                  Statuts de l'association
                </Link>
                <Link 
                  to="/legal" 
                  className="block font-mono text-xs text-[#E0E0E0] hover:text-[#8B0000] transition-colors cursor-none uppercase"
                >
                  Mentions légales
                </Link>
                <Link 
                  to="/privacy" 
                  className="block font-mono text-xs text-[#E0E0E0] hover:text-[#8B0000] transition-colors cursor-none uppercase"
                >
                  Confidentialité
                </Link>
                <Link 
                  to="/cookies" 
                  className="block font-mono text-xs text-[#E0E0E0] hover:text-[#8B0000] transition-colors cursor-none uppercase"
                >
                  Cookies
                </Link>
                <Link 
                  to="/terms" 
                  className="block font-mono text-xs text-[#E0E0E0] hover:text-[#8B0000] transition-colors cursor-none uppercase"
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
            >
              <div className="mb-6">
                <h3 className="font-black text-sm text-[#8B0000] uppercase tracking-wider mb-4">
                  &gt;&gt; Newsletter
                </h3>
              </div>
              
              {!isSubmitted ? (
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <p className="font-mono text-[10px] text-[#E0E0E0] mb-3">
                    Reçois les dernières actus du groupe, les dates de concerts et nos contenus exclusifs.
                  </p>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="EMAIL"
                      required
                      className="w-full px-3 py-2 bg-[#000000] border border-[#E0E0E0] text-[#E0E0E0] font-mono text-[10px] uppercase placeholder:text-[#E0E0E0] focus:border-[#8B0000] focus:outline-none transition-colors cursor-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-3 py-2 bg-[#8B0000] text-[#E0E0E0] font-black text-[10px] uppercase hover:bg-transparent hover:border hover:border-[#8B0000] transition-all cursor-none flex items-center justify-center gap-2"
                  >
                    <Send size={12} />
                    S'INSCRIRE
                  </button>
                </form>
              ) : (
                <div className="bg-[#8B0000]/20 border border-[#8B0000] p-3">
                  <p className="font-mono text-[10px] text-[#E0E0E0] text-center">
                    ✓ CONFIRMÉ
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Divider */}
          <div className="relative mb-12">
            <div className="h-[2px] bg-[#8B0000]/30" />
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
            className="space-y-6"
          >
            {/* Disclaimer */}
            <div className="border-l-4 border-[#8B0000] pl-6 pr-6 py-4 bg-[#8B0000]/5">
              <p className="font-mono text-[10px] text-[#E0E0E0] leading-relaxed">
                <span className="text-[#8B0000] font-black">DISCLAIMER :</span> UNTOUCHABLES est un site de fans non officiel dédié au groupe Korn. 
                Nous ne sommes pas affiliés au groupe, à leur management ou à leur label. Toutes les marques, logos, noms commerciaux et images appartiennent à leurs propriétaires respectifs et sont utilisés à des fins informatives uniquement.
              </p>
            </div>

            {/* Copyright & Credits */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="font-mono text-[10px] text-[#E0E0E0] uppercase tracking-wider text-center md:text-left">
                © 2026 UNTOUCHABLES // Communauté francophone de fans // Tous droits réservés.
              </div>
              
              <div className="font-mono text-[10px] text-[#8B0000] uppercase tracking-wider text-center md:text-right">
                CONCEPTION ET DESIGN : Fantastic Mr. Fox
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}