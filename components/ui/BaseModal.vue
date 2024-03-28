<script setup lang="ts">
defineProps<{
  show: boolean
}>()
</script>

<template>
  <Teleport to="body">
    <div v-if="show">
      <div class="fixed inset-0 bg-gray-900 opacity-70 z-30"></div>
      <div class="fixed inset-0 flex items-center justify-center z-40">
        <div class="bg-white text-black rounded-md p-8">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>