import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { COLORS } from '@/app/constants/colors';

export type AlertType = 'success' | 'error' | 'info';

export interface Alert {
  id: string;
  type: AlertType;
  message: string;
}

interface AlertMessageProps {
  alert: Alert;
  onClose: (id: string) => void;
}

export function AlertMessage({ alert, onClose }: AlertMessageProps) {
  const getIcon = () => {
    switch (alert.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'error':
        return <AlertCircle className="w-5 h-5" />;
      case 'info':
        return <Info className="w-5 h-5" />;
    }
  };

  const getBorderColor = () => {
    switch (alert.type) {
      case 'success':
        return COLORS.red.pure;
      case 'error':
        return COLORS.red.pure;
      case 'info':
        return COLORS.red.pure;
    }
  };

  return (
    <motion.div
      initial={{ x: -400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -400, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="relative mb-3 overflow-hidden"
      style={{
        backgroundColor: '#0A0A0A',
        border: `2px solid ${getBorderColor()}`,
        boxShadow: `0 0 20px ${COLORS.red.pure}40`,
      }}
    >
      {/* Glitch flash effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: COLORS.red.pure }}
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.3, 0, 0.2, 0, 0.1, 0] }}
        transition={{ duration: 0.5, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }}
      />

      {/* Scanlines */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 0, 0, 0.03) 2px, rgba(139, 0, 0, 0.03) 4px)',
        }}
      />

      {/* Content */}
      <div className="relative flex items-center gap-3 px-4 py-3">
        <div style={{ color: COLORS.red.pure }}>
          {getIcon()}
        </div>
        
        <p className="flex-1 font-mono text-sm text-[#E0E0E0] uppercase tracking-wide">
          {alert.message}
        </p>

        <button
          onClick={() => onClose(alert.id)}
          className="text-[#E0E0E0] hover:text-[#8B0000] transition-colors cursor-pointer"
          aria-label="Close alert"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px]"
        style={{ backgroundColor: COLORS.red.pure }}
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: 5, ease: 'linear' }}
      />
    </motion.div>
  );
}

interface AlertContainerProps {
  alerts: Alert[];
  onClose: (id: string) => void;
}

export function AlertContainer({ alerts, onClose }: AlertContainerProps) {
  return (
    <div className="fixed bottom-24 right-6 z-50 w-[400px] max-w-[calc(100vw-3rem)]">
      <AnimatePresence>
        {alerts.map((alert) => (
          <AlertMessage key={alert.id} alert={alert} onClose={onClose} />
        ))}
      </AnimatePresence>
    </div>
  );
}