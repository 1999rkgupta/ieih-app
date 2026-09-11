import { PlayerPassport } from '../types';
import { MOCK_PLAYERS } from '../data/mockData';

const PASSPORTS_KEY = 'ieih_passports_v1';
const CURRENT_USER_PASSPORT_ID_KEY = 'ieih_current_user_passport_id';
const SHORTLISTED_PLAYERS_KEY = 'ieih_shortlisted_players';
const REGISTERED_TOURNAMENTS_KEY = 'ieih_registered_tournaments';
const APPLIED_JOBS_KEY = 'ieih_applied_jobs';

export const getStoredPlayers = (): PlayerPassport[] => {
  try {
    const raw = localStorage.getItem(PASSPORTS_KEY);
    if (!raw) {
      localStorage.setItem(PASSPORTS_KEY, JSON.stringify(MOCK_PLAYERS));
      return MOCK_PLAYERS;
    }
    return JSON.parse(raw);
  } catch {
    return MOCK_PLAYERS;
  }
};

export const savePlayerPassport = (passport: PlayerPassport) => {
  const players = getStoredPlayers();
  const index = players.findIndex(p => p.id === passport.id);
  if (index >= 0) {
    players[index] = passport;
  } else {
    players.unshift(passport);
  }
  localStorage.setItem(PASSPORTS_KEY, JSON.stringify(players));
  localStorage.setItem(CURRENT_USER_PASSPORT_ID_KEY, passport.id);
};

export const getCurrentUserPassport = (): PlayerPassport => {
  const players = getStoredPlayers();
  const currentId = localStorage.getItem(CURRENT_USER_PASSPORT_ID_KEY);
  if (currentId) {
    const found = players.find(p => p.id === currentId);
    if (found) return found;
  }
  // Default to the first player
  return players[0];
};

export const getShortlistedPlayerIds = (): string[] => {
  try {
    const raw = localStorage.getItem(SHORTLISTED_PLAYERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const toggleShortlistPlayer = (playerId: string): boolean => {
  const list = getShortlistedPlayerIds();
  const index = list.indexOf(playerId);
  let isSaved = false;
  if (index >= 0) {
    list.splice(index, 1);
    isSaved = false;
  } else {
    list.push(playerId);
    isSaved = true;
  }
  localStorage.setItem(SHORTLISTED_PLAYERS_KEY, JSON.stringify(list));
  return isSaved;
};

export const getRegisteredTournamentIds = (): string[] => {
  try {
    const raw = localStorage.getItem(REGISTERED_TOURNAMENTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const registerForTournament = (tournamentId: string) => {
  const list = getRegisteredTournamentIds();
  if (!list.includes(tournamentId)) {
    list.push(tournamentId);
    localStorage.setItem(REGISTERED_TOURNAMENTS_KEY, JSON.stringify(list));
  }
};

export const getAppliedJobIds = (): string[] => {
  try {
    const raw = localStorage.getItem(APPLIED_JOBS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const applyForJob = (jobId: string) => {
  const list = getAppliedJobIds();
  if (!list.includes(jobId)) {
    list.push(jobId);
    localStorage.setItem(APPLIED_JOBS_KEY, JSON.stringify(list));
  }
};
