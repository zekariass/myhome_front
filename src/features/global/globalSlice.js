import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: null,
};

/**
 * A slice which stores global state which can be applied in the whole application
 */
const globalSlice = createSlice({
  name: "global",
  initialState: initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
      // console.log("CURRENTPAGE: ", action.payload);
    },
  },
});

export const { setCurrentPage } = globalSlice.actions;

export default globalSlice.reducer;
