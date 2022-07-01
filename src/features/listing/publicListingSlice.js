// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import myHomeBackendAPI from "components/commons/apis/myHomeBackendAPI";
import { getFormatedResponse } from "features/getFormatedResponse";

const initialPublicListingState = {
  publicListingList: {
    request: {
      isLoading: false,
    },
    response: {
      error: null,
      status: null,
    },
    data: [],
  },
};

export const getPublicListingsBySearchFromLandingPage = createAsyncThunk(
  "publicListing/getPublicListingsBySearchFromLandingPage",
  async (searchParams) => {
    let result;
    try {
      result = await myHomeBackendAPI.get(`/listing/public/search/`, {
        params: searchParams,
      });
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

//=========LISTING PAGE SLICE===========================================================

const publicListing = createSlice({
  name: "publicListing",
  initialState: initialPublicListingState,
  reducers: {
    clearPublicListing: (state) => {
      state.publicListingList.data = [];
    },
  },
  extraReducers: {
    /**
     * get Listing modes
     * @param {StateObject} state
     */
    [getPublicListingsBySearchFromLandingPage.pending]: (state) => {
      state.publicListingList.request.isLoading = true;
    },
    [getPublicListingsBySearchFromLandingPage.fulfilled]: (state, action) => {
      state.publicListingList.request.isLoading = false;
      state.publicListingList.data = action.payload.data;
      state.publicListingList.response.status = action.payload.status;
    },
    [getPublicListingsBySearchFromLandingPage.rejected]: (state, action) => {
      state.publicListingList.request.isLoading = false;
      state.publicListingList.response.error = action.payload.data;
      state.publicListingList.response.status = action.payload.status;
    },
  },
});

export const { clearPublicListing } = publicListing.actions;

export default publicListing.reducer;
