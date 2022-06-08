// @ts-nocheck
import TextareaField from "components/commons/fields/TextareaField";
import TextField from "components/commons/fields/TextField";
import { FIELD_SUBSCRIPTION } from "components/commons/fieldSubscription";
import React from "react";

/**
 * Commercial Property Unit form
 * @param {*} param0
 * @returns
 */
const CommercialPropertyUnit = ({ name, title, index, fields }) => {
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

  const descriptionRequired = (value) =>
    !value ? "Description is required!" : undefined;

  return (
    <div className="card p-3 shadow-sm">
      <p className="my-3 fw-bold fs-5 display-title">{title}</p>
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
        <div className="col form-outline mb-2">
          <TextField
            name={`${name}.number_of_rooms`}
            className="form-control form-control-lg input-border-color"
            type="number"
            placeholder=""
            label="Number of Rooms"
            labelClass="form-label fs-5 mt-2"
            validate={validateNumberFieldGeneral}
            subscription={FIELD_SUBSCRIPTION}
          />
        </div>
        <div className="col form-outline mb-2">
          <TextField
            name={`${name}.floor`}
            className="form-control form-control-lg input-border-color"
            type="number"
            placeholder=""
            label="Floor Level"
            labelClass="form-label fs-5 mt-2"
            validate={validateNumberFieldGeneral}
            subscription={FIELD_SUBSCRIPTION}
          />
        </div>
      </div>
      <div className="row">
        <div className="form-outline mb-2">
          <TextareaField
            name={`${name}.com_prop_unit_description`}
            className="form-control form-control-lg input-border-color"
            label="Commercial Property Unit Description"
            labelClass="form-label fs-5 mt-2"
            subscription={FIELD_SUBSCRIPTION}
            validate={descriptionRequired}
          />
        </div>
      </div>
    </div>
  );
};

export default CommercialPropertyUnit;
