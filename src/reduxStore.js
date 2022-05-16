import { configureStore } from "@reduxjs/toolkit";
import agentSlice from "features/agent/agentSlice";
import addressSlice from "features/common/addressSlice";
import globalSlice from "features/global/globalSlice";
import buildingTypeSlice from "features/property/buildingTypeSlice";
import houseTypeSlice from "features/property/houseTypeSlice";
import propertyCategorySlice from "features/property/propertyCategorySlice";
import propertySlice from "features/property/propertySlice";
import wizardSlice from "features/common/wizardSlice";
import userSlice from "features/user/userSlice";

export const reduxStore = configureStore({
  reducer: {
    user: userSlice,
    global: globalSlice,
    agent: agentSlice,
    address: addressSlice,
    property: propertySlice,
    propertyCategory: propertyCategorySlice,
    houseType: houseTypeSlice,
    buildingType: buildingTypeSlice,
    propertyWizard: wizardSlice,
  },
});
