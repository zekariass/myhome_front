// @ts-nocheck
import React from "react";

export const dropdownInputFiled = (
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
  disabled = false
) => {
  /**
   * A function that returns regular HTML select field by setting field properties
   *  and state recieved from caller component
   */
  // console.log("Meta: ", meta);
  const { onChange, ...inputRest } = input;

  return (
    <div>
      <label className={labelClass}>{label}</label>
      <select
        {...inputRest}
        className={className}
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
            {option.name}
          </option>
        ))}
      </select>
      {((meta.touched && meta.error && !disabled) ||
        (meta.error && meta.submitting && !disabled)) && (
        <span className="error-general m-2">{meta.error}</span>
      )}
    </div>
  );
};
