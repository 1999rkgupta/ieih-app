import React, { useState } from 'react';
import { 
  X, 
  Trophy, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  Users, 
  DollarSign, 
  Award, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Clock,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { Tournament, PlayerPassport } from '../../types';
import { soundManager } from '../../utils/audio';
import { registerForTournament } from '../../utils/storage';

interface TournamentDetailModalProps {
  tournament: Tournament;
  currentUser: PlayerPassport;
  isRegistered: boolean;
  onRegistered: () => void;
  onClose: () => void;
}

export const TournamentDetailModal: React.FC<TournamentDetailModalProps> = ({
  tournament,
  currentUser,
  isRegistered: initialIsRegistered,
  onRegistered,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'brackets' | 'rules' | 'prizes' | 'organizer'>('brackets');
  const [isRegistered, setIsRegistered] = useState(initialIsRegistered);
  const [squadName, setSquadName] = useState(`${currentUser.gamerTag} & Squad`);
  const [submitting, setSubmitting] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    soundManager.playSuccessBeep();
    registerForTournament(tournament.id);
    setTimeout(() => {
      setIsRegistered(true);
      setSubmitting(false);
      onRegistered();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-hud-surface border border-hud-border rounded-2xl flex flex-col shadow-2xl shadow-cyber-cyan/15 overflow-hidden">
        {/* Banner Cover Header */}
        <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-hud-card shrink-0">
          <img
            src={tournament.bannerImage}
            alt={tournament.title}
            className="w-full h-full object-cover opacity-60 filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-hud-surface via-hud-surface/60 to-transparent"></div>

          {/* Close button */}
          <button
            onClick={() => {
              soundManager.playClickSound();
              onClose();
            }}
            className="absolute top-4 right-4 z-20 p-2 rounded-lg bg-black/70 hover:bg-black text-hud-muted hover:text-hud-text border border-hud-border transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Info Overlays */}
          <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 z-10">
            <span className="px-3 py-1 bg-cyber-red/90 text-white font-orbitron text-xs font-black rounded shadow-[0_0_10px_#FF4655]">
              {tournament.status}
            </span>
            <span className="px-3 py-1 bg-black/80 backdrop-blur border border-cyber-cyan/50 text-cyber-cyan font-orbitron text-xs font-bold rounded">
              {tournament.game}
            </span>
            <span className="px-3 py-1 bg-black/80 backdrop-blur border border-hud-border text-hud-text font-rajdhani text-xs font-bold rounded">
              {tournament.type}
            </span>
          </div>

          <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-10">
            <div>
              <h2 className="font-orbitron font-extrabold text-xl sm:text-2xl text-hud-text tracking-wide glow-text-cyan">
                {tournament.title}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-xs font-rajdhani text-hud-muted mt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-cyber-cyan" />
                  {tournament.startDate} - {tournament.endDate}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-hud-text font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-cyber-purple" />
                  {tournament.location}
                </span>
              </div>
            </div>

            <div className="bg-black/85 backdrop-blur-md px-4 py-2 rounded-xl border border-cyber-gold/50 text-right shrink-0">
              <div className="text-[10px] font-orbitron text-hud-muted">TOTAL PRIZE POOL</div>
              <div className="text-xl sm:text-2xl font-orbitron font-black text-cyber-gold glow-text-gold">
                {tournament.prizePoolFormatted}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex border-b border-hud-border px-6 pt-3 gap-3 bg-hud-card/60 shrink-0 overflow-x-auto no-scrollbar">
          <button
            onClick={() => {
              soundManager.playClickSound();
              setActiveTab('brackets');
            }}
            className={`pb-3 px-3 text-xs font-orbitron font-semibold tracking-wider border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'brackets' ? 'border-cyber-cyan text-cyber-cyan' : 'border-transparent text-hud-muted hover:text-hud-text'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" /> BRACKETS & FORMAT
          </button>
          <button
            onClick={() => {
              soundManager.playClickSound();
              setActiveTab('prizes');
            }}
            className={`pb-3 px-3 text-xs font-orbitron font-semibold tracking-wider border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'prizes' ? 'border-cyber-gold text-cyber-gold' : 'border-transparent text-hud-muted hover:text-hud-text'
            }`}
          >
            <Award className="w-3.5 h-3.5" /> PRIZE DISTRIBUTION
          </button>
          <button
            onClick={() => {
              soundManager.playClickSound();
              setActiveTab('rules');
            }}
            className={`pb-3 px-3 text-xs font-orbitron font-semibold tracking-wider border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'rules' ? 'border-cyber-purple text-cyber-purple' : 'border-transparent text-hud-muted hover:text-hud-text'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> RULEBOOK & SCHEDULE
          </button>
          <button
            onClick={() => {
              soundManager.playClickSound();
              setActiveTab('organizer');
            }}
            className={`pb-3 px-3 text-xs font-orbitron font-semibold tracking-wider border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'organizer' ? 'border-cyber-blue text-cyber-blue' : 'border-transparent text-hud-muted hover:text-hud-text'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" /> ORGANIZER TRUST AUDIT ({tournament.organizer.trustScore}/100)
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Tab 1: Brackets & Live Tree */}
          {activeTab === 'brackets' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-hud-card border border-hud-border">
                <h4 className="font-orbitron font-bold text-xs text-cyber-cyan mb-1">TOURNAMENT FORMAT</h4>
                <p className="text-xs text-hud-text font-rajdhani font-semibold">{tournament.format}</p>
                <p className="text-xs text-hud-muted font-sans mt-1">{tournament.description}</p>
              </div>

              {tournament.brackets && tournament.brackets.length > 0 ? (
                <div className="space-y-4">
                  <div className="text-xs font-orbitron font-bold text-hud-text flex items-center justify-between">
                    <span>PLAYOFF FIXTURES & BRACKET TREE</span>
                    <span className="text-[11px] font-rajdhani text-cyber-cyan font-bold">128-TICK AWS MUMBAI SERVER</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tournament.brackets.map(match => (
                      <div
                        key={match.id}
                        className="p-4 rounded-xl bg-hud-card border border-hud-border/80 relative overflow-hidden"
                      >
                        <div className="flex items-center justify-between pb-2 mb-3 border-b border-hud-border text-[11px] font-orbitron">
                          <span className="text-hud-muted">{match.roundName}</span>
                          {match.isLive ? (
                            <span className="px-2 py-0.5 bg-cyber-red text-white text-[10px] rounded font-bold animate-pulse">
                              LIVE NOW
                            </span>
                          ) : (
                            <span className="text-hud-dim font-mono">{match.scheduledTime}</span>
                          )}
                        </div>

                        <div className="space-y-2 font-rajdhani font-bold">
                          {/* Team 1 */}
                          <div className={`flex items-center justify-between p-2.5 rounded-lg border ${
                            match.team1.isWinner ? 'bg-cyber-cyan/10 border-cyber-cyan/60 text-cyber-cyan' : 'bg-hud-bg/70 border-hud-border text-hud-text'
                          }`}>
                            <div className="flex items-center gap-2">
                              <img src={match.team1.logo} alt={match.team1.name} className="w-5 h-5 rounded object-cover" />
                              <span className="text-sm">[{match.team1.tag}] {match.team1.name}</span>
                            </div>
                            <span className="font-orbitron font-black text-sm">{match.team1.score ?? '-'}</span>
                          </div>

                          {/* Team 2 */}
                          <div className={`flex items-center justify-between p-2.5 rounded-lg border ${
                            match.team2.isWinner ? 'bg-cyber-cyan/10 border-cyber-cyan/60 text-cyber-cyan' : 'bg-hud-bg/70 border-hud-border text-hud-text'
                          }`}>
                            <div className="flex items-center gap-2">
                              <img src={match.team2.logo} alt={match.team2.name} className="w-5 h-5 rounded object-cover" />
                              <span className="text-sm">[{match.team2.tag}] {match.team2.name}</span>
                            </div>
                            <span className="font-orbitron font-black text-sm">{match.team2.score ?? '-'}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center bg-hud-card rounded-xl border border-hud-border">
                  <Clock className="w-8 h-8 text-cyber-cyan mx-auto mb-2 animate-spin-slow" />
                  <h4 className="font-orbitron font-bold text-sm text-hud-text">BRACKET GENERATION IN PROGRESS</h4>
                  <p className="text-xs text-hud-muted font-rajdhani mt-1">Brackets will be drawn live on stream once team check-ins conclude.</p>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Prizes */}
          {activeTab === 'prizes' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-cyber-gold/5 border border-cyber-gold/30 flex items-center justify-between">
                <div>
                  <h4 className="font-orbitron font-bold text-sm text-cyber-gold">IEIH ESCROW DISBURSAL GUARANTEE</h4>
                  <p className="text-xs text-hud-muted font-rajdhani mt-0.5">All tournament prizing is held in bank escrow and disbursed within 14 days of finals completion.</p>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-orbitron text-hud-muted">TOTAL POOL</div>
                  <div className="text-xl font-orbitron font-black text-cyber-gold">{tournament.prizePoolFormatted}</div>
                </div>
              </div>

              <div className="space-y-2">
                {tournament.prizeDistribution.map((prize, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-hud-card border border-hud-border flex items-center justify-between text-sm font-rajdhani font-bold hover:border-cyber-gold/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-hud-bg border border-hud-border flex items-center justify-center font-orbitron text-xs text-cyber-gold">
                        #{idx + 1}
                      </div>
                      <span className="text-hud-text font-orbitron text-xs">{prize.place}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-hud-muted text-xs">{prize.percentage}</span>
                      <span className="text-emerald-400 font-orbitron font-bold">{prize.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Rules & Schedule */}
          {activeTab === 'rules' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="font-orbitron font-bold text-xs text-cyber-purple tracking-wider">OFFICIAL TOURNAMENT RULES</h4>
                <div className="space-y-2">
                  {tournament.rulesSummary.map((rule, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-hud-card border border-hud-border flex items-start gap-2.5 text-xs text-hud-text font-sans">
                      <CheckCircle2 className="w-4 h-4 text-cyber-cyan shrink-0 mt-0.5" />
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-orbitron font-bold text-xs text-cyber-cyan tracking-wider">OFFICIAL STAGE TIMELINE</h4>
                <div className="space-y-2">
                  {tournament.schedule.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-hud-card border border-hud-border flex items-center justify-between text-xs font-rajdhani font-bold">
                      <span className="text-hud-text font-orbitron text-xs">{item.stage}</span>
                      <div className="flex items-center gap-3 text-hud-muted">
                        <span>{item.date}</span>
                        <span className="text-cyber-cyan font-mono">{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Organizer Trust Audit */}
          {activeTab === 'organizer' && (
            <div className="space-y-5">
              <div className="p-5 rounded-xl bg-hud-card border-2 border-cyber-cyan/40 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img src={tournament.organizer.logo} alt={tournament.organizer.name} className="w-16 h-16 rounded-xl object-cover border-2 border-cyber-cyan" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-orbitron font-bold text-lg text-hud-text">{tournament.organizer.name}</h4>
                      <ShieldCheck className="w-5 h-5 text-cyber-cyan" />
                    </div>
                    <span className="px-2 py-0.5 bg-cyber-cyan/20 text-cyber-cyan rounded font-rajdhani font-bold text-xs">
                      {tournament.organizer.tier}
                    </span>
                    <p className="text-xs text-hud-muted font-rajdhani mt-1">Verified Entity with registered Indian GST & Escrow Bond</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-hud-bg border border-hud-border text-center shrink-0">
                  <div className="text-[10px] font-orbitron text-hud-muted">TRUST SCORE</div>
                  <div className="text-3xl font-orbitron font-black text-cyber-cyan glow-text-cyan mt-0.5">
                    {tournament.organizer.trustScore}<span className="text-sm text-hud-muted font-normal">/100</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-hud-card border border-hud-border rounded-xl text-center">
                  <div className="text-[10px] font-orbitron text-hud-muted">PAYOUT PUNCTUALITY</div>
                  <div className="text-lg font-orbitron font-bold text-emerald-400 mt-1">99.4%</div>
                </div>
                <div className="p-3 bg-hud-card border border-hud-border rounded-xl text-center">
                  <div className="text-[10px] font-orbitron text-hud-muted">DISPUTE SPEED</div>
                  <div className="text-lg font-orbitron font-bold text-cyber-cyan mt-1">&lt; 45 Mins</div>
                </div>
                <div className="p-3 bg-hud-card border border-hud-border rounded-xl text-center">
                  <div className="text-[10px] font-orbitron text-hud-muted">TOURNAMENTS COMPLETED</div>
                  <div className="text-lg font-orbitron font-bold text-cyber-purple mt-1">140+ Events</div>
                </div>
                <div className="p-3 bg-hud-card border border-hud-border rounded-xl text-center">
                  <div className="text-[10px] font-orbitron text-hud-muted">TOTAL PRIZING PAID</div>
                  <div className="text-lg font-orbitron font-bold text-cyber-gold mt-1">₹14.8+ Cr</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Registration Footer Bar */}
        <div className="p-5 border-t border-hud-border bg-hud-card/90 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-cyber-cyan" />
            <div>
              <div className="text-xs font-orbitron font-bold text-hud-text">
                SLOT STATUS: <span className="text-cyber-cyan">{tournament.registeredSlots} / {tournament.totalSlots} SLOTS FILLED</span>
              </div>
              <p className="text-xs font-rajdhani text-hud-muted">
                Entry Fee: <strong className="text-emerald-400 font-bold">{tournament.entryFee}</strong>
              </p>
            </div>
          </div>

          {isRegistered ? (
            <div className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500/20 border border-emerald-400 rounded-xl text-emerald-400 font-orbitron text-xs font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-4 h-4" />
              SQUAD REGISTERED & VERIFIED
            </div>
          ) : (
            <form onSubmit={handleRegister} className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                required
                value={squadName}
                onChange={e => setSquadName(e.target.value)}
                placeholder="Enter Squad Tag / Name"
                className="px-3 py-2 bg-hud-bg border border-hud-border rounded-xl text-xs font-rajdhani font-bold text-hud-text focus:outline-none focus:border-cyber-cyan"
              />
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-gradient-to-r from-cyber-cyan to-cyber-blue text-black font-orbitron text-xs font-bold rounded-xl hover:shadow-[0_0_20px_rgba(0,240,255,0.6)] transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 fill-black" />
                {submitting ? 'LOCKING ROSTER...' : '1-CLICK REGISTER SQUAD'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
