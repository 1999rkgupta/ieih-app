import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Trophy as TrophyIcon, 
  Crosshair, 
  Flame, 
  Gamepad2, 
  Cpu, 
  Video, 
  Share2, 
  Edit3, 
  Zap, 
  CheckCircle2, 
  ExternalLink,
  Award,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Radio
} from 'lucide-react';
import { PlayerPassport, GameType } from '../../types';
import { RadarChart } from './RadarChart';
import { soundManager } from '../../utils/audio';

interface PassportCardProps {
  passport: PlayerPassport;
  onEdit?: () => void;
  onShare?: () => void;
  onScout?: () => void;
  onOpenClip?: (clip: any) => void;
  isOwner?: boolean;
  compact?: boolean;
}

export const PassportCard: React.FC<PassportCardProps> = ({
  passport,
  onEdit,
  onShare,
  onScout,
  onOpenClip,
  isOwner = false,
  compact = false
}) => {
  const [selectedGame, setSelectedGame] = useState<GameType>(passport.primaryGame);
  const [activeTab, setActiveTab] = useState<'stats' | 'trophies' | 'tournaments' | 'gear' | 'clips'>('stats');

  const performance = passport.gamePerformances[selectedGame] || passport.gamePerformances[passport.primaryGame];

  const handleGameSelect = (game: GameType) => {
    soundManager.playGlitchChirp();
    setSelectedGame(game);
  };

  const handleTabChange = (tab: 'stats' | 'trophies' | 'tournaments' | 'gear' | 'clips') => {
    soundManager.playClickSound();
    setActiveTab(tab);
  };

  // XP progress percentage
  const xpPercent = Math.min(100, Math.round((passport.currentXp / passport.nextLevelXp) * 100));

  return (
    <div className="relative w-full rounded-2xl bg-hud-surface/90 border border-hud-border/90 overflow-hidden shadow-2xl backdrop-blur-xl transition-all duration-300">
      {/* Dynamic Cyberpunk Top Accent Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-red shadow-[0_0_15px_#00F0FF]"></div>

      {/* Banner / Cover Header with Tech Overlay */}
      <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-hud-card">
        <img
          src={passport.bannerUrl}
          alt="Player Cover"
          className="w-full h-full object-cover object-center opacity-60 filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-hud-surface via-hud-surface/60 to-transparent"></div>
        <div className="absolute inset-0 bg-tech-lines opacity-25"></div>

        {/* Top Badges & Passport Number */}
        <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 z-10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-black/75 backdrop-blur border border-cyber-cyan/50 rounded text-xs font-orbitron font-bold text-cyber-cyan shadow-[0_0_10px_rgba(0,240,255,0.3)]">
              {passport.passportNumber}
            </span>
            <span className="px-2.5 py-1 bg-cyber-purple/25 backdrop-blur border border-cyber-purple/60 rounded text-[11px] font-orbitron font-bold text-cyber-purple">
              {passport.tier.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {passport.isVerified && (
              <div className="flex items-center gap-1.5 px-3 py-1 bg-cyber-cyan/20 border border-cyber-cyan/60 rounded-full text-xs font-rajdhani font-bold text-cyber-cyan shadow-[0_0_12px_rgba(0,240,255,0.4)]">
                <ShieldCheck className="w-3.5 h-3.5 text-cyber-cyan" />
                <span>{passport.verificationBadgeType}</span>
              </div>
            )}
            <div className="flex items-center gap-1 px-2.5 py-1 bg-cyber-gold/20 border border-cyber-gold/50 rounded-full text-xs font-rajdhani font-bold text-cyber-gold">
              <Sparkles className="w-3 h-3" />
              <span>REP {passport.reputationScore}/100</span>
            </div>
          </div>
        </div>

        {/* Live Scrim Status Pill */}
        <div className="absolute bottom-3 right-4 z-10">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/80 backdrop-blur rounded-full border border-hud-border text-xs font-rajdhani font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-emerald-400">{passport.availability}</span>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="px-5 sm:px-8 pb-8 pt-0 relative">
        {/* Player Profile Identity Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-6 relative z-20">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            {/* Avatar with Hex / Cyber Border */}
            <div className="relative group self-start">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-cyber-cyan shadow-[0_0_20px_rgba(0,240,255,0.5)] bg-hud-card">
                <img
                  src={passport.avatarUrl}
                  alt={passport.gamerTag}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 px-2 py-0.5 bg-gradient-to-r from-cyber-cyan to-cyber-blue text-black font-orbitron font-black text-xs rounded shadow-lg">
                LVL {passport.level}
              </div>
            </div>

            {/* Gamertag & Real Name */}
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-orbitron font-extrabold text-2xl sm:text-3xl text-hud-text tracking-wide glow-text-cyan">
                  {passport.gamerTag}
                </h1>
                {passport.currentTeam && (
                  <span className="px-2 py-0.5 bg-hud-card border border-hud-border rounded text-xs font-rajdhani font-bold text-cyber-purple">
                    [{passport.currentTeam.tag}] {passport.currentTeam.name}
                  </span>
                )}
              </div>
              <p className="text-sm font-rajdhani text-hud-muted font-medium">
                {passport.realName} • {passport.age} yrs • {passport.city}, {passport.state} • Languages: {passport.languages.join(', ')}
              </p>
              <div className="flex items-center gap-2 text-xs font-rajdhani text-hud-dim pt-0.5">
                <span>Member since {passport.createdAt}</span>
                <span>•</span>
                <span className="text-cyber-cyan">99.2% Scrim Attendance</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5 self-start md:self-end">
            {onScout && (
              <button
                onClick={() => {
                  soundManager.playSuccessBeep();
                  onScout();
                }}
                className="px-4 py-2 bg-gradient-to-r from-cyber-cyan to-cyber-blue text-black font-rajdhani font-bold text-sm rounded-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.6)] transition-all flex items-center gap-2"
              >
                <Zap className="w-4 h-4 fill-black" />
                SCOUT / OFFER
              </button>
            )}

            {onShare && (
              <button
                onClick={() => {
                  soundManager.playClickSound();
                  onShare();
                }}
                className="p-2 bg-hud-card hover:bg-hud-panel border border-hud-border hover:border-cyber-cyan rounded-lg text-hud-text transition-all"
                title="Share Passport"
              >
                <Share2 className="w-4 h-4" />
              </button>
            )}

            {isOwner && onEdit && (
              <button
                onClick={() => {
                  soundManager.playClickSound();
                  onEdit();
                }}
                className="p-2 bg-hud-card hover:bg-hud-panel border border-hud-border hover:border-cyber-purple rounded-lg text-hud-text transition-all"
                title="Edit Passport"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Level XP Bar */}
        <div className="mb-6 p-3 rounded-xl bg-hud-card/60 border border-hud-border/70 flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs font-orbitron">
            <span className="text-hud-muted flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-cyber-cyan" />
              XP PROGRESSION: <strong className="text-hud-text font-rajdhani text-sm">{passport.currentXp.toLocaleString()} / {passport.nextLevelXp.toLocaleString()} XP</strong>
            </span>
            <span className="text-cyber-cyan font-bold font-rajdhani">{xpPercent}% TO LEVEL {passport.level + 1}</span>
          </div>
          <div className="w-full h-2 bg-hud-bg rounded-full overflow-hidden p-0.5 border border-hud-border">
            <div
              className="h-full bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-gold rounded-full transition-all duration-1000 shadow-[0_0_10px_#00F0FF]"
              style={{ width: `${xpPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Bio */}
        {passport.bio && (
          <p className="text-sm font-sans text-hud-muted leading-relaxed mb-6 border-l-2 border-cyber-cyan/60 pl-3.5 bg-hud-card/30 py-2 rounded-r-lg">
            {passport.bio}
          </p>
        )}

        {/* Game Switcher Tabs */}
        <div className="mb-6">
          <div className="text-[11px] font-orbitron font-bold text-hud-muted mb-2 tracking-wider flex items-center gap-1.5">
            <Gamepad2 className="w-3.5 h-3.5 text-cyber-cyan" />
            SELECT COMBAT DISCIPLINE
          </div>
          <div className="flex flex-wrap gap-2">
            {(['VALORANT', 'BGMI', 'CS2', 'FREE_FIRE', 'POKEMON_UNITE', 'EA_FC24'] as GameType[]).map(game => {
              const isSelected = selectedGame === game;
              const hasData = !!passport.gamePerformances[game];
              return (
                <button
                  key={game}
                  onClick={() => handleGameSelect(game)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-rajdhani font-bold transition-all flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-cyber-cyan/15 text-cyber-cyan border-cyber-cyan shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                      : hasData
                      ? 'bg-hud-card text-hud-text border-hud-border hover:border-cyber-cyan/50'
                      : 'bg-hud-bg/40 text-hud-dim border-transparent cursor-not-allowed'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-cyber-cyan' : 'bg-hud-dim'}`}></span>
                  {game}
                  {game === passport.primaryGame && (
                    <span className="text-[10px] px-1 bg-cyber-purple/30 text-cyber-purple rounded">MAIN</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation Sub-Tabs */}
        <div className="flex border-b border-hud-border mb-6 overflow-x-auto no-scrollbar gap-2">
          <button
            onClick={() => handleTabChange('stats')}
            className={`pb-2.5 px-3 text-xs font-orbitron font-semibold tracking-wider transition-all flex items-center gap-1.5 border-b-2 whitespace-nowrap ${
              activeTab === 'stats'
                ? 'border-cyber-cyan text-cyber-cyan glow-text-cyan'
                : 'border-transparent text-hud-muted hover:text-hud-text'
            }`}
          >
            <Crosshair className="w-3.5 h-3.5" />
            COMBAT STATS
          </button>
          <button
            onClick={() => handleTabChange('trophies')}
            className={`pb-2.5 px-3 text-xs font-orbitron font-semibold tracking-wider transition-all flex items-center gap-1.5 border-b-2 whitespace-nowrap ${
              activeTab === 'trophies'
                ? 'border-cyber-gold text-cyber-gold'
                : 'border-transparent text-hud-muted hover:text-hud-text'
            }`}
          >
            <TrophyIcon className="w-3.5 h-3.5" />
            TROPHIES ({passport.trophies.length})
          </button>
          <button
            onClick={() => handleTabChange('tournaments')}
            className={`pb-2.5 px-3 text-xs font-orbitron font-semibold tracking-wider transition-all flex items-center gap-1.5 border-b-2 whitespace-nowrap ${
              activeTab === 'tournaments'
                ? 'border-cyber-purple text-cyber-purple'
                : 'border-transparent text-hud-muted hover:text-hud-text'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            TOURNAMENT LOG ({passport.tournamentHistory.length})
          </button>
          <button
            onClick={() => handleTabChange('gear')}
            className={`pb-2.5 px-3 text-xs font-orbitron font-semibold tracking-wider transition-all flex items-center gap-1.5 border-b-2 whitespace-nowrap ${
              activeTab === 'gear'
                ? 'border-cyber-blue text-cyber-blue'
                : 'border-transparent text-hud-muted hover:text-hud-text'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            GEAR & SPECS
          </button>
          <button
            onClick={() => handleTabChange('clips')}
            className={`pb-2.5 px-3 text-xs font-orbitron font-semibold tracking-wider transition-all flex items-center gap-1.5 border-b-2 whitespace-nowrap ${
              activeTab === 'clips'
                ? 'border-cyber-red text-cyber-red'
                : 'border-transparent text-hud-muted hover:text-hud-text'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            VERIFIED REELS ({passport.clips.length})
          </button>
        </div>

        {/* Tab 1: Combat Stats & Radar */}
        {activeTab === 'stats' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: Deep Stats Matrix (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* In-Game Rank Banner */}
              <div className="p-4 rounded-xl bg-hud-card border border-hud-border flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-orbitron text-hud-muted">CURRENT COMPETITIVE RANK</div>
                  <div className="text-lg font-orbitron font-bold text-cyber-cyan mt-0.5">
                    {performance ? performance.currentRank : 'Unranked'}
                  </div>
                  <div className="text-xs font-rajdhani text-hud-muted">
                    Peak: <span className="text-hud-text font-bold">{performance?.peakRank || 'N/A'}</span> • IGN: <span className="text-cyber-purple font-mono">{performance?.inGameName}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-orbitron text-hud-muted">SCRIM MMR</div>
                  <div className="text-xl font-orbitron font-black text-cyber-gold">
                    {performance?.scrimMmr || 2000}
                  </div>
                </div>
              </div>

              {/* Stat Grid 2x3 */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-hud-card/80 border border-hud-border rounded-xl">
                  <div className="text-[10px] font-orbitron text-hud-muted">K/D RATIO</div>
                  <div className="text-xl font-rajdhani font-black text-hud-text mt-1 flex items-baseline gap-1">
                    {performance?.kdRatio.toFixed(2)}
                    <span className="text-[10px] text-cyber-cyan font-normal font-sans">Top 2%</span>
                  </div>
                </div>

                <div className="p-3 bg-hud-card/80 border border-hud-border rounded-xl">
                  <div className="text-[10px] font-orbitron text-hud-muted">WIN RATE</div>
                  <div className="text-xl font-rajdhani font-black text-emerald-400 mt-1">
                    {performance?.winRate}%
                  </div>
                </div>

                <div className="p-3 bg-hud-card/80 border border-hud-border rounded-xl">
                  <div className="text-[10px] font-orbitron text-hud-muted">HEADSHOT %</div>
                  <div className="text-xl font-rajdhani font-black text-cyber-purple mt-1">
                    {performance?.headshotPct}%
                  </div>
                </div>

                <div className="p-3 bg-hud-card/80 border border-hud-border rounded-xl">
                  <div className="text-[10px] font-orbitron text-hud-muted">TOURNAMENT MVPs</div>
                  <div className="text-xl font-rajdhani font-black text-cyber-gold mt-1">
                    {performance?.mvpCount} 🏆
                  </div>
                </div>

                <div className="p-3 bg-hud-card/80 border border-hud-border rounded-xl">
                  <div className="text-[10px] font-orbitron text-hud-muted">CLUTCHES WON</div>
                  <div className="text-xl font-rajdhani font-black text-cyber-cyan mt-1">
                    {performance?.clutchesWon}
                  </div>
                </div>

                <div className="p-3 bg-hud-card/80 border border-hud-border rounded-xl">
                  <div className="text-[10px] font-orbitron text-hud-muted">HOURS LOGGED</div>
                  <div className="text-xl font-rajdhani font-black text-hud-text mt-1">
                    {performance?.hoursPlayed}h
                  </div>
                </div>
              </div>

              {/* Main Agents / Weapons */}
              {performance?.mainCharactersOrWeapons && performance.mainCharactersOrWeapons.length > 0 && (
                <div className="p-3 bg-hud-card/50 border border-hud-border rounded-xl">
                  <div className="text-[10px] font-orbitron text-hud-muted mb-1.5">SIGNATURE PICKS & LOADOUTS</div>
                  <div className="flex flex-wrap gap-1.5">
                    {performance.mainCharactersOrWeapons.map((item, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-hud-bg border border-hud-border text-xs font-rajdhani font-bold text-hud-text rounded">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Radar Skill Chart (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-hud-card/40 border border-hud-border rounded-xl">
              <div className="text-xs font-orbitron font-bold text-cyber-cyan mb-2 tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                TACTICAL RADAR MATRIX
              </div>
              <RadarChart stats={passport.radarStats} size={250} />
            </div>
          </div>
        )}

        {/* Tab 2: Trophy Vault */}
        {activeTab === 'trophies' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {passport.trophies.map(trophy => (
              <div
                key={trophy.id}
                className="p-4 rounded-xl bg-hud-card border border-hud-border/80 hover:border-cyber-gold/60 transition-all group relative overflow-hidden"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-cyber-gold/10 border border-cyber-gold/40 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform shadow-[0_0_12px_rgba(255,184,0,0.2)]">
                    {trophy.icon}
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-orbitron px-1.5 py-0.5 bg-cyber-gold/20 text-cyber-gold rounded font-bold">
                      {trophy.tier.toUpperCase()} TIER
                    </span>
                    <h4 className="font-orbitron font-bold text-sm text-hud-text pt-1">
                      {trophy.title}
                    </h4>
                    <p className="text-xs text-hud-muted font-rajdhani font-medium">{trophy.event}</p>
                    <p className="text-[11px] text-hud-dim font-rajdhani">{trophy.date}</p>
                  </div>
                </div>
                {trophy.prizeContribution && (
                  <div className="mt-3 pt-2.5 border-t border-hud-border flex items-center justify-between text-xs font-rajdhani font-bold">
                    <span className="text-hud-muted">Prize Share:</span>
                    <span className="text-emerald-400 font-orbitron">{trophy.prizeContribution}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Tournament Log */}
        {activeTab === 'tournaments' && (
          <div className="space-y-3">
            {passport.tournamentHistory.map(record => (
              <div
                key={record.id}
                className="p-4 rounded-xl bg-hud-card border border-hud-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-cyber-purple/60 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-cyber-purple/20 text-cyber-purple rounded text-[10px] font-orbitron font-bold">
                      {record.game}
                    </span>
                    <h4 className="font-orbitron font-bold text-sm text-hud-text">
                      {record.tournamentName}
                    </h4>
                  </div>
                  <p className="text-xs font-rajdhani text-hud-muted">
                    Roster: <strong className="text-hud-text">{record.teamName}</strong> • {record.date}
                  </p>
                </div>
                <div className="flex items-center gap-4 sm:text-right">
                  <div>
                    <div className="text-xs font-orbitron font-bold text-cyber-gold">
                      {record.placement}
                    </div>
                    <div className="text-xs font-rajdhani font-bold text-emerald-400">
                      {record.prizeWon}
                    </div>
                  </div>
                  {record.verified && (
                    <div className="px-2 py-1 bg-cyber-cyan/10 border border-cyber-cyan/30 rounded text-[10px] font-rajdhani font-bold text-cyber-cyan flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      VERIFIED
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Hardware Gear */}
        {activeTab === 'gear' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-hud-card border border-hud-border space-y-3">
              <div className="text-xs font-orbitron font-bold text-cyber-blue flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                SYSTEM & BATTLE RIG
              </div>
              <div className="space-y-2 text-xs font-rajdhani">
                <div>
                  <span className="text-hud-muted">Primary Rig:</span>
                  <p className="text-hud-text font-bold mt-0.5">{passport.gear.deviceOrPlatform}</p>
                </div>
                <div>
                  <span className="text-hud-muted">Audio / Headset:</span>
                  <p className="text-hud-text font-bold mt-0.5">{passport.gear.audio}</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-hud-card border border-hud-border space-y-3">
              <div className="text-xs font-orbitron font-bold text-cyber-cyan flex items-center gap-2">
                <Crosshair className="w-4 h-4" />
                PERIPHERALS & SENSITIVITY
              </div>
              <div className="space-y-2 text-xs font-rajdhani">
                <div>
                  <span className="text-hud-muted">Mouse & Keyboard / Touch:</span>
                  <p className="text-hud-text font-bold mt-0.5">{passport.gear.peripherals}</p>
                </div>
                <div>
                  <span className="text-hud-muted">DPI & Sensitivity Profile:</span>
                  <p className="text-cyber-cyan font-mono font-bold mt-0.5">{passport.gear.sensDpi}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Highlight Clips */}
        {activeTab === 'clips' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {passport.clips.map(clip => (
              <div
                key={clip.id}
                onClick={() => onOpenClip && onOpenClip(clip)}
                className="group relative rounded-xl overflow-hidden bg-hud-card border border-hud-border hover:border-cyber-cyan cursor-pointer transition-all"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={clip.thumbnail}
                    alt={clip.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
                  
                  {/* Play icon badge */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-cyber-cyan/20 border border-cyber-cyan text-cyber-cyan flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_15px_#00F0FF]">
                      <Video className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-black/80 rounded text-[10px] font-orbitron font-bold text-cyber-cyan">
                    {clip.game}
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 bg-black/80 rounded text-[10px] font-mono text-hud-muted">
                    {clip.duration}
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="font-orbitron font-bold text-xs text-hud-text group-hover:text-cyber-cyan transition-colors truncate">
                    {clip.title}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] font-rajdhani text-hud-muted mt-1">
                    <span>{clip.views} views</span>
                    <span className="text-cyber-cyan flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Verified POV
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
