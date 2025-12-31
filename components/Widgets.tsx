
import React from 'react';
import { User } from '../types';

interface WidgetsProps {
  users: User[];
  currentUser: User;
  onToggleFollow: (id: string) => void;
}

const Widgets: React.FC<WidgetsProps> = ({ users, currentUser, onToggleFollow }) => {
  const suggestFollows = users.filter(u => u.id !== currentUser.id && !currentUser.following.includes(u.id)).slice(0, 3);

  const trends = [
    { category: 'Trending in Tech', topic: '#GeminiPro', posts: '125K' },
    { category: 'Science', topic: '#MarsMission', posts: '82.4K' },
    { category: 'Pop Culture', topic: 'SkyThread', posts: '10K' },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-80 p-4 space-y-4 sticky top-0 h-screen overflow-y-auto">
      <div className="sticky top-0 bg-slate-900 pt-2 pb-2">
        <div className="relative">
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
          <input 
            type="text" 
            placeholder="Search SkyThread"
            className="w-full bg-slate-800 border-none rounded-full py-3 pl-12 focus:bg-slate-900 focus:ring-1 focus:ring-sky-500 transition-colors"
          />
        </div>
      </div>

      <div className="bg-slate-800/50 rounded-2xl p-4">
        <h2 className="text-xl font-bold mb-4">What's happening</h2>
        <div className="space-y-4">
          {trends.map((trend, i) => (
            <div key={i} className="hover:bg-slate-700/50 p-2 -mx-2 rounded-lg cursor-pointer transition-colors group">
              <div className="flex justify-between">
                <span className="text-slate-500 text-xs">{trend.category}</span>
                <i className="fa-solid fa-ellipsis text-slate-500 text-sm group-hover:text-sky-400"></i>
              </div>
              <p className="font-bold">{trend.topic}</p>
              <p className="text-slate-500 text-xs">{trend.posts} posts</p>
            </div>
          ))}
        </div>
        <button className="text-sky-400 text-sm mt-4 hover:underline">Show more</button>
      </div>

      <div className="bg-slate-800/50 rounded-2xl p-4">
        <h2 className="text-xl font-bold mb-4">Who to follow</h2>
        <div className="space-y-4">
          {suggestFollows.length > 0 ? suggestFollows.map(user => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img src={user.avatar} alt={user.username} className="w-10 h-10 rounded-full object-cover" />
                <div className="overflow-hidden">
                  <p className="font-bold text-sm truncate">{user.displayName}</p>
                  <p className="text-slate-500 text-xs truncate">@{user.username}</p>
                </div>
              </div>
              <button 
                onClick={() => onToggleFollow(user.id)}
                className="bg-white text-black text-sm font-bold px-4 py-1.5 rounded-full hover:bg-slate-200 transition-colors"
              >
                Follow
              </button>
            </div>
          )) : (
            <p className="text-sm text-slate-500">No suggestions right now.</p>
          )}
        </div>
        <button className="text-sky-400 text-sm mt-4 hover:underline">Show more</button>
      </div>

      <footer className="px-4 text-xs text-slate-500 flex flex-wrap gap-x-3 gap-y-1 pb-4">
        <a href="#" className="hover:underline">Terms of Service</a>
        <a href="#" className="hover:underline">Privacy Policy</a>
        <a href="#" className="hover:underline">Cookie Policy</a>
        <a href="#" className="hover:underline">Accessibility</a>
        <a href="#" className="hover:underline">Ads info</a>
        <span>© 2024 SkyThread Corp.</span>
      </footer>
    </aside>
  );
};

export default Widgets;
