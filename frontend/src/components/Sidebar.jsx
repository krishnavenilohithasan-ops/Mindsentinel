import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, PieChart, Bot, Leaf, Timer, Settings, Menu, LogOut, Brain, Users, X } from 'lucide-react';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const navigate = useNavigate();
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const isAdmin = user?.isAdmin === true;

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Analytics', path: '/analytics', icon: PieChart },
    { name: 'AI Insights', path: '/ai-insights', icon: Bot },
    { name: 'Wellness', path: '/wellness', icon: Leaf },
    { name: 'Focus Mode', path: '/focus-mode', icon: Timer },
    { name: 'Profile / Settings', path: '/profile', icon: Settings },
  ];

  if (isAdmin) {
    navItems.push({ name: 'Admin Portal', path: '/admin', icon: Users });
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <>
      {/* Mobile overlay backdrop */}
      {!isCollapsed && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
          onClick={toggleSidebar}
        />
      )}

      <aside 
        className={`fixed md:relative top-0 left-0 h-full z-50 bg-[#161a23] border-r border-[#2d3440] flex flex-col transition-all duration-300 py-5 ${
          isCollapsed ? '-translate-x-full md:translate-x-0 w-64 md:w-20' : 'translate-x-0 w-64'
        }`}
      >
        <div className={`flex items-center justify-between px-5 mb-8 ${isCollapsed ? 'md:justify-center md:px-0' : ''}`}>
          <div className={`flex items-center gap-3 ${isCollapsed ? 'hidden md:hidden' : 'flex'}`}>
            <div className="w-10 h-10 min-w-[40px] bg-green-400/15 text-green-400 rounded-xl flex items-center justify-center">
              <Brain size={22} />
            </div>
            <h1 className="text-white font-bold text-lg whitespace-nowrap transition-opacity duration-300">
              MindSentinel
            </h1>
          </div>

          {/* Close button on mobile / Toggle button on desktop */}
          <button onClick={toggleSidebar} className="text-gray-400 hover:text-white transition-colors">
            <span className="md:hidden"><X size={24} /></span>
            <span className="hidden md:block">
              {isCollapsed ? <Menu size={22} className="mt-2" /> : <Menu size={22} />}
            </span>
          </button>
        </div>

        <nav className="flex-1 flex flex-col gap-2 px-3 overflow-y-auto no-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-green-400/10 to-transparent border-l-4 border-green-400 text-white shadow-[inset_4px_0_0_#4ade80]'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white border-l-4 border-transparent'
                } ${isCollapsed ? 'md:justify-center md:px-0' : ''}`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon 
                    size={20} 
                    className={isActive ? 'text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.8)]' : ''} 
                  />
                  <span className={`${isCollapsed ? 'md:hidden' : 'block'}`}>{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="px-4 mt-6">
          <button onClick={handleLogout} className={`w-full flex items-center justify-center gap-3 bg-[#1c212a] border border-[#2d3440] py-3 rounded-xl hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all text-gray-400 ${isCollapsed ? 'md:px-0' : ''}`}>
            <LogOut size={18} />
            <span className={`font-medium ${isCollapsed ? 'md:hidden' : 'block'}`}>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
