import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Zap, 
  RotateCcw,
  BookOpen,
  Award,
  Paperclip,
  FileText,
  Eye,
  X,
  ArrowUpRight,
  Trophy,
  GraduationCap,
  Briefcase,
  Compass,
  Edit3,
  MessageSquarePlus,
  Database,
  Search
} from 'lucide-react';
import { 
  PlayerPassport, 
  Tournament, 
  CollegiateClub, 
  JobOpportunity 
} from '../../types';
import { soundManager } from '../../utils/audio';
import { queryKnowledgeBase } from '../../data/arenaXKnowledgeBase';
import { 
  askEEAICoach, 
  PlatformAction, 
  PlatformContext, 
  TacticalCardData,
  MessageAttachment 
} from '../../services/gemini';

export interface EEAICompanionProps {
  currentUser: PlayerPassport;
  allPlayers?: PlayerPassport[];
  tournaments?: Tournament[];
  campusClubs?: CollegiateClub[];
  jobs?: JobOpportunity[];
  onNavigate?: (tab: string) => void;
  onSelectPlayer?: (player: PlayerPassport) => void;
  onOpenEditor?: () => void;
  onOpenRecruit?: (player?: PlayerPassport) => void;
  onOpenPostModal?: () => void;
  onOpenSearch?: () => void;
}

interface EEAIMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  attachments?: MessageAttachment[];
  modelUsed?: string;
  tacticalCard?: TacticalCardData;
  actions?: PlatformAction[];
}

const PRESET_TACTICAL_PROMPTS = [
  "What tournaments are open right now on IEIH?",
  "Which campus is #1 in collegiate rankings?",
  "Are there any coaching or analyst jobs available?",
  "Audit my passport stats and tournament readiness",
  "How to rotate on Erangel Zone 4 in BGMI?",
  "Compare my K/D with top radar athletes",
  "What are the 50 rules of esports coaching?"
];

export const EEAICompanion: React.FC<EEAICompanionProps> = ({ 
  currentUser,
  allPlayers = [],
  tournaments = [],
  campusClubs = [],
  jobs = [],
  onNavigate,
  onSelectPlayer,
  onOpenEditor,
  onOpenRecruit,
  onOpenPostModal,
  onOpenSearch
}) => {
  const [messages, setMessages] = useState<EEAIMessage[]>([
    {
      id: 'init_welcome',
      sender: 'assistant',
      text: `Hello ${currentUser.gamerTag}. I am EE AI — your personal Competitive Esports Coach, Tactical Intelligence Companion, and AI Operating System for the India Esports Hub.\n\nI am synchronized with **your full athlete profile**, as well as the **entire IEIH platform database** (${tournaments.length} active tournaments, ${campusClubs.length} university chapters, ${jobs.length} esports career postings, and ${allPlayers.length} verified athletes).\n\nAsk me about tournament registrations, campus standings, scouting candidates, career contracts, or attach match screenshots/rulebooks for direct multimodal tactical telemetry.`,
      timestamp: 'Online',
      modelUsed: 'Google Gemini 3.6 Flash (Platform Synchronized)',
      tacticalCard: {
        title: `${currentUser.primaryGame} Master Dossier`,
        category: 'Platform Synchronization v4.5',
        keyPoints: [
          `Athlete Handle: ${currentUser.gamerTag} (${currentUser.passportNumber})`,
          `Verified Role: ${currentUser.primaryRole} | Level ${currentUser.level} Contender`,
          `Active Context: ${tournaments.length} Tournaments, ${campusClubs.length} Colleges & ${jobs.length} Jobs Grounded`
        ],
        actionItem: 'Ask a tactical question, explore tournament eligibility, or audit your passport.'
      },
      actions: [
        { id: 'act_tourn', label: 'View Live Tournaments', actionType: 'NAVIGATE', targetId: 'tournaments' },
        { id: 'act_campus', label: 'Collegiate Standings', actionType: 'NAVIGATE', targetId: 'campus' },
        { id: 'act_jobs', label: 'Explore Esports Careers', actionType: 'NAVIGATE', targetId: 'careers' },
        { id: 'act_edit', label: 'Edit My Passport', actionType: 'EDIT_PASSPORT' }
      ]
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [pendingAttachments, setPendingAttachments] = useState<MessageAttachment[]>([]);
  const [viewingPhotoUrl, setViewingPhotoUrl] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, pendingAttachments]);

  const handleFilesSelected = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    soundManager.playClickSound();
    Array.from(files).forEach(file => {
      const isImage = file.type.startsWith('image/');
      const ext = file.name.split('.').pop() || (isImage ? 'png' : 'pdf');
      const sizeFormatted = file.size > 1024 * 1024 
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(file.size / 1024)} KB`;

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          const newAtt: MessageAttachment = {
            id: `att_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            name: file.name,
            type: isImage ? 'image' : 'document',
            url: result,
            sizeFormatted,
            fileExtension: ext.toLowerCase()
          };
          setPendingAttachments(prev => [...prev, newAtt]);
        }
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removePendingAttachment = (index: number) => {
    soundManager.playClickSound();
    setPendingAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleExecuteAction = (action: PlatformAction) => {
    soundManager.playClickSound();
    switch (action.actionType) {
      case 'NAVIGATE':
        onNavigate?.(action.targetId || 'home');
        break;
      case 'VIEW_TOURNAMENT':
        onNavigate?.('tournaments');
        break;
      case 'VIEW_CAMPUS':
        onNavigate?.('campus');
        break;
      case 'VIEW_JOB':
        onNavigate?.('careers');
        break;
      case 'SCOUT_PLAYER':
        if (action.targetId) {
          const p = allPlayers.find(player => 
            player.id === action.targetId || 
            player.gamerTag.toLowerCase() === action.targetId?.toLowerCase()
          );
          if (p) {
            onSelectPlayer?.(p);
            onOpenRecruit?.(p);
            return;
          }
        }
        onNavigate?.('discovery');
        break;
      case 'EDIT_PASSPORT':
        onOpenEditor?.();
        break;
      case 'CREATE_POST':
        onOpenPostModal?.();
        break;
      case 'SEARCH':
        onOpenSearch?.();
        break;
      default:
        if (action.targetId) onNavigate?.(action.targetId);
    }
  };

  const renderActionIcon = (actionType: PlatformAction['actionType']) => {
    switch (actionType) {
      case 'VIEW_TOURNAMENT':
        return <Trophy className="w-3.5 h-3.5 text-[#91baaf]" />;
      case 'VIEW_CAMPUS':
        return <GraduationCap className="w-3.5 h-3.5 text-[#91baaf]" />;
      case 'VIEW_JOB':
        return <Briefcase className="w-3.5 h-3.5 text-[#91baaf]" />;
      case 'SCOUT_PLAYER':
        return <Compass className="w-3.5 h-3.5 text-[#91baaf]" />;
      case 'EDIT_PASSPORT':
        return <Edit3 className="w-3.5 h-3.5 text-[#91baaf]" />;
      case 'CREATE_POST':
        return <MessageSquarePlus className="w-3.5 h-3.5 text-[#91baaf]" />;
      case 'SEARCH':
        return <Search className="w-3.5 h-3.5 text-[#91baaf]" />;
      default:
        return <ArrowUpRight className="w-3.5 h-3.5 text-[#91baaf]" />;
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    const attachmentsToSend = [...pendingAttachments];

    if (!text.trim() && attachmentsToSend.length === 0) return;

    soundManager.playClickSound();

    const userMsg: EEAIMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachments: attachmentsToSend.length > 0 ? attachmentsToSend : undefined
    };

    const currentHistory = [...messages, userMsg];
    setMessages(currentHistory);
    if (!textToSend) setInputValue('');
    setPendingAttachments([]);
    setIsTyping(true);

    const platformContext: PlatformContext = {
      currentUser,
      allPlayers,
      tournaments,
      campusClubs,
      jobs
    };

    try {
      const historyForLlm = currentHistory.map(m => ({ sender: m.sender, text: m.text }));
      const coachResult = await askEEAICoach(
        text,
        platformContext,
        attachmentsToSend,
        historyForLlm
      );

      soundManager.playSuccessBeep();

      const botReply: EEAIMessage = {
        id: `bot_${Date.now()}`,
        sender: 'assistant',
        text: coachResult.replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tacticalCard: coachResult.tacticalCard,
        actions: coachResult.actions,
        modelUsed: coachResult.modelUsed
      };

      setMessages(prev => [...prev, botReply]);
    } catch (err) {
      console.error('[EE AI Error]', err);
      // Local fallback in case of catastrophic error
      const local = queryKnowledgeBase(text, currentUser.primaryGame);
      const botReply: EEAIMessage = {
        id: `bot_${Date.now()}`,
        sender: 'assistant',
        text: local.replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tacticalCard: local.tacticalCard,
        modelUsed: 'ARENA-X Offline Engine'
      };
      setMessages(prev => [...prev, botReply]);
    } finally {
      setIsTyping(false);
    }
  };

  // Helper to render markdown-style bold and paragraphs
  const renderFormattedText = (text: string) => {
    return text.split('\n\n').map((paragraph, pIdx) => {
      return (
        <p key={pIdx} className={pIdx > 0 ? 'mt-2.5' : ''}>
          {paragraph.split('\n').map((line, lIdx) => {
            const parts = line.split(/(\*\*.*?\*\*)/g);
            return (
              <React.Fragment key={lIdx}>
                {lIdx > 0 && <br />}
                {parts.map((part, partIdx) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return (
                      <strong key={partIdx} className="font-bold text-slate-900 dark:text-white">
                        {part.slice(2, -2)}
                      </strong>
                    );
                  }
                  return part;
                })}
              </React.Fragment>
            );
          })}
        </p>
      );
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner with Platform Intelligence Feed */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#101c18] border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm">
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#91baaf]/15 text-[#244b40] dark:text-[#91baaf] rounded-full text-xs font-semibold border border-[#91baaf]/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Google Gemini AI Live Engine</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-semibold border border-emerald-500/20">
              <Database className="w-3.5 h-3.5" />
              <span>Entire Platform Grounded</span>
            </div>
          </div>

          <div className="max-w-3xl space-y-2">
            <h2 className="font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
              EE AI Tactical Coach & Platform Intelligence
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-normal">
              Direct live collaboration between Google Gemini and the entire IEIH ecosystem. Ask about upcoming tournaments, collegiate rankings, scouting candidates, career contracts, or upload match screenshots for tactical telemetry.
            </p>
          </div>

          {/* Real-Time Platform Synchronization Telemetry Pills */}
          <div className="pt-2 flex flex-wrap gap-2.5">
            <div 
              onClick={() => onNavigate?.('tournaments')}
              className="cursor-pointer px-3 py-1.5 rounded-2xl bg-slate-100 dark:bg-[#15231f] hover:bg-slate-200/70 dark:hover:bg-[#1a2d28] border border-slate-200/80 dark:border-white/10 flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 transition-all shadow-sm"
            >
              <Trophy className="w-3.5 h-3.5 text-[#91baaf]" />
              <span><strong>{tournaments.length}</strong> Live Tournaments</span>
            </div>

            <div 
              onClick={() => onNavigate?.('campus')}
              className="cursor-pointer px-3 py-1.5 rounded-2xl bg-slate-100 dark:bg-[#15231f] hover:bg-slate-200/70 dark:hover:bg-[#1a2d28] border border-slate-200/80 dark:border-white/10 flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 transition-all shadow-sm"
            >
              <GraduationCap className="w-3.5 h-3.5 text-[#91baaf]" />
              <span><strong>{campusClubs.length}</strong> Campus Chapters</span>
            </div>

            <div 
              onClick={() => onNavigate?.('careers')}
              className="cursor-pointer px-3 py-1.5 rounded-2xl bg-slate-100 dark:bg-[#15231f] hover:bg-slate-200/70 dark:hover:bg-[#1a2d28] border border-slate-200/80 dark:border-white/10 flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 transition-all shadow-sm"
            >
              <Briefcase className="w-3.5 h-3.5 text-[#91baaf]" />
              <span><strong>{jobs.length}</strong> Career Openings</span>
            </div>

            <div 
              onClick={() => onNavigate?.('discovery')}
              className="cursor-pointer px-3 py-1.5 rounded-2xl bg-slate-100 dark:bg-[#15231f] hover:bg-slate-200/70 dark:hover:bg-[#1a2d28] border border-slate-200/80 dark:border-white/10 flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 transition-all shadow-sm"
            >
              <Compass className="w-3.5 h-3.5 text-[#91baaf]" />
              <span><strong>{allPlayers.length}</strong> Athletes Grounded</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Glass Chat Terminal */}
      <div className="rounded-3xl bg-white dark:bg-[#101c18] shadow-xl flex flex-col h-[640px] overflow-hidden border border-slate-200 dark:border-white/10">
        {/* Terminal Header */}
        <div className="p-4 bg-slate-50 dark:bg-[#121d1a] border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#91baaf] animate-pulse"></div>
            <div>
              <div className="font-semibold text-xs text-slate-900 dark:text-white flex items-center gap-2">
                <span>EE AI Operating System v4.5</span>
                <span className="px-2 py-0.5 bg-[#91baaf]/20 text-[#244b40] dark:text-[#91baaf] text-[10px] font-semibold rounded-full border border-[#91baaf]/30 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  Gemini 3.6 Flash Active
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold rounded-full">Platform Interlinked</span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Synchronized with {currentUser.gamerTag} • {currentUser.primaryGame}</p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClickSound();
              setMessages([messages[0]]);
            }}
            className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/5 transition-colors"
            title="Reset Chat"
            aria-label="Reset Chat"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1.5`}
            >
              <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                {msg.sender === 'assistant' ? (
                  <span className="text-[#336356] dark:text-[#91baaf] font-semibold flex items-center gap-1">
                    <Bot className="w-3 h-3" /> EE AI Coach
                  </span>
                ) : (
                  <span className="text-slate-900 dark:text-white font-semibold">
                    {currentUser.gamerTag}
                  </span>
                )}
                <span>•</span>
                <span className="font-mono text-slate-400 dark:text-slate-500">{msg.timestamp}</span>
                {msg.modelUsed && (
                  <>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#91baaf]/15 text-[#244b40] dark:text-[#91baaf] text-[9px] font-mono border border-[#91baaf]/20">
                      <Sparkles className="w-2.5 h-2.5" />
                      {msg.modelUsed}
                    </span>
                  </>
                )}
              </div>

              <div
                className={`p-4 rounded-3xl max-w-xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-medium shadow-sm'
                    : 'bg-slate-50 dark:bg-[#15231f] border border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-slate-100 shadow-sm'
                }`}
              >
                {/* Render Attached Photos / Documents */}
                {msg.attachments && msg.attachments.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {msg.attachments.map(att => att.type === 'image' ? (
                      <div 
                        key={att.id}
                        onClick={() => setViewingPhotoUrl(att.url)}
                        className="relative group cursor-pointer rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 max-w-[240px] shadow-sm hover:shadow-md transition-all"
                        title="Click to view enlarged photo"
                      >
                        <img src={att.url} alt={att.name} className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-200" />
                        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                          <Eye className="w-6 h-6 drop-shadow" />
                        </div>
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-[10px] text-white truncate font-medium">
                          {att.name} ({att.sizeFormatted})
                        </div>
                      </div>
                    ) : (
                      <div 
                        key={att.id}
                        className="p-3 rounded-2xl bg-white dark:bg-[#121d1a] border border-slate-200 dark:border-white/10 flex items-center gap-3 max-w-xs shadow-sm"
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#91baaf]/15 text-[#244b40] dark:text-[#91baaf] flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="overflow-hidden">
                          <div className="font-semibold text-xs text-slate-900 dark:text-white truncate">{att.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{att.fileExtension.toUpperCase()} • {att.sizeFormatted}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Render Message Text */}
                <div className="space-y-2">
                  {renderFormattedText(msg.text)}
                </div>

                {/* Render Tactical Card HUD if present */}
                {msg.tacticalCard && (
                  <div className="mt-3.5 p-3.5 rounded-2xl bg-white dark:bg-[#101c18] border border-[#91baaf]/30 dark:border-[#91baaf]/20 shadow-sm space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#91baaf]" />
                        <span>{msg.tacticalCard.title}</span>
                      </div>
                      <span className="px-2 py-0.5 bg-[#91baaf]/15 text-[#244b40] dark:text-[#91baaf] text-[10px] font-semibold rounded-full font-mono">
                        {msg.tacticalCard.category}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                      {msg.tacticalCard.keyPoints.map((pt, ptIdx) => (
                        <div key={ptIdx} className="flex items-start gap-1.5">
                          <span className="text-[#91baaf] font-bold shrink-0">•</span>
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>

                    {msg.tacticalCard.checklist && msg.tacticalCard.checklist.length > 0 && (
                      <div className="pt-2 border-t border-slate-100 dark:border-white/5 space-y-1">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">Execution Checklist:</div>
                        <div className="space-y-0.5 text-xs text-slate-600 dark:text-slate-300">
                          {msg.tacticalCard.checklist.map((item, cIdx) => (
                            <div key={cIdx} className="flex items-center gap-1.5">
                              <span className="text-[#91baaf] font-mono">›</span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {msg.tacticalCard.actionItem && (
                      <div className="pt-2 border-t border-slate-100 dark:border-white/5 text-xs font-semibold text-[#244b40] dark:text-[#91baaf] flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 shrink-0" />
                        <span>Takeaway Directive: {msg.tacticalCard.actionItem}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Render Interactive Platform Action Buttons */}
                {msg.actions && msg.actions.length > 0 && (
                  <div className="mt-3.5 pt-3 border-t border-slate-200/70 dark:border-white/10 flex flex-wrap gap-2 animate-fadeIn">
                    {msg.actions.map(action => (
                      <button
                        key={action.id}
                        type="button"
                        onClick={() => handleExecuteAction(action)}
                        className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#121d1a] hover:bg-[#91baaf]/20 dark:hover:bg-[#91baaf]/20 text-slate-800 dark:text-slate-100 hover:text-[#244b40] dark:hover:text-[#91baaf] border border-slate-200 dark:border-white/10 hover:border-[#91baaf]/40 text-xs font-semibold flex items-center gap-2 transition-all shadow-sm transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                      >
                        {renderActionIcon(action.actionType)}
                        <span>{action.label}</span>
                        <ArrowUpRight className="w-3 h-3 opacity-60" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-[#15231f] border border-slate-200 dark:border-white/10 rounded-full w-fit text-xs text-[#244b40] dark:text-[#91baaf] font-semibold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing Platform Telemetry & Competitive Database...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Preset Prompt Chips */}
        <div className="px-4 py-2 bg-slate-50/80 dark:bg-[#121d1a]/80 border-t border-slate-200 dark:border-white/10 flex gap-2 overflow-x-auto">
          {PRESET_TACTICAL_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(prompt)}
              className="px-3.5 py-1.5 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-full whitespace-nowrap transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Zap className="w-3 h-3 text-[#91baaf]" />
              <span>{prompt}</span>
            </button>
          ))}
        </div>

        {/* Pending Draft Attachments Tray */}
        {pendingAttachments.length > 0 && (
          <div className="px-4 py-2 bg-slate-100/90 dark:bg-[#121d1a]/90 border-t border-slate-200 dark:border-white/10 flex items-center gap-2 overflow-x-auto animate-fadeIn">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 shrink-0">Attached:</span>
            {pendingAttachments.map((att, idx) => (
              <div key={att.id} className="relative flex items-center gap-2 px-2.5 py-1 bg-white dark:bg-[#162521] border border-slate-200 dark:border-white/10 rounded-xl text-xs shrink-0 shadow-sm">
                {att.type === 'image' ? (
                  <img src={att.url} alt="thumbnail" className="w-5 h-5 rounded object-cover" />
                ) : (
                  <FileText className="w-4 h-4 text-[#91baaf] shrink-0" />
                )}
                <span className="text-slate-800 dark:text-slate-200 font-medium max-w-[120px] truncate">{att.name}</span>
                <span className="text-[10px] text-slate-400">({att.sizeFormatted})</span>
                <button
                  type="button"
                  onClick={() => removePendingAttachment(idx)}
                  className="p-0.5 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 text-slate-400 hover:text-rose-500"
                  aria-label="Remove attachment"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Input Bar with Attachment Trigger */}
        <div className="p-3.5 bg-white dark:bg-[#101c18] border-t border-slate-200 dark:border-white/10">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={e => handleFilesSelected(e.target.files)}
              accept="image/*,.pdf,.doc,.docx,.txt"
              multiple
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2.5 rounded-2xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors shrink-0"
              title="Attach Match Screenshot or Rulebook"
              aria-label="Attach File"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder={`Ask EE AI about ${currentUser.primaryGame}, tournaments, campus rankings, or jobs...`}
              className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-white/5 border border-transparent focus:border-[#91baaf] text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-400 outline-none transition-all"
            />

            <button
              type="submit"
              disabled={!inputValue.trim() && pendingAttachments.length === 0}
              className="p-2.5 rounded-2xl bg-[#91baaf] hover:bg-[#7ba99d] disabled:opacity-40 disabled:hover:bg-[#91baaf] text-slate-950 transition-all shrink-0 cursor-pointer"
              title="Send to EE AI"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Enlarged Photo Modal View */}
      {viewingPhotoUrl && (
        <div 
          onClick={() => setViewingPhotoUrl(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
        >
          <div className="relative max-w-4xl max-h-[90vh] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10" onClick={e => e.stopPropagation()}>
            <img src={viewingPhotoUrl} alt="Enlarged Telemetry" className="w-full h-auto max-h-[80vh] object-contain" />
            <div className="p-4 bg-slate-950 flex items-center justify-between">
              <span className="text-xs text-slate-300 font-medium">Uploaded Telemetry Screenshot</span>
              <button
                onClick={() => setViewingPhotoUrl(null)}
                className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
