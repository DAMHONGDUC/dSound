import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "redux/slices/playerSlide";

export const store = configureStore({
  reducer: {
    player: playerReducer,
  },
});
