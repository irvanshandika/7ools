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
  app: {
    head: {
      script: [{ src: "https://www.google.com/recaptcha/api.js", async: true, defer: true }],
    },
  },
  runtimeConfig: {
    public: {
      REMOVE_BG_API_KEY: process.env.REMOVE_BG_API_KEY,
      GEMINI_API_KEY: process.env.GEMINI_API_KEY,
      CONVERT_API_TOKEN: process.env.CONVERT_API_TOKEN,
      RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
      openaiApiKey: process.env.OPENAI_API_KEY,
    },
  },
  build: {
    transpile: ["openai"],
  },
});
