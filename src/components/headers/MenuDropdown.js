// @ts-nocheck
import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "features/user/userSlice";
import { PATH_LANDING } from "components/commons/Strings";

const MenuDropdown = ({ dropdownItems, title }) => {
  return (
    <NavDropdown
      id="nav-dropdown-dark-example "
      title={title}
      menuVariant="light"
      bsPrefix="link-general link-size-small"
    >
      {/* <NavDropdown.Item>
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
      </NavDropdown.Item> */}
      {dropdownItems()}
    </NavDropdown>
  );
};

export default MenuDropdown;
