// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import myHomeBackendAPI from "components/commons/apis/myHomeBackendAPI";
import { getFormatedResponse } from "features/getFormatedResponse";

const initialParamState = {
  systemParams: {
    request: {
      isLoading: false,
    },
    response: {
      error: null,
      status: null,
    },
    data: [],
  },
  listingParams: {
    request: {
      isLoading: false,
    },
    response: {
      error: null,
      status: null,
    },
    data: [],
  },

  currency: {
    currencyList: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },
  },
};

export const getSystemParams = createAsyncThunk(
  "systemParams/getSystemParams",
  async () => {
    /**
     * Get system parameters
     */

    let result;
    try {
      result = await myHomeBackendAPI.get("/system/systemparameters/");
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const getListingParams = createAsyncThunk(
  "systemParams/getListingParams",
  async () => {
    /**
     * Get listing parameters
     */

    let result;
    try {
      result = await myHomeBackendAPI.get("/system/listingparameters/");
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const getCurrencies = createAsyncThunk(
  "systemParams/getCurrencies",
  async () => {
    /**
     * Get listing parameters
     */

    let result;
    try {
      result = await myHomeBackendAPI.get("/system/currency/list/");
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

const paramSlice = createSlice({
  name: "systemParams",
  initialState: initialParamState,
  reducers: {},
  extraReducers: {
    /**
     * Get system parameters
     * @param {StateObject} state
     */
    [getSystemParams.pending]: (state) => {
      state.systemParams.request.isLoading = true;
    },
    [getSystemParams.fulfilled]: (state, action) => {
      state.systemParams.request.isLoading = false;
      state.systemParams.data = action.payload.data;
      state.systemParams.response.status = action.payload.status;
    },
    [getSystemParams.rejected]: (state, action) => {
      state.systemParams.request.isLoading = false;
      state.systemParams.response.error = action.payload.data;
      state.systemParams.response.status = action.payload.status;
    },

    /**
     * Get listing parameters
     * @param {StateObject} state
     */
    [getListingParams.pending]: (state) => {
      state.listingParams.request.isLoading = true;
    },
    [getListingParams.fulfilled]: (state, action) => {
      state.listingParams.request.isLoading = false;
      state.listingParams.data = action.payload.data;
      state.listingParams.response.status = action.payload.status;
    },
    [getListingParams.rejected]: (state, action) => {
      state.listingParams.request.isLoading = false;
      state.listingParams.response.error = action.payload.data;
      state.listingParams.response.status = action.payload.status;
    },

    /**
     * Get currencies
     * @param {StateObject} state
     */
    [getCurrencies.pending]: (state) => {
      state.currency.currencyList.request.isLoading = true;
    },
    [getCurrencies.fulfilled]: (state, action) => {
      state.currency.currencyList.request.isLoading = false;
      state.currency.currencyList.data = action.payload.data;
      state.currency.currencyList.response.status = action.payload.status;
    },
    [getCurrencies.rejected]: (state, action) => {
      state.currency.currencyList.request.isLoading = false;
      state.currency.currencyList.response.error = action.payload.data;
      state.currency.currencyList.response.status = action.payload.status;
    },
  },
});

// export const { setFormInitialValue } = propertySlice.actions;

export default paramSlice.reducer;
