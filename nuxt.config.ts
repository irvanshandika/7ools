// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  plugins: ["~/plugins/flowbite.client.ts"],
  css: ["~/src/css/style.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      REMOVE_BG_API_KEY: process.env.REMOVE_BG_API_KEY,
    },
  },
});
