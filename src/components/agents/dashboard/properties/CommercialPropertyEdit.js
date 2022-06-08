// @ts-nocheck
import Apartment from "components/properties/forms/Apartment";
import CommercialProperty from "components/properties/forms/CommercialProperty";
import { updateCommercialProperty } from "features/agent_dashboard/property/propertyCategorySlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import EditFormTemplate from "./EditFormTemplate";

const CommercialPropertyEdit = () => {
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
  const onCommercialPropertySubmit = (values) => {
    // console.log("values: ", values);

    dispatch(
      updateCommercialProperty({
        updateData: values.commercialProperty,
        navigate: navigate,
      })
    );
  };
  return (
    <EditFormTemplate
      onSubmit={onCommercialPropertySubmit}
      initialValues={{ commercialProperty: initialValues }}
    >
      <CommercialProperty
        name="commercialProperty"
        title="Edit Commercial Property"
        isEdit={true}
      />
    </EditFormTemplate>
  );
};

export default CommercialPropertyEdit;
