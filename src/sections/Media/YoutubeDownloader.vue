<template>
  <div class="max-w-xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">YouTube Video Downloader</h1>
    <form @submit.prevent="fetchVideo" class="mb-4">
      <input v-model="url" type="text" placeholder="Enter YouTube URL" class="w-full p-2 border rounded" required />
      <button type="submit" class="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600" :disabled="loading">
        {{ loading ? "Loading..." : "Download" }}
      </button>
    </form>

    <div v-if="error" class="text-red-500 mb-4">{{ error }}</div>

    <div v-if="videoInfo" class="bg-gray-100 p-4 rounded">
      <h2 class="text-xl font-semibold mb-2">{{ videoInfo.title }}</h2>
      <p class="mb-2">Uploader: {{ videoInfo.uploader }}</p>
      <p class="mb-4">Upload Date: {{ formatDate(videoInfo.upload_date) }}</p>

      <!-- Video Player -->
      <div class="mb-4">
        <video v-if="videoInfo.videoUrl" controls autoplay class="w-full" :src="videoInfo.videoUrl">Your browser does not support the video tag.</video>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const url = ref("");
const loading = ref(false);
const error = ref("");
const videoInfo = ref<any>(null);

const fetchVideo = async () => {
  loading.value = true;
  error.value = "";
  videoInfo.value = null;

  try {
    const response = await fetch("/api/youtube", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: url.value }),
    });

    const result = await response.json();

    if (result.status === "success") {
      videoInfo.value = result.data;
    } else {
      error.value = result.message || "Failed to fetch video information";
    }
  } catch (e) {
    error.value = "An error occurred while fetching the video";
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const year = dateString.slice(0, 4);
  const month = dateString.slice(4, 6);
  const day = dateString.slice(6, 8);
  return `${year}-${month}-${day}`;
};
</script>
