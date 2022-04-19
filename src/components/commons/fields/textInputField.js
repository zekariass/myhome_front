import React from "react";

export const textInputField = (
  input,
  meta,
  className,
  placeholder,
  label,
  labelClass
) => {
  /**
   * A function that returns regular HTML fields by setting field properties
   *  and state recieved from caller component
   */
  // console.log("META: ", input);
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <input {...input} className={className} placeholder={placeholder} />
      {((meta.touched && meta.error) || (meta.error && meta.submitting)) && (
        <span className="error-general m-2">{meta.error}</span>
      )}
    </div>
  );
};
