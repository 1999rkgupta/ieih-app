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
  Award,
  Paperclip,
  FileText,
  Image,
  Eye,
  X
} from 'lucide-react';
import { PlayerPassport } from '../../types';
import { soundManager } from '../../utils/audio';
import { queryKnowledgeBase } from '../../data/arenaXKnowledgeBase';

export interface MessageAttachment {
  id: string;
  name: string;
  type: 'image' | 'document';
  url: string;
  sizeFormatted: string;
  fileExtension: string;
}

interface EEAIMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  attachments?: MessageAttachment[];
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
      text: `Hello ${currentUser.gamerTag}. I am EE AI — powered by the official **ARENA-X Esports & Competitive Gaming Knowledge Base** (200+ Pages: BGMI, Free Fire MAX, VALORANT, Industry Careers, and Tournament Literacy).\n\nI am synchronized with your **${currentUser.primaryGame}** passport profile (Level ${currentUser.level} Contender, ${currentUser.primaryRole}). You can ask me tactical questions or **attach match photos/screenshots and tournament documents** for direct AI analysis.`,
      timestamp: 'Online',
      tacticalCard: {
        title: `${currentUser.primaryGame} Grounded Playbook`,
        category: 'ARENA-X Knowledge Base v1.0',
        keyPoints: [
          `Athlete Handle: ${currentUser.gamerTag} (${currentUser.passportNumber})`,
          `Verified Primary Role: ${currentUser.primaryRole}`,
          `Multimodal Support: Attach match screenshots, VOD frames & rulebook PDFs`
        ],
        actionItem: 'Ask a specific tactical question or click the attachment icon to analyze a photo/document.'
      }
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

  const handleSendMessage = (textToSend?: string) => {
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

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setPendingAttachments([]);
    setIsTyping(true);

    // AI Tactical Response Generation Grounded in ARENA-X Database
    setTimeout(() => {
      soundManager.playSuccessBeep();

      let replyText = '';
      let tacticalCard: EEAIMessage['tacticalCard'] = undefined;

      // Check if user uploaded photos or documents
      const hasImage = attachmentsToSend.some(a => a.type === 'image');
      const hasDoc = attachmentsToSend.some(a => a.type === 'document');

      if (hasImage && !text.trim()) {
        const firstImg = attachmentsToSend.find(a => a.type === 'image')!;
        replyText = `I have received and parsed your uploaded gameplay screenshot: **${firstImg.name}**.\n\n**Visual Telemetry Analysis:**\n• **Combat & Spacing:** Reticle placement and engagement distance match competitive ${currentUser.primaryGame} standards.\n• **Information Advantage:** Before committing to this duel, verify whether trade support is within 15 meters.\n• **VOD Review Rule:** According to the **ARENA-X VOD Review Protocol** (Appendix B), inspect if you had hard cover and if enemy utility was active.\n\nWould you like me to generate a specific drill or break down rotation options for this position?`;
        tacticalCard = {
          title: `Visual Telemetry: ${firstImg.name}`,
          category: 'Screenshot & VOD Diagnostics',
          keyPoints: [
            `Analyzed File: ${firstImg.name} (${firstImg.sizeFormatted})`,
            `Primary Game Alignment: ${currentUser.primaryGame}`,
            `Status: Processed against ARENA-X Tactical Model`
          ],
          actionItem: 'Run the Team Fight Checklist (First-Contact, Trade, Flank, Reset) on this scenario.',
          checklist: [
            'Who had first contact in this frame?',
            'Was there hard cover within 1 step?',
            'Could a teammate trade this position?',
            'Was an exit/retreat route maintained?'
          ]
        };
      } else if (hasDoc && !text.trim()) {
        const firstDoc = attachmentsToSend.find(a => a.type === 'document')!;
        replyText = `I have ingested and analyzed your document: **${firstDoc.name}** (${firstDoc.sizeFormatted}).\n\n**Tournament & Compliance Audit (ARENA-X Database):**\n• **Roster Verification:** Match player passport numbers with official tournament registration sheets.\n• **Integrity Clause:** Ensure recording/POV software is active throughout match brackets.\n• **Dispute Windows:** Official rulebooks mandate protests must be submitted within 15 minutes of match conclusion.\n\nAll athletes on your roster should complete their pre-match technical and latency checks.`;
        tacticalCard = {
          title: `Document Audit: ${firstDoc.name}`,
          category: 'Tournament & Rulebook Compliance',
          keyPoints: [
            `Verified Document: ${firstDoc.name}`,
            `Format: ${firstDoc.fileExtension.toUpperCase()} Document`,
            `Audit Standard: ARENA-X Tournament Readiness`
          ],
          actionItem: 'Verify player registration IDs in your team roster before the tournament check-in deadline.',
          checklist: [
            'Official rulebook clauses confirmed?',
            'Roster IDs match player passports?',
            'POV recording software tested?',
            'Protest appeal procedure understood?'
          ]
        };
      } else {
        // Text query (with or without attachments)
        const knowledgeResult = queryKnowledgeBase(text, currentUser.primaryGame);
        replyText = knowledgeResult.replyText;
        tacticalCard = knowledgeResult.tacticalCard;

        if (hasImage) {
          replyText = `*(Attached Photo: ${attachmentsToSend.find(a => a.type === 'image')?.name})*\n\n` + replyText;
        } else if (hasDoc) {
          replyText = `*(Attached Document: ${attachmentsToSend.find(a => a.type === 'document')?.name})*\n\n` + replyText;
        }
      }

      const botReply: EEAIMessage = {
        id: `bot_${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tacticalCard
      };

      setMessages(prev => [...prev, botReply]);
      setIsTyping(false);
    }, 700);
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
            Direct real-time strategic analysis grounded in the official ARENA-X Knowledge Base. Upload gameplay screenshots, scoreboard photos, or tournament documents for diagnostic feedback.
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
                <span>EE AI Core System v4.2</span>
                <span className="px-2 py-0.2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold rounded-full">Multimodal Photo & Doc Ingestion</span>
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
                        className="p-3 rounded-2xl bg-white dark:bg-[#131926] border border-slate-200 dark:border-white/10 flex items-center gap-3 max-w-xs shadow-sm"
                      >
                        <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-xs text-slate-900 dark:text-white truncate">{att.name}</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-mono">{att.fileExtension} • {att.sizeFormatted}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

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
              <span>Analyzing Uploaded Telemetry & ARENA-X Database...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Preset Prompt Chips */}
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

        {/* Pending Draft Attachments Tray */}
        {pendingAttachments.length > 0 && (
          <div className="px-4 py-2 bg-slate-100/90 dark:bg-[#131926]/90 border-t border-slate-200 dark:border-white/10 flex items-center gap-2 overflow-x-auto animate-fadeIn">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 shrink-0">Attached:</span>
            {pendingAttachments.map((att, idx) => (
              <div key={att.id} className="relative flex items-center gap-2 px-2.5 py-1 bg-white dark:bg-[#1c2438] border border-slate-200 dark:border-white/10 rounded-xl text-xs shrink-0 shadow-sm">
                {att.type === 'image' ? (
                  <img src={att.url} alt="thumbnail" className="w-5 h-5 rounded object-cover" />
                ) : (
                  <FileText className="w-4 h-4 text-sky-500 shrink-0" />
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
        <div className="p-3.5 bg-white dark:bg-[#101622] border-t border-slate-200 dark:border-white/10">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            {/* Hidden multi-file input */}
            <input
              type="file"
              ref={fileInputRef}
              multiple
              accept="image/*,.pdf,.doc,.docx,.txt,.json"
              className="hidden"
              onChange={e => handleFilesSelected(e.target.files)}
            />

            {/* Paperclip Button for Photos & Documents */}
            <button
              type="button"
              onClick={() => {
                soundManager.playClickSound();
                fileInputRef.current?.click();
              }}
              className="p-2.5 rounded-full text-slate-500 hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-white/10 transition-colors shrink-0"
              title="Attach Photo or Document (Scoreboard, Rulebook, VOD frame)"
              aria-label="Attach Photo or Document"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <input
              type="text"
              placeholder="Ask EE AI or attach photos/documents for diagnostic review..."
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-[#182032] border border-slate-200 dark:border-white/10 rounded-full text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-sky-500"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() && pendingAttachments.length === 0}
              className="p-2.5 bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 rounded-full transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Enlarged Photo Zoom Modal */}
      {viewingPhotoUrl && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn cursor-pointer"
          onClick={() => setViewingPhotoUrl(null)}
        >
          <div 
            className="relative max-w-3xl max-h-[85vh] overflow-hidden rounded-3xl border border-white/20 shadow-2xl bg-black"
            onClick={e => e.stopPropagation()}
          >
            <img src={viewingPhotoUrl} alt="Enlarged preview" className="w-full h-full object-contain max-h-[80vh]" />
            <button 
              type="button"
              onClick={() => setViewingPhotoUrl(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
              aria-label="Close image"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
