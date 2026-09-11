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
      <div className="relative p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#101622] border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-full text-xs font-semibold border border-sky-500/20">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Opportunities & Trials</span>
          </div>
          <h2 className="font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Careers, Contracts & Open Trials
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-normal">
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
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 border-transparent shadow-sm'
                : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border-slate-200 dark:border-white/10'
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
              className="p-5 rounded-3xl bg-white dark:bg-[#131926] border border-slate-200 dark:border-white/10 hover:border-sky-500/40 dark:hover:border-sky-500/40 transition-all flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={job.orgLogo}
                      alt={job.organization}
                      className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-white/10"
                    />
                    <div>
                      <span className="text-xs font-semibold text-sky-600 dark:text-sky-400">{job.organization}</span>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors">
                        {job.title}
                      </h3>
                    </div>
                  </div>

                  {job.isUrgent && (
                    <span className="px-2.5 py-0.5 bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[10px] font-semibold rounded-full">
                      Urgent
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                  <div className="p-2.5 bg-slate-50 dark:bg-[#1c2438] rounded-xl border border-slate-200/60 dark:border-white/5 flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                    <DollarSign className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate font-semibold">{job.compensation}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 dark:bg-[#1c2438] rounded-xl border border-slate-200/60 dark:border-white/5 flex items-center gap-1.5 text-slate-500 dark:text-slate-400 truncate">
                    <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    <span className="truncate">{job.location}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Key Requirements:</span>
                  <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                    {job.requirements.slice(0, 2).map((req, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                        <span className="truncate">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action row */}
              <div className="pt-3 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  Posted {job.postedDate} • {job.applicantCount} applicants
                </span>

                {isApplied ? (
                  <span className="px-3.5 py-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold rounded-full flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Applied
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      soundManager.playClickSound();
                      setSelectedJob(job);
                    }}
                    className="px-4 py-1.5 bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 font-semibold text-xs rounded-full transition-all flex items-center gap-1 shadow-sm"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white dark:bg-[#111726] border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              1-Click Passport Application
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              You are applying for <strong className="text-slate-900 dark:text-white">{selectedJob.title}</strong> at <strong className="text-slate-900 dark:text-white">{selectedJob.organization}</strong>.
            </p>

            {/* Passport Preview card attached */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#182032] border border-slate-200 dark:border-white/10 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">{currentUser.gamerTag}</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-500" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{currentUser.primaryGame} • {currentUser.primaryRole}</p>
                <p className="text-xs font-mono text-sky-600 dark:text-sky-400 font-semibold mt-0.5">{currentUser.passportNumber}</p>
              </div>
              <span className="px-2.5 py-1 bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold text-xs rounded-lg font-mono">
                L{currentUser.level}
              </span>
            </div>

            {appliedSuccess ? (
              <div className="p-4 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl text-center text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Passport dossier transmitted to recruiter!</span>
              </div>
            ) : (
              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded-full transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleApply(selectedJob)}
                  className="px-5 py-2 bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 font-semibold text-xs rounded-full transition-all flex items-center gap-1.5 shadow-sm"
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
