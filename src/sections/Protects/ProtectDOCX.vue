<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div class="p-8">
        <h1 class="text-3xl font-bold text-center text-blue-600 mb-8">Protect Word Document</h1>

        <div
          class="border-2 border-dashed border-blue-300 rounded-lg p-8 mb-6 text-center cursor-pointer hover:border-blue-500 transition-colors duration-300"
          @dragover.prevent
          @drop.prevent="handleFileDrop"
          @click="$refs.fileInput.click()">
          <input type="file" ref="fileInput" @change="handleFileSelect" accept=".docx" class="hidden" />
          <UploadCloudIcon class="mx-auto h-12 w-12 text-blue-500 mb-4" />
          <p class="text-lg text-gray-600">Drag and drop a DOCX file here, or click to select</p>
          <p class="text-sm text-gray-500 mt-2">Supports: DOCX</p>
        </div>

        <div v-if="selectedFile" class="mb-6">
          <div class="flex items-center bg-blue-50 p-4 rounded-lg">
            <FileIcon class="h-6 w-6 text-blue-500 mr-2" />
            <span class="text-gray-700">{{ selectedFile.name }}</span>
          </div>
        </div>

        <div class="mb-6">
          <label for="encryptPassword" class="block text-sm font-medium text-gray-700 mb-1">Encrypt Password</label>
          <input v-model="encryptPassword" type="password" id="encryptPassword" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Enter encryption password" />
          <p class="text-xs text-gray-500 mt-1">Required to open the Word document.</p>
        </div>

        <button
          @click="protectFile"
          class="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-md hover:from-blue-600 hover:to-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          :disabled="isProtecting || !selectedFile">
          <span v-if="!isProtecting">Secure Document</span>
          <span v-else class="flex items-center justify-center">
            <LoaderIcon class="animate-spin mr-2 h-5 w-5" />
            Securing...
          </span>
        </button>

        <div v-if="protectedFile" class="mt-6">
          <div class="flex items-center justify-between bg-green-50 p-4 rounded-lg">
            <div class="flex items-center">
              <LockIcon class="h-6 w-6 text-green-500 mr-2" />
              <span class="text-gray-700">{{ protectedFile.name }}</span>
            </div>
            <button @click="downloadFile" class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">Download</button>
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
import { UploadCloudIcon, FileIcon, LoaderIcon, LockIcon } from "lucide-vue-next";

const config = useRuntimeConfig();
const fileInput = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | null>(null);
const protectedFile = ref<File | null>(null);
const isProtecting = ref(false);
const encryptPassword = ref("");

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

const protectFile = async () => {
  if (!selectedFile.value) return;

  isProtecting.value = true;
  try {
    const convertApi = ConvertApi.auth(config.public.CONVERT_API_TOKEN);
    const params = convertApi.createParams();
    params.add("file", selectedFile.value);
    params.add("EncryptPassword", encryptPassword.value);

    const result = await convertApi.convert("docx", "protect", params);
    const fileUrl = result.files[0].Url;

    const response = await fetch(fileUrl);
    const blob = await response.blob();
    protectedFile.value = new File([blob], `${selectedFile.value.name.replace(".docx", "")}_protected.docx`, { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
  } catch (error) {
    console.error("Protection error:", error);
    alert("An error occurred during Word document protection. Please try again.");
  } finally {
    isProtecting.value = false;
  }
};

const downloadFile = () => {
  if (!protectedFile.value) return;

  const url = URL.createObjectURL(protectedFile.value);
  const a = document.createElement("a");
  a.href = url;
  a.download = protectedFile.value.name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
</script>
