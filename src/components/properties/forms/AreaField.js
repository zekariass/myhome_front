import TextCustomInput from "components/commons/fields/TextCustomInput";
import React from "react";
import { Field } from "react-final-form";

const AreaField = ({ label, fieldName }) => {
  /**
   * Field subscription object
   */
  const fieldSubscription = {
    submitting: true,
    value: true,
    touched: true,
    error: true,
  };

  let areaFieldLabel = fieldName.replaceAll("_", " ");
  areaFieldLabel =
    areaFieldLabel.charAt(0).toUpperCase() + areaFieldLabel.slice(1);

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

  return (
    <>
      <div className="col form-outline mb-2">
        <Field
          name={`${label}.${fieldName}`}
          className="form-control form-control-lg input-border-color"
          type="number"
          placeholder=""
          label={areaFieldLabel}
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
    </>
  );
};

export default AreaField;
