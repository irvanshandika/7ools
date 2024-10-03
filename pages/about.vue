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
    <Navbar />
    <div class="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <Mission />
      <InfoCards />
      <Values />
      <Footer />
    </div>
  </Layout>
</template>
