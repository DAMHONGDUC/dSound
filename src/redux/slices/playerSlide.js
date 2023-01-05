import { createSlice } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";

const initialState = {
  currPlaylist: [],
  currIndex: 0,
  activeSong: {},
};

export const playerSlide = createSlice({
  name: "player",
  initialState: initialState,
  reducers: {
    setCurrPlaylist: (state, action) => {
      state.currPlaylist = action.payload;
    },
    setSongURL: (state, action) => {
      let data = cloneDeep(state.currPlaylist);

      data[action.payload.index] = {
        ...data[action.payload.index],
        url: action.payload.url,
      };

      state.currPlaylist = data;
    },
    setCurrIndex: (state, action) => {
      state.currIndex = action.payload;
    },
    setActiveSong: (state, action) => {
      state.activeSong = action.payload;
    },
  },
});

export const { setCurrPlaylist, setCurrIndex, setSongURL, setActiveSong } =
  playerSlide.actions;

export default playerSlide.reducer;
