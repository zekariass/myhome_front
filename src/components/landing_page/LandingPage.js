import React, { Component } from "react";
import HeaderOne from "components/headers/HeaderOne";
import SearchArea from "./SearchArea";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import PropertyAlbum from "./PropertyAlbum";
import FeaturedLists from "./FeaturedLists";
import SearchByCity from "./SearchByCity";
import WhoAreYouArea from "./WhoAreYouArea";
import FooterOne from "components/footers/FooterOne";

class LandingPage extends Component {
  render() {
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

        <div className="container p-3 self-ad-jumbo rounded-3 my-3 shadow-sm">
          <p className="fs-4 self-ad-jumbo-txt flex-center-general ">
            List your property and reach millions. No extra effort to sale or
            rent your property
          </p>
          <Link to="/" className="flex-center-general link-self-ad">
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
          <FeaturedLists />
        </div>
        <div className="who-are-you-area">
          <WhoAreYouArea />
        </div>
        <div className="footer-bg">
          <FooterOne />
        </div>
      </div>
    );
  }
}

export default LandingPage;
