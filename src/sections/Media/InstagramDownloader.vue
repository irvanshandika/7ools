<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Instagram Video Downloader</h1>
    <form @submit.prevent="downloadVideo" class="mb-8">
      <div class="flex">
        <input v-model="instagramUrl" type="text" placeholder="Paste Instagram video URL here" class="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button type="submit" class="bg-blue-500 text-white px-6 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" :disabled="loading">
          {{ loading ? "Loading..." : "Download" }}
        </button>
      </div>
    </form>
    <div v-if="error" class="text-red-500 mb-4">
      {{ error }}
    </div>
    <div v-if="videoData" class="bg-gray-100 p-4 rounded-md flex justify-center">
      <video :src="videoData.videoUrl" autoplay controls class="w-[100vw] mb-4"></video>
    </div>
  </div>
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
