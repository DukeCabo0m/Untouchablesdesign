/**
 * Design System: Organic Glitch & Shadows - High-Def Horror
 * PALETTE DÉFINITIVE & VERROUILLÉE pour Untouchables
 */

// DARK MODE (Default)
export const DARK_COLORS = {
  // Primary: Dried Rust - Le sang séché historique
  primary: '#8B0000',
  
  // Secondary: Digital Violet - Glitch vibrant/magenta
  secondary: '#B900FF',
  
  // Accent: Radioactive Lime - Lumière néon et code
  accent: '#1EFF00',
  
  // Neutral 1: Abyssal Grey - Fond noir profond
  background: '#0A0A0A',
  
  // Neutral 2: Static White - Texte blanc cassé
  text: '#F0F0F0',
  
  // Compatibilité avec l'ancien système
  red: {
    // Rouge pur pour textes et accents (sans texture ni transparence)
    pure: '#8B0000',
    
    // Rouge désaturé pour fonds avec effets VHS (avec texture et transparence)
    desaturated: '#6B0A0A',
    desaturatedOpacity: 0.95,
    
    // Classe Tailwind pour fond rouge avec texture (à utiliser avec film grain et scanlines)
    bgClass: 'bg-[#6B0A0A]/95',
  },
} as const;

// LIGHT MODE
export const LIGHT_COLORS = {
  // Primary: Dried Rust - Le sang séché (inchangé)
  primary: '#8B0000',
  
  // Secondary: Digital Violet - Glitch vibrant/magenta (inchangé)
  secondary: '#B900FF',
  
  // Accent: Radioactive Lime - Lumière néon et code (inchangé)
  accent: '#1EFF00',
  
  // Neutral 1: Static White - Fond blanc cassé
  background: '#F0F0F0',
  
  // Neutral 2: Abyssal Grey - Texte noir profond
  text: '#0A0A0A',
  
  // Compatibilité avec l'ancien système
  red: {
    // Rouge pur pour textes et accents
    pure: '#8B0000',
    
    // Rouge clair pour fonds avec effets
    desaturated: '#FFE5E5',
    desaturatedOpacity: 0.95,
    
    // Classe Tailwind pour fond rouge clair avec texture
    bgClass: 'bg-[#FFE5E5]/95',
  },
} as const;

// Export par défaut (dark mode)
export const COLORS = DARK_COLORS;

/**
 * Fonction helper pour obtenir la couleur rgba du fond rouge désaturé
 */
export function getDesaturatedRedBg(isLight = false): string {
  const colors = isLight ? LIGHT_COLORS : DARK_COLORS;
  const r = isLight ? 255 : 107;
  const g = isLight ? 229 : 10;
  const b = isLight ? 229 : 10;
  return `rgba(${r}, ${g}, ${b}, ${colors.red.desaturatedOpacity})`;
}