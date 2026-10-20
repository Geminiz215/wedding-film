/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}', './data/**/*.js'],
  theme: {
    extend: {
      colors: {
        film: {
          bg: '#1A120B',
          bgSoft: '#2B1D12',
          gold: '#E8B84B',
          goldLight: '#F2CC6B',
          goldDark: '#C9962E',
          cream: '#F5E6C8',
          muted: '#D9C3A0',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', '"Cormorant Garamond"', 'serif'],
        sans: ['"Jost"', 'sans-serif'],
      },
      letterSpacing: {
        credit: '0.25em',
        wideCredit: '0.38em',
        poster: '0.18em',
      },
    },
  },
  plugins: [],
};
