import {
  createApi,
  BaseQueryApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:3001";

export const userApiSlice = createApi({
  reducerPath: "user-api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints(builder) {
    return {
      fetchCurrentUser: builder.query({
        query(id) {
          return `user/${id}`;
        },
      }),
    };
  },
});

export const {useFetchCurrentUserQuery} = userApiSlice
