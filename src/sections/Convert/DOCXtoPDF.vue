<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div class="p-8">
        <h1 class="text-3xl font-bold text-center text-blue-600 mb-8">Convert DOCX to PDF</h1>

        <div
          class="border-2 border-dashed border-blue-300 rounded-lg p-8 mb-6 text-center cursor-pointer hover:border-blue-500 transition-colors duration-300"
          @dragover.prevent
          @drop.prevent="handleFileDrop"
          @click="$refs.fileInput.click()">
          <input type="file" ref="fileInput" @change="handleFileSelect" accept=".docx" class="hidden" />
          <UploadCloudIcon class="mx-auto h-12 w-12 text-blue-500 mb-4" />
          <p class="text-lg text-gray-600">Drag and drop a PDF file here, or click to select</p>
          <p class="text-sm text-gray-500 mt-2">Supports: DOCX</p>
        </div>

        <div v-if="selectedFile" class="mb-6">
          <div class="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
            <div class="flex items-center">
              <DOCX class="lg:h-6 h-14 lg:w-6 w-14 text-blue-500 mr-2" />
              <span class="text-gray-700 text-sm">{{ selectedFile.name }}</span>
            </div>
            <button
              @click="convertFile"
              class="bg-blue-500 text-white lg:px-6 px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
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
          <div class="flex items-center justify-between bg-green-50 p-4 rounded-lg">
            <div class="flex items-center">
              <PDF class="lg:h-6 h-14 lg:w-6 w-14 text-green-500 mr-2" />
              <span class="text-gray-700 text-sm">{{ convertedFile.name }}</span>
            </div>
            <button @click="downloadFile" class="bg-green-500 text-white lg:px-6 px-4 py-2 rounded-full hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ConvertApi from "convertapi-js";
import { useRuntimeConfig } from "#app";
import { UploadCloudIcon, LoaderIcon } from "lucide-vue-next";
import PDF from "~/src/components/icons/PDF.vue";
import DOCX from "~/src/components/icons/DOCX.vue";

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

    const result = await convertApi.convert("docx", "pdf", params);
    const fileUrl = result.files[0].Url;

    const response = await fetch(fileUrl);
    const blob = await response.blob();
    convertedFile.value = new File([blob], selectedFile.value.name.replace(".docx", ".pdf"), { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
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
