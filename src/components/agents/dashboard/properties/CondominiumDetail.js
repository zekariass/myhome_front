// @ts-nocheck
import DataDisplay from "components/commons/DataDisplay";
import DataDisplayTabular from "components/commons/DataDisplayTabular";
import {
  PATH_AGENT_DASHBOARD_CONDOMINIUM_DETAIL_ABSOLUTE,
  PATH_AGENT_DASHBOARD_CONDOMINIUM_EDIT_ABSOLUTE,
  PATH_AGENT_DASHBOARD_VILLA_EDIT_ABSOLUTE,
} from "components/commons/Strings";
import { getCondominiumDetail } from "features/agent_dashboard/property/propertyCategorySlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import PropertyDetail from "./PropertyDetail";

const CondominiumDetail = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const condominiumData = useSelector(
    (store) => store.propertyCategory.condominium.getCondominiumDetail.data
  );

  useEffect(() => {
    const condominiumId = location.state?.data?.id;
    dispatch(getCondominiumDetail(condominiumId));
  }, []);

  //   console.log(condominiumData);
  return (
    <div className=" m-2">
      <div className="row row-cols-1 row-cols-lg-2">
        <div className="card col">
          <DataDisplay
            data={condominiumData}
            title="Your Villa Detail"
            editable={true}
            editInitialValues={condominiumData}
            path={PATH_AGENT_DASHBOARD_CONDOMINIUM_EDIT_ABSOLUTE}
          />
        </div>
      </div>
      <div className="my-4">
        <p className="fw-bold fs-5 display-title mb-4">Your property Detail</p>
        <PropertyDetail propPropertyId={location.state?.data?.property} />
      </div>
    </div>
  );
};

export default CondominiumDetail;
