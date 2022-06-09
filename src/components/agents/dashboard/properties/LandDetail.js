// @ts-nocheck
import DataDisplay from "components/commons/DataDisplay";
import { PATH_AGENT_DASHBOARD_LAND_EDIT_ABSOLUTE } from "components/commons/Strings";
import { getLandDetail } from "features/agent_dashboard/property/propertyCategorySlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import PropertyDetail from "./PropertyDetail";

const LandDetail = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const landData = useSelector(
    (store) => store.propertyCategory.land.getLandDetail.data
  );

  useEffect(() => {
    const landId = location.state?.data?.id;
    dispatch(getLandDetail(landId));
  }, []);

  return (
    <div className=" m-2">
      <div className="row row-cols-1 row-cols-lg-2">
        <div className="card col">
          <DataDisplay
            data={landData}
            title="Your Land Detail"
            editable={true}
            editInitialValues={landData}
            path={PATH_AGENT_DASHBOARD_LAND_EDIT_ABSOLUTE}
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
