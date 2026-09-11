import React, { useState } from 'react';
import { 
  Sparkles, 
  Gamepad2, 
  ShieldCheck, 
  Trophy, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Zap, 
  User,
  Flame,
  Star
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PlayerPassport, GameType, RoleType } from '../../types';
import { soundManager } from '../../utils/audio';

interface OnboardingWizardProps {
  onComplete: (passport: PlayerPassport) => void;
  onCancel?: () => void;
}

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
      colors: ['#0284c7', '#8b5cf6', '#10b981', '#f59e0b']
    });

    const newPassport: PlayerPassport = {
      id: `player_custom_${Date.now()}`,
      passportNumber: `IND-ESP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      gamerTag: gamerTag || 'PIONEER_ATHLETE',
      realName: realName || 'Pro Contender',
      avatarUrl: '',
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
    <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-surface-card border border-surface-border shadow-xl backdrop-blur-xl animate-fadeIn">
      {/* Top Wizard Progress Indicator */}
      <div className="mb-8 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-accent-cyan flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Character Setup • Step {step} of {totalSteps}
          </span>
          <span className="text-text-muted text-xs">
            {Math.round((step / totalSteps) * 100)}% completed (+1,200 XP)
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-surface-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-text-primary rounded-full transition-all duration-500"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* STEP 1: Persona & Avatar */}
      {step === 1 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h3 className="font-bold text-2xl text-text-primary">
              Create Your Player Identity
            </h3>
            <p className="text-sm text-text-muted mt-1">
              Choose your competitive handle and identity details for the Indian esports passport registry.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-text-secondary block mb-1.5">COMPETITIVE GAMERTAG *</label>
                <input
                  type="text"
                  placeholder="e.g. PHANTOM_K1NG"
                  value={gamerTag}
                  onChange={e => setGamerTag(e.target.value)}
                  className="w-full px-4 py-2.5 bg-surface-base border border-surface-border rounded-xl text-sm font-semibold text-text-primary focus:outline-none focus:ring-2 focus:ring-text-primary/20 transition-all placeholder:text-text-muted"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-text-secondary block mb-1.5">FULL LEGAL NAME *</label>
                <input
                  type="text"
                  placeholder="e.g. Aryan Malhotra"
                  value={realName}
                  onChange={e => setRealName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-surface-base border border-surface-border rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-text-primary/20 transition-all placeholder:text-text-muted"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-text-secondary block mb-1.5">AGE</label>
                <input
                  type="number"
                  value={age}
                  onChange={e => setAge(parseInt(e.target.value) || 18)}
                  className="w-full px-4 py-2.5 bg-surface-base border border-surface-border rounded-xl text-sm font-medium text-text-primary focus:outline-none focus:ring-2 focus:ring-text-primary/20 transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-text-secondary block mb-1.5">HOME STATE</label>
                <input
                  type="text"
                  value={state}
                  onChange={e => setState(e.target.value)}
                  className="w-full px-4 py-2.5 bg-surface-base border border-surface-border rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-text-primary/20 transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-text-secondary block mb-1.5">CITY</label>
                <input
                  type="text"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full px-4 py-2.5 bg-surface-base border border-surface-border rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-text-primary/20 transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: Combat Discipline */}
      {step === 2 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h3 className="font-bold text-2xl text-text-primary">
              Primary Esports Title
            </h3>
            <p className="text-sm text-text-muted mt-1">
              Select your competitive title and connect your in-game identity credentials.
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
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    primaryGame === game
                      ? 'bg-text-primary text-surface-base border-text-primary shadow-md'
                      : 'bg-surface-base border-surface-border text-text-primary hover:border-text-secondary/40'
                  }`}
                >
                  <Gamepad2 className={`w-5 h-5 mb-2 ${primaryGame === game ? 'text-surface-base' : 'text-text-muted'}`} />
                  <div className="font-bold text-sm tracking-tight">{game}</div>
                  <div className={`text-[11px] mt-0.5 ${primaryGame === game ? 'opacity-80' : 'text-text-muted'}`}>Competitive Tier</div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="text-xs font-semibold text-text-secondary block mb-1.5">IN-GAME NAME (IGN)</label>
                <input
                  type="text"
                  placeholder="e.g. Phantom#IND"
                  value={inGameName}
                  onChange={e => setInGameName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-surface-base border border-surface-border rounded-xl text-sm font-mono text-text-primary focus:outline-none focus:ring-2 focus:ring-text-primary/20 transition-all placeholder:text-text-muted"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-text-secondary block mb-1.5">IN-GAME UID / RIOT ID</label>
                <input
                  type="text"
                  placeholder="e.g. 519203910"
                  value={inGameId}
                  onChange={e => setInGameId(e.target.value)}
                  className="w-full px-4 py-2.5 bg-surface-base border border-surface-border rounded-xl text-sm font-mono text-text-primary focus:outline-none focus:ring-2 focus:ring-text-primary/20 transition-all placeholder:text-text-muted"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-text-secondary block mb-1.5">CURRENT RANK</label>
                <input
                  type="text"
                  placeholder="e.g. Radiant / Conqueror"
                  value={currentRank}
                  onChange={e => setCurrentRank(e.target.value)}
                  className="w-full px-4 py-2.5 bg-surface-base border border-surface-border rounded-xl text-sm font-semibold text-text-primary focus:outline-none focus:ring-2 focus:ring-text-primary/20 transition-all placeholder:text-text-muted"
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
            <h3 className="font-bold text-2xl text-text-primary">
              Tactical Role & Comms
            </h3>
            <p className="text-sm text-text-muted mt-1">
              Help scouts and orgs understand your roster position, playstyle, and communication strengths.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-text-secondary block mb-2">PRIMARY SPECIALTY</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {(['Duelist', 'IGL', 'Assaulter', 'Sniper', 'Initiator', 'Controller', 'Sentinel', 'Support'] as RoleType[]).map(role => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => {
                      soundManager.playClickSound();
                      setPrimaryRole(role);
                    }}
                    className={`p-3 rounded-xl border text-center transition-all text-xs font-semibold ${
                      primaryRole === role
                        ? 'bg-text-primary text-surface-base border-text-primary shadow-sm'
                        : 'bg-surface-base border-surface-border text-text-secondary hover:text-text-primary hover:border-text-secondary/40'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-text-secondary block mb-1.5">PLAYSTYLE & SCRIM SUMMARY</label>
              <textarea
                rows={3}
                value={playstyleBio}
                onChange={e => setPlaystyleBio(e.target.value)}
                className="w-full px-4 py-2.5 bg-surface-base border border-surface-border rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-text-primary/20 transition-all placeholder:text-text-muted"
                placeholder="Describe your entry strengths, site anchor capabilities, or zone rotation philosophy..."
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: Identity & KYC Lock */}
      {step === 4 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h3 className="font-bold text-2xl text-text-primary">
              Identity Verification Seal
            </h3>
            <p className="text-sm text-text-muted mt-1">
              IEIH passports require verified identity to combat smurfing, fraud, and tournament bracket exploitation.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-surface-base border border-surface-border space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-text-primary">National KYC Digital Attestation</h4>
                <p className="text-xs text-text-muted">Cryptographic verification badge for Indian competitive athletes.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface-card border border-surface-border flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-medium text-text-primary">
                  Aadhaar / Government ID Verified Seal Attached
                </span>
              </div>
              <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold rounded-full">
                Ready to Mint
              </span>
            </div>
          </div>
        </div>
      )}

      {/* STEP 5: Unlocked Passport Confirmation */}
      {step === 5 && (
        <div className="space-y-6 text-center animate-fadeIn py-4">
          <div className="w-16 h-16 rounded-2xl bg-surface-muted border border-surface-border mx-auto flex items-center justify-center shadow-md">
            <Trophy className="w-8 h-8 text-accent-gold" />
          </div>

          <div className="space-y-1.5">
            <h3 className="font-bold text-2xl text-text-primary">
              Ready to Mint, {gamerTag || 'Athlete'}!
            </h3>
            <p className="text-sm text-text-muted max-w-md mx-auto">
              Your Level 1 Verified E-Player Passport is ready to be minted on the Indian Esports Innovation Hub ledger.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-surface-base border border-surface-border max-w-sm mx-auto text-left flex items-center justify-between shadow-sm">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-text-primary truncate">{gamerTag || 'PIONEER'}</span>
                <ShieldCheck className="w-4 h-4 text-accent-cyan shrink-0" />
              </div>
              <div className="text-xs text-text-muted mt-0.5">{primaryGame} • {primaryRole}</div>
              <div className="text-[11px] font-mono font-medium text-accent-cyan mt-1">IND-ESP-2026-NEW</div>
            </div>
            <span className="px-2.5 py-1 bg-surface-border text-text-primary font-bold text-xs rounded-lg font-mono">
              Lvl 1
            </span>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="mt-8 pt-6 border-t border-surface-border flex items-center justify-between">
        {step > 1 ? (
          <button
            type="button"
            onClick={handleBack}
            className="px-5 py-2.5 rounded-full border border-surface-border text-text-secondary hover:text-text-primary hover:bg-surface-base text-xs font-semibold transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </button>
        ) : (
          <div></div>
        )}

        {step < totalSteps ? (
          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-2.5 rounded-full bg-text-primary text-surface-base text-xs font-semibold hover:opacity-90 transition-all flex items-center gap-2 shadow-sm"
          >
            Continue to Step {step + 1}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleMintPassport}
            className="px-6 py-2.5 rounded-full bg-accent-cyan text-white text-xs font-semibold hover:opacity-90 shadow-md transition-all flex items-center gap-2"
          >
            <Zap className="w-4 h-4 fill-white" />
            Mint & Activate Passport (+1,200 XP)
          </button>
        )}
      </div>
    </div>
  );
};
