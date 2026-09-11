const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const fetchHealthCheck = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/health`);
    return await res.json();
  } catch (err) {
    return { status: 'OFFLINE', mode: 'Local Persistent Data Active' };
  }
};

export const fetchServerPlayers = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/players`);
    return await res.json();
  } catch (err) {
    return null;
  }
};

export const submitScoutOffer = async (offer: any) => {
  try {
    const res = await fetch(`${API_BASE_URL}/scout/offer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(offer)
    });
    return await res.json();
  } catch (err) {
    return { status: 'OFFLINE_SENT' };
  }
};

export const queryEEAITactical = async (query: string, gamerTag: string) => {
  try {
    const res = await fetch(`${API_BASE_URL}/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, gamerTag })
    });
    return await res.json();
  } catch (err) {
    return null;
  }
};
