// @ts-nocheck
import Condominium from "components/properties/forms/Condominium";
import { updateCondominium } from "features/agent_dashboard/property/propertyCategorySlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import EditFormTemplate from "./EditFormTemplate";

const CondominiumEdit = () => {
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
  const onCondominiumSubmit = (values) => {
    dispatch(
      updateCondominium({ updateData: values.condominium, navigate: navigate })
    );
  };
  return (
    <EditFormTemplate
      onSubmit={onCondominiumSubmit}
      initialValues={{ condominium: initialValues }}
    >
      <Condominium name="condominium" title="Edit Condominium" isEdit={true} />
    </EditFormTemplate>
  );
};

export default CondominiumEdit;
