import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  Swords, 
  ChevronRight, 
  UserCheck, 
  RotateCcw,
  SlidersHorizontal,
  Flame,
  Award
} from 'lucide-react';
import { PlayerPassport, GameType, RoleType } from '../../types';
import { soundManager } from '../../utils/audio';
import { RecruitModal } from './RecruitModal';
import { PlayerCompareModal } from './PlayerCompareModal';

interface TalentDiscoveryProps {
  players: PlayerPassport[];
  onSelectPlayer: (player: PlayerPassport) => void;
}

export const TalentDiscovery: React.FC<TalentDiscoveryProps> = ({
  players,
  onSelectPlayer
}) => {
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState<string>('ALL');
  const [selectedRole, setSelectedRole] = useState<string>('ALL');
  const [selectedTier, setSelectedTier] = useState<string>('ALL');
  const [selectedState, setSelectedState] = useState<string>('ALL');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('ALL');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [minKd, setMinKd] = useState<number>(1.0);

  // Comparison & Scouting states
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [scoutingPlayer, setScoutingPlayer] = useState<PlayerPassport | null>(null);
  const [isComparingOpen, setIsComparingOpen] = useState(false);

  // Match score calculator based on active scout filters
  const calculateMatchScore = (player: PlayerPassport): number => {
    let score = 75; // base baseline score

    const perf = player.gamePerformances[player.primaryGame];

    // Game match bonus
    if (selectedGame !== 'ALL' && player.primaryGame === selectedGame) score += 12;
    // Role match bonus
    if (selectedRole !== 'ALL' && player.primaryRole === selectedRole) score += 10;
    // Tier match
    if (selectedTier !== 'ALL' && player.tier === selectedTier) score += 8;
    // State match
    if (selectedState !== 'ALL' && player.state === selectedState) score += 5;
    // Verified boost
    if (player.isVerified) score += 6;
    // High K/D boost
    if (perf && perf.kdRatio >= 1.4) score += 5;
    // High reputation boost
    if (player.reputationScore >= 98) score += 4;

    return Math.min(99, Math.max(68, score));
  };

  // Filtered Players
  const filteredPlayers = useMemo(() => {
    return players.filter(player => {
      const perf = player.gamePerformances[player.primaryGame];

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = player.gamerTag.toLowerCase().includes(q) ||
          player.realName.toLowerCase().includes(q) ||
          player.city.toLowerCase().includes(q) ||
          player.state.toLowerCase().includes(q);
        if (!matchesName) return false;
      }

      if (selectedGame !== 'ALL' && player.primaryGame !== selectedGame) return false;
      if (selectedRole !== 'ALL' && player.primaryRole !== selectedRole && !player.secondaryRoles.includes(selectedRole as RoleType)) return false;
      if (selectedTier !== 'ALL' && player.tier !== selectedTier) return false;
      if (selectedState !== 'ALL' && player.state !== selectedState) return false;
      if (selectedAvailability !== 'ALL' && player.availability !== selectedAvailability) return false;
      if (verifiedOnly && !player.isVerified) return false;
      if (perf && perf.kdRatio < minKd) return false;

      return true;
    }).sort((a, b) => calculateMatchScore(b) - calculateMatchScore(a));
  }, [players, searchQuery, selectedGame, selectedRole, selectedTier, selectedState, selectedAvailability, verifiedOnly, minKd]);

  const toggleCompare = (playerId: string) => {
    soundManager.playClickSound();
    if (compareIds.includes(playerId)) {
      setCompareIds(compareIds.filter(id => id !== playerId));
    } else {
      if (compareIds.length >= 2) {
        // replace second
        setCompareIds([compareIds[0], playerId]);
      } else {
        setCompareIds([...compareIds, playerId]);
      }
    }
  };

  const handleResetFilters = () => {
    soundManager.playClickSound();
    setSearchQuery('');
    setSelectedGame('ALL');
    setSelectedRole('ALL');
    setSelectedTier('ALL');
    setSelectedState('ALL');
    setSelectedAvailability('ALL');
    setVerifiedOnly(false);
    setMinKd(1.0);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative p-6 sm:p-8 rounded-2xl bg-hud-surface border border-hud-border overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyber-cyan/10 border border-cyber-cyan/30 rounded-full text-xs font-orbitron font-bold text-cyber-cyan">
            <Sparkles className="w-3.5 h-3.5" />
            IEIH SCOUT ALGORITHM • TALENT RADAR
          </div>
          <h2 className="font-orbitron font-black text-2xl sm:text-4xl text-hud-text tracking-wide glow-text-cyan">
            DISCOVER & RECRUIT INDIAN ESPORTS PRODIGIES
          </h2>
          <p className="text-sm font-sans text-hud-muted">
            Filter through thousands of verified E-Player Passports across BGMI, Valorant, CS2, and Free Fire. Direct scout contact, synergistic HUD match ratings, and verified tournament histories.
          </p>
        </div>
      </div>

      {/* Filter Control Console */}
      <div className="p-5 rounded-2xl bg-hud-card border border-hud-border space-y-4">
        {/* Search Bar & Reset */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-hud-muted" />
            <input
              type="text"
              placeholder="Search by Gamertag, Real Name, City, State..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-hud-bg border border-hud-border rounded-xl text-xs font-sans text-hud-text focus:outline-none focus:border-cyber-cyan"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                soundManager.playClickSound();
                setVerifiedOnly(!verifiedOnly);
              }}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-rajdhani font-bold flex items-center gap-2 border transition-all ${
                verifiedOnly
                  ? 'bg-cyber-cyan/20 text-cyber-cyan border-cyber-cyan shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                  : 'bg-hud-bg text-hud-muted border-hud-border hover:text-hud-text'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-cyber-cyan" />
              VERIFIED ATHLETES ONLY
            </button>

            <button
              onClick={handleResetFilters}
              className="p-2.5 bg-hud-bg hover:bg-hud-panel border border-hud-border rounded-xl text-hud-muted hover:text-hud-text transition-colors"
              title="Reset Filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dropdown Filters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {/* Game */}
          <div>
            <label className="text-[10px] font-orbitron text-hud-muted block mb-1">GAME</label>
            <select
              value={selectedGame}
              onChange={e => {
                soundManager.playGlitchChirp();
                setSelectedGame(e.target.value);
              }}
              className="w-full px-2.5 py-1.5 bg-hud-bg border border-hud-border rounded-lg text-xs font-rajdhani font-bold text-hud-text focus:outline-none focus:border-cyber-cyan"
            >
              <option value="ALL">All Disciplines</option>
              <option value="VALORANT">VALORANT</option>
              <option value="BGMI">BGMI</option>
              <option value="CS2">CS2</option>
              <option value="FREE_FIRE">FREE FIRE</option>
              <option value="POKEMON_UNITE">POKEMON UNITE</option>
              <option value="EA_FC24">EA FC 24</option>
            </select>
          </div>

          {/* Role */}
          <div>
            <label className="text-[10px] font-orbitron text-hud-muted block mb-1">TACTICAL ROLE</label>
            <select
              value={selectedRole}
              onChange={e => {
                soundManager.playGlitchChirp();
                setSelectedRole(e.target.value);
              }}
              className="w-full px-2.5 py-1.5 bg-hud-bg border border-hud-border rounded-lg text-xs font-rajdhani font-bold text-hud-text focus:outline-none focus:border-cyber-cyan"
            >
              <option value="ALL">All Roles</option>
              <option value="Duelist">Duelist / Entry</option>
              <option value="IGL">IGL / Strategist</option>
              <option value="Assaulter">Assaulter</option>
              <option value="Sniper">Sniper / Op</option>
              <option value="Initiator">Initiator</option>
              <option value="Controller">Controller</option>
              <option value="Sentinel">Sentinel / Anchor</option>
              <option value="Support">Support</option>
            </select>
          </div>

          {/* Tier */}
          <div>
            <label className="text-[10px] font-orbitron text-hud-muted block mb-1">SKILL TIER</label>
            <select
              value={selectedTier}
              onChange={e => {
                soundManager.playGlitchChirp();
                setSelectedTier(e.target.value);
              }}
              className="w-full px-2.5 py-1.5 bg-hud-bg border border-hud-border rounded-lg text-xs font-rajdhani font-bold text-hud-text focus:outline-none focus:border-cyber-cyan"
            >
              <option value="ALL">All Tiers</option>
              <option value="Legend">Legend (Global)</option>
              <option value="National Pro">National Pro</option>
              <option value="Elite">Elite</option>
              <option value="Contender">Contender</option>
              <option value="Rookie">Rookie</option>
            </select>
          </div>

          {/* State */}
          <div>
            <label className="text-[10px] font-orbitron text-hud-muted block mb-1">STATE / REGION</label>
            <select
              value={selectedState}
              onChange={e => {
                soundManager.playGlitchChirp();
                setSelectedState(e.target.value);
              }}
              className="w-full px-2.5 py-1.5 bg-hud-bg border border-hud-border rounded-lg text-xs font-rajdhani font-bold text-hud-text focus:outline-none focus:border-cyber-cyan"
            >
              <option value="ALL">All India</option>
              <option value="Maharashtra">Maharashtra (Mumbai/Pune)</option>
              <option value="Delhi NCR">Delhi NCR</option>
              <option value="Karnataka">Karnataka (Bengaluru)</option>
              <option value="Tamil Nadu">Tamil Nadu (Chennai)</option>
              <option value="West Bengal">West Bengal (Kolkata)</option>
              <option value="Punjab">Punjab</option>
              <option value="Telangana">Telangana (Hyderabad)</option>
            </select>
          </div>

          {/* Availability */}
          <div>
            <label className="text-[10px] font-orbitron text-hud-muted block mb-1">STATUS</label>
            <select
              value={selectedAvailability}
              onChange={e => {
                soundManager.playGlitchChirp();
                setSelectedAvailability(e.target.value);
              }}
              className="w-full px-2.5 py-1.5 bg-hud-bg border border-hud-border rounded-lg text-xs font-rajdhani font-bold text-hud-text focus:outline-none focus:border-cyber-cyan"
            >
              <option value="ALL">Any Status</option>
              <option value="LFG Pro Team">LFG Pro Team</option>
              <option value="LFG Scrims">LFG Scrims</option>
              <option value="Signed / Roster Active">Signed Roster</option>
              <option value="Collegiate Team">Collegiate Team</option>
              <option value="Free Agent">Free Agent</option>
            </select>
          </div>
        </div>

        {/* Min K/D Slider Bar */}
        <div className="pt-2 border-t border-hud-border/60 flex items-center justify-between text-xs font-rajdhani font-bold">
          <div className="flex items-center gap-3">
            <span className="text-hud-muted font-orbitron text-[10px]">MINIMUM K/D FILTER:</span>
            <input
              type="range"
              min="0.5"
              max="3.0"
              step="0.1"
              value={minKd}
              onChange={e => setMinKd(parseFloat(e.target.value))}
              className="w-36 accent-cyber-cyan bg-hud-bg"
            />
            <span className="text-cyber-cyan font-bold font-mono">{minKd.toFixed(1)}+</span>
          </div>

          <div className="text-hud-muted font-orbitron text-[11px]">
            SHOWING <strong className="text-cyber-cyan">{filteredPlayers.length}</strong> ATHLETES FOUND
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPlayers.map(player => {
          const matchScore = calculateMatchScore(player);
          const perf = player.gamePerformances[player.primaryGame];
          const isComparing = compareIds.includes(player.id);

          // HUD Segmented Meter Ticks (10 segments)
          const filledTicks = Math.round((matchScore / 100) * 10);

          return (
            <div
              key={player.id}
              className="group relative rounded-2xl bg-hud-surface border border-hud-border hover:border-cyber-cyan/70 transition-all duration-300 flex flex-col overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-cyber-cyan/10"
            >
              {/* Card Top Banner Accent */}
              <div className="h-1 bg-gradient-to-r from-cyber-cyan via-cyber-purple to-transparent"></div>

              <div className="p-5 flex-1 flex flex-col space-y-4">
                {/* Header Row: Avatar, Info, and HUD Match-Meter */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <img
                        src={player.avatarUrl}
                        alt={player.gamerTag}
                        className="w-14 h-14 rounded-xl object-cover border border-cyber-cyan/50 group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute -bottom-1 -right-1 px-1 bg-cyber-purple text-white font-orbitron text-[9px] font-bold rounded">
                        L{player.level}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-orbitron font-extrabold text-base text-hud-text group-hover:text-cyber-cyan transition-colors">
                          {player.gamerTag}
                        </h3>
                        {player.isVerified && (
                          <ShieldCheck className="w-4 h-4 text-cyber-cyan shrink-0" />
                        )}
                      </div>
                      <p className="text-xs font-rajdhani text-hud-muted">
                        {player.realName} • {player.city}, {player.state}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-orbitron px-1.5 py-0.5 bg-hud-card border border-hud-border text-cyber-purple rounded font-bold">
                          {player.tier}
                        </span>
                        <span className="text-xs font-rajdhani font-bold text-emerald-400">
                          {player.availability}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* HUD Segmented Match Score Meter */}
                <div className="p-3 rounded-xl bg-hud-card/80 border border-hud-border/90 space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-orbitron">
                    <span className="text-hud-muted text-[10px] flex items-center gap-1">
                      <Zap className="w-3 h-3 text-cyber-cyan" />
                      SYNERGY MATCH
                    </span>
                    <span className="text-cyber-cyan font-black font-rajdhani text-sm">
                      {matchScore}% MATCH
                    </span>
                  </div>

                  {/* 10 Segmented glowing ticks */}
                  <div className="grid grid-cols-10 gap-1 h-2">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-full rounded-sm transition-all ${
                          i < filledTicks
                            ? matchScore > 90
                              ? 'bg-cyber-cyan shadow-[0_0_6px_#00F0FF]'
                              : 'bg-cyber-purple shadow-[0_0_6px_#8B5CF6]'
                            : 'bg-hud-bg'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Stat Matrix Bar */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-rajdhani">
                  <div className="p-2 rounded-lg bg-hud-bg border border-hud-border/70">
                    <div className="text-[9px] font-orbitron text-hud-muted">DISCIPLINE</div>
                    <div className="font-bold text-hud-text truncate mt-0.5">{player.primaryGame}</div>
                  </div>
                  <div className="p-2 rounded-lg bg-hud-bg border border-hud-border/70">
                    <div className="text-[9px] font-orbitron text-hud-muted">ROLE</div>
                    <div className="font-bold text-cyber-cyan truncate mt-0.5">{player.primaryRole}</div>
                  </div>
                  <div className="p-2 rounded-lg bg-hud-bg border border-hud-border/70">
                    <div className="text-[9px] font-orbitron text-hud-muted">K/D RATIO</div>
                    <div className="font-bold text-cyber-gold mt-0.5">{perf?.kdRatio.toFixed(2)}</div>
                  </div>
                </div>

                {/* Bio snippet */}
                {player.bio && (
                  <p className="text-xs text-hud-muted line-clamp-2 font-sans pt-1">
                    {player.bio}
                  </p>
                )}

                {/* Actions Row */}
                <div className="pt-3 border-t border-hud-border flex items-center justify-between gap-2 mt-auto">
                  {/* Compare Checkbox */}
                  <label className="flex items-center gap-1.5 text-xs font-rajdhani font-bold text-hud-muted cursor-pointer hover:text-hud-text select-none">
                    <input
                      type="checkbox"
                      checked={isComparing}
                      onChange={() => toggleCompare(player.id)}
                      className="accent-cyber-cyan rounded"
                    />
                    <span>COMPARE</span>
                  </label>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        soundManager.playClickSound();
                        setScoutingPlayer(player);
                      }}
                      className="px-3 py-1.5 bg-hud-card hover:bg-cyber-cyan hover:text-black border border-hud-border hover:border-cyber-cyan text-xs font-rajdhani font-bold rounded-lg transition-all"
                    >
                      SCOUT
                    </button>
                    <button
                      onClick={() => {
                        soundManager.playSuccessBeep();
                        onSelectPlayer(player);
                      }}
                      className="px-3.5 py-1.5 bg-gradient-to-r from-cyber-cyan to-cyber-blue text-black text-xs font-rajdhani font-bold rounded-lg hover:shadow-[0_0_12px_rgba(0,240,255,0.4)] transition-all flex items-center gap-1"
                    >
                      <span>PASSPORT</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Floating Compare Bar */}
      {compareIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-hud-surface/95 border-2 border-cyber-cyan rounded-2xl p-4 shadow-2xl shadow-cyber-cyan/30 backdrop-blur-xl flex items-center gap-4 animate-bounce-short">
          <div className="flex items-center gap-2">
            <Swords className="w-5 h-5 text-cyber-cyan" />
            <span className="text-xs font-orbitron font-bold text-hud-text">
              {compareIds.length} ATHLETES SELECTED FOR DUEL COMPARISON
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={compareIds.length < 2}
              onClick={() => {
                soundManager.playSuccessBeep();
                setIsComparingOpen(true);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-orbitron font-bold transition-all ${
                compareIds.length === 2
                  ? 'bg-cyber-cyan text-black hover:shadow-[0_0_15px_#00F0FF]'
                  : 'bg-hud-card text-hud-dim border border-hud-border cursor-not-allowed'
              }`}
            >
              LAUNCH COMPARISON RADAR
            </button>
            <button
              onClick={() => setCompareIds([])}
              className="p-2 text-hud-muted hover:text-hud-text text-xs font-rajdhani font-bold"
            >
              CLEAR
            </button>
          </div>
        </div>
      )}

      {/* Scout Trial Modal */}
      {scoutingPlayer && (
        <RecruitModal
          player={scoutingPlayer}
          onClose={() => setScoutingPlayer(null)}
        />
      )}

      {/* Compare Modal */}
      {isComparingOpen && compareIds.length === 2 && (
        <PlayerCompareModal
          player1={players.find(p => p.id === compareIds[0])!}
          player2={players.find(p => p.id === compareIds[1])!}
          onClose={() => setIsComparingOpen(false)}
        />
      )}
    </div>
  );
};
