import { TrendingUp, TrendingDown } from 'lucide-react';

interface AdminStatsCardProps {
  icon: any;
  label: string;
  value: number | string;
  suffix?: string;
  color?: string;
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
  onClick?: () => void;
}

export function AdminStatsCard({
  icon: Icon,
  label,
  value,
  suffix,
  color = '#8B0000',
  trend,
  onClick
}: AdminStatsCardProps) {
  const isClickable = !!onClick;

  return (
    <div
      onClick={onClick}
      className={`
        bg-[#0A0A0A] 
        border border-[#8B0000]/30 
        p-6 
        ${isClickable ? 'cursor-pointer hover:border-[#8B0000]' : ''}
      `}
    >
      {/* Icon & Trend */}
      <div className="flex items-start justify-between mb-4">
        <div 
          className="p-3"
          style={{ 
            backgroundColor: `${color}20`,
          }}
        >
          <Icon size={24} style={{ color }} />
        </div>

        {trend && (
          <div className={`flex items-center gap-1 ${trend.isPositive ? 'text-[#F0F0F0]' : 'text-[#8B0000]'}`}>
            {trend.isPositive ? (
              <TrendingUp size={16} />
            ) : (
              <TrendingDown size={16} />
            )}
            <span className="text-xs font-bold">
              {trend.isPositive ? '+' : ''}{trend.value}%
            </span>
          </div>
        )}
      </div>

      {/* Value */}
      <div className="mb-2">
        <div className="text-4xl font-bold text-[#F0F0F0] mb-1">
          {value}{suffix && <span className="text-2xl text-[#808080] ml-1">{suffix}</span>}
        </div>
        {trend?.label && (
          <div className="text-[10px] text-[#808080]">
            {trend.label}
          </div>
        )}
      </div>

      {/* Label */}
      <div className="text-xs uppercase tracking-wide font-medium" style={{ color }}>
        {label}
      </div>
    </div>
  );
}