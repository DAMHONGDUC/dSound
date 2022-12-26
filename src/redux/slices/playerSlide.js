import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeSong: {},
  currSongPlayId: "",
  currPlaylist: [],
  isPlaying: false,
  isPause: false,
};

export const playerSlide = createSlice({
  name: "player",
  initialState: initialState,
  reducers: {
    activeSong: (state, action) => {
      state.activeSong = action.payload;
    },
  },
});

export const { activeSong } = playerSlide.actions;

export default playerSlide.reducer;
