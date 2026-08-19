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

// EE AI Tactical Assistant Endpoint
app.post('/api/ai/chat', (req, res) => {
  const { query, gamerTag } = req.body;
  const text = query.toLowerCase();

  let responseText = `Telemetry analysis for ${gamerTag}: You are tracking in the top echelon of Indian competitive athletes. Focus on scrim consistency and official tournament registrations.`;

  if (text.includes('bgmi') || text.includes('igl') || text.includes('rotation')) {
    responseText = `For Tier-1 BGMI lobbies (like BMPS/BGIS): prioritize early vehicle split (2-2 or 3-1 scout setup). In Zone 3-4 shifts, establish high ground perimeter control on hard cover rather than compound camping.`;
  } else if (text.includes('valorant') || text.includes('duelist') || text.includes('agent')) {
    responseText = `For aggressive entry fraggers in Valorant: Pair Jett or Raze with Fade or Sova recon utility. Focus your first-bullet accuracy drills to maintain >35% headshot rate.`;
  }

  res.json({
    reply: responseText,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`⚡ IEIH REST API Server running on http://localhost:${PORT}`);
});
