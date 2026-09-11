/**
 * ARENA-X AI COACH: Esports & Competitive Gaming Knowledge Base
 * Backend Grounding Model for SIH Prototype
 */

export interface KnowledgeEntry {
  id: string;
  game: 'BGMI' | 'Free Fire MAX' | 'VALORANT' | 'Esports Industry' | 'Universal';
  mode: 'Battle Royale' | 'Clash Squad' | 'Competitive 5v5' | 'General' | 'Industry';
  topic: string;
  entity: string;
  definition: string;
  mechanics: string;
  strategy: string;
  counterplay: string;
  drill: string;
  caution?: string;
  checklist?: string[];
  rules?: string[];
  tags: string[];
}

export const ARENA_X_KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    id: 'universal_igl',
    game: 'Universal',
    mode: 'General',
    topic: 'Roles & Leadership',
    entity: 'In-Game Leader (IGL)',
    definition: 'The player responsible for calling macro decisions: drop/landing plans, rotation timing, tempo shifts, fight selection, and endgame win conditions.',
    mechanics: 'Information collection from scouts/anchors, voice comm prioritization, tactical map awareness, and cooldown/resource tracking.',
    strategy: 'The IGL establishes the win condition for each phase. Rather than micro-managing aim, the IGL dictates map territory and decides when to commit or disengage.',
    counterplay: 'Opponents attempt to isolate the IGL, pressure comms with unexpected tempo shifts, or fake presence to bait wrong rotations.',
    drill: 'VOD Review Calling Drill: Watch 5 pro match VODs on 1.25x speed, pause before every zone/round shift, and verbalize the call within 3 seconds.',
    checklist: ['What is our win condition?', 'What information is missing?', 'Are teammates close enough to trade?', 'What is our fallback route?'],
    rules: ['Rule 3: Explain the reason behind a recommendation.', 'Rule 11: Teach decision-making, not only mechanics.'],
    tags: ['igl', 'leader', 'captain', 'macro', 'calling', 'leadership', 'shotcalling']
  },
  {
    id: 'universal_trading',
    game: 'Universal',
    mode: 'General',
    topic: 'Team Fights',
    entity: 'Trading & Spacing',
    definition: 'The discipline where if one player engages or falls, a teammate is positioned to immediately punish the enemy focus and secure the return elimination.',
    mechanics: 'Maintaining proper spacing (2-5 meters in tactical FPS, 15-30 meters in battle royale) and synchronized peek timings.',
    strategy: 'A disciplined trading team consistently beats squads with higher individual mechanics. Never let an isolated teammate duel without trade proximity.',
    counterplay: 'Area-of-effect utility (Mollies, Grenades, Gloo walls) used to split teammates and break trade lines.',
    drill: 'Buddy System Drill: Pair up in custom lobbies; every entry must have second-man crosshair placed on the exact corner within 0.4 seconds.',
    checklist: ['Who takes first contact?', 'Who trades?', 'Is spacing close enough for instant refrag?', 'Are we bunched up for grenade damage?'],
    rules: ['Rule 16: Teach trade distance.', 'Rule 1: Never equate kills with good play.'],
    tags: ['trade', 'trading', 'spacing', 'refrag', 'buddy system', 'teamfight', 'contact']
  },
  {
    id: 'universal_vod_review',
    game: 'Universal',
    mode: 'General',
    topic: 'Coaching & Analysis',
    entity: 'VOD Review Methodology',
    definition: 'A systematic review of recorded match footage to identify repeatable patterns, decision mistakes, and tactical execution gaps.',
    mechanics: 'Inspect 5 critical pillars: Information available, Position/Cover, Timing, Resource expenditure, and Win condition outcome.',
    strategy: 'Separate first deaths from team collapses. Focus on the root cause decision made 20-30 seconds before the elimination occurred.',
    counterplay: 'Avoid emotional blaming or hindsight bias (judging a call based on luck instead of risk/reward calculus).',
    drill: '10-Point VOD Matrix: Timestamp → Situation → Information → Decision → Execution → Outcome → Alternative → Repeatable? → Actionable Drill.',
    checklist: ['Timestamp logged?', 'What did player know?', 'Was there cover?', 'Did utility connect?', 'What was the alternative?'],
    rules: ['Rule 13: Use VOD evidence whenever possible.', 'Rule 14: Track repeated mistakes, not isolated errors.'],
    tags: ['vod', 'review', 'analysis', 'demo', 'mistakes', 'improvement', 'coaching']
  },
  {
    id: 'bgmi_erangel_rotations',
    game: 'BGMI',
    mode: 'Battle Royale',
    topic: 'Map Macro & Rotations',
    entity: 'Erangel Rotation Fundamentals',
    definition: 'The macro science of navigating Erangel through compounds, terrain dips, and bridge chokepoints based on flight path and zone center.',
    mechanics: 'Vehicle management (2 Dacias + 2 Buggies or UAZ), compound scouting, smoke screen deployment, and ridge contouring.',
    strategy: 'For Zone 1-2, prioritize early vehicle scouting to claim central compounds (School Apartments, Pochinki hills, Water City ridges). For Zone 4 hard shifts, soft-rotate along the thin edge.',
    counterplay: 'Bridge camping, compound crash ambushes, and tire shooting on exposed vehicles.',
    drill: 'Vehicle Convoy Practice: Run 10 custom games practicing 2-2 formation convoy driving with instant vehicle dismount to hard cover within 1.5 seconds.',
    checklist: ['Current zone center?', 'Vehicles refueled and protected?', 'Safe crossing route planned?', 'What if zone hard-shifts south?'],
    rules: ['Rule 46: Teach rotation routes with contingencies.', 'Rule 47: Teach why high ground matters.'],
    tags: ['bgmi', 'erangel', 'rotation', 'rotations', 'zone', 'macro', 'vehicles', 'compounds']
  },
  {
    id: 'bgmi_zone_reading',
    game: 'BGMI',
    mode: 'Battle Royale',
    topic: 'Zone Macro',
    entity: 'Zone Reading & Shift Anticipation',
    definition: 'Predicting future safe zones using water exclusion rules, compound density, and topography bias.',
    mechanics: 'Land-to-water ratio calculation, terrain elevation assessment, and historical flight path occupancy tracking.',
    strategy: 'When 40%+ of the circle covers water or unplayable cliffs, expect an aggressive land pull. Pre-rotate to the deep land side before the blue begins shrinking.',
    counterplay: 'Getting gatekept on the boundary when waiting for the circle timer to expire.',
    drill: 'Circle Guessing Challenge: Pause 20 tournament VODs at Zone 3 end and write down the predicted Zone 4 center and primary road approach.',
    checklist: ['Is water excluded in next circle?', 'Which side has fewer contested compounds?', 'Do we enter early center or play edge?'],
    rules: ['Rule 2: Never equate survival with good play if team gave away map control.', 'Rule 20: Teach contingency planning.'],
    tags: ['bgmi', 'zone', 'reading', 'prediction', 'circle', 'hard shift', 'edge play', 'center play']
  },
  {
    id: 'bgmi_compound_assault',
    game: 'BGMI',
    mode: 'Battle Royale',
    topic: 'Combat Execution',
    entity: 'Compound Assault & Crashing',
    definition: 'A coordinated push onto an occupied compound utilizing utility saturation and simultaneous entry angles.',
    mechanics: 'Cooking frag grenades (2.5s timer), pre-firing doorway chokes, vehicle crashing against blind walls, and smoke cover.',
    strategy: 'Never crash a compound without an initial knock or confirmed low-health enemy. Soften top floors with coordinated nades before breach.',
    counterplay: 'Defenders cook grenades on stairs, jump from balconies for flank angles, and use shotgun/SMG high burst in tight rooms.',
    drill: 'Apartments Breach Drill: Set up 4v4 in custom room at Rozhok triple houses; attackers have 20 seconds to breach using 4 smokes and 4 nades.',
    checklist: ['Do we have an opening knock?', 'Is vehicle placed as cover?', 'Are grenades cooked to under 2 seconds?', 'Who holds the flank?'],
    rules: ['Rule 48: Teach when to disengage.', 'Rule 49: Teach when a fight is strategically unnecessary.'],
    tags: ['bgmi', 'compound', 'crash', 'assault', 'breach', 'push', 'grenades', 'utility']
  },
  {
    id: 'ff_gloo_wall_fundamentals',
    game: 'Free Fire MAX',
    mode: 'Battle Royale',
    topic: 'Mechanics & Defense',
    entity: 'Gloo Wall Mechanics & Peeking',
    definition: 'Instant deployable defensive cover that blocks enemy lines of sight and absorbs incoming bullet fire.',
    mechanics: 'Fast crouch-gloo placement (under 0.2s), double-gloo stacking for height, and side-step jump peeking.',
    strategy: 'Drop gloo wall immediately upon taking first hit. Never engage in the open without gloo wall in hand. Use Nairi or Skyler synergies.',
    counterplay: 'Skyler sonic wave to shatter walls instantly, M82B anti-material sniper penetrating through gloo walls, or cooking flashbangs.',
    drill: 'Crouch Gloo 180 Drill: Run forward, take simulated hit, jump-turn 180, crouch and place gloo wall within 200ms in training ground.',
    checklist: ['Do you have at least 3 gloo walls in stock?', 'Are you hugging the wall edge for right-hand peek?', 'Did you anticipate Skyler?'],
    rules: ['Rule 12: Teach decision-making, not only mechanics.', 'Rule 18: Teach resource discipline.'],
    tags: ['free fire', 'ff', 'gloo wall', 'gloowall', 'peeking', 'defense', 'mechanics', 'bermuda']
  },
  {
    id: 'val_attack_defaults',
    game: 'VALORANT',
    mode: 'Competitive 5v5',
    topic: 'Tactical Playbook',
    entity: 'Attack-Side Defaults & Map Control',
    definition: 'A spread-out baseline setup across the map used to collect audio/visual information, bait defensive utility, and contest neutral territory without committing to a site.',
    mechanics: 'Silent jiggle-peeking, jump-spotting, holding off-angles against defensive pushes, and delayed utility deployment.',
    strategy: 'On maps like Ascent or Haven, run a 1-3-1 or 1-2-2 default. Wait for defender smokes and flashes to expire before deciding to execute or rotate.',
    counterplay: 'Defenders pushing aggressively through smokes with Odin/Judge or stacking an unpressured site.',
    drill: 'Default Clock Drill: Spend the first 45 seconds of the round holding lanes without using more than 1 piece of utility. Read defender reactions.',
    checklist: ['Is Mid contested?', 'Did defenders burn high-value utility?', 'Is our lurker alive to catch rotations?'],
    rules: ['Rule 2: Never equate survival with good play if team gave away map control.', 'Rule 17: Teach information discipline.'],
    tags: ['valorant', 'default', 'attack', 'map control', 'ascent', 'haven', 'tactics', 'macro']
  },
  {
    id: 'val_retake_fundamentals',
    game: 'VALORANT',
    mode: 'Competitive 5v5',
    topic: 'Site Defense',
    entity: 'Retake Fundamentals & Utility Sync',
    definition: 'A coordinated reclamation of a lost spike site by defenders who stayed alive rather than taking isolated 1v1 fights during the initial hit.',
    mechanics: 'Flashes timed with team swing, recon dart/drone revealing post-plant corners, and defuse-tap baiting.',
    strategy: 'Never retake 1-by-1. Wait for all 3 or 4 surviving defenders to arrive at the site choke points. Initiate with recon, smoke the enemy post-plant angles, and flood together.',
    counterplay: 'Attackers holding line-ups (Sova shock darts, Brimstone molly, Viper snakebites) from deep safety off-site.',
    drill: 'Retake 3v3 Custom: Defenders start outside A-site on Ascent. Practice synchronizing Sova dart + Omen flash + double-swing within a 2-second window.',
    checklist: ['Are all retakers in position before first utility is thrown?', 'Is spike location smoked or tapped?', 'Who hunts the lineup player?'],
    rules: ['Rule 45: Teach post-plant/retake concepts where applicable.', 'Rule 39: Evaluate timing.'],
    tags: ['valorant', 'retake', 'defense', 'utility', 'post plant', 'ascent', 'bind', 'clutch']
  },
  {
    id: 'val_economy_management',
    game: 'VALORANT',
    mode: 'Competitive 5v5',
    topic: 'Economy',
    entity: 'Economy: Full-Buy, Eco, Anti-Eco & Bonus',
    definition: 'Managing the team credit pool to ensure simultaneous full rifles (Vandal/Phantom) + Heavy Shields across rounds.',
    mechanics: 'Minimum next-round credits calculation (3900 for rifle + shields), bonus round weapon preservation, and force-buy synchronization.',
    strategy: 'After winning pistol, full-buy SMGs/Bulldogs on Round 2 (Anti-Eco). In Round 3 (Bonus), play for trades and weapon steals without upgrading. Save when credits fall below 3900 next round.',
    counterplay: 'Getting caught with inconsistent buys (3 full buys and 2 pistols) leading to staggered economy for 3 consecutive rounds.',
    drill: 'Economy Callout Practice: At the start of buy phase, state "Next round minimum is 4200, buy down to 2100 max" within 5 seconds.',
    checklist: ['Does entire team have minimum 3900 next round?', 'Did we buy together or is someone broke?', 'Are we saving weapons in unwinnable 1v4?'],
    rules: ['Rule 43: Teach economy.', 'Rule 18: Teach resource discipline.'],
    tags: ['valorant', 'economy', 'credits', 'eco', 'anti-eco', 'bonus round', 'vandal', 'phantom', 'buy']
  },
  {
    id: 'career_scouting_readiness',
    game: 'Esports Industry',
    mode: 'Industry',
    topic: 'Career Pathways',
    entity: 'Scouting Readiness & Trials',
    definition: 'The criteria and portfolio required for amateur and collegiate athletes to be scouted and signed by professional Tier-1/Tier-2 esports organizations.',
    mechanics: 'Passport dossier verification, tournament match VOD library, comms recordings, scrim attendance logs, and background checks.',
    strategy: 'Recruiters prioritize coachability, emotional composure (non-tilting), concise communication, and attendance reliability over raw ranked K/D.',
    counterplay: 'Toxic behavior in ranked games, unverified claims, missing scrim commitments, or anti-cheat violations which permanently blacklist athletes.',
    drill: 'Career Portfolio Audit: Review your profile against the 10-point checklist: Rank proof, VOD with comms, role definition, references, and tournament history.',
    checklist: ['Verified digital passport number?', 'At least 3 clean VODs with team audio?', '95%+ scrim attendance logged?', 'No history of toxicity or bans?'],
    rules: ['Rule 11: Do not promise a player will become professional.', 'Rule 25: Respect tournament integrity.'],
    tags: ['career', 'scout', 'scouting', 'trials', 'pro team', 'recruitment', 'tier 1', 'contracts', 'portfolio']
  }
];

export function queryBackendKnowledgeBase(query: string, userGame?: string) {
  const q = query.toLowerCase();
  let bestEntry: KnowledgeEntry | undefined;
  let bestScore = 0;

  for (const entry of ARENA_X_KNOWLEDGE_BASE) {
    let score = 0;
    if (q.includes(entry.game.toLowerCase())) score += 5;
    if (userGame && userGame.toLowerCase() === entry.game.toLowerCase()) score += 2;
    if (q.includes(entry.entity.toLowerCase())) score += 10;
    if (q.includes(entry.topic.toLowerCase())) score += 6;
    for (const tag of entry.tags) {
      if (q.includes(tag)) score += 3;
    }
    if (score > bestScore) {
      bestScore = score;
      bestEntry = entry;
    }
  }

  if (bestEntry && bestScore >= 4) {
    return {
      replyText: `**In simple words:** ${bestEntry.definition}\n\n**In competitive play (${bestEntry.game}):** ${bestEntry.strategy}\n\n**Counterplay & Risk:** ${bestEntry.counterplay}\n\n**Actionable Drill:** ${bestEntry.drill}`,
      tacticalCard: {
        title: `${bestEntry.game}: ${bestEntry.entity}`,
        category: `${bestEntry.topic} [Grounding: ARENA-X DB]`,
        keyPoints: [
          `Core Concept: ${bestEntry.definition}`,
          `Mechanic: ${bestEntry.mechanics}`,
          `Strategic Rule: ${bestEntry.strategy.slice(0, 140)}...`
        ],
        actionItem: bestEntry.drill,
        checklist: bestEntry.checklist
      }
    };
  }

  return {
    replyText: `Telemetry analysis: Based on the ARENA-X Knowledge Base, competitive success requires disciplined trade spacing and macro zone foresight. What tactical scenario would you like to review?`,
    tacticalCard: {
      title: 'ARENA-X Tactical Advisory',
      category: 'Esports Grounding Database',
      keyPoints: [
        'BGMI: Erangel compounds, vehicle convoys, edge rotations, endgame smoke walls',
        'Free Fire MAX: Gloo-wall peeking, Bermuda high-ground, Clash Squad economy',
        'VALORANT: Attack defaults, Bind teleporter fakes, site retakes, economy buying',
        'Careers: Scrim trials, scouting readiness, contracts, tournament rulebooks'
      ],
      actionItem: 'Ask a specific tactical or career question to unlock the grounded playbook.'
    }
  };
}
