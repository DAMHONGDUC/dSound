import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TrackPlayer from "react-native-track-player";

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
      const data = action.payload.map((e) => ({
        id: e.encodeId,
        url: "",
        title: e.title,
        artist: e.artistsNames,
        artwork: e.thumbnailM,
      }));

      state.currPlaylist = data;
    },
    setSongLink: (state, action) => {
      const data = state.currPlaylist;

      data[action.index].link = action.link;
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
  setSongLink,
} = playerSlide.actions;

export default playerSlide.reducer;
