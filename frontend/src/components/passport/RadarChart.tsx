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
  const radius = size * 0.38;
  const axes = [
    { key: 'aim', label: 'AIM', value: stats.aim, compareVal: compareStats?.aim },
    { key: 'gameSense', label: 'GAME SENSE', value: stats.gameSense, compareVal: compareStats?.gameSense },
    { key: 'clutch', label: 'CLUTCH', value: stats.clutch, compareVal: compareStats?.clutch },
    { key: 'utility', label: 'UTILITY', value: stats.utility, compareVal: compareStats?.utility },
    { key: 'communication', label: 'COMMS', value: stats.communication, compareVal: compareStats?.communication },
    { key: 'aggression', label: 'AGGRESSION', value: stats.aggression, compareVal: compareStats?.aggression },
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
              stroke={lvlIdx === levels.length - 1 ? 'rgba(0, 240, 255, 0.35)' : 'rgba(36, 40, 72, 0.6)'}
              strokeWidth={lvlIdx === levels.length - 1 ? '1.5' : '1'}
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
              stroke="rgba(0, 240, 255, 0.25)"
              strokeWidth="1"
            />
          );
        })}

        {/* Compare Polygon if exists */}
        {comparePoints && (
          <polygon
            points={comparePoints}
            fill="rgba(255, 70, 85, 0.2)"
            stroke="#FF4655"
            strokeWidth="2"
            className="transition-all duration-500"
          />
        )}

        {/* Primary Polygon */}
        <polygon
          points={primaryPoints}
          fill="rgba(0, 240, 255, 0.25)"
          stroke="#00F0FF"
          strokeWidth="2.5"
          className="transition-all duration-500 drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]"
        />

        {/* Data Vertices */}
        {axes.map((axis, i) => {
          const { x, y } = getCoordinates(axis.value, i);
          return (
            <g key={`vertex-${i}`}>
              <circle
                cx={x}
                cy={y}
                r="4"
                fill="#00F0FF"
                className="drop-shadow-[0_0_6px_#00F0FF]"
              />
              <circle cx={x} cy={y} r="2" fill="#07070D" />
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
            <g key={`label-${i}`} className="text-[10px] font-orbitron font-semibold">
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#8E9BB0"
                className="tracking-wider select-none hover:fill-cyber-cyan transition-colors"
              >
                {axis.label}
              </text>
              <text
                x={x}
                y={y + 11}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#00F0FF"
                className="font-bold font-rajdhani text-[11px]"
              >
                {axis.value}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend if comparing */}
      {compareStats && (
        <div className="flex items-center gap-4 mt-2 text-xs font-rajdhani font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-cyber-cyan shadow-[0_0_8px_#00F0FF]"></span>
            <span className="text-hud-text">{primaryLabel}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-cyber-red shadow-[0_0_8px_#FF4655]"></span>
            <span className="text-hud-text">{compareLabel}</span>
          </div>
        </div>
      )}
    </div>
  );
};
