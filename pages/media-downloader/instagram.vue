<script setup>
import Navbar from "~/src/components/Navbar.vue";
import Layout from "~/src/Layout.vue";
import InstagramDownloader from "~/src/sections/Media/InstagramDownloader.vue";
import Footer from "~/src/components/Footer.vue";

useSeoMeta({
  title: "Instagram Downloader | 7ools",
  ogTitle: "Instagram Downloader | 7ools",
});
</script>
<template>
  <Layout>
    <Navbar />
    <div>
      <InstagramDownloader />
    </div>
    <Footer />
  </Layout>
</template>
