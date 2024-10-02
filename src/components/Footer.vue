<template>
  <footer class="bg-blue-600 text-white py-8">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="text-2xl font-bold mb-4 md:mb-0">7ools</div>
        <div class="flex space-x-4">
          <a href="#" class="hover:text-blue-200">Privacy Policy</a>
          <a href="#" class="hover:text-blue-200">Terms of Service</a>
          <a href="#" class="hover:text-blue-200">Contact</a>
        </div>
      </div>
      <div class="mt-8 text-center text-blue-200">&copy; {{ new Date().getFullYear() }} 7ools. All rights reserved.</div>
    </div>
  </footer>
</template>
