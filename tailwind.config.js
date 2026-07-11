/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#111111',
        coal: '#15120E',
        ivory: '#F7F3EE',
        cream: '#F1EAE0',
        sand: '#E9E0D2',
        gold: '#C8A97E',
        'gold-deep': '#A98756',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        luxe: '0.32em',
        wide2: '0.18em',
      },
      boxShadow: {
        soft: '0 24px 60px -30px rgba(58, 44, 26, 0.35)',
        card: '0 1px 2px rgba(31, 24, 14, 0.06), 0 18px 40px -24px rgba(58, 44, 26, 0.28)',
      },
    },
  },
  plugins: [],
}
