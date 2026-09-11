import { PlayerPassport, Tournament, CollegiateClub, JobOpportunity, OrganizerTrustAudit } from '../types';

export const MOCK_ORGANIZER_AUDITS: Record<string, OrganizerTrustAudit> = {
  'org_skyesports': {
    score: 98,
    tier: 'Tier 1 Trusted',
    payoutPunctuality: 99.4,
    disputeResolutionSpeed: '< 45 mins',
    tournamentsCompleted: 142,
    totalPrizingDisbursed: '₹14.8 Crore',
    gstRegistered: true,
    communityRating: 4.9
  },
  'org_nodwin': {
    score: 96,
    tier: 'Tier 1 Trusted',
    payoutPunctuality: 98.7,
    disputeResolutionSpeed: '< 1.5 hours',
    tournamentsCompleted: 210,
    totalPrizingDisbursed: '₹22.5 Crore',
    gstRegistered: true,
    communityRating: 4.8
  },
  'org_tec': {
    score: 93,
    tier: 'Verified Partner',
    payoutPunctuality: 96.2,
    disputeResolutionSpeed: '< 3 hours',
    tournamentsCompleted: 88,
    totalPrizingDisbursed: '₹5.2 Crore',
    gstRegistered: true,
    communityRating: 4.7
  },
  'org_krafton_in': {
    score: 99,
    tier: 'Tier 1 Trusted',
    payoutPunctuality: 100,
    disputeResolutionSpeed: '< 30 mins',
    tournamentsCompleted: 64,
    totalPrizingDisbursed: '₹48.0 Crore',
    gstRegistered: true,
    communityRating: 4.95
  }
};

export const MOCK_PLAYERS: PlayerPassport[] = [
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
    secondaryRoles: ['Initiator', 'Entry Fragger'],
    currentTeam: {
      name: 'Revenant Velocity',
      tag: 'RV',
      logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
      role: 'Main Jett / Entry Fragger'
    },
    availability: 'Signed / Roster Active',
    isVerified: true,
    isKycVerified: true,
    verificationBadgeType: 'National Athlete',
    bio: 'Top-tier Indian Valorant Duelist with over 4,500 hours in tactical FPS. Former Skyesports MVP. Known for hyper-aggressive Jett entries and 1v3 site retakes.',
    radarStats: {
      aim: 96,
      gameSense: 91,
      clutch: 94,
      utility: 85,
      communication: 90,
      aggression: 98
    },
    gamePerformances: {
      VALORANT: {
        game: 'VALORANT',
        inGameName: 'V4ND4L#IND',
        inGameId: '7741029311',
        currentRank: 'Radiant #34 (APAC/South Asia)',
        peakRank: 'Radiant Top 10',
        kdRatio: 1.48,
        winRate: 71.4,
        headshotPct: 38.6,
        mvpCount: 214,
        clutchesWon: 142,
        scrimMmr: 2480,
        hoursPlayed: 4620,
        mainCharactersOrWeapons: ['Jett', 'Raze', 'Vandal', 'Operator']
      },
      BGMI: {
        game: 'BGMI',
        inGameName: 'ArjV4ND4L',
        inGameId: '5120399482',
        currentRank: 'Conqueror 18 Stars',
        peakRank: 'Conqueror Top 100',
        kdRatio: 6.42,
        winRate: 64.0,
        headshotPct: 32.0,
        mvpCount: 88,
        clutchesWon: 59,
        scrimMmr: 2150,
        hoursPlayed: 2800,
        mainCharactersOrWeapons: ['M416 + 6x', 'AWM', 'M762 Beryl']
      },
      CS2: {
        game: 'CS2',
        inGameName: 'v4nd4l_god',
        inGameId: 'STEAM_0:1:4490123',
        currentRank: 'Faceit Level 10 (2650 ELO)',
        peakRank: 'Global Elite',
        kdRatio: 1.35,
        winRate: 68.2,
        headshotPct: 62.1,
        mvpCount: 160,
        clutchesWon: 98,
        scrimMmr: 2390,
        hoursPlayed: 3400,
        mainCharactersOrWeapons: ['AK-47', 'AWP', 'Desert Eagle']
      },
      FREE_FIRE: {
        game: 'FREE_FIRE',
        inGameName: 'V4ND4L_FF',
        inGameId: '99018281',
        currentRank: 'Grandmaster II',
        peakRank: 'Grandmaster IV',
        kdRatio: 4.8,
        winRate: 61.0,
        headshotPct: 45.0,
        mvpCount: 45,
        clutchesWon: 29,
        scrimMmr: 1890,
        hoursPlayed: 950,
        mainCharactersOrWeapons: ['M1887', 'MP40', 'Woodpecker']
      },
      POKEMON_UNITE: {
        game: 'POKEMON_UNITE',
        inGameName: 'ArjUnite',
        inGameId: 'UNITE8819',
        currentRank: 'Master 1600+',
        peakRank: 'Master 1800',
        kdRatio: 3.2,
        winRate: 62.5,
        headshotPct: 0,
        mvpCount: 30,
        clutchesWon: 18,
        scrimMmr: 1720,
        hoursPlayed: 450,
        mainCharactersOrWeapons: ['Zeraora', 'Greninja', 'Lucario']
      },
      EA_FC24: {
        game: 'EA_FC24',
        inGameName: 'VandalFC',
        inGameId: 'EA_VANDAL_IN',
        currentRank: 'Elite Division',
        peakRank: 'Top 200 India',
        kdRatio: 2.8,
        winRate: 74.0,
        headshotPct: 0,
        mvpCount: 78,
        clutchesWon: 34,
        scrimMmr: 1950,
        hoursPlayed: 620,
        mainCharactersOrWeapons: ['Real Madrid 4-3-3', 'France 4-2-3-1']
      }
    },
    trophies: [
      {
        id: 'tr_1',
        title: 'MVP — Grand Finals',
        event: 'Skyesports Valorant Champions 2025',
        date: 'Nov 2025',
        tier: 'Gold',
        icon: '🏆',
        prizeContribution: '₹2,50,000'
      },
      {
        id: 'tr_2',
        title: 'All-India National Champion',
        event: 'Nodwin ESL Premiership LAN',
        date: 'Aug 2025',
        tier: 'Gold',
        icon: '🥇',
        prizeContribution: '₹5,00,000'
      },
      {
        id: 'tr_3',
        title: 'Top Fragger Award',
        event: 'Red Bull Campus Clutch Regional',
        date: 'Mar 2025',
        tier: 'Silver',
        icon: '⚡',
        prizeContribution: '₹1,00,000'
      }
    ],
    tournamentHistory: [
      {
        id: 'th_1',
        tournamentName: 'Skyesports Valorant Champions Series 2025',
        game: 'VALORANT',
        date: 'Nov 2025',
        teamName: 'Revenant Velocity',
        placement: '1st Place 🏆',
        prizeWon: '₹8,00,000',
        verified: true
      },
      {
        id: 'th_2',
        tournamentName: 'TEC Challenger Series S9',
        game: 'VALORANT',
        date: 'Sept 2025',
        teamName: 'Revenant Velocity',
        placement: 'Runners Up 🥈',
        prizeWon: '₹3,50,000',
        verified: true
      },
      {
        id: 'th_3',
        tournamentName: 'Nodwin ESL India Winter LAN',
        game: 'VALORANT',
        date: 'Jan 2025',
        teamName: 'Delhi Titans (Ex)',
        placement: 'Semifinals 🥉',
        prizeWon: '₹1,50,000',
        verified: true
      }
    ],
    gear: {
      deviceOrPlatform: 'PC: Intel i9-14900KF + RTX 4080 Super (360Hz Zowie XL2566K)',
      peripherals: 'Logitech G Pro X Superlight 2 (400 DPI) + Wooting 60HE Hall-Effect',
      audio: 'HyperX Cloud III Wireless + Shure SM7B',
      sensDpi: '800 DPI | 0.28 In-Game Sens (eDPI 224)'
    },
    clips: [
      {
        id: 'clip_1',
        title: '1v4 Ace Clutch on Haven (Grand Finals Match Point)',
        game: 'VALORANT',
        duration: '0:42',
        views: '48.2K',
        thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=80'
      },
      {
        id: 'clip_2',
        title: 'Crisp 5-Tap Sheriff Eco Round vs Global Esports',
        game: 'VALORANT',
        duration: '0:31',
        views: '32.1K',
        thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=80'
      }
    ],
    socials: {
      youtube: 'https://youtube.com/@vandal_king_in',
      instagram: 'https://instagram.com/vandal_arj',
      twitter: 'https://x.com/vandal_fps',
      discord: 'V4ND4L#0001',
      steamOrRiot: 'V4ND4L#IND'
    },
    reputationScore: 99,
    scrimAttendanceRate: 99.2,
    createdAt: '2024-03-15'
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
    secondaryRoles: ['Support', 'Assaulter'],
    currentTeam: {
      name: 'GodLike Kraft',
      tag: 'GL',
      logoUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=100&auto=format&fit=crop&q=80',
      role: 'In-Game Leader & Strategist'
    },
    availability: 'LFG Pro Team',
    isVerified: true,
    isKycVerified: true,
    verificationBadgeType: 'IEIH Verified Pro',
    bio: 'Calculated, zone-predicting In-Game Leader with 5+ years of Tier-1 BGMI and PUBG Mobile competitive leadership. Led teams to 3 National Championship top-3 finishes.',
    radarStats: {
      aim: 88,
      gameSense: 99,
      clutch: 92,
      utility: 94,
      communication: 98,
      aggression: 82
    },
    gamePerformances: {
      BGMI: {
        game: 'BGMI',
        inGameName: 'SH4DOW_IGL',
        inGameId: '5188203911',
        currentRank: 'Conqueror Top 50 India',
        peakRank: 'Rank 1 Conqueror',
        kdRatio: 7.82,
        winRate: 68.9,
        headshotPct: 35.4,
        mvpCount: 198,
        clutchesWon: 112,
        scrimMmr: 2620,
        hoursPlayed: 5200,
        mainCharactersOrWeapons: ['M416', 'DBS / S12K', 'Smoke/Grenade Meta']
      },
      VALORANT: {
        game: 'VALORANT',
        inGameName: 'ShadowIGL#DEL',
        inGameId: '9920194811',
        currentRank: 'Immortal 3',
        peakRank: 'Radiant',
        kdRatio: 1.22,
        winRate: 65.0,
        headshotPct: 29.4,
        mvpCount: 64,
        clutchesWon: 52,
        scrimMmr: 2180,
        hoursPlayed: 1800,
        mainCharactersOrWeapons: ['Omen', 'Brimstone', 'Vandal']
      },
      CS2: {
        game: 'CS2',
        inGameName: 'sh4dow_lead',
        inGameId: 'STEAM_0:1:9912093',
        currentRank: 'Faceit Level 9',
        peakRank: 'Supreme Master',
        kdRatio: 1.18,
        winRate: 61.0,
        headshotPct: 48.0,
        mvpCount: 42,
        clutchesWon: 38,
        scrimMmr: 2010,
        hoursPlayed: 1600,
        mainCharactersOrWeapons: ['M4A1-S', 'AK-47']
      },
      FREE_FIRE: {
        game: 'FREE_FIRE',
        inGameName: 'ShadowFF',
        inGameId: '10293847',
        currentRank: 'Master',
        peakRank: 'Grandmaster',
        kdRatio: 4.1,
        winRate: 58.0,
        headshotPct: 39.0,
        mvpCount: 22,
        clutchesWon: 14,
        scrimMmr: 1740,
        hoursPlayed: 600,
        mainCharactersOrWeapons: ['Groza', 'MP5']
      },
      POKEMON_UNITE: {
        game: 'POKEMON_UNITE',
        inGameName: 'ShadowStrat',
        inGameId: 'UNITE7721',
        currentRank: 'Master 1400',
        peakRank: 'Master 1550',
        kdRatio: 2.6,
        winRate: 59.0,
        headshotPct: 0,
        mvpCount: 15,
        clutchesWon: 11,
        scrimMmr: 1600,
        hoursPlayed: 320,
        mainCharactersOrWeapons: ['Blastoise', 'Umbreon']
      },
      EA_FC24: {
        game: 'EA_FC24',
        inGameName: 'ShadowTikiTaka',
        inGameId: 'EA_SHADOW_DL',
        currentRank: 'Div 1',
        peakRank: 'Elite Div',
        kdRatio: 2.1,
        winRate: 66.0,
        headshotPct: 0,
        mvpCount: 35,
        clutchesWon: 18,
        scrimMmr: 1780,
        hoursPlayed: 400,
        mainCharactersOrWeapons: ['Man City 4-3-3']
      }
    },
    trophies: [
      {
        id: 'tr_4',
        title: 'BGIS 2024 — Best IGL',
        event: 'Battlegrounds India Series Finals',
        date: 'Oct 2024',
        tier: 'Gold',
        icon: '👑',
        prizeContribution: '₹4,00,000'
      },
      {
        id: 'tr_5',
        title: 'Skyesports BGMI League Champion',
        event: 'Skyesports Championship 5.0',
        date: 'Jul 2024',
        tier: 'Gold',
        icon: '🏆',
        prizeContribution: '₹10,00,000'
      }
    ],
    tournamentHistory: [
      {
        id: 'th_4',
        tournamentName: 'BGIS Grand Finals 2024 (LAN Mumbai)',
        game: 'BGMI',
        date: 'Oct 2024',
        teamName: 'GodLike Kraft',
        placement: '2nd Place 🥈',
        prizeWon: '₹30,00,000',
        verified: true
      },
      {
        id: 'th_5',
        tournamentName: 'Krafton India Series Season 2',
        game: 'BGMI',
        date: 'May 2024',
        teamName: 'GodLike Kraft',
        placement: '1st Place 🏆',
        prizeWon: '₹50,00,000',
        verified: true
      }
    ],
    gear: {
      deviceOrPlatform: 'Mobile: ROG Phone 8 Pro / iPad Pro M2 (120 FPS High Touch Sampling)',
      peripherals: 'Custom 4-Finger Claw + Gyroscope Always On (300% Sens)',
      audio: 'Bose QuietComfort 20 (ANC In-Ear)',
      sensDpi: '300% Camera / 320% Gyro ADS'
    },
    clips: [
      {
        id: 'clip_3',
        title: 'Masterclass 200 IQ Zone Rotation in Final Circle — Erangel',
        game: 'BGMI',
        duration: '1:15',
        views: '89.4K',
        thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&auto=format&fit=crop&q=80'
      }
    ],
    socials: {
      youtube: 'https://youtube.com/@shadow_esports_in',
      instagram: 'https://instagram.com/shadow_igl',
      twitter: 'https://x.com/shadow_igl',
      discord: 'SH4DOW#0777'
    },
    reputationScore: 98,
    scrimAttendanceRate: 98.8,
    createdAt: '2023-11-10'
  },
  {
    id: 'player_m4tr1x',
    passportNumber: 'IND-ESP-2026-9042',
    gamerTag: 'M4TR1X_SNIPER',
    realName: 'Rohan "Matrix" Nair',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80',
    age: 19,
    state: 'Karnataka',
    city: 'Bengaluru',
    languages: ['English', 'Kannada', 'Hindi', 'Malayalam'],
    tier: 'Elite',
    level: 19,
    currentXp: 5100,
    nextLevelXp: 6500,
    primaryGame: 'VALORANT',
    primaryRole: 'Sniper',
    secondaryRoles: ['Sentinel', 'Anchor'],
    currentTeam: {
      name: 'Bangalore CyberKnights',
      tag: 'BCK',
      logoUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=100&auto=format&fit=crop&q=80',
      role: 'Primary Operator / Chamber'
    },
    availability: 'LFG Scrims',
    isVerified: true,
    isKycVerified: true,
    verificationBadgeType: 'Rising Prodigy',
    bio: 'College esports prodigy at PES University. 82% first blood success rate on defense with Operator. Peak collegiate MVP.',
    radarStats: {
      aim: 95,
      gameSense: 86,
      clutch: 90,
      utility: 80,
      communication: 88,
      aggression: 75
    },
    gamePerformances: {
      VALORANT: {
        game: 'VALORANT',
        inGameName: 'Matrix#BLR',
        inGameId: '8829104721',
        currentRank: 'Immortal 2',
        peakRank: 'Immortal 3',
        kdRatio: 1.39,
        winRate: 67.2,
        headshotPct: 41.2,
        mvpCount: 110,
        clutchesWon: 74,
        scrimMmr: 2310,
        hoursPlayed: 2400,
        mainCharactersOrWeapons: ['Chamber', 'Jett', 'Operator', 'Sheriff']
      },
      BGMI: {
        game: 'BGMI',
        inGameName: 'MatrixAWM',
        inGameId: '5590218391',
        currentRank: 'Ace Dominator',
        peakRank: 'Conqueror',
        kdRatio: 5.1,
        winRate: 59.0,
        headshotPct: 42.0,
        mvpCount: 52,
        clutchesWon: 34,
        scrimMmr: 1980,
        hoursPlayed: 1400,
        mainCharactersOrWeapons: ['AWM', 'Kar98k', 'Mini14']
      },
      CS2: {
        game: 'CS2',
        inGameName: 'matrix_sniper',
        inGameId: 'STEAM_0:1:7729104',
        currentRank: 'Faceit Level 8',
        peakRank: 'LEM',
        kdRatio: 1.28,
        winRate: 63.5,
        headshotPct: 54.0,
        mvpCount: 68,
        clutchesWon: 45,
        scrimMmr: 2120,
        hoursPlayed: 1900,
        mainCharactersOrWeapons: ['AWP', 'SSG 08']
      },
      FREE_FIRE: {
        game: 'FREE_FIRE',
        inGameName: 'MatrixFF',
        inGameId: '55910283',
        currentRank: 'Heroic',
        peakRank: 'Master',
        kdRatio: 3.4,
        winRate: 54.0,
        headshotPct: 38.0,
        mvpCount: 18,
        clutchesWon: 12,
        scrimMmr: 1620,
        hoursPlayed: 400,
        mainCharactersOrWeapons: ['AWM', 'M82B']
      },
      POKEMON_UNITE: {
        game: 'POKEMON_UNITE',
        inGameName: 'MatrixSnipe',
        inGameId: 'UNITE4412',
        currentRank: 'Master 1300',
        peakRank: 'Master 1400',
        kdRatio: 2.1,
        winRate: 56.0,
        headshotPct: 0,
        mvpCount: 10,
        clutchesWon: 6,
        scrimMmr: 1510,
        hoursPlayed: 200,
        mainCharactersOrWeapons: ['Decidueye', 'Inteleon']
      },
      EA_FC24: {
        game: 'EA_FC24',
        inGameName: 'Matrix_FC',
        inGameId: 'EA_MATRIX_KA',
        currentRank: 'Div 2',
        peakRank: 'Div 1',
        kdRatio: 1.8,
        winRate: 60.0,
        headshotPct: 0,
        mvpCount: 20,
        clutchesWon: 10,
        scrimMmr: 1650,
        hoursPlayed: 250,
        mainCharactersOrWeapons: ['Arsenal 4-3-3']
      }
    },
    trophies: [
      {
        id: 'tr_6',
        title: 'All-India Inter-University Champion',
        event: 'India Collegiate Esports League 2025',
        date: 'Dec 2025',
        tier: 'Gold',
        icon: '🎓',
        prizeContribution: '₹1,50,000'
      }
    ],
    tournamentHistory: [
      {
        id: 'th_6',
        tournamentName: 'South India Valorant Collegiate Cup',
        game: 'VALORANT',
        date: 'Nov 2025',
        teamName: 'PES CyberKnights',
        placement: '1st Place 🏆',
        prizeWon: '₹1,00,000',
        verified: true
      }
    ],
    gear: {
      deviceOrPlatform: 'PC: Ryzen 7 7800X3D + RTX 4070 Ti (280Hz ASUS TUF)',
      peripherals: 'Razer Viper V3 Pro + Artisan Zero Soft Pad',
      audio: 'Audio-Technica ATH-M50x',
      sensDpi: '1600 DPI | 0.14 In-Game Sens'
    },
    clips: [
      {
        id: 'clip_4',
        title: 'Lightning Fast Op Wallbang Collateral on Ascent',
        game: 'VALORANT',
        duration: '0:24',
        views: '21.5K',
        thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=80'
      }
    ],
    socials: {
      youtube: 'https://youtube.com/@matrix_op',
      instagram: 'https://instagram.com/matrix_val',
      twitter: 'https://x.com/matrix_fps',
      discord: 'matrix#4040'
    },
    reputationScore: 96,
    scrimAttendanceRate: 96.5,
    createdAt: '2024-08-20'
  },
  {
    id: 'player_valkyrie',
    passportNumber: 'IND-ESP-2026-6619',
    gamerTag: 'VALKYRIE_PRIYA',
    realName: 'Priya "Valkyrie" Sengupta',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&auto=format&fit=crop&q=80',
    age: 20,
    state: 'West Bengal',
    city: 'Kolkata',
    languages: ['Bengali', 'Hindi', 'English'],
    tier: 'Elite',
    level: 22,
    currentXp: 6400,
    nextLevelXp: 7500,
    primaryGame: 'VALORANT',
    primaryRole: 'Initiator',
    secondaryRoles: ['Controller', 'Support'],
    currentTeam: {
      name: 'Orangutan Asteria',
      tag: 'OG',
      logoUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=100&auto=format&fit=crop&q=80',
      role: 'Main Sova / Fade Recon'
    },
    availability: 'Signed / Roster Active',
    isVerified: true,
    isKycVerified: true,
    verificationBadgeType: 'National Athlete',
    bio: 'India Game Changers Champion and National Sova Lineup Specialist. 94% recon dart utility efficiency.',
    radarStats: {
      aim: 91,
      gameSense: 95,
      clutch: 92,
      utility: 99,
      communication: 96,
      aggression: 78
    },
    gamePerformances: {
      VALORANT: {
        game: 'VALORANT',
        inGameName: 'Valkyrie#KOL',
        inGameId: '6620194821',
        currentRank: 'Immortal 3',
        peakRank: 'Radiant #80',
        kdRatio: 1.31,
        winRate: 69.5,
        headshotPct: 34.2,
        mvpCount: 142,
        clutchesWon: 89,
        scrimMmr: 2420,
        hoursPlayed: 3800,
        mainCharactersOrWeapons: ['Sova', 'Fade', 'Gekko', 'Phantom']
      },
      BGMI: {
        game: 'BGMI',
        inGameName: 'ValkyrieKolkata',
        inGameId: '5819028471',
        currentRank: 'Ace Master',
        peakRank: 'Ace Dominator',
        kdRatio: 4.8,
        winRate: 58.0,
        headshotPct: 29.0,
        mvpCount: 40,
        clutchesWon: 25,
        scrimMmr: 1880,
        hoursPlayed: 1200,
        mainCharactersOrWeapons: ['M416', 'DP-28']
      },
      CS2: {
        game: 'CS2',
        inGameName: 'valkyrie_kol',
        inGameId: 'STEAM_0:1:5591028',
        currentRank: 'Faceit Level 8',
        peakRank: 'LEM',
        kdRatio: 1.15,
        winRate: 60.0,
        headshotPct: 51.0,
        mvpCount: 38,
        clutchesWon: 29,
        scrimMmr: 1990,
        hoursPlayed: 1400,
        mainCharactersOrWeapons: ['M4A4', 'Galil AR']
      },
      FREE_FIRE: {
        game: 'FREE_FIRE',
        inGameName: 'ValkyrieFF',
        inGameId: '66291048',
        currentRank: 'Heroic',
        peakRank: 'Heroic',
        kdRatio: 3.1,
        winRate: 52.0,
        headshotPct: 34.0,
        mvpCount: 14,
        clutchesWon: 9,
        scrimMmr: 1540,
        hoursPlayed: 350,
        mainCharactersOrWeapons: ['SCAR', 'M4A1']
      },
      POKEMON_UNITE: {
        game: 'POKEMON_UNITE',
        inGameName: 'PriyaUnite',
        inGameId: 'UNITE9918',
        currentRank: 'Master 1500',
        peakRank: 'Master 1650',
        kdRatio: 3.0,
        winRate: 64.0,
        headshotPct: 0,
        mvpCount: 32,
        clutchesWon: 21,
        scrimMmr: 1710,
        hoursPlayed: 500,
        mainCharactersOrWeapons: ['Eldegoss', 'Clefable']
      },
      EA_FC24: {
        game: 'EA_FC24',
        inGameName: 'ValkyrieFC',
        inGameId: 'EA_VALK_WB',
        currentRank: 'Div 3',
        peakRank: 'Div 2',
        kdRatio: 1.6,
        winRate: 55.0,
        headshotPct: 0,
        mvpCount: 12,
        clutchesWon: 6,
        scrimMmr: 1520,
        hoursPlayed: 180,
        mainCharactersOrWeapons: ['Barcelona 4-3-3']
      }
    },
    trophies: [
      {
        id: 'tr_7',
        title: 'VCT Game Changers South Asia 1st Place',
        event: 'Riot Games Game Changers 2025',
        date: 'Aug 2025',
        tier: 'Gold',
        icon: '👑',
        prizeContribution: '₹3,50,000'
      }
    ],
    tournamentHistory: [
      {
        id: 'th_7',
        tournamentName: 'VCT GC South Asia Championship',
        game: 'VALORANT',
        date: 'Aug 2025',
        teamName: 'Orangutan Asteria',
        placement: '1st Place 🏆',
        prizeWon: '₹4,00,000',
        verified: true
      }
    ],
    gear: {
      deviceOrPlatform: 'PC: i7-13700K + RTX 4070 (240Hz BenQ ZOWIE)',
      peripherals: 'Finalmouse UltralightX + SteelSeries Apex Pro TKL',
      audio: 'Sennheiser HD 560S',
      sensDpi: '800 DPI | 0.31 Sens'
    },
    clips: [
      {
        id: 'clip_5',
        title: 'Game Changers Finals: Sova Shock Dart Double Kill Post-Plant',
        game: 'VALORANT',
        duration: '0:35',
        views: '41.8K',
        thumbnail: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=500&auto=format&fit=crop&q=80'
      }
    ],
    socials: {
      youtube: 'https://youtube.com/@valkyrie_priya',
      instagram: 'https://instagram.com/valkyrie_priya',
      twitter: 'https://x.com/valkyrie_fps',
      discord: 'valkyrie#1337'
    },
    reputationScore: 99,
    scrimAttendanceRate: 100,
    createdAt: '2024-01-12'
  },
  {
    id: 'player_blitz',
    passportNumber: 'IND-ESP-2026-4421',
    gamerTag: 'BL1TZ_ASSAULT',
    realName: 'Aman "Blitz" Chaudhary',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80',
    age: 18,
    state: 'Punjab',
    city: 'Chandigarh',
    languages: ['Punjabi', 'Hindi', 'English'],
    tier: 'Contender',
    level: 15,
    currentXp: 3800,
    nextLevelXp: 5000,
    primaryGame: 'BGMI',
    primaryRole: 'Assaulter',
    secondaryRoles: ['Entry Fragger'],
    availability: 'LFG Pro Team',
    isVerified: true,
    isKycVerified: false,
    verificationBadgeType: 'Verified Contender',
    bio: 'Rising 18-year-old high-fragging assaulter from North India. Averaging 8.4 finishes per match in Tier-2 scrims.',
    radarStats: {
      aim: 94,
      gameSense: 82,
      clutch: 87,
      utility: 76,
      communication: 84,
      aggression: 96
    },
    gamePerformances: {
      BGMI: {
        game: 'BGMI',
        inGameName: 'BL1TZ_PRO',
        inGameId: '5910293811',
        currentRank: 'Conqueror 12 Stars',
        peakRank: 'Conqueror 20 Stars',
        kdRatio: 8.12,
        winRate: 66.4,
        headshotPct: 38.9,
        mvpCount: 94,
        clutchesWon: 62,
        scrimMmr: 2240,
        hoursPlayed: 3100,
        mainCharactersOrWeapons: ['M416', 'UMP45', 'M762']
      },
      VALORANT: {
        game: 'VALORANT',
        inGameName: 'BlitzPB#IND',
        inGameId: '7729104811',
        currentRank: 'Diamond 3',
        peakRank: 'Ascendant 2',
        kdRatio: 1.14,
        winRate: 56.0,
        headshotPct: 26.0,
        mvpCount: 28,
        clutchesWon: 19,
        scrimMmr: 1820,
        hoursPlayed: 850,
        mainCharactersOrWeapons: ['Reyna', 'Phoenix']
      },
      CS2: {
        game: 'CS2',
        inGameName: 'blitz_pb',
        inGameId: 'STEAM_0:1:3391024',
        currentRank: 'Faceit Level 6',
        peakRank: 'Distinguished Master Guardian',
        kdRatio: 1.08,
        winRate: 54.0,
        headshotPct: 44.0,
        mvpCount: 22,
        clutchesWon: 14,
        scrimMmr: 1720,
        hoursPlayed: 700,
        mainCharactersOrWeapons: ['AK-47']
      },
      FREE_FIRE: {
        game: 'FREE_FIRE',
        inGameName: 'BlitzKingFF',
        inGameId: '88102938',
        currentRank: 'Grandmaster I',
        peakRank: 'Grandmaster II',
        kdRatio: 5.2,
        winRate: 64.0,
        headshotPct: 48.0,
        mvpCount: 38,
        clutchesWon: 24,
        scrimMmr: 1910,
        hoursPlayed: 1100,
        mainCharactersOrWeapons: ['M1887', 'Thompson']
      },
      POKEMON_UNITE: {
        game: 'POKEMON_UNITE',
        inGameName: 'BlitzPB',
        inGameId: 'UNITE3319',
        currentRank: 'Ultra Class 4',
        peakRank: 'Master 1200',
        kdRatio: 1.9,
        winRate: 51.0,
        headshotPct: 0,
        mvpCount: 8,
        clutchesWon: 4,
        scrimMmr: 1420,
        hoursPlayed: 150,
        mainCharactersOrWeapons: ['Cinderace']
      },
      EA_FC24: {
        game: 'EA_FC24',
        inGameName: 'BlitzFC_PB',
        inGameId: 'EA_BLITZ_PB',
        currentRank: 'Div 4',
        peakRank: 'Div 3',
        kdRatio: 1.4,
        winRate: 52.0,
        headshotPct: 0,
        mvpCount: 8,
        clutchesWon: 4,
        scrimMmr: 1450,
        hoursPlayed: 120,
        mainCharactersOrWeapons: ['Liverpool 4-3-3']
      }
    },
    trophies: [
      {
        id: 'tr_8',
        title: 'North Zone Scrims MVP',
        event: 'Villager Esports Scrims Season 4',
        date: 'Jan 2026',
        tier: 'Bronze',
        icon: '⚡',
        prizeContribution: '₹25,000'
      }
    ],
    tournamentHistory: [
      {
        id: 'th_8',
        tournamentName: 'Punjab Esports Championship 2025',
        game: 'BGMI',
        date: 'Dec 2025',
        teamName: 'Chandigarh Warriors',
        placement: '1st Place 🏆',
        prizeWon: '₹50,000',
        verified: true
      }
    ],
    gear: {
      deviceOrPlatform: 'Mobile: OnePlus 12 (120 FPS)',
      peripherals: '3-Finger Claw Gyroscope',
      audio: 'OnePlus Bullets Wireless Z2',
      sensDpi: 'Gyro 300%'
    },
    clips: [
      {
        id: 'clip_6',
        title: '1v3 Squad Wipe on Pochinki Rooftops in 6 Seconds',
        game: 'BGMI',
        duration: '0:20',
        views: '16.8K',
        thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=80'
      }
    ],
    socials: {
      youtube: 'https://youtube.com/@blitz_bgmi',
      instagram: 'https://instagram.com/blitz_aman',
      discord: 'blitz#9911'
    },
    reputationScore: 92,
    scrimAttendanceRate: 97.0,
    createdAt: '2025-02-01'
  },
  {
    id: 'player_krishna_cs',
    passportNumber: 'IND-ESP-2026-3190',
    gamerTag: 'KRISHN4_CS',
    realName: 'Krishna "Krish" Murthy',
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&auto=format&fit=crop&q=80',
    age: 24,
    state: 'Tamil Nadu',
    city: 'Chennai',
    languages: ['Tamil', 'English', 'Hindi'],
    tier: 'National Pro',
    level: 26,
    currentXp: 7800,
    nextLevelXp: 9500,
    primaryGame: 'CS2',
    primaryRole: 'Anchor',
    secondaryRoles: ['Support', 'IGL'],
    currentTeam: {
      name: 'Gods Reign CS',
      tag: 'GR',
      logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
      role: 'B Site Anchor / Support'
    },
    availability: 'Signed / Roster Active',
    isVerified: true,
    isKycVerified: true,
    verificationBadgeType: 'National Athlete',
    bio: 'CS veteran in the Indian sub-continent. 3x National CS:GO/CS2 Champion. Exceptional crosshair placement and site anchoring discipline.',
    radarStats: {
      aim: 93,
      gameSense: 97,
      clutch: 95,
      utility: 96,
      communication: 94,
      aggression: 76
    },
    gamePerformances: {
      CS2: {
        game: 'CS2',
        inGameName: 'KRISHN4_IN',
        inGameId: 'STEAM_0:1:1102938',
        currentRank: 'Faceit Level 10 (2840 ELO)',
        peakRank: 'Global Elite / Top 5 India Faceit',
        kdRatio: 1.38,
        winRate: 70.1,
        headshotPct: 66.8,
        mvpCount: 240,
        clutchesWon: 165,
        scrimMmr: 2590,
        hoursPlayed: 6200,
        mainCharactersOrWeapons: ['AK-47', 'M4A1-S', 'USP-S']
      },
      VALORANT: {
        game: 'VALORANT',
        inGameName: 'KrishCS#CHE',
        inGameId: '3391029381',
        currentRank: 'Immortal 3',
        peakRank: 'Radiant',
        kdRatio: 1.25,
        winRate: 64.0,
        headshotPct: 37.0,
        mvpCount: 88,
        clutchesWon: 60,
        scrimMmr: 2280,
        hoursPlayed: 2100,
        mainCharactersOrWeapons: ['Cypher', 'Killjoy', 'Vandal']
      },
      BGMI: {
        game: 'BGMI',
        inGameName: 'KrishMurthy',
        inGameId: '5440192831',
        currentRank: 'Ace',
        peakRank: 'Ace Master',
        kdRatio: 4.2,
        winRate: 54.0,
        headshotPct: 28.0,
        mvpCount: 30,
        clutchesWon: 18,
        scrimMmr: 1750,
        hoursPlayed: 900,
        mainCharactersOrWeapons: ['M416', 'Kar98k']
      },
      FREE_FIRE: {
        game: 'FREE_FIRE',
        inGameName: 'KrishFF',
        inGameId: '44102938',
        currentRank: 'Platinum IV',
        peakRank: 'Diamond II',
        kdRatio: 2.8,
        winRate: 48.0,
        headshotPct: 30.0,
        mvpCount: 10,
        clutchesWon: 5,
        scrimMmr: 1400,
        hoursPlayed: 200,
        mainCharactersOrWeapons: ['AK', 'M14']
      },
      POKEMON_UNITE: {
        game: 'POKEMON_UNITE',
        inGameName: 'KrishUnite',
        inGameId: 'UNITE2209',
        currentRank: 'Veteran',
        peakRank: 'Ultra',
        kdRatio: 1.8,
        winRate: 50.0,
        headshotPct: 0,
        mvpCount: 5,
        clutchesWon: 2,
        scrimMmr: 1380,
        hoursPlayed: 110,
        mainCharactersOrWeapons: ['Venusaur']
      },
      EA_FC24: {
        game: 'EA_FC24',
        inGameName: 'Krish_FC_TN',
        inGameId: 'EA_KRISH_TN',
        currentRank: 'Div 3',
        peakRank: 'Div 2',
        kdRatio: 1.7,
        winRate: 58.0,
        headshotPct: 0,
        mvpCount: 16,
        clutchesWon: 9,
        scrimMmr: 1620,
        hoursPlayed: 310,
        mainCharactersOrWeapons: ['Bayern Munich 4-2-3-1']
      }
    },
    trophies: [
      {
        id: 'tr_9',
        title: 'Skyesports Masters CS2 — Champion',
        event: 'Skyesports Masters LAN Bangalore',
        date: 'May 2025',
        tier: 'Gold',
        icon: '🏆',
        prizeContribution: '₹7,50,000'
      }
    ],
    tournamentHistory: [
      {
        id: 'th_9',
        tournamentName: 'Skyesports Masters CS2 Grand Finals',
        game: 'CS2',
        date: 'May 2025',
        teamName: 'Gods Reign CS',
        placement: '1st Place 🏆',
        prizeWon: '₹12,00,000',
        verified: true
      }
    ],
    gear: {
      deviceOrPlatform: 'PC: Ryzen 9 7950X3D + RTX 4090 (540Hz Asus ROG Swift)',
      peripherals: 'Zowie EC2-CW Wireless + Vaxee PA Mousepad',
      audio: 'Sennheiser Game Zero',
      sensDpi: '400 DPI | 1.85 In-Game Sens (Raw Input 1)'
    },
    clips: [
      {
        id: 'clip_7',
        title: '1v3 Inferno Banana Defense 3-Bullet 3-Kill Deagle',
        game: 'CS2',
        duration: '0:28',
        views: '54.0K',
        thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&auto=format&fit=crop&q=80'
      }
    ],
    socials: {
      youtube: 'https://youtube.com/@krishna_cs2_in',
      twitter: 'https://x.com/krish_cs2',
      discord: 'krish#1999',
      steamOrRiot: 'KRISHN4_IN'
    },
    reputationScore: 100,
    scrimAttendanceRate: 100,
    createdAt: '2023-08-19'
  }
];

export const MOCK_TOURNAMENTS: Tournament[] = [
  {
    id: 'tourn_skyesports_lan_2026',
    title: 'Skyesports Masters National LAN — Hyderabad 2026',
    organizer: {
      id: 'org_skyesports',
      name: 'Skyesports India',
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
      trustScore: 98,
      isVerified: true,
      tier: 'Tier 1 Trusted'
    },
    game: 'VALORANT',
    type: 'LAN Arena',
    status: 'Registration Open',
    prizePool: 5000000,
    prizePoolFormatted: '₹50,00,000',
    entryFee: 'FREE (Verified Passports Only)',
    startDate: '10 March 2026',
    endDate: '15 March 2026',
    location: 'LAN — Gachibowli Indoor Stadium, Hyderabad',
    totalSlots: 128,
    registeredSlots: 94,
    bannerImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80',
    description: 'The pinnacle of Indian PC Esports. 128 squads battle through national qualifiers down to 8 finalist teams competing live on stage in Hyderabad for ₹50 Lakhs in cash prizing and international APAC seeding.',
    format: 'Swiss Stage (BO1) -> Top 16 Double Elimination (BO3) -> Grand Finals (BO5 Live on Stage)',
    rulesSummary: [
      'All players must hold an active IEIH E-Player Passport with minimum Contender Tier rank.',
      'Aadhaar / National ID KYC verification mandatory prior to LAN stage.',
      'Server: Mumbai AWS 128-Tick Competitive Tournament Realm.',
      'Prize pool direct NEFT/RTGS disbursal within 14 business days backed by IEIH Escrow Guarantee.'
    ],
    prizeDistribution: [
      { place: '1st Place 🏆', amount: '₹25,00,000', percentage: '50%' },
      { place: '2nd Place 🥈', amount: '₹12,50,000', percentage: '25%' },
      { place: '3rd Place 🥉', amount: '₹6,00,000', percentage: '12%' },
      { place: '4th Place', amount: '₹3,50,000', percentage: '7%' },
      { place: '5th - 8th Place', amount: '₹75,000 each', percentage: '6%' }
    ],
    schedule: [
      { stage: 'Open Qualifiers (Online)', date: 'Mar 10 - Mar 11, 2026', time: '14:00 IST' },
      { stage: 'Swiss Top 32 Broadcast', date: 'Mar 12, 2026', time: '16:00 IST' },
      { stage: 'LAN Quarterfinals & Semis', date: 'Mar 14, 2026', time: '12:00 IST' },
      { stage: 'LAN Grand Finals & Trophy', date: 'Mar 15, 2026', time: '17:00 IST' }
    ],
    brackets: [
      {
        id: 'bm_1',
        roundName: 'Quarterfinal 1',
        team1: { name: 'Revenant Velocity', tag: 'RV', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&auto=format&fit=crop&q=80', score: 2, isWinner: true },
        team2: { name: 'Gods Reign', tag: 'GR', logo: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=80&auto=format&fit=crop&q=80', score: 0, isWinner: false },
        scheduledTime: '14:00 IST',
        isLive: false
      },
      {
        id: 'bm_2',
        roundName: 'Quarterfinal 2',
        team1: { name: 'Global Esports Academy', tag: 'GEA', logo: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=80&auto=format&fit=crop&q=80', score: 2, isWinner: true },
        team2: { name: 'Orangutan Gaming', tag: 'OG', logo: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=80&auto=format&fit=crop&q=80', score: 1, isWinner: false },
        scheduledTime: '16:30 IST',
        isLive: false
      },
      {
        id: 'bm_3',
        roundName: 'Semifinal 1',
        team1: { name: 'Revenant Velocity', tag: 'RV', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&auto=format&fit=crop&q=80', score: 0 },
        team2: { name: 'Global Esports Academy', tag: 'GEA', logo: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=80&auto=format&fit=crop&q=80', score: 0 },
        scheduledTime: 'Mar 14, 18:00 IST',
        isLive: true
      },
      {
        id: 'bm_4',
        roundName: 'Grand Finals 🏆',
        team1: { name: 'TBD (Winner SF1)', tag: 'TBD', logo: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=80&auto=format&fit=crop&q=80' },
        team2: { name: 'TBD (Winner SF2)', tag: 'TBD', logo: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=80&auto=format&fit=crop&q=80' },
        scheduledTime: 'Mar 15, 17:00 IST',
        isLive: false
      }
    ],
    isFeatured: true
  },
  {
    id: 'tourn_bgmi_pro_scrims',
    title: 'Krafton India BGMI Pro League — Season 4',
    organizer: {
      id: 'org_krafton_in',
      name: 'Krafton Esports India',
      logo: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=100&auto=format&fit=crop&q=80',
      trustScore: 99,
      isVerified: true,
      tier: 'Tier 1 Trusted'
    },
    game: 'BGMI',
    type: 'Online Championship',
    status: 'Live Now 🔴',
    prizePool: 20000000,
    prizePoolFormatted: '₹2,00,00,000',
    entryFee: 'Official Invitational & Open Grind',
    startDate: '18 Feb 2026',
    endDate: '28 Feb 2026',
    location: 'Broadcast Studio — Mumbai & Online Match Servers',
    totalSlots: 256,
    registeredSlots: 256,
    bannerImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&auto=format&fit=crop&q=80',
    description: 'The premier mobile battle royale championship of India. 32 Invited Tier-1 Franchises face off against 32 Underdog Qualifiers over 4 weeks of grueling Erangel, Miramar, and Sanhok matches.',
    format: 'Group Stage (6 Matches/Day) -> Semi Finals (Top 24) -> Grand Finals (16 Teams, 18 Matches)',
    rulesSummary: [
      'Official BGMI Esports 10-Point Kill & Placement Scoring System.',
      'Mandatory Anti-Cheat video recording & in-game camera verification.',
      'Official Team rosters locked with IEIH verified IDs.'
    ],
    prizeDistribution: [
      { place: '1st Place 🏆', amount: '₹1,00,00,000', percentage: '50%' },
      { place: '2nd Place 🥈', amount: '₹40,00,000', percentage: '20%' },
      { place: '3rd Place 🥉', amount: '₹20,00,000', percentage: '10%' },
      { place: 'MVP of Tournament', amount: '₹10,00,000', percentage: '5%' }
    ],
    schedule: [
      { stage: 'Day 1 Erangel & Miramar Matches', date: 'Today (Live)', time: '18:00 IST' },
      { stage: 'Grand Finals Day 3', date: '28 Feb 2026', time: '18:00 IST' }
    ],
    isFeatured: true
  },
  {
    id: 'tourn_collegiate_clash_2026',
    title: 'India Esports Collegiate Arena — All-India Inter-University Cup',
    organizer: {
      id: 'org_nodwin',
      name: 'Nodwin Gaming Campus',
      logo: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=100&auto=format&fit=crop&q=80',
      trustScore: 96,
      isVerified: true,
      tier: 'Tier 1 Trusted'
    },
    game: 'VALORANT',
    type: 'College Exclusive',
    status: 'Registration Open',
    prizePool: 1500000,
    prizePoolFormatted: '₹15,00,000',
    entryFee: 'FREE (Valid College ID Required)',
    startDate: '05 April 2026',
    endDate: '12 April 2026',
    location: 'IIT Bombay Campus & Online Qualifiers',
    totalSlots: 64,
    registeredSlots: 41,
    bannerImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80',
    description: 'India\'s largest university esports showdown. Students representing 100+ premier colleges (IITs, NITs, BITS, VIT, DU) battle for university glory, esports scholarships, and national broadcast exposure.',
    format: 'Regional North/South/East/West Brackets -> LAN National Finals at IIT Bombay Mood Indigo Arena',
    rulesSummary: [
      'All 5 players must be currently enrolled full-time students of the same college.',
      'IEIH College Chapter verification required for squad captain.',
      'Scholarship grant disbursed directly into college tuition / student sports accounts.'
    ],
    prizeDistribution: [
      { place: '1st Place & Campus Trophy 🎓', amount: '₹7,50,000', percentage: '50%' },
      { place: '2nd Place', amount: '₹3,50,000', percentage: '23%' },
      { place: '3rd Place', amount: '₹2,00,000', percentage: '13%' },
      { place: 'Top Campus Innovator Grant', amount: '₹2,00,000', percentage: '14%' }
    ],
    schedule: [
      { stage: 'Zonal University Qualifiers', date: 'Apr 05 - Apr 08, 2026', time: '15:00 IST' },
      { stage: 'National LAN Finals', date: 'Apr 12, 2026', time: '11:00 IST' }
    ]
  },
  {
    id: 'tourn_cs2_blast_india',
    title: 'TEC Indian CS2 Premiership — Season 12',
    organizer: {
      id: 'org_tec',
      name: 'The Esports Club',
      logo: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=100&auto=format&fit=crop&q=80',
      trustScore: 93,
      isVerified: true,
      tier: 'Verified Partner'
    },
    game: 'CS2',
    type: 'Online Championship',
    status: 'Upcoming',
    prizePool: 1000000,
    prizePoolFormatted: '₹10,00,000',
    entryFee: 'FREE',
    startDate: '20 March 2026',
    endDate: '29 March 2026',
    location: 'Online — 128-Tick Mumbai Faceit Hub',
    totalSlots: 64,
    registeredSlots: 28,
    bannerImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&auto=format&fit=crop&q=80',
    description: 'Premier 5v5 Counter-Strike 2 tournament for Indian squads. Dedicated Faceit Anti-Cheat integration, certified admin team, and live cast on TEC YouTube & Rooter.',
    format: 'Single Elimination BO1 -> Semifinals & Finals BO3',
    rulesSummary: [
      'Faceit Anti-Cheat mandatory for every round.',
      'Only players located within India, Nepal, Sri Lanka, and Bangladesh eligible.'
    ],
    prizeDistribution: [
      { place: '1st Place 🏆', amount: '₹5,00,000', percentage: '50%' },
      { place: '2nd Place', amount: '₹2,50,000', percentage: '25%' },
      { place: '3rd-4th Place', amount: '₹1,25,000 each', percentage: '25%' }
    ],
    schedule: [
      { stage: 'Round of 64', date: 'Mar 20, 2026', time: '17:00 IST' },
      { stage: 'Grand Finals', date: 'Mar 29, 2026', time: '19:00 IST' }
    ]
  }
];

export const MOCK_COLLEGIATE_CLUBS: CollegiateClub[] = [
  {
    id: 'club_iitb',
    collegeName: 'Indian Institute of Technology Bombay',
    shortName: 'IIT Bombay Gaming',
    city: 'Mumbai',
    state: 'Maharashtra',
    logo: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=100&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
    studentRosterCount: 68,
    topGames: ['VALORANT', 'CS2', 'BGMI'],
    rankingTier: 'National Rank #1 Campus',
    trophiesWon: 14,
    isOfficialCampusChapter: true,
    contactEmail: 'esports@iitb.ac.in',
    captain: {
      name: 'Tanmay Kulkarni',
      gamerTag: 'T4NM4Y_IITB',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'club_vit',
    collegeName: 'Vellore Institute of Technology',
    shortName: 'VIT CyberKnights',
    city: 'Vellore',
    state: 'Tamil Nadu',
    logo: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=100&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80',
    studentRosterCount: 112,
    topGames: ['VALORANT', 'BGMI', 'POKEMON_UNITE'],
    rankingTier: 'National Rank #2 Campus',
    trophiesWon: 11,
    isOfficialCampusChapter: true,
    contactEmail: 'cyberknights@vit.ac.in',
    captain: {
      name: 'Aditya S.',
      gamerTag: 'V1T_AD1',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'club_bits',
    collegeName: 'BITS Pilani (Pilani & Goa Campuses)',
    shortName: 'BITS Esports Guild',
    city: 'Pilani',
    state: 'Rajasthan',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    studentRosterCount: 84,
    topGames: ['CS2', 'VALORANT', 'EA_FC24'],
    rankingTier: 'National Rank #3 Campus',
    trophiesWon: 8,
    isOfficialCampusChapter: true,
    contactEmail: 'esports@pilani.bits-pilani.ac.in',
    captain: {
      name: 'Siddharth Rao',
      gamerTag: 'B1TS_S1D',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'club_dtu',
    collegeName: 'Delhi Technological University',
    shortName: 'DTU Gladiators',
    city: 'New Delhi',
    state: 'Delhi NCR',
    logo: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&auto=format&fit=crop&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
    studentRosterCount: 76,
    topGames: ['BGMI', 'VALORANT', 'FREE_FIRE'],
    rankingTier: 'National Rank #4 Campus',
    trophiesWon: 9,
    isOfficialCampusChapter: true,
    contactEmail: 'gladiators@dtu.ac.in',
    captain: {
      name: 'Manish Kumar',
      gamerTag: 'DTU_M4N1SH',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80'
    }
  }
];

export const MOCK_JOBS: JobOpportunity[] = [
  {
    id: 'job_1',
    title: 'Tier-1 Starting Duelist / Entry Fragger',
    organization: 'Revenant Velocity',
    orgLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    game: 'VALORANT',
    roleCategory: 'Player / Athlete',
    type: 'Full-Time Contract',
    location: 'Mumbai Bootcamp (Accommodation & Meals Provided)',
    compensation: '₹65,000 - ₹95,000 / month + 80% Prizepool Split',
    description: 'We are seeking an aggressive, high-IQ Jett/Raze main with Radiant experience and competitive scrim pedigree to join our VCT South Asia Challengers roster.',
    requirements: [
      'Current Radiant or Peak Radiant on APAC / South Asia servers.',
      'Proven competitive tier-2 tournament records on IEIH Passport.',
      'Must be 18+ and able to relocate to the Mumbai Team Bootcamp.',
      'Strong communication and ability to handle high-pressure clutch situations.'
    ],
    postedDate: '2 days ago',
    applicantCount: 38,
    isUrgent: true
  },
  {
    id: 'job_2',
    title: 'Head Tactical Coach & Scrim Analyst',
    organization: 'GodLike Esports',
    orgLogo: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=100&auto=format&fit=crop&q=80',
    game: 'BGMI',
    roleCategory: 'Coach / Analyst',
    type: 'Full-Time Contract',
    location: 'Delhi NCR Bootcamp / Hybrid',
    compensation: '₹80,000 - ₹1,20,000 / month + Performance Bonus',
    description: 'Looking for a seasoned BGMI tactical coach to oversee scrim VOD reviews, zone rotation pathing, utility meta optimization, and roster mental conditioning.',
    requirements: [
      'Prior experience coaching in BGIS / BMPS Tier-1 tournaments.',
      'Deep knowledge of weapon recoil statistics, drop locations, and circle algorithm shifts.',
      'Fluent in Hindi and English with strong interpersonal leadership.'
    ],
    postedDate: '3 days ago',
    applicantCount: 19,
    isUrgent: true
  },
  {
    id: 'job_3',
    title: 'Official Hindi Esports Broadcaster & Caster',
    organization: 'Skyesports India',
    orgLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    game: 'Multiple Games',
    roleCategory: 'Caster / Talent',
    type: 'Tournament Gigs',
    location: 'Hyderabad Studio & Remote Casts',
    compensation: '₹15,000 - ₹25,000 / Matchday Broadcast',
    description: 'Energetic, articulate Hindi shoutcaster with deep esports game knowledge to host and cast national LAN stages and online broadcasts.',
    requirements: [
      'Exceptional Hindi or Hinglish play-by-play commentary flow.',
      'Strong microphone presence, vocal stamina for 6-hour broadcasts.',
      'Portfolio links / caster reels verified on IEIH Passport.'
    ],
    postedDate: '5 days ago',
    applicantCount: 47,
    isUrgent: false
  },
  {
    id: 'job_4',
    title: 'Esports Team Operations & Scrim Coordinator',
    organization: 'Global Esports',
    orgLogo: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=100&auto=format&fit=crop&q=80',
    game: 'General Esports',
    roleCategory: 'Management',
    type: 'Paid Internship',
    location: 'Bengaluru / Remote',
    compensation: '₹30,000 / month + Mentorship by Tier-1 Executives',
    description: 'Assist team managers with daily Tier-1 scrim bookings, lobby verification, player schedules, travel logistics for LANs, and player wellness tracking.',
    requirements: [
      'Strong organizational skills, Discord power-user.',
      'Passion for Indian esports ecosystem.',
      'Undergraduate student or fresh graduate welcome.'
    ],
    postedDate: '1 week ago',
    applicantCount: 62,
    isUrgent: false
  }
];

export const MOCK_TICKER_ITEMS = [
  '🔴 BGMI Pro League Season 4: GodLike vs Revenant Erangel Match 3 Live Now — ₹2 Crore Prize Pool',
  '🏆 Skyesports Masters National LAN Hyderabad 2026: 94/128 Slots Registered — ₹50,00,000 Disbursal Guaranteed',
  '⚡ Top Scout Alert: Revenant Velocity is holding open trials for Tier-1 Duelist (₹95K/mo stipend)',
  '🎓 India Collegiate Cup 2026: IIT Bombay and VIT CyberKnights lock seed for Semi Finals',
  '🛡️ IEIH Trust Engine: 99.4% of tournament prizing disbursed on-time across 450+ verified events in 2025-26'
];
