import React from "react";
import { Field } from "react-final-form";
import TextareaCustomInput from "./TextareaCustomInput";

const TextareaField = ({
  name,
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
      label={label}
      placeholder={placeholder}
      labelClass={labelClass}
      subscription={fieldSubscription}
      validate={validate}
    >
      {({ input, meta, className, label, labelClass, placeholder }) => (
        <TextareaCustomInput
          input={input}
          meta={meta}
          className={className}
          label={label}
          labelClass={labelClass}
          placeholder={placeholder}
        />
      )}
    </Field>
  );
};

export default TextareaField;
