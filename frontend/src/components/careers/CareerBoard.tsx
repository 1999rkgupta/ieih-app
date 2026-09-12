import React, { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  CheckCircle2, 
  ChevronRight, 
  ShieldCheck, 
  Zap
} from 'lucide-react';
import { JobOpportunity, PlayerPassport } from '../../types';
import { soundManager } from '../../utils/audio';
import { applyForJob, getAppliedJobIds } from '../../utils/storage';

interface CareerBoardProps {
  jobs: JobOpportunity[];
  currentUser: PlayerPassport;
}

export const CareerBoard: React.FC<CareerBoardProps> = ({ jobs, currentUser }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [appliedIds, setAppliedIds] = useState<string[]>(getAppliedJobIds());
  const [selectedJob, setSelectedJob] = useState<JobOpportunity | null>(null);
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  const handleApply = (job: JobOpportunity) => {
    soundManager.playSuccessBeep();
    applyForJob(job.id);
    setAppliedIds(getAppliedJobIds());
    setAppliedSuccess(true);
    setTimeout(() => {
      setAppliedSuccess(false);
      setSelectedJob(null);
    }, 1800);
  };

  const filteredJobs = selectedCategory === 'ALL'
    ? jobs
    : jobs.filter(j => j.roleCategory === selectedCategory);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#dceee7]/95 via-[#ebf6f2]/95 to-[#d3e9e1]/95 dark:from-[#101c18]/95 dark:via-[#152520]/95 dark:to-[#0d1815]/95 border border-[#91baaf]/40 dark:border-[#91baaf]/25 overflow-hidden shadow-sm">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#91baaf]/25 dark:bg-[#91baaf]/15 text-[#133c32] dark:text-[#91baaf] rounded-full text-xs font-semibold border border-[#91baaf]/30 dark:border-[#91baaf]/20">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Opportunities & Trials</span>
          </div>
          <h2 className="font-extrabold text-2xl sm:text-4xl text-[#0d2620] dark:text-white tracking-tight">
            Careers, Contracts & Open Trials
          </h2>
          <p className="text-sm text-[#284f45] dark:text-[#a0c7bd] font-normal">
            Directly apply to Tier-1 Indian esports franchises, coaching staff, casting talent pools, and esports production teams with your verified E-Player Passport.
          </p>
        </div>
      </div>

      {/* Filter Category Pills */}
      <div className="flex flex-wrap gap-2">
        {['ALL', 'Player / Athlete', 'Coach / Analyst', 'Caster / Talent', 'Management'].map(cat => (
          <button
            key={cat}
            onClick={() => {
              soundManager.playGlitchChirp();
              setSelectedCategory(cat);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${
              selectedCategory === cat
                ? 'bg-[#18483d] text-white dark:bg-[#91baaf] dark:text-[#090e0c] border-transparent shadow-sm'
                : 'bg-white/90 dark:bg-[#162521] text-[#28574c] dark:text-[#a0c7bd] hover:text-[#0d2620] dark:hover:text-white border-[#91baaf]/30 dark:border-[#91baaf]/20'
            }`}
          >
            {cat === 'ALL' ? 'All Roles' : cat}
          </button>
        ))}
      </div>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredJobs.map(job => {
          const isApplied = appliedIds.includes(job.id);

          return (
            <div
              key={job.id}
              className="p-5 rounded-3xl bg-white/90 dark:bg-[#121d1a]/90 border border-[#91baaf]/40 dark:border-[#91baaf]/25 hover:border-[#71a396] dark:hover:border-[#91baaf] transition-all flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={job.orgLogo}
                      alt={job.organization}
                      className="w-12 h-12 rounded-full object-cover border border-[#91baaf]/30 dark:border-[#91baaf]/20"
                    />
                    <div>
                      <span className="text-xs font-semibold text-[#286b5c] dark:text-[#91baaf]">{job.organization}</span>
                      <h3 className="font-bold text-base text-[#0d2620] dark:text-white group-hover:text-[#236052] dark:group-hover:text-[#91baaf] transition-colors">
                        {job.title}
                      </h3>
                    </div>
                  </div>

                  {job.isUrgent && (
                    <span className="px-2.5 py-0.5 bg-rose-500/10 text-rose-700 dark:text-rose-400 text-[10px] font-semibold rounded-full border border-rose-500/20">
                      Urgent
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#284f45] dark:text-[#a0c7bd] line-clamp-2 leading-relaxed">
                  {job.description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                  <div className="p-2.5 bg-[#dceee7]/70 dark:bg-[#162521] rounded-xl border border-[#91baaf]/30 dark:border-[#91baaf]/20 flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                    <DollarSign className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate font-semibold">{job.compensation}</span>
                  </div>
                  <div className="p-2.5 bg-[#dceee7]/70 dark:bg-[#162521] rounded-xl border border-[#91baaf]/30 dark:border-[#91baaf]/20 flex items-center gap-1.5 text-[#385e54] dark:text-[#88b5a9] truncate">
                    <MapPin className="w-3.5 h-3.5 text-[#286b5c] dark:text-[#91baaf] shrink-0" />
                    <span className="truncate">{job.location}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-semibold text-[#385e54] dark:text-[#88b5a9] uppercase tracking-wider">Key Requirements:</span>
                  <ul className="text-xs text-[#284f45] dark:text-[#a0c7bd] space-y-1">
                    {job.requirements.slice(0, 2).map((req, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#71a396] dark:bg-[#91baaf]"></span>
                        <span className="truncate">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action row */}
              <div className="pt-3 border-t border-[#91baaf]/30 dark:border-[#91baaf]/20 flex items-center justify-between">
                <span className="text-xs text-[#385e54] dark:text-[#88b5a9]">
                  Posted {job.postedDate} • {job.applicantCount} applicants
                </span>

                {isApplied ? (
                  <span className="px-3.5 py-1.5 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold rounded-full flex items-center gap-1.5 border border-emerald-500/20">
                    <CheckCircle2 className="w-4 h-4" /> Applied
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      soundManager.playClickSound();
                      setSelectedJob(job);
                    }}
                    className="px-4 py-1.5 bg-gradient-to-r from-[#18483d] to-[#0f322a] hover:from-[#133c32] hover:to-[#0b241e] dark:from-[#91baaf] dark:to-[#71a396] text-white dark:text-[#090e0c] font-semibold text-xs rounded-full transition-all flex items-center gap-1 shadow-sm cursor-pointer"
                  >
                    <span>Apply with Passport</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Instant Apply Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#101c18] border border-[#91baaf]/40 dark:border-[#91baaf]/25 rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="font-bold text-lg text-[#0d2620] dark:text-white">
              1-Click Passport Application
            </h3>
            <p className="text-xs text-[#284f45] dark:text-[#a0c7bd]">
              You are applying for <strong className="text-[#0d2620] dark:text-white">{selectedJob.title}</strong> at <strong className="text-[#0d2620] dark:text-white">{selectedJob.organization}</strong>.
            </p>

            {/* Passport Preview card attached */}
            <div className="p-3.5 rounded-2xl bg-[#dceee7]/70 dark:bg-[#15231f] border border-[#91baaf]/30 dark:border-[#91baaf]/20 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-[#0d2620] dark:text-white">{currentUser.gamerTag}</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#286b5c] dark:text-[#91baaf]" />
                </div>
                <p className="text-xs text-[#385e54] dark:text-[#88b5a9] mt-0.5">{currentUser.primaryGame} • {currentUser.primaryRole}</p>
                <p className="text-xs font-mono text-[#18483d] dark:text-[#91baaf] font-semibold mt-0.5">{currentUser.passportNumber}</p>
              </div>
              <span className="px-2.5 py-1 bg-[#18483d] text-white dark:bg-[#91baaf] dark:text-[#090e0c] font-bold text-xs rounded-lg font-mono">
                L{currentUser.level}
              </span>
            </div>

            {appliedSuccess ? (
              <div className="p-4 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl text-center text-emerald-700 dark:text-emerald-400 text-xs font-semibold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Passport dossier transmitted to recruiter!</span>
              </div>
            ) : (
              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="px-4 py-2 bg-[#91baaf]/20 hover:bg-[#91baaf]/30 dark:bg-white/10 dark:hover:bg-white/15 border border-[#91baaf]/30 dark:border-[#91baaf]/20 text-[#0d2620] dark:text-slate-200 font-semibold text-xs rounded-full transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleApply(selectedJob)}
                  className="px-5 py-2 bg-gradient-to-r from-[#18483d] to-[#0f322a] hover:from-[#133c32] hover:to-[#0b241e] dark:from-[#91baaf] dark:to-[#71a396] text-white dark:text-[#090e0c] font-semibold text-xs rounded-full transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>Submit Dossier</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
