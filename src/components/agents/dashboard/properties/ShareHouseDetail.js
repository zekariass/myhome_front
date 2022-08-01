// @ts-nocheck
import DataDisplay from "components/commons/DataDisplay";
import { formatHouseTypeForDisplay } from "components/commons/formatHouseTypeForDisplay";
import {
  PATH_AGENT_DASHBOARD_LISTING_LIST_ABSOLUTE,
  PATH_AGENT_DASHBOARD_SHAREHOUSE_EDIT_ABSOLUTE,
} from "components/commons/Strings";
import { getShareHouseDetail } from "features/agent_dashboard/property/propertyCategorySlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setListingKeyValueByProperty } from "./listingKey";
import PropertyDetail from "./PropertyDetail";

const ShareHouseDetail = ({ propShareHouseId, noParentDetail }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const shareHouseData = useSelector(
    (store) => store.propertyCategory.shareHouse.getShareHouseDetail.data
  );

  const houseTypes = useSelector((store) => store.houseType.response.data);

  useEffect(() => {
    const shareHouseId =
      propShareHouseId !== undefined
        ? propShareHouseId
        : location.state?.data?.id;
    dispatch(getShareHouseDetail(shareHouseId));
  }, []);

  const formatShareHouseForDisplay = () => {
    return formatHouseTypeForDisplay(shareHouseData, houseTypes);
  };

  return (
    <div className=" m-2">
      <div className="row row-cols-1 row-cols-lg-2">
        <div className="card col">
          <DataDisplay
            data={formatShareHouseForDisplay()}
            title="Your Sharehouse Detail"
            editable={true}
            editInitialValues={shareHouseData}
            path={PATH_AGENT_DASHBOARD_SHAREHOUSE_EDIT_ABSOLUTE}
          />
        </div>
        <div className="col">
          <Link
            to={PATH_AGENT_DASHBOARD_LISTING_LIST_ABSOLUTE}
            onClick={() => setListingKeyValueByProperty(dispatch)}
            state={{ data: shareHouseData }}
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

export default ShareHouseDetail;
