import React, { useState } from 'react';
import { Settings, User, Bell, Palette, ShieldCheck } from 'lucide-react';
import api from '../api/axios';

const Profile = () => {
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : { firstName: 'User', lastName: '', email: 'user@example.com' };
  const [upgrading, setUpgrading] = useState(false);

  const makeMeAdmin = async () => {
    try {
      setUpgrading(true);
      await api.post('/admin/make-admin', { email: user.email });
      alert('You are now an Admin! Please sign out and log back in to see the changes.');
    } catch (error) {
      alert('Failed: ' + (error.response?.data?.error || error.message));
    } finally {
      setUpgrading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col gap-6 pb-10">
        <h2 className="text-2xl font-bold text-white mb-2">Profile & Preferences</h2>
        
        <div className="bg-[#1c212a] border border-[#2d3440] rounded-2xl p-6 flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex flex-col items-center justify-center text-gray-400">
                <User size={36} />
            </div>
            <div>
                <h3 className="text-xl font-bold text-white">{user.firstName} {user.lastName}</h3>
                <p className="text-gray-400 text-sm mt-1">{user.email}</p>
                <div className="flex gap-3 mt-4">
                  <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white font-medium transition-colors">
                      Edit Profile
                  </button>
                  {!user.isAdmin && (
                    <button 
                      onClick={makeMeAdmin}
                      disabled={upgrading}
                      className="px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-lg text-sm text-purple-400 font-medium transition-colors flex items-center gap-2"
                    >
                      <ShieldCheck size={16} /> 
                      {upgrading ? 'Upgrading...' : 'Dev Toggle: Make Admin'}
                    </button>
                  )}
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1c212a] border border-[#2d3440] rounded-2xl p-6">
                <h4 className="text-white font-bold mb-4 flex items-center gap-2"><Bell size={18} className="text-blue-400"/> Notifications</h4>
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center text-gray-300 text-sm">
                        <span>Burnout Alerts</span>
                        <div className="w-10 h-5 bg-blue-500 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div></div>
                    </div>
                </div>
            </div>

            <div className="bg-[#1c212a] border border-[#2d3440] rounded-2xl p-6">
                <h4 className="text-white font-bold mb-4 flex items-center gap-2"><Palette size={18} className="text-purple-400"/> Appearance</h4>
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center text-gray-300 text-sm">
                        <span>Dark Theme</span>
                        <div className="w-10 h-5 bg-purple-500 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Profile;
