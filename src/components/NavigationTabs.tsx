
import React from 'react';

interface NavigationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const NavigationTabs = ({ activeTab, onTabChange }: NavigationTabsProps) => {
  const tabs = ['Summary', 'Chart', 'Statistics', 'Analysis', 'Settings'];

  return (
    <div className="border-b border-border mb-6">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`nav-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => onTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NavigationTabs;
