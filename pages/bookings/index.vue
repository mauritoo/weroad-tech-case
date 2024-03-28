<script setup lang="ts">
import ConfirmationDialog from '@/components/ui/ConfirmationDialog.vue';
import Loader from '@/components/ui/Loader.vue';
import BookingsTable from '~/components/booking/BookingsTable.vue';
import Search from '~/components/ui/Search.vue';
import type { Booking } from '~/types';

useHead({
  title: 'Bookings management | WeRoad Tech Case',
})

const { $api, $showToast } = useNuxtApp();
const filteredBookings = ref<Booking[]>([])
const {
  data: bookingsList,
  pending,
} = await $api.bookings.getBookings();
filteredBookings.value = bookingsList.value

const showDeleteDialog = ref<boolean>(false);
const deleteId = ref<number>()
const onDeleteBooking = (id: number): void => {
  deleteId.value = id
  showDeleteDialog.value = true
}

const handleSearch = async (term: string) => {
  if (term.trim().length >= 3) {
    filteredBookings.value = bookingsList.value.filter((booking) => {
      if (booking.travel!.name.toLowerCase().includes(term) || booking.customer!.name!.toLowerCase().includes(term)) {
        return booking;
      }
    });
  } else {
    filteredBookings.value = bookingsList.value
  }
}

const handleDeletion = async (result: boolean) => {
  if (result) {
    const {
      data,
      error
    } = await $api.bookings.deleteBooking(5);
    if (!data.value.success || error.value) {
      $showToast('An error ocurred trying to delete the booking', 'error')
    } else {
      $showToast('Booking successfully deleted')
    }

  }
  showDeleteDialog.value = false
};
</script>

<template>
  <div class="container mx-auto">
    <div class="flex justify-between mb-8">
      <h1 class="text-3xl font-gilroy">Bookings</h1>
    </div>

    <div v-if="pending" class="transform translate-x-1/2 ">
      <Loader />
    </div>

    <div v-else class="overflow-x-auto">
      <div class="flex justify-between mb-4">
        <Search placeholder="Search bookings by travel name or customer name" @on-search="handleSearch" />
        <NuxtLink to="/bookings/create"
          class="btn btn-outline-primary leading-7 bg-black hover:bg-red-600 text-white font-bold py-2 px-4 rounded">New
          booking
        </NuxtLink>
      </div>

      <BookingsTable v-if="filteredBookings.length > 0" :bookings="filteredBookings" @delete="onDeleteBooking" />
      <div v-else class="rounded border p-10 flex items-center justify-center">
        <span class="ml-2 text-gray-400">No bookings were found</span>
      </div>

    </div>
    <ConfirmationDialog :show="showDeleteDialog" @result="handleDeletion" />
  </div>
</template>