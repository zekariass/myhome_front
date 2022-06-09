// @ts-nocheck
import DataDisplayTabular from "components/commons/DataDisplayTabular";
import { formatHouseTypeForDisplay } from "components/commons/formatHouseTypeForDisplay";
import {
  PATH_AGENT_DASHBOARD_SHAREHOUSE_DETAIL_ABSOLUTE,
  PATH_AGENT_DASHBOARD_SHAREHOUSE_EDIT_ABSOLUTE,
} from "components/commons/Strings";
import {
  deleteShareHouse,
  getSharehouseByAgent,
} from "features/agent_dashboard/property/propertyCategorySlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ShareHouseList = () => {
  const dispatch = useDispatch();

  const shareHouseData = useSelector(
    // @ts-ignore
    (store) => store.propertyCategory.shareHouse.shareHouseList.data
  );

  const houseTypes = useSelector(
    // @ts-ignore
    (store) => store.houseType.response.data
  );

  useEffect(() => {
    dispatch(getSharehouseByAgent());
  }, []);

  const prepareShareHouseForDisplay = () => {
    const columns = [
      "id",
      "house_type",
      "total_number_of_rooms",
      "number_of_rooms_to_share",
      "total_number_of_bed_rooms",
      "number_of_bed_rooms_to_share",
      "total_number_of_baths",
      "number_of_baths_to_share",
      "floor",
      "area",
      "is_furnished",
      "is_new",
    ];

    let newShareHouseData = [];

    shareHouseData.forEach((shareHouseRecord) => {
      //Select a building type that matches with share house house type id
      newShareHouseData = [
        ...newShareHouseData,
        formatHouseTypeForDisplay(shareHouseRecord, houseTypes),
      ];
    });

    return { data: newShareHouseData, columns: columns };
  };

  const onShareHouseDelete = (shareHouseId) => {
    dispatch(deleteShareHouse(shareHouseId));
  };

  return (
    <div className="card p-4">
      <div>
        <p className="display-title fw-bold fs-5 mb-4">List of Sharehouses</p>
      </div>
      <DataDisplayTabular
        data={prepareShareHouseForDisplay()}
        originalData={shareHouseData}
        deletable={true}
        onDelete={onShareHouseDelete}
        editable={true}
        onEdit={{
          path: PATH_AGENT_DASHBOARD_SHAREHOUSE_EDIT_ABSOLUTE,
          propertyId: "",
        }}
        manageable={true}
        onManage={{ path: PATH_AGENT_DASHBOARD_SHAREHOUSE_DETAIL_ABSOLUTE }}
      />
    </div>
  );
};

export default ShareHouseList;
