<template>
  <Layout>
    <div class="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col justify-center items-center px-4 py-12">
      <div class="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div class="p-8">
          <div class="flex justify-center mb-6">
            <AlertTriangleIcon class="h-24 w-24 text-yellow-500" />
          </div>
          <h1 class="text-4xl font-bold text-center text-gray-800 mb-4">404 - Page Not Found</h1>
          <p class="text-center text-gray-600 mb-8">Oops! The page you're looking for doesn't exist. It might have been moved or deleted.</p>
          <div class="flex flex-col space-y-4">
            <a href="/" class="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300 text-center"> Go to Homepage </a>
            <a href="/contact" class="bg-gray-200 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-300 transition duration-300 text-center"> Contact Support </a>
          </div>
        </div>
        <div class="bg-gray-50 px-8 py-4">
          <p class="text-center text-gray-500 text-sm">&copy; {{ new Date().getFullYear() }} 7ools. All rights reserved.</p>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { AlertTriangleIcon } from "lucide-vue-next";
import Layout from "~/src/Layout.vue";
import type { PropType } from "vue";
import type { NuxtError } from "#app";

defineProps({
  error: {
    type: Object as PropType<Error | NuxtError>,
    required: true,
  },
});

useSeoMeta({
  title: "404 Not Found | 7ools",
  ogTitle: "404 Not Found | 7ools",
});
</script>
