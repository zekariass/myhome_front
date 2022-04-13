import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import GooglePlay from "./images/google_play.png";
import AppStore from "./images/app_store.jpg";
import { COMPANY_NAME } from "../commons/Strings";

export class FooterOne extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <footer className="py-5">
            <div className="row row-cols-1 row-cols-sm-1 row-cols-lg-4 g-5">
              <div className="col">
                <ul className="nav flex-column d-flex align-items-center align-items-md-start">
                  <h5>Properties</h5>
                  <li className="nav-item mb-2">
                    <Link to="/" className="footer-link p-0 text-muted">
                      Properties for rent
                    </Link>
                  </li>
                  <li className="nav-item mb-2">
                    <Link to="/" className="footer-link p-0 text-muted">
                      Properties for sale
                    </Link>
                  </li>
                  <li className="nav-item mb-2">
                    <Link to="/" className="footer-link p-0 text-muted">
                      Condominiums for rent
                    </Link>
                  </li>
                  <li className="nav-item mb-2">
                    <Link to="/" className="footer-link p-0 text-muted">
                      Condominiums for sale
                    </Link>
                  </li>
                  <li className="nav-item mb-2">
                    <Link to="/" className="footer-link p-0 text-muted">
                      Traditional home for rent
                    </Link>
                  </li>
                  <li className="nav-item mb-2">
                    <Link to="/" className="footer-link p-0 text-muted">
                      Traditional home for sale
                    </Link>
                  </li>
                  <li className="nav-item mb-2">
                    <Link to="/" className="footer-link p-0 text-muted">
                      Find an Agent
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="col">
                <ul className="nav flex-column d-flex align-items-center align-items-md-start">
                  <h5>Popular locations</h5>
                  <li className="nav-item mb-2">
                    <Link to="/" className="footer-link p-0 text-muted">
                      Addis Ababa
                    </Link>
                  </li>
                  <li className="nav-item mb-2">
                    <Link to="/" className="footer-link p-0 text-muted">
                      Adama
                    </Link>
                  </li>
                  <li className="nav-item mb-2">
                    <Link to="/" className="footer-link p-0 text-muted">
                      Bishoftu
                    </Link>
                  </li>
                  <li className="nav-item mb-2">
                    <Link to="/" className="footer-link p-0 text-muted">
                      Hawassa
                    </Link>
                  </li>
                  <li className="nav-item mb-2">
                    <Link to="/" className="footer-link p-0 text-muted">
                      Mekele
                    </Link>
                  </li>
                  <li className="nav-item mb-2">
                    <Link to="/" className="footer-link p-0 text-muted">
                      Bahirdar
                    </Link>
                  </li>
                  <li className="nav-item mb-2">
                    <Link to="/" className="footer-link p-0 text-muted">
                      Gondar
                    </Link>
                  </li>
                  <li className="nav-item mb-2">
                    <Link to="/" className="footer-link p-0 text-muted">
                      Diredawa
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="col">
                <ul className="nav flex-column d-flex align-items-center align-items-md-start">
                  <h5>General</h5>
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
              <p className="col">
                &copy; 2022 {COMPANY_NAME}, Inc. All rights reserved.
              </p>
              <div className="col">
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
              <div className="col">
                <div className="row row-cols-1 g-3">
                  <div className="col">
                    <Link className="link-dark" to="/">
                      <img
                        src={GooglePlay}
                        alt="Get the app on google Play "
                        width="150"
                      />
                    </Link>
                  </div>
                  <div className="col">
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
  }
}

export default FooterOne;
