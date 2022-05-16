import React from "react";
import { Field } from "react-final-form";
import CheckCustomInput from "./CheckCustomInput";

const CheckField = ({
  name,
  label,
  type,
  className,
  labelLink,
  initialValue,
  disabled,
  fieldSubscription,
}) => {
  return (
    <Field
      name={name}
      type={type}
      className={className}
      label={label}
      labelLink={labelLink}
      initialValue={initialValue}
      disabled={disabled}
      subscription={fieldSubscription}
    >
      {({ input, meta, className, label, labelLink, disabled }) => (
        <CheckCustomInput
          input={input}
          meta={meta}
          className={className}
          label={label}
          labelLink={labelLink}
          disabled={disabled}
        />
      )}
    </Field>
  );
};

export default CheckField;
