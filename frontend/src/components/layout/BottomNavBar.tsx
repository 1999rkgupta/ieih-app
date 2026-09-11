import React from 'react';
import { 
  Home, 
  Trophy, 
  GraduationCap, 
  Briefcase, 
  Bot, 
  Radar,
  Plus
} from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface BottomNavBarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  onOpenPost?: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentTab,
  onNavigate,
  onOpenPost
}) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'discovery', label: 'Radar', icon: Radar },
    { id: 'tournaments', label: 'Tourneys', icon: Trophy },
    { id: 'post', label: 'Post', icon: Plus, isAction: true },
    { id: 'campus', label: 'Campus', icon: GraduationCap },
    { id: 'careers', label: 'Careers', icon: Briefcase },
    { id: 'ai', label: 'EE AI', icon: Bot },
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 select-none pointer-events-none pb-2 sm:pb-3 px-3 sm:px-4">
      <div className="max-w-md sm:max-w-xl mx-auto flex flex-col items-center">
        {/* iPhone Floating Glass Dock */}
        <nav 
          aria-label="iPhone Tab Bar"
          className="pointer-events-auto w-full relative rounded-[26px] sm:rounded-[28px] bg-white/80 dark:bg-[#0c1017]/80 backdrop-blur-2xl saturate-150 border border-white/60 dark:border-white/12 shadow-[0_14px_36px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.04)] dark:shadow-[0_18px_45px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.12)] transition-all duration-300 p-1 sm:p-1.5"
        >
          {/* Subtle Specular Top Sheen (iOS Dynamic Island & Dock signature) */}
          <div className="absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent pointer-events-none" />

          <div className="flex items-center justify-between gap-0.5 sm:gap-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              if (item.isAction) {
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      soundManager.playClickSound();
                      if (onOpenPost) onOpenPost();
                    }}
                    className="relative flex flex-col items-center justify-center p-1 sm:p-1.5 group cursor-pointer focus:outline-none"
                    title="Create Hub Post"
                    aria-label="Create Post"
                  >
                    {/* iOS Action / Shutter Style Elevated Button */}
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 dark:from-white dark:to-slate-100 text-white dark:text-slate-950 flex items-center justify-center shadow-lg shadow-slate-900/20 dark:shadow-white/10 group-hover:scale-105 group-active:scale-90 transition-all duration-200">
                      <Plus className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.6px]" />
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-semibold text-slate-800 dark:text-slate-200 mt-0.5 tracking-tight leading-none">
                      {item.label}
                    </span>
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    soundManager.playClickSound();
                    onNavigate(item.id);
                  }}
                  className={`relative flex-1 py-1 sm:py-1.5 px-0.5 flex flex-col items-center justify-center rounded-2xl transition-all duration-200 group cursor-pointer focus:outline-none ${
                    isActive
                      ? 'text-sky-600 dark:text-sky-400 font-semibold'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  } group-active:scale-90`}
                  title={item.label}
                  aria-label={item.label}
                >
                  {/* iOS Active Selection Pill Backing */}
                  {isActive && (
                    <span className="absolute inset-0 rounded-2xl bg-sky-500/10 dark:bg-sky-400/15 -z-10 animate-fadeIn" />
                  )}

                  {/* Icon Container with subtle iOS bounce */}
                  <div className={`p-1 rounded-xl transition-all duration-200 ${
                    isActive ? 'scale-105 -translate-y-0.5' : 'group-hover:scale-105'
                  }`}>
                    <Icon className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-colors ${
                      isActive 
                        ? 'stroke-[2.4px] text-sky-600 dark:text-sky-400' 
                        : 'stroke-[1.9px]'
                    }`} />
                  </div>

                  {/* iOS Style Micro Typography */}
                  <span className={`text-[9px] sm:text-[10px] tracking-tight leading-none text-center truncate max-w-[52px] ${
                    isActive
                      ? 'font-bold text-sky-600 dark:text-sky-400'
                      : 'font-medium text-slate-600 dark:text-slate-400'
                  }`}>
                    {item.label}
                  </span>

                  {/* iOS Active Bottom Dot Indicator */}
                  {isActive && (
                    <span className="w-1 h-1 rounded-full bg-sky-600 dark:bg-sky-400 mt-0.5 animate-fadeIn" />
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Iconic iPhone Home Indicator Bar */}
        <div className="w-28 sm:w-32 h-1 rounded-full bg-slate-900/35 dark:bg-white/35 mt-1.5 pointer-events-none transition-opacity" />
      </div>
    </div>
  );
};

