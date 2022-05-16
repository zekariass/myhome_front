// @ts-nocheck
import CheckField from "components/commons/fields/CheckField";
import DropdownField from "components/commons/fields/DropdownField";
import TextField from "components/commons/fields/TextField";
import { FIELD_SUBSCRIPTION } from "components/commons/fieldSubscription";
import React from "react";
import { useSelector } from "react-redux";

/**
 * Sharehouse add and update form
 * @param {*} param0
 * @returns
 */
const ShareHouse = ({ name, title }) => {
  //Retrieve house type
  let { data } = useSelector((store) => store.houseType.response);
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
            name={`${name}.house_type`}
            className="form-control form-control-lg input-border-color"
            label="House Type"
            labelClass="form-label fs-5 mt-2"
            options={[{ id: "-1", name: "--Select house type--" }, ...data]}
            disabled={false}
            validate={() => {}}
            dispatchObj={null}
            customOnChange={null}
            fieldSubscription={FIELD_SUBSCRIPTION}
          />
        </div>
        <div className="col form-outline mb-2">
          <TextField
            name={`${name}.total_number_of_rooms`}
            className="form-control form-control-lg input-border-color"
            type="number"
            placeholder=""
            label="Total Number of Rooms"
            labelClass="form-label fs-5 mt-2"
            validate={validateNumberFieldGeneral}
            fieldSubscription={FIELD_SUBSCRIPTION}
          />
        </div>
        <div className="col form-outline mb-2">
          <TextField
            name={`${name}.number_of_rooms_to_share`}
            className="form-control form-control-lg input-border-color"
            type="number"
            placeholder=""
            label="Number of Rooms to Share"
            labelClass="form-label fs-5 mt-2"
            validate={validateNumberFieldGeneral}
            fieldSubscription={FIELD_SUBSCRIPTION}
          />
        </div>
        <div className="col form-outline mb-2">
          <TextField
            name={`${name}.total_number_of_bed_rooms`}
            className="form-control form-control-lg input-border-color"
            type="number"
            placeholder=""
            label="Total Number of Bed Rooms"
            labelClass="form-label fs-5 mt-2"
            validate={validateNumberFieldGeneral}
            fieldSubscription={FIELD_SUBSCRIPTION}
          />
        </div>
        <div className="col form-outline mb-2">
          <TextField
            name={`${name}.number_of_bed_rooms_to_share`}
            className="form-control form-control-lg input-border-color"
            type="number"
            placeholder=""
            label="Number of Bed Rooms to Share"
            labelClass="form-label fs-5 mt-2"
            validate={validateNumberFieldGeneral}
            fieldSubscription={FIELD_SUBSCRIPTION}
          />
        </div>
        <div className="col form-outline mb-2">
          <TextField
            name={`${name}.total_number_of_baths`}
            className="form-control form-control-lg input-border-color"
            type="number"
            placeholder=""
            label="Total Number of Baths"
            labelClass="form-label fs-5 mt-2"
            validate={validateNumberFieldGeneral}
            fieldSubscription={FIELD_SUBSCRIPTION}
          />
        </div>
        <div className="col form-outline mb-2">
          <TextField
            name={`${name}.number_of_baths_to_share`}
            className="form-control form-control-lg input-border-color"
            type="number"
            placeholder=""
            label="Number of Baths to Share"
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
        <div className="col form-outline mb-2">
          <TextField
            name={`${name}.area`}
            className="form-control form-control-lg input-border-color"
            type="number"
            placeholder=""
            label="Area"
            labelClass="form-label fs-5 mt-2"
            validate={() => {}}
            fieldSubscription={FIELD_SUBSCRIPTION}
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
            disabled={false}
            fieldSubscription={FIELD_SUBSCRIPTION}
          />
          <div className="col form-outline my-2 order-last">
            <CheckField
              name={`${name}.is_new`}
              type="checkbox"
              className="form-check-input me-2"
              label="Is New?"
              labelLink=""
              initialValue={false}
              disabled={false}
              fieldSubscription={FIELD_SUBSCRIPTION}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ShareHouse;
