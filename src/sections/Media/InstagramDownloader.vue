<template>
  <main class="flex-grow container mx-auto px-4 py-12">
    <h1 class="text-4xl md:text-5xl font-bold text-center text-blue-600 mb-8">Instagram Downloader Media</h1>

    <div class="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
      <form @submit.prevent="downloadVideo" class="mb-8">
        <div class="flex flex-col md:flex-row gap-4">
          <input v-model="instagramUrl" type="text" placeholder="Enter Instagram URL" required class="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" :disabled="loading">
            {{ loading ? "Downloading..." : "Download" }}
          </button>
        </div>
      </form>

      <div v-if="loading" class="text-center">
        <p class="mt-2 text-gray-600">Processing your request...</p>
      </div>

      <div v-if="error" class="text-red-600 text-center">
        {{ error }}
      </div>

      <div v-if="videoData" class="mt-8">
        <h2 class="text-2xl font-semibold text-blue-600 mb-4">Download Result</h2>
        <video :src="videoData.videoUrl" autoplay controls loop class="w-full rounded-lg shadow-md"></video>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

interface VideoData {
  filename: string;
  width: string;
  height: string;
  videoUrl: string;
}

export default defineComponent({
  setup() {
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

    return {
      instagramUrl,
      videoData,
      loading,
      error,
      downloadVideo,
    };
  },
});
</script>
