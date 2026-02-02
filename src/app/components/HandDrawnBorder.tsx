import { useEffect, useState } from 'react';
import { generateHandDrawnHorizontalLine, generateHandDrawnVerticalLine } from '@/app/utils/handDrawnLine';

interface HandDrawnBorderProps {
  /** Largeur de la bordure */
  width?: number;
  /** Hauteur de la bordure */
  height?: number;
  /** Couleur du trait */
  color?: string;
  /** Épaisseur du trait */
  strokeWidth?: number;
  /** Niveau de rugosité/imperfection (0-5) */
  roughness?: number;
  /** Côtés à afficher : 'all' | 'top' | 'bottom' | 'left' | 'right' | 'horizontal' | 'vertical' */
  sides?: 'all' | 'top' | 'bottom' | 'left' | 'right' | 'horizontal' | 'vertical';
  /** Classe CSS personnalisée */
  className?: string;
  /** Nombre de passages du trait (1-3) pour effet authentique */
  passes?: number;
}

/**
 * Composant de bordure dessinée à la main
 * Génère des lignes SVG organiques et irrégulières
 */
export function HandDrawnBorder({
  width = 100,
  height = 100,
  color = '#8B0000',
  strokeWidth = 2,
  roughness = 2,
  sides = 'all',
  className = '',
  passes = 1,
}: HandDrawnBorderProps) {
  const [paths, setPaths] = useState<{
    top: string[];
    bottom: string[];
    left: string[];
    right: string[];
  }>({
    top: [],
    bottom: [],
    left: [],
    right: [],
  });

  useEffect(() => {
    // Générer les lignes avec variations
    const newPaths = {
      top: [] as string[],
      bottom: [] as string[],
      left: [] as string[],
      right: [] as string[],
    };

    // Générer plusieurs passages pour chaque côté actif
    const shouldShowSide = (side: string) => {
      if (sides === 'all') return true;
      if (sides === 'horizontal' && (side === 'top' || side === 'bottom')) return true;
      if (sides === 'vertical' && (side === 'left' || side === 'right')) return true;
      return sides === side;
    };

    for (let i = 0; i < passes; i++) {
      const offset = (Math.random() - 0.5) * 0.3;
      const currentRoughness = roughness + (Math.random() - 0.5) * 0.2;

      if (shouldShowSide('top')) {
        newPaths.top.push(generateHandDrawnHorizontalLine(width, offset, strokeWidth, currentRoughness));
      }
      if (shouldShowSide('bottom')) {
        newPaths.bottom.push(generateHandDrawnHorizontalLine(width, height + offset, strokeWidth, currentRoughness));
      }
      if (shouldShowSide('left')) {
        newPaths.left.push(generateHandDrawnVerticalLine(height, offset, strokeWidth, currentRoughness));
      }
      if (shouldShowSide('right')) {
        newPaths.right.push(generateHandDrawnVerticalLine(height, width + offset, strokeWidth, currentRoughness));
      }
    }

    setPaths(newPaths);
  }, [width, height, roughness, sides, passes, strokeWidth]);

  return (
    <svg
      className={`absolute inset-0 pointer-events-none ${className}`}
      width={width}
      height={height}
      style={{ overflow: 'visible' }}
      aria-hidden="true"
    >
      {/* Trait du haut */}
      {paths.top.map((path, idx) => (
        <path
          key={`top-${idx}`}
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.8 + Math.random() * 0.2} // Variation d'opacité pour effet naturel
        />
      ))}

      {/* Trait du bas */}
      {paths.bottom.map((path, idx) => (
        <path
          key={`bottom-${idx}`}
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.8 + Math.random() * 0.2}
        />
      ))}

      {/* Trait de gauche */}
      {paths.left.map((path, idx) => (
        <path
          key={`left-${idx}`}
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.8 + Math.random() * 0.2}
        />
      ))}

      {/* Trait de droite */}
      {paths.right.map((path, idx) => (
        <path
          key={`right-${idx}`}
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.8 + Math.random() * 0.2}
        />
      ))}
    </svg>
  );
}
