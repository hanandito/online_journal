
import React, { useState, useEffect } from 'react';
import { View, JournalEntry, UserSettings } from './types';
import Sidebar from './components/Sidebar';
import JournalEditor from './components/JournalEditor';
import JournalHistory from './components/JournalHistory';
import Insights from './components/Insights';
import Settings from './components/Settings';
import CalendarView from './components/CalendarView';
import AlarmModal from './components/AlarmModal';

const STORAGE_KEY = 'aura_journal_entries';
const SETTINGS_KEY = 'aura_journal_settings';
const THEME_KEY = 'aura_journal_theme';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('write');
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [showAlarm, setShowAlarm] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [settings, setSettings] = useState<UserSettings>({
    email: '',
    reminderEnabled: false,
    reminderTime: '21:00',
    userName: 'Pengguna'
  });

  // Load data on mount
  useEffect(() => {
    const savedEntries = localStorage.getItem(STORAGE_KEY);
    if (savedEntries) setEntries(JSON.parse(savedEntries));

    const savedSettings = localStorage.getItem(SETTINGS_KEY);
    if (savedSettings) setSettings(JSON.parse(savedSettings));

    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    } else if (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  // Save data on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Alarm Logic
  useEffect(() => {
    if (!settings.reminderEnabled) return;
    const checkAlarm = () => {
      const now = new Date();
      const currentHours = now.getHours().toString().padStart(2, '0');
      const currentMinutes = now.getMinutes().toString().padStart(2, '0');
      const currentTimeStr = `${currentHours}:${currentMinutes}`;
      if (currentTimeStr === settings.reminderTime && !showAlarm) {
        const todayStr = now.toISOString().split('T')[0];
        const hasJournalToday = entries.some(e => e.date.startsWith(todayStr));
        if (!hasJournalToday) {
          setShowAlarm(true);
          if (Notification.permission === 'granted') {
            new Notification('Waktunya Menulis Jurnal!', {
              body: 'AuraJournal: Tenangkan pikiranmu malam ini.',
            });
          }
        }
      }
    };
    const timer = setInterval(checkAlarm, 60000);
    return () => clearInterval(timer);
  }, [settings.reminderEnabled, settings.reminderTime, entries, showAlarm]);

  const renderContent = () => {
    switch (activeView) {
      case 'write': return <JournalEditor onSave={(e) => { setEntries([e, ...entries]); setActiveView('history'); }} />;
      case 'history': return <JournalHistory entries={entries} onDelete={(id) => setEntries(entries.filter(e => e.id !== id))} />;
      case 'insights': return <Insights entries={entries} />;
      case 'calendar': return <CalendarView entries={entries} onSelectWrite={() => setActiveView('write')} />;
      case 'settings': return <Settings settings={settings} onUpdate={setSettings} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />;
      default: return <JournalEditor onSave={(e) => { setEntries([e, ...entries]); setActiveView('history'); }} />;
    }
  };

  return (
    <div className={`flex h-screen overflow-hidden transition-colors duration-300 ${isDarkMode ? 'dark bg-slate-950' : 'bg-slate-50'}`}>
      <Sidebar activeView={activeView} onViewChange={setActiveView} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <main className="flex-1 overflow-y-auto relative p-4 md:p-8 dark:bg-slate-950">
        <div className="max-w-4xl mx-auto">
          {renderContent()}
        </div>
      </main>
      {showAlarm && <AlarmModal userName={settings.userName} onClose={() => setShowAlarm(false)} onWrite={() => { setShowAlarm(false); setActiveView('write'); }} />}
    </div>
  );
};

export default App;
