<script setup>
import Navbar from "~/src/components/Navbar.vue";
import Layout from "~/src/Layout.vue";
import DOCXtoPDF from "~/src/sections/Convert/DOCXtoPDF.vue";
import Footer from "~/src/components/Footer.vue";

useSeoMeta({
  title: "Docx to PDF | 7ools",
  ogTitle: "Docx to PDF | 7ools",
});
</script>
<template>
  <Layout>
    <Navbar />
    <div>
      <DOCXtoPDF />
    </div>
    <Footer />
  </Layout>
</template>
