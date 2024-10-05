<script setup>
import { Instagram, YoutubeIcon, FacebookIcon } from "lucide-vue-next";
</script>
<template>
  <div class="hs-dropdown relative [--gpu-acceleration:false] inline-flex">
    <button
      id="hs-dropdown-scale-animation"
      type="button"
      class="hs-dropdown-toggle inline-flex items-center gap-x-2 font-medium hover:text-indigo-600 focus:outline-none focus:text-indigo-400"
      aria-haspopup="menu"
      aria-expanded="false"
      aria-label="Dropdown">
      Contents
      <svg class="hs-dropdown-open:rotate-180 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>

    <div
      class="hs-dropdown-menu hs-dropdown-open:scale-100 hs-dropdown-open:opacity-100 scale-95 opacity-0 z-10 ease-in-out transition-[transform,opacity] duration-200 min-w-60 bg-white shadow-md rounded-lg hidden"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="hs-dropdown-scale-animation">
      <div class="p-1 space-y-0.5">
        <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100" href="/remove"> Remove Background </a>
        <div class="p-1 space-y-0.5">
          <span class="block pt-2 pb-1 px-3 text-xs font-medium uppercase text-gray-400 dark:text-neutral-500"> Media Downloader </span>
          <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100" href="/media-downloader/instagram">
            <Instagram class="size-5" />
            Instagram
          </a>
          <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100" href="/media-downloader/youtube">
            <YoutubeIcon class="size-5" />
            Youtube
          </a>
          <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100" href="/media-downloader/facebook">
            <FacebookIcon class="size-5" />
            Facebook
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
