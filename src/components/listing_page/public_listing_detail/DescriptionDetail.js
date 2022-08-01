import React from "react";
import { Link } from "react-router-dom";

const DescriptionDetail = ({ publicListingDetail }) => {
  return (
    <div>
      <p className="fs-5 fw-bold">Description</p>
      <p className="text-justify px-3">{publicListingDetail?.description}</p>
      {publicListingDetail?.property?.description && (
        <Link to="#" className="link-general link-size-small link-underline">
          More property detail
        </Link>
      )}
    </div>
  );
};

export default DescriptionDetail;
