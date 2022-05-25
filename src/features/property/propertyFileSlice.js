// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import myHomeBackendAPI from "components/commons/apis/myHomeBackendAPI";
import { getFormatedResponse } from "features/getFormatedResponse";

const initialFileState = {
  image: {
    request: {
      isLoading: false,
    },
    response: {
      data: [],
      error: null,
      status: null,
    },
  },
  video: {
    request: {
      isLoading: false,
    },
    response: {
      data: [],
      error: null,
      status: null,
    },
  },
  labels: {
    request: {
      isLoading: false,
    },
    response: {
      data: [],
      error: null,
      status: null,
    },
  },
};

export const getPropertyFileLabels = createAsyncThunk(
  "propertyFile/getPropertyFileLabels",
  async () => {
    let result;
    try {
      result = await myHomeBackendAPI.get("/property/file/labels");
      console.log("LABELS: ", result.data);
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const updatePropertyImageLabel = createAsyncThunk(
  "propertyFile/updatePropertyImageLabel",
  async ({ image, formData }, _) => {
    let result;
    console.log("IMAGEIDDDDD XXX: ", image);

    try {
      result = await myHomeBackendAPI.patch(
        `/property/file/${image}/update/`,
        formData
      );
      console.log("LABELS: ", result.data);
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

/*export const updatePropertyVideo = createAsyncThunk(
  "propertyFile/deletePropertyVideo",
  async ({ videoId, fileKey }, thunkApi) => {
    let result;
    console.log("thunkApi: ", thunkApi);

    try {
      result = await myHomeBackendAPI.delete(
        `/property/file/${videoId}/update/`
      );
      // console.log("LABELS: ", result.data);
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);*/

const propertyFileSlice = createSlice({
  name: "propertyFile",
  initialState: initialFileState,
  reducers: {
    isFileUploaded: (state, action) => {
      const fileKeys = Object.keys(action.payload);
      // console.log("ACTION: ", fileKeys);
      const fileKey = fileKeys.filter((key) => key !== "type");
      if (action.payload.type === "video") {
        state.video[fileKey] = action.payload[fileKey];
      }
      if (action.payload.type === "image") {
        state.image[fileKey] = action.payload[fileKey];
      }
    },
  },
  extraReducers: {
    /**
     * Get file labels
     * @param {StateObject} state
     */
    [getPropertyFileLabels.pending]: (state) => {
      state.labels.request.isLoading = true;
    },
    [getPropertyFileLabels.fulfilled]: (state, action) => {
      state.labels.request.isLoading = false;
      state.labels.response.data = action.payload.data;
      state.labels.response.status = action.payload.status;
    },
    [getPropertyFileLabels.rejected]: (state, action) => {
      state.labels.request.isLoading = false;
      state.image.response.error = action.payload.data;
      state.labels.response.status = action.payload.status;
    },
    /**
     * update image labels
     * @param {StateObject} state
     */
    [updatePropertyImageLabel.pending]: (state) => {
      state.image.request.isLoading = true;
    },
    [updatePropertyImageLabel.fulfilled]: (state, action) => {
      state.image.request.isLoading = false;
      state.image.response.data = action.payload.data;
      state.image.response.status = action.payload.status;
    },
    [updatePropertyImageLabel.rejected]: (state, action) => {
      state.image.request.isLoading = false;
      state.image.response.error = action.payload.data;
      state.image.response.status = action.payload.status;
    },
  },
});

export const { isFileUploaded } = propertyFileSlice.actions;

export default propertyFileSlice.reducer;
