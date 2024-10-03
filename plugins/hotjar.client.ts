import { defineNuxtPlugin } from "#app";
import Hotjar from "@hotjar/browser";

export default defineNuxtPlugin(() => {
  if (process.client) {
    const siteId = 5157324; // Ganti dengan ID situs Anda
    const hotjarVersion = 6;

    // Inisialisasi Hotjar
    Hotjar.init(siteId, hotjarVersion);
  }
});
