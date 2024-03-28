<script lang="ts" setup>
import type { Travel } from '~/types';
import { formatDate, renderPrice, renderRating } from '@/helpers/utils';

const props = defineProps<{
  travel: Travel
}>()

// const props = defineProps({
//   travel: Object as PropType<Travel> | null,
// });

// const { travel } = toRefs(props);
</script>

<template>
  <div v-if="travel" class="flex">
    <div class="w-1/4 mr-6 flex items-center">
      <img :src="travel.picture" alt="Travel picture" :title="travel.name" class="object-cover" />
    </div>
    <div>
      <div class="font-bold">{{ travel.name }}</div>
      <div class="mt-1">Departure: {{ formatDate(travel.departure_date) }} </div>
      <div class="mt-1">Return: {{ formatDate(travel.return_date) }}</div>
      <div class="mt-1 text-lg">{{ renderPrice(travel.price) }}</div>
      <div class="mt-1">{{ renderRating(travel.rating) }}</div>
    </div>
  </div>
</template>