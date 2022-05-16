// @ts-nocheck

import React from "react";
import FileUploadInput from "./FileUploadInput";

const PropertyFileUpload = () => {
  return (
    <div>
      <div className="my-5">
        <FileUploadInput
          fileType="image"
          maxFiles={10}
          title="Upload property pictures"
        />
      </div>
      <FileUploadInput
        fileType="video"
        maxFiles={4}
        title="Upload property video"
      />
    </div>
  );
};

export default PropertyFileUpload;
