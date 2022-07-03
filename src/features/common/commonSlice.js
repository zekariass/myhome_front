// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import myHomeBackendAPI from "components/commons/apis/myHomeBackendAPI";
import { getFormatedResponse } from "features/getFormatedResponse";

const initialCommonState = {
  periodicityList: {
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

export const getPeriodicities = createAsyncThunk(
  "common/getPeriodicities",
  async () => {
    let result;
    try {
      result = await myHomeBackendAPI.get(`/common/periodicity/list/`);
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

//=========COMMONS SLICE===========================================================

const commonSlice = createSlice({
  name: "common",
  initialState: initialCommonState,
  reducers: {},
  extraReducers: {
    /**
     * get Listing modes
     * @param {StateObject} state
     */
    [getPeriodicities.pending]: (state) => {
      state.periodicityList.request.isLoading = true;
    },
    [getPeriodicities.fulfilled]: (state, action) => {
      state.periodicityList.request.isLoading = false;
      state.periodicityList.data = action.payload.data;
      state.periodicityList.response.status = action.payload.status;
    },
    [getPeriodicities.rejected]: (state, action) => {
      state.periodicityList.request.isLoading = false;
      state.periodicityList.response.error = action.payload.data;
      state.periodicityList.response.status = action.payload.status;
    },
  },
});

export default commonSlice.reducer;
