// @ts-nocheck
import CheckField from "components/commons/fields/CheckField";
import DropdownField from "components/commons/fields/DropdownField";
import TextField from "components/commons/fields/TextField";
import { FIELD_SUBSCRIPTION } from "components/commons/fieldSubscription";
import React from "react";
import { useSelector } from "react-redux";

/**
 * Office form
 * @param {*} param0
 * @returns
 */
const Office = ({ name, title }) => {
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

  return (
    <>
      <p className="fs-4 fw-bold flex-center-general">{title}</p>

      <div className="row row-cols-1 row-cols-sm-2 my-3">
        <div className="form-outline mb-2">
          <DropdownField
            name={`${name}.building_type`}
            className="form-control form-control-lg input-border-color"
            label="Building Type"
            labelClass="form-label fs-5 mt-2"
            options={[{ id: "-1", name: "--Select building type--" }, ...data]}
            disabled={false}
            validate={() => {}}
            subscription={FIELD_SUBSCRIPTION}
          />
        </div>
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
        <div className="col form-outline mt-3 mt-sm-4 ps-sm-4 mb-2">
          <CheckField
            name={`${name}.is_furnished`}
            type="checkbox"
            className="form-check-input me-2 mb-3"
            label="Is Furnished?"
            labelLink=""
            initialValue={false}
            subscription={FIELD_SUBSCRIPTION}
          />
        </div>
        <div className="col form-outline mt-3 mt-sm-4 ps-sm-4 mb-2">
          <CheckField
            name={`${name}.is_new`}
            type="checkbox"
            className="form-check-input me-2"
            label="Is New?"
            labelLink=""
            initialValue={false}
            fieldSubscription={FIELD_SUBSCRIPTION}
            disabled={false}
          />
        </div>
        <div className="col form-outline mt-3 mt-sm-4 ps-sm-4 mb-2">
          <CheckField
            name={`${name}.has_parking_space`}
            type="checkbox"
            className="form-check-input me-2"
            label="Has Parking Space?"
            labelLink=""
            initialValue={true}
            fieldSubscription={FIELD_SUBSCRIPTION}
            disabled={false}
          />
        </div>
      </div>
    </>
  );
};

export default Office;
