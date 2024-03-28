import { ref } from "vue";
import { Travel } from "~/types";
import travelsData from "~/data/travels.json";

export default defineEventHandler((event) => {
  const travels = ref<Travel[]>(travelsData);
  const selectedTravel = travels.value.find(
    (t) => t.id === parseInt(event?.context?.params?.id as string)
  );
  return selectedTravel;
});
