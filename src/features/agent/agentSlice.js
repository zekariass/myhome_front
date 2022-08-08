// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import myHomeBackendAPI from "components/commons/apis/myHomeBackendAPI";
import { getFormatedResponse } from "features/getFormatedResponse";

const agentInitialState = {
  addAgent: {
    request: {
      requestError: null,
      isLoading: false,
    },
    response: {
      error: null,
      data: {},
      status: null,
    },
  },
  getAgent: {
    request: {
      isLoading: false,
    },
    response: {
      error: null,
      data: {},
      status: null,
    },
  },
  publicAgentDetail: {
    request: {
      isLoading: false,
    },
    response: {
      error: null,
      status: null,
    },
    data: {},
  },
  logo: {
    uploadLogo: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
    },
    deleteLogo: {
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
  publicAgentDetail: {
    request: {
      isLoading: false,
    },
    response: {
      error: null,
      status: null,
    },
    data: {},
  },
  getAgentsByLocation: {
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

//============================================================================
/**
 * Create agent asynk thunk
 */
//============================================================================

export const createAgent = createAsyncThunk(
  "agent/createAgent",
  async ({ values, navigate, redirectPath }, thunkAPI) => {
    try {
      const result = await myHomeBackendAPI.post("/agent/create/", values);
      const formatedResponse = getFormatedResponse(result);
      if (parseInt(formatedResponse.status) === 201) {
        thunkAPI.dispatch(getAgent());
        navigate(redirectPath, {
          replace: true,
          state: { agentId: formatedResponse.data?.id },
        });
      }
      return formatedResponse;
    } catch (error) {
      const formatedResponse = getFormatedResponse(error.response);
      return thunkAPI.rejectWithValue(formatedResponse);
    }
  }
);

//============================================================================
/**
 * Get a specific agent for current user
 */
//============================================================================
export const getAgent = createAsyncThunk("agent/getAgent", async (headers) => {
  let result;
  try {
    result = await myHomeBackendAPI.get("/agent/get/", { headers: headers });
  } catch (error) {
    result = error.response;
  } finally {
    const formattedResponse = getFormatedResponse(result);
    // console.log("formattedResponse: ", formattedResponse);
    return formattedResponse;
  }
});

//============================================================================
/**
 * Agent logo async thunk task
 */
//============================================================================
export const uploadAgentLogo = createAsyncThunk(
  "agentLogo/uploadAgentLogo",
  async (logoData, thunkApi) => {
    const form_data = new FormData();
    if (logoData.logo) {
      form_data.append("logo", logoData.logo, logoData.logo.name);
    }
    form_data.append("agent", logoData.agentId);
    let result;
    try {
      result = await myHomeBackendAPI.post("/agent/logo/upload/", form_data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (result.status === 201) {
        console.log("LOGO RESULT: ", result.data);
      }
    } catch (error) {
      result = error.response;
    } finally {
      const formatted_response = getFormatedResponse(result);
      return formatted_response;
    }
  }
);

//============================================================================
/**
 * Agent logo delete
 */
//============================================================================
export const deleteAgentLogo = createAsyncThunk(
  "agentLogo/deleteAgentLogo",
  async (logoId, _) => {
    let result;
    try {
      result = await myHomeBackendAPI.delete(`/agent/logo/${logoId}/delete/`);
      console.log("agentLogo/deleteAgentLogo: ", result.data);
    } catch (error) {
      result = error.response;
    } finally {
      const formatted_response = getFormatedResponse(result);
      return formatted_response;
    }
  }
);

//============================================================================
/**
 * Get a specific agent by ID
 */
//============================================================================
export const getAgentById = createAsyncThunk(
  "agent/getAgentById",
  async (agentId) => {
    let result;
    try {
      result = await myHomeBackendAPI.get(`/agent/${agentId}/detail/`);
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

//============================================================================
/**
 * Public Agent Detail
 */
//============================================================================
export const getPublicAgentDetail = createAsyncThunk(
  "agent/getPublicAgentDetail",
  async (agentId) => {
    let result;
    try {
      result = await myHomeBackendAPI.get(`/agent/${agentId}/public/detail/`);
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

//============================================================================
/**
 * Get agents by location
 */
//============================================================================
export const getAgentsByLocation = createAsyncThunk(
  "agent/getAgentsByLocation",
  async (params) => {
    let result;
    try {
      result = await myHomeBackendAPI.get(`/agent/list/bylocation/`, {
        params: params,
      });
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

//============================================================================
/**
 * Agent slice
 */
//============================================================================

const agentSlice = createSlice({
  name: "agent",
  initialState: agentInitialState,
  reducers: {
    setAgentData: (state, action) => {
      state.addAgent.request.agentData = action.payload;
    },
    setAgentAddress: (state, action) => {
      state.addAgent.request.agentAddress = action.payload;
    },
    setAgentLogo: (state, action) => {
      state.addAgent.request.agentLogo = action.payload;
    },
  },
  //Create Agent
  extraReducers: {
    [createAgent.pending]: (state) => {
      state.addAgent.request.isLoading = true;
    },
    [createAgent.fulfilled]: (state, action) => {
      state.addAgent.request.isLoading = false;
      // console.log("FULFILLED: ", action.payload);
      state.addAgent.response.data = action.payload.data;
      state.addAgent.response.status = action.payload.status;
    },
    [createAgent.rejected]: (state, action) => {
      state.addAgent.request.isLoading = false;
      // console.log("REJECTED: ", action.payload);
      state.addAgent.response.error = action.payload.data;
      state.addAgent.response.status = action.payload.status;
    },
    //============================================================================
    /**
     * Get a specific agent for current user
     */
    //============================================================================
    [getAgent.pending]: (state) => {
      state.getAgent.request.isLoading = false;
    },
    [getAgent.fulfilled]: (state, action) => {
      state.getAgent.request.isLoading = false;
      state.getAgent.response.data = action.payload.data;
      state.getAgent.response.status = action.payload.status;
    },
    [getAgent.rejected]: (state, action) => {
      state.getAgent.request.isLoading = false;
      state.getAgent.response.error = action.payload.data;
      state.getAgent.response.status = action.payload.status;
    },

    //============================================================================
    /**
     * Upload Agent logo
     */
    //============================================================================
    [uploadAgentLogo.pending]: (state) => {
      state.logo.uploadLogo.request.isLoading = true;
    },
    [uploadAgentLogo.fulfilled]: (state, action) => {
      state.logo.uploadLogo.request.isLoading = false;
      state.logo.uploadLogo.response.status = action.payload.status;
      state.logo.data = [...state.logo.data, action.payload.data];
    },
    [uploadAgentLogo.rejected]: (state, action) => {
      state.logo.uploadLogo.request.isLoading = false;
      state.logo.uploadLogo.response.status = action.payload.status;
      state.logo.uploadLogo.response.error = action.payload.data;
    },

    //============================================================================
    /**
     * Delete Agent logo
     */
    //============================================================================
    [deleteAgentLogo.pending]: (state) => {
      state.logo.deleteLogo.request.isLoading = true;
    },
    [deleteAgentLogo.fulfilled]: (state, action) => {
      state.logo.deleteLogo.request.isLoading = false;
      state.logo.deleteLogo.response.status = action.payload.status;
      state.logo.data = [];
    },
    [deleteAgentLogo.rejected]: (state, action) => {
      state.logo.deleteLogo.request.isLoading = false;
      state.logo.deleteLogo.response.status = action.payload.status;
      state.logo.deleteLogo.response.error = action.payload.data;
    },

    //============================================================================
    /**
     * Get Agent by ID
     */
    //============================================================================
    [getAgentById.pending]: (state) => {
      state.publicAgentDetail.request.isLoading = true;
    },
    [getAgentById.fulfilled]: (state, action) => {
      state.publicAgentDetail.request.isLoading = false;
      state.publicAgentDetail.response.status = action.payload.status;
      state.publicAgentDetail.data = action.payload.data;
    },
    [getAgentById.rejected]: (state, action) => {
      state.publicAgentDetail.request.isLoading = false;
      state.publicAgentDetail.response.status = action.payload.status;
      state.publicAgentDetail.response.error = action.payload.data;
    },

    //============================================================================
    /**
     * Get Agents by location
     */
    //============================================================================
    [getAgentsByLocation.pending]: (state) => {
      state.getAgentsByLocation.request.isLoading = true;
    },
    [getAgentsByLocation.fulfilled]: (state, action) => {
      state.getAgentsByLocation.request.isLoading = false;
      state.getAgentsByLocation.response.status = action.payload.status;
      state.getAgentsByLocation.data = action.payload.data;
    },
    [getAgentsByLocation.rejected]: (state, action) => {
      state.getAgentsByLocation.request.isLoading = false;
      state.getAgentsByLocation.response.status = action.payload.status;
      state.getAgentsByLocation.response.error = action.payload.data;
    },

    //============================================================================
    /**
     * Get public agent detail
     */
    //============================================================================
    [getPublicAgentDetail.pending]: (state) => {
      state.publicAgentDetail.request.isLoading = true;
    },
    [getPublicAgentDetail.fulfilled]: (state, action) => {
      state.publicAgentDetail.request.isLoading = false;
      state.publicAgentDetail.response.status = action.payload.status;
      state.publicAgentDetail.data = action.payload.data;
    },
    [getPublicAgentDetail.rejected]: (state, action) => {
      state.publicAgentDetail.request.isLoading = false;
      state.publicAgentDetail.response.status = action.payload.status;
      state.publicAgentDetail.response.error = action.payload.data;
    },
  },
});

export const { setAgentData, setAgentAddress, setAgentLogo } =
  agentSlice.actions;

export default agentSlice.reducer;
