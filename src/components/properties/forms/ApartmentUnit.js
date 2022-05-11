// @ts-nocheck
import CheckCustomInput from "components/commons/fields/CheckCustomInput";
import TextCustomInput from "components/commons/fields/TextCustomInput";
import React from "react";
import { Field } from "react-final-form";
import AreaField from "./AreaField";
import CommonResidentialFields from "./CommonResidentialFields";

/**
 * Apartment Unit component that an Apartment may have
 * @param {props} param0
 * @returns ApartmentUnit form component
 */
const ApartmentUnit = ({ label, index, fields, title }) => {
  /**
   * A function that validates the function
   * @param {object} value
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
        {/* <div className="col form-outline mb-2">
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
        </div> */}
        <CommonResidentialFields label={label} />
        {/* <div className="col form-outline mb-2">
          <Field
            name={`${label}.area`}
            className="form-control form-control-lg input-border-color"
            type="number"
            placeholder=""
            label="Total Area"
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
        </div> */}
        <AreaField label={label} fieldName="area" />
        {/* <div className="col form-outline mb-2 flex-center-general mt-md-5">
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
        </div> */}
      </div>
    </div>
  );
};

export default ApartmentUnit;
