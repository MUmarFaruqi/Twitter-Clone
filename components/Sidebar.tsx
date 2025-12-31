
import React from 'react';
import { User } from '../types';

interface SidebarProps {
  user: User;
  view: 'home' | 'profile';
  setView: (view: 'home' | 'profile') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, view, setView }) => {
  return (
    <aside className="w-20 md:w-64 flex flex-col items-center md:items-start p-4 sticky top-0 h-screen">
      <div className="mb-8 px-2">
        <div className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center text-2xl text-white shadow-lg shadow-sky-500/20">
          <i className="fa-solid fa-feather-pointed"></i>
        </div>
      </div>

      <nav className="space-y-4 w-full">
        <button 
          onClick={() => setView('home')}
          className={`flex items-center space-x-4 p-3 rounded-full transition-all w-full md:w-auto hover:bg-slate-800 ${view === 'home' ? 'font-bold' : ''}`}
        >
          <i className={`text-xl fa-solid fa-house ${view === 'home' ? 'text-sky-400' : 'text-slate-400'}`}></i>
          <span className="hidden md:block text-lg">Home</span>
        </button>

        <button 
          onClick={() => setView('profile')}
          className={`flex items-center space-x-4 p-3 rounded-full transition-all w-full md:w-auto hover:bg-slate-800 ${view === 'profile' ? 'font-bold' : ''}`}
        >
          <i className={`text-xl fa-solid fa-user ${view === 'profile' ? 'text-sky-400' : 'text-slate-400'}`}></i>
          <span className="hidden md:block text-lg">Profile</span>
        </button>

        <div className="flex items-center space-x-4 p-3 rounded-full text-slate-400 cursor-not-allowed w-full md:w-auto">
          <i className="text-xl fa-solid fa-bell"></i>
          <span className="hidden md:block text-lg">Notifications</span>
        </div>

        <div className="flex items-center space-x-4 p-3 rounded-full text-slate-400 cursor-not-allowed w-full md:w-auto">
          <i className="text-xl fa-solid fa-envelope"></i>
          <span className="hidden md:block text-lg">Messages</span>
        </div>
      </nav>

      <button className="hidden md:block mt-8 w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-full shadow-lg shadow-sky-500/20 transition-all active:scale-95">
        Thread
      </button>

      <div className="mt-auto w-full p-2 flex items-center space-x-3 rounded-full hover:bg-slate-800 transition-colors cursor-pointer">
        <img src={user.avatar} alt={user.username} className="w-10 h-10 rounded-full object-cover" />
        <div className="hidden md:block overflow-hidden">
          <p className="font-bold truncate">{user.displayName}</p>
          <p className="text-slate-500 text-sm truncate">@{user.username}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
