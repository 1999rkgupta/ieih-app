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
      <div className="relative rounded-3xl bg-white/80 dark:bg-[#101622]/80 backdrop-blur-2xl border border-slate-200 dark:border-white/10 p-6 sm:p-12 overflow-hidden shadow-lg">
        {/* Subtle Ambient Radial Glows */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-full text-xs font-semibold border border-sky-500/20">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping"></span>
            <span>INDIA ESPORTS INNOVATION HUB • DIGITAL ARENA</span>
          </div>

          {/* Main Display Heading */}
          <h1 className="font-extrabold text-3xl sm:text-5xl lg:text-6xl text-slate-900 dark:text-white tracking-tight leading-tight">
            Discover <span className="text-sky-500">•</span> Develop <span className="text-indigo-500">•</span> Verify <span className="text-amber-500">•</span> Connect
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed font-normal">
            The professional gaming identity and tournament network for Indian esports athletes. Mint your cryptographic <strong className="text-slate-900 dark:text-white font-semibold">E-Player Passport</strong>, get scouted by Tier-1 franchises, and compete in verified arenas.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                soundManager.playSuccessBeep();
                onNavigate('onboarding');
              }}
              className="px-6 py-3 bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 font-bold text-xs sm:text-sm rounded-full transition-all shadow-md flex items-center gap-2"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Mint Level 1 Passport</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClickSound();
                onNavigate('discovery');
              }}
              className="px-5 py-3 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 font-semibold text-xs sm:text-sm rounded-full transition-all flex items-center gap-2 shadow-sm"
            >
              <Search className="w-4 h-4 text-sky-500" />
              <span>Scout Talent Radar</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClickSound();
                onNavigate('tournaments');
              }}
              className="px-5 py-3 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 font-semibold text-xs sm:text-sm rounded-full transition-all flex items-center gap-2 shadow-sm"
            >
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Explore Tournaments</span>
            </button>
          </div>
        </div>

        {/* Live Ecosystem Telemetry Counter */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10 pt-8 border-t border-slate-200/80 dark:border-white/10 relative z-10">
          <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-[#151c2c]/90 border border-slate-200/80 dark:border-white/10 shadow-sm">
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Verified Athletes</div>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">18,450+</div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">↑ 420 this week</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-[#151c2c]/90 border border-slate-200/80 dark:border-white/10 shadow-sm">
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Prizing Disbursed</div>
            <div className="text-xl sm:text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">₹14.8 Cr+</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">99.4% On-Time Payouts</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-[#151c2c]/90 border border-slate-200/80 dark:border-white/10 shadow-sm">
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Verified Teams</div>
            <div className="text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">450+ Orgs</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Active Recruiters</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-[#151c2c]/90 border border-slate-200/80 dark:border-white/10 shadow-sm">
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Collegiate Clubs</div>
            <div className="text-xl sm:text-2xl font-bold text-sky-600 dark:text-sky-400 mt-1">140+ Campuses</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">IITs, NITs, BITS, VIT</div>
          </div>
        </div>
      </div>

      {/* Flagship Feature Portals */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg sm:text-xl text-slate-900 dark:text-white flex items-center gap-2">
            <Crosshair className="w-5 h-5 text-sky-500" />
            Core Platform Modules
          </h2>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">System Active & Verified</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Passport */}
          <div
            onClick={() => {
              soundManager.playClickSound();
              onNavigate('passport');
            }}
            className="p-5 rounded-2xl bg-white dark:bg-[#131926] border border-slate-200 dark:border-white/10 hover:border-sky-500/40 dark:hover:border-sky-500/40 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors">
                E-Player Passport
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Cryptographic gamer identity with deep combat stats, radar skill matrices, unlocked trophies, and verified hardware gear.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-semibold text-sky-500">
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
            className="p-5 rounded-2xl bg-white dark:bg-[#131926] border border-slate-200 dark:border-white/10 hover:border-indigo-500/40 dark:hover:border-indigo-500/40 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors">
                Talent Radar
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Multi-dimensional filterable scout engine with match-meters (e.g. 96% Synergy) and side-by-side player comparisons.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-semibold text-indigo-500">
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
            className="p-5 rounded-2xl bg-white dark:bg-[#131926] border border-slate-200 dark:border-white/10 hover:border-amber-500/40 dark:hover:border-amber-500/40 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Trophy className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                Tournament Hub
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                National LAN & online cups with organizer trust audits (e.g. 98/100), visual playoff bracket trees, and 1-click squad registration.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-semibold text-amber-500">
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
            className="p-5 rounded-2xl bg-white dark:bg-[#131926] border border-slate-200 dark:border-white/10 hover:border-sky-500/40 dark:hover:border-sky-500/40 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors">
                EE AI Tactical Coach
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                In-game tactical AI assistant for scrim rotation optimization, agent lineups, squad chemistry, and career roadmaps.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-semibold text-sky-500">
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
            <h2 className="font-bold text-lg sm:text-xl text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Featured Esports Athletes
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Top ranked verified passports with national tournament credentials</p>
          </div>
          <button
            onClick={() => {
              soundManager.playClickSound();
              onNavigate('discovery');
            }}
            className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 flex items-center gap-1"
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
                className="p-5 rounded-2xl bg-white dark:bg-[#131926] border border-slate-200 dark:border-white/10 hover:border-sky-500/40 dark:hover:border-sky-500/40 shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={player.avatarUrl}
                      alt={player.gamerTag}
                      className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-white/10 group-hover:scale-105 transition-transform"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors">
                          {player.gamerTag}
                        </h4>
                        <ShieldCheck className="w-4 h-4 text-sky-500" />
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{player.realName} • {player.state}</p>
                      <span className="text-[10px] font-semibold px-2 py-0.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full mt-1 inline-block">
                        {player.tier} • Lvl {player.level}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                    <div className="p-2 bg-slate-50 dark:bg-[#1c2438] rounded-xl border border-slate-200/60 dark:border-white/5">
                      <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase">Game</div>
                      <div className="font-semibold text-slate-900 dark:text-white truncate mt-0.5">{player.primaryGame}</div>
                    </div>
                    <div className="p-2 bg-slate-50 dark:bg-[#1c2438] rounded-xl border border-slate-200/60 dark:border-white/5">
                      <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase">Role</div>
                      <div className="font-semibold text-sky-600 dark:text-sky-400 truncate mt-0.5">{player.primaryRole}</div>
                    </div>
                    <div className="p-2 bg-slate-50 dark:bg-[#1c2438] rounded-xl border border-slate-200/60 dark:border-white/5">
                      <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase">K/D</div>
                      <div className="font-semibold text-amber-600 dark:text-amber-400 mt-0.5">{perf?.kdRatio.toFixed(2)}</div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between text-xs font-semibold text-sky-600 dark:text-sky-400">
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
