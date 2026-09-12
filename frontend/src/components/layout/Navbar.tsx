import React, { useState, useEffect, useRef } from 'react';
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
  ArrowRight
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

  // Click outside to close 3-line menu drawer
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuDrawerOpen(false);
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

  return (
    <header className="sticky top-0 z-40 w-full bg-[#d7ece6]/92 dark:bg-[#0c1412]/92 backdrop-blur-2xl border-b border-[#91baaf]/40 dark:border-[#91baaf]/20 transition-colors duration-200 shadow-xs">
      {/* Top Ticker Bar */}
      <div className="border-b border-[#91baaf]/25 dark:border-[#91baaf]/15 py-1.5 px-4 sm:px-8 flex items-center justify-between text-xs bg-[#c9e8df]/90 dark:bg-[#09100e]/90 backdrop-blur-md">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <span className="px-2.5 py-0.5 bg-rose-500/15 text-rose-700 dark:text-rose-400 font-semibold text-[10px] rounded-full flex items-center gap-1.5 shrink-0 border border-rose-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
            LIVE BROADCAST
          </span>
          <p className="text-[#153e34] dark:text-[#afd2c6] truncate font-normal text-xs transition-all duration-700">
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

          <div className="h-6 w-px bg-[#91baaf]/30 dark:bg-[#91baaf]/20 hidden sm:block"></div>

          {/* LinkedIn-Style Top-Left Profile Element */}
          <div className="relative flex items-center">
            <button
              onClick={() => {
                soundManager.playClickSound();
                onNavigate('passport');
              }}
              className={`flex items-center gap-2 py-1 pl-1.5 pr-2.5 rounded-full border transition-all duration-200 select-none ${
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
              <div className="text-left leading-tight hidden xs:block">
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

            {/* Quick Switch Dropdown Trigger */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                soundManager.playClickSound();
                setUserDropdownOpen(!userDropdownOpen);
              }}
              className="p-1 ml-0.5 rounded-full hover:bg-[#91baaf]/25 dark:hover:bg-[#91baaf]/20 text-[#285348] dark:text-[#afd2c6] transition-colors"
              title="Switch Athlete"
              aria-label="Switch athlete"
            >
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu (Anchored to Top-Left Profile) */}
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
                      className={`w-full px-2.5 py-1.5 rounded-xl text-left flex items-center gap-2.5 text-xs transition-all ${
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
                    className="w-full py-1.5 text-[#153e34] dark:text-[#afd2c6] hover:bg-white dark:hover:bg-white/5 font-medium text-xs rounded-xl text-center transition-colors"
                  >
                    View Full Profile &rarr;
                  </button>
                  <button
                    onClick={() => {
                      soundManager.playSuccessBeep();
                      setUserDropdownOpen(false);
                      onNavigate('onboarding');
                    }}
                    className="w-full py-2 bg-[#153e34] dark:bg-[#91baaf] text-white dark:text-[#090e0c] hover:bg-[#0f2e26] dark:hover:bg-[#7db0a3] font-semibold text-xs rounded-xl text-center shadow-sm transition-colors"
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
        <div className="flex items-center gap-2 shrink-0">
          {/* Mobile Search Button */}
          <button
            onClick={() => {
              soundManager.playClickSound();
              onOpenSearch();
            }}
            className="p-2 md:hidden rounded-full border border-[#91baaf]/40 dark:border-[#91baaf]/25 bg-white/90 dark:bg-[#121c19]/90 hover:bg-white dark:hover:bg-[#162521] text-[#153e34] dark:text-[#afd2c6] shadow-sm transition-all"
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
              className={`relative p-2 rounded-full border transition-all duration-200 shadow-sm ${
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
              <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-[#f2faf7] dark:bg-[#0f1916] border border-[#91baaf]/40 dark:border-[#91baaf]/25 rounded-2xl shadow-2xl overflow-hidden z-50 animate-fadeIn">
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
                      className="text-[11px] font-semibold text-[#286b5c] dark:text-[#91baaf] hover:text-[#153e34] dark:hover:text-white flex items-center gap-1 transition-colors"
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

          {/* Theme Switcher Toggle */}
          <button
            onClick={() => {
              soundManager.playClickSound();
              toggleTheme();
            }}
            className="p-2 rounded-full border border-[#91baaf]/40 dark:border-[#91baaf]/25 bg-white/90 dark:bg-[#121c19]/90 hover:bg-white dark:hover:bg-[#162521] text-[#153e34] dark:text-[#afd2c6] shadow-sm transition-all duration-200"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 text-[#153e34]" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleMute}
            className="p-2 rounded-full border border-[#91baaf]/40 dark:border-[#91baaf]/25 bg-white/90 dark:bg-[#121c19]/90 hover:bg-white dark:hover:bg-[#162521] text-[#153e34] dark:text-[#afd2c6] shadow-sm transition-all duration-200"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-[#3d655a] dark:text-[#88b5a9]" /> : <Volume2 className="w-4 h-4 text-[#286b5c] dark:text-[#91baaf]" />}
          </button>

          {/* 3-Line Menu Button with All 7 Keys */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => {
                soundManager.playClickSound();
                setMenuDrawerOpen(!menuDrawerOpen);
              }}
              className={`p-2 rounded-full border transition-all duration-200 shadow-sm flex items-center justify-center ${
                menuDrawerOpen
                  ? 'bg-[#153e34] dark:bg-[#91baaf] text-white dark:text-[#090e0c] border-transparent'
                  : 'border-[#91baaf]/40 dark:border-[#91baaf]/25 bg-white/90 dark:bg-[#121c19]/90 hover:bg-white dark:hover:bg-[#162521] text-[#153e34] dark:text-[#afd2c6]'
              }`}
              title="Menu (All 7 Keys)"
              aria-label="Toggle navigation menu"
            >
              {menuDrawerOpen ? (
                <X className="w-4 h-4 transition-transform rotate-90 duration-200" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>

            {/* 3-Line Menu Drawer Dropdown Panel */}
            {menuDrawerOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-[#f2faf7] dark:bg-[#0f1916] border border-[#91baaf]/40 dark:border-[#91baaf]/25 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-50 animate-fadeIn">
                {/* Header */}
                <div className="p-3.5 border-b border-[#91baaf]/30 dark:border-[#91baaf]/20 flex items-center justify-between bg-[#e5f5f0] dark:bg-[#13201c]">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-[#0d2620] dark:text-white uppercase tracking-wider">
                      Navigation Menu
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-[#91baaf]/30 dark:bg-[#91baaf]/20 text-[#153e34] dark:text-[#91baaf] border border-[#91baaf]/50 dark:border-[#91baaf]/30 rounded-full">
                      7 Keys
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#3d655a] dark:text-[#88b5a9]">IEIH v2.6</span>
                </div>

                {/* The 7 Keys List */}
                <div className="p-2 max-h-[70vh] overflow-y-auto space-y-1">
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
                        className={`w-full p-2.5 rounded-xl text-left flex items-center justify-between gap-3 transition-all duration-150 ${
                          isActive
                            ? 'bg-[#91baaf]/30 dark:bg-[#91baaf]/20 text-[#103a30] dark:text-[#91baaf] font-bold border border-[#91baaf]/50 dark:border-[#91baaf]/30 shadow-xs'
                            : 'hover:bg-white/70 dark:hover:bg-white/5 text-[#285045] dark:text-[#afd2c6] border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isActive
                              ? 'bg-[#153e34] dark:bg-[#91baaf] text-white dark:text-[#090e0c] shadow-sm'
                              : 'bg-[#91baaf]/20 dark:bg-[#91baaf]/15 text-[#153e34] dark:text-[#afd2c6]'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>

                          <div className="truncate">
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

                {/* Footer Action: Mint Passport CTA */}
                <div className="p-2.5 border-t border-[#91baaf]/30 dark:border-[#91baaf]/20 bg-[#e5f5f0] dark:bg-[#13201c]">
                  <button
                    onClick={() => {
                      soundManager.playSuccessBeep();
                      onNavigate('onboarding');
                      setMenuDrawerOpen(false);
                    }}
                    className="w-full py-2 px-3 bg-[#153e34] dark:bg-[#91baaf] text-white dark:text-[#090e0c] hover:bg-[#0f2e26] dark:hover:bg-[#7db0a3] font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all"
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
    </header>
  );
};
