<script setup>
import Navbar from "~/src/components/Navbar.vue";
import GPT from "~/src/components/ChatBot.vue";
import Footer from "~/src/components/Footer.vue";
import Layout from "~/src/Layout.vue";

useSeoMeta({
  title: "Gemini | 7ools",
  ogTitle: "Gemini | 7ools",
});
</script>

<template>
  <Layout>
    <Navbar />
    <GPT />
    <Footer />
  </Layout>
</template>
