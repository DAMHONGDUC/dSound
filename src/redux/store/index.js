import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "redux/slices/playerSlide";
import { apiSlice } from "redux/api/apiSlice";

export const store = configureStore({
  reducer: {
    player: playerReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
