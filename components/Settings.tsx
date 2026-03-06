
import React from 'react';
import { UserSettings } from '../types';

interface SettingsProps {
  settings: UserSettings;
  onUpdate: (settings: UserSettings) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

const Settings: React.FC<SettingsProps> = ({ settings, onUpdate, isDarkMode, setIsDarkMode }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    onUpdate({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Pengaturan</h1>
        <p className="text-slate-500 dark:text-slate-400">Sesuaikan aplikasi agar sesuai dengan ritme harianmu.</p>
      </header>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-800 space-y-8">
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <i className="fas fa-paint-brush text-indigo-500"></i> Penampilan
          </h3>
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
            <div>
              <p className="font-bold text-slate-800 dark:text-white">Mode Gelap</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Ubah tampilan aplikasi menjadi lebih gelap dan nyaman.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={isDarkMode} onChange={() => setIsDarkMode(!isDarkMode)} className="sr-only peer" />
              <div className="w-14 h-7 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-indigo-600 after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all"></div>
            </label>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <i className="fas fa-user-circle text-indigo-500"></i> Profil
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Nama Anda</label>
              <input type="text" name="userName" value={settings.userName} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-400 dark:text-white transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Email</label>
              <input type="email" name="email" value={settings.email} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-400 dark:text-white transition-all" />
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <i className="fas fa-bell text-indigo-500"></i> Alarm Pengingat
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
              <p className="font-bold text-slate-800 dark:text-white">Aktifkan Pengingat</p>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name="reminderEnabled" checked={settings.reminderEnabled} onChange={handleChange} className="sr-only peer" />
                <div className="w-14 h-7 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-indigo-600 after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all"></div>
              </label>
            </div>
            <input type="time" name="reminderTime" value={settings.reminderTime} onChange={handleChange} className="w-full md:w-48 px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 dark:text-white font-bold" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
