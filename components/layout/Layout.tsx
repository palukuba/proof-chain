import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { cn } from '../../lib/utils';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar collapsed={isSidebarCollapsed} toggle={toggleSidebar} />
      <Header collapsed={isSidebarCollapsed} />
      <main 
        className={cn(
          "pt-16 min-h-screen transition-all duration-300 ease-in-out",
          isSidebarCollapsed ? "pl-20" : "pl-64"
        )}
      >
        <div className="container mx-auto p-6 max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
};