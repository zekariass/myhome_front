// @ts-nocheck
import FileDropzoneField from "components/properties/forms/FileDropzoneField";
import MyModal from "components/commons/Modal";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ImageController from "./ImageController";
import { isFileUploaded } from "features/agent_dashboard/property/propertyFileSlice";
import { useDispatch } from "react-redux";
import myHomeBackendAPI from "components/commons/apis/myHomeBackendAPI";
import VideoController from "./VideoController";

const FileUploadInput = ({ fileType, maxFiles, title, propertyId }) => {
  /**
   * State variables that hold images, videos and VR 360 degree images of properties
   */
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [vrImage360, setVrImage360] = useState([]);
  const [fileStoreKeys, setFileStoreKeys] = useState([]);
  const [fileSrcToDisplay, setFileSrcToDisplay] = useState(null);

  const { state } = useLocation();

  // console.log("propertyId: ", propertyId);

  /**
   * State variables that control the modal display for preview of files uploaded
   */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileIndexToDisplay, setFileIndexToDisplay] = useState(0);
  const [fileTypeToDisplay, setFileTypeToDisplay] = useState("image");

  const dispatch = useDispatch();

  //FUnction that handles when an image is dropped
  const onImageDrop = async (file, fileKey) => {
    // console.log("UPLOADED IMAGE DATA: ", images);

    try {
      //create form data
      const formData = new FormData();
      formData.append("image", file);
      formData.append("property", propertyId);

      //Api post request
      const result = await myHomeBackendAPI.post(
        "/property/image/create/",
        formData
      );
      //If api request is successful, set uploaded flag to true in redux store
      //fileKey is generated from curret date time and passed from file input component
      if (result.status === 201) {
        const uploaded = {};
        uploaded.type = "image";
        uploaded[fileKey] = true;

        //Dispatch the file upload status to redux store
        dispatch(isFileUploaded(uploaded));

        //Update the iamges state to the result from the backend
        const resultImage = {};
        resultImage[fileKey] = result.data;
        setImages([...images, resultImage]);
      }
    } catch (error) {}
  };

  //Function that handles when an video is dropped
  const onVideoDrop = async (file, fileKey) => {
    // console.log("FILE UPLOADED: ", file);

    try {
      //create form data
      const formData = new FormData();
      formData.append("video", file);
      formData.append("property", propertyId);
      formData.append("type", file.type);

      //Api post request
      const result = await myHomeBackendAPI.post(
        "/property/video/create/",
        formData
      );
      //If api request is successful, set uploaded flag to true in redux store
      //fileKey is generated from curret date time and passed from file input component
      if (result.status === 201) {
        const uploaded = {};
        uploaded.type = "video";
        uploaded[fileKey] = true;

        //Dispatch the file upload status to redux store
        dispatch(isFileUploaded(uploaded));

        //Update the iamges state to the result from the backend
        const resultVideo = {};
        resultVideo[fileKey] = result.data;
        setVideos([...videos, resultVideo]);
      }
    } catch (error) {}
  };
  const onVrImageDrop = () => {};

  /**
   * A function that handles the deletion of the file from the preview list
   * @param {number} fileIndex
   */
  const removeFile = (fileIndex) => {
    /**
     * Hadles the deletion based on file type selected or dropped
     */
    switch (fileType) {
      case "video":
        const filteredVideos = videos.filter(
          (video, index) => index !== fileIndex
        );
        setVideos(filteredVideos);
        break;
      case "image":
        const filteredImages = images.filter(
          (image, index) => index !== fileIndex
        );
        setImages(filteredImages);
        break;
      case "vrImage360":
        break;
      default:
        break;
    }
  };

  /**
   * A function that returns model bodey element to display based on the file type
   * @returns ReactElement
   */
  const showModalBodyMessage = (imageSrc) => {
    switch (fileTypeToDisplay) {
      case "image":
        return (
          <div>
            <img
              src={fileSrcToDisplay}
              alt="Property Image"
              width="100%"
              height="400vh"
            />
          </div>
        );
      case "video":
        return (
          <video width="100%" height="400vh" controls autoPlay>
            <source src={fileSrcToDisplay} />
          </video>
        );
      default:
        break;
    }
  };

  return (
    <div className="">
      {maxFiles > 0 && (
        <div>
          <p className="fw-bold">
            You have {maxFiles} {fileType}s to be uploaded
          </p>
          <p className="fs-5">{title}</p>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3">
            {/* Display list of images preview */}

            {fileType === "image" &&
              images.length > 0 &&
              images.map((image, index) => (
                <div key={index}>
                  <ImageController
                    index={index}
                    image={image}
                    removeFile={removeFile}
                    setFileIndexToDisplay={setFileIndexToDisplay}
                    setFileTypeToDisplay={setFileTypeToDisplay}
                    setIsModalOpen={setIsModalOpen}
                    propertyId={propertyId}
                    fileStoreKey={fileStoreKeys[index]}
                    setFileSrcToDisplay={setFileSrcToDisplay}
                  />
                </div>
              ))}

            {/* Displays list of videos preview */}
            {fileType === "video" &&
              videos.length > 0 &&
              videos.map((video, index) => (
                <div key={index}>
                  <VideoController
                    index={index}
                    video={video}
                    removeFile={removeFile}
                    setFileIndexToDisplay={setFileIndexToDisplay}
                    setFileTypeToDisplay={setFileTypeToDisplay}
                    setIsModalOpen={setIsModalOpen}
                    propertyId={propertyId}
                    fileStoreKey={fileStoreKeys[index]}
                    setFileSrcToDisplay={setFileSrcToDisplay}
                  />
                </div>
              ))}

            {/* Show the input widget */}
            {((fileType === "video" && maxFiles > videos.length) ||
              (fileType === "image" && maxFiles > images.length) ||
              (fileType === "vrImage360" && maxFiles > vrImage360.length)) && (
              <div className="col px-5 px-sm-0">
                <FileDropzoneField
                  setImages={setImages}
                  images={images}
                  setVideos={setVideos}
                  videos={videos}
                  vrImage360={vrImage360}
                  setVrImage360={setVrImage360}
                  fileType={fileType}
                  // onFileDrop={onFileDrop}
                  fileStoreKeys={fileStoreKeys}
                  setFileStoreKeys={setFileStoreKeys}
                  onImageDrop={onImageDrop}
                  onVideoDrop={onVideoDrop}
                />
              </div>
            )}
            {maxFiles === 0 && (
              <div>You have uploaded all the file! update instead</div>
            )}
          </div>
          {isModalOpen && (
            <MyModal
              show={isModalOpen}
              onHide={() => setIsModalOpen(false)}
              bodyMessage={showModalBodyMessage}
              title="Your media view"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default FileUploadInput;
