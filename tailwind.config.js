/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ 
    "./views/**/*.ejs",
    "./public/**/*.{html, js, svg}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

