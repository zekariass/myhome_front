// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import myHomeBackendAPI from "components/commons/apis/myHomeBackendAPI";
import { getFormatedResponse } from "features/getFormatedResponse";

const initialPaymentState = {
  getPaymentApprovalModes: {
    request: {
      isLoading: false,
    },
    response: {
      error: null,
      status: null,
    },
    data: [],
  },
  getPaymentMethods: {
    request: {
      isLoading: false,
    },
    response: {
      error: null,
      status: null,
    },
    data: [],
  },
  getSupportedCardSchemes: {
    request: {
      isLoading: false,
    },
    response: {
      error: null,
      status: null,
    },
    data: [],
  },
  coupon: {
    getCouponDetail: {
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
  paymentPropertyData: {},
};

export const getPaymentApprovalModes = createAsyncThunk(
  "payment/getPaymentApprovalModes",
  async () => {
    let result;
    try {
      result = await myHomeBackendAPI.get(`/payment/paymentapprovalmode/list/`);
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const getPaymentMethods = createAsyncThunk(
  "payment/getPaymentMethods",
  async () => {
    let result;
    try {
      result = await myHomeBackendAPI.get(`/payment/paymentmethod/list/`);
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

export const getSupportedCardSchemes = createAsyncThunk(
  "payment/getSupportedCardSchemes",
  async () => {
    let result;
    try {
      result = await myHomeBackendAPI.get(`/payment/supportedcardscheme/list/`);
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

//=========COUPON================================================================

export const getCouponDetail = createAsyncThunk(
  "payment/getCouponDetail",
  async (couponCode) => {
    let result;
    try {
      result = await myHomeBackendAPI.get(`/payment/coupon/detail/`, {
        params: { code: couponCode },
      });
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      return formattedResponse;
    }
  }
);

//=========PAYMENT SLICE===========================================================

const paymentSlice = createSlice({
  name: "payment",
  initialState: initialPaymentState,
  reducers: {
    setPaymentPropertyData: (state, action) => {
      state.paymentPropertyData = action.payload;
    },
  },
  extraReducers: {
    /**
     * get Payment Approval Modes
     * @param {StateObject} state
     */
    [getPaymentApprovalModes.pending]: (state) => {
      state.getPaymentApprovalModes.request.isLoading = true;
    },
    [getPaymentApprovalModes.fulfilled]: (state, action) => {
      state.getPaymentApprovalModes.request.isLoading = false;
      state.getPaymentApprovalModes.data = action.payload.data;
      state.getPaymentApprovalModes.response.status = action.payload.status;
    },
    [getPaymentApprovalModes.rejected]: (state, action) => {
      state.getPaymentApprovalModes.request.isLoading = false;
      state.getPaymentApprovalModes.response.error = action.payload.data;
      state.getPaymentApprovalModes.response.status = action.payload.status;
    },

    /**
     * Get Payment Methods
     * @param {StateObject} state
     */
    [getPaymentMethods.pending]: (state) => {
      state.getPaymentMethods.request.isLoading = true;
    },
    [getPaymentMethods.fulfilled]: (state, action) => {
      state.getPaymentMethods.request.isLoading = false;
      state.getPaymentMethods.data = action.payload.data;
      state.getPaymentMethods.response.status = action.payload.status;
    },
    [getPaymentMethods.rejected]: (state, action) => {
      state.getPaymentMethods.request.isLoading = false;
      state.getPaymentMethods.response.error = action.payload.data;
      state.getPaymentMethods.response.status = action.payload.status;
    },

    /**
     * Get Supported Card Schemes
     * @param {StateObject} state
     */
    [getSupportedCardSchemes.pending]: (state) => {
      state.getSupportedCardSchemes.request.isLoading = true;
    },
    [getSupportedCardSchemes.fulfilled]: (state, action) => {
      state.getSupportedCardSchemes.request.isLoading = false;
      state.getSupportedCardSchemes.data = action.payload.data;
      state.getSupportedCardSchemes.response.status = action.payload.status;
    },
    [getSupportedCardSchemes.rejected]: (state, action) => {
      state.getSupportedCardSchemes.request.isLoading = false;
      state.getSupportedCardSchemes.response.error = action.payload.data;
      state.getSupportedCardSchemes.response.status = action.payload.status;
    },
    //==============================================================
    //===============COUPON==========================================
    /**
     * Get coupon detail
     * @param {StateObject} state
     */
    [getCouponDetail.pending]: (state) => {
      state.coupon.getCouponDetail.request.isLoading = true;
    },
    [getCouponDetail.fulfilled]: (state, action) => {
      state.coupon.getCouponDetail.request.isLoading = false;
      state.coupon.getCouponDetail.data = action.payload.data;
      state.coupon.getCouponDetail.response.status = action.payload.status;
    },
    [getCouponDetail.rejected]: (state, action) => {
      state.coupon.getCouponDetail.request.isLoading = false;
      state.coupon.getCouponDetail.response.error = action.payload.data;
      state.coupon.getCouponDetail.response.status = action.payload.status;
    },
  },
});

export const { setPaymentPropertyData } = paymentSlice.actions;

export default paymentSlice.reducer;
