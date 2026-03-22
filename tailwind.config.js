/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A2B4E',
          50: '#E8EEF5',
          100: '#C5D3E3',
          500: '#0A2B4E',
          600: '#082240',
          700: '#061A30',
        },
        accent: {
          DEFAULT: '#F97316',
          50: '#FFF3EA',
          100: '#FFE2C6',
          500: '#F97316',
          600: '#EA6A0A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
