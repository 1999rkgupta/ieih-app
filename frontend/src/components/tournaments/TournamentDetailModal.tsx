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
  const [activeTab, setActiveTab] = useState<'brackets' | 'prizes' | 'rules' | 'organizer'>('brackets');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white dark:bg-[#101c18] border border-[#91baaf]/40 dark:border-[#91baaf]/25 rounded-3xl flex flex-col shadow-2xl overflow-hidden">
        {/* Banner Cover Header */}
        <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-[#eaf5f2] dark:bg-[#090e0c] shrink-0">
          <img
            src={tournament.bannerImage}
            alt={tournament.title}
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#101c18] via-white/40 dark:via-[#101c18]/40 to-transparent"></div>

          {/* Close button */}
          <button
            onClick={() => {
              soundManager.playClickSound();
              onClose();
            }}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Top Info Overlays */}
          <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 z-10">
            <span className={`px-2.5 py-0.5 text-[11px] font-semibold rounded-full shadow-sm ${
              tournament.status.includes('Live')
                ? 'bg-rose-500 text-white'
                : 'bg-white/90 dark:bg-[#101c18]/90 text-[#18483d] dark:text-[#91baaf] border border-[#91baaf]/30 dark:border-[#91baaf]/20'
            }`}>
              {tournament.status}
            </span>
            <span className="px-2.5 py-0.5 bg-white/90 dark:bg-[#101c18]/90 backdrop-blur text-[11px] font-semibold text-[#0d2620] dark:text-white rounded-full border border-[#91baaf]/30 dark:border-[#91baaf]/20">
              {tournament.game}
            </span>
            <span className="px-2.5 py-0.5 bg-white/90 dark:bg-[#101c18]/90 backdrop-blur text-[11px] font-medium text-[#385e54] dark:text-[#a0c7bd] rounded-full border border-[#91baaf]/30 dark:border-[#91baaf]/20">
              {tournament.type}
            </span>
          </div>

          <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-10">
            <div>
              <h2 className="font-bold text-xl sm:text-2xl text-[#0d2620] dark:text-white">
                {tournament.title}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#385e54] dark:text-[#a0c7bd] mt-1 font-medium">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#286b5c] dark:text-[#91baaf]" />
                  {tournament.startDate} - {tournament.endDate}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-[#0d2620] dark:text-white font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#286b5c] dark:text-[#91baaf]" />
                  {tournament.location}
                </span>
              </div>
            </div>

            <div className="bg-white/95 dark:bg-[#101c18]/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-[#91baaf]/30 dark:border-[#91baaf]/20 text-right shrink-0 shadow-sm">
              <div className="text-[10px] font-semibold text-[#385e54] dark:text-[#88b5a9] uppercase">Prize Pool</div>
              <div className="text-xl sm:text-2xl font-bold text-amber-600 dark:text-amber-400">
                {tournament.prizePoolFormatted}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar (Spotify pill tabs) */}
        <div className="flex border-b border-slate-200 dark:border-white/10 px-6 py-2.5 gap-2 bg-slate-50/80 dark:bg-white/5 shrink-0 overflow-x-auto">
          <button
            onClick={() => {
              soundManager.playClickSound();
              setActiveTab('brackets');
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'brackets'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" /> Brackets & Format
          </button>
          <button
            onClick={() => {
              soundManager.playClickSound();
              setActiveTab('prizes');
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'prizes'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10'
            }`}
          >
            <Award className="w-3.5 h-3.5" /> Prize Distribution
          </button>
          <button
            onClick={() => {
              soundManager.playClickSound();
              setActiveTab('rules');
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'rules'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> Rules & Timeline
          </button>
          <button
            onClick={() => {
              soundManager.playClickSound();
              setActiveTab('organizer');
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'organizer'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Organizer Audit ({tournament.organizer.trustScore}/100)
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-white dark:bg-[#101c18]">
          {/* Tab 1: Brackets */}
          {activeTab === 'brackets' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                <h4 className="font-semibold text-xs text-sky-600 dark:text-sky-400 uppercase tracking-wider mb-1">Tournament Format</h4>
                <p className="text-xs text-slate-900 dark:text-white font-medium">{tournament.format}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{tournament.description}</p>
              </div>

              {tournament.brackets && tournament.brackets.length > 0 ? (
                <div className="space-y-4">
                  <div className="text-xs font-semibold text-slate-900 dark:text-white flex items-center justify-between">
                    <span>Playoff Fixtures & Bracket Tree</span>
                    <span className="text-[11px] text-sky-500 font-medium">128-Tick Dedicated Server</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tournament.brackets.map(match => (
                      <div
                        key={match.id}
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10"
                      >
                        <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200 dark:border-white/10 text-[11px]">
                          <span className="text-slate-500 dark:text-slate-400 font-medium">{match.roundName}</span>
                          {match.isLive ? (
                            <span className="px-2 py-0.5 bg-rose-500 text-white text-[10px] rounded-full font-bold">
                              Live Now
                            </span>
                          ) : (
                            <span className="text-slate-400 font-mono">{match.scheduledTime}</span>
                          )}
                        </div>

                        <div className="space-y-2 text-xs font-semibold">
                          {/* Team 1 */}
                          <div className={`flex items-center justify-between p-2.5 rounded-xl border ${
                            match.team1.isWinner
                              ? 'bg-sky-500/10 border-sky-500/40 text-sky-600 dark:text-sky-400'
                              : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white'
                          }`}>
                            <div className="flex items-center gap-2">
                              <img src={match.team1.logo} alt={match.team1.name} className="w-5 h-5 rounded-full object-cover" />
                              <span className="text-xs">[{match.team1.tag}] {match.team1.name}</span>
                            </div>
                            <span className="font-bold text-sm">{match.team1.score ?? '-'}</span>
                          </div>

                          {/* Team 2 */}
                          <div className={`flex items-center justify-between p-2.5 rounded-xl border ${
                            match.team2.isWinner
                              ? 'bg-sky-500/10 border-sky-500/40 text-sky-600 dark:text-sky-400'
                              : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white'
                          }`}>
                            <div className="flex items-center gap-2">
                              <img src={match.team2.logo} alt={match.team2.name} className="w-5 h-5 rounded-full object-cover" />
                              <span className="text-xs">[{match.team2.tag}] {match.team2.name}</span>
                            </div>
                            <span className="font-bold text-sm">{match.team2.score ?? '-'}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl">
                  <Clock className="w-8 h-8 text-sky-500 mx-auto mb-2" />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Bracket Generation In Progress</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Brackets will be drawn live on stream once team check-ins conclude.</p>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Prizes */}
          {activeTab === 'prizes' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-amber-600 dark:text-amber-400">IEIH Escrow Prizepool Guarantee</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">All prizing is secured in bank escrow and disbursed within 14 days of tournament finals.</p>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase">Total Pool</div>
                  <div className="text-xl font-bold text-amber-600 dark:text-amber-400">{tournament.prizePoolFormatted}</div>
                </div>
              </div>

              <div className="space-y-2">
                {tournament.prizeDistribution.map((prize, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-between text-xs font-semibold"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-slate-200/70 dark:bg-white/10 flex items-center justify-center text-xs font-bold text-amber-600 dark:text-amber-400">
                        #{idx + 1}
                      </div>
                      <span className="text-slate-900 dark:text-white text-xs">{prize.place}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-slate-500 dark:text-slate-400 text-xs font-normal">{prize.percentage}</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">{prize.amount}</span>
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
                <h4 className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">Official Rules</h4>
                <div className="space-y-2">
                  {tournament.rulesSummary.map((rule, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-start gap-2.5 text-xs text-slate-900 dark:text-white">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">Timeline</h4>
                <div className="space-y-2">
                  {tournament.schedule.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-between text-xs font-medium">
                      <span className="text-slate-900 dark:text-white font-semibold text-xs">{item.stage}</span>
                      <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                        <span>{item.date}</span>
                        <span className="text-sky-500 font-mono font-medium">{item.time}</span>
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
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img src={tournament.organizer.logo} alt={tournament.organizer.name} className="w-14 h-14 rounded-full object-cover border-2 border-slate-200 dark:border-white/10" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-base text-slate-900 dark:text-white">{tournament.organizer.name}</h4>
                      <ShieldCheck className="w-4 h-4 text-sky-500" />
                    </div>
                    <span className="px-2 py-0.5 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-full font-semibold text-[11px]">
                      {tournament.organizer.tier}
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Verified Entity with registered Indian GST & Escrow Bond</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-center shrink-0">
                  <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase">Trust Score</div>
                  <div className="text-2xl font-extrabold text-sky-600 dark:text-sky-400 mt-0.5">
                    {tournament.organizer.trustScore}<span className="text-xs text-slate-500 dark:text-slate-400 font-normal">/100</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-center">
                  <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase">Payout Punctuality</div>
                  <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-1">99.4%</div>
                </div>
                <div className="p-3.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-center">
                  <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase">Dispute Speed</div>
                  <div className="text-lg font-bold text-sky-600 dark:text-sky-400 mt-1">&lt; 45 mins</div>
                </div>
                <div className="p-3.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-center">
                  <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase">Events Completed</div>
                  <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mt-1">140+</div>
                </div>
                <div className="p-3.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-center">
                  <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase">Total Prizing Paid</div>
                  <div className="text-lg font-bold text-amber-600 dark:text-amber-400 mt-1">₹14.8+ Cr</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Registration Footer Bar */}
        <div className="p-4 sm:p-5 border-t border-[#91baaf]/30 dark:border-[#91baaf]/20 bg-[#eaf5f2]/90 dark:bg-[#101c18]/90 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-[#286b5c] dark:text-[#91baaf]" />
            <div>
              <div className="text-xs font-semibold text-[#0d2620] dark:text-white">
                Capacity: <span className="text-[#18483d] dark:text-[#91baaf] font-bold">{tournament.registeredSlots} / {tournament.totalSlots} Slots Filled</span>
              </div>
              <p className="text-xs text-[#385e54] dark:text-[#a0c7bd] font-medium">
                Entry Fee: <strong className="text-emerald-700 dark:text-emerald-400 font-semibold">{tournament.entryFee}</strong>
              </p>
            </div>
          </div>

          {isRegistered ? (
            <div className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-semibold border border-emerald-500/30">
              <CheckCircle2 className="w-4 h-4" />
              <span>Squad Registered & Verified</span>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                required
                value={squadName}
                onChange={e => setSquadName(e.target.value)}
                placeholder="Enter Squad Tag / Name"
                className="px-3.5 py-2 bg-white dark:bg-[#15231f] border border-[#91baaf]/40 dark:border-[#91baaf]/30 rounded-full text-xs text-[#0d2620] dark:text-white placeholder:text-[#466b62] dark:placeholder:text-[#6a998d] focus:outline-none focus:border-[#91baaf]"
              />
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2 bg-gradient-to-r from-[#18483d] to-[#0f322a] hover:from-[#133c32] hover:to-[#0b241e] dark:from-[#91baaf] dark:to-[#71a396] text-white dark:text-[#090e0c] text-xs font-semibold rounded-full transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span>{submitting ? 'Registering...' : '1-Click Register'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
