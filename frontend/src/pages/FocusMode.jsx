import React, { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw } from 'lucide-react';

const FocusMode = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    else clearInterval(interval);
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggle = () => setIsActive(!isActive);
  const reset = () => { setIsActive(false); setTimeLeft(25 * 60); };

  const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const s = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-[#1c212a] border border-[#2d3440] rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none"></div>
        <Timer size={60} className="text-orange-500 mb-6 z-10" />
        <h2 className="text-3xl font-bold text-white mb-8 z-10">Deep Focus Timer</h2>
        
        <div className="text-8xl font-black text-white tracking-widest tabular-nums mb-12 z-10 drop-shadow-[0_0_20px_rgba(249,115,22,0.3)]">
            {m}:{s}
        </div>

        <div className="flex gap-4 z-10">
            <button onClick={toggle} className="w-16 h-16 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105">
                {isActive ? <Pause size={28} /> : <Play size={28} className="translate-x-1" />}
            </button>
            <button onClick={reset} className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors">
                <RotateCcw size={28} />
            </button>
        </div>
    </div>
  );
};

export default FocusMode;
