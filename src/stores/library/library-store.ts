import { createSlice } from "@reduxjs/toolkit";

interface ILibraryState {
  activeLibraryId: string;
}

const initialState: ILibraryState = {
  activeLibraryId: "",
};

export const playerSlide = createSlice({
  name: "player",
  initialState: initialState,
  reducers: {
    setActiveLibraryId: (state, action) => {
      state.activeLibraryId = action.payload;
    },
  },
});

export const { setActiveLibraryId } = playerSlide.actions;

export default playerSlide.reducer;
