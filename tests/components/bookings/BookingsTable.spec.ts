import { mount } from "@vue/test-utils";
import BookingsTable from "@/components/booking/BookingsTable.vue";
import bookingsData from "@/data/bookings.json";
import type { Booking } from "@/types";

describe("BookingsTable", () => {
  it("renders correctly", async () => {
    const wrapper = await mount(BookingsTable, {
      props: {
        bookings: bookingsData as Booking[],
      },
    });

    const rows = wrapper.findAll("tbody tr");
    expect(wrapper.exists()).toBe(true);
    expect(rows.length).toBe(bookingsData.length);
  });

  it("opens delete confirmation modal when delete button is clicked", async () => {
    const wrapper = await mount(BookingsTable, {
      props: {
        bookings: bookingsData as Booking[],
      },
    });

    await wrapper
      .find(`[data-testid="delete-button-${bookingsData[0].id}"]`)
      .trigger("click");

    expect(wrapper.emitted("delete")).toBeTruthy();
  });
});
