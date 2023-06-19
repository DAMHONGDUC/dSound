import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "stores/player/player-store";

export const store = configureStore({
  reducer: {
    player: playerReducer,
  },
});
