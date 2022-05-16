import TextField from "components/commons/fields/TextField";
import { FIELD_SUBSCRIPTION } from "components/commons/fieldSubscription";
import React from "react";
import CommonResidentialFields from "./CommonResidentialFields";

/**
 * Villa creation and update form
 * @param {*} param0
 * @returns
 */
const Villa = ({ name, title }) => {
  return (
    <>
      <p className="fs-4 fw-bold flex-center-general">{title}</p>
      <div className="row row-cols-1 row-cols-sm-2 my-3">
        <div className="col form-outline mb-2">
          <TextField
            name={`${name}.total_compound_area`}
            className="form-control form-control-lg input-border-color"
            type="number"
            placeholder=""
            label="Total Compound Area"
            labelClass="form-label fs-5 mt-2"
            validate={() => {}}
            fieldSubscription={FIELD_SUBSCRIPTION}
          />
        </div>
        <div className="col form-outline mb-2">
          <TextField
            name={`${name}.housing_area`}
            className="form-control form-control-lg input-border-color"
            type="number"
            placeholder=""
            label="Housing Area"
            labelClass="form-label fs-5 mt-2"
            validate={() => {}}
            fieldSubscription={FIELD_SUBSCRIPTION}
          />
        </div>
        <CommonResidentialFields name={name} />
      </div>
    </>
  );
};

export default Villa;
