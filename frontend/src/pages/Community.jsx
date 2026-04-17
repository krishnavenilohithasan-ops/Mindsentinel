import React from 'react';

const Community = () => {
  return (
    <div className="p-2 h-full flex flex-col gap-6 overflow-y-auto no-scrollbar pb-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-white tracking-tight">Community Pulse</h1>
        <div className="flex items-center gap-4">
           <div className="text-right">
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-none">Global Mood</div>
              <div className="text-lg font-black text-emerald-400">Stable</div>
           </div>
           <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/10 animate-pulse">
              <i className="fa-solid fa-users-viewfinder"></i>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { user: 'Anon42', tag: 'Developer', tip: 'Hard cutoff for Slack at 6 PM changed my life.', likes: 124, col: 'blue' },
          { user: 'SleepyHead', tag: 'Designer', tip: 'Magnesium glycinate before bed = deeper REM.', likes: 89, col: 'purple' },
          { user: 'FocusFirst', tag: 'Student', tip: 'Phone in another room for the first 2h of work.', likes: 256, col: 'orange' },
        ].map((item, i) => (
          <div key={i} className="bg-[#1c212a] border border-white/5 rounded-[2rem] p-6 flex flex-col relative group hover:border-white/10 transition-all">
             <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs text-gray-400">
                      <i className="fa-solid fa-user-secret"></i>
                   </div>
                   <div>
                      <div className="text-xs font-bold text-white leading-none">{item.user}</div>
                      <div className="text-[8px] font-bold text-gray-600 uppercase tracking-widest mt-1">{item.tag}</div>
                   </div>
                </div>
                <div className="text-emerald-400 text-xs">
                   <i className="fa-solid fa-certificate"></i>
                </div>
             </div>
             
             <p className="text-sm text-gray-400 italic leading-relaxed mb-10">
                "{item.tip}"
             </p>
             
             <div className="mt-auto flex justify-between items-center">
                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                   <i className="fa-solid fa-heart text-[10px] text-pink-500"></i>
                   <span className="text-[10px] font-bold text-gray-400">{item.likes}</span>
                </div>
                <button className="text-[10px] font-bold text-gray-500 hover:text-white transition-colors">Discuss</button>
             </div>
             <div className={`absolute top-0 right-0 w-16 h-1 bg-${item.col}-500/40 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity`}></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
         <div className="bg-[#1c212a] border border-white/5 rounded-[2rem] p-8 flex flex-col gap-6">
            <h3 className="text-lg font-bold text-white">Daily Community Poll</h3>
            <div className="text-sm font-medium text-gray-400">How many hours did you focus today?</div>
            <div className="space-y-4">
               {[
                 { label: 'Less than 4h', val: 12, col: 'bg-red-500' },
                 { label: '4h to 7h', val: 56, col: 'bg-emerald-500' },
                 { label: 'More than 7h', val: 32, col: 'bg-blue-500' },
               ].map((p, i) => (
                 <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                       <span>{p.label}</span>
                       <span>{p.val}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                       <div className={`h-full ${p.col}`} style={{ width: `${p.val}%` }}></div>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/10 rounded-[2rem] p-8 flex flex-col justify-center items-center text-center">
            <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center text-3xl text-cyan-400 mb-6 font-bold border border-cyan-500/10">
               <i className="fa-solid fa-plus"></i>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Share Your Story</h3>
            <p className="text-sm text-gray-500 max-w-xs mb-8">
               Help others build resilience by sharing your recovery journey anonymously.
            </p>
            <button className="px-8 py-3 bg-cyan-500 text-[#0f172a] font-black rounded-2xl shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-xs">
               Post Anonymously
            </button>
         </div>
      </div>
    </div>
  );
};

export default Community;
