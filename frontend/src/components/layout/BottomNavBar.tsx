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
          className="pointer-events-auto w-full relative rounded-[26px] sm:rounded-[28px] bg-[#d7ece6]/92 backdrop-blur-2xl saturate-150 border border-white/80 dark:border-[#91baaf]/50 shadow-[0_14px_36px_rgba(30,70,60,0.16),0_2px_6px_rgba(0,0,0,0.04)] transition-all duration-300 p-1 sm:p-1.5"
        >
          {/* Subtle Specular Top Sheen (iOS Dynamic Island & Dock signature) */}
          <div className="absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none" />

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
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-b from-[#18483d] to-[#0f322a] text-white flex items-center justify-center shadow-lg shadow-[#18483d]/25 group-hover:scale-105 group-active:scale-90 transition-all duration-200 border border-white/20">
                      <Plus className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.6px]" />
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-bold text-[#143e34] mt-0.5 tracking-tight leading-none">
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
                      ? 'text-[#103a30] font-bold'
                      : 'text-[#385e54] hover:text-[#0d2620]'
                  } group-active:scale-90`}
                  title={item.label}
                  aria-label={item.label}
                >
                  {/* iOS Active Selection Pill Backing */}
                  {isActive && (
                    <span className="absolute inset-0 rounded-2xl bg-[#91baaf]/40 border border-[#91baaf]/50 -z-10 animate-fadeIn" />
                  )}

                  {/* Icon Container with subtle iOS bounce */}
                  <div className={`p-1 rounded-xl transition-all duration-200 ${
                    isActive ? 'scale-105 -translate-y-0.5' : 'group-hover:scale-105'
                  }`}>
                    <Icon className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-colors ${
                      isActive 
                        ? 'stroke-[2.5px] text-[#103a30]' 
                        : 'stroke-[1.9px]'
                    }`} />
                  </div>

                  {/* iOS Style Micro Typography */}
                  <span className={`text-[9px] sm:text-[10px] tracking-tight leading-none text-center truncate max-w-[52px] ${
                    isActive
                      ? 'font-extrabold text-[#103a30]'
                      : 'font-medium text-[#30594f]'
                  }`}>
                    {item.label}
                  </span>

                  {/* iOS Active Bottom Dot Indicator */}
                  {isActive && (
                    <span className="w-1 h-1 rounded-full bg-[#103a30] mt-0.5 animate-fadeIn" />
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Iconic iPhone Home Indicator Bar */}
        <div className="w-28 sm:w-32 h-1 rounded-full bg-[#1e453c]/40 mt-1.5 pointer-events-none transition-opacity" />
      </div>
    </div>
  );
};

