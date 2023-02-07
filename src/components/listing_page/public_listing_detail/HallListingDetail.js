// @ts-nocheck
import AgentPreview from "components/agents/AgentPreview";
import React, { useEffect } from "react";
import { useState } from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Villa from "../../commons/icons/villa-icon.png";
import { getAmenitiesByAmenityCategory } from "components/commons/getAmenitiesByAmenityCategory";
import TransportFacilityDetail from "./TransportFacilityDetail";
import DescriptionDetail from "./DescriptionDetail";
import AmenitiesDetail from "./AmenitiesDetail";
import DetailBoxOne from "./DetailBoxOne";
import MediaLinkBox from "./MediaLinkBox";
import SaveAndShareBox from "./SaveAndShareBox";
const HallListingDetail = ({ publicListingDetail }) => {
  //Related property is the property that is related to the main property. Could be, Villa, Apartment, Condominium, etc...
  const [relatedProperty, setRelatedProperty] = useState({});
  // const [selectedFacility, setSelectedFacility] = useState("");
  const [propertyAmenitiesByCategory, setPropertyAmenitiesByCategory] =
    useState({});

  //Get supported currencies
  const currencies = useSelector(
    (store) => store.system.currency.currencyList.data
  );

  //Get listing types
  const listingTpes = useSelector(
    (store) => store.listing.getListingTypes.data
  );

  //Get periodicities, such as Daily, Weekly, Monthly
  const periodicities = useSelector(
    (store) => store.common.periodicityList.data
  );

  //Set related property to the local state when publicListingDetail is changed
  //Get formatted amenities by amenity category for display
  useEffect(() => {
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
                      {relatedProperty?.total_capacity} Total Capacity
                      <i className="ps-2 info circle icon" role="button"></i>
                    </div>
                  </div>
                  <div className="col flex-center-general">
                    <div className="p-2 other-bg rounded-3">
                      {relatedProperty?.number_of_seats} Seats
                      <i className="ps-2 info circle icon" role="button"></i>
                    </div>
                  </div>
                  <div className="col flex-center-general">
                    {relatedProperty?.has_parking_space && (
                      <div className="p-2 other-bg rounded-3">
                        Parking space
                      </div>
                    )}
                  </div>
                  <div className="col flex-center-general">
                    <div className="p-2 other-bg rounded-3">
                      Floor Level: {relatedProperty?.floor}
                    </div>
                  </div>
                  <div className="col flex-center-general">
                    <div className="p-2 other-bg rounded-3">
                      <span>
                        <img src={Villa} height={32} width={32} alt="villa" />
                      </span>
                      {publicListingDetail?.property?.property_category?.name}
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
            <SaveAndShareBox
              listing={publicListingDetail}
              page="publicListingDetail"
            />
            <div className="my-3">
              <DescriptionDetail publicListingDetail={publicListingDetail} />
            </div>
            <div className="my-3">
              {!!publicListingDetail?.property?.amenity?.length && (
                <AmenitiesDetail
                  propertyAmenitiesByCategory={propertyAmenitiesByCategory}
                />
              )}
            </div>
            <div className="my-5">
              <TransportFacilityDetail
                publicListingDetail={publicListingDetail}
              />
            </div>
            <div>
              {!!publicListingDetail?.property?.rules.length && (
                <>
                  <p className="fs-5 fw-bold">Property Rules</p>
                  <div>{renderPropertyRules()}</div>
                </>
              )}
            </div>
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

export default HallListingDetail;
