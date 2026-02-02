/**
 * Génère un placeholder SVG pour remplacer les images Unsplash
 * Évite les erreurs "Failed to fetch" en utilisant des data URLs locales
 */
export function generatePlaceholder(width = 1080, height = 1080, text = ''): string {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0A0A0A;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1a1a1a;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
      <text x="50%" y="50%" font-family="monospace" font-size="24" fill="#8B0000" text-anchor="middle" dy=".3em">${text}</text>
    </svg>
  `.trim();
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Génère un avatar initiales pour remplacer ui-avatars.com
 */
export function generateAvatar(name: string): string {
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
    
  const svg = `
    <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#8B0000"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="160" font-weight="bold" fill="#E0E0E0" text-anchor="middle" dy=".35em">${initials}</text>
    </svg>
  `.trim();
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}
