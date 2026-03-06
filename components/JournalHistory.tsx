
import React from 'react';
import { JournalEntry } from '../types';

interface JournalHistoryProps {
  entries: JournalEntry[];
  onDelete: (id: string) => void;
}

const JournalHistory: React.FC<JournalHistoryProps> = ({ entries, onDelete }) => {
  const formatDate = (dateStr: string) => {
    return new Intl.DateTimeFormat('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(dateStr));
  };

  if (entries.length === 0) {
    return (
      <div className="text-center py-20 animate-fadeIn">
        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="fas fa-book-open text-slate-300 dark:text-slate-600 text-3xl"></i>
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-white">Belum ada jurnal</h3>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Mulai menulis cerita harimu untuk melihat riwayat di sini.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Riwayat Jurnal</h1>
        <p className="text-slate-500 dark:text-slate-400">Perjalanan transformasimu tersimpan rapi di sini.</p>
      </header>

      <div className="space-y-6 pb-20">
        {entries.map((entry) => (
          <div key={entry.id} className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{entry.mood}</span>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-100">{formatDate(entry.date)}</h4>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Jam {new Date(entry.date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
              <button onClick={() => onDelete(entry.id)} className="text-slate-300 dark:text-slate-700 hover:text-red-500 p-2 transition-colors opacity-0 group-hover:opacity-100">
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 mb-4 text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
              {entry.content}
            </div>

            {entry.aiReflection && (
              <div className="bg-indigo-50/50 dark:bg-indigo-900/20 rounded-2xl p-5 border border-indigo-100/50 dark:border-indigo-800/30">
                <div className="flex items-center gap-2 mb-2 text-indigo-600 dark:text-indigo-400">
                  <i className="fas fa-sparkles text-xs"></i>
                  <span className="text-xs font-bold uppercase tracking-widest">Refleksi AI</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm italic font-medium leading-relaxed">
                  "{entry.aiReflection}"
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JournalHistory;
