import React from "react";
import { Link } from "react-router-dom";
// @ts-ignore
import Logo from "../images/logo3.JPG";

function Signup() {
  return (
    <section className="h-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-3">
                      Sign up
                    </p>

                    <form className="mx-1 mx-md-4">
                      <div className="d-flex flex-row mb-4">
                        <i className="user icon big me-3"></i>

                        <div className="flex-fill align-items-center">
                          <div className="form-outline mb-2">
                            <input
                              type="text"
                              name="first_name"
                              className="form-control form-control-lg"
                              placeholder="First Name"
                            />
                          </div>
                          <div className="form-outline mb-0">
                            <input
                              type="email"
                              name="last_name"
                              className="form-control form-control-lg"
                              placeholder="Last Name"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="d-flex flex-row  mb-4">
                        <i className="envelope icon big me-3"></i>
                        <div className="form-outline align-items-center flex-fill mb-0">
                          <input
                            type="email"
                            name="email"
                            className="form-control form-control-lg"
                            placeholder="Email"
                            aria-describedby="emailHelp"
                          />
                          <label className="form-label" id="emailHelp">
                            Enter a valid email address
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row mb-4">
                        <i className="lock icon big me-3"></i>
                        <div className="align-items-center flex-fill">
                          <div className="form-outline mb-2">
                            <input
                              type="password"
                              name="password"
                              className="form-control form-control-lg"
                              placeholder="Password"
                            />
                          </div>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              name="repeat_password"
                              className="form-control form-control-lg"
                              placeholder="Repeat the password"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-check d-flex justify-content-center mb-5">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          name="statement_aggreement"
                          value=""
                        />
                        <label className="form-check-label">
                          I agree all statements in{" "}
                          <Link
                            to="/"
                            className="link-general link-size-normal link-hover"
                          >
                            Terms of service
                          </Link>
                          <p className="mt-3 small">
                            Already have an account
                            <Link
                              to="/signin"
                              className="link-general link-size-small link-hover ms-2 "
                            >
                              Signin here
                            </Link>
                          </p>
                        </label>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-2 ">
                        <button type="button" className="btn-general px-5 py-2">
                          Sign up
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <Link to="/">
                      <img
                        src={Logo}
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </Link>
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

export default Signup;
