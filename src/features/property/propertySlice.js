// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import myHomeBackendAPI from "components/commons/apis/myHomeBackendAPI";
import { getFormatedResponse } from "features/getFormatedResponse";

const initialPropertyState = {
  request: {
    isLoading: false,
  },
  response: {
    data: [],
    error: null,
    status: null,
  },
};

export const createProperty = createAsyncThunk(
  "property/createProperty",
  async (values, thunkApi) => {
    /**
     * Get agent id of current user
     */
    const agentId = thunkApi.getState().agent.getAgent.response.data.id;

    values["agent"] = agentId;

    let result;
    try {
      result = await myHomeBackendAPI.post("/property/create/", values);
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

const propertySlice = createSlice({
  name: "property",
  initialState: initialPropertyState,
  reducers: {},
  extraReducers: {
    /**
     * Create property
     * @param {StateObject} state
     */
    [createProperty.pending]: (state) => {
      state.request.isLoading = true;
    },
    [createProperty.fulfilled]: (state, action) => {
      state.request.isLoading = false;
      state.response.data = action.payload.data;
      state.response.status = action.payload.status;
    },
    [createProperty.rejected]: (state, action) => {
      state.request.isLoading = false;
      state.response.data = action.payload.data;
      state.response.status = action.payload.status;
    },
  },
});

export default propertySlice.reducer;
