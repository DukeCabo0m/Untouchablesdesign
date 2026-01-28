import { ButtonHTMLAttributes, ReactNode } from 'react';
import { COLORS } from '@/app/constants/colors';

type ButtonVariant = 'primary' | 'secondary';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
}

const sizeClasses = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-12 py-4 text-base',
};

export function Button({ 
  variant = 'primary', 
  size = 'md',
  children, 
  className = '',
  ...props 
}: ButtonProps) {
  const baseClasses = 'font-black uppercase tracking-tight border-2 transition-all cursor-none inline-flex items-center justify-center gap-2 font-bold';
  
  if (variant === 'primary') {
    return (
      <button
        className={`${baseClasses} ${sizeClasses[size]} text-[#E0E0E0] ${className}`}
        style={{ 
          backgroundColor: COLORS.red.pure,
          borderColor: COLORS.red.pure,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#E0E0E0';
          e.currentTarget.style.color = COLORS.red.pure;
          e.currentTarget.style.borderColor = COLORS.red.pure;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = COLORS.red.pure;
          e.currentTarget.style.color = '#E0E0E0';
          e.currentTarget.style.borderColor = COLORS.red.pure;
        }}
        {...props}
      >
        {children}
      </button>
    );
  }
  
  // Secondary variant
  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} bg-transparent text-[#E0E0E0] ${className}`}
      style={{ 
        borderColor: COLORS.red.pure,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = COLORS.red.pure;
        e.currentTarget.style.borderColor = '#E0E0E0';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.borderColor = COLORS.red.pure;
      }}
      {...props}
    >
      {children}
    </button>
  );
}