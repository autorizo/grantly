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
      animation: {
        'scale-fade': 'scaleFade 0.6s ease-in-out',
      },
      keyframes: {
        scaleFade: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.2)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
