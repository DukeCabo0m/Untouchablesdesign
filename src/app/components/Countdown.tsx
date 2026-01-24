import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { COLORS } from '@/app/constants/colors';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function Countdown() {
  const targetDate = new Date('2026-02-01T10:00:00+01:00'); // 1er février 2026 à 10h (heure de Paris)
  
  const calculateTimeLeft = (): TimeLeft => {
    const difference = targetDate.getTime() - new Date().getTime();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'JOURS', value: timeLeft.days },
    { label: 'HEURES', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDES', value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="flex flex-col items-center"
        >
          {/* Number */}
          <div
            className="relative w-20 h-20 md:w-28 md:h-28 flex items-center justify-center mb-2"
            style={{
              backgroundColor: '#1A1A1A',
              border: `2px solid ${COLORS.red.pure}`,
            }}
          >
            {/* Background glow */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: `radial-gradient(circle, ${COLORS.red.pure} 0%, transparent 70%)`,
              }}
            />
            
            {/* Value */}
            <motion.span
              key={unit.value}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 text-4xl md:text-5xl font-bold tabular-nums"
              style={{ color: COLORS.red.pure }}
            >
              {String(unit.value).padStart(2, '0')}
            </motion.span>
          </div>

          {/* Label */}
          <span
            className="text-[#E0E0E0] font-mono text-xs md:text-sm uppercase tracking-widest"
          >
            {unit.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
