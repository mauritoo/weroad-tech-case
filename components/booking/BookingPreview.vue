<script lang="ts" setup>
import type { Booking } from '~/types';

defineProps<{
  booking: Booking
}>();

</script>

<template>
  <span class="font-bold mb-4">Travel</span>
  <div v-if="booking?.travel" class="border rounded p-5 border-slate-500">
    <TravelPreview :travel="booking!.travel!" />
  </div>
  <div v-else class="italic">
    No travel selected
  </div>

  <span class="font-bold mb-4 mt-10">Customer</span>
  <div v-if="booking?.customer" class="">
    <CustomerPreview :customer="booking!.customer!" />
  </div>
  <div v-else class="italic">
    No customer info
  </div>

  <span class="font-bold mb-4 mt-10">Payment</span>
  <div v-if="booking?.paymentType" class="">
    <div>Payment type:
      <span
        class="bg-green-100 text-green-800 rounded-xl text-xs font-medium me-2 px-2.5 py-0.5 dark:bg-green-900 dark:text-green-300">{{
    booking.paymentType }}</span>
    </div>
  </div>
  <div v-else class="italic">
    No payment info
  </div>

  <div v-if="booking?.notes" class="flex flex-col">
    <span class="font-bold mb-4 mt-10">Notes</span>
    <span>{{ booking.notes }}</span>
  </div>
</template>