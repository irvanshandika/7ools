<script setup>
import Navbar from "~/src/components/Navbar.vue";
import Layout from "~/src/Layout.vue";
import ProtectDOCX from "~/src/sections/Protects/ProtectDOCX.vue";
import Footer from "~/src/components/Footer.vue";

useSeoMeta({
  title: "Protect DOCX | 7ools",
  ogTitle: "Protect DOCX | 7ools",
});
</script>
<template>
  <Layout>
    <Navbar />
    <div>
      <ProtectDOCX />
    </div>
    <Footer />
  </Layout>
</template>
