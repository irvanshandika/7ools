/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./layouts/**/*.vue",
    "./[plugins]/**/*.{js,ts}",
    "./pages/**/*.vue",
    "./src/**/*.{js,vue,ts}",
    './node_modules/preline/preline.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [
    require('preline/plugin'),
  ],
};
