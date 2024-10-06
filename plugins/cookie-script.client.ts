// plugins/cookie-consent.client.ts
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin(() => {
  const COOKIE_SCRIPT_ID = "b21ded5e6fe28716fd9a42183d962e9d"; // Ganti dengan ID script Anda jika berbeda

  useHead({
    script: [
      {
        src: `//cdn.cookie-script.com/s/${COOKIE_SCRIPT_ID}.js`,
        type: "text/javascript",
      },
    ],
  });
});
