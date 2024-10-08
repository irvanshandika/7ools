<script setup>
import Navbar from "~/src/components/Navbar.vue";
import Layout from "~/src/Layout.vue";
import ConvertImages from "~/src/sections/Convert/ConvertImages.vue";
import Footer from "~/src/components/Footer.vue";

useSeoMeta({
  title: "Convert Images | 7ools",
  ogTitle: "Convert Images | 7ools",
});
</script>
<template>
  <Layout>
    <Navbar />
    <div>
      <ConvertImages />
    </div>
    <Footer />
  </Layout>
</template>
