import React from 'react';

const DailyInput = () => {
  return (
    <div className="p-2 h-full flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-white tracking-tight">Daily Data Entry</h1>
        <div className="bg-white/5 px-4 py-2 rounded-xl text-xs font-bold text-gray-400 border border-white/5">
          Updated: Today, 9:21 AM
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 overflow-y-auto no-scrollbar pb-10">
        {[
          { 
            name: 'Physical Health', 
            color: 'cyan', 
            icon: 'fa-heart-pulse',
            metrics: [
              { label: 'Sleep Quality', type: 'range', val: '7.5h' },
              { label: 'Activity Level', type: 'range', val: 'Low' },
              { label: 'Nutrition', type: 'buttons', options: ['Low', 'Med', 'High'] }
            ]
          },
          { 
            name: 'Mental & Emotional', 
            color: 'pink', 
            icon: 'fa-brain',
            metrics: [
              { label: 'Stress Level', type: 'range', val: 'Moderate' },
              { label: 'Current Mood', type: 'emojis' },
              { label: 'Mindfulness', type: 'buttons', options: ['None', '5m', '15m+'] }
            ]
          },
          { 
            name: 'Workload & Productivity', 
            color: 'orange', 
            icon: 'fa-briefcase',
            metrics: [
              { label: 'Work Hours', type: 'range', val: '8h' },
              { label: 'Focus Level', type: 'range', val: 'High' },
              { label: 'Deadlines', type: 'buttons', options: ['Normal', 'Tight', 'Urgent'] }
            ]
          },
          { 
            name: 'Lifestyle & Balance', 
            color: 'green', 
            icon: 'fa-leaf',
            metrics: [
              { label: 'Social Interaction', type: 'range', val: 'Good' },
              { label: 'Screen Time', type: 'range', val: 'High' },
              { label: 'Hobbies', type: 'buttons', options: ['No', 'Yes'] }
            ]
          }
        ].map((cat, idx) => (
          <div key={idx} className="bg-[#1c212a] border border-white/5 rounded-[2rem] p-8 flex flex-col gap-6 group hover:border-white/10 transition-all">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl bg-${cat.color}-500/10 text-${cat.color}-500 flex items-center justify-center text-xl shadow-lg shadow-${cat.color}-500/5`}>
                <i className={`fa-solid ${cat.icon}`}></i>
              </div>
              <h2 className="text-xl font-bold text-white">{cat.name}</h2>
            </div>
            
            <div className="space-y-6">
              {cat.metrics.map((metric, midx) => (
                <div key={midx} className="space-y-3">
                  <div className="flex justify-between items-center text-sm font-bold text-gray-400">
                    {metric.label}
                    <span className="text-white text-xs">{metric.val || ''}</span>
                  </div>
                  
                  {metric.type === 'range' && (
                    <input type="range" className={`w-full h-1.5 bg-white/5 rounded-lg appearance-none accent-${cat.color}-500`} />
                  )}
                  
                  {metric.type === 'buttons' && (
                    <div className="flex gap-2">
                      {metric.options.map(opt => (
                        <button key={opt} className="flex-1 py-2 bg-white/5 border border-white/5 rounded-xl text-[10px] font-bold text-gray-400 hover:bg-white/10 hover:text-white transition-all uppercase tracking-wider">
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {metric.type === 'emojis' && (
                    <div className="flex gap-3">
                      {['😊', '😐', '😔', '😫', '😡'].map(emoji => (
                        <button key={emoji} className="flex-1 py-2 bg-white/5 border border-white/5 rounded-xl text-lg hover:bg-pink-500/20 transition-all">
                          {emoji}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#1c212a] border border-white/5 rounded-3xl p-6 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
            <i className="fa-solid fa-cloud-arrow-up"></i>
          </div>
          <div>
            <div className="text-sm font-bold text-white">Auto-Sync Enabled</div>
            <div className="text-[10px] text-gray-500 font-medium">Data is encrypted and private.</div>
          </div>
        </div>
        <button className="bg-gradient-to-r from-cyan-500 to-blue-600 px-10 py-4 rounded-2xl text-[#0f172a] font-black shadow-[0_10px_30px_rgba(6,182,212,0.3)] hover:scale-105 active:scale-95 transition-all">
          SYNC & ANALYZE NOW
        </button>
      </div>
    </div>
  );
};

export default DailyInput;
