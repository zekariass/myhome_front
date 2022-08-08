// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import myHomeBackendAPI from "components/commons/apis/myHomeBackendAPI";
import { getFormatedResponse } from "features/getFormatedResponse";
import { getPropertiesByAgent } from "../agent_dashboard/property/propertySlice";

const initialAddressState = {
  country: {
    isLoading: false,
    countryList: [],
  },
  region: {
    isLoading: false,
    regionList: [],
  },
  city: {
    isLoading: false,
    cityList: [],
    popularCityList: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },
  },
  updateAddress: {
    request: { isLoading: false },
    response: { error: null, status: null, data: {} },
  },
  getRegionsByCountryName: {
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

export const getCountries = createAsyncThunk(
  "address/getCountries",
  async () => {
    const result = {};
    try {
      const resp = await myHomeBackendAPI.get("/common/country/list/");
      // console.log(resp.data);
      result.data = resp.data;
      result.status = resp.status;
    } catch (error) {
      result.data = error.data;
      result.status = error.status;
    } finally {
      return result;
    }
  }
);

/**
 * Get regions from backend given a country
 */
export const getRegionsByCountry = createAsyncThunk(
  "address/getRegionsByCountry",
  async (countryId) => {
    const result = {};
    try {
      const resp = await myHomeBackendAPI.get("/common/region/list/", {
        params: { countryId: countryId },
      });
      result.data = resp.data;
      result.status = resp.status;
    } catch (error) {
      result.data = error.data;
      result.status = error.status;
    } finally {
      return result;
    }
  }
);

/**
 * Get cities from backend given a region
 */
export const getCitiesByRegion = createAsyncThunk(
  "address/getCitiesByRegion",
  async (regionId) => {
    const result = {};
    try {
      const resp = await myHomeBackendAPI.get("/common/city/list/", {
        params: { regionId: regionId },
      });
      result.data = resp.data;
      result.status = resp.status;
    } catch (error) {
      result.data = error.data;
      result.status = error.status;
    } finally {
      return result;
    }
  }
);

/**
 * Get popular cities
 */
export const getPopularCities = createAsyncThunk(
  "address/getPopularCities",
  async () => {
    let result;
    try {
      result = await myHomeBackendAPI.get(`/common/popular/city/list/`);
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

/**
 * Update address
 */
export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async (addressData, thunkApi) => {
    let result;
    try {
      result = await myHomeBackendAPI.put(
        `/common/address/${addressData.id}/update/`,
        addressData
      );
      if (result.status === 200) {
        thunkApi.dispatch(
          getPropertiesByAgent(
            thunkApi.getState().agent.getAgent.response.data.id
          )
        );
      }
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const getRegionsByCountryName = createAsyncThunk(
  "address/getRegionsByCountryName",
  async (searchParam) => {
    let result;
    try {
      result = await myHomeBackendAPI.get(`/common/country/region/list/`, {
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

const addressSlice = createSlice({
  name: "address",
  initialState: initialAddressState,
  reducers: {
    createCountry: (state) => {},
    clearCityList: (state) => {
      state.city.cityList = [];
    },
  },
  extraReducers: {
    /**
     * Get all countries
     */
    [getCountries.pending]: (state, action) => {
      state.country.isLoading = true;
    },
    [getCountries.fulfilled]: (state, action) => {
      state.country.isLoading = false;
      if (action.payload.status === 200) {
        state.country.countryList = action.payload.data;
        state.country.regionList = [];
        state.country.cityList = [];
      }
    },
    [getCountries.rejected]: (state, action) => {
      console.log("Rejected!");
    },
    /**
     * Get Regions available in a specific country
     */
    [getRegionsByCountry.pending]: (state, action) => {
      state.region.isLoading = true;
    },
    [getRegionsByCountry.fulfilled]: (state, action) => {
      state.region.isLoading = false;
      if (action.payload.status === 200) {
        state.region.regionList = action.payload.data;
        state.city.cityList = [];
      }
    },
    [getRegionsByCountry.rejected]: (state, action) => {
      console.log("Rejected!");
    },

    /**
     * Get Cities available in a specific Region
     */
    [getCitiesByRegion.pending]: (state, action) => {
      state.city.isLoading = true;
    },
    [getCitiesByRegion.fulfilled]: (state, action) => {
      state.city.isLoading = false;
      if (action.payload.status === 200) {
        state.city.cityList = action.payload.data;
      }
    },
    [getCitiesByRegion.rejected]: (state, action) => {
      console.log("Rejected!");
    },
    /**
     * Update address
     */
    [updateAddress.pending]: (state) => {
      state.updateAddress.request.isLoading = true;
    },
    [updateAddress.fulfilled]: (state, action) => {
      state.updateAddress.request.isLoading = false;
      state.updateAddress.response.data = action.payload.data;
      state.updateAddress.response.status = action.payload.status;
    },
    [updateAddress.rejected]: (state, action) => {
      state.updateAddress.request.isLoading = false;
      state.updateAddress.response.error = action.payload.data;
      state.updateAddress.response.status = action.payload.status;
    },

    /**
     * Regions list by country name
     * @param {StateObject} state
     */
    [getRegionsByCountryName.pending]: (state) => {
      state.getRegionsByCountryName.request.isLoading = true;
    },
    [getRegionsByCountryName.fulfilled]: (state, action) => {
      state.getRegionsByCountryName.request.isLoading = false;
      state.getRegionsByCountryName.data = action.payload.data;
      state.getRegionsByCountryName.response.status = action.payload.status;
    },
    [getRegionsByCountryName.rejected]: (state, action) => {
      state.getRegionsByCountryName.request.isLoading = false;
      state.getRegionsByCountryName.response.error = action.payload.data;
      state.getRegionsByCountryName.response.status = action.payload.status;
    },
    /**
     * Get popular cities
     */
    [getPopularCities.pending]: (state) => {
      state.city.popularCityList.request.isLoading = true;
    },
    [getPopularCities.fulfilled]: (state, action) => {
      state.city.popularCityList.request.isLoading = false;
      state.city.popularCityList.data = action.payload.data;
      state.city.popularCityList.response.status = action.payload.status;
    },
    [getPopularCities.rejected]: (state, action) => {
      state.city.popularCityList.request.isLoading = false;
      state.city.popularCityList.response.error = action.payload.data;
      state.city.popularCityList.response.status = action.payload.status;
    },
  },
});

export const { createCountry, clearCityList } = addressSlice.actions;

export default addressSlice.reducer;
