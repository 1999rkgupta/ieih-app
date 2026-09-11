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
              className={`flex items-center gap-2 py-1 pl-1.5 pr-2.5 rounded-full border transition-all duration-200 select-none ${
                currentTab === 'passport'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-transparent shadow-sm'
                  : 'bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 shadow-sm'
              }`}
              title="View Profile"
            >
              <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 border border-slate-300 dark:border-white/20 bg-slate-900 flex items-center justify-center">
                {currentUser.avatarUrl ? (
                  <img src={currentUser.avatarUrl} alt={currentUser.gamerTag} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[10px] font-bold font-mono text-sky-400">
                    {currentUser.gamerTag.slice(0, 2).toUpperCase()}
                  </span>
                )}
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
                      className={`w-full px-2.5 py-1.5 rounded-xl text-left flex items-center gap-2.5 text-xs transition-all ${
                        p.id === currentUser.id
                          ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 font-semibold'
                          : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 border border-slate-200 dark:border-white/10 bg-slate-900 flex items-center justify-center">
                        {p.avatarUrl ? (
                          <img src={p.avatarUrl} alt={p.gamerTag} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-[9px] font-bold font-mono text-sky-400">
                            {p.gamerTag.slice(0, 2).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div className="truncate flex-1 min-w-0">
                        <div className="font-semibold text-xs truncate text-slate-900 dark:text-white">{p.gamerTag}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">{p.primaryGame} • {p.primaryRole}</div>
                      </div>
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 text-[10px] font-mono font-bold text-slate-600 dark:text-slate-400 shrink-0">
                        L{p.level}
                      </span>
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

        {/* Center: Universal Omnisearch Bar (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-8">
          <button
            onClick={() => {
              soundManager.playClickSound();
              onOpenSearch();
            }}
            className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-full bg-slate-100/90 hover:bg-slate-200/80 dark:bg-white/5 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-white/10 transition-all text-xs group cursor-pointer shadow-xs"
            title="Search across all players, tournaments, colleges, jobs & commands (⌘K)"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-sky-500 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-slate-600 dark:text-slate-300">
                Search entire app...
              </span>
            </div>
            <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-white dark:bg-white/10 text-slate-500 dark:text-slate-300 rounded border border-slate-200/80 dark:border-white/10 shadow-2xs">
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
            className="p-2 md:hidden rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white shadow-sm transition-all"
            title="Search app (⌘K)"
            aria-label="Open search"
          >
            <Search className="w-4 h-4 text-sky-500" />
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
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-transparent'
                  : 'border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200'
              }`}
              title="Notifications"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] px-1 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-[#090c13] shadow-sm animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Panel */}
            {notificationsOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white dark:bg-[#111726] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 animate-fadeIn">
                {/* Header */}
                <div className="p-3.5 border-b border-slate-200/80 dark:border-white/10 flex items-center justify-between bg-slate-50/70 dark:bg-white/[0.02]">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider">
                      Notifications
                    </span>
                    {unreadCount > 0 && (
                      <span className="px-1.5 py-0.2 text-[10px] font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 rounded-full">
                        {unreadCount} new
                      </span>
                    )}
                  </div>

                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllRead}
                      className="text-[11px] font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-500 flex items-center gap-1 transition-colors"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      <span>Mark all read</span>
                    </button>
                  )}
                </div>

                {/* Notification Items List */}
                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-white/5 p-1.5">
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
                          ? 'bg-sky-50/50 dark:bg-sky-500/5 hover:bg-sky-50 dark:hover:bg-sky-500/10'
                          : 'hover:bg-slate-50 dark:hover:bg-white/5 opacity-80'
                      }`}
                    >
                      <div className="w-2 h-2 rounded-full mt-1.5 shrink-0 bg-sky-500" style={{ visibility: n.unread ? 'visible' : 'hidden' }}></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${n.tagColor}`}>
                            {n.tag}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5" />
                            {n.time}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {n.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5 leading-snug">
                          {n.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="p-2 border-t border-slate-200/80 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02] text-center">
                  <span className="text-[10px] text-slate-400 font-mono">
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

          {/* 3-Line Menu Button with All 7 Keys */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => {
                soundManager.playClickSound();
                setMenuDrawerOpen(!menuDrawerOpen);
              }}
              className={`p-2 rounded-full border transition-all duration-200 shadow-sm flex items-center justify-center ${
                menuDrawerOpen
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-transparent'
                  : 'border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200'
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
              <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white dark:bg-[#111726] border border-slate-200 dark:border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-50 animate-fadeIn">
                {/* Header */}
                <div className="p-3.5 border-b border-slate-200/80 dark:border-white/10 flex items-center justify-between bg-slate-50/70 dark:bg-white/[0.02]">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900 dark:text-white uppercase tracking-wider">
                      Navigation Menu
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 rounded-full">
                      7 Keys
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">IEIH v2.6</span>
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
                            ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 font-semibold border border-sky-500/20 shadow-xs'
                            : 'hover:bg-slate-100/80 dark:hover:bg-white/5 text-slate-700 dark:text-slate-200 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isActive
                              ? 'bg-sky-600 text-white dark:bg-sky-400 dark:text-slate-950 shadow-sm'
                              : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>

                          <div className="truncate">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-slate-900 dark:text-white truncate">
                                {item.label}
                              </span>
                              <span className="text-[9px] font-mono text-slate-400">#{idx + 1}</span>
                            </div>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                              {item.subtitle}
                            </p>
                          </div>
                        </div>

                        <ArrowRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                          isActive ? 'text-sky-600 dark:text-sky-400 translate-x-0.5' : 'text-slate-400 opacity-40'
                        }`} />
                      </button>
                    );
                  })}
                </div>

                {/* Footer Action: Mint Passport CTA */}
                <div className="p-2.5 border-t border-slate-200/80 dark:border-white/10 bg-slate-50/50 dark:bg-white/[0.02]">
                  <button
                    onClick={() => {
                      soundManager.playSuccessBeep();
                      onNavigate('onboarding');
                      setMenuDrawerOpen(false);
                    }}
                    className="w-full py-2 px-3 bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all"
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
