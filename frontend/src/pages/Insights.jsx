import React from 'react';
import { Lightbulb, AlertTriangle, TrendingDown } from 'lucide-react';

const Insights = () => {
  const insights = [
    { title: "Sleep Sensitivity", desc: "Your burnout risk increases by 22% for every hour of sleep lost below 7h.", icon: Lightbulb, color: "text-blue-400" },
    { title: "Weekend Lag", desc: "Late Sunday nights consistently lead to higher Monday stress levels.", icon: AlertTriangle, color: "text-yellow-400" },
    { title: "Improvement Noted", desc: "Consistent lunch breaks have reduced afternoon fatigue by 15%.", icon: TrendingDown, color: "text-green-400" },
  ];

  return (
    <div className="p-2 h-full flex flex-col gap-6 overflow-y-auto no-scrollbar pb-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-white tracking-tight">AI Insights</h1>
        <div className="flex items-center gap-3">
           <div className="bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
              Identity: Sleep-Sensitive Learner
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { 
            title: 'Sleep Sensitivity', 
            desc: 'Your cognitive flexibility drops by 22% for every hour of sleep lost below 7h.', 
            icon: 'fa-moon', 
            col: 'blue',
            tag: 'Critical Pattern'
          },
          { 
            title: 'Sunday Night Lag', 
            desc: 'Late Sunday activity (after 11 PM) consistently predicts a 40% rise in Monday stress.', 
            icon: 'fa-calendar-day', 
            col: 'orange',
            tag: 'Behavioral Link'
          },
          { 
            title: 'Lunch Break Boost', 
            desc: 'Days with consistent 1 PM breaks show 15% higher afternoon productivity scores.', 
            icon: 'fa-utensils', 
            col: 'emerald',
            tag: 'Optimization Hint'
          },
          { 
            title: 'Focus Peak', 
            desc: 'Your optimal deep-work window is between 9:00 AM and 11:30 AM.', 
            icon: 'fa-bolt', 
            col: 'purple',
            tag: 'Peak Performance'
          },
        ].map((insight, i) => (
          <div key={i} className="bg-[#1c212a] border border-white/5 rounded-[2rem] p-8 flex flex-col gap-4 relative group hover:border-white/10 transition-all">
             <div className="flex justify-between items-start">
                <div className={`w-12 h-12 rounded-2xl bg-${insight.col}-500/10 text-${insight.col}-500 flex items-center justify-center text-xl`}>
                   <i className={`fa-solid ${insight.icon}`}></i>
                </div>
                <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-lg bg-${insight.col}-500/10 text-${insight.col}-500 border border-${insight.col}-500/20`}>
                   {insight.tag}
                </span>
             </div>
             <div>
                <h3 className="text-xl font-bold text-white mb-2">{insight.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{insight.desc}</p>
             </div>
             <div className={`absolute bottom-0 left-8 right-8 h-1 bg-${insight.col}-500/20 rounded-t-full opacity-0 group-hover:opacity-100 transition-opacity`}></div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-[#1c212a] to-transparent border border-white/5 rounded-[2rem] p-8 relative overflow-hidden">
         <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="w-24 h-24 rounded-3xl bg-emerald-500/10 flex items-center justify-center text-4xl text-emerald-400 border border-emerald-500/10">
               <i className="fa-solid fa-microchip"></i>
            </div>
            <div className="flex-1 text-center md:text-left">
               <h3 className="text-xl font-bold text-white mb-2">Behavioral Telemetry Analysis</h3>
               <p className="text-sm text-gray-400 max-w-2xl">
                  Our neural engine has analyzed 42 data points from your last 7 days. The correlation between <span className="text-emerald-400 font-bold">Outdoor Exposure</span> and <span className="text-emerald-400 font-bold">Mental Clarity</span> is reaching statistical significance. Consider increasing morning sunlight exposure.
               </p>
            </div>
         </div>
         <div className="absolute top-1/2 right-10 -translate-y-1/2 text-[150px] text-white/[0.02] rotate-12 pointer-events-none">
            <i className="fa-solid fa-brain"></i>
         </div>
      </div>
    </div>
  );
};

export default Insights;
