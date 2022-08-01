// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import myHomeBackendAPI from "components/commons/apis/myHomeBackendAPI";
import { getFormatedResponse } from "features/getFormatedResponse";

const initialSystemState = {
  assetList: {
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

export const getSystemAssets = createAsyncThunk(
  "system/getSystemAssets",
  async () => {
    let result;
    try {
      result = await myHomeBackendAPI.get("/system/asset/list/");
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

const assetSlice = createSlice({
  name: "system",
  initialState: initialSystemState,
  reducers: {},
  extraReducers: {
    /**
     * Get system assets
     * @param {StateObject} state
     */
    [getSystemAssets.pending]: (state) => {
      state.assetList.request.isLoading = true;
    },
    [getSystemAssets.fulfilled]: (state, action) => {
      state.assetList.request.isLoading = false;
      state.assetList.data = action.payload.data;
      state.assetList.response.status = action.payload.status;
    },
    [getSystemAssets.rejected]: (state, action) => {
      state.assetList.request.isLoading = false;
      state.assetList.response.error = action.payload.data;
      state.assetList.response.status = action.payload.status;
    },
  },
});

// export const { setFormInitialValue } = propertySlice.actions;

export default assetSlice.reducer;
