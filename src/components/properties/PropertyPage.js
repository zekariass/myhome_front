import FooterTwo from "components/footers/FooterTwo";
import HeaderOne from "components/headers/HeaderOne";
import { getPropertyCategories } from "features/property/propertyCategorySlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import "./Property.css";

const PropertyPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPropertyCategories());
  }, []);
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
