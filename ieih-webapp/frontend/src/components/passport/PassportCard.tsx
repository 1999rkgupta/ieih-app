import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Gamepad2, 
  Trophy as TrophyIcon, 
  Share2, 
  Edit3, 
  Video, 
  TrendingUp, 
  Award, 
  Cpu, 
  Crosshair, 
  Play,
  Zap
} from 'lucide-react';
import { PlayerPassport, GameType, HighlightClip } from '../../types';
import { RadarChart } from './RadarChart';
import { soundManager } from '../../utils/audio';

interface PassportCardProps {
  passport: PlayerPassport;
  isOwner?: boolean;
  onEdit?: () => void;
  onShare?: () => void;
  onScout?: () => void;
  onOpenClip?: (clip: HighlightClip) => void;
}

export const PassportCard: React.FC<PassportCardProps> = ({
  passport,
  isOwner = true,
  onEdit,
  onShare,
  onScout,
  onOpenClip
}) => {
  const [selectedGame, setSelectedGame] = useState<GameType>(passport.primaryGame);
  const [activeTab, setActiveTab] = useState<'stats' | 'trophies' | 'tournaments' | 'gear' | 'clips'>('stats');

  const performance = passport.gamePerformances[selectedGame];
  const xpPercent = Math.min(100, Math.round((passport.currentXp / passport.nextLevelXp) * 100));

  const handleTabChange = (tab: 'stats' | 'trophies' | 'tournaments' | 'gear' | 'clips') => {
    soundManager.playTabSwitchSound();
    setActiveTab(tab);
  };

  const handleGameSelect = (game: GameType) => {
    soundManager.playGlitchChirp();
    setSelectedGame(game);
  };

  return (
    <div className="rounded-3xl overflow-hidden shadow-xl bg-white dark:bg-[#101622] border border-slate-200 dark:border-white/10 animate-fadeIn">
      {/* Dynamic Ambient Gamer Banner */}
      <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-900">
        <img
          src={passport.bannerUrl}
          alt="Gamer Banner"
          className="w-full h-full object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#101622] via-white/40 dark:via-[#101622]/40 to-transparent"></div>

        {/* Top Badges & Passport Number */}
        <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 z-10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-white/90 dark:bg-[#101622]/90 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-full text-xs font-mono font-semibold text-slate-900 dark:text-white shadow-sm">
              {passport.passportNumber}
            </span>
            <span className="px-2.5 py-1 bg-indigo-500/15 backdrop-blur-md border border-indigo-500/20 rounded-full text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              {passport.tier.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {passport.isVerified && (
              <div className="flex items-center gap-1.5 px-3 py-1 bg-sky-500/10 backdrop-blur-md border border-sky-500/25 rounded-full text-xs font-semibold text-sky-600 dark:text-sky-400 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{passport.verificationBadgeType}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 backdrop-blur-md border border-amber-500/25 rounded-full text-xs font-semibold text-amber-600 dark:text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Score {passport.reputationScore}/100</span>
            </div>
          </div>
        </div>

        {/* Live Scrim Status Pill */}
        <div className="absolute bottom-3 right-4 z-10">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white/90 dark:bg-[#101622]/90 backdrop-blur-md rounded-full border border-slate-200 dark:border-white/10 text-xs font-medium shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{passport.availability}</span>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="px-5 sm:px-8 pb-8 pt-0 relative">
        {/* Player Profile Identity Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 -mt-14 sm:-mt-16 mb-6 relative z-20">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            {/* Avatar */}
            <div className="relative group self-start">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white dark:border-[#101622] shadow-md bg-slate-100 dark:bg-slate-800">
                <img
                  src={passport.avatarUrl}
                  alt={passport.gamerTag}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 px-2.5 py-0.5 bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold text-[11px] rounded-full shadow-md font-mono">
                L{passport.level}
              </div>
            </div>

            {/* Gamertag & Real Name */}
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
                  {passport.gamerTag}
                </h1>
                {passport.currentTeam && (
                  <span className="px-2.5 py-0.5 bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-full text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    [{passport.currentTeam.tag}] {passport.currentTeam.name}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal">
                {passport.realName} • {passport.age} yrs • {passport.city}, {passport.state} • {passport.languages.join(', ')}
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-0.5 font-medium">
                <span>Member since {passport.createdAt}</span>
                <span>•</span>
                <span className="text-sky-600 dark:text-sky-400 font-semibold">99.2% Attendance</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 self-start md:self-end">
            {onScout && (
              <button
                onClick={() => {
                  soundManager.playSuccessBeep();
                  onScout();
                }}
                className="px-5 py-2.5 bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 font-semibold text-xs rounded-full transition-all shadow-sm flex items-center gap-2"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Scout Athlete</span>
              </button>
            )}

            {onShare && (
              <button
                onClick={() => {
                  soundManager.playClickSound();
                  onShare();
                }}
                className="p-2.5 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 rounded-full text-slate-700 dark:text-slate-200 transition-all shadow-sm"
                title="Share Passport"
                aria-label="Share Passport"
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
                className="p-2.5 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 rounded-full text-slate-700 dark:text-slate-200 transition-all shadow-sm"
                title="Edit Passport"
                aria-label="Edit Passport"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Level XP Bar */}
        <div className="mb-6 p-4 rounded-2xl bg-slate-50/90 dark:bg-[#151c2c]/90 border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col gap-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5 font-medium">
              <TrendingUp className="w-3.5 h-3.5 text-sky-500" />
              XP Progression: <strong className="text-slate-900 dark:text-white font-semibold">{passport.currentXp.toLocaleString()} / {passport.nextLevelXp.toLocaleString()} XP</strong>
            </span>
            <span className="text-sky-600 dark:text-sky-400 font-semibold">{xpPercent}% to Lvl {passport.level + 1}</span>
          </div>
          <div className="w-full h-2 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full transition-all duration-700"
              style={{ width: `${xpPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Bio */}
        {passport.bio && (
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 border-l-2 border-sky-500 pl-3.5 py-1">
            {passport.bio}
          </p>
        )}

        {/* Game Switcher Tabs (Spotify pill chips) */}
        <div className="mb-6">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Gamepad2 className="w-3.5 h-3.5 text-sky-500" />
            Combat Discipline
          </div>
          <div className="flex flex-wrap gap-2">
            {(['VALORANT', 'BGMI', 'CS2', 'FREE_FIRE', 'POKEMON_UNITE', 'EA_FC24'] as GameType[]).map(game => {
              const isSelected = selectedGame === game;
              const hasData = !!passport.gamePerformances[game];
              return (
                <button
                  key={game}
                  onClick={() => handleGameSelect(game)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-transparent shadow-sm'
                      : hasData
                      ? 'bg-white dark:bg-white/5 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10'
                      : 'bg-slate-100/50 dark:bg-white/5 text-slate-400 dark:text-slate-600 border-transparent cursor-not-allowed opacity-50'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white dark:bg-slate-950' : 'bg-slate-400 dark:bg-slate-600'}`}></span>
                  {game}
                  {game === passport.primaryGame && (
                    <span className="text-[10px] px-1.5 py-0.2 bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-full font-bold">Main</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation Sub-Tabs */}
        <div className="flex border-b border-slate-200 dark:border-white/10 mb-6 overflow-x-auto gap-2">
          <button
            onClick={() => handleTabChange('stats')}
            className={`pb-3 px-3.5 text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 border-b-2 whitespace-nowrap ${
              activeTab === 'stats'
                ? 'border-slate-900 text-slate-900 dark:border-white dark:text-white'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span>Combat Stats</span>
          </button>
          <button
            onClick={() => handleTabChange('trophies')}
            className={`pb-3 px-3.5 text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 border-b-2 whitespace-nowrap ${
              activeTab === 'trophies'
                ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <TrophyIcon className="w-3.5 h-3.5" />
            <span>Trophies ({passport.trophies.length})</span>
          </button>
          <button
            onClick={() => handleTabChange('tournaments')}
            className={`pb-3 px-3.5 text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 border-b-2 whitespace-nowrap ${
              activeTab === 'tournaments'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Tournament Log ({passport.tournamentHistory.length})</span>
          </button>
          <button
            onClick={() => handleTabChange('gear')}
            className={`pb-3 px-3.5 text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 border-b-2 whitespace-nowrap ${
              activeTab === 'gear'
                ? 'border-sky-500 text-sky-600 dark:text-sky-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Gear & Specs</span>
          </button>
          <button
            onClick={() => handleTabChange('clips')}
            className={`pb-3 px-3.5 text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 border-b-2 whitespace-nowrap ${
              activeTab === 'clips'
                ? 'border-rose-500 text-rose-600 dark:text-rose-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Reels ({passport.clips.length})</span>
          </button>
        </div>

        {/* Tab 1: Combat Stats & Radar */}
        {activeTab === 'stats' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left: Deep Stats Matrix */}
            <div className="lg:col-span-7 space-y-4">
              {/* In-Game Rank Banner */}
              <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-[#151c2c]/90 border border-slate-200/80 dark:border-white/10 flex items-center justify-between shadow-sm">
                <div>
                  <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Competitive Rank</div>
                  <div className="text-lg font-bold text-sky-600 dark:text-sky-400 mt-0.5">
                    {performance ? performance.currentRank : 'Unranked'}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-normal mt-0.5">
                    Peak: <span className="text-slate-900 dark:text-white font-medium">{performance?.peakRank || 'N/A'}</span> • IGN: <span className="font-mono text-indigo-600 dark:text-indigo-400 font-medium">{performance?.inGameName}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Scrim MMR</div>
                  <div className="text-xl font-bold text-amber-600 dark:text-amber-400">
                    {performance?.scrimMmr || 2000}
                  </div>
                </div>
              </div>

              {/* Stat Grid 2x3 */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-slate-50/90 dark:bg-[#151c2c]/90 border border-slate-200/80 dark:border-white/10 rounded-2xl shadow-sm">
                  <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">K/D Ratio</div>
                  <div className="text-xl font-bold text-slate-900 dark:text-white mt-1 flex items-baseline gap-1">
                    {performance?.kdRatio.toFixed(2)}
                    <span className="text-[10px] text-sky-500 font-normal">Top 2%</span>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50/90 dark:bg-[#151c2c]/90 border border-slate-200/80 dark:border-white/10 rounded-2xl shadow-sm">
                  <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Win Rate</div>
                  <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                    {performance?.winRate}%
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50/90 dark:bg-[#151c2c]/90 border border-slate-200/80 dark:border-white/10 rounded-2xl shadow-sm">
                  <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Headshot %</div>
                  <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">
                    {performance?.headshotPct}%
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50/90 dark:bg-[#151c2c]/90 border border-slate-200/80 dark:border-white/10 rounded-2xl shadow-sm">
                  <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">MVPs Won</div>
                  <div className="text-xl font-bold text-amber-600 dark:text-amber-400 mt-1">
                    {performance?.mvpCount} 🏆
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50/90 dark:bg-[#151c2c]/90 border border-slate-200/80 dark:border-white/10 rounded-2xl shadow-sm">
                  <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Clutches</div>
                  <div className="text-xl font-bold text-sky-600 dark:text-sky-400 mt-1">
                    {performance?.clutchesWon}
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50/90 dark:bg-[#151c2c]/90 border border-slate-200/80 dark:border-white/10 rounded-2xl shadow-sm">
                  <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Hours Logged</div>
                  <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                    {performance?.hoursPlayed}h
                  </div>
                </div>
              </div>

              {/* Main Agents / Weapons */}
              {performance?.mainCharactersOrWeapons && performance.mainCharactersOrWeapons.length > 0 && (
                <div className="p-3.5 bg-slate-50/90 dark:bg-[#151c2c]/90 border border-slate-200/80 dark:border-white/10 rounded-2xl shadow-sm">
                  <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Signature Picks & Loadouts</div>
                  <div className="flex flex-wrap gap-1.5">
                    {performance.mainCharactersOrWeapons.map((item, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-800 dark:text-slate-200 rounded-full">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Radar Skill Chart */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50/90 dark:bg-[#151c2c]/90 border border-slate-200/80 dark:border-white/10 rounded-2xl shadow-sm">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 tracking-wider uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                Tactical Radar Matrix
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
                className="p-5 rounded-2xl bg-slate-50/90 dark:bg-[#151c2c]/90 border border-slate-200/80 dark:border-white/10 hover:border-amber-500/40 transition-all group relative overflow-hidden shadow-sm"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform">
                    {trophy.icon}
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-semibold px-2 py-0.5 bg-amber-500/15 text-amber-600 dark:text-amber-400 rounded-full">
                      {trophy.tier.toUpperCase()} TIER
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white pt-1">
                      {trophy.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{trophy.event}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{trophy.date}</p>
                  </div>
                </div>
                {trophy.prizeContribution && (
                  <div className="mt-3.5 pt-2.5 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs font-medium">
                    <span className="text-slate-500 dark:text-slate-400">Prize Share:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{trophy.prizeContribution}</span>
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
                className="p-4 rounded-2xl bg-slate-50/90 dark:bg-[#151c2c]/90 border border-slate-200/80 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-indigo-500/40 transition-all shadow-sm"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full text-[10px] font-semibold">
                      {record.game}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      {record.tournamentName}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Roster: <strong className="text-slate-900 dark:text-white">{record.teamName}</strong> • {record.date}
                  </p>
                </div>
                <div className="flex items-center gap-4 sm:text-right">
                  <div>
                    <div className="text-xs font-bold text-amber-600 dark:text-amber-400">
                      {record.placement}
                    </div>
                    <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      {record.prizeWon}
                    </div>
                  </div>
                  {record.verified && (
                    <div className="px-2.5 py-1 bg-sky-500/10 border border-sky-500/20 rounded-full text-[10px] font-semibold text-sky-600 dark:text-sky-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified</span>
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
            <div className="p-5 rounded-2xl bg-slate-50/90 dark:bg-[#151c2c]/90 border border-slate-200/80 dark:border-white/10 space-y-3 shadow-sm">
              <div className="text-xs font-bold text-sky-600 dark:text-sky-400 flex items-center gap-2 uppercase tracking-wider">
                <Cpu className="w-4 h-4" />
                System & Rig
              </div>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Primary Platform:</span>
                  <p className="text-slate-900 dark:text-white font-semibold mt-0.5">{passport.gear.deviceOrPlatform}</p>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Audio / Headset:</span>
                  <p className="text-slate-900 dark:text-white font-semibold mt-0.5">{passport.gear.audio}</p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50/90 dark:bg-[#151c2c]/90 border border-slate-200/80 dark:border-white/10 space-y-3 shadow-sm">
              <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2 uppercase tracking-wider">
                <Crosshair className="w-4 h-4" />
                Peripherals & Settings
              </div>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Mouse & Keyboard:</span>
                  <p className="text-slate-900 dark:text-white font-semibold mt-0.5">{passport.gear.peripherals}</p>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400">DPI & Sensitivity:</span>
                  <p className="text-sky-600 dark:text-sky-400 font-mono font-semibold mt-0.5">{passport.gear.sensDpi}</p>
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
                className="group relative rounded-2xl overflow-hidden bg-slate-50 dark:bg-[#151c2c] border border-slate-200 dark:border-white/10 hover:border-rose-500/40 cursor-pointer transition-all shadow-sm"
              >
                <div className="aspect-video relative overflow-hidden bg-slate-900">
                  <img
                    src={clip.thumbnail}
                    alt={clip.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
                  
                  {/* Play icon badge */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-11 h-11 rounded-full bg-white/90 text-slate-900 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <Play className="w-4 h-4 fill-slate-900 translate-x-0.5" />
                    </div>
                  </div>

                  <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-black/70 backdrop-blur rounded-full text-[10px] font-semibold text-white">
                    {clip.game}
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 px-2.5 py-0.5 bg-black/70 backdrop-blur rounded-full text-[10px] font-mono text-white/80">
                    {clip.duration}
                  </div>
                </div>
                <div className="p-3.5">
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors truncate">
                    {clip.title}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    <span>{clip.views} views</span>
                    <span className="text-sky-600 dark:text-sky-400 flex items-center gap-1 font-medium">
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
