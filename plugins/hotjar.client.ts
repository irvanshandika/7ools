// plugins/hotjar.client.ts
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const hotjarId = runtimeConfig.public.hotjarId

  if (process.client && hotjarId) {
    window.hj = window.hj || function(){(window.hj.q = window.hj.q || []).push(arguments)};
    window._hjSettings = { hjid: hotjarId, hjsv: 6 };
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://static.hotjar.com/c/hotjar-${hotjarId}.js?sv=6`;
    document.head.appendChild(script);
  }
})

// Tambahkan ini untuk TypeScript
declare global {
  interface Window {
    hj: any;
    _hjSettings: any;
  }
}