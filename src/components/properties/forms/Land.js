// @ts-nocheck
import CheckCustomInput from "components/commons/fields/CheckCustomInput";
import TextCustomInput from "components/commons/fields/TextCustomInput";
import React from "react";
import { Field } from "react-final-form";
import AreaField from "./AreaField";

const Land = ({ label, title }) => {
  /**
   * A function that validates the function
   * @param {object} values
   * @returns error
   */
  const validateNumberFieldGeneral = (values) => undefined;
  // (value) => {
  //   if (!value) {
  //     return "Value required";
  //   }
  //   if (value && value < 0) {
  //     return "Negative value not accepted!";
  //   }
  // };

  /**
   * Subscription object for fields
   */
  const fieldSubscription = {
    submitting: true,
    value: true,
    touched: true,
    error: true,
  };

  return (
    <div>
      <p className="fs-4 fw-bold flex-center-general">{title}</p>
      <div className="row row-cols-1 row-cols-sm-2 my-3">
        <AreaField label={label} fieldName="area" />
        <div className="col form-outline mb-2">
          <Field
            name={`${label}.length`}
            className="form-control form-control-lg input-border-color"
            type="number"
            placeholder=""
            label="Land Length"
            labelClass="form-label fs-5 mt-2"
            validate={validateNumberFieldGeneral}
            subscription={fieldSubscription}
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
        <div className="col form-outline mb-2">
          <Field
            name={`${label}.width`}
            className="form-control form-control-lg input-border-color"
            type="number"
            placeholder=""
            label="Land Width"
            labelClass="form-label fs-5 mt-2"
            validate={validateNumberFieldGeneral}
            subscription={fieldSubscription}
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
      </div>
      <div className="row">
        <div className="col-auto form-outline mb-2 mt-3">
          <Field
            name={`${label}.has_plan`}
            type="checkbox"
            className="form-check-input me-2"
            label="The Land has Plan?"
            labelLink=""
            // initialValue={numberOfUnitsShown > 1 ? true : false}
            // disabled={true}
            subscription={fieldSubscription}
          >
            {({ input, meta, className, label, labelLink }) => (
              <CheckCustomInput
                input={input}
                meta={meta}
                className={className}
                label={label}
                labelLink={labelLink}
              />
            )}
          </Field>
        </div>
        <div className="col-auto form-outline mb-2 mt-3">
          <Field
            name={`${label}.has_debt`}
            type="checkbox"
            className="form-check-input me-2"
            label="The Land has Unpaid Debt?"
            labelLink=""
            // initialValue={numberOfUnitsShown > 1 ? true : false}
            // disabled={true}
            subscription={fieldSubscription}
          >
            {({ input, meta, className, label, labelLink }) => (
              <CheckCustomInput
                input={input}
                meta={meta}
                className={className}
                label={label}
                labelLink={labelLink}
              />
            )}
          </Field>
        </div>
      </div>
    </div>
  );
};

export default Land;
