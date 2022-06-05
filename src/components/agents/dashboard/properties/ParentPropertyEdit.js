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

  /**
   * Handle when the update/save button is clicked
   * Dispatch the action creator that sends the data to backend
   * @param {object} values
   */
  const onUpdateSubmit = (values) => {
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
