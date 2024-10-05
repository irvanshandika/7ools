<!-- <template>
    <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Facebook Video Downloader</h2>
          <form @submit.prevent="fetchVideoInfo" class="mb-4">
            <input
              v-model="facebookUrl"
              type="text"
              placeholder="Enter Facebook Video URL"
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
            <h3 class="text-xl font-semibold mb-2">
                {{ videoInfo.title }}
            </h3>
            <img :src="videoInfo.thumbnail" alt="Video thumbnail" class="w-full mb-4 rounded-md">
            <p class="text-gray-600 mb-4">Duration: {{ formatDuration(videoInfo.duration_ms) }}</p>
            <div class="flex space-x-4">
              <a
                :href="videoInfo.sd"
                download
                class="flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-center"
              >
                Download SD
              </a>
              <a
                :href="videoInfo.hd"
                download
                class="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-center"
              >
                Download HD
              </a>
            </div>
          </div>
  
          <div v-if="error" class="mt-4 text-red-500">
            {{ error }}
          </div>
        </div>
      </div>
    </div>
  </template> -->

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div class="p-8">
        <h1 class="text-3xl font-bold text-center text-blue-600 mb-8">Facebook Video Downloader</h1>

        <form @submit.prevent="fetchVideoInfo" class="mb-8">
          <div class="flex flex-col md:flex-row gap-4">
            <input v-model="facebookUrl" type="url" placeholder="Enter Facebook Video URL" required class="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <!-- <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Get Video</button> -->
            <button
              type="submit"
              class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="hs-static-backdrop-modal"
              data-hs-overlay="#hs-static-backdrop-modal">
              Get Video
            </button>

            <div
              id="hs-static-backdrop-modal"
              class="hs-overlay [--overlay-backdrop:static] hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
              role="dialog"
              tabindex="-1"
              aria-labelledby="hs-static-backdrop-modal-label"
              data-hs-overlay-keyboard="false">
              <div class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                <div class="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto">
                  <div class="flex justify-between items-center py-3 px-4 border-b">
                    <h3 id="hs-static-backdrop-modal-label" class="font-bold text-gray-800">Modal title</h3>
                    <button
                      type="button"
                      class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
                      aria-label="Close"
                      data-hs-overlay="#hs-static-backdrop-modal">
                      <span class="sr-only">Close</span>
                      <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                      </svg>
                    </button>
                  </div>
                  <div class="p-4 overflow-y-auto">
                    <div v-if="loading" class="text-center">
                      <LoaderIcon class="animate-spin h-8 w-8 text-blue-600 mx-auto" />
                      <p class="mt-2 text-gray-600">Fetching video information...</p>
                    </div>

                    <div v-if="error" class="text-red-600 text-center mb-4">
                      {{ error }}
                    </div>

                    <div v-if="videoInfo" class="bg-gray-50 rounded-lg p-6">
                      <div class="flex flex-col justify-center md:flex-row gap-6">
                        <div>
                          <video :src="videoInfo.hd" autoplay loop class="w-full h-auto rounded-lg shadow-md"></video>
                          <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ videoInfo.title }}</h2>
                          <p class="text-gray-600 mb-4">Duration: {{ formatDuration(videoInfo.duration_ms) }}</p>
                          <div class="flex flex-col sm:flex-row gap-4">
                            <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
                              <a
                                :href="videoInfo.sd"
                                class="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                target="_blank">
                                Download SD
                              </a>
                              <a
                                :href="videoInfo.hd"
                                class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                target="_blank">
                                Download HD
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { LoaderIcon } from "lucide-vue-next";

const facebookUrl = ref("");
const videoInfo = ref(null);
const error = ref("");
const loading = ref(false);

const fetchVideoInfo = async () => {
  loading.value = true;
  try {
    error.value = "";
    videoInfo.value = null;
    const response = await fetch(`/api/facebook?url=${encodeURIComponent(facebookUrl.value)}`);
    if (!response.ok) {
      throw new Error("Failed to fetch video information");
    }
    videoInfo.value = await response.json();
  } catch (err) {
    error.value = "Failed to fetch video information. Please try again.";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const formatDuration = (ms) => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  return `${hours}:${String(minutes % 60).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
};
</script>
