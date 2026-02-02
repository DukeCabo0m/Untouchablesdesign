import { COLORS } from '@/app/constants/colors';
import { HandDrawnLine } from './HandDrawnLine';

export function SectionSeparator() {
  return (
    <div className="py-12 px-0">
      <div>
        <HandDrawnLine 
          color={COLORS.red.pure} 
          strokeWidth={3} 
          roughness={2.5} 
          passes={2}
        />
      </div>
    </div>
  );
}