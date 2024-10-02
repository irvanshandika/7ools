/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // "./src/components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./src/**/*.{js,vue,ts}",
    "./node_modules/flowbite/**/*.{js,ts}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

