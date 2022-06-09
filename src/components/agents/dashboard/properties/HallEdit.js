// @ts-nocheck
import Hall from "components/properties/forms/Hall";
import { updateHall } from "features/agent_dashboard/property/propertyCategorySlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import EditFormTemplate from "./EditFormTemplate";

const HallEdit = () => {
  const [initialValues, setInitialValues] = useState({});

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const initVal = location?.state?.initialValues
      ? location?.state?.initialValues
      : {};
    setInitialValues(initVal);
  }, []);
  /**
   * Handle when the update/save button is clicked
   * Dispatch the action creator that sends the data to backend
   * @param {object} values
   */
  const onUpdateSubmit = (values) => {
    // console.log("OHHHH: ", values);
    dispatch(updateHall({ updateData: values.hall, navigate: navigate }));
  };
  return (
    <div className="flex-center-general">
      <EditFormTemplate
        initialValues={{ hall: initialValues }}
        onSubmit={onUpdateSubmit}
      >
        <Hall name="hall" title="Edit Hall" />
      </EditFormTemplate>
    </div>
  );
};

export default HallEdit;
