/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**'],
  theme: {
    extend: {
      backgroundImage: {
        Claro: "url('/src/assets/Claro.svg')",
        Tigo: "url('/src/assets/Tigo.gif')",
      },
      colors: {
        gray: {
          100: '#edf0f4',
        },
        yellow: {
          100: '#efcd62',
        },
        primary: '#3d2453',
        green: {
          100: '#559957',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
