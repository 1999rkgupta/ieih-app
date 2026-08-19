import React, { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight, 
  Filter, 
  ShieldCheck, 
  Zap, 
  Users 
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
      <div className="relative p-6 sm:p-8 rounded-2xl bg-hud-surface border border-hud-border overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyber-blue/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyber-blue/10 border border-cyber-blue/30 rounded-full text-xs font-orbitron font-bold text-cyber-blue">
            <Briefcase className="w-3.5 h-3.5" />
            INDIAN ESPORTS TALENT OPPORTUNITIES & TRIALS
          </div>
          <h2 className="font-orbitron font-black text-2xl sm:text-4xl text-hud-text tracking-wide glow-text-cyan">
            CAREER & OPPORTUNITY BOARD
          </h2>
          <p className="text-sm font-sans text-hud-muted">
            Directly apply to Tier-1 Indian esports franchises, coaching staff, casting talent pools, and esports production teams with your verified IEIH E-Player Passport.
          </p>
        </div>
      </div>

      {/* Filter Category Pills */}
      <div className="flex flex-wrap gap-2.5">
        {['ALL', 'Player / Athlete', 'Coach / Analyst', 'Caster / Talent', 'Management'].map(cat => (
          <button
            key={cat}
            onClick={() => {
              soundManager.playGlitchChirp();
              setSelectedCategory(cat);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-rajdhani font-bold transition-all border ${
              selectedCategory === cat
                ? 'bg-cyber-blue/20 text-cyber-blue border-cyber-blue shadow-[0_0_12px_rgba(14,165,233,0.4)]'
                : 'bg-hud-card text-hud-muted hover:text-hud-text border-hud-border'
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
              className="p-5 rounded-2xl bg-hud-surface border border-hud-border hover:border-cyber-blue/60 transition-all flex flex-col justify-between space-y-4 shadow-xl hover:shadow-cyber-blue/10 group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={job.orgLogo}
                      alt={job.organization}
                      className="w-12 h-12 rounded-xl object-cover border border-hud-border group-hover:border-cyber-blue"
                    />
                    <div>
                      <span className="text-xs font-rajdhani font-bold text-cyber-blue">{job.organization}</span>
                      <h3 className="font-orbitron font-bold text-base text-hud-text group-hover:text-cyber-cyan transition-colors">
                        {job.title}
                      </h3>
                    </div>
                  </div>

                  {job.isUrgent && (
                    <span className="px-2 py-0.5 bg-cyber-red/20 border border-cyber-red/40 text-cyber-red font-orbitron text-[10px] font-bold rounded">
                      URGENT
                    </span>
                  )}
                </div>

                <p className="text-xs text-hud-muted font-sans line-clamp-2">
                  {job.description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs font-rajdhani font-bold">
                  <div className="p-2 bg-hud-card rounded-lg border border-hud-border flex items-center gap-1.5 text-emerald-400">
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>{job.compensation}</span>
                  </div>
                  <div className="p-2 bg-hud-card rounded-lg border border-hud-border flex items-center gap-1.5 text-hud-muted truncate">
                    <MapPin className="w-3.5 h-3.5 text-cyber-purple shrink-0" />
                    <span className="truncate">{job.location}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-orbitron text-hud-muted">KEY REQUIREMENTS:</span>
                  <ul className="text-xs text-hud-muted font-sans space-y-1">
                    {job.requirements.slice(0, 2).map((req, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-cyber-blue"></span>
                        <span className="truncate">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action row */}
              <div className="pt-3 border-t border-hud-border flex items-center justify-between">
                <span className="text-xs font-rajdhani text-hud-dim">
                  Posted {job.postedDate} • {job.applicantCount} Applicants
                </span>

                {isApplied ? (
                  <span className="px-3.5 py-1.5 bg-emerald-500/20 text-emerald-400 font-orbitron text-xs font-bold rounded-xl flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> APPLIED
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      soundManager.playClickSound();
                      setSelectedJob(job);
                    }}
                    className="px-4 py-1.5 bg-gradient-to-r from-cyber-blue to-cyber-cyan text-black font-rajdhani font-bold text-xs rounded-xl hover:shadow-[0_0_12px_rgba(14,165,233,0.5)] transition-all flex items-center gap-1"
                  >
                    <span>APPLY WITH PASSPORT</span>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-hud-surface border border-hud-border rounded-xl p-6 shadow-2xl shadow-cyber-blue/15 space-y-4">
            <h3 className="font-orbitron font-bold text-lg text-hud-text">
              1-CLICK PASSPORT APPLICATION
            </h3>
            <p className="text-xs text-hud-muted font-sans">
              You are applying for <strong className="text-cyber-cyan">{selectedJob.title}</strong> at <strong className="text-hud-text">{selectedJob.organization}</strong>.
            </p>

            {/* Passport Preview card attached */}
            <div className="p-3.5 rounded-xl bg-hud-card border border-cyber-cyan/40 flex items-center gap-3">
              <img src={currentUser.avatarUrl} alt="Avatar" className="w-12 h-12 rounded-lg object-cover border border-cyber-cyan" />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-orbitron font-bold text-sm text-hud-text">{currentUser.gamerTag}</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-cyber-cyan" />
                </div>
                <p className="text-xs font-rajdhani text-hud-muted">{currentUser.primaryGame} • {currentUser.primaryRole} • Level {currentUser.level}</p>
                <p className="text-xs font-mono text-cyber-cyan font-bold">{currentUser.passportNumber}</p>
              </div>
            </div>

            {appliedSuccess ? (
              <div className="p-4 bg-emerald-500/20 border border-emerald-400 rounded-xl text-center text-emerald-400 font-orbitron text-xs font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                PASSPORT DOSSIER TRANSMITTED TO RECRUITER!
              </div>
            ) : (
              <div className="pt-3 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="px-4 py-2 bg-hud-card hover:bg-hud-panel border border-hud-border text-hud-text font-rajdhani font-bold text-xs rounded-lg"
                >
                  CANCEL
                </button>
                <button
                  type="button"
                  onClick={() => handleApply(selectedJob)}
                  className="px-6 py-2 bg-cyber-blue text-black font-orbitron font-bold text-xs rounded-lg hover:shadow-[0_0_15px_#0EA5E9] transition-all flex items-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-black" />
                  SUBMIT PASSPORT DOSSIER
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
