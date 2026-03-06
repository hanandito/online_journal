
import React, { useState } from 'react';
import { Mood, JournalEntry } from '../types';
import { generateReflection } from '../services/geminiService';

interface JournalEditorProps {
  onSave: (entry: JournalEntry) => void;
}

const JournalEditor: React.FC<JournalEditorProps> = ({ onSave }) => {
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<Mood>(Mood.HAPPY);
  const [isGenerating, setIsGenerating] = useState(false);

  const moods = [
    { value: Mood.EXCITED, label: 'Bersemangat' },
    { value: Mood.HAPPY, label: 'Senang' },
    { value: Mood.NEUTRAL, label: 'Biasa Saja' },
    { value: Mood.SAD, label: 'Sedih' },
    { value: Mood.TIRED, label: 'Lelah' },
  ];

  const handleSave = async () => {
    if (!content.trim()) return;
    setIsGenerating(true);
    const aiReflection = await generateReflection(content, mood);
    setIsGenerating(false);
    onSave({
      id: Date.now().toString(),
      date: new Date().toISOString(),
      content,
      mood,
      aiReflection: aiReflection || undefined,
      tags: []
    });
    setContent('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Bagaimana harimu?</h1>
        <p className="text-slate-500 dark:text-slate-400">Curahkan pikiranmu malam ini untuk tidur yang lebih nyenyak.</p>
      </header>

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none p-6 md:p-8 border border-slate-100 dark:border-slate-800 transition-all">
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Mood Kamu Saat Ini</label>
          <div className="flex flex-wrap gap-3">
            {moods.map((m) => (
              <button
                key={m.value}
                onClick={() => setMood(m.value)}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl min-w-[80px] transition-all border-2 ${
                  mood === m.value
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300'
                    : 'border-transparent bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-750'
                }`}
              >
                <span className="text-3xl mb-1">{m.value}</span>
                <span className="text-[10px] font-bold uppercase tracking-wide">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tuliskan apapun yang ada di pikiranmu..."
            className="w-full h-64 p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 text-slate-700 dark:text-slate-200 text-lg leading-relaxed placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none transition-all"
          />
        </div>

        <div className="flex justify-end items-center gap-4">
          <p className="text-xs text-slate-400 dark:text-slate-500 hidden sm:block">
            <i className="fas fa-lock mr-1"></i> Data Anda tetap privat di browser.
          </p>
          <button
            onClick={handleSave}
            disabled={!content.trim() || isGenerating}
            className={`px-8 py-4 rounded-2xl font-bold text-white shadow-lg transition-all flex items-center gap-2 ${
              !content.trim() || isGenerating
                ? 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed shadow-none'
                : 'journal-gradient hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            {isGenerating ? (
              <><i className="fas fa-circle-notch fa-spin"></i> Menganalisis...</>
            ) : (
              <><i className="fas fa-sparkles"></i> Simpan & Refleksi</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JournalEditor;
