import React from 'react';
import { 
  Home, 
  Trophy, 
  GraduationCap, 
  Briefcase, 
  Bot, 
  Radar 
} from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface BottomNavBarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentTab,
  onNavigate
}) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'discovery', label: 'Talent Radar', icon: Radar },
    { id: 'tournaments', label: 'Tournaments', icon: Trophy },
    { id: 'campus', label: 'Campus', icon: GraduationCap },
    { id: 'careers', label: 'Careers', icon: Briefcase },
    { id: 'ai', label: 'EE AI', icon: Bot },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 select-none">
      {/* Ambient top shadow gradient for seamless elevation */}
      <div className="h-4 bg-gradient-to-t from-black/5 dark:from-black/20 to-transparent pointer-events-none"></div>

      {/* Main Bottom Bar Container (Instagram Style) */}
      <nav className="w-full bg-white/92 dark:bg-[#090c13]/92 backdrop-blur-2xl border-t border-slate-200/80 dark:border-white/10 shadow-[0_-4px_25px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_30px_rgba(0,0,0,0.5)] transition-colors duration-200">
        <div className="max-w-2xl mx-auto px-2 sm:px-6 h-16 flex items-center justify-around gap-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  soundManager.playClickSound();
                  onNavigate(item.id);
                }}
                className={`relative flex-1 py-1.5 px-1 flex flex-col items-center justify-center gap-0.5 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'text-sky-600 dark:text-sky-400 font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/60 dark:hover:bg-white/5'
                }`}
              >
                {/* Active Top Glow Pill Indicator */}
                {isActive && (
                  <span className="absolute -top-[1px] w-8 h-[2.5px] rounded-full bg-sky-600 dark:bg-sky-400 shadow-[0_0_8px_rgba(2,132,199,0.6)] animate-fadeIn"></span>
                )}

                {/* Icon Container with subtle scale on active */}
                <div className={`p-1 rounded-lg transition-transform duration-200 ${
                  isActive ? 'scale-110' : 'group-hover:scale-105'
                }`}>
                  <Icon className={`w-5 h-5 transition-colors ${
                    isActive 
                      ? 'stroke-[2.4px] text-sky-600 dark:text-sky-400' 
                      : 'stroke-[1.8px]'
                  }`} />
                </div>

                {/* Label (Instagram Style) */}
                <span className={`text-[10px] sm:text-[11px] tracking-tight leading-none text-center truncate max-w-[70px] ${
                  isActive
                    ? 'font-bold text-slate-900 dark:text-white'
                    : 'font-medium'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
