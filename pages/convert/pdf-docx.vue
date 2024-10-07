<script setup>
import Navbar from "~/src/components/Navbar.vue";
import Layout from "~/src/Layout.vue";
import PDFtoDocx from "~/src/sections/Convert/PDFtoDocx.vue";
import Footer from "~/src/components/Footer.vue";

useSeoMeta({
  title: "PDF to Docx | 7ools",
  ogTitle: "PDF to Docx | 7ools",
});
</script>
<template>
  <Layout>
    <Navbar />
    <div class="container mx-auto px-4 min-h-screen">
      <PDFtoDocx />
    </div>
    <Footer />
  </Layout>
</template>
