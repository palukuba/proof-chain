import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from '../../contexts/I18nContext';
import { Button } from '../ui/button';
import { Sun, Moon } from 'lucide-react';
import { LANGUAGES } from '../../constants';
import { cn } from '../../lib/utils';

interface HeaderProps {
  collapsed: boolean;
}

export const Header: React.FC<HeaderProps> = ({ collapsed }) => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useTranslation();

  return (
    <header 
      className={cn(
        "h-16 border-b border-border bg-card flex items-center justify-between px-6 fixed top-0 right-0 z-10 transition-all duration-300 ease-in-out",
        collapsed ? "left-20" : "left-64"
      )}
    >
      <div className="flex items-center">
        {/* Breadcrumbs could go here */}
      </div>
      
      <div className="flex items-center gap-4">
        {/* Language Switcher */}
        <select 
          className="bg-background border border-input rounded-md text-sm p-1"
          value={language}
          onChange={(e) => setLanguage(e.target.value as any)}
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>{lang.label}</option>
          ))}
        </select>

        {/* Theme Toggle */}
        <Button variant="ghost" size="sm" onClick={toggleTheme} className="w-9 px-0">
          {theme === 'light' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
    </header>
  );
};