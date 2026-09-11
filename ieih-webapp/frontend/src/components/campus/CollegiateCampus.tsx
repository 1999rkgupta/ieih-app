import React, { useState } from 'react';
import { 
  GraduationCap, 
  Trophy, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
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
      <div className="relative p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#101622] border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-semibold border border-indigo-500/20">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Collegiate Guild & Campus Arena</span>
          </div>
          <h2 className="font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            University Chapters & Esports Grants
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-normal">
            The collegiate network for Indian university gamers. Compete in inter-college scrims, build your official college esports club, and qualify for scholarships.
          </p>
        </div>
      </div>

      {/* Campus Club Directory */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>University Chapters</span>
          </h3>
          <input
            type="text"
            placeholder="Search university or city..."
            value={collegeSearch}
            onChange={e => setCollegeSearch(e.target.value)}
            className="px-4 py-2 bg-slate-50 dark:bg-[#182032] border border-slate-200 dark:border-white/10 rounded-full text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-sky-500 w-full sm:w-64"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredClubs.map(club => (
            <div
              key={club.id}
              className="p-5 rounded-3xl bg-white dark:bg-[#131926] border border-slate-200 dark:border-white/10 hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={club.logo}
                      alt={club.shortName}
                      className="w-13 h-13 rounded-full object-cover border border-slate-200 dark:border-white/10 group-hover:scale-105 transition-transform"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors">
                          {club.shortName}
                        </h4>
                        {club.isOfficialCampusChapter && (
                          <ShieldCheck className="w-4 h-4 text-indigo-500 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{club.collegeName}</p>
                      <div className="flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 font-medium">
                        <MapPin className="w-3 h-3 text-sky-500" />
                        <span>{club.city}, {club.state}</span>
                      </div>
                    </div>
                  </div>

                  <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-semibold rounded-full">
                    {club.rankingTier}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 bg-slate-50 dark:bg-[#1c2438] rounded-xl border border-slate-200/60 dark:border-white/5">
                    <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase">Roster</div>
                    <div className="font-semibold text-slate-900 dark:text-white mt-0.5">{club.studentRosterCount}+</div>
                  </div>
                  <div className="p-2.5 bg-slate-50 dark:bg-[#1c2438] rounded-xl border border-slate-200/60 dark:border-white/5">
                    <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase">Trophies</div>
                    <div className="font-semibold text-amber-600 dark:text-amber-400 mt-0.5">{club.trophiesWon} 🏆</div>
                  </div>
                  <div className="p-2.5 bg-slate-50 dark:bg-[#1c2438] rounded-xl border border-slate-200/60 dark:border-white/5">
                    <div className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase">Top Game</div>
                    <div className="font-semibold text-sky-600 dark:text-sky-400 truncate mt-0.5">{club.topGames[0]}</div>
                  </div>
                </div>

                {/* Captain info */}
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1c2438] border border-slate-200/60 dark:border-white/5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <img src={club.captain.avatar} alt="Captain" className="w-6 h-6 rounded-full object-cover" />
                    <span>Lead: <strong className="text-slate-900 dark:text-white font-semibold">{club.captain.gamerTag}</strong></span>
                  </div>
                  <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">{club.contactEmail}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Official Chapter
                </span>
                <button
                  onClick={() => soundManager.playClickSound()}
                  className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 border border-slate-200 dark:border-white/10 text-xs font-semibold rounded-full transition-all text-slate-800 dark:text-slate-200"
                >
                  Join Scrims
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* College Ambassador Registration Box */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#101622] border border-slate-200 dark:border-white/10 space-y-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Become an IEIH Campus Ambassador
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Lead your university esports club, host official scrims, and earn hardware sponsorships & stipends.
            </p>
          </div>
        </div>

        {ambassadorApplied ? (
          <div className="p-4 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Ambassador application received! Our collegiate team will reach out via email.</span>
          </div>
        ) : (
          <form onSubmit={handleApplyAmbassador} className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="text"
              required
              placeholder="University / College Name..."
              className="w-full sm:flex-1 px-4 py-2.5 bg-slate-50 dark:bg-[#182032] border border-slate-200 dark:border-white/10 rounded-full text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-sky-500"
            />
            <input
              type="email"
              required
              placeholder="Student (.ac.in / .edu) Email..."
              className="w-full sm:flex-1 px-4 py-2.5 bg-slate-50 dark:bg-[#182032] border border-slate-200 dark:border-white/10 rounded-full text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-sky-500"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 font-semibold text-xs rounded-full transition-all shrink-0 shadow-sm"
            >
              Apply Now
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
