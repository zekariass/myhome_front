import React from "react";
import AreaField from "./AreaField";
import CommonResidentialFields from "./CommonResidentialFields";

const Villa = ({ label, title }) => {
  return (
    <>
      <p className="fs-4 fw-bold flex-center-general">{title}</p>
      <div className="row row-cols-1 row-cols-sm-2 my-3">
        <AreaField label={label} fieldName="total_compound_area" />
        <AreaField label={label} fieldName="housing_area" />
        <CommonResidentialFields label={label} />
      </div>
    </>
  );
};

export default Villa;
