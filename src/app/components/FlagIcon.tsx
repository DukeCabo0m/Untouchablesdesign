interface FlagIconProps {
  country: string;
  size?: number;
}

export function FlagIcon({ country, size = 24 }: FlagIconProps) {
  // Emojis drapeaux natifs
  const flagEmojis: { [key: string]: string } = {
    'France': '🇫🇷',
    'USA': '🇺🇸',
    'Allemagne': '🇩🇪',
    'Royaume-Uni': '🇬🇧',
    'Espagne': '🇪🇸',
    'Italie': '🇮🇹',
    'Belgique': '🇧🇪',
    'Suisse': '🇨🇭',
    'Pays-Bas': '🇳🇱',
    'Canada': '🇨🇦',
    'Brésil': '🇧🇷',
    'Colombie': '🇨🇴',
    'Pérou': '🇵🇪',
    'Chili': '🇨🇱',
    'Argentine': '🇦🇷',
    'Paraguay': '🇵🇾',
    'Mexique': '🇲🇽',
    'Portugal': '🇵🇹',
    'Grèce': '🇬🇷',
    'Irlande': '🇮🇪',
    'Pologne': '🇵🇱',
    'Norvège': '🇳🇴',
    'Suède': '🇸🇪',
    'Finlande': '🇫🇮',
    'Danemark': '🇩🇰',
    'Autriche': '🇦🇹',
    'République Tchèque': '🇨🇿',
    'Hongrie': '🇭🇺',
    'Roumanie': '🇷🇴'
  };

  const emoji = flagEmojis[country] || '🏴';

  return (
    <span 
      className="inline-block leading-none"
      style={{ fontSize: `${size}px` }}
      title={country}
    >
      {emoji}
    </span>
  );
}
