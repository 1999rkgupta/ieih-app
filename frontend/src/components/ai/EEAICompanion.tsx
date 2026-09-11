import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Zap, 
  Target, 
  ShieldCheck, 
  RotateCcw,
  BookOpen,
  CheckCircle2,
  Layers,
  Award
} from 'lucide-react';
import { PlayerPassport } from '../../types';
import { soundManager } from '../../utils/audio';
import { queryKnowledgeBase, QUICK_REFERENCE_CHECKLISTS } from '../../data/arenaXKnowledgeBase';

interface EEAIMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  tacticalCard?: {
    title: string;
    category: string;
    keyPoints: string[];
    actionItem?: string;
    checklist?: string[];
  };
}

const PRESET_TACTICAL_PROMPTS = [
  "How to rotate on Erangel Zone 4 in BGMI?",
  "Explain gloo-wall peeking in Free Fire MAX",
  "Attack-side defaults on Valorant Ascent",
  "What do Tier-1 scouts look for in trials?",
  "Show Battle Royale Rotation Checklist",
  "What is the Team Fight checklist?",
  "What are the 50 rules of esports coaching?"
];

export const EEAICompanion: React.FC<{ currentUser: PlayerPassport }> = ({ currentUser }) => {
  const [messages, setMessages] = useState<EEAIMessage[]>([
    {
      id: 'init_welcome',
      sender: 'assistant',
      text: `Hello ${currentUser.gamerTag}. I am EE AI — powered by the official **ARENA-X Esports & Competitive Gaming Knowledge Base** (200+ Pages: BGMI, Free Fire MAX, VALORANT, Industry Careers, and Tournament Literacy).\n\nI am synchronized with your **${currentUser.primaryGame}** passport profile (Level ${currentUser.level} Contender, ${currentUser.primaryRole}). Ask me anything about rotations, compound defense, site retakes, gloo-wall timing, trial preparation, or tournament rulebooks.`,
      timestamp: 'Online',
      tacticalCard: {
        title: `${currentUser.primaryGame} Grounded Playbook`,
        category: 'ARENA-X Knowledge Base v1.0',
        keyPoints: [
          `Athlete Handle: ${currentUser.gamerTag} (${currentUser.passportNumber})`,
          `Verified Primary Role: ${currentUser.primaryRole}`,
          `Grounded Topics: Rotations, Compounds, Defaults, Retakes, Scouting & VODs`
        ],
        actionItem: 'Ask a specific tactical scenario below or pick from the recommended queries.'
      }
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    soundManager.playClickSound();

    const userMsg: EEAIMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // AI Tactical Response Generation Grounded in ARENA-X Database
    setTimeout(() => {
      soundManager.playSuccessBeep();

      const knowledgeResult = queryKnowledgeBase(text, currentUser.primaryGame);

      const botReply: EEAIMessage = {
        id: `bot_${Date.now()}`,
        sender: 'assistant',
        text: knowledgeResult.replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tacticalCard: knowledgeResult.tacticalCard
      };

      setMessages(prev => [...prev, botReply]);
      setIsTyping(false);
    }, 600);
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
      {/* Header Banner */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#101622] border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm">
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-full text-xs font-semibold border border-sky-500/20">
              <Bot className="w-3.5 h-3.5" />
              <span>ARENA-X Grounded Engine</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full text-xs font-semibold border border-amber-500/20">
              <BookOpen className="w-3.5 h-3.5" />
              <span>200+ Pages Esports Knowledge Base</span>
            </div>
          </div>
          <h2 className="font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            EE AI Tactical Coach & Advisor
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-normal">
            Direct real-time strategic analysis grounded in the official ARENA-X Knowledge Base. Covers BGMI Erangel/Miramar rotations, Free Fire MAX gloo-wall combat, VALORANT attack defaults/retakes, and Tier-1 scouting pathways.
          </p>
        </div>
      </div>

      {/* Main Glass Chat Terminal */}
      <div className="rounded-3xl bg-white dark:bg-[#101622] shadow-xl flex flex-col h-[600px] overflow-hidden border border-slate-200 dark:border-white/10">
        {/* Terminal Header */}
        <div className="p-4 bg-slate-50 dark:bg-[#131926] border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <div>
              <div className="font-semibold text-xs text-slate-900 dark:text-white flex items-center gap-2">
                <span>EE AI Core System v4.0 (ARENA-X Grounded)</span>
                <span className="px-2 py-0.2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold rounded-full">Active Grounding</span>
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
                  <span className="text-sky-600 dark:text-sky-400 font-semibold flex items-center gap-1">
                    <Bot className="w-3 h-3" /> EE AI Coach
                  </span>
                ) : (
                  <span className="text-slate-900 dark:text-white font-semibold">
                    {currentUser.gamerTag}
                  </span>
                )}
                <span>•</span>
                <span className="font-mono text-slate-400 dark:text-slate-500">{msg.timestamp}</span>
              </div>

              <div
                className={`p-4 rounded-3xl max-w-xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-medium shadow-sm'
                    : 'bg-slate-50 dark:bg-[#182032] border border-slate-200/80 dark:border-white/10 text-slate-800 dark:text-slate-100 shadow-sm'
                }`}
              >
                <div>{renderFormattedText(msg.text)}</div>

                {/* Tactical Card if present */}
                {msg.tacticalCard && (
                  <div className="mt-4 p-4 rounded-2xl bg-white dark:bg-[#131926] border border-slate-200 dark:border-white/10 space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] font-semibold border-b border-slate-100 dark:border-white/5 pb-2">
                      <span className="text-sky-600 dark:text-sky-400 flex items-center gap-1.5 font-bold">
                        <Target className="w-3.5 h-3.5" /> {msg.tacticalCard.title}
                      </span>
                      <span className="text-slate-400 uppercase text-[10px] font-mono">{msg.tacticalCard.category}</span>
                    </div>

                    <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                      {msg.tacticalCard.keyPoints.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0 mt-1.5"></span>
                          <span className="text-slate-800 dark:text-slate-200 font-medium">{pt}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Checklist if provided */}
                    {msg.tacticalCard.checklist && msg.tacticalCard.checklist.length > 0 && (
                      <div className="pt-2 border-t border-slate-100 dark:border-white/5 space-y-1">
                        <div className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          Inspection Checklist:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-slate-600 dark:text-slate-400">
                          {msg.tacticalCard.checklist.map((item, cIdx) => (
                            <div key={cIdx} className="flex items-center gap-1.5">
                              <span className="text-sky-500 font-mono">›</span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {msg.tacticalCard.actionItem && (
                      <div className="pt-2 border-t border-slate-100 dark:border-white/5 text-xs font-semibold text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 shrink-0" />
                        <span>Action Directive: {msg.tacticalCard.actionItem}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-[#182032] border border-slate-200 dark:border-white/10 rounded-full w-fit text-xs text-sky-600 dark:text-sky-400 font-semibold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Querying ARENA-X Knowledge Base...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Preset Prompt Chips (Categorized Knowledge Topics) */}
        <div className="px-4 py-2 bg-slate-50/80 dark:bg-[#131926]/80 border-t border-slate-200 dark:border-white/10 flex gap-2 overflow-x-auto">
          {PRESET_TACTICAL_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="px-3.5 py-1.5 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-full whitespace-nowrap transition-all shadow-sm flex items-center gap-1.5"
            >
              <Zap className="w-3 h-3 text-sky-500" />
              <span>{prompt}</span>
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3.5 bg-white dark:bg-[#101622] border-t border-slate-200 dark:border-white/10">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask EE AI anything (Erangel rotations, gloo-wall peeks, Ascent defaults, scouting trials)..."
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-[#182032] border border-slate-200 dark:border-white/10 rounded-full text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-sky-500"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2.5 bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 rounded-full transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
