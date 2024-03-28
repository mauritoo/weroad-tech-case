<script setup lang="ts">
import MyCustomLink from './MyCustomLink';

defineProps({
  to: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <MyCustomLink :to="to">{{ title }}</MyCustomLink>
</template>