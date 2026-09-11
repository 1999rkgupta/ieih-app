import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Zap, 
  Target, 
  ShieldCheck, 
  RotateCcw
} from 'lucide-react';
import { PlayerPassport } from '../../types';
import { soundManager } from '../../utils/audio';

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
  };
}

const PRESET_TACTICAL_PROMPTS = [
  "How can I optimize my Bind B-Site retake with Jett?",
  "Recommend a weekly aim training schedule for Valorant Immortal rank",
  "Analyze current BGMI meta rotation paths for Erangel Zone 4",
  "What are Tier-1 esports organizations looking for in scrim trials?"
];

export const EEAICompanion: React.FC<{ currentUser: PlayerPassport }> = ({ currentUser }) => {
  const [messages, setMessages] = useState<EEAIMessage[]>([
    {
      id: 'init_welcome',
      sender: 'assistant',
      text: `Hello ${currentUser.gamerTag}. I am EE AI — the national tactical companion for the India Esports Innovation Hub. I am synchronized with your ${currentUser.primaryGame} performance dossier (Level ${currentUser.level} Contender, ${currentUser.primaryRole}). How can I optimize your competitive game today?`,
      timestamp: 'Online',
      tacticalCard: {
        title: `${currentUser.primaryGame} Role Directive`,
        category: 'Player Synergy Audit',
        keyPoints: [
          `Current Primary Role: ${currentUser.primaryRole}`,
          `Scrim Rating MMR: ${currentUser.gamePerformances[currentUser.primaryGame]?.scrimMmr || 2100}`,
          `K/D Benchmark: ${currentUser.gamePerformances[currentUser.primaryGame]?.kdRatio.toFixed(2)} (Verified)`
        ],
        actionItem: 'Focus on communication utility and early site entry trade discipline in tonight\'s scrims.'
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

    // AI Tactical Response Generation
    setTimeout(() => {
      soundManager.playSuccessBeep();
      let replyText = `Analyzing tactical parameters for "${text}"...`;
      let card: EEAIMessage['tacticalCard'] = undefined;

      const lower = text.toLowerCase();
      if (lower.includes('retake') || lower.includes('bind') || lower.includes('jett')) {
        replyText = "For Bind B-Site retakes as Jett, the primary flaw in amateur rosters is dry-peeking Hookah. Use your flash initiator or fade eye before updrafting into container.";
        card = {
          title: 'Bind B-Site Retake Execution',
          category: 'Tactical Playbook',
          keyPoints: [
            'Coordinate double-smoke on Elbow & Garden cross.',
            'Hold dash for post-plant defuse delay or immediate tap-bait.',
            'Maintain crossfire with your CT anchor.'
          ],
          actionItem: 'Practice rapid dash-cancel timings in custom lobbies.'
        };
      } else if (lower.includes('aim') || lower.includes('schedule') || lower.includes('routine')) {
        replyText = "At your current tier, raw aim is secondary to crosshair placement and micro-adjustments. Here is a proven 45-minute daily drill protocol:";
        card = {
          title: 'Immortal/Radiant Daily Warmup Routine',
          category: 'Mechanics Conditioning',
          keyPoints: [
            '15 Mins: Aimlabs Sixshot / Microflex (Precision focus)',
            '15 Mins: The Range (50 bots Strafe + Armor, Sheriff only)',
            '15 Mins: 2x Deathmatches practicing silent crosshair pre-aim'
          ],
          actionItem: 'Never enter competitive rated matches without completing the 30-minute benchmark.'
        };
      } else if (lower.includes('bgmi') || lower.includes('erangel') || lower.includes('rotation')) {
        replyText = "For Erangel Zone 4 shifts, central compound holding (such as Pochinki hills or School apartments) often becomes a high-casualty chokepoint. Transition to edge-holding near water towers.";
        card = {
          title: 'BGMI Zone 4 Edge Rotation',
          category: 'Zone Macro',
          keyPoints: [
            'Secure vehicular mobility (2 Buggies + 1 Dacia minimum).',
            'Split 2-2 scouts 150m apart to avoid entire squad wipeouts.',
            'Smoke line deployment: 6 smokes minimum for open field crossing.'
          ],
          actionItem: 'Assign dedicated smoke-thrower in squad comms.'
        };
      } else {
        replyText = `Understood. Based on your verified passport metrics, I recommend focusing on round-start tempo control and squad utility synchronization. Tier-1 recruiters prioritize consistent trade efficiency over highlight reels.`;
        card = {
          title: 'Competitive Growth Directive',
          category: 'Scout Readiness',
          keyPoints: [
            'Maintain 95%+ attendance in scheduled tournament scrims.',
            'Log verified highlight clips from official tournament lobbies.',
            'Participate in collegiate chapter trials to build team chemistry.'
          ],
          actionItem: 'Review upcoming tournament registrations in Tournament Hub.'
        };
      }

      const botReply: EEAIMessage = {
        id: `bot_${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tacticalCard: card
      };

      setMessages(prev => [...prev, botReply]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#101622] border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-full text-xs font-semibold border border-sky-500/20">
            <Bot className="w-3.5 h-3.5" />
            <span>Tactical Companion Engine</span>
          </div>
          <h2 className="font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            EE AI Tactical Coach & Advisor
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-normal">
            Direct real-time AI strategic analysis for Indian competitive gamers. Scrim playbooks, squad chemistry metrics, weapon recoil patterns, and Tier-1 scout advice.
          </p>
        </div>
      </div>

      {/* Main Glass Chat Terminal */}
      <div className="rounded-3xl bg-white dark:bg-[#101622] shadow-xl flex flex-col h-[580px] overflow-hidden border border-slate-200 dark:border-white/10">
        {/* Terminal Header */}
        <div className="p-4 bg-slate-50 dark:bg-[#131926] border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <div>
              <div className="font-semibold text-xs text-slate-900 dark:text-white flex items-center gap-2">
                <span>EE AI Core System v3.8</span>
                <span className="px-2 py-0.2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold rounded-full">Online</span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Synchronized with {currentUser.gamerTag}</p>
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
                    <Bot className="w-3 h-3" /> EE AI
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
                <p>{msg.text}</p>

                {/* Tactical Card if present */}
                {msg.tacticalCard && (
                  <div className="mt-3.5 p-3.5 rounded-2xl bg-white dark:bg-[#131926] border border-slate-200 dark:border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-semibold">
                      <span className="text-sky-600 dark:text-sky-400 flex items-center gap-1">
                        <Target className="w-3.5 h-3.5" /> {msg.tacticalCard.title}
                      </span>
                      <span className="text-slate-400 uppercase text-[10px]">{msg.tacticalCard.category}</span>
                    </div>

                    <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                      {msg.tacticalCard.keyPoints.map((pt, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                          <span className="text-slate-900 dark:text-white font-medium">{pt}</span>
                        </li>
                      ))}
                    </ul>

                    {msg.tacticalCard.actionItem && (
                      <div className="pt-2 border-t border-slate-200 dark:border-white/10 text-xs font-semibold text-sky-600 dark:text-sky-400">
                        Action Directive: {msg.tacticalCard.actionItem}
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
              <span>Analyzing Tactical Intel...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Preset Prompt Chips (Spotify pill style) */}
        <div className="px-4 py-2 bg-slate-50/80 dark:bg-[#131926]/80 border-t border-slate-200 dark:border-white/10 flex gap-2 overflow-x-auto">
          {PRESET_TACTICAL_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="px-3.5 py-1.5 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-full whitespace-nowrap transition-all shadow-sm"
            >
              {prompt}
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
              placeholder="Ask EE AI anything (scrim tactics, agent lineups, Indian esports roadmap)..."
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
