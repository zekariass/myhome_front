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
  manageable,
  onManage,
  showListing,
  onShowListing,
  featureable,
  onFeature,
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
                {columns.map((col, index) => {
                  let colName = col.replaceAll("_", " ");
                  colName = colName.charAt(0).toUpperCase() + colName.slice(1);

                  return <th key={index}>{colName}</th>;
                })}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dataArray.map((record, index) => (
                <tr key={index}>
                  {columns.map((col, index) => (
                    <td key={index}>{String(record[col])}</td>
                  ))}
                  <td className="flex-center-general">
                    {editable && (
                      <Link
                        to={onEdit?.path}
                        className="link-general link-size-small"
                        state={{
                          initialValues: originalData[index],
                          isEdit: true,
                          propertyId: onEdit?.propertyId,
                        }}
                        // onClick={() => onEdit(record.id)}
                      >
                        Edit
                      </Link>
                    )}
                    {deletable && <span className="px-2">|</span>}
                    {deletable && (
                      <Link
                        to=""
                        className="link-general-danger link-size-small"
                        onClick={() => onDelete(record.id)}
                      >
                        Delete
                      </Link>
                    )}

                    {manageable && <span className="px-2">|</span>}
                    {manageable && (
                      <Link
                        to={onManage?.path ? onManage?.path : ""}
                        className="link-general link-size-small"
                        state={{ data: originalData[index] }}
                      >
                        Manage
                      </Link>
                    )}

                    {showListing && <span className="px-2">|</span>}
                    {showListing && (
                      <Link
                        to={onShowListing?.path ? onShowListing?.path : ""}
                        state={{ data: originalData[index] }}
                        className="link-general link-size-small"
                        onClick={onShowListing?.onClick}
                      >
                        Listings
                      </Link>
                    )}
                    {featureable && <span className="px-2">|</span>}
                    {featureable && (
                      <Link
                        to={onFeature?.path ? onFeature?.path : ""}
                        state={{ data: originalData[index] }}
                        className="link-general link-size-small"
                        onClick={onFeature?.onClick}
                      >
                        feature
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
