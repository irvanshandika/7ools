<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <BoltIcon class="w-8 h-8 text-indigo-600 dark:text-white" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">7ools</span>
      </a>
      <button
        data-collapse-toggle="navbar-default"
        type="button"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-default"
        aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>
      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul
          class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
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
          </li>
          <li>
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
          </li>
          <li>
            <DropdownContents />
          </li>
        </ul>
      </div>
    </div>
  </nav>
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
