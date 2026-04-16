import React from 'react';
import { Leaf } from 'lucide-react';

const Wellness = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-[#1c212a] border border-[#2d3440] rounded-2xl">
        <Leaf size={80} className="text-green-500 mb-6" />
        <h2 className="text-3xl font-bold text-white mb-4">Wellness & Recovery Rooms</h2>
        <p className="text-gray-400 max-w-md">Explore guided breathing exercises, ambient soundscapes, and built-in break timers designed to curb mental exhaustion.</p>
    </div>
  );
};

export default Wellness;
