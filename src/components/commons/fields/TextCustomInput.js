import React from "react";

const TextCustomInput = ({
  input,
  meta,
  className,
  id,
  placeholder,
  label,
  labelClass,
  onInputChange,
  areaDescribedBy,
}) => {
  /**
   * A function that returns regular HTML fields by setting field properties
   *  and state recieved from caller component
   */
  // console.log("META: ", input);
  const { onChange, ...inputRest } = input;

  return (
    <div>
      <label className={labelClass}>{label}</label>
      <input
        {...inputRest}
        className={className}
        placeholder={placeholder}
        id={id}
        area-describedby={areaDescribedBy}
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
