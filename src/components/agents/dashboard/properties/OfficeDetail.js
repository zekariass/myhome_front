// @ts-nocheck
import DataDisplay from "components/commons/DataDisplay";
import { formatBuildingTypeForDisplay } from "components/commons/formatBuildingTypeForDisplay";
import {
  PATH_AGENT_DASHBOARD_LISTING_LIST_ABSOLUTE,
  PATH_AGENT_DASHBOARD_OFFICE_EDIT_ABSOLUTE,
  PATH_AGENT_DASHBOARD_SHAREHOUSE_EDIT_ABSOLUTE,
} from "components/commons/Strings";
import {
  getOfficeDetail,
  getShareHouseDetail,
} from "features/agent_dashboard/property/propertyCategorySlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setListingKeyValueByProperty } from "./listingKey";
import PropertyDetail from "./PropertyDetail";

const OfficeDetail = ({ propOfficeId, noParentDetail }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const officeData = useSelector(
    (store) => store.propertyCategory.office.getOfficeDetail.data
  );

  const buildingTypes = useSelector(
    // @ts-ignore
    (store) => store.buildingType.response.data
  );

  useEffect(() => {
    const officeId =
      propOfficeId !== undefined ? propOfficeId : location.state?.data?.id;
    dispatch(getOfficeDetail(officeId));
  }, []);

  const formatOfficeForDisplay = () => {
    return formatBuildingTypeForDisplay(officeData, buildingTypes);
  };

  return (
    <div className=" m-2">
      <div className="row row-cols-1 row-cols-lg-2">
        <div className="card col">
          <DataDisplay
            data={formatOfficeForDisplay()}
            title="Your Office Detail"
            editable={true}
            editInitialValues={officeData}
            path={PATH_AGENT_DASHBOARD_OFFICE_EDIT_ABSOLUTE}
          />
        </div>
        <div className="col">
          <Link
            to={PATH_AGENT_DASHBOARD_LISTING_LIST_ABSOLUTE}
            onClick={() => setListingKeyValueByProperty(dispatch)}
            state={{ data: officeData }}
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

export default OfficeDetail;
