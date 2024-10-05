<script setup lang="ts">
import Navbar from "~/src/components/Navbar.vue";
import Layout from "~/src/Layout.vue";
// import YoutubeDownloader from "~/src/sections/Media/YoutubeDownloader.vue";
import Maintenance from "~/src/maintenance.vue";
import Footer from "~/src/components/Footer.vue";

useSeoMeta({
  title: "Youtube Downloader | 7ools",
  ogTitle: "Youtube Downloader | 7ools",
});
</script>
<template>
  <Layout>
    <Navbar />
    <div class="container mx-auto px-4 min-h-screen">
      <!-- <YoutubeDownloader /> -->
      <Maintenance />
    </div>
    <Footer />
  </Layout>
</template>
