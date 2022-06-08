// @ts-nocheck
import CheckField from "components/commons/fields/CheckField";
import DropdownField from "components/commons/fields/DropdownField";
import TextField from "components/commons/fields/TextField";
import { FIELD_SUBSCRIPTION } from "components/commons/fieldSubscription";
import React, { useState } from "react";
import { FormSpy } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { useSelector } from "react-redux";
import CommercialPropertyUnit from "./CommercialPropertyUnit";

/**
 * Commercial Property Unit
 * @param {*} param0
 * @returns
 */
const CommercialProperty = ({ name, title, isEdit }) => {
  let { data } = useSelector((store) => store.buildingType.response);

  const [numberOfUnitsShown, setNumberOfUnitsShown] = useState(1);

  /**
   * Commercial property field key inside values object
   */
  const COMMERCIAL_PROPERTY_UNIT_FIELD_NAME =
    "category.commercial_property.units";

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
        <div className="form-outline mb-2">
          <DropdownField
            name={`${name}.building_type`}
            className="form-control form-control-lg input-border-color"
            label="Building Type"
            labelClass="form-label fs-5 mt-2"
            options={[{ id: "-1", type: "--Select building type--" }, ...data]}
            disabled={false}
            validate={() => {}}
            subscription={FIELD_SUBSCRIPTION}
          />
        </div>
        <div className="col form-outline mb-2">
          <TextField
            name={`${name}.floors`}
            className="form-control form-control-lg input-border-color"
            type="number"
            placeholder=""
            label="Number of floors"
            labelClass="form-label fs-5 mt-2"
            subscription={FIELD_SUBSCRIPTION}
            validate={() => {}}
          />
        </div>
        <CheckField
          name={`${name}.is_new`}
          type="checkbox"
          className="form-check-input me-2"
          label="Is New?"
          labelLink=""
          initialValue={false}
          subscription={FIELD_SUBSCRIPTION}
        />
        <div className="col form-outline mb-2">
          <CheckField
            name={`${name}.has_parking_space`}
            type="checkbox"
            className="form-check-input me-2"
            label="Has Parking Space?"
            labelLink=""
            initialValue={false}
            disabled={false}
            subscription={FIELD_SUBSCRIPTION}
          />
        </div>
        <div className="col form-outline mb-2">
          <CheckField
            name={`${name}.is_multi_unit`}
            type="checkbox"
            className="form-check-input me-2"
            label="Is Multi Unit?"
            labelLink=""
            initialValue={numberOfUnitsShown > 1 ? true : false}
            disabled={true}
            subscription={FIELD_SUBSCRIPTION}
          />
        </div>
      </div>
      {!isEdit && (
        <div className="my-3">
          <p className="flex-center-general fs-4 fw-bold">
            Add Commercial Property Unit
          </p>
          {/* FormSpy allows us to access form states without re-rendering the form */}
          <FormSpy>
            {({
              form: {
                mutators: { push, pop },
              },
            }) => (
              <div>
                {/* Field array allows us to dynamically group of fields  */}
                <FieldArray name={COMMERCIAL_PROPERTY_UNIT_FIELD_NAME}>
                  {({ fields }) =>
                    fields.map((name, index) => {
                      setNumberOfUnitsShown(index + 1);
                      return (
                        <div className="py-3" key={index}>
                          <CommercialPropertyUnit
                            name={name}
                            index={index}
                            fields={fields}
                            title="Add Commercial Property unit"
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
                        onClick={() => pop(COMMERCIAL_PROPERTY_UNIT_FIELD_NAME)}
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
                      onClick={() =>
                        push(COMMERCIAL_PROPERTY_UNIT_FIELD_NAME, undefined)
                      }
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
      )}
    </div>
  );
};

export default CommercialProperty;
