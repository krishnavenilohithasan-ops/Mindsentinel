import React from 'react';
import { PieChart } from 'lucide-react';

const Analytics = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-[#1c212a] border border-[#2d3440] rounded-2xl">
        <PieChart size={80} className="text-blue-500 mb-6" />
        <h2 className="text-3xl font-bold text-white mb-4">Analytics Dashboard</h2>
        <p className="text-gray-400 max-w-md">Displays graphs, screen time usage, and focus hour productivity trends natively mapped to your user ID.</p>
    </div>
  );
};

export default Analytics;
