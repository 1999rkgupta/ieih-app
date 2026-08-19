import React, { useState } from 'react';
import { 
  Sparkles, 
  Gamepad2, 
  Crosshair, 
  ShieldCheck, 
  Trophy, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Zap, 
  User,
  Cpu,
  UploadCloud
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PlayerPassport, GameType, RoleType } from '../../types';
import { soundManager } from '../../utils/audio';

interface OnboardingWizardProps {
  onComplete: (passport: PlayerPassport) => void;
  onCancel?: () => void;
}

const CYBER_AVATARS = [
  'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80'
];

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({
  onComplete,
  onCancel
}) => {
  const [step, setStep] = useState<number>(1);
  const totalSteps = 5;

  // Step 1 State
  const [gamerTag, setGamerTag] = useState('');
  const [realName, setRealName] = useState('');
  const [age, setAge] = useState(19);
  const [state, setState] = useState('Maharashtra');
  const [city, setCity] = useState('Mumbai');
  const [selectedAvatar, setSelectedAvatar] = useState(CYBER_AVATARS[0]);

  // Step 2 State
  const [primaryGame, setPrimaryGame] = useState<GameType>('VALORANT');
  const [inGameName, setInGameName] = useState('');
  const [inGameId, setInGameId] = useState('');
  const [currentRank, setCurrentRank] = useState('Immortal 1');

  // Step 3 State
  const [primaryRole, setPrimaryRole] = useState<RoleType>('Duelist');
  const [languages, setLanguages] = useState<string[]>(['Hindi', 'English']);
  const [playstyleBio, setPlaystyleBio] = useState('Aggressive entry specialist with clutch discipline looking for competitive team scrims.');

  // Step 4 State
  const [idType, setIdType] = useState('Aadhaar / Government ID');
  const [idVerified, setIdVerified] = useState(true);

  const handleNext = () => {
    soundManager.playClickSound();
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    soundManager.playClickSound();
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleMintPassport = () => {
    soundManager.playLevelUpSound();

    // Trigger celebratory confetti
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00F0FF', '#8B5CF6', '#FFB800', '#FF4655']
    });

    const newPassport: PlayerPassport = {
      id: `player_custom_${Date.now()}`,
      passportNumber: `IND-ESP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      gamerTag: gamerTag || 'PIONEER_ATHLETE',
      realName: realName || 'Pro Contender',
      avatarUrl: selectedAvatar,
      bannerUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80',
      age: age || 20,
      state: state || 'India',
      city: city || 'National Hub',
      languages: languages.length > 0 ? languages : ['Hindi', 'English'],
      tier: 'Contender',
      level: 1,
      currentXp: 1200,
      nextLevelXp: 2500,
      primaryGame,
      primaryRole,
      secondaryRoles: ['Assaulter'],
      availability: 'LFG Pro Team',
      isVerified: true,
      isKycVerified: true,
      verificationBadgeType: 'Verified Contender',
      bio: playstyleBio,
      radarStats: {
        aim: 88,
        gameSense: 86,
        clutch: 85,
        utility: 82,
        communication: 90,
        aggression: 89
      },
      gamePerformances: {
        VALORANT: {
          game: 'VALORANT',
          inGameName: inGameName || `${gamerTag}#IND`,
          inGameId: inGameId || '88392019',
          currentRank: currentRank || 'Ascendant 3',
          peakRank: 'Immortal 1',
          kdRatio: 1.34,
          winRate: 64.0,
          headshotPct: 32.5,
          mvpCount: 24,
          clutchesWon: 18,
          scrimMmr: 2150,
          hoursPlayed: 850,
          mainCharactersOrWeapons: ['Jett', 'Reyna', 'Vandal']
        },
        BGMI: {
          game: 'BGMI',
          inGameName: inGameName || gamerTag,
          inGameId: inGameId || '5192837192',
          currentRank: 'Ace Dominator',
          peakRank: 'Conqueror',
          kdRatio: 5.8,
          winRate: 62.0,
          headshotPct: 31.0,
          mvpCount: 30,
          clutchesWon: 22,
          scrimMmr: 2050,
          hoursPlayed: 920,
          mainCharactersOrWeapons: ['M416', 'Beryl M762']
        },
        CS2: {
          game: 'CS2',
          inGameName: gamerTag,
          inGameId: 'STEAM_0:1:8829104',
          currentRank: 'Faceit Level 7',
          peakRank: 'Supreme',
          kdRatio: 1.2,
          winRate: 58.0,
          headshotPct: 50.0,
          mvpCount: 15,
          clutchesWon: 10,
          scrimMmr: 1850,
          hoursPlayed: 600,
          mainCharactersOrWeapons: ['AK-47', 'M4A1-S']
        },
        FREE_FIRE: {
          game: 'FREE_FIRE',
          inGameName: gamerTag,
          inGameId: '7729104',
          currentRank: 'Master',
          peakRank: 'Master',
          kdRatio: 3.8,
          winRate: 56.0,
          headshotPct: 40.0,
          mvpCount: 12,
          clutchesWon: 8,
          scrimMmr: 1650,
          hoursPlayed: 350,
          mainCharactersOrWeapons: ['M1887', 'MP40']
        },
        POKEMON_UNITE: {
          game: 'POKEMON_UNITE',
          inGameName: gamerTag,
          inGameId: 'UNITE102',
          currentRank: 'Master 1400',
          peakRank: 'Master 1400',
          kdRatio: 2.2,
          winRate: 58.0,
          headshotPct: 0,
          mvpCount: 8,
          clutchesWon: 4,
          scrimMmr: 1500,
          hoursPlayed: 150,
          mainCharactersOrWeapons: ['Lucario', 'Zeraora']
        },
        EA_FC24: {
          game: 'EA_FC24',
          inGameName: gamerTag,
          inGameId: 'EA_PIONEER',
          currentRank: 'Div 2',
          peakRank: 'Div 1',
          kdRatio: 1.9,
          winRate: 60.0,
          headshotPct: 0,
          mvpCount: 10,
          clutchesWon: 5,
          scrimMmr: 1600,
          hoursPlayed: 200,
          mainCharactersOrWeapons: ['Real Madrid 4-3-3']
        }
      },
      trophies: [
        {
          id: 'tr_pioneer',
          title: 'IEIH Pioneer Athlete Badge',
          event: 'IEIH Genesis Registration',
          date: 'Feb 2026',
          tier: 'Gold',
          icon: '⚡',
          prizeContribution: 'Unlocked'
        }
      ],
      tournamentHistory: [
        {
          id: 'th_init',
          tournamentName: 'IEIH Genesis Trial Arena',
          game: primaryGame,
          date: 'Feb 2026',
          teamName: 'Free Agent Roster',
          placement: 'Registered Contender',
          prizeWon: 'Verified',
          verified: true
        }
      ],
      gear: {
        deviceOrPlatform: 'Gaming PC / High Performance Mobile',
        peripherals: 'Competitive Mechanical Setup',
        audio: 'Surround Sound In-Ear Monitors',
        sensDpi: '800 DPI | Optimized Pro Sensitivity'
      },
      clips: [],
      socials: {
        discord: `${gamerTag}#2026`
      },
      reputationScore: 95,
      scrimAttendanceRate: 100,
      createdAt: '2026-02-18'
    };

    setTimeout(() => {
      onComplete(newPassport);
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-hud-surface border-2 border-cyber-cyan/40 shadow-2xl shadow-cyber-cyan/15 animate-fadeIn">
      {/* Top Wizard Progress Indicator */}
      <div className="mb-8 space-y-3">
        <div className="flex items-center justify-between text-xs font-orbitron">
          <span className="text-cyber-cyan font-bold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            LEVEL 1 CHARACTER SETUP — STEP {step} OF {totalSteps}
          </span>
          <span className="text-hud-muted font-rajdhani font-bold text-sm">
            {Math.round((step / totalSteps) * 100)}% COMPLETED (+1,200 XP)
          </span>
        </div>

        {/* Progress Bar with 5 Nodes */}
        <div className="w-full h-2 bg-hud-bg rounded-full overflow-hidden p-0.5 border border-hud-border">
          <div
            className="h-full bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-gold rounded-full transition-all duration-500 shadow-[0_0_10px_#00F0FF]"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* STEP 1: Persona & Avatar */}
      {step === 1 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h3 className="font-orbitron font-extrabold text-2xl text-hud-text glow-text-cyan">
              MINT YOUR IN-GAME IDENTITY
            </h3>
            <p className="text-xs font-sans text-hud-muted mt-1">
              Choose your competitive handle and cyber avatar for the Indian esports passport network.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-orbitron text-hud-muted block mb-1">COMPETITIVE GAMERTAG *</label>
                <input
                  type="text"
                  placeholder="e.g. PHANTOM_K1NG"
                  value={gamerTag}
                  onChange={e => setGamerTag(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-hud-card border border-hud-border rounded-xl text-sm font-rajdhani font-bold text-cyber-cyan focus:outline-none focus:border-cyber-cyan"
                />
              </div>

              <div>
                <label className="text-xs font-orbitron text-hud-muted block mb-1">REAL FULL NAME *</label>
                <input
                  type="text"
                  placeholder="e.g. Aryan Malhotra"
                  value={realName}
                  onChange={e => setRealName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-hud-card border border-hud-border rounded-xl text-sm font-rajdhani text-hud-text focus:outline-none focus:border-cyber-cyan"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-orbitron text-hud-muted block mb-1">AGE</label>
                <input
                  type="number"
                  value={age}
                  onChange={e => setAge(parseInt(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-hud-card border border-hud-border rounded-xl text-sm font-rajdhani font-bold text-hud-text focus:outline-none focus:border-cyber-cyan"
                />
              </div>

              <div>
                <label className="text-xs font-orbitron text-hud-muted block mb-1">HOME STATE</label>
                <input
                  type="text"
                  value={state}
                  onChange={e => setState(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-hud-card border border-hud-border rounded-xl text-sm font-rajdhani text-hud-text focus:outline-none focus:border-cyber-cyan"
                />
              </div>

              <div>
                <label className="text-xs font-orbitron text-hud-muted block mb-1">CITY</label>
                <input
                  type="text"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-hud-card border border-hud-border rounded-xl text-sm font-rajdhani text-hud-text focus:outline-none focus:border-cyber-cyan"
                />
              </div>
            </div>

            {/* Avatar Picker */}
            <div>
              <label className="text-xs font-orbitron text-hud-muted block mb-2">SELECT CYBER AVATAR</label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {CYBER_AVATARS.map((avatar, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      soundManager.playClickSound();
                      setSelectedAvatar(avatar);
                    }}
                    className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all ${
                      selectedAvatar === avatar
                        ? 'border-cyber-cyan shadow-[0_0_15px_#00F0FF] scale-105'
                        : 'border-hud-border hover:border-cyber-cyan/50 opacity-70'
                    }`}
                  >
                    <img src={avatar} alt="Avatar option" className="w-full h-full object-cover" />
                    {selectedAvatar === avatar && (
                      <div className="absolute inset-0 bg-cyber-cyan/20 flex items-center justify-center">
                        <Check className="w-5 h-5 text-white drop-shadow" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: Combat Discipline */}
      {step === 2 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h3 className="font-orbitron font-extrabold text-2xl text-hud-text glow-text-cyan">
              CHOOSE PRIMARY COMBAT DISCIPLINE
            </h3>
            <p className="text-xs font-sans text-hud-muted mt-1">
              Select your main competitive title and in-game credentials.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {(['VALORANT', 'BGMI', 'CS2', 'FREE_FIRE', 'POKEMON_UNITE', 'EA_FC24'] as GameType[]).map(game => (
                <button
                  key={game}
                  type="button"
                  onClick={() => {
                    soundManager.playGlitchChirp();
                    setPrimaryGame(game);
                  }}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    primaryGame === game
                      ? 'bg-cyber-cyan/15 border-cyber-cyan shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                      : 'bg-hud-card border-hud-border hover:border-cyber-cyan/40'
                  }`}
                >
                  <Gamepad2 className={`w-5 h-5 mb-2 ${primaryGame === game ? 'text-cyber-cyan' : 'text-hud-muted'}`} />
                  <div className="font-orbitron font-bold text-sm text-hud-text">{game}</div>
                  <div className="text-[10px] font-rajdhani text-hud-muted mt-0.5">Competitive Tier</div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="text-xs font-orbitron text-hud-muted block mb-1">IN-GAME NAME (IGN)</label>
                <input
                  type="text"
                  placeholder="e.g. Phantom#IND"
                  value={inGameName}
                  onChange={e => setInGameName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-hud-card border border-hud-border rounded-xl text-sm font-mono text-hud-text focus:outline-none focus:border-cyber-cyan"
                />
              </div>

              <div>
                <label className="text-xs font-orbitron text-hud-muted block mb-1">IN-GAME UID / RIOT ID</label>
                <input
                  type="text"
                  placeholder="e.g. 519203910"
                  value={inGameId}
                  onChange={e => setInGameId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-hud-card border border-hud-border rounded-xl text-sm font-mono text-hud-text focus:outline-none focus:border-cyber-cyan"
                />
              </div>

              <div>
                <label className="text-xs font-orbitron text-hud-muted block mb-1">CURRENT RANK</label>
                <input
                  type="text"
                  placeholder="e.g. Radiant / Conqueror"
                  value={currentRank}
                  onChange={e => setCurrentRank(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-hud-card border border-hud-border rounded-xl text-sm font-rajdhani font-bold text-cyber-cyan focus:outline-none focus:border-cyber-cyan"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Tactical Role & Playstyle */}
      {step === 3 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h3 className="font-orbitron font-extrabold text-2xl text-hud-text glow-text-cyan">
              DEFINE TACTICAL ROLE & COMMS
            </h3>
            <p className="text-xs font-sans text-hud-muted mt-1">
              Inform coaches and scouts about your in-game positioning and preferred playstyle.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-orbitron text-hud-muted block mb-2">PRIMARY SPECIALTY</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {(['Duelist', 'IGL', 'Assaulter', 'Sniper', 'Initiator', 'Controller', 'Sentinel', 'Support'] as RoleType[]).map(role => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => {
                      soundManager.playClickSound();
                      setPrimaryRole(role);
                    }}
                    className={`p-3 rounded-xl border text-center transition-all text-xs font-rajdhani font-bold ${
                      primaryRole === role
                        ? 'bg-cyber-purple/20 border-cyber-purple text-cyber-purple shadow-[0_0_12px_rgba(139,92,246,0.4)]'
                        : 'bg-hud-card border-hud-border text-hud-text hover:border-cyber-purple/40'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-orbitron text-hud-muted block mb-1">PLAYSTYLE & SCRIM SUMMARY</label>
              <textarea
                rows={3}
                value={playstyleBio}
                onChange={e => setPlaystyleBio(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-hud-card border border-hud-border rounded-xl text-xs font-sans text-hud-text focus:outline-none focus:border-cyber-cyan"
                placeholder="Describe your weapon mastery, site anchor strengths, or zone rotation philosophy..."
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: Identity & KYC Lock */}
      {step === 4 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h3 className="font-orbitron font-extrabold text-2xl text-hud-text glow-text-cyan">
              VERIFIED PASSPORT SECURITY SEAL
            </h3>
            <p className="text-xs font-sans text-hud-muted mt-1">
              IEIH passports require identity confirmation to combat smurfing, fraud, and tournament bracket manipulation.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-hud-card border border-hud-border space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan flex items-center justify-center text-cyber-cyan shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-orbitron font-bold text-sm text-hud-text">DIGITAL KYC ATTESTATION</h4>
                <p className="text-xs font-rajdhani text-hud-muted">Instant cryptographic seal generated for Indian National Athletes & Contenders.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-hud-bg border border-hud-border/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-rajdhani font-bold text-hud-text">
                  Aadhaar / Government ID Verified Seal Attached
                </span>
              </div>
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 font-orbitron text-[10px] font-bold rounded">
                READY TO MINT
              </span>
            </div>
          </div>
        </div>
      )}

      {/* STEP 5: Unlocked Passport Confirmation */}
      {step === 5 && (
        <div className="space-y-6 text-center animate-fadeIn py-4">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyber-cyan via-cyber-purple to-cyber-gold p-0.5 mx-auto shadow-[0_0_30px_#00F0FF] animate-pulse">
            <div className="w-full h-full bg-hud-surface rounded-2xl flex items-center justify-center">
              <Trophy className="w-10 h-10 text-cyber-gold" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-orbitron font-black text-2xl sm:text-3xl text-hud-text glow-text-cyan">
              CONGRATULATIONS, {gamerTag || 'ATHLETE'}!
            </h3>
            <p className="text-sm font-rajdhani text-hud-muted max-w-md mx-auto">
              Your Level 1 Verified E-Player Passport is ready to be minted on the Indian Esports Innovation Hub ledger.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-hud-card border border-cyber-cyan/40 max-w-md mx-auto text-left flex items-center gap-4">
            <img src={selectedAvatar} alt="Avatar" className="w-14 h-14 rounded-xl object-cover border border-cyber-cyan" />
            <div>
              <div className="font-orbitron font-extrabold text-base text-hud-text">{gamerTag || 'PIONEER'}</div>
              <div className="text-xs font-rajdhani text-hud-muted">{primaryGame} • {primaryRole} • Level 1 Contender</div>
              <div className="text-xs font-mono text-cyber-cyan font-bold mt-0.5">IND-ESP-2026-NEW</div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="mt-8 pt-6 border-t border-hud-border flex items-center justify-between">
        {step > 1 ? (
          <button
            type="button"
            onClick={handleBack}
            className="px-5 py-2.5 bg-hud-card hover:bg-hud-panel border border-hud-border text-hud-text font-rajdhani font-bold text-xs rounded-xl transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            BACK
          </button>
        ) : (
          <div></div>
        )}

        {step < totalSteps ? (
          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-2.5 bg-gradient-to-r from-cyber-cyan to-cyber-blue text-black font-rajdhani font-extrabold text-xs rounded-xl hover:shadow-[0_0_15px_rgba(0,240,255,0.5)] transition-all flex items-center gap-2"
          >
            CONTINUE STEP {step + 1}
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleMintPassport}
            className="px-8 py-3 bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-gold text-black font-orbitron font-black text-xs rounded-xl hover:shadow-[0_0_25px_#00F0FF] transition-all flex items-center gap-2"
          >
            <Zap className="w-4 h-4 fill-black" />
            MINT & ACTIVATE PASSPORT (+1,200 XP)
          </button>
        )}
      </div>
    </div>
  );
};
