<script setup lang="ts">
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
    <div>
      <YoutubeDownloader />
    </div>
    <Footer />
  </Layout>
</template>
