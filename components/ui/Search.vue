<script lang="ts" setup>

const props = defineProps({
  placeholder: {
    type: String,
    default: '',
    required: false,
  }
})

const emit = defineEmits<{
  (e: 'onSearch', term: string): void
}>()

</script>

<template>
  <div class="relative w-1/2">
    <input type="text" :placeholder="props.placeholder"
      @input="(event) => emit('onSearch', (event.target as HTMLInputElement).value)"
      class="rounded p-2.5 border w-full pl-10" />
    <svg class="absolute inset-y-0 left-3.5 top-2.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="none"
      stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.5 15.5L20 20" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M9.5 14C12.5 14 15 11.5 15 8.5C15 5.5 12.5 3 9.5 3C6.5 3 4 5.5 4 8.5C4 11.5 6.5 14 9.5 14Z" />
    </svg>
  </div>
</template>