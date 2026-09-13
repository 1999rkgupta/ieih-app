import React from 'react';
import { Trophy, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { IEIHLogo } from '../common/IEIHLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#c9e8de] dark:bg-[#070e0c] border-t border-[#91baaf]/40 dark:border-[#91baaf]/25 mt-10 sm:mt-14 relative transition-colors duration-200 pb-8 sm:pb-12 overflow-hidden shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 xl:gap-8">
          {/* Col 1: Identity & Mission */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <IEIHLogo size="md" subtitle="India Esports Hub" />
            <p className="text-xs text-[#1e483e] dark:text-[#a0c7bd] leading-relaxed break-words font-normal">
              India Esports Innovation Hub (भारत ईस्पोर्ट्स इनोवेशन हब) — National infrastructure powering digital esports athlete passports, fair play audits, and tournament escrow.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-500 animate-pulse"></span>
              <span>100% Operational • AWS Mumbai (18ms)</span>
            </div>
          </div>

          {/* Col 2: About Us (Proposed Platform Concept) */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-xs text-[#0d2620] dark:text-white tracking-wider uppercase">
              About Platform
            </h4>
            <p className="text-xs text-[#1e483e] dark:text-[#a0c7bd] leading-relaxed break-words font-normal">
              <strong className="font-bold text-[#0d2620] dark:text-white block mb-1">
                Unified Esports Grid:
              </strong>
              Connecting gamers, athletes, coaches, franchise teams, collegiate clubs, tournament organizers, and casters under verified digital credentials.
            </p>
          </div>

          {/* Col 3: Core Platform Portals */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-xs text-[#0d2620] dark:text-white tracking-wider uppercase">
              7 Core Portals
            </h4>
            <ul className="space-y-2 text-xs text-[#1e483e] dark:text-[#a0c7bd] font-medium">
              <li><a href="#passport" className="hover:text-[#0d2620] dark:hover:text-white transition-colors flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-[#286b5c] dark:text-[#91baaf]" /> E-Player Digital Passport</a></li>
              <li><a href="#discovery" className="hover:text-[#0d2620] dark:hover:text-white transition-colors flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-[#286b5c] dark:text-[#91baaf]" /> Talent Radar & Scout Engine</a></li>
              <li><a href="#tournaments" className="hover:text-[#0d2620] dark:hover:text-white transition-colors flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-[#286b5c] dark:text-[#91baaf]" /> National LAN & Online Cups</a></li>
              <li><a href="#campus" className="hover:text-[#0d2620] dark:hover:text-white transition-colors flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-[#286b5c] dark:text-[#91baaf]" /> Inter-University Campus</a></li>
              <li><a href="#careers" className="hover:text-[#0d2620] dark:hover:text-white transition-colors flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-[#286b5c] dark:text-[#91baaf]" /> Esports Careers & Trials</a></li>
            </ul>
          </div>

          {/* Col 4: Supported Disciplines */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-xs text-[#0d2620] dark:text-white tracking-wider uppercase">
              Disciplines
            </h4>
            <ul className="space-y-2 text-xs text-[#1e483e] dark:text-[#a0c7bd]">
              <li className="font-medium">Battlegrounds Mobile India (BGMI)</li>
              <li className="font-medium">Valorant Champions Tour India</li>
              <li className="font-medium">Counter-Strike 2 (Faceit 128-Tick)</li>
              <li className="font-medium">Free Fire MAX National League</li>
              <li className="font-medium">Pokemon Unite Indian Circuit</li>
              <li className="font-medium">EA Sports FC 24 Collegiate</li>
            </ul>
          </div>

          {/* Col 5: Trust & Escrow Guarantee */}
          <div className="space-y-3 sm:col-span-2 lg:col-span-1">
            <h4 className="font-extrabold text-xs text-[#0d2620] dark:text-white tracking-wider uppercase">
              Trust & Security
            </h4>
            <p className="text-xs text-[#1e483e] dark:text-[#a0c7bd] leading-relaxed break-words font-normal">
              All listed tournaments are audited by the IEIH Trust Protocol. Prizepools are locked in RBI-regulated bank escrow before bracket commencement.
            </p>
            <div className="p-3 bg-white dark:bg-[#121f1b] rounded-2xl border border-[#91baaf]/50 dark:border-[#91baaf]/30 flex items-center gap-2.5 text-xs text-[#0d2620] dark:text-white shadow-sm">
              <Trophy className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span className="font-bold">₹14.8 Cr+ Verified Escrow Prizing</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright and legal links */}
        <div className="mt-8 sm:mt-10 pt-5 border-t border-[#91baaf]/30 dark:border-[#91baaf]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#20493f] dark:text-[#91baaf] text-center sm:text-left font-medium">
          <p>© 2026 India Esports Innovation Hub (IEIH). All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs">
            <span className="hover:text-[#0d2620] dark:hover:text-white transition-colors cursor-pointer">Terms of Fair Play</span>
            <span>•</span>
            <span className="hover:text-[#0d2620] dark:hover:text-white transition-colors cursor-pointer">Anti-Cheat Guidelines</span>
            <span>•</span>
            <span className="hover:text-[#0d2620] dark:hover:text-white transition-colors cursor-pointer">Organizer Verification Audit</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
