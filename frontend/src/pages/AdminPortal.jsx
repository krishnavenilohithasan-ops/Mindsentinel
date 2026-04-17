import React, { useState, useEffect } from 'react';
import { Users, Clock, ShieldCheck, Mail, Activity, Search } from 'lucide-react';
import api from '../api/axios';

const AdminPortal = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/admin/users');
        setUsers(res.data.users);
      } catch (err) {
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(u => 
    (u.firstName + ' ' + u.lastName).toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto w-full flex flex-col gap-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Admin Command Center</h2>
          <p className="text-gray-400">Manage your active users, roles, and platform activity.</p>
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#121826]/80 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all w-full md:w-64"
          />
        </div>
      </div>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1c212a] border border-[#2d3440] rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
              <Users size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Registered</p>
              <p className="text-3xl font-bold text-white">{users.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-[#1c212a] border border-[#2d3440] rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium">Admin Accounts</p>
              <p className="text-3xl font-bold text-white">{users.filter(u => u.isAdmin).length}</p>
            </div>
          </div>
        </div>
        <div className="bg-[#1c212a] border border-[#2d3440] rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">
              <Activity size={24} />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium">Active This Week</p>
              <p className="text-3xl font-bold text-white">
                {users.filter(u => u.lastLogin && new Date(u.lastLogin) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1c212a]/80 backdrop-blur-md border border-[#2d3440] rounded-2xl shadow-xl overflow-hidden">
        <div className="px-6 py-5 border-b border-[#2d3440] bg-[#1c212a]">
          <h3 className="text-lg font-semibold text-white">User Directory</h3>
        </div>
        
        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center text-gray-500">
            <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4"></div>
            <p>Loading user network...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Users size={48} className="mx-auto mb-4 opacity-50" />
            <p>No users correspond to your search.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#151921] border-b border-[#2d3440] text-gray-400 text-xs uppercase tracking-wider">
                  <th className="py-4 px-6 font-medium">Platform User</th>
                  <th className="py-4 px-6 font-medium">Contact</th>
                  <th className="py-4 px-6 font-medium">Security Role</th>
                  <th className="py-4 px-6 font-medium flex items-center gap-1.5"><Clock size={14}/> Recent Activity</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredUsers.map((u) => (
                  <tr key={u._id} className="border-b border-[#2d3440]/50 last:border-0 hover:bg-white/[0.02] transition-all group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-white font-bold shadow-inner">
                          {u.firstName?.[0]}{u.lastName?.[0]}
                        </div>
                        <div>
                          <div className="font-medium text-white group-hover:text-blue-400 transition-colors">
                            {u.firstName} {u.lastName}
                          </div>
                          <div className="text-xs text-gray-500 font-mono mt-0.5">ID: {u._id.substring(u._id.length - 6)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Mail size={14} className="text-gray-500" />
                        {u.email}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {u.isAdmin ? (
                        <div className="flex items-center w-max gap-1.5 px-2.5 py-1 bg-gradient-to-r from-purple-500/20 to-purple-600/10 border border-purple-500/20 text-purple-400 rounded-lg text-xs font-bold shadow-[0_0_10px_rgba(168,85,247,0.1)]">
                          <ShieldCheck size={14} /> Admin
                        </div>
                      ) : (
                        <div className="flex items-center w-max gap-1.5 px-2.5 py-1 bg-[#2d3440]/50 text-gray-400 rounded-lg text-xs border border-transparent">
                          <Users size={14} /> Member
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${u.lastLogin && new Date(u.lastLogin) > new Date(Date.now() - 24 * 60 * 60 * 1000) ? 'bg-emerald-500 animate-pulse' : 'bg-gray-600'}`}></div>
                        <span className="text-gray-300">
                          {u.lastLogin 
                            ? new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(u.lastLogin))
                            : <span className="text-gray-600 italic">Never logged in</span>
                          }
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPortal;
