
import React, { useState } from 'react';
import { Tweet, User } from '../types';

interface TweetCardProps {
  tweet: Tweet;
  author: User;
  currentUser: User;
  users: User[];
  onDelete: (id: string) => void;
  onEdit: (id: string, content: string) => void;
  onLike: (id: string) => void;
  onComment: (id: string, content: string) => void;
  onToggleFollow: (id: string) => void;
}

const TweetCard: React.FC<TweetCardProps> = ({ 
  tweet, author, currentUser, users, 
  onDelete, onEdit, onLike, onComment, onToggleFollow 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(tweet.content);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const isLiked = tweet.likes.includes(currentUser.id);
  const isAuthor = tweet.userId === currentUser.id;
  const isFollowing = currentUser.following.includes(author.id);

  const handleEdit = () => {
    onEdit(tweet.id, editContent);
    setIsEditing(false);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onComment(tweet.id, newComment);
    setNewComment('');
  };

  return (
    <div className="p-4 hover:bg-slate-800/50 transition-colors group">
      <div className="flex space-x-4">
        <div className="flex-shrink-0">
          <img src={author.avatar} alt={author.username} className="w-12 h-12 rounded-full object-cover" />
        </div>
        
        <div className="flex-grow min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 min-w-0">
              <span className="font-bold hover:underline cursor-pointer truncate">{author.displayName}</span>
              <span className="text-slate-500 truncate">@{author.username}</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-500 text-sm whitespace-nowrap">
                {new Date(tweet.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
              </span>
              {tweet.editedAt && (
                <span className="text-slate-600 text-xs">(edited)</span>
              )}
            </div>

            <div className="relative group/menu">
              <button className="p-2 text-slate-500 hover:text-sky-400 hover:bg-sky-400/10 rounded-full transition-colors">
                <i className="fa-solid fa-ellipsis"></i>
              </button>
              <div className="hidden group-hover/menu:block absolute right-0 top-8 w-40 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-20 py-1">
                {!isAuthor && (
                  <button 
                    onClick={() => onToggleFollow(author.id)}
                    className="w-full text-left px-4 py-2 hover:bg-slate-800 text-sm"
                  >
                    {isFollowing ? 'Unfollow' : 'Follow'} @{author.username}
                  </button>
                )}
                {isAuthor && (
                  <>
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="w-full text-left px-4 py-2 hover:bg-slate-800 text-sm text-sky-400"
                    >
                      Edit Post
                    </button>
                    <button 
                      onClick={() => onDelete(tweet.id)}
                      className="w-full text-left px-4 py-2 hover:bg-slate-800 text-sm text-red-500"
                    >
                      Delete Post
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="mt-2 text-slate-200 whitespace-pre-wrap break-words leading-relaxed">
            {isEditing ? (
              <div className="space-y-2">
                <textarea 
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-1 focus:ring-sky-500 outline-none"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  autoFocus
                />
                <div className="flex justify-end space-x-2">
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-1.5 rounded-full text-sm font-bold border border-slate-700 hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleEdit}
                    className="px-4 py-1.5 rounded-full text-sm font-bold bg-sky-500 hover:bg-sky-600 text-white"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              tweet.content
            )}
          </div>

          <div className="flex items-center justify-between mt-4 max-w-md text-slate-500">
            <button 
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 hover:text-sky-400 group/btn transition-colors"
            >
              <div className="p-2 group-hover/btn:bg-sky-400/10 rounded-full">
                <i className="fa-regular fa-comment"></i>
              </div>
              <span className="text-sm">{tweet.comments.length || ''}</span>
            </button>
            
            <button className="flex items-center space-x-2 hover:text-green-400 group/btn transition-colors">
              <div className="p-2 group-hover/btn:bg-green-400/10 rounded-full">
                <i className="fa-solid fa-retweet"></i>
              </div>
            </button>

            <button 
              onClick={() => onLike(tweet.id)}
              className={`flex items-center space-x-2 group/btn transition-colors ${isLiked ? 'text-pink-500' : 'hover:text-pink-500'}`}
            >
              <div className={`p-2 rounded-full ${isLiked ? 'bg-pink-500/10' : 'group-hover/btn:bg-pink-500/10'}`}>
                <i className={`${isLiked ? 'fa-solid' : 'fa-regular'} fa-heart`}></i>
              </div>
              <span className="text-sm">{tweet.likes.length || ''}</span>
            </button>

            <button className="flex items-center space-x-2 hover:text-sky-400 group/btn transition-colors">
              <div className="p-2 group-hover/btn:bg-sky-400/10 rounded-full">
                <i className="fa-solid fa-chart-simple"></i>
              </div>
            </button>
          </div>

          {showComments && (
            <div className="mt-4 border-t border-slate-800 pt-4 space-y-4">
              <form onSubmit={handleCommentSubmit} className="flex space-x-2">
                <img src={currentUser.avatar} alt="Me" className="w-8 h-8 rounded-full object-cover" />
                <input 
                  type="text" 
                  className="flex-grow bg-slate-900 border-none rounded-full px-4 py-1.5 text-sm focus:ring-1 focus:ring-sky-500"
                  placeholder="Post your reply"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button 
                  type="submit"
                  disabled={!newComment.trim()}
                  className="bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white text-sm font-bold px-4 py-1 rounded-full transition-colors"
                >
                  Reply
                </button>
              </form>

              {tweet.comments.map(comment => {
                const commentAuthor = users.find(u => u.id === comment.userId);
                return (
                  <div key={comment.id} className="flex space-x-3 text-sm">
                    <img src={commentAuthor?.avatar} alt="Commenter" className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <div className="flex items-center space-x-1">
                        <span className="font-bold">{commentAuthor?.displayName}</span>
                        <span className="text-slate-500">@{commentAuthor?.username}</span>
                      </div>
                      <p className="text-slate-300 mt-1">{comment.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TweetCard;
