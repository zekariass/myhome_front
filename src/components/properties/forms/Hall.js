// @ts-nocheck
import CheckCustomInput from "components/commons/fields/CheckCustomInput";
import TextareaCustomInput from "components/commons/fields/TextareaCustomInput";
import TextCustomInput from "components/commons/fields/TextCustomInput";
import React from "react";
import { Field, FormSpy } from "react-final-form";

const Hall = ({ label, title }) => {
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
        <div className="col form-outline mb-2">
          <Field
            name={`${label}.number_of_seats`}
            className="form-control form-control-lg input-border-color"
            type="number"
            placeholder=""
            label="Number of Seats"
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
            name={`${label}.total_capacity`}
            className="form-control form-control-lg input-border-color"
            type="number"
            placeholder=""
            label="Total Capacity"
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
        <div className="col form-outline mb-2 mt-5">
          <Field
            name={`${label}.has_parking_space`}
            type="checkbox"
            className="form-check-input me-2"
            label="Has Parking Space?"
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
        <FormSpy>
          {({ values }) => (
            <>
              {values.hall?.has_parking_space && (
                <div className="col form-outline mb-2">
                  <Field
                    name={`${label}.number_of_parking_spaces`}
                    className="form-control form-control-lg input-border-color"
                    type="number"
                    placeholder=""
                    label="Number of Parking Spaces"
                    labelClass="form-label fs-5 mt-2"
                    validate={validateNumberFieldGeneral}
                    subscription={fieldSubscription}
                  >
                    {({
                      input,
                      meta,
                      className,
                      placeholder,
                      label,
                      labelClass,
                    }) => (
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
              )}
            </>
          )}
        </FormSpy>
      </div>
      <div className="form-outline mb-2">
        <Field
          name={`${label}.hall_description`}
          className="form-control form-control-lg input-border-color"
          label="Hall Description"
          labelClass="form-label fs-5 mt-2"
          subscription={fieldSubscription}
          // validate={descriptionRequired}
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
  );
};

export default Hall;
