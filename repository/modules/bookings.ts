import type { FetchOptions } from "ofetch";
import FetchFactory from "../factory";
import { useAsyncData } from "nuxt/app";
import type { AsyncDataOptions } from "nuxt/app";
import type { Booking } from "~/types";

class BookingsModule extends FetchFactory {
  private RESOURCE = "/booking";

  /**
   * Return the bookings as array
   * @param asyncDataOptions
   * @returns
   */
  async getBookings(asyncDataOptions?: AsyncDataOptions<Booking[]>) {
    return useAsyncData(() => {
      const fetchOptions: FetchOptions<"json"> = {
        headers: {
          "Accept-Language": "en-US",
        },
      };
      return this.call("GET", `${this.RESOURCE}`, undefined, fetchOptions);
    }, asyncDataOptions);
  }

  /**
   * Return the bookings as array
   * @param asyncDataOptions
   * @returns
   */
  async getBooking(
    bookingId: number,
    asyncDataOptions?: AsyncDataOptions<Booking>
  ) {
    return useAsyncData(() => {
      const fetchOptions: FetchOptions<"json"> = {
        headers: {
          "Accept-Language": "en-US",
        },
      };
      return this.call(
        "GET",
        `${this.RESOURCE}/${bookingId}`,
        undefined,
        fetchOptions
      );
    }, asyncDataOptions);
  }

  /**
   * Creates a new booking
   * @param booking
   * @param asyncDataOptions
   */
  async addBooking(
    booking: Booking,
    asyncDataOptions?: AsyncDataOptions<Booking>
  ) {
    return useAsyncData(() => {
      const fetchOptions: FetchOptions<"json"> = {
        headers: {
          "Accept-Language": "en-US",
        },
      };
      return this.call("POST", `${this.RESOURCE}`, booking, fetchOptions);
    }, asyncDataOptions);
  }

  /**
   * Updates an existing booking
   * @param booking
   * @param asyncDataOptions
   */
  async updateBooking(
    booking: Booking,
    asyncDataOptions?: AsyncDataOptions<Booking>
  ) {
    return useAsyncData(() => {
      const fetchOptions: FetchOptions<"json"> = {
        headers: {
          "Accept-Language": "en-US",
        },
      };
      return this.call(
        "PATCH",
        `${this.RESOURCE}/${booking.id}`,
        booking,
        fetchOptions
      );
    }, asyncDataOptions);
  }

  /**
   * Deletes a booking
   * @param bookingId
   * @param asyncDataOptions
   */
  async deleteBooking(bookingId: number) {
    return useAsyncData(() => {
      return this.call("DELETE", `${this.RESOURCE}/${bookingId}`, undefined);
    });
  }
}

export default BookingsModule;
