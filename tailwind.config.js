/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#050608',
        surface: '#0C0E13',
        aluminum: '#161922',
        primary: '#F4F5F7',
        secondary: '#949BA8',
        muted: '#525866',
        accent: 'var(--accent-active, #FF8000)'
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      boxShadow: {
        titanium: 'inset 0 1px 0 0 rgba(255,255,255,0.12), 0 20px 50px rgba(0,0,0,0.65)',
        glow: '0 0 30px -5px var(--accent-active, #FF8000)'
      },
      animation: {
        'pulse-slow': 'pulse 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        scanline: 'scanline 4s linear infinite'
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' }
        }
      }
    }
  },
  plugins: []
};
