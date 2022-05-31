import { isFileUploaded } from "features/agent_dashboard/property/propertyFileSlice";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";

const FileDropzoneField = ({
  fileType,
  setImages,
  images,
  setVideos,
  videos,
  setVrImage360,
  vrImage360,
  onFileDrop,
  getImages,
  fileStoreKeys,
  setFileStoreKeys,
  onImageDrop,
  onVideoDrop,
}) => {
  const dispatch = useDispatch();

  /**
   * onDrop finction that handles the drag and drop or file selection event
   */
  const onDrop = useCallback(
    (acceptedFile) => {
      console.log(acceptedFile);
      const date = new Date();
      const fileKey = date.getTime().toString();
      /**
       * Switch condition that handles the onDrop based on file type seleted or dropped
       */
      switch (fileType) {
        case "video":
          if (acceptedFile[0].type.includes("video")) {
            const storeFileKeys = {};
            storeFileKeys.type = "video";
            storeFileKeys[fileKey] = false;
            const newVideo = {};
            newVideo[fileKey] = null;
            setVideos([...videos, newVideo]);
            setFileStoreKeys([...fileStoreKeys, fileKey]);
            dispatch(isFileUploaded(storeFileKeys));
            if (typeof onVideoDrop === "function") {
              onVideoDrop(acceptedFile[0], fileKey);
            }
          }
          break;
        case "image":
          if (acceptedFile[0].type.includes("image")) {
            const storeFileKeys = {};
            storeFileKeys.type = "image";
            storeFileKeys[fileKey] = false;
            const newImage = {};
            newImage[fileKey] = null;
            setImages([...images, newImage]);
            setFileStoreKeys([...fileStoreKeys, fileKey]);
            dispatch(isFileUploaded(storeFileKeys));
            if (typeof onImageDrop === "function") {
              onImageDrop(acceptedFile[0], fileKey);
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

  return (
    <div className="card ">
      <div
        {...getRootProps({
          className: "picture-upload-container footer-bg flex-center-general",
        })}
      >
        <input {...getInputProps()} />
        <div>
          <p className="fs-1"> +</p>
        </div>
      </div>
    </div>
  );
};

export default FileDropzoneField;
