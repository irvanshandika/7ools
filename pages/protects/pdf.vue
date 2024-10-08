<script setup>
import Navbar from "~/src/components/Navbar.vue";
import Layout from "~/src/Layout.vue";
import ProtectPDF from "~/src/sections/Protects/ProtectPDF.vue";
import Footer from "~/src/components/Footer.vue";

useSeoMeta({
  title: "Protect PDF | 7ools",
  ogTitle: "Protect PDF | 7ools",
});
</script>
<template>
  <Layout>
    <Navbar />
    <div>
      <ProtectPDF />
    </div>
    <Footer />
  </Layout>
</template>
