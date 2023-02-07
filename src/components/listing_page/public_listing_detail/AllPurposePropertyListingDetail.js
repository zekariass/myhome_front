// @ts-nocheck
import AgentPreview from "components/agents/AgentPreview";
import { getAmenitiesByAmenityCategory } from "components/commons/getAmenitiesByAmenityCategory";
import { ALL_PURPOSE_PROPERTY_KEY } from "components/commons/Strings";
import { getPropertyUnitDetail } from "features/agent_dashboard/property/propertySlice";
import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AmenitiesDetail from "./AmenitiesDetail";
import DescriptionDetail from "./DescriptionDetail";
import DetailBoxOne from "./DetailBoxOne";
import EducationFacilityDetail from "./EducationFacilityDetail";
import MediaLinkBox from "./MediaLinkBox";
import PointOfInterestDetail from "./PointOfInterestDetail";
import SaveAndShareBox from "./SaveAndShareBox";
import TransportFacilityDetail from "./TransportFacilityDetail";
const AllPurposePropertyListingDetail = ({ publicListingDetail }) => {
  //Related property is the property that is related to the main property. Could be, Villa, Apartment, Condominium, etc...
  const [relatedProperty, setRelatedProperty] = useState({});
  // const [selectedFacility, setSelectedFacility] = useState("");
  const [propertyAmenitiesByCategory, setPropertyAmenitiesByCategory] =
    useState({});

  //Get property unit detail from store
  const unitDetail = useSelector(
    (store) => store.property.getPropertyUnitDetail.data
  );

  const dispatch = useDispatch();

  //Set related property to the local state when publicListingDetail is changed
  //Get formatted amenities by amenity category for display
  useEffect(() => {
    const propertyCategory = publicListingDetail?.property?.property_category;
    // console.log("HEYYYYYYY: ",propertyCategory)
    let unitId;

    if (propertyCategory?.cat_key === ALL_PURPOSE_PROPERTY_KEY) {
      unitId = publicListingDetail?.unit_listing?.all_purpose_property_unit;
    }

    if (unitId) {
      dispatch(
        getPropertyUnitDetail({
          unitId: unitId,
          catKey: propertyCategory?.cat_key,
        })
      );
    }

    setRelatedProperty(publicListingDetail?.property?.related_property);
    setPropertyAmenitiesByCategory(
      getAmenitiesByAmenityCategory(publicListingDetail?.property?.amenity)
    );
  }, [publicListingDetail]);

  //Render rules of the property
  const renderPropertyRules = () => {
    const propertyRules = publicListingDetail?.property?.rules;
    return (
      <div className="px-4 other-bg rounded-3 px-2 py-1">
        {propertyRules?.map((rule, index) => (
          <div key={index}>
            <Link to="#" className="link-general link-size-normal fst-italic">
              {rule?.title}
            </Link>
            <div className="ps-2">
              {" "}
              <p>{rule?.description}</p>
              <p>Strictness: {rule?.strictness}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="row my-3 g-3">
        <div className="col-lg-7">
          <DetailBoxOne publicListingDetail={publicListingDetail} />

          <div className="my-3">
            <Card>
              <Card.Body>
                <div className="row row-cols-auto g-3">
                  <div className="col flex-center-general">
                    <div className="p-2 other-bg rounded-3">
                      <i className="large building icon"></i>
                      {unitDetail?.number_of_rooms} Rooms
                    </div>
                  </div>

                  <div className="col flex-center-general">
                    <div className="p-2 other-bg rounded-3">
                      <i className="large expand icon"></i>
                      {unitDetail?.area}
                      {unitDetail?.total_compound_area} M.Sq Area
                    </div>
                  </div>

                  <div className="col flex-center-general">
                    <div className="p-2 other-bg rounded-3">
                      <i className="large building icon"></i>
                      In {relatedProperty?.floors} Floors Property
                    </div>
                  </div>

                  <div className="col flex-center-general">
                    <div className="p-2 other-bg rounded-3">
                      <i className="large building icon"></i>
                      Floor Level: {unitDetail?.floor}
                    </div>
                  </div>

                  <div className="col flex-center-general">
                    {relatedProperty?.is_new && (
                      <div className="p-2 other-bg rounded-3">
                        <p className="display-title fw-bold">New Property!</p>
                      </div>
                    )}
                  </div>

                  <div className="col flex-center-general ">
                    {relatedProperty?.has_parking_space && (
                      <p className="p-2 other-bg rounded-3">Parking Space!</p>
                    )}
                  </div>
                  <div className="col flex-center-general ">
                    {relatedProperty?.is_multi_unit && (
                      <p className="p-2 other-bg rounded-3">
                        In Multi-unit Property
                      </p>
                    )}
                  </div>
                  <div className="col flex-center-general ">
                    <p className="p-2 other-bg rounded-3">
                      Best for {relatedProperty?.best_for}
                    </p>
                  </div>
                  <div className="col">
                    <div className="p-2 other-bg rounded-3">
                      In {relatedProperty?.building_type?.type}
                    </div>
                  </div>

                  <div className="col">
                    <div className="p-2 other-bg rounded-3">
                      {publicListingDetail?.property?.property_category?.name}
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
          <SaveAndShareBox
            listing={publicListingDetail}
            page="publicListingDetail"
          />
          <div className="my-3">
            <DescriptionDetail publicListingDetail={publicListingDetail} />
          </div>
          <div className="my-3">
            {!!publicListingDetail?.property?.amenity.length && (
              <AmenitiesDetail
                propertyAmenitiesByCategory={propertyAmenitiesByCategory}
              />
            )}
          </div>
          <div className="my-5">
            <EducationFacilityDetail
              publicListingDetail={publicListingDetail}
            />
            <TransportFacilityDetail
              publicListingDetail={publicListingDetail}
            />
            <PointOfInterestDetail publicListingDetail={publicListingDetail} />
          </div>
          <div>
            {!!publicListingDetail?.property?.rules.length && (
              <div>
                <p className="fs-5 fw-bold">Property Rules</p>
                <div>{renderPropertyRules()}</div>
              </div>
            )}
          </div>
        </div>
        <div className="col-lg-5">
          <div style={{ position: "sticky", top: "10px" }}>
            <AgentPreview
              agentData={publicListingDetail?.property?.agent}
              listingData={publicListingDetail}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPurposePropertyListingDetail;
