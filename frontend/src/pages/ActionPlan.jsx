import React from 'react';
import { CheckCircle2, Coffee, Moon, Zap } from 'lucide-react';

const ActionPlan = () => {
  const tasks = [
    { title: "Power Nap", time: "2:00 PM", icon: Coffee, desc: "20 min to reset cognitive load" },
    { title: "Digital Sunset", time: "9:00 PM", icon: Moon, desc: "No blue light 1h before bed" },
    { title: "Quick Stretch", time: "Every 2h", icon: Zap, desc: "Relieve physical tension" },
  ];

  return (
    <div className="p-2 h-full flex flex-col gap-6 overflow-y-auto no-scrollbar pb-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-white tracking-tight">Recovery Protocol</h1>
        <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-xl border border-white/5">
           Today's Focus: <span className="text-green-400">Sleep Hygiene</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[
          { title: 'Digital Detox', time: '9:30 PM', sub: 'Zero Screen Time', col: 'blue', icon: 'fa-mobile-screen-button', desc: 'No blue light for 90 mins before bedtime.' },
          { title: 'Cognitive Reset', time: '1:00 PM', sub: '15m Meditation', col: 'purple', icon: 'fa-brain', desc: 'Lower pre-frontal cortex activity.' },
          { title: 'Physical Flush', time: 'Morning', sub: '15m Light Stretch', col: 'green', icon: 'fa-person-running', desc: 'Release physical tension buildup.' },
        ].map((task, i) => (
          <div key={i} className="bg-[#1c212a] border border-white/5 rounded-[2rem] p-8 flex flex-col relative group hover:border-white/10 transition-all">
             <div className={`w-12 h-12 rounded-2xl bg-${task.col}-500/10 text-${task.col}-500 flex items-center justify-center text-xl mb-8`}>
                <i className={`fa-solid ${task.icon}`}></i>
             </div>
             <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-white">{task.title}</h3>
                <span className="text-[10px] font-black bg-white/5 px-2 py-1 rounded-lg text-gray-500">{task.time}</span>
             </div>
             <div className={`text-sm font-black text-${task.col}-400 uppercase tracking-widest mb-4`}>{task.sub}</div>
             <p className="text-xs text-gray-500 leading-relaxed mb-10">{task.desc}</p>
             
             <button className="mt-auto w-full py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-[10px] font-black text-gray-400 hover:text-white uppercase tracking-widest transition-all">
                Mark as Complete
             </button>
             
             <div className={`absolute top-0 right-0 w-16 h-1 bg-${task.col}-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-bl-full`}></div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col xl:flex-row gap-6">
         <div className="xl:col-span-2 flex-1 bg-[#1c212a] border border-white/5 rounded-[2rem] p-8">
            <h3 className="text-lg font-bold text-white mb-6">Expert Recovery Tips</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {[
                 'Hydrate consistently to reduce fatigue.',
                 'Avoid heavy meals 3 hours before sleep.',
                 'Limit caffeine intake after 2:00 PM.',
                 'Stand up and walk every 60 minutes.'
               ].map((tip, i) => (
                 <div key={i} className="flex items-center gap-4 bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                    <div className="text-green-400 text-sm"><i className="fa-solid fa-circle-check"></i></div>
                    <div className="text-xs text-gray-400 font-medium">{tip}</div>
                 </div>
               ))}
            </div>
         </div>
         
         <div className="bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/10 rounded-[2rem] p-8 xl:w-80">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Urgent Warning</h3>
            <p className="text-xs text-red-400 leading-relaxed font-bold">
               Refrain from high-intensity cardio today. Your nervous system is currently over-taxed. Opt for gentle movement instead.
            </p>
         </div>
      </div>
    </div>
  );
};

export default ActionPlan;
