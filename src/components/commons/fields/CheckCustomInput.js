import React from "react";
import { Link } from "react-router-dom";

const CheckCustomInput = ({
  input,
  meta,
  className,
  label,
  labelLink,
  labelClass,
  disabled,
  onCheckboxChange,
}) => {
  /**
   * A function that returns regular HTML checkbox by setting field properties
   *  and state recieved from caller component
   */
  // console.log("META: ", meta, input);

  const { onChange } = input;
  return (
    <div>
      <input
        {...input}
        className={className}
        disabled={disabled}
        onChange={(event) => {
          onChange(event);

          if (onCheckboxChange) {
            onCheckboxChange(event);
          }
        }}
      />
      <span>
        <label className={labelClass}> {label}</label>
        <Link to="" className="link-general link-size-normal link-hover">
          {labelLink}
        </Link>
      </span>
      {/* Show error message */}
      {((meta.touched && meta.error) || (meta.error && meta.submitting)) && (
        <div className="error-general m-2">{meta.error}</div>
      )}
    </div>
  );
};

export default CheckCustomInput;
