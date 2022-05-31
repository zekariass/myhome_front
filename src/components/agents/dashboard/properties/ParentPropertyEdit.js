// @ts-nocheck
import ParentProperty from "components/properties/forms/ParentProperty";
import { updateProperty } from "features/agent_dashboard/property/propertySlice";
import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import EditFormTemplate from "./EditFormTemplate";

const ParentPropertyEdit = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { initialValues } = location.state;

  const onUpdateSubmit = (values) => {
    // console.log("PROP VALUES: ", values);
    dispatch(updateProperty(values));
    navigate(-1, { replace: true });
  };
  return (
    <div className="flex-center-general">
      <EditFormTemplate initialValues={initialValues} onSubmit={onUpdateSubmit}>
        <ParentProperty categoryDisabled={true} />
      </EditFormTemplate>
    </div>
  );
};

export default ParentPropertyEdit;
