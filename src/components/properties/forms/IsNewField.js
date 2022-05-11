import CheckCustomInput from "components/commons/fields/CheckCustomInput";
import React from "react";
import { Field } from "react-final-form";

const IsNewField = ({ label }) => {
  /**
   * Field subscription object
   */
  const fieldSubscription = {
    submitting: true,
    value: true,
    touched: true,
    error: true,
  };

  return (
    <>
      <div className="col form-outline my-2 order-last">
        <Field
          name={`${label}.is_new`}
          type="checkbox"
          className="form-check-input me-2"
          label="Is New?"
          labelLink=""
          initialValue={false}
          subscription={fieldSubscription}
        >
          {({ input, meta, className, label, labelLink }) => (
            // @ts-ignore
            <CheckCustomInput
              input={input}
              meta={meta}
              className={className}
              label={label}
              labelLink={labelLink}
            />
          )}
        </Field>
      </div>
    </>
  );
};

export default IsNewField;
