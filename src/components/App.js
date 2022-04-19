import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./landing_page/LandingPage";
import "./General.css";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import SavedProperties from "./properties/SavedProperties";
import { checkUserSigninStatus } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import ProtectedRoute from "./commons/ProtectedRoute";
import AddProperty from "./properties/AddProperty";
import {
  PATH_ADD_PROPERTY,
  PATH_AGENTS_ADD,
  PATH_AGENTS_HOME,
  PATH_AGENTS_LIST,
  PATH_AGENTS_SEARCH,
  PATH_LANDING,
  PATH_PAGE_NOT_FOUND,
  PATH_SAVED_PROPETRTIES,
  PATH_SIGNIN,
  PATH_SIGNUP,
} from "./commons/Strings";
import AgentsList from "./agents/AgentsList";
import AgentsPage from "./agents/AgentsPage";
import AgentAdd from "./agents/AgentAdd";
import AgentSearch from "./agents/AgentSearch";

const App = () => {
  const dispatch = useDispatch();
  dispatch(checkUserSigninStatus());
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH_SIGNUP} element={<Signup />} />
        <Route path={PATH_SIGNIN} element={<Signin />} />
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
          <Route index element={<AgentsList />} />
          <Route path={PATH_AGENTS_ADD} element={<AgentAdd />} />
          <Route path={PATH_AGENTS_SEARCH} element={<AgentSearch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
