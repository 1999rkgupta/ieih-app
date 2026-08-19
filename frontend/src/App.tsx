import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroCommandCenter } from './components/home/HeroCommandCenter';
import { PassportCard } from './components/passport/PassportCard';
import { PassportEditorModal } from './components/passport/PassportEditorModal';
import { SharePassportModal } from './components/passport/SharePassportModal';
import { ClipPlayerModal } from './components/passport/ClipPlayerModal';
import { RecruitModal } from './components/discovery/RecruitModal';
import { TalentDiscovery } from './components/discovery/TalentDiscovery';
import { TournamentHub } from './components/tournaments/TournamentHub';
import { CollegiateCampus } from './components/campus/CollegiateCampus';
import { CareerBoard } from './components/careers/CareerBoard';
import { EEAICompanion } from './components/ai/EEAICompanion';
import { OnboardingWizard } from './components/onboarding/OnboardingWizard';

import { 
  getStoredPlayers, 
  getCurrentUserPassport, 
  savePlayerPassport 
} from './utils/storage';
import { 
  MOCK_TOURNAMENTS, 
  MOCK_COLLEGIATE_CLUBS, 
  MOCK_JOBS 
} from './data/mockData';
import { PlayerPassport, HighlightClip } from './types';
import { soundManager } from './utils/audio';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [allPlayers, setAllPlayers] = useState<PlayerPassport[]>(getStoredPlayers());
  const [currentUser, setCurrentUser] = useState<PlayerPassport>(getCurrentUserPassport());
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerPassport>(currentUser);

  // Modals
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isRecruitOpen, setIsRecruitOpen] = useState(false);
  const [activeClip, setActiveClip] = useState<HighlightClip | null>(null);

  // Handle Tab navigation
  const handleNavigate = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Player Selection for Passport View
  const handleSelectPlayer = (player: PlayerPassport) => {
    setSelectedPlayer(player);
    setCurrentTab('passport');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle switching active user profile
  const handleSwitchUser = (player: PlayerPassport) => {
    setCurrentUser(player);
    setSelectedPlayer(player);
  };

  // Handle Passport updates from Editor
  const handleSavePassport = (updated: PlayerPassport) => {
    savePlayerPassport(updated);
    setAllPlayers(getStoredPlayers());
    setCurrentUser(updated);
    setSelectedPlayer(updated);
  };

  // Handle newly completed onboarding
  const handleOnboardingComplete = (newPassport: PlayerPassport) => {
    savePlayerPassport(newPassport);
    setAllPlayers(getStoredPlayers());
    setCurrentUser(newPassport);
    setSelectedPlayer(newPassport);
    setCurrentTab('passport');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-hud-bg text-hud-text flex flex-col font-sans selection:bg-cyber-cyan selection:text-black">
      {/* Background Cyber Grid Lines */}
      <div className="fixed inset-0 bg-grid-pattern opacity-10 pointer-events-none z-0"></div>
      <div className="fixed inset-0 bg-radial-glow pointer-events-none z-0"></div>

      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        currentUser={currentUser}
        allPlayers={allPlayers}
        onSwitchUser={handleSwitchUser}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Tab 1: Hub Command Center (Home) */}
        {currentTab === 'home' && (
          <HeroCommandCenter
            onNavigate={handleNavigate}
            featuredPlayers={allPlayers}
            featuredTournament={MOCK_TOURNAMENTS[0]}
            onSelectPlayer={handleSelectPlayer}
          />
        )}

        {/* Tab 2: E-Player Passport View */}
        {currentTab === 'passport' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-hud-card border border-hud-border">
              <div className="flex items-center gap-3">
                <span className="text-xs font-orbitron text-hud-muted">VIEWING PASSPORT:</span>
                <span className="font-orbitron font-extrabold text-sm text-cyber-cyan glow-text-cyan">
                  {selectedPlayer.gamerTag}
                </span>
                <span className="text-xs font-mono text-hud-muted">({selectedPlayer.passportNumber})</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    soundManager.playClickSound();
                    setSelectedPlayer(currentUser);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-rajdhani font-bold border transition-all ${
                    selectedPlayer.id === currentUser.id
                      ? 'bg-cyber-cyan/20 text-cyber-cyan border-cyber-cyan'
                      : 'bg-hud-bg text-hud-muted hover:text-hud-text border-hud-border'
                  }`}
                >
                  My Passport
                </button>
                <button
                  onClick={() => {
                    soundManager.playClickSound();
                    handleNavigate('discovery');
                  }}
                  className="px-3 py-1.5 rounded-xl text-xs font-rajdhani font-bold bg-hud-bg hover:bg-hud-panel text-hud-text border border-hud-border transition-all"
                >
                  Browse Other Athletes →
                </button>
              </div>
            </div>

            {/* Flagship Passport Card */}
            <PassportCard
              passport={selectedPlayer}
              isOwner={selectedPlayer.id === currentUser.id}
              onEdit={() => setIsEditorOpen(true)}
              onShare={() => setIsShareOpen(true)}
              onScout={() => setIsRecruitOpen(true)}
              onOpenClip={clip => setActiveClip(clip)}
            />
          </div>
        )}

        {/* Tab 3: Talent Discovery & Scout Engine */}
        {currentTab === 'discovery' && (
          <TalentDiscovery
            players={allPlayers}
            onSelectPlayer={handleSelectPlayer}
          />
        )}

        {/* Tab 4: Tournament Hub & Brackets */}
        {currentTab === 'tournaments' && (
          <TournamentHub
            tournaments={MOCK_TOURNAMENTS}
            currentUser={currentUser}
          />
        )}

        {/* Tab 5: Collegiate Campus Arena */}
        {currentTab === 'campus' && (
          <CollegiateCampus
            clubs={MOCK_COLLEGIATE_CLUBS}
          />
        )}

        {/* Tab 6: Career & Opportunities Board */}
        {currentTab === 'careers' && (
          <CareerBoard
            jobs={MOCK_JOBS}
            currentUser={currentUser}
          />
        )}

        {/* Tab 7: EE AI Companion */}
        {currentTab === 'ai' && (
          <EEAICompanion
            currentUser={currentUser}
          />
        )}

        {/* Tab 8: Onboarding Wizard */}
        {currentTab === 'onboarding' && (
          <OnboardingWizard
            onComplete={handleOnboardingComplete}
            onCancel={() => handleNavigate('home')}
          />
        )}
      </main>

      {/* Global Modals */}
      {isEditorOpen && (
        <PassportEditorModal
          passport={selectedPlayer}
          onSave={handleSavePassport}
          onClose={() => setIsEditorOpen(false)}
        />
      )}

      {isShareOpen && (
        <SharePassportModal
          passport={selectedPlayer}
          onClose={() => setIsShareOpen(false)}
        />
      )}

      {isRecruitOpen && (
        <RecruitModal
          player={selectedPlayer}
          onClose={() => setIsRecruitOpen(false)}
        />
      )}

      {activeClip && (
        <ClipPlayerModal
          clip={activeClip}
          gamerTag={selectedPlayer.gamerTag}
          onClose={() => setActiveClip(null)}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
