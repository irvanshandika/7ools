<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div class="p-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">YouTube Video Downloader</h2>
        <form @submit.prevent="fetchVideoInfo" class="mb-4">
          <input
            v-model="youtubeUrl"
            type="text"
            placeholder="Enter YouTube URL"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            class="mt-3 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Get Video
          </button>
        </form>

        <div v-if="videoInfo" class="mt-6">
          <h3 class="text-xl font-semibold mb-2">{{ videoInfo.title }}</h3>
          <p class="text-gray-600 mb-2">Uploader: {{ videoInfo.uploader }}</p>
          <p class="text-gray-600 mb-4">Upload Date: {{ formatDate(videoInfo.upload_date) }}</p>
          <a
            :href="videoInfo.videoUrl"
            download
            class="inline-block bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Download Video
          </a>
        </div>

        <div v-if="error" class="mt-4 text-red-500">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const youtubeUrl = ref('');
const videoInfo = ref(null);
const error = ref('');

const fetchVideoInfo = async () => {
  try {
    error.value = '';
    videoInfo.value = null;
    const response = await fetch(`/api/youtube?url=${encodeURIComponent(youtubeUrl.value)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch video information');
    }
    videoInfo.value = await response.json();
  } catch (err) {
    error.value = 'Failed to fetch video information. Please try again.';
    console.error(err);
  }
};

const formatDate = (dateString) => {
  const year = dateString.slice(0, 4);
  const month = dateString.slice(4, 6);
  const day = dateString.slice(6, 8);
  return `${year}-${month}-${day}`;
};
</script>