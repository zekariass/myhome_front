// @ts-nocheck
import DropdownField from "components/commons/fields/DropdownField";
import TextareaField from "components/commons/fields/TextareaField";
import TextField from "components/commons/fields/TextField";
import { FIELD_SUBSCRIPTION } from "components/commons/fieldSubscription";
import { setSelectedLitingType } from "features/listing/listingSlice";
import React, { useState } from "react";
import { OnChange } from "react-final-form-listeners";
import { useDispatch, useSelector } from "react-redux";

const BasicListingForm = ({ title, isEdit }) => {
  const dispatch = useDispatch();

  //Get listing types from redux store
  const listingTypes = useSelector(
    (store) => store.listing.getListingTypes.data
  );

  //Get currencies from redux store
  const currencies = useSelector(
    (store) => store.system.currency.currencyList.data
  );

  //Get periodicity from redux store
  const periodicities = useSelector(
    (store) => store.common.periodicityList.data
  );

  return (
    <div>
      <p className="fw-bold display-title my-3">{title}</p>

      <div className="row row-cols-1 row-cols-sm-2 my-3">
        <div className="col form-outline mb-2">
          {/* Set the selected listing type, sale or rent, in redux store */}
          <OnChange name="listing_type">
            {(value) => {
              dispatch(setSelectedLitingType(value));
            }}
          </OnChange>

          <DropdownField
            name="listing_type"
            className="form-control form-control-lg input-border-color"
            label="Listing Type"
            labelClass="form-label fs-5 mt-2"
            options={[{ id: "-1", level: "--Select type--" }, ...listingTypes]}
            disabled={isEdit ? true : false}
            validate={() => {}}
            fieldSubscription={FIELD_SUBSCRIPTION}
          />
        </div>
        <div className="form-outline mb-2">
          <TextField
            name="property_price"
            className="form-control form-control-lg input-border-color"
            type="number"
            placeholder=""
            label="Property Price"
            labelClass="form-label fs-5 mt-2"
            validate={() => {}}
            fieldSubscription={FIELD_SUBSCRIPTION}
          />
        </div>

        <div className="col form-outline mb-2">
          <DropdownField
            name="listing_currency"
            className="form-control form-control-lg input-border-color"
            label="Currency"
            labelClass="form-label fs-5 mt-2"
            options={[
              { id: "-1", level: "--Select currency--" },
              ...currencies,
            ]}
            disabled={false}
            validate={() => {}}
            fieldSubscription={FIELD_SUBSCRIPTION}
          />
        </div>
        <div className="col form-outline mb-2">
          <DropdownField
            name="listing_term"
            className="form-control form-control-lg input-border-color"
            label="Listing Term"
            labelClass="form-label fs-5 mt-2"
            options={[{ id: "-1", level: "--Select Term--" }, ...periodicities]}
            disabled={false}
            validate={() => {}}
            fieldSubscription={FIELD_SUBSCRIPTION}
          />
        </div>

        <div className="col form-outline mb-2">
          <DropdownField
            name="deposit_in_months"
            className="form-control form-control-lg input-border-color"
            label="Deposit Required in Months"
            labelClass="form-label fs-5 mt-2"
            options={[
              { id: "-1", level: "--Select--" },
              ...[
                { id: 0, name: "0" },
                { id: 1, name: "1" },
                { id: 2, name: "2" },
                { id: 3, name: "3" },
                { id: 4, name: "4" },
                { id: 5, name: "5" },
                { id: 6, name: "6" },
                { id: 7, name: "7" },
                { id: 8, name: "8" },
                { id: 9, name: "9" },
                { id: 10, name: "10" },
                { id: 11, name: "11" },
                { id: 12, name: "12" },
              ],
            ]}
            disabled={false}
            validate={() => {}}
            fieldSubscription={FIELD_SUBSCRIPTION}
          />
        </div>
        <div className="col form-outline mb-2">
          <TextareaField
            name={`description`}
            className="form-control form-control-lg input-border-color"
            label="Listing Description"
            labelClass="form-label fs-5 mt-2"
            subscription={FIELD_SUBSCRIPTION}
            validate={() => {}}
          />
        </div>

        {/* Edit the listing state only during edit  */}
        {isEdit && (
          <div className="col form-outline mb-2">
            <DropdownField
              name="listing_state"
              className="form-control form-control-lg input-border-color"
              label="Listing State"
              labelClass="form-label fs-5 mt-2"
              options={[
                { id: "-1", name: "--Select State--" },
                { id: "ACTIVE", name: "Active" },
                { id: "INACTIVE", name: "Inactive" },
                { id: "UNAVAILABLE", name: "Unavailable" },
              ]}
              disabled={false}
              validate={() => {}}
              fieldSubscription={FIELD_SUBSCRIPTION}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicListingForm;
