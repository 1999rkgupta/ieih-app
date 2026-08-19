import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Volume2, 
  VolumeX, 
  Zap, 
  Sparkles, 
  Menu, 
  X, 
  Radio, 
  Trophy, 
  Search, 
  User, 
  GraduationCap, 
  Briefcase, 
  Bot,
  ChevronDown
} from 'lucide-react';
import { PlayerPassport } from '../../types';
import { soundManager } from '../../utils/audio';
import { MOCK_TICKER_ITEMS } from '../../data/mockData';

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
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);

  // Live ticker animation
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
    { id: 'home', label: 'HUB COMMAND', icon: Radio },
    { id: 'passport', label: 'E-PASSPORT', icon: User },
    { id: 'discovery', label: 'TALENT RADAR', icon: Search },
    { id: 'tournaments', label: 'TOURNAMENTS', icon: Trophy },
    { id: 'campus', label: 'CAMPUS', icon: GraduationCap },
    { id: 'careers', label: 'CAREERS', icon: Briefcase },
    { id: 'ai', label: 'EE AI', icon: Bot, isSpecial: true },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-hud-bg/95 backdrop-blur-xl border-b border-hud-border/80">
      {/* Top Live Esports Ticker */}
      <div className="bg-hud-card/90 border-b border-hud-border/60 py-1.5 px-4 sm:px-8 flex items-center justify-between text-xs font-rajdhani overflow-hidden">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <span className="px-2 py-0.5 bg-cyber-red/90 text-white font-orbitron font-bold text-[9px] rounded flex items-center gap-1 shrink-0 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            LIVE BROADCAST
          </span>
          <p className="text-hud-muted truncate font-medium text-xs transition-all duration-700">
            {MOCK_TICKER_ITEMS[tickerIndex]}
          </p>
        </div>

        <div className="hidden md:flex items-center gap-4 text-[11px] font-orbitron text-hud-dim shrink-0 pl-4">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span> 18MS MUMBAI REALM
          </span>
          <span>•</span>
          <span className="text-cyber-cyan">IEIH PROTOCOL V2.6</span>
        </div>
      </div>

      {/* Primary Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          onClick={() => {
            soundManager.playClickSound();
            onNavigate('home');
          }}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          {/* Cyber Polygon Shield Emblem */}
          <div className="relative w-9 h-9 rounded-xl bg-hud-card border border-cyber-cyan/60 flex items-center justify-center shadow-[0_0_12px_rgba(0,240,255,0.4)] group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-5 h-5 text-cyber-cyan" />
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyber-purple"></div>
          </div>
          <div>
            <div className="font-orbitron font-black text-lg tracking-wider text-hud-text flex items-center gap-1">
              <span>IEIH</span>
              <span className="text-cyber-cyan text-xs font-mono font-bold px-1.5 py-0.2 bg-cyber-cyan/15 rounded">PRO</span>
            </div>
            <p className="text-[9px] font-orbitron text-hud-muted tracking-widest uppercase -mt-0.5">
              INDIA ESPORTS HUB
            </p>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1">
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
                className={`px-3.5 py-2 rounded-xl text-xs font-orbitron font-bold tracking-wider transition-all flex items-center gap-1.5 ${
                  isActive
                    ? item.isSpecial
                      ? 'bg-cyber-purple/25 text-cyber-purple border border-cyber-purple shadow-[0_0_12px_rgba(139,92,246,0.4)]'
                      : 'bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                    : 'text-hud-muted hover:text-hud-text hover:bg-hud-card border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? (item.isSpecial ? 'text-cyber-purple' : 'text-cyber-cyan') : 'text-hud-muted'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right HUD Controls */}
        <div className="flex items-center gap-2.5">
          {/* Sound Toggle */}
          <button
            onClick={handleToggleMute}
            className={`p-2 rounded-xl border transition-all ${
              isMuted
                ? 'bg-hud-card border-hud-border text-hud-dim'
                : 'bg-hud-card border-cyber-cyan/40 text-cyber-cyan shadow-[0_0_10px_rgba(0,240,255,0.2)]'
            }`}
            title={isMuted ? 'Unmute HUD Audio' : 'Mute HUD Audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* User Passport Quick Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                soundManager.playClickSound();
                setUserDropdownOpen(!userDropdownOpen);
              }}
              className="flex items-center gap-2.5 p-1.5 pr-3 bg-hud-card hover:bg-hud-panel border border-hud-border hover:border-cyber-cyan rounded-xl transition-all"
            >
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.gamerTag}
                className="w-7 h-7 rounded-lg object-cover border border-cyber-cyan/50"
              />
              <div className="hidden sm:block text-left">
                <div className="font-orbitron font-bold text-xs text-hud-text flex items-center gap-1">
                  <span>{currentUser.gamerTag}</span>
                  <span className="text-[9px] px-1 bg-cyber-purple/30 text-cyber-purple rounded font-mono">L{currentUser.level}</span>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-hud-muted" />
            </button>

            {/* Dropdown Menu */}
            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-hud-surface border border-hud-border rounded-xl shadow-2xl shadow-cyber-cyan/20 p-2 z-50 animate-fadeIn">
                <div className="p-2 border-b border-hud-border text-xs font-orbitron text-hud-muted">
                  SWITCH ACTIVE PASSPORT PROFILE
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
                      className={`w-full p-2 rounded-lg text-left flex items-center gap-2.5 text-xs font-rajdhani transition-all ${
                        p.id === currentUser.id
                          ? 'bg-cyber-cyan/15 text-cyber-cyan font-bold border border-cyber-cyan/40'
                          : 'hover:bg-hud-card text-hud-text'
                      }`}
                    >
                      <img src={p.avatarUrl} alt={p.gamerTag} className="w-6 h-6 rounded-md object-cover" />
                      <div className="truncate">
                        <div className="font-orbitron font-bold text-xs truncate">{p.gamerTag}</div>
                        <div className="text-[10px] text-hud-muted">{p.primaryGame} • {p.primaryRole}</div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="pt-2 border-t border-hud-border">
                  <button
                    onClick={() => {
                      soundManager.playSuccessBeep();
                      setUserDropdownOpen(false);
                      onNavigate('onboarding');
                    }}
                    className="w-full py-1.5 bg-gradient-to-r from-cyber-cyan to-cyber-blue text-black font-orbitron font-bold text-xs rounded-lg text-center shadow-[0_0_10px_rgba(0,240,255,0.3)]"
                  >
                    + CREATE NEW PASSPORT
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mint CTA Button */}
          <button
            onClick={() => {
              soundManager.playSuccessBeep();
              onNavigate('onboarding');
            }}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-cyber-cyan to-cyber-blue text-black font-orbitron font-extrabold text-xs rounded-xl hover:shadow-[0_0_15px_rgba(0,240,255,0.6)] transition-all"
          >
            <Zap className="w-3.5 h-3.5 fill-black" />
            MINT PASSPORT
          </button>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 lg:hidden text-hud-muted hover:text-hud-text bg-hud-card border border-hud-border rounded-xl"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden p-4 bg-hud-surface border-b border-hud-border space-y-2 animate-fadeIn">
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
                className={`w-full p-3 rounded-xl text-xs font-orbitron font-bold flex items-center gap-2.5 ${
                  isActive ? 'bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan' : 'text-hud-muted hover:bg-hud-card'
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
