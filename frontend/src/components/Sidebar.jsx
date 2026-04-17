import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ClipboardPlus, 
  Flame, 
  Sparkles, 
  Gamepad2, 
  Target, 
  BarChart3, 
  Brain, 
  Users, 
  Settings, 
  Menu, 
  LogOut, 
  X 
} from 'lucide-react';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const navigate = useNavigate();
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const isAdmin = user?.isAdmin === true;

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Daily Input', path: '/daily-input', icon: ClipboardPlus },
    { name: 'Burnout Analysis', path: '/burnout-analysis', icon: Flame },
    { name: 'Prediction', path: '/prediction', icon: Sparkles },
    { name: 'Simulator', path: '/simulator', icon: Gamepad2 },
    { name: 'Action Plan', path: '/action-plan', icon: Target },
    { name: 'Progress / Reports', path: '/progress', icon: BarChart3 },
    { name: 'Insights', path: '/insights', icon: Brain },
    { name: 'Community', path: '/community', icon: Users },
    { name: 'Settings', path: '/settings', icon: Settings },
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
        className={`fixed md:relative top-0 left-0 h-full z-50 bg-[#161a23] border-r border-white/5 flex flex-col transition-all duration-300 py-5 ${
          isCollapsed ? '-translate-x-full md:translate-x-0 w-64 md:w-20' : 'translate-x-0 w-64'
        }`}
      >
        <div className={`flex items-center justify-between px-5 mb-8 ${isCollapsed ? 'md:justify-center md:px-0' : ''}`}>
          <div className={`flex items-center gap-3 ${isCollapsed ? 'hidden md:hidden' : 'flex'}`}>
            <div className="w-10 h-10 min-w-[40px] bg-emerald-400/15 text-emerald-400 rounded-xl flex items-center justify-center">
              <Brain size={22} />
            </div>
            <h1 className="text-white font-black text-lg whitespace-nowrap tracking-tight">
              MindSentinel
            </h1>
          </div>

          <button onClick={toggleSidebar} className="text-gray-400 hover:text-white transition-colors">
            <span className="md:hidden"><X size={24} /></span>
            <span className="hidden md:block">
              {isCollapsed ? <Menu size={22} className="mt-2" /> : <Menu size={22} />}
            </span>
          </button>
        </div>

        <nav className="flex-1 flex flex-col gap-1 px-3 overflow-y-auto no-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all duration-200 text-xs tracking-wide ${
                  isActive
                    ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 shadow-[0_4px_20px_rgba(16,185,129,0.1)]'
                    : 'text-gray-500 hover:bg-white/[0.03] hover:text-gray-300'
                } ${isCollapsed ? 'md:justify-center md:px-0' : ''}`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon 
                    size={18} 
                    className={isActive ? 'text-emerald-400' : 'text-gray-500'} 
                  />
                  <span className={`${isCollapsed ? 'md:hidden' : 'block'}`}>{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 mt-6">
          <button onClick={handleLogout} className={`w-full flex items-center justify-center gap-3 bg-white/[0.03] border border-white/5 py-3 rounded-xl hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all text-gray-500 text-xs font-bold ${isCollapsed ? 'md:px-0' : ''}`}>
            <LogOut size={16} />
            <span className={`${isCollapsed ? 'md:hidden' : 'block'}`}>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
