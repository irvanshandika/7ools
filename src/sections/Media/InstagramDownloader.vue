<template>
  <main class="min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 py-12 px-4">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-4xl md:text-5xl font-bold text-center text-pink-600 mb-8">Instagram Downloader</h1>

      <div class="bg-white rounded-2xl shadow-lg p-8">
        <form @submit.prevent="downloadVideo" class="mb-8">
          <div class="flex flex-col md:flex-row gap-4">
            <input
              v-model="instagramUrl"
              type="text"
              placeholder="Enter Instagram URL"
              required
              class="flex-grow px-4 py-3 border-2 border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition duration-300" />
            <button
              type="submit"
              class="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-6 py-3 rounded-full hover:from-pink-600 hover:to-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 disabled:opacity-50"
              :disabled="loading">
              <span v-if="!loading">Download</span>
              <span v-else class="flex items-center justify-center">
                <LoaderIcon class="animate-spin mr-2 h-5 w-5" />
                Processing...
              </span>
            </button>
          </div>
        </form>

        <div v-if="error" class="text-red-500 text-center mb-4 p-4 bg-red-100 rounded-lg">
          <AlertCircleIcon class="inline-block mr-2 h-5 w-5" />
          {{ error }}
        </div>

        <div v-if="videoData" class="mt-8">
          <h2 class="text-2xl font-semibold text-pink-600 mb-4">Download Result</h2>
          <div class="bg-gray-50 rounded-lg p-4">
            <video :src="videoData.videoUrl" controls loop class="w-full rounded-lg shadow-md"></video>
            <div class="mt-4 text-sm text-gray-600">
              <p><strong>Filename:</strong> {{ videoData.filename }}</p>
              <p><strong>Dimensions:</strong> {{ videoData.width }}x{{ videoData.height }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { LoaderIcon, AlertCircleIcon } from "lucide-vue-next";

interface VideoData {
  filename: string;
  width: string;
  height: string;
  videoUrl: string;
}

const instagramUrl = ref("");
const videoData = ref<VideoData | null>(null);
const loading = ref(false);
const error = ref("");

const downloadVideo = async () => {
  if (!instagramUrl.value) {
    error.value = "Please enter an Instagram video URL";
    return;
  }

  loading.value = true;
  error.value = "";
  videoData.value = null;

  try {
    const result = await $fetch("/api/instagram", {
      method: "GET",
      params: { url: instagramUrl.value },
    });

    if (result.status === "success" && result.data) {
      videoData.value = result.data;
    } else {
      error.value = result.message || "Failed to download video. Please try again.";
    }
  } catch (err: any) {
    error.value = err.data?.statusMessage || "An error occurred. Please try again.";
    console.error("Error:", err);
  } finally {
    loading.value = false;
  }
};
</script>
