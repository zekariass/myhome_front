// @ts-nocheck
import myHomeBackendAPI from "components/commons/apis/myHomeBackendAPI";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

const VideoController = ({
  index,
  video,
  removeFile,
  setFileIndexToDisplay,
  setFileTypeToDisplay,
  setIsModalOpen,
  propertyId,
  fileStoreKey,
  setFileSrcToDisplay,
}) => {
  const [deleteSpinnerAnimationName, setDeleteSpinnerAnimationName] =
    useState("");

  const [isVideoUploaded, setIsVideoUploaded] = useState(false);

  //Retrieve boolean flag from backend store that shows whether image is uploaded or not
  //video keys are keys for each video which is generated from Date().getTime()
  const storeVideoUploadFlag = useSelector(
    (store) => store.propertyFile.video[fileStoreKey]
  );

  //get boolean value that displays whether video is uploaded or not
  useEffect(() => {
    setIsVideoUploaded(storeVideoUploadFlag);
  }, [storeVideoUploadFlag]);

  //Spinner class name based on video uploaded status
  //Show spinner if video is on upload, otherwise show video
  const spinnerAnimationName = !isVideoUploaded ? "border" : "";

  const spinnerClassName = isVideoUploaded ? "w-100 h-100" : "";

  //hidden video output if video is on uploading
  const videoClassName = isVideoUploaded ? "p-2" : "p-2 visually-hidden";

  //get video src value from video sent by parent component
  const videoObjKey = Object.keys(video)[0];
  const videoSrc = video[videoObjKey]?.video;

  //Delete video from list and database
  const deleteVideo = async (index) => {
    if (!isVideoUploaded) {
      removeFile(index);
    } else {
      //get the video id to delete it from database
      const videoId = video[videoObjKey]?.id;

      //Set the animation of the spinned when delete is on progress
      setDeleteSpinnerAnimationName("border");
      try {
        const result = await myHomeBackendAPI.delete(
          `/property/video/${videoId}/delete/`
        );

        //If delete is success, set the animation of the spinner to empty char
        if (result.status === 204) {
          setDeleteSpinnerAnimationName("");
          removeFile(index);
        }
      } catch (error) {}
    }
  };

  return (
    <div className="col px-5 px-sm-0" key={index}>
      <div className="picture-list-container shadow">
        <div className="p-1">
          <div
            className="position-relative card flex-center-general"
            style={{ height: "150px" }}
          >
            {/* <div className="card" style={{ position: "relative" }}> */}
            <Spinner
              animation={spinnerAnimationName}
              role="status"
              className={spinnerClassName}
            >
              <video
                width="100%"
                height="100%"
                className={videoClassName}
                controls
              >
                <source src={videoSrc} type={video[videoObjKey]?.type} />
              </video>
            </Spinner>

            <div
              style={{
                position: "absolute",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <Spinner
                animation={deleteSpinnerAnimationName}
                variant="light"
                role="status"
              />
            </div>
          </div>
        </div>
        <div className="row row-cols-2 g-3 pb-2 pt-1">
          <div className="col flex-center-general">
            <i
              className="trash icon delete-general"
              role="button"
              onClick={(event) => {
                event.stopPropagation();
                deleteVideo(index);
              }}
            ></i>
          </div>
          <div className="col flex-center-general">
            <i
              className="large play circle outline icon view-general"
              role="button"
              onClick={(event) => {
                // event.stopPropagation();
                setFileIndexToDisplay(index);
                setFileTypeToDisplay("video");
                setIsModalOpen(true);
                setFileSrcToDisplay(videoSrc);
              }}
            ></i>
          </div>
          {/* <div className="col flex-center-general">
            <i
              className="upload icon upload-general"
              role="button"
              onClick={(event) => {
                event.stopPropagation();
                // removeFile(index);
              }}
            ></i>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default VideoController;
