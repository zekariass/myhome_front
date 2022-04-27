import { configureStore } from "@reduxjs/toolkit";
import agentSlice from "features/agent/agentSlice";
import addressSlice from "features/common/addressSlice";
import globalSlice from "features/global/globalSlice";
import userSlice from "features/user/userSlice";

export const reduxStore = configureStore({
  reducer: {
    user: userSlice,
    global: globalSlice,
    agent: agentSlice,
    address: addressSlice,
  },
});
