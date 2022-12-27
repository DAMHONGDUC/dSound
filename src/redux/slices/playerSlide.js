import { createSlice } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";

const initialState = {
  activeSong: {},
  currPlaylist: [],
  currIndex: 0,
  isSetUpPlayer: false,
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
    setCurrPlaylist: (state, action) => {
      state.currPlaylist = action.payload;
    },
    setSongURL: (state, action) => {
      const data = cloneDeep(state.currPlaylist);

      data[action.payload.index] = {
        ...data[action.payload.index],
        url: action.payload.url,
      };

      state.currPlaylist = data;
    },
    setCurrIndex: (state, action) => {
      state.currIndex = action.payload;
    },
    setUpPlayer: (state, action) => {
      state.isSetUpPlayer = action.payload;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setIsPause: (state, action) => {
      state.isPause = action.payload;
    },
  },
});

export const {
  setIsPause,
  activeSong,
  setCurrPlaylist,
  setCurrIndex,
  setUpPlayer,
  setIsPlaying,
  setSongURL,
} = playerSlide.actions;

export default playerSlide.reducer;
