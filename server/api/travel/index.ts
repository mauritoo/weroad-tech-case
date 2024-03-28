import { ref } from "vue";
import { Travel } from "~/types";
import travelsData from "~/data/travels.json";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const travels = ref<Travel[]>(travelsData);
    if (query.name !== undefined) {
      return travels.value.filter((travel) => {
        if (travel.name.toLowerCase().includes(query.name as string)) {
          return travel;
        }
      });
    } else {
      return travels.value;
    }
  } catch (e) {
    return [];
  }
});
