import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Zap, 
  RotateCcw, 
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
  Copy,
  Check,
  Award,
  Maximize2,
  Minimize2,
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
  isOpen?: boolean;
  onClose?: () => void;
  initialPrompt?: string;
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
  fullText?: string;
  isStreaming?: boolean;
  timestamp: string;
  attachments?: MessageAttachment[];
  modelUsed?: string;
  tacticalCard?: TacticalCardData;
  actions?: PlatformAction[];
}

const PRESET_TACTICAL_PROMPTS = [
  "Audit my passport combat stats & aim telemetry",
  "What tournaments are open right now on IEIH?",
  "Which campus is #1 in collegiate rankings?",
  "Are there any pro coaching or analyst contracts?",
  "How to rotate on Erangel Zone 4 in BGMI?",
  "Compare my K/D with top radar athletes",
  "Give me 5 pro clutch discipline habits"
];

export const EEAICompanion: React.FC<EEAICompanionProps> = ({ 
  isOpen = true,
  onClose,
  initialPrompt,
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
      text: `Hello ${currentUser.gamerTag}. I am **EE AI** — your Competitive Esports Tactical Companion and Operating System for the India Esports Hub.\n\nI am synchronized with **your verified athlete dossier**, as well as the **entire live platform database** (${tournaments.length} tournaments, ${campusClubs.length} campus clubs, ${jobs.length} career postings, and ${allPlayers.length} verified athletes).\n\nAsk me about tournament brackets, collegiate standings, scout trials, aim benchmarks, or attach match screenshots for instant multimodal tactical analysis.`,
      timestamp: 'Online',
      modelUsed: 'Gemini 3.6 Flash (Platform Grounded)',
      tacticalCard: {
        title: `${currentUser.primaryGame} Tactical Dossier`,
        category: 'Live Platform Grounding',
        keyPoints: [
          `Athlete Handle: ${currentUser.gamerTag} (${currentUser.passportNumber})`,
          `Role: ${currentUser.primaryRole} | Level ${currentUser.level} Contender`,
          `Telemetry Grounded: ${tournaments.length} Tourneys, ${campusClubs.length} Colleges & ${jobs.length} Contracts`
        ],
        actionItem: 'Ask a tactical question, explore tournament eligibility, or audit your passport.'
      },
      actions: [
        { id: 'act_tourn', label: 'Explore Tournaments', actionType: 'NAVIGATE', targetId: 'tournaments' },
        { id: 'act_campus', label: 'Collegiate Standings', actionType: 'NAVIGATE', targetId: 'campus' },
        { id: 'act_jobs', label: 'Career Contracts', actionType: 'NAVIGATE', targetId: 'careers' },
        { id: 'act_edit', label: 'Edit Passport', actionType: 'EDIT_PASSPORT' }
      ]
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [pendingAttachments, setPendingAttachments] = useState<MessageAttachment[]>([]);
  const [viewingPhotoUrl, setViewingPhotoUrl] = useState<string | null>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputAreaRef = useRef<HTMLTextAreaElement>(null);
  const streamingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, pendingAttachments, scrollToBottom]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = orig;
      };
    }
  }, [isOpen]);

  // Handle initial prompt if passed
  useEffect(() => {
    if (isOpen && initialPrompt && initialPrompt.trim()) {
      handleSendMessage(initialPrompt.trim());
    }
  }, [isOpen, initialPrompt]);

  // Cleanup streaming timer on unmount
  useEffect(() => {
    return () => {
      if (streamingTimerRef.current) clearInterval(streamingTimerRef.current);
    };
  }, []);

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
    if (onClose) onClose();
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
        return <Trophy className="w-3.5 h-3.5 text-[#18483d] dark:text-[#91baaf]" />;
      case 'VIEW_CAMPUS':
        return <GraduationCap className="w-3.5 h-3.5 text-[#18483d] dark:text-[#91baaf]" />;
      case 'VIEW_JOB':
        return <Briefcase className="w-3.5 h-3.5 text-[#18483d] dark:text-[#91baaf]" />;
      case 'SCOUT_PLAYER':
        return <Compass className="w-3.5 h-3.5 text-[#18483d] dark:text-[#91baaf]" />;
      case 'EDIT_PASSPORT':
        return <Edit3 className="w-3.5 h-3.5 text-[#18483d] dark:text-[#91baaf]" />;
      case 'CREATE_POST':
        return <MessageSquarePlus className="w-3.5 h-3.5 text-[#18483d] dark:text-[#91baaf]" />;
      case 'SEARCH':
        return <Search className="w-3.5 h-3.5 text-[#18483d] dark:text-[#91baaf]" />;
      default:
        return <ArrowUpRight className="w-3.5 h-3.5 text-[#18483d] dark:text-[#91baaf]" />;
    }
  };

  // Typewriter streaming effect like ChatGPT
  const streamBotResponse = (
    botMsgId: string, 
    fullText: string, 
    meta: { tacticalCard?: TacticalCardData; actions?: PlatformAction[]; modelUsed?: string }
  ) => {
    let currentIdx = 0;
    const chunkSize = Math.max(2, Math.floor(fullText.length / 35));
    const totalLength = fullText.length;

    const botReply: EEAIMessage = {
      id: botMsgId,
      sender: 'assistant',
      text: '',
      fullText,
      isStreaming: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      tacticalCard: meta.tacticalCard,
      actions: meta.actions,
      modelUsed: meta.modelUsed
    };

    setMessages(prev => [...prev, botReply]);

    if (streamingTimerRef.current) clearInterval(streamingTimerRef.current);

    streamingTimerRef.current = setInterval(() => {
      currentIdx += chunkSize;
      if (currentIdx >= totalLength) {
        if (streamingTimerRef.current) clearInterval(streamingTimerRef.current);
        setMessages(prev => prev.map(m => m.id === botMsgId ? { ...m, text: fullText, isStreaming: false } : m));
        soundManager.playSuccessBeep();
      } else {
        const nextSubstr = fullText.slice(0, currentIdx);
        setMessages(prev => prev.map(m => m.id === botMsgId ? { ...m, text: nextSubstr } : m));
      }
    }, 24);
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

      setIsTyping(false);
      const botMsgId = `bot_${Date.now()}`;
      streamBotResponse(botMsgId, coachResult.replyText, {
        tacticalCard: coachResult.tacticalCard,
        actions: coachResult.actions,
        modelUsed: coachResult.modelUsed
      });
    } catch (err) {
      console.error('[EE AI Error]', err);
      setIsTyping(false);
      const local = queryKnowledgeBase(text, currentUser.primaryGame);
      const botMsgId = `bot_${Date.now()}`;
      streamBotResponse(botMsgId, local.replyText, {
        tacticalCard: local.tacticalCard,
        modelUsed: 'ARENA-X Offline Engine'
      });
    }
  };

  const handleCopyMessage = (msgId: string, text: string) => {
    soundManager.playClickSound();
    navigator.clipboard.writeText(text);
    setCopiedMessageId(msgId);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  // Helper to render markdown-style bold, bullet points, headers & paragraphs
  const renderFormattedText = (text: string, isStreaming = false) => {
    const paragraphs = text.split('\n\n');
    return (
      <div className="space-y-2.5">
        {paragraphs.map((paragraph, pIdx) => {
          const lines = paragraph.split('\n');
          return (
            <div key={pIdx} className="leading-relaxed">
              {lines.map((line, lIdx) => {
                const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('* ') || line.trim().startsWith('• ');
                const cleanLine = isBullet ? line.trim().replace(/^[-*•]\s+/, '') : line;
                const parts = cleanLine.split(/(\*\*.*?\*\*)/g);

                return (
                  <div key={lIdx} className={isBullet ? 'flex items-start gap-2 my-1' : ''}>
                    {isBullet && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1e4d41] dark:bg-[#91baaf] mt-1.5 shrink-0" />
                    )}
                    <div className="flex-1">
                      {parts.map((part, partIdx) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                          return (
                            <strong key={partIdx} className="font-bold text-[#0d2620] dark:text-white">
                              {part.slice(2, -2)}
                            </strong>
                          );
                        }
                        return part;
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
        {isStreaming && (
          <span className="inline-block w-2 h-4 bg-[#153e34] dark:bg-[#91baaf] animate-pulse ml-0.5 align-middle rounded-xs" />
        )}
      </div>
    );
  };

  if (!isOpen) return null;

  return typeof document !== 'undefined' ? createPortal(
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Dark Backdrop Overlay */}
      <div 
        onClick={() => {
          soundManager.playClickSound();
          if (onClose) onClose();
        }}
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity animate-fadeIn cursor-pointer"
        aria-hidden="true"
      />

      {/* Main Sliding Drawer Panel (100% Solid Non-Transparent Background) */}
      <div 
        className={`relative z-10 h-full max-h-[100dvh] bg-[#edf7f4] dark:bg-[#0a1411] text-[#0d2620] dark:text-[#e4f3ef] border-l border-[#91baaf]/50 dark:border-[#91baaf]/30 shadow-[-20px_0_60px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-slideLeft transition-all duration-300 ${
          isExpanded 
            ? 'w-full md:w-[75vw] lg:w-[65vw]' 
            : 'w-full md:w-[50vw] lg:w-[48vw] xl:w-[45vw] min-w-[340px] md:min-w-[480px] max-w-3xl'
        }`}
      >
        {/* Solid Drawer Header */}
        <div className="p-3.5 sm:p-4 border-b border-[#91baaf]/40 dark:border-[#91baaf]/25 bg-[#dbeef7] dark:bg-[#0f1d19] flex items-center justify-between gap-3 shrink-0 shadow-xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-[#153e34] dark:bg-[#91baaf] text-white dark:text-[#090e0c] flex items-center justify-center shadow-sm shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-[#0d2620] dark:text-white truncate">
                  EE AI Tactical Coach
                </span>
                <span className="px-2 py-0.5 bg-[#91baaf]/30 text-[#133c32] dark:text-[#91baaf] text-[9px] font-bold rounded-full border border-[#91baaf]/40 hidden sm:inline-flex items-center gap-1 font-mono">
                  <Sparkles className="w-2.5 h-2.5" />
                  Gemini Live
                </span>
              </div>
              <p className="text-[10px] text-[#30594f] dark:text-[#88b5a9] font-mono truncate">
                Synchronized with {currentUser.gamerTag} • {currentUser.primaryGame}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Expand / Minimize (Desktop only) */}
            <button
              onClick={() => {
                soundManager.playClickSound();
                setIsExpanded(!isExpanded);
              }}
              className="hidden md:flex p-1.5 rounded-xl bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 text-[#30594f] dark:text-[#afd2c6] transition-colors cursor-pointer"
              title={isExpanded ? "Collapse to Half Screen" : "Expand Screen"}
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Reset Chat */}
            <button
              onClick={() => {
                soundManager.playClickSound();
                setMessages([messages[0]]);
              }}
              className="p-1.5 rounded-xl bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 text-[#30594f] dark:text-[#afd2c6] transition-colors cursor-pointer"
              title="Reset Conversation"
              aria-label="Reset Conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                soundManager.playClickSound();
                if (onClose) onClose();
              }}
              className="p-1.5 rounded-xl bg-[#153e34] dark:bg-[#91baaf] text-white dark:text-[#090e0c] hover:opacity-90 transition-all cursor-pointer shadow-xs"
              title="Close AI Slider"
              aria-label="Close AI Slider"
            >
              <X className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>
          </div>
        </div>

        {/* Solid Live Grounding Stats Bar */}
        <div className="px-3.5 py-2 bg-[#e2f1ec] dark:bg-[#0c1915] border-b border-[#91baaf]/30 dark:border-[#91baaf]/20 flex items-center justify-between gap-2 overflow-x-auto text-[10px] shrink-0 font-mono text-[#285348] dark:text-[#88b5a9]">
          <div className="flex items-center gap-3 shrink-0">
            <span className="flex items-center gap-1 font-semibold text-emerald-800 dark:text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse"></span>
              {tournaments.length} Tournaments
            </span>
            <span>•</span>
            <span>{campusClubs.length} Colleges</span>
            <span>•</span>
            <span>{jobs.length} Careers</span>
            <span>•</span>
            <span>{allPlayers.length} Athletes</span>
          </div>
          <span className="hidden sm:inline text-[9px] opacity-75">Protocol v2.6</span>
        </div>

        {/* Solid High-Contrast Chat Message Container */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-5 space-y-4 bg-[#e4f3ee] dark:bg-[#08100e]">
          {messages.map(msg => {
            const isUser = msg.sender === 'user';

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1.5 animate-fadeIn`}
              >
                {/* Message Sender Info */}
                <div className="flex items-center gap-2 text-[10px] text-[#30594f] dark:text-[#88b5a9] font-medium px-1">
                  {isUser ? (
                    <span className="font-bold text-[#0d2620] dark:text-white">
                      {currentUser.gamerTag}
                    </span>
                  ) : (
                    <span className="font-bold text-[#143e34] dark:text-[#91baaf] flex items-center gap-1">
                      <Bot className="w-3 h-3" /> EE AI Coach
                    </span>
                  )}
                  <span>•</span>
                  <span className="font-mono text-[9px] opacity-75">{msg.timestamp}</span>
                  {msg.modelUsed && (
                    <>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full bg-[#91baaf]/25 text-[#153e34] dark:text-[#91baaf] text-[8.5px] font-mono border border-[#91baaf]/30">
                        <Sparkles className="w-2 h-2" />
                        {msg.modelUsed}
                      </span>
                    </>
                  )}
                </div>

                {/* Solid Message Bubble */}
                <div
                  className={`p-3.5 sm:p-4 rounded-2xl max-w-[92%] sm:max-w-[85%] text-xs sm:text-sm leading-relaxed shadow-sm relative ${
                    isUser
                      ? 'bg-[#153e34] text-white dark:bg-[#91baaf] dark:text-[#060c0a] font-medium rounded-tr-xs shadow-md border border-transparent'
                      : 'bg-white dark:bg-[#12201b] border border-[#91baaf]/50 dark:border-[#91baaf]/25 text-[#0d2620] dark:text-[#e4f3ef] rounded-tl-xs shadow-sm'
                  }`}
                >
                  {/* Attached Photos / Documents */}
                  {msg.attachments && msg.attachments.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {msg.attachments.map(att => att.type === 'image' ? (
                        <div 
                          key={att.id}
                          onClick={() => setViewingPhotoUrl(att.url)}
                          className="relative group/att cursor-pointer rounded-xl overflow-hidden border border-[#91baaf]/40 max-w-[200px] shadow-sm hover:scale-[1.02] transition-transform"
                          title="Click to enlarge screenshot"
                        >
                          <img src={att.url} alt={att.name} className="w-full h-28 object-cover" />
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/att:opacity-100 transition-opacity flex items-center justify-center text-white">
                            <Eye className="w-5 h-5 drop-shadow" />
                          </div>
                          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-1.5 text-[9px] text-white truncate">
                            {att.name} ({att.sizeFormatted})
                          </div>
                        </div>
                      ) : (
                        <div 
                          key={att.id}
                          className="p-2.5 rounded-xl bg-black/10 dark:bg-white/10 flex items-center gap-2 max-w-xs text-xs"
                        >
                          <FileText className="w-4 h-4 shrink-0" />
                          <div className="overflow-hidden">
                            <div className="font-semibold truncate text-[11px]">{att.name}</div>
                            <div className="text-[9px] opacity-75 font-mono">{att.fileExtension.toUpperCase()} • {att.sizeFormatted}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Message Content */}
                  {renderFormattedText(msg.text, msg.isStreaming)}

                  {/* Tactical Dossier Card HUD */}
                  {msg.tacticalCard && (
                    <div className="mt-3.5 p-3 rounded-xl bg-[#f0faf6] dark:bg-[#0b1613] border border-[#91baaf]/40 dark:border-[#91baaf]/30 shadow-2xs space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-xs text-[#0d2620] dark:text-white flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#286b5c] dark:text-[#91baaf]" />
                          <span>{msg.tacticalCard.title}</span>
                        </div>
                        <span className="px-2 py-0.2 bg-[#91baaf]/25 text-[#133c32] dark:text-[#91baaf] text-[9px] font-bold rounded-full font-mono border border-[#91baaf]/40">
                          {msg.tacticalCard.category}
                        </span>
                      </div>

                      <div className="space-y-1 text-xs text-[#285045] dark:text-[#a0c7bd]">
                        {msg.tacticalCard.keyPoints.map((pt, ptIdx) => (
                          <div key={ptIdx} className="flex items-start gap-1.5">
                            <span className="text-[#286b5c] dark:text-[#91baaf] font-bold">•</span>
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>

                      {msg.tacticalCard.checklist && msg.tacticalCard.checklist.length > 0 && (
                        <div className="pt-2 border-t border-[#91baaf]/20 space-y-1">
                          <div className="text-[9px] font-mono uppercase tracking-wider text-[#30594f] dark:text-[#88b5a9]">Checklist:</div>
                          <div className="space-y-0.5 text-xs text-[#285045] dark:text-[#a0c7bd]">
                            {msg.tacticalCard.checklist.map((item, cIdx) => (
                              <div key={cIdx} className="flex items-center gap-1.5">
                                <span className="text-[#286b5c] dark:text-[#91baaf] font-mono">›</span>
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {msg.tacticalCard.actionItem && (
                        <div className="pt-2 border-t border-[#91baaf]/20 text-xs font-semibold text-[#18483d] dark:text-[#91baaf] flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 shrink-0" />
                          <span>Key Directive: {msg.tacticalCard.actionItem}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Interactive Action Buttons */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-[#91baaf]/25 flex flex-wrap gap-1.5 animate-fadeIn">
                      {msg.actions.map(action => (
                        <button
                          key={action.id}
                          type="button"
                          onClick={() => handleExecuteAction(action)}
                          className="px-3 py-1.5 rounded-xl bg-[#eaf5f1] dark:bg-[#162723] hover:bg-[#d8eee6] dark:hover:bg-[#1f3731] text-[#0d2620] dark:text-[#e4f3ef] border border-[#91baaf]/40 dark:border-[#91baaf]/25 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs active:scale-95 cursor-pointer"
                        >
                          {renderActionIcon(action.actionType)}
                          <span>{action.label}</span>
                          <ArrowUpRight className="w-3 h-3 opacity-60" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Copy Button */}
                  {!isUser && !msg.isStreaming && (
                    <div className="mt-2.5 pt-1.5 border-t border-[#91baaf]/20 flex items-center justify-between text-[10px] text-[#30594f] dark:text-[#88b5a9]">
                      <button
                        onClick={() => handleCopyMessage(msg.id, msg.text)}
                        className="flex items-center gap-1 hover:text-[#0d2620] dark:hover:text-white transition-colors cursor-pointer font-medium"
                        title="Copy response"
                      >
                        {copiedMessageId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                      <span className="text-[9px] font-mono opacity-70">Verified AI Telemetry</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Thinking / Analyzing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white dark:bg-[#12201b] border border-[#91baaf]/50 dark:border-[#91baaf]/30 shadow-sm w-fit text-xs text-[#18483d] dark:text-[#91baaf] font-semibold animate-pulse">
              <Sparkles className="w-4 h-4 animate-spin text-[#286b5c] dark:text-[#91baaf]" />
              <span>Analyzing esports telemetry & live tournament data...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Solid Preset Prompt Suggestions Bar */}
        <div className="px-3.5 py-2.5 bg-[#dbeee8] dark:bg-[#0c1815] border-t border-[#91baaf]/40 dark:border-[#91baaf]/25 flex gap-2 overflow-x-auto shrink-0 no-scrollbar">
          {PRESET_TACTICAL_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1 bg-white dark:bg-[#142420] hover:bg-[#c9e8de] dark:hover:bg-[#1a302a] text-[#133c32] dark:text-[#afd2c6] hover:text-[#0d2620] dark:hover:text-white border border-[#91baaf]/40 dark:border-[#91baaf]/30 text-xs font-semibold rounded-full whitespace-nowrap transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer shrink-0 active:scale-95"
            >
              <Zap className="w-3 h-3 text-[#286b5c] dark:text-[#91baaf]" />
              <span>{prompt}</span>
            </button>
          ))}
        </div>

        {/* Attached Files Preview */}
        {pendingAttachments.length > 0 && (
          <div className="px-3.5 py-2 bg-[#d2ece3] dark:bg-[#0b1613] border-t border-[#91baaf]/30 flex items-center gap-2 overflow-x-auto shrink-0 animate-fadeIn">
            <span className="text-[11px] font-semibold text-[#30594f] dark:text-[#88b5a9] shrink-0">Attached:</span>
            {pendingAttachments.map((att, idx) => (
              <div key={att.id} className="relative flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-[#162723] border border-[#91baaf]/40 dark:border-[#91baaf]/25 rounded-xl text-xs shrink-0 shadow-xs">
                {att.type === 'image' ? (
                  <img src={att.url} alt="thumbnail" className="w-5 h-5 rounded object-cover" />
                ) : (
                  <FileText className="w-4 h-4 text-[#286b5c]" />
                )}
                <span className="truncate max-w-[100px] text-[11px] font-medium">{att.name}</span>
                <button
                  type="button"
                  onClick={() => removePendingAttachment(idx)}
                  className="p-0.5 hover:bg-rose-500/20 text-rose-600 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Solid Input Area */}
        <div className="p-3 sm:p-4 bg-[#dbeee8] dark:bg-[#0c1815] border-t border-[#91baaf]/40 dark:border-[#91baaf]/25 shrink-0 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-end gap-2"
          >
            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,.pdf,.doc,.docx"
              onChange={(e) => handleFilesSelected(e.target.files)}
              className="hidden"
            />

            {/* Paperclip Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2.5 rounded-2xl bg-white dark:bg-[#142420] hover:bg-[#c9e8de] dark:hover:bg-[#1a302a] text-[#285348] dark:text-[#afd2c6] border border-[#91baaf]/40 dark:border-[#91baaf]/30 transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
              title="Attach match screenshot or document"
              aria-label="Attach file"
            >
              <Paperclip className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>

            {/* Chat Text Input Area */}
            <div className="flex-1 min-w-0 relative">
              <textarea
                ref={inputAreaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ask tactical advice, explore tournaments, or query players..."
                rows={1}
                className="w-full py-2.5 px-3.5 bg-white dark:bg-[#142420] text-[#0d2620] dark:text-white placeholder-[#4b7a6f] dark:placeholder-[#6d998e] text-xs sm:text-sm rounded-2xl border border-[#91baaf]/50 dark:border-[#91baaf]/30 focus:outline-none focus:ring-2 focus:ring-[#91baaf]/50 resize-none max-h-32 shadow-xs transition-all"
              />
            </div>

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputValue.trim() && pendingAttachments.length === 0}
              className={`p-2.5 rounded-2xl font-bold flex items-center justify-center transition-all shadow-md shrink-0 cursor-pointer ${
                inputValue.trim() || pendingAttachments.length > 0
                  ? 'bg-[#153e34] dark:bg-[#91baaf] text-white dark:text-[#090e0c] hover:scale-105 active:scale-95'
                  : 'bg-[#91baaf]/30 dark:bg-white/10 text-[#456f64] dark:text-white/30 cursor-not-allowed'
              }`}
              title="Send Message"
              aria-label="Send message"
            >
              <Send className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>
          </form>

          {/* Telemetry Micro Footer */}
          <div className="mt-2 text-center text-[9.5px] font-mono text-[#3d655a] dark:text-[#88b5a9]">
            EE AI Companion • Grounded in IEIH Esports Trust & Tournament DB
          </div>
        </div>
      </div>

      {/* Enlarged Photo Modal Preview */}
      {viewingPhotoUrl && (
        <div 
          onClick={() => setViewingPhotoUrl(null)}
          className="fixed inset-0 bg-black/90 z-[200] flex items-center justify-center p-4 backdrop-blur-md cursor-pointer animate-fadeIn"
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-white/20">
            <img src={viewingPhotoUrl} alt="Enlarged screenshot" className="w-full h-full object-contain" />
            <button
              onClick={() => setViewingPhotoUrl(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>,
    document.body
  ) : null;
};

export default EEAICompanion;
