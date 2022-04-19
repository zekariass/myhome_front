// @ts-nocheck
import React from "react";
import { Field, Form } from "react-final-form";
import { Link } from "react-router-dom";
import ShowImage from "../landing_page/images/landing_image_sm.jpg";
import Logo from "../commons/images/logo3.JPG";
import { textInputField } from "components/commons/fields/textInputField";
import { performSignin, clearSigninData } from "features/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  /**
   * User signin
   */

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (values) => {
    /**
     * Handles the event when the user clicks "Signin" button
     * After inserting the credentials
     */
    // console.log("VALUES: ", values);
    dispatch(clearSigninData());
    dispatch(performSignin({ userCred: values, navigate: navigate }));
  };

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
                    <Form
                      /**
                       * React final form
                       */
                      onSubmit={onSubmit}
                      validate={(values) => validateForm(values)}
                    >
                      {({ handleSubmit }) => signinForm(handleSubmit)}
                    </Form>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;

/**
 * Inline functions
 */

const signinForm = (handleSubmit) => {
  /**
   * Sign in form that accepts user credentials to log into the system
   */
  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex align-items-center mb-3 pb-1">
        <Link to="/">
          <img src={Logo} alt="Company logo" width="100%" />
        </Link>
      </div>

      <h5 className="fw-bold fs-4 mb-3 pb-3" style={{ letterSpacing: "1px" }}>
        Sign into your account
      </h5>

      <div className="form-outline mb-2">
        <Field
          name="email"
          className="form-control form-control-lg"
          type="email"
          placeholder="Enter your email..."
          label="Email Address"
          labelClass="form-label fs-5"
        >
          {({ input, meta, className, placeholder, label, labelClass }) =>
            textInputField(
              input,
              meta,
              className,
              placeholder,
              label,
              labelClass
            )
          }
        </Field>
      </div>

      <div className="form-outline mb-2">
        <Field
          name="password"
          type="password"
          className="form-control form-control-lg"
          placeholder="Enter your password..."
          label="Password"
          labelClass="form-label fs-5"
        >
          {({ input, meta, className, placeholder, label, labelClass }) =>
            textInputField(
              input,
              meta,
              className,
              placeholder,
              label,
              labelClass
            )
          }
        </Field>
      </div>

      <div className="pt-1 mb-4">
        <button className="btn-general py-2 px-4" type="submit">
          Login
        </button>
      </div>
      {/* <FormSpy>
        {({ values }) => {
          console.log("FORM_VALUES: ", values);
        }}
      </FormSpy> */}
    </form>
  );
};

const validateForm = (values) => {
  /**
   * Sign in form validation
   */
  const errors = {};
  if (!values.email) {
    errors.email = "Email is required!";
  }
  if (!values.password) {
    errors.password = "Password is required!";
  }
  return errors;
};
