import React, { useState, useEffect, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import api from '../api/axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [data, setData] = useState({
    sleepHours: 7,
    walkingTime: 30,
    workingHours: 8,
    foodIntake: 'Average'
  });
  
  const [burnoutLevel, setBurnoutLevel] = useState('LOW');
  const [rawScore, setRawScore] = useState(30);
  const [suggestions, setSuggestions] = useState(["Keep up your excellent routine!"]);
  const [loading, setLoading] = useState(false);

  const analyzeBurnout = async () => {
    setLoading(true);
    try {
      // 1. Analyze via Backend Engine
      const res = await api.post('/burnout/analyze', data);
      
      setBurnoutLevel(res.data.burnoutLevel);
      setRawScore(res.data.rawScore);
      setSuggestions(res.data.suggestions);

      // 2. Save implicitly via Secondary endpoint
      await api.post('/user/save', {
        ...data,
        burnoutLevel: res.data.burnoutLevel,
        rawScore: res.data.rawScore
      });

    } catch (err) {
      console.error('API Error:', err);
      // Local fallback for smooth UI demo
      if (data.sleepHours < 5 && data.workingHours > 8) {
        setBurnoutLevel("HIGH"); setRawScore(85);
        setSuggestions(["Critical risk. Sleep immediately.", "Reduce working hours."]);
      } else if (data.sleepHours <= 7 && data.workingHours >= 6) {
        setBurnoutLevel("MEDIUM"); setRawScore(55);
        setSuggestions(["Take shorter breaks.", "Balance is key."]);
      } else {
        setBurnoutLevel("LOW"); setRawScore(20);
        setSuggestions(["Keep up the good routine!"]);
      }
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
      cutout: '80%',
      circumference: 180,
      rotation: -90,
      borderRadius: 10
    }]
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full text-white">
      {/* 1. INPUT PANEL */}
      <div className="bg-[#1c212a] border border-[#2d3440] rounded-2xl p-6 flex flex-col h-full overflow-y-auto w-full">
        <h3 className="text-green-400 font-bold mb-6 flex items-center gap-2">
          <i className="fa-solid fa-chart-line line-icon"></i> Daily Input
        </h3>

        <div className="flex flex-col gap-4 mb-4 flex-1">
          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <label className="block text-gray-300 text-sm mb-2">Sleep Hours ({data.sleepHours}h)</label>
            <input type="range" min="0" max="12" value={data.sleepHours} onChange={e => setData({...data, sleepHours: e.target.value})} className="w-full accent-green-400" />
          </div>
          
          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <label className="block text-gray-300 text-sm mb-2">Working Hours ({data.workingHours}h)</label>
            <input type="range" min="0" max="16" value={data.workingHours} onChange={e => setData({...data, workingHours: e.target.value})} className="w-full accent-green-400" />
          </div>
          
          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <label className="block text-gray-300 text-sm mb-2">Walking Time ({data.walkingTime}min)</label>
            <input type="range" min="0" max="120" value={data.walkingTime} onChange={e => setData({...data, walkingTime: e.target.value})} className="w-full accent-green-400" />
          </div>
        </div>
        
        <button 
          onClick={analyzeBurnout} 
          className="w-full mt-auto bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-gray-900 font-bold py-3 rounded-xl shadow-[0_8px_20px_rgba(59,130,246,0.3)] transition-transform hover:-translate-y-1"
        >
          {loading ? 'Analyzing...' : 'Analyze My Burnout'}
        </button>
      </div>

      {/* 2. GAUGE PANEL */}
      <div className="bg-[#1c212a] border border-[#2d3440] rounded-2xl p-6 flex flex-col items-center">
        <h3 className="text-white font-bold mb-6 flex items-center gap-2">
          <i className="fa-solid fa-arrow-trend-up text-green-400"></i> Burnout Analysis
        </h3>
        
        <div className="relative w-[300px] h-[180px] flex justify-center mb-0 mt-8" style={{ filter: `drop-shadow(0 0 30px ${burnoutLevel === 'HIGH' ? '#f87171' : burnoutLevel === 'MEDIUM' ? '#facc15' : '#4ade80'}40)` }}>
          <Doughnut data={donutData} options={{ maintainAspectRatio: false, animation: { animateRotate: true, duration: 1000 } }} />
          <div className="absolute font-sans bottom-2 text-center flex flex-col items-center">
            <h2 className="text-4xl font-bold m-0 p-0 leading-none">{rawScore}%</h2>
            <p className="text-gray-400 text-xs tracking-widest mt-1">BURNOUT LEVEL</p>
          </div>
        </div>

        <div className={`mt-[-10px] z-10 px-6 py-2 rounded-full text-xs font-bold border ${burnoutLevel === 'HIGH' ? 'bg-[#3f1515] border-[#7f1d1d] text-[#f87171]' : burnoutLevel === 'MEDIUM' ? 'bg-[#3f2c00] border-[#854d0e] text-[#facc15]' : 'bg-[#112d21] border-[#14532d] text-green-400'}`}>
          {burnoutLevel} STATUS
        </div>
      </div>

      {/* 3. SUGGESTIONS PANEL */}
      <div className="bg-[#1c212a] border border-[#2d3440] rounded-2xl p-6 flex flex-col">
        <h3 className="text-white font-bold mb-6 flex items-center gap-2">
          <i className="fa-solid fa-wand-magic-sparkles text-green-400"></i> AI Suggestions
        </h3>

        <div className="flex flex-col gap-3">
          {suggestions.map((s, i) => (
             <div key={i} className="flex bg-white/5 border border-white/10 rounded-xl p-3 gap-3 items-center">
               <div className="w-8 h-8 rounded shrink-0 bg-green-400/10 text-green-400 flex items-center justify-center"><i className="fa-solid fa-check"></i></div>
               <span className="text-sm font-medium text-gray-200">{s}</span>
             </div>
          ))}
        </div>

        <div className="mt-auto border border-green-400/20 bg-green-400/5 rounded-xl p-4 overflow-hidden relative">
           <div className="flex items-center gap-2 mb-2 font-bold text-white z-10 relative">
             <i className="fa-solid fa-robot text-green-400"></i> AI Assistant
           </div>
           <p className="text-sm text-gray-400 z-10 relative leading-snug">
             Based on your data, your focus score is directly impacted by sleep consistency. Try to establish a bedtime routine.
           </p>
           <div className="absolute -top-10 -right-10 w-24 h-24 bg-green-400/20 blur-2xl rounded-full"></div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
