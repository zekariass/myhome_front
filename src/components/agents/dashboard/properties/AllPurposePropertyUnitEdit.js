// @ts-nocheck
import AllPurposePropertyUnit from "components/properties/forms/AllPurposePropertyUnit";
import {
  createAllPurposePropertyUnit,
  updateAllPurposePropertyUnit,
} from "features/agent_dashboard/property/propertyCategorySlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import EditFormTemplate from "./EditFormTemplate";

const AllPurposePropertyUnitEdit = () => {
  //Initial value for All purpose property unit Edit
  const [initialValues, setInitialValues] = useState({});

  //All purpose property Id for adding new Unit
  const [allPurposePropertyId, setAllPurposePropertyId] = useState(null);

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

    const allPurposePropertyId = location.state?.allPurposePropertyId
      ? location.state?.allPurposePropertyId
      : null;

    setAllPurposePropertyId(allPurposePropertyId);
  }, []);

  const onAllPurposePropertyUnitSubmit = (values) => {
    if (isEdit) {
      dispatch(
        updateAllPurposePropertyUnit({
          updateData: values.allPurposePropertyUnit,
          navigate: navigate,
        })
      );
    } else {
      const data = {
        unit: values.allPurposePropertyUnit,
        all_purpose_property: allPurposePropertyId,
      };

      console.log("datadatadata: ", data);
      dispatch(
        createAllPurposePropertyUnit({
          createData: data,
          navigate: navigate,
        })
      );
    }
  };
  return (
    <EditFormTemplate
      onSubmit={onAllPurposePropertyUnitSubmit}
      initialValues={{ allPurposePropertyUnit: initialValues }}
    >
      <AllPurposePropertyUnit
        name="allPurposePropertyUnit"
        title={
          isEdit
            ? "Edit All Purpose Property Unit"
            : "Add All Purpose Property Unit"
        }
        isEdit={isEdit}
      />
    </EditFormTemplate>
  );
};

export default AllPurposePropertyUnitEdit;
