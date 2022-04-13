import { createSlice } from "@reduxjs/toolkit";

const userInitialState = {};

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    signUp: (state, action) => {
      state = { ...action.payload };
    },
  },
});

export const { signUp } = userSlice.actions;

export default userSlice.reducer;
