/**
 * Design System: Organic Glitch & Shadows - High-Def Horror
 * PALETTE DÉFINITIVE & VERROUILLÉE pour Untouchables
 */

// DARK MODE (Default)
export const DARK_COLORS = {
  // Primary: Dried Rust - Le sang séché et oxydé
  primary: '#8B0000',
  
  // Secondary: Removed - No longer in use
  secondary: '#8B0000', // Fallback to primary
  
  // Accent: Removed - No longer in use
  accent: '#8B0000', // Fallback to primary
  
  // Neutral 1: Abyssal Grey - Fond noir profond
  background: '#0A0A0A',
  
  // Neutral 2: Static White - Texte principal blanc cassé
  text: '#F0F0F0',
  
  // Pure White
  white: '#FFFFFF',
  
  // Grey variations
  grey: {
    dark: '#1A1A1A',
    medium: '#808080',
    light: '#CCCCCC',
  },
  
  // Red variations (compatibility)
  red: {
    // Rouge pur pour textes et accents
    pure: '#8B0000',
    
    // Rouge désaturé pour fonds avec effets (dark mode)
    desaturated: '#1A0A0A',
    desaturatedOpacity: 0.95,
    
    // Classe Tailwind pour fond rouge foncé avec texture
    bgClass: 'bg-[#1A0A0A]/95',
  },
} as const;

// LIGHT MODE
export const LIGHT_COLORS = {
  // Primary: Dried Rust - Sang séché et oxydé (inchangé)
  primary: '#8B0000',
  
  // Secondary: Removed - No longer in use
  secondary: '#8B0000', // Fallback to primary
  
  // Accent: Removed - No longer in use
  accent: '#8B0000', // Fallback to primary
  
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
export const COLORS = {
  ...DARK_COLORS,
  // Legacy aliases for backward compatibility
  RUST: DARK_COLORS.primary,
  VIOLET: DARK_COLORS.primary, // Removed but keeping fallback
  LIME: DARK_COLORS.primary, // Removed but keeping fallback
} as const;

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