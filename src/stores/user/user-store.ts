import { createSlice } from "@reduxjs/toolkit";

interface IUserState {
  uid: string;
}

const initialState: IUserState = {
  uid: "",
};

export const userSlide = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUid: (state, action) => {
      state.uid = action.payload;
    },
  },
});

export const { setUid } = userSlide.actions;

export default userSlide.reducer;
