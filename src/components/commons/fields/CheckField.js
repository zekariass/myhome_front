import React from "react";
import { Field } from "react-final-form";
import CheckCustomInput from "./CheckCustomInput";

const CheckField = ({
  name,
  label,
  type,
  className,
  labelLink,
  labelClass,
  initialValue,
  disabled,
  fieldSubscription,
  onCheckboxChange,
}) => {
  return (
    <Field
      name={name}
      type={type}
      className={className}
      label={label}
      labelClass={labelClass}
      labelLink={labelLink}
      initialValue={initialValue}
      disabled={disabled}
      subscription={fieldSubscription}
      onCheckboxChange={onCheckboxChange}
    >
      {({
        input,
        meta,
        className,
        label,
        labelLink,
        disabled,
        onCheckboxChange,
      }) => (
        <CheckCustomInput
          input={input}
          meta={meta}
          className={className}
          label={label}
          labelLink={labelLink}
          labelClass={labelClass}
          disabled={disabled}
          onCheckboxChange={onCheckboxChange}
        />
      )}
    </Field>
  );
};

export default CheckField;
