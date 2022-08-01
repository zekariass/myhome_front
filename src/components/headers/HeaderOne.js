// @ts-nocheck
import React from "react";
import { Image, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Logo from "../commons/images/logo3.JPG";
import "./HeaderOne.css";
import MenuDropdown from "./MenuDropdown";
import { useSelector } from "react-redux";
import {
  PATH_AGENTS_SEARCH_ABSOLUTE,
  PATH_AGENT_CREATE_INFO_ABSOLUTE,
  PATH_AGENT_DASHBOARD,
  PATH_LANDING,
  PATH_SAVED_LISTINGS_ABSOLUTE,
  PATH_SIGNIN,
  PATH_SIGNUP,
} from "components/commons/Strings";

const HeaderOne = () => {
  const { currentPage } = useSelector((store) => store.global);
  const { isSignedIn } = useSelector((store) => store.user.signin);
  const agentExist = useSelector(
    (store) => store.agent.getAgent.response.data?.id
  );

  const getAddPropertyMenu = () => {
    // if (currentPage === "agentAdd") {
    //   return;
    // }

    // console.log("AGENTEXIST? ", agentExist);

    if (isSignedIn && agentExist !== undefined) {
      return (
        <NavLink
          // to={PATH_AGENT_CREATE_INFO_ABSOLUTE}
          // to={PATH_AGENT_DASHBOARD}
          // to={PATH_PROPERTY_FILE_UPLOAD_ABSOLUTE}
          to={PATH_AGENT_DASHBOARD}
          // to={PATH_AGENT_LOGO_UPLOAD_ABSOLUTE}
          className="link-general link-size-small mx-lg-5 "
        >
          Dashboard
        </NavLink>
      );
    }
    return (
      <NavLink
        to={PATH_AGENT_CREATE_INFO_ABSOLUTE}
        // to={PATH_PROPERTY_ADD_ABSOLUTE}
        // to={PATH_PROPERTY_FILE_UPLOAD_ABSOLUTE}
        // to={PATH_AGENT_DASHBOARD}
        className="link-general link-size-small mx-lg-5 "
      >
        List Your Property
      </NavLink>
    );
  };
  const getMenuByAuthStatus = () => {
    // console.log(localStorage.getItem("access_token") === "null");
    if (!isSignedIn) {
      return (
        <Nav>
          <NavLink
            to={PATH_SIGNIN}
            className="link-general link-size-small mx-lg-5"
          >
            Signin
          </NavLink>
          <NavLink to={PATH_SIGNUP} className="link-general link-size-small">
            Signup
          </NavLink>
        </Nav>
      );
    }

    return (
      <Nav>
        <NavLink
          to={PATH_SAVED_LISTINGS_ABSOLUTE}
          className="link-general link-size-small mx-lg-5"
        >
          Saved Listings
        </NavLink>
        {/* <NavLink to="#" className="link-general link-size-small"> */}
        <MenuDropdown />
        {/* </NavLink> */}
      </Nav>
    );
  };

  return (
    <Navbar collapseOnSelect bg="light" expand="lg" className="nav-bg py-4">
      <Navbar.Brand>
        <NavLink to={PATH_LANDING}>
          <Image
            src={Logo}
            className="d-inline-block align-top"
            alt="myhome logo"
            height="50px"
          />
        </NavLink>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav
          navbarScroll
          className="me-auto my-2"
          style={{ maxHeight: "100px" }}
        >
          {getAddPropertyMenu()}
          {/* <NavLink
            to={PATH_AGENT_DASHBOARD}
            className="link-general link-size-small mx-lg-5"
          >
            Dashboard
          </NavLink> */}
          <NavLink
            to={PATH_AGENTS_SEARCH_ABSOLUTE}
            className="link-general link-size-small"
          >
            Find an Agent
          </NavLink>
        </Nav>
        {getMenuByAuthStatus()}
        <NavLink to="/" className="link-general link-size-small mx-lg-5">
          En
          <span>
            <i className="world icon"></i>
          </span>
        </NavLink>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default HeaderOne;
