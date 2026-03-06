
import React from 'react';
import { View } from '../types';

interface SidebarProps {
  activeView: View;
  onViewChange: (view: View) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange, isDarkMode, setIsDarkMode }) => {
  const navItems = [
    { id: 'write', label: 'Tulis Jurnal', icon: 'fa-pen-fancy' },
    { id: 'calendar', label: 'Kalender', icon: 'fa-calendar-alt' },
    { id: 'history', label: 'Riwayat', icon: 'fa-book' },
    { id: 'insights', label: 'Wawasan AI', icon: 'fa-lightbulb' },
    { id: 'settings', label: 'Pengaturan', icon: 'fa-cog' },
  ];

  return (
    <div className="w-20 md:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full transition-colors duration-300">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 journal-gradient rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 dark:shadow-none">
          <i className="fas fa-feather-alt text-xl"></i>
        </div>
        <span className="hidden md:block font-bold text-slate-800 dark:text-white text-lg tracking-tight">AuraJournal</span>
      </div>

      <nav className="flex-1 px-3 mt-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id as View)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeView === item.id
                ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            <i className={`fas ${item.icon} text-lg ${activeView === item.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 group-hover:text-slate-600'}`}></i>
            <span className="hidden md:block font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 space-y-4 border-t border-slate-100 dark:border-slate-800">
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
        >
          <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'} text-lg`}></i>
          <span className="hidden md:block font-medium">{isDarkMode ? 'Mode Terang' : 'Mode Gelap'}</span>
        </button>
        
        <div className="hidden md:block bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-4 text-white shadow-md">
          <p className="text-xs font-medium opacity-80 uppercase tracking-wider mb-1">Malam Ini</p>
          <p className="text-sm font-semibold leading-tight">Gunakan Mode Gelap untuk kesehatan mata.</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
