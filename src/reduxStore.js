import { configureStore } from "@reduxjs/toolkit";
import userSlice from "features/user/userSlice";

export const reduxStore = configureStore({
  reducer: {
    user: userSlice,
  },
});
