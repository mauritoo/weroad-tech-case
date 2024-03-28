<script lang="ts" setup>
import type { Booking } from '~/types';
import { formatDate, truncateDescription, renderPrice } from '@/helpers/utils'

defineProps<{
  bookings: Booking[]
}>()

const emit = defineEmits(['delete']);

const tableHeaders = [
  "Customer", "Travel", "Payment type", "Notes", "Actions"
];
const entityFields = [
  "customer", "travel", "paymentType", "notes"
];
</script>

<template>

  <table class="min-w-full border-collapse border border-gray-200">
    <thead>
      <tr>
        <th v-for="header in tableHeaders" :key="`header_${header}`"
          class="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
          {{ header }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="booking in bookings" :key="booking.id">
        <td v-for="field in entityFields" :key="`data_${field}`" class="p-4 whitespace-no-wrap border-b border-gray-200"
          :class="field === 'description' ? 'text-sm' : ''">
          <template v-if="field === 'notes'">
            <span class="text-sm">
              {{ truncateDescription(booking.notes as string) || '-' }}
            </span>
          </template>
          <template v-else-if="field === 'travel'">

            <div>{{ booking.travel!.name }}</div>
            <div class="mt-1 text-sm">Departure: {{ formatDate(booking.travel!.departure_date) }} | Return: {{
          formatDate(booking.travel!.return_date) }}</div>
            <div class="text-sm">{{ renderPrice(booking.travel!.price) }}</div>
          </template>
          <template v-else-if="field === 'customer'">
            <div class="mt-1 font-bold">{{ booking.customer!.name }}</div>
            <div class="text-sm">{{ booking.customer!.phoneNumber }}</div>
            <div class="text-sm">{{ booking.customer!.email }}</div>
          </template>
          <template v-else-if="field === 'paymentType'">
            <span
              class="bg-green-100 text-green-800 rounded-xl text-xs font-medium me-2 px-2.5 py-0.5 dark:bg-green-900 dark:text-green-300">{{
          booking[field] }}</span>
          </template>
        </td>
        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
          <div class="flex">
            <NuxtLink :to="`/bookings/edit/${booking.id}`" class=" mr-2">
              <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
              </svg>
            </NuxtLink>
            <button @click="() => emit('delete', booking.id!)" :data-testid="`delete-button-${booking.id}`">
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