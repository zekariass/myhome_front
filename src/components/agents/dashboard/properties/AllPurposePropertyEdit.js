// @ts-nocheck
import AllPurposeProperty from "components/properties/forms/AllPurposeProperty";
import CommercialProperty from "components/properties/forms/CommercialProperty";
import { updateAllPurposeProperty } from "features/agent_dashboard/property/propertyCategorySlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import EditFormTemplate from "./EditFormTemplate";

const AllPurposePropertyEdit = () => {
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

  const onAllPurposePropertySubmit = (values) => {
    // console.log("values: ", values);

    dispatch(
      updateAllPurposeProperty({
        updateData: values.allPurposeProperty,
        navigate: navigate,
      })
    );
  };
  return (
    <EditFormTemplate
      onSubmit={onAllPurposePropertySubmit}
      initialValues={{ allPurposeProperty: initialValues }}
    >
      <AllPurposeProperty
        name="allPurposeProperty"
        title="Edit All Purpose Property"
        isEdit={true}
      />
    </EditFormTemplate>
  );
};

export default AllPurposePropertyEdit;
