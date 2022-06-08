// @ts-nocheck
import DataDisplayTabular from "components/commons/DataDisplayTabular";
import {
  PATH_AGENT_DASHBOARD_CONDOMINIUM_DETAIL_ABSOLUTE,
  PATH_AGENT_DASHBOARD_CONDOMINIUM_EDIT_ABSOLUTE,
  PATH_AGENT_DASHBOARD_TRADITIONAL_HOUSE_DETAIL_ABSOLUTE,
  PATH_AGENT_DASHBOARD_TRADITIONAL_HOUSE_EDIT_ABSOLUTE,
} from "components/commons/Strings";
import {
  deleteTraditionalHouse,
  getCondominiumByAgent,
  getTraditionalHouseByAgent,
} from "features/agent_dashboard/property/propertyCategorySlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const TraditionalHouseList = () => {
  const dispatch = useDispatch();

  const traditionalHouseData = useSelector(
    // @ts-ignore
    (store) => store.propertyCategory.traditionalHouse.traditionalHouseList.data
  );

  useEffect(() => {
    dispatch(getTraditionalHouseByAgent());
  }, []);

  const prepareTraditionalHouseForDisplay = () => {
    const columns = [
      "id",
      "number_of_rooms",
      "number_of_bed_rooms",
      "floor",
      "number_of_baths",
      "area",
      "is_furnished",
      "is_new",
    ];

    return { data: traditionalHouseData, columns: columns };
  };

  const onTraditionalHouseDelete = (traditionalHouseId) => {
    dispatch(deleteTraditionalHouse(traditionalHouseId));
  };

  return (
    <div className="card p-4">
      <div>
        <p className="display-title fw-bold fs-5 mb-4">
          List of Traditional Houses
        </p>
      </div>
      <DataDisplayTabular
        data={prepareTraditionalHouseForDisplay()}
        originalData={traditionalHouseData}
        deletable={true}
        onDelete={onTraditionalHouseDelete}
        editable={true}
        onEdit={{
          path: PATH_AGENT_DASHBOARD_TRADITIONAL_HOUSE_EDIT_ABSOLUTE,
          propertyId: "",
        }}
        manageable={true}
        onManage={{
          path: PATH_AGENT_DASHBOARD_TRADITIONAL_HOUSE_DETAIL_ABSOLUTE,
        }}
      />
    </div>
  );
};

export default TraditionalHouseList;
