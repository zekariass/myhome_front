// @ts-nocheck
import DataDisplayTabular from "components/commons/DataDisplayTabular";
import { formatBuildingTypeForDisplay } from "components/commons/formatBuildingTypeForDisplay";
import {
  PATH_AGENT_DASHBOARD_ALLPURPOSEPROPERTY_DETAIL_ABSOLUTE,
  PATH_AGENT_DASHBOARD_ALLPURPOSEPROPERTY_EDIT_ABSOLUTE,
} from "components/commons/Strings";
import {
  deleteAllPurposeProperty,
  getAllPurposePropertiesByAgent,
} from "features/agent_dashboard/property/propertyCategorySlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AllPurposePropertyList = () => {
  const dispatch = useDispatch();

  const allPurposePropertyData = useSelector(
    // @ts-ignore
    (store) =>
      store.propertyCategory.allPurposeProperty.allPurposePropertyList.data
  );

  const buildingTypes = useSelector(
    // @ts-ignore
    (store) => store.buildingType.response.data
  );

  useEffect(() => {
    dispatch(getAllPurposePropertiesByAgent());
  }, []);

  const prepareAllPurposePropertyForDisplay = () => {
    const columns = [
      "id",
      "building_type",
      "best_for",
      "floors",
      "is_multi_unit",
      "has_parking_space",
      "all_purpose_property_description",
    ];

    let newAllPurposePropertyData = [];

    allPurposePropertyData.forEach((allPurposePropertyRecord) => {
      //Select a building type that matches with commercial property building type id
      newAllPurposePropertyData = [
        ...newAllPurposePropertyData,
        formatBuildingTypeForDisplay(allPurposePropertyRecord, buildingTypes),
      ];
    });

    return { data: newAllPurposePropertyData, columns: columns };
  };

  const onAllPurposePropertyDelete = (allPurposePropertyId) => {
    dispatch(deleteAllPurposeProperty(allPurposePropertyId));
  };

  return (
    <div className="card p-4">
      <div>
        <p className="display-title fw-bold fs-5 mb-4">
          List of All Purpose Property
        </p>
      </div>
      <DataDisplayTabular
        data={prepareAllPurposePropertyForDisplay()}
        originalData={allPurposePropertyData}
        deletable={true}
        onDelete={onAllPurposePropertyDelete}
        editable={true}
        onEdit={{
          path: PATH_AGENT_DASHBOARD_ALLPURPOSEPROPERTY_EDIT_ABSOLUTE,
          propertyId: "",
        }}
        manageable={true}
        onManage={{
          path: PATH_AGENT_DASHBOARD_ALLPURPOSEPROPERTY_DETAIL_ABSOLUTE,
        }}
      />
    </div>
  );
};

export default AllPurposePropertyList;
