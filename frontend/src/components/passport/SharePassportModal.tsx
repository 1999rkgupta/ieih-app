import React, { useState } from 'react';
import { X, Copy, Check, Share2, QrCode, Sparkles, Trophy, ShieldCheck } from 'lucide-react';
import { PlayerPassport } from '../../types';
import { soundManager } from '../../utils/audio';

interface SharePassportModalProps {
  passport: PlayerPassport;
  onClose: () => void;
}

export const SharePassportModal: React.FC<SharePassportModalProps> = ({ passport, onClose }) => {
  const [copied, setCopied] = useState(false);
  const passportUrl = `${window.location.origin}/passport/${passport.passportNumber.toLowerCase()}`;

  const handleCopy = () => {
    soundManager.playSuccessBeep();
    navigator.clipboard.writeText(passportUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-hud-surface border border-hud-border rounded-xl p-6 shadow-2xl shadow-cyber-cyan/10 overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1.5 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent shadow-[0_0_15px_#00F0FF]"></div>
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-hud-border">
          <div className="flex items-center gap-2.5">
            <Share2 className="w-5 h-5 text-cyber-cyan" />
            <h3 className="font-orbitron font-bold text-lg text-hud-text tracking-wide">
              SHARE E-PLAYER PASSPORT
            </h3>
          </div>
          <button
            onClick={() => {
              soundManager.playClickSound();
              onClose();
            }}
            className="p-1.5 rounded-lg text-hud-muted hover:text-hud-text hover:bg-hud-card transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Digital Hologram Preview Card */}
        <div className="my-5 p-4 rounded-lg bg-hud-card border border-cyber-cyan/30 relative overflow-hidden group">
          <div className="absolute top-0 right-0 px-3 py-1 bg-cyber-cyan/20 border-b border-l border-cyber-cyan/40 text-[10px] font-orbitron font-bold text-cyber-cyan">
            OFFICIAL DIGITAL PASSPORT
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={passport.avatarUrl}
                alt={passport.gamerTag}
                className="w-16 h-16 rounded-lg object-cover border-2 border-cyber-cyan/60"
              />
              <div className="absolute -bottom-1 -right-1 bg-cyber-cyan text-black p-0.5 rounded">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-orbitron font-extrabold text-lg text-hud-text tracking-wider">
                  {passport.gamerTag}
                </h4>
                <span className="text-xs px-2 py-0.5 rounded bg-cyber-purple/20 text-cyber-purple font-rajdhani font-bold">
                  LVL {passport.level}
                </span>
              </div>
              <p className="text-xs text-hud-muted font-rajdhani">{passport.realName} • {passport.state}, India</p>
              <p className="text-xs text-cyber-cyan font-mono mt-1 font-bold">{passport.passportNumber}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-hud-border/60 text-center">
            <div className="bg-hud-bg/60 p-2 rounded">
              <div className="text-[10px] text-hud-muted font-orbitron">PRIMARY</div>
              <div className="text-xs font-bold text-hud-text font-rajdhani">{passport.primaryGame}</div>
            </div>
            <div className="bg-hud-bg/60 p-2 rounded">
              <div className="text-[10px] text-hud-muted font-orbitron">ROLE</div>
              <div className="text-xs font-bold text-cyber-cyan font-rajdhani">{passport.primaryRole}</div>
            </div>
            <div className="bg-hud-bg/60 p-2 rounded">
              <div className="text-[10px] text-hud-muted font-orbitron">REPUTATION</div>
              <div className="text-xs font-bold text-cyber-gold font-rajdhani">{passport.reputationScore}/100</div>
            </div>
          </div>
        </div>

        {/* Share Link Input */}
        <div className="space-y-2">
          <label className="text-xs font-orbitron text-hud-muted tracking-wide flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyber-cyan" />
            DIRECT VERIFIED PASSPORT URL
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={passportUrl}
              className="flex-1 px-3 py-2 bg-hud-bg border border-hud-border rounded-lg text-xs font-mono text-hud-text focus:outline-none focus:border-cyber-cyan"
            />
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-cyber-cyan text-black font-rajdhani font-bold text-sm rounded-lg hover:bg-cyber-cyan/90 transition-all flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,240,255,0.4)]"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  COPIED
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  COPY
                </>
              )}
            </button>
          </div>
        </div>

        {/* Social Sharing Quick Buttons */}
        <div className="mt-5 grid grid-cols-3 gap-2.5">
          <a
            href={`https://twitter.com/intent/tweet?text=Check%20out%20my%20verified%20Indian%20Esports%20Passport%20on%20IEIH%20%23IndiaEsports%20%23IEIH&url=${encodeURIComponent(passportUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playClickSound()}
            className="flex items-center justify-center gap-2 p-2.5 bg-hud-card hover:bg-hud-border/40 border border-hud-border rounded-lg text-xs font-rajdhani font-bold text-hud-text transition-all hover:border-cyber-cyan"
          >
            <span>Twitter / X</span>
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(passportUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playClickSound()}
            className="flex items-center justify-center gap-2 p-2.5 bg-hud-card hover:bg-hud-border/40 border border-hud-border rounded-lg text-xs font-rajdhani font-bold text-hud-text transition-all hover:border-cyber-blue"
          >
            <span>LinkedIn</span>
          </a>
          <button
            onClick={() => {
              handleCopy();
            }}
            className="flex items-center justify-center gap-2 p-2.5 bg-hud-card hover:bg-hud-border/40 border border-hud-border rounded-lg text-xs font-rajdhani font-bold text-hud-text transition-all hover:border-cyber-purple"
          >
            <span>Discord Link</span>
          </button>
        </div>

        {/* Verification guarantee */}
        <div className="mt-5 p-3 rounded-lg bg-cyber-cyan/5 border border-cyber-cyan/20 flex items-center gap-2.5 text-xs text-hud-muted">
          <Trophy className="w-4 h-4 text-cyber-gold shrink-0" />
          <span>IEIH passports are cryptographically verifiable by registered Indian tournament organizers & scouts.</span>
        </div>
      </div>
    </div>
  );
};
