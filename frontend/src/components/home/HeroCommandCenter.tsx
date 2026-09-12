import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Trophy, 
  Search, 
  Zap, 
  Crosshair, 
  ChevronRight, 
  Bot
} from 'lucide-react';
import { PlayerPassport, Tournament } from '../../types';
import { soundManager } from '../../utils/audio';

interface HeroCommandCenterProps {
  onNavigate: (tab: string) => void;
  featuredPlayers: PlayerPassport[];
  featuredTournament?: Tournament;
  onSelectPlayer: (player: PlayerPassport) => void;
}

export const HeroCommandCenter: React.FC<HeroCommandCenterProps> = ({
  onNavigate,
  featuredPlayers,
  featuredTournament,
  onSelectPlayer
}) => {
  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Sleek Minimal Glass Hero Section */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#c8e9df]/95 via-[#def4ed]/95 to-[#bce5d9]/95 dark:from-[#101c18]/95 dark:via-[#152520]/95 dark:to-[#0d1815]/95 backdrop-blur-2xl border-2 border-[#91baaf]/50 dark:border-[#91baaf]/30 p-6 sm:p-12 overflow-hidden shadow-xl shadow-[#91baaf]/15 dark:shadow-black/50">
        {/* Subtle Ambient Radial Glows */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#91baaf]/30 dark:bg-[#91baaf]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#71a396]/30 dark:bg-[#58867b]/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-5xl space-y-6">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#91baaf]/25 dark:bg-[#91baaf]/15 text-[#133c32] dark:text-[#afd2c6] rounded-full text-xs font-semibold border border-[#91baaf]/50 dark:border-[#91baaf]/30 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#3d7063] dark:bg-[#91baaf] animate-ping"></span>
            <span>INDIA ESPORTS INNOVATION HUB • DIGITAL ARENA</span>
          </div>

          {/* Main Display Heading */}
          <h1 className="font-extrabold text-[20px] min-[460px]:text-[26px] sm:text-[32px] md:text-[40px] text-[#0d2620] dark:text-white tracking-tight leading-snug break-words sm:whitespace-nowrap">
            Discover{' '}
            <span className="inline-block w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-black dark:bg-[#91baaf] align-middle -translate-y-0.5 mx-1 sm:mx-2"></span>{' '}
            Develop{' '}
            <span className="inline-block w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-black dark:bg-[#91baaf] align-middle -translate-y-0.5 mx-1 sm:mx-2"></span>{' '}
            Verify{' '}
            <span className="inline-block w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-black dark:bg-[#91baaf] align-middle -translate-y-0.5 mx-1 sm:mx-2"></span>{' '}
            Connect
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-base text-[#1b4339] dark:text-[#afd2c6]/85 max-w-2xl leading-relaxed font-normal">
            The professional gaming identity and tournament network for Indian esports athletes. Mint your cryptographic profile, get scouted by Tier-1 franchises, and compete in verified arenas.
          </p>
        </div>

        {/* Live Ecosystem Telemetry Counter */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10 pt-8 border-t border-[#91baaf]/40 dark:border-[#91baaf]/20 relative z-10">
          <div className="p-4 rounded-2xl bg-white/90 dark:bg-[#121d1a]/90 border border-[#91baaf]/40 dark:border-[#91baaf]/25 shadow-sm">
            <div className="text-[11px] font-semibold text-[#30594f] dark:text-[#88b5a9] uppercase tracking-wider">Verified Athletes</div>
            <div className="text-xl sm:text-2xl font-bold text-[#0d2620] dark:text-white mt-1">18,450+</div>
            <div className="text-xs text-emerald-700 dark:text-emerald-400 font-medium mt-0.5">↑ 420 this week</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/90 dark:bg-[#121d1a]/90 border border-[#91baaf]/40 dark:border-[#91baaf]/25 shadow-sm">
            <div className="text-[11px] font-semibold text-[#30594f] dark:text-[#88b5a9] uppercase tracking-wider">Prizing Disbursed</div>
            <div className="text-xl sm:text-2xl font-bold text-amber-700 dark:text-amber-400 mt-1">₹14.8 Cr+</div>
            <div className="text-xs text-[#30594f] dark:text-[#88b5a9] font-medium mt-0.5">99.4% On-Time Payouts</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/90 dark:bg-[#121d1a]/90 border border-[#91baaf]/40 dark:border-[#91baaf]/25 shadow-sm">
            <div className="text-[11px] font-semibold text-[#30594f] dark:text-[#88b5a9] uppercase tracking-wider">Verified Teams</div>
            <div className="text-xl sm:text-2xl font-bold text-[#1e4d41] dark:text-[#91baaf] mt-1">450+ Orgs</div>
            <div className="text-xs text-[#30594f] dark:text-[#88b5a9] font-medium mt-0.5">Active Recruiters</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/90 dark:bg-[#121d1a]/90 border border-[#91baaf]/40 dark:border-[#91baaf]/25 shadow-sm">
            <div className="text-[11px] font-semibold text-[#30594f] dark:text-[#88b5a9] uppercase tracking-wider">Collegiate Clubs</div>
            <div className="text-xl sm:text-2xl font-bold text-[#1e6152] dark:text-[#71a396] mt-1">140+ Campuses</div>
            <div className="text-xs text-[#30594f] dark:text-[#88b5a9] font-medium mt-0.5">IITs, NITs, BITS, VIT</div>
          </div>
        </div>
      </div>

      {/* Flagship Feature Portals */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg sm:text-xl text-[#0d2620] dark:text-white flex items-center gap-2">
            <Crosshair className="w-5 h-5 text-[#3d7567] dark:text-[#91baaf]" />
            Core Platform Modules
          </h2>
          <span className="text-xs font-semibold text-[#30594f] dark:text-[#88b5a9]">System Active & Verified</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Passport */}
          <div
            onClick={() => {
              soundManager.playClickSound();
              onNavigate('passport');
            }}
            className="p-5 rounded-2xl bg-white/90 dark:bg-[#121d1a]/90 border border-[#91baaf]/40 dark:border-[#91baaf]/25 hover:border-[#71a396] dark:hover:border-[#91baaf] hover:shadow-lg hover:shadow-[#91baaf]/20 dark:hover:shadow-[#91baaf]/10 shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#91baaf]/25 dark:bg-[#91baaf]/15 text-[#133c32] dark:text-[#91baaf] flex items-center justify-center group-hover:scale-105 transition-transform border border-[#91baaf]/30 dark:border-[#91baaf]/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#0d2620] dark:text-white group-hover:text-[#236052] dark:group-hover:text-[#91baaf] transition-colors">
                E-Player Passport
              </h3>
              <p className="text-xs text-[#284f45] dark:text-[#a0c7bd] leading-relaxed">
                Cryptographic gamer identity with deep combat stats, radar skill matrices, unlocked trophies, and verified hardware gear.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-semibold text-[#286b5c] dark:text-[#91baaf]">
              <span>Explore Passports</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Card 2: Talent Discovery */}
          <div
            onClick={() => {
              soundManager.playClickSound();
              onNavigate('discovery');
            }}
            className="p-5 rounded-2xl bg-white/90 dark:bg-[#121d1a]/90 border border-[#91baaf]/40 dark:border-[#91baaf]/25 hover:border-[#71a396] dark:hover:border-[#91baaf] hover:shadow-lg hover:shadow-[#91baaf]/20 dark:hover:shadow-[#91baaf]/10 shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#91baaf]/25 dark:bg-[#91baaf]/15 text-[#133c32] dark:text-[#91baaf] flex items-center justify-center group-hover:scale-105 transition-transform border border-[#91baaf]/30 dark:border-[#91baaf]/20">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#0d2620] dark:text-white group-hover:text-[#236052] dark:group-hover:text-[#91baaf] transition-colors">
                Talent Radar
              </h3>
              <p className="text-xs text-[#284f45] dark:text-[#a0c7bd] leading-relaxed">
                Multi-dimensional filterable scout engine with match-meters (e.g. 96% Synergy) and side-by-side player comparisons.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-semibold text-[#286b5c] dark:text-[#91baaf]">
              <span>Launch Radar</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Card 3: Tournament Hub */}
          <div
            onClick={() => {
              soundManager.playClickSound();
              onNavigate('tournaments');
            }}
            className="p-5 rounded-2xl bg-white/90 dark:bg-[#121d1a]/90 border border-[#91baaf]/40 dark:border-[#91baaf]/25 hover:border-[#71a396] dark:hover:border-[#91baaf] hover:shadow-lg hover:shadow-[#91baaf]/20 dark:hover:shadow-[#91baaf]/10 shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-700 dark:text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform border border-amber-500/20 dark:border-amber-500/30">
                <Trophy className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#0d2620] dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                Tournament Hub
              </h3>
              <p className="text-xs text-[#284f45] dark:text-[#a0c7bd] leading-relaxed">
                National LAN & online cups with organizer trust audits (e.g. 98/100), visual playoff bracket trees, and 1-click squad registration.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-semibold text-amber-700 dark:text-amber-400">
              <span>View Arenas</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Card 4: EE AI Companion */}
          <div
            onClick={() => {
              soundManager.playClickSound();
              onNavigate('ai');
            }}
            className="p-5 rounded-2xl bg-white/90 dark:bg-[#121d1a]/90 border border-[#91baaf]/40 dark:border-[#91baaf]/25 hover:border-[#71a396] dark:hover:border-[#91baaf] hover:shadow-lg hover:shadow-[#91baaf]/20 dark:hover:shadow-[#91baaf]/10 shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#91baaf]/25 dark:bg-[#91baaf]/15 text-[#133c32] dark:text-[#91baaf] flex items-center justify-center group-hover:scale-105 transition-transform border border-[#91baaf]/30 dark:border-[#91baaf]/20">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#0d2620] dark:text-white group-hover:text-[#236052] dark:group-hover:text-[#91baaf] transition-colors">
                EE AI Tactical Coach
              </h3>
              <p className="text-xs text-[#284f45] dark:text-[#a0c7bd] leading-relaxed">
                In-game tactical AI assistant for scrim rotation optimization, agent lineups, squad chemistry, and career roadmaps.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-semibold text-[#286b5c] dark:text-[#91baaf]">
              <span>Consult AI</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Spotlight Athletes Showcase */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-lg sm:text-xl text-[#0d2620] dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              Featured Esports Athletes
            </h2>
            <p className="text-xs text-[#30594f] dark:text-[#88b5a9]">Top ranked verified passports with national tournament credentials</p>
          </div>
          <button
            onClick={() => {
              soundManager.playClickSound();
              onNavigate('discovery');
            }}
            className="text-xs font-semibold text-[#236052] dark:text-[#91baaf] hover:text-[#133c32] dark:hover:text-white flex items-center gap-1"
          >
            <span>View All Athletes</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredPlayers.slice(0, 3).map(player => {
            const perf = player.gamePerformances[player.primaryGame];
            return (
              <div
                key={player.id}
                onClick={() => {
                  soundManager.playSuccessBeep();
                  onSelectPlayer(player);
                }}
                className="p-5 rounded-2xl bg-white/90 dark:bg-[#121d1a]/90 border border-[#91baaf]/40 dark:border-[#91baaf]/25 hover:border-[#71a396] dark:hover:border-[#91baaf] shadow-sm hover:shadow-lg hover:shadow-[#91baaf]/20 dark:hover:shadow-[#91baaf]/10 cursor-pointer transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-base text-[#0d2620] dark:text-white group-hover:text-[#236052] dark:group-hover:text-[#91baaf] transition-colors">
                          {player.gamerTag}
                        </h4>
                        <ShieldCheck className="w-4 h-4 text-[#3d7567] dark:text-[#91baaf]" />
                      </div>
                      <p className="text-xs text-[#30594f] dark:text-[#88b5a9] mt-0.5">{player.realName} • {player.state}</p>
                      <span className="text-[10px] font-semibold px-2 py-0.5 bg-[#91baaf]/25 dark:bg-[#91baaf]/15 text-[#133c32] dark:text-[#afd2c6] rounded-full mt-1.5 inline-block border border-[#91baaf]/30 dark:border-[#91baaf]/20">
                        {player.tier}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold px-2 py-1 bg-[#dff1ec] dark:bg-[#172722] text-[#0d2620] dark:text-white rounded-lg border border-[#91baaf]/40 dark:border-[#91baaf]/30">
                      L{player.level}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                    <div className="p-2 bg-[#f0f8f5] dark:bg-[#0e1715] rounded-xl border border-[#91baaf]/30 dark:border-[#91baaf]/20">
                      <div className="text-[10px] font-medium text-[#30594f] dark:text-[#88b5a9] uppercase">Game</div>
                      <div className="font-semibold text-[#0d2620] dark:text-white truncate mt-0.5">{player.primaryGame}</div>
                    </div>
                    <div className="p-2 bg-[#f0f8f5] dark:bg-[#0e1715] rounded-xl border border-[#91baaf]/30 dark:border-[#91baaf]/20">
                      <div className="text-[10px] font-medium text-[#30594f] dark:text-[#88b5a9] uppercase">Role</div>
                      <div className="font-semibold text-[#1e6152] dark:text-[#91baaf] truncate mt-0.5">{player.primaryRole}</div>
                    </div>
                    <div className="p-2 bg-[#f0f8f5] dark:bg-[#0e1715] rounded-xl border border-[#91baaf]/30 dark:border-[#91baaf]/20">
                      <div className="text-[10px] font-medium text-[#30594f] dark:text-[#88b5a9] uppercase">K/D</div>
                      <div className="font-semibold text-amber-700 dark:text-amber-400 mt-0.5">{perf?.kdRatio.toFixed(2)}</div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#91baaf]/30 dark:border-[#91baaf]/20 flex items-center justify-between text-xs font-semibold text-[#286b5c] dark:text-[#91baaf]">
                  <span>Open Digital Passport</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
