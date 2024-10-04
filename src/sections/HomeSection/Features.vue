<template>
  <section id="features" class="py-20 bg-gray-100">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">Our Powerful Features</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="feature in features" :key="feature.title" class="bg-white p-6 rounded-lg shadow-md text-center">
          <component :is="feature.icon" class="h-12 w-12 mx-auto mb-4 text-blue-500" />
          <h3 class="text-xl font-semibold mb-2 text-gray-800">{{ feature.title }}</h3>
          <p class="text-gray-600">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ImageIcon, ClockIcon, ClapperboardIcon } from "lucide-vue-next";

const features = [
  {
    icon: ImageIcon,
    title: "Background Remover",
    description: "Easily remove backgrounds from your images with our AI-powered tool.",
  },
  {
    icon: ClockIcon,
    title: "Time Tracker",
    description: "Boost productivity by tracking your time spent on various tasks and projects.",
  },
  {
    icon: ClapperboardIcon,
    title: "Media Downloader",
    description: "Download media from popular platforms like Instagram and YouTube with ease.",
  },
];
</script>
