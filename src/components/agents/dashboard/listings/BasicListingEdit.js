// @ts-nocheck
import { updateListing } from "features/listing/listingSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import EditFormTemplate from "../properties/EditFormTemplate";
import BasicListingForm from "./BasicListingForm";

const BasicListingEdit = () => {
  const [initialValues, setInitialValues] = useState({});

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    //Get initial values for edit or set to empty object
    const initVal = location.state.initialValues
      ? location.state.initialValues
      : {};
    setInitialValues(initVal);
  }, []);

  const onListingSubmit = (values) => {
    //Submit the data to backend for update
    dispatch(updateListing({ updateData: values, navigate: navigate }));
  };
  return (
    <EditFormTemplate onSubmit={onListingSubmit} initialValues={initialValues}>
      <BasicListingForm title="Edit Listing" isEdit={true} />
    </EditFormTemplate>
  );
};

export default BasicListingEdit;
