<script setup lang="ts">
import type { Travel } from '@/types';
import { useRoute } from 'vue-router';
import TravelForm from '@/components/form/TravelForm.vue';
import Loader from '~/components/ui/Loader.vue';
const route = useRoute();
const travel = ref<Travel>()
const { $api, $showToast } = useNuxtApp();

useHead({
  title: 'Edit travel | WeRoad Tech Case',
})

const handleUpdate = async () => {
  const {
    data,
    status
  } = await $api.travels.updateTravel(travel.value!);
  if (status.value === 'success') {
    await navigateTo('/travels')
    $showToast('Travel successfully updated')
  } else {
    $showToast('An error ocurred trying to update the travel', 'error')
  }
}

const {
  data: travelData,
  pending
} = await $api.travels.getTravel(parseInt(route.params.id as string), { server: false });
travel.value = travelData.value as Travel;

watch(travelData, (newTravelData) => travel.value = newTravelData as Travel)

</script>

<template>
  <div>
    <h1 class="text-3xl font-gilroy mb-8">Edit travel {{ route.params.id }}</h1>
    <TravelForm v-if="travel" @updated="handleUpdate" :travel="travel" />
    <div v-else-if="pending" class="flex flex-1 flex-col items-center justify-center">
      <Loader />
    </div>
    <div v-else>Travel not found</div>
  </div>
</template>