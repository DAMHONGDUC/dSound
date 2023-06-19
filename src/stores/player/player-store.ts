import { createSlice } from '@reduxjs/toolkit';

interface IPlayerState {
  currPlaylist: [];
  currIndex: 0;
  activeSong: {};
  showBottomPlay: false;
  isPlaying: false;
  repeatMode: false;
  shuffleMode: false;
  updateNearlySong: false;
  initFirstSong: false;
  refreshLibrary: true;
  lovedSongId: '';
  currLovedSong: [];
  navToDetailId: '';
  popUpLibraryOptions: false;
  replayPlaylist: false;
}

const initialStateL: IPlayerState = {
  currPlaylist: [],
  currIndex: 0,
  activeSong: {},
  showBottomPlay: false,
  isPlaying: false,
  repeatMode: false,
  shuffleMode: false,
  updateNearlySong: false,
  initFirstSong: false,
  refreshLibrary: true,
  lovedSongId: '',
  currLovedSong: [],
  navToDetailId: '',
  popUpLibraryOptions: false,
  replayPlaylist: false,
};

export const playerSlide = createSlice({
  name: 'player',
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
      const flag = action.payload;
      const isEmpty = Object.keys(state.activeSong).length === 0;

      state.showBottomPlay = flag && !isEmpty ? true : false;
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
    setInitFirstSong: (state, action) => {
      state.initFirstSong = action.payload;
    },
    setUid: (state, action) => {
      state.uid = action.payload;
      state.lovedSongId = action.payload + 'loved_song';
    },
    setLovedSongId: (state, action) => {
      state.lovedSongId = action.payload;
    },
    setCurrLovedSong: (state, action) => {
      state.currLovedSong = action.payload;
    },
    setRefreshLibrary: (state, action) => {
      state.refreshLibrary = action.payload;
    },
    setNavToDetailId: (state, action) => {
      state.navToDetailId = action.payload;
    },
    setActiveLibraryId: (state, action) => {
      state.activeLibraryId = action.payload;
    },
    setPopUpLibraryOptions: (state, action) => {
      state.popUpLibraryOptions = action.payload;
    },
    setReplayPlaylist: (state, action) => {
      state.replayPlaylist = action.payload;
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
  setInitFirstSong,
  setUid,
  setRefreshLibrary,
  setLovedSongId,
  setCurrLovedSong,
  setNavToDetailId,
  setActiveLibraryId,
  setPopUpLibraryOptions,
  setReplayPlaylist,
} = playerSlide.actions;

export default playerSlide.reducer;
