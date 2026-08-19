import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Trophy, 
  Search, 
  Zap, 
  Crosshair, 
  GraduationCap, 
  Briefcase, 
  Bot, 
  ChevronRight, 
  Flame, 
  Users, 
  DollarSign, 
  Award,
  Play
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
      {/* High-Voltage Hero Section */}
      <div className="relative rounded-3xl bg-hud-surface border-2 border-cyber-cyan/30 p-6 sm:p-12 overflow-hidden shadow-2xl shadow-cyber-cyan/10">
        {/* Background glow & mesh */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyber-cyan/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyber-purple/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute inset-0 bg-tech-lines opacity-20 pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl space-y-6">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cyber-cyan/10 border border-cyber-cyan/40 rounded-full text-xs font-orbitron font-bold text-cyber-cyan shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-ping"></span>
            <span>INDIA ESPORTS INNOVATION HUB • OFFICIAL DIGITAL ARENA</span>
          </div>

          {/* Main Display Heading */}
          <h1 className="font-orbitron font-black text-3xl sm:text-5xl lg:text-6xl text-hud-text tracking-wide uppercase leading-tight">
            DISCOVER <span className="text-cyber-cyan glow-text-cyan">•</span> DEVELOP <span className="text-cyber-purple glow-text-purple">•</span> VERIFY <span className="text-cyber-gold glow-text-gold">•</span> CONNECT
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-base font-sans text-hud-muted max-w-2xl leading-relaxed">
            The professional gaming identity and tournament platform for Indian esports athletes. Mint your cryptographic <strong className="text-cyber-cyan">E-Player Passport</strong>, get recruited by Tier-1 franchises, and battle in verified LAN arenas with escrow-backed prizing.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => {
                soundManager.playSuccessBeep();
                onNavigate('onboarding');
              }}
              className="px-6 sm:px-8 py-3.5 bg-gradient-to-r from-cyber-cyan via-cyber-blue to-cyber-purple text-black font-orbitron font-black text-xs sm:text-sm rounded-xl hover:shadow-[0_0_25px_rgba(0,240,255,0.7)] transition-all flex items-center gap-2.5"
            >
              <Zap className="w-4 h-4 fill-black" />
              MINT LEVEL 1 PASSPORT
            </button>

            <button
              onClick={() => {
                soundManager.playClickSound();
                onNavigate('discovery');
              }}
              className="px-6 py-3.5 bg-hud-card hover:bg-hud-panel border border-hud-border hover:border-cyber-cyan text-hud-text font-rajdhani font-bold text-sm rounded-xl transition-all flex items-center gap-2"
            >
              <Search className="w-4 h-4 text-cyber-cyan" />
              SCOUT TALENT RADAR
            </button>

            <button
              onClick={() => {
                soundManager.playClickSound();
                onNavigate('tournaments');
              }}
              className="px-6 py-3.5 bg-hud-card hover:bg-hud-panel border border-hud-border hover:border-cyber-gold text-hud-text font-rajdhani font-bold text-sm rounded-xl transition-all flex items-center gap-2"
            >
              <Trophy className="w-4 h-4 text-cyber-gold" />
              EXPLORE TOURNAMENTS
            </button>
          </div>
        </div>

        {/* Live Ecosystem Telemetry Counter */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10 pt-8 border-t border-hud-border/70 relative z-10">
          <div className="p-3.5 rounded-xl bg-hud-card/80 border border-hud-border">
            <div className="text-[10px] font-orbitron text-hud-muted">VERIFIED ATHLETES</div>
            <div className="text-xl sm:text-2xl font-orbitron font-black text-cyber-cyan mt-1">18,450+</div>
            <div className="text-[11px] font-rajdhani text-emerald-400 font-bold mt-0.5">↑ 420 this week</div>
          </div>

          <div className="p-3.5 rounded-xl bg-hud-card/80 border border-hud-border">
            <div className="text-[10px] font-orbitron text-hud-muted">ESCROW PRIZING DISBURSED</div>
            <div className="text-xl sm:text-2xl font-orbitron font-black text-cyber-gold mt-1">₹14.8 Cr+</div>
            <div className="text-[11px] font-rajdhani text-hud-muted font-bold mt-0.5">99.4% On-Time Payouts</div>
          </div>

          <div className="p-3.5 rounded-xl bg-hud-card/80 border border-hud-border">
            <div className="text-[10px] font-orbitron text-hud-muted">VERIFIED TEAMS & SCOUTS</div>
            <div className="text-xl sm:text-2xl font-orbitron font-black text-cyber-purple mt-1">450+ Orgs</div>
            <div className="text-[11px] font-rajdhani text-cyber-purple font-bold mt-0.5">Active Recruiters</div>
          </div>

          <div className="p-3.5 rounded-xl bg-hud-card/80 border border-hud-border">
            <div className="text-[10px] font-orbitron text-hud-muted">COLLEGIATE CLUBS</div>
            <div className="text-xl sm:text-2xl font-orbitron font-black text-cyber-blue mt-1">140+ Campuses</div>
            <div className="text-[11px] font-rajdhani text-cyber-blue font-bold mt-0.5">IITs, NITs, BITS, VIT</div>
          </div>
        </div>
      </div>

      {/* Flagship Feature Portals */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-orbitron font-bold text-lg sm:text-xl text-hud-text flex items-center gap-2">
            <Crosshair className="w-5 h-5 text-cyber-cyan" />
            IEIH CORE MODULES
          </h2>
          <span className="text-xs font-orbitron text-hud-muted">BROADCAST SYSTEM READY</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Passport */}
          <div
            onClick={() => {
              soundManager.playClickSound();
              onNavigate('passport');
            }}
            className="p-5 rounded-2xl bg-hud-surface border border-hud-border hover:border-cyber-cyan transition-all cursor-pointer group shadow-lg hover:shadow-cyber-cyan/15 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/40 text-cyber-cyan flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-orbitron font-bold text-base text-hud-text group-hover:text-cyber-cyan transition-colors">
                E-Player Passport
              </h3>
              <p className="text-xs text-hud-muted font-sans leading-relaxed">
                Cryptographic gamer identity with deep combat stats, radar skill matrices, unlocked trophies, and verified hardware gear.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-rajdhani font-bold text-cyber-cyan">
              <span>EXPLORE PASSPORTS</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Talent Discovery */}
          <div
            onClick={() => {
              soundManager.playClickSound();
              onNavigate('discovery');
            }}
            className="p-5 rounded-2xl bg-hud-surface border border-hud-border hover:border-cyber-purple transition-all cursor-pointer group shadow-lg hover:shadow-cyber-purple/15 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyber-purple/10 border border-cyber-purple/40 text-cyber-purple flex items-center justify-center group-hover:scale-110 transition-transform">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="font-orbitron font-bold text-base text-hud-text group-hover:text-cyber-purple transition-colors">
                Talent Discovery
              </h3>
              <p className="text-xs text-hud-muted font-sans leading-relaxed">
                Multi-dimensional filterable scout engine with HUD segmented match-meters (e.g. 96% Synergy) and side-by-side player comparisons.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-rajdhani font-bold text-cyber-purple">
              <span>LAUNCH SCOUT ENGINE</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Tournament Hub */}
          <div
            onClick={() => {
              soundManager.playClickSound();
              onNavigate('tournaments');
            }}
            className="p-5 rounded-2xl bg-hud-surface border border-hud-border hover:border-cyber-gold transition-all cursor-pointer group shadow-lg hover:shadow-cyber-gold/15 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyber-gold/10 border border-cyber-gold/40 text-cyber-gold flex items-center justify-center group-hover:scale-110 transition-transform">
                <Trophy className="w-5 h-5" />
              </div>
              <h3 className="font-orbitron font-bold text-base text-hud-text group-hover:text-cyber-gold transition-colors">
                Tournament Hub
              </h3>
              <p className="text-xs text-hud-muted font-sans leading-relaxed">
                National LAN & online cups with organizer trust audits (e.g. 98/100), visual playoff bracket trees, and 1-click squad registration.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-rajdhani font-bold text-cyber-gold">
              <span>VIEW LIVE ARENAS</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4: EE AI Companion */}
          <div
            onClick={() => {
              soundManager.playClickSound();
              onNavigate('ai');
            }}
            className="p-5 rounded-2xl bg-hud-surface border border-hud-border hover:border-cyber-blue transition-all cursor-pointer group shadow-lg hover:shadow-cyber-blue/15 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyber-blue/10 border border-cyber-blue/40 text-cyber-blue flex items-center justify-center group-hover:scale-110 transition-transform">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="font-orbitron font-bold text-base text-hud-text group-hover:text-cyber-blue transition-colors">
                EE AI Companion
              </h3>
              <p className="text-xs text-hud-muted font-sans leading-relaxed">
                Esports Elite in-game tactical AI assistant for scrim rotation optimization, agent lineups, squad chemistry, and career roadmaps.
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1 text-xs font-rajdhani font-bold text-cyber-blue">
              <span>TALK TO TACTICAL AI</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* Spotlight Athletes Showcase */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-orbitron font-bold text-lg sm:text-xl text-hud-text flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyber-gold" />
              FEATURED INDIAN ESPORTS ATHLETES
            </h2>
            <p className="text-xs text-hud-muted font-rajdhani">Top ranked national verified passports with Tier-1 tournament credentials</p>
          </div>
          <button
            onClick={() => {
              soundManager.playClickSound();
              onNavigate('discovery');
            }}
            className="text-xs font-rajdhani font-bold text-cyber-cyan hover:underline flex items-center gap-1"
          >
            <span>VIEW ALL 18K+ ATHLETES</span>
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
                className="p-5 rounded-2xl bg-hud-surface border border-hud-border hover:border-cyber-cyan cursor-pointer transition-all flex flex-col justify-between space-y-4 group shadow-xl hover:shadow-cyber-cyan/10"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={player.avatarUrl}
                      alt={player.gamerTag}
                      className="w-14 h-14 rounded-xl object-cover border border-cyber-cyan/40 group-hover:scale-105 transition-transform"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-orbitron font-extrabold text-base text-hud-text group-hover:text-cyber-cyan transition-colors">
                          {player.gamerTag}
                        </h4>
                        <ShieldCheck className="w-4 h-4 text-cyber-cyan" />
                      </div>
                      <p className="text-xs font-rajdhani text-hud-muted">{player.realName} • {player.state}</p>
                      <span className="text-[10px] font-orbitron px-1.5 py-0.5 bg-cyber-purple/20 text-cyber-purple rounded font-bold mt-1 inline-block">
                        {player.tier} • LVL {player.level}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs font-rajdhani pt-1">
                    <div className="p-2 bg-hud-card rounded-lg border border-hud-border">
                      <div className="text-[9px] font-orbitron text-hud-muted">GAME</div>
                      <div className="font-bold text-hud-text truncate mt-0.5">{player.primaryGame}</div>
                    </div>
                    <div className="p-2 bg-hud-card rounded-lg border border-hud-border">
                      <div className="text-[9px] font-orbitron text-hud-muted">ROLE</div>
                      <div className="font-bold text-cyber-cyan truncate mt-0.5">{player.primaryRole}</div>
                    </div>
                    <div className="p-2 bg-hud-card rounded-lg border border-hud-border">
                      <div className="text-[9px] font-orbitron text-hud-muted">K/D</div>
                      <div className="font-bold text-cyber-gold mt-0.5">{perf?.kdRatio.toFixed(2)}</div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-hud-border flex items-center justify-between text-xs font-rajdhani font-bold text-cyber-cyan">
                  <span>OPEN DIGITAL PASSPORT</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
