import React, { useState } from 'react';
import { 
  GraduationCap, 
  Trophy, 
  MapPin, 
  Users, 
  ShieldCheck, 
  Sparkles, 
  Mail, 
  ChevronRight, 
  Award,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { CollegiateClub } from '../../types';
import { soundManager } from '../../utils/audio';

interface CollegiateCampusProps {
  clubs: CollegiateClub[];
}

export const CollegiateCampus: React.FC<CollegiateCampusProps> = ({ clubs }) => {
  const [ambassadorApplied, setAmbassadorApplied] = useState(false);
  const [collegeSearch, setCollegeSearch] = useState('');

  const filteredClubs = clubs.filter(c => 
    c.collegeName.toLowerCase().includes(collegeSearch.toLowerCase()) ||
    c.shortName.toLowerCase().includes(collegeSearch.toLowerCase()) ||
    c.city.toLowerCase().includes(collegeSearch.toLowerCase())
  );

  const handleApplyAmbassador = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playSuccessBeep();
    setAmbassadorApplied(true);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative p-6 sm:p-8 rounded-2xl bg-hud-surface border border-hud-border overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyber-purple/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyber-purple/10 border border-cyber-purple/30 rounded-full text-xs font-orbitron font-bold text-cyber-purple">
            <GraduationCap className="w-3.5 h-3.5" />
            INDIA ESPORT CAMPUS ARENA • COLLEGIATE GUILD
          </div>
          <h2 className="font-orbitron font-black text-2xl sm:text-4xl text-hud-text tracking-wide glow-text-purple">
            UNIVERSITY ESPORTS CHAPTERS & SCHOLARSHIPS
          </h2>
          <p className="text-sm font-sans text-hud-muted">
            The collegiate battleground for Indian university gamers. Compete in inter-college scrims, build your official college esports club, and qualify for national scholarship prizes.
          </p>
        </div>
      </div>

      {/* Campus Club Directory */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <h3 className="font-orbitron font-bold text-base text-hud-text flex items-center gap-2">
            <Trophy className="w-4 h-4 text-cyber-gold" />
            PREMIER UNIVERSITY CHAPTERS
          </h3>
          <input
            type="text"
            placeholder="Search university or city..."
            value={collegeSearch}
            onChange={e => setCollegeSearch(e.target.value)}
            className="px-3.5 py-1.5 bg-hud-card border border-hud-border rounded-xl text-xs text-hud-text focus:outline-none focus:border-cyber-purple w-full sm:w-64 font-sans"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredClubs.map(club => (
            <div
              key={club.id}
              className="p-5 rounded-2xl bg-hud-surface border border-hud-border hover:border-cyber-purple/60 transition-all flex flex-col justify-between space-y-4 shadow-xl group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={club.logo}
                      alt={club.shortName}
                      className="w-14 h-14 rounded-xl object-cover border border-cyber-purple/40 group-hover:scale-105 transition-transform"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-orbitron font-bold text-base text-hud-text group-hover:text-cyber-purple transition-colors">
                          {club.shortName}
                        </h4>
                        {club.isOfficialCampusChapter && (
                          <ShieldCheck className="w-4 h-4 text-cyber-purple shrink-0" />
                        )}
                      </div>
                      <p className="text-xs font-rajdhani text-hud-muted">{club.collegeName}</p>
                      <div className="flex items-center gap-1 text-[11px] font-rajdhani text-hud-dim mt-0.5">
                        <MapPin className="w-3 h-3 text-cyber-cyan" />
                        <span>{club.city}, {club.state}</span>
                      </div>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 bg-cyber-gold/20 text-cyber-gold font-orbitron text-[10px] font-bold rounded">
                    {club.rankingTier}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs font-rajdhani">
                  <div className="p-2 bg-hud-card rounded-lg border border-hud-border">
                    <div className="text-[9px] font-orbitron text-hud-muted">STUDENTS</div>
                    <div className="font-bold text-hud-text mt-0.5">{club.studentRosterCount}+ Roster</div>
                  </div>
                  <div className="p-2 bg-hud-card rounded-lg border border-hud-border">
                    <div className="text-[9px] font-orbitron text-hud-muted">TROPHIES</div>
                    <div className="font-bold text-cyber-gold mt-0.5">{club.trophiesWon} Cups 🏆</div>
                  </div>
                  <div className="p-2 bg-hud-card rounded-lg border border-hud-border">
                    <div className="text-[9px] font-orbitron text-hud-muted">TOP GAMES</div>
                    <div className="font-bold text-cyber-cyan truncate mt-0.5">{club.topGames[0]}</div>
                  </div>
                </div>

                {/* Captain info */}
                <div className="p-2.5 rounded-lg bg-hud-card/50 border border-hud-border/70 flex items-center justify-between text-xs font-rajdhani">
                  <div className="flex items-center gap-2">
                    <img src={club.captain.avatar} alt="Captain" className="w-6 h-6 rounded-full object-cover" />
                    <span>Captain: <strong className="text-hud-text">{club.captain.gamerTag}</strong></span>
                  </div>
                  <span className="text-hud-muted font-mono text-[11px]">{club.contactEmail}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-hud-border flex items-center justify-between">
                <span className="text-xs font-rajdhani font-bold text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Official Chapter Active
                </span>
                <button
                  onClick={() => soundManager.playClickSound()}
                  className="px-3.5 py-1.5 bg-hud-card hover:bg-cyber-purple hover:text-white border border-hud-border text-xs font-rajdhani font-bold rounded-lg transition-all"
                >
                  JOIN CHAPTER SCRIMS
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* College Ambassador Registration Box */}
      <div className="p-6 rounded-2xl bg-hud-card border-2 border-cyber-purple/40 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyber-purple/20 border border-cyber-purple flex items-center justify-center text-cyber-purple shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-orbitron font-bold text-base text-hud-text">
              BECOME AN IEIH CAMPUS AMBASSADOR
            </h3>
            <p className="text-xs font-rajdhani text-hud-muted">
              Lead your university esports club, host official scrims, and earn hardware sponsorships & stipends.
            </p>
          </div>
        </div>

        {ambassadorApplied ? (
          <div className="p-4 bg-emerald-500/20 border border-emerald-400 rounded-xl text-emerald-400 text-xs font-orbitron font-bold flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            CAMPUS AMBASSADOR APPLICATION RECEIVED! OUR COLLEGIATE TEAM WILL REACH OUT VIA EMAIL.
          </div>
        ) : (
          <form onSubmit={handleApplyAmbassador} className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="text"
              required
              placeholder="Your University / College Name..."
              className="w-full sm:flex-1 px-4 py-2.5 bg-hud-bg border border-hud-border rounded-xl text-xs font-sans text-hud-text focus:outline-none focus:border-cyber-purple"
            />
            <input
              type="email"
              required
              placeholder="Your Student (.ac.in / .edu) Email..."
              className="w-full sm:flex-1 px-4 py-2.5 bg-hud-bg border border-hud-border rounded-xl text-xs font-sans text-hud-text focus:outline-none focus:border-cyber-purple"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-cyber-purple text-white font-orbitron font-bold text-xs rounded-xl hover:bg-cyber-purple/90 transition-all flex items-center justify-center gap-2 shrink-0 shadow-[0_0_15px_rgba(139,92,246,0.5)]"
            >
              APPLY NOW
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
