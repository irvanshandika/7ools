<script setup>
import Navbar from "~/src/components/Navbar.vue";
import Layout from "~/src/Layout.vue";
import FacebookDownloader from "~/src/sections/Media/FacebookDownloader.vue";
import Footer from "~/src/components/Footer.vue";

useSeoMeta({
  title: "Facebook Downloader | 7ools",
  ogTitle: "Facebook Downloader | 7ools",
});
</script>
<template>
  <Layout>
    <Navbar />
    <div>
      <FacebookDownloader />
    </div>
    <Footer />
  </Layout>
</template>
