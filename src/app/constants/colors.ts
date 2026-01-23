/**
 * Design System: Organic Glitch & Shadows - High-Def Horror
 * Palette de couleurs centralisée pour Untouchables
 */

export const COLORS = {
  // Backgrounds
  background: '#0A0A0A',
  
  // Red accents
  red: {
    // Rouge pur pour textes et accents (sans texture ni transparence)
    pure: '#8B0000',
    
    // Rouge désaturé pour fonds avec effets VHS (avec texture et transparence)
    desaturated: '#6B0A0A',
    desaturatedOpacity: 0.95,
    
    // Classe Tailwind pour fond rouge avec texture (à utiliser avec film grain et scanlines)
    bgClass: 'bg-[#6B0A0A]/95',
  },
  
  // Text colors
  text: {
    primary: '#E0E0E0',
    white: '#FFFFFF',
  },
} as const;

/**
 * Fonction helper pour obtenir la couleur rgba du fond rouge désaturé
 */
export function getDesaturatedRedBg(): string {
  return `rgba(107, 10, 10, ${COLORS.red.desaturatedOpacity})`;
}
