// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import myHomeBackendAPI from "components/commons/apis/myHomeBackendAPI";
import { PATH_LANDING } from "components/commons/Strings";
import { getFormatedResponse } from "features/getFormatedResponse";

const userInitialState = {
  /**
   * User initial state
   */
  signup: {
    userData: {},
    responseError: null /** User signup response error */,
    requestError:
      null /** User signup request error, such as validation error */,
    isLoading: false /** Flag which indicates whether the signup is on progress */,
    signupStatus: 999 /** Signup request response status code */,
  },

  signin: {
    isLoading: false,
    signinError: null,
    signinStatus: null,
    isSignedIn: false,
  },
  userDetail: {
    request: {
      isLoading: false,
    },
    response: {
      error: null,
      status: null,
    },
    data: {
      has_agent: false,
    },
  },
};

/**
 * Signup async task that requests the remote server to signup the user and wait for response
 */
export const performSignup = createAsyncThunk(
  "user/performSignup",
  async ({ userData, navigate }) => {
    let result = null;
    // console.log("userData: ", userData);
    try {
      result = await myHomeBackendAPI.post("/user/signup/", userData);
      if (result.status === 200) {
        /**
         * navigate is a useNavigate hook instance passed as parameter from caller
         */
        navigate(PATH_LANDING, {
          replace: true,
        });
      }
    } catch (error) {
      result = error.response;
    } finally {
      const formatedResponse = getFormatedResponse(result);
      return formatedResponse;
    }
  }
);

/**
 * Signin async task that requests the remote server to signin the user and wait for response
 */
export const performSignin = createAsyncThunk(
  "user/performSignin",
  async ({ userCred, navigate, fromPage }, thunkAPI) => {
    let result;
    try {
      result = await myHomeBackendAPI.post("/user/token/", userCred);

      if (result.status === 200) {
        /**
         * If the signin is successful store the access key and refresh key in local storage
         * update the signed in status in store and go back to landing page
         */
        localStorage.setItem("access_token", result.data.access);
        localStorage.setItem("refresh_token", result.data.refresh);
        thunkAPI.dispatch(userSlice.actions.checkUserSigninStatus());
        // thunkAPI.dispatch(getUserDetail(result.data.access));
        navigate(fromPage, { replace: true });
      }
    } catch (error) {
      result = error.response;
    } finally {
      const formatedResponse = getFormatedResponse(result);
      // console.log("SIGNIN RESPONSE: ", formatedResponse);
      return formatedResponse;
    }
  }
);

//============================================================================
/**
 * Get user detail
 */
//============================================================================
export const getUserDetail = createAsyncThunk(
  "user/getUserDetail",
  async (headers) => {
    let result;
    try {
      result = await myHomeBackendAPI.get("/user/detail/", {
        headers: headers,
      });
    } catch (error) {
      result = error.response;
    } finally {
      const formattedResponse = getFormatedResponse(result);
      // console.log("formattedResponse: ", formattedResponse);
      return formattedResponse;
    }
  }
);

/**
 * userSlice is a user state management redux toolkit logic
 */
const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    clearSignupData: (state) => {
      state.signup = userInitialState.signup;
    },
    clearSigninData: (state) => {
      state.signin = userInitialState.signin;
    },
    checkUserSigninStatus: (state) => {
      const access_token = localStorage.getItem("access_token");
      if (access_token) {
        state.signin.isSignedIn = true;
      }
    },
    signOut: (state) => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      state.signin.isSignedIn = false;
      state.userDetail.data = {};
    },
  },
  extraReducers: {
    /** Handles the pending, fulfill and rejected condition of API request */
    /**
     * Signup reducers
     */
    [performSignup.pending]: (state) => {
      state.signup.isLoading = true;
    },
    [performSignup.fulfilled]: (state, action) => {
      state.signup.isLoading = false;
      state.signup.signupStatus = action.payload.status;
      if (action.payload.status === 200) {
        state.signup.userData = { ...action.payload.data };
      } else {
        state.signup.responseError = action.payload.data.detail;
      }
    },
    [performSignup.rejected]: (state, action) => {
      state.signup.isLoading = false;
      state.signup.signupStatus = action.payload.status;
      state.signup.responseError = action.payload.data;
    },
    /**
     * Signin reducers
     */
    [performSignin.pending]: (state) => {
      state.signin.isLoading = true;
    },
    [performSignin.fulfilled]: (state, action) => {
      // const access_token = localStorage.getItem("access_token");
      state.signin.isLoading = false;
      if (action.payload.status !== 200) {
        state.signin.signinError = action.payload.data;
        state.signin.signinStatus = action.payload.status;
      }
    },
    [performSignin.rejected]: (state, action) => {
      state.signin.isLoading = false;
      state.signin.signinError = action.payload.data;
      state.signin.signinStatus = action.payload.status;
    },

    //============================================================================
    /**
     * Get user detail
     */
    //============================================================================
    [getUserDetail.pending]: (state) => {
      state.userDetail.request.isLoading = true;
    },
    [getUserDetail.fulfilled]: (state, action) => {
      state.userDetail.request.isLoading = false;
      state.userDetail.response.status = action.payload.status;
      state.userDetail.data = action.payload.data;
    },
    [getUserDetail.rejected]: (state, action) => {
      state.userDetail.request.isLoading = false;
      state.userDetail.response.status = action.payload.status;
      state.userDetail.response.error = action.payload.data;
    },
  },
});

export const {
  clearSignupData,
  clearSigninData,
  checkUserSigninStatus,
  signOut,
} = userSlice.actions;

export default userSlice.reducer;
