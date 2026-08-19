import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Cpu, 
  ShieldAlert, 
  Flame, 
  Target, 
  Zap, 
  RotateCcw,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { EEAIMessage, PlayerPassport } from '../../types';
import { soundManager } from '../../utils/audio';

interface EEAICompanionProps {
  currentUser: PlayerPassport;
}

const PRESET_TACTICAL_PROMPTS = [
  '⚡ How do I improve my IGL rotations in BGMI tier-1 lobbies?',
  '🎯 Recommend an aggressive Valorant agent pool for entry fragging',
  '🛡️ What are the requirements to get Tier-1 IEIH Verified Pro status?',
  '🎓 How can my college club register for the Inter-University Cup?',
  '📈 Review my Passport stats and highlight areas for improvement'
];

export const EEAICompanion: React.FC<EEAICompanionProps> = ({ currentUser }) => {
  const [messages, setMessages] = useState<EEAIMessage[]>([
    {
      id: 'msg_welcome',
      sender: 'assistant',
      text: `Tactical AI online. Welcome, Athlete ${currentUser.gamerTag}. I have analyzed your ${currentUser.primaryGame} profile (Tier: ${currentUser.tier}, Rank: ${currentUser.gamePerformances[currentUser.primaryGame]?.currentRank}). How can I assist your competitive progression today?`,
      timestamp: 'Just now',
      tacticalCard: {
        title: 'ATHLETE PERFORMANCE TELEMETRY',
        category: 'TACTICAL OVERVIEW',
        keyPoints: [
          `Primary Discipline: ${currentUser.primaryGame} (${currentUser.primaryRole})`,
          `Current K/D: ${currentUser.gamePerformances[currentUser.primaryGame]?.kdRatio} | Scrim MMR: ${currentUser.gamePerformances[currentUser.primaryGame]?.scrimMmr}`,
          `Reputation Integrity: ${currentUser.reputationScore}/100 (Verified Pro)`
        ],
        actionItem: 'Ask for scrim optimization, lineup playbook, or tournament scout tips.'
      }
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    soundManager.playClickSound();

    const userMsg: EEAIMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Generate intelligent esports response
    setTimeout(() => {
      soundManager.playSuccessBeep();
      let replyText = '';
      let card: EEAIMessage['tacticalCard'] | undefined;

      const lower = text.toLowerCase();
      if (lower.includes('igl') || lower.includes('rotation') || lower.includes('bgmi')) {
        replyText = `For Tier-1 BGMI lobbies (like BMPS/BGIS): prioritize early vehicle split (2-2 or 3-1 scout setup). In Zone 3-4 shifts, establish high ground perimeter control on hard cover rather than compound camping. Keep 4 smokes and 2 flashbangs per assaulter for final circle collapses.`;
        card = {
          title: 'ZONE ROTATION DIRECTIVE',
          category: 'TACTICAL BLUEPRINT',
          keyPoints: [
            'Secure 2 Dacias / UAZ at drop point for mobile barricades',
            'Avoid bottleneck choke bridges — prioritize water flanks or outer perimeter wrap',
            'Allocate grenade utility: minimum 3 frag grenades per frontliner'
          ],
          actionItem: 'Review recent scrim VODs in the IEIH Video Vault.'
        };
      } else if (lower.includes('valorant') || lower.includes('agent') || lower.includes('duelist')) {
        replyText = `For aggressive entry fraggers on the current meta: Pair Jett (Tailwind dash into smokes) or Raze (Blast Pack satchel entries on Haven/Lotus) with an initiator running Flash/Recon (Fade or Gekko). Focus your first bullet accuracy drills to maintain >35% headshot rate.`;
        card = {
          title: 'DUELIST LOADOUT SYNERGY',
          category: 'AGENT RECOMMENDATION',
          keyPoints: [
            'Ascent / Haven: Jett + Sova recon dart synergy',
            'Bind / Lotus: Raze + Fade haunt utility combo',
            'Eco Rounds: Sheriff with crosshair pre-placement on common headshot angles'
          ]
        };
      } else if (lower.includes('verified') || lower.includes('kyc') || lower.includes('status')) {
        replyText = `IEIH Verified Pro status requires: 1) Aadhaar KYC verification, 2) Linked active In-Game Riot/Krafton UID, 3) Minimum Contender Tier ranking with at least 1 verified tournament record. Once verified, your passport receives the luminous cyan shield badge.`;
      } else if (lower.includes('college') || lower.includes('university') || lower.includes('campus')) {
        replyText = `The All-India Inter-University Cup has ₹15,00,000 in prizing and direct student scholarship grants. To qualify, ensure all 5 team members belong to your collegiate chapter with verified university student IDs.`;
      } else {
        replyText = `Telemetry analysis acknowledged. Based on your current ${currentUser.primaryGame} rank and ${currentUser.radarStats.aim}% aim accuracy rating, you are tracking in the top echelon of Indian contenders. Focus on scrim consistency and official tournament registrations to increase your scout visibility.`;
      }

      const aiMsg: EEAIMessage = {
        id: `ai_${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tacticalCard: card
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative p-6 rounded-2xl bg-hud-surface border border-hud-border overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyber-purple/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyber-purple/10 border border-cyber-purple/30 rounded-full text-xs font-orbitron font-bold text-cyber-purple">
            <Bot className="w-3.5 h-3.5" />
            EE AI • ESPORTS ELITE TACTICAL COMPANION
          </div>
          <h2 className="font-orbitron font-black text-2xl sm:text-3xl text-hud-text tracking-wide glow-text-purple">
            IN-GAME TACTICAL INTELLIGENCE & COACHING
          </h2>
          <p className="text-xs font-sans text-hud-muted">
            Direct real-time AI strategic analysis for Indian competitive gamers. Scrim playbooks, squad chemistry metrics, weapon recoil patterns, and Tier-1 scout advice.
          </p>
        </div>
      </div>

      {/* Main HUD Chat Terminal */}
      <div className="rounded-2xl bg-hud-surface border-2 border-cyber-purple/40 shadow-2xl shadow-cyber-purple/15 flex flex-col h-[580px] overflow-hidden">
        {/* Terminal Header */}
        <div className="p-4 bg-hud-card border-b border-hud-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></div>
            <div>
              <div className="font-orbitron font-bold text-xs text-hud-text flex items-center gap-2">
                <span>EE AI CORE SYSTEM V3.8</span>
                <span className="px-1.5 py-0.2 bg-cyber-purple/20 text-cyber-purple text-[10px] rounded">ONLINE</span>
              </div>
              <p className="text-[10px] text-hud-muted font-mono">Telemetry Synchronized with {currentUser.gamerTag}</p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClickSound();
              setMessages([messages[0]]);
            }}
            className="p-1.5 rounded-lg text-hud-muted hover:text-hud-text hover:bg-hud-panel transition-colors"
            title="Reset Terminal"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 font-sans">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1.5`}
            >
              <div className="flex items-center gap-2 text-[10px] font-orbitron text-hud-muted">
                {msg.sender === 'assistant' ? (
                  <span className="text-cyber-purple font-bold flex items-center gap-1">
                    <Bot className="w-3 h-3" /> EE AI TACTICAL
                  </span>
                ) : (
                  <span className="text-cyber-cyan font-bold">
                    {currentUser.gamerTag}
                  </span>
                )}
                <span>•</span>
                <span className="font-mono">{msg.timestamp}</span>
              </div>

              <div
                className={`p-4 rounded-2xl max-w-xl text-xs sm:text-sm leading-relaxed border ${
                  msg.sender === 'user'
                    ? 'bg-cyber-cyan/15 border-cyber-cyan/60 text-hud-text rounded-tr-none shadow-[0_0_12px_rgba(0,240,255,0.15)]'
                    : 'bg-hud-card border-hud-border text-hud-text rounded-tl-none'
                }`}
              >
                <p>{msg.text}</p>

                {/* Tactical HUD Card if present */}
                {msg.tacticalCard && (
                  <div className="mt-3 p-3.5 rounded-xl bg-hud-bg border border-cyber-purple/40 space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-orbitron">
                      <span className="text-cyber-purple font-bold flex items-center gap-1">
                        <Target className="w-3 h-3" /> {msg.tacticalCard.title}
                      </span>
                      <span className="text-hud-muted">{msg.tacticalCard.category}</span>
                    </div>

                    <ul className="space-y-1 text-xs text-hud-muted font-rajdhani">
                      {msg.tacticalCard.keyPoints.map((pt, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyber-purple"></span>
                          <span className="text-hud-text font-medium">{pt}</span>
                        </li>
                      ))}
                    </ul>

                    {msg.tacticalCard.actionItem && (
                      <div className="pt-2 border-t border-hud-border text-[11px] font-rajdhani font-bold text-cyber-cyan">
                        Action Directive: {msg.tacticalCard.actionItem}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 p-3 bg-hud-card border border-hud-border rounded-xl w-fit text-xs text-cyber-purple font-orbitron">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>GENERATING TACTICAL INTEL...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Preset Prompt Chips */}
        <div className="px-4 py-2 bg-hud-card/70 border-t border-hud-border flex gap-2 overflow-x-auto no-scrollbar">
          {PRESET_TACTICAL_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1 bg-hud-bg hover:bg-cyber-purple/20 border border-hud-border hover:border-cyber-purple text-[11px] font-rajdhani font-bold text-hud-muted hover:text-hud-text rounded-full whitespace-nowrap transition-all"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-hud-card border-t border-hud-border">
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
              className="flex-1 px-4 py-2.5 bg-hud-bg border border-hud-border rounded-xl text-xs font-sans text-hud-text focus:outline-none focus:border-cyber-purple"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2.5 bg-cyber-purple text-white rounded-xl hover:bg-cyber-purple/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_12px_rgba(139,92,246,0.4)]"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
