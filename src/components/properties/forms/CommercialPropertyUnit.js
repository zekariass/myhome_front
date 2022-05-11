// @ts-nocheck
import TextareaCustomInput from "components/commons/fields/TextareaCustomInput";
import TextCustomInput from "components/commons/fields/TextCustomInput";
import React from "react";
import { Field } from "react-final-form";
import AreaField from "./AreaField";

const CommercialPropertyUnit = ({ label, title, index, fields }) => {
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

  const descriptionRequired = (value) =>
    !value ? "Description is required!" : undefined;

  const fieldSubscription = {
    submitting: true,
    value: true,
    touched: true,
    error: true,
  };

  return (
    <div className="card p-3 shadow-sm">
      {/* Display remove cut icon starting from the second unit forms */}
      {index + 1 > 1 && (
        <div className="d-flex justify-content-end align-content-end">
          <i
            className="big cut icon text-danger"
            style={{ cursor: "pointer" }}
            onClick={() => fields.remove(index)}
          ></i>
        </div>
      )}
      <p className="flex-center-general fs-4 fw-bold">{`Unit #${index + 1}`}</p>
      <div className="row row-cols-1 row-cols-md-2 g-3">
        <AreaField label={label} fieldName="area" />
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
      </div>
      <div className="row">
        <div className="form-outline mb-2">
          <Field
            name={`${label}.cop_prop_unit_description`}
            className="form-control form-control-lg input-border-color"
            label="Commercial Property Unit Description"
            labelClass="form-label fs-5 mt-2"
            subscription={fieldSubscription}
            validate={descriptionRequired}
          >
            {({ input, meta, className, label, labelClass }) => (
              // textareaInputField(input, meta, className, "", label, labelClass)
              <TextareaCustomInput
                input={input}
                meta={meta}
                className={className}
                label={label}
                labelClass={labelClass}
              />
            )}
          </Field>
        </div>
      </div>
    </div>
  );
};

export default CommercialPropertyUnit;
