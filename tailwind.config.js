/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        cwail: {
          bg: 'var(--cwail-bg)',
          elevated: 'var(--cwail-bg-elevated)',
          ink: 'var(--cwail-ink)',
          muted: 'var(--cwail-muted)',
          border: 'var(--cwail-border)',
          accent: 'var(--cwail-accent)',
          accent2: 'var(--cwail-accent-2)',
        },
        /* Neutral grey scale for dark UI (true neutral, not blue- or green-shifted) */
        gray: {
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
      },
      boxShadow: {
        cwail: '0 12px 40px -12px rgba(10, 16, 16, 0.25)',
        'cwail-dark': '0 12px 40px -8px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
};
