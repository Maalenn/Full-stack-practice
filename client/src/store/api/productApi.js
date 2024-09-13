import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    fetchProduct: builder.query({
      query: () => ({
        url: "/Products/products",
        method: "GET",
      }),

      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: "Product", id })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),
    fetchProductById: builder.query({
      query: ({ id }) => ({
        url: `Products/products/${id}`,
        method: "GET",
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Product", id },
        { type: "Product", id: "LIST" },
      ],
    }),

    //Create Product
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: "Products/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),

    //update Product
    updateProduct: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/Products/products/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Product", id },
        { type: "Product", id: "LIST" },
      ],
    }),

    //Delete Product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/Products/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
  }),
});

export const {
  useFetchProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useFetchProductByIdQuery,
} = productApi;
