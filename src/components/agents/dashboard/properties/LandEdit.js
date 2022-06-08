// @ts-nocheck
import Land from "components/properties/forms/Land";
import { updateLand } from "features/agent_dashboard/property/propertyCategorySlice";
import { updateProperty } from "features/agent_dashboard/property/propertySlice";
import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import EditFormTemplate from "./EditFormTemplate";

const LandEdit = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { initialValues } = location?.state;

  // console.log("initialValues: ", initialValues);

  /**
   * Handle when the update/save button is clicked
   * Dispatch the action creator that sends the data to backend
   * @param {object} values
   */
  const onUpdateSubmit = (values) => {
    dispatch(updateLand({ updateData: values.address, navigate: navigate }));
    // navigate(-1, { replace: true });
  };
  return (
    <div className="flex-center-general">
      <EditFormTemplate
        initialValues={{ address: initialValues }}
        onSubmit={onUpdateSubmit}
      >
        <Land name="address" title="Edit Land Property" />
      </EditFormTemplate>
    </div>
  );
};

export default LandEdit;
