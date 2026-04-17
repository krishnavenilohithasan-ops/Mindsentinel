import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';

const Layout = () => {
  // Determine initial state based on window width
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 768);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Close sidebar on route change for mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsCollapsed(true);
    }
  }, [location.pathname]);

  const formatTitle = (path) => {
    if (path === '/') return 'Dashboard';
    return path.substring(1).split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : { firstName: 'User' };

  return (
    <div className="flex bg-[#12151e] h-screen text-gray-400 overflow-hidden font-sans">
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      
      <main className="flex-1 flex flex-col p-[20px] lg:p-[30px] overflow-hidden relative transition-all">
        {/* Top Header */}
        <header className="flex justify-between items-center mb-[20px]">
          <div className="flex items-center gap-3">
            <button onClick={toggleSidebar} className="md:hidden text-gray-400 hover:text-white transition-colors p-1 bg-white/5 rounded-lg border border-white/10">
              <Menu size={22} />
            </button>
            <h2 className="text-gray-100 text-xl md:text-2xl font-bold truncate">{formatTitle(location.pathname)}</h2>
          </div>
          <div className="flex gap-4 items-center pl-2">
            <div className="text-right text-xs hidden md:block">
              Welcome back,<br/>
              <span className="text-emerald-400 font-bold text-sm tracking-wide">{user.firstName}</span>
            </div>
            <div className="w-[35px] h-[35px] md:w-[40px] md:h-[40px] rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)] font-bold">
              {user.firstName?.[0] || 'U'}
            </div>
          </div>
        </header>

        {/* Dynamic Outlet */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative w-full h-full animate-fade-in fade-in transition-opacity pb-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
