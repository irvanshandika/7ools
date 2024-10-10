<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">YouTube Video Downloader</h1>
    
    <div class="mb-4">
      <input 
        v-model="youtubeUrl"
        type="text"
        placeholder="Enter YouTube URL"
        class="border p-2 w-full"
      />
    </div>

    <button 
      @click="fetchVideoInfo"
      class="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      :disabled="isFetching"
    >
      {{ isFetching ? 'Fetching...' : 'Fetch Video' }}
    </button>

    <div v-if="videoInfo" class="mb-4">
      <h2 class="text-xl font-semibold">{{ videoInfo.title }}</h2>
      <p>Uploader: {{ videoInfo.uploader }}</p>
      <p>Upload Date: {{ formatDate(videoInfo.upload_date) }}</p>
      <video 
        :src="videoInfo.videoUrl" 
        controls 
        class="w-full max-w-2xl mt-4"
      ></video>
      <a 
        :href="videoInfo.videoUrl" 
        download
        class="bg-green-500 text-white px-4 py-2 rounded inline-block mt-4"
      >
        Download Video
      </a>
    </div>

    <div v-if="error" class="text-red-500 mt-4">
      <p>Error: {{ error }}</p>
      <div v-if="debugInfo" class="mt-2">
        <h3 class="font-bold">Debug Information:</h3>
        <pre class="p-2 bg-gray-100 rounded overflow-auto">{{ JSON.stringify(debugInfo, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface VideoInfo {
  status: string;
  videoUrl: string;
  title: string;
  upload_date: string;
  uploader: string;
  uploader_id: string;
  uploader_url: string;
}

const youtubeUrl = ref('')
const videoInfo = ref<VideoInfo | null>(null)
const isFetching = ref(false)
const error = ref('')
const debugInfo = ref<any>(null)

const fetchVideoInfo = async () => {
  if (!youtubeUrl.value) {
    error.value = 'Please enter a YouTube URL'
    return
  }

  isFetching.value = true
  error.value = ''
  debugInfo.value = null
  videoInfo.value = null

  try {
    const response = await fetch('/api/youtube', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: youtubeUrl.value })
    })

    const data = await response.json()

    if (data.status === 'success') {
      videoInfo.value = data
    } else {
      error.value = data.message || 'Failed to retrieve video information'
      debugInfo.value = {
        rawResponse: data.rawResponse,
        responseStatus: data.responseStatus,
        responseHeaders: data.responseHeaders,
        data: data
      }
    }
  } catch (err) {
    console.error('Error details:', err)
    error.value = err instanceof Error ? err.message : 'An unknown error occurred'
  } finally {
    isFetching.value = false
  }
}

const formatDate = (dateString: string) => {
  if (!dateString) return 'Unknown date'
  const year = dateString.slice(0, 4)
  const month = dateString.slice(4, 6)
  const day = dateString.slice(6, 8)
  return `${year}-${month}-${day}`
}
</script>