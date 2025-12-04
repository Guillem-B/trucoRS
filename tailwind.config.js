/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f0',
          100: '#dcf2dc',
          200: '#bbe4bb',
          300: '#8acd8a',
          400: '#4faf4f',
          500: '#2d8b2d',
          600: '#1f6b1f',
          700: '#1a571a',
          800: '#164616',
          900: '#133813',
        },
        secondary: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        accent: {
          50: '#faf7f0',
          100: '#f5f0e1',
          200: '#ebe1c9',
          300: '#d9c7a1',
          400: '#c4a97d',
          500: '#b08f5c',
          600: '#9c7747',
          700: '#7d5f3a',
          800: '#654b30',
          900: '#523e28',
        },
      },
    },
  },
  plugins: [],
}

