import { configureStore } from "@reduxjs/toolkit";
import agentSlice from "features/agent/agentSlice";
import addressSlice from "features/common/addressSlice";
import globalSlice from "features/global/globalSlice";
import buildingTypeSlice from "features/agent_dashboard/property/buildingTypeSlice";
import houseTypeSlice from "features/agent_dashboard/property/houseTypeSlice";
import propertyCategorySlice from "features/agent_dashboard/property/propertyCategorySlice";
import propertySlice from "features/agent_dashboard/property/propertySlice";
import wizardSlice from "features/common/wizardSlice";
import userSlice from "features/user/userSlice";
import propertyFileSlice from "features/agent_dashboard/property/propertyFileSlice";
import paramSlice from "features/system/paramSlice";

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
    propertyFile: propertyFileSlice,
    system: paramSlice,
  },
});
