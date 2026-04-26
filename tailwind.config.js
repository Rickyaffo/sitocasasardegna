/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        gold: '#C5A059',
        charcoal: '#262626',
        ivory: '#FAF9F6',
      }
    },
  },
  plugins: [],
}