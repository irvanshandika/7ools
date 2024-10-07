<script setup>
import DropdownConverts from "./DropdownConverts.vue";
import DropdownMediaDownloader from "./DropdownMediaDownloader.vue";
</script>
<template>
  <div class="hs-dropdown [--strategy:static] sm:[--strategy:fixed] [--adaptive:none]">
    <button
      id="hs-navbar-example-dropdown"
      type="button"
      class="hs-dropdown-toggle flex items-center w-full text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 font-medium"
      aria-haspopup="menu"
      aria-expanded="false"
      aria-label="Mega Menu">
      Contents
      <svg
        class="hs-dropdown-open:-rotate-180 sm:hs-dropdown-open:rotate-0 duration-300 ms-1 shrink-0 size-4"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>

    <div
      class="hs-dropdown-menu transition-[opacity,margin] ease-in-out duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 sm:w-48 z-10 bg-white sm:shadow-md rounded-lg p-1 space-y-1 before:absolute top-full sm:border before:-top-5 before:start-0 before:w-full before:h-5 hidden"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="hs-navbar-example-dropdown">
      <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100" href="/remove"> Remove Background </a>
      <DropdownMediaDownloader />
      <DropdownConverts />
    </div>
  </div>
</template>
