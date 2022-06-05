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
  getPropertyCategory: {
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

export const getPropertyCategory = createAsyncThunk(
  "propertyCategory/getPropertyCategory",
  async (lookup) => {
    let result;
    try {
      result = await myHomeBackendAPI.get(`/property/categories/${lookup}`);
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
  reducers: {},
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

    /**
     * Getting a specific property category
     * @param {StateObject} state
     */
    [getPropertyCategory.pending]: (state) => {
      state.request.isLoading = true;
    },
    [getPropertyCategory.fulfilled]: (state, action) => {
      state.getPropertyCategory.request.isLoading = false;
      state.getPropertyCategory.data = action.payload.data;
      state.getPropertyCategory.response.status = action.payload.status;
    },
    [getPropertyCategory.rejected]: (state, action) => {
      state.getPropertyCategory.request.isLoading = false;
      state.getPropertyCategory.response.error = action.payload.data;
      state.getPropertyCategory.response.status = action.payload.status;
    },
  },
});

export default propertyCategorySlice.reducer;
