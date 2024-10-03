// plugins/hotjar.client.ts
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const hotjarId = runtimeConfig.public.hotjarId

  if (process.client && hotjarId) {
    const script = document.createElement('script');
    script.innerHTML = `
      (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:${hotjarId},hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    `;
    
    // Pastikan script dimasukkan segera setelah tag <head>
    const head = document.head;
    if (head.firstChild) {
      head.insertBefore(script, head.firstChild);
    } else {
      head.appendChild(script);
    }
  }
})

// Tambahkan ini untuk TypeScript
declare global {
  interface Window {
    hj: any;
    _hjSettings: any;
  }
}