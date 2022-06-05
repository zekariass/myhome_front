import React from "react";
import TextField from "./fields/TextField";
import { FIELD_SUBSCRIPTION } from "./fieldSubscription";

const SingleTextSearch = ({ onInputChange, label, placeholder }) => {
  return (
    <div className="form-outline mb-2">
      <TextField
        name="search"
        className="form-control form-control-lg input-border-color"
        type="text"
        placeholder={placeholder}
        label={label}
        labelClass="form-label fs-5 mt-2"
        // validate={validateNumberFieldGeneral}
        // @ts-ignore
        subscription={FIELD_SUBSCRIPTION}
        onInputChange={(event) => onInputChange(event)}
      />
    </div>
  );
};

export default SingleTextSearch;
