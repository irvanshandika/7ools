<template>
  <footer class="bg-gray-800 text-white py-8">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="text-2xl font-bold mb-4 md:mb-0">7ools</div>
        <div class="flex space-x-4">
          <a href="#" class="hover:text-blue-400 transition-colors duration-300">
            <TwitterIcon class="h-6 w-6" />
          </a>
          <a href="#" class="hover:text-blue-400 transition-colors duration-300">
            <FacebookIcon class="h-6 w-6" />
          </a>
          <a href="#" class="hover:text-blue-400 transition-colors duration-300">
            <InstagramIcon class="h-6 w-6" />
          </a>
        </div>
      </div>
      <div class="mt-8 text-center text-gray-400 text-sm">
        &copy; {{ new Date().getFullYear() }} 7ools. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { TwitterIcon, FacebookIcon, InstagramIcon } from 'lucide-vue-next'
</script>