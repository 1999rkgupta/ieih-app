import React, { useState } from 'react';
import { X, Save, ShieldCheck, Sparkles, Gamepad2, Crosshair, User, Cpu } from 'lucide-react';
import { PlayerPassport, GameType, RoleType, SkillTier, AvailabilityStatus } from '../../types';
import { soundManager } from '../../utils/audio';

interface PassportEditorModalProps {
  passport: PlayerPassport;
  onSave: (updated: PlayerPassport) => void;
  onClose: () => void;
}

export const PassportEditorModal: React.FC<PassportEditorModalProps> = ({
  passport,
  onSave,
  onClose
}) => {
  const [formData, setFormData] = useState<PlayerPassport>({ ...passport });
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'stats' | 'gear'>('profile');

  const handleGamePerformanceChange = (field: string, val: any) => {
    const game = formData.primaryGame;
    const currentPerf = formData.gamePerformances[game] || {
      game,
      inGameName: formData.gamerTag,
      inGameId: '10029381',
      currentRank: 'Elite',
      peakRank: 'Elite',
      kdRatio: 1.5,
      winRate: 60,
      headshotPct: 30,
      mvpCount: 10,
      clutchesWon: 5,
      scrimMmr: 2000,
      hoursPlayed: 500,
      mainCharactersOrWeapons: ['Vandal', 'Phantom']
    };

    setFormData({
      ...formData,
      gamePerformances: {
        ...formData.gamePerformances,
        [game]: {
          ...currentPerf,
          [field]: val
        }
      }
    });
  };

  const handleRadarChange = (key: keyof PlayerPassport['radarStats'], val: number) => {
    setFormData({
      ...formData,
      radarStats: {
        ...formData.radarStats,
        [key]: Number(val)
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playSuccessBeep();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-hud-surface border border-hud-border rounded-xl flex flex-col shadow-2xl shadow-cyber-cyan/10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-hud-border bg-hud-card">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-cyber-cyan" />
            <div>
              <h3 className="font-orbitron font-bold text-lg text-hud-text">
                EDIT E-PLAYER PASSPORT
              </h3>
              <p className="text-xs text-hud-muted font-rajdhani">
                Passport ID: <span className="text-cyber-cyan font-mono">{passport.passportNumber}</span>
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundManager.playClickSound();
              onClose();
            }}
            className="p-2 rounded-lg text-hud-muted hover:text-hud-text hover:bg-hud-panel transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-hud-border px-6 pt-3 gap-3 bg-hud-card/50">
          <button
            type="button"
            onClick={() => setActiveSubTab('profile')}
            className={`pb-2.5 px-3 text-xs font-orbitron font-semibold tracking-wider border-b-2 flex items-center gap-1.5 ${
              activeSubTab === 'profile' ? 'border-cyber-cyan text-cyber-cyan' : 'border-transparent text-hud-muted'
            }`}
          >
            <User className="w-3.5 h-3.5" /> IDENTITY & BIO
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('stats')}
            className={`pb-2.5 px-3 text-xs font-orbitron font-semibold tracking-wider border-b-2 flex items-center gap-1.5 ${
              activeSubTab === 'stats' ? 'border-cyber-cyan text-cyber-cyan' : 'border-transparent text-hud-muted'
            }`}
          >
            <Crosshair className="w-3.5 h-3.5" /> GAME STATS & RADAR
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('gear')}
            className={`pb-2.5 px-3 text-xs font-orbitron font-semibold tracking-wider border-b-2 flex items-center gap-1.5 ${
              activeSubTab === 'gear' ? 'border-cyber-cyan text-cyber-cyan' : 'border-transparent text-hud-muted'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" /> GEAR & LOADOUT
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
          {activeSubTab === 'profile' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-orbitron text-hud-muted block mb-1">GAMERTAG / HANDLE</label>
                  <input
                    type="text"
                    required
                    value={formData.gamerTag}
                    onChange={e => setFormData({ ...formData, gamerTag: e.target.value })}
                    className="w-full px-3 py-2 bg-hud-card border border-hud-border rounded-lg text-sm text-hud-text focus:outline-none focus:border-cyber-cyan font-rajdhani font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-orbitron text-hud-muted block mb-1">REAL NAME</label>
                  <input
                    type="text"
                    required
                    value={formData.realName}
                    onChange={e => setFormData({ ...formData, realName: e.target.value })}
                    className="w-full px-3 py-2 bg-hud-card border border-hud-border rounded-lg text-sm text-hud-text focus:outline-none focus:border-cyber-cyan font-rajdhani font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-orbitron text-hud-muted block mb-1">STATE</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={e => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 bg-hud-card border border-hud-border rounded-lg text-sm text-hud-text focus:outline-none focus:border-cyber-cyan font-rajdhani"
                  />
                </div>
                <div>
                  <label className="text-xs font-orbitron text-hud-muted block mb-1">CITY</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 bg-hud-card border border-hud-border rounded-lg text-sm text-hud-text focus:outline-none focus:border-cyber-cyan font-rajdhani"
                  />
                </div>
                <div>
                  <label className="text-xs font-orbitron text-hud-muted block mb-1">AVAILABILITY</label>
                  <select
                    value={formData.availability}
                    onChange={e => setFormData({ ...formData, availability: e.target.value as AvailabilityStatus })}
                    className="w-full px-3 py-2 bg-hud-card border border-hud-border rounded-lg text-sm text-hud-text focus:outline-none focus:border-cyber-cyan font-rajdhani font-bold"
                  >
                    <option value="LFG Pro Team">LFG Pro Team</option>
                    <option value="LFG Scrims">LFG Scrims</option>
                    <option value="Signed / Roster Active">Signed / Roster Active</option>
                    <option value="Collegiate Team">Collegiate Team</option>
                    <option value="Free Agent">Free Agent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-orbitron text-hud-muted block mb-1">BIO / COMPETITIVE SUMMARY</label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={e => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3 py-2 bg-hud-card border border-hud-border rounded-lg text-xs text-hud-text focus:outline-none focus:border-cyber-cyan font-sans"
                  placeholder="Share your tournament highlights, role specialties, and scrim experience..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-orbitron text-hud-muted block mb-1">PRIMARY GAME</label>
                  <select
                    value={formData.primaryGame}
                    onChange={e => setFormData({ ...formData, primaryGame: e.target.value as GameType })}
                    className="w-full px-3 py-2 bg-hud-card border border-hud-border rounded-lg text-sm text-hud-text focus:outline-none focus:border-cyber-cyan font-rajdhani font-bold"
                  >
                    <option value="VALORANT">VALORANT</option>
                    <option value="BGMI">BGMI</option>
                    <option value="CS2">CS2</option>
                    <option value="FREE_FIRE">FREE FIRE</option>
                    <option value="POKEMON_UNITE">POKEMON UNITE</option>
                    <option value="EA_FC24">EA FC 24</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-orbitron text-hud-muted block mb-1">PRIMARY ROLE</label>
                  <select
                    value={formData.primaryRole}
                    onChange={e => setFormData({ ...formData, primaryRole: e.target.value as RoleType })}
                    className="w-full px-3 py-2 bg-hud-card border border-hud-border rounded-lg text-sm text-hud-text focus:outline-none focus:border-cyber-cyan font-rajdhani font-bold"
                  >
                    <option value="Duelist">Duelist / Entry Fragger</option>
                    <option value="IGL">IGL (In-Game Leader)</option>
                    <option value="Assaulter">Assaulter</option>
                    <option value="Sniper">Sniper / Operator</option>
                    <option value="Initiator">Initiator</option>
                    <option value="Controller">Controller / Smoker</option>
                    <option value="Sentinel">Sentinel / Anchor</option>
                    <option value="Support">Support</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'stats' && (
            <div className="space-y-4">
              <div className="p-3 bg-hud-card border border-hud-border rounded-lg text-xs text-cyber-cyan font-rajdhani font-bold">
                Editing stats for current Primary Game: <span className="font-orbitron">{formData.primaryGame}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-orbitron text-hud-muted block mb-1">IN-GAME NAME (IGN)</label>
                  <input
                    type="text"
                    value={formData.gamePerformances[formData.primaryGame]?.inGameName || ''}
                    onChange={e => handleGamePerformanceChange('inGameName', e.target.value)}
                    className="w-full px-3 py-2 bg-hud-card border border-hud-border rounded-lg text-sm text-hud-text font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-orbitron text-hud-muted block mb-1">CURRENT RANK</label>
                  <input
                    type="text"
                    value={formData.gamePerformances[formData.primaryGame]?.currentRank || ''}
                    onChange={e => handleGamePerformanceChange('currentRank', e.target.value)}
                    className="w-full px-3 py-2 bg-hud-card border border-hud-border rounded-lg text-sm text-hud-text font-rajdhani font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-orbitron text-hud-muted block mb-1">K/D RATIO</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.gamePerformances[formData.primaryGame]?.kdRatio || 1.0}
                    onChange={e => handleGamePerformanceChange('kdRatio', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 bg-hud-card border border-hud-border rounded-lg text-sm text-hud-text font-rajdhani font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-orbitron text-hud-muted block mb-1">WIN RATE (%)</label>
                  <input
                    type="number"
                    value={formData.gamePerformances[formData.primaryGame]?.winRate || 50}
                    onChange={e => handleGamePerformanceChange('winRate', parseInt(e.target.value))}
                    className="w-full px-3 py-2 bg-hud-card border border-hud-border rounded-lg text-sm text-hud-text font-rajdhani font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-orbitron text-hud-muted block mb-1">HEADSHOT %</label>
                  <input
                    type="number"
                    value={formData.gamePerformances[formData.primaryGame]?.headshotPct || 30}
                    onChange={e => handleGamePerformanceChange('headshotPct', parseInt(e.target.value))}
                    className="w-full px-3 py-2 bg-hud-card border border-hud-border rounded-lg text-sm text-hud-text font-rajdhani font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-orbitron text-hud-muted block mb-1">SCRIM MMR</label>
                  <input
                    type="number"
                    value={formData.gamePerformances[formData.primaryGame]?.scrimMmr || 2000}
                    onChange={e => handleGamePerformanceChange('scrimMmr', parseInt(e.target.value))}
                    className="w-full px-3 py-2 bg-hud-card border border-hud-border rounded-lg text-sm text-hud-text font-rajdhani font-bold"
                  />
                </div>
              </div>

              {/* Radar Stats Sliders */}
              <div className="pt-3 border-t border-hud-border">
                <label className="text-xs font-orbitron text-cyber-cyan block mb-3">TACTICAL RADAR ATTRIBUTES (0-100)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-orbitron">
                  {(['aim', 'gameSense', 'clutch', 'utility', 'communication', 'aggression'] as Array<keyof PlayerPassport['radarStats']>).map(key => (
                    <div key={key} className="space-y-1">
                      <div className="flex justify-between text-hud-muted">
                        <span className="uppercase">{key}</span>
                        <span className="text-cyber-cyan font-bold font-rajdhani">{formData.radarStats[key]}</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="100"
                        value={formData.radarStats[key]}
                        onChange={e => handleRadarChange(key, parseInt(e.target.value))}
                        className="w-full accent-cyber-cyan bg-hud-bg h-1.5 rounded"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'gear' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-orbitron text-hud-muted block mb-1">RIG / HARDWARE PLATFORM</label>
                <input
                  type="text"
                  value={formData.gear.deviceOrPlatform}
                  onChange={e => setFormData({
                    ...formData,
                    gear: { ...formData.gear, deviceOrPlatform: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-hud-card border border-hud-border rounded-lg text-sm text-hud-text font-rajdhani"
                  placeholder="e.g. PC: Ryzen 7 + RTX 4070 / iPhone 15 Pro Max"
                />
              </div>

              <div>
                <label className="text-xs font-orbitron text-hud-muted block mb-1">PERIPHERALS (MOUSE / KEYBOARD / TOUCH CLAW)</label>
                <input
                  type="text"
                  value={formData.gear.peripherals}
                  onChange={e => setFormData({
                    ...formData,
                    gear: { ...formData.gear, peripherals: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-hud-card border border-hud-border rounded-lg text-sm text-hud-text font-rajdhani"
                />
              </div>

              <div>
                <label className="text-xs font-orbitron text-hud-muted block mb-1">AUDIO GEAR</label>
                <input
                  type="text"
                  value={formData.gear.audio}
                  onChange={e => setFormData({
                    ...formData,
                    gear: { ...formData.gear, audio: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-hud-card border border-hud-border rounded-lg text-sm text-hud-text font-rajdhani"
                />
              </div>

              <div>
                <label className="text-xs font-orbitron text-hud-muted block mb-1">DPI / SENSITIVITY PROFILE</label>
                <input
                  type="text"
                  value={formData.gear.sensDpi}
                  onChange={e => setFormData({
                    ...formData,
                    gear: { ...formData.gear, sensDpi: e.target.value }
                  })}
                  className="w-full px-3 py-2 bg-hud-card border border-hud-border rounded-lg text-sm text-hud-text font-mono font-bold text-cyber-cyan"
                />
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-4 border-t border-hud-border flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                soundManager.playClickSound();
                onClose();
              }}
              className="px-4 py-2 bg-hud-card hover:bg-hud-panel border border-hud-border text-hud-text font-rajdhani font-bold text-sm rounded-lg transition-colors"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-cyber-cyan text-black font-rajdhani font-bold text-sm rounded-lg hover:bg-cyber-cyan/90 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.4)]"
            >
              <Save className="w-4 h-4" />
              SAVE PASSPORT CHANGES
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
