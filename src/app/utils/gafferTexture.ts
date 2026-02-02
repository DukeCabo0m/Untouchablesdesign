/**
 * Génère une texture de gaffer tape réaliste avec brillance et grain
 */
export function generateGafferTexture(
  width: number = 400,
  height: number = 200,
  baseColor: string = '#8B0000',
  withCreases: boolean = false
): string {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return '';

  // Convertir la couleur hex en RGB
  const r = parseInt(baseColor.slice(1, 3), 16);
  const g = parseInt(baseColor.slice(3, 5), 16);
  const b = parseInt(baseColor.slice(5, 7), 16);

  // Fond de base
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, width, height);

  // Texture tissée subtile (trame du gaffer)
  ctx.globalAlpha = 0.08;
  for (let i = 0; i < width; i += 3) {
    ctx.strokeStyle = i % 6 === 0 ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, height);
    ctx.stroke();
  }
  
  for (let i = 0; i < height; i += 3) {
    ctx.strokeStyle = i % 6 === 0 ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(width, i);
    ctx.stroke();
  }

  // Grain fin
  ctx.globalAlpha = 0.06;
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    const noise = Math.random() * 30 - 15;
    data[i] += noise;     // R
    data[i + 1] += noise; // G
    data[i + 2] += noise; // B
  }
  
  ctx.putImageData(imageData, 0, 0);

  // Plis si demandé (hover)
  if (withCreases) {
    // Pli diagonal 1 - variation de luminosité
    ctx.globalAlpha = 0.15;
    const crease1 = ctx.createLinearGradient(width * 0.2, 0, width * 0.3, height);
    crease1.addColorStop(0, 'rgba(255, 255, 255, 0)');
    crease1.addColorStop(0.3, 'rgba(255, 255, 255, 0.1)');
    crease1.addColorStop(0.5, 'rgba(0, 0, 0, 0.3)');
    crease1.addColorStop(0.7, 'rgba(255, 255, 255, 0.1)');
    crease1.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = crease1;
    ctx.fillRect(width * 0.15, 0, width * 0.2, height);

    // Pli diagonal 2
    const crease2 = ctx.createLinearGradient(width * 0.6, 0, width * 0.65, height);
    crease2.addColorStop(0, 'rgba(255, 255, 255, 0)');
    crease2.addColorStop(0.3, 'rgba(255, 255, 255, 0.08)');
    crease2.addColorStop(0.5, 'rgba(0, 0, 0, 0.25)');
    crease2.addColorStop(0.7, 'rgba(255, 255, 255, 0.08)');
    crease2.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = crease2;
    ctx.fillRect(width * 0.58, 0, width * 0.15, height);

    // Pli horizontal
    ctx.globalAlpha = 0.12;
    const crease3 = ctx.createLinearGradient(0, height * 0.4, 0, height * 0.6);
    crease3.addColorStop(0, 'rgba(255, 255, 255, 0)');
    crease3.addColorStop(0.3, 'rgba(255, 255, 255, 0.06)');
    crease3.addColorStop(0.5, 'rgba(0, 0, 0, 0.2)');
    crease3.addColorStop(0.7, 'rgba(255, 255, 255, 0.06)');
    crease3.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = crease3;
    ctx.fillRect(0, height * 0.35, width, height * 0.3);
  }

  // Reflets brillants réalistes
  ctx.globalAlpha = 0.25;
  const shine1 = ctx.createLinearGradient(0, 0, width * 0.4, height * 0.3);
  shine1.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
  shine1.addColorStop(0.4, 'rgba(255, 255, 255, 0.2)');
  shine1.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = shine1;
  ctx.fillRect(0, 0, width * 0.5, height * 0.4);

  // Deuxième reflet plus subtil
  ctx.globalAlpha = 0.15;
  const shine2 = ctx.createLinearGradient(width * 0.6, 0, width, height * 0.5);
  shine2.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
  shine2.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
  shine2.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = shine2;
  ctx.fillRect(width * 0.5, 0, width * 0.5, height * 0.6);

  // Variations de luminosité subtiles
  if (!withCreases) {
    ctx.globalAlpha = 0.1;
    const variation = ctx.createRadialGradient(
      width * 0.7, height * 0.6, 0,
      width * 0.7, height * 0.6, width * 0.5
    );
    variation.addColorStop(0, 'rgba(0, 0, 0, 0.2)');
    variation.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = variation;
    ctx.fillRect(0, 0, width, height);
  }

  return canvas.toDataURL('image/png');
}

// Cache pour éviter de régénérer à chaque fois
let cachedRedTexture: string | null = null;
let cachedBlackTexture: string | null = null;
let cachedBlackCreasedTexture: string | null = null;
let cachedGreyTexture: string | null = null;
let cachedWhiteTexture: string | null = null;
let cachedWhiteCreasedTexture: string | null = null;

export function getGafferTexture(color: 'red' | 'black' | 'grey' | 'white' = 'red', withCreases: boolean = false): string {
  if (color === 'red' && !withCreases && cachedRedTexture) {
    return cachedRedTexture;
  }
  if (color === 'black' && !withCreases && cachedBlackTexture) {
    return cachedBlackTexture;
  }
  if (color === 'black' && withCreases && cachedBlackCreasedTexture) {
    return cachedBlackCreasedTexture;
  }
  if (color === 'grey' && !withCreases && cachedGreyTexture) {
    return cachedGreyTexture;
  }
  if (color === 'white' && !withCreases && cachedWhiteTexture) {
    return cachedWhiteTexture;
  }
  if (color === 'white' && withCreases && cachedWhiteCreasedTexture) {
    return cachedWhiteCreasedTexture;
  }

  const baseColorMap = {
    red: '#8B0000',
    black: '#000000',
    grey: '#E0E0E0',
    white: '#FFFFFF',
  };

  const texture = generateGafferTexture(
    800, 
    400, 
    baseColorMap[color],
    withCreases
  );

  if (color === 'red' && !withCreases) {
    cachedRedTexture = texture;
  } else if (color === 'black' && !withCreases) {
    cachedBlackTexture = texture;
  } else if (color === 'black' && withCreases) {
    cachedBlackCreasedTexture = texture;
  } else if (color === 'grey' && !withCreases) {
    cachedGreyTexture = texture;
  } else if (color === 'white' && !withCreases) {
    cachedWhiteTexture = texture;
  } else if (color === 'white' && withCreases) {
    cachedWhiteCreasedTexture = texture;
  }

  return texture;
}