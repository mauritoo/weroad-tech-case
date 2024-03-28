import { ref } from "vue";
import { Booking } from "~/types";
import bookingsData from "~/data/bookings.json";

export default defineEventHandler((event) => {
  const bookings = ref<Booking[]>(bookingsData as Booking[]);
  return bookings.value;
});
