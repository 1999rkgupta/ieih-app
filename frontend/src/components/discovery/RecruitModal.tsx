import React, { useState } from 'react';
import { X, Send, ShieldCheck, Zap, Calendar, DollarSign, MessageSquare, CheckCircle2 } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-hud-surface border border-hud-border rounded-xl overflow-hidden shadow-2xl shadow-cyber-cyan/15">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-hud-border bg-hud-card">
          <div className="flex items-center gap-2.5">
            <Zap className="w-5 h-5 text-cyber-cyan" />
            <div>
              <h3 className="font-orbitron font-bold text-base text-hud-text">
                SEND SCOUT TRIAL OFFER
              </h3>
              <p className="text-xs text-hud-muted font-rajdhani">
                Direct encrypted transmission to <strong className="text-cyber-cyan">{player.gamerTag}</strong>
              </p>
            </div>
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

        {sent ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_20px_#10B981]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-orbitron font-bold text-xl text-hud-text">
              TRANSMISSION DELIVERED!
            </h4>
            <p className="text-sm font-rajdhani text-hud-muted max-w-sm mx-auto">
              Your scout offer has been sent to {player.gamerTag}'s verified IEIH passport inbox & Discord webhook.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="text-xs font-orbitron text-hud-muted block mb-1">RECRUITING ORGANIZATION / TEAM</label>
              <input
                type="text"
                required
                value={orgName}
                onChange={e => setOrgName(e.target.value)}
                className="w-full px-3 py-2 bg-hud-card border border-hud-border rounded-lg text-sm text-hud-text font-rajdhani font-bold focus:outline-none focus:border-cyber-cyan"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-orbitron text-hud-muted block mb-1">OFFER TYPE</label>
                <select
                  value={offerType}
                  onChange={e => setOfferType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-hud-card border border-hud-border rounded-lg text-xs text-hud-text font-rajdhani font-bold focus:outline-none focus:border-cyber-cyan"
                >
                  <option value="Tier-1 Scrim Trial">Tier-1 Scrim Trial</option>
                  <option value="Official Roster Contract">Official Roster Contract</option>
                  <option value="Collegiate Tournament Roster">Collegiate Tournament Roster</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-orbitron text-hud-muted block mb-1">PROPOSED TRIAL TIME</label>
                <input
                  type="text"
                  value={trialDate}
                  onChange={e => setTrialDate(e.target.value)}
                  className="w-full px-3 py-2 bg-hud-card border border-hud-border rounded-lg text-xs text-hud-text font-rajdhani focus:outline-none focus:border-cyber-cyan"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-orbitron text-hud-muted block mb-1">COMPENSATION / STIPEND ESTIMATE</label>
              <input
                type="text"
                value={stipend}
                onChange={e => setStipend(e.target.value)}
                className="w-full px-3 py-2 bg-hud-card border border-hud-border rounded-lg text-xs text-hud-text font-rajdhani font-bold text-emerald-400 focus:outline-none focus:border-cyber-cyan"
              />
            </div>

            <div>
              <label className="text-xs font-orbitron text-hud-muted block mb-1">CUSTOM SCOUT MESSAGE</label>
              <textarea
                rows={3}
                required
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="w-full px-3 py-2 bg-hud-card border border-hud-border rounded-lg text-xs text-hud-text focus:outline-none focus:border-cyber-cyan font-sans"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClickSound();
                  onClose();
                }}
                className="px-4 py-2 bg-hud-card hover:bg-hud-panel border border-hud-border text-hud-text font-rajdhani font-bold text-xs rounded-lg transition-colors"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-gradient-to-r from-cyber-cyan to-cyber-blue text-black font-rajdhani font-bold text-xs rounded-lg hover:shadow-[0_0_15px_rgba(0,240,255,0.5)] transition-all flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                TRANSMIT OFFER
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
