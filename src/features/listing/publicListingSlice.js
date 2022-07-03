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
  publicListingDetail: {
    request: {
      isLoading: false,
    },
    response: {
      error: null,
      status: null,
    },
    data: [],
  },
  searchParams: {
    params: [],
  },
};

export const getPublicListingsBySearchFromLandingPage = createAsyncThunk(
  "publicListing/getPublicListingsBySearchFromLandingPage",
  async (searchParams) => {
    let result;
    try {
      result = await myHomeBackendAPI.get(
        `/listing/public/search/${searchParams}`
      );
      // , {
      //   params: searchParams,
      // });
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const getPublicListingsById = createAsyncThunk(
  "publicListing/getPublicListingsById",
  async (listingId) => {
    let result;
    try {
      result = await myHomeBackendAPI.get(
        `/listing/public/${listingId}/detail/`
      );
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
    setSearchParams: (state, actions) => {
      state.searchParams.params = actions.payload;
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

    /**
     * get public listing
     * @param {StateObject} state
     */
    [getPublicListingsById.pending]: (state) => {
      state.publicListingDetail.request.isLoading = true;
    },
    [getPublicListingsById.fulfilled]: (state, action) => {
      state.publicListingDetail.request.isLoading = false;
      state.publicListingDetail.data = action.payload.data;
      state.publicListingDetail.response.status = action.payload.status;
    },
    [getPublicListingsById.rejected]: (state, action) => {
      state.publicListingDetail.request.isLoading = false;
      state.publicListingDetail.response.error = action.payload.data;
      state.publicListingDetail.response.status = action.payload.status;
    },
  },
});

export const { clearPublicListing, setSearchParams } = publicListing.actions;

export default publicListing.reducer;
