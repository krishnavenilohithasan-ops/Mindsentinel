import React, { useState } from 'react';

const Simulator = () => {
  const [sleep, setSleep] = useState(6);
  const [work, setWork] = useState(8);

  const calculateScore = () => {
    // Mock simulation logic
    return Math.max(0, 100 - (sleep * 8) + (work * 5));
  };

  const score = calculateScore();

  return (
    <div className="p-2 h-full flex flex-col gap-6 overflow-y-auto no-scrollbar pb-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-white tracking-tight">What-If Simulator</h1>
        <div className="bg-cyan-500 text-[#0f172a] px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
           <i className="fa-solid fa-flask-vial"></i>
           Sandbox Mode
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Simulator Controls */}
        <div className="bg-[#1c212a] border border-white/5 rounded-[2rem] p-8 flex flex-col gap-8">
           <h3 className="text-sm font-bold text-gray-500 tracking-[0.2em] uppercase">Variable Adjustment</h3>
           
           <div className="space-y-10">
              {[
                { label: 'Sleep Hours', sub: 'Projected nightly rest', min: 2, max: 12, step: 0.5, val: sleep, set: setSleep, unit: 'h', col: 'accent-blue-500' },
                { label: 'Workload Intensity', sub: 'Focus & meeting hours', min: 0, max: 16, step: 1, val: work, set: setWork, unit: 'h', col: 'accent-orange-500' },
                { label: 'Deep Work Sessions', sub: 'Undistracted blocks', min: 0, max: 8, step: 1, val: 3, unit: 'x', col: 'accent-purple-500' },
              ].map((s, i) => (
                <div key={i} className="space-y-4">
                   <div className="flex justify-between items-end">
                      <div>
                         <div className="text-sm font-bold text-white">{s.label}</div>
                         <div className="text-[10px] text-gray-500 font-medium">{s.sub}</div>
                      </div>
                      <div className="text-xl font-black text-white">{s.val}{s.unit}</div>
                   </div>
                   <input 
                      type="range" 
                      min={s.min} max={s.max} step={s.step} 
                      value={s.val} 
                      onChange={(e) => s.set && s.set(parseFloat(e.target.value))}
                      className={`w-full h-1.5 bg-white/5 rounded-full appearance-none ${s.col}`}
                   />
                </div>
              ))}
           </div>
           
           <div className="mt-4 p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
              <div className="flex items-center gap-3 text-xs font-bold text-gray-400 mb-2">
                 <i className="fa-solid fa-circle-info text-cyan-500"></i> Simulation Logic
              </div>
              <p className="text-[10px] text-gray-500 leading-relaxed italic">
                 Predictive model uses your historical baseline to calculate the impact of these variables on your cognitive availability.
              </p>
           </div>
        </div>

        {/* Projected Result */}
        <div className="bg-[#1c212a] border border-white/5 rounded-[2rem] p-8 flex flex-col items-center justify-center relative overflow-hidden group">
           <div className="absolute top-0 left-0 w-full h-[30%] bg-gradient-to-b from-cyan-500/5 to-transparent"></div>
           
           <h3 className="text-sm font-bold text-gray-500 tracking-[0.2em] uppercase mb-12 relative z-10">Projected Burnout Risk</h3>
           
           <div className="relative w-72 h-72 flex items-center justify-center relative z-10">
              <div className="absolute inset-0 rounded-full border-2 border-white/5 scale-110"></div>
              <div className="absolute inset-0 rounded-full border-4 border-cyan-500/10 scale-[1.2] animate-pulse"></div>
              
              <div className="text-center">
                 <div className={`text-8xl font-black transition-all duration-500 ${score > 70 ? 'text-red-500' : score > 40 ? 'text-yellow-500' : 'text-green-500'}`}>
                    {score.toFixed(0)}<span className="text-3xl text-white/20">%</span>
                 </div>
                 <div className={`text-[10px] font-black tracking-[0.3em] uppercase mt-2 ${score > 70 ? 'text-red-500' : score > 40 ? 'text-yellow-500' : 'text-green-500'}`}>
                    {score > 70 ? 'CRITICAL' : score > 40 ? 'ELEVATED' : 'STABLE'}
                 </div>
              </div>
           </div>

           <div className="mt-16 w-full grid grid-cols-2 gap-4 relative z-10">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                 <div className="text-[10px] font-bold text-gray-500 mb-1 uppercase">Recovery Time</div>
                 <div className="text-lg font-black text-white">~{(score / 10).toFixed(1)} Days</div>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                 <div className="text-[10px] font-bold text-gray-500 mb-1 uppercase">Capacity</div>
                 <div className="text-lg font-black text-white">{(100 - score).toFixed(0)}%</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
