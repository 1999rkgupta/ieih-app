import React from 'react';
import { Trophy } from 'lucide-react';
import { IEIHLogo } from '../common/IEIHLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#d0ece4]/90 dark:bg-[#09100e]/95 border-t border-[#91baaf]/40 dark:border-[#91baaf]/20 mt-16 sm:mt-20 relative transition-colors duration-200 pb-28 sm:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 xl:gap-8">
          {/* Col 1: Identity & Mission */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <IEIHLogo size="md" subtitle="India Esports Hub" />
            <p className="text-xs text-[#285045] dark:text-[#a0c7bd] leading-relaxed break-words">
              India Esports Innovation Hub (भारत ईस्पोर्ट्स इनोवेशन हब) — National infrastructure powering digital esports athlete passports, fair play audits, and tournament escrow.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-500 animate-pulse"></span>
              <span>100% Operational • AWS Mumbai</span>
            </div>
          </div>

          {/* Col 2: About Us (Proposed Platform Concept) */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-[#0d2620] dark:text-white tracking-wider uppercase">
              About Us
            </h4>
            <p className="text-xs text-[#285045] dark:text-[#a0c7bd] leading-relaxed break-words">
              <strong className="font-semibold text-[#0d2620] dark:text-white block mb-1">
                Proposed Platform Concept:
              </strong>
              A unified ecosystem connecting gamers, esports players, coaches, teams, organisations, tournament organisers, creators/casters, sponsors, and educational campuses.
            </p>
          </div>

          {/* Col 3: Core Platform Portals */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-[#0d2620] dark:text-white tracking-wider uppercase">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-[#285045] dark:text-[#a0c7bd]">
              <li><a href="#passport" className="hover:text-[#0d2620] dark:hover:text-white transition-colors">E-Player Digital Passport</a></li>
              <li><a href="#discovery" className="hover:text-[#0d2620] dark:hover:text-white transition-colors">Talent Radar & Scout Engine</a></li>
              <li><a href="#tournaments" className="hover:text-[#0d2620] dark:hover:text-white transition-colors">National LAN & Online Cups</a></li>
              <li><a href="#campus" className="hover:text-[#0d2620] dark:hover:text-white transition-colors">Inter-University Collegiate Arena</a></li>
              <li><a href="#careers" className="hover:text-[#0d2620] dark:hover:text-white transition-colors">Esports Career & Scrim Trials</a></li>
            </ul>
          </div>

          {/* Col 4: Supported Disciplines */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-[#0d2620] dark:text-white tracking-wider uppercase">
              Disciplines
            </h4>
            <ul className="space-y-2 text-xs text-[#285045] dark:text-[#a0c7bd]">
              <li><span>Battlegrounds Mobile India (BGMI)</span></li>
              <li><span>Valorant Champions Tour India</span></li>
              <li><span>Counter-Strike 2 (Faceit 128-Tick)</span></li>
              <li><span>Free Fire MAX Championship</span></li>
              <li><span>Pokemon Unite Indian Circuit</span></li>
              <li><span>EA Sports FC 24 Collegiate</span></li>
            </ul>
          </div>

          {/* Col 5: Trust & Escrow Guarantee */}
          <div className="space-y-3 sm:col-span-2 lg:col-span-1">
            <h4 className="font-bold text-xs text-[#0d2620] dark:text-white tracking-wider uppercase">
              Trust & Security
            </h4>
            <p className="text-xs text-[#285045] dark:text-[#a0c7bd] leading-relaxed break-words">
              All listed tournaments are audited by the IEIH Trust Protocol. Prizepools are locked in RBI-regulated bank escrow before bracket commencement.
            </p>
            <div className="p-3 bg-white/90 dark:bg-[#121d1a] rounded-2xl border border-[#91baaf]/40 dark:border-[#91baaf]/25 flex items-center gap-2.5 text-xs text-[#0d2620] dark:text-white shadow-sm">
              <Trophy className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span className="font-semibold">₹14.8 Cr+ Verified Prizing Disbursed</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-10 sm:mt-12 pt-6 border-t border-[#91baaf]/30 dark:border-[#91baaf]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#30594f] dark:text-[#88b5a9] text-center sm:text-left">
          <p>© 2026 India Esports Innovation Hub (IEIH). All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[11px] sm:text-xs">
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
