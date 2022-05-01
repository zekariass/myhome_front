// @ts-nocheck
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./landing_page/LandingPage";
import "./General.css";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import SavedProperties from "./properties/SavedProperties";
import { checkUserSigninStatus } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./commons/ProtectedRoute";
import AddProperty from "./properties/PropertyAdd";
import {
  PATH_ADD_PROPERTY,
  PATH_AGENTS_ADD,
  PATH_AGENTS_HOME,
  PATH_AGENTS_SEARCH,
  PATH_AGENT_CREATE_INFO,
  PATH_AGENT_LOGO_UPLOAD,
  PATH_LANDING,
  PATH_PAGE_NOT_FOUND,
  PATH_PROPERTY_ADD,
  PATH_PROPERTY_HOME,
  PATH_SAVED_PROPETRTIES,
  PATH_SIGNIN,
  PATH_SIGNUP,
} from "./commons/Strings";
import AgentsList from "./agents/AgentsList";
import AgentsPage from "./agents/AgentsPage";
import AgentAdd from "./agents/new_agent/AgentAdd";
import AgentSearch from "./agents/AgentSearch";
import AgentCreateInfo from "./agents/new_agent/AgentCreateInfo";
import AgentLogo from "./agents/new_agent/AgentLogo";
import PropertyPage from "./properties/PropertyPage";
import PropertyAdd from "./properties/PropertyAdd";

const App = () => {
  const dispatch = useDispatch();
  dispatch(checkUserSigninStatus());
  const { isSignedIn } = useSelector((store) => store.user.signin);
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
              <AddProperty />
            </ProtectedRoute>
          }
        />

        <Route path={PATH_AGENTS_HOME} element={<AgentsPage />}>
          <Route element={<ProtectedRoute redirectPath={PATH_SIGNIN} />}>
            <Route path={PATH_AGENTS_ADD} element={<AgentAdd />} />
            <Route path={PATH_AGENTS_SEARCH} element={<AgentSearch />} />
            <Route
              path={PATH_AGENT_CREATE_INFO}
              element={<AgentCreateInfo />}
            />
            <Route path={PATH_AGENT_LOGO_UPLOAD} element={<AgentLogo />} />
          </Route>
          <Route index element={<AgentsList />} />
          {/* <Route path={PATH_AGENTS_ADD} element={<AgentAdd />} /> */}
        </Route>
        <Route path={PATH_PROPERTY_HOME} element={<PropertyPage />}>
          <Route path={PATH_PROPERTY_ADD} element={<PropertyAdd />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
