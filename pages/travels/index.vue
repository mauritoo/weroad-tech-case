<script setup lang="ts">
import ConfirmationDialog from '@/components/ui/ConfirmationDialog.vue';
import Loader from '@/components/ui/Loader.vue';
import TravelsTable from '~/components/travel/TravelsTable.vue';
import Search from '~/components/ui/Search.vue';
import type { Travel } from '~/types';

useHead({
  title: 'Travels management | WeRoad Tech Case',
})

const { $api, $showToast } = useNuxtApp();
const filteredTravels = ref<Travel[]>([])
const {
  data: travelsList,
  pending,
} = await $api.travels.getTravels();
filteredTravels.value = travelsList.value

const showDeleteDialog = ref<boolean>(false)
const deleteId = ref<number>()
const onDeleteTravel = (id: number): void => {
  deleteId.value = id
  showDeleteDialog.value = true
}

const handleSearch = async (term: string) => {
  if (term.trim().length >= 3) {
    filteredTravels.value = travelsList.value.filter((travel) => {
      if (travel.name.toLowerCase().includes(term) || travel.description.toLowerCase().includes(term)) {
        return travel;
      }
    });
  } else {
    filteredTravels.value = travelsList.value
  }
}
const handleDeletion = async (result: boolean) => {
  if (result) {
    const {
      data,
      error
    } = await $api.travels.deleteTravel(deleteId.value!);
    if (!data.value.success || error.value) {
      $showToast('An error ocurred trying to delete the travel', 'error')
    } else {
      $showToast('Travel successfully deleted')
    }
    deleteId.value = undefined
  }
  showDeleteDialog.value = false
};
</script>

<template>
  <div class="container mx-auto">
    <div class="flex justify-between mb-8">
      <h1 class="text-3xl font-gilroy">Travels</h1>
    </div>

    <div v-if="pending" class="transform translate-x-1/2 ">
      <Loader />
    </div>

    <div v-else class="overflow-x-auto">
      <div class="flex justify-between mb-4">
        <Search placeholder="Search travels by name or description" @on-search="handleSearch" />
        <NuxtLink to="/travels/create"
          class="btn btn-outline-primary leading-7 bg-black hover:bg-red-600 text-white font-bold py-2 px-4 rounded">New
          travel
        </NuxtLink>
      </div>

      <TravelsTable v-if="filteredTravels.length > 0" :travels="filteredTravels" @delete="onDeleteTravel" />
      <div v-else class="rounded border p-10 flex items-center justify-center">
        <span class="ml-2 text-gray-400">No travels were found</span>
      </div>
    </div>
    <ConfirmationDialog :show="showDeleteDialog" @result="handleDeletion" />
  </div>
</template>