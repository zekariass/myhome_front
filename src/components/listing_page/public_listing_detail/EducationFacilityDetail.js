import React from "react";
import { Link } from "react-router-dom";

const EducationFacilityDetail = ({ publicListingDetail }) => {
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
  return (
    <div>
      {!!publicListingDetail?.property?.education_facility.length && (
        <>
          <p className="fs-5 fw-bold">Education Facilities</p>
          <div>{renderEducationFacilities()}</div>
        </>
      )}
    </div>
  );
};

export default EducationFacilityDetail;
