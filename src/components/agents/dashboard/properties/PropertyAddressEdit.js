// @ts-nocheck
import AddressForm from "components/commons/AddressForm";
import {
  getCitiesByRegion,
  getRegionsByCountry,
  updateAddress,
} from "features/common/addressSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import EditFormTemplate from "./EditFormTemplate";

const PropertyAddressEdit = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { initialValues } = location.state;

  useEffect(() => {
    //Get countries and Regions so that to display region and city values for edit
    const countryId = initialValues.address.country;
    const regionId = initialValues.address.region;
    dispatch(getRegionsByCountry(countryId));
    dispatch(getCitiesByRegion(regionId));
  }, []);

  /**
   * Handle when the update/save button is clicked
   * Dispatch the action creator that sends the data to backend
   * @param {object} values
   */
  const onUpdateSubmit = (values) => {
    dispatch(updateAddress(values.address));
    navigate(-1, { replace: true });
  };

  return (
    <div className="flex-center-general">
      <EditFormTemplate initialValues={initialValues} onSubmit={onUpdateSubmit}>
        <AddressForm label="address" title="Property Address" />
      </EditFormTemplate>
    </div>
  );
};

export default PropertyAddressEdit;
