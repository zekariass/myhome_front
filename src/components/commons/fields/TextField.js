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
  id,
  labelClass,
  validate,
  onInputChange,
  areaDescribedBy,
  initialValue,
}) => {
  return (
    <Field
      name={name}
      className={className}
      id={id}
      type={type}
      placeholder={placeholder}
      label={label}
      labelClass={labelClass}
      subscription={fieldSubscription}
      validate={validate}
      initialValue={initialValue}
    >
      {({ input, meta, className, id, placeholder, label, labelClass }) => (
        <TextCustomInput
          input={input}
          meta={meta}
          className={className}
          id={id}
          placeholder={placeholder}
          label={label}
          labelClass={labelClass}
          onInputChange={onInputChange}
          areaDescribedBy={areaDescribedBy}
        />
      )}
    </Field>
  );
};

export default TextField;
