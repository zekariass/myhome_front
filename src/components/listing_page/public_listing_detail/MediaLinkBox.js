import { PATH_PUBLIC_LISTING } from "components/commons/Strings";
import React from "react";
import { Link } from "react-router-dom";

const MediaLinkBox = ({ publicListingDetail }) => {
  return (
    <div>
      {(!!publicListingDetail?.property?.videos?.length ||
        !!publicListingDetail?.property?.virtual_tours?.length) && (
        <div className="card py-2 ps-4">
          <div>
            {!!publicListingDetail?.property?.videos?.length && (
              <Link
                to={`${PATH_PUBLIC_LISTING}/${publicListingDetail?.id}/video/view`}
                state={{ videos: publicListingDetail?.property?.videos }}
                className="link-general link-size-small"
              >
                <span>
                  <i className="large film icon text-black me-3"></i>
                </span>
                Property Videos
              </Link>
            )}
          </div>
          {!!publicListingDetail?.property?.virtual_tours?.length && (
            <div className="my-2">
              <span className="input-border-color fs-5 fw-bold in me-3">
                VR
              </span>
              <Link to="#" className="link-general link-size-small">
                Property Virtual View
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MediaLinkBox;
