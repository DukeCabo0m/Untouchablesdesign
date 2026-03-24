import { ReactNode } from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: any;
  count?: number;
}

interface AdminTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function AdminTabs({ tabs, activeTab, onTabChange }: AdminTabsProps) {
  return (
    <div className="border-b border-[#8B0000]/30 bg-[#0A0A0A]">
      <div className="flex items-center gap-2 px-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                relative px-6 py-4 flex items-center gap-2 text-xs font-medium uppercase tracking-wide
                transition-colors
                ${isActive
                  ? 'text-[#F0F0F0] bg-[#8B0000]/20'
                  : 'text-[#808080] hover:text-[#F0F0F0] hover:bg-[#1A1A1A]'
                }
              `}
            >
              {Icon && <Icon size={16} />}
              {tab.label}
              {tab.count !== undefined && (
                <span className={`
                  ml-2 px-2 py-0.5 text-[10px] font-bold
                  ${isActive
                    ? 'bg-[#8B0000] text-[#F0F0F0]'
                    : 'bg-[#1A1A1A] text-[#808080]'
                  }
                `}>
                  {tab.count}
                </span>
              )}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8B0000]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface TabPanelProps {
  id: string;
  activeTab: string;
  children: ReactNode;
}

export function TabPanel({ id, activeTab, children }: TabPanelProps) {
  if (id !== activeTab) return null;
  
  return <div>{children}</div>;
}
