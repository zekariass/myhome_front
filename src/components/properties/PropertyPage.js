import FooterTwo from "components/footers/FooterTwo";
import HeaderOne from "components/headers/HeaderOne";
import React from "react";
import { Outlet } from "react-router-dom";

const PropertyPage = () => {
  return (
    <>
      <HeaderOne />
      <Outlet />
      <div className="footer-bg">
        <FooterTwo />
      </div>
    </>
  );
};

export default PropertyPage;
