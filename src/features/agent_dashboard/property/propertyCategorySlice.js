// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import myHomeBackendAPI from "components/commons/apis/myHomeBackendAPI";
import { getFormatedResponse } from "features/getFormatedResponse";

const initialPropertyCategoryState = {
  propertyCategoryList: {
    request: {
      isLoading: false,
    },
    response: {
      data: [],
      error: null,
      status: null,
    },
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

  // ===========APARTMENT==========================================
  apartment: {
    apartmentList: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },
    updateApartment: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },
    deleteApartment: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },
    getApartmentDetail: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },

    //=========APARTMENT UNIT=============
    unit: {
      apartmentUnitList: {
        request: {
          isLoading: false,
        },
        response: {
          error: null,
          status: null,
        },
        data: [],
      },
      updateApartmentUnit: {
        request: {
          isLoading: false,
        },
        response: {
          error: null,
          status: null,
        },
        data: [],
      },
      createApartmentUnit: {
        request: {
          isLoading: false,
        },
        response: {
          error: null,
          status: null,
        },
        data: [],
      },

      deleteApartmentUnit: {
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
  },
  //========= VILLA =============
  villa: {
    villaList: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },
    updateVilla: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },

    deleteVilla: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },
    getVillaDetail: {
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

  //========= CONDOMINIUM =============
  condominium: {
    condominiumList: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },
    updateCondominium: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },

    deleteCondominium: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },
    getCondominiumDetail: {
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

  //========= TRADITIONAL HOUSE =============
  traditionalHouse: {
    traditionalHouseList: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },
    updateTraditionalHouse: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },

    deleteTraditionalHouse: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },
    getTraditionalHouseDetail: {
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

  //============ COMMERCIAL PROPERTY ======================================
  commercialProperty: {
    commercialPropertyList: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },
    updateCommercialProperty: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },
    deleteCommercialProperty: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },
    getCommercialPropertyDetail: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },

    //=========COMMERCIAL PROPERTY UNIT=============
    unit: {
      commercialPropertyUnitList: {
        request: {
          isLoading: false,
        },
        response: {
          error: null,
          status: null,
        },
        data: [],
      },
      updateCommercialPropertyUnit: {
        request: {
          isLoading: false,
        },
        response: {
          error: null,
          status: null,
        },
        data: [],
      },
      createCommercialPropertyUnit: {
        request: {
          isLoading: false,
        },
        response: {
          error: null,
          status: null,
        },
        data: [],
      },

      deleteCommercialPropertyUnit: {
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
  },

  //========= SHARE HOUSE =============
  shareHouse: {
    shareHouseList: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },
    updateShareHouse: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },

    deleteShareHouse: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },
    getShareHouseDetail: {
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

  //========= Office =============
  office: {
    officeList: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },
    updateOffice: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },

    deleteOffice: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },
    getOfficeDetail: {
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

  //========= LAND =============
  land: {
    landList: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },
    updateLand: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },

    deleteLand: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },
    getLandDetail: {
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

  //========= HALL =============
  hall: {
    hallList: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },
    updateHall: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },

    deleteHall: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },
    getHallDetail: {
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

  //============ ALL PURPOSE PROPERTY ======================================
  allPurposeProperty: {
    allPurposePropertyList: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },
    updateAllPurposeProperty: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },
    deleteAllPurposeProperty: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },
    getAllPurposePropertyDetail: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },

    //=========ALL PURPOSE PROPERTY UNIT=============
    unit: {
      allPurposePropertyUnitList: {
        request: {
          isLoading: false,
        },
        response: {
          error: null,
          status: null,
        },
        data: [],
      },
      updateAllPurposePropertyUnit: {
        request: {
          isLoading: false,
        },
        response: {
          error: null,
          status: null,
        },
        data: [],
      },
      createAllPurposePropertyUnit: {
        request: {
          isLoading: false,
        },
        response: {
          error: null,
          status: null,
        },
        data: [],
      },

      deleteAllPurposePropertyUnit: {
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
  },
  listing: {
    listingPriceByCategoryList: {
      request: {
        isLoading: false,
      },
      response: {
        error: null,
        status: null,
      },
      data: [],
    },
    listingDiscountByCategoryList: {
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
//=====================================================================================
//========== LAND =====================================================================
export const updateLand = createAsyncThunk(
  "propertyCategory/updateLand",
  async ({ updateData, navigate }) => {
    let result;
    try {
      result = await myHomeBackendAPI.patch(
        `/property/land/${updateData.id}/update/`,
        updateData
      );
      if ((result.status = 201)) {
        navigate(-1, {
          replace: true,
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

export const getLandByAgent = createAsyncThunk(
  "propertyCategory/getLandByAgent",
  async () => {
    let result;
    try {
      result = await myHomeBackendAPI.get(`/property/land/list-by-agent/`);
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const deleteLand = createAsyncThunk(
  "propertyCategory/deleteLand",
  async (landId, thunkApi) => {
    let result;
    try {
      result = await myHomeBackendAPI.delete(
        `/property/land/${landId}/delete/`
      );

      if (result.status === 204) {
        thunkApi.dispatch(getLandByAgent());
      }
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const getLandDetail = createAsyncThunk(
  "propertyCategory/getLandDetail",
  async (landId) => {
    let result;
    try {
      result = await myHomeBackendAPI.get(`/property/land/${landId}/detail/`);
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

//=====================================================================================
//========== HALL =====================================================================
export const updateHall = createAsyncThunk(
  "propertyCategory/updateHall",
  async ({ updateData, navigate }) => {
    let result;
    try {
      result = await myHomeBackendAPI.patch(
        `/property/hall/${updateData.id}/update/`,
        updateData
      );
      if ((result.status = 201)) {
        navigate(-1, {
          replace: true,
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

export const getHallByAgent = createAsyncThunk(
  "propertyCategory/getHallByAgent",
  async () => {
    let result;
    try {
      result = await myHomeBackendAPI.get(`/property/hall/list-by-agent/`);
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const deleteHall = createAsyncThunk(
  "propertyCategory/deleteHall",
  async (hallId, thunkApi) => {
    let result;
    try {
      result = await myHomeBackendAPI.delete(
        `/property/hall/${hallId}/delete/`
      );

      if (result.status === 204) {
        thunkApi.dispatch(getHallByAgent());
      }
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const getHallDetail = createAsyncThunk(
  "propertyCategory/getHallDetail",
  async (hallId) => {
    let result;
    try {
      result = await myHomeBackendAPI.get(`/property/hall/${hallId}/detail/`);
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);
//=====================================================================================
//==========SHARE HOUSE================================================================

export const updateShareHouse = createAsyncThunk(
  "propertyCategory/updateShareHouse",
  async ({ updateData, navigate }) => {
    let result;
    try {
      result = await myHomeBackendAPI.patch(
        `/property/sharehouse/${updateData.id}/update/`,
        updateData
      );
      if ((result.status = 200)) {
        navigate(-1, {
          replace: true,
          // state: { propertyId: updateData.property },
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

export const getSharehouseByAgent = createAsyncThunk(
  "propertyCategory/getSharehouseByAgent",
  async () => {
    let result;
    try {
      result = await myHomeBackendAPI.get(
        `/property/sharehouse/list-by-agent/`
      );
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const deleteShareHouse = createAsyncThunk(
  "propertyCategory/deleteShareHouse",
  async (shareHouseId, thunkApi) => {
    let result;
    try {
      result = await myHomeBackendAPI.delete(
        `/property/sharehouse/${shareHouseId}/delete/`
      );

      if (result.status === 204) {
        thunkApi.dispatch(getSharehouseByAgent());
      }
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const getShareHouseDetail = createAsyncThunk(
  "propertyCategory/getShareHouseDetail",
  async (shareHouseId) => {
    let result;
    try {
      result = await myHomeBackendAPI.get(
        `/property/sharehouse/${shareHouseId}/detail/`
      );
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

//=====================================================================================
//==========APARTMENT==================================================================

export const getApartmentsByAgent = createAsyncThunk(
  "propertyCategory/getApartmentsByAgent",
  async () => {
    let result;
    try {
      result = await myHomeBackendAPI.get(`/property/apartment/list-by-agent/`);
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const updateApartment = createAsyncThunk(
  "propertyCategory/updateApartment",
  async ({ updateData, navigate }) => {
    let result;
    try {
      result = await myHomeBackendAPI.patch(
        `/property/apartment/${updateData.id}/update/`,
        updateData
      );

      if (result.status === 200) {
        navigate(-1, {
          replace: true,
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

export const deleteApartment = createAsyncThunk(
  "propertyCategory/deleteApartment",
  async (apartmentId, thunkApi) => {
    let result;
    try {
      result = await myHomeBackendAPI.delete(
        `/property/apartment/${apartmentId}/delete/`
      );

      if (result.status === 204) {
        thunkApi.dispatch(getApartmentsByAgent());
      }
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const getApartmentDetail = createAsyncThunk(
  "propertyCategory/getApartmentDetail",
  async (apartmentId) => {
    let result;
    try {
      result = await myHomeBackendAPI.get(
        `/property/apartment/${apartmentId}/detail/`
      );

      // if (result.status === 200) {
      //   navigate(-1);
      // }
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const getApartmentUnitsByApartment = createAsyncThunk(
  "propertyCategory/getApartmentUnitsByApartment",
  async (apartmentId) => {
    let result;
    try {
      result = await myHomeBackendAPI.get(
        `/property/apartmentunit/list-by-apartment/`,
        { params: { apartment: apartmentId } }
      );
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const updateApartmentUnit = createAsyncThunk(
  "propertyCategory/updateApartmentUnit",
  async ({ updateData, navigate }) => {
    let result;
    try {
      result = await myHomeBackendAPI.patch(
        `/property/apartmentunit/${updateData.id}/update/`,
        updateData
      );
      if (result.status === 200) {
        navigate(-1);
      }
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const createApartmentUnit = createAsyncThunk(
  "propertyCategory/createApartmentUnit",
  async ({ createData, navigate }, _) => {
    let result;
    // console.log("createData: ", createData);
    try {
      result = await myHomeBackendAPI.post(
        "/property/apartmentunit/create/",
        createData
      );
      if (result.status === 201) {
        navigate(-1);
      }
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const deleteApartmentUnit = createAsyncThunk(
  "propertyCategory/deleteApartmentUnit",
  async ({ apartmentUnitId, apartmentId }, thunkApi) => {
    let result;
    // console.log("createData: ", createData);
    try {
      result = await myHomeBackendAPI.delete(
        `/property/apartmentunit/${apartmentUnitId}/delete/`
      );
      if (result.status === 204) {
        thunkApi.dispatch(getApartmentUnitsByApartment(apartmentId));
      }
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

//=====================================================================================
//==========VILLA======================================================================

export const getVillaByAgent = createAsyncThunk(
  "propertyCategory/getVillaByAgent",
  async () => {
    let result;
    try {
      result = await myHomeBackendAPI.get(`/property/villa/list-by-agent/`);
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const updateVilla = createAsyncThunk(
  "propertyCategory/updateVilla",
  async ({ updateData, navigate }) => {
    let result;
    try {
      result = await myHomeBackendAPI.patch(
        `/property/villa/${updateData.id}/update/`,
        updateData
      );

      if (result.status === 200) {
        navigate(-1, {
          replace: true,
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

export const deleteVilla = createAsyncThunk(
  "propertyCategory/deleteVilla",
  async (villaId, thunkApi) => {
    let result;
    try {
      result = await myHomeBackendAPI.delete(
        `/property/villa/${villaId}/delete/`
      );

      if (result.status === 204) {
        thunkApi.dispatch(getVillaByAgent());
      }
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const getVillaDetail = createAsyncThunk(
  "propertyCategory/getVillaDetail",
  async (villaId) => {
    // console.log("villaId: ", villaId);
    let result;
    try {
      result = await myHomeBackendAPI.get(`/property/villa/${villaId}/detail/`);
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

//=====================================================================================
//==========CONDOMINIUM================================================================

export const getCondominiumByAgent = createAsyncThunk(
  "propertyCategory/getCondominiumByAgent",
  async () => {
    let result;
    try {
      result = await myHomeBackendAPI.get(
        `/property/condominium/list-by-agent/`
      );
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const updateCondominium = createAsyncThunk(
  "propertyCategory/updateCondominium",
  async ({ updateData, navigate }) => {
    let result;
    try {
      result = await myHomeBackendAPI.patch(
        `/property/condominium/${updateData.id}/update/`,
        updateData
      );

      if (result.status === 200) {
        navigate(-1, {
          replace: true,
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

export const deleteCondominium = createAsyncThunk(
  "propertyCategory/deleteCondominium",
  async (condominiumId, thunkApi) => {
    let result;
    try {
      result = await myHomeBackendAPI.delete(
        `/property/condominium/${condominiumId}/delete/`
      );

      if (result.status === 204) {
        thunkApi.dispatch(getCondominiumByAgent());
      }
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const getCondominiumDetail = createAsyncThunk(
  "propertyCategory/getCondominiumDetail",
  async (condominiumId) => {
    let result;
    try {
      result = await myHomeBackendAPI.get(
        `/property/condominium/${condominiumId}/detail/`
      );
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

//=====================================================================================
//========== TRADITIONAL HOUSE ========================================================

export const getTraditionalHouseByAgent = createAsyncThunk(
  "propertyCategory/getTraditionalHouseByAgent",
  async () => {
    let result;
    try {
      result = await myHomeBackendAPI.get(
        `/property/traditionalhouse/list-by-agent/`
      );
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const updateTraditionalHouse = createAsyncThunk(
  "propertyCategory/updateTraditionalHouse",
  async ({ updateData, navigate }) => {
    let result;
    try {
      result = await myHomeBackendAPI.patch(
        `/property/traditionalhouse/${updateData.id}/update/`,
        updateData
      );

      if (result.status === 200) {
        navigate(-1, {
          replace: true,
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

export const deleteTraditionalHouse = createAsyncThunk(
  "propertyCategory/deleteTraditionalHouse",
  async (traditionalHouseId, thunkApi) => {
    let result;
    try {
      result = await myHomeBackendAPI.delete(
        `/property/traditionalhouse/${traditionalHouseId}/delete/`
      );

      if (result.status === 204) {
        thunkApi.dispatch(getTraditionalHouseByAgent());
      }
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const getTraditionalHouseDetail = createAsyncThunk(
  "propertyCategory/getTraditionalHouseDetail",
  async (traditionalHouseId) => {
    let result;
    try {
      result = await myHomeBackendAPI.get(
        `/property/traditionalhouse/${traditionalHouseId}/detail/`
      );
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

//=====================================================================================
//========== COMMERCIAL PROPERTY ======================================================

export const getCommercialPropertiesByAgent = createAsyncThunk(
  "propertyCategory/getCommercialPropertiesByAgent",
  async () => {
    let result;
    try {
      result = await myHomeBackendAPI.get(
        `/property/commercialproperty/list-by-agent/`
      );
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const updateCommercialProperty = createAsyncThunk(
  "propertyCategory/updateCommercialProperty",
  async ({ updateData, navigate }) => {
    let result;
    try {
      result = await myHomeBackendAPI.patch(
        `/property/commercialproperty/${updateData.id}/update/`,
        updateData
      );

      if (result.status === 200) {
        navigate(-1, {
          replace: true,
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

export const deleteCommercialProperty = createAsyncThunk(
  "propertyCategory/deleteCommercialProperty",
  async (commercialPropertyId, thunkApi) => {
    let result;
    try {
      result = await myHomeBackendAPI.delete(
        `/property/commercialproperty/${commercialPropertyId}/delete/`
      );

      if (result.status === 204) {
        thunkApi.dispatch(getCommercialPropertiesByAgent());
      }
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const getCommercialPropertyDetail = createAsyncThunk(
  "propertyCategory/getCommercialPropertyDetail",
  async (commercialPropertyId) => {
    let result;
    try {
      result = await myHomeBackendAPI.get(
        `/property/commercialproperty/${commercialPropertyId}/detail/`
      );
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const getCommercialPropertyUnitsByCommercialProperty = createAsyncThunk(
  "propertyCategory/getCommercialPropertyUnitsByCommercialProperty",
  async (commercialPropertyId) => {
    let result;
    try {
      result = await myHomeBackendAPI.get(
        `/property/commercialpropertyunit/list-by-commercialproperty/`,
        { params: { commercial_property: commercialPropertyId } }
      );
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const updateCommercialPropertyUnit = createAsyncThunk(
  "propertyCategory/updateCommercialPropertyUnit",
  async ({ updateData, navigate }) => {
    let result;
    try {
      result = await myHomeBackendAPI.patch(
        `/property/commercialpropertyunit/${updateData.id}/update/`,
        updateData
      );
      if (result.status === 200) {
        navigate(-1);
      }
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const createCommercialPropertyUnit = createAsyncThunk(
  "propertyCategory/createCommercialPropertyUnit",
  async ({ createData, navigate }, _) => {
    let result;
    try {
      result = await myHomeBackendAPI.post(
        "/property/commercialpropertyunit/create/",
        createData
      );
      if (result.status === 201) {
        navigate(-1);
      }
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const deleteCommercialPropertyUnit = createAsyncThunk(
  "propertyCategory/deleteCommercialPropertyUnit",
  async ({ commercialPropertyUnitId, commercialPropertyId }, thunkApi) => {
    let result;
    try {
      result = await myHomeBackendAPI.delete(
        `/property/commercialpropertyunit/${commercialPropertyUnitId}/delete/`
      );
      if (result.status === 204) {
        thunkApi.dispatch(
          getCommercialPropertyUnitsByCommercialProperty(commercialPropertyId)
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

//=====================================================================================
//==========OFFICE=====================================================================

export const updateOffice = createAsyncThunk(
  "propertyCategory/updateOffice",
  async ({ updateData, navigate }) => {
    let result;
    try {
      result = await myHomeBackendAPI.patch(
        `/property/office/${updateData.id}/update/`,
        updateData
      );
      if ((result.status = 200)) {
        navigate(-1, {
          replace: true,
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

export const getOfficeByAgent = createAsyncThunk(
  "propertyCategory/getOfficeByAgent",
  async () => {
    let result;
    try {
      result = await myHomeBackendAPI.get(`/property/office/list-by-agent/`);
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const deleteOffice = createAsyncThunk(
  "propertyCategory/deleteOffice",
  async (officeId, thunkApi) => {
    let result;
    try {
      result = await myHomeBackendAPI.delete(
        `/property/office/${officeId}/delete/`
      );

      if (result.status === 204) {
        thunkApi.dispatch(getOfficeByAgent());
      }
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const getOfficeDetail = createAsyncThunk(
  "propertyCategory/getOfficeDetail",
  async (officeId) => {
    let result;
    try {
      result = await myHomeBackendAPI.get(
        `/property/office/${officeId}/detail/`
      );
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

//=====================================================================================
//========== ALL PURPOSE PROPERTY ======================================================

export const getAllPurposePropertiesByAgent = createAsyncThunk(
  "propertyCategory/getAllPurposePropertiesByAgent",
  async () => {
    let result;
    try {
      result = await myHomeBackendAPI.get(
        `/property/allpurposeproperty/list-by-agent/`
      );
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const updateAllPurposeProperty = createAsyncThunk(
  "propertyCategory/updateAllPurposeProperty",
  async ({ updateData, navigate }) => {
    let result;
    try {
      result = await myHomeBackendAPI.patch(
        `/property/allpurposeproperty/${updateData.id}/update/`,
        updateData
      );

      if (result.status === 200) {
        navigate(-1, {
          replace: true,
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

export const deleteAllPurposeProperty = createAsyncThunk(
  "propertyCategory/deleteAllPurposeProperty",
  async (allPurposePropertyId, thunkApi) => {
    let result;
    try {
      result = await myHomeBackendAPI.delete(
        `/property/allpurposeproperty/${allPurposePropertyId}/delete/`
      );

      if (result.status === 204) {
        thunkApi.dispatch(getAllPurposePropertiesByAgent());
      }
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const getAllPurposePropertyDetail = createAsyncThunk(
  "propertyCategory/getAllPurposePropertyDetail",
  async (allPurposePropertyId) => {
    let result;
    try {
      result = await myHomeBackendAPI.get(
        `/property/allpurposeproperty/${allPurposePropertyId}/detail/`
      );
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const getAllPurposePropertyUnitsByAllPurposeProperty = createAsyncThunk(
  "propertyCategory/getAllPurposePropertyUnitsByAllPurposeProperty",
  async (allPurposePropertyId) => {
    let result;
    try {
      result = await myHomeBackendAPI.get(
        `/property/allpurposepropertyunit/list-by-allpurposeproperty/`,
        { params: { all_purpose_property: allPurposePropertyId } }
      );
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const updateAllPurposePropertyUnit = createAsyncThunk(
  "propertyCategory/updateAllPurposePropertyUnit",
  async ({ updateData, navigate }) => {
    let result;
    try {
      result = await myHomeBackendAPI.patch(
        `/property/allpurposepropertyunit/${updateData.id}/update/`,
        updateData
      );
      if (result.status === 200) {
        navigate(-1);
      }
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const createAllPurposePropertyUnit = createAsyncThunk(
  "propertyCategory/createAllPurposePropertyUnit",
  async ({ createData, navigate }, _) => {
    let result;
    try {
      result = await myHomeBackendAPI.post(
        "/property/allpurposepropertyunit/create/",
        createData
      );
      if (result.status === 201) {
        navigate(-1);
      }
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const deleteAllPurposePropertyUnit = createAsyncThunk(
  "propertyCategory/deleteAllPurposePropertyUnit",
  async ({ allPurposePropertyUnitId, allPurposePropertyId }, thunkApi) => {
    let result;
    try {
      result = await myHomeBackendAPI.delete(
        `/property/allpurposepropertyunit/${allPurposePropertyUnitId}/delete/`
      );
      if (result.status === 204) {
        thunkApi.dispatch(
          getAllPurposePropertyUnitsByAllPurposeProperty(allPurposePropertyId)
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

//=====================================================================================
//========== CATEGORY PRICE ===========================================================
export const getListingPriceByCategory = createAsyncThunk(
  "property/getListingPriceByCategory",
  async (categoryKey) => {
    let result;
    try {
      result = await myHomeBackendAPI.get(
        `/property/listing-price-by-category/list/`,
        {
          params: { property_category: categoryKey },
        }
      );
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

//=====================================================================================
//========== CATEGORY DISCOUNT ========================================================
export const getListingDiscountByCategory = createAsyncThunk(
  "property/getListingDiscountByCategory",
  async (categoryKey) => {
    let result;
    try {
      result = await myHomeBackendAPI.get(
        `/property/listing-discount-by-category/list/`,
        {
          params: { property_category: categoryKey },
        }
      );
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);
//=====================================================================================
//========== ?????????????? ===========================================================

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
      state.propertyCategoryList.request.isLoading = true;
    },
    [getPropertyCategories.fulfilled]: (state, action) => {
      state.propertyCategoryList.request.isLoading = false;
      state.propertyCategoryList.response.data = action.payload.data;
      state.propertyCategoryList.response.status = action.payload.status;
    },
    [getPropertyCategories.rejected]: (state, action) => {
      state.propertyCategoryList.request.isLoading = false;
      state.propertyCategoryList.response.error = action.payload.data;
      state.propertyCategoryList.response.status = action.payload.status;
    },

    /**
     * Getting a specific property category
     * @param {StateObject} state
     */
    [getPropertyCategory.pending]: (state) => {
      state.getPropertyCategory.request.isLoading = true;
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
    //=================================================================================================
    //==============LAND===============================================================================
    /**
     * Update land
     * @param {StateObject} state
     */
    [updateLand.pending]: (state) => {
      state.land.updateLand.request.isLoading = true;
    },
    [updateLand.fulfilled]: (state, action) => {
      state.land.updateLand.request.isLoading = false;
      state.land.updateLand.data = action.payload.data;
      state.land.updateLand.response.status = action.payload.status;
    },
    [updateLand.rejected]: (state, action) => {
      state.land.updateLand.request.isLoading = false;
      state.land.updateLand.response.error = action.payload.data;
      state.land.updateLand.response.status = action.payload.status;
    },

    /**
     * Getting lands for current agent
     * @param {StateObject} state
     */
    [getLandByAgent.pending]: (state) => {
      state.land.landList.request.isLoading = true;
    },
    [getLandByAgent.fulfilled]: (state, action) => {
      state.land.landList.request.isLoading = false;
      state.land.landList.data = action.payload.data;
      state.land.landList.response.status = action.payload.status;
    },
    [getLandByAgent.rejected]: (state, action) => {
      state.land.landList.request.isLoading = false;
      state.land.landList.response.error = action.payload.data;
      state.land.landList.response.status = action.payload.status;
    },

    /**
     * Delete land
     * @param {StateObject} state
     */
    [deleteLand.pending]: (state) => {
      state.land.deleteLand.request.isLoading = true;
    },
    [deleteLand.fulfilled]: (state, action) => {
      state.land.deleteLand.request.isLoading = false;
      state.land.deleteLand.data = action.payload.data;
      state.land.deleteLand.response.status = action.payload.status;
    },
    [deleteLand.rejected]: (state, action) => {
      state.land.deleteLand.request.isLoading = false;
      state.land.deleteLand.response.error = action.payload.data;
      state.land.deleteLand.response.status = action.payload.status;
    },

    /* Get sland detail
     * @param {StateObject} state
     */
    [getLandDetail.pending]: (state) => {
      state.land.getLandDetail.request.isLoading = true;
    },
    [getLandDetail.fulfilled]: (state, action) => {
      state.land.getLandDetail.request.isLoading = false;
      state.land.getLandDetail.data = action.payload.data;
      state.land.getLandDetail.response.status = action.payload.status;
    },
    [getLandDetail.rejected]: (state, action) => {
      state.land.getLandDetail.request.isLoading = false;
      state.land.getLandDetail.response.error = action.payload.data;
      state.land.getLandDetail.response.status = action.payload.status;
    },

    //=================================================================================================
    //============SHARE HOUSE==========================================================================
    /**
     * Update sharehouse
     * @param {StateObject} state
     */
    [updateShareHouse.pending]: (state) => {
      state.shareHouse.updateShareHouse.request.isLoading = true;
    },
    [updateShareHouse.fulfilled]: (state, action) => {
      state.shareHouse.updateShareHouse.request.isLoading = false;
      state.shareHouse.updateShareHouse.data = action.payload.data;
      state.shareHouse.updateShareHouse.response.status = action.payload.status;
    },
    [updateShareHouse.rejected]: (state, action) => {
      state.shareHouse.updateShareHouse.request.isLoading = false;
      state.shareHouse.updateShareHouse.response.error = action.payload.data;
      state.shareHouse.updateShareHouse.response.status = action.payload.status;
    },

    /**
     * Getting sharehouse for current agent
     * @param {StateObject} state
     */
    [getSharehouseByAgent.pending]: (state) => {
      state.shareHouse.shareHouseList.request.isLoading = true;
    },
    [getSharehouseByAgent.fulfilled]: (state, action) => {
      state.shareHouse.shareHouseList.request.isLoading = false;
      state.shareHouse.shareHouseList.data = action.payload.data;
      state.shareHouse.shareHouseList.response.status = action.payload.status;
    },
    [getSharehouseByAgent.rejected]: (state, action) => {
      state.shareHouse.shareHouseList.request.isLoading = false;
      state.shareHouse.shareHouseList.response.error = action.payload.data;
      state.shareHouse.shareHouseList.response.status = action.payload.status;
    },

    /**
     * Delete sharehouse
     * @param {StateObject} state
     */
    [deleteShareHouse.pending]: (state) => {
      state.shareHouse.deleteShareHouse.request.isLoading = true;
    },
    [deleteShareHouse.fulfilled]: (state, action) => {
      state.shareHouse.deleteShareHouse.request.isLoading = false;
      state.shareHouse.deleteShareHouse.data = action.payload.data;
      state.shareHouse.deleteShareHouse.response.status = action.payload.status;
    },
    [deleteShareHouse.rejected]: (state, action) => {
      state.shareHouse.deleteShareHouse.request.isLoading = false;
      state.shareHouse.deleteShareHouse.response.error = action.payload.data;
      state.shareHouse.deleteShareHouse.response.status = action.payload.status;
    },

    /* Get sharehouse detail
     * @param {StateObject} state
     */
    [getShareHouseDetail.pending]: (state) => {
      state.shareHouse.getShareHouseDetail.request.isLoading = true;
    },
    [getShareHouseDetail.fulfilled]: (state, action) => {
      state.shareHouse.getShareHouseDetail.request.isLoading = false;
      state.shareHouse.getShareHouseDetail.data = action.payload.data;
      state.shareHouse.getShareHouseDetail.response.status =
        action.payload.status;
    },
    [getShareHouseDetail.rejected]: (state, action) => {
      state.shareHouse.getShareHouseDetail.request.isLoading = false;
      state.shareHouse.getShareHouseDetail.response.error = action.payload.data;
      state.shareHouse.getShareHouseDetail.response.status =
        action.payload.status;
    },

    //=================================================================================================
    //============APARTMENT============================================================================
    /**
     * Getting apartments for current agent
     * @param {StateObject} state
     */
    [getApartmentsByAgent.pending]: (state) => {
      state.apartment.apartmentList.request.isLoading = true;
    },
    [getApartmentsByAgent.fulfilled]: (state, action) => {
      state.apartment.apartmentList.request.isLoading = false;
      state.apartment.apartmentList.data = action.payload.data;
      state.apartment.apartmentList.response.status = action.payload.status;
    },
    [getApartmentsByAgent.rejected]: (state, action) => {
      state.apartment.apartmentList.request.isLoading = false;
      state.apartment.apartmentList.response.error = action.payload.data;
      state.apartment.apartmentList.response.status = action.payload.status;
    },

    /* Update apartment
     * @param {StateObject} state
     */
    [updateApartment.pending]: (state) => {
      state.apartment.updateApartment.request.isLoading = true;
    },
    [updateApartment.fulfilled]: (state, action) => {
      state.apartment.updateApartment.request.isLoading = false;
      state.apartment.updateApartment.data = action.payload.data;
      state.apartment.updateApartment.response.status = action.payload.status;
    },
    [updateApartment.rejected]: (state, action) => {
      state.apartment.updateApartment.request.isLoading = false;
      state.apartment.updateApartment.response.error = action.payload.data;
      state.apartment.updateApartment.response.status = action.payload.status;
    },
    /* Delete apartment
     * @param {StateObject} state
     */
    [deleteApartment.pending]: (state) => {
      state.apartment.deleteApartment.request.isLoading = true;
    },
    [deleteApartment.fulfilled]: (state, action) => {
      state.apartment.deleteApartment.request.isLoading = false;
      state.apartment.deleteApartment.data = action.payload.data;
      state.apartment.deleteApartment.response.status = action.payload.status;
    },
    [deleteApartment.rejected]: (state, action) => {
      state.apartment.deleteApartment.request.isLoading = false;
      state.apartment.deleteApartment.response.error = action.payload.data;
      state.apartment.deleteApartment.response.status = action.payload.status;
    },
    /* Get apartment detail
     * @param {StateObject} state
     */
    [getApartmentDetail.pending]: (state) => {
      state.apartment.getApartmentDetail.request.isLoading = true;
    },
    [getApartmentDetail.fulfilled]: (state, action) => {
      state.apartment.getApartmentDetail.request.isLoading = false;
      state.apartment.getApartmentDetail.data = action.payload.data;
      state.apartment.getApartmentDetail.response.status =
        action.payload.status;
    },
    [getApartmentDetail.rejected]: (state, action) => {
      state.apartment.getApartmentDetail.request.isLoading = false;
      state.apartment.getApartmentDetail.response.error = action.payload.data;
      state.apartment.getApartmentDetail.response.status =
        action.payload.status;
    },
    //==============APARTMENT UNIT===============================
    /**
     * Getting apartment units for an apartment
     * @param {StateObject} state
     */
    [getApartmentUnitsByApartment.pending]: (state) => {
      state.apartment.unit.apartmentUnitList.request.isLoading = true;
    },
    [getApartmentUnitsByApartment.fulfilled]: (state, action) => {
      state.apartment.unit.apartmentUnitList.request.isLoading = false;
      state.apartment.unit.apartmentUnitList.data = action.payload.data;
      state.apartment.unit.apartmentUnitList.response.status =
        action.payload.status;
    },
    [getApartmentUnitsByApartment.rejected]: (state, action) => {
      state.apartment.unit.apartmentUnitList.request.isLoading = false;
      state.apartment.unit.apartmentUnitList.response.error =
        action.payload.data;
      state.apartment.unit.apartmentUnitList.response.status =
        action.payload.status;
    },

    /**
     * update apartment unit
     * @param {StateObject} state
     */
    [updateApartmentUnit.pending]: (state) => {
      state.apartment.unit.updateApartmentUnit.request.isLoading = true;
    },
    [updateApartmentUnit.fulfilled]: (state, action) => {
      state.apartment.unit.updateApartmentUnit.request.isLoading = false;
      state.apartment.unit.updateApartmentUnit.data = action.payload.data;
      state.apartment.unit.updateApartmentUnit.response.status =
        action.payload.status;
    },
    [updateApartmentUnit.rejected]: (state, action) => {
      state.apartment.unit.updateApartmentUnit.request.isLoading = false;
      state.apartment.unit.updateApartmentUnit.response.error =
        action.payload.data;
      state.apartment.unit.updateApartmentUnit.response.status =
        action.payload.status;
    },

    /**
     * Create apartment unit
     * @param {StateObject} state
     */
    [createApartmentUnit.pending]: (state) => {
      state.apartment.unit.createApartmentUnit.request.isLoading = true;
    },
    [createApartmentUnit.fulfilled]: (state, action) => {
      state.apartment.unit.createApartmentUnit.request.isLoading = false;
      state.apartment.unit.createApartmentUnit.data = action.payload.data;
      state.apartment.unit.createApartmentUnit.response.status =
        action.payload.status;
    },
    [createApartmentUnit.rejected]: (state, action) => {
      state.apartment.unit.createApartmentUnit.request.isLoading = false;
      state.apartment.unit.createApartmentUnit.response.error =
        action.payload.data;
      state.apartment.unit.createApartmentUnit.response.status =
        action.payload.status;
    },

    /**
     * Create apartment unit
     * @param {StateObject} state
     */
    [deleteApartmentUnit.pending]: (state) => {
      state.apartment.unit.deleteApartmentUnit.request.isLoading = true;
    },
    [deleteApartmentUnit.fulfilled]: (state, action) => {
      state.apartment.unit.deleteApartmentUnit.request.isLoading = false;
      state.apartment.unit.deleteApartmentUnit.data = action.payload.data;
      state.apartment.unit.deleteApartmentUnit.response.status =
        action.payload.status;
    },
    [deleteApartmentUnit.rejected]: (state, action) => {
      state.apartment.unit.deleteApartmentUnit.request.isLoading = false;
      state.apartment.unit.deleteApartmentUnit.response.error =
        action.payload.data;
      state.apartment.unit.deleteApartmentUnit.response.status =
        action.payload.status;
    },

    //=================================================================================================
    //============VILLA================================================================================
    /**
     * Getting villa for current agent
     * @param {StateObject} state
     */
    [getVillaByAgent.pending]: (state) => {
      state.villa.villaList.request.isLoading = true;
    },
    [getVillaByAgent.fulfilled]: (state, action) => {
      state.villa.villaList.request.isLoading = false;
      state.villa.villaList.data = action.payload.data;
      state.villa.villaList.response.status = action.payload.status;
    },
    [getVillaByAgent.rejected]: (state, action) => {
      state.villa.villaList.request.isLoading = false;
      state.villa.villaList.response.error = action.payload.data;
      state.villa.villaList.response.status = action.payload.status;
    },

    /* Update villa
     * @param {StateObject} state
     */
    [updateVilla.pending]: (state) => {
      state.villa.updateVilla.request.isLoading = true;
    },
    [updateVilla.fulfilled]: (state, action) => {
      state.villa.updateVilla.request.isLoading = false;
      state.villa.updateVilla.data = action.payload.data;
      state.villa.updateVilla.response.status = action.payload.status;
    },
    [updateVilla.rejected]: (state, action) => {
      state.villa.updateVilla.request.isLoading = false;
      state.villa.updateVilla.response.error = action.payload.data;
      state.villa.updateVilla.response.status = action.payload.status;
    },

    /**
     * Delete Villa
     * @param {StateObject} state
     */
    [deleteVilla.pending]: (state) => {
      state.villa.deleteVilla.request.isLoading = true;
    },
    [deleteVilla.fulfilled]: (state, action) => {
      state.villa.deleteVilla.request.isLoading = false;
      state.villa.deleteVilla.data = action.payload.data;
      state.villa.deleteVilla.response.status = action.payload.status;
    },
    [deleteVilla.rejected]: (state, action) => {
      state.villa.deleteVilla.request.isLoading = false;
      state.villa.deleteVilla.response.error = action.payload.data;
      state.villa.deleteVilla.response.status = action.payload.status;
    },

    /* Get villa detail
     * @param {StateObject} state
     */
    [getVillaDetail.pending]: (state) => {
      state.villa.getVillaDetail.request.isLoading = true;
    },
    [getVillaDetail.fulfilled]: (state, action) => {
      state.villa.getVillaDetail.request.isLoading = false;
      state.villa.getVillaDetail.data = action.payload.data;
      state.villa.getVillaDetail.response.status = action.payload.status;
    },
    [getVillaDetail.rejected]: (state, action) => {
      state.villa.getVillaDetail.request.isLoading = false;
      state.villa.getVillaDetail.response.error = action.payload.data;
      state.villa.getVillaDetail.response.status = action.payload.status;
    },

    //=================================================================================================
    //============CONDOMINIUM==========================================================================
    /**
     * Getting condominium for current agent
     * @param {StateObject} state
     */
    [getCondominiumByAgent.pending]: (state) => {
      state.condominium.condominiumList.request.isLoading = true;
    },
    [getCondominiumByAgent.fulfilled]: (state, action) => {
      state.condominium.condominiumList.request.isLoading = false;
      state.condominium.condominiumList.data = action.payload.data;
      state.condominium.condominiumList.response.status = action.payload.status;
    },
    [getCondominiumByAgent.rejected]: (state, action) => {
      state.condominium.condominiumList.request.isLoading = false;
      state.condominium.condominiumList.response.error = action.payload.data;
      state.condominium.condominiumList.response.status = action.payload.status;
    },

    /* Update condominium
     * @param {StateObject} state
     */
    [updateCondominium.pending]: (state) => {
      state.condominium.updateCondominium.request.isLoading = true;
    },
    [updateCondominium.fulfilled]: (state, action) => {
      state.condominium.updateCondominium.request.isLoading = false;
      state.condominium.updateCondominium.data = action.payload.data;
      state.condominium.updateCondominium.response.status =
        action.payload.status;
    },
    [updateCondominium.rejected]: (state, action) => {
      state.condominium.updateCondominium.request.isLoading = false;
      state.condominium.updateCondominium.response.error = action.payload.data;
      state.condominium.updateCondominium.response.status =
        action.payload.status;
    },

    /**
     * Delete condominium
     * @param {StateObject} state
     */
    [deleteCondominium.pending]: (state) => {
      state.condominium.deleteCondominium.request.isLoading = true;
    },
    [deleteCondominium.fulfilled]: (state, action) => {
      state.condominium.deleteCondominium.request.isLoading = false;
      state.condominium.deleteCondominium.data = action.payload.data;
      state.condominium.deleteCondominium.response.status =
        action.payload.status;
    },
    [deleteCondominium.rejected]: (state, action) => {
      state.condominium.deleteCondominium.request.isLoading = false;
      state.condominium.deleteCondominium.response.error = action.payload.data;
      state.condominium.deleteCondominium.response.status =
        action.payload.status;
    },

    /* Get condominium detail
     * @param {StateObject} state
     */
    [getCondominiumDetail.pending]: (state) => {
      state.condominium.getCondominiumDetail.request.isLoading = true;
    },
    [getCondominiumDetail.fulfilled]: (state, action) => {
      state.condominium.getCondominiumDetail.request.isLoading = false;
      state.condominium.getCondominiumDetail.data = action.payload.data;
      state.condominium.getCondominiumDetail.response.status =
        action.payload.status;
    },
    [getCondominiumDetail.rejected]: (state, action) => {
      state.condominium.getCondominiumDetail.request.isLoading = false;
      state.condominium.getCondominiumDetail.response.error =
        action.payload.data;
      state.condominium.getCondominiumDetail.response.status =
        action.payload.status;
    },

    //=================================================================================================
    //============ TRADITIONAL HOUSE ==================================================================
    /**
     * Getting traditional house for current agent
     * @param {StateObject} state
     */
    [getTraditionalHouseByAgent.pending]: (state) => {
      state.traditionalHouse.traditionalHouseList.request.isLoading = true;
    },
    [getTraditionalHouseByAgent.fulfilled]: (state, action) => {
      state.traditionalHouse.traditionalHouseList.request.isLoading = false;
      state.traditionalHouse.traditionalHouseList.data = action.payload.data;
      state.traditionalHouse.traditionalHouseList.response.status =
        action.payload.status;
    },
    [getTraditionalHouseByAgent.rejected]: (state, action) => {
      state.traditionalHouse.traditionalHouseList.request.isLoading = false;
      state.traditionalHouse.traditionalHouseList.response.error =
        action.payload.data;
      state.traditionalHouse.traditionalHouseList.response.status =
        action.payload.status;
    },

    /* Update traditional house
     * @param {StateObject} state
     */
    [updateTraditionalHouse.pending]: (state) => {
      state.traditionalHouse.updateTraditionalHouse.request.isLoading = true;
    },
    [updateTraditionalHouse.fulfilled]: (state, action) => {
      state.traditionalHouse.updateTraditionalHouse.request.isLoading = false;
      state.traditionalHouse.updateTraditionalHouse.data = action.payload.data;
      state.traditionalHouse.updateTraditionalHouse.response.status =
        action.payload.status;
    },
    [updateTraditionalHouse.rejected]: (state, action) => {
      state.traditionalHouse.updateTraditionalHouse.request.isLoading = false;
      state.traditionalHouse.updateTraditionalHouse.response.error =
        action.payload.data;
      state.traditionalHouse.updateTraditionalHouse.response.status =
        action.payload.status;
    },

    /**
     * Delete traditional house
     * @param {StateObject} state
     */
    [deleteTraditionalHouse.pending]: (state) => {
      state.traditionalHouse.deleteTraditionalHouse.request.isLoading = true;
    },
    [deleteTraditionalHouse.fulfilled]: (state, action) => {
      state.traditionalHouse.deleteTraditionalHouse.request.isLoading = false;
      state.traditionalHouse.deleteTraditionalHouse.data = action.payload.data;
      state.traditionalHouse.deleteTraditionalHouse.response.status =
        action.payload.status;
    },
    [deleteTraditionalHouse.rejected]: (state, action) => {
      state.traditionalHouse.deleteTraditionalHouse.request.isLoading = false;
      state.traditionalHouse.deleteTraditionalHouse.response.error =
        action.payload.data;
      state.traditionalHouse.deleteTraditionalHouse.response.status =
        action.payload.status;
    },

    /* Get traditional house detail
     * @param {StateObject} state
     */
    [getTraditionalHouseDetail.pending]: (state) => {
      state.traditionalHouse.getTraditionalHouseDetail.request.isLoading = true;
    },
    [getTraditionalHouseDetail.fulfilled]: (state, action) => {
      state.traditionalHouse.getTraditionalHouseDetail.request.isLoading = false;
      state.traditionalHouse.getTraditionalHouseDetail.data =
        action.payload.data;
      state.traditionalHouse.getTraditionalHouseDetail.response.status =
        action.payload.status;
    },
    [getTraditionalHouseDetail.rejected]: (state, action) => {
      state.traditionalHouse.getTraditionalHouseDetail.request.isLoading = false;
      state.traditionalHouse.getTraditionalHouseDetail.response.error =
        action.payload.data;
      state.traditionalHouse.getTraditionalHouseDetail.response.status =
        action.payload.status;
    },

    //=================================================================================================
    //============COMMERCIAL PROPERTY==================================================================
    /**
     * Getting commercial property for current agent
     * @param {StateObject} state
     */
    [getCommercialPropertiesByAgent.pending]: (state) => {
      state.commercialProperty.commercialPropertyList.request.isLoading = true;
    },
    [getCommercialPropertiesByAgent.fulfilled]: (state, action) => {
      state.commercialProperty.commercialPropertyList.request.isLoading = false;
      state.commercialProperty.commercialPropertyList.data =
        action.payload.data;
      state.commercialProperty.commercialPropertyList.response.status =
        action.payload.status;
    },
    [getCommercialPropertiesByAgent.rejected]: (state, action) => {
      state.commercialProperty.commercialPropertyList.request.isLoading = false;
      state.commercialProperty.commercialPropertyList.response.error =
        action.payload.data;
      state.commercialProperty.commercialPropertyList.response.status =
        action.payload.status;
    },

    /* Update commercial property
     * @param {StateObject} state
     */
    [updateCommercialProperty.pending]: (state) => {
      state.commercialProperty.updateCommercialProperty.request.isLoading = true;
    },
    [updateCommercialProperty.fulfilled]: (state, action) => {
      state.commercialProperty.updateCommercialProperty.request.isLoading = false;
      state.commercialProperty.updateCommercialProperty.data =
        action.payload.data;
      state.commercialProperty.updateCommercialProperty.response.status =
        action.payload.status;
    },
    [updateCommercialProperty.rejected]: (state, action) => {
      state.commercialProperty.updateCommercialProperty.request.isLoading = false;
      state.commercialProperty.updateCommercialProperty.response.error =
        action.payload.data;
      state.commercialProperty.updateCommercialProperty.response.status =
        action.payload.status;
    },
    /* Delete commercial property
     * @param {StateObject} state
     */
    [deleteCommercialProperty.pending]: (state) => {
      state.commercialProperty.deleteCommercialProperty.request.isLoading = true;
    },
    [deleteCommercialProperty.fulfilled]: (state, action) => {
      state.commercialProperty.deleteCommercialProperty.request.isLoading = false;
      state.commercialProperty.deleteCommercialProperty.data =
        action.payload.data;
      state.commercialProperty.deleteCommercialProperty.response.status =
        action.payload.status;
    },
    [deleteCommercialProperty.rejected]: (state, action) => {
      state.commercialProperty.deleteCommercialProperty.request.isLoading = false;
      state.commercialProperty.deleteCommercialProperty.response.error =
        action.payload.data;
      state.commercialProperty.deleteCommercialProperty.response.status =
        action.payload.status;
    },
    /* Get commercial property detail
     * @param {StateObject} state
     */
    [getCommercialPropertyDetail.pending]: (state) => {
      state.commercialProperty.getCommercialPropertyDetail.request.isLoading = true;
    },
    [getCommercialPropertyDetail.fulfilled]: (state, action) => {
      state.commercialProperty.getCommercialPropertyDetail.request.isLoading = false;
      state.commercialProperty.getCommercialPropertyDetail.data =
        action.payload.data;
      state.commercialProperty.getCommercialPropertyDetail.response.status =
        action.payload.status;
    },
    [getCommercialPropertyDetail.rejected]: (state, action) => {
      state.commercialProperty.getCommercialPropertyDetail.request.isLoading = false;
      state.commercialProperty.getCommercialPropertyDetail.response.error =
        action.payload.data;
      state.commercialProperty.getCommercialPropertyDetail.response.status =
        action.payload.status;
    },
    //==============COMMERCIAL PROPERTY UNIT===============================
    /**
     * Getting commercial property units for an apartment
     * @param {StateObject} state
     */
    [getCommercialPropertyUnitsByCommercialProperty.pending]: (state) => {
      state.commercialProperty.unit.commercialPropertyUnitList.request.isLoading = true;
    },
    [getCommercialPropertyUnitsByCommercialProperty.fulfilled]: (
      state,
      action
    ) => {
      state.commercialProperty.unit.commercialPropertyUnitList.request.isLoading = false;
      state.commercialProperty.unit.commercialPropertyUnitList.data =
        action.payload.data;
      state.commercialProperty.unit.commercialPropertyUnitList.response.status =
        action.payload.status;
    },
    [getCommercialPropertyUnitsByCommercialProperty.rejected]: (
      state,
      action
    ) => {
      state.commercialProperty.unit.commercialPropertyUnitList.request.isLoading = false;
      state.commercialProperty.unit.commercialPropertyUnitList.response.error =
        action.payload.data;
      state.commercialProperty.unit.commercialPropertyUnitList.response.status =
        action.payload.status;
    },

    /**
     * update commercial property unit
     * @param {StateObject} state
     */
    [updateCommercialPropertyUnit.pending]: (state) => {
      state.commercialProperty.unit.updateCommercialPropertyUnit.request.isLoading = true;
    },
    [updateCommercialPropertyUnit.fulfilled]: (state, action) => {
      state.commercialProperty.unit.updateCommercialPropertyUnit.request.isLoading = false;
      state.commercialProperty.unit.updateCommercialPropertyUnit.data =
        action.payload.data;
      state.commercialProperty.unit.updateCommercialPropertyUnit.response.status =
        action.payload.status;
    },
    [updateCommercialPropertyUnit.rejected]: (state, action) => {
      state.commercialProperty.unit.updateCommercialPropertyUnit.request.isLoading = false;
      state.commercialProperty.unit.updateCommercialPropertyUnit.response.error =
        action.payload.data;
      state.commercialProperty.unit.updateCommercialPropertyUnit.response.status =
        action.payload.status;
    },

    /**
     * Create commercial property unit
     * @param {StateObject} state
     */
    [createCommercialPropertyUnit.pending]: (state) => {
      state.commercialProperty.unit.createCommercialPropertyUnit.request.isLoading = true;
    },
    [createCommercialPropertyUnit.fulfilled]: (state, action) => {
      state.commercialProperty.unit.createCommercialPropertyUnit.request.isLoading = false;
      state.commercialProperty.unit.createCommercialPropertyUnit.data =
        action.payload.data;
      state.commercialProperty.unit.createCommercialPropertyUnit.response.status =
        action.payload.status;
    },
    [createCommercialPropertyUnit.rejected]: (state, action) => {
      state.commercialProperty.unit.createCommercialPropertyUnit.request.isLoading = false;
      state.commercialProperty.unit.createCommercialPropertyUnit.response.error =
        action.payload.data;
      state.commercialProperty.unit.createCommercialPropertyUnit.response.status =
        action.payload.status;
    },

    /**
     * Create commercial property unit
     * @param {StateObject} state
     */
    [deleteCommercialPropertyUnit.pending]: (state) => {
      state.commercialProperty.unit.deleteCommercialPropertyUnit.request.isLoading = true;
    },
    [deleteCommercialPropertyUnit.fulfilled]: (state, action) => {
      state.commercialProperty.unit.deleteCommercialPropertyUnit.request.isLoading = false;
      state.commercialProperty.unit.deleteCommercialPropertyUnit.data =
        action.payload.data;
      state.commercialProperty.unit.deleteCommercialPropertyUnit.response.status =
        action.payload.status;
    },
    [deleteCommercialPropertyUnit.rejected]: (state, action) => {
      state.commercialProperty.unit.deleteCommercialPropertyUnit.request.isLoading = false;
      state.commercialProperty.unit.deleteCommercialPropertyUnit.response.error =
        action.payload.data;
      state.commercialProperty.unit.deleteCommercialPropertyUnit.response.status =
        action.payload.status;
    },

    //=================================================================================================
    //============ OFFICE =============================================================================
    /**
     * Getting office for current agent
     * @param {StateObject} state
     */
    [getOfficeByAgent.pending]: (state) => {
      state.office.officeList.request.isLoading = true;
    },
    [getOfficeByAgent.fulfilled]: (state, action) => {
      state.office.officeList.request.isLoading = false;
      state.office.officeList.data = action.payload.data;
      state.office.officeList.response.status = action.payload.status;
    },
    [getOfficeByAgent.rejected]: (state, action) => {
      state.office.officeList.request.isLoading = false;
      state.office.officeList.response.error = action.payload.data;
      state.office.officeList.response.status = action.payload.status;
    },

    /* Update office
     * @param {StateObject} state
     */
    [updateOffice.pending]: (state) => {
      state.office.updateOffice.request.isLoading = true;
    },
    [updateOffice.fulfilled]: (state, action) => {
      state.office.updateOffice.request.isLoading = false;
      state.office.updateOffice.data = action.payload.data;
      state.office.updateOffice.response.status = action.payload.status;
    },
    [updateOffice.rejected]: (state, action) => {
      state.office.updateOffice.request.isLoading = false;
      state.office.updateOffice.response.error = action.payload.data;
      state.office.updateOffice.response.status = action.payload.status;
    },

    /**
     * Delete office
     * @param {StateObject} state
     */
    [deleteOffice.pending]: (state) => {
      state.office.deleteOffice.request.isLoading = true;
    },
    [deleteOffice.fulfilled]: (state, action) => {
      state.office.deleteOffice.request.isLoading = false;
      state.office.deleteOffice.data = action.payload.data;
      state.office.deleteOffice.response.status = action.payload.status;
    },
    [deleteOffice.rejected]: (state, action) => {
      state.office.deleteOffice.request.isLoading = false;
      state.office.deleteOffice.response.error = action.payload.data;
      state.office.deleteOffice.response.status = action.payload.status;
    },

    /* Get office detail
     * @param {StateObject} state
     */
    [getOfficeDetail.pending]: (state) => {
      state.office.getOfficeDetail.request.isLoading = true;
    },
    [getOfficeDetail.fulfilled]: (state, action) => {
      state.office.getOfficeDetail.request.isLoading = false;
      state.office.getOfficeDetail.data = action.payload.data;
      state.office.getOfficeDetail.response.status = action.payload.status;
    },
    [getOfficeDetail.rejected]: (state, action) => {
      state.office.getOfficeDetail.request.isLoading = false;
      state.office.getOfficeDetail.response.error = action.payload.data;
      state.office.getOfficeDetail.response.status = action.payload.status;
    },

    //=================================================================================================
    //============ HALL ===============================================================================
    /**
     * Getting hall for current agent
     * @param {StateObject} state
     */
    [getHallByAgent.pending]: (state) => {
      state.hall.hallList.request.isLoading = true;
    },
    [getHallByAgent.fulfilled]: (state, action) => {
      state.hall.hallList.request.isLoading = false;
      state.hall.hallList.data = action.payload.data;
      state.hall.hallList.response.status = action.payload.status;
    },
    [getHallByAgent.rejected]: (state, action) => {
      state.hall.hallList.request.isLoading = false;
      state.hall.hallList.response.error = action.payload.data;
      state.hall.hallList.response.status = action.payload.status;
    },

    /* Update hall
     * @param {StateObject} state
     */
    [updateHall.pending]: (state) => {
      state.hall.updateHall.request.isLoading = true;
    },
    [updateHall.fulfilled]: (state, action) => {
      state.hall.updateHall.request.isLoading = false;
      state.hall.updateHall.data = action.payload.data;
      state.hall.updateHall.response.status = action.payload.status;
    },
    [updateHall.rejected]: (state, action) => {
      state.hall.updateHall.request.isLoading = false;
      state.hall.updateHall.response.error = action.payload.data;
      state.hall.updateHall.response.status = action.payload.status;
    },

    /**
     * Delete hall
     * @param {StateObject} state
     */
    [deleteHall.pending]: (state) => {
      state.hall.deleteHall.request.isLoading = true;
    },
    [deleteHall.fulfilled]: (state, action) => {
      state.hall.deleteHall.request.isLoading = false;
      state.hall.deleteHall.data = action.payload.data;
      state.hall.deleteHall.response.status = action.payload.status;
    },
    [deleteHall.rejected]: (state, action) => {
      state.hall.deleteHall.request.isLoading = false;
      state.hall.deleteHall.response.error = action.payload.data;
      state.hall.deleteHall.response.status = action.payload.status;
    },

    /* Get hall detail
     * @param {StateObject} state
     */
    [getHallDetail.pending]: (state) => {
      state.hall.getHallDetail.request.isLoading = true;
    },
    [getHallDetail.fulfilled]: (state, action) => {
      state.hall.getHallDetail.request.isLoading = false;
      state.hall.getHallDetail.data = action.payload.data;
      state.hall.getHallDetail.response.status = action.payload.status;
    },
    [getHallDetail.rejected]: (state, action) => {
      state.hall.getHallDetail.request.isLoading = false;
      state.hall.getHallDetail.response.error = action.payload.data;
      state.hall.getHallDetail.response.status = action.payload.status;
    },

    //=================================================================================================
    //============ALL PURPOSE PROPERTY=================================================================
    /**
     * Getting all purpose property for current agent
     * @param {StateObject} state
     */
    [getAllPurposePropertiesByAgent.pending]: (state) => {
      state.allPurposeProperty.allPurposePropertyList.request.isLoading = true;
    },
    [getAllPurposePropertiesByAgent.fulfilled]: (state, action) => {
      state.allPurposeProperty.allPurposePropertyList.request.isLoading = false;
      state.allPurposeProperty.allPurposePropertyList.data =
        action.payload.data;
      state.allPurposeProperty.allPurposePropertyList.response.status =
        action.payload.status;
    },
    [getAllPurposePropertiesByAgent.rejected]: (state, action) => {
      state.allPurposeProperty.allPurposePropertyList.request.isLoading = false;
      state.allPurposeProperty.allPurposePropertyList.response.error =
        action.payload.data;
      state.allPurposeProperty.allPurposePropertyList.response.status =
        action.payload.status;
    },

    /* Update all purpose property
     * @param {StateObject} state
     */
    [updateAllPurposeProperty.pending]: (state) => {
      state.allPurposeProperty.updateAllPurposeProperty.request.isLoading = true;
    },
    [updateAllPurposeProperty.fulfilled]: (state, action) => {
      state.allPurposeProperty.updateAllPurposeProperty.request.isLoading = false;
      state.allPurposeProperty.updateAllPurposeProperty.data =
        action.payload.data;
      state.allPurposeProperty.updateAllPurposeProperty.response.status =
        action.payload.status;
    },
    [updateAllPurposeProperty.rejected]: (state, action) => {
      state.allPurposeProperty.updateAllPurposeProperty.request.isLoading = false;
      state.allPurposeProperty.updateAllPurposeProperty.response.error =
        action.payload.data;
      state.allPurposeProperty.updateAllPurposeProperty.response.status =
        action.payload.status;
    },
    /* Delete all purpose property
     * @param {StateObject} state
     */
    [deleteAllPurposeProperty.pending]: (state) => {
      state.allPurposeProperty.deleteAllPurposeProperty.request.isLoading = true;
    },
    [deleteAllPurposeProperty.fulfilled]: (state, action) => {
      state.allPurposeProperty.deleteAllPurposeProperty.request.isLoading = false;
      state.allPurposeProperty.deleteAllPurposeProperty.data =
        action.payload.data;
      state.allPurposeProperty.deleteAllPurposeProperty.response.status =
        action.payload.status;
    },
    [deleteAllPurposeProperty.rejected]: (state, action) => {
      state.allPurposeProperty.deleteAllPurposeProperty.request.isLoading = false;
      state.allPurposeProperty.deleteAllPurposeProperty.response.error =
        action.payload.data;
      state.allPurposeProperty.deleteAllPurposeProperty.response.status =
        action.payload.status;
    },
    /* Get all purpose property detail
     * @param {StateObject} state
     */
    [getAllPurposePropertyDetail.pending]: (state) => {
      state.allPurposeProperty.getAllPurposePropertyDetail.request.isLoading = true;
    },
    [getAllPurposePropertyDetail.fulfilled]: (state, action) => {
      state.allPurposeProperty.getAllPurposePropertyDetail.request.isLoading = false;
      state.allPurposeProperty.getAllPurposePropertyDetail.data =
        action.payload.data;
      state.allPurposeProperty.getAllPurposePropertyDetail.response.status =
        action.payload.status;
    },
    [getAllPurposePropertyDetail.rejected]: (state, action) => {
      state.allPurposeProperty.getAllPurposePropertyDetail.request.isLoading = false;
      state.allPurposeProperty.getAllPurposePropertyDetail.response.error =
        action.payload.data;
      state.allPurposeProperty.getAllPurposePropertyDetail.response.status =
        action.payload.status;
    },
    //==============ALL PURPOSE PROPERTY UNIT===============================
    /**
     * Getting all purpose property units for an apartment
     * @param {StateObject} state
     */
    [getAllPurposePropertyUnitsByAllPurposeProperty.pending]: (state) => {
      state.allPurposeProperty.unit.allPurposePropertyUnitList.request.isLoading = true;
    },
    [getAllPurposePropertyUnitsByAllPurposeProperty.fulfilled]: (
      state,
      action
    ) => {
      state.allPurposeProperty.unit.allPurposePropertyUnitList.request.isLoading = false;
      state.allPurposeProperty.unit.allPurposePropertyUnitList.data =
        action.payload.data;
      state.allPurposeProperty.unit.allPurposePropertyUnitList.response.status =
        action.payload.status;
    },
    [getAllPurposePropertyUnitsByAllPurposeProperty.rejected]: (
      state,
      action
    ) => {
      state.allPurposeProperty.unit.allPurposePropertyUnitList.request.isLoading = false;
      state.allPurposeProperty.unit.allPurposePropertyUnitList.response.error =
        action.payload.data;
      state.allPurposeProperty.unit.allPurposePropertyUnitList.response.status =
        action.payload.status;
    },

    /**
     * update all purpose property unit
     * @param {StateObject} state
     */
    [updateAllPurposePropertyUnit.pending]: (state) => {
      state.allPurposeProperty.unit.updateAllPurposePropertyUnit.request.isLoading = true;
    },
    [updateAllPurposePropertyUnit.fulfilled]: (state, action) => {
      state.allPurposeProperty.unit.updateAllPurposePropertyUnit.request.isLoading = false;
      state.allPurposeProperty.unit.updateAllPurposePropertyUnit.data =
        action.payload.data;
      state.allPurposeProperty.unit.updateAllPurposePropertyUnit.response.status =
        action.payload.status;
    },
    [updateAllPurposePropertyUnit.rejected]: (state, action) => {
      state.allPurposeProperty.unit.updateAllPurposePropertyUnit.request.isLoading = false;
      state.allPurposeProperty.unit.updateAllPurposePropertyUnit.response.error =
        action.payload.data;
      state.allPurposeProperty.unit.updateAllPurposePropertyUnit.response.status =
        action.payload.status;
    },

    /**
     * Create all purpose property unit
     * @param {StateObject} state
     */
    [createAllPurposePropertyUnit.pending]: (state) => {
      state.allPurposeProperty.unit.createAllPurposePropertyUnit.request.isLoading = true;
    },
    [createAllPurposePropertyUnit.fulfilled]: (state, action) => {
      state.allPurposeProperty.unit.createAllPurposePropertyUnit.request.isLoading = false;
      state.allPurposeProperty.unit.createAllPurposePropertyUnit.data =
        action.payload.data;
      state.allPurposeProperty.unit.createAllPurposePropertyUnit.response.status =
        action.payload.status;
    },
    [createAllPurposePropertyUnit.rejected]: (state, action) => {
      state.allPurposeProperty.unit.createAllPurposePropertyUnit.request.isLoading = false;
      state.allPurposeProperty.unit.createAllPurposePropertyUnit.response.error =
        action.payload.data;
      state.allPurposeProperty.unit.createAllPurposePropertyUnit.response.status =
        action.payload.status;
    },

    /**
     * Create all purpose property unit
     * @param {StateObject} state
     */
    [deleteAllPurposePropertyUnit.pending]: (state) => {
      state.allPurposeProperty.unit.deleteAllPurposePropertyUnit.request.isLoading = true;
    },
    [deleteAllPurposePropertyUnit.fulfilled]: (state, action) => {
      state.allPurposeProperty.unit.deleteAllPurposePropertyUnit.request.isLoading = false;
      state.allPurposeProperty.unit.deleteAllPurposePropertyUnit.data =
        action.payload.data;
      state.allPurposeProperty.unit.deleteAllPurposePropertyUnit.response.status =
        action.payload.status;
    },
    [deleteAllPurposePropertyUnit.rejected]: (state, action) => {
      state.allPurposeProperty.unit.deleteAllPurposePropertyUnit.request.isLoading = false;
      state.allPurposeProperty.unit.deleteAllPurposePropertyUnit.response.error =
        action.payload.data;
      state.allPurposeProperty.unit.deleteAllPurposePropertyUnit.response.status =
        action.payload.status;
    },

    /**
     * Get property category prices
     * @param {StateObject} state
     */
    [getListingPriceByCategory.pending]: (state) => {
      state.listing.listingPriceByCategoryList.request.isLoading = true;
    },
    [getListingPriceByCategory.fulfilled]: (state, action) => {
      state.listing.listingPriceByCategoryList.request.isLoading = false;
      state.listing.listingPriceByCategoryList.data = action.payload.data;
      state.listing.listingPriceByCategoryList.response.status =
        action.payload.status;
    },
    [getListingPriceByCategory.rejected]: (state, action) => {
      state.listing.listingPriceByCategoryList.request.isLoading = false;
      state.listing.listingPriceByCategoryList.response.error =
        action.payload.data;
      state.listing.listingPriceByCategoryList.response.status =
        action.payload.status;
    },

    /**
     * Get property category discounts
     * @param {StateObject} state
     */
    [getListingDiscountByCategory.pending]: (state) => {
      state.listing.listingDiscountByCategoryList.request.isLoading = true;
    },
    [getListingDiscountByCategory.fulfilled]: (state, action) => {
      state.listing.listingDiscountByCategoryList.request.isLoading = false;
      state.listing.listingDiscountByCategoryList.data = action.payload.data;
      state.listing.listingDiscountByCategoryList.response.status =
        action.payload.status;
    },
    [getListingDiscountByCategory.rejected]: (state, action) => {
      state.listing.listingDiscountByCategoryList.request.isLoading = false;
      state.listing.listingDiscountByCategoryList.response.error =
        action.payload.data;
      state.listing.listingDiscountByCategoryList.response.status =
        action.payload.status;
    },
  },
});

export default propertyCategorySlice.reducer;
