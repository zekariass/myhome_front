import TextCustomInput from "components/commons/fields/TextCustomInput";
import React from "react";
import { Field } from "react-final-form";
import AreaField from "./AreaField";
import CommonResidentialFields from "./CommonResidentialFields";
import IsNewField from "./IsNewField";

const Condominium = ({ label, title }) => {
  /**
   * Field subscription object
   */
//   const fieldSubscription = {
//     submitting: true,
//     value: true,
//     touched: true,
//     error: true,
//   };

  return (
    <>
      <p className="fs-4 fw-bold flex-center-general">{title}</p>

      <div className="row row-cols-1 row-cols-sm-2 my-3">
        {/* <div className="col form-outline mb-2">
        <Field
          name={`${label}.floors`}
          className="form-control form-control-lg input-border-color"
          type="number"
          placeholder=""
          label="Number of floors"
          labelClass="form-label fs-5 mt-2"
          subscription={fieldSubscription}
          // validate={validateFiedGeneral}
        >
          {({ input, meta, className, placeholder, label, labelClass }) => (
            <TextCustomInput
              input={input}
              meta={meta}
              className={className}
              placeholder={placeholder}
              label={label}
              labelClass={labelClass}
            />
          )}
        </Field>
      </div> */}
        <AreaField label={label} fieldName="area" />
        <CommonResidentialFields label={label} />
        <IsNewField label={label} />
      </div>
    </>
  );
};

export default Condominium;
