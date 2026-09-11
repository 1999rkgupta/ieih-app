import React, { useState } from 'react';
import { X, Copy, Check, Share2, ShieldCheck } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#111726] rounded-3xl p-6 shadow-2xl overflow-hidden border border-slate-200 dark:border-white/10">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-600 dark:text-sky-400">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Share Digital Passport
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Verified athlete identity link</p>
            </div>
          </div>
          <button
            onClick={() => {
              soundManager.playClickSound();
              onClose();
            }}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Digital Preview Card */}
        <div className="my-5 p-4 rounded-2xl bg-slate-50 dark:bg-[#182032] border border-slate-200 dark:border-white/10 relative overflow-hidden group">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-base text-slate-900 dark:text-white truncate">
                  {passport.gamerTag}
                </h4>
                <ShieldCheck className="w-4 h-4 text-sky-500 shrink-0" />
                <span className="text-[10px] font-semibold px-2 py-0.5 bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 rounded-full font-mono">
                  {passport.tier}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{passport.realName} • {passport.primaryGame}</p>
              <p className="text-xs font-mono text-sky-600 dark:text-sky-400 font-semibold mt-1">{passport.passportNumber}</p>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 bg-slate-900 text-white dark:bg-white dark:text-slate-950 rounded-lg shrink-0">
              L{passport.level}
            </span>
          </div>
        </div>

        {/* Share Link Copy Field */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Public Passport URL
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={passportUrl}
              className="flex-1 px-3.5 py-2.5 bg-slate-50 dark:bg-[#182032] border border-slate-200 dark:border-white/10 rounded-full text-xs font-mono text-slate-900 dark:text-white focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className="px-4 py-2.5 bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 font-semibold text-xs rounded-full transition-all flex items-center gap-1.5 shadow-sm shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
