// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import myHomeBackendAPI from "components/commons/apis/myHomeBackendAPI";
import { getFormatedResponse } from "features/getFormatedResponse";

const filterInitialState = {
  property_category: { name: "Property Category" },
  number_of_bed_rooms: "",
  listing_type: "Listing Type",
  min_price: "Min Price",
  max_price: "Max Price",
};

const searchParamInitialState = {
  for_rent: true,
  for_sale: true,
  location: -1,
  property_category: -1,
  min_price: -1,
  max_price: -1,
  number_of_bed_rooms: -1,
  sort_by: -1,
  page: 1,
};

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
  featuredListingList: {
    request: {
      isLoading: false,
    },
    response: {
      error: null,
      status: null,
    },
    data: {
      results: [],
    },
  },
  listingPropertyImageList: {
    request: {
      isLoading: false,
    },
    response: {
      error: null,
      status: null,
    },
    data: [],
  },
  listingPropertyVideoList: {
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
    params: searchParamInitialState,
  },
  filterValues: {
    values: filterInitialState,
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

export const getFeaturedListings = createAsyncThunk(
  "listing/getFeaturedListings",
  async ({ page, location }) => {
    let result;
    try {
      result = await myHomeBackendAPI.get(
        `/listing/featured/list/?page=${page}&location=${location}`
      );
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const getListingPropertyImageList = createAsyncThunk(
  "listing/getListingPropertyImageList",
  async (listingId) => {
    let result;
    try {
      result = await myHomeBackendAPI.get(
        `/listing/${listingId}/property/image/list/`
      );
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const getListingPropertyVideoList = createAsyncThunk(
  "listing/getListingPropertyVideoList",
  async (listingId) => {
    let result;
    try {
      result = await myHomeBackendAPI.get(
        `/listing/${listingId}/property/video/list/`
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
    setListingFilterValues: (state, actions) => {
      state.filterValues.values = actions.payload;
    },
    resetListingFilterValues: (state) => {
      state.filterValues.values = filterInitialState;
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

    /**
     * Get featured list
     * @param {StateObject} state
     */
    [getFeaturedListings.pending]: (state) => {
      state.featuredListingList.request.isLoading = true;
    },
    [getFeaturedListings.fulfilled]: (state, action) => {
      state.featuredListingList.request.isLoading = false;
      state.featuredListingList.data.next = action.payload.data.next;
      state.featuredListingList.data.previous = action.payload.data.previous;
      state.featuredListingList.data.count = action.payload.data.count;
      if (action.payload.data.previous) {
        state.featuredListingList.data.results = [
          ...state.featuredListingList.data.results,
          ...action.payload.data.results,
        ];
      } else {
        state.featuredListingList.data.results = action.payload.data.results;
      }

      // state.featuredListingList.data.results = action.payload.data.results;

      state.featuredListingList.response.status = action.payload.status;
    },
    [getFeaturedListings.rejected]: (state, action) => {
      state.featuredListingList.request.isLoading = false;
      state.featuredListingList.response.error = action.payload.data;
      state.featuredListingList.response.status = action.payload.status;
    },

    /**
     * Get listing property images list
     * @param {StateObject} state
     */
    [getListingPropertyImageList.pending]: (state) => {
      state.listingPropertyImageList.request.isLoading = true;
    },
    [getListingPropertyImageList.fulfilled]: (state, action) => {
      state.listingPropertyImageList.request.isLoading = false;
      state.listingPropertyImageList.data = action.payload.data;
      state.listingPropertyImageList.response.status = action.payload.status;
    },
    [getListingPropertyImageList.rejected]: (state, action) => {
      state.listingPropertyImageList.request.isLoading = false;
      state.listingPropertyImageList.response.error = action.payload.data;
      state.listingPropertyImageList.response.status = action.payload.status;
    },

    /**
     * Get listing property videos list
     * @param {StateObject} state
     */
    [getListingPropertyVideoList.pending]: (state) => {
      state.listingPropertyVideoList.request.isLoading = true;
    },
    [getListingPropertyVideoList.fulfilled]: (state, action) => {
      state.listingPropertyVideoList.request.isLoading = false;
      state.listingPropertyVideoList.data = action.payload.data;
      state.listingPropertyVideoList.response.status = action.payload.status;
    },
    [getListingPropertyVideoList.rejected]: (state, action) => {
      state.listingPropertyVideoList.request.isLoading = false;
      state.listingPropertyVideoList.response.error = action.payload.data;
      state.listingPropertyVideoList.response.status = action.payload.status;
    },
  },
});

export const {
  clearPublicListing,
  setSearchParams,
  setListingFilterValues,
  resetListingFilterValues,
} = publicListing.actions;

export default publicListing.reducer;
