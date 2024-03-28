import type { FetchOptions } from "ofetch";
import { $fetch } from "ofetch";

import TravelsModule from "~/repository/modules/travels";
import BookingsModule from "~/repository/modules/bookings";

interface IApiInstance {
  travels: TravelsModule;
  bookings: BookingsModule;
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const fetchOptions: FetchOptions = {
    baseURL: config.public.apiBaseUrl as string,
  };

  const apiFecther = $fetch.create(fetchOptions);

  const modules: IApiInstance = {
    travels: new TravelsModule(apiFecther),
    bookings: new BookingsModule(apiFecther),
  };

  return {
    provide: {
      api: modules,
    },
  };
});
