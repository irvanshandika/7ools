// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  plugins: [
    {
      src: "~/plugins/preline.client.ts",
      mode: "client",
    },
    {
      src: "~/plugins/hotjar.client.ts",
      mode: "client",
    },
    {
      src: "~/plugins/facebookPixel.client.ts",
      mode: "client",
    },
    {
      src: "~/plugins/gtm.client.ts",
      mode: "client",
    },
    {
      src: "~/plugins/cookie-script.client.ts",
      mode: "client",
    },
  ],
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
      GEMINI_API_KEY: process.env.GEMINI_API_KEY,
      CONVERT_API_TOKEN: process.env.CONVERT_API_TOKEN
    },
  },
});
