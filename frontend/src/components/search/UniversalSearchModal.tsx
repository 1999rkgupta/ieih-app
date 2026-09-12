import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Search, 
  X, 
  User, 
  Trophy, 
  GraduationCap, 
  Briefcase, 
  Bot, 
  Sparkles, 
  ArrowRight, 
  Sun, 
  Moon, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  MapPin, 
  ExternalLink,
  CornerDownLeft,
  Flame,
  Layers,
  Compass,
  Zap
} from 'lucide-react';
import { PlayerPassport, Tournament, CollegiateClub, JobOpportunity } from '../../types';
import { soundManager } from '../../utils/audio';

export type SearchCategory = 'all' | 'players' | 'tournaments' | 'colleges' | 'careers' | 'actions' | 'ai';

interface UniversalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  players: PlayerPassport[];
  tournaments: Tournament[];
  colleges: CollegiateClub[];
  jobs: JobOpportunity[];
  currentUser: PlayerPassport;
  onNavigate: (tab: string) => void;
  onSelectPlayer: (player: PlayerPassport) => void;
  onToggleTheme: () => void;
  isDarkMode: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
  onSelectTournament?: (tournament: Tournament) => void;
  onSelectCollege?: (college: CollegiateClub) => void;
  onSelectJob?: (job: JobOpportunity) => void;
  onAskAI?: (prompt: string) => void;
}

export interface SearchResultItem {
  id: string;
  category: 'players' | 'tournaments' | 'colleges' | 'careers' | 'actions' | 'ai';
  title: string;
  subtitle: string;
  badge?: string;
  badgeColor?: string;
  icon?: React.ReactNode;
  data?: any;
  action: () => void;
}

export const UniversalSearchModal: React.FC<UniversalSearchModalProps> = ({
  isOpen,
  onClose,
  players,
  tournaments,
  colleges,
  jobs,
  currentUser,
  onNavigate,
  onSelectPlayer,
  onToggleTheme,
  isDarkMode,
  isMuted,
  onToggleMute,
  onSelectTournament,
  onSelectCollege,
  onSelectJob,
  onAskAI
}) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<SearchCategory>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
      setActiveCategory('all');
    }
  }, [isOpen]);

  // Predefined Quick App Actions
  const appActions = useMemo(() => [
    {
      id: 'action-home',
      title: 'Go to Command Center (Home)',
      subtitle: 'Official dashboard, featured tournaments & live national radar',
      icon: <Compass className="w-4 h-4 text-sky-500" />,
      badge: 'Page',
      badgeColor: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
      action: () => {
        onNavigate('home');
        onClose();
      }
    },
    {
      id: 'action-passport',
      title: 'View My E-Player Passport',
      subtitle: `Open active profile for ${currentUser.gamerTag} (${currentUser.passportNumber})`,
      icon: <User className="w-4 h-4 text-emerald-500" />,
      badge: 'Profile',
      badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      action: () => {
        onSelectPlayer(currentUser);
        onClose();
      }
    },
    {
      id: 'action-onboarding',
      title: 'Mint New E-Player Passport',
      subtitle: 'Generate verified esports ID, link games & anti-cheat certification',
      icon: <Zap className="w-4 h-4 text-amber-500" />,
      badge: 'Action',
      badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      action: () => {
        onNavigate('onboarding');
        onClose();
      }
    },
    {
      id: 'action-discovery',
      title: 'Talent Radar & Scouting Engine',
      subtitle: 'Compare player telemetry, filter tier-1 athletes & scout rosters',
      icon: <Search className="w-4 h-4 text-cyan-500" />,
      badge: 'Page',
      badgeColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
      action: () => {
        onNavigate('discovery');
        onClose();
      }
    },
    {
      id: 'action-tournaments',
      title: 'Tournament Hub & Trust Audits',
      subtitle: 'Browse live brackets, verified LAN cups & prize pool escrow audits',
      icon: <Trophy className="w-4 h-4 text-purple-500" />,
      badge: 'Page',
      badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
      action: () => {
        onNavigate('tournaments');
        onClose();
      }
    },
    {
      id: 'action-campus',
      title: 'Collegiate Campus Network',
      subtitle: 'Over 250+ university gaming clubs (IITs, NITs, BITS, MIT Manipal)',
      icon: <GraduationCap className="w-4 h-4 text-indigo-500" />,
      badge: 'Page',
      badgeColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
      action: () => {
        onNavigate('campus');
        onClose();
      }
    },
    {
      id: 'action-careers',
      title: 'Esports Careers & Roster Board',
      subtitle: 'Find pro contracts, analyst gigs, broadcast observer & shoutcasting roles',
      icon: <Briefcase className="w-4 h-4 text-rose-500" />,
      badge: 'Page',
      badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
      action: () => {
        onNavigate('careers');
        onClose();
      }
    },
    {
      id: 'action-ai',
      title: 'EE-AI Companion & Tactical Coach',
      subtitle: 'Instant gameplay analysis, VOD feedback & career roadmap recommendations',
      icon: <Bot className="w-4 h-4 text-sky-400" />,
      badge: 'AI Coach',
      badgeColor: 'bg-sky-500/10 text-sky-500 dark:text-sky-400 border-sky-500/20',
      action: () => {
        onNavigate('ai');
        onClose();
      }
    },
    {
      id: 'action-theme',
      title: `Toggle Theme: Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`,
      subtitle: 'Customize high-contrast HUD appearance and display theme',
      icon: isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />,
      badge: 'Display',
      badgeColor: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
      action: () => {
        onToggleTheme();
        onClose();
      }
    },
    {
      id: 'action-sound',
      title: `Audio Effects: ${isMuted ? 'Unmute Audio Sound FX' : 'Mute Audio Sound FX'}`,
      subtitle: 'Toggle tactile UI sound feedback and clicks',
      icon: isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-emerald-500" />,
      badge: 'Audio',
      badgeColor: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
      action: () => {
        onToggleMute();
        onClose();
      }
    }
  ], [currentUser, onNavigate, onSelectPlayer, onToggleTheme, isDarkMode, onToggleMute, isMuted, onClose]);

  // Predefined AI Tactical Prompts
  const aiPrompts = useMemo(() => [
    {
      id: 'ai-aim-clutch',
      title: 'Analyze my aim accuracy, clutch rate and scrim MMR',
      subtitle: 'EE-AI tactical deep dive on radar stats & late-game positioning',
      prompt: 'Can you analyze my current radar stats and give me advice on improving clutch conversion rate?'
    },
    {
      id: 'ai-college-recruitment',
      title: 'How do I join an official college esports chapter?',
      subtitle: 'Guidelines for IIT / BITS collegiate tournaments and team tryouts',
      prompt: 'How do I get recruited by a top collegiate esports team in India?'
    },
    {
      id: 'ai-valorant-routine',
      title: 'Recommended practice scrim routines for Valorant Duelists',
      subtitle: 'Entry frag drills, crosshair placement & anti-strat preparation',
      prompt: 'What is the best training and scrim routine for competitive Valorant Duelists in India?'
    },
    {
      id: 'ai-bgmi-igl',
      title: 'Late-game zone rotation strategies for BGMI IGLs',
      subtitle: 'Edge play vs center circle compounds in Tier 1 Indian lobbies',
      prompt: 'Provide high-level zone rotation strategies for BGMI IGLs in Tier 1 finals.'
    }
  ], []);

  // Universal Filter & Search Index Engine
  const allResults = useMemo<SearchResultItem[]>(() => {
    const q = query.trim().toLowerCase();
    const items: SearchResultItem[] = [];

    // Helper to check match
    const matches = (...fields: (string | undefined | number)[]) => {
      if (!q) return true;
      return fields.some(f => f && String(f).toLowerCase().includes(q));
    };

    // 1. Index Players
    players.forEach(player => {
      const perfGames = Object.keys(player.gamePerformances || {}).join(' ');
      const mainWeapons = Object.values(player.gamePerformances || {})
        .flatMap(g => g.mainCharactersOrWeapons || [])
        .join(' ');

      if (
        matches(
          player.gamerTag,
          player.realName,
          player.passportNumber,
          player.primaryGame,
          player.primaryRole,
          player.city,
          player.state,
          player.currentTeam?.name,
          player.currentTeam?.tag,
          player.tier,
          player.verificationBadgeType,
          player.bio,
          perfGames,
          mainWeapons
        )
      ) {
        items.push({
          id: `player-${player.id}`,
          category: 'players',
          title: player.gamerTag,
          subtitle: `${player.realName} • ${player.primaryGame} ${player.primaryRole} • ${player.city}, ${player.state} (${player.passportNumber})`,
          badge: `L${player.level} • ${player.tier}`,
          badgeColor: player.tier === 'Legend' 
            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
            : 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
          icon: <ShieldCheck className="w-5 h-5 text-sky-500" />,
          data: player,
          action: () => {
            soundManager.playClickSound();
            onSelectPlayer(player);
            onClose();
          }
        });
      }
    });

    // 2. Index Tournaments
    tournaments.forEach(tourney => {
      if (
        matches(
          tourney.title,
          tourney.game,
          tourney.type,
          tourney.status,
          tourney.organizer.name,
          tourney.prizePoolFormatted,
          tourney.location,
          tourney.description,
          tourney.format,
          ...(tourney.rulesSummary || [])
        )
      ) {
        items.push({
          id: `tourney-${tourney.id}`,
          category: 'tournaments',
          title: tourney.title,
          subtitle: `${tourney.game} • Prize: ${tourney.prizePoolFormatted} • ${tourney.location} • Host: ${tourney.organizer.name}`,
          badge: tourney.status,
          badgeColor: tourney.status.includes('Live')
            ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
            : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
          icon: <Trophy className="w-4 h-4 text-purple-500" />,
          data: tourney,
          action: () => {
            soundManager.playClickSound();
            if (onSelectTournament) {
              onSelectTournament(tourney);
            } else {
              onNavigate('tournaments');
            }
            onClose();
          }
        });
      }
    });

    // 3. Index Collegiate Clubs
    colleges.forEach(club => {
      const topGamesStr = club.topGames.join(', ');
      if (
        matches(
          club.collegeName,
          club.shortName,
          club.city,
          club.state,
          club.rankingTier,
          club.captain.name,
          club.captain.gamerTag,
          topGamesStr
        )
      ) {
        items.push({
          id: `college-${club.id}`,
          category: 'colleges',
          title: `${club.collegeName} (${club.shortName})`,
          subtitle: `${club.city}, ${club.state} • ${club.studentRosterCount} Athletes • Games: ${topGamesStr} • Captain: ${club.captain.gamerTag}`,
          badge: club.rankingTier,
          badgeColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
          icon: <GraduationCap className="w-4 h-4 text-indigo-500" />,
          data: club,
          action: () => {
            soundManager.playClickSound();
            if (onSelectCollege) {
              onSelectCollege(club);
            } else {
              onNavigate('campus');
            }
            onClose();
          }
        });
      }
    });

    // 4. Index Careers & Job Opportunities
    jobs.forEach(job => {
      if (
        matches(
          job.title,
          job.organization,
          job.game,
          job.roleCategory,
          job.type,
          job.location,
          job.compensation,
          job.description,
          ...(job.requirements || [])
        )
      ) {
        items.push({
          id: `job-${job.id}`,
          category: 'careers',
          title: `${job.title} — ${job.organization}`,
          subtitle: `${job.game} • ${job.compensation} • ${job.location} • ${job.type}`,
          badge: job.roleCategory,
          badgeColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
          icon: <Briefcase className="w-4 h-4 text-rose-500" />,
          data: job,
          action: () => {
            soundManager.playClickSound();
            if (onSelectJob) {
              onSelectJob(job);
            } else {
              onNavigate('careers');
            }
            onClose();
          }
        });
      }
    });

    // 5. Index App Actions
    appActions.forEach(action => {
      if (matches(action.title, action.subtitle, action.badge)) {
        items.push({
          id: action.id,
          category: 'actions',
          title: action.title,
          subtitle: action.subtitle,
          badge: action.badge,
          badgeColor: action.badgeColor,
          icon: action.icon,
          action: action.action
        });
      }
    });

    // 6. Index EE AI Prompts
    aiPrompts.forEach(p => {
      if (matches(p.title, p.subtitle, p.prompt)) {
        items.push({
          id: p.id,
          category: 'ai',
          title: p.title,
          subtitle: p.subtitle,
          badge: 'Ask EE AI',
          badgeColor: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
          icon: <Bot className="w-4 h-4 text-sky-500" />,
          action: () => {
            soundManager.playClickSound();
            if (onAskAI) {
              onAskAI(p.prompt);
            } else {
              onNavigate('ai');
            }
            onClose();
          }
        });
      }
    });

    return items;
  }, [
    query, 
    players, 
    tournaments, 
    colleges, 
    jobs, 
    appActions, 
    aiPrompts, 
    onSelectPlayer, 
    onSelectTournament, 
    onSelectCollege, 
    onSelectJob, 
    onNavigate, 
    onAskAI, 
    onClose
  ]);

  // Filter items by category
  const filteredResults = useMemo(() => {
    if (activeCategory === 'all') return allResults;
    return allResults.filter(item => item.category === activeCategory);
  }, [allResults, activeCategory]);

  // Group counters
  const categoryCounts = useMemo(() => {
    const counts = {
      all: allResults.length,
      players: 0,
      tournaments: 0,
      colleges: 0,
      careers: 0,
      actions: 0,
      ai: 0
    };
    allResults.forEach(item => {
      if (counts[item.category] !== undefined) {
        counts[item.category]++;
      }
    });
    return counts;
  }, [allResults]);

  // Reset selected index if results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, activeCategory]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % (filteredResults.length || 1));
        scrollSelectedItemIntoView();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredResults.length) % (filteredResults.length || 1));
        scrollSelectedItemIntoView();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredResults[selectedIndex]) {
          filteredResults[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex, onClose]);

  const scrollSelectedItemIntoView = () => {
    setTimeout(() => {
      const activeEl = listRef.current?.querySelector('[data-active="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }, 10);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-20 px-3 sm:px-4 backdrop-blur-md bg-black/60 transition-all animate-fadeIn">
      {/* Backdrop overlay dismiss */}
      <div 
        className="fixed inset-0" 
        onClick={() => {
          soundManager.playClickSound();
          onClose();
        }}
      ></div>

      {/* Main Command Center Modal */}
      <div className="relative w-full max-w-3xl bg-white dark:bg-[#101c18] border border-slate-200 dark:border-[#91baaf]/25 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] z-10 transition-colors">
        
        {/* Search Input Bar */}
        <div className="p-3 sm:p-4 border-b border-slate-200 dark:border-white/10 flex items-center gap-3 bg-slate-50/70 dark:bg-white/[0.02]">
          <div className="p-2 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 shrink-0">
            <Search className="w-5 h-5" />
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search players, tournaments, colleges, jobs, commands, or ask EE-AI..."
            className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm sm:text-base font-medium"
          />

          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-slate-200 dark:border-white/10 text-[11px] text-slate-400 font-mono">
            <kbd className="px-2 py-0.5 rounded bg-slate-200/70 dark:bg-white/10 text-slate-600 dark:text-slate-300 font-semibold shadow-xs">ESC</kbd>
            <span>to close</span>
          </div>
        </div>

        {/* Category Filters Pills */}
        <div className="px-3 sm:px-4 py-2 border-b border-slate-200/80 dark:border-white/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-slate-50/40 dark:bg-black/10">
          {(
            [
              { id: 'all', label: 'All Results', count: categoryCounts.all },
              { id: 'players', label: 'Athletes', count: categoryCounts.players },
              { id: 'tournaments', label: 'Tournaments', count: categoryCounts.tournaments },
              { id: 'colleges', label: 'Campus', count: categoryCounts.colleges },
              { id: 'careers', label: 'Careers', count: categoryCounts.careers },
              { id: 'actions', label: 'Actions', count: categoryCounts.actions },
              { id: 'ai', label: 'EE-AI', count: categoryCounts.ai },
            ] as { id: SearchCategory; label: string; count: number }[]
          ).map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                soundManager.playClickSound();
                setActiveCategory(tab.id);
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeCategory === tab.id
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm'
                  : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/5'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeCategory === tab.id
                  ? 'bg-white/20 dark:bg-black/20 text-white dark:text-slate-950 font-bold'
                  : 'bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div 
          ref={listRef} 
          className="flex-1 overflow-y-auto p-2 sm:p-3 divide-y divide-slate-100 dark:divide-white/5 max-h-[50vh]"
        >
          {filteredResults.length > 0 ? (
            filteredResults.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  data-active={isSelected}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`p-3 rounded-xl sm:rounded-2xl cursor-pointer transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/30 shadow-sm'
                      : 'hover:bg-slate-100/70 dark:hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {/* Visual Icon */}
                    <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 flex items-center justify-center bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                      {item.icon || <Compass className="w-5 h-5 text-sky-500" />}
                    </div>

                    {/* Text Details */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${item.badgeColor || 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10'}`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Return / Jump Arrow */}
                  <div className="shrink-0 flex items-center gap-1.5 text-slate-400">
                    {isSelected && (
                      <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono font-medium text-sky-600 dark:text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                        <CornerDownLeft className="w-3 h-3" /> Select
                      </span>
                    )}
                    <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-1 text-sky-500' : 'opacity-40'}`} />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 px-4 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 mb-3">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">No matches found</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">
                We couldn't find anything matching "{query}". Try searching for another player gamertag, tournament, college chapter, or role.
              </p>
            </div>
          )}
        </div>

        {/* Trending Searches Suggestions Footer when query is empty */}
        {query === '' && (
          <div className="p-3 sm:p-4 bg-slate-50/90 dark:bg-black/20 border-t border-slate-200 dark:border-white/5">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Trending Searches across India</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                'V4ND4L',
                'Valorant Duelist',
                'IIT Bombay',
                'Skyesports Grand Slam',
                'Krafton India',
                'Tactical Analyst',
                'Conqueror BGMI',
                'Mint Passport'
              ].map(tag => (
                <button
                  key={tag}
                  onClick={() => {
                    soundManager.playClickSound();
                    setQuery(tag);
                  }}
                  className="px-2.5 py-1 rounded-lg text-xs bg-white dark:bg-white/5 hover:bg-sky-500/10 dark:hover:bg-sky-500/15 text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 border border-slate-200 dark:border-white/10 transition-colors flex items-center gap-1"
                >
                  <Search className="w-3 h-3 opacity-60" />
                  <span>{tag}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Modal Keyboard Helper Bar */}
        <div className="px-4 py-2 bg-white dark:bg-[#0d1614] border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-mono">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 font-bold text-slate-600 dark:text-slate-300">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 font-bold text-slate-600 dark:text-slate-300">↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1 font-mono">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/10 font-bold text-slate-600 dark:text-slate-300">↵</kbd>
              Select
            </span>
          </div>

          <span className="text-[10px] font-mono text-sky-600 dark:text-sky-400 font-semibold">
            IEIH Universal Omnisearch v2.6
          </span>
        </div>

      </div>
    </div>
  );
};
