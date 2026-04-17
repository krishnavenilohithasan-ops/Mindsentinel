import React from 'react';

const Progress = () => {
  return (
    <div className="p-2 h-full flex flex-col gap-6 overflow-y-auto no-scrollbar pb-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-white tracking-tight">Progress & Trends</h1>
        <div className="flex gap-2 bg-white/5 p-1 rounded-2xl border border-white/5">
           <button className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-emerald-500 text-[#0f172a] shadow-lg">Weekly</button>
           <button className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-all">Monthly</button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Recovery Trend Chart */}
        <div className="xl:col-span-8 bg-[#1c212a] border border-white/5 rounded-[2rem] p-8">
           <div className="flex justify-between items-start mb-10">
              <div>
                 <h3 className="text-lg font-bold text-white mb-1">Burnout Recovery Trend</h3>
                 <p className="text-xs text-gray-500">Average recovery score increased by 12% this week.</p>
              </div>
              <div className="text-right">
                 <div className="text-2xl font-black text-emerald-400">+12.4%</div>
                 <div className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">vs Last Week</div>
              </div>
           </div>
           
           <div className="h-64 flex items-end gap-3 px-2 group">
              {[30, 45, 25, 60, 80, 70, 90].map((h, i) => (
                <div key={i} className="flex-1 relative flex flex-col items-center">
                   <div 
                      className={`w-full rounded-t-2xl transition-all duration-1000 ${i === 6 ? 'bg-gradient-to-t from-emerald-500 to-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 'bg-white/5 hover:bg-white/10'}`} 
                      style={{ height: `${h}%` }}
                   ></div>
                   <div className="mt-4 text-[10px] font-bold text-gray-500 uppercase">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i]}</div>
                </div>
              ))}
           </div>
        </div>

        {/* Stats Column */}
        <div className="xl:col-span-4 flex flex-col gap-6">
           {[
             { label: 'Avg Study Hours', val: '6.4h', col: 'text-blue-400', sub: 'Baseline: 7.2h' },
             { label: 'Recovery Score', val: '84/100', col: 'text-emerald-400', sub: 'Trending: Up' },
             { label: 'Deep Work', val: '12h 40m', col: 'text-purple-400', sub: 'Last Week: 9h' },
           ].map((stat, i) => (
             <div key={i} className="bg-[#1c212a] border border-white/5 rounded-3xl p-6 flex flex-col gap-1 relative overflow-hidden group">
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.label}</div>
                <div className={`text-2xl font-black ${stat.col}`}>{stat.val}</div>
                <div className="text-[10px] text-gray-600 font-medium">{stat.sub}</div>
                <div className={`absolute top-0 right-0 w-12 h-1 ${stat.col.replace('text', 'bg')} opacity-20`}></div>
             </div>
           ))}
        </div>
      </div>

      <div className="bg-[#1c212a] border border-white/5 rounded-[2rem] p-8">
         <h3 className="text-lg font-bold text-white mb-6">Long-term Health Indicators</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Sleep Consistency', val: '88%', col: 'text-emerald-400' },
              { label: 'Stress Management', val: 'High', col: 'text-blue-400' },
              { label: 'Mental Resilience', val: 'Stable', col: 'text-purple-400' },
              { label: 'Habit Formation', val: '+4 Days', col: 'text-orange-400' }
            ].map((ind, i) => (
              <div key={i} className="bg-white/5 rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-all cursor-default">
                 <div className="text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-widest">{ind.label}</div>
                 <div className={`text-xl font-black ${ind.col}`}>{ind.val}</div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default Progress;
