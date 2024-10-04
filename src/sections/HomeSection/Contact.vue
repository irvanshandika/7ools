<template>
  <section id="contact" class="py-20 bg-gray-100">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-12 text-gray-800">Get in Touch</h2>
      <form class="max-w-lg mx-auto">
        <div class="mb-4">
          <label for="name" class="block text-gray-700 mb-2">Name</label>
          <input type="text" id="name" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-700 mb-2">Email</label>
          <input type="email" id="email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>
        <div class="mb-4">
          <label for="message" class="block text-gray-700 mb-2">Message</label>
          <textarea id="message" rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
        </div>
        <button type="submit" class="w-full bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors duration-300">Send Message</button>
      </form>
    </div>
  </section>
</template>
