<template>
  <component :is="errorComponent" :error="error" @reload="handleReload" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useError } from "#app";
import type { NuxtError } from "#app";
import NotFound from "~/src/sections/Error/NotFound.vue";
import InternalServerError from "~/src/sections/Error/InternalServerError.vue";

const props = defineProps<{
  error: Error | NuxtError;
}>();

const error = computed(() => {
  return props.error || useError().value;
});

const errorComponent = computed(() => {
  if (!error.value) {
    return InternalServerError; // Fallback jika tidak ada error
  }

  const statusCode = (error.value as NuxtError).statusCode || 500;

  switch (statusCode) {
    case 404:
      return NotFound;
    case 500:
    case 505:
      return InternalServerError;
    default:
      return InternalServerError; // Fallback untuk error yang tidak dikenal
  }
});

const handleReload = () => {
  window.location.reload();
};
</script>
