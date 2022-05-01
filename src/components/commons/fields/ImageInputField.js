import React from "react";

const ImageInputField = ({
  name,
  id,
  label,
  labelClass,
  labelId,
  hidden,
  onChange,
  onClick,
}) => {
  /**
   * A function that returns regular HTML file field by setting field properties
   *  and state recieved from caller component
   */
  return (
    <div>
      <label className={labelClass} id={labelId}>
        {label}
      </label>
      <div className="form-outline">
        <input
          name={name}
          type="file"
          accept="image/jpeg,image/png,image/gif"
          id={id}
          hidden={hidden}
          onChange={onChange}
          onClick={onClick}
        />
      </div>
      {/* {((meta.touched && meta.error) || (meta.error && meta.submitting)) && (
        <span className="error-general m-2">{meta.error}</span>
      )} */}
    </div>
  );
};

export default ImageInputField;

//Inline function call
