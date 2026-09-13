import React, { useState, useEffect, useRef, useCallback } from 'react';
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

const AUTO_HIDE_DELAY = 2000; // 2 seconds of inactivity before disappearing

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentTab,
  onNavigate,
  onOpenPost
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHoveringRef = useRef(false);

  const resetHideTimer = useCallback(() => {
    // Show immediately
    setIsVisible(true);

    // Don't start timer if currently hovering the nav
    if (isHoveringRef.current) return;

    // Clear existing timer
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }

    // Start 2-second countdown to auto-hide
    hideTimerRef.current = setTimeout(() => {
      if (!isHoveringRef.current) {
        setIsVisible(false);
      }
    }, AUTO_HIDE_DELAY);
  }, []);

  useEffect(() => {
    const events = ['mousemove', 'touchstart', 'touchmove', 'scroll', 'keydown'];

    events.forEach(evt => window.addEventListener(evt, resetHideTimer, { passive: true, capture: true }));

    // Start initial 2s timer
    resetHideTimer();

    return () => {
      events.forEach(evt => window.removeEventListener(evt, resetHideTimer, true));
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [resetHideTimer]);

  const handleNavMouseEnter = () => {
    isHoveringRef.current = true;
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    setIsVisible(true);
  };

  const handleNavMouseLeave = () => {
    isHoveringRef.current = false;
    resetHideTimer();
  };

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
    <div 
      onMouseEnter={handleNavMouseEnter}
      onMouseLeave={handleNavMouseLeave}
      className={`fixed bottom-0 inset-x-0 z-40 select-none pb-[max(0.5rem,env(safe-area-inset-bottom))] px-2 sm:px-4 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-6 pointer-events-none'
      }`}
    >
      <div className="w-full max-w-[calc(100vw-0.75rem)] sm:max-w-xl mx-auto flex flex-col items-center">
        {/* iPhone Floating Glass Dock */}
        <nav 
          aria-label="Mobile Navigation Dock"
          className="w-full relative rounded-[22px] sm:rounded-[28px] bg-[#d7ece6]/95 dark:bg-[#0d1614]/95 backdrop-blur-2xl saturate-150 border border-white/80 dark:border-[#91baaf]/30 shadow-[0_12px_36px_rgba(20,50,45,0.18),0_2px_6px_rgba(0,0,0,0.06)] dark:shadow-[0_18px_45px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(145,186,175,0.2)] transition-all duration-300 p-1 sm:p-1.5 overflow-hidden"
        >
          {/* Subtle Specular Top Sheen */}
          <div className="absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/90 dark:via-white/25 to-transparent pointer-events-none" />

          <div className="flex items-center justify-between gap-0 sm:gap-1">
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
                    className="relative flex-1 min-w-0 flex flex-col items-center justify-center p-0.5 sm:p-1 group cursor-pointer focus:outline-none shrink-0"
                    title="Create Hub Post"
                    aria-label="Create Post"
                  >
                    {/* iOS Action / Elevated Button */}
                    <div className="w-7 h-7 min-[360px]:w-8 min-[360px]:h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#18483d] to-[#0f322a] dark:from-[#91baaf] dark:to-[#71a396] text-white dark:text-[#090e0c] flex items-center justify-center shadow-md shadow-[#18483d]/25 dark:shadow-[#91baaf]/20 group-hover:scale-105 group-active:scale-95 transition-all duration-200 border border-white/20 dark:border-white/30">
                      <Plus className="w-4 h-4 min-[360px]:w-4.5 min-[360px]:h-4.5 sm:w-5 sm:h-5 stroke-[2.6px]" />
                    </div>
                    <span className="text-[7.5px] min-[360px]:text-[8px] sm:text-[9.5px] font-bold text-[#143e34] dark:text-[#afd2c6] mt-0.5 tracking-tight leading-none truncate max-w-full">
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
                  className={`relative flex-1 min-w-0 py-0.5 sm:py-1.5 px-0.5 flex flex-col items-center justify-center rounded-xl sm:rounded-2xl transition-all duration-200 group cursor-pointer focus:outline-none shrink-0 ${
                    isActive
                      ? 'text-[#103a30] dark:text-[#91baaf] font-bold'
                      : 'text-[#385e54] dark:text-[#80ada2] hover:text-[#0d2620] dark:hover:text-white'
                  } group-active:scale-95`}
                  title={item.label}
                  aria-label={item.label}
                >
                  {/* Active Selection Pill Backing */}
                  {isActive && (
                    <span className="absolute inset-0 rounded-xl sm:rounded-2xl bg-[#91baaf]/40 dark:bg-[#91baaf]/20 border border-[#91baaf]/50 dark:border-[#91baaf]/35 -z-10 animate-fadeIn" />
                  )}

                  {/* Icon Container */}
                  <div className={`p-0.5 sm:p-1 rounded-lg transition-all duration-200 ${
                    isActive ? 'scale-105 -translate-y-0.5' : 'group-hover:scale-105'
                  }`}>
                    <Icon className={`w-3.5 h-3.5 min-[360px]:w-4 min-[360px]:h-4 sm:w-4.5 sm:h-4.5 transition-colors ${
                      isActive 
                        ? 'stroke-[2.5px] text-[#103a30] dark:text-[#91baaf]' 
                        : 'stroke-[1.9px]'
                    }`} />
                  </div>

                  {/* Micro Typography */}
                  <span className={`text-[7px] min-[360px]:text-[8px] min-[400px]:text-[8.5px] sm:text-[9.5px] tracking-tight leading-none text-center truncate max-w-full px-0.5 ${
                    isActive
                      ? 'font-extrabold text-[#103a30] dark:text-[#91baaf]'
                      : 'font-medium text-[#30594f] dark:text-[#80ada2]'
                  }`}>
                    {item.label}
                  </span>

                  {/* Active Bottom Dot */}
                  {isActive && (
                    <span className="w-1 h-1 rounded-full bg-[#103a30] dark:bg-[#91baaf] mt-0.5 animate-fadeIn" />
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* iPhone Home Indicator Bar */}
        <div className="w-24 sm:w-32 h-1 rounded-full bg-[#1e453c]/30 dark:bg-[#91baaf]/30 mt-1 pointer-events-none transition-opacity" />
      </div>
    </div>
  );
};

export default BottomNavBar;
