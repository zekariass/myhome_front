// @ts-nocheck
import Villa from "components/properties/forms/Villa";
import { updateVilla } from "features/agent_dashboard/property/propertyCategorySlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import EditFormTemplate from "./EditFormTemplate";

const VillaEdit = () => {
  const [initialValues, setInitialValues] = useState({});

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const initVal = location.state.initialValues
      ? location.state.initialValues
      : {};
    setInitialValues(initVal);
  }, []);

  // console.log(location?.state?.initialValues);
  const onVillaSubmit = (values) => {
    dispatch(updateVilla({ updateData: values.villa, navigate: navigate }));
  };
  return (
    <EditFormTemplate
      onSubmit={onVillaSubmit}
      initialValues={{ villa: initialValues }}
    >
      <Villa name="villa" title="Edit Villa" isEdit={true} />
    </EditFormTemplate>
  );
};

export default VillaEdit;
