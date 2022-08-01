// @ts-nocheck
import AgentPreview from "components/agents/AgentPreview";
import { APARTMENT_KEY } from "components/commons/Strings";
import React, { useEffect } from "react";
import { useState } from "react";
import { Card, Tab, Tabs } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Villa from "../../commons/icons/villa-icon.png";
import {
  getCurrencyName,
  getPeriodicityName,
  getFullAddress,
  getListingTypeName,
} from "../../commons/functions";
import { getAmenitiesByAmenityCategory } from "components/commons/getAmenitiesByAmenityCategory";
import TransportFacilityDetail from "./TransportFacilityDetail";
import DescriptionDetail from "./DescriptionDetail";
import AmenitiesDetail from "./AmenitiesDetail";
import DetailBoxOne from "./DetailBoxOne";
import MediaLinkBox from "./MediaLinkBox";
import SaveAndShareBox from "./SaveAndShareBox";
const LandListingDetail = ({ publicListingDetail }) => {
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
        </div>

        <div className="col-lg-5">
          <MediaLinkBox />
        </div>
      </div>
      <div className="row g-3 my-3">
        <div className="col-lg-7">
          <Card>
            <Card.Body>
              <div className="row row-cols-auto g-3">
                <div className="col flex-center-general">
                  <div className="p-2 other-bg rounded-3">
                    <i className="large expand icon"></i>
                    {relatedProperty?.area} M.Sq Area
                  </div>
                </div>
                <div className="col flex-center-general">
                  <div className="p-2 other-bg rounded-3">
                    Length: {relatedProperty?.length} Meteres
                    <i className="ps-2 info circle icon" role="button"></i>
                  </div>
                </div>
                <div className="col flex-center-general">
                  <div className="p-2 other-bg rounded-3">
                    Width: {relatedProperty?.width} Meters
                    <i className="ps-2 info circle icon" role="button"></i>
                  </div>
                </div>
                <div className="col flex-center-general">
                  {relatedProperty?.has_dept && (
                    <p className="p-2 other-bg rounded-3">
                      Has Debt{" "}
                      <i className="ps-2 info circle icon" role="button"></i>
                    </p>
                  )}

                  {!relatedProperty?.has_dept && (
                    <p className="p-2 other-bg rounded-3">
                      Has No Debt{" "}
                      <i className="ps-2 info circle icon" role="button"></i>
                    </p>
                  )}
                </div>
                <div className="col flex-center-general">
                  {relatedProperty?.has_plan && (
                    <p className="p-2 other-bg rounded-3">
                      Has Plan{" "}
                      <i className="ps-2 info circle icon" role="button"></i>
                    </p>
                  )}

                  {!relatedProperty?.has_plan && (
                    <p className="p-2 other-bg rounded-3">
                      Has No Plan{" "}
                      <i className="ps-2 info circle icon" role="button"></i>
                    </p>
                  )}
                </div>

                <div className="col">
                  <div className="p-2 other-bg rounded-3 flex-center-general">
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
        <div className="col-lg-5">
          <AgentPreview agentData={publicListingDetail?.property?.agent} />
        </div>
      </div>
    </div>
  );
};

export default LandListingDetail;
