/**
 * ARENA-X AI COACH: Esports & Competitive Gaming Knowledge Base
 * Official SIH Prototype Grounding Database
 * Covers: BGMI • Free Fire MAX • VALORANT • Esports Industry • Career Guidance • Tournament Literacy
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
  // ==========================================
  // 1. UNIVERSAL COMPETITIVE FOUNDATIONS
  // ==========================================
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
    caution: 'Never judge an IGL call purely by the gunfight outcome; inspect what information was available when the call was made.',
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

  // ==========================================
  // 2. BGMI (BATTLEGROUNDS MOBILE INDIA)
  // ==========================================
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
    id: 'bgmi_endgame_smokes',
    game: 'BGMI',
    mode: 'Battle Royale',
    topic: 'Endgame Discipline',
    entity: 'Endgame Smoke Wall & Spacing',
    definition: 'Using smoke grenades to construct artificial terrain and safe rotation corridors in open field endings (Zones 6 to 8).',
    mechanics: 'Smoke overlap layering, smoke blooming timer (approx 45 seconds duration), and crawling through the core rather than edges.',
    strategy: 'Every player must carry a minimum of 4-6 smoke grenades into Zone 5. Build continuous walls between opposing squads to isolate 1v1 or 2v2 duels.',
    counterplay: 'Opponents blind-spraying with LMGs (M249, DP-28) or throwing random high-arc grenades into the center of smoke clouds.',
    drill: 'Smoke Corridor Sprint: Deploy 8 smokes in a line across open Erangel grass; squad must navigate from start to end without breaking concealment.',
    checklist: ['Minimum 15 squad smokes in inventory?', 'Are smokes overlapped by 30%?', 'Are players staggered to avoid one nade wiping all?'],
    rules: ['Rule 18: Teach resource discipline.', 'Rule 44: Teach endgame planning.'],
    tags: ['bgmi', 'smoke', 'endgame', 'utilities', 'open field', 'circle 7', 'circle 8', 'chicken dinner']
  },
  {
    id: 'bgmi_miramar_macro',
    game: 'BGMI',
    mode: 'Battle Royale',
    topic: 'Map Macro',
    entity: 'Miramar Long-Range Rotations & Ridges',
    definition: 'Managing expansive desert terrain, ridge sightlines, and sniper crossfires across Miramar.',
    mechanics: 'DMR double-tapping (Mini14, SLR), hull-down vehicle parking behind ridges, and dip-to-dip running.',
    strategy: 'In Miramar, high ground is king only if you have hard cover against third-party sniper fire. Drive through valleys and park along reverse-slopes.',
    counterplay: 'Getting caught in open desert bowls with shot-out tires.',
    drill: 'Ridge Peeking Drill: Practice 20 quick single-tap sniper peeks from behind uneven Miramar terrain without re-peeking the exact same micro-angle.',
    checklist: ['Are tires tucked behind the ridge?', 'Do we have a 4x or 6x on our primary DMR?', 'Can third-party snipers see our backs?'],
    rules: ['Rule 47: Teach why high ground matters.', 'Rule 46: Teach rotation routes with contingencies.'],
    tags: ['bgmi', 'miramar', 'sniping', 'dmr', 'ridges', 'desert', 'long range', 'vehicles']
  },

  // ==========================================
  // 3. FREE FIRE MAX
  // ==========================================
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
    id: 'ff_rusher_entry',
    game: 'Free Fire MAX',
    mode: 'Clash Squad',
    topic: 'Role & Combat',
    entity: 'Rusher Entry & Reset',
    definition: 'The vanguard role in Free Fire specializing in shotgun/SMG close-quarter combat and space creation.',
    mechanics: 'Slide movement, MP40 / M1887 double-tap, Alok/Tatsuya dash timing, and rapid reset behind gloo walls.',
    strategy: 'Rushers must create first contact with high burst damage, then immediately deploy gloo wall to reset or allow their flanker to close the fight.',
    counterplay: 'Stalling with Chrono forcefield, flashbangs, or baiting the rusher into crossfire angles.',
    drill: 'Double Shotgun Snap: In Clash Squad custom, practice sliding past obstacle, delivering 2 M1887 headshots, and instantly blocking return fire.',
    checklist: ['Is teammate following 5m behind for refrag?', 'Is Tatsuya dash ready?', 'Do you have an exit angle?'],
    rules: ['Rule 19: Teach reset timing.', 'Rule 35: Evaluate decision speed.'],
    tags: ['free fire', 'ff', 'rusher', 'entry', 'clash squad', 'm1887', 'mp40', 'tatsuya', 'alok']
  },
  {
    id: 'ff_bermuda_high_ground',
    game: 'Free Fire MAX',
    mode: 'Battle Royale',
    topic: 'Map Strategy',
    entity: 'Bermuda High Ground & POI Thinking',
    definition: 'Controlling major elevation features like Peak, Bimasakti Strip, and Clock Tower to dominate rotation lanes.',
    mechanics: 'High-to-low bullet drop, launcher pad rotation, and roof control using double gloo ladders.',
    strategy: 'Peak controls the central hub of Bermuda. Holding its perimeter houses gives 360-degree vision of early rotations entering Zone 3.',
    counterplay: 'Airdrop launcher pads allowing enemies to drop directly on high roofs, and grenade launcher spam.',
    drill: 'Bermuda Zone Transition: Practice 5 rotations starting from Rim Nam Cove to Peak using only natural terrain dips and 2 vehicles.',
    checklist: ['Who is holding the Clock Tower approach?', 'Are launchers covered?', 'Do we have enough gloo for downhill descent?'],
    rules: ['Rule 47: Teach why high ground matters.', 'Rule 41: Teach map-specific fundamentals.'],
    tags: ['free fire', 'ff', 'bermuda', 'peak', 'clock tower', 'high ground', 'poi', 'rotations']
  },
  {
    id: 'ff_clash_squad_economy',
    game: 'Free Fire MAX',
    mode: 'Clash Squad',
    topic: 'Economy & Team Play',
    entity: 'Clash Squad Round Economy',
    definition: 'Managing coin budget across rounds to maintain armor, helmets, upgraded weapons, and gloo walls.',
    mechanics: 'First round pistol purchase (USP vs G18), save round coordination, and armor repair kit optimization.',
    strategy: 'Winning Round 1 gives an economy snowball. If squad loses Round 2 eco, full-save in Round 3 to guarantee Thompsons or MP40s with Lv3 vests in Round 4.',
    counterplay: 'Force-buying every round with no gloo walls or helmets, getting easily one-tapped by desert eagle.',
    drill: 'CS Buy Strategy: Review the 7-round economy plan; practice buying armor + 2 gloos before spending leftover coins on weapon upgrades.',
    checklist: ['Did all 4 players buy vests?', 'Does everyone have minimum 2 gloo walls?', 'Are we saving coins together?'],
    rules: ['Rule 43: Teach economy.', 'Rule 18: Teach resource discipline.'],
    tags: ['free fire', 'clash squad', 'economy', 'coins', 'weapons', 'armor', 'buy rounds']
  },

  // ==========================================
  // 4. VALORANT
  // ==========================================
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
    id: 'val_duelist_entry',
    game: 'VALORANT',
    mode: 'Competitive 5v5',
    topic: 'Agent Roles',
    entity: 'Duelist Entry Protocol (Jett / Raze / Reyna)',
    definition: 'The entry duelist role is to break crosshairs, create physical space on site, and draw enemy attention so teammates can flood and trade.',
    mechanics: 'Jett dash into smoke, Raze double-satchel, slide/peek acceleration, and quick 180 degree corner checking.',
    strategy: 'An entry duelist who dies on site after drawing 2 enemy crosshairs and taking site control has succeeded if teammates trade. It is NOT about getting a 4k every round.',
    counterplay: 'Cypher tripwires, Killjoy lockdown, or judge players hiding in smoke waiting for the dash.',
    drill: 'Satchel/Dash Accuracy Drill: Run 20 repetitions entering Split A-Site or Ascent B-Site, dashing onto default box and clearing back-site in 1.2 seconds.',
    checklist: ['Did Initiator flash or reveal before you dashed?', 'Are smokes already down on CT and Heaven?', 'Is second-man following immediately?'],
    rules: ['Rule 1: Never equate kills with good play.', 'Rule 32: Do not force a player into a role only because of K/D.'],
    tags: ['valorant', 'duelist', 'jett', 'raze', 'reyna', 'entry', 'dash', 'satchel', 'roles']
  },
  {
    id: 'val_bind_macro',
    game: 'VALORANT',
    mode: 'Competitive 5v5',
    topic: 'Map Strategy',
    entity: 'Bind Teleporter Macro & Hookah Control',
    definition: 'Controlling Bind with no mid lane through aggressive Hookah and Showers/Bath territory, leveraging instantaneous teleporter rotations.',
    mechanics: 'Teleporter door sound cue triggers, flash-through-teleport plays, and Viper/Brimstone A-short and B-long smokes.',
    strategy: 'On Bind, defense must fight for Hookah and A-Short control early. On attack, fake teleporter sounds to force defender rotates, then execute the vacated site.',
    counterplay: 'Defenders holding teleporter exit with Judge or Raze boombot.',
    drill: 'Bind B-Site Retake Sync: Defenders practice teleporting from A-Lamps to B-Hookah simultaneously with B-Elbow push.',
    checklist: ['Is Hookah smoked or cleared with drone?', 'Did teleporter sound trigger a defender rotate?', 'Is flank watch in Showers set?'],
    rules: ['Rule 41: Teach map-specific fundamentals.', 'Rule 46: Teach rotation routes with contingencies.'],
    tags: ['valorant', 'bind', 'teleporter', 'hookah', 'showers', 'retake', 'brimstone', 'viper']
  },

  // ==========================================
  // 5. ESPORTS INDUSTRY & CAREER PATHWAYS
  // ==========================================
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
    rules: ['Rule 11: Do not promise a player will become professional.', 'Rule 25: Respect tournament integrity.', 'Rule 32: Do not force player into role only for K/D.'],
    tags: ['career', 'scout', 'scouting', 'trials', 'pro team', 'recruitment', 'tier 1', 'contracts', 'portfolio']
  },
  {
    id: 'career_tournament_readiness',
    game: 'Esports Industry',
    mode: 'Industry',
    topic: 'Tournament Literacy',
    entity: 'Tournament Preparation & LAN Readiness',
    definition: 'The comprehensive operational and mental checklist needed prior to competing in high-stakes online or LAN tournaments.',
    mechanics: 'Rulebook compliance verification, device testing, ping/latency checks, backup peripherals, and discord/voice room setup.',
    strategy: 'LAN events eliminate online latency advantages. Focus on screen distance, lighting adaptation, white-noise headset acclimation, and stage composure routines.',
    counterplay: 'Technical delays, hardware glitches, rulebook disputes, and match fatigue in best-of-5 brackets.',
    drill: 'Stage Warm-up Simulation: Conduct a 45-minute strict warmup with timer, verify POV recording software, and read rulebook emergency clauses.',
    checklist: ['Official rulebook downloaded & read?', 'Roster IDs matched with passport?', 'Headset and backup cable packed?', 'Warm-up routine completed?'],
    rules: ['Rule 7: Treat tournament rules as organizer-specific.', 'Rule 27: Encourage healthy breaks and sleep.'],
    tags: ['tournament', 'lan', 'preparation', 'rulebook', 'roster', 'offline', 'esports', 'stage']
  },
  {
    id: 'career_contracts_basics',
    game: 'Esports Industry',
    mode: 'Industry',
    topic: 'Legal & Industry',
    entity: 'Esports Player Contracts & Integrity',
    definition: 'Legal agreements governing player compensation, tournament prize splits, streaming rights, exclusivity, and termination terms.',
    mechanics: 'Contract clause review (duration, buyout clauses, prize share percentage, equipment allowances, IP rights).',
    strategy: 'Standard pro contracts should clearly state prize money distribution (typically 80-90% to players, 10-20% to organization) and never restrict personal accounts without fair stipends.',
    counterplay: 'Predatory contracts with indefinite auto-renewals, excessive buyout fees that trap young athletes, or unpaid prize withholding.',
    drill: 'Contract Red-Flag Audit: Always have contracts reviewed by trusted legal counsel or esports player associations before signing.',
    checklist: ['Is salary clearly defined?', 'What is the prize money split percentage?', 'What is the buyout clause value?', 'Are streaming hours reasonable?'],
    rules: ['Rule 24: Do not encourage cheating or exploits.', 'Rule 26: Do not encourage account sharing.'],
    tags: ['contract', 'salary', 'prize money', 'legal', 'buyout', 'signing', 'organization', 'terms']
  }
];

// 50 Rules An AI Esports Coach Should Remember
export const AI_COACH_50_RULES = [
  "Never equate kills with good play.",
  "Never equate survival with good play if the team gave away all map control.",
  "Explain the reason behind a recommendation.",
  "Ask for the game and mode when ambiguous.",
  "Separate current facts from evergreen principles.",
  "Treat patches as versioned data.",
  "Treat tournament rules as organizer-specific.",
  "Use official sources for current competitive facts.",
  "Do not invent map rotations.",
  "Do not invent prize pools.",
  "Do not promise a player will become professional.",
  "Teach decision-making, not only mechanics.",
  "Use VOD evidence whenever possible.",
  "Track repeated mistakes, not isolated errors.",
  "Review first deaths separately from team collapse.",
  "Teach trade distance.",
  "Teach information discipline.",
  "Teach resource discipline.",
  "Teach reset timing.",
  "Teach contingency planning.",
  "Teach concise comms.",
  "Teach positive feedback.",
  "Do not normalize harassment.",
  "Do not encourage cheating or exploits.",
  "Respect tournament integrity.",
  "Do not encourage account sharing where rules prohibit it.",
  "Encourage healthy breaks and sleep.",
  "Use warm-ups with a purpose.",
  "Practice one weakness at a time.",
  "Measure progress over samples, not one match.",
  "Use role flexibility where appropriate.",
  "Do not force a player into a role only because of K/D.",
  "Evaluate communication quality.",
  "Evaluate decision speed.",
  "Evaluate adaptation.",
  "Evaluate composure.",
  "Evaluate utility value.",
  "Evaluate positioning.",
  "Evaluate timing.",
  "Evaluate team fit.",
  "Teach map-specific fundamentals.",
  "Teach opponent-specific adaptation.",
  "Teach economy.",
  "Teach endgame planning.",
  "Teach post-plant/retake concepts where applicable.",
  "Teach rotation routes with contingencies.",
  "Teach why high ground matters.",
  "Teach when to disengage.",
  "Teach when a fight is strategically unnecessary.",
  "Always state uncertainty when the evidence is incomplete."
];

// Quick Reference Checklists
export const QUICK_REFERENCE_CHECKLISTS = {
  rotation: {
    title: "Battle Royale Rotation Checklist",
    items: [
      "1. Current zone center and timer?",
      "2. Next likely zone prediction (water/terrain bias)?",
      "3. Current terrain contour (ridge vs bowl)?",
      "4. Vehicles available, refueled, and positioned?",
      "5. Known enemy compound locations?",
      "6. Safe crossing route avoiding choke points?",
      "7. Designated fallback position if blocked?",
      "8. Can entire squad arrive together within trade distance?",
      "9. What resources are we committing (fuel, smokes)?",
      "10. Contingency plan if circle hard-shifts opposite?"
    ]
  },
  teamfight: {
    title: "Team Fight Execution Checklist",
    items: [
      "1. Who has first contact responsibility?",
      "2. Who is the designated trade partner?",
      "3. Who holds the flank / rear watch?",
      "4. What utility initiates the fight (flash/grenade/smoke)?",
      "5. What is the disengage / exit route?",
      "6. Post-knock protocol: push or reset?",
      "7. When is the reset call made (heal, reload, reposition)?",
      "8. What enemy information is currently missing?"
    ]
  },
  vod: {
    title: "VOD Review Checklist",
    items: [
      "1. Timestamp of the critical engagement",
      "2. Situation & map state at start of play",
      "3. Information available to the player at decision time",
      "4. Decision chosen (hold, push, rotate, save)",
      "5. Mechanical execution quality",
      "6. Outcome (win, trade, isolated death)",
      "7. Alternative decision that was viable",
      "8. Was the mistake repeatable or an isolated fluke?",
      "9. Prescribed training drill to fix it",
      "10. Accountability owner for the call"
    ]
  },
  career: {
    title: "Esports Career Portfolio Checklist",
    items: [
      "1. Verified rank / competitive benchmark proof",
      "2. Official tournament history and placements",
      "3. VOD highlight library with clear team comms",
      "4. Primary & secondary role definition",
      "5. Team & coach references",
      "6. Communication samples under pressure",
      "7. Verified player passport profile",
      "8. Scrim availability schedule",
      "9. Clean disciplinary & anti-cheat record",
      "10. Clear target milestone for current season"
    ]
  },
  tournament: {
    title: "Tournament Readiness Checklist",
    items: [
      "1. Official rulebook read and clauses verified",
      "2. Team roster IDs verified on tournament platform",
      "3. Competitive device and peripherals tested",
      "4. Network latency and stability verified",
      "5. Voice communication channels tested",
      "6. POV recording requirements set up",
      "7. Player eligibility confirmed with admin",
      "8. Match schedule and reporting times saved",
      "9. 45-minute structured warmup routine planned",
      "10. Emergency technical disconnect protocol assigned"
    ]
  }
};

/**
 * Knowledge Engine Query Matcher & Response Synthesizer
 */
export function queryKnowledgeBase(query: string, userGame?: string): {
  matchedEntry?: KnowledgeEntry;
  replyText: string;
  tacticalCard?: {
    title: string;
    category: string;
    keyPoints: string[];
    actionItem?: string;
    checklist?: string[];
  };
} {
  const q = query.toLowerCase().trim();

  // 1. Check for greetings or casual opening phrases
  const greetings = ['hi', 'hello', 'hey', 'yo', 'sup', 'namaste', 'good morning', 'good afternoon', 'good evening', 'how are you', 'who are you', 'what can you do', 'help', 'start'];
  const isGreeting = greetings.some(g => q === g || q.startsWith(`${g} `) || q.startsWith(`${g}!`) || q.startsWith(`${g}?`));

  if (isGreeting) {
    return {
      replyText: `Hello Athlete! I am **EE AI**, your Competitive Tactical Intelligence Coach and AI Operating System for the India Esports Innovation Hub (IEIH).\n\nI am synchronized with live tournaments, collegiate campus chapters, career contracts, and athlete dossiers.\n\nHere are some tactical topics you can ask me about:\n- 🏆 **Tournaments:** Bracket schedules, prize pools, and squad registration status\n- 🎓 **Collegiate Standings:** Campus rankings, university chapter leaders, and scrim MMR\n- 🎯 **Tactical Playbooks:** BGMI Erangel rotations, VALORANT site retakes, Free Fire gloo-wall discipline\n- 💼 **Careers & Scouting:** Pro team contracts, scout trials, and analyst openings\n- ⚡ **Physical & Reaction Drills:** Aim benchmarks, eye fatigue management, and clutch mindset routines`,
      tacticalCard: {
        title: 'EE AI Sports & Tactical Guidance',
        category: 'Live Platform Grounding',
        keyPoints: [
          '🏆 Explore 15+ Active National Tournaments',
          '🎓 Review Top 20 Collegiate Campus Guilds',
          '🎯 Master Tactical Playbooks for VALORANT, BGMI & Free Fire',
          '💼 Discover Verified Pro Careers & Scout Trials'
        ],
        actionItem: 'Ask a tactical match question, audit your passport, or search open tournaments.'
      }
    };
  }

  // 2. Specialized Career & Future in Sports/Esports Handler
  if (q.includes('future') || q.includes('scope') || q.includes('grow') || q.includes('2026') || q.includes('2030') || q.includes('industry')) {
    return {
      replyText: `### The Future of Esports & Sports in India (2026–2030)\n\nThe esports and competitive sports industry in India is experiencing an unprecedented structural boom:\n\n1. **Official Government Recognition**: Esports is officially recognized under the Ministry of Youth Affairs & Sports, enabling sports quota certifications, university varsity grants, and inclusion in national sports festivals.\n2. **Tier-1 Tournaments & Massive Prize Pools**: Flagship tournaments across **BGMI, VALORANT, Free Fire MAX, and CS2** feature annual prize pools exceeding ₹15–25 Crores, backed by global brands and broadcast networks.\n3. **Collegiate & Grassroots Varsity Hubs**: Universities across India (IITs, BITS, Delhi University) are institutionalizing official esports clubs and competitive scrim leagues, creating clear feeder pipelines into Tier-1 pro organizations.\n4. **Longevity Beyond Playing**: The ecosystem now offers diverse 10+ year careers in **Tactical Coaching, Data Analytics, Tournament Operations, Broadcast Production, and Sports Physiotherapy**.\n\n**Key Takeaway:** With verified digital athlete credentials (like your IEIH Passport) and tournament discipline, esports is now a legitimate, high-growth professional career path.`,
      tacticalCard: {
        title: 'Future of Indian Esports (2026-2030)',
        category: 'Industry Intelligence & Growth',
        keyPoints: [
          'Official recognition under Ministry of Youth Affairs & Sports',
          'Annual prize pools exceeding ₹20+ Crores across flagship titles',
          'Collegiate varsity pipelines offering scholarships & guild support',
          'Sustainable long-term careers in coaching, analytics & broadcast'
        ],
        actionItem: 'Keep your IEIH Athlete Passport updated, participate in verified collegiate scrims, and maintain a clean competitive fair-play record.'
      }
    };
  }

  // 3. Career Options, Jobs & Pathways Handler
  if (q.includes('career') || q.includes('job') || q.includes('role') || q.includes('option') || q.includes('path') || q.includes('pro player') || q.includes('become') || q.includes('opportunity') || q.includes('opportunities')) {
    return {
      replyText: `### Professional Career Pathways in Sports & Esports\n\nBeyond competing as a professional athlete, the esports and sports industry offers multiple thriving career verticals:\n\n1. 🎮 **Professional Athlete / IGL**: Compete in Tier-1 national and international tournaments on signed monthly salaries (₹50,000–₹3,50,000/mo) plus prize pool cuts.\n2. 📊 **Tactical Analyst & Data Scout**: Breakdown opponent VODs, track kill-zone heatmaps, economy curves, and discover rising radar talents.\n3. 🧠 **Head Coach & Performance Mentor**: Formulate macro playbooks, map rotations, trade spacing protocols, and mental composure drills for squads.\n4. 🎙️ **Esports Caster & Broadcast Host**: Provide live multilingual play-by-play commentary for major tournament stadium broadcasts and LANs.\n5. 📋 **Tournament Administrator & League Referee**: Manage bracket rules, anti-cheat hardware checks, and tournament match integrity.\n6. 🏃 **Sports Physiotherapist & Performance Coach**: Design ergonomics, wrist/neck tendon routines, reaction speed drills, and stamina plans.\n\n**How to Start on IEIH:** Head to the **Careers Hub** on our platform to explore open recruitment notices, scout trials, and analyst internships.`,
      tacticalCard: {
        title: 'Esports Career Matrix',
        category: 'Professional Pathways',
        keyPoints: [
          'Pro Athlete / In-Game Leader: Core tactical competition',
          'Data Analyst & VOD Scout: High-IQ competitive telemetry',
          'Head Coach & Mental Trainer: Squad leadership & composure',
          'Tournament Operations & Broadcasting: Event execution'
        ],
        actionItem: 'Audit your skills, build your VOD portfolio with clear voice comms, and apply directly through the IEIH Careers tab.'
      }
    };
  }

  // 4. Salary, Income & Earnings Handler
  if (q.includes('salary') || q.includes('income') || q.includes('earn') || q.includes('money') || q.includes('pay') || q.includes('how much')) {
    return {
      replyText: `### Esports Salaries & Compensation Structure in India\n\nCompetitive compensation in Indian esports is structured across multiple tiers:\n\n- **Tier-1 Signed Athletes (GodLike, Soul, S8UL, Revenant, Orangutan, etc.)**: Fixed base salary of **₹75,000 to ₹3,50,000 per month** + 75–85% share of tournament prize pools + streaming & brand sponsorships.\n- **Tier-2 Rising Contenders**: Base stipend of **₹15,000 to ₹50,000 per month** + tournament winnings and team boot-camp accommodations.\n- **Collegiate Athletes & Grassroots**: Tournament prize purses, equipment sponsorships, and university athletic grants.\n- **Support Staff (Coaches, Analysts, Managers)**: Fixed salaries ranging from **₹40,000 to ₹1,50,000 per month** depending on team tier and tournament placements.\n\n**Recommendation:** Always sign verified contracts that clearly specify monthly compensation dates, prize pool distribution ratios, and equipment support.`,
      tacticalCard: {
        title: 'Esports Compensation Framework',
        category: 'Financial Intelligence',
        keyPoints: [
          'Tier-1 Athlete: ₹75K - ₹3.5L/mo fixed + prize cuts',
          'Tier-2 Contender: ₹15K - ₹50K/mo + bootcamp perks',
          'Tactical Coach / Analyst: ₹40K - ₹1.5L/mo',
          'Standard Prize Pool Distribution: 75-85% directly to players'
        ],
        actionItem: 'Verify prospective organizations on the IEIH Scouting Hub before signing contract commitments.'
      }
    };
  }

  // 5. Scouting & How to Get Signed Handler
  if (q.includes('scout') || q.includes('trial') || q.includes('sign') || q.includes('team') || q.includes('recruitment') || q.includes('get noticed')) {
    return {
      replyText: `### How to Get Scouted by Pro Teams on IEIH\n\nPro recruiters on India Esports Hub evaluate athletes using a 5-pillar dossier:\n\n1. **Verified Digital Passport**: Complete your KYC and sync your in-game IGN and peak rank.\n2. **Consistent Scrim Attendance (95%+)**: Tier-1 recruiters value reliability and punctuality above all else.\n3. **Composed Voice Comms & Coachability**: Upload match VODs demonstrating calm, concise callouts without tilt or toxicity.\n4. **Role Mastery & Adaptability**: Master your designated role (Entry Duelist, In-Game Leader, Anchor, or Support Rusher).\n5. **Tournament Track Record**: Participate in open collegiate and national IEIH tournaments to generate verified match MMR.\n\n**Actionable Step:** Check the **Scouting Radar** in the Discovery tab to see how your combat telemetry compares with top scouted prospects.`,
      tacticalCard: {
        title: '5-Step Scouting Blueprint',
        category: 'Scouting & Recruitment',
        keyPoints: [
          '1. Maintain verified IEIH Athlete Digital Passport',
          '2. 95%+ Scrim attendance and zero toxicity record',
          '3. Build a 3-VOD portfolio with clean tactical comms',
          '4. Compete in weekly open platform tournaments'
        ],
        actionItem: 'Keep your athlete profile stats up-to-date to rank higher on the recruiter Scout Radar.'
      }
    };
  }

  // Score each knowledge entry based on query matching
  let bestEntry: KnowledgeEntry | undefined;
  let bestScore = 0;

  for (const entry of ARENA_X_KNOWLEDGE_BASE) {
    let score = 0;

    // Direct game match bonus
    if (q.includes(entry.game.toLowerCase())) score += 5;
    if (userGame && userGame.toLowerCase() === entry.game.toLowerCase()) score += 2;

    // Entity & topic match
    if (q.includes(entry.entity.toLowerCase())) score += 10;
    if (q.includes(entry.topic.toLowerCase())) score += 6;

    // Tag matches
    for (const tag of entry.tags) {
      if (q.includes(tag)) score += 3;
    }

    // Keyword hits in definition/strategy
    const keywords = ['rotate', 'rotation', 'igl', 'trade', 'spacing', 'smoke', 'gloo', 'aim', 'retake', 'default', 'scout', 'scouting', 'economy', 'vod', 'tournament', 'contract', 'erangel', 'miramar', 'bermuda', 'ascent', 'bind', 'clash', 'rusher', 'duelist'];
    for (const kw of keywords) {
      if (q.includes(kw)) {
        if (entry.tags.includes(kw) || entry.definition.toLowerCase().includes(kw)) {
          score += 2;
        }
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestEntry = entry;
    }
  }

  // If a high-confidence match is found
  if (bestEntry && bestScore >= 4) {
    const formattedReply = `**In simple words:** ${bestEntry.definition}\n\n**In competitive play (${bestEntry.game}):** ${bestEntry.strategy}\n\n**Counterplay & Risk:** ${bestEntry.counterplay}\n\n**Actionable Drill:** ${bestEntry.drill}`;

    return {
      matchedEntry: bestEntry,
      replyText: formattedReply,
      tacticalCard: {
        title: `${bestEntry.game}: ${bestEntry.entity}`,
        category: `${bestEntry.topic} [Tactical Playbook]`,
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

  // Check if user is asking for a checklist
  if (q.includes('checklist') || q.includes('rotation check') || q.includes('ready') || q.includes('readiness')) {
    if (q.includes('rotate') || q.includes('rotation') || q.includes('br') || q.includes('zone')) {
      const cl = QUICK_REFERENCE_CHECKLISTS.rotation;
      return {
        replyText: `Here is the official **${cl.title}**:\n\n${cl.items.map(i => `• ${i}`).join('\n')}`,
        tacticalCard: {
          title: cl.title,
          category: 'Tactical Standard Operating Procedure',
          keyPoints: cl.items.slice(0, 4),
          actionItem: 'Run through all 10 checks before committing to Zone 3+ rotations.'
        }
      };
    }

    if (q.includes('fight') || q.includes('teamfight') || q.includes('combat')) {
      const cl = QUICK_REFERENCE_CHECKLISTS.teamfight;
      return {
        replyText: `Here is the official **${cl.title}**:\n\n${cl.items.map(i => `• ${i}`).join('\n')}`,
        tacticalCard: {
          title: cl.title,
          category: 'Combat Protocol',
          keyPoints: cl.items.slice(0, 4),
          actionItem: 'Confirm first-contact and trading partners prior to every breach.'
        }
      };
    }

    if (q.includes('vod') || q.includes('review') || q.includes('demo')) {
      const cl = QUICK_REFERENCE_CHECKLISTS.vod;
      return {
        replyText: `Here is the official **${cl.title}**:\n\n${cl.items.map(i => `• ${i}`).join('\n')}`,
        tacticalCard: {
          title: cl.title,
          category: 'Analytical Framework',
          keyPoints: cl.items.slice(0, 4),
          actionItem: 'Log timestamps and repeatable errors across minimum 3 scrim blocks.'
        }
      };
    }

    if (q.includes('tourney') || q.includes('tournament') || q.includes('lan')) {
      const cl = QUICK_REFERENCE_CHECKLISTS.tournament;
      return {
        replyText: `Here is the official **${cl.title}**:\n\n${cl.items.map(i => `• ${i}`).join('\n')}`,
        tacticalCard: {
          title: cl.title,
          category: 'Competitive Operations',
          keyPoints: cl.items.slice(0, 4),
          actionItem: 'Complete rulebook reading and technical verification before match day.'
        }
      };
    }

    if (q.includes('career') || q.includes('portfolio') || q.includes('scout') || q.includes('trial')) {
      const cl = QUICK_REFERENCE_CHECKLISTS.career;
      return {
        replyText: `Here is the official **${cl.title}**:\n\n${cl.items.map(i => `• ${i}`).join('\n')}`,
        tacticalCard: {
          title: cl.title,
          category: 'Scout Evaluation Matrix',
          keyPoints: cl.items.slice(0, 4),
          actionItem: 'Ensure verified digital passport reflects your latest match logs and team references.'
        }
      };
    }
  }

  // Check if user is asking for coaching rules
  if (q.includes('rule') || q.includes('rules') || q.includes('principles') || q.includes('coaching rule')) {
    const randomRules = AI_COACH_50_RULES.slice(0, 5);
    return {
      replyText: `Here are core competitive principles from the **Esports Coaching Standard**:\n\n${randomRules.map((r, i) => `${i + 1}. ${r}`).join('\n')}`,
      tacticalCard: {
        title: 'Core Coaching Principles',
        category: 'Esports Philosophy & Ethics',
        keyPoints: randomRules.slice(0, 3),
        actionItem: 'Focus on decision-making, information discipline, and long-term adaptation.'
      }
    };
  }

  // Default fallback grounded in the knowledge base
  return {
    replyText: `Competitive excellence requires separating individual mechanics from macro decision-making. Could you specify your game (BGMI, Free Fire MAX, or VALORANT) and the tactical scenario (e.g. rotation, compound breach, gloo-wall discipline, site retake, or scouting trials)?`,
    tacticalCard: {
      title: 'Tactical Query Optimization',
      category: 'Pro Tactical Advisory',
      keyPoints: [
        'Ask about BGMI: Erangel compounds, zone reading, vehicle convoys, Miramar ridges.',
        'Ask about Free Fire MAX: Gloo-wall peeks, Bermuda high-ground, Clash Squad economy, Rusher resets.',
        'Ask about VALORANT: Attack defaults, Bind teleporters, site retakes, duelist entry protocols.',
        'Ask about Careers: Scouting trials, contracts, player portfolios, tournament readiness.'
      ],
      actionItem: 'Select or type a specific tactical topic to retrieve the exact competitive playbook.'
    }
  };
}
