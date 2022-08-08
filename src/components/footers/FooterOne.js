// @ts-nocheck
import React, { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./Footer.css";
import GooglePlay from "./images/google_play.png";
import AppStore from "./images/app_store.jpg";
import {
  APARTMENT_KEY,
  COMPANY_NAME,
  CONDOMINIUM_KEY,
  PATH_AGENTS_SEARCH,
  PATH_AGENTS_SEARCH_ABSOLUTE,
  PATH_PUBLIC_LISTING,
  TRADITIONAL_HOUSE_KEY,
  VILLA_KEY,
} from "../commons/Strings";
import { useDispatch, useSelector } from "react-redux";
import {
  getListingInitialSearchParams,
  getPropertyCategoryByCategoryKey,
} from "components/commons/functions";
import {
  clearPublicListing,
  setSearchParams,
} from "features/listing/publicListingSlice";
import { getPopularCities } from "features/common/addressSlice";

const FooterOne = () => {
  // const storedSearchParams = useSelector(
  //   (store) => store.publicListing.searchParams.params
  // );

  const propertyCategories = useSelector(
    (store) => store.propertyCategory.propertyCategoryList.response.data
  );

  const popularCities = useSelector(
    (store) => store.address.city.popularCityList.data
  );

  // const [urlSearchParams, setUrlSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPopularCities());
  }, []);

  const onFooterLinkClick = (newParams) => {
    const initialSearchParams = {
      ...getListingInitialSearchParams(),
      ...newParams,
    };

    dispatch(clearPublicListing());
    dispatch(setSearchParams(initialSearchParams));

    // setUrlSearchParams(initialSearchParams);

    let urlParm = "";

    Object.keys(initialSearchParams).forEach((paramKey) => {
      urlParm += `${paramKey}=${initialSearchParams[paramKey]}&`;
    });

    urlParm = urlParm.substring(0, urlParm.length - 1);

    navigate(`${PATH_PUBLIC_LISTING}?${urlParm}`);
  };

  return (
    <div>
      <div className="container">
        <footer className="py-5">
          <div className="row row-cols-1 row-cols-sm-1 row-cols-lg-4 g-5">
            <div className="col">
              <ul className="nav flex-column d-flex align-items-center align-items-md-start">
                <h5>Properties</h5>
                <li className="nav-item mb-2">
                  <div
                    role="button"
                    className="footer-link p-0 text-muted"
                    onClick={() =>
                      onFooterLinkClick({ for_rent: true, for_sale: false })
                    }
                  >
                    Properties for rent
                  </div>
                </li>
                <li className="nav-item mb-2">
                  <div
                    role="button"
                    className="footer-link p-0 text-muted"
                    onClick={() =>
                      onFooterLinkClick({ for_rent: false, for_sale: true })
                    }
                  >
                    Properties for sale
                  </div>
                </li>
                <li className="nav-item mb-2">
                  <div
                    role="button"
                    className="footer-link p-0 text-muted"
                    onClick={() =>
                      onFooterLinkClick({
                        for_rent: true,
                        for_sale: false,
                        property_category: getPropertyCategoryByCategoryKey(
                          propertyCategories,
                          CONDOMINIUM_KEY
                        )?.id,
                      })
                    }
                  >
                    Condominiums for rent
                  </div>
                </li>
                <li className="nav-item mb-2">
                  <div
                    role="button"
                    className="footer-link p-0 text-muted"
                    onClick={() =>
                      onFooterLinkClick({
                        for_rent: false,
                        for_sale: true,
                        property_category: getPropertyCategoryByCategoryKey(
                          propertyCategories,
                          CONDOMINIUM_KEY
                        )?.id,
                      })
                    }
                  >
                    Condominiums for sale
                  </div>
                </li>
                <li className="nav-item mb-2">
                  <div
                    role="button"
                    className="footer-link p-0 text-muted"
                    onClick={() =>
                      onFooterLinkClick({
                        for_rent: true,
                        for_sale: false,
                        property_category: getPropertyCategoryByCategoryKey(
                          propertyCategories,
                          TRADITIONAL_HOUSE_KEY
                        )?.id,
                      })
                    }
                  >
                    Traditional home for rent
                  </div>
                </li>
                <li className="nav-item mb-2">
                  <div
                    role="button"
                    className="footer-link p-0 text-muted"
                    onClick={() =>
                      onFooterLinkClick({
                        for_rent: false,
                        for_sale: true,
                        property_category: getPropertyCategoryByCategoryKey(
                          propertyCategories,
                          TRADITIONAL_HOUSE_KEY
                        )?.id,
                      })
                    }
                  >
                    Traditional home for sale
                  </div>
                </li>
                <li className="nav-item mb-2">
                  <div
                    role="button"
                    className="footer-link p-0 text-muted"
                    onClick={() =>
                      onFooterLinkClick({
                        for_rent: true,
                        for_sale: false,
                        property_category: getPropertyCategoryByCategoryKey(
                          propertyCategories,
                          VILLA_KEY
                        )?.id,
                      })
                    }
                  >
                    Villa for rent
                  </div>
                </li>
                <li className="nav-item mb-2">
                  <div
                    role="button"
                    className="footer-link p-0 text-muted"
                    onClick={() =>
                      onFooterLinkClick({
                        for_rent: false,
                        for_sale: true,
                        property_category: getPropertyCategoryByCategoryKey(
                          propertyCategories,
                          VILLA_KEY
                        )?.id,
                      })
                    }
                  >
                    Villa fo sale
                  </div>
                </li>
                <li className="nav-item mb-2">
                  <div
                    role="button"
                    className="footer-link p-0 text-muted"
                    onClick={() =>
                      onFooterLinkClick({
                        for_rent: true,
                        for_sale: false,
                        property_category: getPropertyCategoryByCategoryKey(
                          propertyCategories,
                          APARTMENT_KEY
                        )?.id,
                      })
                    }
                  >
                    Apartment for rent
                  </div>
                </li>
                <li className="nav-item mb-2">
                  <div
                    role="button"
                    className="footer-link p-0 text-muted"
                    onClick={() =>
                      onFooterLinkClick({
                        for_rent: false,
                        for_sale: true,
                        property_category: getPropertyCategoryByCategoryKey(
                          propertyCategories,
                          APARTMENT_KEY
                        )?.id,
                      })
                    }
                  >
                    Apartment fo sale
                  </div>
                </li>
              </ul>
            </div>

            {!!popularCities.length && (
              <div className="col">
                <ul className="nav flex-column d-flex align-items-center align-items-md-start">
                  <h5>Popular locations</h5>
                  {popularCities.map((city) => (
                    <li className="nav-item mb-2" key={city?.id}>
                      <div
                        role="button"
                        className="footer-link p-0 text-muted"
                        onClick={() =>
                          onFooterLinkClick({
                            for_rent: true,
                            for_sale: true,
                            location: city?.name,
                          })
                        }
                      >
                        {city?.name}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="col">
              <ul className="nav flex-column d-flex align-items-center align-items-md-start">
                <h5>General</h5>
                <li className="nav-item mb-2">
                  <Link
                    to={PATH_AGENTS_SEARCH_ABSOLUTE}
                    className="footer-link p-0 text-muted"
                  >
                    Find an Agent
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/" className="footer-link p-0 text-muted">
                    Jobs
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/" className="footer-link p-0 text-muted">
                    {COMPANY_NAME} news
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/" className="footer-link p-0 text-muted">
                    About {COMPANY_NAME}
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/" className="footer-link p-0 text-muted">
                    FAQs
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/" className="footer-link p-0 text-muted">
                    Contact {COMPANY_NAME}
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/" className="footer-link p-0 text-muted">
                    Privacy
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/" className="footer-link p-0 text-muted">
                    Cookie policy
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col">
              <form className="subscribe-area">
                <h5>Subscribe to our newsletter</h5>
                <p>Monthly digest of whats new and exciting from us.</p>
                <div className="row row-cols-1 row-cols-lg-2 d-flex w-100 gap-2">
                  <input
                    id="newsletter1"
                    type="text"
                    className="col form-control"
                    placeholder="Email address"
                  />
                  <button className="col btn btn-primary" type="button">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="row row-cols-auto d-flex justify-content-between py-4 my-4 border-top ">
            <p className="col flex-center-general">
              &copy; 2022 {COMPANY_NAME}, Inc. All rights reserved.
            </p>
            <div className="col flex-center-general">
              <h5>Follow us on:</h5>
              <ul className="list-unstyled d-flex row row-cols-auto ">
                <li className="ms-3 col">
                  <Link className="link-dark" to="/">
                    <i className="twitter square icon big" />
                  </Link>
                </li>
                <li className="ms-3 col">
                  <Link className="link-dark" to="/">
                    <i className="instagram icon big" />
                  </Link>
                </li>
                <li className="ms-3 col">
                  <Link className="link-dark" to="/">
                    <i className="facebook icon big" />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col mt-3 mt-lg-0">
              <div className="row row-cols-1 g-3">
                <div className="col flex-center-general">
                  <Link className="link-dark" to="/">
                    <img
                      src={GooglePlay}
                      alt="Get the app on google Play "
                      width="150"
                    />
                  </Link>
                </div>
                <div className="col flex-center-general">
                  <Link className="link-dark" to="/">
                    <img
                      src={AppStore}
                      alt="Get the app on google Play"
                      width="150"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default FooterOne;
