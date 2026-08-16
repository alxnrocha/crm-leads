import React from 'react';
import { Search, Plus, Menu, Sun, Moon } from 'lucide-react';
import { Button } from '../ui/index.js';
import { useTheme } from '../../hooks/useTheme.js';

interface HeaderProps {
  title: string;
  onOpenMobileMenu: () => void;
  onNewLeadClick?: () => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onOpenMobileMenu,
  onNewLeadClick,
  searchQuery = '',
  onSearchChange,
}) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="h-18 px-6 border-b border-slate-800/80 bg-[#0b0f17]/90 backdrop-blur-md flex items-center justify-between gap-4 sticky top-0 z-30">
      {/* Left: Mobile Menu Trigger + Page Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold tracking-tight text-white capitalize">{title}</h1>
      </div>

      {/* Center: Global Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search leads, companies, accounts, contacts..."
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            className="w-full bg-[#121824] border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-colors"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleTheme}
          className="border-slate-800 bg-[#121824] text-slate-300 hover:text-white px-2.5"
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-400" />
          )}
        </Button>

        {onNewLeadClick && (
          <Button
            variant="primary"
            size="sm"
            onClick={onNewLeadClick}
            leftIcon={<Plus className="w-4 h-4" />}
            className="bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20 text-xs font-semibold"
          >
            Nuevo Lead
          </Button>
        )}
      </div>
    </header>
  );
};
