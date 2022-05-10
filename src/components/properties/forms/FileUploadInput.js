// @ts-nocheck
import MyModal from "components/commons/Modal";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import ImageLabelDropdown from "./ImageLabelDropdown";

const FileUploadInput = ({ fileType, maxFiles, title, onChange }) => {
  /**
   * State variables that hold images, videos and VR 360 degree images of properties
   */
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [vrImage360, setVrImage360] = useState([]);

  /**
   * State variables that control the modal display for preview of files uploaded
   */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileIndexToDisplay, setFileIndexToDisplay] = useState(0);
  const [fileTypeToDisplay, setFileTypeToDisplay] = useState("image");

  /**
   * onDrop finction that handles the drag and drop or file selection event
   */
  const onDrop = useCallback(
    (acceptedFile) => {
      console.log(acceptedFile);
      /**
       * Switch condition that handles the onDrop based on file type seleted or dropped
       */
      switch (fileType) {
        case "video":
          if (acceptedFile[0].type.includes("video")) {
            setVideos([...videos, acceptedFile]);
          }
          break;
        case "image":
          if (acceptedFile[0].type.includes("image")) {
            setImages([...images, acceptedFile]);
            if (typeof onChange === "function") {
              onChange(acceptedFile);
            }
          }
          break;
        case "vrImage360":
        default:
          break;
      }
    },
    [images, videos, vrImage360]
  );

  /**
   * Dropzone configuration
   */
  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    accept:
      fileType === "image"
        ? { "image/*": [".png", ".gif", ".jpeg", ".jpg"], "video/*": [] }
        : { "video/*": [".mp4", ".mkv", ".avi", ".wmv", ".m4p"] },
    onDrop,
  });

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
  const showModalBodyMessage = () => {
    switch (fileTypeToDisplay) {
      case "image":
        return (
          <div>
            <img
              src={URL.createObjectURL(images[fileIndexToDisplay][0])}
              alt="Property Image"
              width="100%"
              height="400vh"
            />
          </div>
        );
      case "video":
        return (
          <video width="100%" height="400vh" controls autoPlay>
            <source src={URL.createObjectURL(videos[fileIndexToDisplay][0])} />
          </video>
        );
      default:
        break;
    }
  };

  return (
    <div className="container">
      <p className="fs-5">{title}</p>
      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 row-cols-xl-8 g-3">
        {/* Display list of images preview */}

        {fileType === "image" &&
          images.length > 0 &&
          images.map((image, index) => (
            <div className="col" key={index}>
              <div className="picture-list-container shadow">
                <div className="p-1">
                  <div className="card">
                    <img
                      src={URL.createObjectURL(image[0])}
                      alt=""
                      width="100%"
                      height="150px"
                      className="p-2"
                    />
                  </div>
                </div>
                <div className="row row-cols-3 g-3 pb-2 pt-1">
                  <div className="col flex-center-general">
                    <i
                      className="trash icon delete-general"
                      role="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        removeFile(index);
                      }}
                    ></i>
                  </div>
                  <div className="col flex-center-general">
                    <i
                      className="eye icon view-general"
                      role="button"
                      onClick={(event) => {
                        setFileIndexToDisplay(index);
                        setFileTypeToDisplay("image");
                        setIsModalOpen(true);
                      }}
                    ></i>
                  </div>
                  <div className="col flex-center-general">
                    <i
                      className="upload icon upload-general"
                      role="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        removeFile(index);
                      }}
                    ></i>
                  </div>
                </div>
                <div className="border-top">
                  <div className="dropdown drop-parent">
                    <ImageLabelDropdown />
                  </div>
                </div>
              </div>
            </div>
          ))}

        {/* Displays list of videos preview */}
        {fileType === "video" &&
          videos.length > 0 &&
          videos.map((vid, index) => (
            <div className="col" key={index}>
              <div className="picture-list-container shadow">
                <div className="p-1">
                  <div className="card">
                    <video width="100%" height="100%" className="p-2" controls>
                      <source
                        src={URL.createObjectURL(vid[0])}
                        type={vid[0].type}
                      />
                    </video>
                  </div>
                </div>
                <div className="row row-cols-3 g-3 pb-2 pt-1">
                  <div className="col flex-center-general">
                    <i
                      className="trash icon delete-general"
                      role="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        removeFile(index);
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
                      }}
                    ></i>
                  </div>
                  <div className="col flex-center-general">
                    <i
                      className="upload icon upload-general"
                      role="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        removeFile(index);
                      }}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          ))}

        {/* Show the input widget */}
        {((fileType === "video" && maxFiles > videos.length) ||
          (fileType === "image" && maxFiles > images.length) ||
          (fileType === "vrImage360" && maxFiles > vrImage360.length)) && (
          <div className="col">
            <div className="card ">
              <div
                {...getRootProps({
                  className:
                    "picture-upload-container footer-bg flex-center-general",
                })}
              >
                <input {...getInputProps()} />
                <div>
                  <p className="fs-1"> +</p>
                </div>
              </div>
            </div>
          </div>
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
  );
};

export default FileUploadInput;
