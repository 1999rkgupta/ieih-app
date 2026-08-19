# IEIH Esports Application

A comprehensive full-stack Esports Scouting, Player Recruitment, and Tactical AI Chat application. The platform consists of a React web frontend, a Node.js/Express backend server, and a mobile application built with Expo.

---

## 🎯 Purpose of the Application

The **IEIH Esports Hub** is designed to streamline esports team management and talent acquisition:
1. **Player Scouting & Recruitment:** Allows talent scouts and managers to view active player rosters and submit direct scouting offers.
2. **EEAI Tactical Chatbot:** An integrated AI assistant providing real-time gameplay tactical analysis and strategy suggestions for players and coaches.
3. **Multi-Platform Support:** Accessible via a responsive web interface (Netlify) and a native mobile application (Android/iOS via Expo).

---

## 📂 Project Structure

```text
ieih-app/
├── backend/                 # Node.js + Express + TypeScript Backend API
│   ├── src/                 # Source code (server, routes, controllers)
│   ├── tsconfig.json        # TypeScript configuration
│   └── package.json         # Backend dependencies & scripts
│
├── frontend/                # React + Vite + TypeScript Frontend Client
│   ├── src/                 # Client source code (components, API services)
│   ├── src/services/api.ts  # API communication service (Netlify/Local switch)
│   ├── tailwind.config.js   # Tailwind CSS styling configuration
│   └── package.json         # Frontend dependencies & scripts
│
├── mobile/                  # Expo (React Native) Mobile Application
│   ├── App.tsx              # Mobile entry point and UI screens
│   ├── app.json             # Expo project configuration
│   └── package.json         # Mobile dependencies & scripts
│
├── package.json             # Root-level configuration
└── README.md                # Documentation (this file)
```

---

## 🛠️ Technology Stack & Purpose

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Monorepo Structure** | Node.js | Unified project management and scripts. |
| **Backend** | Express | Handles REST API endpoints (health checks, players list, scout offers, AI chat). |
| **Backend** | TypeScript / `tsx` | Type-safety and modern ES module execution. |
| **Backend** | CORS & dotenv | Enables Cross-Origin requests and secures environment variables. |
| **Frontend** | React 19 | UI component architecture and state management. |
| **Frontend** | Vite | Ultra-fast local development server and bundler. |
| **Frontend** | Tailwind CSS | Utility-first styling for responsive layouts. |
| **Frontend** | Lucide React | Modern, lightweight iconography. |
| **Mobile** | Expo / React Native | Single codebase for compiling cross-platform iOS & Android mobile apps. |
| **Mobile** | EAS Build | Cloud compilation of release binaries (`.apk`, `.aab`, `.ipa`). |
| **Deployment** | Netlify | Automated continuous integration and web hosting. |
| **Deployment** | Render | Managed cloud hosting for the continuous Express backend service. |

---

## 🚀 Running the App Locally

### 1. Backend Server
```bash
cd backend
npm install
npm run dev   # Runs the Express server on port 5001
```

### 2. Frontend Client
```bash
cd frontend
npm install
npm run dev   # Runs Vite on http://localhost:5173
```

### 3. Mobile App
```bash
cd mobile
npm install
npx expo start # Opens Expo developer tools to run on Expo Go or Simulators
```
