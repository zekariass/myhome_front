import React from "react";
import { Link } from "react-router-dom";

const TransportFacilityDetail = ({ publicListingDetail }) => {
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
  return (
    <div>
      {!!publicListingDetail?.property?.transport_facility.length && (
        <>
          <p className="fs-5 fw-bold">Transport Facilities</p>
          <div>{renderTransportFacilities()}</div>
        </>
      )}
    </div>
  );
};

export default TransportFacilityDetail;
