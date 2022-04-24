import React from "react";
import { Link } from "react-router-dom";
import GooglePlay from "./images/google_play.png";
import AppStore from "./images/app_store.jpg";
import { COMPANY_NAME, PATH_LANDING } from "components/commons/Strings";

const FooterTwo = () => {
  return (
    <footer className="py-3 mt-4">
      <div className="container">
        <ul className="nav justify-content-center pb-3 mb-3">
          <li className="nav-item">
            <Link to={PATH_LANDING} className="nav-link px-2 text-muted">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="#" className="nav-link px-2 text-muted">
              Features
            </Link>
          </li>
          <li className="nav-item">
            <Link to="#" className="nav-link px-2 text-muted">
              Pricing
            </Link>
          </li>
          <li className="nav-item">
            <Link to="#" className="nav-link px-2 text-muted">
              FAQs
            </Link>
          </li>
          <li className="nav-item">
            <Link to="#" className="nav-link px-2 text-muted">
              About
            </Link>
          </li>
        </ul>
        <div className="row row-cols-auto d-flex justify-content-between py-4 my-4 border-top ">
          <p className="col flex-center-general">
            &copy; 2022 {COMPANY_NAME}, Inc. All rights reserved.
          </p>
          <div className="col flex-center-general">
            <h5>Follow us on:</h5>
            <ul className="list-unstyled row row-cols-auto">
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
            <div className="row row-cols-1 g-3 ">
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
      </div>
    </footer>
  );
};

export default FooterTwo;
