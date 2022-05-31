// @ts-nocheck
import { PATH_AGENT_DASHBOARD_PROPERTY_DETAIL_ABSOLUTE } from "components/commons/Strings";
import {
  getPropertiesByAgent,
  setPropertyDataForDetail,
} from "features/agent_dashboard/property/propertySlice";
import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const PropertyList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const location = useLocation();
  useEffect(() => {
    dispatch(getPropertiesByAgent());
  }, []);

  const { data, request } = useSelector((store) => store.property.propertyList);

  let columns = [];
  if (data.length) {
    columns = Object.keys(data[0]);
  }

  if (request.isLoaing) {
    return <div>I am fetching your properties</div>;
  }
  return (
    <div className="my-4">
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            {columns.map((col, index) => {
              if (
                col === "id" ||
                col === "is_residential" ||
                col === "description" ||
                col === "added_on"
              ) {
                return <th key={index}>{col}</th>;
              }
            })}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((record, index) => (
            <tr
              key={index}
              onClick={() => {
                dispatch(setPropertyDataForDetail(record));
                navigate(PATH_AGENT_DASHBOARD_PROPERTY_DETAIL_ABSOLUTE, {
                  state: { property: record, propertyId: record.id },
                });
              }}
            >
              {columns.map((col, index) => {
                if (
                  col === "id" ||
                  col === "is_residential" ||
                  col === "description" ||
                  col === "added_on"
                ) {
                  if (col === "added_on") {
                    const date = new Date(record[col]);
                    return <td key={index}>{date.toDateString()}</td>;
                  }
                  return <td key={index}>{String(record[col])}</td>;
                }
              })}
              <td>
                <Link
                  className="link-general link-size-xsmall"
                  to="" //PATH_AGENT_DASHBOARD_PROPERTY_DETAIL_ABSOLUTE}
                  state={{ property: record }}
                  onClick={() => {
                    dispatch(setPropertyDataForDetail(record));
                    navigate(PATH_AGENT_DASHBOARD_PROPERTY_DETAIL_ABSOLUTE, {
                      state: { property: record, propertyId: record.id },
                    });
                  }}
                >
                  Manage
                </Link>
                |
                <Link className="link-general link-size-xsmall" to="">
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PropertyList;
