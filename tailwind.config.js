/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media', // or 'media'

  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "OpenSans": ["Open Sans", "sans-serif"],
      }, boxShadow:{
        'dialogueShadow': '0 1px 3px 0 rgba(0,0,0,.3),0 4px 8px 3px rgba(0,0,0,.15)',
      }
    },
  },
  plugins: [],
}

