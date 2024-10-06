import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin(() => {
  const GTM_ID = "G-XX7JF4WM7H"; // Ganti dengan ID GTM Anda

  function gtag(...args: any[]) {
    // @ts-ignore
    window.dataLayer.push(arguments);
  }

  // @ts-ignore
  window.dataLayer = window.dataLayer || [];
  gtag("js", new Date());
  gtag("config", GTM_ID);

  useHead({
    script: [
      {
        src: `https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`,
        async: true,
      },
    ],
  });
});
