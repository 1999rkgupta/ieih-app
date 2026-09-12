/**
 * Google Gemini LLM Integration for EE AI Esports Tactical Companion
 * Grounded for India Esports Hub (IEIH)
 */

import { PlayerPassport } from '../types';
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

export interface CoachResponse {
  replyText: string;
  tacticalCard?: TacticalCardData;
  modelUsed: string;
}

/**
 * System prompt to ground EE AI as the tier-1 competitive esports coach
 */
const buildSystemInstruction = (athlete: PlayerPassport) => `
You are EE AI, the competitive esports coach and tactical intelligence companion for the India Esports Hub (IEIH).
You are working directly with athlete ${athlete.gamerTag} (${athlete.passportNumber}), who is a Level ${athlete.level} Contender playing primary role: ${athlete.primaryRole} in ${athlete.primaryGame}.

Coaching Guidelines:
1. Provide sharp, high-IQ esports tactical advice. Be encouraging yet authoritative and analytically rigorous.
2. Structure your answers with clear formatting:
   - **Tactical Assessment / Breakdown**
   - **Positioning & Utility Protocols**
   - **Win Conditions & Counter-Play**
   - **Team Fight / Rotation Checklist**
3. When analyzing gameplay screenshots or match photos:
   - Breakdown crosshair placement, minimap information, cover density, distance to nearest trade teammate, and upcoming zone timing.
4. When analyzing tournament rules or documents:
   - Identify roster integrity, POV recording mandates, dispute protest windows (usually 15 min), and device/ping restrictions.
5. At the very end of your response, append a structured card block in this exact format:
---TACTICAL_CARD---
Title: <Short 3-6 word Title>
Category: <Category e.g. Zone Rotation | Utility Execution | Roster Audit | Clutch Mechanics>
KeyPoint: <Point 1>
KeyPoint: <Point 2>
KeyPoint: <Point 3>
ActionItem: <One clear immediate drill or match takeaway>
Checklist: <Checklist item 1>
Checklist: <Checklist item 2>
Checklist: <Checklist item 3>
---END_TACTICAL_CARD---
`;

/**
 * Parses the structured card block from the model output
 */
const parseTacticalCard = (fullText: string, athlete: PlayerPassport): { cleanText: string; card?: TacticalCardData } => {
  const cardMatch = fullText.match(/---TACTICAL_CARD---([\s\S]*?)---END_TACTICAL_CARD---/);

  if (!cardMatch) {
    // Fallback: build card from lines or default
    return { cleanText: fullText.trim() };
  }

  const cleanText = fullText.replace(/---TACTICAL_CARD---[\s\S]*?---END_TACTICAL_CARD---/, '').trim();
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

  const card: TacticalCardData = {
    title: titleMatch ? titleMatch[1].trim() : `${athlete.primaryGame} Tactical Directive`,
    category: catMatch ? catMatch[1].trim() : 'Competitive Intelligence',
    keyPoints: keyPoints.length > 0 ? keyPoints : [
      `Athlete: ${athlete.gamerTag} (${athlete.primaryRole})`,
      `Game Discipline: ${athlete.primaryGame}`,
      'Execution: Verified by EE AI Live Engine'
    ],
    actionItem: actionMatch ? actionMatch[1].trim() : 'Execute this protocol in your next scrim lobby.',
    checklist: checklist.length > 0 ? checklist : [
      'Confirm team line of sight & spacing',
      'Track utility cooldowns before engaging',
      'Designate primary target & trade-man'
    ]
  };

  return { cleanText, card };
};

/**
 * Main query function to call Google Gemini LLM
 */
export async function askEEAICoach(
  userQuery: string,
  athlete: PlayerPassport,
  attachments: MessageAttachment[] = [],
  conversationHistory: { sender: 'user' | 'assistant'; text: string }[] = []
): Promise<CoachResponse> {
  // If no API key configured, fallback to offline KB
  if (!GEMINI_API_KEY) {
    const local = queryKnowledgeBase(userQuery, athlete.primaryGame);
    return {
      replyText: local.replyText,
      tacticalCard: local.tacticalCard,
      modelUsed: 'ARENA-X Offline Grounding Engine'
    };
  }

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

  // Add the query text
  const promptText = userQuery.trim() 
    ? userQuery 
    : attachments.length > 0 
      ? `Please inspect this attached ${attachments[0].type} (${attachments[0].name}) and give me a full competitive esports tactical breakdown for ${athlete.primaryGame}.`
      : 'Hello Coach, I need tactical guidance.';

  currentParts.push({ text: promptText });
  contents.push({ role: 'user', parts: currentParts });

  // System instruction
  const systemInstruction = {
    parts: [{ text: buildSystemInstruction(athlete) }]
  };

  // Try calling primary model, fallback if needed
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
            temperature: 0.4,
            maxOutputTokens: 1200
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
        const { cleanText, card } = parseTacticalCard(rawText, athlete);
        return {
          replyText: cleanText,
          tacticalCard: card,
          modelUsed: `Gemini ${model.replace('models/', '').replace('-preview', '')}`
        };
      }
    } catch (err) {
      lastError = err;
      console.warn(`[EE AI] Model ${model} failed, trying next:`, err);
    }
  }

  // Graceful fallback to embedded tactical knowledge base
  console.warn('[EE AI] Falling back to local tactical database due to:', lastError);
  const fallback = queryKnowledgeBase(userQuery, athlete.primaryGame);
  return {
    replyText: fallback.replyText,
    tacticalCard: fallback.tacticalCard,
    modelUsed: 'ARENA-X Tactical Knowledge Base (Offline Guard)'
  };
}
