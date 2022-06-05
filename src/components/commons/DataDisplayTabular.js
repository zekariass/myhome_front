// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const DataDisplayTabular = ({
  data,
  originalData,
  editable,
  onEdit,
  deletable,
  onDelete,
}) => {
  const [dataArray, setDataArray] = useState([]);
  const [columns, setColumns] = useState([]);

  const location = useLocation();

  // console.log("LOCATION XYZ: ", location);

  useEffect(() => {
    setDataArray(data.data);
    setColumns(data.columns);
  }, [data]);

  const dataObjectType = data.constructor.name;

  // console.log("DATAAAA: ", originalData);

  return (
    <div>
      {dataArray && dataArray?.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle border-1">
            <thead>
              <tr className="bg-general">
                {columns.map((col, index) => (
                  <th key={index}>{col}</th>
                ))}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dataArray.map((record, index) => (
                <tr key={index}>
                  {columns.map((col, index) => (
                    <td key={index}>{record[col]}</td>
                  ))}
                  <td>
                    {editable && (
                      <Link
                        to={onEdit?.path}
                        className="link-general link-size-small"
                        state={{
                          rule: originalData[index],
                          isEdit: true,
                          propertyId: onEdit?.propertyId,
                        }}
                        // onClick={() => onEdit(record.id)}
                      >
                        Edit
                      </Link>
                    )}
                    {editable && deletable && <span>|</span>}
                    {deletable && (
                      <Link
                        to=""
                        className="link-general link-size-small"
                        onClick={() => onDelete(record.id)}
                      >
                        Delete
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DataDisplayTabular;
