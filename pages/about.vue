<script setup>
import Navbar from "~/src/components/Navbar.vue";
import Mission from "~/src/sections/AboutSection/Mission.vue";
import InfoCards from "~/src/sections/AboutSection/InfoCards.vue";
import Values from "~/src/sections/AboutSection/Values.vue";
import Footer from "~/src/components/Footer.vue";
</script>
<template>
  <title>About | 7ools</title>
  <Navbar />
  <div class="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
    <Mission />
    <InfoCards />
    <Values />
    <Footer />
  </div>
</template>
