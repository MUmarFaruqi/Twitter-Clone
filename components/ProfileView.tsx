
import React from 'react';
import { User } from '../types';

interface ProfileViewProps {
  user: User;
  tweetsCount: number;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, tweetsCount }) => {
  return (
    <div className="w-full">
      <div className="h-48 bg-slate-800 relative">
        <div className="absolute -bottom-16 left-4 p-1 bg-slate-900 rounded-full">
          <img 
            src={user.avatar} 
            alt={user.username} 
            className="w-32 h-32 rounded-full object-cover border-4 border-slate-900 shadow-2xl" 
          />
        </div>
      </div>
      
      <div className="mt-20 p-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{user.displayName}</h2>
            <p className="text-slate-500">@{user.username}</p>
          </div>
          <button className="px-4 py-2 rounded-full border border-slate-700 font-bold hover:bg-slate-800 transition-colors">
            Edit profile
          </button>
        </div>

        <p className="mt-4 text-slate-200">{user.bio}</p>

        <div className="flex items-center space-x-4 mt-4 text-slate-500 text-sm">
          <div className="flex items-center space-x-1">
            <i className="fa-solid fa-calendar-days"></i>
            <span>Joined {new Date(user.createdAt).toLocaleDateString([], { month: 'long', year: 'numeric' })}</span>
          </div>
        </div>

        <div className="flex space-x-4 mt-4">
          <div className="flex space-x-1 hover:underline cursor-pointer">
            <span className="font-bold text-white">{user.following.length}</span>
            <span className="text-slate-500">Following</span>
          </div>
          <div className="flex space-x-1 hover:underline cursor-pointer">
            <span className="font-bold text-white">{user.followers.length}</span>
            <span className="text-slate-500">Followers</span>
          </div>
        </div>
      </div>

      <div className="flex border-b border-slate-800 mt-4">
        <div className="flex-grow py-4 text-center hover:bg-slate-800 font-bold border-b-4 border-sky-500 cursor-pointer">
          Threads
        </div>
        <div className="flex-grow py-4 text-center hover:bg-slate-800 text-slate-500 font-bold cursor-pointer transition-colors">
          Replies
        </div>
        <div className="flex-grow py-4 text-center hover:bg-slate-800 text-slate-500 font-bold cursor-pointer transition-colors">
          Highlights
        </div>
        <div className="flex-grow py-4 text-center hover:bg-slate-800 text-slate-500 font-bold cursor-pointer transition-colors">
          Media
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
