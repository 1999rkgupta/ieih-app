import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  Swords, 
  ChevronRight, 
  RotateCcw
} from 'lucide-react';
import { PlayerPassport, RoleType } from '../../types';
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
    let score = 75;

    const perf = player.gamePerformances[player.primaryGame];

    if (selectedGame !== 'ALL' && player.primaryGame === selectedGame) score += 12;
    if (selectedRole !== 'ALL' && player.primaryRole === selectedRole) score += 10;
    if (selectedTier !== 'ALL' && player.tier === selectedTier) score += 8;
    if (selectedState !== 'ALL' && player.state === selectedState) score += 5;
    if (player.isVerified) score += 6;
    if (perf && perf.kdRatio >= minKd) score += 5;

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

  const player1ToCompare = players.find(p => p.id === compareIds[0]);
  const player2ToCompare = players.find(p => p.id === compareIds[1]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#91baaf]/25 dark:bg-[#91baaf]/15 text-[#133c32] dark:text-[#91baaf] rounded-full text-xs font-semibold border border-[#91baaf]/30 dark:border-[#91baaf]/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Scout Engine & Talent Radar</span>
          </div>
          <h2 className="font-extrabold text-2xl sm:text-4xl text-[#0d2620] dark:text-white tracking-tight">
            Discover & Recruit Esports Athletes
          </h2>
          <p className="text-sm text-[#284f45] dark:text-[#a0c7bd] font-normal">
            Filter through verified E-Player Passports across BGMI, Valorant, CS2, and Free Fire with synergistic match ratings and verified performance stats.
          </p>
        </div>
      </div>

      {/* Filter Control Console */}
      <div className="p-5 rounded-3xl bg-white/90 dark:bg-[#121d1a]/90 border border-[#91baaf]/40 dark:border-[#91baaf]/25 shadow-sm space-y-4">
        {/* Search Bar & Reset */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#466b62] dark:text-[#6a998d]" />
            <input
              type="text"
              placeholder="Search by Gamertag, Real Name, City, State..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#15231f] border border-[#91baaf]/40 dark:border-[#91baaf]/30 rounded-full text-xs text-[#0d2620] dark:text-white placeholder:text-[#466b62] dark:placeholder:text-[#6a998d] focus:outline-none focus:border-[#91baaf] transition-all"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                soundManager.playClickSound();
                setVerifiedOnly(!verifiedOnly);
              }}
              className={`px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                verifiedOnly
                  ? 'bg-[#91baaf]/25 text-[#133c32] dark:text-[#91baaf] border-[#91baaf]/50 shadow-sm'
                  : 'bg-white/90 dark:bg-white/5 text-[#385e54] dark:text-[#a0c7bd] border-[#91baaf]/30 dark:border-[#91baaf]/20 hover:text-[#0d2620] dark:hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-[#286b5c] dark:text-[#91baaf]" />
              <span>Verified Only</span>
            </button>

            <button
              onClick={handleResetFilters}
              className="p-2.5 bg-white/90 dark:bg-white/5 hover:bg-[#dceee7]/60 dark:hover:bg-white/10 border border-[#91baaf]/30 dark:border-[#91baaf]/20 rounded-full text-[#385e54] dark:text-[#a0c7bd] hover:text-[#0d2620] dark:hover:text-white transition-colors cursor-pointer"
              title="Reset Filters"
              aria-label="Reset Filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dropdown Filters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {/* Game */}
          <div>
            <label className="text-[11px] font-semibold text-[#385e54] dark:text-[#88b5a9] uppercase tracking-wider block mb-1">Discipline</label>
            <select
              value={selectedGame}
              onChange={e => {
                soundManager.playGlitchChirp();
                setSelectedGame(e.target.value);
              }}
              className="w-full px-3 py-2 bg-white dark:bg-[#15231f] border border-[#91baaf]/40 dark:border-[#91baaf]/30 rounded-xl text-xs font-semibold text-[#0d2620] dark:text-white focus:outline-none focus:border-[#91baaf]"
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
            <label className="text-[11px] font-semibold text-[#385e54] dark:text-[#88b5a9] uppercase tracking-wider block mb-1">Role</label>
            <select
              value={selectedRole}
              onChange={e => {
                soundManager.playGlitchChirp();
                setSelectedRole(e.target.value);
              }}
              className="w-full px-3 py-2 bg-white dark:bg-[#15231f] border border-[#91baaf]/40 dark:border-[#91baaf]/30 rounded-xl text-xs font-semibold text-[#0d2620] dark:text-white focus:outline-none focus:border-[#91baaf]"
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
            <label className="text-[11px] font-semibold text-[#385e54] dark:text-[#88b5a9] uppercase tracking-wider block mb-1">Skill Tier</label>
            <select
              value={selectedTier}
              onChange={e => {
                soundManager.playGlitchChirp();
                setSelectedTier(e.target.value);
              }}
              className="w-full px-3 py-2 bg-white dark:bg-[#15231f] border border-[#91baaf]/40 dark:border-[#91baaf]/30 rounded-xl text-xs font-semibold text-[#0d2620] dark:text-white focus:outline-none focus:border-[#91baaf]"
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
            <label className="text-[11px] font-semibold text-[#385e54] dark:text-[#88b5a9] uppercase tracking-wider block mb-1">Region</label>
            <select
              value={selectedState}
              onChange={e => {
                soundManager.playGlitchChirp();
                setSelectedState(e.target.value);
              }}
              className="w-full px-3 py-2 bg-white dark:bg-[#15231f] border border-[#91baaf]/40 dark:border-[#91baaf]/30 rounded-xl text-xs font-semibold text-[#0d2620] dark:text-white focus:outline-none focus:border-[#91baaf]"
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
            <label className="text-[11px] font-semibold text-[#385e54] dark:text-[#88b5a9] uppercase tracking-wider block mb-1">Status</label>
            <select
              value={selectedAvailability}
              onChange={e => {
                soundManager.playGlitchChirp();
                setSelectedAvailability(e.target.value);
              }}
              className="w-full px-3 py-2 bg-white dark:bg-[#15231f] border border-[#91baaf]/40 dark:border-[#91baaf]/30 rounded-xl text-xs font-semibold text-[#0d2620] dark:text-white focus:outline-none focus:border-[#91baaf]"
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
        <div className="pt-3 border-t border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-slate-500 dark:text-slate-400 font-semibold uppercase text-[11px]">Minimum K/D:</span>
            <input
              type="range"
              min="0.5"
              max="3.0"
              step="0.1"
              value={minKd}
              onChange={e => setMinKd(parseFloat(e.target.value))}
              className="w-36 accent-sky-500 cursor-pointer"
            />
            <span className="text-sky-600 dark:text-sky-400 font-bold font-mono">{minKd.toFixed(1)}+</span>
          </div>

          <div className="text-slate-500 dark:text-slate-400 font-medium text-xs">
            Showing <strong className="text-slate-900 dark:text-white font-bold">{filteredPlayers.length}</strong> athletes
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPlayers.map(player => {
          const matchScore = calculateMatchScore(player);
          const perf = player.gamePerformances[player.primaryGame];
          const isComparing = compareIds.includes(player.id);

          return (
            <div
              key={player.id}
              className="group relative rounded-3xl bg-white/90 dark:bg-[#121d1a]/90 border border-[#91baaf]/40 dark:border-[#91baaf]/25 hover:border-[#71a396] dark:hover:border-[#91baaf] shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden p-5 space-y-4"
            >
              {/* Header Row: Info and Synergy Score */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-[#0d2620] dark:text-white group-hover:text-[#236052] dark:group-hover:text-[#91baaf] transition-colors">
                      {player.gamerTag}
                    </h3>
                    <span className="px-1.5 py-0.5 bg-[#18483d] text-white dark:bg-[#91baaf] dark:text-[#090e0c] font-mono text-[10px] font-bold rounded-md">
                      L{player.level}
                    </span>
                    {player.isVerified && (
                      <ShieldCheck className="w-4 h-4 text-[#286b5c] dark:text-[#91baaf] shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {player.realName} • {player.city}, {player.state}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-semibold px-2 py-0.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full">
                      {player.tier}
                    </span>
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      {player.availability}
                    </span>
                  </div>
                </div>

                {/* Match Score Badge */}
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-full text-xs font-bold font-mono">
                    <Zap className="w-3 h-3 fill-current" />
                    {matchScore}%
                  </span>
                </div>
              </div>

              {/* Stat Matrix Bar */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-[#dceee7]/70 dark:bg-[#162521] border border-[#91baaf]/30 dark:border-[#91baaf]/20">
                  <div className="text-[10px] font-semibold text-[#385e54] dark:text-[#88b5a9] uppercase tracking-wider">Discipline</div>
                  <div className="font-semibold text-[#0d2620] dark:text-white truncate mt-0.5">{player.primaryGame}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#dceee7]/70 dark:bg-[#162521] border border-[#91baaf]/30 dark:border-[#91baaf]/20">
                  <div className="text-[10px] font-semibold text-[#385e54] dark:text-[#88b5a9] uppercase tracking-wider">Role</div>
                  <div className="font-semibold text-[#18483d] dark:text-[#afd2c6] truncate mt-0.5">{player.primaryRole}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#dceee7]/70 dark:bg-[#162521] border border-[#91baaf]/30 dark:border-[#91baaf]/20">
                  <div className="text-[10px] font-semibold text-[#385e54] dark:text-[#88b5a9] uppercase tracking-wider">K/D</div>
                  <div className="font-semibold text-amber-600 dark:text-amber-400 mt-0.5">{perf?.kdRatio.toFixed(2)}</div>
                </div>
              </div>

              {/* Bio snippet */}
              {player.bio && (
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {player.bio}
                </p>
              )}

              {/* Actions Row */}
              <div className="pt-3 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-2 mt-auto">
                {/* Compare Checkbox */}
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 cursor-pointer hover:text-slate-900 dark:hover:text-white select-none">
                  <input
                    type="checkbox"
                    checked={isComparing}
                    onChange={() => toggleCompare(player.id)}
                    className="accent-sky-500 rounded"
                  />
                  <span>Compare</span>
                </label>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      soundManager.playClickSound();
                      setScoutingPlayer(player);
                    }}
                    className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-800 dark:text-slate-200 rounded-full transition-all"
                  >
                    Scout
                  </button>
                  <button
                    onClick={() => {
                      soundManager.playSuccessBeep();
                      onSelectPlayer(player);
                    }}
                    className="px-4 py-1.5 bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 text-xs font-semibold rounded-full transition-all flex items-center gap-1 shadow-sm"
                  >
                    <span>View</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Comparison Drawer when athletes selected */}
      {compareIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl px-4 animate-fadeIn">
          <div className="bg-white/95 dark:bg-[#101c18]/95 backdrop-blur-2xl rounded-full p-2.5 pl-4 flex items-center justify-between gap-3 shadow-2xl border border-[#91baaf]/40 dark:border-[#91baaf]/25">
            <div className="flex items-center gap-2 overflow-hidden">
              <Swords className="w-4 h-4 text-sky-500 shrink-0" />
              <span className="text-xs font-semibold text-slate-900 dark:text-white">
                Comparing ({compareIds.length}/2):
              </span>
              <div className="flex items-center gap-1 text-xs text-sky-600 dark:text-sky-400 font-medium truncate">
                {player1ToCompare && <span className="font-semibold">{player1ToCompare.gamerTag}</span>}
                {player2ToCompare && <span>vs <strong className="font-semibold">{player2ToCompare.gamerTag}</strong></span>}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setCompareIds([])}
                className="px-3 py-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium"
              >
                Clear
              </button>
              <button
                disabled={compareIds.length < 2}
                onClick={() => {
                  soundManager.playSuccessBeep();
                  setIsComparingOpen(true);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  compareIds.length === 2
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm hover:opacity-90'
                    : 'bg-slate-100 dark:bg-white/10 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                }`}
              >
                Launch Duel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {scoutingPlayer && (
        <RecruitModal
          player={scoutingPlayer}
          onClose={() => setScoutingPlayer(null)}
        />
      )}

      {isComparingOpen && player1ToCompare && player2ToCompare && (
        <PlayerCompareModal
          player1={player1ToCompare}
          player2={player2ToCompare}
          onClose={() => setIsComparingOpen(false)}
        />
      )}
    </div>
  );
};
