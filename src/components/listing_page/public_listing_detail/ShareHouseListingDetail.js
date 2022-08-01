// @ts-nocheck
import AgentPreview from "components/agents/AgentPreview";
import { VILLA_KEY } from "components/commons/Strings";
import React, { useEffect } from "react";
import { useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Villa from "../../commons/icons/villa-icon.png";

import { getAmenitiesByAmenityCategory } from "components/commons/getAmenitiesByAmenityCategory";
import DetailBoxOne from "./DetailBoxOne";
import MediaLinkBox from "./MediaLinkBox";
import AmenitiesDetail from "./AmenitiesDetail";
import DescriptionDetail from "./DescriptionDetail";
import EducationFacilityDetail from "./EducationFacilityDetail";
import TransportFacilityDetail from "./TransportFacilityDetail";
import PointOfInterestDetail from "./PointOfInterestDetail";
import SaveAndShareBox from "./SaveAndShareBox";
const ShareHouseListingDetail = ({ publicListingDetail }) => {
  //Related property is the property that is related to the main property. Could be, Villa, Apartment, Condominium, etc...
  const [relatedProperty, setRelatedProperty] = useState({});
  // const [selectedFacility, setSelectedFacility] = useState("");
  const [propertyAmenitiesByCategory, setPropertyAmenitiesByCategory] =
    useState({});

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
      <div className="px-4 other-bg rounded-3 card py-1">
        {propertyRules?.map((rule, index) => (
          <div key={index}>
            <Link to="#" className="link-general link-size-normal fst-italic">
              {rule?.title}
            </Link>
            <div className="ps-2">
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
        </div>

        <div className="col-lg-5">
          <MediaLinkBox />
        </div>
      </div>
      <div className="row g-3 my-3">
        <div className="col-lg-7">
          <Card>
            <Card.Body>
              <div className="row row-cols-auto g-4">
                <div className="col flex-center-general ">
                  <div className="p-2 other-bg rounded-3">
                    {relatedProperty?.total_number_of_rooms} Total Rooms
                  </div>
                </div>
                <div className="col flex-center-general ">
                  <div className="p-2 other-bg rounded-3">
                    {" "}
                    {relatedProperty?.number_of_rooms_to_share} Rooms to Share
                  </div>
                </div>
                <div className="col flex-center-general">
                  <div className="p-2 other-bg rounded-3">
                    <i className="large bed icon"></i>
                    {relatedProperty?.total_number_of_bed_rooms} Total Bed Rooms
                  </div>
                </div>
                <div className="col flex-center-general">
                  <div className="p-2 other-bg rounded-3">
                    <i className="large bed icon"></i>
                    {relatedProperty?.number_of_bed_rooms_to_share} Bed Rooms to
                    share
                  </div>
                </div>
                <div className="col flex-center-general">
                  <div className="p-2 other-bg rounded-3">
                    <i className="large bath icon"></i>
                    {relatedProperty?.total_number_of_baths} Total Bath Rooms
                  </div>
                </div>
                <div className="col flex-center-general">
                  <div className="p-2 other-bg rounded-3">
                    <i className="large bath icon"></i>
                    {relatedProperty?.number_of_baths_to_share} Bath Rooms to
                    Share
                  </div>
                </div>
                <div className="col flex-center-general">
                  <div className="p-2 other-bg rounded-3">
                    <i className="big expand icon"></i>
                    {relatedProperty?.area} M.Sq Area
                  </div>
                </div>
                <div className="col flex-center-general">
                  <div className="p-2 other-bg rounded-3">
                    <i className="large building icon"></i>
                    Floor level: {relatedProperty?.floor}
                  </div>
                </div>
                <div className="col p-2">
                  <div className="p-2 other-bg rounded-3">
                    <span>
                      <img src={Villa} height={32} width={32} alt="villa" />
                    </span>
                    {publicListingDetail?.property?.property_category?.name}
                  </div>
                </div>
                <div className="col flex-center-general">
                  <div className="p-2 other-bg rounded-3">
                    {relatedProperty?.is_new && (
                      <p className="display-title fw-bold">New Property!</p>
                    )}
                  </div>
                </div>
                <div className="col flex-center-general">
                  <div className="p-2 other-bg rounded-3">
                    {relatedProperty?.is_furnished && (
                      <p className="display-title fw-bold">Furnished!</p>
                    )}
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
          <SaveAndShareBox listing={publicListingDetail} page="publicListingDetail" />
          <div className="my-3">
            <DescriptionDetail publicListingDetail={publicListingDetail} />
          </div>

          {!!publicListingDetail?.property?.amenity?.length && (
            <AmenitiesDetail
              propertyAmenitiesByCategory={propertyAmenitiesByCategory}
            />
          )}
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
              <>
                <p className="fs-5 fw-bold">Property Rules</p>
                <div>{renderPropertyRules()}</div>
              </>
            )}
          </div>
        </div>
        <div className="col-lg-5">
          <AgentPreview agentData={publicListingDetail?.property?.agent} />
        </div>
      </div>
    </div>
  );
};

export default ShareHouseListingDetail;
