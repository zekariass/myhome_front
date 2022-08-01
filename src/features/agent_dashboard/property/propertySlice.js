// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import myHomeBackendAPI from "components/commons/apis/myHomeBackendAPI";
import {
  ALL_PURPOSE_PROPERTY_KEY,
  APARTMENT_KEY,
  COMMERCIAL_PROPERTY_KEY,
} from "components/commons/Strings";
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
  getPropertyUnitDetail: {
    request: {
      isLoading: false,
    },
    response: {
      error: null,
      status: null,
    },
    data: {},
  },
  //============EDUCATION FACILITY=====================================
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
    searchEdufa: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },
    deleteEdufaLink: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },
    data: [],
  },
  //============= TRANSPORT FACILITY ======================================
  tranfaCategory: {
    getTranfaCategories: {
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
  tranfa: {
    createTranfa: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
        data: {},
      },
    },
    searchTranfa: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },
    deleteTranfaLink: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },
    data: [],
  },
  //============= POINT OF INTEREST ======================================
  poiCategory: {
    getPoiCategories: {
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
  poi: {
    createPoi: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
        data: {},
      },
    },
    searchPoi: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },
    deletePoiLink: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },
    data: [],
  },
  //============= AMENITY ======================================
  amenity: {
    createPropertyAmenity: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },
    deleteAmenityLink: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },
    deleteAmnityLink: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },
    data: [],
  },
  //============= Property Rule ======================================
  rule: {
    createRule: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: {},
    },
    editRule: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: {},
    },
    deleteRule: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: {},
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
  async ({ newPropertyData, navigate, redirectPath }) => {
    let result;
    try {
      result = await myHomeBackendAPI.patch(
        `/property/${newPropertyData.id}/update/`,
        newPropertyData
      );
      if (result.status === 200) {
        navigate(-1, {
          replace: true,
          // state: { propertyId: edufaData.property },
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

export const getPropertyUnitDetail = createAsyncThunk(
  "property/getPropertyUnitDetail",
  async ({ unitId, catKey }) => {
    let unitName;
    switch (catKey) {
      case APARTMENT_KEY:
        unitName = "apartmentunit";
        break;
      case COMMERCIAL_PROPERTY_KEY:
        unitName = "commercialpropertyunit";
        break;
      case ALL_PURPOSE_PROPERTY_KEY:
        unitName = "allpurposepropertyunit";
        break;
    }
    let result;
    try {
      result = await myHomeBackendAPI.get(
        `/property/${unitName}/${unitId}/detail/public/`
      );
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

//====================================================================================
//========EDUCATION FACILITY==========================================================
export const createEdufa = createAsyncThunk(
  "property/createEdufa",
  async ({ edufaData, navigate, redirectPath }) => {
    let result;
    try {
      result = await myHomeBackendAPI.post(
        `/property/${edufaData.property}/edufa/create/`,
        edufaData
      );
      if (result.status === 201) {
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

export const createEdufaFromSearch = createAsyncThunk(
  "property/createEdufaFromSearch",
  async ({ edufaData, navigate, redirectPath }) => {
    let result;
    try {
      result = await myHomeBackendAPI.post(
        `/property/${edufaData.property}/edufa/create-from-search/`,
        edufaData
      );
      if (result.status === 201) {
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

export const searchEdufa = createAsyncThunk(
  "property/searchEdufa",
  async (searchParam) => {
    let result;
    try {
      result = await myHomeBackendAPI.get(`/property/edufa/search/`, {
        params: searchParam,
      });
      // console.log("LABELS: ", result.data);
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const deleteEdufaLink = createAsyncThunk(
  "property/deleteEdufaLink",
  async (deleteData, thunkApi) => {
    let result;
    try {
      result = await myHomeBackendAPI.delete(
        `/property/edufa/${deleteData.edufa}/delete/`,
        { params: deleteData }
      );
      if (result.status === 204) {
        thunkApi.dispatch(getPropertyDetail(deleteData.property));
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

//====================================================================================
//========TRANSPORT FACILITY==========================================================
export const createTranfa = createAsyncThunk(
  "property/createTranfa",
  async ({ tranfaData, navigate, redirectPath }) => {
    let result;
    try {
      result = await myHomeBackendAPI.post(
        `/property/${tranfaData.property}/tranfa/create/`,
        tranfaData
      );
      if ((result.status = 201)) {
        navigate(redirectPath, {
          replace: true,
          state: { propertyId: tranfaData.property },
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

export const createTranfaFromSearch = createAsyncThunk(
  "property/createTranfaFromSearch",
  async ({ tranfaData, navigate, redirectPath }) => {
    let result;
    try {
      result = await myHomeBackendAPI.post(
        `/property/${tranfaData.property}/tranfa/create-from-search/`,
        tranfaData
      );
      if ((result.status = 201)) {
        navigate(redirectPath, {
          replace: true,
          state: { propertyId: tranfaData.property },
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

export const getTranfaCategories = createAsyncThunk(
  "property/getTranfaCategories",
  async () => {
    let result;
    try {
      result = await myHomeBackendAPI.get(`/property/tranfacategory/list/`);
      // console.log("LABELS: ", result.data);
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const searchTranfa = createAsyncThunk(
  "property/searchTranfa",
  async (searchParam) => {
    let result;
    try {
      result = await myHomeBackendAPI.get(`/property/tranfa/search/`, {
        params: searchParam,
      });
      // console.log("LABELS: ", result.data);
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const deleteTranfaLink = createAsyncThunk(
  "property/deleteTranfaLink",
  async (deleteData, thunkApi) => {
    let result;
    try {
      result = await myHomeBackendAPI.delete(
        `/property/tranfa/${deleteData.tranfa}/delete/`,
        { params: deleteData }
      );
      if (result.status === 204) {
        thunkApi.dispatch(getPropertyDetail(deleteData.property));
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

//====================================================================================
//========POINT OF INTEREST===========================================================
export const createPoi = createAsyncThunk(
  "property/createPoi",
  async ({ poiData, navigate, redirectPath }) => {
    let result;
    try {
      result = await myHomeBackendAPI.post(
        `/property/${poiData.property}/poi/create/`,
        poiData
      );
      if ((result.status = 201)) {
        navigate(redirectPath, {
          replace: true,
          state: { propertyId: poiData.property },
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

export const createPoiFromSearch = createAsyncThunk(
  "property/createPoiFromSearch",
  async ({ poiData, navigate, redirectPath }) => {
    let result;
    try {
      result = await myHomeBackendAPI.post(
        `/property/${poiData.property}/poi/create-from-search/`,
        poiData
      );
      if ((result.status = 201)) {
        navigate(redirectPath, {
          replace: true,
          state: { propertyId: poiData.property },
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

export const getPoiCategories = createAsyncThunk(
  "property/getPoiCategories",
  async () => {
    let result;
    try {
      result = await myHomeBackendAPI.get(`/property/poicategory/list/`);
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const searchPoi = createAsyncThunk(
  "property/searchPoi",
  async (searchParam) => {
    let result;
    try {
      result = await myHomeBackendAPI.get(`/property/poi/search/`, {
        params: searchParam,
      });
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const deletePoiLink = createAsyncThunk(
  "property/deletePoiLink",
  async (deleteData, thunkApi) => {
    let result;
    try {
      result = await myHomeBackendAPI.delete(
        `/property/poi/${deleteData.poi}/delete/`,
        { params: deleteData }
      );
      if (result.status === 204) {
        thunkApi.dispatch(getPropertyDetail(deleteData.property));
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

//====================================================================================
//========AMENITY=====================================================================
export const createPropertyAmenity = createAsyncThunk(
  "property/createPropertyAmenity",
  async ({ amenityData, navigate, redirectPath }) => {
    let result;
    try {
      result = await myHomeBackendAPI.post(
        `/property/${amenityData.property}/amenity/create/`,
        amenityData
      );
      if ((result.status = 201)) {
        navigate(redirectPath, {
          replace: true,
          state: { propertyId: amenityData.property },
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

export const deleteAmnityLink = createAsyncThunk(
  "property/deleteAmnityLink",
  async (deleteData, thunkApi) => {
    let result;
    try {
      result = await myHomeBackendAPI.delete(
        `/property/amenity/${deleteData.amenity}/delete/`,
        { params: deleteData }
      );
      if (result.status === 204) {
        thunkApi.dispatch(getPropertyDetail(deleteData.property));
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

//====================================================================================
//======== PROPERTY RULE =============================================================
export const createRule = createAsyncThunk(
  "property/createRule",
  async ({ ruleData, navigate, redirectPath }) => {
    let result;
    try {
      result = await myHomeBackendAPI.post(
        `/property/${ruleData.property}/rule/create/`,
        ruleData
      );
      if ((result.status = 201)) {
        navigate(redirectPath, {
          replace: true,
          state: { propertyId: ruleData.property },
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

export const editRule = createAsyncThunk(
  "property/editRule",
  async ({ ruleData, navigate, redirectPath }) => {
    let result;
    try {
      result = await myHomeBackendAPI.patch(
        `/property/rule/${ruleData.rule.id}/update/`,
        ruleData.rule
      );
      if ((result.status = 200)) {
        navigate(redirectPath, {
          replace: true,
          state: { propertyId: ruleData.property },
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

export const deleteRule = createAsyncThunk(
  "property/deleteRule",
  async ({ rule, property }, thunkApi) => {
    let result;
    try {
      result = await myHomeBackendAPI.delete(`/property/rule/${rule}/delete/`);
      if (result.status === 204) {
        thunkApi.dispatch(getPropertyDetail(property));
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

//=========PROPERTY SLICE===========================================================

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
     * Get property unit detail from backend
     * @param {StateObject} state
     */
    [getPropertyUnitDetail.pending]: (state) => {
      state.getPropertyUnitDetail.request.isLoading = true;
    },
    [getPropertyUnitDetail.fulfilled]: (state, action) => {
      state.getPropertyUnitDetail.request.isLoading = false;
      state.getPropertyUnitDetail.data = action.payload.data;
      state.getPropertyUnitDetail.response.status = action.payload.status;
    },
    [getPropertyUnitDetail.rejected]: (state, action) => {
      state.getPropertyUnitDetail.request.isLoading = false;
      state.getPropertyUnitDetail.response.error = action.payload.data;
      state.getPropertyUnitDetail.response.status = action.payload.status;
      state.getPropertyUnitDetail.data = [];
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

    //=======================================================================================
    //======EDUCATION FACILITY===============================================================
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
    /**
     * Create education facility from search
     * @param {StateObject} state
     */
    [createEdufaFromSearch.pending]: (state) => {
      state.edufa.createEdufa.request.isLoading = true;
    },
    [createEdufaFromSearch.fulfilled]: (state, action) => {
      state.edufa.createEdufa.request.isLoading = false;
      state.edufa.createEdufa.data = action.payload.data;
      state.edufa.createEdufa.response.status = action.payload.status;
    },
    [createEdufaFromSearch.rejected]: (state, action) => {
      state.edufa.createEdufa.request.isLoading = false;
      state.edufa.createEdufa.response.error = action.payload.data;
      state.edufa.createEdufa.response.status = action.payload.status;
    },
    /**
     * Search education facility
     * @param {StateObject} state
     */
    [searchEdufa.pending]: (state) => {
      state.edufa.searchEdufa.request.isLoading = true;
    },
    [searchEdufa.fulfilled]: (state, action) => {
      state.edufa.searchEdufa.request.isLoading = false;
      state.edufa.searchEdufa.data = action.payload.data;
      state.edufa.searchEdufa.response.status = action.payload.status;
    },
    [searchEdufa.rejected]: (state, action) => {
      state.edufa.searchEdufa.request.isLoading = false;
      state.edufa.searchEdufa.response.error = action.payload.data;
      state.edufa.searchEdufa.response.status = action.payload.status;
    },
    /**
     * Delete education facility Link
     * @param {StateObject} state
     */
    [deleteEdufaLink.pending]: (state) => {
      state.edufa.deleteEdufaLink.request.isLoading = true;
    },
    [deleteEdufaLink.fulfilled]: (state, action) => {
      state.edufa.deleteEdufaLink.request.isLoading = false;
      state.edufa.deleteEdufaLink.data = action.payload.data;
      state.edufa.deleteEdufaLink.response.status = action.payload.status;
    },
    [deleteEdufaLink.rejected]: (state, action) => {
      state.edufa.deleteEdufaLink.request.isLoading = false;
      state.edufa.deleteEdufaLink.response.error = action.payload.data;
      state.edufa.deleteEdufaLink.response.status = action.payload.status;
    },
    //=======================================================================================
    //======TRANSPORT FACILITY===============================================================
    /**
     * Get transport facility categories
     * @param {StateObject} state
     */
    [getTranfaCategories.pending]: (state) => {
      state.tranfaCategory.getTranfaCategories.request.isLoading = true;
    },
    [getTranfaCategories.fulfilled]: (state, action) => {
      state.tranfaCategory.getTranfaCategories.request.isLoading = false;
      state.tranfaCategory.data = action.payload.data;
      state.tranfaCategory.getTranfaCategories.response.status =
        action.payload.status;
    },
    [getTranfaCategories.rejected]: (state, action) => {
      state.tranfaCategory.getTranfaCategories.request.isLoading = false;
      state.tranfaCategory.getTranfaCategories.response.error =
        action.payload.data;
      state.tranfaCategory.getTranfaCategories.response.status =
        action.payload.status;
    },

    /**
     * Create transport facility
     * @param {StateObject} state
     */
    [createTranfa.pending]: (state) => {
      state.tranfa.createTranfa.request.isLoading = true;
    },
    [createTranfa.fulfilled]: (state, action) => {
      state.tranfa.createTranfa.request.isLoading = false;
      state.tranfa.createTranfa.data = action.payload.data;
      state.tranfa.createTranfa.response.status = action.payload.status;
    },
    [createTranfa.rejected]: (state, action) => {
      state.tranfa.createTranfa.request.isLoading = false;
      state.tranfa.createTranfa.response.error = action.payload.data;
      state.tranfa.createTranfa.response.status = action.payload.status;
    },
    /**
     * Create transport facility from search
     * @param {StateObject} state
     */
    [createTranfaFromSearch.pending]: (state) => {
      state.tranfa.createTranfa.request.isLoading = true;
    },
    [createTranfaFromSearch.fulfilled]: (state, action) => {
      state.tranfa.createTranfa.request.isLoading = false;
      state.tranfa.createTranfa.data = action.payload.data;
      state.tranfa.createTranfa.response.status = action.payload.status;
    },
    [createTranfaFromSearch.rejected]: (state, action) => {
      state.tranfa.createTranfa.request.isLoading = false;
      state.tranfa.createTranfa.response.error = action.payload.data;
      state.tranfa.createTranfa.response.status = action.payload.status;
    },
    /**
     * Search transport facility
     * @param {StateObject} state
     */
    [searchTranfa.pending]: (state) => {
      state.tranfa.searchTranfa.request.isLoading = true;
    },
    [searchTranfa.fulfilled]: (state, action) => {
      state.tranfa.searchTranfa.request.isLoading = false;
      if (action.payload.status === 200) {
        state.tranfa.searchTranfa.data = action.payload.data;
      }
      state.tranfa.searchTranfa.response.status = action.payload.status;
    },
    [searchTranfa.rejected]: (state, action) => {
      state.tranfa.searchTranfa.request.isLoading = false;
      state.tranfa.searchTranfa.response.error = action.payload.data;
      state.tranfa.searchTranfa.response.status = action.payload.status;
    },
    /**
     * Delete transport facility Link
     * @param {StateObject} state
     */
    [deleteTranfaLink.pending]: (state) => {
      state.tranfa.deleteTranfaLink.request.isLoading = true;
    },
    [deleteTranfaLink.fulfilled]: (state, action) => {
      state.tranfa.deleteTranfaLink.request.isLoading = false;
      state.tranfa.deleteTranfaLink.data = action.payload.data;
      state.tranfa.deleteTranfaLink.response.status = action.payload.status;
    },
    [deleteTranfaLink.rejected]: (state, action) => {
      state.tranfa.deleteTranfaLink.request.isLoading = false;
      state.tranfa.deleteTranfaLink.response.error = action.payload.data;
      state.tranfa.deleteTranfaLink.response.status = action.payload.status;
    },
    //=======================================================================================
    //======POINT OF INTEREST================================================================
    /**
     * Get point of interest categories
     * @param {StateObject} state
     */
    [getPoiCategories.pending]: (state) => {
      state.poiCategory.getPoiCategories.request.isLoading = true;
    },
    [getPoiCategories.fulfilled]: (state, action) => {
      state.poiCategory.getPoiCategories.request.isLoading = false;
      state.poiCategory.data = action.payload.data;
      state.poiCategory.getPoiCategories.response.status =
        action.payload.status;
    },
    [getPoiCategories.rejected]: (state, action) => {
      state.poiCategory.getPoiCategories.request.isLoading = false;
      state.poiCategory.getPoiCategories.response.error = action.payload.data;
      state.poiCategory.getPoiCategories.response.status =
        action.payload.status;
    },

    /**
     * Create point of interest
     * @param {StateObject} state
     */
    [createPoi.pending]: (state) => {
      state.poi.createPoi.request.isLoading = true;
    },
    [createPoi.fulfilled]: (state, action) => {
      state.poi.createPoi.request.isLoading = false;
      state.poi.createPoi.data = action.payload.data;
      state.poi.createPoi.response.status = action.payload.status;
    },
    [createPoi.rejected]: (state, action) => {
      state.poi.createPoi.request.isLoading = false;
      state.poi.createPoi.response.error = action.payload.data;
      state.poi.createPoi.response.status = action.payload.status;
    },
    /**
     * Create point of interest from search
     * @param {StateObject} state
     */
    [createPoiFromSearch.pending]: (state) => {
      state.poi.createPoi.request.isLoading = true;
    },
    [createPoiFromSearch.fulfilled]: (state, action) => {
      state.poi.createPoi.request.isLoading = false;
      state.poi.createPoi.data = action.payload.data;
      state.poi.createPoi.response.status = action.payload.status;
    },
    [createPoiFromSearch.rejected]: (state, action) => {
      state.poi.createPoi.request.isLoading = false;
      state.poi.createPoi.response.error = action.payload.data;
      state.poi.createPoi.response.status = action.payload.status;
    },
    /**
     * Search point of interest
     * @param {StateObject} state
     */
    [searchPoi.pending]: (state) => {
      state.poi.searchPoi.request.isLoading = true;
    },
    [searchPoi.fulfilled]: (state, action) => {
      state.poi.searchPoi.request.isLoading = false;
      if (action.payload.status === 200) {
        state.poi.searchPoi.data = action.payload.data;
      }
      state.poi.searchPoi.response.status = action.payload.status;
    },
    [searchPoi.rejected]: (state, action) => {
      state.poi.searchPoi.request.isLoading = false;
      state.poi.searchPoi.response.error = action.payload.data;
      state.poi.searchPoi.response.status = action.payload.status;
    },
    /**
     * Delete point of interest Link
     * @param {StateObject} state
     */
    [deletePoiLink.pending]: (state) => {
      state.poi.deletePoiLink.request.isLoading = true;
    },
    [deletePoiLink.fulfilled]: (state, action) => {
      state.poi.deletePoiLink.request.isLoading = false;
      state.poi.deletePoiLink.data = action.payload.data;
      state.poi.deletePoiLink.response.status = action.payload.status;
    },
    [deletePoiLink.rejected]: (state, action) => {
      state.poi.deletePoiLink.request.isLoading = false;
      state.poi.deletePoiLink.response.error = action.payload.data;
      state.poi.deletePoiLink.response.status = action.payload.status;
    },
    //=======================================================================================
    //======AMENITY==========================================================================
    /**
     * Create amenity for a property
     * @param {StateObject} state
     */
    [createPropertyAmenity.pending]: (state) => {
      state.amenity.createPropertyAmenity.request.isLoading = true;
    },
    [createPropertyAmenity.fulfilled]: (state, action) => {
      state.amenity.createPropertyAmenity.request.isLoading = false;
      state.amenity.createPropertyAmenity.data = action.payload.data;
      state.amenity.createPropertyAmenity.response.status =
        action.payload.status;
    },
    [createPropertyAmenity.rejected]: (state, action) => {
      state.amenity.createPropertyAmenity.request.isLoading = false;
      state.amenity.createPropertyAmenity.response.error = action.payload.data;
      state.amenity.createPropertyAmenity.response.status =
        action.payload.status;
    },

    /**
     * Delete Amenity Link
     * @param {StateObject} state
     */
    [deleteAmnityLink.pending]: (state) => {
      state.amenity.deleteAmnityLink.request.isLoading = true;
    },
    [deleteAmnityLink.fulfilled]: (state, action) => {
      state.amenity.deleteAmnityLink.request.isLoading = false;
      state.amenity.deleteAmnityLink.data = action.payload.data;
      state.amenity.deleteAmnityLink.response.status = action.payload.status;
    },
    [deleteAmnityLink.rejected]: (state, action) => {
      state.amenity.deleteAmnityLink.request.isLoading = false;
      state.amenity.deleteAmnityLink.response.error = action.payload.data;
      state.amenity.deleteAmnityLink.response.status = action.payload.status;
    },
    //=======================================================================================
    //====== Rule ===========================================================================
    /**
     * Create Rule for a property
     * @param {StateObject} state
     */
    [createRule.pending]: (state) => {
      state.rule.createRule.request.isLoading = true;
    },
    [createRule.fulfilled]: (state, action) => {
      state.rule.createRule.request.isLoading = false;
      state.rule.createRule.data = action.payload.data;
      state.rule.createRule.response.status = action.payload.status;
    },
    [createRule.rejected]: (state, action) => {
      state.rule.createRule.request.isLoading = false;
      state.rule.createRule.response.error = action.payload.data;
      state.rule.createRule.response.status = action.payload.status;
    },

    /**
     * Edit Rule of property
     * @param {StateObject} state
     */
    [editRule.pending]: (state) => {
      state.rule.editRule.request.isLoading = true;
    },
    [editRule.fulfilled]: (state, action) => {
      state.rule.editRule.request.isLoading = false;
      state.rule.editRule.data = action.payload.data;
      state.rule.editRule.response.status = action.payload.status;
    },
    [editRule.rejected]: (state, action) => {
      state.rule.editRule.request.isLoading = false;
      state.rule.editRule.response.error = action.payload.data;
      state.rule.editRule.response.status = action.payload.status;
    },

    /**
     * Delete rule of a property
     * @param {StateObject} state
     */
    [deleteRule.pending]: (state) => {
      state.rule.deleteRule.request.isLoading = true;
    },
    [deleteRule.fulfilled]: (state, action) => {
      state.rule.deleteRule.request.isLoading = false;
      state.rule.deleteRule.data = action.payload.data;
      state.rule.deleteRule.response.status = action.payload.status;
    },
    [deleteRule.rejected]: (state, action) => {
      state.rule.deleteRule.request.isLoading = false;
      state.rule.deleteRule.response.error = action.payload.data;
      state.rule.deleteRule.response.status = action.payload.status;
    },
  },
});

export const { setFormInitialValue, setPropertyDataForDetail } =
  propertySlice.actions;

export default propertySlice.reducer;
