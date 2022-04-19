// @ts-nocheck
import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "features/user/userSlice";
import { PATH_LANDING } from "components/commons/Strings";

const MenuDropdown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignout = () => {
    dispatch(signOut());
    navigate(PATH_LANDING, { replace: true }); // Go to landing page after signout
  };

  return (
    <NavDropdown
      id="nav-dropdown-dark-example"
      title="Zekarias"
      menuVariant="light"
      bsPrefix="link-general"
    >
      <NavDropdown.Item>
        <NavLink to="" className="dropdown-item-general">
          Notifications
        </NavLink>
      </NavDropdown.Item>
      <NavDropdown.Item>
        <NavLink to="" className="dropdown-item-general">
          Messages
        </NavLink>
      </NavDropdown.Item>
      <NavDropdown.Item>
        <NavLink to="" className="dropdown-item-general">
          Something
        </NavLink>
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item>
        <Nav.Item
          onClick={() => handleSignout()}
          className="dropdown-item-general"
        >
          Signout
        </Nav.Item>
      </NavDropdown.Item>
    </NavDropdown>
  );
};

export default MenuDropdown;
