// @ts-nocheck
import CheckField from "components/commons/fields/CheckField";
import TextareaField from "components/commons/fields/TextareaField";
import TextField from "components/commons/fields/TextField";
import { FIELD_SUBSCRIPTION } from "components/commons/fieldSubscription";
import React from "react";
import { FormSpy } from "react-final-form";

/**
 * Hall form
 * @param {*} param0
 * @returns
 */
const Hall = ({ name, title }) => {
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
        <div className="col form-outline mb-2">
          <TextField
            name={`${name}.number_of_seats`}
            className="form-control form-control-lg input-border-color"
            type="number"
            placeholder=""
            label="Number of Seats"
            labelClass="form-label fs-5 mt-2"
            validate={validateNumberFieldGeneral}
            fieldSubscription={FIELD_SUBSCRIPTION}
          />
        </div>
        <div className="col form-outline mb-2">
          <TextField
            name={`${name}.total_capacity`}
            className="form-control form-control-lg input-border-color"
            type="number"
            placeholder=""
            label="Total Capacity"
            labelClass="form-label fs-5 mt-2"
            validate={validateNumberFieldGeneral}
            fieldSubscription={FIELD_SUBSCRIPTION}
          />
        </div>
        <div className="col form-outline mb-2 mt-5">
          <CheckField
            name={`${name}.has_parking_space`}
            type="checkbox"
            className="form-check-input me-2"
            label="Has Parking Space?"
            labelLink=""
            initialValue={false}
            disabled={false}
            fieldSubscription={FIELD_SUBSCRIPTION}
          />
        </div>
        <FormSpy>
          {({ values }) => (
            <>
              {values.hall?.has_parking_space && (
                <div className="col form-outline mb-2">
                  <TextField
                    name={`${name}.number_of_parking_spaces`}
                    className="form-control form-control-lg input-border-color"
                    type="number"
                    placeholder=""
                    label="Number of Parking Spaces"
                    labelClass="form-label fs-5 mt-2"
                    validate={validateNumberFieldGeneral}
                    fieldSubscription={FIELD_SUBSCRIPTION}
                  />
                </div>
              )}
            </>
          )}
        </FormSpy>
      </div>
      <div className="form-outline mb-2">
        <TextareaField
          name={`${name}.hall_description`}
          className="form-control form-control-lg input-border-color"
          label="Hall Description"
          labelClass="form-label fs-5 mt-2"
          placeholder=""
          fieldSubscription={FIELD_SUBSCRIPTION}
          validate={() => {}}
        />
      </div>
    </div>
  );
};

export default Hall;
