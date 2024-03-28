<script setup lang="ts">
import type { Travel } from '@/types';
import TravelForm from '@/components/form/TravelForm.vue';

useHead({
  title: 'New travel | WeRoad Tech Case',
})

const { $api, $showToast } = useNuxtApp();
const travel = ref<Travel>()

const handleCreate = async () => {
  const {
    data,
    error,
    status
  } = await $api.travels.addTravel(travel.value!);
  if (status.value === 'success') {
    await navigateTo('/travels')
    $showToast('Travel successfully added')
  } else {
    $showToast('An error ocurred trying to add the travel', 'error')
  }
}
</script>

<template>
  <div>
    <h1 class="text-3xl font-gilroy mb-8">New travel</h1>
    <TravelForm @created="handleCreate" :travel="travel" />
  </div>
</template>