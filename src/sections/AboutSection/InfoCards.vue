<template>
  <section class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
    <div class="bg-white rounded-lg shadow-lg p-8">
      <UserIcon class="h-12 w-12 text-yellow-500 mb-4" />
      <h2 class="text-2xl font-semibold text-blue-600 mb-4">Who We Are</h2>
      <p class="text-gray-700 leading-relaxed">We're a team of passionate developers, designers, and productivity enthusiasts. Our diverse backgrounds and expertise come together to create tools that are both powerful and intuitive.</p>
    </div>
    <div class="bg-white rounded-lg shadow-lg p-8">
      <TargetIcon class="h-12 w-12 text-green-500 mb-4" />
      <h2 class="text-2xl font-semibold text-blue-600 mb-4">Our Vision</h2>
      <p class="text-gray-700 leading-relaxed">
        We envision a world where technology seamlessly enhances human productivity, allowing individuals and teams to focus on what truly matters. 7ools aims to be at the forefront of this productivity revolution.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { UserIcon, TargetIcon } from "lucide-vue-next";
</script>
