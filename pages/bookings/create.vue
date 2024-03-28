<script setup lang="ts">
import type { Booking } from '@/types';
import BookingPreview from '~/components/booking/BookingPreview.vue';
const { $api, $showToast } = useNuxtApp();

useHead({
  title: 'New booking | WeRoad Tech Case',
})

const booking = ref<Booking>({
  id: undefined,
  travel: undefined,
  customer: undefined,
  paymentType: undefined,
  notes: undefined,
});

const handleCreate = async () => {
  const {
    data,
    error,
    status
  } = await $api.bookings.addBooking(booking.value);
  if (status.value === 'success') {
    await navigateTo('/bookings')
    $showToast('Booking successfully added')
  } else {
    $showToast('An error ocurred trying to add the booking', 'error')
  }
}
</script>

<template>
  <div class="flex flex-col flex-1">
    <h1 class="text-3xl font-gilroy mb-8">New booking</h1>
    <div class="flex flex-1">
      <div class="w-2/3 pr-8">
        <FormWizard :booking="booking" @created="handleCreate" />
      </div>
      <div class="w-1/3 bg-slate-50 px-8 pt-8 flex flex-col flex-1 rounded">
        <BookingPreview :booking="booking" />
      </div>
    </div>
  </div>
</template>