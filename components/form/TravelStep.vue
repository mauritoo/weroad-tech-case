<script setup lang="ts">
import type { Booking, Travel } from '@/types';
import Autocomplete from './Autocomplete.vue';

const props = defineProps({
  booking: Object as PropType<Booking>,
  hasError: Boolean,
});
const emit = defineEmits(['next']);

const { booking } = toRefs(props);

const initialValue = ref<Travel>()

const updateTravel = (travel: Travel | null) =>
  booking.value.travel = travel

onMounted(() => {
  initialValue.value = booking?.value?.travel
})
</script>

<template>
  <div>
    <Autocomplete @onSelect="updateTravel" :initial-value="initialValue" />
    <span class="text-xs text-red-500" v-if="hasError">You must select a travel to continue</span>
  </div>
</template>
