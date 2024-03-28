<script setup lang="ts">
import type { Booking } from '@/types';
import CustomerForm from './CustomerForm.vue';

const props = defineProps({
  booking: Object as PropType<Booking>,
});

const emit = defineEmits(['updated']);
const { booking } = toRefs(props);

</script>

<template>
  <div>
    <CustomerForm :booking="booking" @updated="(hasError) => emit('updated', hasError)" />
  </div>
</template>
