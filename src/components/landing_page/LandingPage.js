// @ts-nocheck
import React, { useEffect } from "react";
import HeaderOne from "components/headers/HeaderOne";
import SearchArea from "./SearchArea";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import PropertyAlbum from "./PropertyAlbum";
import SearchByCity from "./SearchByCity";
import WhoAreYouArea from "./WhoAreYouArea";
import FooterOne from "components/footers/FooterOne";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "features/global/globalSlice";
import {
  PATH_AGENT_CREATE_INFO_ABSOLUTE,
  PATH_AGENT_DASHBOARD,
} from "components/commons/Strings";
import FeaturedListing from "./FeaturedListing";
import { getFeaturedListings } from "features/listing/publicListingSlice";

const LandingPage = () => {
  const dispatch = useDispatch();

  const agentData = useSelector((store) => store.agent.getAgent.response.data);

  useEffect(() => {
    dispatch(setCurrentPage("landingPage"));
  }, []);
  return (
    <div>
      {/* Header part */}

      <div className="mx-3">
        <HeaderOne />
      </div>

      {/* Search area part */}

      <div className="slidder-bg flex-center-general">
        <SearchArea />
      </div>

      {/* Self advertisement part */}

      <div className="container p-3  rounded-3 mt-5 shadow-sm card bg-dark" >
        <p className="fs-5 self-ad-jumbo-txt flex-center-general ">
          List your property and reach millions. No extra effort to sale or rent
          your property
        </p>
        <Link
          to={
            agentData?.id !== undefined
              ? PATH_AGENT_DASHBOARD
              : PATH_AGENT_CREATE_INFO_ABSOLUTE
          }
          className="flex-center-general link-general link-size-normal link-underline"
        >
          List Your Property Here
        </Link>
      </div>

      {/* Property Album */}

      <div>
        <PropertyAlbum />
      </div>
      <div>
        <SearchByCity />
      </div>
      <div>
        <FeaturedListing />
      </div>
      <div className="who-are-you-area">
        <WhoAreYouArea />
      </div>
      <div className="footer-bg">
        <FooterOne />
      </div>
    </div>
  );
};

export default LandingPage;
