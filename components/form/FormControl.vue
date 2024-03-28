<script setup lang="ts">

const props = defineProps({
  inputName: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  hasError: {
    type: Boolean,
    required: false,
  },
  errorMessage: {
    type: String,
    required: false,
  },
});

</script>

<template>
  <div class="mb-4 relative">
    <label class="block  text-sm font-bold mb-2" :class="[props.hasError ? 'text-red-500' : 'text-gray-700']"
      :for="props.inputName">{{ props.label }}</label>
    <div class="flex flex-col">
      <slot />
      <span class="text-xs text-red-500" v-if="hasError">{{ errorMessage }}</span>
    </div>
  </div>
</template>