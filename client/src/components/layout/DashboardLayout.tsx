import React, { useState } from 'react';
import { Sidebar, NavItemKey } from './Sidebar.js';
import { Header } from './Header.js';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeNav: NavItemKey;
  onNavigate: (key: NavItemKey) => void;
  onNewLeadClick?: () => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeNav,
  onNavigate,
  onNewLeadClick,
  searchQuery = '',
  onSearchChange,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col lg:flex-row overflow-x-hidden font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        activeItem={activeNav}
        onNavigate={onNavigate}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <Header
          title={activeNav}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onNewLeadClick={onNewLeadClick}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
        />

        {/* Dynamic Page Container */}
        <main className="flex-1 p-6 space-y-6 overflow-y-auto max-w-[1600px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
