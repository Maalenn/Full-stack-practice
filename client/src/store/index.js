// // app/store.js

// import { configureStore } from '@reduxjs/toolkit';
// import { apiSlice } from './api/index';

// export const store = configureStore({
//   reducer: {
//     [apiSlice.reducerPath]: apiSlice.reducer,
//   },
//   // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(apiSlice.middleware),
// });

// // Export types for use in components
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
