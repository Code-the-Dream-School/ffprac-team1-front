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



// Dark Cyan (#03131A), Light Gray (#F8F8F8), Pastel Blue (#8FD6E8), Pastel Green (#D4FF9D)