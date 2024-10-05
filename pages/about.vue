<script setup>
import Navbar from "~/src/components/Navbar.vue";
import Mission from "~/src/sections/AboutSection/Mission.vue";
import InfoCards from "~/src/sections/AboutSection/InfoCards.vue";
import Values from "~/src/sections/AboutSection/Values.vue";
import Footer from "~/src/components/Footer.vue";
import Layout from "~/src/Layout.vue";

useSeoMeta({
  title: "About | 7ools",
  ogTitle: "About | 7ools",
});
</script>
<template>
  <Layout>
    <div class="min-h-screen">
      <Navbar />
      <main class="container mx-auto pb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-center text-blue-600 mb-12">About 7ools</h1>
        <Mission />
        <InfoCards />
        <Values />
      </main>
      <Footer />
    </div>
  </Layout>
</template>
