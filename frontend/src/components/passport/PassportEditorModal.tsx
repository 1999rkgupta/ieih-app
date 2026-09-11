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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#111726] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] border border-slate-200 dark:border-white/10">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#101622]/90">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-600 dark:text-sky-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Edit E-Player Passport
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Passport ID: <span className="text-sky-600 dark:text-sky-400 font-mono font-medium">{passport.passportNumber}</span>
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundManager.playClickSound();
              onClose();
            }}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switcher (Spotify pill tabs) */}
        <div className="flex border-b border-slate-200 dark:border-white/10 px-6 py-2.5 gap-2 bg-slate-50/80 dark:bg-white/5">
          <button
            type="button"
            onClick={() => setActiveSubTab('profile')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
              activeSubTab === 'profile'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10'
            }`}
          >
            <User className="w-3.5 h-3.5" /> Identity & Bio
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('stats')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
              activeSubTab === 'stats'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10'
            }`}
          >
            <Crosshair className="w-3.5 h-3.5" /> Stats & Radar
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('gear')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
              activeSubTab === 'gear'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" /> Gear & Specs
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1 bg-white dark:bg-[#111726]">
          {activeSubTab === 'profile' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">GamerTag / Handle</label>
                  <input
                    type="text"
                    required
                    value={formData.gamerTag}
                    onChange={e => setFormData({ ...formData, gamerTag: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#182032] border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 font-semibold"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Real Name</label>
                  <input
                    type="text"
                    required
                    value={formData.realName}
                    onChange={e => setFormData({ ...formData, realName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#182032] border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={e => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#182032] border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#182032] border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Availability</label>
                  <select
                    value={formData.availability}
                    onChange={e => setFormData({ ...formData, availability: e.target.value as AvailabilityStatus })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#182032] border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 font-medium"
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
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Bio / Competitive Summary</label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={e => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#182032] border border-slate-200 dark:border-white/10 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
                  placeholder="Share your tournament highlights, role specialties, and scrim experience..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Primary Game</label>
                  <select
                    value={formData.primaryGame}
                    onChange={e => setFormData({ ...formData, primaryGame: e.target.value as GameType })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#182032] border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 font-semibold"
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
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Primary Role</label>
                  <select
                    value={formData.primaryRole}
                    onChange={e => setFormData({ ...formData, primaryRole: e.target.value as RoleType })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#182032] border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 font-semibold"
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
              <div className="p-3.5 bg-sky-500/10 border border-sky-500/20 rounded-2xl text-xs text-sky-600 dark:text-sky-400 font-semibold">
                Editing stats for current Primary Game: <span className="font-bold">{formData.primaryGame}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">In-Game Name (IGN)</label>
                  <input
                    type="text"
                    value={formData.gamePerformances[formData.primaryGame]?.inGameName || ''}
                    onChange={e => handleGamePerformanceChange('inGameName', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#182032] border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Current Rank</label>
                  <input
                    type="text"
                    value={formData.gamePerformances[formData.primaryGame]?.currentRank || ''}
                    onChange={e => handleGamePerformanceChange('currentRank', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#182032] border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Peak Rank</label>
                  <input
                    type="text"
                    value={formData.gamePerformances[formData.primaryGame]?.peakRank || ''}
                    onChange={e => handleGamePerformanceChange('peakRank', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#182032] border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">K/D Ratio</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.gamePerformances[formData.primaryGame]?.kdRatio || 1.0}
                    onChange={e => handleGamePerformanceChange('kdRatio', parseFloat(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#182032] border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Win Rate %</label>
                  <input
                    type="number"
                    value={formData.gamePerformances[formData.primaryGame]?.winRate || 50}
                    onChange={e => handleGamePerformanceChange('winRate', parseInt(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#182032] border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Headshot %</label>
                  <input
                    type="number"
                    value={formData.gamePerformances[formData.primaryGame]?.headshotPct || 25}
                    onChange={e => handleGamePerformanceChange('headshotPct', parseInt(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#182032] border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Scrim MMR</label>
                  <input
                    type="number"
                    value={formData.gamePerformances[formData.primaryGame]?.scrimMmr || 2000}
                    onChange={e => handleGamePerformanceChange('scrimMmr', parseInt(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#182032] border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white font-bold"
                  />
                </div>
              </div>

              {/* Tactical Radar Sliders */}
              <div className="pt-2">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-2 uppercase tracking-wider">Tactical Radar Attributes (0-100)</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(Object.keys(formData.radarStats) as Array<keyof PlayerPassport['radarStats']>).map(key => (
                    <div key={key} className="p-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl flex items-center justify-between gap-3">
                      <span className="text-xs font-semibold text-slate-900 dark:text-white capitalize">{key}</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="30"
                          max="100"
                          value={formData.radarStats[key]}
                          onChange={e => handleRadarChange(key, parseInt(e.target.value))}
                          className="w-24 accent-sky-500 cursor-pointer"
                        />
                        <span className="text-xs font-bold text-sky-600 dark:text-sky-400 w-8 text-right">{formData.radarStats[key]}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'gear' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Device / Platform Rig</label>
                <input
                  type="text"
                  value={formData.gear.deviceOrPlatform}
                  onChange={e => setFormData({
                    ...formData,
                    gear: { ...formData.gear, deviceOrPlatform: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#182032] border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Peripherals (Mouse / Keyboard / Display)</label>
                <input
                  type="text"
                  value={formData.gear.peripherals}
                  onChange={e => setFormData({
                    ...formData,
                    gear: { ...formData.gear, peripherals: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#182032] border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">Audio Gear</label>
                <input
                  type="text"
                  value={formData.gear.audio}
                  onChange={e => setFormData({
                    ...formData,
                    gear: { ...formData.gear, audio: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#182032] border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">DPI / Sensitivity Profile</label>
                <input
                  type="text"
                  value={formData.gear.sensDpi}
                  onChange={e => setFormData({
                    ...formData,
                    gear: { ...formData.gear, sensDpi: e.target.value }
                  })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-[#182032] border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white font-mono font-semibold text-sky-600 dark:text-sky-400"
                />
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => {
                soundManager.playClickSound();
                onClose();
              }}
              className="px-4 py-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-full transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 font-semibold text-xs rounded-full transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
