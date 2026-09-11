import React from 'react';
import { RadarStats } from '../../types';

interface RadarChartProps {
  stats: RadarStats;
  size?: number;
  compareStats?: RadarStats;
  primaryLabel?: string;
  compareLabel?: string;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  stats,
  size = 280,
  compareStats,
  primaryLabel = 'Player',
  compareLabel = 'Compare'
}) => {
  const center = size / 2;
  const radius = size * 0.36;
  const axes = [
    { key: 'aim', label: 'Aim', value: stats.aim, compareVal: compareStats?.aim },
    { key: 'gameSense', label: 'Game Sense', value: stats.gameSense, compareVal: compareStats?.gameSense },
    { key: 'clutch', label: 'Clutch', value: stats.clutch, compareVal: compareStats?.clutch },
    { key: 'utility', label: 'Utility', value: stats.utility, compareVal: compareStats?.utility },
    { key: 'communication', label: 'Comms', value: stats.communication, compareVal: compareStats?.communication },
    { key: 'aggression', label: 'Aggression', value: stats.aggression, compareVal: compareStats?.aggression },
  ];

  const totalAxes = axes.length;
  const angleSlice = (Math.PI * 2) / totalAxes;

  // Grid levels (25%, 50%, 75%, 100%)
  const levels = [0.25, 0.5, 0.75, 1.0];

  const getCoordinates = (value: number, index: number, maxVal = 100) => {
    const angle = index * angleSlice - Math.PI / 2;
    const r = (value / maxVal) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Build polygon path
  const primaryPoints = axes.map((axis, i) => {
    const { x, y } = getCoordinates(axis.value, i);
    return `${x},${y}`;
  }).join(' ');

  const comparePoints = compareStats ? axes.map((axis, i) => {
    const { x, y } = getCoordinates(axis.compareVal || 0, i);
    return `${x},${y}`;
  }).join(' ') : null;

  return (
    <div className="relative flex flex-col items-center justify-center p-2">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background Grids */}
        {levels.map((level, lvlIdx) => {
          const gridPoints = axes.map((_, i) => {
            const angle = i * angleSlice - Math.PI / 2;
            const r = level * radius;
            const x = center + r * Math.cos(angle);
            const y = center + r * Math.sin(angle);
            return `${x},${y}`;
          }).join(' ');

          return (
            <polygon
              key={`grid-${lvlIdx}`}
              points={gridPoints}
              fill="none"
              stroke="currentColor"
              className={lvlIdx === levels.length - 1 ? 'text-slate-300 dark:text-white/25 stroke-[1.5]' : 'text-slate-200 dark:text-white/10 stroke-[1]'}
              strokeDasharray={lvlIdx === levels.length - 1 ? '' : '3 3'}
            />
          );
        })}

        {/* Axis spokes */}
        {axes.map((_, i) => {
          const angle = i * angleSlice - Math.PI / 2;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          return (
            <line
              key={`spoke-${i}`}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="currentColor"
              className="text-slate-200 dark:text-white/10 stroke-[1]"
            />
          );
        })}

        {/* Compare Polygon if exists */}
        {comparePoints && (
          <polygon
            points={comparePoints}
            fill="rgba(239, 68, 68, 0.15)"
            stroke="#ef4444"
            strokeWidth="2"
            className="transition-all duration-500"
          />
        )}

        {/* Primary Polygon */}
        <polygon
          points={primaryPoints}
          fill="rgba(14, 165, 233, 0.2)"
          stroke="#0ea5e9"
          strokeWidth="2"
          className="transition-all duration-500"
        />

        {/* Data Vertices */}
        {axes.map((axis, i) => {
          const { x, y } = getCoordinates(axis.value, i);
          return (
            <g key={`vertex-${i}`}>
              <circle
                cx={x}
                cy={y}
                r="3.5"
                className="fill-sky-500"
              />
            </g>
          );
        })}

        {/* Axis Labels */}
        {axes.map((axis, i) => {
          const angle = i * angleSlice - Math.PI / 2;
          const labelRadius = radius + 22;
          const x = center + labelRadius * Math.cos(angle);
          const y = center + labelRadius * Math.sin(angle);

          return (
            <g key={`label-${i}`} className="text-[11px] font-medium">
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                className="fill-slate-600 dark:fill-slate-400 select-none text-[10px]"
              >
                {axis.label}
              </text>
              <text
                x={x}
                y={y + 11}
                textAnchor="middle"
                dominantBaseline="central"
                className="font-bold text-[11px] fill-sky-600 dark:fill-sky-400"
              >
                {axis.value}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend if comparing */}
      {compareStats && (
        <div className="flex items-center gap-4 mt-3 text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
            <span className="text-slate-800 dark:text-slate-200">{primaryLabel}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span className="text-slate-800 dark:text-slate-200">{compareLabel}</span>
          </div>
        </div>
      )}
    </div>
  );
};
