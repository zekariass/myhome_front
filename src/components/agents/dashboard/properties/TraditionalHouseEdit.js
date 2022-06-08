// @ts-nocheck
import TraditionalHouse from "components/properties/forms/TraditionalHouse";
import { updateTraditionalHouse } from "features/agent_dashboard/property/propertyCategorySlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import EditFormTemplate from "./EditFormTemplate";

const TraditionalHouseEdit = () => {
  const [initialValues, setInitialValues] = useState({});

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const initVal = location?.state?.initialValues
      ? location?.state?.initialValues
      : {};
    setInitialValues(initVal);
  }, []);

  // console.log(location?.state?.initialValues);
  const onTraditionalHouseSubmit = (values) => {
    dispatch(
      updateTraditionalHouse({
        updateData: values.traditionalHouse,
        navigate: navigate,
      })
    );
  };
  return (
    <EditFormTemplate
      onSubmit={onTraditionalHouseSubmit}
      initialValues={{ traditionalHouse: initialValues }}
    >
      <TraditionalHouse
        name="traditionalHouse"
        title="Edit Traditional House"
        isEdit={true}
      />
    </EditFormTemplate>
  );
};

export default TraditionalHouseEdit;
