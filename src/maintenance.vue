<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col justify-center items-center px-4 py-12">
    <div class="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
      <div class="p-8">
        <div class="flex justify-center mb-6">
          <BoltIcon class="h-16 w-16 text-blue-500" />
        </div>
        <h1 class="text-3xl font-bold text-center text-gray-800 mb-4">We'll be back soon!</h1>
        <p class="text-center text-gray-600 mb-8">We're currently performing some maintenance on 7ools. We'll be back up and running as soon as possible. Thank you for your patience!</p>
        <div class="flex justify-center space-x-4 mb-8">
          <a href="https://twitter.com/7ools" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:text-blue-600 transition-colors duration-300">
            <TwitterIcon class="h-6 w-6" />
            <span class="sr-only">Twitter</span>
          </a>
          <a href="https://facebook.com/7ools" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:text-blue-600 transition-colors duration-300">
            <FacebookIcon class="h-6 w-6" />
            <span class="sr-only">Facebook</span>
          </a>
          <a href="mailto:support@7ools.com" class="text-blue-500 hover:text-blue-600 transition-colors duration-300">
            <MailIcon class="h-6 w-6" />
            <span class="sr-only">Email</span>
          </a>
        </div>
        <div class="bg-gray-100 p-4 rounded-lg">
          <h2 class="text-lg font-semibold text-gray-800 mb-2">Estimated Downtime</h2>
          <div class="flex justify-between items-center">
            <div class="text-gray-600">
              <ClockIcon class="inline-block h-5 w-5 mr-1" />
              <span>2 hours</span>
            </div>
            <div class="text-gray-600">
              <CalendarIcon class="inline-block h-5 w-5 mr-1" />
              <span>{{ formattedDate }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 px-8 py-4">
        <p class="text-center text-gray-500 text-sm">&copy; {{ new Date().getFullYear() }} 7ools. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BoltIcon, TwitterIcon, FacebookIcon, MailIcon, ClockIcon, CalendarIcon } from "lucide-vue-next";

const formattedDate = computed(() => {
  const date = new Date();
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
});
</script>
