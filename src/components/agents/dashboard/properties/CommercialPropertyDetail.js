// @ts-nocheck
import DataDisplay from "components/commons/DataDisplay";
import DataDisplayTabular from "components/commons/DataDisplayTabular";
import {
  PATH_AGENT_DASHBOARD_COMMERCIALPROPERTYUNIT_DETAIL_ABSOLUTE,
  PATH_AGENT_DASHBOARD_COMMERCIALPROPERTYUNIT_EDIT_ABSOLUTE,
  PATH_AGENT_DASHBOARD_COMMERCIALPROPERTY_EDIT_ABSOLUTE,
} from "components/commons/Strings";
import {
  deleteApartmentUnit,
  getCommercialPropertyDetail,
  getCommercialPropertyUnitsByCommercialProperty,
} from "features/agent_dashboard/property/propertyCategorySlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PropertyDetail from "./PropertyDetail";

const CommercialPropertyDetail = () => {
  //   const [commercialPropertyData, setCommercialPropertyData] = useState({});

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const commercialPropertyData = useSelector(
    (store) =>
      store.propertyCategory.commercialProperty.getCommercialPropertyDetail.data
  );

  const commercialPropertyUnitsData = useSelector(
    (store) =>
      store.propertyCategory.commercialProperty.unit.commercialPropertyUnitList
        .data
  );

  useEffect(() => {
    const commercialPropertyId = location.state?.data?.id;
    dispatch(getCommercialPropertyDetail(commercialPropertyId));

    dispatch(
      getCommercialPropertyUnitsByCommercialProperty(commercialPropertyId)
    );
  }, []);

  const formatCommercialPropertyUnitData = () => {
    const columns = [
      "id",
      "number_of_rooms",
      "area",
      "floor",
      "com_prop_unit_description",
      "commercial_property",
    ];

    return { columns: columns, data: commercialPropertyUnitsData };
  };

  const onCommercialPropertyUnitDelete = (commercialPropertyUnitId) => {
    dispatch(
      deleteApartmentUnit({
        commercialPropertyUnitId: commercialPropertyUnitId,
        commercialPropertyId: commercialPropertyData?.id,
      })
    );
  };

  return (
    <div className=" m-2">
      <div className="row row-cols-1 row-cols-lg-2">
        <div className="card col">
          <DataDisplay
            data={commercialPropertyData}
            title="Your Commercial Property Detail"
            editable={true}
            editInitialValues={commercialPropertyData}
            path={PATH_AGENT_DASHBOARD_COMMERCIALPROPERTY_EDIT_ABSOLUTE}
          />
        </div>
      </div>
      <p className="display-title fw-bold my-4">
        Your Commercial Property Units
      </p>
      <div className="card p-3">
        <DataDisplayTabular
          data={formatCommercialPropertyUnitData()}
          originalData={commercialPropertyUnitsData}
          editable={true}
          onEdit={{
            path: PATH_AGENT_DASHBOARD_COMMERCIALPROPERTYUNIT_EDIT_ABSOLUTE,
          }}
          deletable={true}
          onDelete={onCommercialPropertyUnitDelete}
          manageable={false}
          onManage={{
            path: PATH_AGENT_DASHBOARD_COMMERCIALPROPERTYUNIT_DETAIL_ABSOLUTE,
          }}
        />
      </div>
      <div className="flex-end-general my-3">
        <Link
          to={PATH_AGENT_DASHBOARD_COMMERCIALPROPERTYUNIT_EDIT_ABSOLUTE}
          state={{ commercialPropertyId: commercialPropertyData?.id }}
          className="link-general link-size-small"
        >
          Add Commercial Property Unit
        </Link>
      </div>
      <div className="my-4">
        <p className="fw-bold fs-5 display-title mb-4">Your property Detail</p>
        <PropertyDetail propPropertyId={location.state?.data?.property} />
      </div>
    </div>
  );
};

export default CommercialPropertyDetail;
