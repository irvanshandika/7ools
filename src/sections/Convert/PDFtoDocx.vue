<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4">
    <div class="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
      <h1 class="text-3xl font-bold text-center text-blue-600 mb-6">Convert PDF to DOCX</h1>

      <div
        class="border-3 border-dashed border-blue-300 rounded-2xl p-8 mb-6 text-center cursor-pointer hover:border-blue-400 transition-colors duration-300"
        @dragover.prevent
        @drop.prevent="handleFileDrop"
        @click="$refs.fileInput.click()">
        <input type="file" ref="fileInput" @change="handleFileSelect" accept=".pdf" class="hidden" />
        <FileIcon class="h-16 w-16 mx-auto mb-4 text-blue-500" />
        <p class="text-lg text-gray-600">
          Drag and drop a PDF file here or
          <span class="text-blue-500 underline">click to select</span>
        </p>
      </div>

      <div v-if="selectedFile" class="mb-6">
        <div class="flex items-center justify-between bg-blue-50 rounded-lg p-4">
          <div class="flex items-center">
            <FileTextIcon class="h-6 w-6 text-blue-500 mr-2" />
            <span class="text-gray-700">{{ selectedFile.name }}</span>
          </div>
          <button
            @click="convertFile"
            class="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50"
            :disabled="isConverting">
            <span v-if="!isConverting">Convert</span>
            <span v-else class="flex items-center">
              <LoaderIcon class="animate-spin mr-2 h-5 w-5" />
              Converting...
            </span>
          </button>
        </div>
      </div>

      <div v-if="convertedFile" class="mb-6">
        <div class="flex items-center justify-between bg-green-50 rounded-lg p-4">
          <div class="flex items-center">
            <FileTextIcon class="h-6 w-6 text-green-500 mr-2" />
            <span class="text-gray-700">{{ convertedFile.name }}</span>
          </div>
          <button @click="downloadFile" class="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2">
            <DownloadIcon class="h-5 w-5 inline-block mr-1" />
            Download
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ConvertApi from "convertapi-js";
import { useRuntimeConfig } from "#app";
import { FileIcon, FileTextIcon, LoaderIcon, DownloadIcon } from "lucide-vue-next";

const config = useRuntimeConfig();
const fileInput = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | null>(null);
const convertedFile = ref<File | null>(null);
const isConverting = ref(false);

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0];
  }
};

const handleFileDrop = (event: DragEvent) => {
  if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
    selectedFile.value = event.dataTransfer.files[0];
  }
};

const convertFile = async () => {
  if (!selectedFile.value) return;

  isConverting.value = true;
  try {
    const convertApi = ConvertApi.auth(config.public.CONVERT_API_TOKEN);
    const params = convertApi.createParams();
    params.add("file", selectedFile.value);

    const result = await convertApi.convert("pdf", "docx", params);
    const fileUrl = result.files[0].Url;

    const response = await fetch(fileUrl);
    const blob = await response.blob();
    convertedFile.value = new File([blob], selectedFile.value.name.replace(".pdf", ".docx"), { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
  } catch (error) {
    console.error("Conversion error:", error);
    alert("An error occurred during conversion. Please try again.");
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
