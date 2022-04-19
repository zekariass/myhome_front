import React from "react";
import { Link } from "react-router-dom";

export const checkInputField = (input, meta, className, label, labelLink) => {
  /**
   * A function that returns regular HTML checkbox by setting field properties
   *  and state recieved from caller component
   */
  // console.log("META: ", meta, input);

  return (
    <div>
      <input {...input} className={className} />
      <span>
        {label}
        <Link to="" className="link-general link-size-normal link-hover">
          {labelLink}
        </Link>
      </span>
      {((meta.touched && meta.error) || (meta.error && meta.submitting)) && (
        <div className="error-general m-2">{meta.error}</div>
      )}
    </div>
  );
};
