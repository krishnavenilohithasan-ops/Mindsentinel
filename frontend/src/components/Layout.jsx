import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Convert "/ai-insights" -> "Ai Insights", "/dashboard" -> "Dashboard"
  const formatTitle = (path) => {
    if (path === '/') return 'Dashboard';
    return path.substring(1).split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="flex bg-[#12151e] h-screen text-gray-400 overflow-hidden font-sans">
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      
      <main className="flex-1 flex flex-col p-[20px] lg:p-[30px] overflow-hidden relative transition-all">
        {/* Top Header */}
        <header className="flex justify-between items-center mb-[20px]">
          <h2 className="text-gray-100 text-2xl font-bold">{formatTitle(location.pathname)}</h2>
          <div className="flex gap-4 items-center">
            <div className="text-right text-xs">
              Welcome back,<br/>
              <span className="text-green-400 font-bold text-sm tracking-wide">kiruba</span>
            </div>
            <div className="w-[40px] h-[40px] rounded-full bg-white/5 border border-gray-700 flex items-center justify-center text-white shadow-[0_0_15px_rgba(74,222,128,0.1)]">
              <i className="fa-solid fa-user-astronaut"></i>
            </div>
          </div>
        </header>

        {/* Dynamic Outlet */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative w-full h-full animate-fade-in fade-in transition-opacity">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
