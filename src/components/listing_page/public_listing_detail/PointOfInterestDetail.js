import React from "react";
import { Link } from "react-router-dom";

const PointOfInterestDetail = ({ publicListingDetail }) => {
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
      {!!publicListingDetail?.property?.point_of_interest.length && (
        <>
          <p className="fs-5 fw-bold">Point of Interests</p>
          <div>{renderPointOfInterests()}</div>
        </>
      )}
    </div>
  );
};

export default PointOfInterestDetail;
