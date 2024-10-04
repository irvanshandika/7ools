<template>
  <div class="min-h-screen bg-gradient-to-br from-red-100 to-orange-100 flex flex-col justify-center items-center px-4 py-12">
    <div class="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
      <div class="p-8">
        <div class="flex justify-center mb-6">
          <ServerCrashIcon class="h-24 w-24 text-red-500" />
        </div>
        <h1 class="text-4xl font-bold text-center text-gray-800 mb-4">505 - Internal Server Error</h1>
        <p class="text-center text-gray-600 mb-8">Oops! Something went wrong on our end. We're working to fix the issue. Please try again later.</p>
        <div class="flex flex-col space-y-4">
          <button @click="reloadPage" class="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300 text-center">Reload Page</button>
          <a href="/" class="bg-gray-200 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-300 transition duration-300 text-center"> Go to Homepage </a>
          <a href="/contact" class="text-blue-600 hover:text-blue-800 transition duration-300 text-center"> Contact Support </a>
        </div>
      </div>
      <div class="bg-gray-50 px-8 py-4">
        <p class="text-center text-gray-500 text-sm">&copy; {{ new Date().getFullYear() }} 7ools. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ServerCrashIcon } from "lucide-vue-next";
import type { PropType } from "vue";
import type { NuxtError } from "#app";

useSeoMeta({
  title: "505 Internal Server Error | 7ools",
  ogTitle: "505 Internal Server Error | 7ools",
});

defineProps({
  error: {
    type: Object as PropType<Error | NuxtError>,
    required: true,
  },
});

const reloadPage = () => {
  window.location.reload();
};
</script>
