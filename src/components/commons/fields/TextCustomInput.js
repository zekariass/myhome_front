import React from "react";

const TextCustomInput = ({
  input,
  meta,
  className,
  placeholder,
  label,
  labelClass,
  onInputChange,
}) => {
  /**
   * A function that returns regular HTML fields by setting field properties
   *  and state recieved from caller component
   */
  // console.log("META: ", meta);
  const { onChange, ...inputRest } = input;

  return (
    <div>
      <label className={labelClass}>{label}</label>
      <input
        {...inputRest}
        className={className}
        placeholder={placeholder}
        onChange={(event) => {
          onChange(event);
          if (onInputChange) {
            onInputChange(event);
          }
        }}
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

export default TextCustomInput;
