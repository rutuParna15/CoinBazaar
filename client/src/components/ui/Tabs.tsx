import React, { createContext, useContext, useState } from 'react';

// Context
interface TabsContextType {
  selectedTab: string;
  setSelectedTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a TabsProvider');
  }
  return context;
};

// Component Props Interfaces
interface TabsProps {
  defaultValue: string;
  className?: string;
  children: React.ReactNode;
}

interface TabsListProps {
  className?: string;
  children: React.ReactNode;
}

interface TabsTriggerProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

interface TabsContentProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

// Components
export const Tabs: React.FC<TabsProps> = ({ defaultValue, className = '', children }) => {
  const [selectedTab, setSelectedTab] = useState<string>(defaultValue);

  return (
    <TabsContext.Provider value={{ selectedTab, setSelectedTab }}>
      <div className={className}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

export const TabsList: React.FC<TabsListProps> = ({ className = '', children }) => {
  return (
    <div className={className} role="tablist">
      {children}
    </div>
  );
};

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, className = '', children }) => {
  const { selectedTab, setSelectedTab } = useTabs();
  
  const isActive = value === selectedTab;
  const dataState = isActive ? 'active' : 'inactive';
  
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      data-state={dataState}
      className={className}
      onClick={() => setSelectedTab(value)}
    >
      {children}
    </button>
  );
};

export const TabsContent: React.FC<TabsContentProps> = ({ value, className = '', children }) => {
  const { selectedTab } = useTabs();
  
  if (value !== selectedTab) {
    return null;
  }
  
  return (
    <div 
      role="tabpanel" 
      data-state="active"
      className={className}
    >
      {children}
    </div>
  );
};