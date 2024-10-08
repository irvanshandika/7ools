<script setup>
import PDF from "./icons/PDF.vue";
import DOCX from "./icons/DOCX.vue";
</script>
<template>
  <div class="hs-dropdown [--strategy:static] sm:[--strategy:absolute] [--adaptive:none] relative">
    <button id="hs-navbar-example-dropdown-sub" type="button" class="hs-dropdown-toggle w-full flex justify-between items-center text-sm text-gray-800 rounded-lg py-2 px-3 hover:bg-gray-100 focus:outline-none focus:bg-gray-100">
      Protects
      <svg
        class="hs-dropdown-open:-rotate-180 sm:hs-dropdown-open:-rotate-90 sm:-rotate-90 duration-300 ms-2 shrink-0 size-4"
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
      class="hs-dropdown-menu transition-[opacity,margin] ease-in-out duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 sm:w-48 hidden z-10 sm:mt-2 bg-white sm:shadow-md rounded-lg before:absolute sm:border before:-end-5 before:top-0 before:h-full before:w-5 sm:!mx-[10px] top-0 end-full"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="hs-navbar-example-dropdown-sub">
      <div class="p-1 space-y-1">
        <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100" href="/protects/docx">
          <DOCX class="size-6" />
          Protect DOCX
        </a>
        <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100" href="/protects/pdf">
          <DOCX class="size-6" />
          Protect PDF
        </a>
      </div>
    </div>
  </div>
</template>
