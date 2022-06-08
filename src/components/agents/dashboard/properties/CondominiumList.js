// @ts-nocheck
import DataDisplayTabular from "components/commons/DataDisplayTabular";
import {
  PATH_AGENT_DASHBOARD_CONDOMINIUM_DETAIL_ABSOLUTE,
  PATH_AGENT_DASHBOARD_CONDOMINIUM_EDIT_ABSOLUTE,
} from "components/commons/Strings";
import {
  deleteCondominium,
  getCondominiumByAgent,
} from "features/agent_dashboard/property/propertyCategorySlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CondominiumList = () => {
  const dispatch = useDispatch();

  const condominiumData = useSelector(
    // @ts-ignore
    (store) => store.propertyCategory.condominium.condominiumList.data
  );

  useEffect(() => {
    dispatch(getCondominiumByAgent());
  }, []);

  const prepareCondominiumForDisplay = () => {
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

    return { data: condominiumData, columns: columns };
  };

  const onCondominiumDelete = (condominiumId) => {
    dispatch(deleteCondominium(condominiumId));
  };

  return (
    <div className="card p-4">
      <div>
        <p className="display-title fw-bold fs-5 mb-4">List of Condominiums</p>
      </div>
      <DataDisplayTabular
        data={prepareCondominiumForDisplay()}
        originalData={condominiumData}
        deletable={true}
        onDelete={onCondominiumDelete}
        editable={true}
        onEdit={{
          path: PATH_AGENT_DASHBOARD_CONDOMINIUM_EDIT_ABSOLUTE,
          propertyId: "",
        }}
        manageable={true}
        onManage={{ path: PATH_AGENT_DASHBOARD_CONDOMINIUM_DETAIL_ABSOLUTE }}
      />
    </div>
  );
};

export default CondominiumList;
