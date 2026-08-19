import React from 'react';
import { X, ShieldCheck, Trophy, Crosshair, ArrowRight, Swords, Sparkles } from 'lucide-react';
import { PlayerPassport } from '../../types';
import { RadarChart } from '../passport/RadarChart';
import { soundManager } from '../../utils/audio';

interface PlayerCompareModalProps {
  player1: PlayerPassport;
  player2: PlayerPassport;
  onClose: () => void;
}

export const PlayerCompareModal: React.FC<PlayerCompareModalProps> = ({
  player1,
  player2,
  onClose
}) => {
  const p1Perf = player1.gamePerformances[player1.primaryGame];
  const p2Perf = player2.gamePerformances[player2.primaryGame];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-fadeIn">
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-hud-surface border border-hud-border rounded-2xl flex flex-col shadow-2xl shadow-cyber-cyan/15 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-hud-border bg-hud-card">
          <div className="flex items-center gap-3">
            <Swords className="w-6 h-6 text-cyber-cyan" />
            <div>
              <h3 className="font-orbitron font-extrabold text-lg text-hud-text tracking-wide">
                HEAD-TO-HEAD SCOUT DUEL
              </h3>
              <p className="text-xs text-hud-muted font-rajdhani">
                Comparing {player1.gamerTag} vs {player2.gamerTag}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundManager.playClickSound();
              onClose();
            }}
            className="p-2 rounded-lg text-hud-muted hover:text-hud-text hover:bg-hud-panel transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Dual Player Banner Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Player 1 Card (Cyan) */}
            <div className="p-4 rounded-xl bg-hud-card border-2 border-cyber-cyan/60 relative overflow-hidden shadow-[0_0_15px_rgba(0,240,255,0.15)]">
              <div className="absolute top-0 right-0 px-3 py-1 bg-cyber-cyan text-black font-orbitron font-black text-[10px]">
                ATHLETE A
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={player1.avatarUrl}
                  alt={player1.gamerTag}
                  className="w-16 h-16 rounded-xl object-cover border-2 border-cyber-cyan"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-orbitron font-extrabold text-lg text-hud-text glow-text-cyan">
                      {player1.gamerTag}
                    </h4>
                    <span className="text-xs px-1.5 py-0.5 bg-cyber-cyan/20 text-cyber-cyan rounded font-bold">
                      LVL {player1.level}
                    </span>
                  </div>
                  <p className="text-xs font-rajdhani text-hud-muted">{player1.realName} • {player1.state}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs font-rajdhani font-bold">
                    <span className="text-cyber-cyan">{player1.primaryGame}</span>
                    <span>•</span>
                    <span className="text-hud-text">{player1.primaryRole}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Player 2 Card (Red/Purple) */}
            <div className="p-4 rounded-xl bg-hud-card border-2 border-cyber-red/60 relative overflow-hidden shadow-[0_0_15px_rgba(255,70,85,0.15)]">
              <div className="absolute top-0 right-0 px-3 py-1 bg-cyber-red text-white font-orbitron font-black text-[10px]">
                ATHLETE B
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={player2.avatarUrl}
                  alt={player2.gamerTag}
                  className="w-16 h-16 rounded-xl object-cover border-2 border-cyber-red"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-orbitron font-extrabold text-lg text-hud-text glow-text-red">
                      {player2.gamerTag}
                    </h4>
                    <span className="text-xs px-1.5 py-0.5 bg-cyber-red/20 text-cyber-red rounded font-bold">
                      LVL {player2.level}
                    </span>
                  </div>
                  <p className="text-xs font-rajdhani text-hud-muted">{player2.realName} • {player2.state}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs font-rajdhani font-bold">
                    <span className="text-cyber-red">{player2.primaryGame}</span>
                    <span>•</span>
                    <span className="text-hud-text">{player2.primaryRole}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Central Radar Comparison */}
          <div className="p-6 bg-hud-card/60 border border-hud-border rounded-xl flex flex-col items-center">
            <div className="text-xs font-orbitron font-bold text-hud-text mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyber-cyan" />
              RADAR OVERLAY ATTRIBUTE MATRIX
            </div>
            <RadarChart
              stats={player1.radarStats}
              compareStats={player2.radarStats}
              primaryLabel={player1.gamerTag}
              compareLabel={player2.gamerTag}
              size={300}
            />
          </div>

          {/* Stat Delta Table */}
          <div className="p-4 bg-hud-card border border-hud-border rounded-xl space-y-3">
            <div className="text-xs font-orbitron font-bold text-hud-muted tracking-wider">
              HEAD-TO-HEAD STAT MATRIX
            </div>

            <div className="space-y-2">
              {/* KD Ratio */}
              <div className="flex items-center justify-between p-3 bg-hud-bg/70 rounded-lg text-sm font-rajdhani font-bold">
                <span className={`w-24 text-left ${p1Perf.kdRatio >= p2Perf.kdRatio ? 'text-cyber-cyan text-base font-black' : 'text-hud-muted'}`}>
                  {p1Perf.kdRatio.toFixed(2)}
                </span>
                <span className="text-xs font-orbitron text-hud-muted text-center flex-1">K/D RATIO</span>
                <span className={`w-24 text-right ${p2Perf.kdRatio >= p1Perf.kdRatio ? 'text-cyber-red text-base font-black' : 'text-hud-muted'}`}>
                  {p2Perf.kdRatio.toFixed(2)}
                </span>
              </div>

              {/* Win Rate */}
              <div className="flex items-center justify-between p-3 bg-hud-bg/70 rounded-lg text-sm font-rajdhani font-bold">
                <span className={`w-24 text-left ${p1Perf.winRate >= p2Perf.winRate ? 'text-cyber-cyan text-base font-black' : 'text-hud-muted'}`}>
                  {p1Perf.winRate}%
                </span>
                <span className="text-xs font-orbitron text-hud-muted text-center flex-1">WIN RATE</span>
                <span className={`w-24 text-right ${p2Perf.winRate >= p1Perf.winRate ? 'text-cyber-red text-base font-black' : 'text-hud-muted'}`}>
                  {p2Perf.winRate}%
                </span>
              </div>

              {/* Headshot % */}
              <div className="flex items-center justify-between p-3 bg-hud-bg/70 rounded-lg text-sm font-rajdhani font-bold">
                <span className={`w-24 text-left ${p1Perf.headshotPct >= p2Perf.headshotPct ? 'text-cyber-cyan text-base font-black' : 'text-hud-muted'}`}>
                  {p1Perf.headshotPct}%
                </span>
                <span className="text-xs font-orbitron text-hud-muted text-center flex-1">HEADSHOT %</span>
                <span className={`w-24 text-right ${p2Perf.headshotPct >= p1Perf.headshotPct ? 'text-cyber-red text-base font-black' : 'text-hud-muted'}`}>
                  {p2Perf.headshotPct}%
                </span>
              </div>

              {/* Scrim MMR */}
              <div className="flex items-center justify-between p-3 bg-hud-bg/70 rounded-lg text-sm font-rajdhani font-bold">
                <span className={`w-24 text-left ${p1Perf.scrimMmr >= p2Perf.scrimMmr ? 'text-cyber-cyan text-base font-black' : 'text-hud-muted'}`}>
                  {p1Perf.scrimMmr}
                </span>
                <span className="text-xs font-orbitron text-hud-muted text-center flex-1">SCRIM MMR</span>
                <span className={`w-24 text-right ${p2Perf.scrimMmr >= p1Perf.scrimMmr ? 'text-cyber-red text-base font-black' : 'text-hud-muted'}`}>
                  {p2Perf.scrimMmr}
                </span>
              </div>

              {/* Tournament MVPs */}
              <div className="flex items-center justify-between p-3 bg-hud-bg/70 rounded-lg text-sm font-rajdhani font-bold">
                <span className={`w-24 text-left ${p1Perf.mvpCount >= p2Perf.mvpCount ? 'text-cyber-cyan text-base font-black' : 'text-hud-muted'}`}>
                  {p1Perf.mvpCount} MVPs
                </span>
                <span className="text-xs font-orbitron text-hud-muted text-center flex-1">MVPs WON</span>
                <span className={`w-24 text-right ${p2Perf.mvpCount >= p1Perf.mvpCount ? 'text-cyber-red text-base font-black' : 'text-hud-muted'}`}>
                  {p2Perf.mvpCount} MVPs
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
