// @ts-nocheck
import React from "react";

const ConfirmationList = ({ data, title, edit, listClassName }) => {
  const renderData = () => {
    const dataKeys = Object.keys(data);
    return dataKeys.map((key) => {
      let fieldLabel = key.toString().replaceAll("_", "  ");
      fieldLabel = fieldLabel.charAt(0).toUpperCase() + fieldLabel.slice(1);
      return (
        <div className="col" key={key}>
          <label className="fs-6 fw-bold flex-center-general">
            {fieldLabel}
          </label>
          <p className="fs-6 text-muted flex-center-general">
            {String(data[key])}
          </p>
        </div>
      );
    });
  };
  return (
    <div className={listClassName}>
      <div className="me-3 mt-3 flex-end-general">{edit}</div>
      <div
        className="flex-center-general fs-5 fw-bold py-3"
        style={{ color: "brown" }}
      >
        {title}
      </div>
      <div className="row row-cols-1 row-cols-sm-2 g-3 ">{renderData()}</div>
    </div>
  );
};

export default ConfirmationList;
