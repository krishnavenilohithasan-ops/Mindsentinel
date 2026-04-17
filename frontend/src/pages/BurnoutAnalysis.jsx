import React from 'react';

const BurnoutAnalysis = () => {
  return (
    <div className="p-2 h-full flex flex-col gap-6 overflow-y-auto no-scrollbar pb-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-white tracking-tight">Deep Analysis</h1>
        <div className="flex gap-2">
          <button className="bg-white/5 px-4 py-2 rounded-xl text-xs font-bold text-gray-400 border border-white/5 hover:bg-white/10 transition-all">Export Report</button>
          <button className="bg-cyan-500/10 px-4 py-2 rounded-xl text-xs font-bold text-cyan-400 border border-cyan-500/20">Live Sync</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Score Card */}
        <div className="lg:col-span-2 bg-[#1c212a] border border-white/5 rounded-[2rem] p-8 flex flex-col items-center">
           <h2 className="text-sm font-bold text-gray-500 tracking-[0.2em] uppercase mb-10">Cognitive Load Index</h2>
           <div className="relative w-72 h-44 mb-10">
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="text-center">
                    <div className="text-7xl font-black text-white">58<span className="text-2xl text-gray-500">%</span></div>
                    <div className="text-[10px] font-bold text-orange-500 tracking-widest mt-1">MODERATE RISK</div>
                 </div>
              </div>
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 50">
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" strokeLinecap="round" />
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="url(#gradient)" strokeWidth="12" strokeLinecap="round" strokeDasharray="125.6" strokeDashoffset={125.6 * (1 - 0.58)} />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#4ade80" />
                    <stop offset="50%" stopColor="#facc15" />
                    <stop offset="100%" stopColor="#f87171" />
                  </linearGradient>
                </defs>
              </svg>
           </div>
           
           <div className="grid grid-cols-3 gap-8 w-full border-t border-white/5 pt-8 mt-4">
              {[
                { label: 'Fatigue', val: 'High', trend: 'up' },
                { label: 'Focus', val: 'Low', trend: 'down' },
                { label: 'Recovery', val: '42%', trend: 'neutral' },
              ].map((m, i) => (
                <div key={i} className="text-center">
                   <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{m.label}</div>
                   <div className="text-lg font-black text-white flex items-center justify-center gap-1">
                      {m.val}
                      <i className={`fa-solid fa-caret-${m.trend === 'up' ? 'up text-red-500' : m.trend === 'down' ? 'down text-green-500' : 'right text-gray-500'} text-xs`}></i>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Stressor Breakdown */}
        <div className="bg-[#1c212a] border border-white/5 rounded-[2rem] p-8 flex flex-col gap-6">
           <h3 className="text-lg font-bold text-white leading-tight">Primary<br/>Stressors</h3>
           <div className="space-y-4">
              {[
                { label: 'Work Intensity', val: 78, col: 'bg-orange-500' },
                { label: 'Lack of Sleep', val: 65, col: 'bg-blue-500' },
                { label: 'Irregular Diet', val: 30, col: 'bg-green-500' },
                { label: 'Screen Time', val: 92, col: 'bg-red-500' },
              ].map((s, i) => (
                <div key={i} className="space-y-2">
                   <div className="flex justify-between text-xs font-bold">
                      <span className="text-gray-400">{s.label}</span>
                      <span className="text-white">{s.val}%</span>
                   </div>
                   <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full ${s.col} rounded-full`} style={{ width: `${s.val}%` }}></div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      <div className="bg-[#14532d]/10 border border-green-500/10 rounded-[2rem] p-8">
         <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center">
               <i className="fa-solid fa-brain"></i>
            </div>
            <h3 className="font-bold text-white uppercase tracking-widest text-xs">AI Insight Engine</h3>
         </div>
         <p className="text-sm text-gray-300 leading-relaxed">
            Your current burnout risk is driven primarily by <span className="text-red-400 font-bold underline underline-offset-4">Work Intensity</span>. Although your Physical Health metrics are stable, the cognitive load from extended focus sessions is depleting your mental resilience. <span className="text-green-400">Recommendation:</span> Implement 15-minute scheduled breaks after every 90 minutes of work.
         </p>
      </div>
    </div>
  );
};

export default BurnoutAnalysis;
