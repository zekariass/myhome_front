import {
  PATH_AGENT_DASHBOARD,
  PATH_AGENT_DASHBOARD_AGENT_INFO_ABSOLUTE,
  PATH_AGENT_DASHBOARD_ALLPURPOSEPROPERTY_LIST_ABSOLUTE,
  PATH_AGENT_DASHBOARD_APARTMENT_LIST_ABSOLUTE,
  PATH_AGENT_DASHBOARD_COMMERCIALPROPERTY_LIST_ABSOLUTE,
  PATH_AGENT_DASHBOARD_CONDOMINIUM_LIST_ABSOLUTE,
  PATH_AGENT_DASHBOARD_HALL_LIST_ABSOLUTE,
  PATH_AGENT_DASHBOARD_LAND_LIST_ABSOLUTE,
  PATH_AGENT_DASHBOARD_OFFICE_LIST_ABSOLUTE,
  PATH_AGENT_DASHBOARD_PROPERTY_LIST_ABSOLUTE,
  PATH_AGENT_DASHBOARD_SHAREHOUSE_LIST_ABSOLUTE,
  PATH_AGENT_DASHBOARD_TRADITIONAL_HOUSE_LIST_ABSOLUTE,
  PATH_AGENT_DASHBOARD_VILLA_LIST_ABSOLUTE,
  PATH_LANDING,
} from "components/commons/Strings";
import React from "react";
import { Link } from "react-router-dom";

const AgentDashboardSidebar = () => {
  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse-horizontal collapsed overflow-auto "
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
            <Link
              className="link-general link-size-xsmall nav-link"
              to={PATH_AGENT_DASHBOARD_APARTMENT_LIST_ABSOLUTE}
            >
              <span data-feather="file"></span>
              Apartments
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="link-general link-size-xsmall nav-link"
              to={PATH_AGENT_DASHBOARD_VILLA_LIST_ABSOLUTE}
            >
              <span data-feather="shopping-cart"></span>
              Villas
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="link-general link-size-xsmall nav-link"
              to={PATH_AGENT_DASHBOARD_CONDOMINIUM_LIST_ABSOLUTE}
            >
              <span data-feather="users"></span>
              Condominiums
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="link-general link-size-xsmall nav-link"
              to={PATH_AGENT_DASHBOARD_TRADITIONAL_HOUSE_LIST_ABSOLUTE}
            >
              <span data-feather="bar-chart-2"></span>
              Traditional Houses
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="link-general link-size-xsmall nav-link"
              to={PATH_AGENT_DASHBOARD_COMMERCIALPROPERTY_LIST_ABSOLUTE}
            >
              <span data-feather="layers"></span>
              Commercial Properties
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="link-general link-size-xsmall nav-link"
              to={PATH_AGENT_DASHBOARD_SHAREHOUSE_LIST_ABSOLUTE}
            >
              <span data-feather="file"></span>
              Share houses
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="link-general link-size-xsmall nav-link"
              to={PATH_AGENT_DASHBOARD_OFFICE_LIST_ABSOLUTE}
            >
              <span data-feather="users"></span>
              Offices
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="link-general link-size-xsmall nav-link"
              to={PATH_AGENT_DASHBOARD_LAND_LIST_ABSOLUTE}
            >
              <span data-feather="bar-chart-2"></span>
              Lands
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="link-general link-size-xsmall nav-link"
              to={PATH_AGENT_DASHBOARD_HALL_LIST_ABSOLUTE}
            >
              <span data-feather="shopping-cart"></span>
              Halls
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="link-general link-size-xsmall nav-link"
              to={PATH_AGENT_DASHBOARD_ALLPURPOSEPROPERTY_LIST_ABSOLUTE}
            >
              <span data-feather="shopping-cart"></span>
              All Purpose Properties
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
              Active Listings
            </Link>
          </li>
          <li className="nav-item">
            <Link className="link-general link-size-xsmall nav-link" to="#">
              <span data-feather="file-text"></span>
              Expired Listings
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
