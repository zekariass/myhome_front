// @ts-nocheck
import { setAgentAddress } from "features/agent/agentSlice";
import {
  getCitiesByRegion,
  getCountries,
  getRegionsByCountry,
} from "features/common/addressSlice";
import React, { useEffect } from "react";
import { Field, FormSpy } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import { useDispatch, useSelector } from "react-redux";
import { dropdownInputFiled } from "./fields/dropdownInputFiled";
import { textInputField } from "./fields/textInputField";

const AddressFormNew = ({ label, title }) => {
  /**
   * dispatch object to dispatch the address data to redux store
   */
  const dispatch = useDispatch();

  /**
   * Retrieve Regions from redux store
   */
  const { regionList } = useSelector((store) => store.address.region);

  /**
   * Retrieve Cities from redux store
   */
  const { cityList } = useSelector((store) => store.address.city);

  /**
   * Retrieve country list from redux store
   */
  const { countryList } = useSelector((store) => store.address.country);

  /**
   * Field subscription setting
   */
  const fieldSubscription = {
    submitting: true,
    value: true,
    touched: true,
    error: true,
  };

  useEffect(() => {
    /**
     * Retrieve countries from backend when this component is mounted
     * to be listed in address form countries selection
     */
    dispatch(getCountries());
  }, []);

  // const onSubmit = (values) => {
  //   /**
  //    * Handles the submit form actton
  //    * Used as prop in React final form
  //    */
  //   dispatch(setAgentAddress(values));
  //   /**
  //    * When continue button clicked, increment the currentStep of the agent add form step
  //    */
  //   setCurrentStep(currentStep + 1);
  // };

  /**
   * Field Validation
   */

  const streetRequired = (value) =>
    !value ? "Street is required!" : undefined;
  const countryRequired = (value) =>
    !value || value === "-1" ? "Country is required!" : undefined;
  const regionRequired = (value) =>
    !value || value === "-1" ? "Region is required!" : undefined;
  const cityRequired = (value) =>
    !value || value === "-1" ? "City is required!" : undefined;

  return (
    <FormSpy>
      {({ values }) => (
        <div>
          <WhenFieldChanges
            field={`${label}.country`}
            //   becomes={`-1` | undefined}
            set={`${label}.region`}
            to="-1"
          />
          <WhenFieldChanges
            field={`${label}.country`}
            //   becomes={`-1` | undefined}
            set={`${label}.city`}
            to="-1"
          />
          <WhenFieldChanges
            field={`${label}.region`}
            //   becomes={`-1` | undefined }
            set={`${label}.city`}
            to="-1"
          />

          <div className="row row-cols-1 row-cols-lg-2 g-3 py-3">
            <div className="col form-outline mb-2">
              <Field
                name={`${label}.street`}
                className="form-control form-control-lg input-border-color"
                type="text"
                placeholder=""
                label={`${label} Street`}
                labelClass="form-label fs-5 mt-2"
                validate={streetRequired}
                subscription={{
                  submitting: true,
                  value: true,
                  touched: true,
                  error: true,
                }}
              >
                {({ input, meta, className, placeholder, label, labelClass }) =>
                  textInputField(
                    input,
                    meta,
                    className,
                    placeholder,
                    label,
                    labelClass
                  )
                }
              </Field>
            </div>
            <div className="col form-outline mb-2">
              <Field
                name={`${label}.building_name_or_number`}
                className="form-control form-control-lg input-border-color"
                type="text"
                placeholder=""
                label="Building name/num"
                labelClass="form-label fs-5 mt-2"
                subscription={{
                  submitting: true,
                  value: true,
                  touched: true,
                  error: true,
                }}
              >
                {({ input, meta, className, placeholder, label, labelClass }) =>
                  textInputField(
                    input,
                    meta,
                    className,
                    placeholder,
                    label,
                    labelClass
                  )
                }
              </Field>
            </div>
            <div className="col form-outline mb-2">
              <Field
                name={`${label}.room_number`}
                className="form-control form-control-lg input-border-color"
                type="text"
                placeholder=""
                label="Room number"
                labelClass="form-label fs-5 mt-2"
                subscription={{
                  submitting: true,
                  value: true,
                  touched: true,
                  error: true,
                }}
              >
                {({ input, meta, className, placeholder, label, labelClass }) =>
                  textInputField(
                    input,
                    meta,
                    className,
                    placeholder,
                    label,
                    labelClass
                  )
                }
              </Field>
            </div>
            <div className="col form-outline mb-2">
              <Field
                name={`${label}.post_code`}
                className="form-control form-control-lg input-border-color"
                type="text"
                placeholder=""
                label={`${label} Post code`}
                labelClass="form-label fs-5 mt-2"
                subscription={{
                  submitting: true,
                  value: true,
                  touched: true,
                  error: true,
                }}
              >
                {({ input, meta, className, placeholder, label, labelClass }) =>
                  textInputField(
                    input,
                    meta,
                    className,
                    placeholder,
                    label,
                    labelClass
                  )
                }
              </Field>
            </div>
            <div className="col form-outline mb-2">
              <Field
                name={`${label}.country`}
                className="form-control form-control-lg input-border-color"
                label="Country"
                labelClass="form-label fs-5 mt-2"
                options={[
                  { id: "-1", name: "--Select Country--" },
                  ...countryList,
                ]}
                customOnChange={getRegionsFromBackend}
                dispatchObj={dispatch}
                validate={countryRequired}
                subscription={fieldSubscription}
              >
                {({
                  input,
                  meta,
                  options,
                  className,
                  label,
                  labelClass,
                  customOnChange,
                  dispatchObj,
                }) =>
                  dropdownInputFiled(
                    input,
                    meta,
                    options,
                    className,
                    label,
                    labelClass,
                    customOnChange,
                    dispatchObj
                  )
                }
              </Field>
            </div>
            <div className="col form-outline mb-2">
              <Field
                name={`${label}.region`}
                className="form-control form-control-lg input-border-color"
                label="Region"
                labelClass="form-label fs-5 mt-2"
                options={[
                  { id: "-1", name: "--Select Region--" },
                  ...regionList,
                ]}
                customOnChange={getCitiesFromBackend}
                dispatchObj={dispatch}
                disabled={
                  !values.address?.country || values.address?.country === "-1"
                }
                validate={regionRequired}
                subscription={fieldSubscription}
              >
                {({
                  input,
                  meta,
                  options,
                  className,
                  label,
                  labelClass,
                  customOnChange,
                  dispatchObj,
                  disabled,
                }) =>
                  dropdownInputFiled(
                    input,
                    meta,
                    options,
                    className,
                    label,
                    labelClass,
                    customOnChange,
                    dispatchObj,
                    disabled
                  )
                }
              </Field>
            </div>
            <div className="col form-outline mb-2">
              <Field
                name={`${label}.city`}
                className="form-control form-control-lg input-border-color"
                label="City"
                labelClass="form-label fs-5 mt-2"
                options={[{ id: "-1", name: "--Select City--" }, ...cityList]}
                disabled={
                  !values.address?.country ||
                  values.address?.country === "-1" ||
                  !values.address?.region ||
                  values.address?.region === "-1"
                }
                validate={cityRequired}
                subscription={fieldSubscription}
              >
                {({
                  input,
                  meta,
                  options,
                  className,
                  label,
                  labelClass,
                  disabled,
                }) =>
                  dropdownInputFiled(
                    input,
                    meta,
                    options,
                    className,
                    label,
                    labelClass,
                    null,
                    null,
                    disabled
                  )
                }
              </Field>
            </div>
          </div>
          <div className="">
            <div className="row row-cols-1 row-cols-lg-2 g-3 mt-1">
              <div className="col form-outline mb-2">
                <Field
                  name={`${label}.longitude`}
                  className="form-control form-control-lg input-border-color"
                  type="text"
                  placeholder=""
                  label="Longitude"
                  labelClass="form-label fs-5 mt-2"
                  subscription={{
                    submitting: true,
                    value: true,
                    touched: true,
                    error: true,
                  }}
                >
                  {({
                    input,
                    meta,
                    className,
                    placeholder,
                    label,
                    labelClass,
                  }) =>
                    textInputField(
                      input,
                      meta,
                      className,
                      placeholder,
                      label,
                      labelClass
                    )
                  }
                </Field>
              </div>
              <div className="col form-outline mb-2">
                <Field
                  name={`${label}.latitude`}
                  className="form-control form-control-lg input-border-color"
                  type="text"
                  placeholder=""
                  label="Latitude"
                  labelClass="form-label fs-5 mt-2"
                  subscription={{
                    submitting: true,
                    value: true,
                    touched: true,
                    error: true,
                  }}
                >
                  {({
                    input,
                    meta,
                    className,
                    placeholder,
                    label,
                    labelClass,
                  }) =>
                    textInputField(
                      input,
                      meta,
                      className,
                      placeholder,
                      label,
                      labelClass
                    )
                  }
                </Field>
              </div>
            </div>
          </div>
        </div>
      )}
    </FormSpy>
  );
};

export default AddressFormNew;

//Inline functions

const WhenFieldChanges = ({ field, set, to }) => (
  <Field name={set}>
    {({ input: { onChange } }) => (
      <FormSpy>
        {({ form, values }) => (
          <OnChange name={field}>
            {(value) => {
              //   console.log("HEY VALUE HERE: ", values);
              onChange(to);
            }}
          </OnChange>
        )}
      </FormSpy>
    )}
  </Field>
);

/**
 * Get Regions in a country when the country is selected from the dropdown
 */
const getRegionsFromBackend = (event, dispatch) => {
  const countryId = event.target.value;
  if (countryId !== "-1") {
    dispatch(getRegionsByCountry(countryId));
  }
};

/**
 * Get Cities in a region when the Region is selected from the dropdown
 */
const getCitiesFromBackend = (event, dispatch) => {
  const cityId = event.target.value;
  if (cityId !== "-1") {
    dispatch(getCitiesByRegion(cityId));
  }
};

// /**
//  * Validates address form
//  * This function is injected by react final form validate prop
//  */
// const validate = (values) => {
//   // console.log("VALUES: ", values);
//   const errors = {};
//   if (!values.street) {
//     errors.street = "Street is required!";
//   }
//   if (!values.city || (values.city && values.city === "-1")) {
//     errors.city = "Select valid city!";
//   }
//   if (!values.region || (values.region && values.region === "-1")) {
//     errors.region = "Select valid region!";
//   }
//   if (!values.country || (values.country && values.country === "-1")) {
//     errors.country = "Select valid country!";
//   }

//   return errors;
// };
