<template>
  <section class="bg-white rounded-lg shadow-md p-8">
    <h2 class="text-2xl font-semibold text-blue-600 mb-4">Our Values</h2>
    <ul class="space-y-4">
      <li class="flex items-start">
        <CheckCircleIcon class="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
        <span class="text-gray-700">Innovation: We constantly push the boundaries of what's possible in web-based tools.</span>
      </li>
      <li class="flex items-start">
        <CheckCircleIcon class="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
        <span class="text-gray-700">User-Centric: Our users' needs drive every decision we make in our product development.</span>
      </li>
      <li class="flex items-start">
        <CheckCircleIcon class="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
        <span class="text-gray-700">Simplicity: We believe in the power of simplicity and strive to make complex tasks easy for our users.</span>
      </li>
      <li class="flex items-start">
        <CheckCircleIcon class="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
        <span class="text-gray-700">Reliability: We're committed to providing tools that our users can depend on, day in and day out.</span>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { CheckCircleIcon } from "lucide-vue-next";
</script>
