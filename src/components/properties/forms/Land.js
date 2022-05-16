// @ts-nocheck
import CheckField from "components/commons/fields/CheckField";
import TextField from "components/commons/fields/TextField";
import { FIELD_SUBSCRIPTION } from "components/commons/fieldSubscription";
import React from "react";

/**
 * Land form
 * @param {*} param0
 * @returns
 */
const Land = ({ name, title }) => {
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
    <div>
      <p className="fs-4 fw-bold flex-center-general">{title}</p>
      <div className="row row-cols-1 row-cols-sm-2 my-3">
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
        <div className="col form-outline mb-2">
          <TextField
            name={`${name}.length`}
            className="form-control form-control-lg input-border-color"
            type="number"
            placeholder=""
            label="Land Length"
            labelClass="form-label fs-5 mt-2"
            validate={validateNumberFieldGeneral}
            subscription={FIELD_SUBSCRIPTION}
          />
        </div>
        <div className="col form-outline mb-2">
          <TextField
            name={`${name}.width`}
            className="form-control form-control-lg input-border-color"
            type="number"
            placeholder=""
            label="Land Width"
            labelClass="form-label fs-5 mt-2"
            validate={validateNumberFieldGeneral}
            subscription={FIELD_SUBSCRIPTION}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-auto form-outline mb-2 mt-3">
          <CheckField
            name={`${name}.has_plan`}
            type="checkbox"
            className="form-check-input me-2"
            label="The Land has Plan?"
            labelLink=""
            initialValue={true}
            disabled={false}
            subscription={FIELD_SUBSCRIPTION}
          />
        </div>
        <div className="col-auto form-outline mb-2 mt-3">
          <CheckField
            name={`${name}.has_debt`}
            type="checkbox"
            className="form-check-input me-2"
            label="The Land has Unpaid Debt?"
            labelLink=""
            initialValue={false}
            disabled={false}
            subscription={FIELD_SUBSCRIPTION}
          />
        </div>
      </div>
    </div>
  );
};

export default Land;
