import FooterOne from "components/footers/FooterOne";
import HeaderOne from "components/headers/HeaderOne";
import React from "react";
import { Outlet } from "react-router-dom";
import "./PublicListing.css";

const PublicListingHome = () => {
  return (
    <div>
      <div className="mx-3">
        <HeaderOne />
      </div>
      <Outlet />
      <div className="footer-bg bg-light">
        <FooterOne />
      </div>
    </div>
  );
};

export default PublicListingHome;
