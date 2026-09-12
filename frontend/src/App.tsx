import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { BottomNavBar } from './components/layout/BottomNavBar';
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
import { UniversalSearchModal } from './components/search/UniversalSearchModal';
import { CreatePostModal } from './components/common/CreatePostModal';
import { useTheme } from './context/ThemeContext';

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
  const { theme, toggleTheme } = useTheme();
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [allPlayers, setAllPlayers] = useState<PlayerPassport[]>(getStoredPlayers());
  const [currentUser, setCurrentUser] = useState<PlayerPassport>(getCurrentUserPassport());
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerPassport>(currentUser);
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isRecruitOpen, setIsRecruitOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [activeClip, setActiveClip] = useState<HighlightClip | null>(null);

  // Global ⌘K / Ctrl+K and '/' shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K or Ctrl+K to toggle Omnisearch
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        soundManager.playClickSound();
        setIsSearchOpen(prev => !prev);
      }
      // Quick '/' trigger when not inside an input
      else if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        soundManager.playClickSound();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

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
    <div className="min-h-screen bg-gradient-to-b from-[#d6ede7] via-[#ecf6f3] to-[#ddf0ea] dark:from-[#090e0c] dark:via-[#0e1614] dark:to-[#080d0b] text-[#0f2721] dark:text-[#e4f3ef] flex flex-col font-sans transition-colors duration-200 selection:bg-[#91baaf] selection:text-slate-950">
      {/* Subtle Dot Mesh & Ambient Radial Glow */}
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none z-0"></div>
      <div className="fixed inset-0 bg-radial-glow pointer-events-none z-0"></div>

      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        currentUser={currentUser}
        allPlayers={allPlayers}
        onSwitchUser={handleSwitchUser}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-28 sm:pb-32 relative z-10">
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
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white/90 dark:bg-[#121d1a]/90 border border-[#91baaf]/40 dark:border-[#91baaf]/25 shadow-sm backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-[#385e54] dark:text-[#88b5a9] uppercase tracking-wider">Viewing Passport:</span>
                <span className="font-bold text-sm text-[#18483d] dark:text-[#91baaf]">
                  {selectedPlayer.gamerTag}
                </span>
                <span className="text-xs font-mono text-[#385e54] dark:text-[#88b5a9]">({selectedPlayer.passportNumber})</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    soundManager.playClickSound();
                    setSelectedPlayer(currentUser);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    selectedPlayer.id === currentUser.id
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-transparent shadow-sm'
                      : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border-slate-200 dark:border-white/10'
                  }`}
                >
                  My Passport
                </button>
                <button
                  onClick={() => {
                    soundManager.playClickSound();
                    handleNavigate('discovery');
                  }}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10 transition-all flex items-center gap-1.5"
                >
                  Browse Other Athletes &rarr;
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
              onUpdateAvatar={(newAvatarUrl) => {
                const updated = { ...selectedPlayer, avatarUrl: newAvatarUrl };
                handleSavePassport(updated);
              }}
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
            allPlayers={allPlayers}
            tournaments={MOCK_TOURNAMENTS}
            campusClubs={MOCK_COLLEGIATE_CLUBS}
            jobs={MOCK_JOBS}
            onNavigate={handleNavigate}
            onSelectPlayer={handleSelectPlayer}
            onOpenEditor={() => setIsEditorOpen(true)}
            onOpenRecruit={(player) => {
              if (player) setSelectedPlayer(player);
              setIsRecruitOpen(true);
            }}
            onOpenPostModal={() => setIsPostModalOpen(true)}
            onOpenSearch={() => setIsSearchOpen(true)}
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

      {/* Universal Omnisearch Engine Modal (⌘K) */}
      <UniversalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        players={allPlayers}
        tournaments={MOCK_TOURNAMENTS}
        colleges={MOCK_COLLEGIATE_CLUBS}
        jobs={MOCK_JOBS}
        currentUser={currentUser}
        onNavigate={handleNavigate}
        onSelectPlayer={handleSelectPlayer}
        onToggleTheme={toggleTheme}
        isDarkMode={theme === 'dark'}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onSelectTournament={(tourney) => {
          handleNavigate('tournaments');
        }}
        onSelectCollege={(college) => {
          handleNavigate('campus');
        }}
        onSelectJob={(job) => {
          handleNavigate('careers');
        }}
        onAskAI={(prompt) => {
          handleNavigate('ai');
        }}
      />

      {/* Create Hub Post Modal */}
      <CreatePostModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        currentUser={currentUser}
        onAddHighlight={(newClip) => {
          const updated = {
            ...currentUser,
            clips: [newClip, ...(currentUser.clips || [])]
          };
          handleSavePassport(updated);
        }}
      />

      {/* Footer */}
      <Footer />

      {/* Instagram-Style Fixed Bottom Menu Bar */}
      <BottomNavBar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenPost={() => setIsPostModalOpen(true)}
      />
    </div>
  );
}

export default App;
