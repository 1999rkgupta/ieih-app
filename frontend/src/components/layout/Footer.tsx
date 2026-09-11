import React from 'react';
import { Trophy } from 'lucide-react';
import { IEIHLogo } from '../common/IEIHLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white dark:bg-[#0c111d] border-t border-slate-200 dark:border-white/10 mt-20 relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: Identity & Mission */}
          <div className="space-y-4 md:col-span-1">
            <IEIHLogo size="md" subtitle="India Esports Hub" />
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              India Esports Innovation Hub (भारत ईस्पोर्ट्स इनोवेशन हब) — National infrastructure powering digital esports athlete passports, fair play audits, and tournament escrow.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>100% Operational • AWS Mumbai</span>
            </div>
          </div>

          {/* Col 2: Core Platform Portals */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-slate-900 dark:text-slate-200 tracking-wider uppercase">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li><a href="#passport" className="hover:text-slate-950 dark:hover:text-white transition-colors">E-Player Digital Passport</a></li>
              <li><a href="#discovery" className="hover:text-slate-950 dark:hover:text-white transition-colors">Talent Radar & Scout Engine</a></li>
              <li><a href="#tournaments" className="hover:text-slate-950 dark:hover:text-white transition-colors">National LAN & Online Cups</a></li>
              <li><a href="#campus" className="hover:text-slate-950 dark:hover:text-white transition-colors">Inter-University Collegiate Arena</a></li>
              <li><a href="#careers" className="hover:text-slate-950 dark:hover:text-white transition-colors">Esports Career & Scrim Trials</a></li>
            </ul>
          </div>

          {/* Col 3: Supported Disciplines */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-slate-900 dark:text-slate-200 tracking-wider uppercase">
              Disciplines
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li><span>Battlegrounds Mobile India (BGMI)</span></li>
              <li><span>Valorant Champions Tour India</span></li>
              <li><span>Counter-Strike 2 (Faceit 128-Tick)</span></li>
              <li><span>Free Fire MAX Championship</span></li>
              <li><span>Pokemon Unite Indian Circuit</span></li>
              <li><span>EA Sports FC 24 Collegiate</span></li>
            </ul>
          </div>

          {/* Col 4: Trust & Escrow Guarantee */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-slate-900 dark:text-slate-200 tracking-wider uppercase">
              Trust & Security
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              All listed tournaments are audited by the IEIH Trust Protocol. Prizepools are locked in RBI-regulated bank escrow before bracket commencement.
            </p>
            <div className="p-3 bg-slate-50 dark:bg-[#151c2c] rounded-2xl border border-slate-200 dark:border-white/10 flex items-center gap-2.5 text-xs text-slate-900 dark:text-slate-100 shadow-sm">
              <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="font-semibold">₹14.8 Cr+ Verified Prizing Disbursed</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© 2026 India Esports Innovation Hub (IEIH). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">Terms of Fair Play</span>
            <span>•</span>
            <span className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">Anti-Cheat Guidelines</span>
            <span>•</span>
            <span className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">Organizer Verification Audit</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
