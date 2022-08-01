// @ts-nocheck
import DataDisplay from "components/commons/DataDisplay";
import {
  PATH_AGENT_DASHBOARD_HALL_EDIT_ABSOLUTE,
  PATH_AGENT_DASHBOARD_LISTING_LIST_ABSOLUTE,
} from "components/commons/Strings";
import { getHallDetail } from "features/agent_dashboard/property/propertyCategorySlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setListingKeyValueByProperty } from "./listingKey";
import PropertyDetail from "./PropertyDetail";

const HallDetail = ({ propHallId, noParentDetail }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const hallData = useSelector(
    (store) => store.propertyCategory.hall.getHallDetail.data
  );

  useEffect(() => {
    const hallId =
      propHallId !== undefined ? propHallId : location.state?.data?.id;
    dispatch(getHallDetail(hallId));
  }, []);

  return (
    <div className=" m-2">
      <div className="row row-cols-1 row-cols-lg-2">
        <div className="card col">
          <DataDisplay
            data={hallData}
            title="Your Hall Detail"
            editable={true}
            editInitialValues={hallData}
            path={PATH_AGENT_DASHBOARD_HALL_EDIT_ABSOLUTE}
          />
        </div>
        <div className="col">
          <Link
            to={PATH_AGENT_DASHBOARD_LISTING_LIST_ABSOLUTE}
            onClick={() => setListingKeyValueByProperty(dispatch)}
            state={{ data: hallData }}
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

export default HallDetail;
