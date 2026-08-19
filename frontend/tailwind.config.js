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
          cyan: '#00F0FF',
          blue: '#0EA5E9',
          purple: '#8B5CF6',
          violet: '#A855F7',
          pink: '#F43F5E',
          red: '#FF4655',
          gold: '#FFB800',
          emerald: '#10B981',
          lime: '#84CC16',
        },
        hud: {
          bg: '#07070D',
          surface: '#0D0E1A',
          card: '#121426',
          panel: '#181A32',
          border: '#242848',
          borderGlow: 'rgba(0, 240, 255, 0.3)',
          text: '#F1F5F9',
          muted: '#8E9BB0',
          dim: '#4B556D',
        }
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'cyan-glow': '0 0 20px -3px rgba(0, 240, 255, 0.45)',
        'purple-glow': '0 0 20px -3px rgba(139, 92, 246, 0.45)',
        'red-glow': '0 0 20px -3px rgba(255, 70, 85, 0.45)',
        'gold-glow': '0 0 20px -3px rgba(255, 184, 0, 0.45)',
        'hud-inner': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.08)',
      },
      backgroundImage: {
        'cyber-grid': 'radial-gradient(circle, rgba(0, 240, 255, 0.08) 1px, transparent 1px)',
        'tech-lines': 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 240, 255, 0.02) 2px, rgba(0, 240, 255, 0.02) 4px)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
        'glow-bounce': 'glowBounce 2s ease-in-out infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' }
        },
        glowBounce: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' }
        }
      }
    },
  },
  plugins: [],
}
