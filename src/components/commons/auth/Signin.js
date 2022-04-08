import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "../../landing_page/images/landing_image_sm.jpg";
// @ts-ignore
import Logo from "../images/logo3.JPG";

function Signin() {
  return (
    <section className="h-100" style={{ backgroundColor: "#eee" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col col-xl-8">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src={ShowImage}
                    alt="login form"
                    className=""
                    width="100%"
                    height="100%"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <Link to="/">
                          <img src={Logo} alt="Company logo" width="100%" />
                        </Link>
                      </div>

                      <h5
                        className="fw-bold fs-4 mb-3 pb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                        Sign into your account
                      </h5>

                      <div className="form-outline mb-4">
                        <label className="form-label fs-5" id="emailLabel">
                          Email address
                        </label>
                        <input
                          type="email"
                          name="email"
                          className="form-control form-control-lg"
                          area-aria-describedby="emailLabel"
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label fs-5" id="passwordLabel">
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          className="form-control form-control-lg"
                          aria-aria-describedby="passwordLabel"
                        />
                      </div>

                      <div className="pt-1 mb-4">
                        <button className="btn-general py-2 px-4" type="button">
                          Login
                        </button>
                      </div>

                      <Link
                        to="/"
                        className="link-general link-size-small link-hover"
                      >
                        Forgot password?
                      </Link>
                      <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                        Don't have an account?
                        <Link
                          to="/signup"
                          className="link-general link-size-normal link-hover ms-1"
                        >
                          Signup here
                        </Link>
                      </p>
                      <Link
                        to="/"
                        className="link-general link-size-xsmall link-hover link-underline mx-5"
                      >
                        Terms of use
                      </Link>
                      <Link
                        to="/"
                        className="link-general link-size-xsmall link-underline link-hover"
                      >
                        Privacy policy
                      </Link>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signin;
