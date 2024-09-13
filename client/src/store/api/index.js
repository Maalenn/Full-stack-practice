import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ["Product"],
  endpoints: (builder) => {
    fetchProduct: builder.query({
      query: () => ({
        url: "/Products/products",
        method: "GET",
      }),
      

      providesTags: (result) =>
        result?.data
            ? [...result.data.map(({ id }) => ({ type: "Badge", id })), { type: "Badge", id: "LIST" }]
            : [{ type: "Badge", id: "LIST" }],
    });
  },
});
