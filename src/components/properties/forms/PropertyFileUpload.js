// @ts-nocheck
import { PATH_AGENT_DASHBOARD_ABSOLUTE } from "components/commons/Strings";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FileUploadInput from "./FileUploadInput";

/**
 * Component that renders file inputs based on file type
 * @returns
 */
const PropertyFileUpload = () => {
  const { state } = useLocation();
  // console.log("STATE: ", state);
  const propertyId = state?.propertyId;

  const navigate = useNavigate();

  const onFinishClick = () => {
    navigate(PATH_AGENT_DASHBOARD_ABSOLUTE, { replace: true });
  };

  return (
    <div className="container">
      <div className="row g-4">
        <div className="col-md-8">
          <div className="my-5">
            <FileUploadInput
              fileType="image"
              maxFiles={10}
              title="Upload property pictures"
              propertyId={propertyId}
            />
          </div>
          <FileUploadInput
            fileType="video"
            maxFiles={4}
            title="Upload property video"
            propertyId={propertyId}
          />
          <div className="py-3 flex-end-general">
            <button
              className="btn-general px-3 py-2"
              type="button"
              onClick={onFinishClick}
            >
              Finish
            </button>
          </div>
        </div>
        <div className="col-md-4" style={{ border: "solid 2px green" }}>
          Information
        </div>
      </div>
    </div>
  );
};

export default PropertyFileUpload;
