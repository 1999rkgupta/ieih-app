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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#101c18] rounded-3xl p-6 shadow-2xl overflow-hidden border border-[#91baaf]/40 dark:border-[#91baaf]/25">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#91baaf]/30 dark:border-[#91baaf]/20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#91baaf]/20 flex items-center justify-center text-[#18483d] dark:text-[#91baaf]">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#0d2620] dark:text-white">
                Share Digital Passport
              </h3>
              <p className="text-xs text-[#385e54] dark:text-[#a0c7bd]">Verified athlete identity link</p>
            </div>
          </div>
          <button
            onClick={() => {
              soundManager.playClickSound();
              onClose();
            }}
            className="p-1.5 rounded-full text-[#385e54] dark:text-slate-400 hover:text-[#0d2620] dark:hover:text-white hover:bg-[#91baaf]/20 dark:hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Digital Preview Card */}
        <div className="my-5 p-4 rounded-2xl bg-[#dceee7]/70 dark:bg-[#15231f] border border-[#91baaf]/30 dark:border-[#91baaf]/20 relative overflow-hidden group">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-base text-[#0d2620] dark:text-white truncate">
                  {passport.gamerTag}
                </h4>
                <ShieldCheck className="w-4 h-4 text-[#286b5c] dark:text-[#91baaf] shrink-0" />
                <span className="text-[10px] font-semibold px-2 py-0.5 bg-[#91baaf]/25 text-[#133c32] dark:text-[#91baaf] rounded-full font-mono border border-[#91baaf]/30">
                  {passport.tier}
                </span>
              </div>
              <p className="text-xs text-[#385e54] dark:text-[#88b5a9] mt-0.5">{passport.realName} • {passport.primaryGame}</p>
              <p className="text-xs font-mono text-[#18483d] dark:text-[#91baaf] font-semibold mt-1">{passport.passportNumber}</p>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 bg-[#18483d] text-white dark:bg-[#91baaf] dark:text-[#090e0c] rounded-lg shrink-0">
              L{passport.level}
            </span>
          </div>
        </div>

        {/* Share Link Copy Field */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-[#385e54] dark:text-[#88b5a9] uppercase tracking-wider block">
            Public Passport URL
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={passportUrl}
              className="flex-1 px-3.5 py-2.5 bg-white dark:bg-[#15231f] border border-[#91baaf]/40 dark:border-[#91baaf]/30 rounded-full text-xs font-mono text-[#0d2620] dark:text-white focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className="px-4 py-2.5 bg-gradient-to-r from-[#18483d] to-[#0f322a] hover:from-[#133c32] hover:to-[#0b241e] dark:from-[#91baaf] dark:to-[#71a396] text-white dark:text-[#090e0c] font-semibold text-xs rounded-full transition-all flex items-center gap-1.5 shadow-sm shrink-0 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
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
