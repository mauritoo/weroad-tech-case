import type { FetchOptions } from "ofetch";
import FetchFactory from "../factory";
import { useAsyncData } from "nuxt/app";
import type { AsyncDataOptions } from "nuxt/app";
import type { Travel } from "~/types";

class TravelsModule extends FetchFactory {
  private RESOURCE = "/travel";

  /**
   * Return the travels as array
   * @param asyncDataOptions
   * @returns
   */
  async getTravels(
    name?: string,
    asyncDataOptions?: AsyncDataOptions<Travel[]>
  ) {
    return useAsyncData(() => {
      const fetchOptions: FetchOptions<"json"> = {
        headers: {
          "Accept-Language": "en-US",
        },
      };
      return this.call(
        "GET",
        `${this.RESOURCE}${name ? `?name=${name}` : ""}`,
        undefined,
        fetchOptions
      );
    }, asyncDataOptions);
  }

  /**
   * Return the travels as array
   * @param asyncDataOptions
   * @returns
   */
  async getTravel(
    travelId: number,
    asyncDataOptions?: AsyncDataOptions<Travel>
  ) {
    return useAsyncData(() => {
      const fetchOptions: FetchOptions<"json"> = {
        headers: {
          "Accept-Language": "en-US",
        },
      };
      return this.call(
        "GET",
        `${this.RESOURCE}/${travelId}`,
        undefined,
        fetchOptions
      );
    }, asyncDataOptions);
  }

  /**
   * Creates a new travel
   * @param travel
   * @param asyncDataOptions
   */
  async addTravel(travel: Travel, asyncDataOptions?: AsyncDataOptions<Travel>) {
    return useAsyncData(() => {
      const fetchOptions: FetchOptions<"json"> = {
        headers: {
          "Accept-Language": "en-US",
        },
      };
      return this.call("POST", `${this.RESOURCE}`, travel, fetchOptions);
    }, asyncDataOptions);
  }

  /**
   * Updates an existing travel
   * @param travel
   * @param asyncDataOptions
   */
  async updateTravel(
    travel: Travel,
    asyncDataOptions?: AsyncDataOptions<Travel>
  ) {
    return useAsyncData(() => {
      const fetchOptions: FetchOptions<"json"> = {
        headers: {
          "Accept-Language": "en-US",
        },
      };
      return this.call(
        "PATCH",
        `${this.RESOURCE}/${travel.id}`,
        travel,
        fetchOptions
      );
    }, asyncDataOptions);
  }

  /**
   * Deletes a travel
   * @param travelId
   */
  async deleteTravel(travelId: number) {
    return useAsyncData(() => {
      return this.call("DELETE", `${this.RESOURCE}/${travelId}`, undefined);
    });
  }
}

export default TravelsModule;
