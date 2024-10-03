<script setup>
import Navbar from "~/src/components/Navbar.vue";
import Hero from "~/src/sections/HomeSection/Hero.vue";
import Features from "~/src/sections/HomeSection/Features.vue";
import CTA from "~/src/sections/HomeSection/CTA.vue";
import Footer from "~/src/components/Footer.vue";
import Layout from "~/src/Layout.vue";

useSeoMeta({
  title: "Home | 7ools",
  ogTitle: "Home | 7ools",
});
</script>

<template>
  <Layout>
    <div class="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <Navbar />
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </div>
  </Layout>
</template>
