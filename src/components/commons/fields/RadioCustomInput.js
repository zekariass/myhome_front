import React from "react";
import { Link } from "react-router-dom";

const RadioCustomInput = ({
  input,
  meta,
  className,
  label,
  labelLink,
  disabled,
}) => {
  /**
   * A function that returns regular HTML checkbox by setting field properties
   *  and state recieved from caller component
   */
  // console.log("META: ", meta, input);

  return (
    <div>
      <input {...input} className={className} disabled={disabled} />
      <span>
        {label}
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

export default RadioCustomInput;
