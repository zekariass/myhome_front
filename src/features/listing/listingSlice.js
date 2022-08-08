// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import myHomeBackendAPI from "components/commons/apis/myHomeBackendAPI";
import { goToPage } from "features/common/wizardSlice";
import { getFormatedResponse } from "features/getFormatedResponse";
import {
  getPublicListingsById,
  getPublicListingsBySearchFromLandingPage,
} from "./publicListingSlice";

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
  listingList: {
    request: {
      isLoading: false,
    },
    response: {
      error: null,
      status: null,
    },
    data: [],
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
  updateListing: {
    request: {
      isLoading: false,
    },
    response: {
      error: null,
      status: null,
    },
    data: 0,
  },
  deleteListing: {
    request: {
      isLoading: false,
    },
    response: {
      error: null,
      status: null,
    },
    data: 0,
  },
  feature: {
    activeFeaturePrice: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: { price: 0.0 },
    },
    featureListing: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: {},
    },
  },

  selectedListingType: null,
  listingKey: null,
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
  async ({ listingData, navigate }, thunkApi) => {
    let result;
    try {
      result = await myHomeBackendAPI.post(`/listing/create/`, listingData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (result.status === 201) {
        navigate(-1, { replace: true });
        thunkApi.dispatch(goToPage(0));
      }
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const getListingsByProperty = createAsyncThunk(
  "listing/getListingsByProperty",
  async (propertyId) => {
    let result;
    try {
      result = await myHomeBackendAPI.get(`/listing/list-by-property/`, {
        params: { property: propertyId },
      });
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);
export const getListingsByPropertyUnit = createAsyncThunk(
  "listing/getListingsByPropertyUnit",
  async (unitListingQueryParams) => {
    let result;
    try {
      result = await myHomeBackendAPI.get(`/listing/list-by-unit/`, {
        params: unitListingQueryParams,
      });
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const getListingsByAgent = createAsyncThunk(
  "listing/getListingsByAgent",
  async () => {
    let result;
    try {
      result = await myHomeBackendAPI.get(`/listing/list-by-agent/`);
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

export const updateListing = createAsyncThunk(
  "listing/updateListing",
  async ({ updateData, navigate }) => {
    let result;
    try {
      result = await myHomeBackendAPI.patch(
        `/listing/${updateData?.id}/update/`,
        updateData
      );
      if (result.status === 200) {
        navigate(-1);
      }
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const deleteListing = createAsyncThunk(
  "listing/deleteListing",
  async ({ listingId, listingKey, propertyId, catKey, unitId }, thunkApi) => {
    let result;
    try {
      result = await myHomeBackendAPI.delete(`/listing/${listingId}/delete/`);
      // if (result.status === 204) {
      //   navigate(PATH_AGENT_DASHBOARD_LISTING_LIST_ABSOLUTE, {
      //     state: { data: propertyData, key: "byProperty" },
      //   });
      // }
      if (result.status === 204) {
        if (listingKey === "byAgent") {
          thunkApi.dispatch(getListingsByAgent());
        } else if (listingKey === "byUnit") {
          thunkApi.dispatch(
            getListingsByPropertyUnit({ unit: unitId, cat_key: catKey })
          );
        } else {
          thunkApi.dispatch(getListingsByProperty(propertyId));
        }
        thunkApi.dispatch(setListingKey(listingKey));
      }
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const getActiveFeaturePrice = createAsyncThunk(
  "listing/getActiveFeaturePrice",
  async () => {
    let result;
    try {
      result = await myHomeBackendAPI.get(`/listing/feature/get-active-price/`);
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const featureListing = createAsyncThunk(
  "listing/featureListing",
  async ({ featureData, navigate }) => {
    let result;
    try {
      result = await myHomeBackendAPI.post(`/listing/feature/`, featureData);
      if (result.status === 201) {
        navigate(-1, { replace: true });
      }
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
    setListingKey: (state, action) => {
      state.listingKey = action.payload;
    },
    resetListingList: (state) => {
      state.listingList.data = [];
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

    /**
     * get listings by property
     * @param {StateObject} state
     */
    [getListingsByProperty.pending]: (state) => {
      state.listingList.request.isLoading = true;
    },
    [getListingsByProperty.fulfilled]: (state, action) => {
      state.listingList.request.isLoading = false;
      state.listingList.data = action.payload.data;
      state.listingList.response.status = action.payload.status;
    },
    [getListingsByProperty.rejected]: (state, action) => {
      state.listingList.request.isLoading = false;
      state.listingList.response.error = action.payload.data;
      state.listingList.response.status = action.payload.status;
    },

    /**
     * get listings by property unit
     * @param {StateObject} state
     */
    [getListingsByPropertyUnit.pending]: (state) => {
      state.listingList.request.isLoading = true;
    },
    [getListingsByPropertyUnit.fulfilled]: (state, action) => {
      state.listingList.request.isLoading = false;
      state.listingList.data = action.payload.data;
      state.listingList.response.status = action.payload.status;
    },
    [getListingsByPropertyUnit.rejected]: (state, action) => {
      state.listingList.request.isLoading = false;
      state.listingList.response.error = action.payload.data;
      state.listingList.response.status = action.payload.status;
    },

    /**
     * get listings by Agent
     * @param {StateObject} state
     */
    [getListingsByAgent.pending]: (state) => {
      state.listingList.request.isLoading = true;
    },
    [getListingsByAgent.fulfilled]: (state, action) => {
      state.listingList.request.isLoading = false;
      state.listingList.data = action.payload.data;
      state.listingList.response.status = action.payload.status;
    },
    [getListingsByAgent.rejected]: (state, action) => {
      state.listingList.request.isLoading = false;
      state.listingList.response.error = action.payload.data;
      state.listingList.response.status = action.payload.status;
    },

    /**
     * Edit listings data
     * @param {StateObject} state
     */
    [updateListing.pending]: (state) => {
      state.updateListing.request.isLoading = true;
    },
    [updateListing.fulfilled]: (state, action) => {
      state.updateListing.request.isLoading = false;
      state.updateListing.data = action.payload.data;
      state.updateListing.response.status = action.payload.status;
    },
    [updateListing.rejected]: (state, action) => {
      state.updateListing.request.isLoading = false;
      state.updateListing.response.error = action.payload.data;
      state.updateListing.response.status = action.payload.status;
    },

    /**
     * Delete listings data
     * @param {StateObject} state
     */
    [deleteListing.pending]: (state) => {
      state.deleteListing.request.isLoading = true;
    },
    [deleteListing.fulfilled]: (state, action) => {
      state.deleteListing.request.isLoading = false;
      state.deleteListing.data = action.payload.data;
      state.deleteListing.response.status = action.payload.status;
    },
    [deleteListing.rejected]: (state, action) => {
      state.deleteListing.request.isLoading = false;
      state.deleteListing.response.error = action.payload.data;
      state.deleteListing.response.status = action.payload.status;
    },

    /**
     * GET active feature data
     * @param {StateObject} state
     */
    [getActiveFeaturePrice.pending]: (state) => {
      state.feature.activeFeaturePrice.request.isLoading = true;
    },
    [getActiveFeaturePrice.fulfilled]: (state, action) => {
      state.feature.activeFeaturePrice.request.isLoading = false;
      state.feature.activeFeaturePrice.data = action.payload.data;
      state.feature.activeFeaturePrice.response.status = action.payload.status;
    },
    [getActiveFeaturePrice.rejected]: (state, action) => {
      state.feature.activeFeaturePrice.request.isLoading = false;
      state.feature.activeFeaturePrice.response.error = action.payload.data;
      state.feature.activeFeaturePrice.response.status = action.payload.status;
    },

    /**
     * Feature listing
     * @param {StateObject} state
     */
    [featureListing.pending]: (state) => {
      state.feature.featureListing.request.isLoading = true;
    },
    [featureListing.fulfilled]: (state, action) => {
      state.feature.featureListing.request.isLoading = false;
      state.feature.featureListing.data = action.payload.data;
      state.feature.featureListing.response.status = action.payload.status;
    },
    [featureListing.rejected]: (state, action) => {
      state.feature.featureListing.request.isLoading = false;
      state.feature.featureListing.response.error = action.payload.data;
      state.feature.featureListing.response.status = action.payload.status;
    },
  },
});

export const { setSelectedLitingType, setListingKey, resetListingList } =
  listingSlice.actions;

export default listingSlice.reducer;
