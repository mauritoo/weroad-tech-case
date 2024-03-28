<script setup lang="ts">
import { ref } from 'vue'
import type { Travel } from '@/types';
import { formatDate, renderPrice } from '@/helpers/utils';

const props = defineProps({
  initialValue: Object as PropType<Travel>,
});

const { initialValue } = toRefs(props);

const emit = defineEmits<{
  (e: 'onSelect', travel: Travel): void
}>()
const { $api } = useNuxtApp();

const searchTerm = ref<string>('')
const searchTravels = ref<Travel[]>([])
const selectedTravel = ref<Travel>()

const selectTravel = (travel: Travel): void => {
  selectedTravel.value = travel
  searchTerm.value = travel.name
  emit('onSelect', travel)
}

const clearSelection = (): void => {
  selectedTravel.value = undefined
  searchTerm.value = ''
  emit('onSelect', null)
}

watch(() => searchTerm.value, async () => {
  if (searchTerm.value.trim() === '') {
    return []
  }
  const { data: filteredTravels } = await $api.travels.getTravels(searchTerm.value.trim());
  searchTravels.value = filteredTravels.value || []
})

watch(() => initialValue?.value, () => {
  if (initialValue?.value) {
    selectedTravel.value = initialValue.value;
    searchTerm.value = selectedTravel.value.name
  }
})

</script>

<template>

  <FormControl label="Select travel" input-name="travelAutocomplete">
    <div class="relative">
      <input type="text" id="search" v-model="searchTerm" placeholder="Type here to search" name="travelAutocomplete"
        class="p-3 mb-0.5 w-full border border-gray-300 rounded">
      <div v-if="selectedTravel" class="absolute inset-y-0 right-0 flex items-center pr-3">
        <button @click="clearSelection" class="text-gray-500 hover:text-gray-700 focus:outline-none">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
    <!-- <div> -->

    <ul v-if="searchTravels.length && !selectedTravel"
      class="w-full rounded bg-white border border-gray-300 p-2 space-y-1  z-10">
      <li v-for="travel in searchTravels" :key="travel.id" @click="selectTravel(travel)"
        class="cursor-pointer hover:bg-gray-100 p-4">
        <div class="flex">
          <div class="mr-4 flex items-center">
            <img :src="travel.picture" alt="Travel picture" :title="travel.name" class="w-12 h-12 object-cover" />
          </div>
          <div>
            <div class="font-bold text-sm">{{ travel.name }}</div>
            <div class="mt-1 text-sm">Departure: {{ formatDate(travel?.departure_date) }} | Return: {{
        formatDate(travel.return_date) }}</div>
            <div class="text-sm">{{ renderPrice(travel.price) }}</div>
          </div>
        </div>
      </li>
    </ul>

    <!-- </div> -->
    <div v-else-if="!searchTravels.length && searchTerm && !selectedTravel"
      class="w-full rounded bg-white border border-gray-300 p-2 space-y-1">
      No travels matching this search were found
    </div>
  </FormControl>
</template>