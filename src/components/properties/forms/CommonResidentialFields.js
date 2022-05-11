import CheckCustomInput from "components/commons/fields/CheckCustomInput";
import TextCustomInput from "components/commons/fields/TextCustomInput";
import React from "react";
import { Field } from "react-final-form";

const CommonResidentialFields = ({ label }) => {
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
    <>
      <div className="col form-outline mb-2">
        <Field
          name={`${label}.number_of_rooms`}
          className="form-control form-control-lg input-border-color"
          type="number"
          placeholder=""
          label="Number of Rooms"
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
          name={`${label}.number_of_bed_rooms`}
          className="form-control form-control-lg input-border-color"
          type="number"
          placeholder=""
          label="Number of Bed Rooms"
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
          name={`${label}.number_of_baths`}
          className="form-control form-control-lg input-border-color"
          type="number"
          placeholder=""
          label="Number of Baths"
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
          name={`${label}.floor`}
          className="form-control form-control-lg input-border-color"
          type="number"
          placeholder=""
          label="Floor Level"
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
      <div className="col form-outline mt-sm-5 order-last">
        <Field
          name={`${label}.is_furnished`}
          type="checkbox"
          className="form-check-input me-2"
          label="Is Furnished?"
          labelLink=""
          initialValue={false}
          subscription={fieldSubscription}
        >
          {({ input, meta, className, label, labelLink }) => (
            // @ts-ignore
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
    </>
  );
};

export default CommonResidentialFields;
