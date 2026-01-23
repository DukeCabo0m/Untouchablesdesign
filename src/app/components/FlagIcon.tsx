interface FlagIconProps {
  country: string;
  size?: number;
}

export function FlagIcon({ country, size = 24 }: FlagIconProps) {
  // Drapeaux rectangulaires en CSS pur
  const flagStyles: { [key: string]: JSX.Element } = {
    'France': (
      <div className="flex overflow-hidden border border-[#E0E0E0]/20" style={{ width: size * 1.5, height: size }}>
        <div className="w-1/3 bg-[#0055A4]"></div>
        <div className="w-1/3 bg-[#FFFFFF]"></div>
        <div className="w-1/3 bg-[#EF4135]"></div>
      </div>
    ),
    'USA': (
      <div className="relative overflow-hidden border border-[#E0E0E0]/20" style={{ width: size * 1.5, height: size }}>
        <div className="absolute inset-0 flex flex-col">
          <div className="flex-1 bg-[#B22234]"></div>
          <div className="flex-1 bg-[#FFFFFF]"></div>
          <div className="flex-1 bg-[#B22234]"></div>
          <div className="flex-1 bg-[#FFFFFF]"></div>
          <div className="flex-1 bg-[#B22234]"></div>
        </div>
        <div className="absolute top-0 left-0 bg-[#3C3B6E]" style={{ width: size * 0.6, height: size * 0.5 }}></div>
      </div>
    ),
    'Allemagne': (
      <div className="flex flex-col overflow-hidden border border-[#E0E0E0]/20" style={{ width: size * 1.5, height: size }}>
        <div className="h-1/3 bg-[#000000]"></div>
        <div className="h-1/3 bg-[#DD0000]"></div>
        <div className="h-1/3 bg-[#FFCE00]"></div>
      </div>
    ),
    'Royaume-Uni': (
      <div className="relative overflow-hidden border border-[#E0E0E0]/20" style={{ width: size * 1.5, height: size }}>
        <div className="absolute inset-0 bg-[#012169]"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-full h-[20%] bg-[#FFFFFF]"></div>
          <div className="absolute h-full w-[15%] bg-[#FFFFFF]"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-full h-[12%] bg-[#C8102E]"></div>
          <div className="absolute h-full w-[9%] bg-[#C8102E]"></div>
        </div>
      </div>
    ),
    'Espagne': (
      <div className="flex flex-col overflow-hidden border border-[#E0E0E0]/20" style={{ width: size * 1.5, height: size }}>
        <div className="flex-1 bg-[#AA151B]"></div>
        <div className="flex-[2] bg-[#F1BF00]"></div>
        <div className="flex-1 bg-[#AA151B]"></div>
      </div>
    ),
    'Italie': (
      <div className="flex overflow-hidden border border-[#E0E0E0]/20" style={{ width: size * 1.5, height: size }}>
        <div className="w-1/3 bg-[#009246]"></div>
        <div className="w-1/3 bg-[#FFFFFF]"></div>
        <div className="w-1/3 bg-[#CE2B37]"></div>
      </div>
    ),
    'Belgique': (
      <div className="flex overflow-hidden border border-[#E0E0E0]/20" style={{ width: size * 1.5, height: size }}>
        <div className="w-1/3 bg-[#000000]"></div>
        <div className="w-1/3 bg-[#FDDA24]"></div>
        <div className="w-1/3 bg-[#EF3340]"></div>
      </div>
    ),
    'Suisse': (
      <div className="relative overflow-hidden border border-[#E0E0E0]/20" style={{ width: size * 1.5, height: size }}>
        <div className="absolute inset-0 bg-[#FF0000]"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-[15%] h-[50%] bg-[#FFFFFF]"></div>
          <div className="absolute w-[50%] h-[15%] bg-[#FFFFFF]"></div>
        </div>
      </div>
    ),
    'Pays-Bas': (
      <div className="flex flex-col overflow-hidden border border-[#E0E0E0]/20" style={{ width: size * 1.5, height: size }}>
        <div className="h-1/3 bg-[#AE1C28]"></div>
        <div className="h-1/3 bg-[#FFFFFF]"></div>
        <div className="h-1/3 bg-[#21468B]"></div>
      </div>
    ),
    'Canada': (
      <div className="relative overflow-hidden border border-[#E0E0E0]/20" style={{ width: size * 1.5, height: size }}>
        <div className="absolute inset-0 flex">
          <div className="w-1/4 bg-[#FF0000]"></div>
          <div className="flex-1 bg-[#FFFFFF]"></div>
          <div className="w-1/4 bg-[#FF0000]"></div>
        </div>
      </div>
    ),
    'Brésil': (
      <div className="relative overflow-hidden border border-[#E0E0E0]/20" style={{ width: size * 1.5, height: size }}>
        <div className="absolute inset-0 bg-[#009739]"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[40%] h-[40%] bg-[#FEDD00]"></div>
        </div>
      </div>
    )
  };

  return flagStyles[country] || (
    <div className="bg-[#666666] border border-[#E0E0E0]/20" style={{ width: size * 1.5, height: size }}></div>
  );
}
