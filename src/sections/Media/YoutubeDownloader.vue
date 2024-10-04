<template>
  <div class="min-h-screen bg-blue-50 flex flex-col items-center justify-center py-10">
    <div class="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
      <h1 class="text-3xl font-bold text-blue-600 mb-6 text-center">YouTube Video Downloader</h1>

      <div class="flex flex-col gap-4">
        <input v-model="youtubeUrl" type="text" placeholder="Enter YouTube Video URL" class="border-2 border-blue-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-300 transition" />
        <button @click="fetchVideo" class="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">Fetch Video</button>
      </div>

      <div v-if="videoData" class="mt-6">
        <h2 class="text-xl font-semibold text-blue-600">{{ videoData.title }}</h2>
        <p class="text-sm text-gray-600">
          Uploaded by: <a :href="videoData.uploader_url" target="_blank" class="text-blue-500 underline">{{ videoData.uploader }}</a>
        </p>
        <video v-if="videoData.videoUrl" controls class="mt-4 w-full rounded-md shadow-lg">
          <source :src="videoData.videoUrl" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <!-- Dropdown untuk memilih resolusi -->
        <div class="mt-4">
          <label for="resolution" class="block mb-2 text-gray-700">Select Video Resolution:</label>
          <select v-model="selectedResolution" class="border-2 border-blue-300 p-2 rounded-md w-full">
            <option v-for="resolution in videoData.resolutions" :key="resolution" :value="resolution">
              {{ resolution }}
            </option>
          </select>
        </div>

        <div class="mt-4">
          <button @click="downloadVideo" class="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition">Download Video</button>
        </div>
      </div>

      <div v-if="errorMessage" class="text-red-500 mt-5 text-center">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  setup() {
    const youtubeUrl = ref<string>("");
    const videoData = ref<any>(null);
    const selectedResolution = ref<string | null>(null);
    const errorMessage = ref<string>("");

    const fetchVideo = async () => {
      if (!youtubeUrl.value) {
        errorMessage.value = "Please enter a valid YouTube URL.";
        return;
      }

      errorMessage.value = "";
      videoData.value = null;

      try {
        const response = await fetch(`https://mr-apis.com/api/downloader/ytbv?url=${encodeURIComponent(youtubeUrl.value)}`);
        const data = await response.json();

        if (data.status === "success") {
          // Assuming 'resolutions' array is part of API response
          videoData.value = {
            ...data,
            resolutions: ["360p", "480p", "720p", "1080p"], // Example resolutions (adjust based on API response)
          };
          selectedResolution.value = videoData.value.resolutions[0]; // Default to first resolution
        } else {
          errorMessage.value = "Failed to fetch video. Please try again.";
        }
      } catch (error) {
        errorMessage.value = "An error occurred while fetching the video.";
      }
    };

    const downloadVideo = async () => {
      if (!selectedResolution.value || !videoData.value) {
        errorMessage.value = "Please select a resolution before downloading.";
        return;
      }

      // Trigger direct download of the MP4 file with the selected resolution
      const link = document.createElement("a");
      link.href = `${videoData.value.videoUrl}?resolution=${selectedResolution.value}`; // Assuming videoUrl changes based on resolution
      link.download = `${videoData.value.title}-${selectedResolution.value}.mp4`;
      link.click();
    };

    return {
      youtubeUrl,
      videoData,
      selectedResolution,
      errorMessage,
      fetchVideo,
      downloadVideo,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
