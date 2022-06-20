// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import myHomeBackendAPI from "components/commons/apis/myHomeBackendAPI";
import { getFormatedResponse } from "features/getFormatedResponse";

const initialListingState = {
  getListingModes: {
    request: {
      isLoading: false,
    },
    response: {
      error: null,
      status: null,
    },
    data: [],
  },
  getListingTypes: {
    request: {
      isLoading: false,
    },
    response: {
      error: null,
      status: null,
    },
    data: [],
  },
  getListingStates: {
    request: {
      isLoading: false,
    },
    response: {
      error: null,
      status: null,
    },
    data: [],
  },
  agentListingCount: {
    request: {
      isLoading: false,
    },
    response: {
      error: null,
      status: null,
    },
    data: 0,
  },
  createListing: {
    request: {
      isLoading: false,
    },
    response: {
      error: null,
      status: null,
    },
    data: 0,
  },
  selectedListingType: null,
};

export const getListingModes = createAsyncThunk(
  "listing/getListingModes",
  async () => {
    let result;
    try {
      result = await myHomeBackendAPI.get(`/listing/listingmode/list/`);
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const getListingTypes = createAsyncThunk(
  "listing/getListingTypes",
  async () => {
    let result;
    try {
      result = await myHomeBackendAPI.get(`/listing/listingtype/list/`);
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const getListingStates = createAsyncThunk(
  "listing/getListingStates",
  async () => {
    let result;
    try {
      result = await myHomeBackendAPI.get(`/listing/listingstate/list/`);
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const createListing = createAsyncThunk(
  "listing/createListing",
  async (listingData) => {
    let result;
    try {
      result = await myHomeBackendAPI.post(`/listing/create/`, listingData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const getAgentListingCount = createAsyncThunk(
  "listing/getAgentListingCount",
  async () => {
    let result;
    try {
      result = await myHomeBackendAPI.get(`/listing/agent-listing/count/`);
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

//=========LISTING SLICE===========================================================

const listingSlice = createSlice({
  name: "listing",
  initialState: initialListingState,
  reducers: {
    setSelectedLitingType: (state, action) => {
      state.selectedListingType = action.payload;
    },
  },
  extraReducers: {
    /**
     * get Listing modes
     * @param {StateObject} state
     */
    [getListingModes.pending]: (state) => {
      state.getListingModes.request.isLoading = true;
    },
    [getListingModes.fulfilled]: (state, action) => {
      state.getListingModes.request.isLoading = false;
      state.getListingModes.data = action.payload.data;
      state.getListingModes.response.status = action.payload.status;
    },
    [getListingModes.rejected]: (state, action) => {
      state.getListingModes.request.isLoading = false;
      state.getListingModes.response.error = action.payload.data;
      state.getListingModes.response.status = action.payload.status;
    },

    /**
     * get Listing types
     * @param {StateObject} state
     */
    [getListingTypes.pending]: (state) => {
      state.getListingTypes.request.isLoading = true;
    },
    [getListingTypes.fulfilled]: (state, action) => {
      state.getListingTypes.request.isLoading = false;
      state.getListingTypes.data = action.payload.data;
      state.getListingTypes.response.status = action.payload.status;
    },
    [getListingTypes.rejected]: (state, action) => {
      state.getListingTypes.request.isLoading = false;
      state.getListingTypes.response.error = action.payload.data;
      state.getListingTypes.response.status = action.payload.status;
    },

    /**
     * get Listing states
     * @param {StateObject} state
     */
    [getListingStates.pending]: (state) => {
      state.getListingStates.request.isLoading = true;
    },
    [getListingStates.fulfilled]: (state, action) => {
      state.getListingStates.request.isLoading = false;
      state.getListingStates.data = action.payload.data;
      state.getListingStates.response.status = action.payload.status;
    },
    [getListingStates.rejected]: (state, action) => {
      state.getListingStates.request.isLoading = false;
      state.getListingStates.response.error = action.payload.data;
      state.getListingStates.response.status = action.payload.status;
    },

    /**
     * Create Listing
     * @param {StateObject} state
     */
    [createListing.pending]: (state) => {
      state.createListing.request.isLoading = true;
    },
    [createListing.fulfilled]: (state, action) => {
      state.createListing.request.isLoading = false;
      state.createListing.data = action.payload.data;
      state.createListing.response.status = action.payload.status;
    },
    [createListing.rejected]: (state, action) => {
      state.createListing.request.isLoading = false;
      state.createListing.response.error = action.payload.data;
      state.createListing.response.status = action.payload.status;
    },

    /**
     * get agent listing count
     * @param {StateObject} state
     */
    [getAgentListingCount.pending]: (state) => {
      state.agentListingCount.request.isLoading = true;
    },
    [getAgentListingCount.fulfilled]: (state, action) => {
      state.agentListingCount.request.isLoading = false;
      state.agentListingCount.data = action.payload.data;
      state.agentListingCount.response.status = action.payload.status;
    },
    [getAgentListingCount.rejected]: (state, action) => {
      state.agentListingCount.request.isLoading = false;
      state.agentListingCount.response.error = action.payload.data;
      state.agentListingCount.response.status = action.payload.status;
    },
  },
});

export const { setSelectedLitingType } = listingSlice.actions;

export default listingSlice.reducer;
