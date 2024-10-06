import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin(() => {
  const GA4_ID = "G-XX7JF4WM7H"; // Ganti dengan ID GA4 Anda

  useHead({
    script: [
      {
        src: `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`,
        async: true,
      },
      {
        innerHTML: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA4_ID}');
        `,
      },
    ],
  });
});
