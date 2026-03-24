import { useState, useMemo } from 'react';
import { 
  ChevronUp, 
  ChevronDown, 
  ChevronsUpDown,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Check,
  X
} from 'lucide-react';

export interface Column<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
}

export interface Action<T> {
  icon: any;
  label: string;
  onClick: (row: T) => void;
  variant?: 'default' | 'danger' | 'success';
  show?: (row: T) => boolean;
}

interface AdminDataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: Action<T>[];
  selectable?: boolean;
  onSelectionChange?: (selected: T[]) => void;
  emptyMessage?: string;
}

export function AdminDataTable<T extends Record<string, any>>({
  data,
  columns,
  actions = [],
  selectable = false,
  onSelectionChange,
  emptyMessage = 'Aucune donnée disponible'
}: AdminDataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | string;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  // Tri des données
  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue === bValue) return 0;

      const comparison = aValue > bValue ? 1 : -1;
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [data, sortConfig]);

  const handleSort = (key: keyof T | string) => {
    setSortConfig((current) => {
      if (!current || current.key !== key) {
        return { key, direction: 'asc' };
      }
      if (current.direction === 'asc') {
        return { key, direction: 'desc' };
      }
      return null;
    });
  };

  const toggleRowSelection = (index: number) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedRows(newSelected);
    
    if (onSelectionChange) {
      const selectedData = Array.from(newSelected).map(i => data[i]);
      onSelectionChange(selectedData);
    }
  };

  const toggleAllRows = () => {
    if (selectedRows.size === data.length) {
      setSelectedRows(new Set());
      onSelectionChange?.([]);
    } else {
      const allIndexes = new Set(data.map((_, i) => i));
      setSelectedRows(allIndexes);
      onSelectionChange?.(data);
    }
  };

  const getSortIcon = (columnKey: keyof T | string) => {
    if (!sortConfig || sortConfig.key !== columnKey) {
      return <ChevronsUpDown size={14} className="text-[#808080]" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ChevronUp size={14} className="text-[#F0F0F0]" />
      : <ChevronDown size={14} className="text-[#F0F0F0]" />;
  };

  const getActionVariantClass = (variant?: string) => {
    switch (variant) {
      case 'danger':
        return 'hover:bg-[#8B0000]/20 border-[#8B0000]/40 text-[#8B0000]';
      case 'success':
        return 'hover:bg-[#F0F0F0]/20 border-[#F0F0F0]/40 text-[#F0F0F0]';
      default:
        return 'hover:bg-[#808080]/20 border-[#808080]/40 text-[#808080]';
    }
  };

  if (data.length === 0) {
    return (
      <div className="bg-[#0A0A0A] border border-[#8B0000]/30 p-12 text-center">
        <p className="text-sm text-[#808080]">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0A0A0A] border border-[#8B0000]/30 overflow-hidden">
      {/* Table Header */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#1A1A1A] border-b border-[#8B0000]/30">
              {selectable && (
                <th className="p-4 text-left w-12">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === data.length && data.length > 0}
                    onChange={toggleAllRows}
                    className="w-4 h-4 cursor-pointer accent-[#8B0000]"
                  />
                </th>
              )}
              {columns.map((column, index) => (
                <th 
                  key={index}
                  className="p-4 text-left"
                  style={{ width: column.width }}
                >
                  {column.sortable ? (
                    <button
                      onClick={() => handleSort(column.key)}
                      className="flex items-center gap-2 text-xs text-[#F0F0F0] font-semibold uppercase tracking-wide hover:text-[#8B0000]"
                    >
                      {column.label}
                      {getSortIcon(column.key)}
                    </button>
                  ) : (
                    <span className="text-xs text-[#F0F0F0] font-semibold uppercase tracking-wide">
                      {column.label}
                    </span>
                  )}
                </th>
              ))}
              {actions.length > 0 && (
                <th className="p-4 text-right w-32">
                  <span className="text-xs text-[#F0F0F0] font-semibold uppercase tracking-wide">
                    Actions
                  </span>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, rowIndex) => (
              <tr 
                key={rowIndex}
                className="border-b border-[#8B0000]/10 hover:bg-[#1A1A1A]"
                onMouseEnter={() => setHoveredRow(rowIndex)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                {selectable && (
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(rowIndex)}
                      onChange={() => toggleRowSelection(rowIndex)}
                      className="w-4 h-4 cursor-pointer accent-[#8B0000]"
                    />
                  </td>
                )}
                {columns.map((column, colIndex) => {
                  const value = row[column.key];
                  return (
                    <td key={colIndex} className="p-4">
                      {column.render ? (
                        column.render(value, row)
                      ) : (
                        <span className="text-sm text-[#F0F0F0]">
                          {value !== null && value !== undefined ? String(value) : '-'}
                        </span>
                      )}
                    </td>
                  );
                })}
                {actions.length > 0 && (
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      {actions
                        .filter(action => !action.show || action.show(row))
                        .map((action, actionIndex) => {
                          const Icon = action.icon;
                          return (
                            <button
                              key={actionIndex}
                              onClick={() => action.onClick(row)}
                              className={`
                                p-2
                                ${getActionVariantClass(action.variant)}
                              `}
                              title={action.label}
                            >
                              <Icon size={14} />
                            </button>
                          );
                        })}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Selection Info */}
      {selectable && selectedRows.size > 0 && (
        <div className="p-4 bg-[#1A1A1A] border-t border-[#8B0000]/30 flex items-center justify-between">
          <span className="text-xs text-[#F0F0F0]">
            {selectedRows.size} élément{selectedRows.size > 1 ? 's' : ''} sélectionné{selectedRows.size > 1 ? 's' : ''}
          </span>
          <button
            onClick={() => {
              setSelectedRows(new Set());
              onSelectionChange?.([]);
            }}
            className="text-xs text-[#8B0000] hover:text-[#F0F0F0]"
          >
            Tout désélectionner
          </button>
        </div>
      )}
    </div>
  );
}