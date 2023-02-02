import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currPlaylist: [],
  currIndex: 0,
  activeSong: {},
  showBottomPlay: true,
  isPlaying: false,
  repeatMode: false,
  shuffleMode: false,
  updateNearlySong: false,
  playlistPlayButtonClicked: false,
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
    setRepeatMode: (state, action) => {
      state.repeatMode = action.payload;
    },
    setShuffleMode: (state, action) => {
      state.shuffleMode = action.payload;
    },
    setUpdateNearlySong: (state, action) => {
      state.updateNearlySong = action.payload;
    },
    setPlaylistPlayButtonClicked: (state, action) => {
      state.playlistPlayButtonClicked = action.payload;
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
  setRepeatMode,
  setShuffleMode,
  setUpdateNearlySong,
  setPlaylistPlayButtonClicked,
} = playerSlide.actions;

export default playerSlide.reducer;
