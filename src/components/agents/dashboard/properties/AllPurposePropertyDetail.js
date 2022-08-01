// @ts-nocheck
import DataDisplay from "components/commons/DataDisplay";
import DataDisplayTabular from "components/commons/DataDisplayTabular";
import { formatBuildingTypeForDisplay } from "components/commons/formatBuildingTypeForDisplay";
import {
  PATH_AGENT_DASHBOARD_ALLPURPOSEPROPERTYUNIT_DETAIL_ABSOLUTE,
  PATH_AGENT_DASHBOARD_ALLPURPOSEPROPERTYUNIT_EDIT_ABSOLUTE,
  PATH_AGENT_DASHBOARD_ALLPURPOSEPROPERTY_EDIT_ABSOLUTE,
  PATH_AGENT_DASHBOARD_LISTING_LIST_ABSOLUTE,
} from "components/commons/Strings";
import {
  deleteAllPurposePropertyUnit,
  getAllPurposePropertyDetail,
  getAllPurposePropertyUnitsByAllPurposeProperty,
} from "features/agent_dashboard/property/propertyCategorySlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  setListingKeyValueByProperty,
  setListingKeyValueByUnit,
} from "./listingKey";
import PropertyDetail from "./PropertyDetail";

const AllPurposePropertyDetail = ({ propAPPId, noParentDetail }) => {
  //   const [allPurposePropertyData, setallPurposePropertyData] = useState({});

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allPurposePropertyData = useSelector(
    (store) =>
      store.propertyCategory.allPurposeProperty.getAllPurposePropertyDetail.data
  );

  const allPurposePropertyUnitsData = useSelector(
    (store) =>
      store.propertyCategory.allPurposeProperty.unit.allPurposePropertyUnitList
        .data
  );

  const buildingTypes = useSelector(
    (store) => store.buildingType.response.data
  );

  useEffect(() => {
    const allPurposePropertyId =
      propAPPId !== undefined ? propAPPId : location.state?.data?.id;
    dispatch(getAllPurposePropertyDetail(allPurposePropertyId));

    dispatch(
      getAllPurposePropertyUnitsByAllPurposeProperty(allPurposePropertyId)
    );
  }, []);

  const formatAllPurposePropertyUnitData = () => {
    const columns = [
      "id",
      "number_of_rooms",
      "area",
      "floor",
      "all_purpose_property_unit_description",
    ];

    return { columns: columns, data: allPurposePropertyUnitsData };
  };

  const formatAllPurposePropertyForDisplay = () => {
    return formatBuildingTypeForDisplay(allPurposePropertyData, buildingTypes);
  };

  const onAllPurposePropertyUnitDelete = (allPurposePropertyUnitId) => {
    dispatch(
      deleteAllPurposePropertyUnit({
        allPurposePropertyUnitId: allPurposePropertyUnitId,
        allPurposePropertyId: allPurposePropertyData?.id,
      })
    );
  };

  return (
    <div className=" m-2">
      <div className="row row-cols-1 row-cols-lg-2">
        <div className="card col">
          <DataDisplay
            data={formatAllPurposePropertyForDisplay()}
            title="Your All Purpose Property Detail"
            editable={true}
            editInitialValues={allPurposePropertyData}
            path={PATH_AGENT_DASHBOARD_ALLPURPOSEPROPERTY_EDIT_ABSOLUTE}
          />
        </div>
        <div className="col">
          <Link
            to={PATH_AGENT_DASHBOARD_LISTING_LIST_ABSOLUTE}
            onClick={() => setListingKeyValueByProperty(dispatch)}
            state={{ data: allPurposePropertyData }}
            className="link-general link-size-small"
          >
            Property Listings
          </Link>
        </div>
      </div>
      <div>
        {!noParentDetail && (
          <div>
            <p className="display-title fw-bold my-4">
              Your All Purpose Property Units
            </p>
            <div className="card p-3">
              <DataDisplayTabular
                data={formatAllPurposePropertyUnitData()}
                originalData={allPurposePropertyUnitsData}
                editable={true}
                onEdit={{
                  path: PATH_AGENT_DASHBOARD_ALLPURPOSEPROPERTYUNIT_EDIT_ABSOLUTE,
                }}
                deletable={true}
                onDelete={onAllPurposePropertyUnitDelete}
                manageable={false}
                onManage={{
                  path: PATH_AGENT_DASHBOARD_ALLPURPOSEPROPERTYUNIT_DETAIL_ABSOLUTE,
                }}
                showListing={true}
                onShowListing={{
                  path: PATH_AGENT_DASHBOARD_LISTING_LIST_ABSOLUTE,
                  onClick: () => setListingKeyValueByUnit(dispatch),
                }}
              />
            </div>
            <div className="flex-end-general my-3">
              <Link
                to={PATH_AGENT_DASHBOARD_ALLPURPOSEPROPERTYUNIT_EDIT_ABSOLUTE}
                state={{ allPurposePropertyId: allPurposePropertyData?.id }}
                className="link-general link-size-small"
              >
                Add All Purpose Property Unit
              </Link>
            </div>
            <div className="my-4">
              <p className="fw-bold fs-5 display-title mb-4">
                Your property Detail
              </p>
              <PropertyDetail propPropertyId={location.state?.data?.property} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPurposePropertyDetail;
