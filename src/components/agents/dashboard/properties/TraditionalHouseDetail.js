// @ts-nocheck
import DataDisplay from "components/commons/DataDisplay";
import { PATH_AGENT_DASHBOARD_TRADITIONAL_HOUSE_EDIT_ABSOLUTE } from "components/commons/Strings";
import { getTraditionalHouseDetail } from "features/agent_dashboard/property/propertyCategorySlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import PropertyDetail from "./PropertyDetail";

const TraditionalHouseDetail = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const traditionalHouseData = useSelector(
    (store) =>
      store.propertyCategory.traditionalHouse.getTraditionalHouseDetail.data
  );

  useEffect(() => {
    const traditionalHouseId = location.state?.data?.id;
    dispatch(getTraditionalHouseDetail(traditionalHouseId));
  }, []);

  //   console.log(traditionalHouseData);
  return (
    <div className=" m-2">
      <div className="row row-cols-1 row-cols-lg-2">
        <div className="card col">
          <DataDisplay
            data={traditionalHouseData}
            title="Your Villa Detail"
            editable={true}
            editInitialValues={traditionalHouseData}
            path={PATH_AGENT_DASHBOARD_TRADITIONAL_HOUSE_EDIT_ABSOLUTE}
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

export default TraditionalHouseDetail;