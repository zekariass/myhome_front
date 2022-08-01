import React from "react";

const AmenitiesDetail = ({ propertyAmenitiesByCategory }) => {
  return (
    <div className="my-3">
      <p className="fs-5 fw-bold">Amenities</p>
      <div className="row px-3 g-3">
        {Object.keys(propertyAmenitiesByCategory).map((category, index) => (
          <div key={index} className="col-lg-6">
            <div className="other-bg p-2 card">
              <p className="fw-bold fst-italic">{category}</p>
              <ul>
                {propertyAmenitiesByCategory[category].map((amenity, index) => (
                  <div key={index}>
                    <li>{amenity.name}</li>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AmenitiesDetail;
