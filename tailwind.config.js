/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'black':'#03131A',
        'gray':'#EAEAEA',
        'blue':'#8FD6E8',
        'green':'#D4FF9D' 
      }
    },
  },
  plugins: [require("daisyui")],
}
