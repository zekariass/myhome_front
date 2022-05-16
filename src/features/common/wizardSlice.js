import { createSlice } from "@reduxjs/toolkit";

const propertyWizardInitialState = {
  activePage: 0,
};

const wizardSlice = createSlice({
  name: "propertyWizard",
  initialState: propertyWizardInitialState,
  reducers: {
    nextPage: (state, action) => {
      state.activePage = action.payload;
    },
    previousPage: (state, action) => {
      state.activePage = action.payload;
    },
    goToPage: (state, action) => {
      state.activePage = action.payload;
    },
  },
});

export const { nextPage, previousPage, goToPage } = wizardSlice.actions;

export default wizardSlice.reducer;
