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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-hud-surface border border-hud-border rounded-xl overflow-hidden shadow-2xl shadow-cyber-cyan/15">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-hud-card/80 border-b border-hud-border">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-cyber-red" />
            <h3 className="font-orbitron font-bold text-sm text-hud-text truncate">
              {clip.title}
            </h3>
          </div>
          <button
            onClick={() => {
              soundManager.playClickSound();
              onClose();
            }}
            className="p-1.5 rounded-lg text-hud-muted hover:text-hud-text hover:bg-hud-panel transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Mock HUD */}
        <div className="relative aspect-video bg-black flex items-center justify-center group overflow-hidden">
          <img
            src={clip.thumbnail}
            alt={clip.title}
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40"></div>

          {/* Interactive Play Button */}
          <button
            onClick={() => soundManager.playGlitchChirp()}
            className="relative z-10 w-20 h-20 rounded-full bg-cyber-cyan/20 border-2 border-cyber-cyan text-cyber-cyan flex items-center justify-center shadow-[0_0_25px_#00F0FF] hover:scale-110 transition-transform cursor-pointer"
          >
            <Play className="w-8 h-8 fill-cyber-cyan translate-x-0.5" />
          </button>

          {/* Broadcast HUD Overlay Elements */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-2.5 py-1 bg-cyber-red/90 text-white font-orbitron text-[10px] font-bold rounded">
              VERIFIED REEL
            </span>
            <span className="px-2.5 py-1 bg-black/70 backdrop-blur text-cyber-cyan font-orbitron text-[10px] font-bold rounded border border-cyber-cyan/30">
              {clip.game}
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-rajdhani font-semibold text-hud-text">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-hud-muted">
                <Clock className="w-3.5 h-3.5" /> {clip.duration}
              </span>
              <span className="flex items-center gap-1 text-cyber-gold">
                <Eye className="w-3.5 h-3.5" /> {clip.views} views
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-cyber-cyan">
              <ShieldCheck className="w-4 h-4" />
              <span>Timestamp & POV Verified by {gamerTag}</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-hud-card flex items-center justify-between">
          <p className="text-xs text-hud-muted font-rajdhani">
            Recorded in official Tier-1 scrim lobbies with active spectator anti-cheat monitoring.
          </p>
          <button
            onClick={() => {
              soundManager.playSuccessBeep();
              onClose();
            }}
            className="px-4 py-1.5 bg-hud-border text-hud-text hover:bg-cyber-cyan hover:text-black font-rajdhani font-bold text-xs rounded transition-colors"
          >
            CLOSE REEL
          </button>
        </div>
      </div>
    </div>
  );
};
