// @ts-nocheck
import DataDisplayTabular from "components/commons/DataDisplayTabular";
import {
  PATH_AGENT_DASHBOARD_HALL_DETAIL_ABSOLUTE,
  PATH_AGENT_DASHBOARD_HALL_EDIT_ABSOLUTE,
} from "components/commons/Strings";
import {
  deleteHall,
  getHallByAgent,
} from "features/agent_dashboard/property/propertyCategorySlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const HallList = () => {
  const dispatch = useDispatch();

  const hallData = useSelector(
    // @ts-ignore
    (store) => store.propertyCategory.hall.hallList.data
  );

  useEffect(() => {
    dispatch(getHallByAgent());
  }, []);

  const prepareHallForDisplay = () => {
    const columns = [
      "id",
      "floor",
      "number_of_seats",
      "total_capacity",
      "has_parking_space",
      "number_of_parking_spaces",
      "hall_description",
    ];

    return { data: hallData, columns: columns };
  };

  const onHallDelete = (hallId) => {
    dispatch(deleteHall(hallId));
  };

  return (
    <div className="card p-4">
      <div>
        <p className="display-title fw-bold fs-5 mb-4">List of Halls</p>
      </div>
      <DataDisplayTabular
        data={prepareHallForDisplay()}
        originalData={hallData}
        deletable={true}
        onDelete={onHallDelete}
        editable={true}
        onEdit={{
          path: PATH_AGENT_DASHBOARD_HALL_EDIT_ABSOLUTE,
          propertyId: "",
        }}
        manageable={true}
        onManage={{
          path: PATH_AGENT_DASHBOARD_HALL_DETAIL_ABSOLUTE,
        }}
      />
    </div>
  );
};

export default HallList;
