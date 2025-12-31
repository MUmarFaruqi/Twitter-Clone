
import React from 'react';
import { Tweet, User, AppState } from '../types';
import TweetComposer from './TweetComposer';
import TweetCard from './TweetCard';
import ProfileView from './ProfileView';

interface FeedProps {
  view: 'home' | 'profile';
  tweets: Tweet[];
  users: User[];
  currentUser: User;
  onAddTweet: (content: string) => void;
  onDeleteTweet: (id: string) => void;
  onEditTweet: (id: string, content: string) => void;
  onToggleLike: (id: string) => void;
  onAddComment: (id: string, content: string) => void;
  onToggleFollow: (id: string) => void;
}

const Feed: React.FC<FeedProps> = ({ 
  view, tweets, users, currentUser, 
  onAddTweet, onDeleteTweet, onEditTweet, 
  onToggleLike, onAddComment, onToggleFollow 
}) => {
  const displayTweets = view === 'home' 
    ? tweets 
    : tweets.filter(t => t.userId === currentUser.id);

  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-md p-4 border-b border-slate-800">
        <h1 className="text-xl font-bold">{view === 'home' ? 'Home' : 'Profile'}</h1>
      </header>

      {view === 'home' && (
        <TweetComposer onAddTweet={onAddTweet} user={currentUser} />
      )}

      {view === 'profile' && (
        <ProfileView user={currentUser} tweetsCount={displayTweets.length} />
      )}

      <div className="divide-y divide-slate-800">
        {displayTweets.length > 0 ? (
          displayTweets.map(tweet => {
            const author = users.find(u => u.id === tweet.userId);
            if (!author) return null;
            return (
              <TweetCard 
                key={tweet.id}
                tweet={tweet}
                author={author}
                currentUser={currentUser}
                users={users}
                onDelete={onDeleteTweet}
                onEdit={onEditTweet}
                onLike={onToggleLike}
                onComment={onAddComment}
                onToggleFollow={onToggleFollow}
              />
            );
          })
        ) : (
          <div className="p-20 text-center">
            <i className="fa-solid fa-ghost text-4xl text-slate-700 mb-4 block"></i>
            <p className="text-slate-500">Nothing to see here yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
