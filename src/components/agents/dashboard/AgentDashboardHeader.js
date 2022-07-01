import {
  COMPANY_NAME,
  PATH_AGENT_DASHBOARD_LISTING_LIST_ABSOLUTE,
  PATH_AGENT_DASHBOARD_PROPERTY_ADD_ABSOLUTE,
  PATH_LANDING,
} from "components/commons/Strings";
import { setListingKey } from "features/listing/listingSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const AgentDashboardHeader = () => {
  const dispatch = useDispatch();

  const setListingKeyValue = () => {
    dispatch(setListingKey("byAgent"));
  };
  return (
    <div className="sticky-top">
      <header className="navbar navbar-dark bg-light flex-md-nowrap p-2 shadow-sm">
        <Link
          className="link-general navbar-brand col-md-3 col-lg-2 me-0 px-3"
          to={PATH_LANDING}
        >
          {COMPANY_NAME}
        </Link>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed btn-general"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <input
          className="form-control form-control-dark w-100"
          type="text"
          placeholder="Search"
          aria-label="Search"
        />
        <div className="navbar-nav">
          <div className="nav-item text-nowrap">
            <Link
              className="link-general link-size-small nav-link px-3 text-black"
              to={PATH_AGENT_DASHBOARD_PROPERTY_ADD_ABSOLUTE}
              // to={PATH_AGENT_DASHBOARD_PROPERTY_FILE_UPLOAD_ABSOLUTE}
            >
              New Property
            </Link>
          </div>
        </div>
        <div className="navbar-nav">
          <div className="nav-item text-nowrap">
            <Link
              className="link-general link-size-small nav-link px-3"
              onClick={setListingKeyValue}
              to={PATH_AGENT_DASHBOARD_LISTING_LIST_ABSOLUTE}
              state={{ data: null }}
            >
              Listings
            </Link>
          </div>
        </div>
        <div className="navbar-nav">
          <div className="nav-item text-nowrap">
            <Link className="link-general link-size-small nav-link px-3" to="#">
              Sign out
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
};

export default AgentDashboardHeader;
