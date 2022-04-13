import React from "react";
import { Field, Form } from "react-final-form";
import { Link } from "react-router-dom";
// @ts-ignore
import Logo from "../commons/images/logo3.JPG";
import { textInputField } from "../commons/fields/textInputField";
import { checkInputField } from "../commons/fields/checkInputField";
import axios from "components/commons/apis/myHomeBackendAPI";

const Signup = () => {
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
                    <Form
                      onSubmit={onSubmit}
                      validate={validateForm}
                      subscription={{ submitting: true }}
                    >
                      {({ handleSubmit }) => signupForm(handleSubmit)}
                    </Form>
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
};

export default Signup;

/**
 * Inline functions
 */

const signupForm = (handleSubmit) => {
  return (
    <form onSubmit={handleSubmit} className="mx-1 mx-md-4">
      <div className="d-flex flex-row align-items-center">
        <i className="user icon big me-3"></i>

        <div className="flex-fill align-items-center">
          <div className="form-outline ">
            <Field
              name="first_name"
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter first name..."
              subscription={{
                submitting: true,
                value: true,
                touched: true,
                error: true,
              }}
            >
              {({ input, meta, className, placeholder }) =>
                textInputField(input, meta, className, placeholder)
              }
            </Field>
          </div>
          <div className="form-outline mb-0">
            <Field
              name="last_name"
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter last name..."
              subscription={{
                submitting: true,
                value: true,
                touched: true,
                error: true,
              }}
            >
              {({ input, meta, className, placeholder }) =>
                textInputField(input, meta, className, placeholder)
              }
            </Field>
          </div>
        </div>
      </div>

      <div className="d-flex flex-row  align-items-center">
        <i className="envelope icon big me-3"></i>
        <div className="form-outline align-items-center flex-fill mb-0">
          <Field
            name="email"
            type="email"
            className="form-control form-control-lg"
            placeholder="Enter email address..."
            subscription={{
              submitting: true,
              value: true,
              touched: true,
              error: true,
            }}
          >
            {({ input, meta, className, placeholder }) =>
              textInputField(input, meta, className, placeholder)
            }
          </Field>
        </div>
      </div>

      <div className="d-flex flex-row align-items-center">
        <i className="lock icon big me-3"></i>
        <div className="align-items-center flex-fill">
          <div className="form-outline ">
            <Field
              name="password"
              type="password"
              className="form-control form-control-lg"
              placeholder="Enter password..."
              subscription={{
                submitting: true,
                value: true,
                touched: true,
                error: true,
              }}
            >
              {({ input, meta, className, placeholder }) =>
                textInputField(input, meta, className, placeholder)
              }
            </Field>
          </div>
          <div className="form-outline flex-fill mb-3">
            <Field
              name="password_repeat"
              type="password"
              className="form-control form-control-lg"
              placeholder="Enter password again..."
              subscription={{
                submitting: true,
                value: true,
                touched: true,
                error: true,
              }}
            >
              {({ input, meta, className, placeholder }) =>
                textInputField(input, meta, className, placeholder)
              }
            </Field>
          </div>
        </div>
      </div>

      <div className="form-check d-flex justify-content-center ">
        <Field
          name="statement_aggreement"
          type="checkbox"
          className="form-check-input me-2"
          required={true}
          label="I agree all statements in"
          labelLink="Terms of service"
          errorMsg="You must agree with our terms of service!"
          subscription={{
            submitting: true,
            value: true,
            touched: true,
            error: true,
          }}
        >
          {({ input, meta, className, label, labelLink, errorMsg, required }) =>
            checkInputField(
              input,
              meta,
              className,
              label,
              labelLink,
              errorMsg,
              required
            )
          }
        </Field>
      </div>
      <div className="d-flex justify-content-center">
        <p className="mt-3 small">
          Already have an account?
          <Link
            to="/signin"
            className="link-general link-size-small link-hover ms-2 "
          >
            Signin here
          </Link>
        </p>
      </div>

      <div className="d-flex justify-content-center mx-4  ">
        <button type="submit" className="btn-general px-5 py-2">
          Sign up
        </button>
      </div>
    </form>
  );
};

const onSubmit = async (values) => {
  delete values.password_repeat;
  delete values.statement_aggreement;
  values.user_group = 1;
  //   console.log(values);
  try {
    const response = await axios.post("/user/signup/", values);
    console.log(response.data);
  } catch (error) {
    console.log("Something went wrong!");
  }
};
const validateForm = (values) => {
  const errors = {};
  if (!values.first_name) {
    errors.first_name = "First name required!";
  }
  if (!values.last_name) {
    errors.last_name = "Last name required!";
  }
  if (!values.email) {
    errors.email = "Email required!";
  }
  if (!values.password) {
    errors.password = "Password required!";
  }
  if (!values.password_repeat) {
    errors.password_repeat = "Enter password again!";
  }
  if (values.password_repeat && values.password_repeat !== values.password) {
    errors.password_repeat = "Password must much!";
  }
  return errors;
};