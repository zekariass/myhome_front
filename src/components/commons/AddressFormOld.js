// // @ts-nocheck
// import { setAgentAddress } from "features/agent/agentSlice";
// import {
//   getCitiesByRegion,
//   getCountries,
//   getRegionsByCountry,
// } from "features/common/addressSlice";
// import React, { useEffect } from "react";
// import { Field, Form, FormSpy } from "react-final-form";
// import { OnChange } from "react-final-form-listeners";
// import { useDispatch, useSelector } from "react-redux";
// import { dropdownInputFiled } from "./fields/dropdownInputFiled";
// import { textInputField } from "./fields/textInputField";

// const AddressForm = ({ label, title, currentStep, setCurrentStep }) => {
//   /**
//    * dispatch object to dispatch the address data to redux store
//    */
//   const dispatch = useDispatch();

//   /**
//    * Retrieve Regions from redux store
//    */
//   const { regionList } = useSelector((store) => store.address.region);

//   /**
//    * Retrieve Cities from redux store
//    */
//   const { cityList } = useSelector((store) => store.address.city);

//   /**
//    * Retrieve country list from redux store
//    */
//   const { countryList } = useSelector((store) => store.address.country);

//   /**
//    * Retrieve address data from redux store
//    */
//   const { agentAddress } = useSelector((store) => store.agent.addAgent);

//   /**
//    * Field subscription setting
//    */
//   const fieldSubscription = {
//     submitting: true,
//     value: true,
//     touched: true,
//     error: true,
//   };

//   useEffect(() => {
//     /**
//      * Retrieve countries from backend when this component is mounted
//      * to be listed in address form countries selection
//      */
//     dispatch(getCountries());
//   }, []);

//   const onSubmit = (values) => {
//     /**
//      * Handles the submit form actton
//      * Used as prop in React final form
//      */
//     dispatch(setAgentAddress(values));
//     /**
//      * When continue button clicked, increment the currentStep of the agent add form step
//      */
//     setCurrentStep(currentStep + 1);
//   };

//   return (
//     <Form
//       onSubmit={onSubmit}
//       validate={validate}
//       //   subscription={{ submitting: true }}
//       initialValues={agentAddress}
//     >
//       {({ handleSubmit, values, submitting, pristine }) => {
//         return (
//           <div>
//             <p className="fs-4 flex-center-general mb-4">{title}</p>
//             <form onSubmit={handleSubmit}>
//               <WhenFieldChanges
//                 field="country"
//                 //   becomes={`-1` | undefined}
//                 set="region"
//                 to="-1"
//               />
//               <WhenFieldChanges
//                 field="country"
//                 //   becomes={`-1` | undefined}
//                 set="city"
//                 to="-1"
//               />
//               <WhenFieldChanges
//                 field="region"
//                 //   becomes={`-1` | undefined }
//                 set="city"
//                 to="-1"
//               />
//               <div className="row row-cols-1 row-cols-lg-2 g-3">
//                 <div className="col form-outline mb-2">
//                   <Field
//                     name="street"
//                     className="form-control form-control-lg input-border-color"
//                     type="text"
//                     placeholder=""
//                     label={`${label} Street`}
//                     labelClass="form-label fs-5 mt-2"
//                     subscription={{
//                       submitting: true,
//                       value: true,
//                       touched: true,
//                       error: true,
//                     }}
//                   >
//                     {({
//                       input,
//                       meta,
//                       className,
//                       placeholder,
//                       label,
//                       labelClass,
//                     }) =>
//                       textInputField(
//                         input,
//                         meta,
//                         className,
//                         placeholder,
//                         label,
//                         labelClass
//                       )
//                     }
//                   </Field>
//                 </div>
//                 <div className="col form-outline mb-2">
//                   <Field
//                     name="building_name_or_number"
//                     className="form-control form-control-lg input-border-color"
//                     type="text"
//                     placeholder=""
//                     label="Building name/num"
//                     labelClass="form-label fs-5 mt-2"
//                     subscription={{
//                       submitting: true,
//                       value: true,
//                       touched: true,
//                       error: true,
//                     }}
//                   >
//                     {({
//                       input,
//                       meta,
//                       className,
//                       placeholder,
//                       label,
//                       labelClass,
//                     }) =>
//                       textInputField(
//                         input,
//                         meta,
//                         className,
//                         placeholder,
//                         label,
//                         labelClass
//                       )
//                     }
//                   </Field>
//                 </div>
//                 <div className="col form-outline mb-2">
//                   <Field
//                     name="room_number"
//                     className="form-control form-control-lg input-border-color"
//                     type="text"
//                     placeholder=""
//                     label="Room number"
//                     labelClass="form-label fs-5 mt-2"
//                     subscription={{
//                       submitting: true,
//                       value: true,
//                       touched: true,
//                       error: true,
//                     }}
//                   >
//                     {({
//                       input,
//                       meta,
//                       className,
//                       placeholder,
//                       label,
//                       labelClass,
//                     }) =>
//                       textInputField(
//                         input,
//                         meta,
//                         className,
//                         placeholder,
//                         label,
//                         labelClass
//                       )
//                     }
//                   </Field>
//                 </div>
//                 <div className="col form-outline mb-2">
//                   <Field
//                     name="post_code"
//                     className="form-control form-control-lg input-border-color"
//                     type="text"
//                     placeholder=""
//                     label={`${label} Post code`}
//                     labelClass="form-label fs-5 mt-2"
//                     subscription={{
//                       submitting: true,
//                       value: true,
//                       touched: true,
//                       error: true,
//                     }}
//                   >
//                     {({
//                       input,
//                       meta,
//                       className,
//                       placeholder,
//                       label,
//                       labelClass,
//                     }) =>
//                       textInputField(
//                         input,
//                         meta,
//                         className,
//                         placeholder,
//                         label,
//                         labelClass
//                       )
//                     }
//                   </Field>
//                 </div>
//                 <div className="col form-outline mb-2">
//                   <Field
//                     name="country"
//                     className="form-control form-control-lg input-border-color"
//                     label="Country"
//                     labelClass="form-label fs-5 mt-2"
//                     options={[
//                       { id: "-1", name: "--Select Country--" },
//                       ...countryList,
//                     ]}
//                     customOnChange={getRegionsFromBackend}
//                     dispatchObj={dispatch}
//                     subscription={fieldSubscription}
//                   >
//                     {({
//                       input,
//                       meta,
//                       options,
//                       className,
//                       label,
//                       labelClass,
//                       customOnChange,
//                       dispatchObj,
//                     }) =>
//                       dropdownInputFiled(
//                         input,
//                         meta,
//                         options,
//                         className,
//                         label,
//                         labelClass,
//                         customOnChange,
//                         dispatchObj
//                       )
//                     }
//                   </Field>
//                 </div>
//                 <div className="col form-outline mb-2">
//                   <Field
//                     name="region"
//                     className="form-control form-control-lg input-border-color"
//                     label="Region"
//                     labelClass="form-label fs-5 mt-2"
//                     options={[
//                       { id: "-1", name: "--Select Region--" },
//                       ...regionList,
//                     ]}
//                     customOnChange={getCitiesFromBackend}
//                     dispatchObj={dispatch}
//                     disabled={!values.country || values.country === "-1"}
//                     subscription={fieldSubscription}
//                   >
//                     {({
//                       input,
//                       meta,
//                       options,
//                       className,
//                       label,
//                       labelClass,
//                       customOnChange,
//                       dispatchObj,
//                       disabled,
//                     }) =>
//                       dropdownInputFiled(
//                         input,
//                         meta,
//                         options,
//                         className,
//                         label,
//                         labelClass,
//                         customOnChange,
//                         dispatchObj,
//                         disabled
//                       )
//                     }
//                   </Field>
//                 </div>
//                 <div className="col form-outline mb-2">
//                   <Field
//                     name="city"
//                     className="form-control form-control-lg input-border-color"
//                     label="City"
//                     labelClass="form-label fs-5 mt-2"
//                     options={[
//                       { id: "-1", name: "--Select City--" },
//                       ...cityList,
//                     ]}
//                     disabled={
//                       !values.country ||
//                       values.country === "-1" ||
//                       !values.region ||
//                       values.region === "-1"
//                     }
//                     subscription={fieldSubscription}
//                   >
//                     {({
//                       input,
//                       meta,
//                       options,
//                       className,
//                       label,
//                       labelClass,
//                       disabled,
//                     }) =>
//                       dropdownInputFiled(
//                         input,
//                         meta,
//                         options,
//                         className,
//                         label,
//                         labelClass,
//                         null,
//                         null,
//                         disabled
//                       )
//                     }
//                   </Field>
//                 </div>
//               </div>
//               <div className="">
//                 <div className="row row-cols-1 row-cols-lg-2 g-3 mt-1">
//                   <div className="col form-outline mb-2">
//                     <Field
//                       name="longitude"
//                       className="form-control form-control-lg input-border-color"
//                       type="text"
//                       placeholder=""
//                       label="Longitude"
//                       labelClass="form-label fs-5 mt-2"
//                       subscription={{
//                         submitting: true,
//                         value: true,
//                         touched: true,
//                         error: true,
//                       }}
//                     >
//                       {({
//                         input,
//                         meta,
//                         className,
//                         placeholder,
//                         label,
//                         labelClass,
//                       }) =>
//                         textInputField(
//                           input,
//                           meta,
//                           className,
//                           placeholder,
//                           label,
//                           labelClass
//                         )
//                       }
//                     </Field>
//                   </div>
//                   <div className="col form-outline mb-2">
//                     <Field
//                       name="latitude"
//                       className="form-control form-control-lg input-border-color"
//                       type="text"
//                       placeholder=""
//                       label="Latitude"
//                       labelClass="form-label fs-5 mt-2"
//                       subscription={{
//                         submitting: true,
//                         value: true,
//                         touched: true,
//                         error: true,
//                       }}
//                     >
//                       {({
//                         input,
//                         meta,
//                         className,
//                         placeholder,
//                         label,
//                         labelClass,
//                       }) =>
//                         textInputField(
//                           input,
//                           meta,
//                           className,
//                           placeholder,
//                           label,
//                           labelClass
//                         )
//                       }
//                     </Field>
//                   </div>
//                 </div>
//               </div>
//               <div className="row mt-4">
//                 <div className="col-lg-6 pt-1 mb-4 flex-center-general order-1 order-lg-0">
//                   <button
//                     className="btn-general py-2 w-75"
//                     type="button"
//                     onClick={() =>
//                       onBackButtonClick(currentStep, setCurrentStep)
//                     }
//                   >
//                     Back
//                   </button>
//                 </div>
//                 <div className="col-lg-6 pt-1 mb-4 flex-center-general order-0 order-lg-1">
//                   <button className="btn-general py-2 w-75" type="submit">
//                     Continue
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         );
//       }}
//     </Form>
//   );
// };

// export default AddressForm;

// //Inline functions

// const WhenFieldChanges = ({ field, set, to }) => (
//   <Field name={set}>
//     {({ input: { onChange } }) => (
//       <FormSpy>
//         {({ form, values }) => (
//           <OnChange name={field}>
//             {(value) => {
//               //   console.log("HEY VALUE HERE: ", values);
//               onChange(to);
//             }}
//           </OnChange>
//         )}
//       </FormSpy>
//     )}
//   </Field>
// );

// const onBackButtonClick = (currentStep, setCurrentStep) => {
//   /**
//    * Handles the back button click action
//    */
//   setCurrentStep(currentStep - 1);
// };

// /**
//  * Get Regions in a country when the country is selected from the dropdown
//  */
// const getRegionsFromBackend = (event, dispatch) => {
//   const countryId = event.target.value;
//   if (countryId !== "-1") {
//     dispatch(getRegionsByCountry(countryId));
//   }
// };

// /**
//  * Get Cities in a region when the Region is selected from the dropdown
//  */
// const getCitiesFromBackend = (event, dispatch) => {
//   const cityId = event.target.value;
//   if (cityId !== "-1") {
//     dispatch(getCitiesByRegion(cityId));
//   }
// };

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
