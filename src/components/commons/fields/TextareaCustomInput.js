import React from "react";

const TextareaCustomInput = ({
  input,
  meta,
  className,
  placeholder,
  label,
  labelClass,
}) => {
  /**
   * A function that returns regular HTML textarea field by setting field properties
   *  and state recieved from caller component
   */
  // console.log("META: ", input);
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <textarea
        {...input}
        className={className}
        placeholder={placeholder}
        style={
          (meta.touched && meta.error) || (meta.error && meta.submitting)
            ? { borderColor: "red" }
            : {}
        }
      />
      {/* Show error message */}
      {((meta.touched && meta.error) || (meta.error && meta.submitting)) && (
        <span className="error-general m-2">{meta.error}</span>
      )}
    </div>
  );
};

export default TextareaCustomInput;
