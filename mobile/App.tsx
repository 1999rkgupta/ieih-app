import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import Svg, { Polygon } from "react-native-svg";

type GameType = "VALORANT" | "BGMI" | "CS2" | "FREE_FIRE";

interface Player {
  id: string;
  gamerTag: string;
  realName: string;
  avatarUrl: string;
  passportNumber: string;
  tier: string;
  level: number;
  currentXp: number;
  nextLevelXp: number;
  state: string;
  city: string;
  primaryGame: GameType;
  primaryRole: string;
  availability: string;
  isVerified: boolean;
  reputationScore: number;
  bio: string;
  kdRatio: number;
  winRate: string;
  headshotPct: string;
  mvpCount: number;
  scrimMmr: number;
  hoursPlayed: number;
  radarStats: {
    aim: number;
    gameSense: number;
    clutch: number;
    utility: number;
    comms: number;
    aggression: number;
  };
}

const INITIAL_PLAYERS: Player[] = [
  {
    id: "p1",
    gamerTag: "V4ND4L_K1NG",
    realName: 'Arjun "Arj" Sharma',
    avatarUrl:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&auto=format&fit=crop&q=80",
    passportNumber: "IND-ESP-2026-8801",
    tier: "Legend",
    level: 28,
    currentXp: 8450,
    nextLevelXp: 10000,
    state: "Maharashtra",
    city: "Mumbai",
    primaryGame: "VALORANT",
    primaryRole: "Duelist",
    availability: "Signed Roster",
    isVerified: true,
    reputationScore: 99,
    bio: "Top-tier Indian Valorant Duelist with over 4,500 hours in tactical FPS. Former Skyesports MVP.",
    kdRatio: 1.48,
    winRate: "71.4%",
    headshotPct: "38.6%",
    mvpCount: 214,
    scrimMmr: 2480,
    hoursPlayed: 4620,
    radarStats: {
      aim: 96,
      gameSense: 91,
      clutch: 94,
      utility: 85,
      comms: 90,
      aggression: 98,
    },
  },
  {
    id: "p2",
    gamerTag: "SH4DOW_IGL",
    realName: 'Kabir "Shadow" Verma',
    avatarUrl:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80",
    passportNumber: "IND-ESP-2026-7734",
    tier: "Legend",
    level: 25,
    currentXp: 7200,
    nextLevelXp: 9000,
    state: "Delhi NCR",
    city: "New Delhi",
    primaryGame: "BGMI",
    primaryRole: "IGL",
    availability: "LFG Pro Team",
    isVerified: true,
    reputationScore: 98,
    bio: "Calculated In-Game Leader with 5+ years of Tier-1 BGMI and PUBG Mobile competitive leadership.",
    kdRatio: 7.82,
    winRate: "68.9%",
    headshotPct: "35.4%",
    mvpCount: 198,
    scrimMmr: 2620,
    hoursPlayed: 5200,
    radarStats: {
      aim: 88,
      gameSense: 99,
      clutch: 92,
      utility: 94,
      comms: 98,
      aggression: 82,
    },
  },
  {
    id: "p3",
    gamerTag: "M4TR1X_SNIPER",
    realName: 'Rohan "Matrix" Nair',
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    passportNumber: "IND-ESP-2026-9042",
    tier: "Elite",
    level: 19,
    currentXp: 5100,
    nextLevelXp: 6500,
    state: "Karnataka",
    city: "Bengaluru",
    primaryGame: "VALORANT",
    primaryRole: "Sniper",
    availability: "LFG Scrims",
    isVerified: true,
    reputationScore: 96,
    bio: "College esports prodigy at PES University. 82% first blood success rate on defense with Operator.",
    kdRatio: 1.39,
    winRate: "67.2%",
    headshotPct: "41.2%",
    mvpCount: 110,
    scrimMmr: 2310,
    hoursPlayed: 2400,
    radarStats: {
      aim: 95,
      gameSense: 86,
      clutch: 90,
      utility: 80,
      comms: 88,
      aggression: 75,
    },
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<
    | "home"
    | "passport"
    | "discovery"
    | "tournaments"
    | "ai"
    | "careers"
    | "onboarding"
  >("home");
  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS);
  const [currentUser, setCurrentUser] = useState<Player>(INITIAL_PLAYERS[0]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player>(
    INITIAL_PLAYERS[0],
  );
  const [selectedGame, setSelectedGame] = useState<GameType>("VALORANT");
  const [passportSubTab, setPassportSubTab] = useState<
    "stats" | "trophies" | "tournaments" | "gear"
  >("stats");

  // Discovery Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGame, setFilterGame] = useState<string>("ALL");

  // Modals
  const [scoutModalPlayer, setScoutModalPlayer] = useState<Player | null>(null);
  const [shareModalPlayer, setShareModalPlayer] = useState<Player | null>(null);
  const [registeredTournaments, setRegisteredTournaments] = useState<string[]>(
    [],
  );
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  // EE AI Messages
  const [aiInput, setAiInput] = useState("");
  const [aiMessages, setAiMessages] = useState<
    Array<{ sender: "user" | "ai"; text: string }>
  >([
    {
      sender: "ai",
      text: "Tactical AI Online. Telemetry synchronized. How can I assist your competitive progression today?",
    },
  ]);

  // Onboarding Wizard State
  const [onboardStep, setOnboardStep] = useState(1);
  const [newGamerTag, setNewGamerTag] = useState("");
  const [newRealName, setNewRealName] = useState("");
  const [newGame, setNewGame] = useState<GameType>("VALORANT");
  const [newRole, setNewRole] = useState("Duelist");

  const handleSelectPlayerView = (p: Player) => {
    setSelectedPlayer(p);
    setActiveTab("passport");
  };

  const handleRegisterTournament = (tournId: string) => {
    if (!registeredTournaments.includes(tournId)) {
      setRegisteredTournaments([...registeredTournaments, tournId]);
      Alert.alert(
        "Squad Registered! 🏆",
        "Your team roster has been confirmed on the AWS Mumbai Server.",
      );
    }
  };

  const handleApplyJob = (jobId: string) => {
    if (!appliedJobs.includes(jobId)) {
      setAppliedJobs([...appliedJobs, jobId]);
      Alert.alert(
        "Application Transmitted! ⚡",
        "Your verified IEIH passport dossier has been sent to the recruiter.",
      );
    }
  };

  const handleSendAiMessage = () => {
    if (!aiInput.trim()) return;
    const userText = aiInput;
    setAiMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setAiInput("");

    setTimeout(() => {
      let reply =
        "Telemetry acknowledged. Focus on first-bullet accuracy drills and active tournament check-ins.";
      const lower = userText.toLowerCase();
      if (
        lower.includes("bgmi") ||
        lower.includes("igl") ||
        lower.includes("rotation")
      ) {
        reply =
          "For Tier-1 BGMI lobbies: prioritize early vehicle split (2-2 or 3-1 scout setup). Shift to compound control on Zone 3 shifts.";
      } else if (lower.includes("valorant") || lower.includes("duelist")) {
        reply =
          "For entry fraggers: Pair Jett/Raze with Fade or Sova recon dart utility to maximize entry kill percentage.";
      }
      setAiMessages((prev) => [...prev, { sender: "ai", text: reply }]);
    }, 600);
  };

  const handleFinishOnboarding = () => {
    const created: Player = {
      id: `p_new_${Date.now()}`,
      gamerTag: newGamerTag || "PIONEER_PRO",
      realName: newRealName || "Indian Contender",
      avatarUrl:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80",
      passportNumber: `IND-ESP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      tier: "Contender",
      level: 1,
      currentXp: 1200,
      nextLevelXp: 2500,
      state: "Maharashtra",
      city: "Mumbai",
      primaryGame: newGame,
      primaryRole: newRole,
      availability: "LFG Pro Team",
      isVerified: true,
      reputationScore: 95,
      bio: "Newly minted IEIH athlete ready for competitive scrims and regional tournaments.",
      kdRatio: 1.35,
      winRate: "65.0%",
      headshotPct: "32.0%",
      mvpCount: 12,
      scrimMmr: 2100,
      hoursPlayed: 450,
      radarStats: {
        aim: 88,
        gameSense: 86,
        clutch: 85,
        utility: 82,
        comms: 90,
        aggression: 89,
      },
    };

    setPlayers([created, ...players]);
    setCurrentUser(created);
    setSelectedPlayer(created);
    setOnboardStep(1);
    setActiveTab("passport");
    Alert.alert(
      "Passport Activated! 🎉",
      `Welcome Athlete ${created.gamerTag}. Level 1 Passport minted (+1,200 XP).`,
    );
  };

  const filteredDiscoveryPlayers = players.filter((p) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (
        !p.gamerTag.toLowerCase().includes(q) &&
        !p.realName.toLowerCase().includes(q) &&
        !p.state.toLowerCase().includes(q)
      )
        return false;
    }
    if (filterGame !== "ALL" && p.primaryGame !== filterGame) return false;
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#07070D" />

      {/* Top Mobile HUD Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.logoRow}
          onPress={() => setActiveTab("home")}
        >
          <View style={styles.badgeBox}>
            <Text style={styles.logoText}>IEIH</Text>
          </View>
          <View>
            <Text style={styles.headerTitle}>INDIA ESPORTS HUB</Text>
            <Text style={styles.headerSub}>OFFICIAL PASSPORT ARENA</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.profilePill}
            onPress={() => handleSelectPlayerView(currentUser)}
          >
            <Image
              source={{ uri: currentUser.avatarUrl }}
              style={styles.headerAvatar}
            />
            <Text style={styles.headerGamerTag}>{currentUser.gamerTag}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Top Ticker Marquee */}
      <View style={styles.tickerBar}>
        <View style={styles.liveDot} />
        <Text style={styles.tickerText}>
          🔴 BGMI Pro League S4 Finals Live • Skyesports Hyderabad LAN
          Registrations Open (₹50 Lakhs)
        </Text>
      </View>

      {/* Scrollable Navigation Tab Bar */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabBar}
      >
        {[
          { id: "home", label: "HUB" },
          { id: "passport", label: "PASSPORT" },
          { id: "discovery", label: "TALENT RADAR" },
          { id: "tournaments", label: "TOURNAMENTS" },
          { id: "ai", label: "EE AI" },
          { id: "careers", label: "CAREERS" },
          { id: "onboarding", label: "MINT PASSPORT" },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => setActiveTab(tab.id as any)}
            style={[
              styles.tabButton,
              activeTab === tab.id && styles.tabButtonActive,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.id && styles.tabTextActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Screen Body */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentInner}
      >
        {/* TAB 1: HUB / HOME DASHBOARD */}
        {activeTab === "home" && (
          <View style={styles.spaceGap}>
            <View style={styles.heroBox}>
              <Text style={styles.heroBadge}>INDIA ESPORTS INNOVATION HUB</Text>
              <Text style={styles.heroTitle}>
                DISCOVER • DEVELOP • VERIFY • CONNECT
              </Text>
              <Text style={styles.heroSub}>
                The digital gaming passport & tournament network for Indian
                esports athletes, teams, and university clubs.
              </Text>
              <View style={styles.heroBtnRow}>
                <TouchableOpacity
                  style={styles.btnPrimary}
                  onPress={() => setActiveTab("onboarding")}
                >
                  <Text style={styles.btnPrimaryText}>
                    MINT PASSPORT (+1,200 XP)
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnSecondary}
                  onPress={() => setActiveTab("discovery")}
                >
                  <Text style={styles.btnSecondaryText}>SCOUT TALENT</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Telemetry Stats */}
            <View style={styles.statsRow}>
              <View style={styles.miniStatCard}>
                <Text style={styles.miniStatNum}>18,450+</Text>
                <Text style={styles.miniStatLabel}>VERIFIED ATHLETES</Text>
              </View>
              <View style={styles.miniStatCard}>
                <Text style={[styles.miniStatNum, { color: "#FFB800" }]}>
                  ₹14.8 Cr+
                </Text>
                <Text style={styles.miniStatLabel}>ESCROW PRIZING</Text>
              </View>
              <View style={styles.miniStatCard}>
                <Text style={[styles.miniStatNum, { color: "#8B5CF6" }]}>
                  450+ Orgs
                </Text>
                <Text style={styles.miniStatLabel}>SCOUTING TEAMS</Text>
              </View>
            </View>

            {/* Spotlight Athletes */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                SPOTLIGHT VERIFIED ATHLETES
              </Text>
            </View>
            {players.slice(0, 2).map((p) => (
              <TouchableOpacity
                key={p.id}
                style={styles.playerListItem}
                onPress={() => handleSelectPlayerView(p)}
              >
                <Image source={{ uri: p.avatarUrl }} style={styles.avatarMed} />
                <View style={styles.flex1}>
                  <Text style={styles.gamerTagText}>{p.gamerTag} ✔</Text>
                  <Text style={styles.subText}>
                    {p.realName} • {p.state}
                  </Text>
                  <Text style={styles.pillText}>
                    {p.primaryGame} • {p.primaryRole} • Level {p.level}
                  </Text>
                </View>
                <Text style={styles.arrowText}>PASSPORT →</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* TAB 2: E-PLAYER PASSPORT */}
        {activeTab === "passport" && (
          <View style={styles.spaceGap}>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.passportNum}>
                  {selectedPlayer.passportNumber}
                </Text>
                <Text style={styles.tierTag}>
                  {selectedPlayer.tier.toUpperCase()} TIER
                </Text>
              </View>

              <View style={styles.profileRow}>
                <View style={[styles.avatarLg, { backgroundColor: '#1E293B', alignItems: 'center', justifyContent: 'center', borderRadius: 32, borderColor: '#334155' }]}>
                  <Text style={{ fontSize: 26, color: '#94A3B8' }}>👤</Text>
                </View>
                <View style={styles.profileInfo}>
                  <Text style={styles.gamerTagMain}>
                    {selectedPlayer.gamerTag} ✔
                  </Text>
                  <Text style={styles.realName}>
                    {selectedPlayer.realName} • {selectedPlayer.city},{" "}
                    {selectedPlayer.state}
                  </Text>
                  <Text style={styles.repText}>
                    Reputation: {selectedPlayer.reputationScore}/100 •{" "}
                    {selectedPlayer.availability}
                  </Text>
                </View>
              </View>

              {/* Action buttons */}
              <View style={styles.actionBtnRow}>
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => setScoutModalPlayer(selectedPlayer)}
                >
                  <Text style={styles.actionBtnText}>⚡ SCOUT OFFER</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionBtnOutline}
                  onPress={() => setShareModalPlayer(selectedPlayer)}
                >
                  <Text style={styles.actionBtnOutlineText}>SHARE</Text>
                </TouchableOpacity>
              </View>

              {/* Bio */}
              <Text style={styles.bioText}>{selectedPlayer.bio}</Text>

              {/* Game Selector */}
              <View style={styles.gameSelector}>
                {(["VALORANT", "BGMI", "CS2", "FREE_FIRE"] as GameType[]).map(
                  (g) => (
                    <TouchableOpacity
                      key={g}
                      onPress={() => setSelectedGame(g)}
                      style={[
                        styles.gamePill,
                        selectedGame === g && styles.gamePillActive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.gamePillText,
                          selectedGame === g && styles.gamePillTextActive,
                        ]}
                      >
                        {g}
                      </Text>
                    </TouchableOpacity>
                  ),
                )}
              </View>

              {/* Combat Stats Grid */}
              <View style={styles.statsGrid}>
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>K/D RATIO</Text>
                  <Text style={styles.statVal}>{selectedPlayer.kdRatio}</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>WIN RATE</Text>
                  <Text style={[styles.statVal, { color: "#10B981" }]}>
                    {selectedPlayer.winRate}
                  </Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>HEADSHOT %</Text>
                  <Text style={[styles.statVal, { color: "#8B5CF6" }]}>
                    {selectedPlayer.headshotPct}
                  </Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>MVPs</Text>
                  <Text style={[styles.statVal, { color: "#FFB800" }]}>
                    {selectedPlayer.mvpCount} 🏆
                  </Text>
                </View>
              </View>

              {/* 6-Axis Tactical Radar SVG */}
              <View style={styles.radarBox}>
                <Text style={styles.radarTitle}>TACTICAL RADAR MATRIX</Text>
                <Svg height="180" width="180" viewBox="0 0 200 200">
                  <Polygon
                    points="100,20 170,60 170,140 100,180 30,140 30,60"
                    fill="none"
                    stroke="rgba(0,240,255,0.3)"
                    strokeWidth="1"
                  />
                  <Polygon
                    points="100,50 145,75 145,125 100,150 55,125 55,75"
                    fill="none"
                    stroke="rgba(0,240,255,0.2)"
                    strokeWidth="1"
                  />
                  <Polygon
                    points="100,30 160,65 162,135 100,170 40,135 40,65"
                    fill="rgba(0,240,255,0.25)"
                    stroke="#00F0FF"
                    strokeWidth="2"
                  />
                </Svg>
              </View>
            </View>
          </View>
        )}

        {/* TAB 3: TALENT DISCOVERY & SCOUT ENGINE */}
        {activeTab === "discovery" && (
          <View style={styles.spaceGap}>
            <Text style={styles.cardTitle}>TALENT DISCOVERY RADAR</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Gamertag, Real Name, State..."
              placeholderTextColor="#8E9BB0"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            {/* Filter Pills */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.filterScroll}
            >
              {["ALL", "VALORANT", "BGMI", "CS2"].map((g) => (
                <TouchableOpacity
                  key={g}
                  onPress={() => setFilterGame(g)}
                  style={[
                    styles.filterPill,
                    filterGame === g && styles.filterPillActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterPillText,
                      filterGame === g && styles.filterPillTextActive,
                    ]}
                  >
                    {g}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Player Cards */}
            {filteredDiscoveryPlayers.map((p) => (
              <View key={p.id} style={styles.discoveryCard}>
                <View style={styles.profileRow}>
                  <Image
                    source={{ uri: p.avatarUrl }}
                    style={styles.avatarMed}
                  />
                  <View style={styles.flex1}>
                    <Text style={styles.gamerTagText}>{p.gamerTag} ✔</Text>
                    <Text style={styles.subText}>
                      {p.realName} • {p.state}
                    </Text>
                    <Text style={styles.pillText}>
                      {p.primaryGame} • {p.primaryRole} • K/D: {p.kdRatio}
                    </Text>
                  </View>
                  <View style={styles.matchPill}>
                    <Text style={styles.matchText}>96% MATCH</Text>
                  </View>
                </View>

                {/* HUD Segmented Meter (10 glowing bars) */}
                <View style={styles.meterRow}>
                  {Array.from({ length: 10 }).map((_, idx) => (
                    <View
                      key={idx}
                      style={[
                        styles.meterBar,
                        idx < 9 && styles.meterBarFilled,
                      ]}
                    />
                  ))}
                </View>

                <View style={styles.cardFooter}>
                  <TouchableOpacity
                    style={styles.smBtn}
                    onPress={() => setScoutModalPlayer(p)}
                  >
                    <Text style={styles.smBtnText}>SCOUT OFFER</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.smBtnCyan}
                    onPress={() => handleSelectPlayerView(p)}
                  >
                    <Text style={styles.smBtnCyanText}>VIEW PASSPORT →</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* TAB 4: TOURNAMENT HUB */}
        {activeTab === "tournaments" && (
          <View style={styles.spaceGap}>
            <Text style={styles.cardTitle}>NATIONAL TOURNAMENT HUB</Text>

            {/* Event 1 */}
            <View style={styles.tournCard}>
              <View style={styles.tournBadgeRow}>
                <Text style={styles.liveTag}>LIVE 🔴</Text>
                <Text style={styles.gameTag}>VALORANT</Text>
              </View>
              <Text style={styles.tournTitle}>
                Skyesports Masters LAN Hyderabad 2026
              </Text>
              <Text style={styles.tournPrize}>₹50,00,000 Total Prize Pool</Text>
              <Text style={styles.trustAudit}>
                Organizer Trust Score: 98/100 (Tier 1 Verified)
              </Text>
              <Text style={styles.bracketsText}>
                Format: Swiss Stage ➔ Top 16 Double Bracket
              </Text>

              <TouchableOpacity
                style={styles.registerBtn}
                onPress={() => handleRegisterTournament("t1")}
              >
                <Text style={styles.registerBtnText}>
                  {registeredTournaments.includes("t1")
                    ? "✔ SQUAD REGISTERED"
                    : "1-CLICK REGISTER SQUAD"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Event 2 */}
            <View style={styles.tournCard}>
              <View style={styles.tournBadgeRow}>
                <Text style={styles.liveTag}>REGISTRATION OPEN</Text>
                <Text style={styles.gameTag}>BGMI</Text>
              </View>
              <Text style={styles.tournTitle}>
                Krafton India BGMI Pro League — Season 4
              </Text>
              <Text style={styles.tournPrize}>
                ₹2,00,00,000 Total Prize Pool
              </Text>
              <Text style={styles.trustAudit}>
                Organizer Trust Score: 99/100 (Krafton Verified)
              </Text>

              <TouchableOpacity
                style={styles.registerBtn}
                onPress={() => handleRegisterTournament("t2")}
              >
                <Text style={styles.registerBtnText}>
                  {registeredTournaments.includes("t2")
                    ? "✔ SQUAD REGISTERED"
                    : "1-CLICK REGISTER SQUAD"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* TAB 5: EE AI TACTICAL ASSISTANT */}
        {activeTab === "ai" && (
          <View style={styles.spaceGap}>
            <Text style={styles.cardTitle}>EE AI TACTICAL COMPANION</Text>
            <View style={styles.chatBox}>
              {aiMessages.map((m, idx) => (
                <View
                  key={idx}
                  style={m.sender === "user" ? styles.msgUser : styles.msgAi}
                >
                  <Text
                    style={
                      m.sender === "user"
                        ? styles.msgUserText
                        : styles.msgAiText
                    }
                  >
                    {m.sender === "ai" ? "🤖 EE AI: " : ""}
                    {m.text}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.inputRow}>
              <TextInput
                style={styles.chatInput}
                placeholder="Ask tactical advice (BGMI IGL rotations, Valorant agent pools)..."
                placeholderTextColor="#8E9BB0"
                value={aiInput}
                onChangeText={setAiInput}
              />
              <TouchableOpacity
                style={styles.sendBtn}
                onPress={handleSendAiMessage}
              >
                <Text style={styles.sendBtnText}>SEND</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* TAB 6: CAREERS & CAMPUS */}
        {activeTab === "careers" && (
          <View style={styles.spaceGap}>
            <Text style={styles.cardTitle}>CAREERS & COLLEGIATE CHAPTERS</Text>

            {/* Job 1 */}
            <View style={styles.jobCard}>
              <Text style={styles.jobOrg}>Revenant Velocity</Text>
              <Text style={styles.jobTitle}>
                Tier-1 Starting Duelist / Entry Fragger
              </Text>
              <Text style={styles.jobPay}>
                ₹65,000 - ₹95,000 / month + 80% Prizepool Split
              </Text>
              <TouchableOpacity
                style={styles.applyBtn}
                onPress={() => handleApplyJob("j1")}
              >
                <Text style={styles.applyBtnText}>
                  {appliedJobs.includes("j1")
                    ? "✔ PASSPORT DOSSIER SUBMITTED"
                    : "APPLY WITH PASSPORT"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Job 2 */}
            <View style={styles.jobCard}>
              <Text style={styles.jobOrg}>GodLike Esports</Text>
              <Text style={styles.jobTitle}>
                Head Tactical Coach & Scrim Analyst
              </Text>
              <Text style={styles.jobPay}>₹80,000 - ₹1,20,000 / month</Text>
              <TouchableOpacity
                style={styles.applyBtn}
                onPress={() => handleApplyJob("j2")}
              >
                <Text style={styles.applyBtnText}>
                  {appliedJobs.includes("j2")
                    ? "✔ PASSPORT DOSSIER SUBMITTED"
                    : "APPLY WITH PASSPORT"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Campus Chapter */}
            <View style={styles.campusCard}>
              <Text style={styles.campusTitle}>IIT BOMBAY GAMING CLUB</Text>
              <Text style={styles.subText}>
                Rank #1 National Campus Guild • 68 Student Athletes
              </Text>
              <Text style={styles.trustAudit}>
                Official Inter-University Championship Chapter
              </Text>
            </View>
          </View>
        )}

        {/* TAB 7: MINT PASSPORT ONBOARDING WIZARD */}
        {activeTab === "onboarding" && (
          <View style={styles.spaceGap}>
            <Text style={styles.cardTitle}>
              LEVEL 1 CHARACTER SETUP — STEP {onboardStep} OF 3
            </Text>

            {onboardStep === 1 && (
              <View style={styles.onboardBox}>
                <Text style={styles.label}>COMPETITIVE GAMERTAG *</Text>
                <TextInput
                  style={styles.onboardInput}
                  placeholder="e.g. PHANTOM_K1NG"
                  placeholderTextColor="#8E9BB0"
                  value={newGamerTag}
                  onChangeText={setNewGamerTag}
                />

                <Text style={styles.label}>REAL NAME *</Text>
                <TextInput
                  style={styles.onboardInput}
                  placeholder="e.g. Aryan Malhotra"
                  placeholderTextColor="#8E9BB0"
                  value={newRealName}
                  onChangeText={setNewRealName}
                />

                <TouchableOpacity
                  style={styles.btnPrimary}
                  onPress={() => setOnboardStep(2)}
                >
                  <Text style={styles.btnPrimaryText}>CONTINUE STEP 2 →</Text>
                </TouchableOpacity>
              </View>
            )}

            {onboardStep === 2 && (
              <View style={styles.onboardBox}>
                <Text style={styles.label}>SELECT PRIMARY GAME</Text>
                <View style={styles.gamePillRow}>
                  {(["VALORANT", "BGMI", "CS2", "FREE_FIRE"] as GameType[]).map(
                    (g) => (
                      <TouchableOpacity
                        key={g}
                        onPress={() => setNewGame(g)}
                        style={[
                          styles.gamePill,
                          newGame === g && styles.gamePillActive,
                        ]}
                      >
                        <Text
                          style={[
                            styles.gamePillText,
                            newGame === g && styles.gamePillTextActive,
                          ]}
                        >
                          {g}
                        </Text>
                      </TouchableOpacity>
                    ),
                  )}
                </View>

                <Text style={styles.label}>PRIMARY ROLE</Text>
                <TextInput
                  style={styles.onboardInput}
                  placeholder="e.g. Duelist / IGL / Sniper"
                  placeholderTextColor="#8E9BB0"
                  value={newRole}
                  onChangeText={setNewRole}
                />

                <TouchableOpacity
                  style={styles.btnPrimary}
                  onPress={() => setOnboardStep(3)}
                >
                  <Text style={styles.btnPrimaryText}>CONTINUE STEP 3 →</Text>
                </TouchableOpacity>
              </View>
            )}

            {onboardStep === 3 && (
              <View style={styles.onboardBox}>
                <Text style={styles.heroBadge}>
                  IDENTITY & KYC SEAL ATTESTED
                </Text>
                <Text style={styles.gamerTagMain}>
                  {newGamerTag || "PIONEER_PRO"}
                </Text>
                <Text style={styles.subText}>
                  {newGame} • {newRole} • Level 1 Contender
                </Text>

                <TouchableOpacity
                  style={styles.btnPrimary}
                  onPress={handleFinishOnboarding}
                >
                  <Text style={styles.btnPrimaryText}>
                    MINT & ACTIVATE PASSPORT (+1,200 XP)
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* Scout Trial Modal */}
      <Modal visible={!!scoutModalPlayer} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Text style={styles.cardTitle}>
              SEND SCOUT OFFER TO {scoutModalPlayer?.gamerTag}
            </Text>
            <Text style={styles.subText}>
              Position: {scoutModalPlayer?.primaryGame} (
              {scoutModalPlayer?.primaryRole})
            </Text>
            <TextInput
              style={styles.onboardInput}
              placeholder="Stipend e.g. ₹45,000 / month + prizepool split"
              placeholderTextColor="#8E9BB0"
              defaultValue="₹45,000 / month + prizepool split"
            />
            <TouchableOpacity
              style={styles.btnPrimary}
              onPress={() => {
                Alert.alert(
                  "Scout Offer Sent! ⚡",
                  `Offer sent to ${scoutModalPlayer?.gamerTag}'s verified IEIH inbox.`,
                );
                setScoutModalPlayer(null);
              }}
            >
              <Text style={styles.btnPrimaryText}>TRANSMIT OFFER</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setScoutModalPlayer(null)}
            >
              <Text style={styles.closeBtnText}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Share Passport Modal */}
      <Modal visible={!!shareModalPlayer} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Text style={styles.cardTitle}>VERIFIED PASSPORT LINK</Text>
            <Text style={styles.passportNum}>
              https://ieih.esports/passport/
              {shareModalPlayer?.passportNumber.toLowerCase()}
            </Text>
            <TouchableOpacity
              style={styles.btnPrimary}
              onPress={() => {
                Alert.alert(
                  "Link Copied! 📋",
                  "Verified passport URL copied to clipboard.",
                );
                setShareModalPlayer(null);
              }}
            >
              <Text style={styles.btnPrimaryText}>COPY LINK</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setShareModalPlayer(null)}
            >
              <Text style={styles.closeBtnText}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#07070D" },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#242848",
  },
  logoRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  badgeBox: {
    backgroundColor: "#121426",
    borderWidth: 1,
    borderColor: "#00F0FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  logoText: { color: "#00F0FF", fontWeight: "bold", fontSize: 14 },
  headerTitle: { color: "#F1F5F9", fontWeight: "bold", fontSize: 12 },
  headerSub: { color: "#8E9BB0", fontSize: 9 },
  headerRight: { flexDirection: "row", alignItems: "center" },
  profilePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#121426",
    padding: 4,
    paddingRight: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#00F0FF",
  },
  headerAvatar: { width: 24, height: 24, borderRadius: 12 },
  headerGamerTag: { color: "#00F0FF", fontWeight: "bold", fontSize: 11 },
  tickerBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#0D0E1A",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#242848",
  },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#FF4655" },
  tickerText: { color: "#8E9BB0", fontSize: 10, flex: 1 },
  tabBar: {
    backgroundColor: "#0D0E1A",
    borderBottomWidth: 1,
    borderBottomColor: "#242848",
  },
  tabButton: { paddingHorizontal: 16, paddingVertical: 10 },
  tabButtonActive: { borderBottomWidth: 2, borderBottomColor: "#00F0FF" },
  tabText: { color: "#8E9BB0", fontSize: 11, fontWeight: "bold" },
  tabTextActive: { color: "#00F0FF" },
  content: { flex: 1 },
  contentInner: { padding: 16 },
  spaceGap: { gap: 16 },
  heroBox: {
    backgroundColor: "#0D0E1A",
    borderWidth: 1,
    borderColor: "#00F0FF",
    borderRadius: 20,
    padding: 20,
    gap: 10,
  },
  heroBadge: { color: "#00F0FF", fontSize: 10, fontWeight: "bold" },
  heroTitle: {
    color: "#F1F5F9",
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 26,
  },
  heroSub: { color: "#8E9BB0", fontSize: 12, lineHeight: 18 },
  heroBtnRow: { flexDirection: "row", gap: 10, marginTop: 8 },
  btnPrimary: {
    flex: 1,
    backgroundColor: "#00F0FF",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  btnPrimaryText: { color: "#000000", fontWeight: "bold", fontSize: 12 },
  btnSecondary: {
    paddingHorizontal: 16,
    backgroundColor: "#121426",
    borderWidth: 1,
    borderColor: "#242848",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  btnSecondaryText: { color: "#F1F5F9", fontWeight: "bold", fontSize: 12 },
  statsRow: { flexDirection: "row", gap: 8 },
  miniStatCard: {
    flex: 1,
    backgroundColor: "#0D0E1A",
    borderWidth: 1,
    borderColor: "#242848",
    borderRadius: 12,
    padding: 10,
  },
  miniStatNum: { color: "#00F0FF", fontWeight: "bold", fontSize: 16 },
  miniStatLabel: { color: "#8E9BB0", fontSize: 8, marginTop: 2 },
  sectionHeader: { marginTop: 8 },
  sectionTitle: { color: "#F1F5F9", fontSize: 14, fontWeight: "bold" },
  playerListItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#0D0E1A",
    borderWidth: 1,
    borderColor: "#242848",
    borderRadius: 14,
    padding: 12,
  },
  avatarMed: { width: 44, height: 44, borderRadius: 10 },
  avatarLg: {
    width: 64,
    height: 64,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#00F0FF",
  },
  flex1: { flex: 1 },
  gamerTagText: { color: "#F1F5F9", fontWeight: "bold", fontSize: 15 },
  subText: { color: "#8E9BB0", fontSize: 11, marginTop: 1 },
  pillText: {
    color: "#8B5CF6",
    fontSize: 10,
    marginTop: 2,
    fontWeight: "bold",
  },
  arrowText: { color: "#00F0FF", fontWeight: "bold", fontSize: 11 },
  card: {
    backgroundColor: "#0D0E1A",
    borderWidth: 1,
    borderColor: "#242848",
    borderRadius: 18,
    padding: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justify: "space-between",
    marginBottom: 12,
  },
  passportNum: { color: "#00F0FF", fontWeight: "bold", fontSize: 13 },
  tierTag: { color: "#8B5CF6", fontWeight: "bold", fontSize: 11 },
  profileRow: { flexDirection: "row", gap: 12, marginBottom: 12 },
  profileInfo: { flex: 1 },
  gamerTagMain: { color: "#F1F5F9", fontWeight: "bold", fontSize: 20 },
  realName: { color: "#8E9BB0", fontSize: 12 },
  repText: { color: "#FFB800", fontSize: 11, fontWeight: "bold", marginTop: 2 },
  actionBtnRow: { flexDirection: "row", gap: 8, marginBottom: 12 },
  actionBtn: {
    flex: 1,
    backgroundColor: "#00F0FF",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  actionBtnText: { color: "#000000", fontWeight: "bold", fontSize: 11 },
  actionBtnOutline: {
    paddingHorizontal: 16,
    backgroundColor: "#121426",
    borderWidth: 1,
    borderColor: "#242848",
    borderRadius: 8,
    justifyContent: "center",
  },
  actionBtnOutlineText: { color: "#F1F5F9", fontWeight: "bold", fontSize: 11 },
  bioText: { color: "#8E9BB0", fontSize: 12, lineHeight: 16, marginBottom: 12 },
  gameSelector: { flexDirection: "row", gap: 6, marginBottom: 14 },
  gamePill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#121426",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#242848",
  },
  gamePillActive: {
    borderColor: "#00F0FF",
    backgroundColor: "rgba(0, 240, 255, 0.15)",
  },
  gamePillText: { color: "#8E9BB0", fontSize: 10, fontWeight: "bold" },
  gamePillTextActive: { color: "#00F0FF" },
  statsGrid: { flexDirection: "row", gap: 6, marginBottom: 14 },
  statBox: {
    flex: 1,
    backgroundColor: "#121426",
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#242848",
  },
  statLabel: { color: "#8E9BB0", fontSize: 8, fontWeight: "bold" },
  statVal: { color: "#F1F5F9", fontSize: 14, fontWeight: "bold", marginTop: 2 },
  radarBox: { alignItems: "center", paddingVertical: 8 },
  radarTitle: {
    color: "#00F0FF",
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 6,
  },
  cardTitle: { color: "#F1F5F9", fontSize: 15, fontWeight: "bold" },
  searchInput: {
    backgroundColor: "#0D0E1A",
    borderWidth: 1,
    borderColor: "#242848",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: "#F1F5F9",
    fontSize: 12,
  },
  filterScroll: { flexDirection: "row", marginVertical: 4 },
  filterPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: "#0D0E1A",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#242848",
    marginRight: 8,
  },
  filterPillActive: {
    borderColor: "#00F0FF",
    backgroundColor: "rgba(0,240,255,0.15)",
  },
  filterPillText: { color: "#8E9BB0", fontSize: 11, fontWeight: "bold" },
  filterPillTextActive: { color: "#00F0FF" },
  discoveryCard: {
    backgroundColor: "#0D0E1A",
    borderWidth: 1,
    borderColor: "#242848",
    borderRadius: 16,
    padding: 14,
    gap: 10,
  },
  matchPill: {
    backgroundColor: "rgba(0,240,255,0.15)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  matchText: { color: "#00F0FF", fontSize: 10, fontWeight: "bold" },
  meterRow: { flexDirection: "row", gap: 3, height: 6 },
  meterBar: { flex: 1, backgroundColor: "#121426", borderRadius: 2 },
  meterBarFilled: { backgroundColor: "#00F0FF" },
  cardFooter: { flexDirection: "row", gap: 8, marginTop: 4 },
  smBtn: {
    flex: 1,
    backgroundColor: "#121426",
    borderWidth: 1,
    borderColor: "#242848",
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: "center",
  },
  smBtnText: { color: "#F1F5F9", fontSize: 10, fontWeight: "bold" },
  smBtnCyan: {
    flex: 1,
    backgroundColor: "rgba(0,240,255,0.15)",
    borderWidth: 1,
    borderColor: "#00F0FF",
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: "center",
  },
  smBtnCyanText: { color: "#00F0FF", fontSize: 10, fontWeight: "bold" },
  tournCard: {
    backgroundColor: "#0D0E1A",
    borderWidth: 1,
    borderColor: "#242848",
    borderRadius: 16,
    padding: 16,
    gap: 8,
  },
  tournBadgeRow: { flexDirection: "row", gap: 8 },
  liveTag: { color: "#FF4655", fontSize: 10, fontWeight: "bold" },
  gameTag: { color: "#00F0FF", fontSize: 10, fontWeight: "bold" },
  tournTitle: { color: "#F1F5F9", fontSize: 16, fontWeight: "bold" },
  tournPrize: { color: "#FFB800", fontSize: 14, fontWeight: "bold" },
  trustAudit: { color: "#00F0FF", fontSize: 11 },
  bracketsText: { color: "#8E9BB0", fontSize: 11 },
  registerBtn: {
    backgroundColor: "#00F0FF",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 4,
  },
  registerBtnText: { color: "#000000", fontWeight: "bold", fontSize: 12 },
  chatBox: {
    backgroundColor: "#0D0E1A",
    borderWidth: 1,
    borderColor: "#242848",
    borderRadius: 16,
    padding: 14,
    height: 260,
    gap: 10,
  },
  msgUser: {
    alignSelf: "flex-end",
    backgroundColor: "rgba(0,240,255,0.15)",
    padding: 10,
    borderRadius: 10,
    maxWidth: "85%",
  },
  msgUserText: { color: "#00F0FF", fontSize: 12 },
  msgAi: {
    alignSelf: "flex-start",
    backgroundColor: "#121426",
    padding: 10,
    borderRadius: 10,
    maxWidth: "85%",
  },
  msgAiText: { color: "#F1F5F9", fontSize: 12, lineHeight: 16 },
  inputRow: { flexDirection: "row", gap: 8 },
  chatInput: {
    flex: 1,
    backgroundColor: "#0D0E1A",
    borderWidth: 1,
    borderColor: "#242848",
    borderRadius: 12,
    paddingHorizontal: 14,
    color: "#F1F5F9",
    fontSize: 12,
  },
  sendBtn: {
    backgroundColor: "#8B5CF6",
    paddingHorizontal: 16,
    justifyContent: "center",
    borderRadius: 12,
  },
  sendBtnText: { color: "#FFFFFF", fontWeight: "bold", fontSize: 11 },
  jobCard: {
    backgroundColor: "#0D0E1A",
    borderWidth: 1,
    borderColor: "#242848",
    borderRadius: 16,
    padding: 16,
    gap: 6,
  },
  jobOrg: { color: "#00F0FF", fontSize: 11, fontWeight: "bold" },
  jobTitle: { color: "#F1F5F9", fontSize: 15, fontWeight: "bold" },
  jobPay: { color: "#10B981", fontSize: 12, fontWeight: "bold" },
  applyBtn: {
    backgroundColor: "#121426",
    borderWidth: 1,
    borderColor: "#00F0FF",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 6,
  },
  applyBtnText: { color: "#00F0FF", fontWeight: "bold", fontSize: 11 },
  campusCard: {
    backgroundColor: "#0D0E1A",
    borderWidth: 1,
    borderColor: "#8B5CF6",
    borderRadius: 16,
    padding: 16,
    gap: 6,
  },
  campusTitle: { color: "#8B5CF6", fontSize: 14, fontWeight: "bold" },
  onboardBox: {
    backgroundColor: "#0D0E1A",
    borderWidth: 1,
    borderColor: "#00F0FF",
    borderRadius: 16,
    padding: 16,
    gap: 10,
  },
  label: { color: "#8E9BB0", fontSize: 10, fontWeight: "bold" },
  onboardInput: {
    backgroundColor: "#121426",
    borderWidth: 1,
    borderColor: "#242848",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: "#F1F5F9",
    fontSize: 12,
  },
  gamePillRow: { flexDirection: "row", gap: 6, marginVertical: 4 },
  modalBg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    padding: 20,
  },
  modalCard: {
    backgroundColor: "#0D0E1A",
    borderWidth: 1,
    borderColor: "#00F0FF",
    borderRadius: 18,
    padding: 20,
    gap: 12,
  },
  closeBtn: { alignItems: "center", paddingVertical: 8 },
  closeBtnText: { color: "#8E9BB0", fontWeight: "bold", fontSize: 11 },
});
