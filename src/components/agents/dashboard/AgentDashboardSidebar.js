import {
  PATH_AGENT_DASHBOARD,
  PATH_AGENT_DASHBOARD_AGENT_INFO_ABSOLUTE,
  PATH_AGENT_DASHBOARD_PROPERTY_LIST_ABSOLUTE,
  PATH_LANDING,
} from "components/commons/Strings";
import React from "react";
import { Link } from "react-router-dom";

const AgentDashboardSidebar = () => {
  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div className="position-sticky pt-3 mt-2">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link
              className="link-general link-size-xsmall nav-link active"
              aria-current="page"
              to={PATH_AGENT_DASHBOARD}
            >
              <span data-feather="home"></span>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="link-general link-size-xsmall nav-link"
              to={PATH_AGENT_DASHBOARD_PROPERTY_LIST_ABSOLUTE}
            >
              <span data-feather="file"></span>
              Properties
            </Link>
          </li>
          <li className="nav-item">
            <Link className="link-general link-size-xsmall nav-link" to="#">
              <span data-feather="file"></span>
              Apartments
            </Link>
          </li>
          <li className="nav-item">
            <Link className="link-general link-size-xsmall nav-link" to="#">
              <span data-feather="shopping-cart"></span>
              Villas
            </Link>
          </li>
          <li className="nav-item">
            <Link className="link-general link-size-xsmall nav-link" to="#">
              <span data-feather="users"></span>
              Condominiums
            </Link>
          </li>
          <li className="nav-item">
            <Link className="link-general link-size-xsmall nav-link" to="#">
              <span data-feather="bar-chart-2"></span>
              Traditional Houses
            </Link>
          </li>
          <li className="nav-item">
            <Link className="link-general link-size-xsmall nav-link" to="#">
              <span data-feather="layers"></span>
              Commercial Properties
            </Link>
          </li>
        </ul>

        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>More</span>
          <Link className="link-secondary" to="#" aria-label="Add a new report">
            <span data-feather="plus-circle"></span>
          </Link>
        </h6>
        <ul className="nav flex-column mb-2">
          <li className="nav-item">
            <Link
              className="link-general link-size-xsmall nav-link"
              to={PATH_AGENT_DASHBOARD_AGENT_INFO_ABSOLUTE}
            >
              <span data-feather="file-text"></span>
              Your Agent
            </Link>
          </li>
          <li className="nav-item">
            <Link className="link-general link-size-xsmall nav-link" to="#">
              <span data-feather="file-text"></span>
              Last quarter
            </Link>
          </li>
          <li className="nav-item">
            <Link className="link-general link-size-xsmall nav-link" to="#">
              <span data-feather="file-text"></span>
              Social engagement
            </Link>
          </li>
          <li className="nav-item">
            <Link className="link-general link-size-xsmall nav-link" to="#">
              <span data-feather="file-text"></span>
              Year-end sale
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AgentDashboardSidebar;
