import React from "react";

export const dropdownInputFiled = (
  input,
  meta,
  options,
  className,
  label,
  labelClass
) => {
  /**
   * A function that returns regular HTML select field by setting field properties
   *  and state recieved from caller component
   */
  //   console.log("META: ", meta);
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <select
        {...input}
        className={className}
        style={
          (meta.touched && meta.error) || (meta.error && meta.submitting)
            ? { borderColor: "red" }
            : {}
        }
      >
        {options.map((option, index) => (
          <option value={option} key={index}>
            {option}
          </option>
        ))}
      </select>
      {((meta.touched && meta.error) || (meta.error && meta.submitting)) && (
        <span className="error-general m-2">{meta.error}</span>
      )}
    </div>
  );
};
