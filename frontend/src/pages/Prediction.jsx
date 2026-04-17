import React from 'react';

const Prediction = () => {
  return (
    <div className="p-2 h-full flex flex-col gap-6 overflow-y-auto no-scrollbar pb-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-white tracking-tight">Predictive Insights</h1>
        <div className="bg-yellow-500/10 px-4 py-2 rounded-xl text-xs font-bold text-yellow-500 border border-yellow-500/20 flex items-center gap-2">
           <i className="fa-solid fa-triangle-exclamation"></i>
           Alert: High Stress Forecasted for Monday
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Tomorrow's Risk Card */}
        <div className="bg-[#1c212a] border border-white/5 rounded-[2rem] p-8 flex flex-col relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 text-yellow-500/20 text-8xl -mr-4 -mt-4 rotate-12 group-hover:rotate-0 transition-transform duration-700">
              <i className="fa-solid fa-bolt-lightning"></i>
           </div>
           
           <h3 className="text-sm font-bold text-gray-500 tracking-[0.2em] uppercase mb-8">Tomorrow's Outlook</h3>
           <div className="flex items-end gap-4 mb-2">
              <div className="text-6xl font-black text-white">82<span className="text-2xl text-gray-500">%</span></div>
              <div className="bg-red-500/20 text-red-500 px-3 py-1 rounded-lg text-[10px] font-black mb-2 uppercase tracking-widest border border-red-500/20">Critical</div>
           </div>
           <p className="text-sm text-gray-400 max-w-xs leading-relaxed mb-8">
              Based on your current work trajectory and declining sleep trend, we predict a significant energy crash by tomorrow afternoon.
           </p>
           
           <div className="space-y-4">
              <div className="flex justify-between items-center text-xs border-b border-white/5 pb-3">
                 <span className="text-gray-500">Wake-up stress prob.</span>
                 <span className="text-white font-bold">64%</span>
              </div>
              <div className="flex justify-between items-center text-xs border-b border-white/5 pb-3">
                 <span className="text-gray-500">Focus sustain time</span>
                 <span className="text-white font-bold">~42 mins</span>
              </div>
           </div>
        </div>

        {/* 7-Day Trend Card */}
        <div className="bg-[#1c212a] border border-white/5 rounded-[2rem] p-8 flex flex-col">
           <h3 className="text-sm font-bold text-gray-500 tracking-[0.2em] uppercase mb-10">7-Day Risk Forecast</h3>
           <div className="flex-1 flex items-end gap-3 h-48 px-2">
              {[40, 45, 60, 82, 75, 50, 40].map((h, i) => (
                <div key={i} className="flex-1 group relative">
                  <div className={`w-full rounded-t-xl transition-all duration-700 ${h >= 70 ? 'bg-gradient-to-t from-red-500/20 to-red-500' : 'bg-gradient-to-t from-green-500/20 to-green-400'}`} style={{ height: `${h}%` }}></div>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-gray-500">
                    {['S','M','T','W','T','F','S'][i]}
                  </div>
                </div>
              ))}
           </div>
           <div className="mt-12 flex justify-between text-[10px] font-bold text-gray-500 px-2 uppercase tracking-widest">
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div> Low Risk</div>
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div> Recovery Needed</div>
           </div>
        </div>
      </div>

      {/* Mitigation Plan Card */}
      <div className="bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/10 rounded-[2rem] p-8">
         <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
               <i className="fa-solid fa-shield-halved"></i>
            </div>
            <div>
               <h3 className="font-black text-white uppercase tracking-tight">Preemptive Mitigation Plan</h3>
               <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Target: Reduce Monday Peak</p>
            </div>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Strict Curfew', val: '10:00 PM Tonight', col: 'text-blue-400' },
              { label: 'Meeting Shift', val: 'Delay to Tuesday', col: 'text-purple-400' },
              { label: 'Focus Block', val: 'Max 2h Session', col: 'text-indigo-400' }
            ].map((p, i) => (
              <div key={i} className="bg-white/5 rounded-2xl p-4 border border-white/5">
                 <div className="text-[10px] font-bold text-gray-500 mb-1">{p.label}</div>
                 <div className={`text-sm font-black ${p.col}`}>{p.val}</div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default Prediction;
