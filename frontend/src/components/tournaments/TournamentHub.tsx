import React, { useState, useMemo } from 'react';
import { 
  Trophy, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  Users, 
  Sparkles, 
  ChevronRight, 
  Filter, 
  Flame, 
  Award,
  CheckCircle2
} from 'lucide-react';
import { Tournament, GameType, PlayerPassport } from '../../types';
import { soundManager } from '../../utils/audio';
import { TournamentDetailModal } from './TournamentDetailModal';
import { getRegisteredTournamentIds } from '../../utils/storage';

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
  const [registeredIds, setRegisteredIds] = useState<string[]>(getRegisteredTournamentIds());

  const handleRegisterSuccess = () => {
    setRegisteredIds(getRegisteredTournamentIds());
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
      <div className="relative p-6 sm:p-8 rounded-2xl bg-hud-surface border border-hud-border overflow-hidden">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-cyber-gold/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyber-gold/10 border border-cyber-gold/30 rounded-full text-xs font-orbitron font-bold text-cyber-gold">
            <Trophy className="w-3.5 h-3.5" />
            OFFICIAL INDIAN TOURNAMENT ARENA & LAN DIRECTORY
          </div>
          <h2 className="font-orbitron font-black text-2xl sm:text-4xl text-hud-text tracking-wide glow-text-gold">
            NATIONAL TOURNAMENT HUB & BRACKETS
          </h2>
          <p className="text-sm font-sans text-hud-muted">
            Compete in verified Indian LANs and online scrims backed by IEIH Escrow Prizepool Guarantees. Track live match brackets, organizer trust ratings, and verified roster rankings.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-hud-card border border-hud-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Game filter pills */}
        <div className="flex flex-wrap items-center gap-2">
          {['ALL', 'VALORANT', 'BGMI', 'CS2'].map(game => (
            <button
              key={game}
              onClick={() => {
                soundManager.playGlitchChirp();
                setSelectedGame(game);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-rajdhani font-bold transition-all ${
                selectedGame === game
                  ? 'bg-cyber-cyan text-black font-extrabold shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                  : 'bg-hud-bg text-hud-muted hover:text-hud-text border border-hud-border'
              }`}
            >
              {game === 'ALL' ? 'All Games' : game}
            </button>
          ))}
        </div>

        {/* Status and Type Dropdowns */}
        <div className="flex items-center gap-2.5">
          <select
            value={selectedStatus}
            onChange={e => {
              soundManager.playGlitchChirp();
              setSelectedStatus(e.target.value);
            }}
            className="px-3 py-1.5 bg-hud-bg border border-hud-border rounded-lg text-xs font-rajdhani font-bold text-hud-text focus:outline-none focus:border-cyber-cyan"
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
            className="px-3 py-1.5 bg-hud-bg border border-hud-border rounded-lg text-xs font-rajdhani font-bold text-hud-text focus:outline-none focus:border-cyber-cyan"
          >
            <option value="ALL">All Formats</option>
            <option value="LAN Arena">LAN Stadiums</option>
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
              className="group relative rounded-2xl bg-hud-surface border border-hud-border hover:border-cyber-cyan/70 transition-all duration-300 flex flex-col overflow-hidden shadow-xl hover:shadow-cyber-cyan/10"
            >
              {/* Banner Top */}
              <div className="relative h-44 w-full overflow-hidden bg-hud-card">
                <img
                  src={tournament.bannerImage}
                  alt={tournament.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-hud-surface via-hud-surface/40 to-transparent"></div>

                {/* Status Badges */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <span className={`px-2.5 py-1 text-[11px] font-orbitron font-bold rounded shadow-md ${
                    tournament.status.includes('Live')
                      ? 'bg-cyber-red text-white animate-pulse'
                      : 'bg-black/80 backdrop-blur border border-cyber-cyan/40 text-cyber-cyan'
                  }`}>
                    {tournament.status}
                  </span>
                  <span className="px-2 py-0.5 bg-black/75 backdrop-blur text-[11px] font-orbitron font-semibold text-hud-text rounded border border-hud-border">
                    {tournament.game}
                  </span>
                </div>

                {/* Prize Pool Badge */}
                <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/85 backdrop-blur rounded-lg border border-cyber-gold/50 text-right">
                  <span className="text-[10px] font-orbitron text-hud-muted block">PRIZE POOL</span>
                  <span className="text-base font-orbitron font-black text-cyber-gold glow-text-gold">
                    {tournament.prizePoolFormatted}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col space-y-4">
                <div>
                  <h3 className="font-orbitron font-extrabold text-lg text-hud-text group-hover:text-cyber-cyan transition-colors">
                    {tournament.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-rajdhani text-hud-muted mt-1.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-cyber-cyan" />
                      {tournament.startDate}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-cyber-purple" />
                      {tournament.location}
                    </span>
                  </div>
                </div>

                {/* Organizer Trust Badge Component */}
                <div className="p-3 rounded-xl bg-hud-card border border-hud-border flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={tournament.organizer.logo}
                      alt={tournament.organizer.name}
                      className="w-8 h-8 rounded-lg object-cover border border-cyber-cyan/40"
                    />
                    <div>
                      <div className="flex items-center gap-1 text-xs font-rajdhani font-bold text-hud-text">
                        <span>{tournament.organizer.name}</span>
                        <ShieldCheck className="w-3.5 h-3.5 text-cyber-cyan" />
                      </div>
                      <span className="text-[10px] text-cyber-cyan font-orbitron">
                        {tournament.organizer.tier}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[9px] font-orbitron text-hud-muted">TRUST SCORE</div>
                    <div className="text-sm font-orbitron font-black text-cyber-cyan">
                      {tournament.organizer.trustScore}/100
                    </div>
                  </div>
                </div>

                {/* Slots Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-orbitron">
                    <span className="text-hud-muted">SLOTS OCCUPIED:</span>
                    <span className="text-cyber-cyan font-bold font-rajdhani text-xs">
                      {tournament.registeredSlots} / {tournament.totalSlots} ({percentSlots}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-hud-bg rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-purple rounded-full"
                      style={{ width: `${percentSlots}%` }}
                    ></div>
                  </div>
                </div>

                {/* Card Action Row */}
                <div className="pt-3 border-t border-hud-border flex items-center justify-between gap-3 mt-auto">
                  <div className="text-xs font-rajdhani font-bold text-hud-muted">
                    Entry: <strong className="text-emerald-400">{tournament.entryFee}</strong>
                  </div>

                  <div className="flex items-center gap-2">
                    {isRegistered && (
                      <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg text-xs font-orbitron font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> REGISTERED
                      </span>
                    )}

                    <button
                      onClick={() => {
                        soundManager.playSuccessBeep();
                        setActiveModalTournament(tournament);
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-cyber-cyan to-cyber-blue text-black font-rajdhani font-bold text-xs rounded-xl hover:shadow-[0_0_15px_rgba(0,240,255,0.5)] transition-all flex items-center gap-1.5"
                    >
                      <span>VIEW BRACKETS & REGISTER</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tournament Detail & Brackets Modal */}
      {activeModalTournament && (
        <TournamentDetailModal
          tournament={activeModalTournament}
          currentUser={currentUser}
          isRegistered={registeredIds.includes(activeModalTournament.id)}
          onRegistered={handleRegisterSuccess}
          onClose={() => setActiveModalTournament(null)}
        />
      )}
    </div>
  );
};
