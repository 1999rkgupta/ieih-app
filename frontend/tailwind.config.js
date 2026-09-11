/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          cyan: 'var(--cyber-cyan)',
          blue: 'var(--cyber-blue)',
          purple: 'var(--cyber-purple)',
          violet: 'var(--cyber-violet)',
          pink: 'var(--cyber-pink)',
          red: 'var(--cyber-red)',
          gold: 'var(--cyber-gold)',
          emerald: 'var(--cyber-emerald)',
          lime: '#84CC16',
        },
        hud: {
          bg: 'var(--hud-bg)',
          surface: 'var(--hud-surface)',
          card: 'var(--hud-card)',
          panel: 'var(--hud-panel)',
          border: 'var(--hud-border)',
          borderGlow: 'var(--hud-border-glow)',
          text: 'var(--hud-text)',
          muted: 'var(--hud-muted)',
          dim: 'var(--hud-dim)',
        },
        surface: {
          base: 'var(--hud-bg)',
          card: 'var(--hud-card)',
          glass: 'var(--hud-surface)',
        },
        text: {
          primary: 'var(--hud-text)',
          secondary: 'var(--hud-muted)',
        },
        brand: {
          500: 'var(--cyber-cyan)',
        }
      },
      fontFamily: {
        orbitron: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        rajdhani: ['Inter', 'system-ui', 'sans-serif'],
        space: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass-sm': 'var(--shadow-glass-sm)',
        'glass-md': 'var(--shadow-glass-md)',
        'glass-lg': 'var(--shadow-glass-lg)',
        'cyan-glow': '0 4px 20px -2px rgba(14, 165, 233, 0.25)',
        'purple-glow': '0 4px 20px -2px rgba(139, 92, 246, 0.25)',
        'red-glow': '0 4px 20px -2px rgba(239, 68, 68, 0.25)',
        'gold-glow': '0 4px 20px -2px rgba(245, 158, 11, 0.25)',
        'hud-inner': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
      },
      backgroundImage: {
        'subtle-grid': 'radial-gradient(circle, var(--grid-dot-color) 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.25s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
