import React from 'react';
import { X, Swords, Sparkles } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white dark:bg-[#101c18] border border-[#91baaf]/40 dark:border-[#91baaf]/25 rounded-3xl flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#91baaf]/30 dark:border-[#91baaf]/20 bg-[#eaf5f2] dark:bg-[#121d1a]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#91baaf]/20 flex items-center justify-center text-[#18483d] dark:text-[#91baaf]">
              <Swords className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#0d2620] dark:text-white">
                Head-to-Head Scout Comparison
              </h3>
              <p className="text-xs text-[#385e54] dark:text-[#a0c7bd]">
                Comparing {player1.gamerTag} vs {player2.gamerTag}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundManager.playClickSound();
              onClose();
            }}
            className="p-1.5 rounded-full text-[#385e54] dark:text-slate-400 hover:text-[#0d2620] dark:hover:text-white hover:bg-[#91baaf]/20 dark:hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close comparison"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Comparison Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Dual Player Banner Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Player 1 Card */}
            <div className="p-4 rounded-2xl bg-[#dceee7]/60 dark:bg-[#121d1a] border border-[#91baaf]/40 dark:border-[#91baaf]/30 relative overflow-hidden shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-base text-[#0d2620] dark:text-white">
                      {player1.gamerTag}
                    </h4>
                  </div>
                  <p className="text-xs text-[#385e54] dark:text-[#a0c7bd] mt-0.5">{player1.realName} • {player1.state}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs font-semibold">
                    <span className="text-[#18483d] dark:text-[#91baaf]">{player1.primaryGame}</span>
                    <span>•</span>
                    <span className="text-[#385e54] dark:text-[#88b5a9]">{player1.primaryRole}</span>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2 py-1 bg-[#91baaf]/25 text-[#133c32] dark:text-[#91baaf] rounded-lg font-mono border border-[#91baaf]/30">
                  L{player1.level}
                </span>
              </div>
            </div>

            {/* Player 2 Card */}
            <div className="p-4 rounded-2xl bg-[#dceee7]/60 dark:bg-[#121d1a] border border-rose-500/30 relative overflow-hidden shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-base text-[#0d2620] dark:text-white">
                      {player2.gamerTag}
                    </h4>
                  </div>
                  <p className="text-xs text-[#385e54] dark:text-[#a0c7bd] mt-0.5">{player2.realName} • {player2.state}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs font-semibold">
                    <span className="text-rose-700 dark:text-rose-400">{player2.primaryGame}</span>
                    <span>•</span>
                    <span className="text-[#385e54] dark:text-[#88b5a9]">{player2.primaryRole}</span>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2 py-1 bg-rose-500/10 text-rose-700 dark:text-rose-400 rounded-lg font-mono border border-rose-500/20">
                  L{player2.level}
                </span>
              </div>
            </div>
          </div>

          {/* Central Radar Comparison */}
          <div className="p-5 bg-[#dceee7]/60 dark:bg-[#121d1a] border border-[#91baaf]/30 dark:border-[#91baaf]/20 rounded-2xl flex flex-col items-center shadow-sm">
            <div className="text-xs font-semibold text-[#385e54] dark:text-[#88b5a9] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#286b5c] dark:text-[#91baaf]" />
              Radar Overlay Attribute Matrix
            </div>
            <RadarChart
              stats={player1.radarStats}
              compareStats={player2.radarStats}
              primaryLabel={player1.gamerTag}
              compareLabel={player2.gamerTag}
              size={280}
            />
          </div>

          {/* Stat Delta Table */}
          <div className="p-4 bg-[#dceee7]/60 dark:bg-[#162521] border border-[#91baaf]/30 dark:border-[#91baaf]/20 rounded-2xl space-y-3 shadow-sm">
            <div className="text-xs font-semibold text-[#385e54] dark:text-[#88b5a9] uppercase tracking-wider">
              Performance Comparison
            </div>

            <div className="space-y-2">
              {/* KD Ratio */}
              <div className="flex items-center justify-between p-3 bg-white/90 dark:bg-[#121d1a] border border-[#91baaf]/30 dark:border-[#91baaf]/15 rounded-xl text-sm font-semibold">
                <span className={`w-24 text-left ${p1Perf.kdRatio >= p2Perf.kdRatio ? 'text-[#18483d] dark:text-[#91baaf] font-bold' : 'text-[#597d74] font-normal'}`}>
                  {p1Perf.kdRatio.toFixed(2)}
                </span>
                <span className="text-xs text-[#385e54] dark:text-[#a0c7bd] uppercase font-medium text-center flex-1">K/D Ratio</span>
                <span className={`w-24 text-right ${p2Perf.kdRatio >= p1Perf.kdRatio ? 'text-rose-700 dark:text-rose-400 font-bold' : 'text-[#597d74] font-normal'}`}>
                  {p2Perf.kdRatio.toFixed(2)}
                </span>
              </div>

              {/* Win Rate */}
              <div className="flex items-center justify-between p-3 bg-white/90 dark:bg-[#121d1a] border border-[#91baaf]/30 dark:border-[#91baaf]/15 rounded-xl text-sm font-semibold">
                <span className={`w-24 text-left ${p1Perf.winRate >= p2Perf.winRate ? 'text-[#18483d] dark:text-[#91baaf] font-bold' : 'text-[#597d74] font-normal'}`}>
                  {p1Perf.winRate}%
                </span>
                <span className="text-xs text-[#385e54] dark:text-[#a0c7bd] uppercase font-medium text-center flex-1">Win Rate</span>
                <span className={`w-24 text-right ${p2Perf.winRate >= p1Perf.winRate ? 'text-rose-700 dark:text-rose-400 font-bold' : 'text-[#597d74] font-normal'}`}>
                  {p2Perf.winRate}%
                </span>
              </div>

              {/* Headshot % */}
              <div className="flex items-center justify-between p-3 bg-white/90 dark:bg-[#121d1a] border border-[#91baaf]/30 dark:border-[#91baaf]/15 rounded-xl text-sm font-semibold">
                <span className={`w-24 text-left ${p1Perf.headshotPct >= p2Perf.headshotPct ? 'text-[#18483d] dark:text-[#91baaf] font-bold' : 'text-[#597d74] font-normal'}`}>
                  {p1Perf.headshotPct}%
                </span>
                <span className="text-xs text-[#385e54] dark:text-[#a0c7bd] uppercase font-medium text-center flex-1">Headshot %</span>
                <span className={`w-24 text-right ${p2Perf.headshotPct >= p1Perf.headshotPct ? 'text-rose-700 dark:text-rose-400 font-bold' : 'text-[#597d74] font-normal'}`}>
                  {p2Perf.headshotPct}%
                </span>
              </div>

              {/* Scrim MMR */}
              <div className="flex items-center justify-between p-3 bg-white/90 dark:bg-[#121d1a] border border-[#91baaf]/30 dark:border-[#91baaf]/15 rounded-xl text-sm font-semibold">
                <span className={`w-24 text-left ${p1Perf.scrimMmr >= p2Perf.scrimMmr ? 'text-[#18483d] dark:text-[#91baaf] font-bold' : 'text-[#597d74] font-normal'}`}>
                  {p1Perf.scrimMmr}
                </span>
                <span className="text-xs text-[#385e54] dark:text-[#a0c7bd] uppercase font-medium text-center flex-1">Scrim MMR</span>
                <span className={`w-24 text-right ${p2Perf.scrimMmr >= p1Perf.scrimMmr ? 'text-rose-700 dark:text-rose-400 font-bold' : 'text-[#597d74] font-normal'}`}>
                  {p2Perf.scrimMmr}
                </span>
              </div>

              {/* Tournament MVPs */}
              <div className="flex items-center justify-between p-3 bg-white/90 dark:bg-[#121d1a] border border-[#91baaf]/30 dark:border-[#91baaf]/15 rounded-xl text-sm font-semibold">
                <span className={`w-24 text-left ${p1Perf.mvpCount >= p2Perf.mvpCount ? 'text-[#18483d] dark:text-[#91baaf] font-bold' : 'text-[#597d74] font-normal'}`}>
                  {p1Perf.mvpCount} MVPs
                </span>
                <span className="text-xs text-[#385e54] dark:text-[#a0c7bd] uppercase font-medium text-center flex-1">MVPs Won</span>
                <span className={`w-24 text-right ${p2Perf.mvpCount >= p1Perf.mvpCount ? 'text-rose-700 dark:text-rose-400 font-bold' : 'text-[#597d74] font-normal'}`}>
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
