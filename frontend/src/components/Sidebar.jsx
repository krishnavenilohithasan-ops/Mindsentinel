import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, PieChart, Bot, Leaf, Timer, Settings, Menu, LogOut, Brain } from 'lucide-react';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Analytics', path: '/analytics', icon: PieChart },
    { name: 'AI Insights', path: '/ai-insights', icon: Bot },
    { name: 'Wellness', path: '/wellness', icon: Leaf },
    { name: 'Focus Mode', path: '/focus-mode', icon: Timer },
    { name: 'Profile / Settings', path: '/profile', icon: Settings },
  ];

  return (
    <aside 
      className={`${isCollapsed ? 'w-20' : 'w-64'} bg-[#161a23] border-r border-[#2d3440] flex flex-col transition-all duration-300 py-5 z-50`}
    >
      <div className={`flex items-center justify-between px-5 mb-8 ${isCollapsed ? 'justify-center px-0' : ''}`}>
        <div className={`flex items-center gap-3 ${isCollapsed ? 'hidden' : 'flex'}`}>
          <div className="w-10 h-10 min-w-10 bg-green-400/15 text-green-400 rounded-xl flex items-center justify-center">
            <Brain size={22} />
          </div>
          <h1 className="text-white font-bold text-lg whitespace-nowrap transition-opacity duration-300">
            MindSentinel
          </h1>
        </div>
        <button onClick={toggleSidebar} className={`text-gray-400 hover:text-white transition-colors ${isCollapsed ? 'mt-2' : ''}`}>
          <Menu size={22} />
        </button>
      </div>

      <nav className="flex-1 flex flex-col gap-2 px-3">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? 'bg-gradient-to-r from-green-400/10 to-transparent border-l-4 border-green-400 text-white shadow-[inset_4px_0_0_#4ade80]'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white border-l-4 border-transparent'
              } ${isCollapsed ? 'justify-center px-0' : ''}`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon 
                  size={20} 
                  className={isActive ? 'text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.8)]' : ''} 
                />
                {!isCollapsed && <span>{item.name}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="px-4 mt-6">
        <button className={`w-full flex items-center justify-center gap-3 bg-[#1c212a] border border-[#2d3440] py-3 rounded-xl hover:bg-white/5 transition-colors text-gray-400 hover:text-white ${isCollapsed ? 'px-0' : ''}`}>
          <LogOut size={18} />
          {!isCollapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
