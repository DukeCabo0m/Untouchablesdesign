import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { COLORS } from '@/app/constants/colors';
import { Button } from './Button';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <Button
        onClick={scrollToTop}
        variant="primary"
        size="icon"
        aria-label="Retour vers le haut"
      >
        <ArrowUp className="w-6 h-6" />
      </Button>
    </div>
  );
}