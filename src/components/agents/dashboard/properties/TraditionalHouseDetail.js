// @ts-nocheck
import DataDisplay from "components/commons/DataDisplay";
import {
  PATH_AGENT_DASHBOARD_LISTING_LIST_ABSOLUTE,
  PATH_AGENT_DASHBOARD_TRADITIONAL_HOUSE_EDIT_ABSOLUTE,
} from "components/commons/Strings";
import { getTraditionalHouseDetail } from "features/agent_dashboard/property/propertyCategorySlice";
import { setListingKey } from "features/listing/listingSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import PropertyDetail from "./PropertyDetail";

const TraditionalHouseDetail = ({ propTradHouseId, noParentDetail }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const traditionalHouseData = useSelector(
    (store) =>
      store.propertyCategory.traditionalHouse.getTraditionalHouseDetail.data
  );

  useEffect(() => {
    const traditionalHouseId =
      propTradHouseId !== undefined
        ? propTradHouseId
        : location.state?.data?.id;
    dispatch(getTraditionalHouseDetail(traditionalHouseId));
  }, []);

  const setListingKeyValue = () => {
    dispatch(setListingKey("byProperty"));
  };

  //   console.log(traditionalHouseData);
  return (
    <div className=" m-2">
      <div className="row row-cols-1 row-cols-lg-2">
        <div className="card col">
          <DataDisplay
            data={traditionalHouseData}
            title="Your Traditional House Detail"
            editable={true}
            editInitialValues={traditionalHouseData}
            path={PATH_AGENT_DASHBOARD_TRADITIONAL_HOUSE_EDIT_ABSOLUTE}
          />
        </div>
        <div className="col">
          <Link
            to={PATH_AGENT_DASHBOARD_LISTING_LIST_ABSOLUTE}
            onClick={setListingKeyValue}
            state={{ data: traditionalHouseData }}
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

export default TraditionalHouseDetail;
