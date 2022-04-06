import React, { Component } from "react";
import { Image, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
// @ts-ignore
import Logo from "../images/logo3.JPG";
import "./HeaderOne.css";

class HeaderOne extends Component {
  render() {
    return (
      <Navbar collapseOnSelect bg="light" expand="lg" className="nav-bg">
        <Navbar.Brand>
          <NavLink to="home">
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
            <NavLink to="/hhh" className="link-general mx-lg-5 ">
              List Your Property
            </NavLink>
            <NavLink to="/link" className="link-general">
              Find an Agent
            </NavLink>
          </Nav>
          <Nav>
            <NavLink to="/sign-in" className="link-general mx-lg-5">
              Sign In
            </NavLink>
            <NavLink to="/" className="link-general">
              Sign Up
            </NavLink>
            <NavLink to="/" className="link-general mx-lg-5">
              En
              <span>
                <i className="world icon"></i>
              </span>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default HeaderOne;
