// @ts-nocheck
import React from "react";
import { Link } from "react-router-dom";

const DataDisplay = ({
  data,
  title,
  editable,
  deletable,
  onDelete,
  path,
  editInitialValues,
}) => {
  // const dataKeys = Object.keys(data)

  const dataObjectType = data?.constructor.name;

  return (
    <div>
      {dataObjectType === "Object" && (
        <div>
          <p className="fw-bold display-title mt-3">{title}</p>
          <div className="row">
            {editable && (
              <div className="col flex-end-general my-3">
                <Link
                  to={path}
                  className="link-general link-size-small"
                  state={{ initialValues: editInitialValues, isEdit: true }}
                >
                  Edit
                </Link>
              </div>
            )}
            {deletable && (
              <div className="col flex-end-general my-3">
                <Link
                  to=""
                  className="link-general link-size-small"
                  // state={{ initialValues: editInitialValues, isEdit: true }}
                  onClick={onDelete}
                >
                  Delete
                </Link>
              </div>
            )}
          </div>
          {Object.keys(data).map((key, index) => {
            let modifiedKey = key.charAt(0).toUpperCase() + key.slice(1);
            modifiedKey = modifiedKey.replaceAll("_", " ");

            return (
              key !== "id" && (
                <div key={index}>
                  <div className="row">
                    <div className="col-12 col-sm-5">
                      <p className="fw-bold">{modifiedKey}:</p>
                    </div>
                    <div className="col-12 col-sm-7">
                      <p>
                        {key === "added_on"
                          ? new Date(data[key]).toDateString()
                          : String(data[key])}
                      </p>
                    </div>
                  </div>
                </div>
              )
            );
          })}
        </div>
      )}
      {dataObjectType === "Array" && (
        <div>
          <p className="fw-bold display-title mt-3">{title}</p>
          <div className="row row-cols-auto g-4">
            {data.map((item, index) => (
              <div key={index}>
                <div className="col">
                  <p>{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DataDisplay;
