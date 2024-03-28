import { mount } from "@vue/test-utils";
import TravelsTable from "@/components/travel/TravelsTable.vue";
import travelsData from "@/data/travels.json";
import { useRouter } from "vue-router";

jest.mock("vue-router", () => ({
  useRouter: jest.fn(),
}));

describe("TravelsTable", () => {
  it("renders correctly", async () => {
    const wrapper = await mount(TravelsTable, {
      props: {
        travels: travelsData,
      },
    });

    const rows = wrapper.findAll("tbody tr");
    expect(wrapper.exists()).toBe(true);
    expect(rows.length).toBe(travelsData.length);
  });

  it("opens delete confirmation modal when delete button is clicked", async () => {
    const wrapper = await mount(TravelsTable, {
      props: {
        travels: travelsData,
      },
    });

    await wrapper
      .find(`[data-testid="delete-button-${travelsData[0].id}"]`)
      .trigger("click");

    expect(wrapper.emitted("delete")).toBeTruthy();
  });
});
