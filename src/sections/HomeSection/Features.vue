<template>
  <section id="features" class="py-20">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12">Our Tools</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="(feature, index) in features" :key="index" class="bg-white p-6 rounded-lg shadow-md">
          <component :is="feature.icon" class="h-12 w-12 text-blue-500 mb-4" />
          <h3 class="text-xl font-semibold mb-2">{{ feature.title }}</h3>
          <p class="text-gray-600">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { MenuIcon, ClockIcon, ChartBarIcon, BoltIcon } from "lucide-vue-next";

const features = [
  {
    icon: BoltIcon,
    title: "Powerful Tools",
    description: "Access a wide range of tools designed to streamline your work process.",
  },
  {
    icon: ClockIcon,
    title: "Time-Saving",
    description: "Reduce time spent on repetitive tasks and focus on what matters most.",
  },
  {
    icon: ChartBarIcon,
    title: "Increased Productivity",
    description: "Boost your efficiency with our intuitive and user-friendly tools.",
  },
];
</script>
