import React from 'react';
import { useAuth } from '../../hooks/useAuth.js';
import {
  Layers,
  LayoutDashboard,
  Kanban,
  Users,
  UserCheck,
  Building2,
  Clock,
  Calendar,
  BarChart3,
  Cpu,
  Settings,
  LogOut,
} from 'lucide-react';
import { clsx } from 'clsx';

export type NavItemKey =
  | 'dashboard'
  | 'pipeline'
  | 'leads'
  | 'contacts'
  | 'accounts'
  | 'activities'
  | 'calendar'
  | 'reports'
  | 'automations'
  | 'settings';

interface SidebarProps {
  activeItem: NavItemKey;
  onNavigate: (item: NavItemKey) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeItem,
  onNavigate,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const { user, logout } = useAuth();

  const navItems = [
    { key: 'dashboard' as NavItemKey, label: 'Dashboard', icon: LayoutDashboard },
    { key: 'pipeline' as NavItemKey, label: 'Pipeline', icon: Kanban },
    { key: 'leads' as NavItemKey, label: 'Leads', icon: Users },
    { key: 'contacts' as NavItemKey, label: 'Contacts', icon: UserCheck },
    { key: 'accounts' as NavItemKey, label: 'Accounts', icon: Building2 },
    { key: 'activities' as NavItemKey, label: 'Activities', icon: Clock },
    { key: 'calendar' as NavItemKey, label: 'Calendar', icon: Calendar },
    { key: 'reports' as NavItemKey, label: 'Reports', icon: BarChart3 },
    { key: 'automations' as NavItemKey, label: 'Automations', icon: Cpu },
    { key: 'settings' as NavItemKey, label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={clsx(
          'fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0b0f17] border-r border-slate-800/80 flex flex-col justify-between p-4 select-none transition-transform duration-200 ease-in-out',
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Top: Logo & App Title */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
              <Layers className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-white tracking-tight">LeadFlow</span>
              <span className="text-[10px] font-medium text-slate-500 tracking-wider uppercase">
                B2B Sales CRM
              </span>
            </div>
          </div>

          {/* Navigation Items List */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => {
                    onNavigate(item.key);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={clsx(
                    'w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer text-left',
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  )}
                >
                  <Icon
                    className={clsx('w-4 h-4 shrink-0', isActive ? 'text-white' : 'text-slate-400')}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom: User Profile Widget */}
        <div className="pt-4 border-t border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between p-2 rounded-xl bg-[#121824] border border-slate-800/60">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <img
                src={
                  user?.avatar_url ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
                }
                alt={user?.name || 'Usuario'}
                className="w-9 h-9 rounded-lg object-cover border border-slate-700 shrink-0"
              />
              <div className="overflow-hidden">
                <div className="text-xs font-semibold text-white truncate">
                  {user?.name || 'Alex Morgan'}
                </div>
                <div className="text-[11px] text-slate-400 truncate">
                  {user?.role === 'admin' ? 'Sales Director' : 'Sales Manager'}
                </div>
              </div>
            </div>

            <button
              onClick={logout}
              title="Cerrar Sesión"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
