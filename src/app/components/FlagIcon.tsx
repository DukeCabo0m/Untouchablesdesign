interface FlagIconProps {
  country: string;
  size?: number;
}

export function FlagIcon({ country, size = 24 }: FlagIconProps) {
  // Emojis drapeaux natifs
  const flagEmojis: { [key: string]: string } = {
    'France': '🇫🇷',
    'FR': '🇫🇷',
    'USA': '🇺🇸',
    'US': '🇺🇸',
    'Allemagne': '🇩🇪',
    'DE': '🇩🇪',
    'Royaume-Uni': '🇬🇧',
    'GB': '🇬🇧',
    'Espagne': '🇪🇸',
    'ES': '🇪🇸',
    'Italie': '🇮🇹',
    'IT': '🇮🇹',
    'Belgique': '🇧🇪',
    'BE': '🇧🇪',
    'Suisse': '🇨🇭',
    'CH': '🇨🇭',
    'Pays-Bas': '🇳🇱',
    'NL': '🇳🇱',
    'Canada': '🇨🇦',
    'CA': '🇨🇦',
    'Brésil': '🇧🇷',
    'BR': '🇧🇷',
    'Colombie': '🇨🇴',
    'CO': '🇨🇴',
    'Pérou': '🇵🇪',
    'PE': '🇵🇪',
    'Chili': '🇨🇱',
    'CL': '🇨🇱',
    'Argentine': '🇦🇷',
    'AR': '🇦🇷',
    'Paraguay': '🇵🇾',
    'PY': '🇵🇾',
    'Mexique': '🇲🇽',
    'MX': '🇲🇽',
    'Portugal': '🇵🇹',
    'PT': '🇵🇹',
    'Grèce': '🇬🇷',
    'GR': '🇬🇷',
    'Irlande': '🇮🇪',
    'IE': '🇮🇪',
    'Pologne': '🇵🇱',
    'PL': '🇵🇱',
    'Norvège': '🇳🇴',
    'NO': '🇳🇴',
    'Suède': '🇸🇪',
    'SE': '🇸🇪',
    'Finlande': '🇫🇮',
    'FI': '🇫🇮',
    'Danemark': '🇩🇰',
    'DK': '🇩🇰',
    'Autriche': '🇦🇹',
    'AT': '🇦🇹',
    'République Tchèque': '🇨🇿',
    'CZ': '🇨🇿',
    'Hongrie': '🇭🇺',
    'HU': '🇭🇺',
    'Roumanie': '🇷🇴',
    'RO': '🇷🇴'
  };

  const emoji = flagEmojis[country] || '🏴';

  return (
    <span 
      className="inline-block leading-none not-font-mono"
      style={{ 
        fontSize: `${size}px`,
        fontFamily: '"Noto Color Emoji", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Twemoji Mozilla", sans-serif',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale'
      }}
      title={country}
    >
      {emoji}
    </span>
  );
}