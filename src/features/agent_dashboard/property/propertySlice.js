// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import myHomeBackendAPI from "components/commons/apis/myHomeBackendAPI";
import { goToPage } from "features/common/wizardSlice";
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
  formInitialValues: {},
  propertyList: {
    request: {
      isLoading: false,
    },
    response: {
      error: null,
      status: null,
    },
    data: [],
  },
  singlePropertyAction: {
    //Delete, Retrieve, Update
    request: {
      isLoading: false,
    },
    response: {
      error: null,
      status: null,
    },
    data: {},
  },
  //EDUCATION FACILITY LEVEL
  edufaLevel: {
    getEdufaLevels: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
    },
    data: [],
  },
  //EDUCATION FACILITY
  edufa: {
    createEdufa: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
        data: {},
      },
    },
    data: [],
  },
};

export const createProperty = createAsyncThunk(
  "property/createProperty",
  async ({ values, navigate, successPath }, thunkApi) => {
    /**
     * Get agent id of current user
     */
    const agentId = thunkApi.getState().agent.getAgent.response.data.id;

    values["agent"] = agentId;

    let result;
    try {
      result = await myHomeBackendAPI.post("/property/create/", values);
      if (result.status === 201) {
        //Set the wizard step to 0 after property data is successfully submitted
        thunkApi.dispatch(goToPage(0));
        navigate(successPath, {
          replace: true,
          state: {
            propertyId: result.data.id,
            images_count: result.data.images_count,
            videos_count: result.data.videos_count,
          },
        });
      }
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const getPropertiesByAgent = createAsyncThunk(
  "property/getPropertiesByAgent",
  async () => {
    let result;
    try {
      result = await myHomeBackendAPI.get("/property/list-by-agent/");
      // console.log("LABELS: ", result.data);
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const getPropertyDetail = createAsyncThunk(
  "property/getPropertyDetail",
  async (propertyId) => {
    let result;
    try {
      result = await myHomeBackendAPI.get(`/property/${propertyId}/detail/`);
      // console.log("LABELS: ", result.data);
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const updateProperty = createAsyncThunk(
  "property/propertyUpdate",
  async (newPropertyData) => {
    let result;
    try {
      result = await myHomeBackendAPI.patch(
        `/property/${newPropertyData.id}/update/`,
        newPropertyData
      );
      // console.log("LABELS: ", result.data);
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const createEdufa = createAsyncThunk(
  "property/createEdufa",
  async ({ edufaData, navigate, redirectPath }) => {
    let result;
    try {
      result = await myHomeBackendAPI.post(
        `/property/${edufaData.property}/edufa/create/`,
        edufaData
      );
      if ((result.status = 201)) {
        navigate(redirectPath, {
          replace: true,
          state: { propertyId: edufaData.property },
        });
      }
      // console.log("LABELS: ", result.data);
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const getEdufaLevels = createAsyncThunk(
  "property/getEdufaLevels",
  async () => {
    let result;
    try {
      result = await myHomeBackendAPI.get(`/property/edufalevel/list/`);
      // console.log("LABELS: ", result.data);
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
  reducers: {
    setFormInitialValue: (state, action) => {
      state.formInitialValues = action.payload;
    },
    setPropertyDataForDetail: (state, action) => {
      state.singlePropertyAction.data = action.payload;
    },
  },
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

    /**
     * List agent properties
     * @param {StateObject} state
     */
    [getPropertiesByAgent.pending]: (state) => {
      state.propertyList.request.isLoading = true;
    },
    [getPropertiesByAgent.fulfilled]: (state, action) => {
      state.propertyList.request.isLoading = false;
      state.propertyList.data = action.payload.data;
      state.propertyList.response.status = action.payload.status;
    },
    [getPropertiesByAgent.rejected]: (state, action) => {
      state.propertyList.request.isLoading = false;
      state.propertyList.response.error = action.payload?.data;
      state.propertyList.response.status = action.payload?.status;
      state.propertyList.data = [];
    },
    /**
     * Get property detail from backend
     * @param {StateObject} state
     */
    [getPropertyDetail.pending]: (state) => {
      state.singlePropertyAction.request.isLoading = true;
    },
    [getPropertyDetail.fulfilled]: (state, action) => {
      state.singlePropertyAction.request.isLoading = false;
      state.singlePropertyAction.data = action.payload.data;
      state.singlePropertyAction.response.status = action.payload.status;
    },
    [getPropertyDetail.rejected]: (state, action) => {
      state.singlePropertyAction.request.isLoading = false;
      state.singlePropertyAction.response.error = action.payload.data;
      state.singlePropertyAction.response.status = action.payload.status;
      state.singlePropertyAction.data = [];
    },
    /**
     * Update property
     * @param {StateObject} state
     */
    [updateProperty.pending]: (state) => {
      state.singlePropertyAction.request.isLoading = true;
    },
    [updateProperty.fulfilled]: (state, action) => {
      state.singlePropertyAction.request.isLoading = false;
      // state.singlePropertyAction.data = action.payload.data;
      state.singlePropertyAction.response.status = action.payload.status;
    },
    [updateProperty.rejected]: (state, action) => {
      state.singlePropertyAction.request.isLoading = false;
      state.singlePropertyAction.response.error = action.payload.data;
      state.singlePropertyAction.response.status = action.payload.status;
      // state.singlePropertyAction.data = [];
    },

    /**
     * Get education facility levels
     * @param {StateObject} state
     */
    [getEdufaLevels.pending]: (state) => {
      state.edufaLevel.getEdufaLevels.request.isLoading = true;
    },
    [getEdufaLevels.fulfilled]: (state, action) => {
      state.edufaLevel.getEdufaLevels.request.isLoading = false;
      state.edufaLevel.data = action.payload.data;
      state.edufaLevel.getEdufaLevels.response.status = action.payload.status;
    },
    [getEdufaLevels.rejected]: (state, action) => {
      state.edufaLevel.getEdufaLevels.request.isLoading = false;
      state.edufaLevel.getEdufaLevels.response.error = action.payload.data;
      state.edufaLevel.getEdufaLevels.response.status = action.payload.status;
    },

    /**
     * Create education facility
     * @param {StateObject} state
     */
    [createEdufa.pending]: (state) => {
      state.edufa.createEdufa.request.isLoading = true;
    },
    [createEdufa.fulfilled]: (state, action) => {
      state.edufa.createEdufa.request.isLoading = false;
      state.edufa.createEdufa.data = action.payload.data;
      state.edufa.createEdufa.response.status = action.payload.status;
    },
    [createEdufa.rejected]: (state, action) => {
      state.edufa.createEdufa.request.isLoading = false;
      state.edufa.createEdufa.response.error = action.payload.data;
      state.edufa.createEdufa.response.status = action.payload.status;
    },
  },
});

export const { setFormInitialValue, setPropertyDataForDetail } =
  propertySlice.actions;

export default propertySlice.reducer;
