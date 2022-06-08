// @ts-nocheck
import ApartmentUnit from "components/properties/forms/ApartmentUnit";
import CommercialPropertyUnit from "components/properties/forms/CommercialPropertyUnit";
import {
  createApartmentUnit,
  createCommercialPropertyUnit,
  updateApartmentUnit,
  updateCommercialPropertyUnit,
} from "features/agent_dashboard/property/propertyCategorySlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import EditFormTemplate from "./EditFormTemplate";

const CommercialPropertyUnitEdit = () => {
  //Initial value for apartment unit Edit
  const [initialValues, setInitialValues] = useState({});

  //Apartment Id for adding new Unit
  const [commercialPropertyId, setCommercialPropertyId] = useState(null);

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

    const commercialPropertyId = location.state?.commercialPropertyId
      ? location.state?.commercialPropertyId
      : null;

    setCommercialPropertyId(commercialPropertyId);
  }, []);

  const onCommercialPropertyUnitSubmit = (values) => {
    if (isEdit) {
      dispatch(
        updateCommercialPropertyUnit({
          updateData: values.commercialPropertyUnit,
          navigate: navigate,
        })
      );
    } else {
      const data = {
        unit: values.commercialPropertyUnit,
        commercial_property: commercialPropertyId,
      };
      dispatch(
        createCommercialPropertyUnit({
          createData: data,
          navigate: navigate,
        })
      );
    }
  };
  return (
    <EditFormTemplate
      onSubmit={onCommercialPropertyUnitSubmit}
      initialValues={{ commercialPropertyUnit: initialValues }}
    >
      <CommercialPropertyUnit
        name="commercialPropertyUnit"
        title={
          isEdit
            ? "Edit Commercial Property Unit"
            : "Add Commercial Property Unit"
        }
        isEdit={isEdit}
      />
    </EditFormTemplate>
  );
};

export default CommercialPropertyUnitEdit;
