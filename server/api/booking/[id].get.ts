import { ref } from "vue";
import { Booking } from "~/types";
import bookingsData from "~/data/bookings.json";

export default defineEventHandler((event) => {
  const bookings = ref<Booking[]>(bookingsData as Booking[]);
  const selectedBooking = bookings.value.find(
    (t) => t.id === parseInt(event?.context?.params?.id as string)
  );
  return selectedBooking;
});
