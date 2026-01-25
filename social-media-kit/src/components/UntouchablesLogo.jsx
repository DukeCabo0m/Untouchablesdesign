export default function UntouchablesLogo({ width = 200, height = 60, className = '' }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 400 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* UNTOUCHABLES en lettres condensées */}
      <text
        x="200"
        y="70"
        fontSize="48"
        fontWeight="900"
        fontFamily="Arial Black, Impact, sans-serif"
        textAnchor="middle"
        fill="#E0E0E0"
        style={{ letterSpacing: '-0.05em' }}
      >
        UNTOUCHABLES
      </text>
      
      {/* Ligne rouge au-dessus */}
      <rect x="30" y="20" width="340" height="4" fill="#8B0000" />
      
      {/* Ligne rouge en-dessous */}
      <rect x="30" y="96" width="340" height="4" fill="#8B0000" />
      
      {/* Détails rouges sur les côtés */}
      <rect x="20" y="20" width="4" height="80" fill="#8B0000" />
      <rect x="376" y="20" width="4" height="80" fill="#8B0000" />
    </svg>
  );
}
