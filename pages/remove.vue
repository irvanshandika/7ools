<script setup>
import Navbar from "~/src/components/Navbar.vue";
import RemoveBakcground from "~/src/sections/Remove/Remove-Bakcground.vue";
import Footer from "~/src/components/Footer.vue";
import Layout from "~/src/Layout.vue";

useSeoMeta({
  title: "Remove Background | 7ools",
  ogTitle: "Remove Background | 7ools",
});
</script>

<template>
  <Layout>
    <Navbar />
    <RemoveBakcground />
    <Footer />
  </Layout>
</template>
