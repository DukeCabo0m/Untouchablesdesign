import { ReactNode, useEffect, useRef, useState, forwardRef, Ref, CSSProperties } from 'react';
import { HandDrawnBorder } from './HandDrawnBorder';

interface HandDrawnBoxProps {
  /** Contenu du box */
  children: ReactNode;
  /** Couleur du trait */
  color?: string;
  /** Épaisseur du trait */
  strokeWidth?: number;
  /** Niveau de rugosité/imperfection (0-5) */
  roughness?: number;
  /** Classe CSS personnalisée pour le conteneur */
  className?: string;
  /** Padding interne */
  padding?: string;
  /** Nombre de passages du trait (1-3) */
  passes?: number;
  /** Côtés à afficher */
  sides?: 'all' | 'top' | 'bottom' | 'left' | 'right' | 'horizontal' | 'vertical';
  /** Couleur au hover (optionnel) */
  hoverColor?: string;
  /** Style CSS personnalisé */
  style?: CSSProperties;
}

/**
 * Composant de boîte/cadre dessiné à la main
 * Englobe le contenu dans une bordure organique
 */
const HandDrawnBoxComponent = ({
  children,
  color = '#8B0000',
  strokeWidth = 2,
  roughness = 2,
  className = '',
  padding = '0',
  passes = 1,
  sides = 'all',
  hoverColor,
  style,
}: HandDrawnBoxProps, ref: Ref<HTMLDivElement>) => {
  const internalRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateDimensions = () => {
      const element = (ref && typeof ref !== 'function' && ref.current) || internalRef.current;
      if (element) {
        const { offsetWidth, offsetHeight } = element;
        setDimensions({ width: offsetWidth, height: offsetHeight });
      }
    };

    updateDimensions();

    // Observer les changements de taille
    const resizeObserver = new ResizeObserver(updateDimensions);
    const element = (ref && typeof ref !== 'function' && ref.current) || internalRef.current;
    if (element) {
      resizeObserver.observe(element);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [children, ref]);

  // Determine which ref to use
  const elementRef = (ref && typeof ref !== 'function') ? ref : internalRef;
  
  // Determine current color based on hover state
  const currentColor = isHovered && hoverColor ? hoverColor : color;

  return (
    <div
      ref={elementRef}
      className={`relative ${className}`}
      style={{ padding, ...style }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Bordure dessinée à la main */}
      {dimensions.width > 0 && dimensions.height > 0 && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          <HandDrawnBorder
            width={dimensions.width}
            height={dimensions.height}
            color={currentColor}
            strokeWidth={strokeWidth}
            roughness={roughness}
            sides={sides}
            passes={passes}
          />
        </div>
      )}

      {/* Contenu */}
      {children}
    </div>
  );
};

export const HandDrawnBox = forwardRef<HTMLDivElement, HandDrawnBoxProps>(HandDrawnBoxComponent);

HandDrawnBox.displayName = 'HandDrawnBox';