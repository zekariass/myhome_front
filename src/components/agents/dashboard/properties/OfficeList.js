// @ts-nocheck
import DataDisplayTabular from "components/commons/DataDisplayTabular";
import { formatBuildingTypeForDisplay } from "components/commons/formatBuildingTypeForDisplay";
import {
  PATH_AGENT_DASHBOARD_OFFICE_DETAIL_ABSOLUTE,
  PATH_AGENT_DASHBOARD_OFFICE_EDIT_ABSOLUTE,
} from "components/commons/Strings";
import {
  deleteOffice,
  getOfficeByAgent,
} from "features/agent_dashboard/property/propertyCategorySlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const OfficeList = () => {
  const dispatch = useDispatch();

  const officeData = useSelector(
    // @ts-ignore
    (store) => store.propertyCategory.office.officeList.data
  );

  const buildingTypes = useSelector(
    // @ts-ignore
    (store) => store.buildingType.response.data
  );

  useEffect(() => {
    dispatch(getOfficeByAgent());
  }, []);

  const prepareOfficeForDisplay = () => {
    const columns = [
      "id",
      "floor",
      "number_of_rooms",
      "area",
      "is_furnished",
      "is_new",
      "has_parking_space",
      "property",
      "building_type",
    ];

    let newOfficeData = [];

    officeData.forEach((officeRecord) => {
      //Select a building type that matches with office building type id
      newOfficeData = [
        ...newOfficeData,
        formatBuildingTypeForDisplay(officeRecord, buildingTypes),
      ];
    });

    return { data: newOfficeData, columns: columns };
  };

  const onOfficeDelete = (officeId) => {
    dispatch(deleteOffice(officeId));
  };

  return (
    <div className="card p-4">
      <div>
        <p className="display-title fw-bold fs-5 mb-4">List of Offices</p>
      </div>
      <DataDisplayTabular
        data={prepareOfficeForDisplay()}
        originalData={officeData}
        deletable={true}
        onDelete={onOfficeDelete}
        editable={true}
        onEdit={{
          path: PATH_AGENT_DASHBOARD_OFFICE_EDIT_ABSOLUTE,
          propertyId: "",
        }}
        manageable={true}
        onManage={{
          path: PATH_AGENT_DASHBOARD_OFFICE_DETAIL_ABSOLUTE,
        }}
      />
    </div>
  );
};

export default OfficeList;
