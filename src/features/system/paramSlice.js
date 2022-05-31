// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import myHomeBackendAPI from "components/commons/apis/myHomeBackendAPI";
import { goToPage } from "features/common/wizardSlice";
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
};

export const getSystemParams = createAsyncThunk(
  "system/getSystemParams",
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

const paramSlice = createSlice({
  name: "system",
  initialState: initialParamState,
  reducers: {},
  extraReducers: {
    /**
     * Create property
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
  },
});

// export const { setFormInitialValue } = propertySlice.actions;

export default paramSlice.reducer;
