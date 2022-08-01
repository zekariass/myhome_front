// @ts-nocheck
import React from "react";
import { Field, Form } from "react-final-form";
import { Link, useLocation } from "react-router-dom";
import Logo from "../commons/images/logo3.JPG";
import { performSignin, clearSigninData } from "features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TextCustomInput from "components/commons/fields/TextCustomInput";

const Signin = () => {
  /**
   * User signin
   */

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { signinStatus } = useSelector((store) => store.user.signin);

  /**
   * Extract the pathName from where the user is redirected to signin page
   * and send as a parameter to signin action creater in order to redirect
   * the user to the last clicked link page
   */
  const fromPage = location.state?.from?.pathname || "/";

  // console.log("fromPage: ", fromPage, location.state);

  const onSubmit = (values) => {
    /**
     * Handles the event when the user clicks "Signin" button
     * After inserting the credentials
     */

    /**
     * When there is a new signin, we need to clear signin data store
     */
    dispatch(clearSigninData());

    /**
     * Dispatch the signin action creater
     */
    dispatch(
      performSignin({
        userCred: values,
        navigate: navigate,
        fromPage: fromPage,
      })
    );
  };

  return (
    <section className="h-100" style={{ backgroundColor: "#eee" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col col-xl-8">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-4 p-lg-5 text-black">
                <div className="p-5 flex-center-general">
                  <Form
                    /**
                     * React final form
                     */
                    onSubmit={onSubmit}
                    validate={(values) => validateForm(values)}
                  >
                    {({ handleSubmit }) =>
                      signinForm(handleSubmit, signinStatus)
                    }
                  </Form>
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

const signinForm = (handleSubmit, signinStatus) => {
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
      {signinStatus >= 400 && (
        <div className="error-general flex-center-general my-2">
          Unable to signin! check your Username or Password
        </div>
      )}
      <div className="form-outline mb-2">
        <Field
          name="email"
          className="form-control form-control-lg"
          type="email"
          placeholder="Enter your email..."
          label="Email Address"
          labelClass="form-label fs-5"
        >
          {({ input, meta, className, placeholder, label, labelClass }) => (
            <TextCustomInput
              input={input}
              meta={meta}
              className={className}
              placeholder={placeholder}
              label={label}
              labelClass={labelClass}
            />
          )}
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
          {({ input, meta, className, placeholder, label, labelClass }) => (
            <TextCustomInput
              input={input}
              meta={meta}
              className={className}
              placeholder={placeholder}
              label={label}
              labelClass={labelClass}
            />
          )}
        </Field>
      </div>
      <div className="row">
        <div className="col-lg-4 pt-1 mb-4 ">
          <button className="btn-general py-2 px-4 " type="submit">
            Login
          </button>
        </div>
        <div className="col-lg-8">
          <Link to="/" className="link-general link-size-small link-hover">
            Forgot password?
          </Link>
          <p className="pb-lg-2" style={{ color: "#393f81" }}>
            Don't have an account?
            <Link
              to="/signup"
              className="link-general link-size-small link-hover ms-1"
            >
              Signup here
            </Link>
          </p>
          <Link
            to="/"
            className="link-general link-size-xsmall link-hover link-underline me-5"
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
