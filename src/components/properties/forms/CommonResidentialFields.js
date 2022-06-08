// @ts-nocheck
import CheckField from "components/commons/fields/CheckField";
import TextField from "components/commons/fields/TextField";
import { FIELD_SUBSCRIPTION } from "components/commons/fieldSubscription";
import React from "react";

/**
 * Common fields for residential properties
 * @param {*} param0
 * @returns
 */
const CommonResidentialFields = ({ name }) => {
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
        <TextField
          name={`${name}.number_of_rooms`}
          className="form-control form-control-lg input-border-color"
          type="number"
          placeholder=""
          label="Number of Rooms"
          labelClass="form-label fs-5 mt-2"
          validate={validateNumberFieldGeneral}
          fieldSubscription={FIELD_SUBSCRIPTION}
        />
      </div>
      <div className="col form-outline mb-2">
        <TextField
          name={`${name}.number_of_bed_rooms`}
          className="form-control form-control-lg input-border-color"
          type="number"
          placeholder=""
          label="Number of Bed Rooms"
          labelClass="form-label fs-5 mt-2"
          validate={validateNumberFieldGeneral}
          fieldSubscription={FIELD_SUBSCRIPTION}
        />
      </div>
      <div className="col form-outline mb-2">
        <TextField
          name={`${name}.number_of_baths`}
          className="form-control form-control-lg input-border-color"
          type="number"
          placeholder=""
          label="Number of Baths"
          labelClass="form-label fs-5 mt-2"
          validate={validateNumberFieldGeneral}
          fieldSubscription={FIELD_SUBSCRIPTION}
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
          fieldSubscription={FIELD_SUBSCRIPTION}
        />
      </div>
      <div className="col form-outline mt-sm-5 order-last">
        <CheckField
          name={`${name}.is_furnished`}
          type="checkbox"
          className="form-check-input me-2"
          label="Is Furnished?"
          labelLink=""
          initialValue={false}
          fieldSubscription={FIELD_SUBSCRIPTION}
          disabled={false}
        />
      </div>
    </>
  );
};

export default CommonResidentialFields;
