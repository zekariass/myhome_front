// @ts-nocheck
import DataDisplay from "components/commons/DataDisplay";
import DataDisplayTabular from "components/commons/DataDisplayTabular";
import {
  PATH_AGENT_DASHBOARD_APARTMENTUNIT_DETAIL_ABSOLUTE,
  PATH_AGENT_DASHBOARD_APARTMENTUNIT_EDIT_ABSOLUTE,
  PATH_AGENT_DASHBOARD_APARTMENT_EDIT_ABSOLUTE,
  PATH_AGENT_DASHBOARD_LISTING_LIST_ABSOLUTE,
} from "components/commons/Strings";
import {
  deleteApartmentUnit,
  getApartmentDetail,
  getApartmentUnitsByApartment,
} from "features/agent_dashboard/property/propertyCategorySlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  setListingKeyValueByProperty,
  setListingKeyValueByUnit,
} from "./listingKey";
import PropertyDetail from "./PropertyDetail";

const ApartmentDetail = ({ propApartmentId, noParentDetail }) => {
  //   const [apartmentData, setApartmentData] = useState({});

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const apartmentData = useSelector(
    (store) => store.propertyCategory.apartment.getApartmentDetail.data
  );

  const apartmentUnitsData = useSelector(
    (store) => store.propertyCategory.apartment.unit.apartmentUnitList.data
  );

  useEffect(() => {
    const apartmentId =
      propApartmentId !== undefined
        ? propApartmentId
        : location.state?.data?.id;
    dispatch(getApartmentDetail(apartmentId));

    dispatch(getApartmentUnitsByApartment(apartmentId));
  }, []);

  const formatApartmentUnitData = () => {
    const columns = [
      "id",
      "number_of_rooms",
      "number_of_bed_rooms",
      "number_of_baths",
      "floor",
      "area",
      "is_furnished",
      "is_available",
    ];

    return { columns: columns, data: apartmentUnitsData };
  };

  const onApartmentUnitDelete = (apartmentUnitId) => {
    dispatch(
      deleteApartmentUnit({
        apartmentUnitId: apartmentUnitId,
        apartmentId: apartmentData?.id,
      })
    );
  };

  //   console.log(apartmentData);
  return (
    <div className=" m-2">
      <div className="row row-cols-1 row-cols-lg-2">
        <div className="card col">
          <DataDisplay
            data={apartmentData}
            title="Your Apartment Detail"
            editable={true}
            editInitialValues={apartmentData}
            path={PATH_AGENT_DASHBOARD_APARTMENT_EDIT_ABSOLUTE}
          />
        </div>
        <div className="col">
          <Link
            to={PATH_AGENT_DASHBOARD_LISTING_LIST_ABSOLUTE}
            onClick={() => setListingKeyValueByProperty(dispatch)}
            state={{ data: apartmentData }}
            className="link-general link-size-small"
          >
            Property Listings
          </Link>
        </div>
      </div>
      <div>
        {!noParentDetail && (
          <div>
            <p className="display-title fw-bold my-4">Your Apartment Units</p>
            <div className="card p-3">
              <DataDisplayTabular
                data={formatApartmentUnitData()}
                originalData={apartmentUnitsData}
                editable={true}
                onEdit={{
                  path: PATH_AGENT_DASHBOARD_APARTMENTUNIT_EDIT_ABSOLUTE,
                }}
                deletable={true}
                onDelete={onApartmentUnitDelete}
                manageable={false}
                onManage={{
                  path: PATH_AGENT_DASHBOARD_APARTMENTUNIT_DETAIL_ABSOLUTE,
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
                to={PATH_AGENT_DASHBOARD_APARTMENTUNIT_EDIT_ABSOLUTE}
                state={{ apartmentId: apartmentData.id }}
                className="link-general link-size-small"
              >
                Add Apartment Unit
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

export default ApartmentDetail;
