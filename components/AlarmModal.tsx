
import React, { useEffect } from 'react';

interface AlarmModalProps {
  userName: string;
  onClose: () => void;
  onWrite: () => void;
}

const AlarmModal: React.FC<AlarmModalProps> = ({ userName, onClose, onWrite }) => {
  useEffect(() => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3');
    audio.volume = 0.4;
    audio.play().catch(() => {});
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 text-center relative overflow-hidden animate-scaleIn border border-slate-100 dark:border-slate-800">
        <div className="absolute top-0 left-0 w-full h-2 journal-gradient"></div>
        
        <div className="relative">
          <div className="w-24 h-24 mx-auto mb-6 relative">
            <div className="absolute inset-0 bg-indigo-100 dark:bg-indigo-900/30 rounded-full animate-ping opacity-25"></div>
            <div className="relative w-24 h-24 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center text-4xl shadow-inner border border-indigo-100 dark:border-indigo-800/30">
              🔔
            </div>
          </div>

          <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-2">Waktunya Refleksi!</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
            Hai <span className="text-indigo-600 dark:text-indigo-400 font-bold">{userName}</span>, sudah waktunya menenangkan pikiran sebelum tidur.
          </p>

          <div className="space-y-3">
            <button onClick={onWrite} className="w-full py-4 rounded-2xl journal-gradient text-white font-bold text-lg shadow-lg shadow-indigo-200 dark:shadow-none hover:scale-[1.02] active:scale-[0.98] transition-all">
              Mulai Menulis <i className="fas fa-pen-fancy ml-2 text-sm opacity-80"></i>
            </button>
            <button onClick={onClose} className="w-full py-3 rounded-2xl text-slate-400 dark:text-slate-500 font-medium hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
              Nanti Saja
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlarmModal;
