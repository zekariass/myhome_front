import React, { useState } from "react";
import { Link } from "react-router-dom";

const DescriptionDetail = ({ publicListingDetail }) => {
  const [showPropertyDescription, setShowPropertyDescription] = useState(false);
  return (
    <div>
      <p className="fs-5 fw-bold">Description</p>
      <p className="text-justify px-3">{publicListingDetail?.description}</p>

      {publicListingDetail?.property?.description && !showPropertyDescription && (
        <div
          role="button"
          className="link-general link-size-small link-underline"
          onClick={() => setShowPropertyDescription(true)}
        >
          More property detail
        </div>
      )}
      {showPropertyDescription && (
        <div>
          <p className="fw-bold">More detail about property</p>
          <p className="text-justify px-3">
            {publicListingDetail?.property?.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default DescriptionDetail;
