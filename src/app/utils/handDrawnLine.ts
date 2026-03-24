/**
 * Génère des lignes SVG dessinées à la main avec variations organiques
 * pour remplacer les bordures droites et rigides
 */

interface Point {
  x: number;
  y: number;
}

/**
 * Ajoute des variations organiques à un point
 */
function addVariation(x: number, y: number, intensity: number = 1): Point {
  const variation = intensity * 0.8; // Juste milieu entre trop droit et trop ondulé
  return {
    x: x + (Math.random() - 0.5) * variation,
    y: y + (Math.random() - 0.5) * variation,
  };
}

/**
 * Génère une ligne horizontale dessinée à la main
 */
export function generateHandDrawnHorizontalLine(
  width: number,
  y: number = 0,
  thickness: number = 2,
  roughness: number = 2
): string {
  const segments = Math.max(Math.floor(width / 20), 4); // Un point tous les ~20px
  const points: Point[] = [];

  // Point de départ
  points.push(addVariation(0, y, roughness));

  // Points intermédiaires
  for (let i = 1; i < segments; i++) {
    const x = (width * i) / segments;
    points.push(addVariation(x, y, roughness));
  }

  // Point de fin
  points.push(addVariation(width, y, roughness * 0.5)); // Moins de variation à la fin

  // Générer le path SVG avec des courbes de Bézier quadratiques pour fluidité
  let path = `M ${points[0].x},${points[0].y}`;
  
  for (let i = 1; i < points.length; i++) {
    const current = points[i];
    const previous = points[i - 1];
    
    // Point de contrôle au milieu entre les deux points
    const cpX = (previous.x + current.x) / 2;
    const cpY = (previous.y + current.y) / 2 + (Math.random() - 0.5) * roughness * 1.3; // Juste milieu pour subtilité
    
    path += ` Q ${cpX},${cpY} ${current.x},${current.y}`;
  }

  return path;
}

/**
 * Génère une ligne verticale dessinée à la main
 */
export function generateHandDrawnVerticalLine(
  height: number,
  x: number = 0,
  thickness: number = 2,
  roughness: number = 2
): string {
  const segments = Math.max(Math.floor(height / 20), 4);
  const points: Point[] = [];

  points.push(addVariation(x, 0, roughness));

  for (let i = 1; i < segments; i++) {
    const y = (height * i) / segments;
    points.push(addVariation(x, y, roughness));
  }

  points.push(addVariation(x, height, roughness * 0.5));

  let path = `M ${points[0].x},${points[0].y}`;
  
  for (let i = 1; i < points.length; i++) {
    const current = points[i];
    const previous = points[i - 1];
    
    const cpX = (previous.x + current.x) / 2 + (Math.random() - 0.5) * roughness * 1.3; // Juste milieu pour subtilité
    const cpY = (previous.y + current.y) / 2;
    
    path += ` Q ${cpX},${cpY} ${current.x},${current.y}`;
  }

  return path;
}

/**
 * Génère un rectangle dessiné à la main (4 lignes)
 */
export function generateHandDrawnRect(
  width: number,
  height: number,
  roughness: number = 2
): {
  top: string;
  right: string;
  bottom: string;
  left: string;
} {
  return {
    top: generateHandDrawnHorizontalLine(width, 0, 2, roughness),
    right: generateHandDrawnVerticalLine(height, width, 2, roughness),
    bottom: generateHandDrawnHorizontalLine(width, height, 2, roughness),
    left: generateHandDrawnVerticalLine(height, 0, 2, roughness),
  };
}

/**
 * Génère plusieurs passages pour simuler le trait dessiné à la main
 * (un vrai trait à la main a souvent plusieurs passages)
 */
export function generateMultiPassLine(
  type: 'horizontal' | 'vertical',
  length: number,
  position: number = 0,
  passes: number = 2,
  roughness: number = 2
): string[] {
  const lines: string[] = [];
  
  for (let i = 0; i < passes; i++) {
    // Chaque passage a une variation légèrement différente
    const offset = (Math.random() - 0.5) * 0.5;
    const currentRoughness = roughness + (Math.random() - 0.5) * 0.3;
    
    if (type === 'horizontal') {
      lines.push(
        generateHandDrawnHorizontalLine(length, position + offset, 2, currentRoughness)
      );
    } else {
      lines.push(
        generateHandDrawnVerticalLine(length, position + offset, 2, currentRoughness)
      );
    }
  }
  
  return lines;
}
