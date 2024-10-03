<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div class="p-8">
        <h1 class="text-3xl font-bold text-center text-blue-600 mb-8">Remove Background</h1>

        <div
          @dragover.prevent
          @drop.prevent="onDrop"
          class="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors duration-300"
          :class="{ 'border-blue-500 bg-blue-50': isDragging }"
          @dragenter="isDragging = true"
          @dragleave="isDragging = false">
          <input type="file" ref="fileInput" @change="onFileSelected" accept="image/*" class="hidden" />
          <div @click="$refs.fileInput.click()" class="space-y-4">
            <UploadCloudIcon class="mx-auto h-12 w-12 text-blue-500" />
            <p class="text-lg text-gray-600">Drag and drop your image here, or click to select</p>
            <p class="text-sm text-gray-500">Supports: JPG, PNG, JPEG, WEBP</p>
          </div>
        </div>

        <div v-if="originalImage || processedImage" class="mt-8 space-y-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 class="text-xl font-semibold mb-4 text-gray-700">Original Image</h2>
              <img :src="originalImage || ''" alt="Original" class="w-full h-64 object-cover rounded-lg shadow-md" />
            </div>
            <div>
              <h2 class="text-xl font-semibold mb-4 text-gray-700">Processed Image</h2>
              <img :src="processedImage || '/placeholder.svg?height=256&width=256'" alt="Processed" class="w-full h-64 object-cover rounded-lg shadow-md" />
            </div>
          </div>

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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { UploadCloudIcon } from "lucide-vue-next";
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
