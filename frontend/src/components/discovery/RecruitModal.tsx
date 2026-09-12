import React, { useState } from 'react';
import { X, Send, Zap, CheckCircle2 } from 'lucide-react';
import { PlayerPassport } from '../../types';
import { soundManager } from '../../utils/audio';

interface RecruitModalProps {
  player: PlayerPassport;
  onClose: () => void;
}

export const RecruitModal: React.FC<RecruitModalProps> = ({ player, onClose }) => {
  const [orgName, setOrgName] = useState('Revenant Velocity');
  const [offerType, setOfferType] = useState<'Tier-1 Scrim Trial' | 'Official Roster Contract' | 'Collegiate Tournament Roster'>('Tier-1 Scrim Trial');
  const [stipend, setStipend] = useState('₹45,000 / Month + 75% Prizepool Split');
  const [trialDate, setTrialDate] = useState('Tomorrow 20:00 IST');
  const [message, setMessage] = useState(`Hi ${player.gamerTag}, we are impressed by your verified ${player.primaryGame} stats on IEIH and would love to invite you to our scrim trials.`);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playSuccessBeep();
    setSent(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#101c18] border border-[#91baaf]/40 dark:border-[#91baaf]/25 rounded-3xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#91baaf]/30 dark:border-[#91baaf]/20 bg-[#eaf5f2] dark:bg-[#121d1a]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#91baaf]/20 flex items-center justify-center text-[#18483d] dark:text-[#91baaf]">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#0d2620] dark:text-white">
                Send Scout Offer
              </h3>
              <p className="text-xs text-[#385e54] dark:text-[#a0c7bd]">
                Direct transmission to <strong className="text-[#0d2620] dark:text-white font-semibold">{player.gamerTag}</strong>
              </p>
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

        {sent ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-lg text-[#0d2620] dark:text-white">
              Trial Offer Transmitted!
            </h4>
            <p className="text-xs text-[#284f45] dark:text-[#a0c7bd] max-w-xs mx-auto">
              Your scouting contract was delivered directly to {player.gamerTag}'s verified portal.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="text-xs font-semibold text-[#385e54] dark:text-[#88b5a9] block mb-1">Organization / Team Name</label>
              <input
                type="text"
                required
                value={orgName}
                onChange={e => setOrgName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-[#15231f] border border-[#91baaf]/40 dark:border-[#91baaf]/30 rounded-xl text-sm text-[#0d2620] dark:text-white focus:outline-none focus:border-[#91baaf] font-semibold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#385e54] dark:text-[#88b5a9] block mb-1">Contract / Offer Type</label>
                <select
                  value={offerType}
                  onChange={e => setOfferType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-[#15231f] border border-[#91baaf]/40 dark:border-[#91baaf]/30 rounded-xl text-xs text-[#0d2620] dark:text-white focus:outline-none focus:border-[#91baaf] font-medium"
                >
                  <option value="Tier-1 Scrim Trial">Tier-1 Scrim Trial</option>
                  <option value="Official Roster Contract">Official Roster Contract</option>
                  <option value="Collegiate Tournament Roster">Collegiate Tournament</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#385e54] dark:text-[#88b5a9] block mb-1">Scheduled Trial Date</label>
                <input
                  type="text"
                  value={trialDate}
                  onChange={e => setTrialDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-[#15231f] border border-[#91baaf]/40 dark:border-[#91baaf]/30 rounded-xl text-xs text-[#0d2620] dark:text-white focus:outline-none focus:border-[#91baaf] font-medium"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#385e54] dark:text-[#88b5a9] block mb-1">Compensation / Prize Split</label>
              <input
                type="text"
                value={stipend}
                onChange={e => setStipend(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-[#15231f] border border-[#91baaf]/40 dark:border-[#91baaf]/30 rounded-xl text-xs text-[#0d2620] dark:text-white focus:outline-none focus:border-[#91baaf] font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-[#385e54] dark:text-[#88b5a9] block mb-1">Scout Message</label>
              <textarea
                rows={3}
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-[#15231f] border border-[#91baaf]/40 dark:border-[#91baaf]/30 rounded-xl text-xs text-[#0d2620] dark:text-white focus:outline-none focus:border-[#91baaf]"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-[#91baaf]/20 hover:bg-[#91baaf]/30 dark:bg-white/10 dark:hover:bg-white/15 border border-[#91baaf]/30 dark:border-[#91baaf]/20 text-[#0d2620] dark:text-slate-200 font-semibold text-xs rounded-full transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-gradient-to-r from-[#18483d] to-[#0f322a] hover:from-[#133c32] hover:to-[#0b241e] dark:from-[#91baaf] dark:to-[#71a396] text-white dark:text-[#090e0c] font-semibold text-xs rounded-full transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Transmit Offer</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
