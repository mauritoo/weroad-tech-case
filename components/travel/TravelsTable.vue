<script setup lang="ts">
import { formatDate, renderPrice, renderRating, truncateDescription } from '@/helpers/utils';
import type { Travel } from '~/types';

defineProps<{
  travels: Travel[]
}>()

const emit = defineEmits(['delete']);

const tableHeaders: string[] = [
  "Name", "Description", "Departure Date", "Return Date", "Price", "Picture", "User rating", "Actions"
];
const entityFields: string[] = [
  "name", "description", "departure_date", "return_date", "price", "picture", "rating"
];

</script>

<template>
  <table class="min-w-full border-collapse border border-gray-200">
    <thead>
      <tr>
        <th v-for="header in tableHeaders" :key="`header_${header}`"
          class="p-4 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase whitespace-nowrap tracking-wider">
          {{ header }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="travel in travels" :key="travel.id">
        <td v-for="field in entityFields" :key="`data_${field}`" class="p-4 border-b border-gray-200"
          :class="field === 'description' ? 'text-sm' : ''">
          <template v-if="field === 'description'">
            {{ truncateDescription(travel[field]) }}
          </template>
          <template v-else-if="field === 'departure_date' || field === 'return_date'">
            <span class="text-sm">
              {{ formatDate(travel[field]) }}
            </span>
          </template>
          <template v-else-if="field === 'price'">
            <span class="text-lg whitespace-nowrap">

              {{ renderPrice(travel[field]) }}
            </span>
          </template>
          <template v-else-if="field === 'rating'">
            {{ renderRating(travel[field]) }}
          </template>
          <template v-else-if="field === 'picture'">
            <img :src="travel[field]" alt="Travel picture" :title="travel.name" class="w-12 h-12 object-cover" />
          </template>
          <span v-else class="font-bold">
            {{ travel.name }}
          </span>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
          <div class="flex">
            <NuxtLink :to="`/travels/edit/${travel.id}`" class=" mr-2" :data-testid="`edit-button-${travel.id}`">
              <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
              </svg>
            </NuxtLink>
            <button @click="() => emit('delete', travel.id!)" :data-testid="`delete-button-${travel.id}`">
              <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
              </svg>
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>