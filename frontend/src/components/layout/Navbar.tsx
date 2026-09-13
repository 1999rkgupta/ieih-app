import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  Volume2, 
  VolumeX, 
  Zap, 
  Search, 
  ChevronDown,
  Sun,
  Moon,
  Bell,
  CheckCheck,
  Clock,
  Menu,
  X,
  Home,
  User,
  Radar,
  Trophy,
  GraduationCap,
  Briefcase,
  Bot,
  ArrowRight,
  Users,
  Plus
} from 'lucide-react';
import { PlayerPassport } from '../../types';
import { soundManager } from '../../utils/audio';
import { MOCK_TICKER_ITEMS } from '../../data/mockData';
import { useTheme } from '../../context/ThemeContext';
import { IEIHLogo } from '../common/IEIHLogo';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  currentUser: PlayerPassport;
  allPlayers: PlayerPassport[];
  onSwitchUser: (player: PlayerPassport) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  currentUser,
  allPlayers,
  onSwitchUser,
  onOpenSearch
}) => {
  const { theme, toggleTheme } = useTheme();
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);
  const [mobileSwitchUserOpen, setMobileSwitchUserOpen] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);
  const notifRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const all7Keys = [
    { id: 'home', label: 'Home', subtitle: 'Command Center & Live Radar', icon: Home },
    { id: 'passport', label: 'E-Player Passport', subtitle: 'Verified Esports Identity & Stats', icon: User },
    { id: 'discovery', label: 'Talent Radar', subtitle: 'Scouting & Player Discovery', icon: Radar },
    { id: 'tournaments', label: 'Tournaments', subtitle: 'National Cups & Verified Brackets', icon: Trophy },
    { id: 'campus', label: 'Campus Network', subtitle: '250+ Inter-University Chapters', icon: GraduationCap },
    { id: 'careers', label: 'Careers Board', subtitle: 'Pro Team & Production Contracts', icon: Briefcase },
    { id: 'ai', label: 'EE AI Companion', subtitle: 'Tactical Coaching & VOD Insights', icon: Bot },
  ];

  // Lock body scroll when mobile menu drawer is open
  useEffect(() => {
    if (menuDrawerOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [menuDrawerOpen]);

  // Click outside to close desktop menu drawer
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        if (window.innerWidth >= 768) {
          setMenuDrawerOpen(false);
        }
      }
    };
    if (menuDrawerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuDrawerOpen]);

  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Skyesports Grand Slam: Round 2 Match',
      desc: 'Check in for your Swiss-stage match starting in 30 mins.',
      time: '15m ago',
      unread: true,
      tag: 'Tournament',
      tagColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
      actionTab: 'tournaments'
    },
    {
      id: 'notif-2',
      title: 'IIT Bombay Esports: Tryout Invitation',
      desc: 'Team Captain sent an official invite for collegiate scrims.',
      time: '1h ago',
      unread: true,
      tag: 'Campus',
      tagColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
      actionTab: 'campus'
    },
    {
      id: 'notif-3',
      title: 'Trust Escrow Verified: ₹25 Lakhs Locked',
      desc: 'Krafton India Series escrow guarantee approved by auditor.',
      time: '3h ago',
      unread: true,
      tag: 'Security',
      tagColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      actionTab: 'tournaments'
    },
    {
      id: 'notif-4',
      title: 'EE AI Companion: Aim Telemetry Ready',
      desc: 'Weekly clutch conversion & radar benchmark analysis generated.',
      time: 'Yesterday',
      unread: false,
      tag: 'AI Coach',
      tagColor: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
      actionTab: 'ai'
    }
  ]);

  // Click outside to close notifications dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    if (notificationsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [notificationsOpen]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleMarkAllRead = () => {
    soundManager.playSuccessBeep();
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

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

  // Shared Menu Content (Used in both Mobile Drawer & Desktop Dropdown)
  const renderMenuContent = (isMobile = false) => (
    <>
      {/* 1. Athlete Profile Section */}
      <div className="p-3 rounded-2xl bg-white/80 dark:bg-[#14221e]/90 border border-[#91baaf]/40 dark:border-[#91baaf]/25 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-[#91baaf]/40 dark:border-[#91baaf]/30 bg-[#153e34] dark:bg-[#1b2f29] flex items-center justify-center">
              {currentUser.avatarUrl ? (
                <img src={currentUser.avatarUrl} alt={currentUser.gamerTag} className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs font-bold font-mono text-[#91baaf]">
                  {currentUser.gamerTag.slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs text-[#0d2620] dark:text-white truncate">
                  {currentUser.gamerTag}
                </span>
                <span className="px-1.5 py-0.2 rounded bg-[#dff1ec] dark:bg-[#1a2d27] text-[9px] font-mono font-bold text-[#0d2620] dark:text-white shrink-0">
                  L{currentUser.level}
                </span>
              </div>
              <p className="text-[10px] text-[#30594f] dark:text-[#88b5a9] truncate">
                {currentUser.primaryGame} • {currentUser.primaryRole}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClickSound();
              onNavigate('passport');
              setMenuDrawerOpen(false);
            }}
            className="px-2.5 py-1.5 bg-[#153e34] dark:bg-[#91baaf] text-white dark:text-[#090e0c] text-[10px] font-bold rounded-xl shrink-0 shadow-xs hover:opacity-90 transition-opacity cursor-pointer"
          >
            View Passport
          </button>
        </div>

        {/* Athlete Switcher Collapsible Accordion */}
        <div className="pt-2 border-t border-[#91baaf]/20 dark:border-[#91baaf]/15">
          <button
            onClick={() => setMobileSwitchUserOpen(!mobileSwitchUserOpen)}
            className="w-full flex items-center justify-between text-[11px] font-semibold text-[#285b50] dark:text-[#91baaf] hover:text-[#0d2620] dark:hover:text-white transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              <span>Switch Athlete ({allPlayers.length})</span>
            </span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${mobileSwitchUserOpen ? 'rotate-180' : ''}`} />
          </button>

          {mobileSwitchUserOpen && (
            <div className="mt-2 space-y-1.5 max-h-44 overflow-y-auto pt-1 animate-fadeIn">
              {allPlayers.map(p => (
                <button
                  key={p.id}
                  onClick={() => {
                    soundManager.playSuccessBeep();
                    onSwitchUser(p);
                    setMobileSwitchUserOpen(false);
                    if (isMobile) setMenuDrawerOpen(false);
                  }}
                  className={`w-full p-2 rounded-xl text-left flex items-center justify-between text-xs transition-all cursor-pointer ${
                    p.id === currentUser.id
                      ? 'bg-[#91baaf]/30 dark:bg-[#91baaf]/20 text-[#103a30] dark:text-[#91baaf] font-bold border border-[#91baaf]/40'
                      : 'bg-white/50 dark:bg-white/5 hover:bg-white text-[#285045] dark:text-[#afd2c6]'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-5 h-5 rounded-full overflow-hidden shrink-0 border border-[#91baaf]/30 bg-[#153e34] dark:bg-[#1b2f29] flex items-center justify-center">
                      {p.avatarUrl ? (
                        <img src={p.avatarUrl} alt={p.gamerTag} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-[8px] font-bold font-mono text-[#91baaf]">
                          {p.gamerTag.slice(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <span className="truncate text-xs">{p.gamerTag}</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#3d655a] dark:text-[#88b5a9]">L{p.level}</span>
                </button>
              ))}

              <button
                onClick={() => {
                  soundManager.playSuccessBeep();
                  onNavigate('onboarding');
                  setMenuDrawerOpen(false);
                }}
                className="w-full py-1.5 px-2 bg-white dark:bg-white/5 hover:bg-[#91baaf]/20 text-[#153e34] dark:text-[#91baaf] font-semibold text-[11px] rounded-xl text-center border border-dashed border-[#91baaf]/40 transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Mint New Passport</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 2. Quick Mobile Controls: Theme & Sound (Always shown inside menu) */}
      <div className="grid grid-cols-2 gap-2">
        {/* Theme Toggle Button */}
        <button
          onClick={() => {
            soundManager.playClickSound();
            toggleTheme();
          }}
          className="p-2.5 rounded-2xl bg-white/80 dark:bg-[#14221e]/90 border border-[#91baaf]/40 dark:border-[#91baaf]/25 flex items-center gap-2 text-xs font-semibold text-[#0d2620] dark:text-white shadow-xs hover:bg-white dark:hover:bg-[#182b26] transition-all cursor-pointer"
        >
          {theme === 'light' ? (
            <>
              <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 shrink-0">
                <Moon className="w-4 h-4" />
              </div>
              <div className="text-left leading-tight min-w-0">
                <span className="block text-[10px] text-[#3d655a] dark:text-[#88b5a9]">Theme</span>
                <span className="text-xs font-bold truncate">Dark Mode</span>
              </div>
            </>
          ) : (
            <>
              <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
                <Sun className="w-4 h-4" />
              </div>
              <div className="text-left leading-tight min-w-0">
                <span className="block text-[10px] text-[#3d655a] dark:text-[#88b5a9]">Theme</span>
                <span className="text-xs font-bold truncate">Light Mode</span>
              </div>
            </>
          )}
        </button>

        {/* Sound FX Toggle Button */}
        <button
          onClick={handleToggleMute}
          className="p-2.5 rounded-2xl bg-white/80 dark:bg-[#14221e]/90 border border-[#91baaf]/40 dark:border-[#91baaf]/25 flex items-center gap-2 text-xs font-semibold text-[#0d2620] dark:text-white shadow-xs hover:bg-white dark:hover:bg-[#182b26] transition-all cursor-pointer"
        >
          <div className={`p-1.5 rounded-lg shrink-0 ${isMuted ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'}`}>
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </div>
          <div className="text-left leading-tight min-w-0">
            <span className="block text-[10px] text-[#3d655a] dark:text-[#88b5a9]">Sound FX</span>
            <span className="text-xs font-bold truncate">{isMuted ? 'Muted' : 'Enabled'}</span>
          </div>
        </button>
      </div>

      {/* 3. The 7 Keys Navigation List */}
      <div className="space-y-1">
        <div className="px-1 text-[10px] font-bold text-[#30594f] dark:text-[#88b5a9] uppercase tracking-wider">
          Platform Portals (7 Keys)
        </div>

        {all7Keys.map((item, idx) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                soundManager.playClickSound();
                onNavigate(item.id);
                setMenuDrawerOpen(false);
              }}
              className={`w-full p-2.5 rounded-2xl text-left flex items-center justify-between gap-3 transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-[#91baaf]/30 dark:bg-[#91baaf]/20 text-[#103a30] dark:text-[#91baaf] font-bold border border-[#91baaf]/50 dark:border-[#91baaf]/30 shadow-xs'
                  : 'hover:bg-white/80 dark:hover:bg-white/5 text-[#285045] dark:text-[#afd2c6] border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  isActive
                    ? 'bg-[#153e34] dark:bg-[#91baaf] text-white dark:text-[#090e0c] shadow-sm'
                    : 'bg-[#91baaf]/20 dark:bg-[#91baaf]/15 text-[#153e34] dark:text-[#afd2c6]'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>

                <div className="truncate min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-[#0d2620] dark:text-white truncate">
                      {item.label}
                    </span>
                    <span className="text-[9px] font-mono text-[#3d655a] dark:text-[#88b5a9]">#{idx + 1}</span>
                  </div>
                  <p className="text-[10px] text-[#3d655a] dark:text-[#88b5a9] truncate mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <ArrowRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                isActive ? 'text-[#153e34] dark:text-[#91baaf] translate-x-0.5' : 'text-[#3d655a] dark:text-[#88b5a9] opacity-50'
              }`} />
            </button>
          );
        })}
      </div>
    </>
  );

  return (
    <header className="shrink-0 z-40 w-full bg-[#d7ece6]/95 dark:bg-[#0c1412]/95 backdrop-blur-2xl border-b border-[#91baaf]/40 dark:border-[#91baaf]/20 transition-colors duration-200 shadow-xs">
      {/* Top Ticker Bar */}
      <div className="border-b border-[#91baaf]/25 dark:border-[#91baaf]/15 py-1.5 px-3 sm:px-8 flex items-center justify-between text-xs bg-[#c9e8df]/90 dark:bg-[#09100e]/90 backdrop-blur-md overflow-hidden">
        <div className="flex items-center gap-2 min-w-0 overflow-hidden">
          <span className="px-2 py-0.5 bg-rose-500/15 text-rose-700 dark:text-rose-400 font-semibold text-[9px] sm:text-[10px] rounded-full flex items-center gap-1 shrink-0 border border-rose-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
            LIVE
          </span>
          <p className="text-[#153e34] dark:text-[#afd2c6] truncate font-normal text-[11px] sm:text-xs transition-all duration-700 min-w-0">
            {MOCK_TICKER_ITEMS[tickerIndex]}
          </p>
        </div>

        <div className="hidden md:flex items-center gap-3 text-[11px] text-[#30594f] dark:text-[#88b5a9] shrink-0 pl-4 font-mono">
          <span className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-400 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-500"></span> 18ms Mumbai
          </span>
          <span className="text-[#91baaf] dark:text-[#91baaf]/30">•</span>
          <span className="text-[#30594f] dark:text-[#88b5a9]">Protocol v2.6</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Top-Left: Logo */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
          <div
            onClick={() => {
              soundManager.playClickSound();
              onNavigate('home');
            }}
            className="cursor-pointer group shrink-0"
          >
            <IEIHLogo size="sm" className="sm:hidden" animate />
            <IEIHLogo size="md" className="hidden sm:inline-flex" animate />
          </div>

          <div className="h-6 w-px bg-[#91baaf]/30 dark:bg-[#91baaf]/20 hidden md:block"></div>

          {/* Desktop Profile Badge (Hidden on Mobile, moved to Hamburger Menu) */}
          <div className="relative hidden md:flex items-center">
            <button
              onClick={() => {
                soundManager.playClickSound();
                onNavigate('passport');
              }}
              className={`flex items-center gap-2 py-1 pl-1.5 pr-2.5 rounded-full border transition-all duration-200 select-none cursor-pointer ${
                currentTab === 'passport'
                  ? 'bg-[#153e34] dark:bg-[#91baaf] text-white dark:text-[#090e0c] border-transparent shadow-sm'
                  : 'bg-white/90 dark:bg-[#121c19]/90 hover:bg-white dark:hover:bg-[#162521] border-[#91baaf]/40 dark:border-[#91baaf]/25 text-[#0d2620] dark:text-[#e4f3ef] shadow-sm'
              }`}
              title="View Profile"
            >
              <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 border border-[#91baaf]/40 dark:border-[#91baaf]/30 bg-[#153e34] dark:bg-[#1b2f29] flex items-center justify-center">
                {currentUser.avatarUrl ? (
                  <img src={currentUser.avatarUrl} alt={currentUser.gamerTag} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[10px] font-bold font-mono text-[#91baaf]">
                    {currentUser.gamerTag.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="text-left leading-tight">
                <span className="text-xs font-bold tracking-tight block truncate max-w-[100px] text-[#0d2620] dark:text-white">
                  {currentUser.gamerTag}
                </span>
                <span className={`text-[9px] font-semibold block ${
                  currentTab === 'passport'
                    ? 'text-[#91baaf] dark:text-[#090e0c]'
                    : 'text-[#236052] dark:text-[#91baaf]'
                }`}>
                  Profile
                </span>
              </div>
            </button>

            {/* Quick Switch Dropdown Trigger (Desktop) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                soundManager.playClickSound();
                setUserDropdownOpen(!userDropdownOpen);
              }}
              className="p-1 ml-0.5 rounded-full hover:bg-[#91baaf]/25 dark:hover:bg-[#91baaf]/20 text-[#285348] dark:text-[#afd2c6] transition-colors cursor-pointer"
              title="Switch Athlete"
              aria-label="Switch athlete"
            >
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Desktop Profile Dropdown */}
            {userDropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-64 bg-[#f2faf7] dark:bg-[#0f1916] border border-[#91baaf]/40 dark:border-[#91baaf]/25 rounded-2xl shadow-xl p-2 z-50 animate-fadeIn">
                <div className="px-3 py-2 text-[11px] font-semibold text-[#30594f] dark:text-[#88b5a9] uppercase tracking-wider border-b border-[#91baaf]/30 dark:border-[#91baaf]/20 flex items-center justify-between">
                  <span>Switch Athlete</span>
                  <span className="text-[10px] text-[#236052] dark:text-[#91baaf] font-mono font-medium">{allPlayers.length} Active</span>
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
                      className={`w-full px-2.5 py-1.5 rounded-xl text-left flex items-center gap-2.5 text-xs transition-all cursor-pointer ${
                        p.id === currentUser.id
                          ? 'bg-[#91baaf]/25 dark:bg-[#91baaf]/20 text-[#133c32] dark:text-[#91baaf] font-semibold'
                          : 'hover:bg-white dark:hover:bg-white/5 text-[#0d2620] dark:text-[#e4f3ef]'
                      }`}
                    >
                      <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 border border-[#91baaf]/30 dark:border-[#91baaf]/20 bg-[#153e34] dark:bg-[#1b2f29] flex items-center justify-center">
                        {p.avatarUrl ? (
                          <img src={p.avatarUrl} alt={p.gamerTag} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-[9px] font-bold font-mono text-[#91baaf]">
                            {p.gamerTag.slice(0, 2).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div className="truncate flex-1 min-w-0">
                        <div className="font-semibold text-xs truncate text-[#0d2620] dark:text-white">{p.gamerTag}</div>
                        <div className="text-[10px] text-[#30594f] dark:text-[#88b5a9]">{p.primaryGame} • {p.primaryRole}</div>
                      </div>
                      <span className="px-1.5 py-0.5 rounded bg-[#dff1ec] dark:bg-[#172722] text-[10px] font-mono font-bold text-[#0d2620] dark:text-white shrink-0">
                        L{p.level}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="pt-2 border-t border-[#91baaf]/30 dark:border-[#91baaf]/20 flex flex-col gap-1">
                  <button
                    onClick={() => {
                      soundManager.playClickSound();
                      setUserDropdownOpen(false);
                      onNavigate('passport');
                    }}
                    className="w-full py-1.5 text-[#153e34] dark:text-[#afd2c6] hover:bg-white dark:hover:bg-white/5 font-medium text-xs rounded-xl text-center transition-colors cursor-pointer"
                  >
                    View Full Profile &rarr;
                  </button>
                  <button
                    onClick={() => {
                      soundManager.playSuccessBeep();
                      setUserDropdownOpen(false);
                      onNavigate('onboarding');
                    }}
                    className="w-full py-2 bg-[#153e34] dark:bg-[#91baaf] text-white dark:text-[#090e0c] hover:bg-[#0f2e26] dark:hover:bg-[#7db0a3] font-semibold text-xs rounded-xl text-center shadow-sm transition-colors cursor-pointer"
                  >
                    + Create New Passport
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center: Universal Omnisearch Bar (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-8">
          <button
            onClick={() => {
              soundManager.playClickSound();
              onOpenSearch();
            }}
            className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-[#121c19]/90 hover:bg-white dark:hover:bg-[#162521] text-[#153e34] dark:text-[#afd2c6] border border-[#91baaf]/40 dark:border-[#91baaf]/25 transition-all text-xs group cursor-pointer shadow-xs"
            title="Search across all players, tournaments, colleges, jobs & commands (⌘K)"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-[#286b5c] dark:text-[#91baaf] group-hover:scale-110 transition-transform" />
              <span className="font-medium text-[#1c483d] dark:text-[#afd2c6]">
                Search entire app...
              </span>
            </div>
            <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-[#dcefe9] dark:bg-[#172722] text-[#153e34] dark:text-[#afd2c6] rounded border border-[#91baaf]/40 dark:border-[#91baaf]/30 shadow-2xs">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Search Button (Mobile Only) */}
          <button
            onClick={() => {
              soundManager.playClickSound();
              onOpenSearch();
            }}
            className="md:hidden p-2 rounded-full border border-[#91baaf]/40 dark:border-[#91baaf]/25 bg-white/90 dark:bg-[#121c19]/90 hover:bg-white dark:hover:bg-[#162521] text-[#153e34] dark:text-[#afd2c6] shadow-sm transition-all cursor-pointer"
            title="Search app (⌘K)"
            aria-label="Open search"
          >
            <Search className="w-4 h-4 text-[#286b5c] dark:text-[#91baaf]" />
          </button>

          {/* Notifications Dropdown Container */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => {
                soundManager.playClickSound();
                setNotificationsOpen(!notificationsOpen);
              }}
              className={`relative p-2 rounded-full border transition-all duration-200 shadow-sm cursor-pointer ${
                notificationsOpen
                  ? 'bg-[#153e34] dark:bg-[#91baaf] text-white dark:text-[#090e0c] border-transparent'
                  : 'border-[#91baaf]/40 dark:border-[#91baaf]/25 bg-white/90 dark:bg-[#121c19]/90 hover:bg-white dark:hover:bg-[#162521] text-[#153e34] dark:text-[#afd2c6]'
              }`}
              title="Notifications"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] px-1 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-[#0c1412] shadow-sm animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Panel */}
            {notificationsOpen && (
              <div className="absolute right-0 top-full mt-2 w-[calc(100vw-2rem)] max-w-sm sm:w-96 bg-[#f2faf7] dark:bg-[#0f1916] border border-[#91baaf]/40 dark:border-[#91baaf]/25 rounded-2xl shadow-2xl overflow-hidden z-50 animate-fadeIn">
                {/* Header */}
                <div className="p-3.5 border-b border-[#91baaf]/30 dark:border-[#91baaf]/20 flex items-center justify-between bg-[#e5f5f0] dark:bg-[#13201c]">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-[#0d2620] dark:text-white uppercase tracking-wider">
                      Notifications
                    </span>
                    {unreadCount > 0 && (
                      <span className="px-1.5 py-0.2 text-[10px] font-bold bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20 rounded-full">
                        {unreadCount} new
                      </span>
                    )}
                  </div>

                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllRead}
                      className="text-[11px] font-semibold text-[#286b5c] dark:text-[#91baaf] hover:text-[#153e34] dark:hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      <span>Mark all read</span>
                    </button>
                  )}
                </div>

                {/* Notification Items List */}
                <div className="max-h-80 overflow-y-auto divide-y divide-[#91baaf]/20 dark:divide-[#91baaf]/15 p-1.5">
                  {notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => {
                        soundManager.playClickSound();
                        setNotifications(prev => prev.map(item => item.id === n.id ? { ...item, unread: false } : item));
                        onNavigate(n.actionTab);
                        setNotificationsOpen(false);
                      }}
                      className={`p-3 rounded-xl cursor-pointer transition-all flex items-start gap-3 ${
                        n.unread
                          ? 'bg-[#91baaf]/20 dark:bg-[#91baaf]/15 hover:bg-[#91baaf]/30'
                          : 'hover:bg-white/60 dark:hover:bg-white/5 opacity-85'
                      }`}
                    >
                      <div className="w-2 h-2 rounded-full mt-1.5 shrink-0 bg-[#286b5c] dark:bg-[#91baaf]" style={{ visibility: n.unread ? 'visible' : 'hidden' }}></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${n.tagColor}`}>
                            {n.tag}
                          </span>
                          <span className="text-[10px] text-[#3d655a] dark:text-[#88b5a9] font-mono flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5" />
                            {n.time}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-[#0d2620] dark:text-white truncate">
                          {n.title}
                        </h4>
                        <p className="text-[11px] text-[#285045] dark:text-[#a0c7bd] line-clamp-2 mt-0.5 leading-snug">
                          {n.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="p-2 border-t border-[#91baaf]/30 dark:border-[#91baaf]/20 bg-[#e5f5f0] dark:bg-[#13201c] text-center">
                  <span className="text-[10px] text-[#3d655a] dark:text-[#88b5a9] font-mono">
                    All notifications verified by IEIH Trust Protocol
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Theme Switcher (Hidden on mobile, inside Hamburger Menu) */}
          <button
            onClick={() => {
              soundManager.playClickSound();
              toggleTheme();
            }}
            className="hidden md:flex p-2 rounded-full border border-[#91baaf]/40 dark:border-[#91baaf]/25 bg-white/90 dark:bg-[#121c19]/90 hover:bg-white dark:hover:bg-[#162521] text-[#153e34] dark:text-[#afd2c6] shadow-sm transition-all duration-200 cursor-pointer"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 text-[#153e34]" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {/* Desktop Sound Toggle (Hidden on mobile, inside Hamburger Menu) */}
          <button
            onClick={handleToggleMute}
            className="hidden md:flex p-2 rounded-full border border-[#91baaf]/40 dark:border-[#91baaf]/25 bg-white/90 dark:bg-[#121c19]/90 hover:bg-white dark:hover:bg-[#162521] text-[#153e34] dark:text-[#afd2c6] shadow-sm transition-all duration-200 cursor-pointer"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-[#3d655a] dark:text-[#88b5a9]" /> : <Volume2 className="w-4 h-4 text-[#286b5c] dark:text-[#91baaf]" />}
          </button>

          {/* Hamburger Menu Button */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => {
                soundManager.playClickSound();
                setMenuDrawerOpen(!menuDrawerOpen);
              }}
              className={`p-2 rounded-full border transition-all duration-200 shadow-sm flex items-center justify-center cursor-pointer ${
                menuDrawerOpen
                  ? 'bg-[#153e34] dark:bg-[#91baaf] text-white dark:text-[#090e0c] border-transparent scale-105'
                  : 'border-[#91baaf]/40 dark:border-[#91baaf]/25 bg-white/90 dark:bg-[#121c19]/90 hover:bg-white dark:hover:bg-[#162521] text-[#153e34] dark:text-[#afd2c6]'
              }`}
              title="Menu (Navigation, Profile & Settings)"
              aria-label="Toggle navigation menu"
            >
              {menuDrawerOpen ? (
                <X className="w-4 h-4 transition-transform duration-200" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>

            {/* Desktop Dropdown Panel (Anchored to Hamburger on md+ screens) */}
            {menuDrawerOpen && (
              <div className="hidden md:flex absolute right-0 top-full mt-2 w-84 max-h-[80vh] bg-[#f2faf7] dark:bg-[#0f1916] border border-[#91baaf]/40 dark:border-[#91baaf]/25 rounded-3xl shadow-2xl overflow-hidden z-50 flex-col animate-fadeIn">
                {/* Desktop Drawer Header */}
                <div className="p-3.5 border-b border-[#91baaf]/30 dark:border-[#91baaf]/20 flex items-center justify-between bg-[#e5f5f0] dark:bg-[#13201c] shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-[#0d2620] dark:text-white uppercase tracking-wider">
                      Navigation Menu
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-[#91baaf]/30 dark:bg-[#91baaf]/20 text-[#153e34] dark:text-[#91baaf] border border-[#91baaf]/50 dark:border-[#91baaf]/30 rounded-full">
                      7 Keys
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#3d655a] dark:text-[#88b5a9]">v2.6</span>
                </div>

                {/* Desktop Scrollable Body */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3.5">
                  {renderMenuContent(false)}
                </div>

                {/* Desktop Drawer Footer */}
                <div className="p-3 border-t border-[#91baaf]/30 dark:border-[#91baaf]/20 bg-[#e5f5f0] dark:bg-[#13201c] shrink-0">
                  <button
                    onClick={() => {
                      soundManager.playSuccessBeep();
                      onNavigate('onboarding');
                      setMenuDrawerOpen(false);
                    }}
                    className="w-full py-2.5 px-3 bg-[#153e34] dark:bg-[#91baaf] text-white dark:text-[#090e0c] hover:bg-[#0f2e26] dark:hover:bg-[#7db0a3] font-semibold text-xs rounded-2xl flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>+ Mint New E-Player Passport</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE FULL-SCREEN SLIDING DRAWER VIA PORTAL (Completely solves z-index, backdrop-blur stacking context & height issues on mobile) */}
      {menuDrawerOpen && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9999] flex justify-end md:hidden">
          {/* Full Screen Dark Backdrop */}
          <div 
            onClick={() => setMenuDrawerOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity animate-fadeIn cursor-pointer"
          />

          {/* Full-Height Drawer Sheet */}
          <div className="relative z-10 w-full max-w-[340px] sm:max-w-sm h-full max-h-[100dvh] bg-[#f2faf7] dark:bg-[#0c1512] border-l border-[#91baaf]/40 dark:border-[#91baaf]/25 shadow-2xl flex flex-col overflow-hidden animate-slideLeft">
            {/* Mobile Header */}
            <div className="p-4 border-b border-[#91baaf]/30 dark:border-[#91baaf]/20 flex items-center justify-between bg-[#e5f5f0] dark:bg-[#13201c] shrink-0">
              <div className="flex items-center gap-2">
                <IEIHLogo size="xs" showText={false} />
                <div>
                  <span className="font-bold text-xs text-[#0d2620] dark:text-white uppercase tracking-wider block leading-tight">
                    Navigation & Settings
                  </span>
                  <span className="text-[10px] font-mono text-[#3d655a] dark:text-[#88b5a9]">
                    IEIH Protocol v2.6
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  soundManager.playClickSound();
                  setMenuDrawerOpen(false);
                }}
                className="p-1.5 rounded-full bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 text-[#153e34] dark:text-[#afd2c6] transition-colors cursor-pointer shadow-xs"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3.5 pb-24">
              {renderMenuContent(true)}
            </div>

            {/* Mobile Footer CTA */}
            <div className="p-3 border-t border-[#91baaf]/30 dark:border-[#91baaf]/20 bg-[#e5f5f0] dark:bg-[#13201c] shrink-0 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              <button
                onClick={() => {
                  soundManager.playSuccessBeep();
                  onNavigate('onboarding');
                  setMenuDrawerOpen(false);
                }}
                className="w-full py-3 px-3 bg-[#153e34] dark:bg-[#91baaf] text-white dark:text-[#090e0c] hover:bg-[#0f2e26] dark:hover:bg-[#7db0a3] font-bold text-xs rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer active:scale-95"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>+ Mint New E-Player Passport</span>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
};

export default Navbar;
