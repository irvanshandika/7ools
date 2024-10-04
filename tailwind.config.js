/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // "./src/components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./[plugins]/**/*.{js,ts}",
    "./pages/**/*.vue",
    "./src/**/*.{js,vue,ts}",
    "./node_modules/flowbite/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
