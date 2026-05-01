import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'monospace'],
        rajdhani: ['Rajdhani', 'sans-serif'],
        exo: ['"Exo 2"', 'sans-serif'],
      },
      colors: {
        cyan: {
          DEFAULT: '#00e5ff',
          dim: '#00b8cc',
          dark: '#020d12',
        },
        dark: {
          DEFAULT: '#020d12',
          2: '#061820',
          3: '#0a2233',
          card: 'rgba(6,24,32,0.85)',
        },
        neon: {
          gold: '#ffd700',
          pink: '#ff6b9d',
          purple: '#9f7fff',
          red: '#ff3c3c',
        }
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px)",
        'hero-gradient': "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(0,80,100,0.35) 0%, transparent 70%)",
      },
      boxShadow: {
        'neon': '0 0 20px rgba(0,229,255,0.4), 0 0 60px rgba(0,229,255,0.1)',
        'neon-sm': '0 0 10px rgba(0,229,255,0.3)',
        'card': '0 20px 60px rgba(0,0,0,0.5)',
      },
      animation: {
        'pulse-ring': 'pulseRing 3s ease-in-out infinite',
        'scan': 'scanLine 4s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        pulseRing: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.6' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        },
        scanLine: {
          '0%': { top: '-2px' },
          '100%': { top: '100%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(0,229,255,0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(0,229,255,0.8), 0 0 60px rgba(0,229,255,0.3)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
