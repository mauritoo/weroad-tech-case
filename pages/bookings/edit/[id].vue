<script setup lang="ts">
import type { Booking } from '@/types';
import { useRoute } from 'vue-router';
import FormWizard from '@/components/form/FormWizard.vue';
import Loader from '~/components/ui/Loader.vue';
const route = useRoute();
const booking = ref<Booking>()
const { $api, $showToast } = useNuxtApp();

useHead({
  title: 'Edit booking | WeRoad Tech Case',
})

const handleUpdate = async () => {
  const {
    data,
    status
  } = await $api.bookings.updateBooking(booking.value!);
  if (status.value === 'success') {
    await navigateTo('/bookings')
    $showToast('Booking successfully updated')
  } else {
    $showToast('An error ocurred trying to update the booking', 'error')
  }
}

const {
  data: bookingData,
  pending
} = await $api.bookings.getBooking(parseInt(route.params.id as string));
booking.value = bookingData.value as Booking;

watch(bookingData, (newBookingData) => booking.value = newBookingData as Booking)

</script>

<template>
  <div class="flex flex-col flex-1">
    <h1 class="text-3xl font-gilroy mb-8">Edit booking</h1>
    <div v-if="booking" class="flex flex-1">
      <div class="w-2/3 pr-8">
        <FormWizard :booking="booking" @created="handleUpdate" />
      </div>
      <div class="w-1/3 bg-slate-50 px-8 pt-8 flex flex-col flex-1 rounded">
        <BookingPreview :booking="booking" />
      </div>
    </div>
    <div v-else-if="pending" class="flex flex-1 flex-col items-center justify-center">
      <Loader />
    </div>
    <div v-else>Booking not found</div>
  </div>
</template>