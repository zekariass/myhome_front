// @ts-nocheck
import DataDisplayTabular from "components/commons/DataDisplayTabular";
import {
  PATH_AGENT_DASHBOARD_VILLA_DETAIL_ABSOLUTE,
  PATH_AGENT_DASHBOARD_VILLA_EDIT_ABSOLUTE,
} from "components/commons/Strings";
import {
  deleteVilla,
  getVillaByAgent,
} from "features/agent_dashboard/property/propertyCategorySlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const VillaList = () => {
  const dispatch = useDispatch();

  const villaData = useSelector(
    // @ts-ignore
    (store) => store.propertyCategory.villa.villaList.data
  );

  // console.log("ORIGINAL DATA: ", villaData);

  useEffect(() => {
    dispatch(getVillaByAgent());
  }, []);

  const prepareVillaForDisplay = () => {
    const columns = [
      "id",
      "number_of_rooms",
      "number_of_bed_rooms",
      "floor",
      "number_of_baths",
      "total_compound_area",
      "housing_area",
      "is_furnished",
      "is_new",
    ];

    return { data: villaData, columns: columns };
  };

  const onVillaDelete = (villaId) => {
    dispatch(deleteVilla(villaId));
  };

  return (
    <div className="card p-4">
      <div>
        <p className="display-title fw-bold fs-5 mb-4">List of Villas</p>
      </div>
      <DataDisplayTabular
        data={prepareVillaForDisplay()}
        originalData={villaData}
        deletable={true}
        onDelete={onVillaDelete}
        editable={true}
        onEdit={{
          path: PATH_AGENT_DASHBOARD_VILLA_EDIT_ABSOLUTE,
          propertyId: "",
        }}
        manageable={true}
        onManage={{ path: PATH_AGENT_DASHBOARD_VILLA_DETAIL_ABSOLUTE }}
      />
    </div>
  );
};

export default VillaList;
