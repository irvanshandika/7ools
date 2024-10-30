<script lang="ts">
import { BoltIcon } from "lucide-vue-next";
</script>
<template>
  <footer class="bg-white dark:bg-gray-950 text-gray-700 dark:text-gray-300">
    <div class="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5">
      <div class="border-t border-t-gray-200 dark:border-t-gray-800 py-16 md:py-20 flex flex-col lg:flex-row gap-14 gap-y-16">
        <div class="w-full lg:w-96 space-y-6">
          <a href="/" class="flex gap-x-2">
            <BoltIcon class="w-6 h-6 text-blue-600 dark:text-blue-500" />
            <span class="text-2xl font-semibold text-gray-900 dark:text-gray-100">7ools</span>
          </a>
          <p class="max-w-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta iusto est quia a</p>
        </div>
        <nav class="flex-1 grid grid-cols-2 md:grid-cols-4 gap-10">
          <div class="space-y-6">
            <h1 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Services</h1>
            <ul class="space-y-3">
              <li>
                <a href="#" class="duration-200 hover:text-blue-600 dark:hover:text-blue-500">Marketing</a>
              </li>
              <li>
                <a href="#" class="duration-200 hover:text-blue-600 dark:hover:text-blue-500">Consultancy</a>
              </li>
              <li>
                <a href="#" class="duration-200 hover:text-blue-600 dark:hover:text-blue-500">Mobile Development</a>
              </li>
              <li>
                <a href="#" class="duration-200 hover:text-blue-600 dark:hover:text-blue-500">Mobile Development</a>
              </li>
              <li>
                <a href="#" class="duration-200 hover:text-blue-600 dark:hover:text-blue-500">Mobile Development</a>
              </li>
            </ul>
          </div>
          <div class="space-y-6">
            <h1 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Company</h1>
            <ul class="space-y-3">
              <li>
                <a href="#" class="duration-200 hover:text-blue-600 dark:hover:text-blue-500">About</a>
              </li>
              <li>
                <a href="#" class="duration-200 hover:text-blue-600 dark:hover:text-blue-500">Carrer</a>
              </li>
              <li>
                <a href="#" class="duration-200 hover:text-blue-600 dark:hover:text-blue-500">Contact</a>
              </li>
              <li>
                <a href="#" class="duration-200 hover:text-blue-600 dark:hover:text-blue-500">Services</a>
              </li>
              <li>
                <a href="#" class="duration-200 hover:text-blue-600 dark:hover:text-blue-500">Services</a>
              </li>
            </ul>
          </div>
          <div class="space-y-6">
            <h1 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Social</h1>
            <ul class="space-y-3">
              <li>
                <a href="#" class="duration-200 hover:text-blue-600 dark:hover:text-blue-500">Facebook</a>
              </li>
              <li>
                <a href="#" class="duration-200 hover:text-blue-600 dark:hover:text-blue-500">Twitter</a>
              </li>
              <li>
                <a href="#" class="duration-200 hover:text-blue-600 dark:hover:text-blue-500">Instagram</a>
              </li>
              <li>
                <a href="#" class="duration-200 hover:text-blue-600 dark:hover:text-blue-500">Linkedin</a>
              </li>
              <li>
                <a href="#" class="duration-200 hover:text-blue-600 dark:hover:text-blue-500">Threads</a>
              </li>
            </ul>
          </div>
          <div class="space-y-6">
            <h1 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Ressources</h1>
            <ul class="space-y-3">
              <li>
                <a href="#" class="duration-200 hover:text-blue-600 dark:hover:text-blue-500">Blog</a>
              </li>
              <li>
                <a href="#" class="duration-200 hover:text-blue-600 dark:hover:text-blue-500">Privacy</a>
              </li>
              <li>
                <a href="#" class="duration-200 hover:text-blue-600 dark:hover:text-blue-500">Terms</a>
              </li>
              <li>
                <a href="#" class="duration-200 hover:text-blue-600 dark:hover:text-blue-500">FAQ</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
    <div class="py-3 bg-gray-100 dark:bg-gray-900">
      <div class="max-w-3xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 flex justify-center text-center">
        <p>&copy; {{ new Date().getFullYear() }} 7ools. All right reserved</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { TwitterIcon, FacebookIcon, InstagramIcon } from "lucide-vue-next";
</script>
