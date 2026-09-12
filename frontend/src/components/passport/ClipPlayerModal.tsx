import React from 'react';
import { X, Play, Eye, Clock, ShieldCheck, Flame } from 'lucide-react';
import { HighlightClip } from '../../types';
import { soundManager } from '../../utils/audio';

interface ClipPlayerModalProps {
  clip: HighlightClip;
  gamerTag: string;
  onClose: () => void;
}

export const ClipPlayerModal: React.FC<ClipPlayerModalProps> = ({ clip, gamerTag, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white dark:bg-[#101c18] rounded-3xl overflow-hidden shadow-2xl border border-[#91baaf]/40 dark:border-[#91baaf]/25">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-[#eaf5f2] dark:bg-[#121d1a] border-b border-[#91baaf]/30 dark:border-[#91baaf]/20">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-rose-500" />
            <h3 className="font-bold text-sm text-[#0d2620] dark:text-white truncate">
              {clip.title}
            </h3>
          </div>
          <button
            onClick={() => {
              soundManager.playClickSound();
              onClose();
            }}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            aria-label="Close clip player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player Mock */}
        <div className="relative aspect-video bg-black flex items-center justify-center group overflow-hidden">
          <img
            src={clip.thumbnail}
            alt={clip.title}
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>

          {/* Play Button */}
          <button
            onClick={() => soundManager.playGlitchChirp()}
            className="relative z-10 w-16 h-16 rounded-full bg-white/95 text-slate-950 flex items-center justify-center shadow-xl hover:scale-110 transition-transform cursor-pointer"
            aria-label="Play video"
          >
            <Play className="w-6 h-6 fill-slate-950 translate-x-0.5" />
          </button>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-rose-500 text-white text-[10px] font-semibold rounded-full">
              Verified Reel
            </span>
            <span className="px-2.5 py-0.5 bg-black/60 backdrop-blur text-white text-[10px] font-medium rounded-full border border-white/20">
              {clip.game}
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white z-10">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 opacity-80" /> {clip.views} views
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 opacity-80" /> {clip.duration}
              </span>
            </div>
            <div className="flex items-center gap-1 text-emerald-400 font-medium text-xs">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified POV • {gamerTag}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
