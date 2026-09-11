import React, { useState, useMemo } from 'react';
import { 
  Trophy, 
  Calendar, 
  MapPin, 
  Users, 
  ShieldCheck, 
  ExternalLink, 
  ChevronRight, 
  CheckCircle2, 
  Search, 
  Award,
  Sparkles
} from 'lucide-react';
import { Tournament, PlayerPassport } from '../../types';
import { soundManager } from '../../utils/audio';
import { TournamentDetailModal } from './TournamentDetailModal';

interface TournamentHubProps {
  tournaments: Tournament[];
  currentUser: PlayerPassport;
}

export const TournamentHub: React.FC<TournamentHubProps> = ({
  tournaments,
  currentUser
}) => {
  const [selectedGame, setSelectedGame] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [activeModalTournament, setActiveModalTournament] = useState<Tournament | null>(null);
  const [registeredIds, setRegisteredIds] = useState<string[]>(['tourn_01']);

  const handleRegisterSuccess = (tournamentId: string) => {
    soundManager.playLevelUpSound();
    setRegisteredIds(prev => [...prev, tournamentId]);
  };

  const filteredTournaments = useMemo(() => {
    return tournaments.filter(t => {
      if (selectedGame !== 'ALL' && t.game !== selectedGame) return false;
      if (selectedStatus !== 'ALL' && t.status !== selectedStatus) return false;
      if (selectedType !== 'ALL' && t.type !== selectedType) return false;
      return true;
    });
  }, [tournaments, selectedGame, selectedStatus, selectedType]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#101622] border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full text-xs font-semibold border border-amber-500/20">
            <Trophy className="w-3.5 h-3.5" />
            <span>National Arenas & LAN Directory</span>
          </div>
          <h2 className="font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Tournaments, LAN Arenas & Cups
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-normal">
            Compete in verified Indian LANs and online scrims backed by IEIH Escrow Prizepool Guarantees. Track live brackets, trust audits, and squad registrations.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-3xl bg-white dark:bg-[#101622] border border-slate-200 dark:border-white/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Game filter pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {['ALL', 'VALORANT', 'BGMI', 'CS2'].map(game => (
            <button
              key={game}
              onClick={() => {
                soundManager.playGlitchChirp();
                setSelectedGame(game);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedGame === game
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10'
              }`}
            >
              {game === 'ALL' ? 'All Games' : game}
            </button>
          ))}
        </div>

        {/* Status and Type Dropdowns */}
        <div className="flex items-center gap-2">
          <select
            value={selectedStatus}
            onChange={e => {
              soundManager.playGlitchChirp();
              setSelectedStatus(e.target.value);
            }}
            className="px-3.5 py-1.5 bg-slate-50 dark:bg-[#182032] border border-slate-200 dark:border-white/10 rounded-full text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="Live Now 🔴">Live Now 🔴</option>
            <option value="Registration Open">Registration Open</option>
            <option value="Upcoming">Upcoming</option>
          </select>

          <select
            value={selectedType}
            onChange={e => {
              soundManager.playGlitchChirp();
              setSelectedType(e.target.value);
            }}
            className="px-3.5 py-1.5 bg-slate-50 dark:bg-[#182032] border border-slate-200 dark:border-white/10 rounded-full text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
          >
            <option value="ALL">All Formats</option>
            <option value="LAN Arena">LAN Arenas</option>
            <option value="Online Championship">Online Cups</option>
            <option value="College Exclusive">College Exclusive</option>
          </select>
        </div>
      </div>

      {/* Tournament Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTournaments.map(tournament => {
          const isRegistered = registeredIds.includes(tournament.id);
          const percentSlots = Math.round((tournament.registeredSlots / tournament.totalSlots) * 100);

          return (
            <div
              key={tournament.id}
              className="group relative rounded-3xl bg-white dark:bg-[#131926] border border-slate-200 dark:border-white/10 hover:border-amber-500/40 dark:hover:border-amber-500/40 transition-all duration-200 flex flex-col overflow-hidden shadow-sm hover:shadow-md"
            >
              {/* Banner Top */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                <img
                  src={tournament.bannerImage}
                  alt={tournament.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#131926] via-white/30 dark:via-[#131926]/30 to-transparent"></div>

                {/* Status Badges */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 text-[11px] font-semibold rounded-full shadow-sm ${
                    tournament.status.includes('Live')
                      ? 'bg-rose-500 text-white'
                      : 'bg-white/90 dark:bg-[#101622]/90 backdrop-blur text-sky-600 dark:text-sky-400 border border-slate-200 dark:border-white/10'
                  }`}>
                    {tournament.status}
                  </span>
                  <span className="px-2.5 py-0.5 bg-white/90 dark:bg-[#101622]/90 backdrop-blur text-[11px] font-semibold text-slate-900 dark:text-white rounded-full border border-slate-200 dark:border-white/10">
                    {tournament.game}
                  </span>
                </div>

                {/* Prize Pool Badge */}
                <div className="absolute bottom-3 right-3 px-3 py-1 bg-white/90 dark:bg-[#101622]/90 backdrop-blur rounded-xl border border-slate-200 dark:border-white/10 text-right shadow-sm">
                  <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 block uppercase">Prize Pool</span>
                  <span className="text-base font-bold text-amber-600 dark:text-amber-400">
                    {tournament.prizePoolFormatted}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col space-y-4">
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                    {tournament.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-sky-500" />
                      {tournament.startDate}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                      {tournament.location}
                    </span>
                  </div>
                </div>

                {/* Organizer Trust Badge Component */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1c2438] border border-slate-200/60 dark:border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={tournament.organizer.logo}
                      alt={tournament.organizer.name}
                      className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-white/10"
                    />
                    <div>
                      <div className="flex items-center gap-1 text-xs font-semibold text-slate-900 dark:text-white">
                        <span>{tournament.organizer.name}</span>
                        <ShieldCheck className="w-3.5 h-3.5 text-sky-500" />
                      </div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        {tournament.organizer.tier}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase">Escrow Audit</div>
                    <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {tournament.organizer.trustScore}/100 Trust
                    </div>
                  </div>
                </div>

                {/* Slots Meter */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>Squad Capacity: <strong className="text-slate-900 dark:text-white">{tournament.registeredSlots}/{tournament.totalSlots}</strong></span>
                    <span className="text-sky-600 dark:text-sky-400 font-semibold">{percentSlots}% Full</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full"
                      style={{ width: `${percentSlots}%` }}
                    ></div>
                  </div>
                </div>

                {/* Actions Row */}
                <div className="pt-3 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-3 mt-auto">
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Format: <span className="text-slate-900 dark:text-white font-semibold">{tournament.type}</span>
                  </div>

                  <button
                    onClick={() => {
                      soundManager.playClickSound();
                      setActiveModalTournament(tournament);
                    }}
                    className={`px-5 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm ${
                      isRegistered
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100'
                    }`}
                  >
                    {isRegistered ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Registered</span>
                      </>
                    ) : (
                      <>
                        <span>View Arena & Register</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tournament Detail Modal */}
      {activeModalTournament && (
        <TournamentDetailModal
          tournament={activeModalTournament}
          currentUser={currentUser}
          isRegistered={registeredIds.includes(activeModalTournament.id)}
          onRegistered={() => handleRegisterSuccess(activeModalTournament.id)}
          onClose={() => setActiveModalTournament(null)}
        />
      )}
    </div>
  );
};
