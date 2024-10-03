// plugins/facebookPixel.client.ts

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();

  // Pastikan kode ini hanya dijalankan di browser
  if (process.client) {
    // Fungsi untuk memuat Facebook Pixel
    const loadFacebookPixel = () => {
      const f = window as any;
      const n = (f.fbq = function (this: any) {
        (n as any).callMethod ? (n as any).callMethod.apply(n, arguments) : (n as any).queue.push(arguments);
      });
      if (!f._fbq) f._fbq = n;
      (n as any).push = n;
      (n as any).loaded = !0;
      (n as any).version = "2.0";
      (n as any).queue = [];
      const t = document.createElement("script");
      t.async = true;
      t.src = "https://connect.facebook.net/en_US/fbevents.js";
      const s = document.getElementsByTagName("script")[0];
      s.parentNode?.insertBefore(t, s);
    };

    // Inisialisasi Facebook Pixel
    const initFacebookPixel = () => {
      const fbq = (window as any).fbq;
      fbq("init", "809065191165004"); // Ganti dengan ID Pixel Anda
      fbq("track", "PageView");
    };

    // Muat dan inisialisasi Facebook Pixel
    loadFacebookPixel();
    initFacebookPixel();

    // Pantau perubahan rute untuk melacak PageView
    nuxtApp.hooks.hook("page:finish", () => {
      const fbq = (window as any).fbq;
      fbq("track", "PageView");
    });
  }
});
