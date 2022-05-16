// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import myHomeBackendAPI from "components/commons/apis/myHomeBackendAPI";
import { getFormatedResponse } from "features/getFormatedResponse";

const initialPropertyCategoryState = {
  request: {
    isLoading: false,
  },
  response: {
    data: [],
    error: null,
    status: null,
  },
};

export const getPropertyCategories = createAsyncThunk(
  "propertyCategory/getPropertyCategories",
  async () => {
    let result;
    try {
      result = await myHomeBackendAPI.get("/property/categories/");
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

const propertyCategorySlice = createSlice({
  name: "propertyCategory",
  initialState: initialPropertyCategoryState,
  reducers: {
    
  },
  extraReducers: {
    /**
     * Getting property categories
     * @param {StateObject} state
     */
    [getPropertyCategories.pending]: (state) => {
      state.request.isLoading = true;
    },
    [getPropertyCategories.fulfilled]: (state, action) => {
      state.request.isLoading = false;
      state.response.data = action.payload.data;
      state.response.status = action.payload.status;
    },
    [getPropertyCategories.rejected]: (state, action) => {
      state.request.isLoading = false;
      state.response.data = action.payload.data;
      state.response.status = action.payload.status;
    },
  },
});

export default propertyCategorySlice.reducer;
