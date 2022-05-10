import CheckCustomInput from "components/commons/fields/CheckCustomInput";
import TextCustomInput from "components/commons/fields/TextCustomInput";
import React, { useState } from "react";
import { Field, FormSpy } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import ApartmentUnit from "./ApartmentUnit";

const Apartment = ({ label, title }) => {
  const [numberOfUnitsShown, setNumberOfUnitsShown] = useState(1);

  /**
   * Field subscription object
   */
  const fieldSubscription = {
    submitting: true,
    value: true,
    touched: true,
    error: true,
  };

  /**
   * Apartment unit field key inside values object
   */
  const APARTMENT_UNIT_FIELD_NAME = "apartment.units";

  /**
   * A function that validates fields
   * @param {any} value
   * @returns error
   */
  const validateFiedGeneral = (value) => {
    if (!value) {
      return "Value required!";
    }
    if (value < 0) {
      return "Negative value no accepted!";
    }
  };

  return (
    <div>
      <div className="col form-outline mb-2">
        <Field
          name={`${label}.floors`}
          className="form-control form-control-lg input-border-color"
          type="number"
          placeholder=""
          label="Number of floors"
          labelClass="form-label fs-5 mt-2"
          subscription={fieldSubscription}
          // validate={validateFiedGeneral}
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
      <div className="row row-cols-1 row-cols-sm-2 my-3">
        <div className="col form-outline mb-2">
          <Field
            name={`${label}.is_new`}
            type="checkbox"
            className="form-check-input me-2"
            label="Is New?"
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
        <div className="col form-outline mb-2">
          <Field
            name={`${label}.is_multi_unit`}
            type="checkbox"
            className="form-check-input me-2"
            label="Is Multi Unit?"
            labelLink=""
            initialValue={numberOfUnitsShown > 1 ? true : false}
            disabled={true}
            subscription={fieldSubscription}
          >
            {({ input, meta, className, label, labelLink, disabled }) => (
              <CheckCustomInput
                input={input}
                meta={meta}
                className={className}
                label={label}
                labelLink={labelLink}
                disabled
              />
            )}
          </Field>
        </div>
      </div>
      <div className="my-3">
        <p className="flex-center-general fs-4 fw-bold">Add Apartment Unit</p>
        {/* FormSpy allows us to access form states without re-rendering the form */}
        <FormSpy>
          {({
            form: {
              mutators: { push, pop },
            },
          }) => (
            <div>
              {/* Field array allows us to dynamically group of fields  */}
              <FieldArray name={APARTMENT_UNIT_FIELD_NAME}>
                {({ fields }) =>
                  fields.map((name, index) => {
                    setNumberOfUnitsShown(index + 1);
                    return (
                      <div className="py-3" key={index}>
                        <ApartmentUnit
                          label={name}
                          index={index}
                          fields={fields}
                          title="Add apartment unit"
                        />
                      </div>
                    );
                  })
                }
              </FieldArray>
              <div className="row row-cols-1 row-cols-sm-2 my -5">
                <div className="col d-flex align-items-sm-end justify-content-sm-end justify-content-center justify-content-center order-sm-0 order-1">
                  {/* Do not show Remove Unit button if we have only one Unit form */}
                  {numberOfUnitsShown > 1 && (
                    <button
                      type="button"
                      className="btn-general-danger btn-general-hover px-3 py-2"
                      /**
                       * Remove the last field item
                       */
                      onClick={() => pop(APARTMENT_UNIT_FIELD_NAME)}
                    >
                      <i className="cut icon"></i>
                      Remove Unit
                    </button>
                  )}
                </div>
                <div className="col d-flex align-items-sm-start justify-content-sm-start justify-content-center">
                  <button
                    type="button"
                    className="btn-general-info btn-general-hover px-3 py-2"
                    /**
                     * Add a field group
                     */
                    onClick={() => push(APARTMENT_UNIT_FIELD_NAME, undefined)}
                  >
                    <i className="plus icon"></i>
                    Add Unit
                  </button>
                </div>
              </div>
            </div>
          )}
        </FormSpy>
      </div>
    </div>
  );
};

export default Apartment;
