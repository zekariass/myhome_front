// @ts-nocheck
import DataDisplay from "components/commons/DataDisplay";
import {
  PATH_AGENT_DASHBOARD_LISTING_LIST_ABSOLUTE,
  PATH_AGENT_DASHBOARD_VILLA_EDIT_ABSOLUTE,
} from "components/commons/Strings";
import { getVillaDetail } from "features/agent_dashboard/property/propertyCategorySlice";
import { setCurrentPage } from "features/global/globalSlice";
import { setListingKey } from "features/listing/listingSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import PropertyDetail from "./PropertyDetail";

const VillaDetail = ({ propVillaId, noParentDetail }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const villaData = useSelector(
    (store) => store.propertyCategory.villa.getVillaDetail.data
  );

  useEffect(() => {
    const villaId = propVillaId ? propVillaId : location.state?.data?.id;
    // console.log("HEYYYY: ", location.state?.data);
    // dispatch(setCurrentPage(0));
    dispatch(getVillaDetail(villaId));
  }, []);

  const setListingKeyValue = () => {
    dispatch(setListingKey("byProperty"));
  };

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
        <div className="col">
          <Link
            to={PATH_AGENT_DASHBOARD_LISTING_LIST_ABSOLUTE}
            onClick={setListingKeyValue}
            state={{ data: villaData }}
            className="link-general link-size-small"
          >
            Property Listings
          </Link>
        </div>
      </div>
      {!noParentDetail && (
        <div className="my-4">
          <p className="fw-bold fs-5 display-title mb-4">
            Your property Detail
          </p>
          <PropertyDetail propPropertyId={location.state?.data?.property} />
        </div>
      )}
    </div>
  );
};

export default VillaDetail;
