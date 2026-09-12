import React, { useState } from 'react';
import { 
  X, 
  PlusSquare, 
  Video, 
  Users, 
  Trophy, 
  CheckCircle2, 
  Link as LinkIcon, 
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PlayerPassport, GameType, HighlightClip } from '../../types';
import { soundManager } from '../../utils/audio';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: PlayerPassport;
  onAddHighlight?: (clip: HighlightClip) => void;
}

type PostType = 'clip' | 'scrim' | 'achievement';

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onAddHighlight
}) => {
  const [postType, setPostType] = useState<PostType>('clip');
  const [title, setTitle] = useState('');
  const [game, setGame] = useState<GameType>(currentUser.primaryGame);
  const [content, setContent] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [scrimTime, setScrimTime] = useState('Today, 9:00 PM IST');
  const [published, setPublished] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playSuccessBeep();

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#0284c7', '#8b5cf6', '#10b981', '#f59e0b']
    });

    if (postType === 'clip' && onAddHighlight) {
      const newClip: HighlightClip = {
        id: `clip_${Date.now()}`,
        title: title || `${game} Clutch Play`,
        game,
        duration: '0:45',
        videoUrl: videoUrl || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
        views: '1'
      };
      onAddHighlight(newClip);
    }

    setPublished(true);
    setTimeout(() => {
      setPublished(false);
      onClose();
      setTitle('');
      setContent('');
      setVideoUrl('');
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#101c18] rounded-3xl p-6 shadow-2xl border border-[#91baaf]/40 dark:border-[#91baaf]/25 space-y-5 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#91baaf]/30 dark:border-[#91baaf]/20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#91baaf]/20 flex items-center justify-center text-[#18483d] dark:text-[#91baaf]">
              <PlusSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#0d2620] dark:text-white">
                Create Hub Post
              </h3>
              <p className="text-xs text-[#385e54] dark:text-[#a0c7bd]">
                Share clutches, schedule scrims & broadcast updates
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundManager.playClickSound();
              onClose();
            }}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {published ? (
          <div className="py-12 flex flex-col items-center justify-center space-y-3 text-center animate-fadeIn">
            <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="font-bold text-lg text-slate-900 dark:text-white">
              Post Broadcasted Live!
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
              Your post has been minted to the community feed and linked to your player identity.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* User Badge */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-[#15231f] border border-slate-200/80 dark:border-white/5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border border-slate-300 dark:border-white/20 bg-slate-900 flex items-center justify-center">
                  {currentUser.avatarUrl ? (
                    <img src={currentUser.avatarUrl} alt={currentUser.gamerTag} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs font-bold font-mono text-sky-400">
                      {currentUser.gamerTag.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                      {currentUser.gamerTag}
                    </span>
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-500" />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    {currentUser.passportNumber}
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white font-mono text-xs font-bold rounded-lg">
                L{currentUser.level}
              </span>
            </div>

            {/* Post Category Tabs */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClickSound();
                  setPostType('clip');
                }}
                className={`py-2 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                  postType === 'clip'
                    ? 'bg-sky-500/10 border-sky-500/30 text-sky-600 dark:text-sky-400 shadow-sm'
                    : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>Highlight Clip</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playClickSound();
                  setPostType('scrim');
                }}
                className={`py-2 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                  postType === 'scrim'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 shadow-sm'
                    : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Scrim LFG</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playClickSound();
                  setPostType('achievement');
                }}
                className={`py-2 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                  postType === 'achievement'
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400 shadow-sm'
                    : 'border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'
                }`}
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>Achievement</span>
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Post Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    postType === 'clip' 
                      ? 'e.g. 1v4 Clutch on Ascent with Vandal'
                      : postType === 'scrim'
                      ? 'e.g. Need Tier-2 Tier-1 Scrim Partner 9 PM'
                      : 'e.g. Reached Top 50 National Leaderboard!'
                  }
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#15231f] border border-slate-200 dark:border-white/10 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                    Game Title
                  </label>
                  <select
                    value={game}
                    onChange={(e) => setGame(e.target.value as GameType)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#15231f] border border-slate-200 dark:border-white/10 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                  >
                    <option value="VALORANT">VALORANT</option>
                    <option value="BGMI">BGMI</option>
                    <option value="Counter-Strike 2">Counter-Strike 2</option>
                    <option value="Pokemon UNITE">Pokemon UNITE</option>
                    <option value="Free Fire MAX">Free Fire MAX</option>
                    <option value="DOTA 2">DOTA 2</option>
                  </select>
                </div>

                {postType === 'scrim' ? (
                  <div>
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                      Time Slot
                    </label>
                    <input
                      type="text"
                      value={scrimTime}
                      onChange={(e) => setScrimTime(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-[#15231f] border border-slate-200 dark:border-white/10 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                      Platform
                    </label>
                    <input
                      type="text"
                      defaultValue="PC / Mobile"
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-[#15231f] border border-slate-200 dark:border-white/10 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                )}
              </div>

              {postType === 'clip' && (
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                    VOD / Video Link (YouTube, Twitch, Medal)
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      placeholder="https://youtube.com/watch?v=..."
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      className="w-full pl-8 pr-3.5 py-2.5 bg-slate-50 dark:bg-[#15231f] border border-slate-200 dark:border-white/10 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                    />
                    <LinkIcon className="w-3.5 h-3.5 absolute left-2.5 top-3 text-slate-400" />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Description & Context
                </label>
                <textarea
                  rows={2}
                  placeholder="Share details about the play, scrim rules, or celebration..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-[#15231f] border border-slate-200 dark:border-white/10 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 resize-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClickSound();
                  onClose();
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
              >
                <PlusSquare className="w-3.5 h-3.5" />
                <span>Publish Post</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
