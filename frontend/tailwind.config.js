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
        sky: {
          50: '#f4f8f7',
          100: '#e5efe9',
          200: '#cce2d9',
          300: '#afd2c6',
          400: '#91baaf', // Primary User Color #91baaf
          500: '#71a396',
          600: '#58867b',
          700: '#466b62',
          800: '#3a564f',
          900: '#324843',
          950: '#1a2a26',
        },
        sage: {
          50: '#f4f8f7',
          100: '#e5efe9',
          200: '#cce2d9',
          300: '#afd2c6',
          400: '#91baaf',
          500: '#71a396',
          600: '#58867b',
          700: '#466b62',
          800: '#3a564f',
          900: '#324843',
          950: '#1a2a26',
        },
        cyber: {
          cyan: '#91baaf',
          blue: '#71a396',
          purple: '#58867b',
          violet: '#466b62',
          pink: '#e11d48',
          red: '#dc2626',
          gold: '#d97706',
          emerald: '#71a396',
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
          50: '#f4f8f7',
          100: '#e5efe9',
          200: '#cce2d9',
          300: '#afd2c6',
          400: '#91baaf',
          500: '#71a396',
          600: '#58867b',
          700: '#466b62',
          800: '#3a564f',
          900: '#324843',
          950: '#1a2a26',
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
        'cyan-glow': '0 4px 20px -2px rgba(145, 186, 175, 0.35)',
        'purple-glow': '0 4px 20px -2px rgba(88, 134, 123, 0.3)',
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
