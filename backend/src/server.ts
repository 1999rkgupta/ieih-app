import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// In-Memory Database Store (backed by initial Indian Esports dataset)
let players = [
  {
    id: 'player_v4nd4l',
    passportNumber: 'IND-ESP-2026-8801',
    gamerTag: 'V4ND4L_K1NG',
    realName: 'Arjun "Arj" Sharma',
    avatarUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80',
    age: 21,
    state: 'Maharashtra',
    city: 'Mumbai',
    languages: ['Hindi', 'English', 'Marathi'],
    tier: 'Legend',
    level: 28,
    currentXp: 8450,
    nextLevelXp: 10000,
    primaryGame: 'VALORANT',
    primaryRole: 'Duelist',
    availability: 'Signed / Roster Active',
    isVerified: true,
    isKycVerified: true,
    verificationBadgeType: 'National Athlete',
    bio: 'Top-tier Indian Valorant Duelist with over 4,500 hours in tactical FPS. Former Skyesports MVP.',
    reputationScore: 99
  },
  {
    id: 'player_sh4dow',
    passportNumber: 'IND-ESP-2026-7734',
    gamerTag: 'SH4DOW_IGL',
    realName: 'Kabir "Shadow" Verma',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&auto=format&fit=crop&q=80',
    age: 22,
    state: 'Delhi NCR',
    city: 'New Delhi',
    languages: ['Hindi', 'English', 'Punjabi'],
    tier: 'Legend',
    level: 25,
    currentXp: 7200,
    nextLevelXp: 9000,
    primaryGame: 'BGMI',
    primaryRole: 'IGL',
    availability: 'LFG Pro Team',
    isVerified: true,
    isKycVerified: true,
    verificationBadgeType: 'IEIH Verified Pro',
    bio: 'Calculated In-Game Leader with 5+ years of Tier-1 BGMI and PUBG Mobile competitive leadership.',
    reputationScore: 98
  }
];

let registeredTournaments: string[] = [];
let appliedJobs: string[] = [];
let scoutOffers: any[] = [];

// Healthcheck
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    system: 'IEIH REST API SERVER V1.0',
    region: 'AWS Mumbai (ap-south-1)',
    timestamp: new Date().toISOString()
  });
});

// Player Passports Endpoints
app.get('/api/players', (req, res) => {
  res.json({ count: players.length, players });
});

app.get('/api/players/:id', (req, res) => {
  const player = players.find(p => p.id === req.params.id);
  if (!player) {
    return res.status(404).json({ error: 'Player passport not found' });
  }
  res.json(player);
});

app.post('/api/players', (req, res) => {
  const newPlayer = req.body;
  if (!newPlayer.gamerTag) {
    return res.status(400).json({ error: 'GamerTag is required' });
  }
  players.unshift(newPlayer);
  res.status(201).json({ message: 'E-Player Passport Minted', player: newPlayer });
});

app.put('/api/players/:id', (req, res) => {
  const idx = players.findIndex(p => p.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Player passport not found' });
  }
  players[idx] = { ...players[idx], ...req.body };
  res.json({ message: 'Passport updated', player: players[idx] });
});

// Tournament Registration Endpoints
app.post('/api/tournaments/:id/register', (req, res) => {
  const tournamentId = req.params.id;
  const { squadName, captainPassportId } = req.body;
  if (!registeredTournaments.includes(tournamentId)) {
    registeredTournaments.push(tournamentId);
  }
  res.json({
    message: 'Squad Roster Registered Successfully',
    tournamentId,
    squadName,
    status: 'VERIFIED'
  });
});

// Scout Offers Endpoint
app.post('/api/scout/offer', (req, res) => {
  const offer = req.body;
  scoutOffers.push(offer);
  res.json({
    message: 'Scout Offer Transmitted via IEIH Encrypted Protocol',
    offerId: `offer_${Date.now()}`
  });
});

// Career Application Endpoint
app.post('/api/jobs/:id/apply', (req, res) => {
  const { jobId, passportId } = req.body;
  appliedJobs.push(jobId);
  res.json({
    message: 'Passport Dossier Submitted to Recruiter',
    jobId,
    passportId
  });
});

import { queryBackendKnowledgeBase } from './data/arenaXKnowledgeBase.js';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const OLLAMA_REMOTE_BASE = process.env.OLLAMA_REMOTE_URL || 'https://aimodels.qspiders.com';
const QWEN_MODELS = ['qwen2.5-coder:latest', 'qwen2.5-coder:32b', 'qwen3-coder:30b'];

const STRICT_SPORTS_ESPORTS_RULES = `You are EE AI, the official Competitive Tactical Intelligence Coach and AI Operating System for the India Esports Innovation Hub (IEIH).

STRICT DOMAIN & BEHAVIOR PROTOCOLS:
1. GREETINGS & CASUAL TALK:
   When the user sends friendly greetings or casual opening messages (e.g. "hi", "hello", "hey", "how are you", "who are you", "what can you do", "help", "good morning"):
   - Warmly welcome the user and introduce yourself as their dedicated EE AI Tactical Coach.
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

4. RESPONSE FORMATTING:
   - Keep answers clear, structured, and strategic with bold headers and bullet points.`;

// Helper function to call Qwen model on remote Ollama server
async function callRemoteQwenModel(prompt: string, athleteContext?: any, messagesHistory: any[] = []) {
  const systemPrompt = `${STRICT_SPORTS_ESPORTS_RULES}\n\n[CURRENT ATHLETE PROFILE]: GamerTag: ${athleteContext?.gamerTag || 'Player'} | Game: ${athleteContext?.game || 'Esports'} | Role: ${athleteContext?.role || 'Contender'}`;
  
  for (const modelName of QWEN_MODELS) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      // Try Ollama /api/chat endpoint
      const response = await fetch(`${OLLAMA_REMOTE_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          model: modelName,
          messages: [
            { role: 'system', content: systemPrompt },
            ...messagesHistory.slice(-4).map(m => ({
              role: m.sender === 'user' ? 'user' : 'assistant',
              content: m.text
            })),
            { role: 'user', content: prompt }
          ],
          stream: false,
          options: {
            temperature: 0.35,
            top_p: 0.9
          }
        })
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data: any = await response.json();
        const replyText = data.message?.content || data.response;
        if (replyText) {
          return {
            reply: replyText.trim(),
            modelUsed: `Qwen 30B (${modelName} on aimodels.qspiders.com)`
          };
        }
      }
    } catch (err: any) {
      console.warn(`[Qwen] Remote Ollama call for model ${modelName} encountered: ${err.message || err}`);
    }
  }

  // If remote /api/chat fails, try /api/generate as secondary protocol
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const genResponse = await fetch(`${OLLAMA_REMOTE_BASE}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        model: 'qwen2.5-coder:latest',
        system: systemPrompt,
        prompt: prompt,
        stream: false
      })
    });

    clearTimeout(timeoutId);

    if (genResponse.ok) {
      const data: any = await genResponse.json();
      if (data.response) {
        return {
          reply: data.response.trim(),
          modelUsed: 'Qwen 30B (aimodels.qspiders.com)'
        };
      }
    }
  } catch (err: any) {
    console.warn(`[Qwen Generate] Secondary Ollama call failed: ${err.message || err}`);
  }

  return null;
}

// Dedicated Qwen AI Endpoint
app.post(['/api/ai/qwen', '/api/api/ai/qwen'], async (req, res) => {
  const { query, gamerTag, game, role, history } = req.body;
  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    const qwenResult = await callRemoteQwenModel(query, { gamerTag, game, role }, history || []);
    if (qwenResult) {
      return res.json({
        reply: qwenResult.reply,
        modelUsed: qwenResult.modelUsed,
        source: 'Remote Ollama Server (qspiders.com)',
        gamerTag,
        timestamp: new Date().toISOString()
      });
    }
  } catch (err) {
    console.error('Qwen API execution error:', err);
  }

  // Graceful fallback to local ARENA-X knowledge base if remote server is unreachable
  const result = queryBackendKnowledgeBase(query, game);
  res.json({
    reply: result.replyText,
    tacticalCard: result.tacticalCard,
    source: 'ARENA-X Tactical Grounding Engine (Offline Guard)',
    modelUsed: 'ARENA-X Tactical Engine',
    gamerTag,
    timestamp: new Date().toISOString()
  });
});

// Unified EE AI Tactical Assistant Endpoint (Grounded by Gemini or Qwen LLM & ARENA-X Knowledge Base)
app.post(['/api/ai/chat', '/api/api/ai/chat'], async (req, res) => {
  const { query, gamerTag, game, role, provider, history } = req.body;
  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  // 1. If provider is specifically Qwen
  if (provider === 'qwen') {
    const qwenResult = await callRemoteQwenModel(query, { gamerTag, game, role }, history || []);
    if (qwenResult) {
      return res.json({
        reply: qwenResult.reply,
        modelUsed: qwenResult.modelUsed,
        source: 'Remote Ollama Server (qspiders.com)',
        gamerTag,
        timestamp: new Date().toISOString()
      });
    }
  }

  // 2. Attempt Gemini API call if key configured
  if (GEMINI_API_KEY && (!provider || provider === 'gemini')) {
    try {
      const systemInstruction = `${STRICT_SPORTS_ESPORTS_RULES}\n\n[ATHLETE PROFILE]: ${gamerTag || 'Player'} (${role || 'Contender'}) in ${game || 'Esports'}.`;
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: query }] }],
          systemInstruction: { parts: [{ text: systemInstruction }] },
          generationConfig: { temperature: 0.35, maxOutputTokens: 1200 }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (replyText) {
          return res.json({
            reply: replyText,
            source: 'Google Gemini 3.6 Flash (Live LLM)',
            modelUsed: 'Gemini 3.6 Flash',
            gamerTag,
            timestamp: new Date().toISOString()
          });
        }
      }
    } catch (llmErr) {
      console.warn('Gemini backend call failed, falling back to local KB:', llmErr);
    }
  }

  // Fallback to local knowledge base
  const result = queryBackendKnowledgeBase(query, game);
  res.json({
    reply: result.replyText,
    tacticalCard: result.tacticalCard,
    source: 'ARENA-X Grounding Engine',
    modelUsed: 'ARENA-X Grounding Engine',
    gamerTag,
    timestamp: new Date().toISOString()
  });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`⚡ IEIH REST API Server running on http://localhost:${PORT}`);
  });
}

export default app;
export { app };
