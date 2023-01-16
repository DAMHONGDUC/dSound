import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { hashParam } from "api/Crypto";

const URL = "https://zingmp3.vn";
const API_KEY = "88265e23d4284f25963e6eedac8fbfa3";
const CTIME = Math.floor(Date.now() / 1000);
const VERSION = "1.6.34";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    prepareHeaders: (headers, { getState }) => {
      const cookies = getState().cookies;
      console.log("cookies", { isLoading });
      headers.set("Cookie", `${cookies}`);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPlaylistById: builder.query({
      query: (id) => {
        const qs = hashParam("/api/v2/page/get/playlist", id);

        return {
          url: "/api/v2/page/get/playlist",
          params: { ...qs, ctime: CTIME, version: VERSION, apiKey: API_KEY },
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetPlaylistByIdQuery } = apiSlice;
