// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import myHomeBackendAPI from "components/commons/apis/myHomeBackendAPI";
import { getFormatedResponse } from "features/getFormatedResponse";

const initialBuildingTypeState = {
  request: {
    isLoading: false,
  },
  response: {
    data: [],
    error: null,
    status: null,
  },
};

export const getBuildingTypes = createAsyncThunk(
  "buildingType/getBuildingTypes",
  async () => {
    let result;
    try {
      result = await myHomeBackendAPI.get("/property/buildingtypes/");
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

const buildingTypeSlice = createSlice({
  name: "buildingType",
  initialState: initialBuildingTypeState,
  reducers: {},
  extraReducers: {
    /**
     * Getting building types
     * @param {StateObject} state
     */
    [getBuildingTypes.pending]: (state) => {
      state.request.isLoading = true;
    },
    [getBuildingTypes.fulfilled]: (state, action) => {
      state.request.isLoading = false;
      state.response.data = action.payload.data;
      state.response.status = action.payload.status;
    },
    [getBuildingTypes.rejected]: (state, action) => {
      state.request.isLoading = false;
      state.response.data = action.payload.data;
      state.response.status = action.payload.status;
    },
  },
});

export default buildingTypeSlice.reducer;
