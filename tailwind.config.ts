import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#050816',
          card: '#0d122b',
          'card-hover': '#131a3d',
          border: 'rgba(56, 189, 248, 0.15)',
          'border-hover': 'rgba(168, 85, 247, 0.35)',
          accent: {
            blue: '#3b82f6',
            cyan: '#06b6d4',
            purple: '#a855f7',
            pink: '#ec4899',
            emerald: '#10b981',
            amber: '#f59e0b',
            rose: '#f43f5e',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-gradient': 'linear-gradient(135deg, rgba(6,182,212,0.1) 0%, rgba(168,85,247,0.1) 50%, rgba(59,130,246,0.1) 100%)',
        'glass-card': 'linear-gradient(135deg, rgba(13, 18, 43, 0.7) 0%, rgba(7, 10, 26, 0.8) 100%)',
        'glowing-border': 'linear-gradient(90deg, #06b6d4, #a855f7, #3b82f6, #06b6d4)',
      },
      backdropBlur: {
        xs: '2px',
        cyber: '16px',
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'border-spin': 'borderSpin 4s linear infinite',
        'radar-sweep': 'radarSweep 3s linear infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'blur(20px)' },
          '50%': { opacity: '0.8', filter: 'blur(30px)' },
        },
        borderSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      fontFamily: {
        mono: ['var(--font-geist-mono)', 'monospace'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
