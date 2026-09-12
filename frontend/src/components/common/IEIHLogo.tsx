import React from 'react';

interface IEIHLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  subtitle?: string;
  className?: string;
  animate?: boolean;
}

export const IEIHLogo: React.FC<IEIHLogoProps> = ({
  size = 'md',
  showText = true,
  subtitle = 'India Esports Hub',
  className = '',
  animate = false
}) => {
  // Dimensions map
  const sizeMap = {
    xs: { icon: 24, text: 'text-xs', sub: 'text-[8px]', badge: 'text-[8px] px-1 py-0.2' },
    sm: { icon: 32, text: 'text-sm', sub: 'text-[9px]', badge: 'text-[9px] px-1.5 py-0.5' },
    md: { icon: 40, text: 'text-base', sub: 'text-[10px]', badge: 'text-[10px] px-2 py-0.5' },
    lg: { icon: 52, text: 'text-xl', sub: 'text-xs', badge: 'text-xs px-2.5 py-0.5' },
    xl: { icon: 68, text: 'text-2xl', sub: 'text-sm', badge: 'text-xs px-3 py-1' }
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Precision Vector Emblem */}
      <div 
        className={`relative shrink-0 flex items-center justify-center transition-transform duration-300 ${animate ? 'hover:scale-105' : ''}`}
        style={{ width: currentSize.icon, height: currentSize.icon }}
      >
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_2px_8px_rgba(145,186,175,0.3)] dark:drop-shadow-[0_4px_16px_rgba(145,186,175,0.4)]"
        >
          <defs>
            {/* Outer Shield Gradient */}
            <linearGradient id="ieih-shield-grad" x1="8" y1="4" x2="56" y2="60" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#91baaf" />
              <stop offset="50%" stopColor="#71a396" />
              <stop offset="100%" stopColor="#466b62" />
            </linearGradient>

            {/* Saffron Top Chevron Gradient */}
            <linearGradient id="ieih-saffron-grad" x1="28" y1="8" x2="54" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ff781f" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>

            {/* Azure / Cyan Core Gradient */}
            <linearGradient id="ieih-azure-grad" x1="16" y1="16" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#b4d5cc" />
              <stop offset="50%" stopColor="#91baaf" />
              <stop offset="100%" stopColor="#58867b" />
            </linearGradient>

            {/* Emerald Base Anchor Gradient */}
            <linearGradient id="ieih-emerald-grad" x1="12" y1="36" x2="36" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>

            {/* Subtle Inner Sheen */}
            <linearGradient id="ieih-sheen" x1="12" y1="8" x2="52" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
              <stop offset="45%" stopColor="#ffffff" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* 1. Outer Hexagonal Shield Foundation */}
          <path
            d="M32 3 L55 14.5 C55 35 44.5 49.5 32 60 C19.5 49.5 9 35 9 14.5 L32 3 Z"
            fill="url(#ieih-shield-grad)"
            className="transition-all duration-300"
          />

          {/* 2. Sleek Dark/Light Contrast Inner Mask */}
          <path
            d="M32 6.5 L51.5 16.5 C51.5 33.5 42.5 46.5 32 55.5 C21.5 46.5 12.5 33.5 12.5 16.5 L32 6.5 Z"
            fill="#090d16"
            className="dark:fill-[#080b12]"
          />

          {/* 3. Outer Sheen Contour */}
          <path
            d="M32 3 L55 14.5 C55 35 44.5 49.5 32 60 C19.5 49.5 9 35 9 14.5 L32 3 Z"
            stroke="url(#ieih-sheen)"
            strokeWidth="1.5"
            fill="none"
          />

          {/* 4. Left Wing: The "I" Monogram Pillar with Emerald Anchor */}
          <path
            d="M17.5 18.5 L24.5 14.5 L24.5 45.5 L17.5 40 Z"
            fill="url(#ieih-emerald-grad)"
          />
          {/* Pillar Highlight */}
          <path
            d="M21 17 L24.5 14.5 L24.5 45.5 L21 42.5 Z"
            fill="#ffffff"
            fillOpacity="0.18"
          />

          {/* 5. Right Wing: The "E" Dynamic Speed Wings */}
          {/* Top Bar (Saffron Indian Energy) */}
          <path
            d="M27.5 14.5 L46 20.5 L41 26 L27.5 21 Z"
            fill="url(#ieih-saffron-grad)"
          />

          {/* Mid Arm / Speed Strike (Chakra Azure) */}
          <path
            d="M27.5 24.5 L43 27.5 L39 32.5 L27.5 30 Z"
            fill="url(#ieih-azure-grad)"
          />

          {/* Bottom Wing (Deep Azure / Cobalt) */}
          <path
            d="M27.5 33.5 L46 32.5 L40 40 L27.5 45.5 Z"
            fill="url(#ieih-shield-grad)"
          />

          {/* 6. Center Biometric Core: Cryptographic Passport Nexus Diamond */}
          <polygon
            points="32,23 37,29 32,35 27,29"
            fill="#ffffff"
            className="filter drop-shadow-[0_0_4px_rgba(56,189,248,0.8)]"
          />
          <polygon
            points="32,25.5 35,29 32,32.5 29,29"
            fill="#91baaf"
          />
        </svg>
      </div>

      {/* Wordmark Typography */}
      {showText && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2 leading-none">
            <span className={`font-black tracking-tight text-slate-900 dark:text-white ${currentSize.text} font-sans`}>
              IEIH
            </span>
            <span className={`font-bold tracking-wide uppercase bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 rounded-full ${currentSize.badge}`}>
              PRO
            </span>
          </div>
          {subtitle && (
            <p className={`font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400 ${currentSize.sub} mt-0.5`}>
              {subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default IEIHLogo;
