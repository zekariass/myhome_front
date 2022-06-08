// @ts-nocheck
import TextField from "components/commons/fields/TextField";
import { FIELD_SUBSCRIPTION } from "components/commons/fieldSubscription";
import React from "react";
import CommonResidentialFields from "./CommonResidentialFields";

/**
 * Apartment Unit unit that an Apartment may have
 * @param {props} param0
 * @returns ApartmentUnit form component
 */
const ApartmentUnit = ({ name, index, fields, title, isEdit }) => {
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

  return (
    <div className="mb-3">
      <p className="my-3 fw-bold fs-5 display-title">{title}</p>
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
        {!!index && (
          <p className="flex-center-general fs-4 fw-bold">{`Unit #${
            index + 1
          }`}</p>
        )}
        <div className="row row-cols-1 row-cols-md-2 g-3">
          <CommonResidentialFields name={name} />
          <div className="col form-outline mb-2">
            <TextField
              name={`${name}.area`}
              className="form-control form-control-lg input-border-color"
              type="number"
              placeholder=""
              label="Area"
              labelClass="form-label fs-5 mt-2"
              validate={validateNumberFieldGeneral}
              subscription={FIELD_SUBSCRIPTION}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentUnit;
