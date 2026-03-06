
import React, { useState } from 'react';
import { JournalEntry } from '../types';

interface CalendarViewProps {
  entries: JournalEntry[];
  onSelectWrite: () => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ entries, onSelectWrite }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const startOffset = new Date(year, month, 1).getDay();

  const days = [];
  for (let i = 0; i < startOffset; i++) {
    days.push(<div key={`empty-${i}`} className="h-24 border border-slate-50 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30"></div>);
  }

  for (let d = 1; d <= totalDays; d++) {
    const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;
    const dayEntries = entries.filter(e => e.date.startsWith(dateStr));
    const isToday = new Date().toISOString().startsWith(dateStr);

    days.push(
      <div key={d} className={`h-24 p-2 border border-slate-100 dark:border-slate-800 relative transition-all hover:z-10 hover:shadow-lg ${isToday ? 'bg-indigo-50/30 dark:bg-indigo-900/10' : 'bg-white dark:bg-slate-900'}`}>
        <span className={`text-sm font-bold ${isToday ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-600'}`}>{d}</span>
        <div className="mt-1 flex flex-wrap gap-1">
          {dayEntries.map(entry => (
            <div key={entry.id} className="w-full truncate text-[10px] p-1 rounded bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-700 flex items-center gap-1">
              <span>{entry.mood}</span>
            </div>
          ))}
          {dayEntries.length === 0 && isToday && (
            <button onClick={onSelectWrite} className="mt-1 w-full text-[9px] text-indigo-400 dark:text-indigo-500 font-bold hover:text-indigo-600 flex items-center gap-1">
              <i className="fas fa-plus"></i> Tulis
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Kalender Jurnal</h1>
          <p className="text-slate-500 dark:text-slate-400">Pantau konsistensi Anda.</p>
        </div>
        <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
          <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))} className="w-10 h-10 flex items-center justify-center dark:hover:bg-slate-800 rounded-xl transition-all">
            <i className="fas fa-chevron-left text-slate-400"></i>
          </button>
          <span className="font-bold text-slate-700 dark:text-slate-200 min-w-[140px] text-center">{monthNames[month]} {year}</span>
          <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))} className="w-10 h-10 flex items-center justify-center dark:hover:bg-slate-800 rounded-xl transition-all">
            <i className="fas fa-chevron-right text-slate-400"></i>
          </button>
        </div>
      </header>

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden border border-slate-100 dark:border-slate-800">
        <div className="grid grid-cols-7 bg-slate-50 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-800">
          {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(day => (
            <div key={day} className="py-3 text-center text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7">{days}</div>
      </div>
    </div>
  );
};

export default CalendarView;
