import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Volume2, 
  VolumeX, 
  Zap, 
  Menu, 
  X, 
  Home, 
  Trophy, 
  Search, 
  User, 
  GraduationCap, 
  Briefcase, 
  Bot,
  ChevronDown,
  Sun,
  Moon
} from 'lucide-react';
import { PlayerPassport } from '../../types';
import { soundManager } from '../../utils/audio';
import { MOCK_TICKER_ITEMS } from '../../data/mockData';
import { useTheme } from '../../context/ThemeContext';
import { IEIHLogo } from '../common/IEIHLogo';
import { InstagramAvatar } from '../common/InstagramAvatar';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  currentUser: PlayerPassport;
  allPlayers: PlayerPassport[];
  onSwitchUser: (player: PlayerPassport) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  currentUser,
  allPlayers,
  onSwitchUser
}) => {
  const { theme, toggleTheme } = useTheme();
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);

  // Live ticker rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex(prev => (prev + 1) % MOCK_TICKER_ITEMS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleToggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'discovery', label: 'Talent Radar', icon: Search },
    { id: 'tournaments', label: 'Tournaments', icon: Trophy },
    { id: 'campus', label: 'Campus', icon: GraduationCap },
    { id: 'careers', label: 'Careers', icon: Briefcase },
    { id: 'ai', label: 'EE AI', icon: Bot },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 dark:bg-[#090c13]/85 backdrop-blur-2xl border-b border-slate-200/80 dark:border-white/10 transition-colors duration-200">
      {/* Top Ticker Bar */}
      <div className="border-b border-slate-200/60 dark:border-white/5 py-1.5 px-4 sm:px-8 flex items-center justify-between text-xs bg-slate-50/80 dark:bg-[#070a12]/80 backdrop-blur-md">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <span className="px-2.5 py-0.5 bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold text-[10px] rounded-full flex items-center gap-1.5 shrink-0 border border-rose-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
            LIVE BROADCAST
          </span>
          <p className="text-slate-600 dark:text-slate-300 truncate font-normal text-xs transition-all duration-700">
            {MOCK_TICKER_ITEMS[tickerIndex]}
          </p>
        </div>

        <div className="hidden md:flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 shrink-0 pl-4 font-mono">
          <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 18ms Mumbai
          </span>
          <span className="text-slate-300 dark:text-white/20">•</span>
          <span className="text-slate-500 dark:text-slate-400">Protocol v2.6</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Top-Left: Logo & LinkedIn-Style Profile Badge */}
        <div className="flex items-center gap-3 shrink-0">
          <div
            onClick={() => {
              soundManager.playClickSound();
              onNavigate('home');
            }}
            className="cursor-pointer group shrink-0"
          >
            <IEIHLogo size="md" animate />
          </div>

          <div className="h-6 w-px bg-slate-200 dark:bg-white/10 hidden sm:block"></div>

          {/* LinkedIn-Style Top-Left Profile Element */}
          <div className="relative flex items-center">
            <button
              onClick={() => {
                soundManager.playClickSound();
                onNavigate('passport');
              }}
              className={`flex items-center gap-2 py-1 pl-1 pr-2.5 rounded-full border transition-all duration-200 select-none ${
                currentTab === 'passport'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-transparent shadow-sm'
                  : 'bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 shadow-sm'
              }`}
              title="View Profile"
            >
              <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-slate-300 dark:border-white/20">
                <InstagramAvatar size="sm" className="w-full h-full" />
              </div>
              <div className="text-left leading-tight hidden xs:block">
                <span className="text-xs font-bold tracking-tight block truncate max-w-[100px]">
                  {currentUser.gamerTag}
                </span>
                <span className={`text-[9px] font-semibold block ${
                  currentTab === 'passport'
                    ? 'text-sky-300 dark:text-sky-600'
                    : 'text-sky-600 dark:text-sky-400'
                }`}>
                  Profile
                </span>
              </div>
            </button>

            {/* Quick Switch Dropdown Trigger */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                soundManager.playClickSound();
                setUserDropdownOpen(!userDropdownOpen);
              }}
              className="p-1 ml-0.5 rounded-full hover:bg-slate-200/60 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 transition-colors"
              title="Switch Athlete"
              aria-label="Switch athlete"
            >
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu (Anchored to Top-Left Profile) */}
            {userDropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-64 bg-white dark:bg-[#111726] border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl p-2 z-50 animate-fadeIn">
                <div className="px-3 py-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200/80 dark:border-white/10 flex items-center justify-between">
                  <span>Switch Athlete</span>
                  <span className="text-[10px] text-sky-500 font-mono font-medium">{allPlayers.length} Active</span>
                </div>
                <div className="py-1 max-h-56 overflow-y-auto space-y-1">
                  {allPlayers.map(p => (
                    <button
                      key={p.id}
                      onClick={() => {
                        soundManager.playSuccessBeep();
                        onSwitchUser(p);
                        setUserDropdownOpen(false);
                      }}
                      className={`w-full p-2 rounded-xl text-left flex items-center gap-2.5 text-xs transition-all ${
                        p.id === currentUser.id
                          ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 font-semibold'
                          : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 border border-slate-200 dark:border-white/10">
                        <InstagramAvatar size="sm" className="w-full h-full" />
                      </div>
                      <div className="truncate">
                        <div className="font-semibold text-xs truncate text-slate-900 dark:text-white">{p.gamerTag}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">{p.primaryGame} • {p.primaryRole}</div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="pt-2 border-t border-slate-200/80 dark:border-white/10 flex flex-col gap-1">
                  <button
                    onClick={() => {
                      soundManager.playClickSound();
                      setUserDropdownOpen(false);
                      onNavigate('passport');
                    }}
                    className="w-full py-1.5 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 font-medium text-xs rounded-xl text-center transition-colors"
                  >
                    View Full Profile &rarr;
                  </button>
                  <button
                    onClick={() => {
                      soundManager.playSuccessBeep();
                      setUserDropdownOpen(false);
                      onNavigate('onboarding');
                    }}
                    className="w-full py-2 bg-slate-900 text-white dark:bg-sky-600 dark:hover:bg-sky-500 hover:bg-slate-800 font-semibold text-xs rounded-xl text-center shadow-sm transition-colors"
                  >
                    + Create New Passport
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center Desktop Nav Items (Spotify-style pill items) */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 dark:bg-white/5 p-1 rounded-full border border-slate-200/80 dark:border-white/10 shadow-sm backdrop-blur-md">
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
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 flex items-center gap-1.5 select-none ${
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* Theme Switcher Toggle */}
          <button
            onClick={() => {
              soundManager.playClickSound();
              toggleTheme();
            }}
            className="p-2 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 shadow-sm transition-all duration-200"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 text-slate-700" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleMute}
            className="p-2 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white shadow-sm transition-all duration-200"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-sky-500" />}
          </button>

          {/* Mint CTA Button */}
          <button
            onClick={() => {
              soundManager.playSuccessBeep();
              onNavigate('onboarding');
            }}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 font-semibold text-xs rounded-full transition-all shadow-sm"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Mint Passport</span>
          </button>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 lg:hidden text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden p-3 bg-white/95 dark:bg-[#111726]/95 backdrop-blur-2xl border-b border-slate-200 dark:border-white/10 space-y-1 animate-fadeIn">
          {/* Mobile Profile Card Link */}
          <button
            onClick={() => {
              soundManager.playClickSound();
              onNavigate('passport');
              setMobileMenuOpen(false);
            }}
            className={`w-full p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all mb-1.5 border ${
              currentTab === 'passport'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold border-transparent'
                : 'bg-slate-100/70 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200'
            }`}
          >
            <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 border border-slate-300 dark:border-white/20">
              <InstagramAvatar size="sm" className="w-full h-full" />
            </div>
            <span>Profile ({currentUser.gamerTag})</span>
          </button>

          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundManager.playClickSound();
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all ${
                  isActive 
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
