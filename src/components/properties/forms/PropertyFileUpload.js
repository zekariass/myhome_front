// @ts-nocheck
import {
  PATH_AGENT_DASHBOARD,
  PATH_AGENT_DASHBOARD_PROPERTY_DETAIL_ABSOLUTE,
  PATH_AGENT_DASHBOARD_PROPERTY_LIST,
  PATH_AGENT_DASHBOARD_PROPERTY_LIST_ABSOLUTE,
} from "components/commons/Strings";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import FileUploadInput from "./FileUploadInput";

/**
 * Component that renders file inputs based on file type
 * @returns
 */
const PropertyFileUpload = () => {
  const systemParams = useSelector((store) => store.system.systemParams.data);
  const [totalImages, setTotalImages] = useState(0);
  const [totalVideos, setTotalVideos] = useState(0);

  // console.log("systemParams: ", systemParams);

  useEffect(() => {
    systemParams.forEach((param) => {
      if (param.param_name === "PROPERTY_IMAGES") {
        setTotalImages(parseInt(param.param_value));
      } else if (param.param_name === "PROPERTY_VIDEOS") {
        setTotalVideos(parseInt(param.param_value));
      }
    });
  }, [systemParams]);

  const { state } = useLocation();
  // console.log("PARAMS: ", totalImages, totalVideos);

  // console.log("STATE: ", state);

  const propertyId = state?.propertyId;
  const videos_count = state?.videos_count;
  const images_count = state?.images_count;
  const from = state?.from;

  const navigate = useNavigate();

  const onFinishClick = () => {
    const redirectPath =
      from === "property_detail"
        ? PATH_AGENT_DASHBOARD_PROPERTY_DETAIL_ABSOLUTE
        : PATH_AGENT_DASHBOARD_PROPERTY_LIST_ABSOLUTE;
    navigate(redirectPath, {
      replace: true,
      state: { propertyId: propertyId },
    });
  };

  return (
    <div className="container">
      <div className="row g-4">
        <div className="col-md-8">
          <div className="my-5">
            <FileUploadInput
              fileType="image"
              maxFiles={totalImages - images_count}
              title="Upload property pictures"
              propertyId={propertyId}
            />
          </div>
          <FileUploadInput
            fileType="video"
            maxFiles={totalVideos - videos_count}
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
