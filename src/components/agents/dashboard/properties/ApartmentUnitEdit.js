// @ts-nocheck
import ApartmentUnit from "components/properties/forms/ApartmentUnit";
import {
  createApartmentUnit,
  updateApartmentUnit,
} from "features/agent_dashboard/property/propertyCategorySlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import EditFormTemplate from "./EditFormTemplate";

const ApartmentUnitEdit = () => {
  //Initial value for apartment unit Edit
  const [initialValues, setInitialValues] = useState({});

  //Apartment Id for adding new Unit
  const [apartmentId, setApartmentId] = useState(null);

  //Whether the form is for Edit or add new
  const [isEdit, setIsEdit] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const initVal = location.state?.initialValues
      ? location.state?.initialValues
      : {};
    setInitialValues(initVal);

    const isEdit = location.state?.isEdit ? location.state?.isEdit : false;
    setIsEdit(isEdit);

    const apartmentId = location.state?.apartmentId
      ? location.state?.apartmentId
      : null;

    setApartmentId(apartmentId);
  }, []);

  //   console.log(location?.state?.initialValues);
  const onApartmentSubmit = (values) => {
    console.log(values);
    if (isEdit) {
      dispatch(
        updateApartmentUnit({
          updateData: values.apartmentUnit,
          navigate: navigate,
        })
      );
    } else {
      const data = { unit: values.apartmentUnit, apartment: apartmentId };
      dispatch(
        createApartmentUnit({
          createData: data,
          navigate: navigate,
        })
      );
    }
  };
  return (
    <EditFormTemplate
      onSubmit={onApartmentSubmit}
      initialValues={{ apartmentUnit: initialValues }}
    >
      <ApartmentUnit
        name="apartmentUnit"
        title={isEdit ? "Edit Apartment Unit" : "Add Apartment Unit"}
        isEdit={isEdit}
      />
    </EditFormTemplate>
  );
};

export default ApartmentUnitEdit;
