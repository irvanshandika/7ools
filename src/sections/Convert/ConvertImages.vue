<template>
  <div class="min-h-screen bg-gradient-to-br from-yellow-100 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div class="p-8">
        <h1 class="text-3xl font-bold text-center text-blue-600 mb-8">Convert Image</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label for="inputFormat" class="block text-sm font-medium text-gray-700 mb-1">Input Format</label>
            <select v-model="inputFormat" id="inputFormat" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
              <option value="jpg">JPG</option>
              <option value="jpeg">JPEG</option>
              <option value="png">PNG</option>
              <option value="webp">WebP</option>
            </select>
          </div>
          <div>
            <label for="outputFormat" class="block text-sm font-medium text-gray-700 mb-1">Output Format</label>
            <select v-model="outputFormat" id="outputFormat" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
              <option value="jpg">JPG</option>
              <option value="jpeg">JPEG</option>
              <option value="png">PNG</option>
              <option value="webp">WebP</option>
            </select>
          </div>
        </div>

        <div
          class="border-2 border-dashed border-blue-300 rounded-lg p-8 mb-6 text-center cursor-pointer hover:border-blue-500 transition-colors duration-300"
          @dragover.prevent
          @drop.prevent="handleFileDrop"
          @click="$refs.fileInput.click()">
          <input type="file" ref="fileInput" @change="handleFileSelect" accept="image/*" class="hidden" />
          <UploadCloudIcon class="mx-auto h-12 w-12 text-blue-500 mb-4" />
          <p class="text-lg text-gray-600">Drag and drop an image file here, or click to select</p>
          <p class="text-sm text-gray-500 mt-2">Supports: JPG, JPEG, PNG, WebP</p>
        </div>

        <div v-if="selectedFile" class="mb-6">
          <div class="flex items-center bg-blue-50 p-4 rounded-lg">
            <ImageIcon class="h-6 w-6 text-blue-500 mr-2" />
            <span class="text-gray-700">{{ selectedFile.name }}</span>
          </div>
        </div>

        <button
          @click="convertImage"
          class="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-md hover:from-blue-600 hover:to-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          :disabled="isConverting || !selectedFile">
          <span v-if="!isConverting">Convert Image</span>
          <span v-else class="flex items-center justify-center">
            <LoaderIcon class="animate-spin mr-2 h-5 w-5" />
            Converting...
          </span>
        </button>

        <div v-if="convertedFile" class="mt-6">
          <div class="flex items-center justify-between bg-green-50 p-4 rounded-lg">
            <div class="flex items-center">
              <ImageIcon class="h-6 w-6 text-green-500 mr-2" />
              <span class="text-gray-700">{{ convertedFile.name }}</span>
            </div>
            <button @click="downloadFile" class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">Download</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg max-w-sm mx-auto">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Invalid Image Format</h3>
        <p class="text-gray-600 mb-4">Sorry, the selected image format is not valid. Please choose an image that matches the input format.</p>
        <button @click="showModal = false" class="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ConvertApi from "convertapi-js";
import { useRuntimeConfig } from "#app";
import { UploadCloudIcon, ImageIcon, LoaderIcon } from "lucide-vue-next";

const config = useRuntimeConfig();
const fileInput = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | null>(null);
const convertedFile = ref<File | null>(null);
const isConverting = ref(false);
const inputFormat = ref("jpg");
const outputFormat = ref("png");
const showModal = ref(false);

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const file = target.files[0];
    if (isValidFormat(file)) {
      selectedFile.value = file;
    } else {
      showModal.value = true;
    }
  }
};

const handleFileDrop = (event: DragEvent) => {
  if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
    const file = event.dataTransfer.files[0];
    if (isValidFormat(file)) {
      selectedFile.value = file;
    } else {
      showModal.value = true;
    }
  }
};

const isValidFormat = (file: File): boolean => {
  const validFormats = ["jpg", "jpeg", "png", "webp"];
  const fileExtension = file.name.split(".").pop()?.toLowerCase();
  return validFormats.includes(fileExtension || "") && fileExtension === inputFormat.value;
};

const convertImage = async () => {
  if (!selectedFile.value) return;

  isConverting.value = true;
  try {
    const convertApi = ConvertApi.auth(config.public.CONVERT_API_TOKEN);
    const params = convertApi.createParams();
    params.add("file", selectedFile.value);

    const result = await convertApi.convert(inputFormat.value, outputFormat.value, params);
    const fileUrl = result.files[0].Url;

    const response = await fetch(fileUrl);
    const blob = await response.blob();
    convertedFile.value = new File([blob], `${selectedFile.value.name.split(".")[0]}.${outputFormat.value}`, { type: `image/${outputFormat.value}` });
  } catch (error) {
    console.error("Conversion error:", error);
    alert("An error occurred during image conversion. Please try again.");
  } finally {
    isConverting.value = false;
  }
};

const downloadFile = () => {
  if (!convertedFile.value) return;

  const url = URL.createObjectURL(convertedFile.value);
  const a = document.createElement("a");
  a.href = url;
  a.download = convertedFile.value.name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
</script>
