// @ts-nocheck
import React from "react";
import { FormSpy } from "react-final-form";

const DropdownCustomInput = ({
  input,
  meta,

  //Options to be displayed in select component
  options,
  className,
  label,
  labelClass,

  //Custom onChange function passed to handle action when item selected
  customOnChange,

  //dispatch object to be used to dispatch the action creater in redux
  dispatchObj,
  disabled,
  // onPropCategoryCange,
}) => {
  /**
   * A function that returns regular HTML select field by setting field properties
   *  and state recieved from caller component
   */
  // console.log("valuesssssssss: ", values);
  const { onChange, ...inputRest } = input;

  return (
    <div>
      <label className={labelClass}>{label}</label>
      <select
        {...inputRest}
        className={`form-select ${className}`}
        disabled={disabled}
        onChange={(event) => {
          /**
           * override the onChange listener function and pass event
           */
          onChange(event);

          /**
           * if custom onChange function and redux dispatch object passed,
           * means if they are not null pass event and the dispatch object
           * to the custom onChange function
           */
          if (customOnChange && dispatchObj) {
            customOnChange(event, dispatchObj);
          }
        }}
        style={
          (meta.touched && meta.error && !disabled) ||
          (meta.error && meta.submitting && !disabled)
            ? { borderColor: "red" }
            : {}
        }
      >
        {options.map((option, index) => (
          <option value={option.id} key={index}>
            {/* render option based on its attribute name, name, type, etc.
            e.g. property categories has "name", while house types and building types has "type" */}
            {option.name}
            {option.type}
            {option.level}
            {option.period}
          </option>
        ))}
      </select>
      {/* Show error message */}
      {((meta.touched && meta.error && !disabled) ||
        (meta.error && meta.submitting && !disabled)) && (
        <span className="error-general m-2">{meta.error}</span>
      )}
    </div>
  );
};
export default DropdownCustomInput;
