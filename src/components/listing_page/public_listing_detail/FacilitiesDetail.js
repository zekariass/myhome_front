import React from "react";
import { Link } from "react-router-dom";

const FacilitiesDetail = ({ publicListingDetail }) => {
  //Render Education facilities that are near to the property
  const renderEducationFacilities = () => {
    const educationFacility = publicListingDetail?.property?.education_facility;
    return (
      <ul className="px-4 other-bg rounded-3 py-1 card">
        {educationFacility?.map((edufa, index) => (
          <div key={index}>
            <li>
              <Link to="#" className="link-general link-size-normal fst-italic">
                {edufa?.name}
              </Link>
              <p>
                {edufa?.distance_from_property}{" "}
                {edufa?.distance_unit === "METER" && "Meters "}
                {edufa?.distance_unit === "MILE" && "Miles "}
                {edufa?.distance_unit === "KM" && "Kilometers "}
                away |{" "}
                {edufa?.ownership.charAt(0) +
                  edufa?.ownership.slice(1).toLowerCase()}
              </p>
            </li>
          </div>
        ))}
      </ul>
    );
  };

  //Render Transport facilities that are near to the property
  const renderTransportFacilities = () => {
    const transFacility = publicListingDetail?.property?.transport_facility;
    return (
      <ul className="px-4 other-bg rounded-3 card py-1">
        {transFacility?.map((tranfa, index) => (
          <div key={index}>
            <li>
              <Link to="#" className="link-general link-size-normal fst-italic">
                {tranfa?.name}
              </Link>
              <p>
                {tranfa?.distance_from_property}{" "}
                {tranfa?.distance_unit === "METER" && "Meters "}
                {tranfa?.distance_unit === "MILE" && "Miles "}
                {tranfa?.distance_unit === "KM" && "Kilometers "}
                away | {tranfa?.trans_fa_category?.name}
              </p>
            </li>
          </div>
        ))}
      </ul>
    );
  };

  //Render Point of Interests that are near to the property
  const renderPointOfInterests = () => {
    const pointOfInterest = publicListingDetail?.property?.point_of_interest;
    return (
      <ul className="px-4 other-bg rounded-3 card py-1">
        {pointOfInterest?.map((poi, index) => (
          <div key={index}>
            <li>
              <Link to="#" className="link-general link-size-normal fst-italic">
                {poi?.name}
              </Link>
              <p>
                {poi?.distance_from_property}{" "}
                {poi?.distance_unit === "METER" && "Meters "}
                {poi?.distance_unit === "MILE" && "Miles "}
                {poi?.distance_unit === "KM" && "Kilometers "}
                away | {poi?.poi_category?.name}
              </p>
            </li>
          </div>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <div>
        {!!publicListingDetail?.property?.education_facility.length && (
          <>
            <p className="fs-5 fw-bold">Education Facilities</p>
            <div>{renderEducationFacilities()}</div>
          </>
        )}
      </div>

      <div>
        {!!publicListingDetail?.property?.transport_facility.length && (
          <>
            <p className="fs-5 fw-bold">Transport Facilities</p>
            <div>{renderTransportFacilities()}</div>
          </>
        )}
      </div>
      <div>
        {!!publicListingDetail?.property?.point_of_interest.length && (
          <>
            <p className="fs-5 fw-bold">Point of Interests</p>
            <div>{renderPointOfInterests()}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default FacilitiesDetail;
