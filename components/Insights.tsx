
import React, { useState, useEffect } from 'react';
import { JournalEntry } from '../types';
import { getInsights } from '../services/geminiService';

interface InsightsProps {
  entries: JournalEntry[];
}

const Insights: React.FC<InsightsProps> = ({ entries }) => {
  const [loading, setLoading] = useState(false);
  const [insightData, setInsightData] = useState<any>(null);

  const fetchInsights = async () => {
    if (entries.length < 3) return;
    setLoading(true);
    const textData = entries.slice(0, 10).map(e => `[${e.date}] Mood: ${e.mood}, Content: ${e.content}`).join('\n');
    const data = await getInsights(textData);
    setInsightData(data);
    setLoading(false);
  };

  useEffect(() => { fetchInsights(); }, []);

  if (entries.length < 3) {
    return (
      <div className="text-center py-20 animate-fadeIn">
        <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="fas fa-chart-line text-indigo-400 dark:text-indigo-600 text-3xl"></i>
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-white">Butuh lebih banyak data</h3>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Tulis minimal 3 jurnal untuk analisis AI.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      <header>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Wawasan AI</h1>
        <p className="text-slate-500 dark:text-slate-400">Melihat pola di balik kata-kata Anda.</p>
      </header>

      {loading ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-100 dark:border-slate-800 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Gemini sedang menganalisis pola Anda...</p>
        </div>
      ) : insightData ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Ringkasan Holistik</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic">"{insightData.summary}"</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-3xl p-8 text-white shadow-xl">
            <h3 className="text-sm font-bold uppercase tracking-widest opacity-80 mb-2">Mood Dominan</h3>
            <div className="text-5xl font-bold mb-4">{insightData.dominantMood.split(' ')[0]}</div>
            <p className="text-lg font-semibold">{insightData.dominantMood.split(' ').slice(1).join(' ')}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Insights;
