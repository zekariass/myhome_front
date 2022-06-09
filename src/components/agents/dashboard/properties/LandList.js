// @ts-nocheck
import DataDisplayTabular from "components/commons/DataDisplayTabular";
import {
  PATH_AGENT_DASHBOARD_LAND_DETAIL_ABSOLUTE,
  PATH_AGENT_DASHBOARD_LAND_EDIT_ABSOLUTE,
} from "components/commons/Strings";
import {
  deleteLand,
  getLandByAgent,
} from "features/agent_dashboard/property/propertyCategorySlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const LandList = () => {
  const dispatch = useDispatch();

  const landData = useSelector(
    (store) => store.propertyCategory.land.landList.data
  );

  useEffect(() => {
    dispatch(getLandByAgent());
  }, []);

  const prepareLandForDisplay = () => {
    const columns = ["id", "area", "length", "width", "has_plan", "has_debt"];

    return { data: landData, columns: columns };
  };

  const onLandDelete = (landId) => {
    dispatch(deleteLand(landId));
  };

  return (
    <div className="card p-4">
      <div>
        <p className="display-title fw-bold fs-5 mb-4">List of Lands</p>
      </div>
      <DataDisplayTabular
        data={prepareLandForDisplay()}
        originalData={landData}
        deletable={true}
        onDelete={onLandDelete}
        editable={true}
        onEdit={{
          path: PATH_AGENT_DASHBOARD_LAND_EDIT_ABSOLUTE,
          propertyId: "",
        }}
        manageable={true}
        onManage={{
          path: PATH_AGENT_DASHBOARD_LAND_DETAIL_ABSOLUTE,
        }}
      />
    </div>
  );
};

export default LandList;
