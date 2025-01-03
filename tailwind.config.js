/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FF89B9',
          DEFAULT: '#FF6BA9',
          dark: '#FF4D99',
        },
        secondary: {
          light: '#FFE1ED',
          DEFAULT: '#FFD4E5',
          dark: '#FFC7DD',
        },
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      boxShadow: {
        'soft': '0px 2px 6px rgba(0, 0, 0, 0.05)',
        'soft-lg': '0px 4px 12px rgba(0, 0, 0, 0.08)',
        'soft-sm': '0px 1px 3px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}