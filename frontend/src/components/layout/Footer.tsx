import React from 'react';
import { ShieldCheck, Heart, Radio, ExternalLink, Sparkles, Trophy } from 'lucide-react';
import { soundManager } from '../../utils/audio';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-hud-surface border-t border-hud-border mt-20 relative overflow-hidden">
      {/* Top Accent Line */}
      <div className="h-1 w-full bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-gold shadow-[0_0_15px_#00F0FF]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Identity & Federation endorsement */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-hud-card border border-cyber-cyan/50 flex items-center justify-center text-cyber-cyan shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="font-orbitron font-black text-base text-hud-text tracking-wider">
                IEIH <span className="text-cyber-cyan text-xs">INDIA</span>
              </span>
            </div>
            <p className="text-xs text-hud-muted font-sans leading-relaxed">
              India Esports Innovation Hub (भारत ईस्पोर्ट्स इनोवेशन हब) — National infrastructure powering digital esports identities, fair play audits, and tournament escrow.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-rajdhani text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>100% OPERATIONAL • AWS MUMBAI CLUSTER</span>
            </div>
          </div>

          {/* Col 2: Core Platform Portals */}
          <div className="space-y-3">
            <h4 className="font-orbitron font-bold text-xs text-cyber-cyan tracking-wider">
              PLATFORM PORTALS
            </h4>
            <ul className="space-y-2 text-xs font-rajdhani text-hud-muted">
              <li><a href="#passport" className="hover:text-cyber-cyan transition-colors">E-Player Digital Passport</a></li>
              <li><a href="#discovery" className="hover:text-cyber-cyan transition-colors">Talent Radar & Scout Engine</a></li>
              <li><a href="#tournaments" className="hover:text-cyber-cyan transition-colors">National LAN & Online Cups</a></li>
              <li><a href="#campus" className="hover:text-cyber-cyan transition-colors">Inter-University Collegiate Arena</a></li>
              <li><a href="#careers" className="hover:text-cyber-cyan transition-colors">Esports Career & Scrim Trials</a></li>
            </ul>
          </div>

          {/* Col 3: Supported Disciplines */}
          <div className="space-y-3">
            <h4 className="font-orbitron font-bold text-xs text-cyber-purple tracking-wider">
              ESPORTS DISCIPLINES
            </h4>
            <ul className="space-y-2 text-xs font-rajdhani text-hud-muted">
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
            <h4 className="font-orbitron font-bold text-xs text-cyber-gold tracking-wider">
              FAIR PLAY & TRUST
            </h4>
            <p className="text-xs text-hud-muted font-sans leading-relaxed">
              All listed tournaments are audited by the IEIH Trust Protocol. Prizepools are locked in RBI-regulated bank escrow before bracket commencement.
            </p>
            <div className="p-3 bg-hud-card rounded-xl border border-cyber-gold/30 flex items-center gap-2 text-xs font-rajdhani text-hud-text">
              <Trophy className="w-4 h-4 text-cyber-gold shrink-0" />
              <span>₹14.8 Cr+ Verified Prizing Disbursed</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-hud-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-rajdhani text-hud-dim">
          <p>© 2026 India Esports Innovation Hub (IEIH). All rights reserved.</p>
          <div className="flex items-center gap-4 text-hud-muted">
            <span className="hover:text-hud-text transition-colors cursor-pointer">Terms of Fair Play</span>
            <span>•</span>
            <span className="hover:text-hud-text transition-colors cursor-pointer">Anti-Cheat Guidelines</span>
            <span>•</span>
            <span className="hover:text-hud-text transition-colors cursor-pointer">Organizer Verification Audit</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
