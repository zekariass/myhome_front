// @ts-nocheck
import DataDisplayTabular from "components/commons/DataDisplayTabular";
import { formatBuildingTypeForDisplay } from "components/commons/formatBuildingTypeForDisplay";
import {
  PATH_AGENT_DASHBOARD_COMMERCIALPROPERTY_DETAIL_ABSOLUTE,
  PATH_AGENT_DASHBOARD_COMMERCIALPROPERTY_EDIT_ABSOLUTE,
  PATH_AGENT_DASHBOARD_CONDOMINIUM_DETAIL_ABSOLUTE,
  PATH_AGENT_DASHBOARD_CONDOMINIUM_EDIT_ABSOLUTE,
} from "components/commons/Strings";
import {
  deleteCommercialProperty,
  deleteCondominium,
  getCommercialPropertiesByAgent,
  getCondominiumByAgent,
} from "features/agent_dashboard/property/propertyCategorySlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CommercialPropertyList = () => {
  const dispatch = useDispatch();

  const commercialPropertyData = useSelector(
    // @ts-ignore
    (store) =>
      store.propertyCategory.commercialProperty.commercialPropertyList.data
  );

  const buildingTypes = useSelector(
    // @ts-ignore
    (store) => store.buildingType.response.data
  );

  useEffect(() => {
    dispatch(getCommercialPropertiesByAgent());
  }, []);

  const prepareCommercialPropertyForDisplay = () => {
    const columns = [
      "id",
      "floors",
      "is_new",
      "has_parking_space",
      "is_multi_unit",
      "property",
      "building_type",
    ];

    let newCommercialPropertyData = [];

    commercialPropertyData.forEach((commercialPropertyRecord) => {
      //Select a building type that matches with commercial property building type id
      newCommercialPropertyData = [
        ...newCommercialPropertyData,
        formatBuildingTypeForDisplay(commercialPropertyRecord, buildingTypes),
      ];
    });

    return { data: newCommercialPropertyData, columns: columns };
  };

  const onCommercialPropertyDelete = (commercialPropertyId) => {
    dispatch(deleteCommercialProperty(commercialPropertyId));
  };

  return (
    <div className="card p-4">
      <div>
        <p className="display-title fw-bold fs-5 mb-4">
          List of Commercial Property
        </p>
      </div>
      <DataDisplayTabular
        data={prepareCommercialPropertyForDisplay()}
        originalData={commercialPropertyData}
        deletable={true}
        onDelete={onCommercialPropertyDelete}
        editable={true}
        onEdit={{
          path: PATH_AGENT_DASHBOARD_COMMERCIALPROPERTY_EDIT_ABSOLUTE,
          propertyId: "",
        }}
        manageable={true}
        onManage={{
          path: PATH_AGENT_DASHBOARD_COMMERCIALPROPERTY_DETAIL_ABSOLUTE,
        }}
      />
    </div>
  );
};

export default CommercialPropertyList;
