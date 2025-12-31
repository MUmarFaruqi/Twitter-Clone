
import React, { useState, useEffect, useCallback } from 'react';
import { User, Tweet, AppState, Comment } from './types';
import { INITIAL_USERS, INITIAL_TWEETS } from './constants';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import Widgets from './components/Widgets';

const STORAGE_KEY = 'skythread_state';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      currentUser: INITIAL_USERS[0],
      users: INITIAL_USERS,
      tweets: INITIAL_TWEETS,
    };
  });

  const [view, setView] = useState<'home' | 'profile'>('home');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addTweet = (content: string) => {
    const newTweet: Tweet = {
      id: `tweet-${Date.now()}`,
      userId: state.currentUser.id,
      content,
      likes: [],
      comments: [],
      createdAt: Date.now(),
    };
    setState(prev => ({
      ...prev,
      tweets: [newTweet, ...prev.tweets]
    }));
  };

  const deleteTweet = (tweetId: string) => {
    setState(prev => ({
      ...prev,
      tweets: prev.tweets.filter(t => t.id !== tweetId)
    }));
  };

  const editTweet = (tweetId: string, content: string) => {
    setState(prev => ({
      ...prev,
      tweets: prev.tweets.map(t => 
        t.id === tweetId ? { ...t, content, editedAt: Date.now() } : t
      )
    }));
  };

  const toggleLike = (tweetId: string) => {
    setState(prev => ({
      ...prev,
      tweets: prev.tweets.map(t => {
        if (t.id === tweetId) {
          const isLiked = t.likes.includes(prev.currentUser.id);
          return {
            ...t,
            likes: isLiked 
              ? t.likes.filter(id => id !== prev.currentUser.id)
              : [...t.likes, prev.currentUser.id]
          };
        }
        return t;
      })
    }));
  };

  const addComment = (tweetId: string, content: string) => {
    const newComment: Comment = {
      id: `comm-${Date.now()}`,
      userId: state.currentUser.id,
      tweetId,
      content,
      createdAt: Date.now(),
    };
    setState(prev => ({
      ...prev,
      tweets: prev.tweets.map(t => 
        t.id === tweetId ? { ...t, comments: [...t.comments, newComment] } : t
      )
    }));
  };

  const toggleFollow = (userId: string) => {
    if (userId === state.currentUser.id) return;
    
    setState(prev => {
      const isFollowing = prev.currentUser.following.includes(userId);
      const updatedFollowing = isFollowing
        ? prev.currentUser.following.filter(id => id !== userId)
        : [...prev.currentUser.following, userId];

      const updatedCurrentUser = { ...prev.currentUser, following: updatedFollowing };
      const updatedUsers = prev.users.map(u => {
        if (u.id === prev.currentUser.id) return updatedCurrentUser;
        if (u.id === userId) {
          return {
            ...u,
            followers: isFollowing
              ? u.followers.filter(id => id !== prev.currentUser.id)
              : [...u.followers, prev.currentUser.id]
          };
        }
        return u;
      });

      return {
        ...prev,
        currentUser: updatedCurrentUser,
        users: updatedUsers
      };
    });
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto flex flex-row">
      {/* Navigation Sidebar */}
      <Sidebar 
        user={state.currentUser} 
        view={view} 
        setView={setView} 
      />

      {/* Main Content Area */}
      <main className="flex-grow border-x border-slate-800 min-h-screen">
        <Feed 
          view={view}
          tweets={state.tweets}
          users={state.users}
          currentUser={state.currentUser}
          onAddTweet={addTweet}
          onDeleteTweet={deleteTweet}
          onEditTweet={editTweet}
          onToggleLike={toggleLike}
          onAddComment={addComment}
          onToggleFollow={toggleFollow}
        />
      </main>

      {/* Right Widgets Sidebar */}
      <Widgets 
        users={state.users} 
        currentUser={state.currentUser} 
        onToggleFollow={toggleFollow} 
      />
    </div>
  );
};

export default App;
