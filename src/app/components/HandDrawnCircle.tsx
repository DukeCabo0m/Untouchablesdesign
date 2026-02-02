import { ReactNode, useEffect, useRef, useState } from 'react';

interface HandDrawnCircleProps {
  /** Contenu à entourer */
  children: ReactNode;
  /** Couleur du trait */
  color?: string;
  /** Épaisseur du trait */
  strokeWidth?: number;
  /** Niveau de rugosité/imperfection (0-5) */
  roughness?: number;
  /** Classe CSS personnalisée */
  className?: string;
  /** Padding autour du contenu */
  padding?: string;
}

/**
 * Composant qui souligne le contenu avec un trait épais dessiné à la main
 */
export function HandDrawnCircle({
  children,
  color = '#8B0000',
  strokeWidth = 10,
  roughness = 2,
  className = '',
  padding = '2px 8px',
}: HandDrawnCircleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [paths, setPaths] = useState<string[]>([]);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { offsetWidth } = containerRef.current;
        setWidth(offsetWidth);
      }
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [children]);

  useEffect(() => {
    if (width > 0) {
      // Générer plusieurs tracés pour l'effet main levée
      const generatedPaths = [];
      for (let pass = 0; pass < 3; pass++) {
        generatedPaths.push(generateHandDrawnLine(width, pass));
      }
      setPaths(generatedPaths);
    }
  }, [width, roughness]);

  // Générer une ligne ondulée dessinée à la main
  const generateHandDrawnLine = (lineWidth: number, seed: number) => {
    const startX = 0;
    const endX = lineWidth;
    const y = 6; // Position sous le texte
    
    const points: Array<{x: number, y: number}> = [];
    const numPoints = Math.max(8, Math.floor(lineWidth / 15)); // Points proportionnels à la largeur
    
    // Générer des points le long de la ligne avec variations verticales
    for (let i = 0; i <= numPoints; i++) {
      const x = startX + (endX - startX) * (i / numPoints);
      
      // Variation verticale pour l'effet main levée
      const yVariation = (Math.random() - 0.5) * roughness * (1 + seed * 0.5);
      const yPos = y + yVariation;
      
      points.push({ x, y: yPos });
    }
    
    // Créer le path avec des courbes de Bézier pour la fluidité
    let pathData = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      const p0 = points[i - 1];
      const p1 = points[i];
      
      // Point de contrôle pour la courbe de Bézier
      const cpx = p0.x + (p1.x - p0.x) * 0.5 + (Math.random() - 0.5) * roughness;
      const cpy = p0.y + (p1.y - p0.y) * 0.5 + (Math.random() - 0.5) * roughness;
      
      pathData += ` Q ${cpx} ${cpy}, ${p1.x} ${p1.y}`;
    }
    
    return pathData;
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      style={{ padding, paddingBottom: '16px' }}
    >
      {/* Contenu */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Trait dessiné à la main sous le texte */}
      {width > 0 && paths.length > 0 && (
        <svg
          className="absolute pointer-events-none"
          style={{
            left: '0',
            bottom: '0',
            width: width,
            height: 18,
            overflow: 'visible',
          }}
        >
          {/* Dessiner plusieurs passages pour épaissir */}
          {paths.map((path, index) => (
            <path
              key={index}
              d={path}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth + index * 1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.8 - index * 0.15}
            />
          ))}
        </svg>
      )}
    </div>
  );
}