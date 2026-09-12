import React, { useState } from 'react';
import { 
  GraduationCap, 
  Trophy, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2,
  User
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
      <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#dceee7]/95 via-[#ebf6f2]/95 to-[#d3e9e1]/95 dark:from-[#101c18]/95 dark:via-[#152520]/95 dark:to-[#0d1815]/95 border border-[#91baaf]/40 dark:border-[#91baaf]/25 overflow-hidden shadow-sm">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#91baaf]/25 dark:bg-[#91baaf]/15 text-[#133c32] dark:text-[#91baaf] rounded-full text-xs font-semibold border border-[#91baaf]/35 dark:border-[#91baaf]/20">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Collegiate Guild & Campus Arena</span>
          </div>
          <h2 className="font-extrabold text-2xl sm:text-4xl text-[#0d2620] dark:text-white tracking-tight">
            University Chapters & Esports Grants
          </h2>
          <p className="text-sm text-[#284f45] dark:text-[#a0c7bd] font-normal">
            The collegiate network for Indian university gamers. Compete in inter-college scrims, build your official college esports club, and qualify for scholarships.
          </p>
        </div>
      </div>

      {/* Campus Club Directory */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <h3 className="font-bold text-base text-[#0d2620] dark:text-white flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>University Chapters</span>
          </h3>
          <input
            type="text"
            placeholder="Search university or city..."
            value={collegeSearch}
            onChange={e => setCollegeSearch(e.target.value)}
            className="px-4 py-2 bg-white/90 dark:bg-[#15231f] border border-[#91baaf]/40 dark:border-[#91baaf]/30 rounded-full text-xs text-[#0d2620] dark:text-white placeholder:text-[#466b62] dark:placeholder:text-[#6a998d] focus:outline-none focus:border-[#91baaf] w-full sm:w-64 transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredClubs.map(club => (
            <div
              key={club.id}
              className="p-5 rounded-3xl bg-white/90 dark:bg-[#121d1a]/90 border border-[#91baaf]/40 dark:border-[#91baaf]/25 hover:border-[#71a396] dark:hover:border-[#91baaf] transition-all flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={club.logo}
                      alt={club.shortName}
                      className="w-13 h-13 rounded-full object-cover border border-[#91baaf]/30 dark:border-[#91baaf]/20 group-hover:scale-105 transition-transform"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-base text-[#0d2620] dark:text-white group-hover:text-[#236052] dark:group-hover:text-[#91baaf] transition-colors">
                          {club.shortName}
                        </h4>
                        {club.isOfficialCampusChapter && (
                          <ShieldCheck className="w-4 h-4 text-[#286b5c] dark:text-[#91baaf] shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-[#385e54] dark:text-[#a0c7bd]">{club.collegeName}</p>
                      <div className="flex items-center gap-1 text-[11px] text-[#466b62] dark:text-[#88b5a9] mt-0.5 font-medium">
                        <MapPin className="w-3 h-3 text-[#286b5c] dark:text-[#91baaf]" />
                        <span>{club.city}, {club.state}</span>
                      </div>
                    </div>
                  </div>

                  <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-700 dark:text-amber-400 text-[10px] font-semibold rounded-full border border-amber-500/20">
                    {club.rankingTier}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 bg-[#dceee7]/70 dark:bg-[#162521] rounded-xl border border-[#91baaf]/30 dark:border-[#91baaf]/20">
                    <div className="text-[10px] font-semibold text-[#385e54] dark:text-[#88b5a9] uppercase tracking-wider">Roster</div>
                    <div className="font-semibold text-[#0d2620] dark:text-white mt-0.5">{club.studentRosterCount}+</div>
                  </div>
                  <div className="p-2.5 bg-[#dceee7]/70 dark:bg-[#162521] rounded-xl border border-[#91baaf]/30 dark:border-[#91baaf]/20">
                    <div className="text-[10px] font-semibold text-[#385e54] dark:text-[#88b5a9] uppercase tracking-wider">Trophies</div>
                    <div className="font-semibold text-amber-600 dark:text-amber-400 mt-0.5">{club.trophiesWon} 🏆</div>
                  </div>
                  <div className="p-2.5 bg-[#dceee7]/70 dark:bg-[#162521] rounded-xl border border-[#91baaf]/30 dark:border-[#91baaf]/20">
                    <div className="text-[10px] font-semibold text-[#385e54] dark:text-[#88b5a9] uppercase tracking-wider">Top Game</div>
                    <div className="font-semibold text-[#18483d] dark:text-[#afd2c6] truncate mt-0.5">{club.topGames[0]}</div>
                  </div>
                </div>

                {/* Captain info */}
                <div className="p-3 rounded-2xl bg-[#dceee7]/70 dark:bg-[#162521] border border-[#91baaf]/30 dark:border-[#91baaf]/20 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#286b5c] dark:text-[#91baaf]" />
                    <span className="text-[#385e54] dark:text-[#a0c7bd]">Lead: <strong className="text-[#0d2620] dark:text-white font-semibold">{club.captain.gamerTag}</strong></span>
                  </div>
                  <span className="text-[#385e54] dark:text-[#88b5a9] font-mono text-[11px]">{club.contactEmail}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#91baaf]/30 dark:border-[#91baaf]/20 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#18483d] dark:text-[#91baaf] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Official Chapter
                </span>
                <button
                  onClick={() => soundManager.playClickSound()}
                  className="px-4 py-1.5 bg-[#91baaf]/25 hover:bg-[#91baaf]/40 dark:bg-[#91baaf]/15 dark:hover:bg-[#91baaf]/25 border border-[#91baaf]/40 dark:border-[#91baaf]/30 text-xs font-semibold rounded-full transition-all text-[#0d2620] dark:text-[#e4f3ef]"
                >
                  Join Scrims
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* College Ambassador Registration Box */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-[#dceee7]/95 via-[#ebf6f2]/95 to-[#d3e9e1]/95 dark:from-[#101c18]/95 dark:via-[#152520]/95 dark:to-[#0d1815]/95 border border-[#91baaf]/40 dark:border-[#91baaf]/25 space-y-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#91baaf]/25 dark:bg-[#91baaf]/15 text-[#133c32] dark:text-[#91baaf] flex items-center justify-center shrink-0 border border-[#91baaf]/30 dark:border-[#91baaf]/20">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-[#0d2620] dark:text-white">
              Become an IEIH Campus Ambassador
            </h3>
            <p className="text-xs text-[#284f45] dark:text-[#a0c7bd]">
              Lead your university esports club, host official scrims, and earn hardware sponsorships & stipends.
            </p>
          </div>
        </div>

        {ambassadorApplied ? (
          <div className="p-4 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl text-emerald-700 dark:text-emerald-400 text-xs font-semibold flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Ambassador application received! Our collegiate team will reach out via email.</span>
          </div>
        ) : (
          <form onSubmit={handleApplyAmbassador} className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="text"
              required
              placeholder="University / College Name..."
              className="w-full sm:flex-1 px-4 py-2.5 bg-white/90 dark:bg-[#15231f] border border-[#91baaf]/40 dark:border-[#91baaf]/30 rounded-full text-xs text-[#0d2620] dark:text-white placeholder:text-[#466b62] dark:placeholder:text-[#6a998d] focus:outline-none focus:border-[#91baaf] transition-all"
            />
            <input
              type="email"
              required
              placeholder="Student (.ac.in / .edu) Email..."
              className="w-full sm:flex-1 px-4 py-2.5 bg-white/90 dark:bg-[#15231f] border border-[#91baaf]/40 dark:border-[#91baaf]/30 rounded-full text-xs text-[#0d2620] dark:text-white placeholder:text-[#466b62] dark:placeholder:text-[#6a998d] focus:outline-none focus:border-[#91baaf] transition-all"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-[#18483d] to-[#0f322a] hover:from-[#133c32] hover:to-[#0b241e] dark:from-[#91baaf] dark:to-[#71a396] text-white dark:text-[#090e0c] font-semibold text-xs rounded-full transition-all shrink-0 shadow-sm cursor-pointer"
            >
              Apply Now
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
