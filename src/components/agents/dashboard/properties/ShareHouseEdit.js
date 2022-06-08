// @ts-nocheck
import ShareHouse from "components/properties/forms/ShareHouse";
import { updateShareHouse } from "features/agent_dashboard/property/propertyCategorySlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import EditFormTemplate from "./EditFormTemplate";

const ShareHouseEdit = () => {
  const [initialValues, setInitialValues] = useState({});

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // const { initialValues } = location?.state;

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
    dispatch(
      updateShareHouse({ updateData: values.shareHouse, navigate: navigate })
    );
  };
  return (
    <div className="flex-center-general">
      <EditFormTemplate
        initialValues={{ shareHouse: initialValues }}
        onSubmit={onUpdateSubmit}
      >
        <ShareHouse name="shareHouse" title="Edit Share House" />
      </EditFormTemplate>
    </div>
  );
};

export default ShareHouseEdit;
