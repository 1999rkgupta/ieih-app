export type GameType = 'BGMI' | 'VALORANT' | 'CS2' | 'FREE_FIRE' | 'POKEMON_UNITE' | 'EA_FC24';

export type RoleType = 
  | 'IGL' 
  | 'Assaulter' 
  | 'Entry Fragger' 
  | 'Sniper' 
  | 'Support' 
  | 'Controller' 
  | 'Initiator' 
  | 'Duelist' 
  | 'Sentinel'
  | 'Anchor'
  | 'Jungler';

export type SkillTier = 'Rookie' | 'Contender' | 'Elite' | 'National Pro' | 'Legend';

export type AvailabilityStatus = 'LFG Pro Team' | 'LFG Scrims' | 'Signed / Roster Active' | 'Collegiate Team' | 'Free Agent';

export interface RadarStats {
  aim: number;          // 0-100
  gameSense: number;    // 0-100
  clutch: number;       // 0-100
  utility: number;      // 0-100
  communication: number;// 0-100
  aggression: number;   // 0-100
}

export interface GamePerformance {
  game: GameType;
  inGameName: string;
  inGameId: string;
  currentRank: string;
  peakRank: string;
  kdRatio: number;
  winRate: number;      // percentage 0-100
  headshotPct: number;  // percentage 0-100
  mvpCount: number;
  clutchesWon: number;
  scrimMmr: number;
  hoursPlayed: number;
  mainCharactersOrWeapons: string[];
}

export interface Trophy {
  id: string;
  title: string;
  event: string;
  date: string;
  tier: 'Gold' | 'Silver' | 'Bronze' | 'Special';
  icon: string;
  prizeContribution?: string;
  verifiedLink?: string;
}

export interface TournamentRecord {
  id: string;
  tournamentName: string;
  game: GameType;
  date: string;
  teamName: string;
  placement: string; // e.g. "1st Place 🏆", "Semifinals", "Top 8"
  prizeWon: string;
  verified: boolean;
}

export interface HardwareGear {
  deviceOrPlatform: string; // e.g. "iPhone 15 Pro Max" or "Custom PC (RTX 4080)"
  peripherals: string;      // e.g. "Logitech G Pro X Superlight / Wooting 60HE"
  audio: string;            // e.g. "HyperX Cloud II Wireless"
  sensDpi: string;          // e.g. "800 DPI, 0.35 In-Game Sens" or "Gyro Always-On 320%"
}

export interface HighlightClip {
  id: string;
  title: string;
  game: GameType;
  duration: string;
  views: string;
  thumbnail: string;
  videoUrl?: string;
}

export interface PlayerPassport {
  id: string;
  passportNumber: string; // e.g. "IND-ESP-2026-0982"
  gamerTag: string;
  realName: string;
  avatarUrl: string;
  bannerUrl: string;
  age: number;
  state: string;           // e.g. "Maharashtra", "Karnataka", "Delhi NCR"
  city: string;
  languages: string[];     // e.g. ["Hindi", "English", "Marathi"]
  tier: SkillTier;
  level: number;
  currentXp: number;
  nextLevelXp: number;
  primaryGame: GameType;
  primaryRole: RoleType;
  secondaryRoles: RoleType[];
  currentTeam?: {
    name: string;
    tag: string;
    logoUrl: string;
    role: string;
  };
  availability: AvailabilityStatus;
  isVerified: boolean;
  isKycVerified: boolean;
  verificationBadgeType: 'IEIH Verified Pro' | 'National Athlete' | 'Rising Prodigy' | 'Verified Contender';
  bio: string;
  radarStats: RadarStats;
  gamePerformances: Record<GameType, GamePerformance>;
  trophies: Trophy[];
  tournamentHistory: TournamentRecord[];
  gear: HardwareGear;
  clips: HighlightClip[];
  socials: {
    youtube?: string;
    instagram?: string;
    twitter?: string;
    discord?: string;
    steamOrRiot?: string;
  };
  reputationScore: number; // e.g. 98/100
  scrimAttendanceRate: number; // e.g. 99%
  createdAt: string;
}

export interface TournamentBracketMatch {
  id: string;
  roundName: string;
  team1: { name: string; tag: string; logo: string; score?: number; isWinner?: boolean };
  team2: { name: string; tag: string; logo: string; score?: number; isWinner?: boolean };
  scheduledTime: string;
  isLive?: boolean;
}

export interface OrganizerTrustAudit {
  score: number; // 0-100
  tier: 'Tier 1 Trusted' | 'Verified Partner' | 'Emerging Host';
  payoutPunctuality: number; // e.g. 99%
  disputeResolutionSpeed: string; // e.g. "< 2 hours"
  tournamentsCompleted: number;
  totalPrizingDisbursed: string; // e.g. "₹2.4 Crore"
  gstRegistered: boolean;
  communityRating: number; // 4.9/5
}

export interface Tournament {
  id: string;
  title: string;
  organizer: {
    id: string;
    name: string;
    logo: string;
    trustScore: number;
    isVerified: boolean;
    tier: string;
  };
  game: GameType;
  type: 'LAN Arena' | 'Online Championship' | 'College Exclusive' | 'Nightly Scrims';
  status: 'Live Now 🔴' | 'Registration Open' | 'Upcoming' | 'Completed';
  prizePool: number; // in INR
  prizePoolFormatted: string; // e.g. "₹25,00,000"
  entryFee: string; // "FREE" or "₹500 / Team"
  startDate: string;
  endDate: string;
  location: string; // "LAN - Hyderabad International Arena" or "Online - India Server"
  totalSlots: number;
  registeredSlots: number;
  bannerImage: string;
  description: string;
  format: string; // e.g. "5v5 Single Elimination Swiss Stage -> 16 Team Double Bracket"
  rulesSummary: string[];
  prizeDistribution: { place: string; amount: string; percentage: string }[];
  schedule: { stage: string; date: string; time: string }[];
  brackets?: TournamentBracketMatch[];
  isFeatured?: boolean;
}

export interface CollegiateClub {
  id: string;
  collegeName: string;
  shortName: string;
  city: string;
  state: string;
  logo: string;
  bannerImage: string;
  studentRosterCount: number;
  topGames: GameType[];
  rankingTier: string;
  trophiesWon: number;
  isOfficialCampusChapter: boolean;
  contactEmail: string;
  captain: {
    name: string;
    gamerTag: string;
    avatar: string;
  };
}

export interface JobOpportunity {
  id: string;
  title: string;
  organization: string;
  orgLogo: string;
  game: GameType | 'Multiple Games' | 'General Esports';
  roleCategory: 'Player / Athlete' | 'Coach / Analyst' | 'Caster / Talent' | 'Management' | 'Production';
  type: 'Full-Time Contract' | 'Part-Time Scrims' | 'Paid Internship' | 'Tournament Gigs';
  location: string; // "Mumbai, MH (LAN Bootcamp)" or "Remote / Online"
  compensation: string; // e.g. "₹45,000 - ₹75,000 / mo + Prizepool split"
  description: string;
  requirements: string[];
  postedDate: string;
  applicantCount: number;
  isUrgent?: boolean;
}

export interface EEAIMessage {
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

export interface FilterOptions {
  game: string;
  role: string;
  tier: string;
  state: string;
  language: string;
  availability: string;
  verifiedOnly: boolean;
  minKd: number;
  searchQuery: string;
}
