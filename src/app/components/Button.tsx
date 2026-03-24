import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router';
import { COLORS } from '@/app/constants/colors';
import { getGafferTexture } from '@/app/utils/gafferTexture';
import { ExternalLink } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

type ButtonAsButton = {
  as?: 'button';
  href?: never;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonAsLink = {
  as: 'a';
  href: string;
  external?: boolean;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;

type BaseButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
};

type ButtonProps = BaseButtonProps & (ButtonAsButton | ButtonAsLink);

const sizeClasses = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-12 py-4 text-base',
  icon: 'p-4',
};

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '', 
  as = 'button', 
  ...props 
}: ButtonProps) {
  const baseClasses = 'font-mono tracking-tight transition-all inline-flex items-center justify-center gap-2 relative overflow-visible cursor-pointer';
  
  const getVariantStyles = (variant: ButtonVariant, isHovered: boolean) => {
    // Clip-path avec bords vraiment déchirés comme sur l'image
    const gafferStyles = {
      clipPath: `polygon(
        3% 0%, 5% 2%, 8% 1%, 12% 3%, 15% 1%, 20% 2%, 25% 0%, 30% 1%, 35% 3%, 40% 1%, 
        45% 2%, 50% 0%, 55% 2%, 60% 1%, 65% 3%, 70% 1%, 75% 2%, 80% 0%, 85% 3%, 
        90% 1%, 94% 2%, 97% 0%, 99% 3%, 100% 6%, 100% 10%, 99% 15%, 100% 20%, 
        99% 30%, 100% 40%, 99% 50%, 100% 60%, 99% 70%, 100% 80%, 99% 85%, 100% 90%, 
        99% 94%, 97% 97%, 100% 100%, 95% 99%, 90% 100%, 85% 98%, 80% 100%, 75% 99%, 
        70% 100%, 65% 98%, 60% 100%, 55% 99%, 50% 100%, 45% 99%, 40% 100%, 35% 98%, 
        30% 100%, 25% 99%, 20% 100%, 15% 98%, 10% 100%, 5% 99%, 2% 97%, 0% 100%, 
        1% 95%, 0% 90%, 2% 85%, 0% 80%, 1% 70%, 0% 60%, 1% 50%, 0% 40%, 1% 30%, 
        0% 20%, 1% 15%, 0% 10%, 2% 6%
      )`,
      transform: isHovered ? 'rotate(-1deg) translateY(-2px)' : 'rotate(-0.5deg)',
      border: 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    };

    if (variant === 'primary') {
      return {
        ...gafferStyles,
        color: isHovered ? '#000000' : '#FFFFFF',
        backgroundImage: isHovered 
          ? `url(${getGafferTexture('white', true)})`
          : `url(${getGafferTexture('red')})`,
      };
    }
    
    // Secondary variant - avec bordure et texture semi-transparente
    return {
      ...gafferStyles,
      color: isHovered ? '#0A0A0A' : '#E0E0E0',
      backgroundImage: isHovered
        ? `url(${getGafferTexture('grey', false)})`
        : `url(${getGafferTexture('black', false)})`,
    };
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const styles = getVariantStyles(variant, true);
    Object.assign(e.currentTarget.style, styles);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const styles = getVariantStyles(variant, false);
    Object.assign(e.currentTarget.style, styles);
  };

  const defaultStyles = getVariantStyles(variant, false);
  const combinedClassName = `${baseClasses} ${sizeClasses[size]} ${className}`;

  if (as === 'a') {
    const { href, external, ...linkProps } = props as ButtonAsLink;
    
    // Si c'est un lien externe, utiliser <a>
    if (external) {
      return (
        <a
          href={href}
          className={combinedClassName}
          style={defaultStyles}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          target="_blank"
          rel="noopener noreferrer"
          {...linkProps}
        >
          {children}
          <ExternalLink className="ml-2" size={12} />
        </a>
      );
    }
    
    // Si c'est un lien interne, utiliser Link de React Router
    return (
      <Link
        to={href}
        className={combinedClassName}
        style={defaultStyles}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...linkProps}
      >
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  // Remove any potential 'external' prop that might leak through
  const { external: _, ...safeButtonProps } = buttonProps as any;
  
  return (
    <button
      className={combinedClassName}
      style={defaultStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...safeButtonProps}
    >
      {children}
    </button>
  );
}