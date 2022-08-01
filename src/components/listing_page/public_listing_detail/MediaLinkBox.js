import React from "react";
import { Link } from "react-router-dom";

const MediaLinkBox = () => {
  return (
    <div className="card py-2 ps-4">
      <div>
        <Link to="#" className="link-general link-size-small">
          <span>
            <i className="large film icon text-black me-3"></i>
          </span>
          Property Videos
        </Link>
      </div>
      <div className="my-2">
        <span className="input-border-color fs-5 fw-bold in me-3">VR</span>
        <Link to="#" className="link-general link-size-small">
          Property Virtual View
        </Link>
      </div>
    </div>
  );
};

export default MediaLinkBox;
