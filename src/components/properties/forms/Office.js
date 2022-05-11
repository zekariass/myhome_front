// @ts-nocheck
import CheckCustomInput from "components/commons/fields/CheckCustomInput";
import DropdownCustomInput from "components/commons/fields/DropdownCustomInput";
import TextCustomInput from "components/commons/fields/TextCustomInput";
import React from "react";
import { Field } from "react-final-form";
import { useSelector } from "react-redux";
import AreaField from "./AreaField";
import IsNewField from "./IsNewField";

const Office = ({ label, title }) => {
  let { data } = useSelector((store) => store.buildingType.response);
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
      <p className="fs-4 fw-bold flex-center-general">{title}</p>

      <div className="row row-cols-1 row-cols-sm-2 my-3">
        <div className="form-outline mb-2">
          <Field
            name={`${label}.building_type`}
            className="form-control form-control-lg input-border-color"
            label="Building Type"
            labelClass="form-label fs-5 mt-2"
            options={[{ id: "-1", name: "--Select building type--" }, ...data]}
            disabled={false}
            // validate={pCategoryRequired}
            subscription={fieldSubscription}
          >
            {({
              input,
              meta,
              options,
              className,
              label,
              labelClass,
              disabled,
            }) => (
              <DropdownCustomInput
                input={input}
                meta={meta}
                options={options}
                className={className}
                label={label}
                labelClass={labelClass}
                disabled={disabled}
              />
            )}
          </Field>
        </div>
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
        <AreaField label={label} fieldName="area" />
        <div className="col form-outline mt-3 mt-sm-4 ps-sm-4 mb-2">
          <Field
            name={`${label}.is_furnished`}
            type="checkbox"
            className="form-check-input me-2 mb-3"
            label="Is Furnished?"
            labelLink=""
            initialValue={false}
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
          <IsNewField label={label} />
        </div>
      </div>
    </>
  );
};

export default Office;
