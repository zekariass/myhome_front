import React from "react";
import { Field } from "react-final-form";
import TextCustomInput from "./TextCustomInput";

const TextField = ({
  name,
  type,
  placeholder,
  label,
  fieldSubscription,
  className,
  labelClass,
  validate,
}) => {
  return (
    <Field
      name={name}
      className={className}
      type={type}
      placeholder={placeholder}
      label={label}
      labelClass={labelClass}
      subscription={fieldSubscription}
      validate={validate}
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
  );
};

export default TextField;
