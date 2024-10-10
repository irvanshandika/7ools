<template>
  <div class="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div class="p-8">
        <h1 class="text-3xl font-bold text-center text-pink-600 mb-8">Protect PDF</h1>

        <div
          class="border-2 border-dashed border-pink-300 rounded-lg p-8 mb-6 text-center cursor-pointer hover:border-pink-500 transition-colors duration-300"
          @dragover.prevent
          @drop.prevent="handleFileDrop"
          @click="$refs.fileInput.click()">
          <input type="file" ref="fileInput" @change="handleFileSelect" accept=".pdf" class="hidden" />
          <UploadCloudIcon class="mx-auto h-12 w-12 text-pink-500 mb-4" />
          <p class="text-lg text-gray-600">Drag and drop a PDF file here, or click to select</p>
          <p class="text-sm text-gray-500 mt-2">Supports: PDF</p>
        </div>

        <div v-if="selectedFile" class="mb-6">
          <div class="flex items-center bg-yellow-50 p-4 rounded-lg">
            <FileIcon class="h-6 w-6 text-yellow-500 mr-2" />
            <span class="text-gray-700">{{ selectedFile.name }}</span>
          </div>
        </div>

        <div class="space-y-6 mb-6">
          <div>
            <label for="userPassword" class="block text-sm font-medium text-gray-700 mb-1">User Password</label>
            <input v-model="userPassword" type="password" id="userPassword" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500" placeholder="Enter user password" />
            <p class="text-xs text-gray-500 mt-1">Required to open the PDF document.</p>
          </div>

          <div>
            <label for="ownerPassword" class="block text-sm font-medium text-gray-700 mb-1">Owner Password</label>
            <input v-model="ownerPassword" type="password" id="ownerPassword" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500" placeholder="Enter owner password" />
            <p class="text-xs text-gray-500 mt-1">Required to change permissions or remove protection.</p>
          </div>
        </div>
        <div class="mb-6 flex justify-center">
          <div ref="recaptchaContainer"></div>
        </div>
        <button
          @click="protectFile"
          class="w-full bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-6 py-3 rounded-md hover:from-pink-600 hover:to-yellow-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50"
          :disabled="isProtecting || !selectedFile || !recaptchaVerified">
          <span v-if="!isProtecting">Secure PDF</span>
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
const recaptchaVerified = ref(false);
const recaptchaContainer = ref<HTMLDivElement | null>(null);

const config = useRuntimeConfig();
const fileInput = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | null>(null);
const protectedFile = ref<File | null>(null);
const isProtecting = ref(false);
const userPassword = ref("");
const ownerPassword = ref("");

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
  if (!selectedFile.value || !recaptchaVerified.value) return;

  isProtecting.value = true;
  try {
    const convertApi = ConvertApi.auth(config.public.CONVERT_API_TOKEN);
    const params = convertApi.createParams();
    params.add("file", selectedFile.value);
    params.add("UserPassword", userPassword.value);
    params.add("OwnerPassword", ownerPassword.value);

    const result = await convertApi.convert("pdf", "protect", params);
    const fileUrl = result.files[0].Url;

    const response = await fetch(fileUrl);
    const blob = await response.blob();
    protectedFile.value = new File([blob], `${selectedFile.value.name.replace(".pdf", "")}_protected.pdf`, { type: "application/pdf" });
  } catch (error) {
    console.error("Protection error:", error);
    alert("An error occurred during PDF protection. Please try again.");
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
const onRecaptchaVerified = () => {
  recaptchaVerified.value = true;
};

const resetRecaptcha = () => {
  if (window.grecaptcha) {
    window.grecaptcha.reset();
  }
  recaptchaVerified.value = false;
};

onMounted(() => {
  // Initialize reCAPTCHA
  if (window.grecaptcha) {
    window.grecaptcha.render(recaptchaContainer.value, {
      sitekey: config.public.RECAPTCHA_SITE_KEY,
      callback: onRecaptchaVerified,
      "expired-callback": resetRecaptcha,
    });
  }
});
</script>

<script lang="ts">
declare global {
  interface Window {
    grecaptcha: any;
  }
}
</script>
