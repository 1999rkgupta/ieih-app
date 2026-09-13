/**
 * Google Gemini LLM Integration for EE AI Esports Tactical Companion
 * Grounded for India Esports Hub (IEIH) with Full Platform Awareness
 */

import { 
  PlayerPassport, 
  Tournament, 
  CollegiateClub, 
  JobOpportunity 
} from '../types';
import { queryKnowledgeBase } from '../data/arenaXKnowledgeBase';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const PRIMARY_MODEL = 'gemini-3.6-flash';
const FALLBACK_MODEL = 'gemini-2.5-flash-lite';

export interface MessageAttachment {
  id: string;
  name: string;
  type: 'image' | 'document';
  url: string;
  sizeFormatted: string;
  fileExtension: string;
}

export interface TacticalCardData {
  title: string;
  category: string;
  keyPoints: string[];
  actionItem?: string;
  checklist?: string[];
}

export interface PlatformAction {
  id: string;
  label: string;
  actionType: 'NAVIGATE' | 'VIEW_TOURNAMENT' | 'VIEW_CAMPUS' | 'VIEW_JOB' | 'SCOUT_PLAYER' | 'EDIT_PASSPORT' | 'CREATE_POST' | 'SEARCH';
  targetId?: string;
}

export interface CoachResponse {
  replyText: string;
  tacticalCard?: TacticalCardData;
  actions?: PlatformAction[];
  modelUsed: string;
}

export interface PlatformContext {
  currentUser: PlayerPassport;
  allPlayers?: PlayerPassport[];
  tournaments?: Tournament[];
  campusClubs?: CollegiateClub[];
  jobs?: JobOpportunity[];
}

/**
 * Serializes the entire platform state into a high-density intelligence briefing for Gemini
 */
export const buildPlatformContextBriefing = (context: PlatformContext): string => {
  const { currentUser, allPlayers = [], tournaments = [], campusClubs = [], jobs = [] } = context;

  // 1. Current Athlete Profile Details
  const perf = currentUser.gamePerformances[currentUser.primaryGame] || Object.values(currentUser.gamePerformances)[0];
  const athleteSection = `
[CURRENT ATHLETE PROFILE DOSSIER]
- Handle: ${currentUser.gamerTag} (Real Name: ${currentUser.realName || 'Private'})
- Passport Number: ${currentUser.passportNumber} (ID: ${currentUser.id})
- Rank & Tier: Level ${currentUser.level} Contender (${currentUser.tier}) | XP: ${currentUser.currentXp}/${currentUser.nextLevelXp}
- Discipline & Role: ${currentUser.primaryGame} | Primary: ${currentUser.primaryRole} (Secondary: ${currentUser.secondaryRoles?.join(', ') || 'Flex'})
- Verified Badges: ${currentUser.verificationBadgeType} (KYC: ${currentUser.isKycVerified ? 'Verified' : 'Pending'}, Status: ${currentUser.availability})
- Competitive Telemetry (${currentUser.primaryGame}):
  * In-Game IGN: ${perf?.inGameName || 'N/A'} (UID: ${perf?.inGameId || 'N/A'})
  * Current Tier: ${perf?.currentRank || 'Diamond'} (Peak: ${perf?.peakRank || 'Crown/Predator'})
  * K/D Ratio: ${perf?.kdRatio || 3.4} | Win Rate: ${perf?.winRate || 68}% | Headshot %: ${perf?.headshotPct || 42}%
  * Clutches Won: ${perf?.clutchesWon || 24} | Scrim MMR: ${perf?.scrimMmr || 1850} | Hours Played: ${perf?.hoursPlayed || 1200} hrs
  * Signature Weapons/Agents: ${perf?.mainCharactersOrWeapons?.join(', ') || 'M416, Kar98k'}
- Radar Performance Attributes (0-100):
  Aim: ${currentUser.radarStats.aim}, GameSense: ${currentUser.radarStats.gameSense}, Clutch: ${currentUser.radarStats.clutch}, Utility: ${currentUser.radarStats.utility}, Communication: ${currentUser.radarStats.communication}, Aggression: ${currentUser.radarStats.aggression}
- Hardware & Gear:
  * Platform: ${currentUser.gear.deviceOrPlatform}
  * Peripherals: ${currentUser.gear.peripherals}
  * Audio: ${currentUser.gear.audio}
  * Sensitivity: ${currentUser.gear.sensDpi}
- Trophies & Placements: ${currentUser.trophies.map(t => `${t.title} (${t.event}, ${t.tier} Tier)`).join('; ') || 'Contender Scrim Honors'}
- Scrim Attendance: ${currentUser.scrimAttendanceRate}% | Fair-Play Reputation: ${currentUser.reputationScore}/100
`;

  // 2. Platform Tournaments Feed
  const tournamentsSection = `
[ACTIVE PLATFORM TOURNAMENTS HUB]
${tournaments.map(t => `- [ID: ${t.id}] "${t.title}"
  * Game: ${t.game} | Status: ${t.status} | Format: ${t.type}
  * Prize Pool: ${t.prizePoolFormatted} (1st Place: ${t.prizeDistribution?.[0]?.amount || 'Top Share'})
  * Entry Fee: ${t.entryFee} | Capacity: ${t.registeredSlots}/${t.totalSlots} Teams Registered
  * Dates: ${t.startDate} to ${t.endDate} | Venue: ${t.location}
  * Rules / Anti-Cheat: ${t.rulesSummary?.slice(0, 2).join('; ') || 'POV Recording Mandatory'}`).join('\n')}
`;

  // 3. Collegiate Campus Standings
  const campusSection = `
[COLLEGIATE CAMPUS GUILDS & UNIVERSITY CHAPTERS]
${campusClubs.map(c => `- [ID: ${c.id}] "${c.collegeName}" (${c.shortName})
  * Standing: ${c.rankingTier} | City: ${c.city}, ${c.state}
  * Student Roster: ${c.studentRosterCount} Athletes | Top Games: ${c.topGames.join(', ')}
  * Chapter Captain: ${c.captain.gamerTag} | Scrims Contact: ${c.contactEmail}`).join('\n')}
`;

  // 4. Careers & Scouting Opportunities
  const jobsSection = `
[ESPORTS CAREERS & CONTRACT OPPORTUNITIES]
${jobs.map(j => `- [ID: ${j.id}] "${j.title}" at ${j.organization}
  * Category: ${j.roleCategory} (${j.type}) | Game: ${j.game}
  * Location: ${j.location} | Compensation: ${j.compensation}
  * Key Requirements: ${j.requirements?.slice(0, 2).join('; ') || 'Tier-1 Scrim experience'} | Applicants: ${j.applicantCount}`).join('\n')}
`;

  // 5. Radar Candidates
  const otherAthletes = allPlayers.filter(p => p.id !== currentUser.id).slice(0, 5);
  const radarSection = `
[TOP SCOUT RADAR CANDIDATES ON PLATFORM]
${otherAthletes.map(p => `- [ID: ${p.id}] ${p.gamerTag} (${p.passportNumber}) | ${p.primaryGame} ${p.primaryRole} | Level ${p.level} ${p.tier} | K/D: ${p.gamePerformances[p.primaryGame]?.kdRatio || 3.1} | Status: ${p.availability} | Location: ${p.city}, ${p.state}`).join('\n')}
`;

  return [athleteSection, tournamentsSection, campusSection, jobsSection, radarSection].join('\n');
};

/**
 * System prompt to ground EE AI with both tactical expertise, sports/esports guardrails and platform co-pilot powers
 */
const buildSystemInstruction = (platformBriefing: string) => `
You are EE AI — the omniscient Competitive Esports Coach, Tactical Intelligence Companion, and AI Operating System for the India Esports Hub (IEIH).

STRICT DOMAIN & BEHAVIOR PROTOCOLS:
1. GREETINGS & CASUAL TALK:
   When the user sends friendly greetings or casual opening messages (e.g. "hi", "hello", "hey", "how are you", "who are you", "what can you do", "help", "good morning", "yo"):
   - Warmly welcome the user and introduce yourself as their dedicated EE AI Tactical Coach for the India Esports Hub.
   - Proactively suggest and guide the user on what website and sports/esports topics they can explore:
     * 🏆 Active Tournaments, prize pools & team registrations
     * 🎓 Collegiate Campus Standings, university chapters & scrims
     * 🎯 Tactical Game Playbooks (VALORANT, BGMI, Free Fire MAX, CS2, etc.)
     * 💼 Pro Esports Careers, contracts & scouting trials
     * ⚡ Sports Conditioning, aim benchmarks & reaction drills
     * 🪪 Athlete E-Passport stats audit & verification

2. EXCLUSIVE SPORTS & ESPORTS DOMAIN:
   You are strictly permitted to discuss:
   - Competitive Esports (all competitive games, metas, mechanics, positioning, weapon stats, tournament brackets)
   - Traditional Sports & Physical Training (cricket, football, badminton, athletics, stamina, hand-eye reaction drills)
   - The IEIH Application (tournaments, campus guilds, player passports, scouting, careers, ranking)

3. IMMEDIATE REFUSAL FOR IRRELEVANT OFF-TOPIC QUESTIONS:
   If the user asks questions completely outside sports, esports, athletic training, or the IEIH platform (e.g. cooking recipes, movies, politics, school homework, unrelated programming, general finance, etc.), politely decline with:
   "I am the EE AI Tactical Assistant dedicated exclusively to Sports, Esports, and the India Esports Innovation Hub (IEIH) ecosystem. Please ask questions related to competitive gaming, esports athlete passports, tournament registrations, collegiate scrims, or sports training."

YOU HAVE FULL ACCESS TO THE ENTIRE IEIH PLATFORM:
${platformBriefing}

CORE OPERATING PROTOCOLS:
1. Ground every answer in the athlete's real profile, tournaments, university campus chapters, and career board data above.
2. If the user asks about tournaments, colleges, jobs, or scouting, give exact figures (e.g. ₹25,00,000 prize pool, IIT Bombay #1 Campus, etc.) from the live platform data.
3. If the user asks tactical questions or for VOD/screenshot review:
   - Provide high-IQ competitive analysis (Positioning, Crosshair placement, Spacing, Utility protocols, Rotation checklists).
4. ACTION ENGINE & INTERACTIVE BUTTONS:
   Whenever relevant, recommend direct platform actions by placing an action block at the very end of your response.
   Available action types:
   - NAVIGATE: tournaments | campus | careers | discovery | passport
   - VIEW_TOURNAMENT: <tournament_id>
   - VIEW_CAMPUS: <campus_id>
   - VIEW_JOB: <job_id>
   - SCOUT_PLAYER: <player_id>
   - EDIT_PASSPORT
   - CREATE_POST
   - SEARCH

FORMATTING INSTRUCTIONS:
Always structure your responses cleanly.
If you include actions or tactical card, format them as:
---TACTICAL_CARD---
Title: <Short 3-6 word Title>
Category: <Category e.g. Tournament Briefing | Scrim Strategy | Career Scouting | Visual Telemetry>
KeyPoint: <Point 1>
KeyPoint: <Point 2>
KeyPoint: <Point 3>
ActionItem: <Immediate match or platform action item>
Checklist: <Checklist item 1>
Checklist: <Checklist item 2>
---END_TACTICAL_CARD---

---ACTIONS---
Action: <Button Label> | <ACTION_TYPE> | <TARGET_ID_IF_ANY>
Action: <Button Label> | <ACTION_TYPE> | <TARGET_ID_IF_ANY>
---END_ACTIONS---
`;

/**
 * Parses structured card block and platform action block
 */
const parseResponseMeta = (
  fullText: string, 
  athlete: PlayerPassport
): { cleanText: string; card?: TacticalCardData; actions?: PlatformAction[] } => {
  let cleanText = fullText;

  // 1. Parse Tactical Card
  let card: TacticalCardData | undefined = undefined;
  const cardMatch = cleanText.match(/---TACTICAL_CARD---([\s\S]*?)---END_TACTICAL_CARD---/);
  if (cardMatch) {
    cleanText = cleanText.replace(/---TACTICAL_CARD---[\s\S]*?---END_TACTICAL_CARD---/, '').trim();
    const cardBlock = cardMatch[1];
    const titleMatch = cardBlock.match(/Title:\s*(.+)/i);
    const catMatch = cardBlock.match(/Category:\s*(.+)/i);
    const actionMatch = cardBlock.match(/ActionItem:\s*(.+)/i);

    const keyPoints: string[] = [];
    const keyMatches = cardBlock.matchAll(/KeyPoint:\s*(.+)/gi);
    for (const m of keyMatches) {
      if (m[1]?.trim()) keyPoints.push(m[1].trim());
    }

    const checklist: string[] = [];
    const checkMatches = cardBlock.matchAll(/Checklist:\s*(.+)/gi);
    for (const m of checkMatches) {
      if (m[1]?.trim()) checklist.push(m[1].trim());
    }

    card = {
      title: titleMatch ? titleMatch[1].trim() : `${athlete.primaryGame} Tactical Directive`,
      category: catMatch ? catMatch[1].trim() : 'Platform Intelligence',
      keyPoints: keyPoints.length > 0 ? keyPoints : [
        `Athlete: ${athlete.gamerTag} (${athlete.primaryRole})`,
        `Discipline: ${athlete.primaryGame}`,
        'Status: Verified Live'
      ],
      actionItem: actionMatch ? actionMatch[1].trim() : 'Execute this directive in your next lobby.',
      checklist: checklist.length > 0 ? checklist : [
        'Confirm squad positioning & trade angles',
        'Verify tournament eligibility'
      ]
    };
  }

  // 2. Parse Actions
  const actions: PlatformAction[] = [];
  const actionMatch = cleanText.match(/---ACTIONS---([\s\S]*?)---END_ACTIONS---/);
  if (actionMatch) {
    cleanText = cleanText.replace(/---ACTIONS---[\s\S]*?---END_ACTIONS---/, '').trim();
    const actionBlock = actionMatch[1];
    const lines = actionBlock.split('\n');
    for (const line of lines) {
      const match = line.match(/Action:\s*([^|]+)\|\s*([^|]+)(?:\|\s*(.+))?/i);
      if (match) {
        const label = match[1].trim();
        const actionType = match[2].trim() as PlatformAction['actionType'];
        const targetId = match[3] ? match[3].trim() : undefined;
        actions.push({
          id: `act_${Math.random().toString(36).substring(2, 7)}`,
          label,
          actionType,
          targetId
        });
      }
    }
  }

  return { cleanText: cleanText.trim(), card, actions: actions.length > 0 ? actions : undefined };
};

/**
 * Main query function to call AI Engine (Google Gemini or Qwen Ollama Model) with Full Platform Context
 */
export async function askEEAICoach(
  userQuery: string,
  platformContext: PlatformContext,
  attachments: MessageAttachment[] = [],
  conversationHistory: { sender: 'user' | 'assistant'; text: string }[] = [],
  provider: 'gemini' | 'qwen' = 'gemini'
): Promise<CoachResponse> {
  const { currentUser } = platformContext;

  // 1. If QWEN Provider is chosen, route through our backend Qwen API
  if (provider === 'qwen') {
    try {
      const rawBase = import.meta.env.VITE_API_URL 
        || (import.meta.env.DEV ? 'http://localhost:5001/api' : '/api');
      const apiBase = rawBase.endsWith('/api') ? rawBase : `${rawBase.replace(/\/+$/, '')}/api`;
      const response = await fetch(`${apiBase}/ai/qwen`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: userQuery,
          gamerTag: currentUser.gamerTag,
          game: currentUser.primaryGame,
          role: currentUser.primaryRole,
          history: conversationHistory
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.reply) {
          const { cleanText, card, actions } = parseResponseMeta(data.reply, currentUser);
          return {
            replyText: cleanText,
            tacticalCard: card || data.tacticalCard,
            actions,
            modelUsed: data.modelUsed || 'Qwen 30B (qspiders.com)'
          };
        }
      }
    } catch (qwenErr) {
      console.warn('[EE AI] Backend Qwen API failed, falling back to local KB:', qwenErr);
    }

    // Fallback to local tactical knowledge base
    const local = queryKnowledgeBase(userQuery, currentUser.primaryGame);
    return {
      replyText: local.replyText,
      tacticalCard: local.tacticalCard,
      modelUsed: 'Qwen 30B / ARENA-X Fallback'
    };
  }

  // 2. GEMINI Provider
  // Fallback if no key is configured
  if (!GEMINI_API_KEY) {
    const local = queryKnowledgeBase(userQuery, currentUser.primaryGame);
    return {
      replyText: local.replyText,
      tacticalCard: local.tacticalCard,
      modelUsed: 'ARENA-X Offline Grounding Engine'
    };
  }

  // Build high-density platform briefing
  const platformBriefing = buildPlatformContextBriefing(platformContext);

  // Build payload contents
  const contents: any[] = [];

  // Add conversation history (up to last 6 turns for context)
  const recentHistory = conversationHistory.slice(-6);
  for (const item of recentHistory) {
    contents.push({
      role: item.sender === 'user' ? 'user' : 'model',
      parts: [{ text: item.text }]
    });
  }

  // Build current user message parts
  const currentParts: any[] = [];

  // Add any image attachments as inlineData
  for (const att of attachments) {
    if (att.type === 'image' && att.url.startsWith('data:')) {
      const commaIdx = att.url.indexOf(',');
      if (commaIdx !== -1) {
        const mimeMatch = att.url.match(/data:([^;]+);/);
        const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';
        const base64Data = att.url.substring(commaIdx + 1);
        currentParts.push({
          inlineData: {
            mimeType,
            data: base64Data
          }
        });
      }
    } else if (att.type === 'document') {
      currentParts.push({
        text: `[Attached Document: "${att.name}" (${att.sizeFormatted}, ${att.fileExtension.toUpperCase()})]`
      });
    }
  }

  // Add query text
  const promptText = userQuery.trim() 
    ? userQuery 
    : attachments.length > 0 
      ? `Please inspect this attached ${attachments[0].type} (${attachments[0].name}) and give me a full competitive tactical review for ${currentUser.primaryGame}.`
      : 'Hello Coach, give me an update on my status and upcoming tournaments.';

  currentParts.push({ text: promptText });
  contents.push({ role: 'user', parts: currentParts });

  // System instruction with full platform context and strict sports/esports guardrails
  const systemInstruction = {
    parts: [{ text: buildSystemInstruction(platformBriefing) }]
  };

  const modelsToTry = [PRIMARY_MODEL, FALLBACK_MODEL];
  let lastError: any = null;

  for (const model of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          systemInstruction,
          generationConfig: {
            temperature: 0.35,
            maxOutputTokens: 1400
          }
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error?.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (rawText) {
        const { cleanText, card, actions } = parseResponseMeta(rawText, currentUser);
        return {
          replyText: cleanText,
          tacticalCard: card,
          actions,
          modelUsed: `Gemini ${model.replace('models/', '').replace('-preview', '')}`
        };
      }
    } catch (err) {
      lastError = err;
      console.warn(`[EE AI] Model ${model} failed, trying next:`, err);
    }
  }

  // Fallback to local tactical knowledge base
  console.warn('[EE AI] Falling back to local tactical database due to:', lastError);
  const fallback = queryKnowledgeBase(userQuery, currentUser.primaryGame);
  return {
    replyText: fallback.replyText,
    tacticalCard: fallback.tacticalCard,
    modelUsed: 'ARENA-X Tactical Knowledge Base (Offline Guard)'
  };
}
