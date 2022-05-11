// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import myHomeBackendAPI from "components/commons/apis/myHomeBackendAPI";
import { getFormatedResponse } from "features/getFormatedResponse";

const initialHouseTypeState = {
  request: {
    isLoading: false,
  },
  response: {
    data: [],
    error: null,
    status: null,
  },
};

export const getHouseTypes = createAsyncThunk(
  "houseType/getHouseTypes",
  async () => {
    let result;
    try {
      result = await myHomeBackendAPI.get("/property/housetypes/");
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

const houseTypeSlice = createSlice({
  name: "houseType",
  initialState: initialHouseTypeState,
  reducers: {},
  extraReducers: {
    /**
     * Getting house types
     * @param {StateObject} state
     */
    [getHouseTypes.pending]: (state) => {
      state.request.isLoading = true;
    },
    [getHouseTypes.fulfilled]: (state, action) => {
      state.request.isLoading = false;
      state.response.data = action.payload.data;
      state.response.status = action.payload.status;
    },
    [getHouseTypes.rejected]: (state, action) => {
      state.request.isLoading = false;
      state.response.data = action.payload.data;
      state.response.status = action.payload.status;
    },
  },
});

export default houseTypeSlice.reducer;
