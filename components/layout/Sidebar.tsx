import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from '../../contexts/I18nContext';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  PlusCircle, 
  Users, 
  Settings, 
  Building2, 
  User,
  GraduationCap,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { ROUTES } from '../../constants';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';

interface SidebarProps {
  collapsed: boolean;
  toggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggle }) => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const links = [
    { icon: LayoutDashboard, label: t('nav.dashboard'), path: ROUTES.DASHBOARD },
    { icon: FileText, label: t('nav.documents'), path: ROUTES.DOCUMENTS },
    { icon: PlusCircle, label: t('nav.issue'), path: ROUTES.ISSUE },
    { icon: Users, label: t('nav.students'), path: ROUTES.STUDENTS },
    { icon: Building2, label: t('nav.profile'), path: ROUTES.PROFILE },
    { icon: Settings, label: t('nav.settings'), path: ROUTES.SETTINGS },
  ];

  return (
    <aside 
      className={cn(
        "flex flex-col border-r border-border bg-card md:flex h-screen fixed left-0 top-0 z-20 transition-all duration-300 ease-in-out",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="p-4 flex items-center border-b border-border h-16 shrink-0 overflow-hidden justify-between">
        <div className={cn("flex items-center gap-3 transition-all duration-300", collapsed ? "justify-center w-full" : "")}>
          <div className="bg-primary/10 p-1.5 rounded-md shrink-0">
            <GraduationCap className="h-6 w-6 text-primary" />
          </div>
          <span 
            className={cn(
              "text-lg font-bold text-primary tracking-tight whitespace-nowrap transition-all duration-300",
              collapsed ? "opacity-0 w-0 hidden" : "opacity-100"
            )}
          >
            {t('app.name')}
          </span>
        </div>
        
        {!collapsed && (
           <Button 
             variant="ghost" 
             size="sm" 
             onClick={toggle}
             className="h-8 w-8 p-0 shrink-0 text-muted-foreground"
           >
             <PanelLeftClose className="h-4 w-4" />
           </Button>
        )}
      </div>
      
      {collapsed && (
        <div className="w-full flex justify-center py-2">
           <Button 
             variant="ghost" 
             size="sm" 
             onClick={toggle}
             className="h-8 w-8 p-0 text-muted-foreground"
           >
             <PanelLeftOpen className="h-4 w-4" />
           </Button>
        </div>
      )}
      
      <nav className="flex-1 space-y-1 p-3 overflow-y-auto overflow-x-hidden">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            title={collapsed ? link.label : undefined}
            className={({ isActive }) =>
              cn(
                "flex items-center py-3 text-sm font-medium rounded-md transition-colors whitespace-nowrap",
                collapsed ? "justify-center px-2" : "px-4",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )
            }
          >
            <link.icon className={cn("h-5 w-5 shrink-0", collapsed ? "" : "mr-3")} />
            {!collapsed && <span>{link.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-border bg-muted/10 shrink-0 overflow-hidden">
        <div className={cn("flex items-center gap-3", collapsed ? "justify-center" : "")}>
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <User className="h-5 w-5" />
          </div>
          <div className={cn("flex flex-col overflow-hidden transition-all duration-300", collapsed ? "w-0 opacity-0 hidden" : "w-auto opacity-100")}>
            <span className="text-sm font-medium truncate" title={user?.displayName || user?.email}>
              {user?.displayName || user?.email}
            </span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              {user?.role}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};