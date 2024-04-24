/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT( {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#03131A',
        gray: '#EAEAEA',
        blue: '#8FD6E8',
        green: '#D4FF9D',
        greenDark: 'rgb(212, 255, 157, 0.8)',
      },
    },
  },
  
  daisyui: {
    themes: [],
  },
  plugins: [require('daisyui')],
});

