import { useEffect, useState, useRef } from 'react';
import { generateHandDrawnHorizontalLine } from '@/app/utils/handDrawnLine';

interface HandDrawnLineProps {
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
}

/**
 * Composant de ligne horizontale dessinée à la main
 * Pour les séparateurs et dividers
 */
export function HandDrawnLine({
  color = '#8B0000',
  strokeWidth = 2,
  roughness = 2,
  className = '',
  passes = 2,
}: HandDrawnLineProps) {
  const [paths, setPaths] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();

    // Observer les changements de taille
    const resizeObserver = new ResizeObserver(updateWidth);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (width === 0) return;

    // Générer plusieurs passages pour effet authentique
    const newPaths: string[] = [];
    
    for (let i = 0; i < passes; i++) {
      const offset = (Math.random() - 0.5) * 0.5;
      const currentRoughness = roughness + (Math.random() - 0.5) * 0.3;
      newPaths.push(generateHandDrawnHorizontalLine(width, offset, strokeWidth, currentRoughness));
    }

    setPaths(newPaths);
  }, [width, roughness, passes, strokeWidth]);

  return (
    <div ref={containerRef} className={`relative w-full h-[4px] ${className}`}>
      {width > 0 && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          width={width}
          height={4}
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
            />
          ))}
        </svg>
      )}
    </div>
  );
}