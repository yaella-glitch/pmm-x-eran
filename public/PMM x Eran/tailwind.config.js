/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Figtree', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Crimson Text"', 'Georgia', 'serif'],
      },
      colors: {
        violet: { DEFAULT: '#a58aff' },
        indigo: { DEFAULT: '#6366f1' },
        sky: { DEFAULT: '#38bdf8' },
        emerald: { DEFAULT: '#34d399' },
        amber: { DEFAULT: '#fbbf24' },
        pink: { DEFAULT: '#fb7185' },
      },
    },
  },
  plugins: [],
};
