<script setup>
import Navbar from "~/src/components/Navbar.vue";
import Layout from "~/src/Layout.vue";
import YoutubeDownloader from "~/src/sections/Media/YoutubeDownloader.vue";
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
      <YoutubeDownloader />
    </div>
    <Footer />
  </Layout>
</template>
