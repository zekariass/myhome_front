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
  savePublicListing: {
    request: {
      isLoading: false,
    },
    response: {
      error: null,
      status: null,
    },
    data: {},
  },

  unsavePublicListing: {
    request: {
      isLoading: false,
    },
    response: {
      error: null,
      status: null,
    },
    data: {},
  },
  savedPublicListingsList: {
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

export const savePublicListing = createAsyncThunk(
  "listing/savePublicListing",
  async ({ listingId, page, searchQuery }, thunkApi) => {
    let result;
    try {
      result = await myHomeBackendAPI.post(`/listing/save/`, {
        main_listing: listingId,
      });
      if (result.status === 201) {
        if (page === "publicListingDetail") {
          thunkApi.dispatch(getPublicListingsById(listingId));
        } else if (page === "publicListingList") {
          thunkApi.dispatch(
            getPublicListingsBySearchFromLandingPage(searchQuery)
          );
        } else if (page === "savedPublicListings") {
          thunkApi.dispatch(getSavedPublicListings());
        }
      }
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const unsavePublicListing = createAsyncThunk(
  "listing/unsavePublicListing",
  async ({ listingId, page, searchQuery }, thunkApi) => {
    let result;
    try {
      result = await myHomeBackendAPI.delete(`/listing/${listingId}/unsave/`);
      if (result.status === 200) {
        if (page === "publicListingDetail") {
          thunkApi.dispatch(getPublicListingsById(listingId));
        } else if (page === "publicListingList") {
          thunkApi.dispatch(
            getPublicListingsBySearchFromLandingPage(searchQuery)
          );
        } else if (page === "savedPublicListings") {
          thunkApi.dispatch(getSavedPublicListings());
        }
      }
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const getSavedPublicListings = createAsyncThunk(
  "listing/getSavedPublicListings",
  async () => {
    let result;
    try {
      result = await myHomeBackendAPI.get(`/listing/saved/list/`);
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

    /**
     * Save main listings
     * @param {StateObject} state
     */
    [savePublicListing.pending]: (state) => {
      state.savePublicListing.request.isLoading = true;
    },
    [savePublicListing.fulfilled]: (state, action) => {
      state.savePublicListing.request.isLoading = false;
      state.savePublicListing.data = action.payload.data;
      state.savePublicListing.response.status = action.payload.status;
    },
    [savePublicListing.rejected]: (state, action) => {
      state.savePublicListing.request.isLoading = false;
      state.savePublicListing.response.error = action.payload.data;
      state.savePublicListing.response.status = action.payload.status;
    },

    /**
     * Unsave main listings
     * @param {StateObject} state
     */
    [unsavePublicListing.pending]: (state) => {
      state.unsavePublicListing.request.isLoading = true;
    },
    [unsavePublicListing.fulfilled]: (state, action) => {
      state.unsavePublicListing.request.isLoading = false;
      state.unsavePublicListing.data = action.payload.data;
      state.unsavePublicListing.response.status = action.payload.status;
    },
    [unsavePublicListing.rejected]: (state, action) => {
      state.unsavePublicListing.request.isLoading = false;
      state.unsavePublicListing.response.error = action.payload.data;
      state.unsavePublicListing.response.status = action.payload.status;
    },

    /**
     * Saved listings list
     * @param {StateObject} state
     */
    [getSavedPublicListings.pending]: (state) => {
      state.savedPublicListingsList.request.isLoading = true;
    },
    [getSavedPublicListings.fulfilled]: (state, action) => {
      state.savedPublicListingsList.request.isLoading = false;
      state.savedPublicListingsList.data = action.payload.data;
      state.savedPublicListingsList.response.status = action.payload.status;
    },
    [getSavedPublicListings.rejected]: (state, action) => {
      state.savedPublicListingsList.request.isLoading = false;
      state.savedPublicListingsList.response.error = action.payload.data;
      state.savedPublicListingsList.response.status = action.payload.status;
    },
  },
});

export const { clearPublicListing, setSearchParams } = publicListing.actions;

export default publicListing.reducer;
