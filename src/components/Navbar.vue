<template>
  <header class="relative flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3">
    <nav class="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
      <div class="flex items-center justify-between">
        <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
          <BoltIcon class="w-8 h-8 text-indigo-600" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap">7ools</span>
        </a>
        <div class="sm:hidden">
          <button
            type="button"
            class="hs-collapse-toggle relative size-7 flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none bg-transparent hover:bg-white/10 focus:bg-white/10"
            id="hs-navbar-example-collapse"
            aria-expanded="false"
            aria-controls="hs-navbar-example"
            aria-label="Toggle navigation"
            data-hs-collapse="#hs-navbar-example">
            <svg
              class="hs-collapse-open:hidden shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round">
              <line x1="3" x2="21" y1="6" y2="6" />
              <line x1="3" x2="21" y1="12" y2="12" />
              <line x1="3" x2="21" y1="18" y2="18" />
            </svg>
            <svg
              class="hs-collapse-open:block hidden shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
            <span class="sr-only">Toggle navigation</span>
          </button>
        </div>
      </div>
      <div id="hs-navbar-example" class="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:block" aria-labelledby="hs-navbar-example-collapse">
        <div class="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
          <NuxtLink
            to="/"
            :class="[
              'block py-2 px-3 rounded md:p-0',
              isActive('/')
                ? 'relative py-2.5 duration-300 ease-linear text-indigo-600 after:absolute after:w-full after:left-0 after:bottom-0 after:h-px after:rounded-md after:origin-left after:ease-linear after:duration-300 after:scale-x-100 after:bg-indigo-600'
                : 'relative py-2.5 duration-300 ease-linear hover:text-indigo-600 after:absolute after:w-full after:left-0 after:bottom-0 after:h-px after:rounded-md after:origin-left after:ease-linear after:duration-300 after:scale-x-0 hover:after:scale-x-100 after:bg-indigo-600',
            ]">
            Home
          </NuxtLink>
          <NuxtLink
            to="/about"
            :class="[
              'block py-2 px-3 rounded md:p-0',
              isActive('/about')
                ? 'relative py-2.5 duration-300 ease-linear text-indigo-600 after:absolute after:w-full after:left-0 after:bottom-0 after:h-px after:rounded-md after:origin-left after:ease-linear after:duration-300 after:scale-x-100 after:bg-indigo-600'
                : 'relative py-2.5 duration-300 ease-linear hover:text-indigo-600 after:absolute after:w-full after:left-0 after:bottom-0 after:h-px after:rounded-md after:origin-left after:ease-linear after:duration-300 after:scale-x-0 hover:after:scale-x-100 after:bg-indigo-600',
            ]">
            About
          </NuxtLink>
          <DropdownContents />
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useRoute } from "vue-router";
import DropdownContents from "./DropdownContents.vue";
import { BoltIcon } from "lucide-vue-next";

const route = useRoute();

const isActive = (path) => {
  return route.path === path;
};
</script>
