// @ts-nocheck
import DataDisplay from "components/commons/DataDisplay";
import { formatBuildingTypeForDisplay } from "components/commons/formatBuildingTypeForDisplay";
import {
  PATH_AGENT_DASHBOARD_OFFICE_EDIT_ABSOLUTE,
  PATH_AGENT_DASHBOARD_SHAREHOUSE_EDIT_ABSOLUTE,
} from "components/commons/Strings";
import {
  getOfficeDetail,
  getShareHouseDetail,
} from "features/agent_dashboard/property/propertyCategorySlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import PropertyDetail from "./PropertyDetail";

const LandDetail = () => {
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
    const officeId = location.state?.data?.id;
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
      </div>
      <div className="my-4">
        <p className="fw-bold fs-5 display-title mb-4">Your property Detail</p>
        <PropertyDetail propPropertyId={location.state?.data?.property} />
      </div>
    </div>
  );
};

export default LandDetail;
