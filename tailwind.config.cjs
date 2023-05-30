const defaultTheme = require('tailwindcss/defaultTheme');
const lineClamp = require('@tailwindcss/line-clamp');
const typography = require('@tailwindcss/typography');

module.exports = {
  // mode: 'jit',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  // darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    lineClamp,
    typography,
  ],
};
