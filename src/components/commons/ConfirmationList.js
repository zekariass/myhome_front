import React from "react";

const ConfirmationList = ({ data, title }) => {
  const renderData = () => {
    const dataKeys = Object.keys(data);
    return dataKeys.map((key) => {
      return (
        <div className="col" key={key}>
          <label className="fs-6 fw-bold flex-center-general">
            {key
              .toString()
              .toUpperCase()
              // @ts-ignore
              .replaceAll("_", "  ")}
          </label>
          <p className="fs-6 text-muted flex-center-general">{data[key]}</p>
        </div>
      );
    });
  };
  return (
    <div className="card my-3 shadow">
      <div
        className="flex-center-general fs-3 fw-bold py-3"
        style={{ color: "brown" }}
      >
        {title}
      </div>
      <div className="row row-cols-1 row-cols-sm-2 g-3 ">
        {renderData()}
      </div>
    </div>
  );
};

export default ConfirmationList;
