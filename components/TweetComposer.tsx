
import React, { useState } from 'react';
import { User } from '../types';
import { generateTweetDraft } from '../services/geminiService';

interface TweetComposerProps {
  onAddTweet: (content: string) => void;
  user: User;
}

const TweetComposer: React.FC<TweetComposerProps> = ({ onAddTweet, user }) => {
  const [content, setContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [showAiPrompt, setShowAiPrompt] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onAddTweet(content);
    setContent('');
  };

  const handleAiDraft = async () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    const draft = await generateTweetDraft(aiPrompt);
    setContent(draft);
    setIsGenerating(false);
    setShowAiPrompt(false);
    setAiPrompt('');
  };

  return (
    <div className="p-4 border-b border-slate-800">
      <div className="flex space-x-4">
        <img src={user.avatar} alt={user.username} className="w-12 h-12 rounded-full object-cover" />
        <div className="flex-grow">
          <form onSubmit={handleSubmit}>
            <textarea
              className="w-full bg-transparent border-none focus:ring-0 text-xl resize-none placeholder-slate-500 min-h-[100px]"
              placeholder="What's happening?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={280}
            />
            
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <div className="flex space-x-2">
                <button 
                  type="button"
                  onClick={() => setShowAiPrompt(!showAiPrompt)}
                  className="p-2 text-sky-400 hover:bg-sky-500/10 rounded-full transition-colors flex items-center space-x-1"
                  title="AI Help"
                >
                  <i className="fa-solid fa-wand-magic-sparkles"></i>
                </button>
                <div className="p-2 text-sky-400 hover:bg-sky-500/10 rounded-full transition-colors cursor-not-allowed">
                  <i className="fa-regular fa-image"></i>
                </div>
                <div className="p-2 text-sky-400 hover:bg-sky-500/10 rounded-full transition-colors cursor-not-allowed">
                  <i className="fa-solid fa-list-ul"></i>
                </div>
                <div className="p-2 text-sky-400 hover:bg-sky-500/10 rounded-full transition-colors cursor-not-allowed">
                  <i className="fa-regular fa-face-smile"></i>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className={`text-sm ${content.length > 250 ? 'text-orange-500' : 'text-slate-500'}`}>
                  {content.length}/280
                </span>
                <button
                  type="submit"
                  disabled={!content.trim()}
                  className="bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white font-bold py-2 px-6 rounded-full transition-all"
                >
                  Thread
                </button>
              </div>
            </div>
          </form>

          {showAiPrompt && (
            <div className="mt-4 p-4 bg-slate-800 rounded-2xl animate-in slide-in-from-top duration-300">
              <p className="text-sm font-bold text-sky-400 mb-2">AI Assistant</p>
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  placeholder="Tell Gemini what to draft..." 
                  className="flex-grow bg-slate-900 border-none rounded-lg px-3 py-2 focus:ring-1 focus:ring-sky-500 text-sm"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAiDraft()}
                />
                <button 
                  onClick={handleAiDraft}
                  disabled={isGenerating || !aiPrompt.trim()}
                  className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg text-sm font-bold disabled:opacity-50"
                >
                  {isGenerating ? '...' : 'Draft'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TweetComposer;
