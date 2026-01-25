import html2canvas from 'html2canvas';
import { useState } from 'react';

export default function DownloadButton({ elementId, filename, label = 'Télécharger' }) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    
    try {
      const element = document.getElementById(elementId);
      
      if (!element) {
        alert('Élément introuvable');
        setIsDownloading(false);
        return;
      }

      // Capture l'élément avec html2canvas
      const canvas = await html2canvas(element, {
        backgroundColor: '#0A0A0A',
        scale: 2, // Qualité HD
        logging: false,
        allowTaint: true,
        useCORS: true,
      });

      // Convertir en blob et télécharger
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = filename;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
        setIsDownloading(false);
      });
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
      alert('Erreur lors du téléchargement');
      setIsDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className={`
        px-6 py-3 bg-[#8B0000] text-[#E0E0E0] font-mono uppercase text-sm
        border-2 border-[#8B0000] hover:bg-transparent hover:text-[#8B0000]
        transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {isDownloading ? '⏳ Génération...' : `📥 ${label}`}
    </button>
  );
}
