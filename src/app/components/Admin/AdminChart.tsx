import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface AdminChartProps {
  data: Array<{ [key: string]: string | number }>;
  dataKey: string;
  color?: string;
  height?: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0A0A0A] border border-[#8B0000]/50 p-3">
        <p className="text-xs text-[#F0F0F0] font-semibold mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={`tooltip-${index}`} className="flex items-center gap-2 mb-1">
            <div 
              className="w-3 h-3" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-[#808080]">
              {entry.name}:
            </span>
            <span className="text-xs text-[#F0F0F0] font-bold">
              {typeof entry.value === 'number' ? entry.value.toLocaleString('fr-FR') : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function AdminChart({
  data,
  dataKey,
  color = '#8B0000',
  height = 300
}: AdminChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-[#808080] text-sm">
        Aucune donnée disponible
      </div>
    );
  }

  // Filter out invalid data and ensure unique keys
  const cleanData = data
    .filter(item => item !== null && item !== undefined)
    .filter(item => item[dataKey] !== null && item[dataKey] !== undefined)
    .map((item, index) => {
      // Create a truly unique identifier using index
      return {
        ...item,
        __uniqueId: `data-${index}`
      };
    });

  if (cleanData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-[#808080] text-sm">
        Aucune donnée valide disponible
      </div>
    );
  }

  const axisStyle = {
    fontSize: 11,
    fontFamily: 'monospace',
    fill: '#808080'
  };

  // Get the name key (usually 'name', 'date', etc.)
  const nameKey = Object.keys(cleanData[0]).find(key => 
    key !== dataKey && key !== '__uniqueId' && typeof cleanData[0][key] === 'string'
  ) || 'name';

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={cleanData}
        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
      >
        <CartesianGrid 
          strokeDasharray="3 3" 
          stroke="#8B0000" 
          opacity={0.2}
        />
        <XAxis 
          dataKey={nameKey} 
          stroke="#8B0000" 
          style={axisStyle}
          tick={{ fill: '#808080' }}
        />
        <YAxis 
          stroke="#8B0000" 
          style={axisStyle}
          tick={{ fill: '#808080' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar 
          dataKey={dataKey} 
          fill={color} 
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}