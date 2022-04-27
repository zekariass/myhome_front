// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import myHomeBackendAPI from "components/commons/apis/myHomeBackendAPI";

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
  async (cityId) => {
    const result = {};
    try {
      const resp = await myHomeBackendAPI.get("/common/city/list/", {
        params: { cityId: cityId },
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

const addressSlice = createSlice({
  name: "address",
  initialState: initialAddressState,
  reducers: {
    createCountry: (state) => {},
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
  },
});

export const { createCountry } = addressSlice.actions;

export default addressSlice.reducer;
