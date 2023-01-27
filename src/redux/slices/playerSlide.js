import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currPlaylist: [],
  currIndex: 0,
  activeSong: {},
  showBottomPlay: true,
  isPlaying: false,
};

export const playerSlide = createSlice({
  name: "player",
  initialState: initialState,
  reducers: {
    setCurrPlaylist: (state, action) => {
      state.currPlaylist = action.payload;
    },
    setSongURL: (state, action) => {
      state.currPlaylist.songs[action.payload.index].url = action.payload.url;
    },
    setCurrIndex: (state, action) => {
      state.currIndex = action.payload;
    },
    setActiveSong: (state, action) => {
      state.activeSong = action.payload;
    },
    setShowBottomPlay: (state, action) => {
      state.showBottomPlay = action.payload;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
  },
});

export const {
  setCurrPlaylist,
  setCurrIndex,
  setSongURL,
  setActiveSong,
  setShowBottomPlay,
  setIsPlaying,
} = playerSlide.actions;

export default playerSlide.reducer;
