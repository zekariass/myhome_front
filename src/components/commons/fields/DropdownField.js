import React from "react";
import { Field } from "react-final-form";
import DropdownCustomInput from "./DropdownCustomInput";

const DropdownField = ({
  name,
  label,
  className,
  labelClass,
  options,
  disabled,
  fieldSubscription,
  validate,
  dispatchObj,
  customOnChange,
}) => {
  return (
    <Field
      name={name}
      className={className}
      label={label}
      labelClass={labelClass}
      options={options}
      disabled={disabled}
      validate={validate}
      subscription={fieldSubscription}
    >
      {({ input, meta, options, className, label, labelClass, disabled }) => (
        <DropdownCustomInput
          input={input}
          meta={meta}
          options={options}
          className={className}
          label={label}
          labelClass={labelClass}
          disabled={disabled}
          dispatchObj={dispatchObj}
          customOnChange={customOnChange}
        />
      )}
    </Field>
  );
};

export default DropdownField;
