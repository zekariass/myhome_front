// @ts-nocheck
import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./landing_page/LandingPage";
import "./General.css";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import SavedProperties from "./properties/SavedProperties";
import { checkUserSigninStatus } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./commons/ProtectedRoute";
import {
  PATH_ADD_PROPERTY,
  PATH_AGENTS_ADD,
  PATH_AGENTS_HOME,
  PATH_AGENTS_SEARCH,
  PATH_AGENT_CREATE_INFO,
  PATH_AGENT_DASHBOARD,
  PATH_AGENT_DASHBOARD_AGENT_INFO,
  PATH_AGENT_DASHBOARD_EDUCATION_FACILITY_ADD,
  PATH_AGENT_DASHBOARD_PROPERTY,
  PATH_AGENT_DASHBOARD_PROPERTY_ADD,
  PATH_AGENT_DASHBOARD_PROPERTY_ADDRESS_EDIT,
  PATH_AGENT_DASHBOARD_PROPERTY_DETAIL,
  PATH_AGENT_DASHBOARD_PROPERTY_DETAIL_ABSOLUTE,
  PATH_AGENT_DASHBOARD_PROPERTY_EDIT,
  PATH_AGENT_DASHBOARD_PROPERTY_FILE_UPLOAD,
  PATH_AGENT_DASHBOARD_PROPERTY_LIST,
  PATH_AGENT_DASHBOARD_STAT,
  PATH_AGENT_LOGO_UPLOAD,
  PATH_DYNAMIC_PROPERTY,
  PATH_LANDING,
  PATH_PAGE_NOT_FOUND,
  PATH_PROPERTY_ADD,
  PATH_PROPERTY_FILE_UPLOAD,
  PATH_PROPERTY_HOME,
  PATH_SAVED_PROPETRTIES,
  PATH_SIGNIN,
  PATH_SIGNUP,
} from "./commons/Strings";
import AgentsList from "./agents/AgentsList";
import AgentsPage from "./agents/AgentsPage";
import AgentFormWizard from "./agents/new_agent/AgentFormWizard";
import AgentSearch from "./agents/AgentSearch";
import AgentCreateInfo from "./agents/new_agent/AgentCreateInfo";
import AgentLogo from "./agents/new_agent/AgentLogoOld";
import PropertyPage from "./properties/PropertyPage";
import PropertyFormWizard from "./properties/PropertyFormWizard";
import PropertyPictureUpload from "./properties/forms/FileUploadInput";
import PropertyFileUpload from "./properties/forms/PropertyFileUpload";
import AgentDashboard from "./agents/dashboard/AgentDashboard";
import AgentDashboardStat from "./agents/dashboard/AgentDashboardStat";
import AgentPreview from "./agents/AgentPreview";
import { getAgent } from "features/agent/agentSlice";
import AgentLogoUpload from "./agents/new_agent/AgentLogoUpload";
import PropertyList from "./agents/dashboard/properties/PropertyList";
import PropertyDetail from "./agents/dashboard/properties/PropertyDetail";
import { getSystemParams } from "features/system/paramSlice";
import ConditionalEdit from "./agents/dashboard/properties/ParentPropertyEdit";
import PropertyAddressEdit from "./agents/dashboard/properties/PropertyAddressEdit";
import ParentPropertyEdit from "./agents/dashboard/properties/ParentPropertyEdit";
import EducationFacility from "./agents/dashboard/properties/EducationFacility";

const App = () => {
  const { isSignedIn } = useSelector((store) => store.user.signin);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserSigninStatus());
    dispatch(getSystemParams());
    if (isSignedIn) {
      dispatch(getAgent());
    }
  }, [isSignedIn]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH_SIGNUP} element={<Signup />} />
        <Route
          path={PATH_SIGNIN}
          element={!isSignedIn ? <Signin /> : <Navigate to={PATH_LANDING} />}
        />
        <Route path={PATH_LANDING} element={<LandingPage />} />
        <Route path={PATH_SAVED_PROPETRTIES} element={<SavedProperties />} />
        <Route
          path={PATH_PAGE_NOT_FOUND}
          element={<h4>Page not found, 404!</h4>}
        />
        <Route
          path={PATH_ADD_PROPERTY}
          element={
            <ProtectedRoute redirectPath={PATH_SIGNIN}>
              <PropertyFormWizard />
            </ProtectedRoute>
          }
        />

        <Route path={PATH_AGENTS_HOME} element={<AgentsPage />}>
          <Route element={<ProtectedRoute redirectPath={PATH_SIGNIN} />}>
            <Route path={PATH_AGENTS_ADD} element={<AgentFormWizard />} />
            <Route path={PATH_AGENTS_SEARCH} element={<AgentSearch />} />
            <Route
              path={PATH_AGENT_CREATE_INFO}
              element={<AgentCreateInfo />}
            />
            <Route
              path={PATH_AGENT_LOGO_UPLOAD}
              element={<AgentLogoUpload />}
            />
            {/* <Route path={PATH_AGENT_DASHBOARD} element={<AgentDashboard />} /> */}
          </Route>
          <Route index element={<AgentsList />} />
          {/* <Route path={PATH_AGENTS_ADD} element={<AgentFormWizard />} /> */}
        </Route>
        <Route path={PATH_AGENT_DASHBOARD} element={<AgentDashboard />}>
          <Route element={<ProtectedRoute redirectPath={PATH_SIGNIN} />}>
            <Route
              // path={PATH_AGENT_DASHBOARD_STAT}
              index
              element={<AgentDashboardStat />}
            />
            <Route
              path={PATH_AGENT_DASHBOARD_AGENT_INFO}
              element={<AgentPreview />}
            />
            <Route path={PATH_AGENT_DASHBOARD_PROPERTY}>
              <Route
                path={PATH_AGENT_DASHBOARD_PROPERTY_ADD}
                element={<PropertyFormWizard />}
              />
              <Route
                path={PATH_AGENT_DASHBOARD_PROPERTY_FILE_UPLOAD}
                element={<PropertyFileUpload />}
              />
              <Route
                path={PATH_AGENT_DASHBOARD_PROPERTY_LIST}
                element={<PropertyList />}
              />
              <Route
                path={PATH_AGENT_DASHBOARD_PROPERTY_DETAIL}
                element={<PropertyDetail />}
              />

              <Route
                path={PATH_AGENT_DASHBOARD_PROPERTY_ADDRESS_EDIT}
                element={<PropertyAddressEdit />}
              />
              <Route
                path={PATH_AGENT_DASHBOARD_PROPERTY_EDIT}
                element={<ParentPropertyEdit />}
              />

              <Route
                path={`${PATH_DYNAMIC_PROPERTY}/${PATH_AGENT_DASHBOARD_EDUCATION_FACILITY_ADD}`}
                element={<EducationFacility />}
              />
            </Route>
          </Route>
        </Route>
        <Route path={PATH_PROPERTY_HOME} element={<PropertyPage />}>
          <Route path={PATH_PROPERTY_ADD} element={<PropertyFormWizard />} />
          <Route
            path={PATH_PROPERTY_FILE_UPLOAD}
            element={<PropertyFileUpload />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
