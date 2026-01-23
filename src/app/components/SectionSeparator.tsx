import { COLORS } from '@/app/constants/colors';

export function SectionSeparator() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="h-[3px]" style={{ backgroundColor: COLORS.red.pure }} />
      </div>
    </div>
  );
}