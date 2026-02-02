import { useEffect, useState, useRef } from 'react';
import { generateHandDrawnVerticalLine } from '@/app/utils/handDrawnLine';

interface HandDrawnVerticalLineProps {
  /** Couleur du trait */
  color?: string;
  /** Épaisseur du trait */
  strokeWidth?: number;
  /** Niveau de rugosité/imperfection (0-5) */
  roughness?: number;
  /** Classe CSS personnalisée */
  className?: string;
  /** Nombre de passages du trait (1-3) */
  passes?: number;
  /** Opacité des traits (0-1) */
  opacity?: number;
}

/**
 * Composant de ligne verticale dessinée à la main
 * Pour les bordures latérales et accents verticaux
 */
export function HandDrawnVerticalLine({
  color = '#8B0000',
  strokeWidth = 2,
  roughness = 2,
  className = '',
  passes = 2,
  opacity = 0.85,
}: HandDrawnVerticalLineProps) {
  const [paths, setPaths] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setHeight(containerRef.current.offsetHeight);
      }
    };

    updateHeight();

    // Observer les changements de taille
    const resizeObserver = new ResizeObserver(updateHeight);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (height === 0) return;

    // Générer plusieurs passages pour effet authentique
    const newPaths: string[] = [];
    
    for (let i = 0; i < passes; i++) {
      const offset = (Math.random() - 0.5) * 0.5;
      const currentRoughness = roughness + (Math.random() - 0.5) * 0.3;
      newPaths.push(generateHandDrawnVerticalLine(height, offset, strokeWidth, currentRoughness));
    }

    setPaths(newPaths);
  }, [height, roughness, passes, strokeWidth]);

  return (
    <div ref={containerRef} className={`relative w-[4px] h-full ${className}`}>
      {height > 0 && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          width={4}
          height={height}
          style={{ overflow: 'visible' }}
          aria-hidden="true"
        >
          {paths.map((path, idx) => (
            <path
              key={idx}
              d={path}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={opacity}
            />
          ))}
        </svg>
      )}
    </div>
  );
}