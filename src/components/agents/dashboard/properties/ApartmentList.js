// @ts-nocheck
import DataDisplayTabular from "components/commons/DataDisplayTabular";
import {
  PATH_AGENT_DASHBOARD_APARTMENT_DETAIL_ABSOLUTE,
  PATH_AGENT_DASHBOARD_APARTMENT_EDIT_ABSOLUTE,
} from "components/commons/Strings";
import {
  deleteApartment,
  getApartmentsByAgent,
} from "features/agent_dashboard/property/propertyCategorySlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ApartmentList = () => {
  const dispatch = useDispatch();

  const apartmentData = useSelector(
    (store) => store.propertyCategory.apartment.apartmentList.data
  );

  useEffect(() => {
    dispatch(getApartmentsByAgent());
  }, []);

  const prepareApartmentForDisplay = () => {
    const columns = ["id", "floors", "is_new", "is_multi_unit"];

    return { data: apartmentData, columns: columns };
  };

  const onApartmentDelete = (apartmentId) => {
    dispatch(deleteApartment(apartmentId));
  };

  return (
    <div className="card p-4">
      <div>
        <p className="display-title fw-bold fs-5 mb-4">List of Apartments</p>
      </div>
      <DataDisplayTabular
        data={prepareApartmentForDisplay()}
        originalData={apartmentData}
        deletable={true}
        onDelete={onApartmentDelete}
        editable={true}
        onEdit={{
          path: PATH_AGENT_DASHBOARD_APARTMENT_EDIT_ABSOLUTE,
          propertyId: "",
        }}
        manageable={true}
        onManage={{ path: PATH_AGENT_DASHBOARD_APARTMENT_DETAIL_ABSOLUTE }}
        path=""
      />
    </div>
  );
};

export default ApartmentList;
