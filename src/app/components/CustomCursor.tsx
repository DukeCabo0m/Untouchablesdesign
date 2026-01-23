import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { COLORS } from '@/app/constants/colors';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Crosshair cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
      >
        {/* Vertical line */}
        <div className="absolute w-[2px] h-6 bg-[#E0E0E0] left-1/2 -translate-x-1/2 -translate-y-1/2" />
        {/* Horizontal line */}
        <div className="absolute h-[2px] w-6 bg-[#E0E0E0] top-1/2 -translate-x-1/2 -translate-y-1/2" />
        {/* Center dot */}
        <div 
          className="absolute w-1 h-1 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ backgroundColor: COLORS.red.pure }}
        />
      </motion.div>
    </>
  );
}