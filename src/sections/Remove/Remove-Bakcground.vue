<

<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div class="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
        <h1 class="text-3xl font-extrabold text-white mb-2">Remove Background</h1>
        <p class="text-white text-opacity-80">Upload an image and we'll remove the background for you!</p>
      </div>

      <div class="p-6">
        <div
          @dragover.prevent
          @drop.prevent="onDrop"
          class="border-3 border-dashed border-gray-300 rounded-xl p-12 mb-6 text-center cursor-pointer transition-all duration-300 hover:border-blue-500 hover:bg-blue-50"
          :class="{ 'border-blue-500 bg-blue-50': isDragging }"
          @dragenter="isDragging = true"
          @dragleave="isDragging = false">
          <input type="file" ref="fileInput" @change="onFileSelected" accept="image/*" class="hidden" />
          <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <p class="mt-2 text-sm text-gray-600">Drag and drop your image here or</p>
          <button @click="$refs.fileInput.click()" class="mt-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Select File</button>
        </div>

        <!-- Image Preview -->
        <div v-if="originalImage || processedImage" class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div class="space-y-2">
            <h2 class="text-lg font-semibold text-gray-700">Original Image</h2>
            <div class="relative aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
              <img :src="originalImage || ''" alt="Original" class="object-contain w-full h-full" />
            </div>
          </div>
          <div class="space-y-2">
            <h2 class="text-lg font-semibold text-gray-700">Processed Image</h2>
            <div class="relative aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
              <img :src="processedImage || ''" alt="Processed" class="object-contain w-full h-full" />
            </div>
          </div>
        </div>

        <!-- Download Options -->
        <div v-if="processedImage" class="flex flex-wrap items-center justify-between">
          <div class="flex items-center space-x-4 mb-4 sm:mb-0">
            <label for="format" class="text-sm font-medium text-gray-700">Download format:</label>
            <select v-model="downloadFormat" id="format" class="bg-white border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="png">PNG</option>
              <option value="jpg">JPG</option>
              <option value="jpeg">JPEG</option>
              <option value="webp">WEBP</option>
              <option value="svg">SVG</option>
            </select>
          </div>
          <button
            @click="downloadImage"
            class="w-full sm:w-auto px-6 py-3 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-300">
            Download Image
          </button>
        </div>

        <!-- Loading and Error Messages -->
        <div class="mt-6">
          <p v-if="isLoading" class="text-blue-500 flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing image...
          </p>
          <p v-if="error" class="text-red-500 flex items-center justify-center">
            <svg class="h-5 w-5 text-red-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd" />
            </svg>
            {{ error }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const originalImage = ref<string | null>(null);
const processedImage = ref<string | null>(null);
const downloadFormat = ref<string>("png");
const isLoading = ref<boolean>(false);
const error = ref<string | null>(null);
const isDragging = ref<boolean>(false);

const fileInput = ref<HTMLInputElement | null>(null);

const API_KEY = useRuntimeConfig().public.REMOVE_BG_API_KEY;

onMounted(() => {
  // Initialize any necessary plugins or libraries here
});

const onDrop = (e: DragEvent) => {
  isDragging.value = false;
  const files = e.dataTransfer?.files;
  if (files && files.length > 0) {
    handleFile(files[0]);
  }
};

const onFileSelected = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const files = target.files;
  if (files && files.length > 0) {
    handleFile(files[0]);
  }
};

const handleFile = (file: File) => {
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = (e) => {
      originalImage.value = e.target?.result as string;
      processImage(file);
    };
    reader.readAsDataURL(file);
  } else {
    error.value = "Please select an image file.";
  }
};

const processImage = async (file: File) => {
  isLoading.value = true;
  error.value = null;

  const formData = new FormData();
  formData.append("image_file", file);

  try {
    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": API_KEY as string,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to process image");
    }

    const blob = await response.blob();
    processedImage.value = URL.createObjectURL(blob);
  } catch (err) {
    error.value = "Error processing image. Please try again.";
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

const downloadImage = () => {
  if (processedImage.value) {
    const link = document.createElement("a");
    link.href = processedImage.value;
    link.download = `removed_background.${downloadFormat.value}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
</script>
