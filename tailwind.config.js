/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{jsx}'],
  theme: {
    extend: {
      width: {
        70: '70.14%',
        45: '44.5%',
      },
      screens: {
        xl: '1200px',
      },
    },
  },
  plugins: [],
};
