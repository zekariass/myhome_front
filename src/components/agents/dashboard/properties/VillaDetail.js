// @ts-nocheck
import DataDisplay from "components/commons/DataDisplay";
import DataDisplayTabular from "components/commons/DataDisplayTabular";
import {
  PATH_AGENT_DASHBOARD_APARTMENTUNIT_DETAIL_ABSOLUTE,
  PATH_AGENT_DASHBOARD_APARTMENTUNIT_EDIT_ABSOLUTE,
  PATH_AGENT_DASHBOARD_APARTMENT_EDIT_ABSOLUTE,
  PATH_AGENT_DASHBOARD_VILLA_EDIT_ABSOLUTE,
} from "components/commons/Strings";
import {
  deleteApartmentUnit,
  getApartmentDetail,
  getApartmentUnitsByApartment,
  getVillaDetail,
} from "features/agent_dashboard/property/propertyCategorySlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropertyDetail from "./PropertyDetail";

const VillaDetail = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const villaData = useSelector(
    (store) => store.propertyCategory.villa.getVillaDetail.data
  );

  useEffect(() => {
    const villaId = location.state?.data?.id;
    dispatch(getVillaDetail(villaId));
  }, []);

  //   console.log(villaData);
  return (
    <div className=" m-2">
      <div className="row row-cols-1 row-cols-lg-2">
        <div className="card col">
          <DataDisplay
            data={villaData}
            title="Your Villa Detail"
            editable={true}
            editInitialValues={villaData}
            path={PATH_AGENT_DASHBOARD_VILLA_EDIT_ABSOLUTE}
          />
        </div>
      </div>
      <div className="my-4">
        <p className="fw-bold fs-5 display-title mb-4">Your property Detail</p>
        <PropertyDetail propPropertyId={location.state?.data?.property} />
      </div>
    </div>
  );
};

export default VillaDetail;
