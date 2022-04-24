// @ts-nocheck
import { setAgentAddress } from "features/agent/agentSlice";
import React from "react";
import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { dropdownInputFiled } from "./fields/dropdownInputFiled";
import { textInputField } from "./fields/textInputField";

const AddressForm = ({ currentStep, setCurrentStep }) => {
  /**
   * Address form
   * This form is a common form for Agent address, Property address, etc
   */

  /**
   * dispatch object to dispatch the address data to redux store
   */
  const dispatch = useDispatch();

  /**
   * select object from react-redux to retrieve address data from redux store
   */
  const { agentAddress } = useSelector((store) => store.agent.addAgent);

  const onSubmit = (values) => {
    /**
     * Handles the submit form actton
     * Used as prop in React final form
     */

    dispatch(setAgentAddress(values));

    /**
     * When continue button clicked, increment the currentStep of the agent add form step
     */
    setCurrentStep(currentStep + 1);
  };

  return (
    <Form
      /**
       * React-final-form
       */
      onSubmit={onSubmit}
      validate={validate}
      subscription={{ submitting: true }}
      initialValues={agentAddress}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          {renderAddressForm(currentStep, setCurrentStep)}
        </form>
      )}
    </Form>
  );
};

export default AddressForm;

//Inline function calls

const renderAddressForm = (currentStep, setCurrentStep) => {
  /**
   * Renders adress form using Field component of react-final-form
   */
  return (
    <div className="">
      <div className="row row-cols-1 row-cols-lg-2 g-3">
        <div className="col form-outline mb-2">
          <Field
            name="street"
            className="form-control form-control-lg input-border-color"
            type="text"
            placeholder=""
            label={`Street`}
            labelClass="form-label fs-5 mt-2"
            subscription={{
              submitting: true,
              value: true,
              touched: true,
              error: true,
            }}
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
        <div className="col form-outline mb-2">
          <Field
            name="building_name_or_number"
            className="form-control form-control-lg input-border-color"
            type="text"
            placeholder=""
            label="Building name or number"
            labelClass="form-label fs-5 mt-2"
            subscription={{
              submitting: true,
              value: true,
              touched: true,
              error: true,
            }}
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
        <div className="col form-outline mb-2">
          <Field
            name="room_number"
            className="form-control form-control-lg input-border-color"
            type="text"
            placeholder=""
            label="Room number"
            labelClass="form-label fs-5 mt-2"
            subscription={{
              submitting: true,
              value: true,
              touched: true,
              error: true,
            }}
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
        <div className="col form-outline mb-2">
          <Field
            name="post_code"
            className="form-control form-control-lg input-border-color"
            type="text"
            placeholder=""
            label="Post code"
            labelClass="form-label fs-5 mt-2"
            subscription={{
              submitting: true,
              value: true,
              touched: true,
              error: true,
            }}
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
        <div className="col form-outline mb-2">
          <Field
            name="country"
            className="form-control form-control-lg input-border-color"
            label="Country"
            labelClass="form-label fs-5 mt-2"
            options={["--Select Country--", "Ethiopia"]}
            subscription={{
              submitting: true,
              value: true,
              touched: true,
              error: true,
            }}
          >
            {({ input, meta, options, className, label, labelClass }) =>
              dropdownInputFiled(
                input,
                meta,
                options,
                className,
                label,
                labelClass
              )
            }
          </Field>
        </div>
        <div className="col form-outline mb-2">
          <Field
            name="region"
            className="form-control form-control-lg input-border-color"
            label="Region"
            labelClass="form-label fs-5 mt-2"
            options={["--Select Region--", "Oromia", "Amhara", "Addis Ababa"]}
            subscription={{
              submitting: true,
              value: true,
              touched: true,
              error: true,
            }}
          >
            {({ input, meta, options, className, label, labelClass }) =>
              dropdownInputFiled(
                input,
                meta,
                options,
                className,
                label,
                labelClass
              )
            }
          </Field>
        </div>
        <div className="col form-outline mb-2">
          <Field
            name="city"
            className="form-control form-control-lg input-border-color"
            label="City"
            labelClass="form-label fs-5 mt-2"
            options={["--Select City--", "Adama", "Bishoftu", " Hawassa"]}
            subscription={{
              submitting: true,
              value: true,
              touched: true,
              error: true,
            }}
          >
            {({ input, meta, options, className, label, labelClass }) =>
              dropdownInputFiled(
                input,
                meta,
                options,
                className,
                label,
                labelClass
              )
            }
          </Field>
        </div>
      </div>
      <div className="">
        <div className="row row-cols-1 row-cols-lg-2 g-3 mt-1">
          <div className="col form-outline mb-2">
            <Field
              name="longitude"
              className="form-control form-control-lg input-border-color"
              type="text"
              placeholder=""
              label="Longitude"
              labelClass="form-label fs-5 mt-2"
              subscription={{
                submitting: true,
                value: true,
                touched: true,
                error: true,
              }}
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
          <div className="col form-outline mb-2">
            <Field
              name="latitude"
              className="form-control form-control-lg input-border-color"
              type="text"
              placeholder=""
              label="Latitude"
              labelClass="form-label fs-5 mt-2"
              subscription={{
                submitting: true,
                value: true,
                touched: true,
                error: true,
              }}
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
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 pt-1 my-4 flex-center-general">
          <button
            className="btn-general py-2 w-75"
            type="button"
            onClick={() => onBackButtonClick(currentStep, setCurrentStep)}
          >
            Back
          </button>
        </div>
        <div className="col-lg-6 pt-1 my-4 flex-center-general">
          <button className="btn-general py-2 w-75" type="submit">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

const onBackButtonClick = (currentStep, setCurrentStep) => {
  /**
   * Handles the back button click action
   */
  setCurrentStep(currentStep - 1);
};

const validate = (values) => {
  /**
   * Validates address form
   * This function is injected by react final form validate prop
   */
  const errors = {};
  if (!values.street) {
    errors.street = "Street is required!";
  }
  if ((values.city && values.city.startsWith("--Select")) || !values.city) {
    errors.city = "Select valid city!";
  }
  if (
    (values.region && values.region.startsWith("--Select")) ||
    !values.region
  ) {
    errors.region = "Select valid region!";
  }
  if (
    (values.country && values.country.startsWith("--Select")) ||
    !values.country
  ) {
    errors.country = "Select valid country!";
  }

  return errors;
};
