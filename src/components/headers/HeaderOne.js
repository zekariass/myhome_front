// @ts-nocheck
import React from "react";
import { Image, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../commons/images/logo3.JPG";
import "./HeaderOne.css";
import MenuDropdown from "./MenuDropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  PATH_AGENTS_SEARCH_ABSOLUTE,
  PATH_AGENT_CREATE_INFO_ABSOLUTE,
  PATH_AGENT_DASHBOARD,
  PATH_LANDING,
  PATH_SAVED_LISTINGS_ABSOLUTE,
  PATH_SIGNIN,
  PATH_SIGNUP,
} from "components/commons/Strings";
import { useEffect } from "react";
import { useState } from "react";
import { signOut } from "features/user/userSlice";

const HeaderOne = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const { currentPage } = useSelector((store) => store.global);
  // const { isSignedIn } = useSelector((store) => store.user.signin);
  const agentExist = useSelector(
    (store) => store.agent.getAgent.response.data?.id
  );

  const userDetail = useSelector((store) => store.user.userDetail.data);
  // console.log("HHHHHHHH+++++: ", typeof userDetail?.has_agent);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
  });

  const handleSignout = () => {
    dispatch(signOut());
    navigate(PATH_LANDING, { replace: true }); // Go to landing page after signout
  };

  const getAddPropertyMenu = () => {
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
        to={
          userDetail?.has_agent
            ? PATH_AGENT_DASHBOARD
            : PATH_AGENT_CREATE_INFO_ABSOLUTE
        }
        // to={PATH_PROPERTY_ADD_ABSOLUTE}
        // to={PATH_PROPERTY_FILE_UPLOAD_ABSOLUTE}
        // to={PATH_AGENT_DASHBOARD}
        className="link-general link-size-small mx-lg-5 "
      >
        List Your Property
      </NavLink>
    );
  };

  const userDropDownItems = () => {
    return (
      <>
        <NavDropdown.Item>
          <NavLink to="" className="link-general link-size-small">
            Notifications
          </NavLink>
        </NavDropdown.Item>
        <NavDropdown.Item>
          <NavLink to="" className="link-general link-size-small">
            Messages
          </NavLink>
        </NavDropdown.Item>
        <NavDropdown.Item>
          <NavLink to="" className="link-general link-size-small">
            Something
          </NavLink>
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={() => handleSignout()}>
          <NavLink to="" className="link-general link-size-small">
            Signout
          </NavLink>
        </NavDropdown.Item>
      </>
    );
  };

  const languageDropdownItems = () => {
    return (
      <>
        <NavDropdown.Item>
          <NavLink to="" className="link-general link-size-small">
            Eng
          </NavLink>
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item>
          <NavLink to="" className="link-general link-size-small">
            Amh
          </NavLink>
        </NavDropdown.Item>
        <NavDropdown.Divider />

        <NavDropdown.Item>
          <NavLink to="" className="link-general link-size-small">
            Oro
          </NavLink>
        </NavDropdown.Item>
        <NavDropdown.Divider />

        <NavDropdown.Item>
          <NavLink to="" className="link-general link-size-small">
            Tig
          </NavLink>
        </NavDropdown.Item>
      </>
    );
  };

  const getMenuByAuthStatus = () => {
    if (!isSignedIn) {
      return (
        <Nav>
          <NavLink
            to={PATH_SIGNIN}
            className="link-general link-size-small mx-lg-5"
          >
            <i className="large sign in icon"></i>
            <span className="px-2"> Signin</span>
          </NavLink>
          <NavLink to={PATH_SIGNUP} className="link-general link-size-small">
            <i className="large user plus icon "></i>

            <span className="px-2">Signup</span>
          </NavLink>
        </Nav>
      );
    }

    return (
      <Nav className="">
        <NavLink
          to={PATH_SAVED_LISTINGS_ABSOLUTE}
          className="link-general link-size-small mx-lg-5"
        >
          <i className="large save icon"></i>
          Saved Listings
        </NavLink>
        <div className="row row-cols-auto g-0">
          <div className="col">
            <i className="user icon link-general"></i>
          </div>
          <div className="col">
            <MenuDropdown
              dropdownItems={userDropDownItems}
              title={userDetail?.first_name}
            />
          </div>
        </div>
      </Nav>
    );
  };

  return (
    <Navbar
      collapseOnSelect
      bg="light"
      expand="lg"
      className="nav-bg py-2 ms-5 me-4"
    >
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
          <NavLink
            to={PATH_AGENTS_SEARCH_ABSOLUTE}
            className="link-general link-size-small"
          >
            Find an Agent
          </NavLink>
        </Nav>
        {getMenuByAuthStatus()}
        <Nav className="me-5 px-lg-5">
          <div className="row row-cols-auto g-2 ps-2">
            <MenuDropdown dropdownItems={languageDropdownItems} title="Lang" />
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default HeaderOne;
