import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import api from '../api/axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [expandedCategory, setExpandedCategory] = useState('Physical Health');
  const [data, setData] = useState({
    sleep: 7,
    quality: 8,
    energy: 8,
    eating: 'Regular',
    workHours: 8,
    stress: 5,
    walking: 30
  });
  
  const [burnoutLevel, setBurnoutLevel] = useState('LOW');
  const [rawScore, setRawScore] = useState(30);
  const [suggestions, setSuggestions] = useState(["Keep up the excellent routine!"]);
  const [loading, setLoading] = useState(false);

  const analyzeBurnout = async () => {
    setLoading(true);
    try {
      const res = await api.post('/burnout/analyze', {
        sleepHours: data.sleep,
        workingHours: data.workHours,
        walkingTime: data.walking
      });
      setBurnoutLevel(res.data.burnoutLevel);
      setRawScore(res.data.rawScore);
      setSuggestions(res.data.suggestions);
    } catch (err) {
      const score = Math.min(100, Math.max(0, 100 - (data.sleep * 10) + (data.workHours * 5) - (data.walking / 10)));
      setRawScore(Math.round(score));
      setBurnoutLevel(score > 70 ? "HIGH" : score > 40 ? "MEDIUM" : "LOW");
      
      if (score > 70) setSuggestions(["Critical risk. Sleep immediately.", "Reduce working hours."]);
      else if (score > 40) setSuggestions(["Take shorter breaks.", "Balance is key."]);
      else setSuggestions(["Keep up the good routine!"]);
    }
    setLoading(false);
  };

  const donutData = {
    datasets: [{
      data: [rawScore, 100 - rawScore],
      backgroundColor: [
        burnoutLevel === 'HIGH' ? '#f87171' : burnoutLevel === 'MEDIUM' ? '#facc15' : '#4ade80',
        'rgba(255, 255, 255, 0.05)'
      ],
      borderWidth: 0,
      borderRadius: 10
    }]
  };

  const categories = [
    { id: 'Physical Health', color: 'bg-cyan-500', icon: 'fa-heart-pulse', desc: 'Burnout first appears physically before mentally.' },
    { id: 'Mental & Emotional', color: 'bg-pink-500', icon: 'fa-brain', desc: 'Captures early emotional exhaustion.' },
    { id: 'Workload & Productivity', color: 'bg-orange-500', icon: 'fa-briefcase', desc: 'High workload with low productivity = strong signal.' },
    { id: 'Lifestyle & Balance', color: 'bg-green-500', icon: 'fa-leaf', desc: 'Lifestyle imbalance is a silent burnout trigger.' },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-full text-white p-2 overflow-hidden animate-fade-in">
      {/* 1. DAILY INPUT PANEL (Left) */}
      <div className="xl:col-span-3 bg-[#161a23] border border-white/5 rounded-[2rem] p-6 flex flex-col gap-4 overflow-y-auto no-scrollbar">
        <h3 className="text-[#4ade80] font-bold text-xl mb-2 flex items-center gap-3">
          <i className="fa-solid fa-chart-line"></i> Daily Input
        </h3>

        <div className="flex flex-col gap-3">
          {categories.map((cat) => (
            <div key={cat.id} className="flex flex-col gap-3">
              <div 
                onClick={() => setExpandedCategory(expandedCategory === cat.id ? null : cat.id)}
                className={`${cat.color} p-4 rounded-2xl flex items-center justify-between cursor-pointer shadow-lg transition-all hover:brightness-110 active:scale-[0.98] blur-[0.5px] hover:blur-0`}
              >
                <div className="flex items-center gap-3 font-bold text-white text-xs uppercase tracking-widest">
                  <i className={`fa-solid ${cat.icon}`}></i>
                  {cat.id}
                </div>
                <i className={`fa-solid fa-chevron-${expandedCategory === cat.id ? 'up' : 'down'} text-[8px] opacity-70`}></i>
              </div>
              
              {expandedCategory === cat.id && (
                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 space-y-5 animate-in slide-in-from-top-2 duration-500">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2 border-b border-white/5 pb-2">
                    Metric Configuration
                  </p>
                  
                  {cat.id === 'Physical Health' && (
                    <div className="space-y-5">
                      <div className="space-y-3">
                        <div className="flex justify-between text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">
                           <span><i className="fa-solid fa-moon mr-2"></i> Sleep ({data.sleep}h)</span>
                        </div>
                        <input type="range" min="0" max="15" value={data.sleep} onChange={(e) => setData({...data, sleep: e.target.value})} className="w-full h-1 bg-white/10 rounded-full appearance-none accent-purple-500" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">
                           <span><i className="fa-solid fa-bed mr-2"></i> Quality ({data.quality}/10)</span>
                        </div>
                        <input type="range" min="0" max="10" value={data.quality} onChange={(e) => setData({...data, quality: e.target.value})} className="w-full h-1 bg-white/10 rounded-full appearance-none accent-purple-400" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">
                           <span><i className="fa-solid fa-bolt mr-2"></i> Energy ({data.energy}/10)</span>
                        </div>
                        <input type="range" min="0" max="10" value={data.energy} onChange={(e) => setData({...data, energy: e.target.value})} className="w-full h-1 bg-white/10 rounded-full appearance-none accent-purple-400" />
                      </div>
                      <div className="space-y-3">
                        <div className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">Eating Habits</div>
                        <select 
                           value={data.eating} 
                           onChange={(e) => setData({...data, eating: e.target.value})}
                           className="w-full bg-[#1c212a] border border-white/5 rounded-xl p-3 text-[10px] text-white font-bold focus:outline-none"
                        >
                          <option>Regular</option>
                          <option>Irregular</option>
                          <option>Optimized</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {cat.id !== 'Physical Health' && (
                    <div className="h-20 flex items-center justify-center border border-dashed border-white/10 rounded-xl">
                       <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Awaiting Telemetry</span>
                    </div>
                  )}

                  <p className="text-[9px] text-gray-600 leading-tight italic mt-4">
                    {cat.desc}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <button 
          onClick={analyzeBurnout}
          className="mt-4 w-full py-4 rounded-2xl bg-cyan-500 text-[#0f172a] font-black text-xs uppercase tracking-[0.2em] shadow-[0_10px_40px_rgba(6,182,212,0.25)] hover:scale-[1.02] transition-all active:scale-[0.98]"
        >
          {loading ? 'Analyzing...' : 'Analyze Status'}
        </button>
      </div>

      {/* 2. BURNOUT ANALYSIS PANEL (Center) */}
      <div className="xl:col-span-6 flex flex-col gap-6">
        <div className="bg-[#1c212a] border border-white/5 rounded-[2rem] p-8 flex flex-col items-center flex-1 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#4ade80] to-transparent opacity-20"></div>
          
          <h3 className="text-white font-bold text-xl flex items-center gap-3 self-center mb-4">
            <i className="fa-solid fa-arrow-trend-up text-[#4ade80]"></i> Burnout Analysis
          </h3>
          
          <div className="relative w-[340px] h-[220px] flex justify-center mt-10 mb-2" style={{ filter: `drop-shadow(0 0 50px ${burnoutLevel === 'HIGH' ? '#f87171' : burnoutLevel === 'MEDIUM' ? '#facc15' : '#4ade80'}30)` }}>
            <Doughnut data={donutData} options={{ maintainAspectRatio: false, cutout: '88%', circumference: 180, rotation: -90, animation: { animateRotate: true, duration: 2500 } }} />
            <div className="absolute bottom-4 text-center flex flex-col items-center">
              <h2 className="text-7xl font-black bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent leading-none">{rawScore}%</h2>
              <p className="text-gray-500 text-[10px] tracking-[0.4em] font-black mt-3 uppercase">Load Index</p>
            </div>
          </div>

          <div className={`z-10 px-10 py-3 rounded-2xl text-[10px] font-black border uppercase tracking-widest transition-all duration-1000 flex items-center gap-3 ${burnoutLevel === 'HIGH' ? 'bg-red-500/10 border-red-500/20 text-red-500' : burnoutLevel === 'MEDIUM' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500' : 'bg-green-500/10 border-green-500/20 text-green-500'}`}>
            <div className={`w-2 h-2 rounded-full animate-pulse ${burnoutLevel === 'HIGH' ? 'bg-red-500' : burnoutLevel === 'MEDIUM' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
            {burnoutLevel} RISK STATUS
          </div>

          <div className="w-full mt-10">
            <h4 className="text-[9px] font-black text-gray-600 tracking-[0.3em] uppercase mb-5 px-2">Recommended Recovery Routine</h4>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Sleep', val: '7.5 - 8h', icon: 'fa-moon', col: 'text-purple-400' },
                { label: 'Work', val: '6.5h Max', icon: 'fa-briefcase', col: 'text-indigo-400' },
                { label: 'Walk', val: '45+ min', icon: 'fa-person-walking', col: 'text-green-400' },
                { label: 'Diet', val: 'Alkaline', icon: 'fa-utensils', col: 'text-orange-400' },
              ].map((item, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col gap-1 hover:border-white/10 transition-colors">
                  <div className={`flex items-center gap-2 text-[9px] font-black uppercase tracking-widest ${item.col}`}>
                    <i className={`fa-solid ${item.icon}`}></i> {item.label}
                  </div>
                  <div className="text-sm font-black text-white">{item.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. AI SUGGESTIONS PANEL (Right) */}
      <div className="xl:col-span-3 flex flex-col gap-6">
        <div className="bg-[#1c212a] border border-white/5 rounded-[2rem] p-8 flex flex-col flex-1 relative overflow-hidden">
          <h3 className="text-white font-bold text-xl flex items-center gap-3 mb-10">
            <i className="fa-solid fa-wand-magic-sparkles text-[#4ade80]"></i> AI Suggestions
          </h3>

          <div className="space-y-4 mb-10 flex-1">
            <h4 className="text-[9px] font-black text-gray-600 tracking-[0.3em] uppercase border-b border-white/5 pb-2">Top Recommendations</h4>
            {suggestions.map((s, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 rounded-xl p-4 flex items-center gap-4 hover:bg-white/[0.04] transition-all group">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs group-hover:scale-110 transition-transform"><i className="fa-solid fa-check-double"></i></div>
                <div className="text-[11px] font-bold text-gray-300 leading-snug">{s}</div>
              </div>
            ))}
          </div>

          <div className="mt-auto bg-[#06b6d4]/5 border border-cyan-500/10 rounded-3xl p-6 relative overflow-hidden">
             <div className="flex items-center gap-3 mb-3 font-black text-white text-[10px] uppercase tracking-widest">
               <i className="fa-solid fa-robot text-cyan-400"></i> Neural Assistant
             </div>
             <p className="text-[11px] text-gray-400 leading-relaxed font-medium">
               Cognitive efficiency is currently peak. Prioritize complex tasks before 2 PM.
             </p>
             <div className="absolute -top-10 -right-10 w-24 h-24 bg-cyan-500/10 blur-3xl rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
