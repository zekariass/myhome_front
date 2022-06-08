// @ts-nocheck
import Apartment from "components/properties/forms/Apartment";
import { updateApartment } from "features/agent_dashboard/property/propertyCategorySlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import EditFormTemplate from "./EditFormTemplate";

const ApartmentEdit = () => {
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
  const onApartmentSubmit = (values) => {
    dispatch(
      updateApartment({ updateData: values.apartment, navigate: navigate })
    );
  };
  return (
    <EditFormTemplate
      onSubmit={onApartmentSubmit}
      initialValues={{ apartment: initialValues }}
    >
      <Apartment name="apartment" title="Edit Apartment" isEdit={true} />
    </EditFormTemplate>
  );
};

export default ApartmentEdit;
