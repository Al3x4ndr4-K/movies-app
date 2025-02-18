/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
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
