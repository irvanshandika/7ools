// plugins/flowbite.client.ts
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    nuxtApp.hook("app:mounted", () => {
      import("flowbite").then((flowbite) => {
        flowbite.initFlowbite();
      });
    });
  }
});
